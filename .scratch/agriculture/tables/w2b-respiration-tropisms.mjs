// Lesson numbers for plants/respiration-tropisms.
import { round, check, table } from "../lib.mjs";
// Vacuum flasks: soaked live bean seeds vs boiled (dead) seeds, temperature (°C) over 3 days.
const live = [22.0, 24.5, 27.0, 29.5];
const dead = [22.0, 22.0, 22.5, 22.0];
console.log(table(["Day", "Flask A: live seeds (°C)", "Flask B: boiled seeds (°C)"], live.map((v, i) => [i, v.toFixed(1), dead[i].toFixed(1)])));
const riseA = round(live[3] - live[0], 1), riseB = round(dead[3] - dead[0], 1);
check(riseA === 7.5 && riseB === 0, "rises");
console.log("riseA", riseA, "mean per day", round(riseA / 3, 1));
