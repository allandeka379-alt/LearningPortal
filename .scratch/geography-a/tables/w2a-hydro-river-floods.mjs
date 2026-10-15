import { chk, rnd } from "../lib.mjs";
// Worked A: runoff coefficient before and after urbanisation
const area = 25, rain = 80; // km2, mm
const rainVol = area * 1e6 * (rain / 1000);
console.log("rain volume m3", rainVol);
const run1 = 1.0e6, run2 = 1.4e6;
console.log("coef before", run1 / rainVol, "after", run2 / rainVol);
// Worked B: peak change
const p1 = 38, p2 = 61;
console.log("pct increase", rnd(((p2 - p1) / p1) * 100, 1), "ratio", p2 / p1);
// bankfull: flood height above bankfull
console.log("excess", 61 - 45);
// Exam items: lag change, damage
console.log("pct 4 -> 2.5 h", ((4 - 2.5) / 4) * 100);
const dep = [5, 18, 31, 22]; console.log("sum", dep.reduce((a,b)=>a+b,0));
