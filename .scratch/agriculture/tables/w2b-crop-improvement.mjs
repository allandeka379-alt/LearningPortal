// Lesson numbers for breeding/crop-improvement (fictional trial yields, t/ha).
import { mean, pct, pctChange, round, check } from "../lib.mjs";
const A = 3.2, B = 2.8, F1 = 7.5;
const mid = mean([A, B]);
const het = pct(F1 - mid, mid);
console.log("mid", mid, "heterosis %", round(het, 1));
// Worked example 2: F1 7.5 -> F2 5.4 t/ha
const F2 = 5.4;
console.log("F2 change %", round(pctChange(F1, F2), 1), "loss t/ha", round(F1 - F2, 1));
// Seed field rows: 6 female : 2 male pattern repeated over 96 rows
const rows = 96, block = 8, fem = 6;
check(rows % block === 0, "rows");
console.log("female rows", rows / block * fem, "male", rows / block * 2);
