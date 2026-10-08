import { describe, expect, it } from "vitest";
import { fxRatesSchema } from "@/lib/billing/fx";
import { findPlatformSetting } from "./catalogue";
import { formatFxRates, parseFxRatesForm } from "./forms";
import { parsePlatformSettingForm } from "./service";

describe("fx.rates editor (/admin/settings)", () => {
  it("parses one currency per line into the setting's shape", () => {
    const parsed = parseFxRatesForm({ rates: "zwg: 0.0373, 2026-10-01, RBZ interbank mid-rate\n\nZAR = 0.055 USD, 2026-09-30" });
    expect(parsed).toEqual({
      ok: true,
      value: { ZWG: { USD: 0.0373, asOf: "2026-10-01", source: "RBZ interbank mid-rate" }, ZAR: { USD: 0.055, asOf: "2026-09-30" } },
    });
    expect(parsed.ok && fxRatesSchema.safeParse(parsed.value).success).toBe(true);
    expect(parseFxRatesForm({ rates: "" })).toEqual({ ok: true, value: {} });
    expect(parseFxRatesForm({})).toEqual({ ok: true, value: {} });
  });

  it("reports malformed and duplicate lines on the rates field", () => {
    const bad = parseFxRatesForm({ rates: "ZWG 0.03\nZAR: 0.05, 2026-09-30\nzar: 0.06, 2026-10-01" });
    expect(bad.ok).toBe(false);
    if (!bad.ok) {
      expect(bad.fieldErrors.rates).toHaveLength(2);
      expect(bad.fieldErrors.rates?.join(" ")).toMatch(/ZWG 0\.03[\s\S]*ZAR is listed twice/);
    }
  });

  it("round-trips through the editor text and is wired to the Billing group", () => {
    const value = { ZWG: { USD: 0.0373, asOf: "2026-10-01", source: "RBZ" }, BWP: { USD: 0.074, asOf: "2026-10-01" } };
    expect(formatFxRates(value)).toBe("BWP: 0.074, 2026-10-01\nZWG: 0.0373, 2026-10-01, RBZ");
    expect(parseFxRatesForm({ rates: formatFxRates(value) })).toEqual({ ok: true, value });
    expect(findPlatformSetting("fx.rates")).toMatchObject({ editor: "fxRates", group: "Billing", default: {} });
    expect(parsePlatformSettingForm("fx.rates", { rates: "ZWG: 0.0373, 2026-10-01" })).toEqual({ ok: true, value: { ZWG: { USD: 0.0373, asOf: "2026-10-01" } } });
  });
});
