// Checks the worked examples of lessons/coordinate/circles.md.
import { chk, same, quad } from "../lib.mjs";

const onCircle = (g, f, c, [x, y]) => x * x + y * y + 2 * g * x + 2 * f * y + c;
// Ex1: x² + y² − 6x + 10y − 2 = 0 → centre (3, −5), r = 6
chk(Math.sqrt(9 + 25 + 2), 6);
// Ex2: through A(−1, 2), B(7, 2), C(6, −5) → centre (3, −1), r = 5; x² + y² − 6x + 2y − 15 = 0
for (const p of [[-1, 2], [7, 2], [6, -5]]) chk((p[0] - 3) ** 2 + (p[1] + 1) ** 2, 25);
for (const p of [[-1, 2], [7, 2], [6, -5]]) chk(onCircle(-3, 1, -15, p), 0);
// Ex3: tangent at (6, 3): radius gradient 4/3, tangent 3x + 4y = 30
chk((3 - -1) / (6 - 3), 4 / 3); chk(3 * 6 + 4 * 3, 30);
// Ex4: y = x + k and x² + y² − 4x − 2y − 3 = 0 (centre (2, 1), r² = 8): 2x² + (2k − 6)x + k² − 2k − 3 = 0
for (const k of [3, -5]) {
  chk(quad.disc(2, 2 * k - 6, k * k - 2 * k - 3), 0);
  chk(Math.abs(2 - 1 + k) / Math.SQRT2, Math.sqrt(8));
}
same(quad.roots(1, 2, -15), [-5, 3]);
chk(quad.disc(2, 2 * 0 - 6, -3) > 0 ? 1 : 0, 1); // k = 0 lies between: two points
// Ex5: x + y = 8 with x² + y² − 2x − 4y − 20 = 0 → (1, 7), (6, 2), chord 5√2
same(quad.roots(1, -7, 6), [1, 6]);
for (const p of [[1, 7], [6, 2]]) chk(onCircle(-1, -2, -20, p), 0);
chk(Math.hypot(5, 5), 5 * Math.SQRT2);
// Ex6: tangent length from T(10, 7) to the circle of Ex5 (centre (1, 2), r = 5): √(81 + 25 − 25) = 9
chk(Math.sqrt((10 - 1) ** 2 + (7 - 2) ** 2 - 25), 9);
console.log("circles lesson OK");
