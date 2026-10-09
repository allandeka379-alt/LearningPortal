// Lesson numbers for health/internal-parasites (assumed dose 1 mL per 10 kg).
import { pct, round } from "../lib.mjs";
const heaviest = Math.max(28, 32, 41);
console.log("dose per goat mL", round(heaviest / 10, 2), "for 20 goats", round((heaviest / 10) * 20, 2));
console.log("pale eyelids %", pct(12, 60));
