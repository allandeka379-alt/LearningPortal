// Lesson numbers for plants/germination.
import { germinationPct, seedRate, plantPopulation, round, check } from "../lib.mjs";
// Worked example 1: rag-doll test, 4 lots of 25 seeds.
const lots = [22, 21, 23, 19];
const g = lots.reduce((a, b) => a + b, 0);
console.log("germinated", g, "pct", germinationPct(g, 100));
// Worked example 2: seed rate for maize 75 x 30 cm, TSM 320 g, germination 85%.
const pop = plantPopulation({ rowCm: 75, inRowCm: 30 }).perHa;
const sr = seedRate({ population: pop, thousandSeedMassG: 320, germinationPct: 85 });
console.log("pop", pop, "seeds", sr.seeds, "kg/ha", sr.kgPerHa, round(sr.kgPerHa, 1));
const sr100 = seedRate({ population: pop, thousandSeedMassG: 320 });
console.log("kg/ha at 100%", round(sr100.kgPerHa, 1));
