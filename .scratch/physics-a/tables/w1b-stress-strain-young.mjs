import { sfStr, sciTex, pctUnc } from "../lib.mjs";
const L = 2.5, d = 0.5e-3, F = 80, x = 5.1e-3;
const A = Math.PI * (d / 2) ** 2, s = F / A, e = x / L; console.log("WE1 A", A, "stress", s, "strain", e, "E", s / e);
const L2 = 1.8, d2 = 0.4e-3, F2 = 12, E2 = 1.2e11; const A2 = Math.PI * (d2 / 2) ** 2; const s2 = F2 / A2; console.log("WE2 A", A2, "s", s2, "e", s2 / E2, "x", (s2 / E2) * L2);
console.log("WE3 pct", 2 * pctUnc(0.01, 0.5), pctUnc(0.1, 5.1), pctUnc(0.002, 2.5), 2 * pctUnc(0.01, 0.5) + pctUnc(0.1, 5.1) + pctUnc(0.002, 2.5));
