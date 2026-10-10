// Checks the worked examples of lessons/data/location-spread.md.
import { chk, same, mean, median, modes, quartiles, freqStats, grouped, expand } from "../lib.mjs";
// Ex1 raw: daily sales of airtime vouchers (US$)
const r = [14, 9, 22, 17, 9, 31, 12, 19, 9, 26, 15];
console.log("Ex1 mean", mean(r), "median", median(r), "modes", modes(r), "q", quartiles(r), "range", Math.max(...r) - Math.min(...r));
// Ex2 frequency table: children per household
const ft = [[0, 7], [1, 12], [2, 18], [3, 9], [4, 3], [5, 1]];
const fs = freqStats(ft); const ex = expand(ft);
console.log("Ex2 n", fs.n, "mean", fs.mean, "median", median(ex), "q", quartiles(ex));
// Ex3 grouped: masses of 50 broiler chickens (kg)
const g = grouped([[1.2, 1.6, 6], [1.6, 2.0, 14], [2.0, 2.4, 17], [2.4, 2.8, 9], [2.8, 3.2, 4]]);
console.log("Ex3 n", g.n, "mean", g.mean, "sumfx", g.sumfx, "median", g.median, "cf", g.cf);
// Ex4 salaries with outlier
const s = [420, 450, 460, 480, 500, 520, 3900];
console.log("Ex4 mean", mean(s), "median", median(s));
