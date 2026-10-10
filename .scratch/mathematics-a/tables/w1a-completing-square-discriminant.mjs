import { chk, same, quad } from "../lib.mjs";
console.log("ex1", quad.completeSquare(2, -12, 7));
console.log("ex2", quad.completeSquare(-1, 4, 5));
console.log("ex3", quad.roots(1, -3, -4)); for (const k of [4, -1]) chk(quad.disc(k, 4, k - 3), 0);
console.log("ex3 roots", quad.roots(4, 4, 1), quad.roots(-1, 4, -4));
console.log("ex4", quad.roots(1, -4, 6 - 2), 2 + 2);
for (const k of [-3, 0, 2, 7]) chk(quad.disc(1, k, k - 1), (k - 2) ** 2);
