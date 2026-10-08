// Figures for lessons/market-failure/externalities.md (W2a).
import { money, check } from "../lib.mjs";
// WE1: brick kiln per month.
const pc = 18000, pb = 23000, ec = 7500;
const sc = pc + ec, sb = pb;
console.log("WE1 social cost", money(sc), "private profit", money(pb - pc), "social net", money(sb - sc));
check("sc", sc, 25500);
// WE2: course.
const pc2 = 3600, pb2 = 3200, eb2 = 1100;
console.log("WE2 social benefit", money(pb2 + eb2), "private net", money(pb2 - pc2), "social net", money(pb2 + eb2 - pc2));
// Over-production table: each extra 100 tonnes of output of a fictional smelter.
const rows = [1, 2, 3, 4, 5].map((n) => ({ n, extraRev: 900, extraPC: [500, 600, 700, 850, 950][n - 1], extraEC: 250 }));
for (const r of rows) console.log(r.n, r.extraRev, r.extraPC, r.extraPC + r.extraEC, r.extraRev > r.extraPC, r.extraRev > r.extraPC + r.extraEC);
