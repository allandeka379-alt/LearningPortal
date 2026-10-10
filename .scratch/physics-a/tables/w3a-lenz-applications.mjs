import { sfStr, table, dpStr } from "../lib.mjs";
const w = 2 * Math.PI * 50; const E0 = 200 * 0.15 * 0.012 * w;
console.log("WE2 omega", sfStr(w, 3), "E0", sfStr(E0, 3), "rms", sfStr(E0 / Math.SQRT2, 3));
console.log("WE3 back emf", 12 - 1.2 * 1.5, "start I", 12 / 1.5);
// e.m.f. vs angle table for generator: E = E0 sin(wt); angle of coil normal from field
console.log(table(["angle / °", "E / V"], [0, 30, 60, 90, 120, 150, 180, 270].map((a) => [String(a), sfStr(E0 * Math.sin(a * Math.PI / 180) || 0, 3)])));
