import { chk, rnd, recurrenceInterval, table } from "../lib.mjs";
const Q = [412, 285, 530, 198, 367, 241, 455, 322, 176, 298, 389, 264, 343, 218, 481, 255, 306, 332, 279];
const n = Q.length;
const sorted = [...Q].map((q, i) => ({ q, yr: i + 1 })).sort((a, b) => b.q - a.q);
const rows = sorted.map((r, i) => [i + 1, r.yr, r.q, recurrenceInterval(n, i + 1), (100 / recurrenceInterval(n, i + 1))]);
console.log(table(["Rank", "Year", "Peak (m3/s)", "T (years)", "P (%)"], rows));
console.log("annual probability of 50-yr flood", 1/50, "10-yr chance", 1 - (1 - 1/50) ** 10, "25 yr", 1 - (1 - 1/50) ** 25);
console.log("100-yr in 30 yrs", 1 - 0.99 ** 30);
// cost benefit
console.log("BCR", 18 / 12, 4.8/ 6);
