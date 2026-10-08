// Tables for lessons/production/productivity.md (W2b).
import { productivity, table, pctChange, fmt, check } from "../lib.mjs";
// Worked example 1: two fictional brick works.
const A = { out: 36000, workers: 20, hours: 40 }, B = { out: 45000, workers: 30, hours: 40 };
console.log(table(["Firm", "Bricks per week", "Workers", "Bricks per worker per week"], [["Brickworks A", A.out, A.workers, A.out / A.workers], ["Brickworks B", B.out, B.workers, B.out / B.workers]]));
console.log("per hour A", A.out / A.workers / A.hours, "B", B.out / B.workers / B.hours);
// Worked example 2: TP/AP/MP for a fictional market garden.
const workers = [0, 1, 2, 3, 4, 5, 6];
const tp = [0, 20, 50, 90, 120, 140, 150];
const t = productivity.table({ workers, tp });
console.log(t.md);
for (const r of t.rows) console.log(r.w, r.ap, r.mp);
// Investment effect
console.log(fmt(pctChange(1800, 2250), 1));
check("mp4", t.rows[4].mp, 30);
