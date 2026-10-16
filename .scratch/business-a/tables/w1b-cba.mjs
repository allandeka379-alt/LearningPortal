import { table, chk, r2 } from "../lib.mjs";
const yrs = 10;
const costs = [["Drilling and pump (once)", 18000], ["Maintenance (US\$900 a year for 10 years)", 900 * yrs], ["Loss of grazing land (once, social cost)", 6000]];
const bens = [["Household time saved (US\$4,200 a year for 10 years)", 4200 * yrs], ["Fewer cases of illness (US\$1,800 a year for 10 years)", 1800 * yrs]];
const tc = costs.reduce((a, x) => a + x[1], 0), tb = bens.reduce((a, x) => a + x[1], 0);
console.log(table(["Borehole project over 10 years", "US\$"], [["**Costs**", ""], ...costs, ["Total costs", tc], ["**Benefits**", ""], ...bens, ["Total benefits", tb], ["Net benefit (benefits − costs)", tb - tc]]));
console.log(tc, tb, tb - tc, tb / tc);
// project comparison
const P = { "Clinic": [95000, 140000], "Road": [120000, 150000] };
for (const [k, [c, b]] of Object.entries(P)) console.log(k, b - c, b / c);
