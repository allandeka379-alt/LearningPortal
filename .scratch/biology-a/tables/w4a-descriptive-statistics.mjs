// Lesson tables for skills/descriptive-statistics.
import { mean, median, range, sd, se, ci95, table, dpStr, sfStr, sum, pctError } from "../lib.mjs";
// WE1: lengths of 8 bean pods (mm)
const pods = [92, 105, 98, 110, 101, 96, 103, 99];
const m = mean(pods);
console.log("pods mean", m, "median", median(pods), "range", range(pods));
console.log(table(["Pod", "x / mm", "x − x̄ / mm", "(x − x̄)² / mm²"], pods.map((x, i) => [i + 1, x, dpStr(x - m, 2), dpStr((x - m) ** 2, 2)])));
console.log("sum sq", sum(pods.map((x) => (x - m) ** 2)), "sd", sd(pods), "se", se(pods), ci95(pods));
// WE2: maize seedling height (cm) after 14 days with and without fertiliser, n = 10 each
const A = [14.2, 15.1, 13.8, 16.0, 14.9, 15.5, 14.4, 15.8, 14.7, 15.3];
const B = [12.6, 13.9, 12.1, 13.4, 12.8, 13.1, 14.0, 12.4, 13.6, 12.9];
for (const [n, x] of [["fert", A], ["none", B]]) { const c = ci95(x); console.log(n, "mean", c.mean, "sd", sd(x), "se", c.se, "lo", c.lower, "hi", c.upper); }
console.log("pct error", pctError(0.5, 25));
