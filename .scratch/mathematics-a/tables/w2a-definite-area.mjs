// W2a lesson numbers: integ.definite-area
import { chk, integrate, quad, same } from "../lib.mjs";
chk(integrate((x) => 3 * x * x - 2 * x, 1, 3), 18, 1e-9, "ex1");
chk(integrate((x) => x * x - 4 * x, 0, 4), -32 / 3, 1e-9, "ex2");
same(quad.roots(1, 2, -8), [-4, 2]);
chk(integrate((x) => 8 - x * x - 2 * x, -4, 2), 36, 1e-9, "ex3");
chk(integrate((x) => 4 / x ** 3, 1, 2000, 2000000), 2 - 4 / (2 * 2000 ** 2), 1e-6, "ex4a partial");
chk(integrate((y) => Math.sqrt(y), 1, 4), 14 / 3, 1e-9, "ex5");
console.log("ok");
