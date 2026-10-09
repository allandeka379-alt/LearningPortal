import { quad, same, chk } from "../lib.mjs";
same(quad.roots(5, -4, -12), [-1.2, 2], "ex1");
chk((-1.2) ** 2 + (2 * -1.2 - 1) ** 2, 13, 1e-12); chk(2 ** 2 + 3 ** 2, 13);
same(quad.roots(2, 1, -3), [-1.5, 1], "ex2"); chk(3 - 2 * 1, 1); chk(-2 - 2 * -1.5, 1); chk(-2 * -1.5, 3);
same(quad.roots(1, -6, 8), [2, 4], "ex3"); chk(Math.hypot(2, 4), 2 * Math.sqrt(5), 1e-12);
// ex4: x/y + 2y/x = 3, x + y = 6 -> (3,3), (4,2)
chk(3 / 3 + 2 * 3 / 3, 3); chk(4 / 2 + 2 * 2 / 4, 3);
// ex5: x + y = 4, x^2 + y^2 = 4 -> 2x^2 - 8x + 12 = 0
chk(quad.disc(2, -8, 12), -32);
console.log("ok");
