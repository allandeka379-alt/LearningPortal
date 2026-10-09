// Worked-example checks for lessons/circle/line-tangents.md
import { chk, same, quad } from "../lib.mjs";
const on = ([a, b], [x, y]) => (x - a) ** 2 + (y - b) ** 2;
// Ex1: (x-2)^2 + (y-1)^2 = 10, y = x + 1 -> x^2 - 2x - 3 = 0
same(quad.roots(1, -2, -3), [-1, 3]);
for (const x of [-1, 3]) chk(on([2, 1], [x, x + 1]), 10);
chk(Math.hypot(4, 4), 4 * Math.SQRT2);
// Ex2: x^2 + y^2 = 20, y = 2x + k -> 5x^2 + 4kx + k^2 - 20 = 0, disc = 400 - 4k^2
for (const k of [-10, 10]) chk(quad.disc(5, 4 * k, k * k - 20), 0);
for (const k of [3, -7, 12]) chk(quad.disc(5, 4 * k, k * k - 20), 400 - 4 * k * k);
same(quad.roots(5, 40, 80), [-4]); chk(2 * -4 + 10, 2); chk(on([0, 0], [-4, 2]), 20);
// Ex3: (x-2)^2 + (y+3)^2 = 25 at (5, 1): 3x + 4y - 19 = 0
chk(on([2, -3], [5, 1]), 25); chk(3 * 5 + 4 * 1 - 19, 0); chk((4 / 3) * (-3 / 4), -1);
// Ex4: tangent length from P(7, 6) to (x-1)^2 + (y-2)^2 = 16
chk(on([1, 2], [7, 6]), 52); chk(Math.sqrt(52 - 16), 6);
// Ex5: y = kx tangent to (x-4)^2 + y^2 = 8 -> (1+k^2)x^2 - 8x + 8 = 0
for (const k of [-1, 1]) chk(quad.disc(1 + k * k, -8, 8), 0);
same(quad.roots(2, -8, 8), [2]); chk(on([4, 0], [2, 2]), 8); chk(on([4, 0], [2, -2]), 8);
console.log("ok");
