import { schedule, marketSum, table, pctChange } from "../lib.mjs";
const prices = [1, 2, 3, 4, 5];
const A = [2, 5, 8, 11, 14], B = [0, 3, 6, 9, 12], C = [1, 2, 4, 6, 9];
const M = marketSum([A, B, C]);
console.log(M);
console.log(table(["Price (US\\$ per crate)", "Farm A", "Farm B", "Farm C", "Market supply"], prices.map((p, i) => [p, A[i], B[i], C[i], M[i]])));
const S2 = M.map((q) => q + 6);
const S3 = M.map((q) => q - 2);
console.log(table(["Price (US\\$ per crate)", "S1: before", "S2: costs fall", "S3: costs rise"], prices.map((p, i) => [p, M[i], S2[i], S3[i]])));
// tax: qty at price P after tax = old qty at P-1
console.log(prices.map((p, i) => [p, i === 0 ? 0 : M[i - 1]]));
console.log(pctChange(M[2], S2[2]), pctChange(M[1], M[2]));
// supply function Qs = -20 + 10P
for (const p of [3, 4, 5]) console.log(p, -20 + 10 * p);
