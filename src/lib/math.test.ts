import { describe, expect, it } from "vitest";
import { clamp, roundHalfUp } from "./math";

describe("roundHalfUp", () => {
  it("rounds halves up and survives binary representation error", () => {
    expect(roundHalfUp(2.5)).toBe(3);
    expect(roundHalfUp(2.4999)).toBe(2);
    expect(roundHalfUp(68.25, 1)).toBe(68.3);
    expect(roundHalfUp(1.005, 2)).toBe(1.01);
    expect(roundHalfUp(39.5)).toBe(40);
    expect(roundHalfUp(-2.5)).toBe(-3);
    expect(Object.is(roundHalfUp(-0.4), 0)).toBe(true);
    expect(() => roundHalfUp(Number.NaN)).toThrow(RangeError);
  });
});

describe("clamp", () => {
  it("constrains to the inclusive range", () => {
    expect(clamp(-1, 0, 100)).toBe(0);
    expect(clamp(50, 0, 100)).toBe(50);
    expect(clamp(100.5, 0, 100)).toBe(100);
  });
});
