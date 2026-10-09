// Lesson numbers for soil/organic-manures.
import { field, nutrientKg, productForNutrient, round } from "../lib.mjs";
// Example 1: manure for six garden beds 10 m x 1.2 m at 5 kg/m2; wheelbarrow 60 kg.
const bed = field(10, 1.2); const beds = 6; const area = bed.m2 * beds; const kg = area * 5;
console.log("bed m2", bed.m2, "area", area, "kg", kg, "barrows", kg / 60, Math.ceil(kg / 60 - 1e-9));
// Example 2: N in 10 t manure at 1.5% N, AN equivalent.
const n = nutrientKg(10000, 1.5); console.log("N", n, "AN", round(productForNutrient(n, 34.5), 1));
