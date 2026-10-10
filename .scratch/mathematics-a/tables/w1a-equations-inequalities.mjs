import { chk, same, quad } from "../lib.mjs";
function scan(pred, lo = -30, hi = 30, step = 0.0005) { const out = []; let s = null; for (let i = 0; ; i++) { const x = lo + i * step; if (x > hi) break; const ok = pred(x); if (ok && s === null) s = x; if (!ok && s !== null) { out.push([+s.toFixed(3), +(x - step).toFixed(3)]); s = null; } } if (s !== null) out.push([+s.toFixed(3), hi]); return out; }
console.log("ex1", scan((x) => 3 * x * x - 5 * x - 2 <= 0), quad.roots(3, -5, -2));
console.log("ex2", quad.roots(3, -1, -14)); for (const x of quad.roots(3, -1, -14)) { const y = 2 * x - 1; chk(x * x + x * y, 14, 1e-9); console.log(x, y); }
console.log("ex3", quad.roots(2, -7, 3)); for (const x of [0.25, 9]) chk(2 * x - 7 * Math.sqrt(x) + 3, 0, 1e-12);
for (const x of [1, -1, 3, -3]) chk(x ** 4 - 10 * x * x + 9, 0);
console.log("ex4", scan((x) => x !== 2 && (x + 4) / (x - 2) > 3));
console.log("ex5", scan((x) => (x + 1) * (x - 2) * (x - 4) >= 0));
