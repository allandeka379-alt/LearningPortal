// Checks for lessons/distributions/normal.md
import { chk, phiTable, Phi, invPhi, normalProb, round } from "../lib.mjs";
// Ex1: standard normal
chk(phiTable(1.24), 0.8925); chk(1 - phiTable(0.65), 0.2578); chk(phiTable(0.65), 0.7422);
chk(phiTable(1.2) - (1 - phiTable(0.5)), 0.5764, 1e-9);
// Ex2: X ~ N(50, 16), P(X > 55)
const p2 = normalProb(50, 4, 55);
console.log("P(X>55)", p2, 1 - phiTable(1.25));
chk(1 - phiTable(1.25), 0.1056, 1e-9);
// Ex3: P(46 < X < 53): z = -1, 0.75
chk(phiTable(0.75) - (1 - phiTable(1)), 0.6147, 1e-9);
console.log("between", normalProb(50, 4, 46, 53));
// Ex4: reverse: P(X < x) = 0.9 -> z = 1.282, x = 55.128
console.log("z0.9", invPhi(0.9), 50 + 4 * 1.282, 50 + 4 * invPhi(0.9));
// P(X > x) = 0.05 -> z = 1.645
console.log("z0.95", invPhi(0.95), 50 + 4 * 1.645);
// 68-95-99.7
console.log(Phi(1) - Phi(-1), Phi(2) - Phi(-2), Phi(3) - Phi(-3));
console.log("normal lesson checks OK", round(0.8925, 4));
