import { chk, fmt, table, nationalIncome, nationalAccounts, round } from "../lib.mjs";
const gdp = nationalIncome.expenditure({ c: 6400, i: 1900, g: 2100, x: 2600, m: 2900 }); console.log("GDP", gdp);
const na = nationalAccounts({ gdpMarket: gdp, taxesOnProducts: 1100, subsidiesOnProducts: 200, netPrimaryIncome: -350, depreciation: 900 });
console.log(na, "per head", gdp/5, na.nni/5);
console.log(table(["Item", "US\$ million"], [["Consumption (C)", 6400], ["Investment (I)", 1900], ["Government spending (G)", 2100], ["Exports (X)", 2600], ["Imports (M)", 2900], ["**GDP at market prices**", `**${fmt(gdp)}**`]]));
// value added
const va = [["Farmer (grain)", 40, 0], ["Miller (flour)", 70, 40], ["Baker (bread sold to consumers)", 120, 70]];
console.log(table(["Stage", "Value of sales (US\$)", "Cost of inputs bought (US\$)", "Value added (US\$)"], va.map(([n,s,i])=>[n,s,i,s-i])), va.reduce((a,x)=>a+x[1]-x[2],0));
// income approach
const inc = [["Wages and salaries", 5300], ["Rent", 700], ["Interest", 600], ["Profits and mixed income", 2400]];
console.log(inc.reduce((a,x)=>a+x[1],0));
