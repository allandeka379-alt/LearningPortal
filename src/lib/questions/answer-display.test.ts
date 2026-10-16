import { describe, expect, it } from "vitest";
import { formatExpectedNumber } from "./answer-display";

describe("formatExpectedNumber", () => {
  it("hides floating-point noise when no precision is given", () => {
    expect(formatExpectedNumber(93.60000000000001)).toBe("93.6");
    expect(formatExpectedNumber(699.9999999999999)).toBe("700");
    expect(formatExpectedNumber(-1.9999999999999982)).toBe("-2");
    expect(formatExpectedNumber(0.1 + 0.2)).toBe("0.3");
  });

  it("keeps genuine digits", () => {
    expect(formatExpectedNumber(2.8333333333333335)).toBe("2.83333333333");
    expect(formatExpectedNumber(29.6425)).toBe("29.6425");
    expect(formatExpectedNumber(760)).toBe("760");
    expect(formatExpectedNumber(-0)).toBe("0");
  });

  it("uses decimal places or significant figures when the question sets them", () => {
    expect(formatExpectedNumber(93.60000000000001, { decimalPlaces: 2 })).toBe("93.60");
    expect(formatExpectedNumber(0.012345, { sigFigs: { min: 3 } })).toBe("0.0123");
  });

  it("writes very large and very small values with ×10^n", () => {
    expect(formatExpectedNumber(4e8)).toBe("400000000");
    expect(formatExpectedNumber(6.02e23)).toBe("6.02×10^23");
    expect(formatExpectedNumber(1.6e-19)).toBe("1.6×10^-19");
  });
});
