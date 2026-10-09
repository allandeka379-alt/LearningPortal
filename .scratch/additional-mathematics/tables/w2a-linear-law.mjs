// Worked-example checks for lessons/coordinate/linear-law.md
import { chk, sfStr, table } from "../lib.mjs";
// Ex1: lg y vs lg x through (0.2, 1.1), (0.8, 2.6)
const n1 = (2.6 - 1.1) / (0.8 - 0.2); chk(n1, 2.5); const c1 = 1.1 - n1 * 0.2; chk(c1, 0.6);
console.log("ex1 A", 10 ** c1, sfStr(10 ** c1));
// Ex2: ln y vs x through (1, 2.3), (4, 3.5)
const m2 = (3.5 - 2.3) / 3; chk(m2, 0.4); const c2 = 2.3 - m2; chk(c2, 1.9);
console.log("ex2 b", Math.exp(m2), sfStr(Math.exp(m2)), "A", Math.exp(c2), sfStr(Math.exp(c2)));
// Ex3: y vs 1/x through (0.5, 7), (2, 1)
const m3 = (1 - 7) / (2 - 0.5); chk(m3, -4); chk(7 - m3 * 0.5, 9);
// Ex4 (b): e^{2y} = 3x^2 + 1 -> y = 0.5 ln(3x^2+1)
for (const x of [0.5, 2]) chk(Math.exp(2 * (0.5 * Math.log(3 * x * x + 1))), 3 * x * x + 1);
// Ex5: y = 0.5x^2 + 3x
const xs = [1, 2, 3, 4, 5];
console.log(table(["x", ...xs], [["y", ...xs.map((x) => 0.5 * x * x + 3 * x)], ["y/x", ...xs.map((x) => 0.5 * x + 3)]]));
console.log("ok");
