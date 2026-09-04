import { LitElement, html, css, TemplateResult, nothing } from "lit";
import { customElement, property, state, query } from "lit/decorators.js";
import { HomeAssistant, VacuumCardConfig, RoomGeometry, RoomPolygon, FurnitureItem, FurnitureType } from "./types";
import { discoverEntities } from "./utils/hass-entities";
import { displayToNatural, Point } from "./utils/geometry";
import { FURNITURE_CATALOG, createFurnitureItem, furnitureGlyph, getFurnitureMeta, normalizeAngle } from "./utils/furniture";

type FurnitureDragMode = "move" | "resize" | "rotate";

/** The card's own visual editor — this is what makes the card
 *  UI-configurable rather than YAML-only. In addition to the usual
 *  toggle/entity-picker settings, it includes a room-calibration tool:
 *  pick a room, click points directly on the live map to trace its
 *  outline (points connect with a live line as you go), finish to save
 *  that polygon as the room's click-region — overriding the automatic
 *  bounding box from room_geometry, which is only axis-aligned and so
 *  can overlap on L-shaped/irregular rooms. Calibration is only possible
 *  here (not on the live card) because config-changed, dispatched from
 *  an editor, is the one place Home Assistant durably persists a card's
 *  config back into the dashboard. */
@customElement("vacuum-card-adv-editor")
export class VacuumCardAdvEditor extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config!: VacuumCardConfig;

  @state() private _calibrationRoomId?: number;
  @state() private _calibrationPoints: RoomPolygon = [];

  // -- Furniture placement — mirrors this._config.furniture locally so a
  // drag in progress can re-render live without round-tripping through
  // config-changed on every pointermove (only committed at the end of a
  // drag, and immediately for add/remove/rotate-buttons). See
  // _renderFurniture() below.
  @state() private _furniture: FurnitureItem[] = [];
  @state() private _selectedFurnitureId?: string;
  @state() private _furnitureAddType: FurnitureType = "bed";
  @query("img.furniture-image") private _furnitureImg?: HTMLImageElement;

  public setConfig(config: VacuumCardConfig): void {
    this._config = config;
    this._furniture = config.furniture ?? [];
  }

  private _fireConfigChanged(config: VacuumCardConfig): void {
    this._config = config;
    this.dispatchEvent(
      new CustomEvent("config-changed", { detail: { config }, bubbles: true, composed: true })
    );
  }

  private _valueChanged(key: keyof VacuumCardConfig, value: unknown): void {
    // ha-select (and mwc-select under it) can re-fire "selected" when its
    // .value is set *programmatically* — which is exactly what happens
    // here on every re-render after config-changed updates this._config.
    // Without this guard that becomes an infinite loop: selected fires →
    // config-changed → re-render → .value assigned → selected fires again
    // → ... — freezing the editor (and the live preview card with it).
    if (this._config[key] === value) return;
    this._fireConfigChanged({ ...this._config, [key]: value });
  }

  private get _cameraId(): string | undefined {
    if (!this._config?.vacuum) return undefined;
    return this._config.camera ?? discoverEntities(this.hass, this._config.vacuum).camera;
  }

  private get _roomGeometry(): RoomGeometry | undefined {
    const cameraId = this._cameraId;
    if (!cameraId) return undefined;
    const geo = this.hass.states[cameraId]?.attributes?.["room_geometry"] as RoomGeometry | undefined;
    return geo && geo.rooms?.length ? geo : undefined;
  }

  protected render(): TemplateResult | typeof nothing {
    if (!this.hass || !this._config) return nothing;
    return html`
      <div class="section">
        <ha-entity-picker
          .hass=${this.hass}
          .value=${this._config.vacuum ?? ""}
          .includeDomains=${["vacuum"]}
          label="Vacuum entity (required)"
          @value-changed=${(e: CustomEvent) => this._valueChanged("vacuum", e.detail.value)}
        ></ha-entity-picker>
      </div>

      ${this._config.vacuum ? this._renderToggles() : nothing}
      ${this._config.vacuum && (this._config.show_map ?? true) ? this._renderRotation() : nothing}
      ${this._config.vacuum ? this._renderAdvancedEntities() : nothing}
      ${this._config.vacuum && (this._config.show_map ?? true) ? this._renderCalibration() : nothing}
      ${this._config.vacuum && (this._config.show_map ?? true) ? this._renderFurniture() : nothing}
    `;
  }

  private _renderToggles(): TemplateResult {
    const toggles: [keyof VacuumCardConfig, string][] = [
      ["show_map", "Show map"],
      ["show_room_names", "Show room names when selecting"],
      ["show_controls", "Show start/pause/stop/dock controls"],
      ["show_dock_actions", "Show dock action buttons (empty bin / wash / dry / hair)"],
      ["show_fan_speed", "Show fan speed selector"],
      ["show_water_level", "Show water level selector"],
      ["show_battery", "Show battery"],
      ["show_mop_status", "Show mop attached status"],
      ["show_sensors", "Show sensors"],
      ["show_last_updated", "Show last updated time"],
      ["show_furniture", "Show furniture on map"],
    ];
    return html`
      <div class="section toggles">
        ${toggles.map(
          ([key, label]) => html`
            <ha-formfield .label=${label}>
              <ha-switch
                .checked=${(this._config[key] as boolean | undefined) ?? true}
                @change=${(e: Event) =>
                  this._valueChanged(key, (e.target as HTMLInputElement).checked)}
              ></ha-switch>
            </ha-formfield>
          `
        )}
      </div>
    `;
  }

  private _renderRotation(): TemplateResult {
    return html`
      <div class="section map-layout">
        <ha-textfield
          label="Map rotation (degrees)"
          type="number"
          .value=${String(this._config.map_rotation ?? 0)}
          @change=${(e: Event) =>
            this._valueChanged("map_rotation", Number((e.target as HTMLInputElement).value) || 0)}
        ></ha-textfield>
        <ha-select
          label="Map position"
          fixedMenuPosition
          naturalMenuWidth
          .value=${this._config.map_position ?? "top"}
          @selected=${(e: CustomEvent) =>
            this._valueChanged(
              "map_position",
              (e.target as unknown as { value: string }).value as "top" | "bottom"
            )}
          @closed=${(e: Event) => e.stopPropagation()}
        >
          <mwc-list-item value="top">Top (after controls)</mwc-list-item>
          <mwc-list-item value="bottom">Bottom (after battery/sensors)</mwc-list-item>
        </ha-select>
      </div>
    `;
  }

  private _renderAdvancedEntities(): TemplateResult {
    return html`
      <div class="section advanced">
        <div class="section-title">Entity overrides (optional — auto-detected otherwise)</div>
        <ha-entity-picker
          .hass=${this.hass}
          .value=${this._config.camera ?? ""}
          .includeDomains=${["camera"]}
          label="Map camera"
          @value-changed=${(e: CustomEvent) => this._valueChanged("camera", e.detail.value || undefined)}
        ></ha-entity-picker>
        <ha-entity-picker
          .hass=${this.hass}
          .value=${this._config.water_level_entity ?? ""}
          .includeDomains=${["select"]}
          label="Water level select"
          @value-changed=${(e: CustomEvent) =>
            this._valueChanged("water_level_entity", e.detail.value || undefined)}
        ></ha-entity-picker>
        <ha-entity-picker
          .hass=${this.hass}
          .value=${this._config.battery_entity ?? ""}
          .includeDomains=${["sensor"]}
          label="Battery sensor"
          @value-changed=${(e: CustomEvent) =>
            this._valueChanged("battery_entity", e.detail.value || undefined)}
        ></ha-entity-picker>
        <ha-entity-picker
          .hass=${this.hass}
          .value=${this._config.mop_attached_entity ?? ""}
          .includeDomains=${["binary_sensor"]}
          label="Mop attached sensor"
          @value-changed=${(e: CustomEvent) =>
            this._valueChanged("mop_attached_entity", e.detail.value || undefined)}
        ></ha-entity-picker>
        <div class="hint">
          The full list of sensors shown, and which sensors count as "maintenance", can be
          overridden via <code>sensors</code> / <code>maintenance_sensors</code> in the YAML
          editor (switch using the ⋮ menu above) — every sensor on the device is included
          automatically otherwise.
        </div>
      </div>
    `;
  }

  private _renderCalibration(): TemplateResult {
    const geo = this._roomGeometry;
    const cameraId = this._cameraId;
    const picture = cameraId ? (this.hass.states[cameraId]?.attributes?.["entity_picture"] as string) : undefined;

    return html`
      <div class="section">
        <div class="section-title">Room calibration</div>
        <div class="hint">
          Rooms already work out of the box using an automatically-detected rectangle. Use this
          only if a room's shape is irregular and the automatic click area feels wrong: pick a
          room, click points on the map below to trace its actual outline (points connect live),
          then finish to save it.
        </div>
        ${!geo || !picture
          ? html`<div class="hint">Map not available yet — open a dashboard with this vacuum first.</div>`
          : html`
              <ha-select
                label="Room to calibrate"
                fixedMenuPosition
                naturalMenuWidth
                .value=${this._calibrationRoomId !== undefined ? String(this._calibrationRoomId) : ""}
                @selected=${(e: CustomEvent) => {
                  const id = Number((e.target as unknown as { value: string }).value);
                  const next = Number.isNaN(id) ? undefined : id;
                  // Same re-fire-on-programmatic-.value risk as elsewhere
                  // in this editor — see the guard in _valueChanged.
                  if (next === this._calibrationRoomId) return;
                  this._calibrationRoomId = next;
                  this._calibrationPoints = [];
                }}
                @closed=${(e: Event) => e.stopPropagation()}
              >
                ${geo.rooms.map(
                  (r) => html`<mwc-list-item .value=${String(r.id)}>${r.name}</mwc-list-item>`
                )}
              </ha-select>

              ${this._calibrationRoomId !== undefined
                ? html`
                    <div class="map-wrap">
                      <img
                        class="calib-image"
                        src=${picture}
                        @click=${this._onCalibrationClick}
                      />
                      <svg
                        class="map-overlay"
                        viewBox="0 0 ${geo.image_width} ${geo.image_height}"
                        preserveAspectRatio="none"
                      >
                        ${this._renderCalibrationOverlay(geo)}
                      </svg>
                    </div>
                    <div class="calib-actions">
                      <mwc-button
                        @click=${this._finishCalibration}
                        ?disabled=${this._calibrationPoints.length < 3}
                        >Finish polygon</mwc-button
                      >
                      <mwc-button @click=${() => (this._calibrationPoints = [])}
                        >Clear points</mwc-button
                      >
                      <mwc-button @click=${this._deleteCalibration}>Delete saved calibration</mwc-button>
                    </div>
                  `
                : nothing}
            `}
      </div>
    `;
  }

  private _renderCalibrationOverlay(geo: RoomGeometry): TemplateResult {
    const roomId = this._calibrationRoomId;
    const room = geo.rooms.find((r) => r.id === roomId);
    const saved = roomId !== undefined ? this._config.room_polygons?.[String(roomId)] : undefined;

    const savedEl =
      saved && saved.length >= 3
        ? html`<polygon
            points=${saved.map(([x, y]) => `${x},${y}`).join(" ")}
            fill="rgba(3,169,244,0.25)"
            stroke="rgb(3,169,244)"
            stroke-width="3"
          ></polygon>`
        : nothing;

    const bboxEl = room
      ? html`<rect
          x=${room.bbox[0]}
          y=${room.bbox[1]}
          width=${room.bbox[2] - room.bbox[0]}
          height=${room.bbox[3] - room.bbox[1]}
          fill="none"
          stroke="rgba(255,255,255,0.6)"
          stroke-dasharray="6,4"
          stroke-width="2"
        ></rect>`
      : nothing;

    const liveEl =
      this._calibrationPoints.length > 0
        ? html`
            <polyline
              points=${this._calibrationPoints.map(([x, y]) => `${x},${y}`).join(" ")}
              fill="none"
              stroke="rgb(255,152,0)"
              stroke-width="3"
            ></polyline>
            ${this._calibrationPoints.map(
              ([x, y]) => html`<circle cx=${x} cy=${y} r="5" fill="rgb(255,152,0)"></circle>`
            )}
          `
        : nothing;

    return html`${bboxEl}${savedEl}${liveEl}`;
  }

  private _onCalibrationClick(evt: MouseEvent): void {
    const img = evt.currentTarget as HTMLImageElement;
    // Calibration always traces the map as displayed (unrotated) here —
    // rotation is a display-only concern applied on the live card, not
    // something calibration needs to account for, since points are
    // stored in the same unrotated natural-image space room_geometry
    // uses.
    const point = displayToNatural(evt.clientX, evt.clientY, img, 0);
    this._calibrationPoints = [...this._calibrationPoints, [Math.round(point.x), Math.round(point.y)]];
  }

  private _finishCalibration(): void {
    if (this._calibrationRoomId === undefined || this._calibrationPoints.length < 3) return;
    const roomPolygons = { ...(this._config.room_polygons ?? {}) };
    roomPolygons[String(this._calibrationRoomId)] = this._calibrationPoints;
    this._calibrationPoints = [];
    this._valueChanged("room_polygons", roomPolygons);
  }

  private _deleteCalibration(): void {
    if (this._calibrationRoomId === undefined || !this._config.room_polygons) return;
    const roomPolygons = { ...this._config.room_polygons };
    delete roomPolygons[String(this._calibrationRoomId)];
    this._calibrationPoints = [];
    this._valueChanged("room_polygons", roomPolygons);
  }

  // -- Furniture ---------------------------------------------------------
  // Place furniture (bed, sofa, table, chair, toilet, desk, …) directly on
  // the map: pick a type and click "Add", then drag its body to move it,
  // the top handle to rotate, and the corner handle to resize. Positions
  // are stored in the same natural-image pixel space as room_geometry and
  // calibrated room polygons, so furniture holds still across map
  // refreshes the same way those do.
  private _renderFurniture(): TemplateResult {
    const geo = this._roomGeometry;
    const cameraId = this._cameraId;
    const picture = cameraId ? (this.hass.states[cameraId]?.attributes?.["entity_picture"] as string) : undefined;
    const selected = this._furniture.find((f) => f.id === this._selectedFurnitureId);

    return html`
      <div class="section">
        <div class="section-title">Furniture</div>
        <div class="hint">
          Furniture placed in the official Tapo app can't be read into Home Assistant (see the
          TapoVac-ADV README) — place it here instead: pick a type, click "Add", then drag its
          body to move it, the top handle to rotate, and the corner handle to resize.
        </div>
        <div class="furniture-add-row">
          <ha-select
            label="Furniture type"
            fixedMenuPosition
            naturalMenuWidth
            .value=${this._furnitureAddType}
            @selected=${(e: CustomEvent) =>
              (this._furnitureAddType = (e.target as unknown as { value: string }).value as FurnitureType)}
            @closed=${(e: Event) => e.stopPropagation()}
          >
            ${FURNITURE_CATALOG.map(
              (f) => html`<mwc-list-item .value=${f.type}><ha-icon icon=${f.icon}></ha-icon> ${f.label}</mwc-list-item>`
            )}
          </ha-select>
          <mwc-button raised @click=${this._addFurniture} ?disabled=${!geo}>
            <ha-icon icon="mdi:plus"></ha-icon>
            Add
          </mwc-button>
        </div>

        ${!geo || !picture
          ? html`<div class="hint">Map not available yet — open a dashboard with this vacuum first.</div>`
          : html`
              <div class="map-wrap">
                <img class="furniture-image" src=${picture} />
                ${this._renderFurnitureOverlay(geo)}
              </div>
            `}
        ${selected ? this._renderFurnitureToolbar(selected) : nothing}
        ${this._furniture.length > 0 ? this._renderFurnitureList() : nothing}
      </div>
    `;
  }

  private _renderFurnitureOverlay(geo: RoomGeometry): TemplateResult {
    return html`
      <svg
        class="map-overlay furniture-overlay"
        viewBox="0 0 ${geo.image_width} ${geo.image_height}"
        preserveAspectRatio="none"
      >
        <rect
          x="0"
          y="0"
          width=${geo.image_width}
          height=${geo.image_height}
          class="furniture-bg-catcher"
          @pointerdown=${() => (this._selectedFurnitureId = undefined)}
        ></rect>
        ${this._furniture.map((item) => this._renderEditableFurnitureItem(item))}
      </svg>
    `;
  }

  private _renderEditableFurnitureItem(item: FurnitureItem): TemplateResult {
    const selected = this._selectedFurnitureId === item.id;
    const handleR = Math.max(8, Math.min(item.width, item.height) * 0.12);
    return html`
      <g
        class="furniture-item ${selected ? "selected" : ""}"
        transform="translate(${item.x} ${item.y}) rotate(${item.rotation})"
        @pointerdown=${(e: PointerEvent) => this._startFurnitureDrag(e, item.id, "move")}
      >
        ${furnitureGlyph(item.type, item.width, item.height)}
        ${selected
          ? html`
              <line
                x1="0"
                y1=${-item.height / 2}
                x2="0"
                y2=${-item.height / 2 - 22}
                class="handle-line"
              ></line>
              <circle
                cx="0"
                cy=${-item.height / 2 - 22}
                r=${handleR}
                class="handle rotate-handle"
                @pointerdown=${(e: PointerEvent) => this._startFurnitureDrag(e, item.id, "rotate")}
              ></circle>
              <circle
                cx=${item.width / 2}
                cy=${item.height / 2}
                r=${handleR}
                class="handle resize-handle"
                @pointerdown=${(e: PointerEvent) => this._startFurnitureDrag(e, item.id, "resize")}
              ></circle>
            `
          : nothing}
      </g>
    `;
  }

  private _renderFurnitureToolbar(item: FurnitureItem): TemplateResult {
    return html`
      <div class="furniture-toolbar">
        <ha-icon icon=${getFurnitureMeta(item.type).icon}></ha-icon>
        <span>${getFurnitureMeta(item.type).label}</span>
        <mwc-icon-button @click=${() => this._rotateFurniture(item.id, -15)} title="Rotate left 15°">
          <ha-icon icon="mdi:rotate-left"></ha-icon>
        </mwc-icon-button>
        <span class="rotation-value">${Math.round(item.rotation)}°</span>
        <mwc-icon-button @click=${() => this._rotateFurniture(item.id, 15)} title="Rotate right 15°">
          <ha-icon icon="mdi:rotate-right"></ha-icon>
        </mwc-icon-button>
        <mwc-icon-button @click=${() => this._removeFurniture(item.id)} title="Delete">
          <ha-icon icon="mdi:delete"></ha-icon>
        </mwc-icon-button>
      </div>
    `;
  }

  private _renderFurnitureList(): TemplateResult {
    return html`
      <div class="furniture-list">
        ${this._furniture.map((item) => {
          const meta = getFurnitureMeta(item.type);
          return html`
            <div
              class="furniture-list-row ${this._selectedFurnitureId === item.id ? "selected" : ""}"
              @click=${() => (this._selectedFurnitureId = item.id)}
            >
              <ha-icon icon=${meta.icon}></ha-icon>
              <span>${meta.label}</span>
              <mwc-icon-button
                @click=${(e: Event) => {
                  e.stopPropagation();
                  this._removeFurniture(item.id);
                }}
                title="Delete"
              >
                <ha-icon icon="mdi:delete"></ha-icon>
              </mwc-icon-button>
            </div>
          `;
        })}
      </div>
    `;
  }

  private _addFurniture(): void {
    const geo = this._roomGeometry;
    if (!geo) return;
    const item = createFurnitureItem(this._furnitureAddType, geo, this._furniture);
    this._furniture = [...this._furniture, item];
    this._selectedFurnitureId = item.id;
    this._commitFurniture();
  }

  private _removeFurniture(id: string): void {
    this._furniture = this._furniture.filter((f) => f.id !== id);
    if (this._selectedFurnitureId === id) this._selectedFurnitureId = undefined;
    this._commitFurniture();
  }

  private _rotateFurniture(id: string, delta: number): void {
    this._furniture = this._furniture.map((f) =>
      f.id === id ? { ...f, rotation: normalizeAngle(f.rotation + delta) } : f
    );
    this._commitFurniture();
  }

  private _commitFurniture(): void {
    this._valueChanged("furniture", this._furniture);
  }

  /** Starts a drag on a furniture item's body (move), rotate handle, or
   *  resize handle — all three share the same pointer-capture lifecycle,
   *  only the per-move math in _applyFurnitureDrag differs. Coordinates
   *  are computed the same way calibration does: unrotated natural-image
   *  pixel space (furniture placement doesn't need to account for the
   *  live card's display-only map_rotation, same reasoning as
   *  calibration). */
  private _startFurnitureDrag(evt: PointerEvent, id: string, mode: FurnitureDragMode): void {
    evt.stopPropagation();
    evt.preventDefault();
    const img = this._furnitureImg;
    const itemStart = this._furniture.find((f) => f.id === id);
    if (!img || !itemStart) return;

    this._selectedFurnitureId = id;
    const target = evt.currentTarget as SVGElement;
    target.setPointerCapture(evt.pointerId);
    const startPoint = displayToNatural(evt.clientX, evt.clientY, img, 0);

    const onMove = (moveEvt: PointerEvent) => {
      const point = displayToNatural(moveEvt.clientX, moveEvt.clientY, img, 0);
      this._applyFurnitureDrag(id, mode, itemStart, startPoint, point);
    };
    const onUp = () => {
      target.removeEventListener("pointermove", onMove);
      target.removeEventListener("pointerup", onUp);
      target.removeEventListener("pointercancel", onUp);
      this._commitFurniture();
    };
    target.addEventListener("pointermove", onMove);
    target.addEventListener("pointerup", onUp);
    target.addEventListener("pointercancel", onUp);
  }

  private _applyFurnitureDrag(
    id: string,
    mode: FurnitureDragMode,
    start: FurnitureItem,
    startPoint: Point,
    current: Point
  ): void {
    this._furniture = this._furniture.map((f) => {
      if (f.id !== id) return f;

      if (mode === "move") {
        return { ...f, x: start.x + (current.x - startPoint.x), y: start.y + (current.y - startPoint.y) };
      }

      if (mode === "rotate") {
        // The rotate handle sits due "north" of the item's center at
        // rotation 0, so the angle from center to pointer is offset by
        // +90° from atan2's own zero (pointing "east").
        const angle = (Math.atan2(current.y - start.y, current.x - start.x) * 180) / Math.PI + 90;
        return { ...f, rotation: Math.round(normalizeAngle(angle)) };
      }

      // resize: project the pointer into the item's own unrotated local
      // frame (undo start.rotation around its center), then the corner
      // handle's distance from center in that frame is exactly half the
      // new width/height.
      const rad = (-start.rotation * Math.PI) / 180;
      const dx = current.x - start.x;
      const dy = current.y - start.y;
      const localX = dx * Math.cos(rad) - dy * Math.sin(rad);
      const localY = dx * Math.sin(rad) + dy * Math.cos(rad);
      return {
        ...f,
        width: Math.max(12, Math.round(Math.abs(localX) * 2)),
        height: Math.max(12, Math.round(Math.abs(localY) * 2)),
      };
    });
  }

  static styles = css`
    .section {
      display: flex;
      flex-direction: column;
      gap: 12px;
      padding: 12px 0;
      border-top: 1px solid var(--divider-color);
    }
    .section:first-child {
      border-top: none;
    }
    .section-title {
      font-weight: 500;
      color: var(--primary-text-color);
    }
    .toggles {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4px;
    }
    .map-layout {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }
    .map-layout ha-textfield,
    .map-layout ha-select {
      flex: 1;
      min-width: 160px;
    }
    .hint {
      font-size: 0.85em;
      color: var(--secondary-text-color);
    }
    .map-wrap {
      position: relative;
      width: 100%;
    }
    .calib-image {
      display: block;
      width: 100%;
      height: auto;
      cursor: crosshair;
    }
    .map-overlay {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
    }
    .calib-actions {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }

    /* Furniture */
    .furniture-add-row {
      display: flex;
      gap: 8px;
      align-items: center;
    }
    .furniture-add-row ha-select {
      flex: 1;
      min-width: 160px;
    }
    .furniture-image {
      display: block;
      width: 100%;
      height: auto;
    }
    .furniture-overlay {
      pointer-events: auto;
    }
    .furniture-bg-catcher {
      fill: transparent;
      pointer-events: all;
    }
    .furniture-item {
      cursor: move;
      touch-action: none;
    }
    .furniture-item .furn-body {
      fill: rgba(141, 110, 99, 0.55);
      stroke: #8d6e63;
      stroke-width: 2;
    }
    .furniture-item .furn-detail {
      fill: rgba(93, 64, 55, 0.65);
      stroke: none;
    }
    .furniture-item .furn-line {
      stroke: #5d4037;
      stroke-width: 1.5;
    }
    .furniture-item .furn-plant {
      fill: rgba(76, 175, 80, 0.55);
      stroke: #4caf50;
    }
    .furniture-item.selected .furn-body {
      stroke: var(--primary-color);
      stroke-width: 3;
    }
    .handle-line {
      stroke: var(--primary-color);
      stroke-width: 1.5;
      stroke-dasharray: 3, 3;
    }
    .handle {
      fill: var(--primary-color);
      stroke: var(--card-background-color, #fff);
      stroke-width: 2;
      touch-action: none;
    }
    .rotate-handle {
      cursor: grab;
    }
    .resize-handle {
      cursor: nwse-resize;
    }
    .furniture-toolbar {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 0.9em;
      color: var(--primary-text-color);
    }
    .furniture-toolbar span {
      margin-right: 4px;
    }
    .furniture-toolbar .rotation-value {
      min-width: 2.5em;
      text-align: center;
      font-family: "Roboto Mono", ui-monospace, SFMono-Regular, Menlo, monospace;
    }
    .furniture-list {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .furniture-list-row {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 4px 8px;
      border-radius: 8px;
      cursor: pointer;
    }
    .furniture-list-row span {
      flex: 1;
    }
    .furniture-list-row.selected {
      background: var(--secondary-background-color, rgba(127, 127, 127, 0.15));
    }
  `;
}
