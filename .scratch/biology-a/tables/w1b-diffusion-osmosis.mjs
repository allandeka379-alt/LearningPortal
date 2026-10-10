import { table, pctChange, dpStr, zeroCrossing, chk, mean, rnd } from "../lib.mjs";
// Lesson worked example 1: percentage change for one cylinder
const before = 3.20, after = 2.88;
console.log("pct", dpStr(pctChange(before, after), 1));
// Worked example 2: mean % change vs water potential of solution
const psi = [0, -250, -500, -750, -1000, -1250];
const b = [2.5, 2.5, 2.5, 2.5, 2.5, 2.5];
const a = [2.79, 2.66, 2.58, 2.47, 2.37, 2.29];
const pc = b.map((x, i) => pctChange(x, a[i]));
console.log(table(["Water potential of solution / kPa", "Initial mass / g", "Final mass / g", "Change in mass / %"], psi.map((p, i) => [p === 0 ? "0" : `−${-p}`, b[i].toFixed(2), a[i].toFixed(2), (pc[i] > 0 ? "+" : "") + dpStr(pc[i], 1)])));
const rounded = pc.map((x) => rnd(x, 1));
console.log(rounded, "zero", zeroCrossing(psi, rounded));
