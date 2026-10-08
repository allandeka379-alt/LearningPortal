// Tables for lessons/fundamentals/accounting-equation.md (W1a). Run: node .scratch/accounting/tables/w1a-accounting-equation.mjs
import { check, fmt, statement, sum } from "../lib.mjs";

const row = (c) => `| ${c.join(" | ")} |`;

// Example 1: missing figures.
const ex1 = [
  ["Chipo's hair salon, Harare", 8400, 1900, null],
  ["Sipho's transport service, Bulawayo", null, 12750, 23500],
  ["Nyasha's market stall, Mutare", 2860, null, 2145],
].map(([n, a, l, c]) => {
  if (a === null) a = l + c;
  else if (l === null) l = a - c;
  else c = a - l;
  check(n, a, l + c);
  return [n, a, l, c];
});
console.log("EX1");
console.log(row(["Business", "Assets US\\$", "Liabilities US\\$", "Capital US\\$"]));
console.log(row(["---", "---:", "---:", "---:"]));
for (const [n, a, l, c] of ex1) console.log(row([n, fmt(a), fmt(l), fmt(c)]));

// Example 2: Tendai's tuck shop, December 2025.
const items = ["Bank", "Shop fittings", "Inventory", "Trade payables", "Loan", "Capital"];
const kind = { Bank: "A", "Shop fittings": "A", Inventory: "A", "Trade payables": "L", Loan: "L", Capital: "C" };
const bal = Object.fromEntries(items.map((i) => [i, 0]));
const tx = [
  ["1 Dec", "Tendai pays US\\$3,000 of her savings into a business bank account", { Bank: 3000, Capital: 3000 }],
  ["3 Dec", "Buys shop fittings, paying by bank transfer", { "Shop fittings": 800, Bank: -800 }],
  ["5 Dec", "Buys inventory on credit from Farai Wholesalers", { Inventory: 1200, "Trade payables": 1200 }],
  ["10 Dec", "Receives a three-year loan from a bank", { Bank: 2000, Loan: 2000 }],
  ["18 Dec", "Pays Farai Wholesalers part of the amount owed", { Bank: -700, "Trade payables": -700 }],
  ["22 Dec", "Sells goods that cost US\\$400 for US\\$650; the money is banked", { Inventory: -400, Bank: 650, Capital: 250 }],
  ["28 Dec", "Takes money from the business bank account for personal use", { Bank: -150, Capital: -150 }],
];
console.log("\nEX2");
console.log(row(["Date", "Bank", "Shop fittings", "Inventory", "Total assets", "Trade payables", "Loan", "Capital", "Liabilities + capital"]));
console.log(row(["---", ...Array(8).fill("---:")]));
for (const [d, , ch] of tx) {
  const a = sum(Object.entries(ch).filter(([k]) => kind[k] === "A").map(([, v]) => v));
  const lc = sum(Object.entries(ch).filter(([k]) => kind[k] !== "A").map(([, v]) => v));
  // each transaction keeps the equation in balance
  check(`${d} change`, a, lc);
  for (const [k, v] of Object.entries(ch)) bal[k] += v;
  const ta = bal.Bank + bal["Shop fittings"] + bal.Inventory;
  const tl = bal["Trade payables"] + bal.Loan + bal.Capital;
  check(`${d} equation`, ta, tl);
  console.log(row([d, fmt(bal.Bank), fmt(bal["Shop fittings"]), fmt(bal.Inventory), `**${fmt(ta)}**`, fmt(bal["Trade payables"]), fmt(bal.Loan), fmt(bal.Capital), `**${fmt(tl)}**`]));
}
console.log(JSON.stringify(bal));

// Example 3: statement of financial position at 31 December 2025.
const nca = bal["Shop fittings"];
const ca = sum([bal.Inventory, bal.Bank]);
const ta = sum([nca, ca]);
const capIntro = 3000;
const profit = 250;
const drawings = 150;
const capClose = capIntro + profit - drawings;
const tot = sum([capClose, bal.Loan, bal["Trade payables"]]);
console.log("\nEX3");
console.log(
  statement(
    "Tendai's Tuck Shop — statement of financial position at 31 December 2025",
    [
      ["**Non-current assets**", null, null],
      ["Shop fittings", null, nca],
      ["**Current assets**", null, null],
      ["Inventory", bal.Inventory, null],
      ["Bank", bal.Bank, null],
      ["", null, ca],
      ["**Total assets**", null, `**${fmt(ta)}**`],
      null,
      ["**Capital**", null, null],
      ["Capital introduced", capIntro, null],
      ["Add profit for the month", profit, null],
      ["", sum([capIntro, profit]), null],
      ["Less drawings", -drawings, null],
      ["", null, capClose],
      ["**Non-current liabilities**", null, null],
      ["Bank loan", null, bal.Loan],
      ["**Current liabilities**", null, null],
      ["Trade payables", null, bal["Trade payables"]],
      ["**Total capital and liabilities**", null, `**${fmt(tot)}**`],
    ],
    { checks: [["capital", capClose, bal.Capital], ["totals", ta, tot]] },
  ),
);
