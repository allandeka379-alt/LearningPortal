import { sfStr, dpStr, table, linFit, ln } from "../lib.mjs";
const tau = 470e-6 * 22e3; console.log("WE1 tau", tau, "V15", 9 * Math.exp(-15 / tau));
console.log("WE2 t", 4.7 * Math.log(6));
const RC = 1000e-6 * 47e3; const t = [0, 10, 20, 30, 40, 50, 60];
const V = t.map((x) => Math.round(12 * Math.exp(-x / RC) * 100) / 100);
console.log(table(["$t\,/\,\text{s}$", "$V\,/\,\text{V}$", "$\ln(V/\text{V})$"], t.map((x, i) => [String(x), dpStr(V[i], 2), dpStr(ln(V[i]), 3)])));
const f = linFit(t, V.map(ln)); console.log(f, "RC", -1 / f.m, "half", 0.693 * RC);
