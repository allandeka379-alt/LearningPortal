// Tables for lessons/fundamentals/purpose-of-accounting.md (W1a).
import { fmt, sum, check } from "../lib.mjs";
const row = (c) => `| ${c.join(" | ")} |`;
const days = [["Monday", 86, 52], ["Tuesday", 74, 45], ["Wednesday", 92, 58], ["Thursday", 68, 40], ["Friday", 115, 70], ["Saturday", 140, 88]];
console.log(row(["Day", "Sales US\\$", "Produce bought US\\$", "Market fee US\\$"]));
console.log(row(["---", "---:", "---:", "---:"]));
for (const [d, s, p] of days) console.log(row([d, fmt(s), fmt(p), "2"]));
const S = sum(days.map((d) => d[1])), Pu = sum(days.map((d) => d[2])), F = 12;
console.log(row(["**Total**", `**${fmt(S)}**`, `**${fmt(Pu)}**`, `**${fmt(F)}**`]));
console.log({ S, Pu, F, profit: S - Pu - F });
const h = [["Sales", 18400, 21900], ["Ingredients", 7360, 9855], ["Wages", 4200, 4800], ["Electricity", 1150, 1640], ["Rent", 1800, 1800]];
const e1 = sum(h.slice(1).map((x) => x[1])), e2 = sum(h.slice(1).map((x) => x[2]));
console.log(row(["", "January–June US\\$", "July–December US\\$"]));
console.log(row(["---", "---:", "---:"]));
for (const [a, x, y] of h) console.log(row([a, fmt(x), fmt(y)]));
console.log(row(["**Total expenses**", `**${fmt(e1)}**`, `**${fmt(e2)}**`]));
console.log(row(["**Profit**", `**${fmt(18400 - e1)}**`, `**${fmt(21900 - e2)}**`]));
check("p1", 18400 - e1, 3890);
check("p2", 21900 - e2, 3805);
