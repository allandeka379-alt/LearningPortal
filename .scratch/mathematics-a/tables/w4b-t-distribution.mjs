import { mean, s2, tTable, tCdf, est } from "../lib.mjs";
const { sqrt } = Math;
const d1 = [4.2, 3.8, 5.1, 4.6, 4.9, 3.9, 4.4, 5.3];
const m1 = mean(d1), v1 = s2(d1), s1 = sqrt(v1), t1 = tTable(7, 0.975);
console.log("Ex1 n", d1.length, "sum", d1.reduce((a, b) => a + b), "sumsq", d1.reduce((a, b) => a + b * b, 0), "mean", m1, "s2", v1, "s", s1, "t", t1, "half", t1 * s1 / sqrt(8), "CI", m1 - t1 * s1 / sqrt(8), m1 + t1 * s1 / sqrt(8));
// Ex2: sugar packets, n = 10, Σx = 4968, Σx² = 2468244 ; H1: μ < 500, 5%
const e2 = est(10, 4968, 2468244);
const ts2 = (e2.mean - 500) / sqrt(e2.s2 / 10);
console.log("Ex2", e2, "s", sqrt(e2.s2), "t", ts2, "crit", tTable(9, 0.95), "p", tCdf(ts2, 9));
// Ex3: n = 12, xbar = 23.4, s = 2.9 ; H0 mu = 25 two-tailed 1%
const ts3 = (23.4 - 25) / (2.9 / sqrt(12));
console.log("Ex3 t", ts3, "crit", tTable(11, 0.995), "p2", 2 * tCdf(ts3, 11));
console.log("crits", tTable(7, 0.975), tTable(9, 0.95), tTable(11, 0.995), tTable(5, 0.975), tTable(15, 0.95), tTable(20, 0.975));
