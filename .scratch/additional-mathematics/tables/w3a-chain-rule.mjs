// Worked-example checks for lessons/calculus/chain-rule.md
import { chk, checkDeriv } from "../lib.mjs";
const xs = [0.1, 0.3, 1.2];
checkDeriv((x) => (3 * x * x + 4) ** 5, (x) => 30 * x * (3 * x * x + 4) ** 4, xs, "ex1");
checkDeriv((x) => 4 / (2 - 5 * x) ** 3, (x) => 60 / (2 - 5 * x) ** 4, [0.1, 0.2, 1, 2], "ex2");
checkDeriv((x) => Math.sqrt(x * x + 9), (x) => x / Math.sqrt(x * x + 9), [-2, 1, 4], "ex3");
chk(4 / Math.sqrt(25), 0.8);
checkDeriv((x) => 1 / Math.sqrt(4 * x + 1), (x) => -2 / (4 * x + 1) ** 1.5, [0.5, 2, 3], "ex4");
chk(-2 / 9 ** 1.5, -2 / 27);
// Ex5 (rates in disguise): y = (x^2 - 5)^3 at x = 2: y' = 6x(x^2-5)^2 -> 12
checkDeriv((x) => (x * x - 5) ** 3, (x) => 6 * x * (x * x - 5) ** 2, xs);
chk(6 * 2 * (4 - 5) ** 2, 12);
console.log("ok");
