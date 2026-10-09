// Lesson numbers for business/risk-decisions.
import { mean } from "../lib.mjs";
const m = [600, 750, 200, 680, 720], s = [420, 460, 380, 450, 440];
console.log(mean(m), Math.max(...m) - Math.min(...m), mean(s), Math.max(...s) - Math.min(...s));
