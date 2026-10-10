import { table, dpStr } from "../lib.mjs";
const conc = [0, 0.2, 0.4, 0.6, 0.8, 1.0], T = [20, 34, 47, 61, 74, 88];
console.log(table(["Glucose concentration / % (w/v)", "Transmission / %"], conc.map((c, i) => [dpStr(c, 1), T[i]])));
const interp = (y) => { for (let i = 0; i < T.length - 1; i++) if (y >= T[i] && y <= T[i + 1]) return conc[i] + (y - T[i]) * (conc[i + 1] - conc[i]) / (T[i + 1] - T[i]); };
console.log("unknown 55% ->", interp(55));
// semi-quant times
const c2 = [0.2, 0.4, 0.6, 0.8, 1.0], t2 = [148, 92, 61, 44, 35];
console.log(table(["Glucose / % (w/v)", "Time to first colour change / s", "Rate (1000/t) / s⁻¹"], c2.map((c, i) => [dpStr(c, 1), t2[i], (1000 / t2[i]).toFixed(1)])));
console.log("unknown 75 s rate", 1000/75);
