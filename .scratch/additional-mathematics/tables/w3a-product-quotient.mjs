// Worked-example checks for lessons/calculus/product-quotient.md
import { chk, checkDeriv } from "../lib.mjs";
const xs = [0.4, 1.3, 2.2];
checkDeriv((x) => x * x * (3 * x - 1) ** 4, (x) => 2 * x * (3 * x - 1) ** 3 * (9 * x - 1), xs, "ex1");
checkDeriv((x) => x * x * Math.log(x), (x) => 2 * x * Math.log(x) + x, xs, "ex2");
checkDeriv((x) => (2 * x + 3) / (x - 1), (x) => -5 / (x - 1) ** 2, [1.5, 2, 4], "ex3");
checkDeriv((x) => x / Math.sqrt(x + 4), (x) => (x + 8) / (2 * (x + 4) ** 1.5), [0, 1, 5], "ex4");
chk(8 / (2 * 4 ** 1.5), 0.5);
const g = (x) => (x * Math.cos(x) - Math.sin(x)) / (x * x);
checkDeriv((x) => Math.sin(x) / x, g, [0.5, 1.5, 2]);
chk(g(Math.PI / 2), -4 / Math.PI ** 2);
console.log("ok", g(Math.PI / 2));
