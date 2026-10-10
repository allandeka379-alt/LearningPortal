// Checks the worked examples of lessons/data/histograms-cumulative.md.
import { chk, same, grouped } from "../lib.mjs";
// Ex1 homework times, 80 learners
const h = grouped([[0, 10, 8], [10, 20, 14], [20, 40, 30], [40, 60, 18], [60, 100, 10]]);
console.log("Ex1 fd", h.fd, "n", h.n);
// Ex2 bar height 2.4 over 15-20 -> 12
chk(2.4 * 5, 12);
// Ex4 cumulative: masses of 120 goats (kg)
const g = grouped([[10, 20, 9], [20, 30, 27], [30, 40, 42], [40, 50, 30], [50, 70, 12]]);
console.log("Ex4 cf", g.cf, "median", g.median, "q1", g.q1, "q3", g.q3, "iqr", g.q3 - g.q1, "below 25", g.interp ? null : 0);
// number below 25 kg: 9 + 27*(5/10)
console.log("below 25:", 9 + 27 * 0.5, "above 45:", 30 * 0.5 + 12, "pct above 45", (30 * 0.5 + 12) / 120 * 100);
// 90th percentile
console.log("P90", g.interp(0.9 * 120));
