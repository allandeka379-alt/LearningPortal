// Worked-example checks for lessons/circle/equation.md
import { chk, same } from "../lib.mjs";
// Expanded x^2 + y^2 + 2gx + 2fy + c = 0 -> centre (-g, -f), r^2 = g^2 + f^2 - c
const fromExpanded = (D, E, F) => ({ a: -D / 2, b: -E / 2, r2: (D * D + E * E) / 4 - F });
// Ex1: centre (3, -2), r 5 -> x^2 + y^2 - 6x + 4y - 12 = 0
same(fromExpanded(-6, 4, -12), { a: 3, b: -2, r2: 25 });
// Ex2: x^2 + y^2 + 8x - 10y + 5 = 0
same(fromExpanded(8, -10, 5), { a: -4, b: 5, r2: 36 });
// Ex3: diameter (-1, 4), (5, -4)
same([(-1 + 5) / 2, (4 - 4) / 2], [2, 0]); chk(Math.hypot(5 - -1, -4 - 4) / 2, 5);
// Ex4: centre (1, 3) through (6, 5)
chk((6 - 1) ** 2 + (5 - 3) ** 2, 29);
// Ex5: (x - 2)^2 + (y + 1)^2 = 20
const v = ([x, y]) => (x - 2) ** 2 + (y + 1) ** 2;
same([v([5, 2]), v([6, 1]), v([-2, 2])], [18, 20, 25]);
// Ex6: A(1,1), B(7,1), C(1,9): centre (4,5), r 5
for (const [x, y] of [[1, 1], [7, 1], [1, 9]]) chk((x - 4) ** 2 + (y - 5) ** 2, 25);
console.log("ok");
