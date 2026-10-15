import { chk, rnd } from "../lib.mjs";
// Worked A: availability per person
const pop = 9.5e6, res = 14.25e9; // m3/yr
console.log("per person", res / pop);
// Worked B: sector shares
const use = { Agriculture: 5.6, Industry: 1.6, Domestic: 0.8 };
const tot = Object.values(use).reduce((a, b) => a + b, 0);
console.log("total", tot, Object.entries(use).map(([k, v]) => [k, (v / tot) * 100]));
// Worked C: change in per-capita availability if pop grows
console.log("pop 12.5e6", res / 12.5e6);
// withdrawal ratio
console.log("withdraw/resources", 2.0 / 8.0 * 100);
console.log("irr share", 5.6/8);
