// Worked-example checks for lessons/quadratics/completing-square.md
import { chk, same, poly, quad, table } from "../lib.mjs";

// Ex1: x^2 - 10x + 7 = (x - 5)^2 - 18
let c = quad.completeSquare(1, -10, 7);
chk(c.p, -5); chk(c.q, -18);
// Ex2: 3x^2 + 12x - 5 = 3(x + 2)^2 - 17
c = quad.completeSquare(3, 12, -5);
chk(c.p, 2); chk(c.q, -17);
// Ex3: 7 + 8x - 2x^2 = 15 - 2(x - 2)^2
c = quad.completeSquare(-2, 8, 7);
chk(c.p, -2); chk(c.q, 15);
// Ex4: f(x) = x^2 - 4x + 1 on 0 <= x <= 5
const f4 = (x) => x * x - 4 * x + 1;
c = quad.completeSquare(1, -4, 1);
chk(c.q, -3); chk(f4(0), 1); chk(f4(5), 6);
// Ex5: y = 2x^2 - 4x - 6 = 2(x - 1)^2 - 8
c = quad.completeSquare(2, -4, -6);
chk(c.p, -1); chk(c.q, -8);
same(quad.roots(2, -4, -6), [-1, 3]);
const f5 = (x) => 2 * x * x - 4 * x - 6;
console.log(table(["$x$", ...[-2, -1, 0, 1, 2, 3, 4].map(String)], [["$y$", ...[-2, -1, 0, 1, 2, 3, 4].map(f5)]]));
same(poly.eval([2, -4, -6], 0), -6);
