import { ratios, d1 } from "./w4b-lib.mjs";
console.log(d1(ratios.roce(12000, 80000)), d1(ratios.roce(12000, 80000 - 20000 + 65000)));
const gp = 41000, other = 22500;
for (const [life, allowPct] of [[5, 2], [6, 5]]) { const dep = (30000 - 0) / life, allow = 18000 * allowPct / 100; const np = gp - other - dep - allow; console.log(life, dep, allow, np, d1(ratios.profitMargin(np, 150000))); }
