// Checks for lessons/distributions/normal-parameters.md
import { chk, invPhi, Phi, phiTable, sf } from "../lib.mjs";
// Ex1: X ~ N(mu, 25), P(X > 40) = 0.0668 -> z = 1.5 -> mu = 32.5
chk(1 - phiTable(1.5), 0.0668, 1e-9); chk(40 - 1.5 * 5, 32.5);
// Ex2: X ~ N(60, σ²), P(X < 52) = 0.15 -> z = -1.036 -> σ = 8/1.036
const s2 = 8 / 1.036; console.log("sigma", s2, sf(s2, 3), 8 / invPhi(0.85), invPhi(0.85));
// Ex3: P(X < 30) = 0.1, P(X > 54) = 0.25
const z1 = -1.2816, z2 = 0.6745;
const sigma = 24 / (z2 - z1), mu = 30 - z1 * sigma;
console.log("sigma", sigma, "mu", mu, sf(sigma, 3), sf(mu, 3));
chk(Phi((30 - mu) / sigma), 0.1, 1e-4); chk(1 - Phi((54 - mu) / sigma), 0.25, 1e-4);
// Ex4: context: bags of cement 50 kg; 2.5% under 49 kg with σ = 0.4 -> mu = 49 + 1.96*0.4
chk(49 + 1.96 * 0.4, 49.784); console.log("mu cement", 49 + 1.96 * 0.4);
console.log("normal-parameters lesson checks OK");
