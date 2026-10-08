// Tables for lessons/costs/revenue.md (W3a).
import { revenueTable, table, check } from "../lib.mjs";
// WE1: a price-taking egg producer (constant price US$4 per tray).
const e = revenueTable({ quantity: [0, 100, 200, 300, 400], price: [4, 4, 4, 4, 4], marginal: true });
console.log(e.md);
// WE2: a fictional car wash that must lower its price to sell more (washes per day).
const q = [0, 1, 2, 3, 4, 5, 6], p = [13, 12, 11, 10, 9, 8, 7];
const w = revenueTable({ quantity: q, price: p, marginal: true });
console.log(w.md);
for (const r of w.rows) console.log(r.q, r.tr, r.mr);
check("tr4", w.rows[4].tr, 36);
// Sales and revenue: price cut 2.50 → 2.00, sales 800 → 1,100.
console.log(2.5 * 800, 2 * 1100);
