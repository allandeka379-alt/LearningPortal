// Checks for lessons/mechanics/newtons-laws.md and slice numbers
import { chk, suvat } from "../lib.mjs";
const g = 9.8;
chk((3000 - 600) / 1200, 2);
chk(70 * (g + 0.8), 742, 1e-9); chk(70 * (g - 0.8), 630, 1e-9);
const e3 = suvat({ u: 25, v: 0, a: -4500 / 900 }); chk(e3.s, 62.5); chk(e3.t, 5);
const a4 = (600 - 50 * g) / 50; chk(a4, 2.2, 1e-12); const e4 = suvat({ u: 0, a: a4, t: 3 }); console.log("ex4", e4.v, e4.s);
// slice
console.log(45 * (g - 1.2), 300 * (g + 0.5), 1100 * 400 / 80, 12000 - 8000 * 0.5);
const v = Math.sqrt(2 * g * 5), dec = v * v / (2 * 0.04); console.log("sand", v, dec, 0.2 * (dec + g));
console.log("lift", 680 * (g + 1.5), 80 * (g - 1), 3 + 12 + 4.5);
const a = (3000 - 720) / 1600; console.log("tow", a, 220 + 400 * a, 18 * 18 / (2 * 0.55));
