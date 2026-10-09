// Worked-example checks for lessons/calculus/derivative-idea.md
import { chk } from "../lib.mjs";
// Ex1: chords of y = x^2 from P(3, 9)
const f1 = (x) => x * x;
for (const h of [1, 0.1, 0.01, 0.001]) console.log("h", h, "grad", (f1(3 + h) - f1(3)) / h, "check 6+h", 6 + h);
for (const h of [1, 0.1, 0.01, 0.001]) chk((f1(3 + h) - f1(3)) / h, 6 + h, 1e-9);
// table of chords to the left
for (const h of [-1, -0.1, -0.01]) chk((f1(3 + h) - f1(3)) / h, 6 + h, 1e-9);
// Ex2: y = 2x^2 - 5x first principles: 4x + 2h - 5 -> 4x - 5; at x = 2 gradient 3
const f2 = (x) => 2 * x * x - 5 * x;
for (const x of [-1, 2, 3.5]) for (const h of [0.5, 0.01]) chk((f2(x + h) - f2(x)) / h, 4 * x + 2 * h - 5, 1e-9);
chk(4 * 2 - 5, 3);
// Ex3: f(x) = x^3 - 4x: (f(x+h)-f(x))/h = 3x^2 + 3xh + h^2 - 4
const f3 = (x) => x ** 3 - 4 * x;
for (const x of [-2, 1, 2.5]) for (const h of [0.3, 0.001]) chk((f3(x + h) - f3(x)) / h, 3 * x * x + 3 * x * h + h * h - 4, 1e-9);
console.log("f3'(2)", 3 * 4 - 4, "f3'(-1)", 3 - 4, "f3'(0)", -4);
// Ex4: interpretation y = x^2 - 6x + 5 ; gradient 2x - 6; x=1 -> -4, x=3 -> 0, x=5 -> 4
const g = (x) => 2 * x - 6;
console.log(g(1), g(3), g(5));
console.log("ok");
