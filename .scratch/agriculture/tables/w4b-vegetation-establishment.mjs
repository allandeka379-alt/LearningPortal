// Lesson numbers for pasture/vegetation-establishment.
import { fertiliser, field } from "../lib.mjs";
const f = field(250, 100);
console.log(f);
console.log("seed kg at 6 kg/ha", 6 * f.ha, "legume 4 kg/ha", 4 * f.ha);
console.log("SSP 300 kg/ha", fertiliser({ rateKgHa: 300, areaHa: f.ha }));
