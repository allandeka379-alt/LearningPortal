// Lesson numbers for water/pollution-legislation.
import { pct, pctChange, round } from "../lib.mjs";
console.log("nitrate % increase", round(pctChange(2.0, 9.5), 1));
console.log("DO % fall", round(-pctChange(8.0, 2.4), 1));
console.log("dam loss %", round(pct(400000 - 340000, 400000), 1));
