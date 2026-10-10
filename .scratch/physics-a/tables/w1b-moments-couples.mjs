import { sfStr, rad, chk } from "../lib.mjs";
// WE1 spanner at angle
const F = 150, d = 0.3, th = 60;
const M = F * d * Math.sin(rad(th));
console.log("WE1 moment", sfStr(M, 3), "perp dist", sfStr(d * Math.sin(rad(th)), 3));
// WE2 steering wheel couple
console.log("WE2 torque", 25 * 0.38);
// WE2b torque of couple about any point: forces 25 N at x=0 and x=0.38, about point 0.10 beyond left
const p = -0.1; console.log("about P", 25 * (0.38 - p) - 25 * (0 - p));
// WE3 tipping: crate 1.2 m tall, 0.80 m wide, weight 900 N; push at top horizontally; min force to tip about edge
const W = 900, w = 0.8, h = 1.2; const Fmin = (W * w / 2) / h; console.log("WE3 tip force", Fmin);
