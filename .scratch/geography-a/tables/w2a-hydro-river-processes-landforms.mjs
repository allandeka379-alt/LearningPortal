import { chk, rnd, discharge, hydraulicRadius, sinuosity } from "../lib.mjs";
console.log("Q", discharge(12, 1.4, 0.9));
const rect = (w, d) => ({ A: w * d, P: w + 2 * d });
for (const [n, w, d] of [["upper", 3, 0.5], ["lower", 20, 3]]) { const { A, P } = rect(w, d); console.log(n, "A", A, "P", P, "R", hydraulicRadius(A, P)); }
console.log("sinuosity", sinuosity(6.9, 4.0));
