// Lesson numbers for crops/vegetables.
import { plantPopulation, field } from "../lib.mjs";
const f = field(18, 15); const p = plantPopulation({ rowCm: 60, inRowCm: 45, areaHa: f.ha }); console.log(f, p, p.total * 1.1);
const bed = field(10, 1.2); console.log("bed", bed, "g compound at 80 g/m2", bed.m2 * 80, "drills 15 cm apart across 1.2 m", 1.2 / 0.15);
