// Checks for lessons/calculus/integration-functions.md
import { chk, checkAntideriv, checkDeriv, sec } from "../lib.mjs";
const { exp, log, sin, cos, tan, sqrt } = Math;
checkAntideriv((x) => (3 * x - 2) ** 5 / 15, (x) => (3 * x - 2) ** 4, 0, 2, "ex1");
checkAntideriv((x) => exp(4 * x) / 4 + 2 * log(3 * x - 1), (x) => exp(4 * x) + 6 / (3 * x - 1), 0.5, 2, "ex2");
checkAntideriv((x) => sin(3 * x) / 3 + 4 * cos(x / 2), (x) => cos(3 * x) - 2 * sin(x / 2), 0, 2, "ex3");
checkAntideriv((x) => tan(2 * x + 0.3) / 2, (x) => sec(2 * x + 0.3) ** 2, 0, 0.5, "ex4 sec");
checkAntideriv((x) => 0.5 * sqrt(4 * x + 1), (x) => 1 / sqrt(4 * x + 1), 0, 3, "ex5");
checkDeriv((x) => x * exp(2 * x), (x) => exp(2 * x) + 2 * x * exp(2 * x), [0, 0.5, 1]);
checkAntideriv((x) => 0.5 * x * exp(2 * x) - 0.25 * exp(2 * x), (x) => x * exp(2 * x), 0, 1.5, "ex6");
// ex4 second: ∫ (2 - 4/(1-2x))?  ∫ 6/(1 - 2x) dx = -3 ln|1 - 2x|
checkAntideriv((x) => -3 * log(Math.abs(1 - 2 * x)), (x) => 6 / (1 - 2 * x), -2, 0, "neg ln");
console.log("integration-functions lesson checks OK");
