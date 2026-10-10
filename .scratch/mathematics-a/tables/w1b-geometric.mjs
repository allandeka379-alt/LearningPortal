// Checks the worked examples of lessons/series/geometric.md.
import { chk, gp, ap, rnd } from "../lib.mjs";

// Ex1 3, 6, 12, …: u10 = 1536, S10 = 3069
chk(gp.nth(3, 2, 10), 1536); chk(gp.sum(3, 2, 10), 3069);
// Ex2 u3 = 18, u6 = −486 → r = −3, a = 2
chk(gp.nth(2, -3, 3), 18); chk(gp.nth(2, -3, 6), -486);
// Ex3 48 + 36 + 27 + … → S∞ = 192
chk(gp.sumInf(48, 0.75), 192);
// Ex4 least n with S_n > 190 → 0.75^n < 1/96 → n > 15.87 → 16
chk(gp.sum(48, 0.75, 15) < 190 ? 1 : 0, 1); chk(gp.sum(48, 0.75, 16) > 190 ? 1 : 0, 1);
rnd(Math.log(1 / 96) / Math.log(0.75), 2, 15.87);
// Ex5 AP 1st, 2nd, 5th terms in GP → d = 2a, r = 3; a = 4
chk((4 + 8) ** 2, 4 * (4 + 4 * 8)); chk(ap.nth(4, 8, 2) / 4, 3); chk(ap.nth(4, 8, 5), 36);
// Ex6 k, k + 6, 4k in GP → k = 6 or −2
for (const k of [6, -2]) chk((k + 6) ** 2, k * 4 * k);
// Ex7 ball 10 m, rebounds 60%: 10 + 2 × 6/0.4 = 40
chk(10 + 2 * gp.sumInf(6, 0.6), 40);
console.log("geometric lesson OK");
