// Figures for lessons/unemployment/measurement.md (W2a).
import { unemploymentRate, pct, check } from "../lib.mjs";
// WE1: fictional Country X labour force survey (thousands).
const wap = 4800, employed = 2950, unemployed = 690;
const lf = employed + unemployed, inactive = wap - lf;
console.log({ lf, inactive, rate: pct(unemploymentRate({ unemployed, employed }), 1), participation: pct((lf / wap) * 100, 1), wrongBase: pct((unemployed / wap) * 100, 1) });
check("lf", lf, 3640);
// WE2: survey sample of 20 working-age people in a fictional town.
const cats = { fullTime: 7, partTime: 2, informal: 3, unemployedSeeking: 3, students: 2, homemaker: 1, retired: 1, discouraged: 1 };
const emp = cats.fullTime + cats.partTime + cats.informal, un = cats.unemployedSeeking;
const lf2 = emp + un;
console.log({ emp, un, lf2, rate: pct((un / lf2) * 100, 1), ifDiscouragedCounted: pct(((un + 1) / (lf2 + 1)) * 100, 1), total: Object.values(cats).reduce((a, b) => a + b, 0) });
