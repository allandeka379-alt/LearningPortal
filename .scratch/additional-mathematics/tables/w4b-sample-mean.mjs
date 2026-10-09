// Checks for lessons/sampling/sample-mean.md
import { chk, phiTable, Phi, normalProb, sf, invPhi } from "../lib.mjs";
// Ex1: X ~ N(40, 9), n = 16: X̄ ~ N(40, 9/16), sd 0.75; P(X̄ > 41)
chk(Math.sqrt(9 / 16), 0.75);
console.log("z", 1 / 0.75, "table", 1 - phiTable(1.33), normalProb(40, 0.75, 41));
console.log("single X > 41", 1 - Phi(1 / 3), 1 - phiTable(0.33));
// Ex2: CLT: mean 150, sd 30, n = 50; P(X̄ < 145)
const se = 30 / Math.sqrt(50); console.log("se", se, "z", -5 / se, normalProb(150, se, -Infinity, 145), "table z", Math.round(-5 / se * 100) / 100, 1 - phiTable(1.18));
// Ex3: find n: P(X̄ > μ + 2) < 0.05 with σ = 10: 2/(10/√n) > 1.645 -> √n > 8.225 -> n > 67.65 -> 68
const nmin = Math.ceil((1.645 * 10 / 2) ** 2); console.log("n", (1.645 * 10 / 2) ** 2, nmin);
// Ex4: discrete population: die, mean 3.5, var 35/12, n = 36 -> Var(X̄) = 35/432
console.log("var mean die", 35 / 12 / 36, Math.sqrt(35 / 12 / 36));
console.log("sample-mean lesson checks OK");
