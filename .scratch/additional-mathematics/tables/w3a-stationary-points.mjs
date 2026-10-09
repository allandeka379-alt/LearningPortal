// Worked-example checks for lessons/calculus/stationary-points.md
import { chk, checkDeriv, same, quad } from "../lib.mjs";
const xs = [0.5, 1.7, 2.6];
const f1 = (x) => x ** 3 - 6 * x * x + 9 * x + 1, d1 = (x) => 3 * x * x - 12 * x + 9, s1 = (x) => 6 * x - 12;
checkDeriv(f1, d1, xs); checkDeriv(d1, s1, xs);
same(quad.roots(3, -12, 9), [1, 3]); chk(f1(1), 5); chk(f1(3), 1); chk(s1(1), -6); chk(s1(3), 6);
const f2 = (x) => x + 9 / x, d2 = (x) => 1 - 9 / (x * x);
checkDeriv(f2, d2, xs); chk(d2(3), 0); chk(f2(3), 6);
console.log("d2(2.9)", d2(2.9), "d2(3.1)", d2(3.1), "f2''(3)", 18 / 27);
console.log("x^4: d at -0.1", 4 * (-0.1) ** 3, "d at 0.1", 4 * 0.1 ** 3);
const f4 = (x) => x * Math.exp(-x), d4 = (x) => Math.exp(-x) * (1 - x), s4 = (x) => Math.exp(-x) * (x - 2);
checkDeriv(f4, d4, xs); checkDeriv(d4, s4, xs); chk(f4(1), 1 / Math.E); chk(s4(1), -1 / Math.E);
console.log("ok");
