// Tables for lessons/fundamentals/users.md (W1a).
import { fmt, sum, check } from "../lib.mjs";
const row = (c) => `| ${c.join(" | ")} |`;
const yrs = [["2023", 7420, 4800], ["2024", 8960, 5100], ["2025", 10350, 5400]];
console.log(row(["Year", "Profit US\$", "Drawings US\$", "Profit kept in the business US\$"]));
console.log(row(["---", "---:", "---:", "---:"]));
for (const [y, p, d] of yrs) console.log(row([y, fmt(p), fmt(d), fmt(p - d)]));
const repay = 12000 / 4, interest = 12000 * 0.08;
const yearly = repay + interest;
console.log({ repay, interest, yearly, kept2025: 10350 - 5400, cover: (10350 - 5400) / yearly });
check("y", yearly, 3960);
// Example 2: supplier
const ca = [["Inventory", 6150], ["Trade receivables", 1840], ["Bank", 410]];
const cl = [["Trade payables", 5960], ["Bank overdraft", 2200]];
const tca = sum(ca.map((x) => x[1])), tcl = sum(cl.map((x) => x[1]));
console.log(row(["Item", "US\$"])); console.log(row(["---", "---:"]));
for (const [a, v] of [...ca, ...cl]) console.log(row([a, fmt(v)]));
console.log({ tca, tcl, liquid: 1840 + 410 });
