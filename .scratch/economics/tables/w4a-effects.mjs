// Figures for lessons/population/effects.md (W4a).
import { table, dependencyRatio, fmt, check } from "../lib.mjs";
// WE1: optimum population (fixed land and technology).
const pop = [2, 4, 6, 8, 10], out = [3000, 7200, 12000, 14400, 15000];
const ph = pop.map((p, i) => out[i] / p);
console.log(table(["Population (million)", "Total output (US\\$ million)", "Output per head (US\\$)"], pop.map((p, i) => [p, out[i], ph[i]])));
console.log({ ph });
check("max", Math.max(...ph), 2000);
// WE2: dependency ratio.
const young = 6.3, work = 8.4, old = 0.42;
const dr = dependencyRatio(young + old, work);
console.log({ dependants: young + old, dr, youth: dependencyRatio(young, work), oldAge: dependencyRatio(old, work) });
check("dr", dr, 80);
