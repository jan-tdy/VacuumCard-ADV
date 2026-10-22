import {
  HomeAssistant,
  RoomGeometry,
  RoomGeometryRoom,
  RoomPolygon,
  TapoMapGeometry,
} from "../types";

/** Resolve the map camera's room geometry from its state attributes,
 *  accepting both shapes TapoVac-ADV has shipped:
 *  - older versions exposed `room_geometry` as one whole RoomGeometry
 *    object (rooms + image size together);
 *  - v3.0.0+ publishes `room_geometry` as a bare room list and moves the
 *    image size/dock/furniture into a separate `map_geometry` attribute,
 *    so the list is normalized back into the card's RoomGeometry model
 *    here (image dimensions come from map_geometry.image_size, per-room
 *    centre from `centre`, default room color from the fallback below).
 *  Returns undefined when the camera entity is missing, the attribute
 *  isn't populated yet, or the map image size is unknown.
 *
 *  Shared by the live card AND the editor: the editor used to read
 *  `room_geometry.rooms` directly, which is undefined on the v3.0.0+
 *  list shape — breaking room calibration and furniture placement with
 *  a permanent "Map not available yet" hint (v3.0.3 fixes that). */
export function resolveRoomGeometry(
  hass: HomeAssistant,
  cameraId: string | undefined
): RoomGeometry | undefined {
  if (!cameraId) return undefined;
  const state = hass.states[cameraId];
  const raw = state?.attributes?.["room_geometry"] as RoomGeometry | RoomGeometryRoom[] | undefined;
  if (raw && !Array.isArray(raw) && raw.rooms) return raw;
  if (!Array.isArray(raw) || raw.length === 0) return undefined;

  const map = state?.attributes?.["map_geometry"] as TapoMapGeometry | undefined;
  const [image_width, image_height] = map?.image_size ?? [0, 0];
  if (!image_width || !image_height || !map) return undefined;
  const rooms = raw.map((entry) => {
    const item = entry as RoomGeometryRoom & { centre?: [number, number] };
    const [x0, y0, x1, y1] = item.bbox;
    return {
      id: item.id,
      name: item.name,
      color: item.color ?? ([74, 144, 226] as [number, number, number]),
      cx: item.cx ?? item.centre?.[0] ?? (x0 + x1) / 2,
      cy: item.cy ?? item.centre?.[1] ?? (y0 + y1) / 2,
      bbox: item.bbox,
      last_cleaned: (item as RoomGeometryRoom & { last_cleaned?: number }).last_cleaned,
      coverage: (item as RoomGeometryRoom & { coverage?: number }).coverage,
    };
  });
  const furniture = (map.furniture ?? []).map((item) => {
    const xs = item.px.map(([x]) => x);
    const ys = item.px.map(([, y]) => y);
    return {
      id: item.id,
      type: item.type,
      angle: item.angle,
      points: item.px,
      bbox: [Math.min(...xs), Math.min(...ys), Math.max(...xs), Math.max(...ys)] as [number, number, number, number],
    };
  });
  return {
    image_width,
    image_height,
    rooms,
    charge_point: map.dock_px ?? null,
    vacuum_point: null,
    map_id: map.map_id ?? undefined,
    map_name: map.map_name,
    furniture,
  };
}

export interface Point {
  x: number;
  y: number;
}

/** Convert a click (viewport CSS pixel coordinates, e.g. from
 *  MouseEvent.clientX/Y) on the displayed <img> element into the image's
 *  *natural* pixel space — the same space room_geometry's bbox/centroid
 *  and calibrated polygons are given in.
 *
 *  Handles the map's own CSS rotation (see VacuumCardConfig.map_rotation)
 *  correctly for *any* angle, not just multiples of 90°: a rotated
 *  element's getBoundingClientRect() is the axis-aligned bounding box of
 *  the rotated content, which is larger than the unrotated image for
 *  non-90°-multiple angles, so naive left/top/width/height ratio math
 *  would misplace clicks at those angles. Instead this rotates the click
 *  point by -rotationDeg around the element's own center (which a pure
 *  CSS rotation leaves unmoved, for any angle) to recover its position in
 *  the *unrotated* layout box, then scales that into natural image
 *  pixels using the element's own (rotation-unaffected) layout size. */
export function displayToNatural(
  clientX: number,
  clientY: number,
  img: HTMLImageElement,
  rotationDeg: number
): Point {
  const rect = img.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  const w = img.offsetWidth || rect.width;
  const h = img.offsetHeight || rect.height;

  let dx = clientX - centerX;
  let dy = clientY - centerY;
  if (rotationDeg % 360 !== 0) {
    const rad = (-rotationDeg * Math.PI) / 180;
    const cos = Math.cos(rad);
    const sin = Math.sin(rad);
    const rx = dx * cos - dy * sin;
    const ry = dx * sin + dy * cos;
    dx = rx;
    dy = ry;
  }

  const localX = dx + w / 2;
  const localY = dy + h / 2;
  const scaleX = img.naturalWidth / w;
  const scaleY = img.naturalHeight / h;
  return { x: localX * scaleX, y: localY * scaleY };
}

/** Stable identifier for the floor/map the given room_geometry snapshot
 *  came from — used to scope saved calibration (room_polygons) and
 *  furniture per floor, since a multi-map vacuum reuses the same room ids
 *  and pixel space on every floor.
 *
 *  Prefers the integration's own map_id when present (exact, and stable
 *  even if a room gets renamed) — see RoomGeometry.map_id. No published
 *  TapoVac-ADV version exposes it yet, so in practice this currently
 *  always falls back to fingerprinting the floor's own room layout
 *  (sorted "id:name" pairs): two different floors virtually always have a
 *  different room set, so this reliably tells them apart even though it
 *  can't distinguish two floors that happen to share an identical layout,
 *  and it changes if rooms are renamed/re-added on the device. */
export function currentMapKey(geometry: RoomGeometry): string {
  if (geometry.map_id !== undefined && geometry.map_id !== null) {
    return `map:${geometry.map_id}`;
  }
  return geometry.rooms
    .map((r) => `${r.id}:${r.name}`)
    .sort()
    .join("|");
}

/** This floor's calibrated room polygons, resolved out of the full
 *  (possibly multi-floor) room_polygons config: a "<mapKey>:<roomId>"
 *  entry for the *current* floor wins when present, else falls back to a
 *  legacy plain "<roomId>" entry (saved before floors were distinguished)
 *  so single-floor configs keep working untouched. Returned keyed by
 *  plain room id, ready to look up by room.id like the old flat config
 *  shape was. */
export function scopedRoomPolygons(
  roomPolygons: Record<string, RoomPolygon> | undefined,
  geometry: RoomGeometry
): Record<string, RoomPolygon> {
  if (!roomPolygons) return {};
  const mapKey = currentMapKey(geometry);
  const result: Record<string, RoomPolygon> = {};
  for (const room of geometry.rooms) {
    const polygon = roomPolygons[`${mapKey}:${room.id}`] ?? roomPolygons[String(room.id)];
    if (polygon) result[String(room.id)] = polygon;
  }
  return result;
}

function pointInBbox(p: Point, bbox: [number, number, number, number]): boolean {
  return p.x >= bbox[0] && p.x <= bbox[2] && p.y >= bbox[1] && p.y <= bbox[3];
}

// Standard ray-casting point-in-polygon test.
function pointInPolygon(p: Point, polygon: RoomPolygon): boolean {
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const [xi, yi] = polygon[i];
    const [xj, yj] = polygon[j];
    const intersects =
      yi > p.y !== yj > p.y && p.x < ((xj - xi) * (p.y - yi)) / (yj - yi) + xi;
    if (intersects) inside = !inside;
  }
  return inside;
}

function distanceSquared(p: Point, x: number, y: number): number {
  const dx = p.x - x;
  const dy = p.y - y;
  return dx * dx + dy * dy;
}

/** Resolve a click (already in natural image pixel space) to a room id.
 *
 * Precedence: a manually-calibrated polygon for a room (see the editor's
 * calibration tool) always wins over the automatic bbox, since axis-
 * aligned bboxes overlap on L-shaped/irregular rooms and a hand-traced
 * outline is exact. Falls back to nearest centroid if the click lands
 * outside every polygon/bbox, so a click just outside a room's edge still
 * picks something reasonable instead of doing nothing. */
export function resolveRoomAtPoint(
  point: Point,
  geometry: RoomGeometry,
  roomPolygons: Record<string, RoomPolygon> | undefined
): number | null {
  for (const room of geometry.rooms) {
    const polygon = roomPolygons?.[String(room.id)];
    if (polygon && polygon.length >= 3 && pointInPolygon(point, polygon)) {
      return room.id;
    }
  }
  for (const room of geometry.rooms) {
    if (!roomPolygons?.[String(room.id)] && pointInBbox(point, room.bbox)) {
      return room.id;
    }
  }
  if (geometry.rooms.length === 0) return null;
  let nearest = geometry.rooms[0];
  let nearestDist = distanceSquared(point, nearest.cx, nearest.cy);
  for (const room of geometry.rooms.slice(1)) {
    const d = distanceSquared(point, room.cx, room.cy);
    if (d < nearestDist) {
      nearest = room;
      nearestDist = d;
    }
  }
  // Only accept the nearest-centroid fallback within a generous radius —
  // otherwise a click far outside the map (e.g. on padding) would still
  // silently "select" whatever room happens to be closest.
  const maxDim = Math.max(geometry.image_width, geometry.image_height);
  return nearestDist <= (maxDim * 0.15) ** 2 ? nearest.id : null;
}
