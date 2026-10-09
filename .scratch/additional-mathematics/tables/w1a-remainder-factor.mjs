import { poly, chk, same } from "../lib.mjs";
chk(poly.eval([1, -4, 2, 5], 3), 2, 0, "ex1");
chk(poly.eval([4, 2, -1, 3], 0.5), 3.5, 1e-12, "ex2");
chk(poly.eval([1, 3, 0, -4], -2), 0, 0, "ex3");
chk(poly.eval([1, -1, -5, 6], 2), 0, 0, "ex4 a=-1");
// ex5 p = 3, q = -5
chk(poly.eval([2, 3, -5, -6], -1), 0, 0, "ex5a");
chk(poly.eval([2, 3, -5, -6], 2), 12, 0, "ex5b");
same(poly.div([2, 3, -5, -6], [1, 1]), { q: [2, 1, -6], r: [0] }, "ex5 quotient");
console.log("ok");
