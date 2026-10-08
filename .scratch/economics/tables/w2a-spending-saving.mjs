// Tables for lessons/households/spending-saving.md (W2a).
import { table, pct, check } from "../lib.mjs";
// WE1: three fictional households, monthly disposable income and spending.
const hh = [["Household A", 300, 290], ["Household B", 900, 810], ["Household C", 2400, 1920]];
const rows = hh.map(([n, y, c]) => [n, y, c, y - c, pct(((y - c) / y) * 100, 1), pct((c / y) * 100, 1)]);
console.log(table(["Household", "Disposable income (US\\$)", "Spending (US\\$)", "Saving (US\\$)", "Saving as % of income", "Spending as % of income"], rows));
check("C save", 2400 - 1920, 480);
// WE2: loan interest at two rates: borrow US$1,500 for one year.
for (const r of [0.08, 0.16]) console.log(r, 1500 * r, 1500 * (1 + r));
// saving 200/month for a year at 6% simple on year-end balance? keep simple: deposit US$2,000 for one year.
for (const r of [0.03, 0.09]) console.log("save", r, 2000 * r);
