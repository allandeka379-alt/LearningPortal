// Diagrams for economics-o basics (PPC) lessons. Run: node .scratch/economics-o/diagrams/basics.mjs
import { D, C, put, lab, dotted } from "./common.mjs";

// --- PPC shapes (basics/ppc-shapes-shifts): table of food vs clothing
{
  const food = [0, 10, 20, 30, 40];
  const straight = [80, 60, 40, 20, 0], concave = [80, 76, 66, 46, 0], convex = [80, 46, 22, 8, 0];
  const mk = (ys) => food.map((f, i) => [f, ys[i]]);
  const ax = D.axes({ x: [0, 45], y: [0, 90], xTicks: 10, yTicks: 10, xLabel: "Food (thousand tonnes)", yLabel: "Clothing (thousand units)", w: 600, h: 440 });
  const body = ax.frame + dotted(ax, mk(straight), { stroke: C.ink }) + dotted(ax, mk(concave), { stroke: C.blue }) + dotted(ax, mk(convex), { stroke: C.amber }) +
    ax.tag(26, 62, "Straight line: cost constant", { dx: 6, dy: 0 }) +
    ax.tag(16, 80, "Concave: cost rises", { dx: 4, dy: -4, fill: C.blue }) +
    ax.tag(2, 12, "Convex: cost falls", { dx: 4, dy: 0, fill: C.amber });
  const alt = "Three production possibility curves for food and clothing with the same end points, 80 thousand units of clothing or 40 thousand tonnes of food: the straight line loses 20 thousand units of clothing for every 10 thousand tonnes of food, the concave curve loses 4, 10, 20 then 46 (rising cost) and the convex curve loses 34, 24, 14 then 8 (falling cost).";
  await put("ppc-three-shapes", D.svg(600, 440, body), alt, "Figure: straight-line, concave and convex PPCs through the same end points", "basics/ppc-shapes-shifts", "**Describing the diagrams.**");
}

// --- PPC outward shift (basics/ppc-shapes-shifts)
{
  const food = [0, 10, 20, 30, 40];
  const before = [80, 76, 66, 46, 0];
  const after = [100, 96, 88, 74, 52, 0];
  const p1 = food.map((f, i) => [f, before[i]]);
  const p2 = [0, 10, 20, 30, 40, 50].map((f, i) => [f, after[i]]);
  const ax = D.axes({ x: [0, 55], y: [0, 110], xTicks: 10, yTicks: 20, xLabel: "Food (thousand tonnes)", yLabel: "Clothing (thousand units)", w: 600, h: 440 });
  const body = ax.frame + dotted(ax, p1, { stroke: C.blue }) + dotted(ax, p2, { stroke: C.amber }) +
    ax.point(40, 50, { stroke: C.red, r: 5 }) + ax.label(40, 66, "(40, 50)\nunattainable\nbefore", { dx: 12, weight: 700, fill: C.red, size: 14 }) +
    lab(ax, 10, 58, "PPC1", { fill: C.blue }) + lab(ax, 12, 106, "PPC2", { fill: C.amber }) +
    ax.arrow(20, 60, 25, 82, { stroke: C.ink, width: 1.8 });
  const alt = "Production possibility curves before and after investment and training: PPC1 runs from 80 thousand units of clothing to 40 thousand tonnes of food, PPC2 lies outside it from 100 units of clothing to 50 thousand tonnes of food, so the combination of 40 thousand tonnes of food and 50 thousand units of clothing, impossible before, is now attainable.";
  await put("ppc-outward-shift", D.svg(600, 440, body), alt, "Figure: an outward shift from PPC1 to PPC2 makes new combinations attainable", "basics/ppc-shapes-shifts", "3. The diagram shows PPC1 and PPC2");
}

// --- Country X PPC (basics/ppc)
{
  const A = [[0, 50], [20, 48], [40, 44], [60, 36], [80, 22], [100, 0]];
  const ax = D.axes({ x: [0, 115], y: [0, 58], xTicks: 20, yTicks: 10, xLabel: "Consumer goods (thousand units)", yLabel: "Capital goods (thousand units)", w: 600, h: 440 });
  let body = ax.frame + dotted(ax, A);
  "ABCDEF".split("").forEach((l, i) => { body += lab(ax, A[i][0], A[i][1], l, { dx: i === 0 ? 8 : 6, dy: -9, fill: C.blue }); });
  body += ax.point(40, 30, { stroke: C.red, r: 5 }) + lab(ax, 40, 30, "G", { dx: 10, dy: 18, fill: C.red }) + ax.label(2, 14, "G (40, 30): inside the curve, resources not fully used", { fill: C.red, size: 14 });
  body += ax.point(60, 44, { stroke: C.amber, r: 5 }) + lab(ax, 60, 44, "H", { dx: 10, dy: -8, fill: C.amber }) + ax.label(2, 8, "H (60, 44): beyond the curve, unattainable", { fill: C.amber, size: 14 });
  const alt = "Production possibility curve of Country X, consumer goods against capital goods: points A to F lie on the curve from 50 thousand capital goods to 100 thousand consumer goods; G (40, 30) lies inside the curve so resources are unused, and H (60, 44) lies outside so it is unattainable.";
  await put("ppc-country-x", D.svg(600, 440, body), alt, "Figure: Country X's PPC with points on, inside and beyond the curve", "basics/ppc", "## Points on, inside and beyond the curve");
}
