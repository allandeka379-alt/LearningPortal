// W2a lesson numbers: diff.implicit-parametric (implicit gradients checked by a numerical slope of the solved branch)
import { chk, root } from "../lib.mjs";
const { exp, cos, sin, PI } = Math;
// Ex1 x² + y² = xy + 7 at (3, 2): branch y near 2 solved numerically
const y1 = (x) => root((y) => x * x + y * y - x * y - 7, 1.5, 2.9);
chk(y1(3), 2, 1e-9);
chk((y1(3 + 1e-6) - y1(3 - 1e-6)) / 2e-6, -4, 1e-4, "ex1 slope");
// Ex2 x² + 3xy + y² = 11 at (1, 2)
const y2 = (x) => root((y) => x * x + 3 * x * y + y * y - 11, 0, 5);
chk(y2(1), 2, 1e-9);
chk((y2(1 + 1e-6) - y2(1 - 1e-6)) / 2e-6, -8 / 7, 1e-4, "ex2 slope");
console.log("ex2 tangent 8x+7y =", 8 * 1 + 7 * 2);
// Ex3 x = t − e^{2t}, y = t + e^{2t}, t = 0
const X = (t) => t - exp(2 * t), Y = (t) => t + exp(2 * t), h = 1e-6;
chk((Y(h) - Y(-h)) / (X(h) - X(-h)), -3, 1e-5, "ex3");
console.log("ex3 point", X(0), Y(0));
// Ex4 x = 3cos, y = 2 sin at π/4
const th = PI / 4;
chk((2 * cos(th)) / (-3 * sin(th)), -2 / 3, 1e-12);
chk((3 * cos(th)) ** 2 / 9 + (2 * sin(th)) ** 2 / 4, 1, 1e-12);
