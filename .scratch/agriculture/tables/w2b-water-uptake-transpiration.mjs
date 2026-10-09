// Lesson numbers for plants/water-uptake-transpiration.
import { pct, pctChange, round, check, table } from "../lib.mjs";
// Worked example 1: potometer bubble distance in 5 minutes under four conditions (mm).
const rows = [["Still air, shade", 15], ["Still air, bright light", 30], ["Fan (wind), bright light", 55], ["Plastic bag over shoot (humid), bright light", 10]];
const mins = 5;
console.log(table(["Condition", "Distance moved in 5 min (mm)", "Rate (mm per min)"], rows.map(([c, d]) => [c, d, round(d / mins, 1)])));
console.log("wind vs still bright % increase", round(pctChange(30, 55), 1));
// Worked example 2: weighing a potted plant
const start = 1250, end = 1214, hours = 6;
const lost = start - end;
check(lost === 36, "lost");
console.log("lost", lost, "per hour", lost / hours, "pct of start", round(pct(lost, start), 2));
