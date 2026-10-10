// Checks the worked examples of lessons/series/arithmetic.md.
import { chk, ap, sum } from "../lib.mjs";

// Ex1 recurrence u_{n+1} = 2u_n − 1, u1 = 3 → 3, 5, 9, 17
const u = [3]; for (let i = 0; i < 3; i++) u.push(2 * u[i] - 1);
chk(u[3], 17);
// Ex2 Σ_{r=1}^{20} (3r + 2) = 670
chk(sum(Array.from({ length: 20 }, (_, i) => 3 * (i + 1) + 2)), 670);
// Ex3 u7 = 25, u15 = 49 → d = 3, a = 7, S20 = 710
chk(ap.nth(7, 3, 7), 25); chk(ap.nth(7, 3, 15), 49); chk(ap.sum(7, 3, 20), 710);
// Ex4 5, 9, 13, …: S_n = n(2n + 3) > 1000 → n = 22
chk(ap.sum(5, 4, 21), 21 * 45); chk(ap.sum(5, 4, 21) < 1000 ? 1 : 0, 1); chk(ap.sum(5, 4, 22), 1034);
chk(Math.round(((-3 + Math.sqrt(8009)) / 4) * 100) / 100, 21.62);
// Ex5 x, 2x + 3, 5x − 4 in AP → x = 5: 5, 13, 21
chk(2 * (2 * 5 + 3), 5 + 5 * 5 - 4);
// Ex6 savings 20, 25, … for 24 months → 1860
chk(ap.sum(20, 5, 24), 1860); chk(ap.nth(20, 5, 24), 135);
console.log("arithmetic lesson OK");
