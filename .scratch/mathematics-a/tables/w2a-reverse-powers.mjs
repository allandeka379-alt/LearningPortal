// W2a lesson numbers: integ.reverse-powers
import { chk, checkAntideriv } from "../lib.mjs";
const { sqrt } = Math;
checkAntideriv((x) => 2 * x ** 3 + 2 * x ** -2 + 2 * x ** 1.5, (x) => 6 * x * x - 4 / x ** 3 + 3 * sqrt(x), 0.5, 3, "ex1");
checkAntideriv((x) => (2 * x + 1) ** 5 / 10, (x) => (2 * x + 1) ** 4, 0, 2, "ex2a");
checkAntideriv((x) => -1 / (3 * x - 1) ** 2, (x) => 6 / (3 * x - 1) ** 3, 1, 3, "ex2b");
checkAntideriv((x) => x + 3 / x, (x) => (x * x - 3) / (x * x), 1, 4, "rewrite");
// Ex3
const c3 = 5 - (8 - 4); console.log("ex3 c", c3);
// Ex4 dy/dx = 2(4x+1)^(-1/2), (2, 4)
checkAntideriv((x) => sqrt(4 * x + 1), (x) => 2 / sqrt(4 * x + 1), 0, 3, "ex4");
console.log("ex4 c", 4 - sqrt(9));
