import { LitElement, html, css, TemplateResult, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { HomeAssistant, VacuumCardConfig, RoomGeometry, RoomPolygon } from "./types";
import { discoverEntities } from "./utils/hass-entities";
import { displayToNatural } from "./utils/geometry";

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

  public setConfig(config: VacuumCardConfig): void {
    this._config = config;
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
  `;
}
