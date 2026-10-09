// Lesson numbers for water/irrigation-methods.
import { waterVolume, field, round } from "../lib.mjs";
const e1 = waterVolume({ areaM2: 5000, depthMm: 25 }); console.log("ex1", e1);
const net = waterVolume({ areaM2: 2000, depthMm: 30 }).litres; console.log("net", net, "furrow 60%", net / 0.6, "drip 90%", round(net / 0.9, 0), "saved", round(net / 0.6 - net / 0.9, 0));
const bed = field(10, 1); const can = waterVolume({ areaM2: bed.m2, depthMm: 10 }).litres; console.log("cans", can / 10);
