import { poly, same, chk, quad } from "../lib.mjs";
// ex2: 3x^2 − 12x + 5 = 3(x − 2)^2 − 7
const cs = quad.completeSquare(3, -12, 5); same([cs.a, cs.p, cs.q], [3, -2, -7], "ex2");
// ex3: x^3 − 4x^2 + 2x + 7 ≡ (x − 2)(x^2 − 2x − 2) + 3
same(poly.add(poly.mul([1, -2], [1, -2, -2]), [3]), [1, -4, 2, 7], "ex3");
// ex4: 5x − 1 ≡ 3(x + 1) + 2(x − 2)
same(poly.add(poly.mul([3], [1, 1]), poly.mul([2], [1, -2])), [5, -1], "ex4");
// ex5: (2x − 5)^2 − 6 ≡ 4x^2 − 20x + 19
same(poly.sub(poly.mul([2, -5], [2, -5]), [6]), [4, -20, 19], "ex5");
console.log("ok");
