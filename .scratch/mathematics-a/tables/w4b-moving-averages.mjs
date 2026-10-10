import { movingAverages, mean, biv } from "../lib.mjs";
const s1 = [420, 310, 260, 450, 335, 280, 486, 362, 301];
console.log("Ex1 totals", [0, 1, 2, 3, 4, 5, 6].map((i) => s1[i] + s1[i + 1] + s1[i + 2]), movingAverages(s1, 3));
const q = [52, 38, 31, 47, 56, 41, 34, 51, 61, 45, 37, 55];
const raw4 = []; for (let i = 0; i + 4 <= q.length; i++) raw4.push(mean(q.slice(i, i + 4)));
const c4 = movingAverages(q, 4);
console.log("Ex2 4-pt totals", raw4.map((v) => v * 4), "4-pt", raw4, "centred", c4);
// centred MAs sit at quarters 3..10 (index 2..9)
const idx = c4.map((_, i) => i + 3);
const r = biv(idx, c4);
console.log("trend fit", r.a, r.b, "first/last", c4[0], c4[c4.length - 1], "grad by end points", (c4[c4.length - 1] - c4[0]) / 7);
const dev = c4.map((m, i) => q[i + 2] - m);
console.log("deviations", dev);
// seasonal deviation for Q1 (indices 4, 8 → quarters 5, 9) etc
const season = [0, 1, 2, 3].map((s) => mean(dev.filter((_, i) => (i + 2) % 4 === s)));
console.log("seasonal", season, "sum", season.reduce((a, b) => a + b));
const tr13 = c4[0] + ((c4[c4.length - 1] - c4[0]) / 7) * (13 - 3);
console.log("trend at 13 (end-point line)", tr13, "forecast Q1", tr13 + season[0]);
