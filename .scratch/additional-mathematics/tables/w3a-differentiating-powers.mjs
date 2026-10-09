// Worked-example checks for lessons/calculus/differentiating-powers.md
import { chk, checkDeriv, quad, same } from "../lib.mjs";
const xs = [0.5, 1.3, 2, 4.7];
// Ex1
checkDeriv((x) => 4 * x ** 5 - 3 * x * x + 7 * x - 2, (x) => 20 * x ** 4 - 6 * x + 7, xs, "ex1");
// Ex2
checkDeriv((x) => 6 * Math.sqrt(x) + 2 / x ** 3 - 1 / (4 * x), (x) => 3 * x ** -0.5 - 6 * x ** -4 + 0.25 * x ** -2, xs, "ex2");
// Ex3
checkDeriv((x) => (2 * x - 1) * (x + 3), (x) => 4 * x + 5, xs, "ex3a");
checkDeriv((x) => (x * x + 3) / Math.sqrt(x), (x) => 1.5 * x ** 0.5 - 1.5 * x ** -1.5, xs, "ex3b");
// Ex4: f = 2x^3 - 9x^2 + 12x; f' = 6x^2 - 18x + 12; f'' = 12x - 18; f' = 12 -> x = 0, 3
const f = (x) => 2 * x ** 3 - 9 * x * x + 12 * x;
checkDeriv(f, (x) => 6 * x * x - 18 * x + 12, xs);
checkDeriv((x) => 6 * x * x - 18 * x + 12, (x) => 12 * x - 18, xs);
same(quad.roots(6, -18, 0), [0, 3]); console.log("f(0)", f(0), "f(3)", f(3), "f''(3)", 12 * 3 - 18);
// Ex5
const g = (x) => x ** 1.5 - 8 * x ** -0.5;
checkDeriv(g, (x) => 1.5 * x ** 0.5 + 4 * x ** -1.5, xs);
chk(1.5 * 2 + 4 / 8, 3.5);
console.log("ok");
