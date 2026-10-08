// Tables for lessons/demand/law-of-demand.md (W1b). Run: node .scratch/economics/tables/w1b-law-of-demand.mjs
import { schedule, marketSum, table } from "../lib.mjs";
const prices = [0.8, 1.0, 1.2, 1.4, 1.6];
const T = [10, 8, 7, 5, 4], R = [6, 5, 4, 3, 2], F = [4, 4, 3, 3, 2];
const M = marketSum([T, R, F]);
for (const q of [T, R, F, M]) schedule({ prices, qd: q });
console.log(table(["Price per loaf (US\\$)", "Tendai's household", "Rudo's household", "Farai's household", "Market demand (three households)"], prices.map((p, i) => [p.toFixed(2), T[i], R[i], F[i], M[i]])));
console.log(M, "change 1.00 -> 1.40:", M[1] - M[3]);
const p2 = [5, 6, 7, 8, 9], ind = [4, 3.5, 3, 2.5, 2];
const mk = ind.map((x) => x * 250);
console.log(schedule({ prices: p2, qd: mk, priceHeader: "Price per 10 kg bag (US\\$)", qdHeader: "Market quantity demanded (bags per month)" }).md);
console.log(mk);
