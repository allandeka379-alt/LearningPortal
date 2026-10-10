import { chk, sfStr, root, integrate } from "../lib.mjs";
// Example 3: F(x) = 1 - 8/x^3, x >= 2
const F = (x) => 1 - 8 / x ** 3;
console.log("P(X>4)", 1 - F(4));
const m = Math.cbrt(16); chk(F(m), 0.5, 1e-12); console.log("median", m, sfStr(m));
const q1 = Math.cbrt(32 / 3), q3 = Math.cbrt(32); chk(F(q1), .25, 1e-12); chk(F(q3), .75, 1e-12);
console.log("q1", q1, "q3", q3, "iqr", q3 - q1, sfStr(q3 - q1));
console.log("pdf area", integrate((x) => 24 / x ** 4, 2, 2000, 200000));
// Example 1/2 checks
console.log("ex1 uq", 4 - Math.sqrt(2));
console.log("ex2 median", root((x) => x ** 3 + 3 * x - 7, 1, 2), "p80", root((x) => x ** 3 + 3 * x - 11.2, 1, 2));
