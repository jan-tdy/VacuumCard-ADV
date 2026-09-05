# VacuumCard-ADV

**If you found this useful, please give this repo a star! Also check out my other repos!**

A Home Assistant Lovelace card built for the
[TapoVac-ADV](https://github.com/jan-tdy/TapoVac-ADV) integration (Tapo
RV30 / RV50 series). UI-editable through Home Assistant's own card
editor — not YAML-only, though YAML is always available too via the
editor's own "Show code editor" toggle.

## Screenshot

<img width="375" height="803" alt="image" src="https://github.com/user-attachments/assets/44029738-e177-4345-814c-694a8aa0d3fd" />


## Features

- Header with name and status
- Live map (from the integration's map camera entity) with **configurable
  rotation** — no card-mod needed
- **Click rooms directly on the map** to select them, then clean just
  those rooms — selected rooms are clearly highlighted against unselected
  ones, each with a numbered badge showing the order they were picked in
- **Furniture on the map** — place beds, sofas, tables, chairs, desks,
  toilets, and more directly on the map from the card's own editor: drag
  to move, a top handle to rotate, a corner handle to resize (see
  [Furniture placement](#furniture-placement) below)
- A **room calibration tool** in the visual editor: click points on the
  map to trace a room's actual outline when the automatic rectangle
  doesn't fit an irregular/L-shaped room
- Start / pause / stop / return-to-dock controls
- Dock action buttons (Empty Dust Bin / Wash Mop / Dry Mop / Remove
  Hair) — shown only for the actions your specific dock actually has
- Fan speed and water level selectors
- Battery
- Sensors, with a collapsible maintenance section (brush/filter/etc. wear)
- "Last updated" time in the header — the freshest of the battery,
  mop-status and sensor entities' own update times, so you can spot a
  vacuum whose data has gone stale (e.g. Wi-Fi dropped)
- Auto-detects every entity above from just the vacuum entity you pick —
  works right away, every section can still be toggled off, and key
  entities can be overridden individually

Planned for a future version: a custom vacuum icon/picture. See
[TapoVac-ADV's README](https://github.com/jan-tdy/TapoVac-ADV#-map-limitations--tips)
for why furniture placed in the Tapo app itself can't be read into Home
Assistant — this card's own furniture placement (below) is what picks that
up.

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
show_last_updated: true
show_furniture: true
furniture_opacity: 100   # 0-100, how solid furniture looks on the live card's map
furniture_color: brown   # "brown" (default) or "white"
sensors: []              # override the auto-detected sensor list
maintenance_sensors: []  # override which sensors show under "Maintenance"
room_polygons: {}        # written by the editor's calibration tool
furniture: []            # written by the editor's furniture placement tool
```

## Furniture placement

Furniture placed in the official Tapo app is stored in TP-Link's cloud and
isn't readable from Home Assistant (see
[TapoVac-ADV's README](https://github.com/jan-tdy/TapoVac-ADV#-map-limitations--tips)
for why) — so this card places it independently, on top of the same map.

Open the card's editor and use **Furniture**: pick a type (bed, sofa,
table, desk, chair, wardrobe, toilet, sink, bathtub, fridge, washing
machine, TV, stairs, plant, or a generic custom shape) and click **Add** to
drop it in the middle of the map, then:

- **Drag the shape itself** to move it
- **Drag the top handle** to rotate it
- **Drag the corner handle** to resize it
- Use the rotate-left/rotate-right buttons under the map for precise
  15°-step rotation, or the list below it to reselect or delete a piece

Furniture is stored in the same pixel space as calibrated room polygons, so
it holds its position and size across map refreshes. Toggle `show_furniture`
off to hide it on the live card without deleting it, or use the **Furniture
opacity** slider in the editor (`furniture_opacity`, 0-100) to make it more
or less prominent against the map instead of hiding it outright. **Furniture
color** (`furniture_color`) picks between a brown/wood-toned palette
(default) and a white/light-gray one.

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

**Snap corners to 90°** (on by default) constrains each new point to a
straight horizontal or vertical line from the last one, so the traced
outline comes out as clean right-angle walls instead of a rough hand-drawn
shape — matching how most rooms are actually built. Turn it off for a
genuinely angled/non-rectilinear room.

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
