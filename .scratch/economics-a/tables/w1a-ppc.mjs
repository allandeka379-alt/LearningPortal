import { table, fmt, pctChange } from "../lib.mjs";
const oc = (x, y) => x.slice(1).map((_, i) => ({ dx: x[i + 1] - x[i], dy: y[i] - y[i + 1], per: (y[i] - y[i + 1]) / (x[i + 1] - x[i]) }));
// Zandia: consumer goods (x) vs capital goods (y) increasing cost
const x = [0, 20, 40, 60, 80, 100], y = [100, 98, 92, 80, 56, 0];
console.log(table(["Combination", "Consumer goods (thousand units)", "Capital goods (thousand units)"], x.map((v, i) => ["ABCDEF"[i], v, y[i]])));
console.log(oc(x, y));
// constant cost: food (x) vs cloth (y)
const x2 = [0, 20, 40, 60, 80], y2 = [40, 30, 20, 10, 0];
console.log(oc(x2, y2));
// decreasing cost (convex): x vs y
const x3 = [0, 10, 20, 30, 40], y3 = [50, 20, 8, 2, 0];
console.log(oc(x3, y3));
// growth: new PPC all points +25%
console.log(x.map((v) => v * 1.25), y.map((v) => v * 1.25));
// actual vs potential: actual (60, 70) vs potential on curve (60,80)
console.log("idle share", pctChange(70, 80), (80 - 70) / 80 * 100);
// Capital-goods-biased growth: new y-axis intercept 120 and x-intercept unchanged
