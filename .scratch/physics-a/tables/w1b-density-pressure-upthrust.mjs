import { DATA, sfStr, sciTex } from "../lib.mjs";
const g = DATA.g, rw = 1000, p0 = 1.01e5;
const h = 12; const pg = rw * g * h; console.log("WE1", pg, sfStr(pg, 3), "total", p0 + pg, sfStr(p0 + pg, 3));
const a = 0.2, bb = 0.1, c = 0.05, rs = 7800; const V = a * bb * c; const U = rw * g * V; const Wt = rs * V * g;
console.log("WE2 V", V, "U", U, "W", sfStr(Wt, 3), "app", sfStr(Wt - U, 3), "dp", rw * g * c, "A", a * bb, "F", rw * g * c * a * bb);
console.log("WE3 frac", 650 / 1000);
const dh = 0.15; console.log("WE4 manometer", rw * g * dh);
// hydrometer: tube area 1.5e-4 m^2, mass 0.030 kg; depth submerged in water vs liquid 0.80 g/cm3
const A = 1.5e-4, m = 0.03; console.log("hyd water depth", m / (rw * A), "liquid 800", m / (800 * A));
