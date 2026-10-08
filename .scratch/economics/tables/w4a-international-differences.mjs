// Figures for lessons/development/international-differences.md (W4a).
import { table, fmt, check } from "../lib.mjs";
// WE1: shares of total income received by each fifth (quintile) of households.
const X = [4, 8, 12, 20, 56], Y = [8, 13, 17, 22, 40];
check("X", X.reduce((a, b) => a + b), 100); check("Y", Y.reduce((a, b) => a + b), 100);
const names = ["Poorest 20%", "Second 20%", "Middle 20%", "Fourth 20%", "Richest 20%"];
console.log(table(["Group of households", "Country X (% of income)", "Country Y (% of income)"], names.map((n, i) => [n, X[i], Y[i]])));
console.log({ ratioX: X[4] / X[0], ratioY: Y[4] / Y[0], bottom40X: X[0] + X[1], bottom40Y: Y[0] + Y[1] });
// WE2: productivity by sector in fictional Country A.
const gdp = 10000, workers = 5.0; // US$ million, million workers
const agriW = 0.65 * workers, agriY = 0.2 * gdp, otherW = workers - agriW, otherY = gdp - agriY;
const pA = (agriY * 1e6) / (agriW * 1e6), pO = (otherY * 1e6) / (otherW * 1e6);
console.log(table(["Sector", "Workers (million)", "Output (US\\$ million)", "Output per worker (US\\$)"], [["Agriculture", fmt(agriW, 2), agriY, fmt(pA, 2)], ["Industry and services", fmt(otherW, 2), otherY, fmt(pO, 2)], ["Whole economy", fmt(workers, 2), gdp, fmt(gdp / workers, 2)]]));
console.log({ pA, pO, ratio: pO / pA });
