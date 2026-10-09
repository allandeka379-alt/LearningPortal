// Lesson numbers for soil/nitrogen-cycle.
import { productForNutrient, nutrientKg, round, pct } from "../lib.mjs";
// Example 1: N left by a soya crop (assume 60 kg N/ha) as AN equivalent.
console.log("AN eq", round(productForNutrient(60, 34.5), 1), "bags", Math.ceil(productForNutrient(60, 34.5) / 50));
// Example 2: nitrogen budget for a hectare (assume): applied 120, crop uptake 78, leached 24, denitrified 6 -> remaining
const applied = 120, uptake = 78, leached = 24, denit = 6; console.log("left", applied - uptake - leached - denit, "pct taken", pct(uptake, applied), "pct lost", pct(leached + denit, applied));
