// Tables for lessons/labour/division-of-labour.md (W2b).
import { table, check, pctChange, fmt } from "../lib.mjs";
// Worked example 1: a furniture workshop, 5 carpenters, chairs per day.
const before = [3, 3, 3, 3, 3]; // each makes whole chairs
const tBefore = before.reduce((a, b) => a + b, 0);
const after = 24; // with division of labour
check("tb", tBefore, 15);
console.log(table(["Method", "Workers", "Chairs per day", "Chairs per worker per day"], [["Each carpenter makes whole chairs", 5, tBefore, tBefore / 5], ["Division of labour (cut, shape, join, sand, finish)", 5, after, after / 5]]));
console.log("pct", fmt(pctChange(tBefore, after), 1), pctChange(tBefore, after));
// Worked example 2: specialisation between two people (Chipo and Rudo), hours to do each task.
