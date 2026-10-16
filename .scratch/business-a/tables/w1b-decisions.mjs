import { table, chk } from "../lib.mjs";
const last = 96000, growth = 20;
const target = last * (1 + growth / 100);
chk(target, 115200, 1e-6);
const quarterly = [0.2, 0.2, 0.25, 0.35].map((s) => target * s);
const adv = target * 0.05;
console.log(table(["Quarter", "Share of yearly sales (%)", "Sales target (US\$)"], [["1", 20, quarterly[0]], ["2", 20, quarterly[1]], ["3", 25, quarterly[2]], ["4", 35, quarterly[3]], ["Year", 100, quarterly.reduce((a, b) => a + b, 0)]]));
console.log(target, adv, quarterly);
// ethics example: cost of safe handling
const units = 50000, extra = 0.04, price = 1.1, cost = 0.9;
console.log("profit before", units * (price - cost), "extra cost", units * extra, "after", units * (price - cost - extra));
