// Checks for lessons/statistics/central-tendency.md
import { chk, same, mean, median, modes, freqStats, grouped, expand } from "../lib.mjs";
const d1 = [12, 15, 9, 15, 20, 11, 15, 7];
chk(mean(d1), 13); chk(median(d1), 13.5); same(modes(d1), [15]);
const t2 = [[0, 4], [1, 9], [2, 12], [3, 8], [4, 5], [5, 2]];
const s2 = freqStats(t2); console.log("ex2", s2.n, s2.sumfx, s2.mean, median(expand(t2)));
const G = grouped([[100, 120, 7], [120, 140, 15], [140, 160, 20], [160, 180, 12], [180, 200, 6]]);
console.log("ex3", G.n, G.sumfx, G.mean, G.median, G.cf);
chk((30 * 62 + 20 * 57) / 50, 60);
const k = 3; chk(freqStats([[1, 3], [2, k], [3, 6], [4, 2]]).mean, 2.5);
