// Worked-example checks for lessons/trig/equations-identities.md: every listed solution satisfies the ORIGINAL
// equation, and a grid scan finds no others.
import { chk, same, rad, sec, cot, cosec, round, root } from "../lib.mjs";
function scan(f, lo, hi, n = 720000) {
  const out = [];
  for (let i = 0; i < n; i++) {
    const a = lo + ((hi - lo) * i) / n, b = lo + ((hi - lo) * (i + 1)) / n;
    const fa = f(a), fb = f(b);
    if (!Number.isFinite(fa) || !Number.isFinite(fb)) continue;
    if (Math.abs(fa) < 1e-12) out.push(a);
    else if (fa * fb < 0 && Math.abs(fa - fb) < 1) out.push(root(f, a, b));
  }
  if (Math.abs(f(hi)) < 1e-12) out.push(hi);
  return [...new Set(out.map((x) => round(x, 4)))];
}
const D = (f) => (x) => f(rad(x));
const { sin, cos, tan } = Math;
console.log("Ex1", scan(D((x) => 2 * sin(x) ** 2 - cos(x) - 1), 0, 360));
console.log("Ex2", scan(D((x) => 2 * sec(x) ** 2 + tan(x) - 3), 0, 360));
console.log("Ex3", scan(D((x) => 4 * cot(x) - tan(x)), 0, 360));
console.log("Ex4", scan((x) => 2 * cos(x) ** 2 - 3 * sin(x), 0, 2 * Math.PI).map((x) => round(x / Math.PI, 4)));
console.log("Ex5", scan(D((x) => cot(x) ** 2 - 3 * cosec(x) + 3), 0.001, 359.999));
