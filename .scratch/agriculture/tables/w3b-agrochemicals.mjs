// Lesson numbers for protection/agrochemicals.
import { sprayVolume, dilution, round } from "../lib.mjs";
const s = sprayVolume({ litresUsed: 4, areaM2: 200, tankL: 15 }); console.log(s, "fills", Math.ceil(s.tanksPerHa));
console.log("product per tank (1.5 L/ha, 200 L/ha, 15 L)", 1.5 * 1000 * 15 / s.lPerHa, "mL");
console.log("ratio 1:49 in 20 L", dilution({ ratio: 49, tankL: 20 }));
console.log("2.5 mL/L in 15 L", dilution({ mlPerL: 2.5, tankL: 15 }));
