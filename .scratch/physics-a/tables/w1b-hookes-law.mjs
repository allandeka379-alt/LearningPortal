import { linFit, sfStr, dpStr } from "../lib.mjs";
const F = [0, 1.0, 2.0, 3.0, 4.0, 5.0, 6.0];
const L = [15.0, 17.6, 20.0, 22.4, 25.1, 27.5, 31.2]; // cm
const x = L.map((l) => l - 15.0);
console.log(F.map((f, i) => `| ${f.toFixed(1)} | ${L[i].toFixed(1)} | ${dpStr(x[i], 1)} |`).join("\n"));
const fit = linFit(x.slice(0, 6).map((v) => v / 100), F.slice(0, 6)); console.log("k", fit);
console.log("grad from points (0,0),(0.125,5.0)", 5.0 / 0.125);
// series/parallel
const k = 60; console.log("series", k / 2, 4.5 / (k / 2), "parallel", 2 * k, 4.5 / (2 * k));
