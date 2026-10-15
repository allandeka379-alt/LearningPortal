import { mean, sd, range, median } from "../lib.mjs";
const r = [142, 96, 215, 63, 188, 121, 270, 77, 154, 134];
const m = mean(r), s = sd(r);
console.log("mean", m, "sd", s, "cv", s / m * 100, "range", range(r), "median", median(r), "sum", r.reduce((a,b)=>a+b));
console.log("AI A", 180 / 2100, "AI B", 420 / 1500);
console.log("deficit A", 2100 - 180);
console.log("diurnal", 41.5 - 14.0);
