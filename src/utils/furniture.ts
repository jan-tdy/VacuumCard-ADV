import { svg, SVGTemplateResult } from "lit";
import { FurnitureColorScheme, FurnitureItem, FurnitureType, RoomGeometry } from "../types";

export interface FurniturePalette {
  fill: string;
  stroke: string;
  detail: string;
  line: string;
}

// Applied as CSS custom properties on the .furniture-layer group (see
// _renderFurniture() in vacuum-card-adv.ts and the editor's furniture
// overlay), so every furn-* shape picks it up without per-shape wiring.
export const FURNITURE_PALETTES: Record<FurnitureColorScheme, FurniturePalette> = {
  brown: { fill: "#bcaaa4", stroke: "#6d4c41", detail: "#8d6e63", line: "#4e342e" },
  white: { fill: "#fafafa", stroke: "#9e9e9e", detail: "#e0e0e0", line: "#757575" },
};

export function getFurniturePalette(scheme: FurnitureColorScheme | undefined): FurniturePalette {
  return FURNITURE_PALETTES[scheme ?? "brown"];
}

export interface FurnitureCatalogEntry {
  type: FurnitureType;
  label: string;
  // mdi icon — only used in the editor's own HTML pickers (type dropdown,
  // placed-furniture list); the map itself renders furnitureGlyph() below,
  // a real top-down floorplan shape per type (like the Tapo app draws
  // furniture), not a generic icon badge.
  icon: string;
  // Default size as a fraction of the map's shorter side (image pixels
  // are on a uniform grid, so one scale keeps real-world aspect ratio
  // correct regardless of the map's own width/height ratio).
  widthPct: number;
  heightPct: number;
}

export const FURNITURE_CATALOG: FurnitureCatalogEntry[] = [
  { type: "bed", label: "Bed", icon: "mdi:bed", widthPct: 0.16, heightPct: 0.24 },
  { type: "sofa", label: "Sofa", icon: "mdi:sofa", widthPct: 0.28, heightPct: 0.11 },
  { type: "table", label: "Table", icon: "mdi:table-furniture", widthPct: 0.16, heightPct: 0.1 },
  { type: "desk", label: "Desk", icon: "mdi:desk", widthPct: 0.16, heightPct: 0.08 },
  { type: "chair", label: "Chair", icon: "mdi:chair-rolling", widthPct: 0.07, heightPct: 0.07 },
  { type: "wardrobe", label: "Wardrobe", icon: "mdi:wardrobe", widthPct: 0.14, heightPct: 0.06 },
  { type: "toilet", label: "Toilet", icon: "mdi:toilet", widthPct: 0.07, heightPct: 0.09 },
  { type: "sink", label: "Sink", icon: "mdi:sink", widthPct: 0.07, heightPct: 0.055 },
  { type: "bathtub", label: "Bathtub", icon: "mdi:bathtub", widthPct: 0.11, heightPct: 0.2 },
  { type: "fridge", label: "Fridge", icon: "mdi:fridge-outline", widthPct: 0.065, heightPct: 0.065 },
  {
    type: "washing_machine",
    label: "Washing Machine",
    icon: "mdi:washing-machine",
    widthPct: 0.065,
    heightPct: 0.065,
  },
  { type: "tv", label: "TV", icon: "mdi:television", widthPct: 0.14, heightPct: 0.025 },
  { type: "stairs", label: "Stairs", icon: "mdi:stairs", widthPct: 0.12, heightPct: 0.16 },
  { type: "plant", label: "Plant", icon: "mdi:flower", widthPct: 0.04, heightPct: 0.04 },
  { type: "custom", label: "Custom", icon: "mdi:shape-outline", widthPct: 0.09, heightPct: 0.09 },
];

export function getFurnitureMeta(type: FurnitureType): FurnitureCatalogEntry {
  return FURNITURE_CATALOG.find((f) => f.type === type) ?? FURNITURE_CATALOG[FURNITURE_CATALOG.length - 1];
}

export const MIN_FURNITURE_SIZE = 12;

export function normalizeAngle(deg: number): number {
  return ((deg % 360) + 360) % 360;
}

/** New furniture item, sized from the catalog default and centered on the
 *  map — offset a little per existing item of the same placement batch so
 *  adding several pieces in a row doesn't stack them exactly on top of
 *  each other. */
export function createFurnitureItem(
  type: FurnitureType,
  geo: RoomGeometry,
  existing: FurnitureItem[]
): FurnitureItem {
  const meta = getFurnitureMeta(type);
  const scale = Math.min(geo.image_width, geo.image_height);
  const width = Math.max(MIN_FURNITURE_SIZE, Math.round(meta.widthPct * scale));
  const height = Math.max(MIN_FURNITURE_SIZE, Math.round(meta.heightPct * scale));
  const offset = (existing.length % 6) * scale * 0.03;
  return {
    id: `furn_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`,
    type,
    x: Math.round(geo.image_width / 2 + offset),
    y: Math.round(geo.image_height / 2 + offset),
    width,
    height,
    rotation: 0,
  };
}

/** A top-down floorplan silhouette for one furniture type, centered on
 *  (0, 0) so callers only need to translate/rotate a wrapping <g> to the
 *  item's actual position — the same trick Tapo's own app (and most floor
 *  planners) use for furniture: simple shapes that read at a glance
 *  (headboard on a bed, backrest on a chair/sofa, tank on a toilet) rather
 *  than a generic icon dropped on a box. Must be built with the `svg`
 *  tagged template (not `html`) since these fragments have no literal
 *  <svg> ancestor of their own for the HTML parser to namespace them by —
 *  they're composed into a parent <svg> by the caller. */
export function furnitureGlyph(type: FurnitureType, w: number, h: number): SVGTemplateResult {
  const x0 = -w / 2;
  const y0 = -h / 2;
  const minDim = Math.min(w, h);

  switch (type) {
    case "bed": {
      const pillowH = h * 0.22;
      return svg`
        <rect x=${x0} y=${y0} width=${w} height=${h} rx=${minDim * 0.08} class="furn-body"></rect>
        <rect x=${x0 + w * 0.08} y=${y0 + h * 0.06} width=${w * 0.84} height=${pillowH} rx=${pillowH * 0.3} class="furn-detail"></rect>
        <line x1=${x0} y1=${y0 + h * 0.42} x2=${x0 + w} y2=${y0 + h * 0.42} class="furn-line"></line>
      `;
    }
    case "sofa": {
      const arm = w * 0.14;
      return svg`
        <rect x=${x0} y=${y0} width=${w} height=${h} rx=${h * 0.25} class="furn-body"></rect>
        <rect x=${x0} y=${y0} width=${arm} height=${h} rx=${h * 0.25} class="furn-detail"></rect>
        <rect x=${x0 + w - arm} y=${y0} width=${arm} height=${h} rx=${h * 0.25} class="furn-detail"></rect>
        <rect x=${x0 + arm * 0.6} y=${y0} width=${w - arm * 1.2} height=${h * 0.3} rx=${h * 0.1} class="furn-detail"></rect>
      `;
    }
    case "table":
      return svg`<rect x=${x0} y=${y0} width=${w} height=${h} rx=${minDim * 0.06} class="furn-body"></rect>`;
    case "desk":
      return svg`
        <rect x=${x0} y=${y0} width=${w} height=${h} rx=${minDim * 0.06} class="furn-body"></rect>
        <rect x=${x0} y=${y0} width=${w} height=${h * 0.22} class="furn-detail"></rect>
      `;
    case "chair":
      return svg`
        <rect x=${x0} y=${y0 + h * 0.18} width=${w} height=${h * 0.82} rx=${w * 0.15} class="furn-body"></rect>
        <rect x=${x0} y=${y0} width=${w} height=${h * 0.28} rx=${w * 0.15} class="furn-detail"></rect>
      `;
    case "wardrobe":
      return svg`
        <rect x=${x0} y=${y0} width=${w} height=${h} class="furn-body"></rect>
        <line x1="0" y1=${y0} x2="0" y2=${y0 + h} class="furn-line"></line>
      `;
    case "toilet": {
      const tankH = h * 0.28;
      return svg`
        <rect x=${x0} y=${y0} width=${w} height=${tankH} rx=${w * 0.1} class="furn-detail"></rect>
        <ellipse cx="0" cy=${y0 + tankH + (h - tankH) / 2} rx=${w / 2} ry=${(h - tankH) / 2} class="furn-body"></ellipse>
      `;
    }
    case "sink":
      return svg`
        <rect x=${x0} y=${y0} width=${w} height=${h} rx=${minDim * 0.2} class="furn-body"></rect>
        <ellipse cx="0" cy="0" rx=${w * 0.32} ry=${h * 0.32} class="furn-detail"></ellipse>
      `;
    case "bathtub":
      return svg`
        <rect x=${x0} y=${y0} width=${w} height=${h} rx=${minDim * 0.4} class="furn-body"></rect>
        <rect x=${x0 + w * 0.12} y=${y0 + h * 0.12} width=${w * 0.76} height=${h * 0.76} rx=${minDim * 0.3} class="furn-detail"></rect>
      `;
    case "fridge":
      return svg`
        <rect x=${x0} y=${y0} width=${w} height=${h} rx=${minDim * 0.1} class="furn-body"></rect>
        <line x1=${x0} y1=${y0 + h * 0.35} x2=${x0 + w} y2=${y0 + h * 0.35} class="furn-line"></line>
      `;
    case "washing_machine":
      return svg`
        <rect x=${x0} y=${y0} width=${w} height=${h} rx=${minDim * 0.12} class="furn-body"></rect>
        <circle cx="0" cy=${h * 0.08} r=${minDim * 0.3} class="furn-detail"></circle>
      `;
    case "tv":
      return svg`<rect x=${x0} y=${y0} width=${w} height=${h} rx=${h * 0.15} class="furn-body"></rect>`;
    case "stairs": {
      const steps = 5;
      const stepH = h / steps;
      const lines: SVGTemplateResult[] = [];
      for (let i = 1; i < steps; i++) {
        const y = y0 + stepH * i;
        lines.push(svg`<line x1=${x0} y1=${y} x2=${x0 + w} y2=${y} class="furn-line"></line>`);
      }
      return svg`
        <rect x=${x0} y=${y0} width=${w} height=${h} class="furn-body"></rect>
        ${lines}
      `;
    }
    case "plant":
      return svg`<circle cx="0" cy="0" r=${minDim / 2} class="furn-body furn-plant"></circle>`;
    default:
      return svg`<rect x=${x0} y=${y0} width=${w} height=${h} rx=${minDim * 0.08} class="furn-body"></rect>`;
  }
}
