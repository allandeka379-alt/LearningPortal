// Tables for lessons/structures/competitive-markets.md (W3a).
import { schedule, table, check } from "../lib.mjs";
// WE2: entry of new firms into a competitive tomato market (price per kg, quantity in kg per day).
const prices = [0.9, 1.0, 1.1, 1.2, 1.3];
const qd = [7000, 6400, 5800, 5200, 4600];
const qs1 = [3400, 4000, 4600, 5200, 5800];
const qs2 = [5800, 6400, 7000, 7600, 8200];
const s1 = schedule({ prices, qd, qs: qs1, requireEquilibrium: true });
const s2 = schedule({ prices, qd, qs: qs2, requireEquilibrium: true });
check("e1", s1.equilibrium.price, 1.2); check("e2", s2.equilibrium.price, 1.0);
console.log(table(["Price (US\\$ per kg)", "Quantity demanded (kg per day)", "Quantity supplied before entry (kg per day)", "Quantity supplied after entry (kg per day)"], prices.map((p, i) => [p.toFixed(2), qd[i], qs1[i], qs2[i]])));
console.log(s1.equilibrium, s2.equilibrium);
// WE1: a price-taking farmer.
console.log(0.8 * 2500);
