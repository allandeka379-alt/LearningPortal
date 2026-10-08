import { describe, expect, it } from "vitest";
import { areaPath, labelIndices, linePath, nearestIndex, niceCeil, niceTicks, pointX } from "./scale";

describe("chart scales", () => {
  it("rounds axis maxima up to clean numbers", () => {
    expect(niceCeil(0)).toBe(1);
    expect(niceCeil(7)).toBe(10);
    expect(niceCeil(137)).toBe(200);
    expect(niceCeil(2400)).toBe(2500);
    expect(niceCeil(0.37)).toBe(0.5);
  });

  it("builds ticks from zero that cover the maximum, whole numbers for counts", () => {
    expect(niceTicks(137)).toEqual([0, 50, 100, 150, 200]);
    expect(niceTicks(3, 4, true)).toEqual([0, 2, 4]);
    expect(niceTicks(1, 4, true)).toEqual([0, 1]);
    expect(niceTicks(0)).toEqual([0, 0.25, 0.5, 0.75, 1]);
    const ticks = niceTicks(0.83);
    expect(ticks[0]).toBe(0);
    expect(ticks.at(-1)).toBeGreaterThanOrEqual(0.83);
  });

  it("breaks lines and areas at missing values instead of drawing zeros", () => {
    const points = [
      { x: 0, y: 10 },
      { x: 1, y: 20 },
      { x: 2, y: null },
      { x: 3, y: 5 },
      { x: 4, y: 6 },
    ];
    expect(linePath(points)).toBe("M0,10L1,20M3,5L4,6");
    expect(areaPath(points, 100)).toBe("M0,10L1,20L1,100L0,100ZM3,5L4,6L4,100L3,100Z");
    expect(linePath([{ x: 0, y: null }])).toBe("");
  });

  it("snaps the crosshair to the nearest point and spaces labels", () => {
    expect(pointX(0, 1, 0, 100)).toBe(50);
    expect(pointX(2, 5, 0, 100)).toBe(50);
    expect(nearestIndex(49, 5, 0, 100)).toBe(2);
    expect(nearestIndex(-20, 5, 0, 100)).toBe(0);
    expect(nearestIndex(500, 5, 0, 100)).toBe(4);
    expect(labelIndices(3)).toEqual([0, 1, 2]);
    expect(labelIndices(30, 5)).toEqual([0, 7, 15, 22, 29]);
  });
});
