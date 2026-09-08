// Minimal Home Assistant types this card actually uses — not the full
// frontend type surface, just enough for entity lookups and service calls.

export interface HassEntity {
  entity_id: string;
  state: string;
  attributes: Record<string, unknown>;
  last_changed: string;
  last_updated: string;
}

export interface HomeAssistant {
  states: Record<string, HassEntity>;
  language: string;
  themes: { darkMode?: boolean };
  callService: (
    domain: string,
    service: string,
    serviceData?: Record<string, unknown>,
    target?: Record<string, unknown>
  ) => Promise<unknown>;
  callWS: <T = unknown>(msg: Record<string, unknown>) => Promise<T>;
  formatEntityState?: (entity: HassEntity) => string;
}

export interface LovelaceCardConfig {
  type: string;
  [key: string]: unknown;
}

// One calibrated room polygon: pixel coordinates in the *same space* as
// the camera entity's room_geometry (post-scale, post-flip natural image
// pixels) — see TapoVac-ADV's coordinator.py docstring on
// _render_map_image() for why that space was chosen.
export type RoomPolygon = [number, number][];

// -- Furniture placed on the map (this card's own overlay — see
// TapoVac-ADV's README "Missing Furniture" section for why furniture
// placed in the Tapo app itself can't be read back into Home Assistant) --
export type FurnitureType =
  | "bed"
  | "sofa"
  | "table"
  | "desk"
  | "chair"
  | "wardrobe"
  | "toilet"
  | "sink"
  | "bathtub"
  | "fridge"
  | "washing_machine"
  | "tv"
  | "stairs"
  | "plant"
  | "custom";

// Color scheme applied to every placed furniture item — see
// utils/furniture.ts's FURNITURE_PALETTES for the actual color values.
export type FurnitureColorScheme = "brown" | "white";

export interface FurnitureItem {
  id: string;
  type: FurnitureType;
  // Center point, width/height and rotation — all in the same natural
  // image pixel space as RoomPolygon/room_geometry above, so furniture
  // holds its position and scale across map refreshes the same way
  // calibrated room polygons do.
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number; // degrees, clockwise, 0-360
  // Which floor/map (see geometry.ts's currentMapKey()) this item was
  // placed on — a multi-map vacuum reuses the same pixel space per floor,
  // so without this an item placed on one floor would show up overlaid on
  // every other floor's map too. Undefined on items saved before this
  // field existed; those stay visible on every floor (unchanged legacy
  // behavior) until re-placed, which stamps them to a specific floor.
  map?: string;
}

export interface VacuumCardConfig extends LovelaceCardConfig {
  type: "custom:vacuum-card-adv";
  vacuum: string;
  camera?: string;
  fan_speed_entity?: string;
  water_level_entity?: string;
  battery_entity?: string;
  mop_attached_entity?: string;
  sensors?: string[];
  maintenance_sensors?: string[];
  name?: string;
  show_map?: boolean;
  map_rotation?: number; // degrees, 0/90/180/270 (or arbitrary)
  // Where the map sits relative to the rest of the card: "top" (default,
  // right after the controls) or "bottom" (after battery/sensors, before
  // the collapsible maintenance section).
  map_position?: "top" | "bottom";
  // Experimental: draws a live trail behind the vacuum's position
  // (room_geometry.vacuum_point) while it's actively cleaning — resets at
  // the start of each new cleaning run. Off by default: sample rate
  // follows however often the integration refreshes the map (currently
  // every 60s while cleaning), so the trail is coarse, not a precise path.
  show_trace?: boolean;
  show_room_names?: boolean;
  show_controls?: boolean;
  show_dock_actions?: boolean;
  show_fan_speed?: boolean;
  show_water_level?: boolean;
  show_battery?: boolean;
  show_sensors?: boolean;
  show_mop_status?: boolean;
  show_last_updated?: boolean;
  maintenance_collapsed_default?: boolean;
  // Manually-calibrated room outlines — takes precedence over the
  // automatic bbox from room_geometry for that room. See the editor's
  // calibration tool.
  //
  // Keyed by room id (as a string, since Lovelace/YAML config keys are
  // strings) for a single-floor vacuum. A multi-map/multi-floor vacuum
  // reuses room ids per floor, so the editor instead saves (and looks up)
  // an entry as "<currentMapKey>:<roomId>" (see geometry.ts's
  // currentMapKey()/scopedRoomPolygons()) — the plain "<roomId>" form is
  // still read as a fallback so calibration saved before floors were
  // distinguished keeps working.
  room_polygons?: Record<string, RoomPolygon>;
  // Furniture placed on the map via this card's own editor — see
  // FurnitureItem above.
  furniture?: FurnitureItem[];
  show_furniture?: boolean;
  // 0-100, applied to the whole furniture layer on the live card (not the
  // editor's own map, where full opacity makes items easier to select).
  furniture_opacity?: number;
  furniture_color?: FurnitureColorScheme;
}

// -- room_geometry, as exposed by TapoVac-ADV's map camera entity --------
export interface RoomGeometryRoom {
  id: number;
  name: string;
  color: [number, number, number];
  cx: number;
  cy: number;
  bbox: [number, number, number, number]; // x0, y0, x1, y1
}

export interface RoomGeometry {
  image_width: number;
  image_height: number;
  rooms: RoomGeometryRoom[];
  charge_point: [number, number] | null;
  vacuum_point: [number, number] | null;
  // Which saved map this geometry came from, if the integration exposes
  // it (not yet as of TapoVac-ADV v1.13 — this reads as undefined there,
  // and geometry.ts's currentMapKey() falls back to fingerprinting the
  // room layout instead). Optional and additive, so older integration
  // versions keep working unchanged.
  map_id?: number | string;
  map_name?: string;
}

// -- Card picker registration (window.customCards) -----------------------
export interface CustomCardEntry {
  type: string;
  name: string;
  description: string;
  preview?: boolean;
}

declare global {
  interface Window {
    customCards?: CustomCardEntry[];
  }
}
