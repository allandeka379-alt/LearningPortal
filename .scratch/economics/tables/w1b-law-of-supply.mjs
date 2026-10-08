// Tables for lessons/supply/law-of-supply.md (W1b).
import { schedule, marketSum, table } from "../lib.mjs";
const p = [4, 6, 8, 10];
const A = [20, 30, 38, 45], B = [10, 16, 22, 28], C = [0, 5, 10, 14];
const M = marketSum([A, B, C]);
for (const q of [A, B, C, M]) schedule({ prices: p, qs: q });
console.log(table(["Price per crate (US\\$)", "Farmer Chipo", "Farmer Sipho", "Farmer Nyasha", "Market supply (crates per week)"], p.map((x, i) => [x, A[i], B[i], C[i], M[i]])));
console.log(M, "6->10 change", M[3] - M[1]);
const p2 = [0.1, 0.12, 0.14, 0.16], one = [800, 1000, 1150, 1250], n = 60;
const mk = one.map((x) => x * n);
schedule({ prices: p2, qs: one });
console.log(schedule({ prices: p2.map((x) => x.toFixed(2)).map(Number), qs: mk, priceHeader: "Price per brick (US\\$)", qsHeader: "Market quantity supplied (bricks per week)" }).md, mk);
