// Worked-example checks for lessons/quadratics/discriminant.md
import { chk, same, quad } from "../lib.mjs";

chk(quad.disc(3, -5, 4), -23);
chk(quad.disc(4, 20, 25), 0);
chk(quad.disc(1, 7, -2), 57);
// Ex2: 2x^2 + kx + 8 equal roots -> k^2 = 64
for (const k of [8, -8]) chk(quad.disc(2, k, 8), 0);
same(quad.roots(2, 8, 8), [-2]);
// Ex3: x^2 - 4x + k - 1 = 0 real roots -> k <= 5
chk(quad.disc(1, -4, 5 - 1), 0);
// Ex4: y = 2x + c tangent to y = x^2 - 4x + 7 -> x^2 - 6x + 7 - c = 0 -> c = -2, touch (3, 4)
chk(quad.disc(1, -6, 7 - -2), 0);
same(quad.roots(1, -6, 9), [3]);
chk(3 * 3 - 4 * 3 + 7, 4); chk(2 * 3 - 2, 4);
// Ex5: y = kx + 1 and y = x^2 + 2x + 5 -> x^2 + (2 - k)x + 4 = 0, (2 - k)^2 > 16 -> k < -2 or k > 6
for (const k of [-2, 6]) chk(quad.disc(1, 2 - k, 4), 0);
chk(Math.sign(quad.disc(1, 2 - 7, 4)), 1); chk(Math.sign(quad.disc(1, 2 - 0, 4)), -1);
// Ex6: x^2 + kx + k - 2: disc k^2 - 4k + 8 = (k - 2)^2 + 4
for (const k of [-3, 0, 2, 5.5]) chk(quad.disc(1, k, k - 2), (k - 2) ** 2 + 4);
console.log("ok");
