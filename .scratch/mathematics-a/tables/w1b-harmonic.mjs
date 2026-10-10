// Checks the worked examples of lessons/trig/harmonic-form.md.
import { chk, rnd, solveTrig, rad, deg } from "../lib.mjs";

const { sin, cos, sqrt, atan, PI } = Math;
const XS = [0.3, 0.9, 1.2, 2.0, 2.7, 4.0, 5.5];
// Ex1 3 cos θ + 4 sin θ = 5 cos(θ − 53.13°)
const a1 = atan(4 / 3);
XS.forEach((x) => chk(3 * cos(x) + 4 * sin(x), 5 * cos(x - a1), 1e-9));
rnd(deg(a1), 2, 53.13);
// Ex2 3 cos θ + 2 sin θ = 1 → √13 cos(θ − 33.69°) = 1
const a2 = atan(2 / 3);
rnd(deg(a2), 2, 33.69);
const s2 = solveTrig({ fn: "cos", k: 1 / sqrt(13), b: -deg(a2), lo: 0, hi: 360 });
console.log("Ex2", s2);
s2.forEach((x) => chk(3 * cos(rad(x)) + 2 * sin(rad(x)), 1, 1e-9));
rnd(s2[0], 1, 107.6); rnd(s2[1], 1, 319.8); rnd(deg(Math.acos(1 / sqrt(13))), 2, 73.9);
// Ex3 5 + 3 cos θ + 4 sin θ: max 10 at 53.1°, min 0 at 233.1°; 12/(7 + 3cos θ + 4 sin θ) max 6
chk(5 + 5, 10); chk(12 / (7 - 5), 6); rnd(deg(a1) + 180, 1, 233.1);
// Ex4 √3 sin x − cos x ≡ 2 sin(x − π/6); = 1 on [0, 2π] → π/3, π
XS.forEach((x) => chk(sqrt(3) * sin(x) - cos(x), 2 * sin(x - PI / 6), 1e-9));
for (const x of [PI / 3, PI]) chk(sqrt(3) * sin(x) - cos(x), 1, 1e-12);
console.log("harmonic lesson OK");
