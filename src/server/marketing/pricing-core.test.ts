import { describe, expect, it } from "vitest";
import { currenciesOf, groupPricesByCurrency, headlinePrice, planPriceStatus, toPriceOption, type PriceInput } from "./pricing-core";

function price(overrides: Partial<PriceInput> = {}): PriceInput {
  return {
    id: overrides.id ?? `p-${Math.random().toString(36).slice(2)}`,
    currency: "USD",
    amountMinor: 500,
    interval: "MONTH",
    intervalCount: 1,
    periodDays: null,
    perSeat: false,
    minSeats: null,
    label: null,
    ...overrides,
  };
}

describe("toPriceOption", () => {
  it("formats amount, period and interval label", () => {
    expect(toPriceOption(price({ amountMinor: 4800, interval: "YEAR", label: " Launch price " }))).toMatchObject({
      amountLabel: "US$48",
      periodLabel: "per year",
      intervalLabel: "Yearly",
      label: "Launch price",
    });
    expect(toPriceOption(price({ amountMinor: 0 })).amountLabel).toBe("Free");
  });
});

describe("groupPricesByCurrency / currenciesOf", () => {
  it("groups in input order per currency and orders currencies USD, ZWG, then A-Z", () => {
    const prices = [price({ id: "a" }), price({ id: "b", currency: "ZWG" }), price({ id: "c", interval: "YEAR" }), price({ id: "d", currency: "ZAR" })];
    const grouped = groupPricesByCurrency(prices);
    expect(Object.keys(grouped).sort()).toEqual(["USD", "ZAR", "ZWG"]);
    expect(grouped.USD?.map((p) => p.id)).toEqual(["a", "c"]);
    expect(currenciesOf([{ prices: prices.slice(2) }, { prices: prices.slice(0, 2) }])).toEqual(["USD", "ZWG", "ZAR"]);
  });
});

describe("planPriceStatus", () => {
  it("is free only for the default plan without prices or for zero prices", () => {
    expect(planPriceStatus({ isDefault: true, prices: {} }, "USD")).toBe("free");
    expect(planPriceStatus({ isDefault: false, prices: { USD: [toPriceOption(price({ amountMinor: 0 }))] } }, "USD")).toBe("free");
  });

  it("never invents a price: a paid plan without prices is coming soon", () => {
    expect(planPriceStatus({ isDefault: false, prices: {} }, "USD")).toBe("coming_soon");
    expect(planPriceStatus({ isDefault: false, prices: { USD: [toPriceOption(price())] } }, "ZWG")).toBe("coming_soon");
    expect(planPriceStatus({ isDefault: true, prices: { USD: [toPriceOption(price())] } }, "ZWG")).toBe("coming_soon");
    expect(planPriceStatus({ isDefault: false, prices: { USD: [toPriceOption(price())] } }, "USD")).toBe("priced");
  });
});

describe("headlinePrice", () => {
  it("takes the first non-zero price", () => {
    const options = [toPriceOption(price({ id: "zero", amountMinor: 0 })), toPriceOption(price({ id: "m" })), toPriceOption(price({ id: "y", interval: "YEAR" }))];
    expect(headlinePrice(options)?.id).toBe("m");
    expect(headlinePrice([])).toBeNull();
    expect(headlinePrice(undefined)).toBeNull();
  });
});
