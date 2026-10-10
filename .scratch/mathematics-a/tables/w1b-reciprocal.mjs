// Checks the worked examples of lessons/trig/reciprocal-functions.md.
import { chk, same, solveTrig, quad, rad, sec, cosec, cot } from "../lib.mjs";

const { sin, cos, tan, PI, sqrt } = Math;
const XS = [0.3, 0.9, 1.2, 2.0, 2.7, 4.0, 5.5];
// Ex1 exact values
chk(sec(PI / 3), 2); chk(cosec(rad(225)), -sqrt(2)); chk(cot((5 * PI) / 6), -sqrt(3));
// Ex3 identity sec θ − cos θ ≡ sin θ tan θ
XS.forEach((x) => chk(sec(x) - cos(x), sin(x) * tan(x), 1e-9));
// Ex4 tan θ + cot θ = 4, 0 < θ < 180 → t² − 4t + 1 = 0 → t = 2 ± √3 → 15°, 75°
same(quad.roots(1, -4, 1).map((v) => Number(v.toFixed(12))), [2 - sqrt(3), 2 + sqrt(3)].map((v) => Number(v.toFixed(12))));
for (const x of [15, 75]) chk(tan(rad(x)) + cot(rad(x)), 4, 1e-9);
// Ex5 2 sec²θ − tan θ = 5 → 2t² − t − 3 = 0 → t = 1.5, −1
same(quad.roots(2, -1, -3), [-1, 1.5]);
const e5 = [...solveTrig({ fn: "tan", k: 1.5, lo: 0, hi: 360 }), ...solveTrig({ fn: "tan", k: -1, lo: 0, hi: 360 })].sort((a, b) => a - b);
console.log("Ex5", e5);
e5.forEach((x) => chk(2 * sec(rad(x)) ** 2 - tan(rad(x)), 5, 1e-9));
// Ex6 sec θ = −3, second quadrant → tan θ = −2√2
const th = PI - Math.acos(1 / 3);
chk(sec(th), -3); chk(tan(th), -2 * sqrt(2));
console.log("reciprocal lesson OK");
