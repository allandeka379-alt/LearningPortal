// Checks the worked examples of lessons/normal/inverse-parameters.md.
import { invPhi, round, sfStr, chk, Phi } from "../lib.mjs";
const z90 = invPhi(0.9), z98 = invPhi(0.98), z85 = invPhi(0.85);
console.log("z0.9", z90, round(z90, 3), "z0.98", z98, round(z98, 3), "z0.85", z85, round(z85, 3));
console.log("Ex1 h", 165 + 8 * z90, sfStr(165 + 8 * z90, 4), "with 1.282:", 165 + 8 * 1.282);
console.log("Ex2 sigma", 5 / z98, sfStr(5 / z98, 3), "with 2.054:", 5 / 2.054);
const s = 30 / (z85 + z90), m = 60 + z85 * s;
console.log("Ex3 sigma", s, sfStr(s, 3), "mu", m, sfStr(m, 3), "with table z", 30 / (1.036 + 1.282), 60 + 1.036 * 30 / 2.318);
chk(Phi((60 - m) / s), 0.15, 1e-9); chk(1 - Phi((90 - m) / s), 0.1, 1e-9);
// Ex4 quartiles / IQR: N(50, 12^2) IQR
const zq = invPhi(0.75); console.log("zq", zq, round(zq, 3), "IQR", 2 * 12 * zq, sfStr(2 * 12 * zq, 3));
