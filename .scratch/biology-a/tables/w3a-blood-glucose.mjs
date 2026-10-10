// W3a lesson numbers for homeostasis/blood-glucose.md
import { table, chk, pctChange, dpStr } from "../lib.mjs";
// amplification (illustrative)
const steps = { camp: 100, pka: 1, gpk: 10, gp: 10, glucose1p: 100 };
// 1 glucagon-receptor -> 100 cAMP via adenylyl cyclase; each cAMP activates PKA (say 1:1, simplify: 100 PKA? Actually 2 cAMP per regulatory... keep "each step" factor)
const factors = [10, 10, 10, 10];
const total = factors.reduce((a, b) => a * b, 1);
console.log("total", total); chk(total, 10000);
// GTT
const time = [0, 30, 60, 90, 120];
const a = [4.8, 7.6, 6.5, 5.5, 5.0];
const d = [7.2, 12.4, 15.1, 14.0, 12.6];
console.log(table(["Time after glucose drink / min", ...time.map(String)], [["Person A / mmol dm⁻³", ...a.map((x) => x.toFixed(1))], ["Person B / mmol dm⁻³", ...d.map((x) => x.toFixed(1))]]));
console.log("A pct", dpStr(pctChange(a[0], a[1]), 1), "B pct", dpStr(pctChange(d[0], d[2]), 1));
