// Worked-example checks for lessons/logs/equations.md
import { chk, same, quad, logb, sfStr, ln, lg } from "../lib.mjs";
const x1 = lg(40) / lg(5); console.log("ex1", x1, sfStr(x1), 5 ** x1);
const x2 = ln(2) / (ln(3) - ln(2)); chk(2 ** (x2 + 1), 3 ** x2); console.log("ex2", x2, sfStr(x2));
const x3 = ln(7) / 2; chk(3 * Math.exp(2 * x3) - 5, 16); console.log("ex3a", x3, sfStr(x3));
const x3b = (Math.exp(3) + 1) / 2; chk(ln(2 * x3b - 1), 3); console.log("ex3b", x3b, sfStr(x3b));
same(quad.roots(1, 8, -9), [-9, 1]); chk(logb(3, 1 + 8) + logb(3, 1), 2);
chk(logb(2, 16) + logb(4, 16), 6);
const t6 = ln(3000 / 1800) / ln(1.035); console.log("ex6", t6, 1800 * 1.035 ** 14, 1800 * 1.035 ** 15);
console.log("ok");
