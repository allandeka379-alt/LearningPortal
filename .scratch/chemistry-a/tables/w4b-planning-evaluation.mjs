import { Mr, linearFit, pctError, pctErrorDifference, sfStr, dpStr } from "../lib.mjs";
const m = 0.25 * 0.1 * Mr("Na2CO3"); console.log("Na2CO3", Mr("Na2CO3"), "mass", sfStr(m, 3));
console.log("%unc weigh", sfStr(pctErrorDifference(0.005, 2.65), 2), "titre", sfStr(pctErrorDifference(0.05, 24.5), 2), "pipette", sfStr(pctError(0.06, 25.0), 2));
const conc = [0.02, 0.04, 0.06, 0.08, 0.1]; const f = [1.03, 0.97, 1.02, 0.98, 1.0];
const rate = conc.map((c, i) => Number((0.5 * c * c * f[i]).toPrecision(3)));
const pts = conc.map((c, i) => [Math.log10(c), Math.log10(rate[i])]);
console.log(rate, pts.map(([x, y]) => [dpStr(x, 2), dpStr(y, 2)]));
const fit = linearFit(pts); console.log("m", fit.m, "c", fit.c, "k", 10 ** fit.c);
