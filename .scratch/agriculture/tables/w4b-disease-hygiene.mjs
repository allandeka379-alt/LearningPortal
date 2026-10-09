// Lesson numbers for health/disease-hygiene.
import { dilution, mortalityPct } from "../lib.mjs";
console.log("footbath 40 L at 1:39", dilution({ ratio: 39, tankL: 40 }));
console.log("spray 15 L at 20 mL/L", dilution({ mlPerL: 20, tankL: 15 }));
console.log("mortality 12/400", mortalityPct({ died: 12, started: 400 }));
