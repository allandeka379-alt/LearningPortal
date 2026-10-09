// Lesson numbers for water/irrigation-need-sources.
import { waterVolume, field, round } from "../lib.mjs";
const plot = field(100, 50); const day = waterVolume({ areaM2: plot.m2, depthMm: 6 }); console.log("plot", plot, "daily", day);
console.log("days dam lasts", 4500 / day.m3);
console.log("salt g/L", round(0.45 / 0.25, 2));
