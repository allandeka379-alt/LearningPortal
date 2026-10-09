// Worked-example checks for lessons/modulus/inequalities.md: brute-force the solution sets on a fine grid.
import { chk, same, quad } from "../lib.mjs";

/** Returns the solution set of pred on [-20, 20] as maximal intervals [lo, hi] (grid step 1/64). */
function solve(pred) {
  const out = [];
  let start = null;
  const step = 1 / 64;
  for (let i = -20 * 64; i <= 20 * 64 + 1; i++) {
    const x = i * step;
    const okx = i <= 20 * 64 && pred(x);
    if (okx && start === null) start = x;
    if (!okx && start !== null) { out.push([start, x - step]); start = null; }
  }
  return out;
}
const show = (s) => JSON.stringify(s);
console.log("ex1a", show(solve((x) => Math.abs(x - 3) < 5)));
console.log("ex1b", show(solve((x) => Math.abs(2 * x + 1) >= 7)));
console.log("ex2", show(solve((x) => 3 * Math.abs(2 * x - 1) > 15)));
console.log("ex3", show(solve((x) => Math.abs(x + 1) <= Math.abs(2 * x - 4))));
same(quad.roots(3, -18, 15), [1, 5]);
console.log("ex4", show(solve((x) => Math.abs(2 * x - 3) < x + 1)));
chk(Math.abs(2 * (2 / 3) - 3), 2 / 3 + 1);
console.log("ex5", show(solve((x) => Math.abs(x * x - 5) < 4)));
