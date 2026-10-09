// Lesson numbers for structures/water-supply.
import { round } from "../lib.mjs";
const v = Math.PI * 1.5 ** 2 * 2; console.log("tank m3", round(v, 3), "L", Math.round(v * 1000));
const demand = 30 * 50; console.log("demand", demand, "days", round(Math.round(v * 1000) / demand, 1));
