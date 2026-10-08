// Tables for lessons/markets/equilibrium.md (W1b).
import { schedule } from "../lib.mjs";
const p = [4, 6, 8, 10, 12], qd = [900, 750, 600, 450, 300], qs = [300, 450, 600, 750, 900];
const s = schedule({ prices: p, qd, qs, priceHeader: "Price per crate (US\\$)", qdHeader: "Quantity demanded (crates per day)", qsHeader: "Quantity supplied (crates per day)", requireEquilibrium: true, extra: [{ header: "Shortage (+) or surplus (−)", values: p.map((_, i) => qd[i] - qs[i]) }] });
console.log(s.md, s.equilibrium, s.excess);
// worked example 2: exercise books
const p2 = [0.5, 0.6, 0.7, 0.8], d2 = [5000, 4400, 3800, 3200], s2 = [2600, 3200, 3800, 4400];
const e2 = schedule({ prices: p2, qd: d2, qs: s2, priceHeader: "Price per exercise book (US\\$)", requireEquilibrium: true });
console.log(e2.md, e2.equilibrium, e2.excess, "spending at eq", e2.equilibrium.price * e2.equilibrium.quantity);
