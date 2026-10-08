// Tables for lessons/trade/protection.md (W4b).
import { schedule, table, fmt, money, check } from "../lib.mjs";
const prices = [1.0, 1.2, 1.4, 1.6, 1.8], qd = [900, 800, 700, 600, 500], qs = [100, 200, 300, 400, 500];
const s = schedule({ prices, qd, qs, priceHeader: "Price (US\$ per litre)", qdHeader: "Quantity demanded (thousand litres a week)", qsHeader: "Quantity supplied by local producers (thousand litres a week)", extra: [{ header: "Imports at this price (thousand litres)", values: qd.map((d, i) => d - qs[i]) }] });
console.log(s.md.replace(/\| 1 \|/, "| 1.00 |"));
const pw = 1.0, t = 0.4, pt = pw + t;
const i0 = qd[0] - qs[0], i1 = qd[2] - qs[2];
console.log("imports", i0, i1, "revenue", t * i1 * 1000, "tariff %", (t / pw) * 100, "local output", qs[0], qs[2]);
check("rev", t * i1 * 1000, 160000);
// quota 200 -> price where qd-qs = 200
const k = qd.findIndex((d, i) => d - qs[i] === 200); console.log("quota price", prices[k]);
