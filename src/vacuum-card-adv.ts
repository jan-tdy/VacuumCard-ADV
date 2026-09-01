import { LitElement, html, css, PropertyValues, TemplateResult, nothing } from "lit";
import { customElement, property, state, query } from "lit/decorators.js";
import {
  HomeAssistant,
  HassEntity,
  VacuumCardConfig,
  RoomGeometry,
  RoomGeometryRoom,
} from "./types";
import { discoverEntities, DiscoveredEntities } from "./utils/hass-entities";
import { displayToNatural, resolveRoomAtPoint } from "./utils/geometry";
import { CARD_VERSION, DEFAULT_MAP_ROTATION } from "./const";

import "./vacuum-card-adv-editor";

// eslint-disable-next-line no-console
console.info(
  `%c VACUUM-CARD-ADV %c v${CARD_VERSION} `,
  "color: #0b0f14; background: #34e0d6; font-weight: 700;",
  "color: #34e0d6; background: #0b0f14; font-weight: 700;"
);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "vacuum-card-adv",
  name: "TapoVac ADV Vacuum Card",
  description: "A card for the TapoVac-ADV integration (Tapo RV30/RV50 series).",
  preview: true,
});

interface RowOptions {
  icon: string;
  title: string;
  value: string;
  percent?: number;
  gaugeColor?: string;
  overdue?: boolean;
  entityId?: string;
}

@customElement("vacuum-card-adv")
export class VacuumCardAdv extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config!: VacuumCardConfig;
  @state() private _discovered: DiscoveredEntities = { dockActions: [], sensors: [], maintenanceSensors: [] };
  @state() private _selectedRoomIds: Set<number> = new Set();
  @state() private _maintenanceOpen = false;
  @state() private _busy = false;

  @query("img.map-image") private _mapImg?: HTMLImageElement;

  private _lastDiscoveredFor?: string;

  public static getConfigElement(): HTMLElement {
    return document.createElement("vacuum-card-adv-editor");
  }

  public static getStubConfig(hass: HomeAssistant): Partial<VacuumCardConfig> {
    const firstVacuum = Object.keys(hass.states).find((id) => id.startsWith("vacuum."));
    return {
      type: "custom:vacuum-card-adv",
      vacuum: firstVacuum ?? "",
      show_map: true,
      show_controls: true,
      show_dock_actions: true,
      show_fan_speed: true,
      show_water_level: true,
      show_battery: true,
      show_sensors: true,
      show_room_names: true,
    };
  }

  public setConfig(config: VacuumCardConfig): void {
    if (!config.vacuum) {
      throw new Error("vacuum entity is required");
    }
    this._config = {
      show_map: true,
      show_controls: true,
      show_dock_actions: true,
      show_fan_speed: true,
      show_water_level: true,
      show_battery: true,
      show_sensors: true,
      show_room_names: true,
      map_rotation: DEFAULT_MAP_ROTATION,
      ...config,
    };
    // Collapsed unless the user explicitly opted out — this was inverted
    // before (open by default for everyone, contributing to a card that
    // needed scrolling to see everything on it).
    this._maintenanceOpen = config.maintenance_collapsed_default === false;
  }

  public getCardSize(): number {
    let size = 2;
    if (this._config?.show_map ?? true) size += 6;
    if (this._config?.show_sensors ?? true) size += 2;
    return size;
  }

  protected willUpdate(changed: PropertyValues): void {
    if (changed.has("hass") && this.hass && this._config?.vacuum) {
      if (this._lastDiscoveredFor !== this._config.vacuum || !changed.has("_discovered")) {
        this._discovered = discoverEntities(this.hass, this._config.vacuum);
        this._lastDiscoveredFor = this._config.vacuum;
      }
    }
  }

  private get _roomGeometry(): RoomGeometry | undefined {
    const cameraId = this._config.camera ?? this._discovered.camera;
    if (!cameraId) return undefined;
    const state = this.hass.states[cameraId];
    const geo = state?.attributes?.["room_geometry"] as RoomGeometry | undefined;
    return geo && geo.rooms ? geo : undefined;
  }

  /** Every entity on this device gets "<Device Name> <Thing>" as its
   *  friendly_name by Home Assistant convention — fine in the entity list,
   *  redundant repeated on every single row of a card that's already about
   *  that one device. Strips it back to just "<Thing>" when present. */
  private _shortTitle(fullName: string): string {
    const vacuum = this.hass.states[this._config.vacuum];
    const deviceName = vacuum?.attributes["friendly_name"] as string | undefined;
    if (deviceName && fullName.startsWith(`${deviceName} `)) {
      return fullName.slice(deviceName.length + 1);
    }
    return fullName;
  }

  protected render(): TemplateResult | typeof nothing {
    if (!this._config || !this.hass) return nothing;
    const vacuum = this.hass.states[this._config.vacuum];
    if (!vacuum) {
      return html`<ha-card><div class="warning">Entity not found: ${this._config.vacuum}</div></ha-card>`;
    }

    const name = this._config.name ?? vacuum.attributes["friendly_name"] ?? "Vacuum";
    const status = this.hass.formatEntityState?.(vacuum) ?? vacuum.state;

    return html`
      <ha-card>
        <div class="header" @click=${() => this._fireMoreInfo(this._config.vacuum)}>
          <ha-icon class="header-icon" icon="mdi:robot-vacuum"></ha-icon>
          <div class="header-text">
            <div class="name">${name}</div>
            <div class="status">${status}</div>
          </div>
        </div>
        ${(this._config.show_controls ?? true) ? this._renderControls(vacuum) : nothing}
        ${(this._config.map_position ?? "top") === "top" && (this._config.show_map ?? true)
          ? this._renderMap()
          : nothing}
        ${(this._config.show_dock_actions ?? true) ? this._renderDockActions() : nothing}
        ${this._renderSelects()}
        ${(this._config.show_battery ?? true) ? this._renderBattery() : nothing}
        ${(this._config.show_sensors ?? true) ? this._renderSensors() : nothing}
        ${(this._config.map_position ?? "top") === "bottom" && (this._config.show_map ?? true)
          ? this._renderMap()
          : nothing}
        ${this._renderMaintenance()}
      </ha-card>
    `;
  }

  // -- Controls --------------------------------------------------------------
  private _renderControls(vacuum: HassEntity): TemplateResult {
    const cleaning = vacuum.state === "cleaning";
    return html`
      <div class="section controls">
        <button class="pill" @click=${() => this._callVacuumService(cleaning ? "pause" : "start")}>
          <ha-icon icon=${cleaning ? "mdi:pause" : "mdi:play"}></ha-icon>
          <span>${cleaning ? "Pause" : "Start"}</span>
        </button>
        <button class="pill" @click=${() => this._callVacuumService("stop")}>
          <ha-icon icon="mdi:stop"></ha-icon>
          <span>Stop</span>
        </button>
        <button class="pill" @click=${() => this._callVacuumService("clean_spot")}>
          <ha-icon icon="mdi:target-variant"></ha-icon>
          <span>Spot</span>
        </button>
        <button class="pill accent" @click=${() => this._callVacuumService("return_to_base")}>
          <ha-icon icon="mdi:home-import-outline"></ha-icon>
          <span>Dock</span>
        </button>
      </div>
    `;
  }

  // -- Map ---------------------------------------------------------------
  private _renderMap(): TemplateResult | typeof nothing {
    const cameraId = this._config.camera ?? this._discovered.camera;
    if (!cameraId) return nothing;
    const camera = this.hass.states[cameraId];
    const picture = camera?.attributes?.["entity_picture"] as string | undefined;
    if (!picture) return nothing;

    const rotation = this._config.map_rotation ?? DEFAULT_MAP_ROTATION;
    const geo = this._roomGeometry;
    const rotStyle = rotation % 360 !== 0 ? `transform: rotate(${rotation}deg);` : "";

    return html`
      <div class="section map-section">
        <div class="map-wrap">
          <img class="map-image" src=${picture} style=${rotStyle} @click=${this._onMapClick} />
          ${geo ? this._renderMapOverlay(geo, rotStyle) : nothing}
        </div>
        ${!geo
          ? html`<div class="map-hint">
              Room click-to-select needs TapoVac-ADV v1.12+ (the map camera's
              <code>room_geometry</code> attribute) — update the integration via HACS, restart Home
              Assistant, then hard-refresh this browser tab.
            </div>`
          : nothing}
        ${this._selectedRoomIds.size > 0 ? this._renderSelectedRoomsBar(geo) : nothing}
      </div>
    `;
  }

  private _renderMapOverlay(geo: RoomGeometry, rotStyle: string): TemplateResult {
    return html`
      <svg
        class="map-overlay"
        style=${rotStyle}
        viewBox="0 0 ${geo.image_width} ${geo.image_height}"
        preserveAspectRatio="none"
      >
        ${geo.rooms.map((room) => this._renderRoomOverlay(room))}
      </svg>
    `;
  }

  private _renderRoomOverlay(room: RoomGeometryRoom): TemplateResult {
    const selected = this._selectedRoomIds.has(room.id);
    const polygon = this._config.room_polygons?.[String(room.id)];
    const [r, g, b] = room.color;
    const fill = selected ? `rgba(${r},${g},${b},0.55)` : "transparent";
    const stroke = selected ? `rgb(${r},${g},${b})` : "transparent";
    if (polygon && polygon.length >= 3) {
      const points = polygon.map(([x, y]) => `${x},${y}`).join(" ");
      return html`<polygon points=${points} fill=${fill} stroke=${stroke} stroke-width="3"></polygon>`;
    }
    const [x0, y0, x1, y1] = room.bbox;
    return html`<rect
      x=${x0}
      y=${y0}
      width=${x1 - x0}
      height=${y1 - y0}
      fill=${fill}
      stroke=${stroke}
      stroke-width="3"
    ></rect>`;
  }

  private _renderSelectedRoomsBar(geo?: RoomGeometry): TemplateResult {
    const names = [...this._selectedRoomIds]
      .map((id) => geo?.rooms.find((r) => r.id === id)?.name)
      .filter((n): n is string => !!n);
    return html`
      <div class="selected-rooms-bar">
        <span>${(this._config.show_room_names ?? true) ? names.join(", ") : `${names.length} room(s)`}</span>
        <button class="pill accent small" @click=${this._cleanSelectedRooms} ?disabled=${this._busy}>
          <ha-icon icon="mdi:broom"></ha-icon><span>Clean</span>
        </button>
        <button class="pill small" @click=${() => (this._selectedRoomIds = new Set())}>
          <ha-icon icon="mdi:close"></ha-icon><span>Clear</span>
        </button>
      </div>
    `;
  }

  private _onMapClick(evt: MouseEvent): void {
    const geo = this._roomGeometry;
    if (!geo || !this._mapImg) {
      // eslint-disable-next-line no-console
      console.debug(
        "[vacuum-card-adv] map click ignored: room_geometry not available on the camera entity yet"
      );
      return;
    }
    const rotation = this._config.map_rotation ?? DEFAULT_MAP_ROTATION;
    const point = displayToNatural(evt.clientX, evt.clientY, this._mapImg, rotation);
    const roomId = resolveRoomAtPoint(point, geo, this._config.room_polygons);
    if (roomId === null) {
      // eslint-disable-next-line no-console
      console.debug("[vacuum-card-adv] map click did not land inside any known room", point);
      return;
    }
    const next = new Set(this._selectedRoomIds);
    if (next.has(roomId)) next.delete(roomId);
    else next.add(roomId);
    this._selectedRoomIds = next;
  }

  private async _cleanSelectedRooms(): Promise<void> {
    const geo = this._roomGeometry;
    if (!geo || this._selectedRoomIds.size === 0) return;
    const names = [...this._selectedRoomIds]
      .map((id) => geo.rooms.find((r) => r.id === id)?.name)
      .filter((n): n is string => !!n);
    if (names.length === 0) return;
    this._busy = true;
    try {
      await this.hass.callService("tapo_rv30", "clean_rooms", {
        entity_id: this._config.vacuum,
        rooms: names,
      });
      this._selectedRoomIds = new Set();
    } finally {
      this._busy = false;
    }
  }

  // -- Dock actions ------------------------------------------------------
  private _renderDockActions(): TemplateResult | typeof nothing {
    if (this._discovered.dockActions.length === 0) return nothing;
    return html`
      <div class="section dock-actions">
        ${this._discovered.dockActions.map(
          (action) => html`
            <button class="pill" @click=${() => this._pressButton(action.entityId)}>
              <ha-icon icon=${action.icon}></ha-icon>
              <span>${action.name}</span>
            </button>
          `
        )}
      </div>
    `;
  }

  // -- Selects -------------------------------------------------------------
  private _renderSelects(): TemplateResult | typeof nothing {
    const vacuum = this.hass.states[this._config.vacuum];
    const showFan = this._config.show_fan_speed ?? true;
    const showWater = this._config.show_water_level ?? true;
    const fanSpeedList = (vacuum.attributes["fan_speed_list"] as string[] | undefined) ?? [];
    const fanSpeed = vacuum.attributes["fan_speed"] as string | undefined;
    const waterEntityId = this._config.water_level_entity ?? this._discovered.waterLevel;
    const waterEntity = waterEntityId ? this.hass.states[waterEntityId] : undefined;

    if (!(showFan && fanSpeedList.length > 0) && !(showWater && waterEntity)) return nothing;

    return html`
      <div class="section selects">
        ${showFan && fanSpeedList.length > 0
          ? html`
              <ha-select
                label="Fan speed"
                .value=${fanSpeed ?? ""}
                @selected=${(e: CustomEvent) => {
                  const next = (e.target as unknown as { value: string }).value;
                  // ha-select can re-fire "selected" when .value is set
                  // programmatically (e.g. every hass update re-applying
                  // the current fan_speed) — skip re-issuing the same
                  // service call when nothing actually changed.
                  if (next === (fanSpeed ?? "")) return;
                  this._setFanSpeed(next);
                }}
                @closed=${(e: Event) => e.stopPropagation()}
              >
                ${fanSpeedList.map((opt) => html`<mwc-list-item .value=${opt}>${opt}</mwc-list-item>`)}
              </ha-select>
            `
          : nothing}
        ${showWater && waterEntity
          ? html`
              <ha-select
                label="Water level"
                .value=${waterEntity.state}
                @selected=${(e: CustomEvent) => {
                  const next = (e.target as unknown as { value: string }).value;
                  if (next === waterEntity.state) return;
                  this._selectOption(waterEntityId as string, next);
                }}
                @closed=${(e: Event) => e.stopPropagation()}
              >
                ${(waterEntity.attributes["options"] as string[] | undefined ?? []).map(
                  (opt) => html`<mwc-list-item .value=${opt}>${opt}</mwc-list-item>`
                )}
              </ha-select>
            `
          : nothing}
      </div>
    `;
  }

  // -- Battery / sensors — slim inline rows, not boxed tiles -----------------
  private _renderRow(opts: RowOptions): TemplateResult {
    const hasGauge = opts.percent !== undefined && !Number.isNaN(opts.percent);
    return html`
      <div
        class="info-row ${opts.overdue ? "overdue" : ""} ${opts.entityId ? "clickable" : ""}"
        @click=${opts.entityId ? () => this._fireMoreInfo(opts.entityId as string) : undefined}
      >
        <ha-icon icon=${opts.icon}></ha-icon>
        <span class="info-label">${opts.title}</span>
        ${hasGauge
          ? html`<span
              class="info-bar"
              style="--pct:${Math.max(0, Math.min(100, opts.percent as number))}%; --color:${opts.gaugeColor ??
              "var(--primary-color)"}"
            ></span>`
          : nothing}
        <span class="info-value">${opts.value}</span>
      </div>
    `;
  }

  private _renderBattery(): TemplateResult | typeof nothing {
    const batteryId = this._config.battery_entity ?? this._discovered.battery;
    if (!batteryId) return nothing;
    const battery = this.hass.states[batteryId];
    if (!battery) return nothing;
    const value = Number(battery.state);
    return html`
      <div class="section sensors">
        ${this._renderRow({
          icon: this._batteryIcon(value),
          title: this._shortTitle((battery.attributes["friendly_name"] as string) ?? "Battery"),
          value: `${battery.state}%`,
          percent: value,
          gaugeColor: this._batteryColor(value),
          entityId: batteryId,
        })}
      </div>
    `;
  }

  private _batteryIcon(value: number): string {
    if (Number.isNaN(value)) return "mdi:battery-unknown";
    const step = Math.round(value / 10) * 10;
    if (step >= 100) return "mdi:battery";
    if (step <= 0) return "mdi:battery-outline";
    return `mdi:battery-${step}`;
  }

  private _batteryColor(value: number): string {
    if (Number.isNaN(value)) return "var(--disabled-text-color)";
    if (value <= 20) return "var(--error-color)";
    if (value <= 50) return "var(--warning-color)";
    return "var(--success-color)";
  }

  private _renderSensors(): TemplateResult | typeof nothing {
    const ids = this._config.sensors ?? this._discovered.sensors;
    if (!ids || ids.length === 0) return nothing;
    return html`<div class="section sensors">${ids.map((id) => this._renderSensorRow(id))}</div>`;
  }

  private _renderSensorRow(id: string): TemplateResult | typeof nothing {
    const s = this.hass.states[id];
    if (!s) return nothing;
    const title = this._shortTitle((s.attributes["friendly_name"] as string) ?? s.entity_id);
    // The Error sensor is only worth a row when there's actually something
    // wrong — showing "Error: Ok" on every single view just adds a row
    // that never says anything.
    if (title.toLowerCase() === "error" && s.state.toLowerCase() === "ok") return nothing;
    const unit = (s.attributes["unit_of_measurement"] as string) ?? "";
    const icon = (s.attributes["icon"] as string) ?? "mdi:information-outline";
    const isPercent = unit === "%";
    const percent = isPercent ? Number(s.state) : undefined;
    return this._renderRow({
      icon,
      title,
      value: `${s.state}${unit}`,
      percent: percent !== undefined && !Number.isNaN(percent) ? percent : undefined,
      overdue: !!s.attributes["overdue"],
      entityId: id,
    });
  }

  private _renderMaintenance(): TemplateResult | typeof nothing {
    const ids = this._config.maintenance_sensors ?? this._discovered.maintenanceSensors;
    if (!ids || ids.length === 0) return nothing;
    return html`
      <div class="section">
        <button class="maintenance-toggle" @click=${() => (this._maintenanceOpen = !this._maintenanceOpen)}>
          <ha-icon icon="mdi:wrench"></ha-icon>
          <span>Maintenance</span>
          <ha-icon icon=${this._maintenanceOpen ? "mdi:chevron-up" : "mdi:chevron-down"}></ha-icon>
        </button>
        ${this._maintenanceOpen
          ? html`<div class="sensors">${ids.map((id) => this._renderSensorRow(id))}</div>`
          : nothing}
      </div>
    `;
  }

  private _callVacuumService(service: string): void {
    this.hass.callService("vacuum", service, { entity_id: this._config.vacuum });
  }

  private _setFanSpeed(fanSpeed: string): void {
    if (!fanSpeed) return;
    this.hass.callService("vacuum", "set_fan_speed", {
      entity_id: this._config.vacuum,
      fan_speed: fanSpeed,
    });
  }

  private _selectOption(entityId: string, option: string): void {
    if (!option) return;
    this.hass.callService("select", "select_option", { entity_id: entityId, option });
  }

  private _pressButton(entityId: string): void {
    this.hass.callService("button", "press", { entity_id: entityId });
  }

  /** Opens Home Assistant's own more-info dialog for an entity — the same
   *  dialog tapping an entity row in any stock HA card opens. `hass-more-info`
   *  is HA frontend's standard event for this (bubbles/composed so it
   *  reaches the dashboard's listener from inside this card's shadow DOM). */
  private _fireMoreInfo(entityId: string): void {
    this.dispatchEvent(
      new CustomEvent("hass-more-info", { detail: { entityId }, bubbles: true, composed: true })
    );
  }

  static styles = css`
    :host {
      display: block;
      --vc-accent: var(--primary-color);
    }
    ha-card {
      padding: 14px 16px 16px;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .warning {
      color: var(--error-color);
      padding: 16px;
    }
    .section {
      padding: 10px 0;
      border-top: 1px solid var(--divider-color, rgba(127, 127, 127, 0.2));
    }
    .section:first-of-type {
      border-top: none;
    }
    .header {
      display: flex;
      align-items: center;
      gap: 10px;
      padding-bottom: 8px;
      cursor: pointer;
    }
    .header-icon {
      color: var(--vc-accent);
      --mdc-icon-size: 26px;
    }
    .header-text {
      display: flex;
      flex-direction: column;
      min-width: 0;
    }
    .name {
      font-size: 1.05em;
      font-weight: 600;
      letter-spacing: 0.01em;
      color: var(--primary-text-color);
    }
    .status {
      font-size: 0.85em;
      color: var(--secondary-text-color);
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }

    /* Pill buttons — icon + visible label, so nobody has to guess what a
       bare icon does. */
    .controls,
    .dock-actions {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }
    .pill {
      display: flex;
      align-items: center;
      gap: 6px;
      flex: 1 1 auto;
      justify-content: center;
      padding: 8px 10px;
      border-radius: 999px;
      border: 1px solid var(--divider-color, rgba(127, 127, 127, 0.3));
      background: transparent;
      color: var(--primary-text-color);
      font: inherit;
      font-size: 0.82em;
      cursor: pointer;
      transition: border-color 0.15s ease, color 0.15s ease;
    }
    .pill:hover {
      border-color: var(--vc-accent);
      color: var(--vc-accent);
    }
    .pill ha-icon {
      --mdc-icon-size: 18px;
    }
    .pill.accent {
      border-color: var(--vc-accent);
      color: var(--vc-accent);
    }
    .pill.small {
      padding: 4px 10px;
      flex: 0 0 auto;
    }

    /* Map */
    .map-wrap {
      position: relative;
      width: 100%;
      overflow: hidden;
      border-radius: 8px;
    }
    .map-image {
      display: block;
      width: 100%;
      height: auto;
      cursor: pointer;
    }
    .map-overlay {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
    }
    .map-hint {
      margin-top: 6px;
      font-size: 0.78em;
      color: var(--secondary-text-color);
      line-height: 1.4;
    }
    .map-hint code {
      background: var(--secondary-background-color, rgba(127, 127, 127, 0.15));
      border-radius: 4px;
      padding: 0 4px;
    }
    .selected-rooms-bar {
      display: flex;
      align-items: center;
      gap: 8px;
      justify-content: space-between;
      font-size: 0.85em;
      color: var(--secondary-text-color);
      margin-top: 8px;
    }

    /* Selects */
    .selects {
      display: flex;
      gap: 8px;
    }
    .selects ha-select {
      flex: 1;
      min-width: 100px;
    }

    /* Info rows: icon, label, thin glow gauge, monospace value — flat, not
       boxed, so a list of sensors reads as one compact panel. */
    .sensors {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .info-row {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 0.85em;
    }
    .info-row.clickable {
      cursor: pointer;
    }
    .info-row ha-icon {
      --mdc-icon-size: 18px;
      color: var(--secondary-text-color);
      flex: 0 0 auto;
    }
    .info-label {
      color: var(--secondary-text-color);
      flex: 0 1 auto;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .info-bar {
      flex: 1 1 auto;
      height: 4px;
      min-width: 24px;
      border-radius: 2px;
      background: var(--secondary-background-color, rgba(127, 127, 127, 0.2));
      position: relative;
      overflow: hidden;
    }
    .info-bar::after {
      content: "";
      position: absolute;
      inset: 0;
      width: var(--pct, 0%);
      background: var(--color, var(--vc-accent));
      border-radius: 2px;
      box-shadow: 0 0 6px 0 var(--color, var(--vc-accent));
    }
    .info-value {
      flex: 0 0 auto;
      font-family: "Roboto Mono", ui-monospace, SFMono-Regular, Menlo, monospace;
      color: var(--primary-text-color);
      min-width: 2.5em;
      text-align: right;
    }
    .info-row.overdue .info-value {
      color: var(--error-color);
      font-weight: 600;
    }

    .maintenance-toggle {
      display: flex;
      align-items: center;
      gap: 6px;
      background: none;
      border: none;
      color: var(--secondary-text-color);
      font: inherit;
      font-size: 0.85em;
      cursor: pointer;
      padding: 0 0 8px;
      width: 100%;
    }
    .maintenance-toggle ha-icon:last-child {
      margin-left: auto;
    }
  `;
}
