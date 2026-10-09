// Lesson numbers for water/water-cycle.
import { waterVolume, pct, round } from "../lib.mjs";
const v = waterVolume({ areaM2: 10000, depthMm: 25 }); console.log(v, "runoff 20%", v.m3 * 0.2, "infiltrated 70%", v.m3 * 0.7, "evap", v.m3*0.1);
// Example 2: well water table falls
const before = 6.5, after = 9.0; console.log("drop", after - before, "pct deeper", round(pct(after - before, before), 1));
