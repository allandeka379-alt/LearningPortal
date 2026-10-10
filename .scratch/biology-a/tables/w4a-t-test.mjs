// Lesson tables for evolution/t-test.
import { tTest, tCrit, mean, sd, sum, table, dpStr, sfStr } from "../lib.mjs";
function show(nameA, a, nameB, b, unit) {
  const r = tTest(a, b);
  for (const [n, x] of [[nameA, a], [nameB, b]]) {
    const m = mean(x);
    console.log(table(["x / " + unit, "x − x̄", "(x − x̄)²"], x.map((v) => [v, dpStr(v - m, 2), dpStr((v - m) ** 2, 2)])));
    console.log(n, "n", x.length, "sum", sum(x), "mean", m, "sumsq", sum(x.map((v) => (v - m) ** 2)), "sd", sd(x), "s2/n", sd(x) ** 2 / x.length);
  }
  console.log("t", r.t, "df", r.df, "crit", r.crit, "sig", r.significant, "p", r.p);
}
show("waterhole", [42, 38, 45, 40, 36, 41, 39, 43], "far", [51, 47, 55, 49, 53, 46, 50, 52], "mm");
show("dam A", [212, 236, 198, 225, 240, 219], "dam B", [228, 205, 247, 231, 214, 239], "g");
console.log("t crit table", [4, 6, 8, 10, 12, 14, 16, 18, 20].map((v) => [v, tCrit(v), tCrit(v, 0.01)]));
