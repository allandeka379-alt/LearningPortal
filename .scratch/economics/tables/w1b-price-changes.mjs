// Tables for lessons/markets/price-changes.md (W1b).
import { schedule } from "../lib.mjs";
// Worked example 1: school shoes, demand increases in January.
const p = [15, 20, 25, 30, 35], d1 = [700, 600, 500, 400, 300], d2 = [900, 800, 700, 600, 500], s = [300, 400, 500, 600, 700];
const a = schedule({ prices: p, qd: d1, qs: s, requireEquilibrium: true });
const b = schedule({ prices: p, qd: d2, qs: s, requireEquilibrium: true });
console.log(schedule({ prices: p, qd: d1, qs: s, priceHeader: "Price per pair (US\\$)", qdHeader: "D1: November (pairs per week)", qsHeader: "S (pairs per week)", extra: [{ header: "D2: January (pairs per week)", values: d2 }] }).md);
console.log(a.equilibrium, b.equilibrium, "shortage at old price", d2[2] - s[2], "rev", a.equilibrium.price * a.equilibrium.quantity, b.equilibrium.price * b.equilibrium.quantity);
// Worked example 2: groundnuts, supply decreases after a drought.
const p2 = [1.0, 1.2, 1.4, 1.6, 1.8], qd = [5000, 4500, 4000, 3500, 3000], s1 = [3000, 3500, 4000, 4500, 5000], s2 = [2000, 2500, 3000, 3500, 4000];
const c = schedule({ prices: p2, qd, qs: s1, requireEquilibrium: true });
const d = schedule({ prices: p2, qd, qs: s2, requireEquilibrium: true });
console.log(schedule({ prices: p2, qd, qs: s1, priceHeader: "Price per kg (US\\$)", qdHeader: "D (kg per week)", qsHeader: "S1: normal season (kg per week)", extra: [{ header: "S2: after drought (kg per week)", values: s2 }] }).md);
console.log(c.equilibrium, d.equilibrium, "shortage at old", qd[2] - s2[2], "spend", c.equilibrium.price * c.equilibrium.quantity, d.equilibrium.price * d.equilibrium.quantity);
