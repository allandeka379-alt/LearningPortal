import { chk, same, mdTable } from "../lib.mjs";
import { needs } from "./w3a-q.mjs";

export const usd = (x) => `US\\$${Number.isInteger(x) ? x.toLocaleString("en-US") : x.toFixed(2)}`;
// An online shop selling phone covers.
export const price = 8;
export const varCost = 3;
export const fixed = 300;
export const contribution = price - varCost;
export const breakEven = fixed / contribution;
chk(breakEven, 60);
export const profitAt = (u) => u * contribution - fixed;
export const rowsUnits = [0, 30, 60, 90].map((u) => ({ u, revenue: u * price, varTotal: u * varCost, fixed, profit: profitAt(u) }));
same(rowsUnits.map((r) => r.profit), [-300, -150, 0, 150]);
export const profitMd = mdTable(["Units sold", "Revenue", "Variable costs", "Fixed costs", "Profit or loss"], rowsUnits.map((r) => [r.u, usd(r.revenue), usd(r.varTotal), usd(r.fixed), r.profit < 0 ? `−${usd(-r.profit)}` : usd(r.profit)]));

// Cash flow for three months
export const months = [
  { m: "January", open: 200, in: 400, out: 450 },
  { m: "February", in: 700, out: 520 },
  { m: "March", in: 500, out: 640 },
];
let cash = 200;
export const cashRows = months.map((x) => {
  const open = cash;
  cash = open + x.in - x.out;
  return { m: x.m, open, in: x.in, out: x.out, net: x.in - x.out, close: cash };
});
same(cashRows.map((r) => r.close), [150, 330, 190]);
export const cashMd = mdTable(["Month", "Opening cash", "Cash in", "Cash out", "Net cash flow", "Closing cash"], cashRows.map((r) => [r.m, usd(r.open), usd(r.in), usd(r.out), r.net < 0 ? `−${usd(-r.net)}` : usd(r.net), usd(r.close)]));

// Mobile money fee: 1.5% of the amount, rounded to the nearest cent.
export const fee = (amt) => Math.round(amt * 1.5) / 100;
chk(fee(24), 0.36);
chk(fee(80), 1.2);

if (process.argv[1]?.endsWith("w3a-e-business.mjs")) {
  console.log(profitMd);
  console.log(cashMd);
  needs("enterprise/e-business", [profitMd, cashMd, "60 units", "US\\$0.36"]);
  console.log("lesson values OK");
}
