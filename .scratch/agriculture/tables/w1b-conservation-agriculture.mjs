// Lesson numbers for crops/conservation-agriculture.
import { plantPopulation, perStation, field, round, fertiliser } from "../lib.mjs";
const plot = field(39, 16);
const pop = plantPopulation({ rowCm: 75, inRowCm: 60 });
console.log(plot, pop, "basins on plot ~", round(plot.m2 / pop.m2PerStation, 1));
console.log("g per basin at 300 kg/ha", round(perStation({ rateKgHa: 300, population: pop.perHa }), 2));
const f = fertiliser({ rateKgHa: 300, areaM2: plot.m2 }); console.log(f);
