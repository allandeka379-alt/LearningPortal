// Lesson numbers for crops/legumes.
import { fertiliser, plantPopulation, seedRate, pct, round } from "../lib.mjs";
const pop = plantPopulation({ rowCm: 45, inRowCm: 10 }); console.log("gn pop", pop.perHa);
const sr = seedRate({ population: pop.perHa, thousandSeedMassG: 450, germinationPct: 85 }); console.log("gn seed", sr);
const gyp = fertiliser({ rateKgHa: 250, areaHa: 0.6 }); console.log("gypsum", gyp);
const soy = fertiliser({ rateKgHa: 90, areaHa: 2 }); console.log("soy seed", soy, "sachets", Math.ceil(soy.kg / 50), soy.kg / 50);
console.log("shelling", pct(700, 1000));
