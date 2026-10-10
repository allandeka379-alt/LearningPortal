// W2a lesson numbers: integ.partial-fractions
import { chk, integrate } from "../lib.mjs";
const { log, atan } = Math;
const id = (f, g, l) => [0.37, 2.9, 5.6, 7.1].forEach((x) => chk(f(x), g(x), 1e-9, l));
id((x) => (x + 7) / ((x - 1) * (x + 3)), (x) => 2 / (x - 1) - 1 / (x + 3), "ex1");
chk(integrate((x) => (x + 7) / ((x - 1) * (x + 3)), 2, 4), log(45 / 7), 1e-9, "ex2");
id((x) => (x + 3) / (x + 1) ** 2, (x) => 1 / (x + 1) + 2 / (x + 1) ** 2, "ex3");
chk(integrate((x) => (x + 3) / (x + 1) ** 2, 0, 1), log(2) + 1, 1e-9, "ex3 int");
id((x) => (x * x + x + 4) / (x * (x * x + 4)), (x) => 1 / x + 1 / (x * x + 4), "ex4");
chk(integrate((x) => 1 / x + 1 / (x * x + 4), 1, 2), log(2) + 0.5 * (atan(1) - atan(0.5)), 1e-9, "ex4 def");
id((x) => (x * x + 1) / ((x - 1) * (x + 1)), (x) => 1 + 1 / (x - 1) - 1 / (x + 1), "ex5");
console.log("ex2", log(45 / 7), "ex3", log(2) + 1);
