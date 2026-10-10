import { chk } from "../lib.mjs";
const f = (x) => 2 * x + 3, g = (x) => x * x - 1;
for (const x of [-2, 0.5, 3]) { chk(f(g(x)), 2 * x * x + 1, 1e-12); chk(g(f(x)), 4 * x * x + 12 * x + 8, 1e-12); }
console.log("fg(2)", f(g(2)), "gf(2)", g(f(2)));
const h = (x) => (3 * x - 1) / (x + 2), hi = (x) => (2 * x + 1) / (3 - x);
for (const x of [-5, 0, 1, 7]) chk(hi(h(x)), x, 1e-12);
const p = (x) => (x - 2) ** 2 + 5, pi = (x) => 2 + Math.sqrt(x - 5);
for (const x of [2, 3.5, 9]) chk(pi(p(x)), x, 1e-12);
const q = (x) => 2 * x * x - 8 * x + 5, qi = (x) => 2 + Math.sqrt((x + 3) / 2);
for (const x of [2, 3, 6]) chk(qi(q(x)), x, 1e-12);
const F = (x) => 3 - x, G = (x) => 1 / (x - 4);
for (const x of [0, 2, 9]) chk(G(F(x)), -1 / (x + 1), 1e-12);
console.log("ok");
