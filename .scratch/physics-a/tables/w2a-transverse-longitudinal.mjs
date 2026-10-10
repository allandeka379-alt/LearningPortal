import { dpStr, table } from "../lib.mjs";
// Longitudinal displacement-distance snapshot: s = 5.0 sin(2πx/0.60) µm, positive = displaced to the right
const lam = 0.6, A = 5.0;
const xs = [0, 0.075, 0.15, 0.225, 0.3, 0.375, 0.45, 0.525, 0.6];
console.log(table(["$x\,/\,\text{m}$", "$s\,/\,\mu\text{m}$", "direction"], xs.map((x) => { const s = A * Math.sin((2 * Math.PI * x) / lam); return [dpStr(x, 3), dpStr(s, 1), Math.abs(s) < 1e-9 ? "none" : s > 0 ? "right" : "left"]; })));
// WE2: sound 850 Hz v 340
const f = 850, v = 340; console.log("lambda", v / f, "C to R", v / f / 2);
// WE: time for compression to pass: T
console.log("T", 1 / f);
