import { table, chk, r2, operations } from "../lib.mjs";
const D = 4000, S = 50, H = 2.5;
const e = operations.eoq(D, S, H); chk(e, 400, 1e-9);
const rows = [200, 300, 400, 500, 800].map((q) => { const o = (D / q) * S, h = (q / 2) * H, t = operations.annualInventoryCost(D, S, H, q); chk(t, o + h, 1e-9); return [q, r2(D / q), r2(o), r2(h), r2(t)]; });
console.log(table(["Order size (units)", "Orders a year", "Ordering cost (US\$)", "Holding cost (US\$)", "Total cost (US\$)"], rows));
// jit example
const avgBefore = 40000, avgAfter = 8000, rate = 10; const sv = (avgBefore - avgAfter) * rate / 100; chk(sv, 3200);
console.log(sv, sv - 1500, 2 * 1200);
