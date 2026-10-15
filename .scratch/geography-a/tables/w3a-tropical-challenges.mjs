import { pctChange, rnd, chk, table } from "../lib.mjs";
// Lesson: forest cover in a region (illustrative), thousand km2
const yrs = [1990, 2000, 2010, 2020];
const a = [420, 386, 361, 335];
console.log(table(["Year", "Forest cover (thousand km²)"], yrs.map((y, i) => [y, a[i]])));
console.log("loss 1990-2020", a[0] - a[3], "pct", (a[0] - a[3]) / a[0] * 100, "per yr", (a[0] - a[3]) / 30);
console.log("1990-2000 loss", a[0] - a[1], (a[0] - a[1]) / 10, "2010-2020", a[2] - a[3], (a[2] - a[3]) / 10);
// carbon
console.log("carbon million t C", 5000 * 100 * 150 / 1e6, "as CO2 x 3.67", 5000 * 100 * 150 / 1e6 * 44 / 12);
