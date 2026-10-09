// Worked-example checks for lessons/sequences/behaviour.md
import { chk, same } from "../lib.mjs";
const terms = (f, n) => Array.from({ length: n }, (_, i) => f(i + 1));
const rec = (u1, g, n) => { const o = [u1]; while (o.length < n) o.push(g(o[o.length - 1])); return o; };
same(terms((n) => 3 * n * n - 1, 4), [2, 11, 26, 47]); chk(3 * 10 * 10 - 1, 299);
same(rec(5, (u) => 2 * u - 3, 5), [5, 7, 11, 19, 35]);
same(rec(2, (u) => 1 / (1 - u), 7), [2, -1, 0.5, 2, -1, 0.5, 2]);
console.log(terms((n) => (2 * n + 1) / (n + 3), 4), (2 * 1000 + 1) / 1003);
const s = rec(2, (u) => 0.5 * u + 4, 30); console.log(s.slice(0, 5), s[29]); chk(8, 0.5 * 8 + 4);
console.log(terms((n) => (-0.5) ** n, 5), terms((n) => (-2) ** n, 5));
console.log("ok");
