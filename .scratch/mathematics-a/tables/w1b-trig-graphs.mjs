// Checks the worked examples of lessons/trig/graphs-exact-values.md.
import { chk, same, solveTrig, rad } from "../lib.mjs";

const { sin, cos, tan, PI, sqrt, asin, acos, atan } = Math;
// Ex1 exact values
chk(sin(rad(240)), -sqrt(3) / 2); chk(cos((7 * PI) / 4), 1 / sqrt(2)); chk(tan((5 * PI) / 6), -1 / sqrt(3));
// Ex2 y = 3 sin 2x on [0, 2π]: max at π/4, 5π/4; min at 3π/4, 7π/4; zeros at multiples of π/2
for (const x of [PI / 4, (5 * PI) / 4]) chk(3 * sin(2 * x), 3);
for (const x of [(3 * PI) / 4, (7 * PI) / 4]) chk(3 * sin(2 * x), -3);
for (const x of [0, PI / 2, PI, (3 * PI) / 2, 2 * PI]) chk(3 * sin(2 * x), 0, 1e-12);
// Ex3 y = 1 − 2 cos x: range −1..3, y-intercept −1, zeros where cos x = ½: π/3, 5π/3
chk(1 - 2 * cos(0), -1); chk(1 - 2 * cos(PI), 3);
const near = (a, e) => { chk(a.length, e.length); a.forEach((v, i) => chk(v, e[i], 1e-8)); };
near(solveTrig({ fn: "cos", k: 0.5, lo: 0, hi: 2 * PI, unit: "rad" }), [PI / 3, (5 * PI) / 3]);
// Ex4 y = a + b sin x with max 7, min −1 → a = 3, b = 4
chk((7 + -1) / 2, 3); chk((7 - -1) / 2, 4);
// Ex5 principal values
chk(asin(-0.5), -PI / 6); chk(acos(-0.5), (2 * PI) / 3); chk(atan(-sqrt(3)), -PI / 3); chk(cos(asin(3 / 5)), 4 / 5);
// Ex6 sin 2x = 0.3 on [0, 360°]: 4 solutions
chk(solveTrig({ fn: "sin", k: 0.3, a: 2, lo: 0, hi: 360 }).length, 4);
console.log(solveTrig({ fn: "sin", k: 0.3, a: 2, lo: 0, hi: 360 }));
console.log("trig graphs lesson OK");
