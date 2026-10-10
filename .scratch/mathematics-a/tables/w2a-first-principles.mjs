// W2a lesson numbers: diff.first-principles
import { chk, checkDeriv, round } from "../lib.mjs";
const f = (x) => x ** 3;
for (const h of [1, 0.1, 0.01, 0.001]) {
  const g = (f(2 + h) - f(2)) / h;
  chk(g, 12 + 6 * h + h * h, 1e-6, `chord h=${h}`);
  console.log("h", h, "gradient", round(g, 9));
}
for (const h of [-0.1, -0.01]) console.log("h", h, round((f(2 + h) - f(2)) / h, 9));
// Ex1: f(x) = x^2 - 3x -> 2x - 3 ; chord form 2x + h - 3
checkDeriv((x) => x * x - 3 * x, (x) => 2 * x - 3, [0.5, 2, 4], "ex1");
// Ex2: f(x) = 1/x -> -1/x^2
checkDeriv((x) => 1 / x, (x) => -1 / x ** 2, [0.5, 2, 4], "ex2");
// Ex3: sin x -> cos x ; limits
console.log("sin h/h", Math.sin(0.01) / 0.01, "(cos h - 1)/h", (Math.cos(0.01) - 1) / 0.01);
checkDeriv(Math.sin, Math.cos, [0.3, 1, 2], "ex3");
// Ex4: x^3 + 2x at x=1: chord (f(1+h)-f(1))/h = 5 + 3h + h^2
const g4 = (x) => x ** 3 + 2 * x;
for (const h of [0.5, 0.1]) chk((g4(1 + h) - g4(1)) / h, 5 + 3 * h + h * h, 1e-9, "ex4");
// second derivative example y = x^4 - 6x^2 : y' = 4x^3 - 12x, y'' = 12x^2 - 12 at x = 2 -> 36
checkDeriv((x) => x ** 4 - 6 * x * x, (x) => 4 * x ** 3 - 12 * x, [1, 2], "y'");
checkDeriv((x) => 4 * x ** 3 - 12 * x, (x) => 12 * x * x - 12, [1, 2], "y''");
console.log("y''(2)", 12 * 4 - 12);
