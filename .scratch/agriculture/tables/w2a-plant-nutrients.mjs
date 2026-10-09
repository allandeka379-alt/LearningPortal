// Lesson numbers for soil/plant-nutrients.
import { pct, round, productForNutrient, table } from "../lib.mjs";
// Worked example 1: missing-element pot trial (dry mass per pot, g).
const POTS = [["Complete solution", 24.0], ["No nitrogen", 9.6], ["No phosphorus", 13.2], ["No potassium", 18.0]];
console.log(table(["Solution", "Mean dry mass per pot (g)", "Reduction compared with complete (%)"],
  POTS.map(([n, g]) => [n, g.toFixed(1), n === "Complete solution" ? "—" : round(pct(POTS[0][1] - g, POTS[0][1]), 1)])));
// Worked example 2: N removed by grain and AN to replace it.
const tPerHa = 6, kgNPerT = 15;
const nRemoved = tPerHa * kgNPerT; console.log("N removed", nRemoved);
console.log("AN kg", round(productForNutrient(nRemoved, 34.5), 1), "bags", Math.ceil(productForNutrient(nRemoved, 34.5) / 50));
