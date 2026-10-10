import { est, normalProb, Phi } from "../lib.mjs";
const z1 = (497.2 - 500) / (8 / Math.sqrt(30)); console.log("ex1", z1, Phi(z1), 8 / Math.sqrt(30));
const e = est(50, 1485, 44620); const z2 = (e.mean - 30) / Math.sqrt(e.s2 / 50); console.log("ex2", e, Math.sqrt(e.s2 / 50), z2, 2 * (1 - Phi(Math.abs(z2))));
console.log("ex3 crit", 75 + 1.645 * 6 / 5, 75 + 1.96 * 6 / 5, 75 - 1.96 * 6 / 5);
