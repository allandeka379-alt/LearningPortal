// Worked-example checks for lessons/graphs/modulus-functions.md
import { chk, same, quad, solveTrig, table } from "../lib.mjs";

// Ex1: y = |2x - 6|
const f1 = (x) => Math.abs(2 * x - 6);
console.log(table(["$x$", ...[0, 1, 2, 3, 4, 5, 6].map(String)], [["$y$", ...[0, 1, 2, 3, 4, 5, 6].map(f1)]]));
// Ex2: y = |x^2 - 2x - 8|: roots -2, 4; vertex (1, -9)
same(quad.roots(1, -2, -8), [-2, 4]);
same(quad.completeSquare(1, -2, -8).vertex, [1, -9]);
const count = (k) => [...quad.roots(1, -2, -8 - k), ...quad.roots(1, -2, -8 + k)].length;
chk(count(5), 4); chk(count(9), 3); chk(count(12), 2);
// Ex3: y = |2cos x + 1|, 0..360
same(solveTrig({ fn: "cos", k: -0.5, lo: 0, hi: 360 }), [120, 240]);
const f3 = (x) => Math.abs(2 * Math.cos((x * Math.PI) / 180) + 1);
console.log(table(["$x$", ..."0 60 90 120 180 240 270 300 360".split(" ")], [["$y$", ...[0, 60, 90, 120, 180, 240, 270, 300, 360].map((x) => Number(f3(x).toFixed(3)))]]));
// counts for |2cos x + 1| = k
const c3 = (k) => new Set([...solveTrig({ fn: "cos", k: (k - 1) / 2, lo: 0, hi: 360 }), ...solveTrig({ fn: "cos", k: (-k - 1) / 2, lo: 0, hi: 360 })]).size;
console.log("counts k=0.5,1,2,3:", c3(0.5), c3(1), c3(2), c3(3));
// Ex4: |1 - 2 sin x| = 1
const s4 = [...solveTrig({ fn: "sin", k: 0, lo: 0, hi: 360 }), ...solveTrig({ fn: "sin", k: 1, lo: 0, hi: 360 })].sort((a, b) => a - b);
same(s4, [0, 90, 180, 360]);
console.log("ok");
