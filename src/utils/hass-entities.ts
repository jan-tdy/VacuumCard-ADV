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

function registry(hass: HomeAssistant): Record<string, RegistryEntity> | undefined {
  return (hass as unknown as { entities?: Record<string, RegistryEntity> }).entities;
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
  }

  for (const id of byDomain(deviceIds, "sensor")) {
    const state = hass.states[id];
    if (state?.attributes?.["device_class"] === "battery") {
      result.battery = id;
      continue;
    }
    const name = friendlyName(hass, id).toLowerCase();
    if (name.includes("remaining")) result.maintenanceSensors.push(id);
    else result.sensors.push(id);
  }

  for (const id of byDomain(deviceIds, "binary_sensor")) {
    if (friendlyName(hass, id).toLowerCase().includes("mop")) result.mopAttached = id;
  }

  for (const id of byDomain(deviceIds, "button")) {
    const name = friendlyName(hass, id);
    const known = DOCK_ACTIONS.find((a) => a.name === name);
    if (known) result.dockActions.push({ entityId: id, name: known.name, icon: known.icon });
  }

  return result;
}
