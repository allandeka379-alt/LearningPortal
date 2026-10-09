// Worked-example checks for lessons/quadratics/inequalities.md
import { chk, same, quad, poly } from "../lib.mjs";

same(quad.roots(1, -1, -12), [-3, 4]);
same(quad.roots(2, 5, -3), [-3, 0.5]);
same(poly.sub(poly.mul([1, 0], [1, 2]), [15]), [1, 2, -15]);
same(quad.roots(1, 2, -15), [-5, 3]);
same(quad.roots(-1, 1, 6), [-2, 3]);
const r5 = quad.roots(1, -4, 1);
chk(r5[0], 2 - Math.sqrt(3)); chk(r5[1], 2 + Math.sqrt(3));
console.log("ex5", r5);
// Ex6: x^2 + kx + 2k - 3 no real roots: k^2 - 8k + 12 < 0 -> 2 < k < 6
for (const k of [2, 6]) chk(quad.disc(1, k, 2 * k - 3), 0);
chk(Math.sign(quad.disc(1, 4, 5)), -1);
// sign table spot values for ex1
for (const [x, s] of [[-4, 1], [0, -1], [5, 1]]) chk(Math.sign(poly.eval([1, -1, -12], x)), s);
console.log("ok");
