import { describe, expect, it } from "vitest";
import { describeBillingPeriod, formatMoney, formatPrice, paymentFailureMessage, paymentMethodLabel } from "./format";

describe("formatMoney", () => {
  it("formats minor units with the currency's own symbol and decimals", () => {
    expect(formatMoney(500, "USD")).toMatch(/5\.00/);
    expect(formatMoney(500, "USD")).toMatch(/\$/);
    expect(formatMoney(13_000, "ZWG")).toMatch(/130\.00/);
    expect(formatMoney(13_000, "ZWG")).toMatch(/ZWG/);
  });

  it("falls back for unknown codes and never prints NaN", () => {
    expect(formatMoney(1234, "X1")).toBe("X1 12.34");
    expect(formatMoney(Number.NaN, "USD")).not.toMatch(/NaN/);
  });
});

describe("describeBillingPeriod / formatPrice", () => {
  it("words each interval", () => {
    expect(describeBillingPeriod({ interval: "MONTH", intervalCount: 1, periodDays: null })).toBe("per month");
    expect(describeBillingPeriod({ interval: "MONTH", intervalCount: 3, periodDays: null })).toBe("every 3 months");
    expect(describeBillingPeriod({ interval: "TERM", intervalCount: 1, periodDays: 120 })).toBe("per term");
    expect(describeBillingPeriod({ interval: "YEAR", intervalCount: 1, periodDays: null })).toBe("per year");
    expect(describeBillingPeriod({ interval: "WEEK", intervalCount: 2, periodDays: null })).toBe("every 2 weeks");
    expect(describeBillingPeriod({ interval: "ONE_OFF", intervalCount: 1, periodDays: 90 })).toBe("for 90 days");
    expect(describeBillingPeriod({ interval: "ONE_OFF", intervalCount: 1, periodDays: null })).toBe("one-off");
  });

  it("joins the amount and the period", () => {
    expect(formatPrice({ amountMinor: 500, currency: "USD", interval: "MONTH", intervalCount: 1, periodDays: null })).toMatch(/5\.00 per month$/);
  });
});

describe("paymentFailureMessage", () => {
  it("explains known provider codes in payer terms", () => {
    expect(paymentFailureMessage("FAILED", "insufficient_funds")).toMatch(/enough money/);
    expect(paymentFailureMessage("CANCELLED", "expired")).toMatch(/Nothing was charged/);
    expect(paymentFailureMessage("CANCELLED", "superseded")).toMatch(/newer checkout/);
  });

  it("has a calm default per status", () => {
    expect(paymentFailureMessage("FAILED", null)).toMatch(/didn't go through/);
    expect(paymentFailureMessage("CANCELLED", "something_new")).toMatch(/cancelled/);
  });
});

describe("paymentMethodLabel", () => {
  it("names wallets and cards, and labels sandbox payments as tests", () => {
    expect(paymentMethodLabel("paynow", "ecocash")).toBe("EcoCash");
    expect(paymentMethodLabel("paynow", "onemoney")).toBe("OneMoney");
    expect(paymentMethodLabel("paynow", "innbucks")).toBe("InnBucks");
    expect(paymentMethodLabel("paynow", null)).toBe("Paynow");
    expect(paymentMethodLabel("stripe", "card")).toBe("Card");
    expect(paymentMethodLabel("stripe", null)).toBe("Card");
    expect(paymentMethodLabel("sandbox", "ecocash")).toBe("Test EcoCash");
    expect(paymentMethodLabel("sandbox", null)).toBe("Test payment");
  });
});
