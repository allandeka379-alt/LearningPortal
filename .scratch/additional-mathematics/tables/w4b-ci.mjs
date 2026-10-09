// Checks for lessons/estimation/confidence-intervals.md
import { chk, ciMean, sf } from "../lib.mjs";
// Ex1: σ = 6, n = 36, x̄ = 72.5, 95%
const c1 = ciMean(72.5, 6, 36, 95);
chk(c1.se, 1); chk(c1.lo, 70.54, 1e-9); chk(c1.hi, 74.46, 1e-9);
// Ex2: large sample: n = 80, Σx = 4280, Σx² = 233 520 -> x̄ = 53.5, s² = (233520 − 4280²/80)/79
const n = 80, xb = 4280 / 80; chk(xb, 53.5);
const sxx = 233520 - 4280 * 4280 / 80; console.log("Sxx", sxx);
const s2v = sxx / 79, s = Math.sqrt(s2v); console.log("s2", s2v, "s", s);
const c2 = ciMean(xb, s, n, 99); console.log("99% CI", c2.lo, c2.hi, sf(c2.lo, 3), sf(c2.hi, 3), "se", c2.se);
// Ex3: sample size: width ≤ 2 at 95% with σ = 5: 2·1.96·5/√n ≤ 2 -> √n ≥ 9.8 -> n ≥ 96.04 -> 97
console.log("n", (1.96 * 5) ** 2, Math.ceil((1.96 * 5) ** 2));
// Ex4: comparing widths 95% vs 99% for Ex1
const c1b = ciMean(72.5, 6, 36, 99); console.log("99% ex1", c1b.lo, c1b.hi);
console.log("ci lesson checks OK");
