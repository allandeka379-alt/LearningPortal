import { describe, expect, it } from "vitest";
import {
  MOBILE_CHECKOUT_REUSE_MINUTES,
  INNBUCKS_CODE_REUSE_MINUTES,
  REDIRECT_CHECKOUT_REUSE_MINUTES,
  describePeriod,
  maskMsisdn,
  normaliseZimbabweMobile,
  reuseWindowMinutes,
  storedCheckout,
} from "./checkout";

describe("checkout helpers", () => {
  it("normalises Zimbabwe mobile numbers to E.164", () => {
    expect(normaliseZimbabweMobile("0771234567")).toBe("+263771234567");
    expect(normaliseZimbabweMobile("077 123 4567")).toBe("+263771234567");
    expect(normaliseZimbabweMobile("263771234567")).toBe("+263771234567");
    expect(normaliseZimbabweMobile("+263 71 123-4567")).toBe("+263711234567");
    expect(normaliseZimbabweMobile("+27821234567")).toBeNull();
    expect(normaliseZimbabweMobile("0241234567")).toBeNull(); // landline
    expect(normaliseZimbabweMobile("")).toBeNull();
    expect(normaliseZimbabweMobile(undefined)).toBeNull();
  });

  it("masks wallet numbers", () => {
    expect(maskMsisdn("+263771234567")).toBe("+263 77* *** 567");
  });

  it("describes billing periods from price data", () => {
    expect(describePeriod({ interval: "MONTH", intervalCount: 1, periodDays: null })).toBe("1 month");
    expect(describePeriod({ interval: "MONTH", intervalCount: 3, periodDays: null })).toBe("3 months");
    expect(describePeriod({ interval: "YEAR", intervalCount: 1, periodDays: null })).toBe("1 year");
    expect(describePeriod({ interval: "TERM", intervalCount: 1, periodDays: 100 })).toBe("1 term");
    expect(describePeriod({ interval: "WEEK", intervalCount: 2, periodDays: null })).toBe("2 weeks");
    expect(describePeriod({ interval: "ONE_OFF", intervalCount: 1, periodDays: 90 })).toBe("90 days");
    expect(describePeriod({ interval: "ONE_OFF", intervalCount: 1, periodDays: null })).toBe("one-off");
  });

  it("reuses mobile prompts only briefly", () => {
    expect(reuseWindowMinutes("ecocash")).toBe(MOBILE_CHECKOUT_REUSE_MINUTES);
    expect(reuseWindowMinutes("onemoney")).toBe(MOBILE_CHECKOUT_REUSE_MINUTES);
    expect(reuseWindowMinutes("innbucks")).toBe(INNBUCKS_CODE_REUSE_MINUTES);
    expect(reuseWindowMinutes("card")).toBe(REDIRECT_CHECKOUT_REUSE_MINUTES);
    expect(reuseWindowMinutes(null)).toBe(REDIRECT_CHECKOUT_REUSE_MINUTES);
  });

  it("reads a stored provider checkout from payment metadata", () => {
    expect(storedCheckout({ checkoutKind: "redirect", checkoutUrl: "https://pay.example/x" })).toEqual({ kind: "redirect", url: "https://pay.example/x" });
    expect(storedCheckout({ checkoutKind: "mobile_prompt", instructions: "Approve on your phone" })).toEqual({
      kind: "mobile",
      instructions: "Approve on your phone",
    });
    expect(storedCheckout({ maskedMsisdn: "+263 77* *** 567" })).toBeNull();
    expect(storedCheckout(null)).toBeNull();
    expect(storedCheckout([])).toBeNull();
  });
});
