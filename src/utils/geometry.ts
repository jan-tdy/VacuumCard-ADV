import { RoomGeometry, RoomPolygon } from "../types";

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
