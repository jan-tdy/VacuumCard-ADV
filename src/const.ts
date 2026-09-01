export const CARD_VERSION = "0.4.0";

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

export const WATER_LEVEL_ENTITY_NAME = "Water Level";
export const CLEAN_PASSES_ENTITY_NAME = "Clean Passes";

// Base vacuum states this card treats as "actively cleaning" (matches
// VACUUM_STATES in TapoVac-ADV's const.py).
export const CLEANING_STATES = ["cleaning"];

export const DEFAULT_MAP_ROTATION = 0;
