import { operations, table, r2, chk } from "../lib.mjs";
const cap = 2000, demand = 2600, extra = demand - cap;
const util = operations.capacityUtilisation(demand, cap);
console.log(extra, util);
const price = 1.2;
const opts = [
  ["Overtime for current staff", r2(extra * (0.30 * 1.5 + 0.30))],
  ["Hire temporary staff for the peak", r2(extra * (0.30 + 0.30) + 120)],
  ["Buy bread from a partner bakery", r2(extra * 0.85)],
];
const rows = opts.map(([n, c]) => [n, extra, c, r2(extra * price - c), r2(c / extra)]);
console.log(table(["Option", "Extra loaves", "Extra cost (US\$)", "Extra profit (US\$)", "Cost per loaf (US\$)"], rows.map(r=>[r[0],String(r[1]),r[2].toFixed(2),r[3].toFixed(2),r[4].toFixed(2)])));
