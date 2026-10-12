import { table, mean, median, modes, range, weightedMean, groupedMean, modalClass, pieAngles, pctChange, prices, fmt } from "../lib.mjs";
// Raw data: weekly airtime sales (US$) of 9 vendors
const raw = [12, 15, 9, 15, 20, 11, 15, 8, 25];
console.log("raw", mean(raw), median(raw), modes(raw), range(raw));
// even count
const raw2 = [12, 15, 9, 15, 20, 11, 15, 8];
console.log("raw2", mean(raw2), median(raw2));
// frequency: children per household
const kids = [0, 1, 2, 3, 4], f = [6, 10, 14, 8, 2];
const n = f.reduce((a, b) => a + b);
const tot = kids.reduce((s, k, i) => s + k * f[i], 0);
console.log("freq", n, tot, tot / n);
console.log(table(["Children", "Households (f)", "Children x f"], kids.map((k, i) => [k, f[i], k * f[i]]).concat([["**Total**", n, tot]])));
// median position
console.log("median pos", (n + 1) / 2);
// cumulative
let c = 0; console.log(f.map((x) => (c += x)));
// grouped: monthly income, US$
const cls = [[0, 100, 8], [100, 200, 14], [200, 300, 20], [300, 400, 6], [400, 500, 2]];
console.log("grouped", groupedMean(cls), modalClass(cls));
console.log(table(["Income (US$)", "Households (f)", "Mid-point (x)", "f x"], cls.map(([l, h, ff]) => [`${l} to under ${h}`, ff, (l + h) / 2, ff * (l + h) / 2]).concat([["**Total**", 50, "", cls.reduce((s, [l, h, ff]) => s + ff * (l + h) / 2, 0)]])));
// weighted mean: average price weighted by quantity sold
const p = [1.0, 1.5, 2.5], q = [60, 30, 10];
console.log("weighted", weightedMean(p, q), mean(p));
// pie
const sp = [150, 100, 50, 40, 60];
console.log("pie", pieAngles(sp), sp.reduce((a, b) => a + b));
// percent change
console.log(pctChange(250, 280), pctChange(280, 266));
// index: prices 2.50 -> 2.80 ; index
console.log(prices.simpleIndex(2.5, 2.8), prices.simpleIndex(2.5, 2.9));
// index series: base year 2019=100, 2020=108, 2021=118.8? compute growth
const idx = [100, 108, 118.8]; console.log(pctChange(100, 108), pctChange(108, 118.8));
