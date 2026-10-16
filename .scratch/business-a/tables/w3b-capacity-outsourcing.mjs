import { table, chk, r2, operations, costing } from "../lib.mjs";
const max = 10000, fixed = 24000, vc = 3;
const rows = [4000, 6000, 8000, 10000].map((q) => { const u = operations.capacityUtilisation(q, max), fpu = fixed / q, tot = costing.totalCost(fixed, vc, q) / q; return [q, u.toFixed(0) + "%", r2(fpu).toFixed(2), r2(tot).toFixed(2)]; });
console.log(table(["Output a month (units)", "Capacity used", "Fixed cost per unit (US\$)", "Total cost per unit (US\$)"], rows));
console.log(operations.spareCapacity(6000, max));
const inh = 1.7, out = 1.6, q = 5000; console.log((inh - out) * q);
