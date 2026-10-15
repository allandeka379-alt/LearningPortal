import { spearman, table, dpStr, per1000 } from "../lib.mjs";
export const SAFE = [92, 85, 78, 70, 61, 55, 40, 32];
export const CASES = [3, 6, 5, 14, 18, 21, 35, 41];
export const sp = spearman(SAFE, CASES);
if (process.argv[1]?.endsWith("w3b-disease-cholera.mjs")) {
  console.log(table(["District", "Safe water (%)", "Cases per 10 000", "Rank x", "Rank y", "d", "d²"], sp.rows.map((r, i) => [String.fromCharCode(65 + i), r.x, r.y, r.rx, r.ry, r.d, r.d2])));
  console.log("sumD2", sp.sumD2, "rs", sp.rs, "crit", sp.crit, sp.significant);
  console.log("cfr", (4300 / 98600) * 100, (4288/98592)*100);
}
