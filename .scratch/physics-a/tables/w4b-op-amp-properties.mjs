import { sfStr, dpStr, table } from "../lib.mjs";
const A0 = 2.0e5, Vs = 12;
for (const vm of [1.49995, 1.4999]) { const d = 1.5 - vm; console.log("diff", d, "Vout", A0 * d); }
console.log("max diff", Vs / A0);
const Vp = 9 * 8.2 / 18.2; console.log("V+", Vp, "Rth switch", 3.3 * 8.2 / 10);
const R25 = 4.7, B = 3950;
const R = (c) => R25 * Math.exp(B * (1 / (c + 273.15) - 1 / 298.15));
console.log(table(["θ / °C", "R / kΩ", "V− / V"], [20, 25, 30, 35, 40, 45].map((c) => [c, sfStr(R(c), 3), dpStr(9 * R(c) / (3.3 + R(c)), 2)])));
console.log("slew", 24 / 0.5);
