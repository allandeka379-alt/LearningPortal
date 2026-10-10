import { chk, quad } from "../lib.mjs";
const rng = (f, lo, hi, n = 200000) => { let mn = Infinity, mx = -Infinity; for (let i = 0; i <= n; i++) { const v = f(lo + ((hi - lo) * i) / n); mn = Math.min(mn, v); mx = Math.max(mx, v); } return [mn, mx]; };
console.log("ex1", rng((x) => 1 / x, 2, 1e6));
console.log("ex2", quad.completeSquare(1, -4, 7), rng((x) => x * x - 4 * x + 7, 0, 5));
const f = (x) => x * x - 4 * x + 7; chk(f(1), f(3)); chk(f(1), 4);
console.log("ex5", rng((x) => 3 - 2 / (x + 1), 0, 1e7));
