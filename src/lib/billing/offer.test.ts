import { describe, expect, it } from "vitest";
import { isLifetimePrice, pricePeriodText, priceWithPeriod } from "./offer";

describe("price period wording (owner decision 2026-10-12: US$1 a month)", () => {
  it("names one-off passes by their length and lifetime prices as once", () => {
    expect(pricePeriodText({ interval: "ONE_OFF", periodDays: 30 })).toBe("a month");
    expect(pricePeriodText({ interval: "ONE_OFF", periodDays: 31 })).toBe("a month");
    expect(pricePeriodText({ interval: "ONE_OFF", periodDays: 7 })).toBe("a week");
    expect(pricePeriodText({ interval: "ONE_OFF", periodDays: 365 })).toBe("a year");
    expect(pricePeriodText({ interval: "ONE_OFF", periodDays: 90 })).toBe("for 90 days");
    expect(pricePeriodText({ interval: "ONE_OFF", periodDays: null })).toBe("once");
  });

  it("names recurring intervals", () => {
    expect(pricePeriodText({ interval: "MONTH", periodDays: null, intervalCount: 1 })).toBe("a month");
    expect(pricePeriodText({ interval: "TERM", periodDays: 120, intervalCount: 2 })).toBe("every 2 terms");
  });

  it("joins the amount and the period for calls to action", () => {
    expect(priceWithPeriod("US$1", { interval: "ONE_OFF", periodDays: 30 })).toBe("US$1 a month");
    expect(priceWithPeriod("US$1", { interval: "ONE_OFF", periodDays: null })).toBe("US$1");
    expect(isLifetimePrice({ interval: "ONE_OFF", periodDays: 30 })).toBe(false);
  });
});
