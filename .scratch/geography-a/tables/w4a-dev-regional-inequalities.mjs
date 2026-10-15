import { gini, mean, spearman, dpStr } from "../lib.mjs";
const inc = [1800, 1200, 900, 700, 500, 400];
console.log("mean", mean(inc), "ratio", 1800 / 400, "gini", dpStr(gini(inc), 3), "pct above mean", inc.filter((x) => x > mean(inc)).length);
const water = [92, 81, 70, 64, 48, 41];
const sp = spearman(inc, water);
console.log("sp", sp.rs, sp.sumD2);
// slice sets
const inc2 = [2400, 1500, 1100, 800, 600, 300];
console.log("slice mean", mean(inc2), "gini", dpStr(gini(inc2), 3), 2400 / 300, (2400 - 300) / mean(inc2));
const x = [80, 65, 58, 50, 35, 22], y = [88, 72, 75, 55, 40, 30];
const s2 = spearman(x, y);
console.log(s2.rows.map((r) => [r.rx, r.ry, r.d, r.d2].join(",")).join(" | "), s2.sumD2, s2.rs, s2.crit);
