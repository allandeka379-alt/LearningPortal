import { schedule, marketSum, table, pctChange, fmt } from "../lib.mjs";
const prices = [5, 4, 3, 2, 1];
const A = [2, 4, 6, 8, 10], B = [1, 2, 4, 6, 9], C = [0, 1, 2, 4, 6];
const M = marketSum([A, B, C]);
console.log(M);
const s = schedule({ prices, qd: M, priceHeader: "Price (US\\$ per bag)", qdHeader: "Market quantity demanded (bags per week)" });
console.log(s.md);
console.log(table(["Price (US\\$ per bag)", "Tendai", "Rudo", "Farai", "Market demand"], prices.map((p, i) => [p, A[i], B[i], C[i], M[i]])));
const M2 = M.map((q) => q + 4);
console.log(table(["Price (US\\$ per bag)", "D1: before (bags)", "D2: after (bags)"], prices.map((p, i) => [p, M[i], M2[i]])));
console.log(pctChange(M[2], M2[2]), pctChange(M[2], M[3]));
// linear Qd = 60 - 4P
for (const p of [5, 6, 8]) console.log(p, 60 - 4 * p);
