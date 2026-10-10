// W2a lesson numbers: diff.exp-log-trig
import { chk, checkDeriv } from "../lib.mjs";
const { exp, log, sin, cos, atan, PI } = Math;
const XS = [0.6, 1.3, 2.2];
checkDeriv((x) => exp(1 - x * x), (x) => -2 * x * exp(1 - x * x), XS, "ex1");
console.log("ex1 at 1", -2 * exp(0));
checkDeriv((x) => log((2 * x - 1) ** 3), (x) => 6 / (2 * x - 1), XS, "ex2");
checkDeriv((x) => sin(3 * x) ** 2, (x) => 3 * sin(6 * x), XS, "ex3");
console.log("ex3 at pi/12", 3 * sin(PI / 2));
const y4 = (x) => exp(2 * x) - 6 * x;
checkDeriv(y4, (x) => 2 * exp(2 * x) - 6, XS, "ex4");
const x4 = 0.5 * log(3);
console.log("ex4 x", x4, "y", y4(x4), "check 3-3ln3", 3 - 3 * log(3), "y''", 4 * exp(2 * x4));
checkDeriv((x) => atan(2 * x), (x) => 2 / (1 + 4 * x * x), XS, "ex5");
console.log("ex5 at 0.5", 2 / (1 + 1));
