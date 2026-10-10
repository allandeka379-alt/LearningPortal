// Checks the worked examples of lessons/discrete/random-variables.md.
import { chk, same, F, nCr } from "../lib.mjs";
const ev = (d) => d.reduce((s, [x, p]) => s + x * p, 0);
const ex2 = (d) => d.reduce((s, [x, p]) => s + x * x * p, 0);
// Ex1: 3 chosen from 4 boys 3 girls, X = girls
const d1 = [0, 1, 2, 3].map((x) => [x, (nCr(3, x) * nCr(4, 3 - x)) / nCr(7, 3)]);
console.log(d1.map(([x, p]) => F(Math.round(p * 35), 35).s));
chk(ev(d1), 9 / 7); chk(ex2(d1), 15 / 7); chk(ex2(d1) - ev(d1) ** 2, 24 / 49);
// Ex2
const d2 = [[1, 0.1], [2, 0.25], [3, 0.3], [4, 0.35]];
chk(ev(d2), 2.9); chk(ex2(d2), 9.4); chk(ex2(d2) - 2.9 ** 2, 0.99);
// Ex3 kx
const d3 = [1, 2, 3, 4].map((x) => [x, x / 10]); chk(ev(d3), 3); chk(ex2(d3), 10);
// Ex4 uniform 1..8
const d4 = [1, 2, 3, 4, 5, 6, 7, 8].map((x) => [x, 1 / 8]); chk(ev(d4), 4.5); chk(ex2(d4) - 4.5 ** 2, 63 / 12); chk(63 / 12, 5.25);
console.log("sd uniform", Math.sqrt(5.25), "sd ex1", Math.sqrt(24 / 49));
