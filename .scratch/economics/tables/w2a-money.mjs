// Tables for lessons/money/money.md (W2a).
import { table, check } from "../lib.mjs";
const ratios = (n) => (n * (n - 1)) / 2;
console.log("barter ratios 10 goods", ratios(10), "40 goods", ratios(40));
// Money supply of fictional Country X (kora million).
const items = { cash: 820, demand: 1460, savings: 1130, time: 690 };
const m1 = items.cash + items.demand, m2 = m1 + items.savings, m3 = m2 + items.time;
check("m3", m3, 4100);
console.log(table(["Item", "Amount (K million)"], [["Notes and coins held by the public", items.cash], ["Demand (current account) deposits", items.demand], ["Savings and short-term deposits", items.savings], ["Long-term (fixed) deposits", items.time]]));
console.log({ m1, m2, m3, cashShareM1: (items.cash / m1) * 100 });
