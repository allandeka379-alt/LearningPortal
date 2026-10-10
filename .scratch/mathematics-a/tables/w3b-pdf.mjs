// W3b lesson numbers: amaths.continuous.pdf
import { integrate, chk, sfStr } from "../lib.mjs";
const f1 = (x) => (3 / 32) * x * (4 - x);
chk(integrate(f1, 0, 4), 1, 1e-9, "k1");
console.log("ex1 P(X<1)", integrate(f1, 0, 1), "E", integrate((x) => x * f1(x), 0, 4), "EX2", integrate((x) => x * x * f1(x), 0, 4));
// ex2 3/x^4 on [1, inf): use substitution check numerically to large bound
const f2 = (x) => 3 / x ** 4;
console.log("ex2 total", integrate(f2, 1, 2000, 200000), "E", integrate((x) => x * f2(x), 1, 2000, 200000), "median", 2 ** (1 / 3), "P(X>2)", 1 / 8);
const f3 = (x) => x * x / 9;
console.log("ex3 total", integrate(f3, 0, 3), "E", integrate((x) => x * f3(x), 0, 3), "EX2", integrate((x) => x * x * f3(x), 0, 3), "median", 3 / 2 ** (1 / 3), "UQ", 3 * 0.75 ** (1 / 3));
