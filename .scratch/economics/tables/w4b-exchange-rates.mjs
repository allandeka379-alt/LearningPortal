// Tables for lessons/forex/exchange-rates.md (W4b).
import { schedule, forex, table, fmt, pctChange, check } from "../lib.mjs";
// Demand and supply of the kora (fictional) in US cents per kora.
const prices = [2, 3, 4, 5, 6];
const qd = [900, 800, 700, 600, 500];
const qs = [500, 600, 700, 800, 900];
const s1 = schedule({ prices, qd, qs, priceHeader: "Price of 1 kora (US cents)", qdHeader: "Kora demanded (million)", qsHeader: "Kora supplied (million)", requireEquilibrium: true });
console.log(s1.md, s1.equilibrium);
const qd2 = qd.map((q) => q + 200);
const s2 = schedule({ prices, qd: qd2, qs, priceHeader: "Price of 1 kora (US cents)", qdHeader: "Kora demanded after the rise in exports (million)", qsHeader: "Kora supplied (million)", requireEquilibrium: true });
console.log(s2.md, s2.equilibrium);
console.log("appreciation %", pctChange(4, 5));
// Conversions: US$1 = K25 -> K20.
const phone = 400; console.log("K", forex.convert(phone, 25), forex.convert(phone, 20));
// kora value in US$: 1/25 -> 1/20
console.log("kora change", pctChange(1 / 25, 1 / 20), "dollar change", pctChange(25, 20));
// Exporter: tobacco K60,000/tonne; K25 per US$ then K30 per US$.
console.log("US$", 60000 / 25, 60000 / 30, pctChange(60000 / 25, 60000 / 30));
check("e", 60000 / 30, 2000);
