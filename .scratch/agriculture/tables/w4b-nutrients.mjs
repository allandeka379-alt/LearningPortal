// Lesson numbers for nutrition/nutrients.
import { pct, round, check } from "../lib.mjs";
// WS1: dry matter of fresh grass: 250 g fresh dried to 60 g.
const dm = pct(60, 250);
check(dm === 24, "dm");
console.log("DM %", dm, "moisture %", 100 - dm, "water g", 250 - 60);
// Protein in DM: grass DM has 10% crude protein; 20 kg fresh grass eaten.
const dmKg = (20 * dm) / 100;
const cpKg = round((dmKg * 10) / 100, 3);
console.log("DM kg from 20 kg fresh", dmKg, "CP kg", cpKg);
// WS2: water: 40 cows x about 50 L/day (assume) = 2000 L; 5000 L tank lasts
const w = 40 * 50;
console.log("water/day", w, "tank days", 5000 / w);
