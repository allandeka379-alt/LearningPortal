import { DATA, sfStr } from "../lib.mjs";
const g = DATA.g;
console.log("WE1", 1800 * 25);
const F = 4000 + 15000 * g * 0.05; console.log("WE2 F", F, "P", F * 12, sfStr(F * 12, 3));
const u = 0.5 * g * 45; console.log("WE3 useful", u, "eff", 100 * u / 400);
console.log("WE4 vmax", 60000 / 2000, "a", (60000 / 20 - 1200) / 1000);
