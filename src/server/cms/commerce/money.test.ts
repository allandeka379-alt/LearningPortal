import { describe, expect, it } from "vitest";
import { MAX_AMOUNT_MINOR, microsToUsdString, minorToMajorString, parseMajorAmount, parseUsdToMicros } from "./money";

describe("parseMajorAmount", () => {
  it("converts major-unit strings to integer minor units without float drift", () => {
    expect(parseMajorAmount("12")).toBe(1200);
    expect(parseMajorAmount("12.5")).toBe(1250);
    expect(parseMajorAmount("12.50")).toBe(1250);
    expect(parseMajorAmount("0.29")).toBe(29);
    expect(parseMajorAmount(" 1,250.07 ")).toBe(125007);
    expect(parseMajorAmount("0")).toBe(0);
  });

  it("rejects negatives, extra decimals, text and oversized values", () => {
    for (const bad of ["-1", "1.234", "abc", "", "  ", "1.2.3", "１２"]) expect(parseMajorAmount(bad)).toBeNull();
    expect(parseMajorAmount(undefined)).toBeNull();
    expect(parseMajorAmount(null)).toBeNull();
    expect(parseMajorAmount("99999999.99")).toBeNull();
    expect(parseMajorAmount(String(MAX_AMOUNT_MINOR / 100))).toBe(MAX_AMOUNT_MINOR);
  });
});

describe("minorToMajorString", () => {
  it("formats minor units for form defaults", () => {
    expect(minorToMajorString(1250)).toBe("12.50");
    expect(minorToMajorString(5)).toBe("0.05");
    expect(minorToMajorString(0)).toBe("0.00");
    expect(minorToMajorString(null)).toBe("");
    expect(minorToMajorString(1.5)).toBe("");
  });
});

describe("USD micro-dollars", () => {
  it("round-trips the AI budget editor values", () => {
    expect(parseUsdToMicros("50")).toBe(50_000_000);
    expect(parseUsdToMicros("0.125")).toBe(125_000);
    expect(parseUsdToMicros("1,000.5")).toBe(1_000_500_000);
    expect(parseUsdToMicros("-1")).toBeNull();
    expect(parseUsdToMicros("1.1234567")).toBeNull();
    expect(microsToUsdString(50_000_000)).toBe("50.00");
    expect(microsToUsdString(125_000)).toBe("0.125");
    expect(microsToUsdString(null)).toBe("");
  });
});
