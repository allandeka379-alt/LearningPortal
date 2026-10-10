// W3a lesson numbers for photosynthesis/limiting-factors.md
import { table, inverseSquare, dpStr, sfStr, chk, mean } from "../lib.mjs";
const d = [10, 15, 20, 30, 35];
const bubbles = [[62, 60, 61], [44, 46, 45], [30, 29, 31], [14, 13, 15], [11, 10, 9]];
const rows = d.map((x, i) => [x, dpStr(inverseSquare(x) * 1e4, 1), ...bubbles[i], dpStr(mean(bubbles[i]), 0)]);
console.log(table(["Distance / cm", "Relative light intensity (10 000/d²)", "Bubbles 1", "Bubbles 2", "Bubbles 3", "Mean bubbles per min"], rows));
console.log("ratio 10 vs 20", inverseSquare(10) / inverseSquare(20));
// CO2 x light
const li = [0, 10, 20, 30, 40, 50, 60];
const low = [0, 12, 20, 23, 24, 24, 24];
const high = [0, 13, 25, 36, 44, 48, 48];
console.log(table(["Light intensity / arbitrary units", ...li.map(String)], [["Rate at 0.04% CO₂ / arbitrary units", ...low.map(String)], ["Rate at 0.10% CO₂ / arbitrary units", ...high.map(String)]]));
