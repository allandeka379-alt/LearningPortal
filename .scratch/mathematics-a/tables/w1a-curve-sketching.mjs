import { chk, poly, root } from "../lib.mjs";
const c = poly.mul(poly.mul([1, 2], [1, -1]), [1, -3]); console.log("ex2", poly.str(c), poly.eval(c, 0));
const r = (x) => (2 * x + 1) / (x - 1); for (const x of [0, -0.5, 4]) chk(r(x), 2 + 3 / (x - 1), 1e-12); console.log("ex4", r(0));
const g = (x) => x ** 3 - 3 * x + 1; let n = 0, prev = g(-5); for (let i = 1; i <= 100000; i++) { const v = g(-5 + i * 1e-4); if (prev * v < 0) n++; prev = v; } console.log("ex5 roots", n, root(g, -2, -1.5), root(g, 0, 1), root(g, 1, 2));
