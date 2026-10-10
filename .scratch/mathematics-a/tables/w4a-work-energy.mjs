// W4a lesson numbers: amaths.energy.work-energy
import { rad } from "../lib.mjs";
const S = (d) => Math.sin(rad(d)), C = (d) => Math.cos(rad(d));
console.log("Ex1", 50 * 12 * C(30));
console.log("Ex2", Math.sqrt(4 + 2 * 10 * 6), 4 + 120);
const WT = 120 * 25, PE = 200 * 25 * S(15), Fr = 0.3 * 200 * C(15) * 25, KE = WT - PE - Fr;
console.log("Ex3", WT, PE, Fr, KE, Math.sqrt((2 * KE) / 20), 0.3 * 200 * C(15), 25 * S(15));
const W4 = 1200 * 10 * 40 - 0.5 * 1200 * (18 * 18 - 100);
console.log("Ex4", W4, W4 / 500, 1200 * 10 * 40, 0.5 * 1200 * (324 - 100));
