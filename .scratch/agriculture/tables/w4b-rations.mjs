// Lesson numbers for nutrition/rations.
import { pearsonSquare, fcr, round, check } from "../lib.mjs";
const ps = pearsonSquare({ target: 16, high: { name: "soya", cp: 44 }, low: { name: "maize", cp: 9 }, totalKg: 500 });
console.log(ps);
console.log("cow production meal kg", 20 / 2.5);
const f = fcr({ feedKg: 180, gainKg: 90 - 30 });
console.log("pig fcr", f);
const layersKg = (200 * 120 * 30) / 1000;
console.log("layers kg", layersKg, "bags", layersKg / 50, Math.ceil(layersKg / 50));
