// W3a lesson numbers for respiration/anaerobic.md
import { table, chk, sfStr, dpStr, mean } from "../lib.mjs";
// Worked 1: comparing yields
const aer = 32, ana = 2;
console.log("ratio", aer / ana, "pct", sfStr(ana / aer * 100, 3));
chk(aer / ana, 16);
// Worked 2: yeast fermentation of sugars, gas collected in 10 min (three replicates)
const sugars = ["Glucose", "Sucrose", "Maltose", "Lactose"];
const reps = [[8.4, 8.0, 8.2], [7.1, 7.5, 7.3], [5.2, 4.8, 5.0], [0.2, 0.1, 0.0]];
const rows = sugars.map((s, i) => [s, ...reps[i].map((x) => x.toFixed(1)), dpStr(mean(reps[i]), 1), dpStr(mean(reps[i]) / 10, 2)]);
console.log(table(["Sugar", "Volume 1 / cm³", "Volume 2 / cm³", "Volume 3 / cm³", "Mean volume / cm³", "Mean rate / cm³ min⁻¹"], rows));
