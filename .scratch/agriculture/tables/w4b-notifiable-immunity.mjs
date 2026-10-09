// Lesson numbers for health/notifiable-immunity.
import { pct } from "../lib.mjs";
console.log("vials", 1250 / 500, Math.ceil(1250 / 500), "left over doses", 3 * 500 - 1250);
console.log("% vaccinated", pct(180, 240));
