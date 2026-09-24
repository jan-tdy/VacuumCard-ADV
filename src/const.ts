export const CARD_VERSION = "2.3.0";


// Dock action buttons — friendly names exactly as TapoVac-ADV's button.py
// names them (custom_components/tapo_rv30/button.py `_DOCK_BUTTONS`).
// Buttons only exist on the device when its firmware confirms it has that
// feature (Plus docks: Empty Dust Bin only; Omni docks: all four) — this
// card discovers them by name rather than assuming any of them exist.
export const DOCK_ACTIONS: { name: string; icon: string }[] = [
  { name: "Empty Dust Bin", icon: "mdi:delete-empty" },
  { name: "Wash Mop", icon: "mdi:water-sync" },
  { name: "Dry Mop", icon: "mdi:tumble-dryer" },
  { name: "Remove Hair", icon: "mdi:content-cut" },
];

// Same idea as DOCK_ACTIONS above, but for the Dreame Vacuum integration
// (github.com/Tasshack/dreame-vacuum), whose button.py auto-derives these
// friendly names from each button's translation key rather than sharing
// TapoVac-ADV's naming — button entities only exist when the device's
// dock actually has that feature (e.g. "Self-Clean"/"Start Drying" only
// on self-washing docks).
export const DREAME_DOCK_ACTIONS: { name: string; icon: string }[] = [
  { name: "Start Auto Empty", icon: "mdi:delete-empty" },
  { name: "Self-Clean", icon: "mdi:water-sync" },
  { name: "Start Drying", icon: "mdi:tumble-dryer" },
];

// A select entity is recognized as "water level" if its friendly name
// includes any of these — TapoVac-ADV calls it "Water Level", the Dreame
// Vacuum integration calls the equivalent entity "Water Volume".
export const WATER_LEVEL_ENTITY_NAMES = ["Water Level", "Water Volume"];
export const CLEAN_PASSES_ENTITY_NAME = "Clean Passes";

// Base vacuum states this card treats as "actively cleaning" (matches
// VACUUM_STATES in TapoVac-ADV's const.py).
export const CLEANING_STATES = ["cleaning"];

export const DEFAULT_MAP_ROTATION = 0;

// Relevant bits of the standard HA `vacuum` domain's supported_features
// bitmask (homeassistant.components.vacuum.VacuumEntityFeature) — used to
// hide a control button when the entity doesn't actually support the
// service it would call. Not every integration implements every service
// (e.g. the Dreame Vacuum integration has no CLEAN_SPOT support), and
// calling an unsupported service just raises an error in HA rather than
// doing nothing, so this is checked before rendering rather than assumed.
export const VACUUM_FEATURE_PAUSE = 4;
export const VACUUM_FEATURE_STOP = 8;
export const VACUUM_FEATURE_RETURN_HOME = 16;
export const VACUUM_FEATURE_CLEAN_SPOT = 1024;

// Cap on stored trace points (see VacuumCardConfig.show_trace) — the
// vacuum_point sample rate follows the integration's own map refresh
// interval (60s while cleaning), so this bounds a long clean's trail to a
// reasonable memory footprint rather than growing unbounded for hours.
export const TRACE_MAX_POINTS = 400;
