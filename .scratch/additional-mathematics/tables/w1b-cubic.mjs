// Worked-example checks for lessons/graphs/cubic.md
import { chk, same, poly, quad, root } from "../lib.mjs";

const f1 = poly.mul(poly.mul([1, 2], [1, -1]), [1, -3]);
same(f1, [1, -2, -5, 6]); chk(poly.eval(f1, 0), 6);
const f2 = poly.mul(poly.mul([1, 0], [-1, 3]), [1, 2]);
same(poly.rationalRoots(f2), [-2, 0, 3]);
console.log("ex2 coefficients", f2, "value at 1", poly.eval(f2, 1), "at -1", poly.eval(f2, -1));
const f3 = poly.mul(poly.mul([1, -2], [1, -2]), [1, 1]);
chk(poly.eval(f3, 0), 4);
// Ex5: (x + 1)(x - 1)(x - 4) <= 4  -> x(x^2 - 4x - 1) <= 0
const f5 = poly.mul(poly.mul([1, 1], [1, -1]), [1, -4]);
same(f5, [1, -4, -1, 4]);
same(poly.sub(f5, [4]), [1, -4, -1, 0]);
const r = quad.roots(1, -4, -1);
chk(r[0], 2 - Math.sqrt(5)); chk(r[1], 2 + Math.sqrt(5));
for (const [x, ok] of [[-1, true], [-0.1, false], [1, true], [4.3, false]]) chk(poly.eval(f5, x) <= 4 ? 1 : 0, ok ? 1 : 0);
console.log("ex5", r, poly.eval(f5, -1), poly.eval(f5, 1));
// sign of (x+2)(x-1)(x-3) regions
for (const [x, s] of [[-3, -1], [0, 1], [2, -1], [4, 1]]) chk(Math.sign(poly.eval(f1, x)), s);
chk(root((x) => poly.eval(f1, x), -3, -1), -2, 1e-9);
