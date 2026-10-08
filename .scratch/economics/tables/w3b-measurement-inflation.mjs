// Figures for lessons/inflation/measurement.md (W3b). (Named -inflation so it does not clash with the national
// income measurement tables script.)
import { table, prices, check, fmt, pct } from "../lib.mjs";
// WE1: weighted index.
const items = [
  { name: "Food", weight: 40, p0: 5, p1: 5.6 },
  { name: "Transport", weight: 20, p0: 2, p1: 2.3 },
  { name: "Housing", weight: 25, p0: 80, p1: 84 },
  { name: "Clothing", weight: 15, p0: 20, p1: 19 },
];
console.log(table(["Item", "Weight", "Price in base year (US\\$)", "Price in current year (US\\$)"], items.map((x) => [x.name, x.weight, fmt(x.p0, 2), fmt(x.p1, 2)])));
const W = prices.weightedTable(items);
console.log(W.md);
console.log({ index: W.index, inflation: pct(prices.inflationRate(100, W.index), 1) });
check("idx", W.index, 108.3);
// WE2: index over years and real wage.
const idx = [100, 112, 126];
console.log({ r1: pct(prices.inflationRate(idx[0], idx[1]), 1), r2: pct(prices.inflationRate(idx[1], idx[2]), 1), pointRise: idx[2] - idx[1] });
const w0 = 300, w1 = 330;
console.log({ real: fmt(prices.realValue(w1, idx[1]), 2), wageRise: pct(((w1 - w0) / w0) * 100, 1) });
