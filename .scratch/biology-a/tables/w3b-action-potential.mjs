// Lesson numbers for coordination/action-potential (worked solutions).
import { chk } from "../lib.mjs";
const t = [0, 0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 4.0];
const mv = [-70, -55, 35, -10, -65, -80, -75, -70];
console.log("| Time / ms | " + t.map((x) => x.toFixed(1)).join(" | ") + " |");
console.log("| Potential / mV | " + mv.map((v) => (v > 0 ? "+" + v : "−" + -v)).join(" | ") + " |");
const amp = Math.max(...mv) - mv[0];
chk(amp, 105);
const refr = 0.002;
chk(1 / refr, 500);
console.log("amplitude", amp, "max frequency", 1 / refr);
