// Figures for lessons/unemployment/types.md (W2a).
import { table, unemploymentRate, check } from "../lib.mjs";
// WE1: a fictional farming district, labour force 200 thousand, unemployment by type per quarter (thousands).
const lf = 200, q = ["January-March", "April-June", "July-September", "October-December"];
const fr = [6, 6, 6, 6], st = [14, 14, 14, 14], se = [4, 2, 15, 9];
const tot = q.map((_, i) => fr[i] + st[i] + se[i]);
const rate = tot.map((u) => unemploymentRate({ unemployed: u, labourForce: lf }));
console.log(table(["Quarter", "Frictional", "Structural", "Seasonal", "Total unemployed", "Unemployment rate (%)"], q.map((x, i) => [x, fr[i], st[i], se[i], tot[i], rate[i].toFixed(1)])));
check("q3", rate[2], 17.5);
console.log({ tot, rate, seasonalShareQ3: (se[2] / tot[2]) * 100, nonSeasonalRate: ((fr[0] + st[0]) / lf) * 100 });
