// Lesson numbers for crops/other-cereals.
import { fertiliser, plantPopulation, seedRate, waterVolume, nutrientKg, round } from "../lib.mjs";
const pop = plantPopulation({ rowCm: 75, inRowCm: 15 }); console.log("sorghum pop", pop.perHa);
const sr = seedRate({ population: pop.perHa, thousandSeedMassG: 25, germinationPct: 80 }); console.log("sorghum seed", sr);
const wseed = fertiliser({ rateKgHa: 110, areaHa: 3 }); console.log("wheat seed", wseed);
const w = waterVolume({ areaM2: 30000, depthMm: 40 }); console.log("water", w);
console.log("N", nutrientKg(450, 7), nutrientKg(300, 34.5), nutrientKg(450, 7) + nutrientKg(300, 34.5));
