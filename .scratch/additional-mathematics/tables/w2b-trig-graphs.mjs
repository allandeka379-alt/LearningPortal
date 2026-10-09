// Worked-example checks for lessons/trig/graphs.md
import { chk, same, rad, solveTrig, round } from "../lib.mjs";
const f1 = (x) => 3 * Math.sin(rad(2 * x)) + 1;
console.log("Ex1 table", [0, 45, 90, 135, 180, 225, 270, 315, 360].map((x) => [x, round(f1(x), 6)]));
same(solveTrig({ fn: "sin", k: 1, a: 2, lo: 0, hi: 360 }), [45, 225]);
same(solveTrig({ fn: "sin", k: -1, a: 2, lo: 0, hi: 360 }), [135, 315]);
// x-intercepts of 3 sin 2x + 1: sin 2x = -1/3
console.log("Ex1 x-int", solveTrig({ fn: "sin", k: -1 / 3, a: 2, lo: 0, hi: 360 }).map((x) => round(x, 2)));
// Ex2 y = 2cos(x/2) - 1 on [0, 2π]
const f2 = (x) => 2 * Math.cos(x / 2) - 1;
chk(f2(0), 1); chk(f2(2 * Math.PI), -3); chk(f2(Math.PI), -1);
same(solveTrig({ fn: "cos", k: 0.5, a: 0.5, lo: 0, hi: 2 * Math.PI, unit: "rad" }).map((x) => round(x / Math.PI, 9)), [round(2 / 3, 9)]);
// Ex3 tan 3x asymptotes 0..180: 3x = 90, 270, 450
console.log("Ex3 asym", [90, 270, 450].map((u) => u / 3));
same(solveTrig({ fn: "tan", k: 0, a: 3, lo: 0, hi: 180 }), [0, 60, 120, 180]);
// Ex4 max 5 min -1 period 120, max at x=0 -> 3cos3x + 2
const f4 = (x) => 3 * Math.cos(rad(3 * x)) + 2;
chk(f4(0), 5); chk(f4(60), -1); chk(f4(120), 5);
// Ex5 3 sin 2x + 1 = 2 -> sin 2x = 1/3: count
console.log("Ex5 count", solveTrig({ fn: "sin", k: 1 / 3, a: 2, lo: 0, hi: 360 }).length);
console.log("ok");
