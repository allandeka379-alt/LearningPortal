// Tables for lessons/markets/price-controls.md (W2a).
import { schedule } from "../lib.mjs";
// WE1: maximum price on 10 kg maize-meal bags. Qd = 2000 - 100P, Qs = 200 + 100P.
const p = [6, 7, 8, 9, 10, 11];
const qd = p.map((x) => 2000 - 100 * x), qs = p.map((x) => 200 + 100 * x);
const s = schedule({ prices: p, qd, qs, priceHeader: "Price per 10 kg bag (US\\$)", qdHeader: "Quantity demanded (bags per week)", qsHeader: "Quantity supplied (bags per week)", requireEquilibrium: true });
console.log(s.md, s.equilibrium, s.excess);
const i7 = p.indexOf(7);
console.log("shortage at 7:", s.excess[i7], "sold:", Math.min(qd[i7], qs[i7]), "spend eq", 9 * 1100, "spend max", 7 * qs[i7]);
// WE2: minimum price for wheat (per tonne) bought from farmers. Qd = 1600 - 3P, Qs = 2P.
const p2 = [250, 280, 300, 320, 350];
const d2 = p2.map((x) => 1600 - 3 * x), s2 = p2.map((x) => 2 * x);
const t2 = schedule({ prices: p2, qd: d2, qs: s2, priceHeader: "Price per tonne (US\\$)", qdHeader: "Quantity demanded (tonnes per month)", qsHeader: "Quantity supplied (tonnes per month)", requireEquilibrium: true });
console.log(t2.md, t2.equilibrium, t2.excess);
const j = p2.indexOf(350);
console.log("surplus at 350:", -t2.excess[j], "govt buys cost", 350 * -t2.excess[j], "farm revenue before", 320 * 640, "after", 350 * 700);
