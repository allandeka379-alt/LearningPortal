// Lesson numbers for livestock/digestion: capacities of the stomach compartments of a cow (fictional, typical shape).
import { pct, round, check, table } from "../lib.mjs";
const C = [["Rumen", 160], ["Reticulum", 10], ["Omasum", 15], ["Abomasum", 15]];
const total = C.reduce((s, [, v]) => s + v, 0);
check(total === 200, "total");
console.log(table(["Compartment", "Capacity (L)", "Share of stomach (%)"], C.map(([n, v]) => [n, v, round(pct(v, total), 1)])));
console.log("total", total, C.map(([n, v]) => `${n} ${pct(v, total)}`));
