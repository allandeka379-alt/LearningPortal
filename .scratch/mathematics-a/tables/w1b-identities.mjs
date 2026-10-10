// Checks the worked examples of lessons/trig/basic-identities-equations.md.
import { chk, same, solveTrig, rnd, quad, rad } from "../lib.mjs";

const { sin, cos, tan, PI } = Math;
const XS = [0.3, 0.9, 1.2, 2.0, 2.7, 4.0, 5.5];
// Ex1 identity (1 + sin)/cos + cos/(1 + sin) ≡ 2/cos
XS.forEach((x) => chk((1 + sin(x)) / cos(x) + cos(x) / (1 + sin(x)), 2 / cos(x), 1e-9));
// Ex2: 3 sin 2x + 1 = 0, −π < x < π
const e2 = solveTrig({ fn: "sin", k: -1 / 3, a: 2, lo: -PI, hi: PI, unit: "rad" });
console.log("Ex2", e2, e2.map((x) => rnd(x, 2)));
chk(rnd(Math.asin(1 / 3), 4), 0.3398);
// Ex3: 3 sin²θ − 5 cos θ − 1 = 0 → 3c² + 5c − 2 = 0 → c = 1/3
same(quad.roots(3, 5, -2), [-2, 1 / 3]);
const e3 = solveTrig({ fn: "cos", k: 1 / 3, lo: 0, hi: 360 });
console.log("Ex3", e3); e3.forEach((x) => chk(3 * sin(rad(x)) ** 2 - 5 * cos(rad(x)) - 1, 0, 1e-12));
// Ex4: tan θ = 2 sin θ → 0, 60, 180, 300, 360
for (const x of [0, 60, 180, 300, 360]) chk(tan(rad(x)) - 2 * sin(rad(x)), 0, 1e-12);
// Ex5: 2 sin x = 3 cos x → tan x = 1.5
console.log("Ex5", solveTrig({ fn: "tan", k: 1.5, lo: 0, hi: 360 }));
console.log("identities lesson OK");
