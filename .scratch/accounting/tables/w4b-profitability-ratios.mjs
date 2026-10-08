import { incomeStatement, ratios, d1, r2, TERMS } from "./w4b-lib.mjs";
const is = incomeStatement({ name: "Tendai's Hardware", terms: TERMS.BOTH, revenue: 120000, openInv: 9000, cos: [["Purchases", 86500]], closeInv: 11500, otherIncome: [["Rent received", 1200]], expenses: [["Wages", 13800], ["Rent and rates", 4500], ["Electricity", 1900], ["Depreciation", 2600]] });
console.log(is.md, "\n", { gp: is.gp, cos: is.cos, np: is.np, gpm: d1(ratios.grossMargin(is.gp, 120000)), mu: d1(ratios.markUp(is.gp, is.cos)), pm: d1(ratios.profitMargin(is.np, 120000)) });
// Ex2 ROCE
const shares = 80000, res = 25000, ncl = 15000, profit = 16200, interest = 1800;
console.log({ ce: shares + res + ncl, pbi: profit + interest, roce: d1(ratios.roce(profit + interest, shares + res + ncl)) });
// two-year comparison sole trader
const y1 = { rev: 95000, gp: 28500, np: 9500 }, y2 = { rev: 110000, gp: 30800, np: 8800 };
for (const y of [y1, y2]) console.log(d1(ratios.grossMargin(y.gp, y.rev)), d1(ratios.markUp(y.gp, y.rev - y.gp)), d1(ratios.profitMargin(y.np, y.rev)));
