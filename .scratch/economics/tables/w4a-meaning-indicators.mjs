// Figures for lessons/development/meaning-indicators.md (W4a).
import { table, nationalIncome, pctChange, fmt, check } from "../lib.mjs";
// WE1: two fictional countries.
const A = { gdp: 27300, pop: 6.5, le: 58, sch: 5.1, hdi: 0.561 };
const B = { gdp: 31200, pop: 13.0, le: 71, sch: 9.4, hdi: 0.684 };
const phA = nationalIncome.perHead(A.gdp, A.pop), phB = nationalIncome.perHead(B.gdp, B.pop);
check("phA", phA, 4200); check("phB", phB, 2400);
console.log(table(["", "Real GDP (US\\$ million)", "Population (million)", "Life expectancy (years)", "Mean years of schooling", "HDI"], [
  ["Country A", A.gdp, fmt(A.pop, 1), A.le, fmt(A.sch, 1), fmt(A.hdi, 3)],
  ["Country B", B.gdp, fmt(B.pop, 1), B.le, fmt(B.sch, 1), fmt(B.hdi, 3)],
]));
console.log({ phA, phB, ratio: phA / phB });
// WE2: Country X over ten years.
const x0 = { ph: 1800, le: 61, lit: 82, water: 64 }, x1 = { ph: 2340, le: 60, lit: 81, water: 61 };
console.log(table(["Indicator", "2016", "2026"], [["Real GDP per head (US\\$)", x0.ph, x1.ph], ["Life expectancy (years)", x0.le, x1.le], ["Adult literacy rate (%)", x0.lit, x1.lit], ["Households with safe water (%)", x0.water, x1.water]]));
console.log({ phG: pctChange(x0.ph, x1.ph) });
