// Worked-example checks for lessons/functions/composite.md
import { chk, poly } from "../lib.mjs";

const f = (x) => 2 * x + 3;
const g = (x) => x * x - 1;
for (const x of [-2, 0, 1.5, 3]) {
  chk(f(g(x)), 2 * x * x + 1);
  chk(g(f(x)), 4 * x * x + 12 * x + 8);
  chk(f(f(x)), 4 * x + 9);
}
chk(f(g(2)), 9); chk(g(f(2)), 48);
chk(Math.sqrt((19 - 1) / 2), 3);
// Ex4: f = ln x (x > 0), g = x - 5 -> fg = ln(x - 5), x > 5 ; e^x and 3x + 1 -> gf = 3e^x + 1 > 1
// Ex5: f(x) = 4/(x + 3), g(x) = x^2 + 1 -> fg(x) = 4/(x^2 + 4); fg(x) = 1/2 -> x^2 = 4 ... use 0.5: x = ±2
const F = (x) => 4 / (x + 3);
const G = (x) => x * x + 1;
for (const x of [-2, 2]) chk(F(G(x)), 0.5);
chk(F(G(0)), 1);
console.log("ok", poly.mul([2, 3], [2, 3]));
