import { table, chk, r2, costing } from "../lib.mjs";
const L = { fixed: 1500, vc: 0.4 }, C = { fixed: 6000, vc: 0.1 };
const outs = [5000, 10000, 15000, 20000, 30000];
const rows = outs.map((q) => { const tl = costing.totalCost(L.fixed, L.vc, q), tc = costing.totalCost(C.fixed, C.vc, q); return [q, tl, r2(tl / q).toFixed(3), tc, r2(tc / q).toFixed(3)]; });
console.log(table(["Bricks a month", "Labour-intensive total cost (US\$)", "Per brick (US\$)", "Capital-intensive total cost (US\$)", "Per brick (US\$)"], rows));
const q = (C.fixed - L.fixed) / (L.vc - C.vc); chk(q, 15000);
