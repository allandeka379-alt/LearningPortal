import { poly, same } from "../lib.mjs";
same(poly.mul([2, -3, 1], [1, 4]), [2, 5, -11, 4], "ex2");
same(poly.div([2, -3, 4, -5], [1, -2]), { q: [2, 1, 6], r: [7] }, "ex3");
same(poly.div([4, 0, -3, 5], [2, 1]), { q: [2, -1, -1], r: [6] }, "ex4");
// ex5: (x^2 + px + 3)(2x - 1): x^2 coefficient 2p - 1 = 0 -> p = 1/2
same(poly.mul([1, 0.5, 3], [2, -1]), [2, 0, 5.5, -3], "ex5");
console.log("ok");
