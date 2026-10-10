// Checks the worked examples of lessons/trig/compound-double-angle.md.
import { chk, same, solveTrig, quad, rad } from "../lib.mjs";

const { sin, cos, tan, sqrt, atan, asin, acos } = Math;
const XS = [0.3, 0.9, 1.2, 2.0, 2.7, 4.0, 5.5];
// Ex1 exact values
chk(sin(rad(75)), (sqrt(6) + sqrt(2)) / 4); chk(cos(rad(15)), (sqrt(6) + sqrt(2)) / 4); chk(tan(rad(15)), 2 - sqrt(3));
// Ex2 sin A = 3/5, cos B = 5/13 (acute) → sin(A + B) = 63/65, cos(A + B) = −16/65
const A = asin(3 / 5), B = acos(5 / 13);
chk(sin(A + B), 63 / 65); chk(cos(A + B), -16 / 65);
// Ex3 cos(x − 30°) − 3 sin(x − 60°) ≡ 2√3 cos x − sin x; = 0 → tan x = 2√3
XS.forEach((x) => chk(cos(x - rad(30)) - 3 * sin(x - rad(60)), 2 * sqrt(3) * cos(x) - sin(x), 1e-9));
console.log("Ex3", solveTrig({ fn: "tan", k: 2 * sqrt(3), lo: 0, hi: 360 }));
// Ex4 (1 − cos 2θ)/sin 2θ ≡ tan θ
XS.forEach((x) => chk((1 - cos(2 * x)) / sin(2 * x), tan(x), 1e-9));
// Ex5 cos 2x + 3 sin x = 2 → 2s² − 3s + 1 = 0 → 30, 90, 150
same(quad.roots(2, -3, 1), [0.5, 1]);
for (const x of [30, 90, 150]) chk(cos(rad(2 * x)) + 3 * sin(rad(x)), 2, 1e-12);
// Ex6 tan A = 1/3 → tan 2A = 3/4
chk(tan(2 * atan(1 / 3)), 3 / 4);
console.log("compound lesson OK");
