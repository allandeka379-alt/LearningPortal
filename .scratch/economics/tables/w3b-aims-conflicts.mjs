// Figures for lessons/macro/aims-conflicts.md (W3b).
import { table, unemploymentRate, prices, pctChange, check, fmt, pct } from "../lib.mjs";
// WE1: Country X performance against targets.
const realGdp = [42000, 43260, 45855.6];
const g1 = pctChange(realGdp[0], realGdp[1]), g2 = pctChange(realGdp[1], realGdp[2]);
const cpi = [100, 104, 111.28];
const inf1 = prices.inflationRate(cpi[0], cpi[1]), inf2 = prices.inflationRate(cpi[1], cpi[2]);
const u = [unemploymentRate({ unemployed: 630, labourForce: 7000 }), unemploymentRate({ unemployed: 504, labourForce: 7200 })];
console.log({ g1: pct(g1, 1), g2: pct(g2, 1), inf1: pct(inf1, 1), inf2: pct(inf2, 1), u });
check("g1", g1, 3); check("g2", g2, 6); check("inf1", inf1, 4); check("inf2", inf2, 7);
console.log(table(["Indicator", "Target", "2025", "2026"], [["Real GDP growth (%)", "4.0", fmt(g1, 1), fmt(g2, 1)], ["Inflation (%)", "5.0 or less", fmt(inf1, 1), fmt(inf2, 1)], ["Unemployment rate (%)", "Below 8.0", fmt(u[0], 1), fmt(u[1], 1)], ["Current account balance (% of GDP)", "Deficit no larger than 3.0", "−2.1", "−4.6"]]));
