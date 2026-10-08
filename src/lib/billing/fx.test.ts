import { describe, expect, it } from "vitest";
import { fxRateDates, fxRatesSchema, revenueUsdEquivalent } from "./fx";

const ZWG = { USD: 0.0373, asOf: "2026-10-01", source: "RBZ interbank mid-rate" };

describe("fxRatesSchema", () => {
  it("accepts dated positive rates per ISO currency and nothing else", () => {
    expect(fxRatesSchema.safeParse({}).success).toBe(true);
    expect(fxRatesSchema.safeParse({ ZWG }).success).toBe(true);
    expect(fxRatesSchema.safeParse({ ZAR: { USD: 0.055, asOf: "2026-09-30" } }).success).toBe(true);
    expect(fxRatesSchema.safeParse({ USD: { USD: 1, asOf: "2026-10-01" } }).success).toBe(false);
    expect(fxRatesSchema.safeParse({ zwg: ZWG }).success).toBe(false);
    expect(fxRatesSchema.safeParse({ ZWG: { USD: 0, asOf: "2026-10-01" } }).success).toBe(false);
    expect(fxRatesSchema.safeParse({ ZWG: { USD: 0.03, asOf: "1 Oct" } }).success).toBe(false);
    expect(fxRatesSchema.safeParse({ ZWG: { USD: 0.03 } }).success).toBe(false);
  });
});

describe("revenueUsdEquivalent", () => {
  const usd = { currency: "USD", amountMinor: 10_000, refundsMinor: 1_000, netMinor: 9_000 };
  const zwg = { currency: "ZWG", amountMinor: 268_097, refundsMinor: 0, netMinor: 268_097 };
  const zar = { currency: "ZAR", amountMinor: 50_000, refundsMinor: 5_000, netMinor: 45_000 };

  it("has nothing to convert for USD-only (or no) revenue", () => {
    expect(revenueUsdEquivalent([usd], { ZWG })).toBeNull();
    expect(revenueUsdEquivalent([], { ZWG })).toBeNull();
  });

  it("converts every currency at its configured rate and rounds once", () => {
    const result = revenueUsdEquivalent([usd, zwg], { ZWG });
    // 268,097 ZWG cents × 0.0373 = 10,000.0181 US cents.
    expect(result).toEqual({
      complete: true,
      grossUsdMinor: 20_000,
      refundsUsdMinor: 1_000,
      netUsdMinor: 19_000,
      rates: [{ currency: "ZWG", usdPerUnit: 0.0373, asOf: "2026-10-01", source: "RBZ interbank mid-rate" }],
      missingCurrencies: [],
    });
    expect(fxRateDates(result!)).toEqual(["2026-10-01"]);
  });

  it("never invents a rate: a currency without one means no totals at all", () => {
    const result = revenueUsdEquivalent([usd, zwg, zar], { ZWG });
    expect(result).toMatchObject({ complete: false, grossUsdMinor: 0, netUsdMinor: 0, missingCurrencies: ["ZAR"] });
    expect(revenueUsdEquivalent([zwg], {})).toMatchObject({ complete: false, missingCurrencies: ["ZWG"], rates: [] });
  });

  it("lists the distinct rate dates, oldest first", () => {
    const result = revenueUsdEquivalent([zwg, zar], { ZWG, ZAR: { USD: 0.055, asOf: "2026-09-30" } });
    expect(result?.complete).toBe(true);
    expect(fxRateDates(result!)).toEqual(["2026-09-30", "2026-10-01"]);
    expect(result?.netUsdMinor).toBe(Math.round(268_097 * 0.0373 + 50_000 * 0.055) - Math.round(5_000 * 0.055));
  });
});
