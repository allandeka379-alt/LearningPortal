// W2b lesson numbers: amaths.complex.cartesian
import { cx, chk, same, F, quad } from "../lib.mjs";
const z = [2, -3], w = [1, 4];
console.log("z+w", cx.add(z, w), "z-w", cx.sub(z, w), "zw", cx.mul(z, w), "z/w", cx.div(z, w).map((v) => v * 17));
same(cx.mul(z, w), [14, 5]);
const q = cx.div(z, w); chk(q[0], -10 / 17); chk(q[1], -11 / 17);
// z^2 - 6z + 13 = 0
for (const r of [[3, 2], [3, -2]]) { const v = cx.add(cx.sub(cx.mul(r, r), [6 * r[0], 6 * r[1]]), [13, 0]); same(v.map(Math.round), [0, 0]); }
console.log("disc", quad.disc(1, -6, 13));
// sqrt(5+12i) = ±(3+2i)
same(cx.mul([3, 2], [3, 2]), [5, 12]);
// u = 3 + i, u^2 = 8 + 6i, u^2 - 6u + 10 = 0
same(cx.mul([3, 1], [3, 1]), [8, 6]);
same(cx.add(cx.sub([8, 6], [18, 6]), [10, 0]), [0, 0]);
// equality: (a + bi)(2 - i) = 7 + 4i → a+bi = (7+4i)/(2-i)
console.log("eq", cx.div([7, 4], [2, -1]));
same(cx.mul([2, 3], [2, -1]), [7, 4]);
