// Tables for lessons/firms/smes-business-plan.md (W3a): a cash-flow projection with checked arithmetic.
import { table, check } from "../lib.mjs";
export function cashFlow({ months, opening, receipts, payments }) {
  // receipts / payments: [{ name, values: [...] }]; returns md and the computed rows.
  const n = months.length;
  const totR = months.map((_, i) => receipts.reduce((s, r) => s + r.values[i], 0));
  const totP = months.map((_, i) => payments.reduce((s, r) => s + r.values[i], 0));
  const net = months.map((_, i) => totR[i] - totP[i]);
  const open = [], close = [];
  let bal = opening;
  for (let i = 0; i < n; i++) { open.push(bal); bal += net[i]; close.push(bal); }
  for (let i = 1; i < n; i++) check(`open ${i}`, open[i], close[i - 1]);
  const rows = [
    ["Opening balance", ...open],
    ...receipts.map((r) => [r.name, ...r.values]),
    ["**Total receipts**", ...totR],
    ...payments.map((p) => [p.name, ...p.values]),
    ["**Total payments**", ...totP],
    ["**Net cash flow**", ...net],
    ["**Closing balance**", ...close],
  ];
  return { md: table(["(US\\$)", ...months], rows), open, close, net, totR, totP };
}
// Lesson worked example: Farai's fictional poultry start-up, first three months.
const cf = cashFlow({
  months: ["Month 1", "Month 2", "Month 3"],
  opening: 1500,
  receipts: [{ name: "Sales of broilers", values: [0, 1400, 1600] }, { name: "Loan from microfinance", values: [1000, 0, 0] }],
  payments: [{ name: "Chicks and feed", values: [900, 700, 750] }, { name: "Equipment", values: [1200, 0, 0] }, { name: "Rent of fowl run", values: [150, 150, 150] }, { name: "Loan repayment", values: [0, 120, 120] }],
});
console.log(cf.md);
console.log(cf.close);
// Lesson worked example 2: a projection that goes negative.
const cf2 = cashFlow({ months: ["April", "May", "June"], opening: 300, receipts: [{ name: "Catering sales", values: [800, 2000, 600] }], payments: [{ name: "Food and gas", values: [900, 600, 450] }, { name: "Wages", values: [500, 300, 250] }] });
console.log(cf2.md);
