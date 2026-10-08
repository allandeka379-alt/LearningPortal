// Figures for lessons/growth/recession-policies.md (W4a).
import { table, pctChange, fmt, check } from "../lib.mjs";
// WE1: quarterly real GDP in fictional Country Z (US$ million, constant prices).
const q = [["2025 Q1", 5000], ["2025 Q2", 5050], ["2025 Q3", 4990], ["2025 Q4", 4940], ["2026 Q1", 4960]];
const rows = q.map(([n, v], i) => [n, v, i === 0 ? "–" : `${pctChange(q[i - 1][1], v) > 0 ? "+" : "−"}${fmt(Math.abs(pctChange(q[i - 1][1], v)), 2)}%`]);
console.log(table(["Quarter", "Real GDP (US\\$ million)", "Change on previous quarter"], rows));
// WE2: tax revenue in a recession: tax = 22% of GDP; GDP falls 3% from 18,000; spending on benefits rises from 900 to 1,050.
const gdp0 = 18000, gdp1 = gdp0 * 0.97, t0 = 0.22 * gdp0, t1 = 0.22 * gdp1;
console.log({ gdp1, t0, t1, fall: t0 - t1, spendRise: 1050 - 900, worsen: t0 - t1 + 150 });
check("t0", t0, 3960);
