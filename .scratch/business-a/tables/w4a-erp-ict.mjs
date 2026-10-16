import { table, r2, invest, chk } from "../lib.mjs";
const stockCut = (60000 - 45000) * 0.2;
const rows = [
  ["Lower stock held: (60,000 - 45,000) x 20% holding cost", stockCut],
  ["Fewer stock-outs: lost profit avoided", 5400],
  ["Admin time saved: 1,500 hours x US\$3.00", 1500 * 3],
  ["Fewer invoice and costing errors", 2700],
];
const total = rows.reduce((s, r) => s + r[1], 0);
console.log(table(["Annual benefit", "US\$"], [...rows, ["**Total annual benefit**", total], ["Less annual support fee", -4000], ["**Net annual benefit**", total - 4000]]));
const outlay = 24000 + 6000;
console.log(outlay, total - 4000, outlay / (total - 4000), invest.payback(outlay, [total - 4000, total - 4000, total - 4000, total - 4000]));
