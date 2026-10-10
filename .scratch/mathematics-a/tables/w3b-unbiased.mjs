import { est, s2, mean, variance, sum } from "../lib.mjs";
const d = [4.2, 3.8, 5.1, 4.6, 3.9, 4.4];
console.log("ex1", sum(d), sum(d.map((x) => x * x)), mean(d), variance(d), s2(d));
console.log("ex2", est(40, 1260, 40500));
console.log("ex3 coded", est(25, -15, 289), 200 + -15 / 25);
const xs = [1, 2, 3, 4], fs = [12, 15, 9, 4];
const n = sum(fs), sx = sum(xs.map((x, i) => x * fs[i])), sxx = sum(xs.map((x, i) => x * x * fs[i]));
console.log("ex4", n, sx, sxx, est(n, sx, sxx));
console.log("combine", est(20, 166, 1440), est(12, 96, 800), est(8, 70, 640), 166 ** 2 / 20);
