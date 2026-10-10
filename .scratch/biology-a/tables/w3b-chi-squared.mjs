// Lesson tables for inheritance/chi-squared (worked chi-squared tests).
import { chiSquared, expectedFromRatio, dpStr, chiCrit, table } from "../lib.mjs";
function show(labels, obs, ratio) {
  const exp = expectedFromRatio(obs.reduce((s, x) => s + x, 0), ratio);
  const r = chiSquared(obs, exp);
  console.log(table(["Phenotype", "O", "E", "O − E", "(O − E)²", "(O − E)²/E"], r.rows.map((x, i) => [labels[i], x.o, dpStr(x.e, 2), dpStr(x.diff, 2), dpStr(x.diff2, 2), dpStr(x.term, 3)])));
  console.log("chi2", r.chi2, "df", r.df, "crit", r.crit, "sig", r.significant);
}
show(["Tall", "Dwarf"], [281, 79], [3, 1]);
show(["Purple smooth", "Purple wrinkled", "Yellow smooth", "Yellow wrinkled"], [301, 112, 86, 41], [9, 3, 3, 1]);
console.log("crit table", [1, 2, 3, 4, 5].map((v) => [v, chiCrit(v), chiCrit(v, 0.01)]));
show(["Grey long", "Black vestigial", "Grey vestigial", "Black long"], [152, 146, 52, 50], [1, 1, 1, 1]);
