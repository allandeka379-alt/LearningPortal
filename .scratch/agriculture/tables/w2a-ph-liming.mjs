// Lesson numbers for soil/ph-liming.
import { fertiliser, mean, round } from "../lib.mjs";
const L1 = fertiliser({ rateKgHa: 2000, areaHa: 0.6 }); console.log("ex1", L1);
console.log("times more acid pH 4.5 vs 6.5", 10 ** (6.5 - 4.5));
const subs = [5.1, 4.9, 5.3, 5.0, 4.8, 5.2]; console.log("mean", round(mean(subs), 2));
