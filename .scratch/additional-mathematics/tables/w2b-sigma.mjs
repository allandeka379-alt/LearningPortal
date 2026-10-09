// Worked-example checks for lessons/series/sigma-notation.md
import { chk, same, ap, gp, F } from "../lib.mjs";
const S = (f, a, b) => { let s = 0; for (let r = a; r <= b; r++) s += f(r); return s; };
same([1, 2, 3, 4, 5].map((r) => 3 * r - 1), [2, 5, 8, 11, 14]); chk(S((r) => 3 * r - 1, 1, 5), 40);
chk(S((r) => 2 ** r, 0, 4), 31);
chk((61 - 1) / 3, 20); chk(S((r) => 3 * r + 1, 1, 20), 650); chk(ap.sum(4, 3, 20), 650);
chk(S((r) => (-1) ** (r + 1) * 0.5 ** r, 1, 6), 21 / 64); chk(gp.sum(0.5, -0.5, 6), 21 / 64);
chk(S((r) => 2 * r + 5, 1, 10), 160);
chk(S((r) => 4 * r - 3, 11, 30), 1580); chk(2 * 900 - 30 - (200 - 10), 1580); chk(4 * 11 - 3, 41); chk(4 * 30 - 3, 117);
console.log("ok");
