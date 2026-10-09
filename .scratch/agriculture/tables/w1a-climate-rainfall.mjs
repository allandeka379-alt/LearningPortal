import { pct, round, mean } from "../lib.mjs";
// Worked example 1: effectiveness of two storms on the same field
const stormA = { rain: 40, runoff: 6, evap: 4 }; // gentle, long storm
const stormB = { rain: 40, runoff: 22, evap: 2 }; // short, intense storm on bare soil
for (const s of [stormA, stormB]) { const eff = s.rain - s.runoff - s.evap; console.log(eff, pct(eff, s.rain)); }
console.log("intensity A over 8 h", 40 / 8, "B over 0.5 h", 40 / 0.5);
// Worked example 2: monthly water balance
const months = [["Nov", 95, 150], ["Dec", 170, 140], ["Jan", 200, 135], ["Feb", 60, 130], ["Mar", 85, 125]];
for (const [m, r, et] of months) console.log(m, r, et, r - et);
