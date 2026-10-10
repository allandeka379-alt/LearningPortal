// Lesson tables for biodiversity/diversity-statistics.
import { simpson, spearman, pearson, table, dpStr, sfStr, mean, sd, sum } from "../lib.mjs";
const names = ["Grass species 1", "Grass species 2", "Clover", "Daisy-like herb", "Sedge"];
const s1 = simpson([24, 18, 9, 6, 3]);
console.log(table(["Species", "n", "n/N", "(n/N)²"], s1.rows.map((r, i) => [names[i], r.n, dpStr(r.frac, 3), dpStr(r.frac2, 4)])));
console.log("N", s1.N, "sum", s1.sumFrac2, "D", s1.D);
const s2 = simpson([52, 4, 2, 1, 1]);
console.log("site2 N", s2.N, "sum", s2.sumFrac2, "D", s2.D);
// Spearman: distance from river (m) vs number of a reed species per quadrat
const dist = [0, 5, 10, 15, 20, 25, 30, 35];
const reeds = [31, 27, 28, 18, 12, 12, 7, 3];
const sp = spearman(dist, reeds);
console.log(table(["Distance / m", "Rank", "Reeds", "Rank", "D", "D²"], sp.rows.map((r) => [r.x, r.rx, r.y, r.ry, r.d, r.d2])));
console.log("sumD2", sp.sumD2, "rs", sp.rs, "crit", sp.crit, sp.significant);
// Pearson: soil moisture % vs height of a fern (cm)
const moist = [12, 18, 22, 25, 30, 34, 38];
const fern = [14, 19, 25, 24, 31, 33, 40];
const pr = pearson(moist, fern);
console.log("pearson", pr, "sumxy", sum(moist.map((x, i) => x * fern[i])), mean(moist), mean(fern), sd(moist), sd(fern));
