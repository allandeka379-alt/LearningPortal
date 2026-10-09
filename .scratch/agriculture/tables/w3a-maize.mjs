// Lesson numbers for crops/maize.
import { fertiliser, perStation, plantPopulation, seedRate, nutrientKg, yieldPerHa, round, check } from "../lib.mjs";
const A = 1.8;
const pop = plantPopulation({ rowCm: 90, inRowCm: 30, areaHa: A });
console.log("pop/ha", pop.perHa, "total", pop.total, "m2/station", pop.m2PerStation);
const sr = seedRate({ population: pop.perHa, thousandSeedMassG: 320, germinationPct: 90 });
console.log("seed", sr, "for field", sr.kgPerHa * A);
const cd = fertiliser({ rateKgHa: 400, areaHa: A }); console.log("CD", cd, "g/station", perStation({ rateKgHa: 400, population: pop.perHa }));
const an = fertiliser({ rateKgHa: 240, areaHa: A }); console.log("AN", an, "per split kg", an.kg / 2, "g/plant per split", perStation({ rateKgHa: 120, population: pop.perHa }));
console.log("N/ha", nutrientKg(400, 7) + nutrientKg(240, 34.5), nutrientKg(400, 7), nutrientKg(240, 34.5));
const y = yieldPerHa({ kg: 9450, areaHa: A }); console.log("yield", y, "bags", 9450 / 50);
