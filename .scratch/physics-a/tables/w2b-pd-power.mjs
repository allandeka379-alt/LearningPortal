import { DATA, sfStr, sciPlain } from "../lib.mjs";
const P = 2000, V = 230; console.log("WE1 I", P / V, sfStr(P / V, 3), "R", V * V / P, "E 3min", P * 180);
const kwh = 3.0 * 2.5 * 30; console.log("WE2 kWh", kwh, "J", sciPlain(kwh * 3.6e6), "cost", kwh * 0.12);
console.log("WE3 cable P", 12 * 12 * 0.15, "V", 12 * 0.15);
// lamp: 60 W 230 V vs at 115 V (constant R)
console.log("lamp R", 230 * 230 / 60, "P at 115", 115 * 115 / (230 * 230 / 60));
