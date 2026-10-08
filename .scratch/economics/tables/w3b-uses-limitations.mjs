// Figures for lessons/national-income/uses-limitations.md (W3b).
import { table, nationalIncome, prices, pctChange, check, fmt, pct } from "../lib.mjs";
// WE1: nominal vs real GDP.
const n0 = 6000, n1 = 7200, i0 = 100, i1 = 115;
const real1 = prices.realValue(n1, i1);
console.log({ nominalGrowth: pct(pctChange(n0, n1), 1), real1: fmt(real1, 1), realGrowth: pct(pctChange(n0, real1), 1) });
console.log(table(["Year", "Nominal GDP (US\\$ million)", "Price index (base year = 100)", "Real GDP (US\\$ million, base-year prices)"], [["Base year", n0, i0, n0], ["Next year", n1, i1, fmt(real1, 1)]]));
// WE2: GDP per head of two fictional countries.
const A = { gdp: 18000, pop: 12 }, B = { gdp: 24000, pop: 20 };
const phA = nationalIncome.perHead(A.gdp, A.pop), phB = nationalIncome.perHead(B.gdp, B.pop);
check("phA", phA, 1500); check("phB", phB, 1200);
console.log(table(["Country", "GDP (US\\$ million)", "Population (million)", "GDP per head (US\\$)"], [["Country P", A.gdp, A.pop, phA], ["Country Q", B.gdp, B.pop, phB]]));
// Next year: P's GDP +3%, population +4%.
const gdpN = A.gdp * 1.03, popN = A.pop * 1.04, phN = gdpN / popN;
console.log({ gdpN, popN, phN: fmt(phN, 2), change: pct(pctChange(phA, phN), 1) });
