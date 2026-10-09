// Lesson numbers for soil/inorganic-fertilisers.
import { fertiliser, perStation, plantPopulation, nutrientKg, productForNutrient, round } from "../lib.mjs";
const f1 = fertiliser({ rateKgHa: 350, areaHa: 2.5 }); console.log("ex1", f1);
const pop = plantPopulation({ rowCm: 90, inRowCm: 30 }); console.log("pop", pop.perHa, "g/station", round(perStation({ rateKgHa: 350, population: pop.perHa }), 2));
console.log("bag 7:14:7", nutrientKg(50, 7), nutrientKg(50, 14), nutrientKg(50, 7));
console.log("AN for 80 kg N", round(productForNutrient(80, 34.5), 1));
