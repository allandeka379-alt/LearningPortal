// Lesson numbers for soil/texture-structure (worked examples).
import { pct, round, check } from "../lib.mjs";
// Worked example 1: sedimentation jar layers (cm).
const L = { sand: 4.8, silt: 2.0, clay: 1.2 };
const tot = L.sand + L.silt + L.clay;
console.log("total", round(tot, 1));
for (const [k, v] of Object.entries(L)) console.log(k, round(pct(v, tot), 1));
// Worked example 2: sieving 200 g sample
const S = { gravel: 14, coarse: 62, fine: 48, passed: 76 };
const t2 = Object.values(S).reduce((a, b) => a + b, 0);
check(t2 === 200, "sieve total");
for (const [k, v] of Object.entries(S)) console.log(k, round(pct(v, t2), 1));
