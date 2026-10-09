import { pct, round, table, fmtNum, pctChange } from "../lib.mjs";
// Worked example: ward land use
const uses = [["Crop land", 3600], ["Grazing land", 5400], ["Woodland", 1800], ["Settlement and roads", 720], ["Steep hills and rock", 480]];
const total = uses.reduce((s, [, a]) => s + a, 0);
console.log("total", total);
console.log(table(["Land use", "Area (ha)", "Share (%)"], uses.map(([u, a]) => [u, fmtNum(a), round(pct(a, total), 1)])));
// Land per household
const arable = 480, before = 120, after = 200;
console.log("ha/hh before", arable / before, "after", arable / after, "change %", pctChange(arable / before, arable / after));
