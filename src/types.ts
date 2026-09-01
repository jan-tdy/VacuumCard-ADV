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

export interface VacuumCardConfig extends LovelaceCardConfig {
  type: "custom:vacuum-card-adv";
  vacuum: string;
  camera?: string;
  fan_speed_entity?: string;
  water_level_entity?: string;
  battery_entity?: string;
  sensors?: string[];
  maintenance_sensors?: string[];
  name?: string;
  show_map?: boolean;
  map_rotation?: number; // degrees, 0/90/180/270 (or arbitrary)
  show_room_names?: boolean;
  show_controls?: boolean;
  show_dock_actions?: boolean;
  show_fan_speed?: boolean;
  show_water_level?: boolean;
  show_battery?: boolean;
  show_sensors?: boolean;
  maintenance_collapsed_default?: boolean;
  // Manually-calibrated room outlines, keyed by room id (as a string,
  // since Lovelace/YAML config keys are strings) — takes precedence over
  // the automatic bbox from room_geometry for that room. See the editor's
  // calibration tool.
  room_polygons?: Record<string, RoomPolygon>;
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
