import { titre, meanTitre, pctError, pctErrorDifference, sfStr, dpStr, table, chk, molesFromSolution, concFrom, heatQ, mean, linearFit } from "../lib.mjs";
// Example 1: titration table
const runs = [["rough", 0.00, 24.60], ["1", 0.50, 24.65], ["2", 1.20, 25.25], ["3", 0.10, 24.20]];
const titres = runs.map(([, a, b]) => titre(a, b));
console.log(table(["Titration", "rough", "1", "2", "3"], [
  ["final burette reading / cm³", ...runs.map(r => r[2].toFixed(2))],
  ["initial burette reading / cm³", ...runs.map(r => r[1].toFixed(2))],
  ["titre / cm³", ...titres.map(x => x.toFixed(2))],
]));
const { mean: mt, used } = meanTitre(titres.slice(1));
console.log("concordant", used, "mean", mt, dpStr(mt, 2));
console.log("pct unc mean titre (0.10/mt)", pctErrorDifference(0.05, mt), sfStr(pctErrorDifference(0.05, mt), 2));
// moles NaOH 0.100 conc, 25.0 cm3 acid
const nNaOH = molesFromSolution(mt, 0.100);
console.log("n NaOH", nNaOH, "conc HCl if 25.0 pipette", concFrom(nNaOH, 25.0), sfStr(concFrom(nNaOH, 25.0), 3));
// Example 2: temperature change uncertainty
const T1 = 21.5, T2 = 29.0; const dT = T2 - T1;
console.log("dT", dT, "pct", pctErrorDifference(0.5, dT));
const T1b = 21.4, T2b = 28.9; console.log("dT 0.1 thermometer", (T2b - T1b), pctErrorDifference(0.05, T2b - T1b));
// mass by difference
const m1 = 12.47, m2 = 10.93; console.log("mass", m1 - m2, pctErrorDifference(0.005, m1 - m2));
// pipette 25.0 +-0.06
console.log("pipette", pctError(0.06, 25.0));
// Example 3: gravimetric heating to constant mass
const crucible = 18.62; const before = 21.08; const heat = [20.41, 20.19, 20.17];
console.log("hydrated", before - crucible, "anhydrous", heat[2] - crucible, "water lost", before - heat[2]);
// sf rule
console.log("sf example", 0.0950*24.15/1000);
