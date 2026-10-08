// Figures for lessons/fiscal/taxation.md (W3b).
import { table, tax, check, fmt, pct } from "../lib.mjs";
const bands = [[300, 0], [1000, 20], [Infinity, 30]];
const rows = [800, 2000].map((y) => { const t = tax.banded(y, bands); return [y, t, fmt(tax.averageRate(t, y), 1)]; });
check("t800", tax.banded(800, bands), 100); check("t2000", tax.banded(2000, bands), 440);
console.log(table(["Monthly income (US\\$)", "Tax paid (US\\$)", "Average tax rate (%)"], rows));
// WE2: the same tax on cooking oil for two households.
const t = 6; const inc = [200, 1200];
console.log(table(["Household", "Monthly income (US\\$)", "Tax paid on cooking oil (US\\$)", "Tax as % of income"], [["Chipo's household", inc[0], t, fmt(tax.averageRate(t, inc[0]), 1)], ["Farai's household", inc[1], t, fmt(tax.averageRate(t, inc[1]), 1)]]));
// Proportional 10%.
console.log([200, 1200].map((y) => [y, y * 0.1, pct(10, 0)]));
