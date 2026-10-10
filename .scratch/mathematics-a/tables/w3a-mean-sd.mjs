// Checks the worked examples of lessons/data/mean-sd.md.
import { chk, mean, sd, variance, freqStats, sum } from "../lib.mjs";
// Ex1 raw: litres of milk from 6 cows
const r = [12, 15, 9, 18, 14, 16];
console.log("Ex1 sum", sum(r), "sumsq", sum(r.map((x) => x * x)), "mean", mean(r), "var", variance(r), "sd", sd(r));
// Ex2 frequency: number of power cuts per week over 40 weeks
const ft = [[0, 6], [1, 11], [2, 13], [3, 7], [4, 3]];
const fs = freqStats(ft);
console.log("Ex2", fs);
// Ex3 totals: n = 25, Σx = 1150, Σx² = 54 000
const n = 25, sx = 1150, sxx = 54000;
console.log("Ex3 mean", sx / n, "var", sxx / n - (sx / n) ** 2, "sd", Math.sqrt(sxx / n - (sx / n) ** 2));
// Ex4 coded: n = 40, Σ(x−50) = 84, Σ(x−50)² = 1426
const m4 = 50 + 84 / 40, v4 = 1426 / 40 - (84 / 40) ** 2;
console.log("Ex4 mean", m4, "var", v4, "sd", Math.sqrt(v4), "Σx", 40 * m4, "Σx²", 1426 + 2 * 50 * 84 + 40 * 2500);
// Ex5 combine: A n=20 mean 31 sd 4; B n=30 mean 36 sd 5
const sA = 20 * 31, qA = 20 * (16 + 31 * 31), sB = 30 * 36, qB = 30 * (25 + 36 * 36);
const mC = (sA + sB) / 50, vC = (qA + qB) / 50 - mC * mC;
console.log("Ex5 sums", sA, qA, sB, qB, "mean", mC, "var", vC, "sd", Math.sqrt(vC));
