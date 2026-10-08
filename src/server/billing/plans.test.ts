import { describe, expect, it } from "vitest";
import { isPriceCurrent, selectCurrentPrices, type PriceRow } from "./plans";

const now = new Date("2026-10-05T10:00:00Z");
const ZW = "0199a000-0000-7000-8000-0000000000aa";
const ZA = "0199a000-0000-7000-8000-0000000000bb";
let n = 0;

function price(overrides: Partial<PriceRow> = {}): PriceRow {
  n += 1;
  return {
    id: `price-${n}`,
    planId: "plan-1",
    currency: "USD",
    amountMinor: 500,
    interval: "MONTH",
    intervalCount: 1,
    periodDays: null,
    perSeat: false,
    minSeats: null,
    label: null,
    countryId: null,
    isActive: true,
    validFrom: new Date("2026-01-01T00:00:00Z"),
    validTo: null,
    sortOrder: 0,
    ...overrides,
  };
}

describe("isPriceCurrent", () => {
  it("requires active and inside the validity window", () => {
    expect(isPriceCurrent(price(), now)).toBe(true);
    expect(isPriceCurrent(price({ isActive: false }), now)).toBe(false);
    expect(isPriceCurrent(price({ validFrom: new Date("2026-11-01T00:00:00Z") }), now)).toBe(false);
    expect(isPriceCurrent(price({ validTo: now }), now)).toBe(false); // exclusive end
    expect(isPriceCurrent(price({ validTo: new Date("2026-10-06T00:00:00Z") }), now)).toBe(true);
  });
});

describe("selectCurrentPrices", () => {
  it("returns an empty list when nothing is configured (UI shows 'price not set')", () => {
    expect(selectCurrentPrices([], { now })).toEqual([]);
    expect(selectCurrentPrices([price({ isActive: false })], { now })).toEqual([]);
  });

  it("filters by currency and sorts by admin order, interval, then amount", () => {
    const yearly = price({ interval: "YEAR", amountMinor: 4800 });
    const monthly = price({ amountMinor: 500 });
    const zwg = price({ currency: "ZWG", amountMinor: 13000 });
    const term = price({ interval: "TERM", periodDays: 90, amountMinor: 1200 });
    const pinned = price({ interval: "YEAR", amountMinor: 9999, sortOrder: -1 });
    const usd = selectCurrentPrices([yearly, zwg, term, monthly, pinned], { now, currency: "USD" });
    expect(usd.map((p) => p.id)).toEqual([pinned.id, monthly.id, term.id, yearly.id]);
    expect(selectCurrentPrices([yearly, zwg], { now, currency: "ZWG" }).map((p) => p.id)).toEqual([zwg.id]);
    expect(selectCurrentPrices([yearly, zwg], { now })).toHaveLength(2);
  });

  it("uses global prices unless a country price with the same terms replaces it", () => {
    const global = price({ amountMinor: 500 });
    const zimbabwe = price({ amountMinor: 300, countryId: ZW });
    const southAfrica = price({ amountMinor: 700, countryId: ZA });
    const globalYearly = price({ interval: "YEAR", amountMinor: 4800 });

    expect(selectCurrentPrices([global, zimbabwe, southAfrica, globalYearly], { now }).map((p) => p.id)).toEqual([
      global.id,
      globalYearly.id,
    ]);
    expect(selectCurrentPrices([global, zimbabwe, southAfrica, globalYearly], { now, countryId: ZW }).map((p) => p.id)).toEqual([
      zimbabwe.id,
      globalYearly.id,
    ]);
  });

  it("exposes only buyer-facing fields", () => {
    const [view] = selectCurrentPrices([price({ label: "Launch price" })], { now });
    expect(view).toEqual({
      id: expect.any(String),
      currency: "USD",
      amountMinor: 500,
      interval: "MONTH",
      intervalCount: 1,
      periodDays: null,
      perSeat: false,
      minSeats: null,
      label: "Launch price",
      countryId: null,
      validTo: null,
    });
  });
});
