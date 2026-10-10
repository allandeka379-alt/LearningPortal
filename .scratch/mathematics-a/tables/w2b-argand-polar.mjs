// W2b lesson numbers: amaths.complex.argand-polar
import { cx, chk, same, deg } from "../lib.mjs";
const { sqrt, PI, atan } = Math;
const z1 = [-1, sqrt(3)]; chk(cx.mod(z1), 2); chk(cx.arg(z1), 2 * PI / 3);
const z2 = [-3, -3]; chk(cx.mod(z2), 3 * sqrt(2)); chk(cx.arg(z2), -3 * PI / 4);
const z3 = [4, -7]; console.log("z3", cx.mod(z3), cx.arg(z3), "alpha", atan(7 / 4));
// product/quotient 4e^{iπ/3}, 2e^{-iπ/4}
const a = cx.polar(4, PI / 3), b = cx.polar(2, -PI / 4);
chk(cx.mod(cx.mul(a, b)), 8); chk(cx.arg(cx.mul(a, b)), PI / 12); chk(cx.mod(cx.div(a, b)), 2); chk(cx.arg(cx.div(a, b)), 7 * PI / 12);
console.log("ab", cx.mul(a, b), "a/b", cx.div(a, b));
// u = -2 + 2i, v = 1 + √3 i
const u = [-2, 2], v = [1, sqrt(3)];
chk(cx.mod(u), 2 * sqrt(2)); chk(cx.arg(u), 3 * PI / 4); chk(cx.mod(v), 2); chk(cx.arg(v), PI / 3);
chk(cx.mod(cx.div(u, v)), sqrt(2)); chk(cx.arg(cx.div(u, v)), 5 * PI / 12);
chk(cx.mod(cx.mul(u, v)), 4 * sqrt(2)); chk(cx.arg(cx.mul(u, v)), -11 * PI / 12);
console.log("uv", cx.mul(u, v), "u/v", cx.div(u, v));
// i z rotation: z = 3 + i → iz = -1 + 3i
same(cx.mul([0, 1], [3, 1]), [-1, 3]);
