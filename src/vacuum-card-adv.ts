import { LitElement, html, css, PropertyValues, TemplateResult, nothing } from "lit";
import { customElement, property, state, query } from "lit/decorators.js";
import {
  HomeAssistant,
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
  "color: white; background: #03a9f4; font-weight: 700;",
  "color: #03a9f4; background: white; font-weight: 700;"
);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "vacuum-card-adv",
  name: "TapoVac ADV Vacuum Card",
  description: "A card for the TapoVac-ADV integration (Tapo RV30/RV50 series).",
  preview: true,
});

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
    this._maintenanceOpen = !!config.maintenance_collapsed_default === false;
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

  protected render(): TemplateResult | typeof nothing {
    if (!this._config || !this.hass) return nothing;
    const vacuum = this.hass.states[this._config.vacuum];
    if (!vacuum) {
      return html`<ha-card
        ><div class="warning">Entity not found: ${this._config.vacuum}</div></ha-card
      >`;
    }

    const name = this._config.name ?? vacuum.attributes["friendly_name"] ?? "Vacuum";
    const status = this.hass.formatEntityState?.(vacuum) ?? vacuum.state;

    return html`
      <ha-card>
        <div class="header">
          <div class="name">${name}</div>
          <div class="status">${status}</div>
        </div>
        ${(this._config.show_map ?? true) ? this._renderMap() : nothing}
        ${(this._config.show_controls ?? true) ? this._renderControls() : nothing}
        ${(this._config.show_dock_actions ?? true) ? this._renderDockActions() : nothing}
        ${this._renderSelects()}
        ${(this._config.show_battery ?? true) ? this._renderBattery() : nothing}
        ${(this._config.show_sensors ?? true) ? this._renderSensors() : nothing}
        ${this._renderMaintenance()}
      </ha-card>
    `;
  }

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
      <div class="map-wrap">
        <img
          class="map-image"
          src=${picture}
          style=${rotStyle}
          @click=${this._onMapClick}
          @load=${() => this.requestUpdate()}
        />
        ${geo ? this._renderMapOverlay(geo, rotStyle) : nothing}
      </div>
      ${this._selectedRoomIds.size > 0 ? this._renderSelectedRoomsBar(geo) : nothing}
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
      return html`<polygon
        points=${points}
        fill=${fill}
        stroke=${stroke}
        stroke-width="3"
      ></polygon>`;
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
        <mwc-button @click=${this._cleanSelectedRooms} ?disabled=${this._busy}>
          Clean
        </mwc-button>
        <mwc-button @click=${() => (this._selectedRoomIds = new Set())}>Clear</mwc-button>
      </div>
    `;
  }

  private _onMapClick(evt: MouseEvent): void {
    const geo = this._roomGeometry;
    if (!geo || !this._mapImg) return;
    const rotation = this._config.map_rotation ?? DEFAULT_MAP_ROTATION;
    const point = displayToNatural(evt.clientX, evt.clientY, this._mapImg, rotation);
    const roomId = resolveRoomAtPoint(point, geo, this._config.room_polygons);
    if (roomId === null) return;
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

  private _renderControls(): TemplateResult {
    const vacuum = this.hass.states[this._config.vacuum];
    const cleaning = vacuum.state === "cleaning";
    return html`
      <div class="controls">
        <ha-icon-button
          .path=${cleaning ? PAUSE_PATH : PLAY_PATH}
          @click=${() => this._callVacuumService(cleaning ? "pause" : "start")}
        ></ha-icon-button>
        <ha-icon-button .path=${STOP_PATH} @click=${() => this._callVacuumService("stop")}></ha-icon-button>
        <ha-icon-button
          .path=${SPOT_PATH}
          @click=${() => this._callVacuumService("clean_spot")}
        ></ha-icon-button>
        <ha-icon-button
          .path=${HOME_PATH}
          @click=${() => this._callVacuumService("return_to_base")}
        ></ha-icon-button>
      </div>
    `;
  }

  private _renderDockActions(): TemplateResult | typeof nothing {
    if (this._discovered.dockActions.length === 0) return nothing;
    return html`
      <div class="dock-actions">
        ${this._discovered.dockActions.map(
          (action) => html`
            <mwc-button
              icon=${action.icon}
              @click=${() => this._pressButton(action.entityId)}
              title=${action.name}
            >
              ${action.name}
            </mwc-button>
          `
        )}
      </div>
    `;
  }

  private _renderSelects(): TemplateResult | typeof nothing {
    const vacuum = this.hass.states[this._config.vacuum];
    const showFan = this._config.show_fan_speed ?? true;
    const showWater = this._config.show_water_level ?? true;
    const fanSpeedList = (vacuum.attributes["fan_speed_list"] as string[] | undefined) ?? [];
    const fanSpeed = vacuum.attributes["fan_speed"] as string | undefined;
    const waterEntityId = this._config.water_level_entity ?? this._discovered.waterLevel;
    const waterEntity = waterEntityId ? this.hass.states[waterEntityId] : undefined;

    if (!showFan && !showWater) return nothing;

    return html`
      <div class="selects">
        ${showFan && fanSpeedList.length > 0
          ? html`
              <ha-select
                label="Fan speed"
                .value=${fanSpeed ?? ""}
                @selected=${(e: CustomEvent) => this._setFanSpeed((e.target as unknown as { value: string }).value)}
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
                @selected=${(e: CustomEvent) =>
                  this._selectOption(waterEntityId as string, (e.target as unknown as { value: string }).value)}
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

  private _renderBattery(): TemplateResult | typeof nothing {
    const batteryId = this._config.battery_entity ?? this._discovered.battery;
    if (!batteryId) return nothing;
    const battery = this.hass.states[batteryId];
    if (!battery) return nothing;
    const value = Number(battery.state);
    return html`
      <div class="battery">
        <ha-icon icon=${this._batteryIcon(value)}></ha-icon>
        <span>${battery.state}%</span>
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

  private _renderSensors(): TemplateResult | typeof nothing {
    const ids = this._config.sensors ?? this._discovered.sensors;
    if (!ids || ids.length === 0) return nothing;
    return html`
      <div class="sensors">
        ${ids.map((id) => {
          const s = this.hass.states[id];
          if (!s) return nothing;
          const label = s.attributes["friendly_name"] ?? id;
          return html`
            <div class="sensor-row">
              <span class="sensor-label">${label}</span>
              <span class="sensor-value">${s.state}${s.attributes["unit_of_measurement"] ?? ""}</span>
            </div>
          `;
        })}
      </div>
    `;
  }

  private _renderMaintenance(): TemplateResult | typeof nothing {
    const ids = this._config.maintenance_sensors ?? this._discovered.maintenanceSensors;
    if (!ids || ids.length === 0) return nothing;
    return html`
      <div class="maintenance">
        <button class="maintenance-toggle" @click=${() => (this._maintenanceOpen = !this._maintenanceOpen)}>
          <ha-icon icon=${this._maintenanceOpen ? "mdi:chevron-up" : "mdi:chevron-down"}></ha-icon>
          Maintenance
        </button>
        ${this._maintenanceOpen
          ? html`
              <div class="sensors">
                ${ids.map((id) => {
                  const s = this.hass.states[id];
                  if (!s) return nothing;
                  const label = s.attributes["friendly_name"] ?? id;
                  const overdue = !!s.attributes["overdue"];
                  return html`
                    <div class="sensor-row ${overdue ? "overdue" : ""}">
                      <span class="sensor-label">${label}</span>
                      <span class="sensor-value">${s.state}${s.attributes["unit_of_measurement"] ?? ""}</span>
                    </div>
                  `;
                })}
              </div>
            `
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

  static styles = css`
    :host {
      display: block;
    }
    ha-card {
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .warning {
      color: var(--error-color);
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
    }
    .name {
      font-size: 1.2em;
      font-weight: 500;
      color: var(--primary-text-color);
    }
    .status {
      color: var(--secondary-text-color);
      text-transform: capitalize;
    }
    .map-wrap {
      position: relative;
      width: 100%;
      overflow: hidden;
      border-radius: var(--ha-card-border-radius, 12px);
      background: var(--card-background-color);
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
    .selected-rooms-bar {
      display: flex;
      align-items: center;
      gap: 8px;
      justify-content: space-between;
      font-size: 0.9em;
      color: var(--secondary-text-color);
    }
    .controls,
    .dock-actions {
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
      justify-content: space-around;
    }
    .selects {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }
    .selects ha-select {
      flex: 1;
      min-width: 120px;
    }
    .battery {
      display: flex;
      align-items: center;
      gap: 6px;
      color: var(--secondary-text-color);
    }
    .sensors {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .sensor-row {
      display: flex;
      justify-content: space-between;
      font-size: 0.9em;
    }
    .sensor-row.overdue .sensor-value {
      color: var(--error-color);
      font-weight: 600;
    }
    .sensor-label {
      color: var(--secondary-text-color);
    }
    .maintenance-toggle {
      display: flex;
      align-items: center;
      gap: 4px;
      background: none;
      border: none;
      color: var(--primary-text-color);
      font: inherit;
      cursor: pointer;
      padding: 4px 0;
    }
  `;
}

// mdi path data for the primary control icons — kept local so this card
// doesn't need to pull in an icon font just for four glyphs.
const PLAY_PATH = "M8,5.14V19.14L19,12.14L8,5.14Z";
const PAUSE_PATH = "M14,19H18V5H14M6,19H10V5H6V19Z";
const STOP_PATH = "M18,18H6V6H18V18Z";
const HOME_PATH = "M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z";
const SPOT_PATH =
  "M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12,8A4,4 0 0,0 8,12A4,4 0 0,0 12,16A4,4 0 0,0 16,12A4,4 0 0,0 12,8Z";
