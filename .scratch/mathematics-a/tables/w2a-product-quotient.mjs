// W2a lesson numbers: diff.product-quotient
import { chk, checkDeriv } from "../lib.mjs";
const { exp, log, sqrt } = Math;
const XS = [0.6, 1.3, 2.4];
checkDeriv((x) => x * x * log(x), (x) => 2 * x * log(x) + x, XS, "ex1");
console.log("ex1 x", exp(-0.5), "y", exp(-1) * -0.5);
checkDeriv((x) => (2 * x - 4) / (3 * x + 2), (x) => 16 / (3 * x + 2) ** 2, XS, "ex2");
checkDeriv((x) => x * exp(1 - x * x), (x) => exp(1 - x * x) * (1 - 2 * x * x), XS, "ex3");
console.log("ex3 x", 1 / sqrt(2), "y", (1 / sqrt(2)) * exp(0.5));
const y4p = (x) => (3 * x + 4) / sqrt(2 * x + 3);
checkDeriv((x) => (x + 1) * sqrt(2 * x + 3), y4p, XS, "ex4");
chk(y4p(3), 13 / 3, 1e-12); console.log("ex4 y(3)", 4 * 3);
