import { spearman, chiSquaredTable, discharge, mean, table } from "../lib.mjs";
export const DIST = [1, 3, 5, 8, 11, 15, 20, 26];
export const W = [1.8, 2.6, 3.1, 4.4, 5.0, 6.9, 7.4, 9.6];
export const DEP = [0.12, 0.15, 0.21, 0.24, 0.31, 0.33, 0.42, 0.45];
export const VEL = [0.31, 0.38, 0.36, 0.52, 0.55, 0.50, 0.66, 0.72];
export const Q = DIST.map((_, i) => discharge(W[i], DEP[i], VEL[i]));
export const sp = spearman(DIST, VEL);
export const OBS = [[48, 12], [30, 30]];
export const cs = chiSquaredTable(OBS);
if (process.argv[1]?.endsWith("w3b-exam-p3.mjs")) {
  console.log(Q.map((q) => q.toFixed(4)), mean(VEL));
  console.log(sp.rows.map((r)=>[r.rx,r.ry,r.d,r.d2].join(",")).join(" | "), sp.sumD2, sp.rs, sp.crit);
  console.log(cs.expected, cs.chi2, cs.df, cs.crit, cs.cells.map(c=>c.term));
}
