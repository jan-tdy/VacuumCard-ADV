# VacuumCard-ADV

A Home Assistant Lovelace card built for the
[TapoVac-ADV](https://github.com/jan-tdy/TapoVac-ADV) integration (Tapo
RV30 / RV50 series). UI-editable through Home Assistant's own card
editor — not YAML-only, though YAML is always available too via the
editor's own "Show code editor" toggle.

## Screenshot

<img width="324" height="635" alt="image" src="https://github.com/user-attachments/assets/452c94a9-1c86-4197-893f-c92365ccbdcc" />


## Features

- Header with name and status
- Live map (from the integration's map camera entity) with **configurable
  rotation** — no card-mod needed
- **Click rooms directly on the map** to select them, then clean just
  those rooms
- A **room calibration tool** in the visual editor: click points on the
  map to trace a room's actual outline when the automatic rectangle
  doesn't fit an irregular/L-shaped room
- Start / pause / stop / return-to-dock controls
- Dock action buttons (Empty Dust Bin / Wash Mop / Dry Mop / Remove
  Hair) — shown only for the actions your specific dock actually has
- Fan speed and water level selectors
- Battery
- Sensors, with a collapsible maintenance section (brush/filter/etc. wear)
- Auto-detects every entity above from just the vacuum entity you pick —
  works right away, every section can still be toggled off, and key
  entities can be overridden individually

Planned for a future version: furniture placement on the map, and a
custom vacuum icon/picture (see
[TapoVac-ADV's README](https://github.com/jan-tdy/TapoVac-ADV#-map-limitations--tips)
for the current furniture-on-map limitation this picks up from).

## Requirements

- The [TapoVac-ADV](https://github.com/jan-tdy/TapoVac-ADV) integration —
  this card is built specifically for its entities (map camera's
  `room_geometry` attribute for room click-to-select, the
  `tapo_rv30.clean_rooms` service, its dock action buttons). It won't do
  anything useful pointed at a different vacuum integration.
- [HACS](https://hacs.xyz) installed

## Installation via HACS

1. In HACS → **Frontend** → ⋮ menu → **Custom repositories**
2. Add `https://github.com/jan-tdy/VacuumCard-ADV` as category **Dashboard**
3. Install **VacuumCard ADV**
4. Add the card to a dashboard: **Edit Dashboard → Add Card → search
   "TapoVac ADV Vacuum Card"**

## Configuration

Everything below is editable through the card's own UI editor (entity
picker, toggles, rotation field, calibration tool) — this is just the
YAML it produces, for reference or hand-editing:

```yaml
type: custom:vacuum-card-adv
vacuum: vacuum.jedalen_rv30_max
# Everything else is optional — auto-detected from the vacuum entity's
# device when omitted.
camera: camera.jedalen_rv30_max_map
water_level_entity: select.jedalen_rv30_max_water_level
battery_entity: sensor.jedalen_rv30_max_battery
mop_attached_entity: binary_sensor.jedalen_rv30_max_mop_attached
map_rotation: 180
map_position: top        # "top" (default) or "bottom"
show_map: true
show_room_names: true
show_controls: true
show_dock_actions: true
show_fan_speed: true
show_water_level: true
show_battery: true
show_mop_status: true
show_sensors: true
sensors: []              # override the auto-detected sensor list
maintenance_sensors: []  # override which sensors show under "Maintenance"
room_polygons: {}        # written by the editor's calibration tool
```

## Room calibration

Rooms work immediately using an automatically-computed rectangle (from
the integration's `room_geometry` camera attribute) — no setup needed.
If a room is L-shaped or otherwise irregular and the rectangle catches
clicks meant for a different room, open the card's editor and use **Room
calibration**: pick the room, click points on the map to trace its real
outline (each click adds a point, points connect with a line as you go),
then **Finish polygon**. That room's clicks now use your traced outline
instead of the rectangle. **Delete saved calibration** reverts to the
automatic rectangle.

## Development

```bash
npm install
npm run build      # → vacuum-card-adv.js (bundled, minified)
npm run watch       # rebuild on change
npm run typecheck
```

Built with [Lit](https://lit.dev) + [Rollup](https://rollupjs.org),
TypeScript throughout.

## Credits

Companion card for
[jan-tdy/TapoVac-ADV](https://github.com/jan-tdy/TapoVac-ADV), which
implements the local TPAP protocol client and exposes the entities and
services (`room_geometry`, `tapo_rv30.clean_rooms`, dock action buttons)
this card is built against.
