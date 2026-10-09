// Lesson numbers for health/signs-of-health.
import { mean, pct, round } from "../lib.mjs";
console.log("pulse/min from 15 s count 16:", 16 * 4, "resp from 30 s count 11:", 11 * 2);
const temps = [38.4, 38.7, 40.9, 38.5, 38.6];
console.log("mean all", round(mean(temps), 2), "mean without cow C", round(mean(temps.filter((x) => x !== 40.9)), 2), "C above 38.5 by", round(40.9 - 38.5, 1));
console.log("% herd off feed", pct(6, 48));
