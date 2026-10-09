import { plantPopulation, germinationPct, round } from "../lib.mjs";
// Worked example 1: woodlot of 0.6 ha at 2.5 m x 2.0 m, 10% extra for beating up
const pop = plantPopulation({ rowCm: 250, inRowCm: 200, areaHa: 0.6 });
console.log(pop, pop.total * 1.1);
// Worked example 2: germination of seed in the nursery
console.log(germinationPct(1260, 1500));
// seeds needed to raise 1,320 seedlings at 84% germination and 90% survival after pricking out
console.log(1320 / 0.84 / 0.9);
