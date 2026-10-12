import { chk, rnd, waterBalance, table } from "../lib.mjs";
// Example A: water balance mm/yr
const P = 840, E = 640, Q = 150;
console.log("dS", chk(waterBalance(P, E, Q), 50));
// Example B: runoff depth from mean flow
const flow = 3.0, areaKm2 = 1800;
const depthM = (flow * 365 * 24 * 3600) / (areaKm2 * 1e6);
console.log("depth mm", depthM * 1000, rnd(depthM * 1000, 1), "coef", (depthM * 1000) / 800 * 100);
// Example C
console.log(table(["Basin", "Land and soil", "Infiltration capacity (mm/h)"], [["A", "Woodland on deep sandy soil", 60], ["B", "Paved and compacted clay", 8]]));
console.log("excess", 30 - 8);
