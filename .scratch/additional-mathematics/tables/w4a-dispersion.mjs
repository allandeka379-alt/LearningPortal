// Checks for lessons/statistics/dispersion.md
import { chk, quartiles, variance, sd, freqStats, grouped, cv, mean } from "../lib.mjs";
const d1 = [4, 7, 8, 10, 12, 13, 15, 18, 20, 22, 30];
console.log("ex1", quartiles(d1), Math.max(...d1) - Math.min(...d1));
const d2 = [2, 4, 6, 8, 10]; chk(variance(d2), 8); console.log("ex2 sd", sd(d2));
const t3 = [[1, 3], [2, 7], [3, 10], [4, 6], [5, 4]]; console.log("ex3", freqStats(t3));
const G = grouped([[0, 20, 6], [20, 40, 14], [40, 60, 18], [60, 80, 9], [80, 100, 3]]);
console.log("ex4", G.n, G.mean, G.sumfx, G.sumfx2, G.variance, G.sd, G.q1, G.q3, G.q3 - G.q1, G.cf);
console.log("ex5", cv(0.6, 4.2), cv(0.7, 3.5));
