// W2b lesson numbers: amaths.complex.de-moivre
import { cx, chk, same } from "../lib.mjs";
const { sqrt, PI, cos, sin } = Math;
const p6 = cx.pow([1, sqrt(3)], 6); chk(p6[0], 64, 1e-9); chk(p6[1], 0, 1e-9);
for (const th of [0.3, 1.1, 2.5]) {
  chk(cos(3 * th), 4 * cos(th) ** 3 - 3 * cos(th)); chk(sin(3 * th), 3 * sin(th) - 4 * sin(th) ** 3);
  chk(cos(th) ** 4, (cos(4 * th) + 4 * cos(2 * th) + 3) / 8);
}
const r = cx.roots([0, 8], 3); console.log("z^3 = 8i", r, r.map((z) => cx.arg(z) / PI));
chk(r[0][1], -2); chk(r[1][0], sqrt(3)); chk(r[1][1], 1); chk(r[2][0], -sqrt(3));
const w = cx.roots([1, 0], 3); console.log("cube roots of 1", w, "sum", w.reduce((a, z) => cx.add(a, z), [0, 0]));
