// W2b lesson numbers: amaths.numerical.locating-roots
import { iterate, root, chk } from "../lib.mjs";
const { cbrt, exp, sqrt } = Math;
const f = (x) => x ** 3 - 3 * x - 5;
console.log("f(2), f(3)", f(2), f(3));
const xs = iterate((x) => cbrt(3 * x + 5), 2, { maxN: 8 });
console.log("cbrt iter", xs.map((x) => x.toFixed(5)));
const a = root(f, 2, 3); console.log("root", a, "f(2.275)", f(2.275), "f(2.285)", f(2.285));
console.log("F'(a)", 1 / cbrt(3 * a + 5) ** 2);
const bad = iterate((x) => (x ** 3 - 5) / 3, 2, { maxN: 5 }); console.log("bad", bad);
// ex4: x^2 = 2 + e^-x
const g = (x) => x * x - 2 - exp(-x); console.log("g(1), g(2)", g(1), g(2));
const ys = iterate((x) => sqrt(2 + exp(-x)), 1.5, { maxN: 8 }); console.log("ex4", ys.map((x) => x.toFixed(5)));
const b = root(g, 1, 2); console.log("b", b, g(1.4795), g(1.4805));
console.log("g(1.4915)", g(1.4915), "g(1.4925)", g(1.4925));
chk(Math.round(b * 1000) / 1000, 1.492);
chk(Math.round(a * 100) / 100, 2.28);
