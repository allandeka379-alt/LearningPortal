// Worked-example checks for lessons/calculus/max-min-problems.md
import { chk, checkDeriv, same, quad } from "../lib.mjs";
// Ex1 fencing 120 m, three sides
const A = (x) => x * (120 - 2 * x);
checkDeriv(A, (x) => 120 - 4 * x, [5, 20, 40]); chk(A(30), 1800); chk(120 - 60, 60);
// Ex2 box from 24 cm square
const V = (x) => x * (24 - 2 * x) ** 2, Vp = (x) => (24 - 2 * x) * (24 - 6 * x), Vpp = (x) => 24 * x - 192;
checkDeriv(V, Vp, [1, 3, 7]); checkDeriv(Vp, Vpp, [1, 3, 7]);
same(quad.roots(12, -192, 576), [4, 12]); chk(V(4), 1024); chk(Vpp(4), -96);
// Ex3 closed cylinder volume 16 pi
const S = (r) => 2 * Math.PI * r * r + (32 * Math.PI) / r, Sp = (r) => 4 * Math.PI * r - (32 * Math.PI) / (r * r);
checkDeriv(S, Sp, [1, 2.5, 3]); chk(Sp(2), 0); chk(16 / 4, 4); chk(S(2), 24 * Math.PI);
chk(4 * Math.PI + 64 * Math.PI / 8, 12 * Math.PI); // S''(2) = 4pi + 64pi/r^3
// Ex4 kombi: cost per hour of fuel 0.0008 v^3? Use total cost C(v) = 260*(4/v + v/400)  (driver US$4 per hour, fuel v^2/400 per hour?)
const C = (v) => 260 * (16 / v + v / 400);
const Cp = (v) => 260 * (-16 / (v * v) + 1 / 400);
checkDeriv(C, Cp, [20, 40, 60]); chk(Cp(80), 0); chk(C(80), 104); chk(2 * 260 * 16 / 80 ** 3 > 0 ? 1 : 0, 1);
console.log("ok");
