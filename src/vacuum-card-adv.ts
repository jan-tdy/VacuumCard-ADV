import { LitElement, html, svg, css, PropertyValues, TemplateResult, SVGTemplateResult, nothing } from "lit";
import { customElement, property, state, query } from "lit/decorators.js";
import {
  HomeAssistant,
  HassEntity,
  VacuumCardConfig,
  VacuumBrand,
  DreameRoom,
  RoomGeometry,
  RoomGeometryRoom,
  RoomPolygon,
  RoomPreset,
  TapoMapGeometry,
} from "./types";
import {
  cacheBustedPicture,
  detectVacuumBrand,
  discoverDreameRooms,
  discoverEntities,
  getDeviceEntityIds,
  DiscoveredEntities,
} from "./utils/hass-entities";
import { currentMapKey, displayToNatural, resolveRoomAtPoint, resolveRoomGeometry, scopedRoomPolygons } from "./utils/geometry";
import { furnitureGlyph, getFurniturePalette } from "./utils/furniture";
import { renderSelectField } from "./utils/ha-form";
import {
  CARD_VERSION,
  CLEANING_STATES,
  DEFAULT_MAP_ROTATION,
  TRACE_MAX_POINTS,
  VACUUM_FEATURE_CLEAN_SPOT,
  VACUUM_FEATURE_PAUSE,
  VACUUM_FEATURE_RETURN_HOME,
  VACUUM_FEATURE_STOP,
} from "./const";

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
  // Selected rooms for the Dreame chip-list selector (see
  // _renderDreameRooms()) — kept separate from _selectedRoomIds above
  // since the two brands identify rooms differently (TapoVac-ADV room ids
  // come from room_geometry; Dreame segment ids come from the vacuum
  // entity's own "rooms" attribute) and are never both in play at once.
  @state() private _selectedDreameSegmentIds: Set<number> = new Set();
  @state() private _maintenanceOpen = false;
  @state() private _schedulesOpen = false;
  @state() private _busy = false;
  // Experimental trace trail (see VacuumCardConfig.show_trace) — kept as
  // in-memory-only render state, never persisted into config: it's a live
  // view of the current/last cleaning run, not something to save/restore.
  @state() private _trace: [number, number][] = [];
  @state() private _remoteDriving = false;
  @state() private _showLastCleanMap = false;
  @state() private _mapMode: "rooms" | "goto" = "rooms";
  @state() private _newScheduleTime = "08:00";
  @state() private _newScheduleDays = new Set(["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]);
  @state() private _editingScheduleId?: string | number;

  @query("img.map-image") private _mapImg?: HTMLImageElement;

  private _lastDiscoveredFor?: string;
  private _freshnessTimer?: ReturnType<typeof setInterval>;
  private _lastDiscoveredEntityIds?: string;
  private _lastVacuumStateForTrace?: string;
  // Tracks which Dreame map _selectedDreameSegmentIds was picked on (see
  // willUpdate()) — a plain string, not a boolean, so the very first
  // update (no prior map to compare against) never wrongly clears a
  // selection that was just set.
  private _lastDreameSelectedMapFor?: string;
  // Same idea for _selectedRoomIds (the room_geometry-based selector used
  // by TapoVac-ADV-style integrations): tracks which floor/map (see
  // currentMapKey() in geometry.ts) the selection was made on, undefined
  // until room_geometry is first seen so the initial update never clears a
  // selection that was just set.
  private _lastRoomMapKeyFor?: string;

  connectedCallback(): void {
    super.connectedCallback();
    this._freshnessTimer = setInterval(() => this.requestUpdate(), 30_000);
  }

  disconnectedCallback(): void {
    if (this._freshnessTimer !== undefined) clearInterval(this._freshnessTimer);
    this._freshnessTimer = undefined;
    super.disconnectedCallback();
  }

  public static getConfigElement(): HTMLElement {
    return document.createElement("vacuum-card-adv-editor");
  }

  public static getStubConfig(hass: HomeAssistant): Partial<VacuumCardConfig> {
    const firstVacuum = Object.keys(hass.states).find((id) => id.startsWith("vacuum."));
    return {
      type: "custom:vacuum-card-adv",
      vacuum: firstVacuum ?? "",
      show_map: true,
      show_remote_drive: true,
      show_last_clean_map: true,
      show_schedules: true,
      show_controls: true,
      show_dock_actions: true,
      show_fan_speed: true,
      show_water_level: true,
      show_battery: true,
      show_sensors: true,
      show_mop_status: true,
      show_room_names: true,
      show_last_updated: true,
      show_furniture: true,
      furniture_opacity: 100,
      furniture_color: "brown",
    };
  }

  public setConfig(config: VacuumCardConfig): void {
    if (!config.vacuum) {
      throw new Error("vacuum entity is required");
    }
    this._config = {
      show_map: true,
      show_remote_drive: true,
      show_last_clean_map: true,
      show_schedules: true,
      show_controls: true,
      show_dock_actions: true,
      show_fan_speed: true,
      show_water_level: true,
      show_battery: true,
      show_sensors: true,
      show_mop_status: true,
      show_room_names: true,
      show_last_updated: true,
      show_furniture: true,
      furniture_opacity: 100,
      furniture_color: "brown",
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
    // Only re-run entity discovery when the configured vacuum actually
    // changes — hass updates on *any* state change system-wide, often
    // several times a second, and recomputing (and reassigning a brand
    // new _discovered object reference, forcing an extra render) on every
    // single one of those was pure waste.
    if (changed.has("hass") && this.hass && this._config?.vacuum) {
      // Keyed by vacuum *and* brand (not just vacuum) — switching
      // vacuum_brand in the editor without changing the vacuum entity
      // must still re-run discovery, or dock actions/water-level naming
      // from the previous brand would linger in _discovered.
      const brand = this._brand;
      const discoveryKey = `${this._config.vacuum}|${brand}`;
      // The entity registry may be populated after the card's first hass
      // update, or change after an integration reload or entity rename. Track
      // this vacuum's actual registry IDs so same-size replacements are seen.
      const discoveryEntityIds = getDeviceEntityIds(this.hass, this._config.vacuum).sort().join("|");
      if (
        this._lastDiscoveredFor !== discoveryKey ||
        this._lastDiscoveredEntityIds !== discoveryEntityIds
      ) {
        this._discovered = discoverEntities(this.hass, this._config.vacuum, brand);
        this._lastDiscoveredFor = discoveryKey;
        this._lastDiscoveredEntityIds = discoveryEntityIds;
      }

      // Same idea for Dreame's room-chip selection: a stale segment id
      // from a map the vacuum has since switched away from (or a
      // different vacuum entity picked in the editor) would otherwise
      // still be sent to dreame_vacuum.vacuum_clean_segment, which can
      // fail instead of cleaning the rooms actually shown as selected.
      const selectedMap = this.hass.states[this._config.vacuum]?.attributes?.["selected_map"] as
        | string
        | undefined;
      const dreameMapKey = `${this._config.vacuum}|${selectedMap ?? ""}`;
      if (this._lastDreameSelectedMapFor !== undefined && this._lastDreameSelectedMapFor !== dreameMapKey) {
        this._selectedDreameSegmentIds = new Set();
      }
      this._lastDreameSelectedMapFor = dreameMapKey;

      // Same bug, same fix, for the room_geometry-based room selector:
      // room ids are only unique *within* a floor/map, so a stale
      // selection surviving a floor switch could have Clean target a
      // different room on the new floor that happens to reuse the same
      // id. Scoped by vacuum + currentMapKey() rather than just the map
      // key alone, so switching the configured vacuum entity also clears
      // a selection that belonged to the previous one.
      const geo = this._roomGeometry;
      if (geo) {
        const roomMapKey = `${this._config.vacuum}|${currentMapKey(geo)}`;
        if (this._lastRoomMapKeyFor !== undefined && this._lastRoomMapKeyFor !== roomMapKey) {
          this._selectedRoomIds = new Set();
        }
        this._lastRoomMapKeyFor = roomMapKey;
      }

      this._updateTrace();
    }
  }

  /** Which integration the configured vacuum belongs to — explicit
   *  vacuum_brand config always wins, otherwise auto-detected from the
   *  entity registry (see detectVacuumBrand()), falling back to "tapo" so
   *  every config from before multi-brand support kept behaving exactly
   *  as it did (this card's only brand until now). */
  private get _brand(): VacuumBrand {
    return this._config.vacuum_brand ?? detectVacuumBrand(this.hass, this._config.vacuum) ?? "tapo";
  }

  /** map_rotation, defended the same way furniture_opacity already is:
   *  hand-typed YAML can hand this a string, a boolean, or NaN (e.g. an
   *  empty number field), and a raw value like that would otherwise land
   *  straight in a CSS `transform` string and in the click-to-room trig in
   *  geometry.ts — silently breaking rotation instead of just falling back
   *  to the default like every other malformed field does. */
  private get _mapRotation(): number {
    const rotation = this._config.map_rotation;
    return typeof rotation === "number" && Number.isFinite(rotation) ? rotation : DEFAULT_MAP_ROTATION;
  }

  /** Experimental (see VacuumCardConfig.show_trace): appends the vacuum's
   *  current position to the trail while it's actively cleaning, and
   *  starts a fresh trail at the beginning of each new cleaning run so it
   *  doesn't stitch onto a previous, unrelated run. Only samples as often
   *  as room_geometry.vacuum_point itself updates (the integration's own
   *  map refresh interval), so the trail is coarse by nature.
   *
   *  State transitions are tracked unconditionally (not just while
   *  show_trace is on) so re-enabling it mid-house always starts a fresh
   *  trail for the *current* run instead of stitching onto whatever was
   *  last recorded before it was switched off. */
  private _updateTrace(): void {
    const state = this.hass.states[this._config.vacuum]?.state;
    const isCleaning = (s: string | undefined): boolean => s !== undefined && CLEANING_STATES.includes(s);
    const cleaning = isCleaning(state);
    if (state !== this._lastVacuumStateForTrace) {
      if (cleaning && !isCleaning(this._lastVacuumStateForTrace)) this._trace = [];
      this._lastVacuumStateForTrace = state;
    }
    if (!this._config.show_trace || !cleaning) return;

    const point = this._roomGeometry?.vacuum_point;
    if (!point) return;
    const last = this._trace[this._trace.length - 1];
    if (last && last[0] === point[0] && last[1] === point[1]) return;

    const next: [number, number][] = [...this._trace, point];
    this._trace = next.length > TRACE_MAX_POINTS ? next.slice(next.length - TRACE_MAX_POINTS) : next;
  }

  private get _roomGeometry(): RoomGeometry | undefined {
    // Shared with the editor (utils/geometry.ts's resolveRoomGeometry) —
    // normalizes both the old object shape and TapoVac-ADV v3.0.0+'s
    // list + map_geometry shape.
    return resolveRoomGeometry(this.hass, this._config.camera ?? this._discovered.camera);
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

  /** Most recent last_changed across every entity the card actually
   *  displays (vacuum state, battery, mop status, map camera, water level,
   *  sensors) — a per-entity poll timestamp (e.g. just the vacuum entity's)
   *  can look fresh while the battery, map, or progress data it's showing
   *  is actually stale, so this takes the max across all of them instead. */
  private _lastUpdated(): Date | undefined {
    const ids = [
      this._config.vacuum,
      this._config.battery_entity ?? this._discovered.battery,
      this._config.mop_attached_entity ?? this._discovered.mopAttached,
      this._config.camera ?? this._discovered.camera,
      this._config.water_level_entity ?? this._discovered.waterLevel,
      this._config.clean_passes_entity ?? this._discovered.cleanPasses,
      ...(this._config.sensors ?? this._discovered.sensors),
    ].filter((id): id is string => !!id);

    let latest: Date | undefined;
    for (const id of ids) {
      const changed = this.hass.states[id]?.last_changed;
      if (!changed) continue;
      const t = new Date(changed);
      if (!latest || t > latest) latest = t;
    }
    return latest;
  }

  private _relativeTime(date: Date): string {
    const diffSec = Math.round((Date.now() - date.getTime()) / 1000);
    if (diffSec < 5) return "just now";
    if (diffSec < 60) return `${diffSec}s ago`;
    const diffMin = Math.round(diffSec / 60);
    if (diffMin < 60) return `${diffMin}m ago`;
    const diffHour = Math.round(diffMin / 60);
    if (diffHour < 24) return `${diffHour}h ago`;
    const diffDay = Math.round(diffHour / 24);
    return `${diffDay}d ago`;
  }

  protected render(): TemplateResult | typeof nothing {
    if (!this._config || !this.hass) return nothing;
    const vacuum = this.hass.states[this._config.vacuum];
    if (!vacuum) {
      return html`<ha-card><div class="warning">Entity not found: ${this._config.vacuum}</div></ha-card>`;
    }

    const name = this._config.name ?? vacuum.attributes["friendly_name"] ?? "Vacuum";
    const status = this.hass.formatEntityState?.(vacuum) ?? vacuum.state;
    // Anything other than the literal "bottom" falls back to "top" — a typo
    // or stale/invalid config value must never make the map disappear
    // entirely (it used to: neither branch matched, so nothing rendered).
    const mapPosition = this._config.map_position === "bottom" ? "bottom" : "top";
    const lastUpdated = (this._config.show_last_updated ?? true) ? this._lastUpdated() : undefined;

    return html`
      <ha-card>
        <div class="header" @click=${() => this._fireMoreInfo(this._config.vacuum)}>
          <ha-icon class="header-icon" icon="mdi:robot-vacuum"></ha-icon>
          <div class="header-text">
            <div class="name">${name}</div>
            <div class="status">${status}</div>
            ${lastUpdated
              ? html`<div class="last-updated">Updated ${this._relativeTime(lastUpdated)}</div>`
              : nothing}
          </div>
        </div>
        ${(this._config.show_controls ?? true) ? this._renderControls(vacuum) : nothing}
        ${this._renderRemoteDrive(vacuum)}
        ${this._brand === "tapo" && this._config.show_schedules !== false ? this._renderSchedules() : nothing}
        ${mapPosition === "top" && (this._config.show_map ?? true) ? this._renderMap() : nothing}
        ${(this._config.show_dock_actions ?? true) ? this._renderDockActions() : nothing}
        ${this._renderSelects()}
        ${(this._config.show_battery ?? true) ? this._renderBattery() : nothing}
        ${(this._config.show_mop_status ?? true) ? this._renderMopStatus() : nothing}
        ${(this._config.show_sensors ?? true) ? this._renderSensors() : nothing}
        ${mapPosition === "bottom" && (this._config.show_map ?? true) ? this._renderMap() : nothing}
        ${this._renderMaintenance()}
      </ha-card>
    `;
  }

  // -- Controls --------------------------------------------------------------
  private _renderControls(vacuum: HassEntity): TemplateResult {
    const cleaning = vacuum.state === "cleaning";
    // Not every integration's vacuum entity supports every service — the
    // Dreame Vacuum integration, for instance, has no CLEAN_SPOT support —
    // and calling an unsupported one raises an error rather than doing
    // nothing, so each button is gated on the entity's own
    // supported_features bitmask instead of assumed. A missing/NaN
    // attribute (older integrations that don't set it) is treated as "all
    // supported", matching this card's original behavior before this
    // check existed.
    const features = Number(vacuum.attributes["supported_features"]);
    const supports = (bit: number): boolean => Number.isNaN(features) || (features & bit) !== 0;
    // A vacuum with no pause support (rare, but not guaranteed by the
    // vacuum domain) falls back to stop instead — still a working "make it
    // stop cleaning" action rather than a call to an unsupported service.
    const pauseService = supports(VACUUM_FEATURE_PAUSE) ? "pause" : "stop";
    return html`
      <div class="section controls">
        <button class="pill" @click=${() => this._callVacuumService(cleaning ? pauseService : "start")}>
          <ha-icon icon=${cleaning ? "mdi:pause" : "mdi:play"}></ha-icon>
          <span>${cleaning ? "Pause" : "Start"}</span>
        </button>
        ${supports(VACUUM_FEATURE_STOP)
          ? html`<button class="pill" @click=${() => this._callVacuumService("stop")}>
              <ha-icon icon="mdi:stop"></ha-icon>
              <span>Stop</span>
            </button>`
          : nothing}
        ${supports(VACUUM_FEATURE_CLEAN_SPOT)
          ? html`<button class="pill" @click=${() => this._callVacuumService("clean_spot")}>
              <ha-icon icon="mdi:target-variant"></ha-icon>
              <span>Spot</span>
            </button>`
          : nothing}
        ${supports(VACUUM_FEATURE_RETURN_HOME)
          ? html`<button class="pill accent" @click=${() => this._callVacuumService("return_to_base")}>
              <ha-icon icon="mdi:home-import-outline"></ha-icon>
              <span>Dock</span>
            </button>`
          : nothing}
      </div>
    `;
  }

  private _renderRemoteDrive(vacuum: HassEntity): TemplateResult | typeof nothing {
    if (this._brand !== "tapo" || this._config.show_remote_drive === false ||
        vacuum.attributes["remote_control"] !== true) return nothing;
    const send = async (command: string) => {
      try {
        await this.hass.callService("tapo_rv30", "remote_drive", {
          entity_id: this._config.vacuum,
          command,
        });
        this._remoteDriving = command === "enter" ? true : command === "exit" ? false : this._remoteDriving;
      } catch (err) {
        this._notifyServiceError("remote drive", err);
      }
    };
    return html`
      <div class="section remote-drive">
        <div class="section-title">Remote drive</div>
        ${!this._remoteDriving
          ? html`<button class="pill" @click=${() => send("enter")}>
              <ha-icon icon="mdi:steering"></ha-icon><span>Take control</span>
            </button>`
          : html`<div class="drive-pad">
              <button class="pill drive-up" aria-label="Forward" @click=${() => send("forward")}><ha-icon icon="mdi:arrow-up"></ha-icon></button>
              <button class="pill drive-left" aria-label="Turn left" @click=${() => send("left")}><ha-icon icon="mdi:arrow-left"></ha-icon></button>
              <button class="pill drive-stop" aria-label="Stop" @click=${() => send("stop")}><ha-icon icon="mdi:stop"></ha-icon></button>
              <button class="pill drive-right" aria-label="Turn right" @click=${() => send("right")}><ha-icon icon="mdi:arrow-right"></ha-icon></button>
              <button class="pill drive-down" aria-label="Backward" @click=${() => send("backward")}><ha-icon icon="mdi:arrow-down"></ha-icon></button>
            </div>
            <button class="pill" @click=${() => send("exit")}><ha-icon icon="mdi:close"></ha-icon><span>Release control</span></button>`}
      </div>
    `;
  }

  private _renderSchedules(): TemplateResult | typeof nothing {
    const entityId = this._discovered.schedules;
    const state = entityId ? this.hass.states[entityId] : undefined;
    if (!state) return nothing;
    const schedules = (state.attributes["schedules"] ?? []) as Array<{
      id: string | number; time: string; days: string[]; enabled: boolean;
      blocked_by_dnd?: boolean; rooms?: string[];
    }>;
    const dnd = state.attributes["dnd"] as { enabled?: boolean; start?: string; end?: string } | undefined;
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    return html`
      <div class="section schedule-section">
        <button class="maintenance-toggle schedule-toggle" aria-expanded=${this._schedulesOpen ? "true" : "false"}
          @click=${() => (this._schedulesOpen = !this._schedulesOpen)}>
          <ha-icon icon="mdi:calendar-clock"></ha-icon>
          <span>Schedules${schedules.length ? ` · ${schedules.length}` : ""}</span>
          ${dnd?.enabled ? html`<span class="schedule-dnd">DND</span>` : nothing}
          <ha-icon icon=${this._schedulesOpen ? "mdi:chevron-up" : "mdi:chevron-down"}></ha-icon>
        </button>
        ${this._schedulesOpen ? html`<div class="schedule-content">
          ${dnd?.enabled ? html`<div class="map-hint">Do Not Disturb: ${dnd.start}–${dnd.end}. Schedules during this window are blocked.</div>` : nothing}
          ${schedules.map((schedule) => html`
            <div class="schedule-row">
              <div class="schedule-info">
                <strong>${schedule.time}</strong>
                <span>${(schedule.days ?? []).join(", ") || "No repeat days"}${schedule.rooms?.length ? ` · ${schedule.rooms.join(", ")}` : ""}</span>
                ${schedule.blocked_by_dnd ? html`<span class="schedule-warning">Blocked by Do Not Disturb</span>` : nothing}
              </div>
              <button class="pill small" title="Edit time and repeat days" @click=${() => {
                this._editingScheduleId = schedule.id;
                this._newScheduleTime = schedule.time;
                this._newScheduleDays = new Set(schedule.days ?? []);
              }}><ha-icon icon="mdi:pencil"></ha-icon></button>
              <button class="pill small" title="Run now" @click=${() => this._scheduleAction("run_schedule", { schedule_id: schedule.id })}><ha-icon icon="mdi:play"></ha-icon></button>
              <button class="pill small" title=${schedule.enabled ? "Disable" : "Enable"} @click=${() => this._scheduleAction("set_schedule", { schedule_id: schedule.id, enabled: !schedule.enabled })}><ha-icon icon=${schedule.enabled ? "mdi:toggle-switch" : "mdi:toggle-switch-off-outline"}></ha-icon></button>
              <button class="pill small" title="Remove schedule" @click=${() => this._scheduleAction("remove_schedule", { schedule_id: schedule.id })}><ha-icon icon="mdi:delete-outline"></ha-icon></button>
            </div>
          `)}
          <div class="schedule-add">
            <input aria-label="Schedule time" type="time" .value=${this._newScheduleTime}
              @change=${(e: Event) => { this._newScheduleTime = (e.target as HTMLInputElement).value; }} />
            <div class="schedule-days">
              ${days.map((day) => html`<button class="chip ${this._newScheduleDays.has(day) ? "selected" : ""}"
                aria-pressed=${this._newScheduleDays.has(day) ? "true" : "false"}
                @click=${() => { const selected = new Set(this._newScheduleDays); selected.has(day) ? selected.delete(day) : selected.add(day); this._newScheduleDays = selected; }}>${day}</button>`)}
            </div>
            <button class="pill accent small" ?disabled=${this._newScheduleDays.size === 0} @click=${this._saveSchedule}>
              <ha-icon icon=${this._editingScheduleId === undefined ? "mdi:calendar-plus" : "mdi:content-save"}></ha-icon>
              <span>${this._editingScheduleId === undefined ? "Add schedule" : "Save schedule"}</span>
            </button>
            ${this._editingScheduleId !== undefined ? html`<button class="pill small" @click=${() => { this._editingScheduleId = undefined; }}><span>Cancel edit</span></button>` : nothing}
          </div>
        </div>` : nothing}
      </div>
    `;
  }

  private async _scheduleAction(service: string, data: Record<string, unknown>): Promise<void> {
    try {
      await this.hass.callService("tapo_rv30", service, { entity_id: this._config.vacuum, ...data });
    } catch (err) {
      this._notifyServiceError("schedule", err);
    }
  }

  private async _saveSchedule(): Promise<void> {
    try {
      if (this._editingScheduleId !== undefined) {
        await this.hass.callService("tapo_rv30", "set_schedule", {
          entity_id: this._config.vacuum,
          schedule_id: this._editingScheduleId,
          time: this._newScheduleTime,
          days: [...this._newScheduleDays],
        });
        this._editingScheduleId = undefined;
      } else {
        await this.hass.callService("tapo_rv30", "add_schedule", {
          entity_id: this._config.vacuum,
          time: this._newScheduleTime,
          days: [...this._newScheduleDays],
          enabled: true,
        });
      }
    } catch (err) {
      this._notifyServiceError("add schedule", err);
    }
  }

  // -- Map ---------------------------------------------------------------
  /** Dreame Vacuum has no pixel-space room geometry to click on (see
   *  types.ts's DreameRoom) — only a flat room list, read straight off the
   *  vacuum entity each render rather than cached in state, same as any
   *  other live attribute this card reads on demand. [] for every other
   *  brand, or a Dreame device with no saved map yet. */
  private get _dreameRooms(): DreameRoom[] {
    if (this._brand !== "dreame") return [];
    return discoverDreameRooms(this.hass, this._config.vacuum);
  }

  private _renderMap(): TemplateResult | typeof nothing {
    const cameraId = this._config.camera ?? this._discovered.camera;
    const lastCleanId = this._config.last_clean_image ?? this._discovered.lastClean;
    const canShowLastClean = this._brand === "tapo" && this._config.show_last_clean_map !== false && !!lastCleanId;
    const picture = this._showLastCleanMap && canShowLastClean
      ? cacheBustedPicture(this.hass, lastCleanId!)
      : cameraId ? cacheBustedPicture(this.hass, cameraId) : undefined;
    const dreameRooms = this._dreameRooms;
    // A Dreame device with no camera picture yet still gets its room-chip
    // list (it doesn't depend on the map image at all) — only bail out
    // entirely when there's neither a map nor a room list to show.
    if (!picture && dreameRooms.length === 0) return nothing;

    const rotation = this._mapRotation;
    const geo = this._showLastCleanMap ? undefined : this._roomGeometry;
    const vacuum = this.hass.states[this._config.vacuum];
    const mapGeometry = cameraId
      ? this.hass.states[cameraId]?.attributes?.["map_geometry"] as TapoMapGeometry | undefined
      : undefined;
    const rotStyle = rotation % 360 !== 0 ? `transform: rotate(${rotation}deg);` : "";

    return html`
      <div class="section map-section">
        ${canShowLastClean || vacuum?.attributes["goto_point"] === true
          ? html`<div class="map-tools">
              ${canShowLastClean ? html`<button class="pill small" @click=${() => { this._showLastCleanMap = !this._showLastCleanMap; }}>
                <ha-icon icon=${this._showLastCleanMap ? "mdi:map-clock" : "mdi:history"}></ha-icon>
                <span>${this._showLastCleanMap ? "Live map" : "Last clean"}</span>
              </button>` : nothing}
              ${!this._showLastCleanMap && vacuum?.attributes["goto_point"] === true && mapGeometry
                ? html`<button class="pill small" aria-pressed=${this._mapMode === "goto" ? "true" : "false"}
                    @click=${() => { this._mapMode = this._mapMode === "goto" ? "rooms" : "goto"; }}>
                    <ha-icon icon="mdi:map-marker"></ha-icon><span>${this._mapMode === "goto" ? "Cancel go to" : "Go to point"}</span>
                  </button>` : nothing}
            </div>` : nothing}
        ${picture
          ? html`<div class="map-wrap">
              <img class="map-image" src=${picture} style=${rotStyle} @click=${(e: MouseEvent) => this._onMapClick(e, mapGeometry)} />
              ${geo ? this._renderMapOverlay(geo, rotStyle) : nothing}
            </div>`
          : nothing}
        ${!geo && picture
          ? html`<div class="map-hint">
              ${this._brand === "dreame"
                ? html`The Dreame Vacuum integration doesn't expose per-room map coordinates, so
                    rooms can't be clicked on the map directly — pick them from the list below
                    instead.`
                : html`Room click-to-select needs TapoVac-ADV v2.6.0+ (the map camera's
                    <code>room_geometry</code> attribute) — update the integration via HACS,
                    restart Home Assistant, then hard-refresh this browser tab.`}
            </div>`
          : nothing}
        ${this._showLastCleanMap ? html`<div class="map-hint">Map from the most recent completed cleaning run.</div>` : nothing}
        ${dreameRooms.length > 0 && !this._showLastCleanMap ? this._renderDreameRoomChips(dreameRooms) : nothing}
        ${geo && !this._showLastCleanMap ? this._renderRoomPresetChips(geo) : nothing}
        ${this._selectedRoomIds.size > 0 ? this._renderSelectedRoomsBar(geo) : nothing}
        ${this._selectedDreameSegmentIds.size > 0 ? this._renderSelectedDreameRoomsBar(dreameRooms) : nothing}
      </div>
    `;
  }

  /** Dreame's room-selection UI — a tappable chip per room instead of
   *  clicking the map (see _dreameRooms above for why). Selection is kept
   *  in _selectedDreameSegmentIds and cleaned via
   *  dreame_vacuum.vacuum_clean_segment, same shape as the map-click flow
   *  for TapoVac-ADV but sourced from a flat list rather than geometry. */
  private _renderDreameRoomChips(rooms: DreameRoom[]): TemplateResult {
    return html`
      <div class="dreame-rooms">
        ${rooms.map((room) => {
          const selected = this._selectedDreameSegmentIds.has(room.id);
          return html`
            <button
              class="chip ${selected ? "selected" : ""}"
              aria-pressed=${selected ? "true" : "false"}
              @click=${() => this._toggleDreameRoom(room.id)}
            >
              ${room.icon ? html`<ha-icon icon=${room.icon}></ha-icon>` : nothing}
              <span>${room.name}</span>
            </button>
          `;
        })}
      </div>
    `;
  }

  private _toggleDreameRoom(id: number): void {
    const next = new Set(this._selectedDreameSegmentIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    this._selectedDreameSegmentIds = next;
  }

  private _renderSelectedDreameRoomsBar(rooms: DreameRoom[]): TemplateResult {
    const names = [...this._selectedDreameSegmentIds]
      .map((id) => rooms.find((r) => r.id === id)?.name)
      .filter((n): n is string => !!n);
    return html`
      <div class="selected-rooms-bar">
        <span>${(this._config.show_room_names ?? true) ? names.join(", ") : `${names.length} room(s)`}</span>
        <button class="pill accent small" @click=${this._cleanSelectedDreameRooms} ?disabled=${this._busy}>
          <ha-icon icon="mdi:broom"></ha-icon><span>Clean</span>
        </button>
        <button class="pill small" @click=${() => (this._selectedDreameSegmentIds = new Set())}>
          <ha-icon icon="mdi:close"></ha-icon><span>Clear</span>
        </button>
      </div>
    `;
  }

  private async _cleanSelectedDreameRooms(): Promise<void> {
    if (this._selectedDreameSegmentIds.size === 0) return;
    this._busy = true;
    try {
      await this.hass.callService("dreame_vacuum", "vacuum_clean_segment", {
        entity_id: this._config.vacuum,
        segments: [...this._selectedDreameSegmentIds],
      });
      this._selectedDreameSegmentIds = new Set();
    } catch (err) {
      this._notifyServiceError("clean selected rooms", err);
    } finally {
      this._busy = false;
    }
  }

  private _renderMapOverlay(geo: RoomGeometry, rotStyle: string): TemplateResult {
    const roomPolygons = scopedRoomPolygons(this._config.room_polygons, geo);
    return html`
      <svg
        class="map-overlay"
        style=${rotStyle}
        viewBox="0 0 ${geo.image_width} ${geo.image_height}"
        preserveAspectRatio="none"
      >
        ${geo.rooms.map((room) => this._renderRoomOverlay(room, roomPolygons))}
        ${geo.rooms
          .filter((room) => this._selectedRoomIds.has(room.id))
          .map((room) => this._renderRoomOrderBadge(room))}
        ${this._config.show_trace ? this._renderTrace() : nothing}
        ${(this._config.show_furniture ?? true) ? this._renderFurniture(geo) : nothing}
      </svg>
    `;
  }

  // Experimental (see VacuumCardConfig.show_trace) — same no-literal-<svg>-
  // ancestor situation as the other overlay fragments, hence `svg` not `html`.
  private _renderTrace(): SVGTemplateResult | typeof nothing {
    if (this._trace.length < 2) return nothing;
    const points = this._trace.map(([x, y]) => `${x},${y}`).join(" ");
    return svg`
      <polyline
        points=${points}
        fill="none"
        class="vacuum-trace"
      ></polyline>
    `;
  }

  // These SVG fragments have no literal <svg> ancestor of their own — each
  // is a separate template returned from its own function and interpolated
  // into the parent <svg> in _renderMapOverlay(), so they must use the
  // `svg` tagged template (not `html`) or their elements end up created in
  // the HTML namespace instead of the SVG one and fail to render.
  private _renderRoomOverlay(room: RoomGeometryRoom, roomPolygons: Record<string, RoomPolygon>): SVGTemplateResult {
    const selected = this._selectedRoomIds.has(room.id);
    const polygon = roomPolygons[String(room.id)];
    const [r, g, b] = room.color;
    // Selected rooms stand out with a strong fill/stroke; unselected rooms
    // still get a faint fill/outline (rather than fully transparent) so
    // room boundaries stay visible for contrast instead of the selected
    // ones being the only thing drawn at all.
    const fill = selected ? `rgba(${r},${g},${b},0.55)` : `rgba(${r},${g},${b},0.12)`;
    const stroke = selected ? `rgb(${r},${g},${b})` : `rgba(${r},${g},${b},0.4)`;
    const strokeWidth = selected ? 4 : 1.5;
    const cls = selected ? "room-shape selected" : "room-shape";
    const freshness = room.last_cleaned
      ? `Last cleaned ${new Date(room.last_cleaned * 1000).toLocaleString()}${room.coverage == null ? "" : ` · ${Math.round(room.coverage)}% covered`}`
      : "No recorded clean for this room";
    if (polygon && polygon.length >= 3) {
      const points = polygon.map(([x, y]) => `${x},${y}`).join(" ");
      return svg`<polygon
        points=${points}
        fill=${fill}
        stroke=${stroke}
        stroke-width=${strokeWidth}
        class=${cls}
      ><title>${room.name}: ${freshness}</title></polygon>`;
    }
    const [x0, y0, x1, y1] = room.bbox;
    return svg`<rect
      x=${x0}
      y=${y0}
      width=${x1 - x0}
      height=${y1 - y0}
      fill=${fill}
      stroke=${stroke}
      stroke-width=${strokeWidth}
      class=${cls}
    ><title>${room.name}: ${freshness}</title></rect>`;
  }

  /** Numbered badge at a selected room's centroid showing the order it was
   *  clicked in (1, 2, 3, …) — Set iteration order is insertion order, so
   *  _selectedRoomIds already carries this for free. */
  private _renderRoomOrderBadge(room: RoomGeometryRoom): SVGTemplateResult {
    const order = [...this._selectedRoomIds].indexOf(room.id);
    return svg`
      <g class="room-order-badge">
        <circle cx=${room.cx} cy=${room.cy} r="15" class="badge-circle"></circle>
        <text x=${room.cx} y=${room.cy} dy="0.35em" text-anchor="middle" class="badge-text">${order + 1}</text>
      </g>
    `;
  }

  // -- Furniture (read-only overlay — placed/edited in the card's own
  // editor, see vacuum-card-adv-editor.ts) --------------------------------
  private _renderFurniture(geo: RoomGeometry): SVGTemplateResult | typeof nothing {
    const all = this._config.furniture;
    if (!all || all.length === 0) return nothing;
    // An item without a stored `map` predates per-floor scoping and stays
    // visible everywhere (unchanged legacy behavior) until re-placed; a
    // scoped item only shows on the floor it was placed on — see
    // FurnitureItem.map and geometry.ts's currentMapKey().
    const mapKey = currentMapKey(geo);
    const items = all.filter((item) => !item.map || item.map === mapKey);
    if (items.length === 0) return nothing;
    const opacity = Math.max(0, Math.min(100, this._config.furniture_opacity ?? 100)) / 100;
    const palette = getFurniturePalette(this._config.furniture_color);
    const paletteStyle = `--furn-fill:${palette.fill};--furn-stroke:${palette.stroke};--furn-detail:${palette.detail};--furn-line:${palette.line};`;
    return svg`
      <g class="furniture-layer" opacity=${opacity} style=${paletteStyle}>
        ${items.map(
          (item) => svg`
            <g transform="translate(${item.x} ${item.y}) rotate(${item.rotation})" class="furniture-item">
              ${furnitureGlyph(item.type, item.width, item.height)}
            </g>
          `
        )}
      </g>
    `;
  }

  private _renderRoomPresetChips(geo: RoomGeometry): TemplateResult | typeof nothing {
    const mapKey = currentMapKey(geo);
    const presets = (this._config.room_presets ?? []).filter((preset) => preset.map === mapKey);
    if (presets.length === 0) return nothing;
    return html`
      <div class="room-presets" aria-label="Saved room presets">
        ${presets.map((preset) => html`
          <button class="chip" @click=${() => this._selectRoomPreset(preset, geo)}>
            <ha-icon icon="mdi:bookmark"></ha-icon><span>${preset.name}</span>
          </button>
        `)}
      </div>
    `;
  }

  private _selectRoomPreset(preset: RoomPreset, geo: RoomGeometry): void {
    const available = new Set(geo.rooms.map((room) => room.id));
    this._selectedRoomIds = new Set(preset.rooms.filter((id) => available.has(id)));
  }

  private _renderSelectedRoomsBar(geo?: RoomGeometry): TemplateResult {
    const names = [...this._selectedRoomIds]
      .map((id, i) => {
        const name = geo?.rooms.find((r) => r.id === id)?.name;
        return name ? `${i + 1}. ${name}` : undefined;
      })
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

  private _onMapClick(evt: MouseEvent, mapGeometry?: TapoMapGeometry): void {
    if (this._mapMode === "goto") {
      if (!mapGeometry || !this._mapImg) return;
      const point = displayToNatural(evt.clientX, evt.clientY, this._mapImg, this._mapRotation);
      const [, gridH] = mapGeometry.grid_size;
      const resolution = mapGeometry.resolution_mm || 50;
      const [originX, originY] = mapGeometry.real_origin_mm;
      const x = Math.round(originX + ((point.x - mapGeometry.scale_px_per_cell / 2) / mapGeometry.scale_px_per_cell) * resolution);
      const y = Math.round(originY + (gridH - 1 - (point.y - mapGeometry.scale_px_per_cell / 2) / mapGeometry.scale_px_per_cell) * resolution);
      void this.hass.callService("tapo_rv30", "go_to", { entity_id: this._config.vacuum, x, y })
        .catch((err) => this._notifyServiceError("go to point", err));
      this._mapMode = "rooms";
      return;
    }
    if (this._showLastCleanMap) return;
    const geo = this._roomGeometry;
    if (!geo || !this._mapImg) {
      // eslint-disable-next-line no-console
      console.debug(
        "[vacuum-card-adv] map click ignored: room_geometry not available on the camera entity yet"
      );
      return;
    }
    const point = displayToNatural(evt.clientX, evt.clientY, this._mapImg, this._mapRotation);
    const roomId = resolveRoomAtPoint(point, geo, scopedRoomPolygons(this._config.room_polygons, geo));
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
    const roomIds = [...this._selectedRoomIds].filter((id) => geo.rooms.some((room) => room.id === id));
    if (roomIds.length === 0) return;
    const mapId = geo.map_id == null ? undefined : Number(geo.map_id);
    this._busy = true;
    try {
      await this.hass.callService("tapo_rv30", "clean_rooms", {
        entity_id: this._config.vacuum,
        room_ids: roomIds,
        ...(mapId !== undefined && Number.isInteger(mapId) ? { map_id: mapId } : {}),
      });
      this._selectedRoomIds = new Set();
    } catch (err) {
      this._notifyServiceError("clean selected rooms", err);
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
    const showCleanPasses = this._config.show_clean_passes ?? true;
    const fanSpeedList = (vacuum.attributes["fan_speed_list"] as string[] | undefined) ?? [];
    const fanSpeed = vacuum.attributes["fan_speed"] as string | undefined;
    const waterEntityId = this._config.water_level_entity ?? this._discovered.waterLevel;
    const waterEntity = waterEntityId ? this.hass.states[waterEntityId] : undefined;
    const cleanPassesEntityId = this._config.clean_passes_entity ?? this._discovered.cleanPasses;
    const cleanPassesEntity = cleanPassesEntityId ? this.hass.states[cleanPassesEntityId] : undefined;

    if (!(showFan && fanSpeedList.length > 0) && !(showWater && waterEntity)
      && !(showCleanPasses && cleanPassesEntity)) return nothing;

    return html`
      <div class="section selects">
        ${showFan && fanSpeedList.length > 0
          ? renderSelectField(
              this.hass,
              "Fan speed",
              fanSpeed ?? "",
              fanSpeedList.map((opt) => ({ value: opt, label: opt })),
              (next) => {
                // ha-form can re-fire value-changed when .data is set
                // programmatically (e.g. every hass update re-applying the
                // current fan_speed) — skip re-issuing the same service
                // call when nothing actually changed.
                if (next === (fanSpeed ?? "")) return;
                this._setFanSpeed(next);
              }
            )
          : nothing}
        ${showWater && waterEntity
          ? renderSelectField(
              this.hass,
              "Water level",
              waterEntity.state,
              ((waterEntity.attributes["options"] as string[] | undefined) ?? []).map((opt) => ({
                value: opt,
                label: opt,
              })),
              (next) => {
                if (next === waterEntity.state) return;
                this._selectOption(waterEntityId as string, next);
              }
            )
          : nothing}
        ${showCleanPasses && cleanPassesEntity
          ? renderSelectField(
              this.hass,
              "Clean passes",
              cleanPassesEntity.state,
              ((cleanPassesEntity.attributes["options"] as string[] | undefined) ?? []).map((opt) => ({
                value: opt,
                label: opt,
              })),
              (next) => {
                if (next === cleanPassesEntity.state) return;
                this._selectOption(cleanPassesEntityId as string, next);
              }
            )
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
    const hasNumericValue = battery.state.trim() !== "" && Number.isFinite(value);
    return html`
      <div class="section sensors">
        ${this._renderRow({
          icon: this._batteryIcon(value),
          title: this._shortTitle((battery.attributes["friendly_name"] as string) ?? "Battery"),
          value: hasNumericValue ? `${value}%` : battery.state,
          percent: hasNumericValue ? value : undefined,
          gaugeColor: this._batteryColor(value),
          entityId: batteryId,
        })}
      </div>
    `;
  }

  private _batteryIcon(value: number): string {
    if (!Number.isFinite(value)) return "mdi:battery-unknown";
    const step = Math.round(value / 10) * 10;
    if (step >= 100) return "mdi:battery";
    if (step <= 0) return "mdi:battery-outline";
    return `mdi:battery-${step}`;
  }

  private _batteryColor(value: number): string {
    if (!Number.isFinite(value)) return "var(--disabled-text-color)";
    if (value <= 20) return "var(--error-color)";
    if (value <= 50) return "var(--warning-color)";
    return "var(--success-color)";
  }

  // Discovered but never actually rendered before — TapoVac-ADV's "Mop
  // Attached" binary_sensor exists on every device but had no row to show
  // it in. Its own icon attribute already flips between mdi:water /
  // mdi:water-off with state, so it's reused as-is rather than duplicating
  // that logic here.
  private _renderMopStatus(): TemplateResult | typeof nothing {
    const id = this._config.mop_attached_entity ?? this._discovered.mopAttached;
    if (!id) return nothing;
    const s = this.hass.states[id];
    if (!s) return nothing;
    const unavailable = s.state === "unavailable" || s.state === "unknown";
    return html`
      <div class="section sensors">
        ${this._renderRow({
          icon:
            (s.attributes["icon"] as string) ??
            (unavailable ? "mdi:help-circle-outline" : s.state === "on" ? "mdi:water" : "mdi:water-off"),
          title: this._shortTitle((s.attributes["friendly_name"] as string) ?? "Mop Attached"),
          value: unavailable ? s.state.charAt(0).toUpperCase() + s.state.slice(1) : s.state === "on" ? "Attached" : "Not attached",
          entityId: id,
        })}
      </div>
    `;
  }

  private _renderSensors(): TemplateResult | typeof nothing {
    const ids = this._config.sensors ?? this._discovered.sensors;
    if (!ids || ids.length === 0) return nothing;
    // v3.0.2: an entity that also appears under Maintenance (e.g. a
    // hand-written `sensors:` list including "Clean Time Remaining", which
    // auto-discovery classifies as a maintenance sensor) renders only
    // under Maintenance — the maintenance list wins so no row is ever
    // duplicated on the card.
    const maintenanceIds = new Set(this._config.maintenance_sensors ?? this._discovered.maintenanceSensors);
    const visible = ids.filter((id) => !maintenanceIds.has(id));
    if (visible.length === 0) return nothing;
    return html`<div class="section sensors">${visible.map((id) => this._renderSensorRow(id))}</div>`;
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
    // Deduplicated (a hand-written maintenance_sensors list can repeat an
    // id) and rendered as-is — this list is the single owner of lifetime/
    // wear stats since v3.0.2, see _renderSensors().
    const ids = [...new Set(this._config.maintenance_sensors ?? this._discovered.maintenanceSensors)];
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
    this.hass
      .callService("vacuum", service, { entity_id: this._config.vacuum })
      .catch((err) => this._notifyServiceError(service, err));
  }

  private _setFanSpeed(fanSpeed: string): void {
    if (!fanSpeed) return;
    this.hass
      .callService("vacuum", "set_fan_speed", {
        entity_id: this._config.vacuum,
        fan_speed: fanSpeed,
      })
      .catch((err) => this._notifyServiceError("set fan speed", err));
  }

  private _selectOption(entityId: string, option: string): void {
    if (!option) return;
    this.hass
      .callService("select", "select_option", { entity_id: entityId, option })
      .catch((err) => this._notifyServiceError("set option", err));
  }

  private _pressButton(entityId: string): void {
    this.hass
      .callService("button", "press", { entity_id: entityId })
      .catch((err) => this._notifyServiceError("press button", err));
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

  /** Surfaces a failed service call the standard Lovelace way (the same
   *  "hass-notification" toast stock cards use) instead of leaving it as a
   *  silent unhandled promise rejection in the console. */
  private _notifyServiceError(action: string, err: unknown): void {
    const message = err instanceof Error ? err.message : String(err);
    this.dispatchEvent(
      new CustomEvent("hass-notification", {
        detail: { message: `Failed to ${action}: ${message}` },
        bubbles: true,
        composed: true,
      })
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
    .last-updated {
      font-size: 0.75em;
      color: var(--secondary-text-color);
      opacity: 0.7;
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
    .map-tools { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 6px; }
    .remote-drive { display: flex; flex-wrap: wrap; gap: 6px; }
    .section-title { width: 100%; font-size: 0.82em; color: var(--secondary-text-color); }
    .drive-pad { display: grid; grid-template: repeat(3, 38px) / repeat(3, 1fr); gap: 4px; width: 100%; }
    .drive-pad .pill { min-width: 0; padding: 4px; }
    .drive-up { grid-area: 1 / 2; }
    .drive-left { grid-area: 2 / 1; }
    .drive-stop { grid-area: 2 / 2; }
    .drive-right { grid-area: 2 / 3; }
    .drive-down { grid-area: 3 / 2; }
    .schedule-section { display: flex; flex-direction: column; gap: 6px; }
    .schedule-section .schedule-toggle { padding: 0; }
    .schedule-content { display: flex; flex-direction: column; gap: 6px; }
    .schedule-dnd { margin-left: auto; color: var(--warning-color); font-size: 0.78em; }
    .schedule-row { display: flex; align-items: center; gap: 4px; }
    .schedule-info { display: flex; flex: 1; flex-direction: column; min-width: 0; font-size: 0.82em; }
    .schedule-info span { color: var(--secondary-text-color); overflow-wrap: anywhere; }
    .schedule-warning { color: var(--error-color, #db4437) !important; }
    .schedule-add { display: flex; flex-wrap: wrap; gap: 6px; align-items: center; }
    .schedule-add input { color: var(--primary-text-color); background: var(--card-background-color); border: 1px solid var(--divider-color); border-radius: 6px; padding: 6px; font: inherit; }
    .schedule-days { display: flex; flex-wrap: wrap; gap: 3px; }
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
    .room-shape {
      transition: fill 0.15s ease, stroke 0.15s ease, stroke-width 0.15s ease;
    }
    .room-shape.selected {
      filter: drop-shadow(0 0 4px rgba(0, 0, 0, 0.45));
    }
    .badge-circle {
      fill: var(--vc-accent);
      stroke: var(--card-background-color, #fff);
      stroke-width: 2;
    }
    .badge-text {
      fill: #fff;
      font-size: 15px;
      font-weight: 700;
      font-family: inherit;
    }
    /* Experimental (see VacuumCardConfig.show_trace). */
    .vacuum-trace {
      stroke: var(--vc-accent);
      stroke-opacity: 0.85;
      stroke-width: 3;
      stroke-linecap: round;
      stroke-linejoin: round;
      pointer-events: none;
    }
    /* Solid (fully opaque) fills — the furniture_opacity config option
       already controls transparency via the whole .furniture-layer group's
       own opacity attribute (see _renderFurniture()), so a baked-in alpha
       here as well would cap furniture out at that alpha even with
       furniture_opacity at 100 and make "fully opaque" unreachable. Colors
       come from CSS custom properties set on .furniture-layer itself (see
       _renderFurniture()) so furniture_color can pick a whole palette
       without touching these rules — the hex values here are just the
       brown-palette fallback for older configs with no style attribute. */
    .furniture-item .furn-body {
      fill: var(--furn-fill, #bcaaa4);
      stroke: var(--furn-stroke, #6d4c41);
      stroke-width: 2;
    }
    .furniture-item .furn-detail {
      fill: var(--furn-detail, #8d6e63);
      stroke: none;
    }
    .furniture-item .furn-line {
      stroke: var(--furn-line, #4e342e);
      stroke-width: 1.5;
    }
    .furniture-item .furn-plant {
      fill: #81c784;
      stroke: #2e7d32;
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

    /* Dreame's room chip list — see _renderDreameRoomChips(). */
    .room-presets,
    .dreame-rooms {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-top: 8px;
    }
    .chip {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 6px 12px;
      border-radius: 999px;
      border: 1px solid var(--divider-color, rgba(127, 127, 127, 0.3));
      background: transparent;
      color: var(--primary-text-color);
      font: inherit;
      font-size: 0.82em;
      cursor: pointer;
      transition: border-color 0.15s ease, background 0.15s ease, color 0.15s ease;
    }
    .room-presets { margin-top: 8px; }
    .chip ha-icon {
      --mdc-icon-size: 16px;
    }
    .chip.selected {
      border-color: var(--vc-accent);
      background: var(--vc-accent);
      color: var(--text-primary-color, #fff);
    }

    /* Selects */
    .selects {
      display: flex;
      gap: 8px;
    }
    .selects ha-form {
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
