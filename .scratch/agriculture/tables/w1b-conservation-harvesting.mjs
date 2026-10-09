// Lesson numbers for water/conservation-harvesting.
import { field, waterVolume, round } from "../lib.mjs";
const roof = field(10, 6);
const v = waterVolume({ areaM2: roof.m2, depthMm: 150 });
console.log(roof.m2, v.litres, "x0.8 =", v.litres * 0.8);
const tank = Math.PI * 1 ** 2 * 2; console.log("tank m3", round(tank, 2), "L", round(tank * 1000, 0));
// days of supply: 20 L/day per person, 6 people
console.log("days", (v.litres * 0.8) / (20 * 6));
