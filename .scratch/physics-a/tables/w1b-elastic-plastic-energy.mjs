import { sfStr } from "../lib.mjs";
console.log("WE1", 0.5 * 250 * 0.08 ** 2, "v", Math.sqrt((2 * 0.8) / 0.02));
const A = Math.PI * (0.25e-3) ** 2, F = 80, x = 5.1e-3, L = 2.5;
const s = F / A, e = x / L; console.log("WE3 u", 0.5 * s * e, "V", L * A, "E", 0.5 * s * e * L * A, "half Fx", 0.5 * F * x);
// non-Hooke: loading then unloading of copper wire: loaded to 40 N at 6.0 mm, LOP at 30 N 1.5 mm; permanent extension 4.4 mm
