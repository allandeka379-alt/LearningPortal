import { chk, fmt, table, tax, round } from "../lib.mjs";
const bands = [[4000, 0], [12000, 20], [Infinity, 35]];
const people = [["Household A", 3600], ["Household B", 10000], ["Household C", 30000]];
const rows = people.map(([n, y]) => { const t = tax.banded(y, bands); return [n, y, t, tax.averageRate(t, y), y - t]; });
console.log(table(["Household", "Gross income (US\$)", "Income tax (US\$)", "Average tax rate (%)", "Disposable income (US\$)"], rows.map(r => [r[0], r[1], r[2], fmt(round(r[3],1),1), r[4]])));
console.log("ratio gross", 30000/3600, "net", rows[2][4]/rows[0][4], "net with transfer", rows[2][4]/(rows[0][4]+600));
// marginal rates
console.log("marg tax on 1000 extra for C", 1000*.35);
// quintiles
const q = [4, 9, 14, 22, 51]; console.log(q.reduce((a,b)=>a+b,0), 51/4);
const qa = [6, 11, 16, 23, 44]; console.log(qa.reduce((a,b)=>a+b,0), 44/6);
// inheritance
console.log((600000-100000)*.2);
// wealth vs income: saving 2000 a year for 10 years at 0 interest
