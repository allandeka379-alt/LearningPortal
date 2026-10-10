import { sfStr, dpStr, table } from "../lib.mjs";
const G = -47 / 4.7; console.log("G", G, "Vout", G * 0.35, "1.2->", G * 1.2, "max in", 9 / 10);
console.log(table(["Vin", "Vout"], [-1.2, -0.9, -0.6, -0.3, 0, 0.3, 0.6, 0.9, 1.2].map((v) => [dpStr(v, 1), dpStr(Math.max(-9, Math.min(9, G * v)), 1)])));
const Gn = 1 + 20 / 1.0; console.log("Gn", Gn, Gn * 0.25);
console.log("bw", 1e6 / 100);
