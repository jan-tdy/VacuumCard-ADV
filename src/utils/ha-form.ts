import { html, TemplateResult } from "lit";
import { HomeAssistant } from "../types";

/** A single-field dropdown backed by HA's own `ha-form` select selector —
 *  the same declarative-schema widget Home Assistant's own built-in card
 *  editors use, rather than a hand-rolled `ha-select`/`mwc-list-item` pair.
 *  The latter depends on `mwc-menu`'s own popup positioning, which can end
 *  up unopenable depending on the surrounding dashboard/dialog stacking
 *  context on some frontend versions, even with fixedMenuPosition set.
 *  Shared between the live card (fan speed, water level) and its editor
 *  (map position, room calibration, furniture type) so both go through the
 *  same schema/wiring instead of drifting apart. */
export function renderSelectField(
  hass: HomeAssistant,
  label: string,
  value: string,
  options: { value: string; label: string }[],
  onChange: (value: string) => void
): TemplateResult {
  return html`
    <ha-form
      .hass=${hass}
      .data=${{ value }}
      .schema=${[{ name: "value", selector: { select: { mode: "dropdown", options } } }]}
      .computeLabel=${() => label}
      @value-changed=${(e: CustomEvent) => {
        e.stopPropagation();
        onChange(e.detail.value.value);
      }}
    ></ha-form>
  `;
}
