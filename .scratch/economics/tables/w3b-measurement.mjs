// Figures for lessons/national-income/measurement.md (W3b).
import { table, nationalIncome, check, fmt } from "../lib.mjs";
// WE1: expenditure method, Country X (US$ million).
const e = { c: 5400, i: 1250, g: 1600, x: 1900, m: 2150 };
const gdp = nationalIncome.expenditure(e);
const nfia = -320, gnp = nationalIncome.gnp(gdp, nfia), popn = 16;
check("gdp", gdp, 8000); check("gnp", gnp, 7680);
console.log(table(["Component", "US\\$ million"], [["Consumption (C)", e.c], ["Investment (I)", e.i], ["Government spending (G)", e.g], ["Exports (X)", e.x], ["Imports (M)", e.m]]));
console.log({ gdp, gnp, perHead: nationalIncome.perHead(gdp, popn), netX: e.x - e.m });
// WE2: value added in a cotton-to-shirt chain (US$ thousand).
const stages = [["Cotton farmer (seed cotton)", 0, 300], ["Ginnery (cotton lint)", 300, 450], ["Clothing factory (shirts)", 450, 900], ["Retailer (shirts sold to households)", 900, 1200]];
const va = stages.map(([, i, o]) => o - i);
const sumSales = stages.reduce((s, x) => s + x[2], 0), sumVa = va.reduce((s, x) => s + x, 0);
check("va = final", sumVa, 1200);
console.log(table(["Stage", "Inputs bought (US\\$ thousand)", "Value of sales (US\\$ thousand)", "Value added (US\\$ thousand)"], [...stages.map((s, k) => [s[0], s[1], s[2], va[k]]), ["**Total**", "", `**${fmt(sumSales)}**`, `**${fmt(sumVa)}**`]]));
console.log({ sumSales, sumVa, doubleCount: sumSales - sumVa });
// Income method (US$ million).
const inc = { wages: 3900, rent: 450, interest: 550, profit: 1600 }, pensions = 300;
const ni = inc.wages + inc.rent + inc.interest + inc.profit;
console.log(table(["Factor income", "US\\$ million"], [["Wages and salaries", inc.wages], ["Rent", inc.rent], ["Interest", inc.interest], ["Profits", inc.profit], ["State pensions (transfer payment)", pensions]]));
console.log({ ni, wrong: ni + pensions });
