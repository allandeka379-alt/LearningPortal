// W2b lesson figures (printed and pasted into the lessons). Run: node .scratch/business/tables/w2b-lessons.mjs
import { table, money, f, check, fmt, round } from "../lib.mjs";

console.log("=== enterprise.objectives WE1 (sales growth objective)");
{
  const last = 150000, now = 163500, target = 10;
  const rise = now - last; const pct = (rise / last) * 100; const needed = last * (1 + target / 100);
  console.log({ rise, pct, needed, shortfall: needed - now });
}
console.log("=== enterprise.objectives WE2 (market share + profit objective)");
{
  const sales = 72000, market = 480000; const share = f.marketShare(sales, market);
  const costs = 61500; const profit = f.profit(sales, costs);
  console.log({ share, profit });
}
console.log("=== enterprise.business-size WE1 (compare measures)");
{
  const rows = [
    ["Number of employees", 12, 35],
    ["Capital employed (US\\$)", 180000, 90000],
    ["Annual sales revenue (US\\$)", 240000, 310000],
  ];
  console.log(table(["Measure", "Chipo's furniture workshop", "Farai's software firm"], rows));
}
console.log("=== enterprise.business-size WE2 (market share)");
{
  const market = 560000; const a = 84000, b = 140000;
  console.log({ a: f.marketShare(a, market), b: f.marketShare(b, market), aProfit: 21000, bProfit: 14000 });
}
console.log("=== enterprise.business-growth WE1 (horizontal merger)");
{
  const market = 900000, x = 162000, y = 117000;
  const sx = f.marketShare(x, market), sy = f.marketShare(y, market), sc = f.marketShare(x + y, market);
  check("merger share", sx + sy, sc);
  console.log({ sx, sy, sc });
}
console.log("=== enterprise.business-growth WE2 (internal growth, new market)");
{
  const before = 96000, extra = 30000, extraCosts = 21000, oldProfit = 18000;
  console.log({ revenueAfter: before + extra, extraProfit: extra - extraCosts, profitAfter: oldProfit + extra - extraCosts });
}
console.log("=== economy.business-cycle WE1 (luxury vs necessity in recession)");
{
  const lux = [48000, 33600], nec = [52000, 49400];
  console.log({ luxFall: lux[0] - lux[1], luxPct: ((lux[0] - lux[1]) / lux[0]) * 100, necFall: nec[0] - nec[1], necPct: ((nec[0] - nec[1]) / nec[0]) * 100 });
}
console.log("=== economy.business-cycle WE2 (inflation squeezes profit)");
{
  const revenue = 70000, costs = 58000; const profit0 = f.profit(revenue, costs);
  const costs1 = costs * 1.1; const profit1 = f.profit(revenue, costs1);
  console.log({ profit0, costs1, profit1, margin0: f.profitMargin(profit0, revenue), margin1: f.profitMargin(profit1, revenue) });
}
console.log("=== economy.government-policy WE1 (tax on profits)");
{
  const profit = 48000; const t0 = 0.25 * profit, t1 = 0.3 * profit;
  console.log({ t0, after0: profit - t0, t1, after1: profit - t1, less: t1 - t0 });
}
console.log("=== economy.government-policy WE2 (interest rate)");
{
  const loan = 40000; const i0 = loan * 0.08, i1 = loan * 0.12; const profit = 26000;
  console.log({ i0, i1, extra: i1 - i0, profitAfter: profit - (i1 - i0) });
}
console.log("=== economy.government-policy WE3 (income tax)");
{
  const pay = 600; console.log({ net20: pay * 0.8, net25: pay * 0.75 });
}
