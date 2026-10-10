// Lesson numbers for measurement.errors-uncertainties (W1a).
import { pctUnc, fracUnc, sfStr } from "../lib.mjs";
// 1. temperature rise
console.log("dtheta", 64.0 - 21.5, "unc", 1.0, "%", pctUnc(1.0, 42.5));
// 2. density of a steel ball
const d = 1.27; // cm
const m = 8.4; // g
const V = (Math.PI * d ** 3) / 6;
const rho = m / V;
const p = fracUnc([[m, 0.1, 1], [d, 0.001, 3]]) * 100;
console.log("V", V, "rho g/cm3", rho, "kg/m3", rho * 1000, "%m", pctUnc(0.1, m), "%d", pctUnc(0.001, d), "3%d", 3 * pctUnc(0.001, d), "total%", p, "abs", (p / 100) * rho * 1000);
// 3. kinetic energy
const Ek = 0.5 * 0.25 * 3.6 ** 2;
const pk = fracUnc([[0.25, 0.002, 1], [3.6, 0.1, 2]]) * 100;
console.log("Ek", Ek, "%m", pctUnc(0.002, 0.25), "%v", pctUnc(0.1, 3.6), "total", pk, "abs", (pk / 100) * Ek, sfStr(Ek, 3));
