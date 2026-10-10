import { DATA, sfStr } from "../lib.mjs";
const g = DATA.g;
console.log("WE1 v", Math.sqrt(2 * g * 0.2));
const m = 600, h = 25, u = 2, v = 20; const gp = m * g * h, k1 = 0.5 * m * u * u, k2 = 0.5 * m * v * v;
console.log("WE2", gp, k1, k2, "lost", gp + k1 - k2, "F", (gp + k1 - k2) / 80);
const mb = 0.15; const a = mb * g * 20, kb = 0.5 * mb * 18 ** 2; console.log("WE3", a, kb, a - kb, (a - kb) / 20);
