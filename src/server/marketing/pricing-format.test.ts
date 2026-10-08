import { describe, expect, it } from "vitest";
import { currencyMinorDigits, currencyName, describePeriod, formatMoneyMinor, intervalAdjective, orderCurrencies } from "./pricing-format";

describe("formatMoneyMinor", () => {
  it("formats minor units, dropping decimals only for whole amounts", () => {
    expect(formatMoneyMinor(500, "USD")).toBe("US$5");
    expect(formatMoneyMinor(4850, "USD")).toBe("US$48.50");
    expect(formatMoneyMinor(4805, "USD")).toBe("US$48.05");
    expect(formatMoneyMinor(0, "USD")).toBe("US$0");
  });

  it("formats ZiG and currencies with no minor unit", () => {
    expect(formatMoneyMinor(150000, "ZWG")).toMatch(/^ZWG\s?1,500$/);
    expect(currencyMinorDigits("JPY")).toBe(0);
    expect(formatMoneyMinor(500, "JPY")).toMatch(/500/);
  });

  it("rejects malformed data instead of printing a wrong price", () => {
    expect(() => formatMoneyMinor(5.5, "USD")).toThrow(RangeError);
    expect(() => formatMoneyMinor(-1, "USD")).toThrow(RangeError);
    expect(() => formatMoneyMinor(100, "usd")).toThrow(RangeError);
  });
});

describe("describePeriod", () => {
  const base = { intervalCount: 1, periodDays: null, perSeat: false } as const;
  it("describes each billing interval", () => {
    expect(describePeriod({ ...base, interval: "MONTH" })).toBe("per month");
    expect(describePeriod({ ...base, interval: "YEAR" })).toBe("per year");
    expect(describePeriod({ ...base, interval: "TERM", periodDays: 90 })).toBe("per term");
    expect(describePeriod({ ...base, interval: "WEEK" })).toBe("per week");
    expect(describePeriod({ ...base, interval: "MONTH", intervalCount: 3 })).toBe("every 3 months");
  });

  it("describes one-off access windows and seat pricing", () => {
    expect(describePeriod({ ...base, interval: "ONE_OFF" })).toBe("pay once, keep it");
    expect(describePeriod({ ...base, interval: "ONE_OFF", periodDays: 90 })).toBe("one-off payment · 90 days' access");
    expect(describePeriod({ ...base, interval: "TERM", perSeat: true })).toBe("per learner per term");
  });

  it("treats an invalid interval count as 1", () => {
    expect(describePeriod({ ...base, interval: "MONTH", intervalCount: 0 })).toBe("per month");
  });
});

describe("intervalAdjective", () => {
  it("labels single intervals and falls back to the period for multiples", () => {
    expect(intervalAdjective("MONTH")).toBe("Monthly");
    expect(intervalAdjective("TERM")).toBe("Termly");
    expect(intervalAdjective("YEAR")).toBe("Yearly");
    expect(intervalAdjective("MONTH", 6)).toBe("every 6 months");
  });
});

describe("orderCurrencies", () => {
  it("puts USD and ZWG first, then the rest alphabetically, de-duplicated and normalised", () => {
    expect(orderCurrencies(["ZAR", "zwg", "USD", "BWP", "USD", "us", "DOLLAR", ""])).toEqual(["USD", "ZWG", "BWP", "ZAR"]);
    expect(orderCurrencies([])).toEqual([]);
  });
});

describe("currencyName", () => {
  it("names known currencies and falls back to the code", () => {
    expect(currencyName("USD")).toMatch(/dollar/i);
    expect(currencyName("XQQ")).toBe("XQQ");
  });
});
