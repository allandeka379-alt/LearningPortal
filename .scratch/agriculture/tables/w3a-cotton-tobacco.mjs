// Lesson numbers for crops/cotton-tobacco.
import { plantPopulation, pct, round } from "../lib.mjs";
const c = plantPopulation({ rowCm: 100, inRowCm: 30, areaHa: 2 }); console.log("cotton", c);
const t = plantPopulation({ rowCm: 120, inRowCm: 55, areaHa: 1.5 }); console.log("tobacco", t, "with 10% extra", t.total * 1.1);
console.log("lint", 1800 * 0.4, "seed", 1800 - 720);
