// W2a lesson numbers: diff.powers-chain
import { chk, checkDeriv } from "../lib.mjs";
const XS = [0.6, 1.4, 2.5];
// Ex1 y = 4x³ − 6√x + 5/x² -> 12x² − 3x^(-1/2) − 10x^(-3); at x = 1: -1
const y1p = (x) => 12 * x * x - 3 / Math.sqrt(x) - 10 / x ** 3;
checkDeriv((x) => 4 * x ** 3 - 6 * Math.sqrt(x) + 5 / x ** 2, y1p, XS, "ex1");
console.log("ex1 at 1", y1p(1));
// Ex2 y = (x + 2)²/x = x + 4 + 4/x -> 1 − 4/x²; zero at x = ±2
checkDeriv((x) => (x + 2) ** 2 / x, (x) => 1 - 4 / x ** 2, XS, "ex2");
// Ex3 y = √(2x³ + 5) -> 3x²/√(2x³+5); at x = 1: 3/√7
const y3p = (x) => (3 * x * x) / Math.sqrt(2 * x ** 3 + 5);
checkDeriv((x) => Math.sqrt(2 * x ** 3 + 5), y3p, XS, "ex3");
console.log("ex3 at 1", y3p(1));
// Ex4 y = (3 − 2x)^-4 -> 8(3 − 2x)^-5; at x = 1: 8
const y4p = (x) => 8 * (3 - 2 * x) ** -5;
checkDeriv((x) => (3 - 2 * x) ** -4, y4p, [0.2, 0.9, 1.1], "ex4");
console.log("ex4 at 1", y4p(1));
// Ex5 f = (2x+1)^(3/2): f' = 3(2x+1)^(1/2), f'' = 3(2x+1)^(-1/2); f''(4) = 1
checkDeriv((x) => (2 * x + 1) ** 1.5, (x) => 3 * Math.sqrt(2 * x + 1), XS, "ex5 f'");
checkDeriv((x) => 3 * Math.sqrt(2 * x + 1), (x) => 3 / Math.sqrt(2 * x + 1), XS, "ex5 f''");
chk(3 / Math.sqrt(9), 1, 1e-12, "f''(4)");
chk(3 * Math.sqrt(9), 9, 1e-12, "f'(4)");
