import { chk, same, poly } from "../lib.mjs";
const d1 = poly.div([2, -3, 4, -5], [1, -2]); console.log("ex1", d1, poly.str(d1.q));
chk(poly.eval([2, -3, 4, -5], 2), d1.r[0]);
const d1b = poly.div([1, 2, 0, -1, 3], [1, 1, -1]); console.log("ex1b", d1b, poly.str(d1b.q), poly.str(d1b.r));
same(poly.add(poly.mul([1, 1, -1], d1b.q), d1b.r), [1, 2, 0, -1, 3]);
// ex2 identity 3x²−5x+4 ≡ A(x−1)² + B(x−1) + C
same(poly.add(poly.add(poly.mul([3], [1, -2, 1]), [1, -1]), [2]), [3, -5, 4]);
// ex3
const p = [2, 1, -9, -6]; chk(poly.eval(p, -2), 0); chk(poly.eval(p, 1), -12);
console.log("ex3 q", poly.div(p, [1, 2]), "roots", (3 - Math.sqrt(33)) / 4, (3 + Math.sqrt(33)) / 4);
// ex4
const q = [1, -1, -7, 1, 6]; for (const r of [-2, -1, 1, 3]) chk(poly.eval(q, r), 0); console.log("ex4 roots", poly.rationalRoots(q));
console.log(poly.div(q, [1, -3]));
const d5 = poly.div([1, -3, 2, 5, -1], [1, -1, 2]); console.log("ex1c", d5, poly.str(d5.q), poly.str(d5.r));
same(poly.add(poly.mul([1, -1, 2], d5.q), d5.r), [1, -3, 2, 5, -1]);
