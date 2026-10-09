// Worked-example checks for lessons/circle/two-circles.md
import { chk, same, quad } from "../lib.mjs";
const on = ([a, b], [x, y]) => (x - a) ** 2 + (y - b) ** 2;
// Ex1: (1,2) r3 and (7,10) r7: d = 10, contact (2.8, 4.4)
chk(Math.hypot(6, 8), 10); const P = [1 + 0.3 * 6, 2 + 0.3 * 8]; chk(on([1, 2], P), 9, 1e-9); chk(on([7, 10], P), 49, 1e-9);
console.log("ex1 contact", P);
// Ex2: x^2 + y^2 = 25 and (x-6)^2 + y^2 = 13 -> x = 4, (4, ±3)
chk(Math.abs(5 - Math.sqrt(13)) < 6 && 6 < 5 + Math.sqrt(13) ? 1 : 0, 1);
for (const y of [3, -3]) { chk(on([0, 0], [4, y]), 25); chk(on([6, 0], [4, y]), 13); }
// Ex3: x^2 + y^2 - 2x - 4y - 20 = 0 -> (1,2) r5 ; (x-1)^2 + (y-5)^2 = 4: d = 3 = 5 - 2, contact (1, 7)
chk(1 + 4 + 20, 25); chk(on([1, 2], [1, 7]), 25); chk(on([1, 5], [1, 7]), 4);
// Ex5: x^2 + y^2 = 16 and (x-9)^2 + (y-12)^2 = k^2: d = 15 -> k = 11 or 19
chk(Math.hypot(9, 12), 15); chk(15 - 4, 11); chk(15 + 4, 19);
console.log("ok", quad.disc(1, 0, 0));
