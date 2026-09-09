import { HomeAssistant } from "../types";
import { WATER_LEVEL_ENTITY_NAME, CLEAN_PASSES_ENTITY_NAME, DOCK_ACTIONS } from "../const";

// `hass.entities`/`hass.devices` (entity/device registry, keyed by id) are
// part of the standard modern HA frontend `hass` object. Guarded as
// possibly-undefined since not every embedding context populates them
// (e.g. some card preview sandboxes) — every caller degrades to "nothing
// auto-discovered" rather than throwing.
interface RegistryEntity {
  entity_id: string;
  device_id?: string;
  name?: string | null;
  original_name?: string | null;
}

// Sensors that exist on every device but aren't worth a row by default:
// a raw schedules count isn't actionable at a glance, and status already
// shows in the card's own header. Still addable via the `sensors` config
// override.
const LOW_VALUE_DEFAULT_SENSORS = ["schedules", "status"];

function registry(hass: HomeAssistant): Record<string, RegistryEntity> | undefined {
  return (hass as unknown as { entities?: Record<string, RegistryEntity> }).entities;
}

/** A camera entity's entity_picture, with a cache-busting query param so
 *  an <img> bound to it actually refetches as the underlying map image is
 *  periodically re-rendered server-side.
 *
 *  entity_picture's own query string (HA's own `?token=...`) doesn't
 *  change between refreshes, so binding it to `<img src>` as-is means the
 *  browser fetches it once and then never again — the map looks frozen
 *  until a full page reload, since nothing about the attribute value ever
 *  changes to make Lit touch the DOM attribute (and even a same-string
 *  `src` re-assignment wouldn't trigger a browser refetch on its own).
 *  Appending the entity's own last_updated (rewritten by the coordinator
 *  on every poll, well before the map itself needs to change) as an extra
 *  param makes the URL change often enough for the browser to refetch,
 *  without waiting on a slower per-render signal from the integration. */
export function cacheBustedPicture(hass: HomeAssistant, entityId: string): string | undefined {
  const state = hass.states[entityId];
  const picture = state?.attributes?.["entity_picture"] as string | undefined;
  if (!picture) return undefined;
  if (!state.last_updated) return picture;
  const separator = picture.includes("?") ? "&" : "?";
  return `${picture}${separator}_hactl=${encodeURIComponent(state.last_updated)}`;
}

function friendlyName(hass: HomeAssistant, entityId: string): string {
  const reg = registry(hass)?.[entityId];
  if (reg?.name) return reg.name;
  if (reg?.original_name) return reg.original_name;
  const state = hass.states[entityId];
  const attrName = state?.attributes?.["friendly_name"];
  return typeof attrName === "string" ? attrName : entityId;
}

/** Every entity_id sharing the given entity's device, or [] if the entity
 *  registry isn't available in this context. */
export function getDeviceEntityIds(hass: HomeAssistant, entityId: string): string[] {
  const reg = registry(hass);
  if (!reg) return [];
  const deviceId = reg[entityId]?.device_id;
  if (!deviceId) return [];
  return Object.keys(reg).filter((id) => reg[id]?.device_id === deviceId);
}

function byDomain(ids: string[], domain: string): string[] {
  return ids.filter((id) => id.startsWith(`${domain}.`));
}

export interface DiscoveredEntities {
  camera?: string;
  waterLevel?: string;
  cleanPasses?: string;
  battery?: string;
  dockActions: { entityId: string; name: string; icon: string }[];
  sensors: string[];
  maintenanceSensors: string[];
  mopAttached?: string;
}

/** Best-effort auto-discovery of every entity this card can use, from just
 *  the configured vacuum entity_id — so the card works with sensible
 *  defaults right after picking a vacuum, no per-sensor configuration
 *  required. Every result here can still be overridden explicitly in
 *  config (see VacuumCardConfig). */
export function discoverEntities(hass: HomeAssistant, vacuumEntityId: string): DiscoveredEntities {
  const deviceIds = getDeviceEntityIds(hass, vacuumEntityId);
  const result: DiscoveredEntities = { dockActions: [], sensors: [], maintenanceSensors: [] };
  if (deviceIds.length === 0) return result;

  result.camera = byDomain(deviceIds, "camera")[0];

  for (const id of byDomain(deviceIds, "select")) {
    const name = friendlyName(hass, id);
    if (name.includes(WATER_LEVEL_ENTITY_NAME)) result.waterLevel = id;
    else if (name.includes(CLEAN_PASSES_ENTITY_NAME)) result.cleanPasses = id;
    // Anything else (e.g. TapoVac-ADV v2.0.0's Area Unit) isn't a control
    // this card has dedicated UI for — surface it as a tappable row in
    // Maintenance (opens HA's own more-info dialog to change it) instead
    // of dropping it silently.
    else result.maintenanceSensors.push(id);
  }

  for (const id of byDomain(deviceIds, "sensor")) {
    const state = hass.states[id];
    if (state?.attributes?.["device_class"] === "battery") {
      result.battery = id;
      continue;
    }
    const name = friendlyName(hass, id).toLowerCase();
    // "remaining" catches consumables (brush/filter/... time left);
    // "carpet" catches TapoVac-ADV v2.0.0's Carpet Clean Preference — both
    // are settings/upkeep info, not core cleaning status, so they belong
    // in the collapsible Maintenance section rather than the main list.
    if (name.includes("remaining") || name.includes("carpet")) result.maintenanceSensors.push(id);
    // Left out of the *default* list, not hidden entirely: a raw
    // schedules count isn't useful at a glance, and status is already
    // shown in the card's own header — both can still be added back via
    // the `sensors` config override for anyone who wants them.
    else if (LOW_VALUE_DEFAULT_SENSORS.some((suffix) => name.endsWith(suffix))) continue;
    else result.sensors.push(id);
  }

  for (const id of byDomain(deviceIds, "binary_sensor")) {
    if (friendlyName(hass, id).toLowerCase().includes("mop")) result.mopAttached = id;
    // Anything else (e.g. TapoVac-ADV v2.0.0's Do Not Disturb) — same
    // reasoning as the select loop above: a Maintenance row beats silence.
    else result.maintenanceSensors.push(id);
  }

  // number/switch entities didn't exist on this device before TapoVac-ADV
  // v2.0.0 (Volume, Refresh Interval, Child Lock) — no dedicated UI for
  // them here either, so they go straight to Maintenance like the
  // unmatched select/binary_sensor cases above. _renderSensorRow() reads
  // generic state/unit/icon and its tap opens the standard more-info
  // dialog, which already has the right control (slider/toggle) for
  // these domains — no per-domain rendering needed on this card's side.
  for (const id of byDomain(deviceIds, "number")) result.maintenanceSensors.push(id);
  for (const id of byDomain(deviceIds, "switch")) result.maintenanceSensors.push(id);

  for (const id of byDomain(deviceIds, "button")) {
    const name = friendlyName(hass, id);
    const known = DOCK_ACTIONS.find((a) => a.name === name);
    if (known) result.dockActions.push({ entityId: id, name: known.name, icon: known.icon });
  }

  return result;
}
