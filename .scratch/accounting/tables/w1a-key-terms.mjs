// Tables for lessons/fundamentals/key-terms.md (W1a).
import { check, fmt, sum } from "../lib.mjs";
const row = (c) => `| ${c.join(" | ")} |`;
const items = [
  ["Workshop building", 12000, "Non-current asset"],
  ["Woodworking machinery", 4300, "Non-current asset"],
  ["Pick-up truck", 7500, "Non-current asset"],
  ["Inventory of timber", 1640, "Current asset"],
  ["Trade receivables (customers who owe for furniture)", 920, "Current asset"],
  ["Bank", 1385, "Current asset"],
  ["Trade payables (owed to a timber supplier)", 1060, "Current liability"],
  ["Loan repayable in 2030", 6000, "Non-current liability"],
];
console.log(row(["Item", "US\$", "Classification"])); console.log(row(["---", "---:", "---"]));
for (const [a, v, c] of items) console.log(row([a, fmt(v), c]));
const t = (k) => sum(items.filter((i) => i[2] === k).map((i) => i[1]));
const nca = t("Non-current asset"), ca = t("Current asset"), cl = t("Current liability"), ncl = t("Non-current liability");
const cap = nca + ca - cl - ncl;
check("cap", nca + ca, cap + cl + ncl);
console.log({ nca, ca, ta: nca + ca, cl, ncl, liab: cl + ncl, cap });
const inc = [["Fares received", 3480, "Income"], ["Fuel", 1260, "Expense"], ["Driver's wages", 640, "Expense"], ["Repairs to the kombi", 215, "Expense"], ["Licence and insurance", 180, "Expense"], ["Money Sipho took for groceries", 400, "Drawings"]];
console.log(row(["Item", "US\$", "Classification"])); console.log(row(["---", "---:", "---"]));
for (const [a, v, c] of inc) console.log(row([a, fmt(v), c]));
const I = sum(inc.filter((i) => i[2] === "Income").map((i) => i[1])), E = sum(inc.filter((i) => i[2] === "Expense").map((i) => i[1]));
console.log({ I, E, profit: I - E });
