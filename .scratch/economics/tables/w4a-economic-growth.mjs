// Figures for lessons/growth/economic-growth.md (W4a).
import { table, prices, pctChange, nationalIncome, fmt, check } from "../lib.mjs";
// WE1: nominal vs real GDP, Country X (US$ million).
const n0 = 48000, n1 = 54000, i0 = 100, i1 = 110;
const real1 = prices.realValue(n1, i1);
console.log(table(["Year", "Nominal GDP (US\\$ million)", "Price index (2025 = 100)", "Real GDP in 2025 prices (US\\$ million)"], [["2025", n0, i0, n0], ["2026", n1, i1, fmt(real1, 1)]]));
console.log({ real1, nominalG: pctChange(n0, n1), realG: pctChange(n0, real1) });
// WE2: real GDP per head.
const g0 = 20000, g1 = 20600, p0 = 16.0, p1 = 16.5;
const h0 = nationalIncome.perHead(g0, p0), h1 = nationalIncome.perHead(g1, p1);
console.log(table(["Year", "Real GDP (US\\$ million)", "Population (million)", "Real GDP per head (US\\$)"], [["2025", g0, fmt(p0, 1), fmt(h0, 2)], ["2026", g1, fmt(p1, 1), fmt(h1, 2)]]));
console.log({ h0, h1, gG: pctChange(g0, g1), popG: pctChange(p0, p1), phG: pctChange(h0, h1) });
check("h0", h0, 1250);
