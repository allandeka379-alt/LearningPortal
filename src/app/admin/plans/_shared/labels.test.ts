import { describe, expect, it } from "vitest";
import { discountLabel, periodLabel, priceLabel } from "./labels";

describe("commerce labels", () => {
  it("describes billing periods", () => {
    expect(periodLabel({ interval: "MONTH", intervalCount: 1, periodDays: null })).toBe("per month");
    expect(periodLabel({ interval: "MONTH", intervalCount: 3, periodDays: null })).toBe("every 3 months");
    expect(periodLabel({ interval: "TERM", intervalCount: 1, periodDays: 120 })).toBe("per term (120 days)");
    expect(periodLabel({ interval: "ONE_OFF", intervalCount: 1, periodDays: 90 })).toBe("one-off, 90 days of access");
    expect(periodLabel({ interval: "ONE_OFF", intervalCount: 1, periodDays: null })).toBe("one-off, lifetime access");
  });

  it("describes prices and discounts without inventing values", () => {
    expect(priceLabel({ amountMinor: 500, currency: "USD", interval: "MONTH", intervalCount: 1, periodDays: null }).replace(/\s/g, " ")).toBe("USD 5.00 per month");
    expect(priceLabel({ amountMinor: 200, currency: "USD", interval: "TERM", intervalCount: 1, periodDays: 120, perSeat: true, minSeats: 20 }).replace(/\s/g, " ")).toBe(
      "USD 2.00 per term (120 days) · per seat (min 20)",
    );
    expect(discountLabel({ discountType: "PERCENT", percentOff: 25, amountOffMinor: null, currency: null, freeDays: null })).toBe("25% off");
    expect(discountLabel({ discountType: "FIXED_AMOUNT", percentOff: null, amountOffMinor: 150, currency: "ZWG", freeDays: null }).replace(/\s/g, " ")).toBe("ZWG 1.50 off");
    expect(discountLabel({ discountType: "FREE_DAYS", percentOff: null, amountOffMinor: null, currency: null, freeDays: 1, grantPlanCode: "STUDENT" })).toBe("1 free day of STUDENT");
  });
});
