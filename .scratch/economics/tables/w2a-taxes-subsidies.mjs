// Tables for lessons/markets/taxes-subsidies.md (W2a).
import { schedule, check, money } from "../lib.mjs";
// WE1: specific tax of US$0.50 per 2-litre bottle of a sugary drink. Qd = 3000 - 800P, Qs = -1000 + 1200P.
const r = (x) => Math.round(x);
const p = [1.8, 1.9, 2.0, 2.1, 2.2, 2.3, 2.4];
const qd = p.map((x) => r(3000 - 800 * x)), qs = p.map((x) => r(-1000 + 1200 * x)), qsT = p.map((x) => r(-1000 + 1200 * (x - 0.5)));
const s = schedule({ prices: p, qd, qs, priceHeader: "Price paid by consumers (US\\$)", qdHeader: "Quantity demanded (bottles per day)", qsHeader: "Quantity supplied before tax", requireEquilibrium: true, extra: [{ header: "Quantity supplied after tax", values: qsT }] });
console.log(s.md, s.equilibrium);
const i = qd.findIndex((q, k) => q === qsT[k]);
console.log("after-tax eq", p[i], qd[i], "consumer burden", p[i] - 2.0, "producer receives", p[i] - 0.5, "revenue", 0.5 * qd[i]);
check("eq after", p[i], 2.3);
// WE2: subsidy of US$10 per bag of fertiliser. Qd = 5200 - 80P, Qs = -800 + 120P.
const p2 = [22, 24, 26, 28, 30, 32];
const d2 = p2.map((x) => 5200 - 80 * x), s2 = p2.map((x) => -800 + 120 * x), s2S = p2.map((x) => -800 + 120 * (x + 10));
const t2 = schedule({ prices: p2, qd: d2, qs: s2, priceHeader: "Price paid by farmers (US\\$)", qdHeader: "Quantity demanded (bags per month)", qsHeader: "Quantity supplied before subsidy", requireEquilibrium: true, extra: [{ header: "Quantity supplied after subsidy", values: s2S }] });
console.log(t2.md, t2.equilibrium);
const j = d2.findIndex((q, k) => q === s2S[k]);
console.log("after-sub eq", p2[j], d2[j], "cost", money(10 * d2[j]), "producers receive", p2[j] + 10);
