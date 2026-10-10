// W2b lesson numbers: amaths.complex.polynomial-equations
import { cx, poly, same, chk } from "../lib.mjs";
const pev = (c, z) => c.reduce((acc, a) => cx.add(cx.mul(acc, z), [a, 0]), [0, 0]);
const zero = (c, z, l) => { const v = pev(c, z); chk(v[0], 0, 1e-9, l); chk(v[1], 0, 1e-9, l); };
const q = (p, s) => [1, -2 * p, p * p + s * s]; // (z - (p ± si))
const e1 = poly.mul([1, -3], q(1, 2)); console.log("ex1", poly.tex(e1, "z")); same(e1, [1, -5, 11, -15]); zero(e1, [1, 2], "e1");
const e2 = poly.mul(q(3, 2), [1, 0, 1]); console.log("ex2", poly.tex(e2, "z")); same(e2, [1, -6, 14, -6, 13]); zero(e2, [3, 2], "e2"); zero(e2, [0, 1], "e2i");
// ex3: 1+i root of z^3 + a z^2 + b z + 6 → a = 1, b = -4
const e3 = [1, 1, -4, 6]; zero(e3, [1, 1], "e3"); same(poly.div(e3, q(1, 1)), { q: [1, 3], r: [0] });
console.log("(1+i)^2", cx.mul([1, 1], [1, 1]), "(1+i)^3", cx.mul(cx.mul([1, 1], [1, 1]), [1, 1]));
const e4 = poly.mul([1, -3], q(2, 1)); same(e4, [1, -7, 17, -15]); console.log("ex4", poly.tex(e4, "z"));
// division of e1 by z^2 - 2z + 5
same(poly.div(e1, q(1, 2)), { q: [1, -3], r: [0] });
same(poly.div(e2, q(3, 2)), { q: [1, 0, 1], r: [0] });
