import { DATA, sfStr, sciTex } from "../lib.mjs";
// WE1 hose
const Q = 0.40e-3, d1 = 0.020, d2 = 0.0060;
const A = (d) => Math.PI * d * d / 4;
const v1 = Q / A(d1), v2 = Q / A(d2);
console.log("A1", sciTex(A(d1)), "A2", sciTex(A(d2)), "v1", v1, "v2", v2, "ratio", (d1 / d2) ** 2);
// pressure difference between pipe and nozzle (horizontal)
console.log("dp", 0.5 * 1000 * (v2 ** 2 - v1 ** 2));
// WE2 Venturi
const A1 = 2.0e-3, A2 = 0.50e-3, dp = 12e3, rho = 1000;
const u1 = Math.sqrt((2 * dp) / (rho * ((A1 / A2) ** 2 - 1)));
console.log("v1", u1, "v2", u1 * A1 / A2, "Q", u1 * A1);
// tank
console.log("torricelli 1.8 m", Math.sqrt(2 * DATA.g * 1.8));
