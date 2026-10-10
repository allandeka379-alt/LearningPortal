import { titre, meanTitre, molesFromSolution, pctErrorDifference, sfStr, sciStr, dpStr } from "../lib.mjs";
const runs = [[0.00, 25.60], [0.85, 26.00], [0.40, 25.65], [1.65, 26.85]].map(([a, b]) => titre(a, b));
console.log(runs.map(x=>x.toFixed(2)));
const m = meanTitre(runs.slice(1)); console.log(m.mean, m.used);
const n = molesFromSolution(m.mean, 0.05); const g = n * 10 * 63.5; console.log(sciStr(n), sfStr(g, 3), sfStr(g / 1.25 * 100, 3), sfStr(pctErrorDifference(0.05, m.mean), 3));
