// Lesson numbers for water/drainage-leaching.
import { pct, round, nutrientKg } from "../lib.mjs";
// Example 1: water balance for a storm (mm)
const rain = 60, runoff = 12, evap = 6, stored = 22; console.log("drainage", rain - runoff - evap - stored);
// Example 2: leaching from one dose vs split
const an = 300; const N = nutrientKg(an, 34.5); console.log("N kg", N);
const lostOne = 0.3 * N, lostSplit = 0.1 * N; console.log(round(lostOne,2), round(lostSplit,2), "saved", round(lostOne - lostSplit, 2));
