import { describe, expect, it } from "vitest";
import { formatPercent } from "./format";
import {
  MASTERY_BANDS,
  MASTERY_BAND_LABELS,
  isMasteryBand,
  masteryBandFromScore,
  masteryBandStep,
} from "./mastery-band";

describe("masteryBandFromScore", () => {
  it.each([
    [0, "WEAK"],
    [39, "WEAK"],
    [40, "DEVELOPING"],
    [59, "DEVELOPING"],
    [60, "COMPETENT"],
    [74, "COMPETENT"],
    [75, "STRONG"],
    [89, "STRONG"],
    [90, "MASTERED"],
    [100, "MASTERED"],
  ] as const)("maps %d to %s (spec §11 boundaries)", (score, band) => {
    expect(masteryBandFromScore(score)).toBe(band);
  });

  it.each([
    [39.49, "WEAK"],
    [39.5, "DEVELOPING"],
    [59.49, "DEVELOPING"],
    [59.5, "COMPETENT"],
    [74.49, "COMPETENT"],
    [74.5, "STRONG"],
    [89.49, "STRONG"],
    [89.5, "MASTERED"],
  ] as const)("rounds %d half up to a whole percentage first → %s", (score, band) => {
    expect(masteryBandFromScore(score)).toBe(band);
  });

  it("always agrees with the whole percentage the UI displays (formatPercent)", () => {
    for (let hundredths = 0; hundredths <= 10_000; hundredths++) {
      const score = hundredths / 100;
      const displayed = Number(formatPercent(score).replace(/[^\d]/g, ""));
      expect(masteryBandFromScore(score)).toBe(masteryBandFromScore(displayed));
    }
  });

  it("clamps out-of-range scores", () => {
    expect(masteryBandFromScore(-5)).toBe("WEAK");
    expect(masteryBandFromScore(100.0000001)).toBe("MASTERED");
    expect(masteryBandFromScore(250)).toBe("MASTERED");
  });

  it("throws on non-finite input", () => {
    expect(() => masteryBandFromScore(Number.NaN)).toThrow(RangeError);
    expect(() => masteryBandFromScore(Number.POSITIVE_INFINITY)).toThrow(RangeError);
  });
});

describe("masteryBandStep", () => {
  it("returns 1-based ramp steps in order", () => {
    expect(MASTERY_BANDS.map(masteryBandStep)).toEqual([1, 2, 3, 4, 5]);
  });
});

describe("isMasteryBand", () => {
  it("accepts known bands only", () => {
    expect(isMasteryBand("STRONG")).toBe(true);
    expect(isMasteryBand("strong")).toBe(false);
    expect(isMasteryBand(3)).toBe(false);
    expect(isMasteryBand(undefined)).toBe(false);
  });
});

describe("MASTERY_BAND_LABELS", () => {
  it("has a label for every band", () => {
    for (const band of MASTERY_BANDS) expect(MASTERY_BAND_LABELS[band]).toMatch(/^[A-Z][a-z]+$/);
  });
});
