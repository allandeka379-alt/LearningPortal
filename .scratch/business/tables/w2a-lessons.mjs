// W2a lesson figures (printed and pasted into the lessons). Run: node .scratch/business/tables/w2a-lessons.mjs
import { f, money, fmt, table, sum, check, r2 } from "../lib.mjs";

console.log("=== sole-traders-partnerships ===");
{
  // Worked example 1: profit shared in the ratio of capital.
  const capR = 12000, capF = 8000, profit = 15000;
  const shR = (profit * capR) / (capR + capF), shF = (profit * capF) / (capR + capF);
  check("share sum", shR + shF, profit);
  console.log("capital ratio", capR / 4000, ":", capF / 4000, "Rudo", money(shR), "Farai", money(shF));
  // Worked example 2: salary to one partner, remainder 2:2:1.
  const p2 = 23000, salary = 3000, rem = p2 - salary;
  const t = (rem * 2) / 5, c = (rem * 2) / 5, s = (rem * 1) / 5;
  check("rem", t + c + s, rem);
  console.log("remainder", money(rem), "Tatenda", money(t), "Chipo", money(c), "Sipho share", money(s), "Sipho total", money(s + salary));
  console.log(table(["Partner", "Salary US\\$", "Share of remaining profit US\\$", "Total US\\$"], [["Tatenda", 0, t, t], ["Chipo", 0, c, c], ["Sipho", salary, s, s + salary], ["**Total**", salary, rem, sum([t, c, s + salary])]]));
  check("total", t + c + s + salary, p2);
  // Unlimited liability.
  const debts = 18000, assets = 11000;
  console.log("shortfall from personal assets", money(debts - assets));
}

console.log("=== limited-companies ===");
{
  const shares = 50000, nyasha = 20000, div = 7500;
  const pct = (nyasha / shares) * 100, dps = div / shares, nd = dps * nyasha;
  console.log("Nyasha %", pct, "dividend per share", dps, "Nyasha dividend", money(nd));
  const bought = 2000, price = 1.5;
  console.log("Thandeka invested", money(bought * price));
}

console.log("=== business-plan ===");
{
  const price = 1.2, vc = 0.7, fixed = 1500, sales = 4000;
  const cpu = r2(f.contribution(price, vc));
  const be = f.breakEvenOutput(fixed, price, vc);
  const rev = r2(f.revenue(price, sales));
  const tc = r2(f.totalCost(fixed, f.totalVariableCost(vc, sales)));
  const profit = r2(f.profit(rev, tc));
  console.log("contribution", cpu, "BE", be, "revenue", rev, "TVC", r2(vc * sales), "TC", tc, "profit", profit, "MoS", f.marginOfSafety(sales, be));
  const items = [["Oven and trays", 3200], ["Mixer", 950], ["Shop fittings", 1100], ["First month's flour and ingredients", 700], ["Licence and registration", 500]];
  const total = sum(items.map((x) => x[1]));
  console.log(table(["Start-up cost", "US\\$"], [...items, ["**Total start-up costs**", total]]));
  const savings = 4000;
  console.log("total", money(total), "gap", money(total - savings));
}
