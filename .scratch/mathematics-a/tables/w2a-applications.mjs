// W2a lesson numbers: diff.applications
import { chk, checkDeriv, quad, same } from "../lib.mjs";
// Ex1 y = x³ − 3x² + 2 at x = 3
const f = (x) => x ** 3 - 3 * x * x + 2, fp = (x) => 3 * x * x - 6 * x;
checkDeriv(f, fp, [1, 2, 3], "ex1");
console.log("y(3)", f(3), "m", fp(3), "tangent c", f(3) - fp(3) * 3, "normal: x + 9y =", 3 + 9 * f(3));
// Ex2 f = x³ + 3x² − 9x + 4 ; f' = 3x² + 6x − 9
same(quad.roots(3, 6, -9), [-3, 1]);
// Ex3 dA/dt = 2πr dr/dt, r = 10, dr/dt = 3
console.log("ex3", 2 * Math.PI * 10 * 3);
// Ex4 balloon V' = 50, r = 5
console.log("ex4", 50 / (4 * Math.PI * 25));
// side: x³ + 3x + 1 increasing
