// Lesson numbers for tectonics.plates-evidence (run: node .scratch/geography-a/tables/w2a-tectonics-plates-evidence.mjs)
import { chk, rnd, table } from "../lib.mjs";
// Example 1: rate = distance / age. 540 km in 18 million years.
const r1 = chk((540 * 1e6) / (18 * 1e6), 30); // mm per year (1 km per million years = 1 mm per year)
console.log("rate", r1, "mm/yr =", r1 / 10, "cm/yr");
// Example 2: ocean-floor ages along a line at 25 mm/yr
const dist = [0, 100, 250, 400, 650, 900];
const ages = dist.map((d) => d / 25);
console.log(table(["Distance from ridge axis (km)", "Age of basalt (million years)"], dist.map((d, i) => [d, ages[i]])));
console.log("gradient", 900 / ages[5]);
// opening an ocean 4500 km wide at full rate 50 mm/yr
console.log("ocean", chk((4500 * 1e6) / 50 / 1e6, 90), "million years");
