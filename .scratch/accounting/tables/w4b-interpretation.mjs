import { ratios, d1, d2, table, r2 } from "./w4b-lib.mjs";
const Y = [
  { yr: "2024", rev: 150000, cos: 105000, exp: 27000, ca: 30000, inv: 14000, cl: 15000, oi: 13000 },
  { yr: "2025", rev: 180000, cos: 133200, exp: 30600, ca: 36800, inv: 22000, cl: 23000, oi: 14000 },
];
const R = Y.map((y) => { const gp = y.rev - y.cos, np = gp - y.exp; return { gp, np, gpm: d1(ratios.grossMargin(gp, y.rev)), mu: d1(ratios.markUp(gp, y.cos)), pm: d1(ratios.profitMargin(np, y.rev)), cr: d2(ratios.current(y.ca, y.cl)), at: d2(ratios.acidTest(y.ca, y.inv, y.cl)), it: d1(ratios.inventoryTurnover(y.cos, y.oi, y.inv)) }; });
console.log(table(["", "2024 US\$", "2025 US\$"], [["Revenue", 150000, 180000], ["Cost of sales", 105000, 133200], ["Gross profit", R[0].gp, R[1].gp], ["Expenses", 27000, 30600], ["Profit for the year", R[0].np, R[1].np], ["Inventory at 1 January", 13000, 14000], ["Inventory at 31 December", 14000, 22000], ["Current assets at 31 December", 30000, 36800], ["Current liabilities at 31 December", 15000, 23000]]));
console.log(table(["Ratio", "2024", "2025"], [["Gross profit margin", `${R[0].gpm}%`, `${R[1].gpm}%`], ["Mark-up", `${R[0].mu}%`, `${R[1].mu}%`], ["Profit margin (net profit percentage)", `${R[0].pm}%`, `${R[1].pm}%`], ["Current ratio", `${R[0].cr} : 1`, `${R[1].cr} : 1`], ["Acid test (quick) ratio", `${R[0].at} : 1`, `${R[1].at} : 1`], ["Rate of inventory turnover", `${R[0].it} times`, `${R[1].it} times`]]));
const items = [["Profit for the year", 12000], ["Add: Depreciation (an expense that uses no cash)", 2000], ["Less: Cash spent on a new van (capital expenditure)", -9000], ["Less: Drawings", -6000], ["Less: Increase in inventory", -2500], ["Less: Increase in trade receivables", -1500], ["Add: Increase in trade payables", 2000]];
const tot = items.reduce((s, x) => s + x[1], 0);
console.log(table(["Item", "US\$"], [...items, ["**Decrease in bank balance**", tot]]), tot);
