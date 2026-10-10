// W2a lesson numbers: diff.stationary-points
import { chk, checkDeriv, same, quad } from "../lib.mjs";
const XS = [0.5, 1.7, 2.6];
const f1 = (x) => x ** 3 - 6 * x * x + 9 * x + 1;
checkDeriv(f1, (x) => 3 * (x - 1) * (x - 3), XS, "ex1");
console.log("ex1", f1(1), f1(3), "y''", 6 * 1 - 12, 6 * 3 - 12, "y-int", f1(0));
const f2 = (x) => x ** 4 - 4 * x ** 3;
checkDeriv(f2, (x) => 4 * x * x * (x - 3), XS, "ex2");
console.log("ex2", f2(0), f2(3), "y''(3)", 12 * 9 - 24 * 3, "y'(-0.1)", 4 * 0.01 * -3.1, "y'(0.1)", 4 * 0.01 * -2.9);
// Ex3 cylinder V = 128π: A = 2πr² + 256π/r ; r = 4 ; A = 96π
const A = (r) => 2 * Math.PI * r * r + (256 * Math.PI) / r;
checkDeriv(A, (r) => 4 * Math.PI * r - (256 * Math.PI) / (r * r), XS, "ex3");
chk(A(4), 96 * Math.PI, 1e-9); console.log("ex3 A", A(4), "h", 128 / 16);
// Ex4 inflexion y = x³ − 3x² + 4: y'' = 6x − 6 ; (1, 2) ; y'(1) = −3
const f4 = (x) => x ** 3 - 3 * x * x + 4;
console.log("ex4", f4(1), 3 - 6, "roots", same(quad.roots(1, -1, -2), [-1, 2]));
chk(f4(-1), 0); chk(f4(2), 0);
