// Worked-example checks for lessons/modulus/equations.md
import { chk, same, quad } from "../lib.mjs";

const ok = (f, xs) => xs.forEach((x) => chk(f(x), 0, 1e-9, `x=${x}`));
ok((x) => Math.abs(2 * x - 3) - 7, [5, -2]);
ok((x) => Math.abs(x + 4) - (2 * x - 1), [5]);
chk(Math.abs(-1 + 4) === 2 * -1 - 1 ? 1 : 0, 0); // x = -1 rejected
ok((x) => Math.abs(3 * x - 1) - Math.abs(x + 5), [3, -1]);
same(quad.roots(1, -2, -3), [-1, 3]);
same(quad.roots(1, -5, -6), [-1, 6]); same(quad.roots(1, -5, 6), [2, 3]);
ok((x) => Math.abs(x * x - 5 * x) - 6, [-1, 2, 3, 6]);
// Ex5: |x^2 - 4| = 3x -> x = 1, 4
same(quad.roots(1, -3, -4), [-1, 4]); same(quad.roots(1, 3, -4), [-4, 1]);
ok((x) => Math.abs(x * x - 4) - 3 * x, [1, 4]);
for (const x of [-1, -4]) chk(Math.sign(Math.abs(x * x - 4) - 3 * x), 1);
console.log("ok");
