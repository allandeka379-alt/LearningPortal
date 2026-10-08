// Figures for lessons/inflation/meaning-causes.md (W3b).
import { table, prices, check, fmt, pct } from "../lib.mjs";
// WE1: cost of a basket over three years.
const cost = [250, 270, 283.5];
const r1 = prices.inflationRate(cost[0], cost[1]), r2 = prices.inflationRate(cost[1], cost[2]);
check("r1", r1, 8); check("r2", r2, 5);
console.log(table(["Year", "Cost of the basket (US\\$)", "Rate of inflation (%)"], [["2024", fmt(cost[0], 2), "–"], ["2025", fmt(cost[1], 2), fmt(r1, 1)], ["2026", fmt(cost[2], 2), fmt(r2, 1)]]));
// WE2 table: two fictional economies.
console.log(table(["Indicator (change over the year)", "Economy P", "Economy Q"], [["Consumer spending", "+9%", "+1%"], ["Real GDP", "+5%", "−2%"], ["Unemployment rate", "6% → 4%", "6% → 8%"], ["World price of fuel", "unchanged", "+40%"], ["Inflation rate", "3% → 9%", "3% → 9%"]]));
