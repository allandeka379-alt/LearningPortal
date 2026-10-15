import { nearestNeighbour, rankSize, dpStr, sfStr } from "../lib.mjs";
// Lesson: 8 service centres in a 40 km x 25 km region (1000 km2)
const pts = [[4, 5], [9, 20], [14, 9], [19, 15], [24, 4], [29, 19], [34, 10], [37, 22]];
const r = nearestNeighbour(pts, 1000);
console.log("lesson", r.n, r.nearest.map((x) => dpStr(x, 2)).join(" "), "dObs", dpStr(r.dObs, 2), "dExp", dpStr(r.dExp, 2), "Rn", dpStr(r.rn, 2), r.pattern);
// Slice: 7 centres in 20 x 20 = 400 km2 (clustered)
const p2 = [[3, 4], [5, 6], [6, 3], [14, 15], [16, 17], [15, 13], [8, 10]];
const r2 = nearestNeighbour(p2, 400);
console.log("slice1", r2.n, r2.nearest.map((x) => dpStr(x, 3)).join(" "), "dObs", dpStr(r2.dObs, 3), "dExp", dpStr(r2.dExp, 3), "Rn", dpStr(r2.rn, 3), r2.pattern);
// Slice: 6 centres 30x20 = 600 regular
const p3 = [[5, 5], [15, 5], [25, 5], [5, 15], [15, 15], [25, 15]];
const r3 = nearestNeighbour(p3, 600);
console.log("slice2", r3.nearest, "dObs", r3.dObs, "dExp", dpStr(r3.dExp, 3), "Rn", dpStr(r3.rn, 3), r3.pattern);
const cities = [1800, 520, 410, 210, 190];
console.log(cities.map((c, i) => [i + 1, c, rankSize(1800, i + 1), Math.round((c / rankSize(1800, i + 1)) * 100)]));
console.log("primacy", 1800 / 520, 1800 / (520 + 410 + 210));
