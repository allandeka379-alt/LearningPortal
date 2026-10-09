// Lesson numbers for machinery/pumps-shellers.
import { round } from "../lib.mjs";
const perMin = 1.5 * 50; console.log("L/min", perMin, "L/h", perMin * 60, "min to fill 2000 L", round(2000 / perMin, 1));
console.log("hours to shell 1.2 t at 60 kg/h", 1200 / 60, "power 600 kg/h", 1200 / 600);
