// Worked-example checks for lessons/series/geometric.md
import { chk, gp, ap, lg, ln, round } from "../lib.mjs";
chk(gp.nth(3, 2, 10), 1536); chk(gp.sum(3, 2, 10), 3069);
chk(gp.nth(2, 3, 3), 18); chk(gp.nth(2, 3, 6), 486); chk(gp.sum(2, 3, 8), 6560);
console.log("Ex3", lg(500000) / lg(3), gp.nth(2, 3, 12), gp.nth(2, 3, 13));
console.log("Ex4", round(12000 * 0.85 ** 5, 4), ln(0.25) / ln(0.85), round(12000 * 0.85 ** 8, 2), round(12000 * 0.85 ** 9, 2));
chk(gp.nth(12, 2, 2), ap.nth(12, 4, 4)); chk(gp.nth(12, 2, 3), ap.nth(12, 4, 10));
console.log("ok");
