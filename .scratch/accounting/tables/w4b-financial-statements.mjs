import { incomeStatement, financialPosition, statementOfAffairs, receivablesAccount, payablesAccount, r2, sum, check, TERMS } from "./w4b-lib.mjs";
import { statement } from "../lib.mjs";
// Ex1: inventory lost
const rev = 48000, mu = 25, oi = 5200, pu = 37900, counted = 3950;
const cos = r2(rev * 100 / (100 + mu));
const ci = r2(oi + pu - cos);
const lost = r2(ci - counted);
console.log({ cos, gp: rev - cos, ci, lost });
console.log(statement("Calculation of closing inventory", [["Revenue", null, rev], ["Less: Gross profit (25/125 × 48,000)", null, -(rev - cos)], ["Cost of sales", null, cos], null, ["Opening inventory", null, oi], ["Add: Purchases", null, pu], ["Goods available for sale", null, oi + pu], ["Less: Cost of sales", null, -cos], ["Closing inventory that should be held", null, ci], ["Less: Inventory actually counted", null, -counted], ["**Inventory lost**", null, lost]], { checks: [["cos", cos, rev - (rev - cos)], ["ci", ci, oi + pu - cos], ["lost", lost, ci - counted]] }));
// Ex2
const soa = statementOfAffairs({ name: "Nyasha's Grocery", date: "1 January 2025", nca: [["Shop equipment", 8000]], ca: [["Inventory", 6300], ["Trade receivables", 2150], ["Bank", 1970]], cl: [["Trade payables", 3480]] });
const bank = r2(1970 + 53600 + 14800 - 48900 - 7200 - 3600 - 1850 - 6000 - 2000);
const ra = receivablesAccount({ opening: 2150, receipts: 53600, closing: 2640 });
const pa = payablesAccount({ opening: 3480, payments: 48900, closing: 3910 });
const is = incomeStatement({ name: "Nyasha's Grocery", terms: TERMS.BOTH, revenue: r2(ra.creditSales + 14800), openInv: 6300, cos: [["Purchases", pa.creditPurchases]], closeInv: 7150, otherIncome: [], expenses: [["Wages", 7200], ["Rent (3,600 − 300)", 3300], ["General expenses (1,850 + 140)", 1990], ["Depreciation: shop equipment", 1000]] });
const fp = financialPosition({ name: "Nyasha's Grocery", terms: TERMS.BOTH, nca: [["Shop equipment", 10000, 1000]], ca: [["Inventory", 7150], ["Trade receivables", 2640], ["Other receivables (rent prepaid)", 300], ["Bank", bank]], cl: [["Trade payables", 3910], ["Other payables (expenses owing)", 140]], openCap: soa.capital, profit: is.np, drawings: 6000 });
console.log(soa.md, "\n", { bank, cs: ra.creditSales, cp: pa.creditPurchases, cap: soa.capital, np: is.np, gp: is.gp, cosv: is.cos }, "\n", is.md, "\n\n", fp.md);
