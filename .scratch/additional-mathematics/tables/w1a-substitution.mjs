import { quad, same, chk, sfStr } from "../lib.mjs";
same(quad.roots(1, -5, 4), [1, 4]); chk(4 ** 3, 64);
same(quad.roots(1, -5, 6), [2, 3]);
console.log("ex3", sfStr(Math.log(2)), sfStr(Math.log(3)));
same(quad.roots(1, -4, -5), [-1, 5]); console.log("ex4", Math.log(5) / Math.log(3), sfStr(Math.log(5) / Math.log(3)));
same(quad.roots(1, -3, 2), [1, 2]); console.log("ex5", Math.E, Math.E ** 2, sfStr(Math.E ** 2));
same(quad.roots(1, 1, -6), [-3, 2]);
