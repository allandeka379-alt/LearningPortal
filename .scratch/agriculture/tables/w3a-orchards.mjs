// Lesson numbers for crops/orchards.
import { field, waterVolume, round } from "../lib.mjs";
const f = field(120, 60); console.log(f, "square 6 m", f.m2 / 36, "per ha square", 10000 / 36, "triangular per ha", 10000 / (0.866 * 36), "ratio", (1 / 0.866 - 1) * 100);
console.log("AN kg", 200 * 400 / 1000, "bags", 80 / 50);
const basin = Math.PI * 1 ** 2; const w = waterVolume({ areaM2: basin, depthMm: 40 }); console.log("basin", basin, w, "200 trees", w.litres * 200);
