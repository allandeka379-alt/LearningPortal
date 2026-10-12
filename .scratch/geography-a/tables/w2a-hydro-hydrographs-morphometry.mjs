import { chk, rnd, table, spearman, bifurcationRatio, drainageDensity, mean, sum, dpStr } from "../lib.mjs";
const t = [0,1,2,3,4,5,6,7,8,9,10,11,12];
const rain = [0,4,12,18,6,2,0,0,0,0,0,0,0];
const rural = [2,2,2,3,4,6,8,10,9,7,5,3,2];
const urban = [2,2,3,9,20,26,19,12,7,4,3,2,2];
console.log(table(["Time (h)", "Rainfall (mm/h)", "Rural Q (m³/s)", "Urban Q (m³/s)"], t.map((x, i) => [x, rain[i], rural[i], urban[i]])));
console.log("total rain", sum(rain));
const pk = (a) => Math.max(...a);
console.log("rural peak", pk(rural), "at", rural.indexOf(pk(rural)), "lag", rural.indexOf(pk(rural)) - rain.indexOf(Math.max(...rain)));
console.log("urban peak", pk(urban), "at", urban.indexOf(pk(urban)), "lag", urban.indexOf(pk(urban)) - 3);
console.log("peak ratio", pk(urban) / pk(rural), "increase %", ((pk(urban) - pk(rural)) / pk(rural)) * 100);
const q = (a) => sum(a.map((x) => x - 2));
console.log("stormflow rural", q(rural), q(rural) * 3600, "urban", q(urban), q(urban) * 3600, "ratio", q(urban) / q(rural));
// morphometry
const N = [36, 9, 2, 1];
const rb = [0,1,2].map((i) => bifurcationRatio(N[i], N[i+1]));
console.log("Rb", rb, "mean", mean(rb), "streams", sum(N), "F", sum(N)/36, "Dd", drainageDensity(57.6, 36), "intensity", (sum(N)/36)/drainageDensity(57.6, 36));
// spearman
const rainS = [12, 25, 18, 40, 33, 8, 52, 21];
const pkS = [2.4, 5.1, 3.9, 6.8, 7.6, 1.8, 10.2, 3.5];
const sp = spearman(rainS, pkS);
console.log(table(["Storm", "Rainfall (mm)", "Peak discharge (m³/s)", "Rank x", "Rank y", "d", "d²"], sp.rows.map((r, i) => [i+1, r.x, r.y, r.rx, r.ry, r.d, r.d2])));
console.log("sumD2", sp.sumD2, "rs", sp.rs, "crit", sp.crit);
