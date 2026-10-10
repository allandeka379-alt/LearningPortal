import { sfStr, sciTex, dpStr } from "../lib.mjs";
const m = 0.4, w = 5.0, x0 = 0.1; const E = 0.5 * m * w * w * x0 * x0; const Ep = 0.5 * m * w * w * 0.06 ** 2;
console.log("E", E, "Ep", Ep, "Ek", E - Ep, "x eq", x0 / Math.SQRT2);
const m2 = 0.2, T = 1.6, a2 = 0.05; const w2 = 2 * Math.PI / T; const E2 = 0.5 * m2 * w2 * w2 * a2 * a2;
console.log("w2", w2, "E2", sciTex(E2), "vmax", sfStr(Math.sqrt(2 * E2 / m2), 3), "w*x0", w2 * a2);
console.log([0, 0.25, 0.5, 0.75, 1].map((r) => `| ${dpStr(r, 2)} | ${dpStr(r * r, 4)} | ${dpStr(1 - r * r, 4)} |`).join("\n"));
