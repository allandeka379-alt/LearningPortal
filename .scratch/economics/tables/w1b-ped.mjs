// Numbers for lessons/elasticity/ped.md (W1b).
import { elasticity, pctChange } from "../lib.mjs";
const w1 = { p1: 1.0, p2: 1.2, q1: 500, q2: 450 };
console.log("WE1", pctChange(w1.q1, w1.q2), pctChange(w1.p1, w1.p2), elasticity.ped(w1), elasticity.describe(elasticity.ped(w1)));
const w2 = { p1: 0.8, p2: 0.6, q1: 2000, q2: 3000 };
console.log("WE2", pctChange(w2.q1, w2.q2), pctChange(w2.p1, w2.p2), elasticity.ped(w2), elasticity.describe(elasticity.ped(w2)));
console.log("WE3 from pct", elasticity.fromPct(-15, 15));
