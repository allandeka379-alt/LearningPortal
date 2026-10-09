// Worked-example checks for lessons/calculus/tangents-normals.md
import { chk, checkDeriv } from "../lib.mjs";
const xs = [0.5, 1.5, 3];
// Ex1
const f1 = (x) => x ** 3 - 2 * x * x + 1, d1 = (x) => 3 * x * x - 4 * x;
checkDeriv(f1, d1, xs); chk(f1(2), 1); chk(d1(2), 4); chk(4 * 2 - 7, f1(2));
// Ex2 y = 4/x at (4, 1)
const d2 = (x) => -4 / (x * x); checkDeriv((x) => 4 / x, d2, xs); chk(d2(4), -0.25); chk(4 * 4 - 15, 1);
// Ex3 y = x^2 - 5x + 6 tangent parallel to y = 3x + 1
const f3 = (x) => x * x - 5 * x + 6; chk(2 * 4 - 5, 3); chk(f3(4), 2); chk(3 * 4 - 10, 2);
// Ex4 y = sqrt(2x+5) at x = 2
const f4 = (x) => Math.sqrt(2 * x + 5), d4 = (x) => 1 / Math.sqrt(2 * x + 5);
checkDeriv(f4, d4, xs); chk(f4(2), 3); chk(d4(2), 1 / 3);
// tangent: y - 3 = (1/3)(x - 2) -> x - 3y + 7 = 0 ; x-intercept -7
chk(2 - 3 * 3 + 7, 0); chk((0 - 3) * 3 + 2, -7);
// normal: y = -3x + 9, x-intercept 3
chk(-3 * 2 + 9, 3); chk(9 / 3, 3);
chk(0.5 * (3 - -7) * 3, 15);
// Ex5 y = e^{2x} at x = 0: tangent y = 2x + 1; meets x-axis at -1/2
checkDeriv((x) => Math.exp(2 * x), (x) => 2 * Math.exp(2 * x), xs);
console.log("ok");
