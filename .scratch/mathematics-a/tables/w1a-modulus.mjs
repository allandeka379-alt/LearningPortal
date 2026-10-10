import { chk, same, quad } from "../lib.mjs";
// solution set of an inequality by scanning: prints intervals where pred holds on [-20, 20]
export function scan(pred, lo = -20, hi = 20, step = 0.001) {
  const out = []; let start = null;
  for (let i = 0, x = lo; x <= hi; i++, x = lo + i * step) {
    const ok = pred(x);
    if (ok && start === null) start = x;
    if (!ok && start !== null) { out.push([+start.toFixed(2), +(x - step).toFixed(2)]); start = null; }
  }
  if (start !== null) out.push([+start.toFixed(2), hi]);
  return out;
}
const isMain = import.meta.url.endsWith("w1a-modulus.mjs") && process.argv[1].endsWith("w1a-modulus.mjs");
if (isMain) {
  for (const x of [6, -1]) chk(Math.abs(2 * x - 5), 7);
  same(quad.roots(1, -2, -3), [-1, 3]);
  for (const x of [3, -1]) chk(Math.abs(3 * x - 1), Math.abs(x + 5));
  console.log("ex3a", scan((x) => Math.abs(x - 4) < 3), "ex3b", scan((x) => Math.abs(2 * x + 1) >= 5));
  console.log("ex4", scan((x) => Math.abs(x + 2) > Math.abs(2 * x - 3)), quad.roots(3, -16, 5));
  console.log("ex5", scan((x) => Math.abs(2 * x - 1) < x + 4));
}
