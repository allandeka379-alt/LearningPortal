// Lesson numbers for land/crop-rotation.
import { productForNutrient, round } from "../lib.mjs";
console.log("course ha", 12 / 4, "manure t", 10 * 3);
const an = productForNutrient(40, 34.5); console.log("AN kg/ha", an, "3 ha", an * 3, "bags", an * 3 / 50, Math.ceil(an * 3 / 50));
