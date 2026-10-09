// W4b: figures and tables for the lessons (cash-flow problems to break-even charts).
// Run: node .scratch/business/tables/w4b-lessons.mjs [section]
import { f, money, fmt, r2, round, table, statement, cashFlow, check, sum, breakEvenTable } from "../lib.mjs";

const only = process.argv[2];
const out = (k, v) => {
  if (!only || k.startsWith(only)) console.log(`\n=== ${k}\n${v}`);
};

// ---- cash-flow-problems
{
  const n = 10, price = 150, costCash = 900;
  const rev = n * price;
  out("cfp WE1", `revenue ${rev}; profit ${rev - costCash}; cash change in March -${costCash}`);
  const base = cashFlow({
    months: ["April", "May", "June"],
    opening: 400,
    inflows: [["Cash sales", [1800, 1900, 2000]], ["Receipts from credit customers", [600, 700, 2400]]],
    outflows: [["Payments to suppliers", [1500, 1600, 1500]], ["Wages", [700, 700, 700]], ["New oven", [0, 1200, 0]], ["Other expenses", [300, 300, 300]]],
  });
  out("cfp WE2 base", base.md + `\nclosing ${base.closing}`);
  const fixed = cashFlow({
    months: ["April", "May", "June"],
    opening: 400,
    inflows: [["Cash sales", [1800, 1900, 2000]], ["Receipts from credit customers", [600, 700, 2400]]],
    outflows: [["Payments to suppliers", [1500, 1600, 1500]], ["Wages", [700, 700, 700]], ["New oven", [0, 0, 1200]], ["Other expenses", [300, 300, 300]]],
  });
  out("cfp WE2 fixed", `closing ${fixed.closing}`);
}

// ---- budgets
{
  const months = ["January", "February", "March"];
  const units = [400, 450, 520], price = 2.5;
  const rev = units.map((u) => r2(u * price));
  out("bud WE1", table(["Sales budget", ...months, "Total"], [["Loaves sold", ...units, sum(units)], ["Price per loaf (US\\$)", ...months.map(() => "2.50"), ""], ["Sales revenue (US\\$)", ...rev, sum(rev)]]));
  const sales = [300, 340, 380], openInv = [40, 60, 70], closeInv = [60, 70, 50];
  const prod = sales.map((s, i) => s + closeInv[i] - openInv[i]);
  for (let i = 1; i < 3; i += 1) check("inv chain", openInv[i], closeInv[i - 1]);
  out("bud WE2", table(["Production budget (chairs)", ...months], [["Planned sales", ...sales], ["Add planned closing inventory", ...closeInv], ["Less opening inventory", ...openInv.map((x) => -x)], ["Units to produce", ...prod]]));
  const budget = [["Sales revenue", 6000, 5400], ["Materials", 2400, 2550], ["Wages", 1500, 1500], ["Advertising", 300, 200]];
  out("bud WE3", table(["Item", "Budget US\\$", "Actual US\\$", "Variance US\\$"], budget.map(([l, b, a]) => [l, b, a, Math.abs(a - b)])));
}

// ---- profit
{
  const rev = 3600, costs = [["Stock bought and sold", 2300], ["Stall fee", 120], ["Transport", 180], ["Airtime and data", 40]];
  const tc = sum(costs.map((c) => c[1]));
  out("prof WE1", table(["Item", "US\\$"], [["Revenue", rev], ...costs.map(([l, v]) => [l, -v]), ["Total costs", -tc], ["Profit", f.profit(rev, tc)]]));
  const p = 18000, paid = 7000;
  out("prof WE2", `retained ${p - paid}`);
}

// ---- income statement
{
  const rev = 48000, open = 5000, purch = 30000, close = 6000;
  const cos = f.costOfSales(open, purch, close);
  const gp = f.grossProfit(rev, cos);
  const ex = [["Rent", 4800], ["Wages", 6000], ["Electricity", 1200], ["Transport", 900]];
  const te = sum(ex.map((e) => e[1]));
  const np = f.profitFromGross(gp, te);
  out("is WE1", statement("Mutare Hardware: income statement for the year ended 31 December", [
    ["Revenue (sales)", null, rev],
    ["Opening inventory", open],
    ["Add purchases", purch],
    ["", open + purch],
    ["Less closing inventory", -close],
    ["Cost of sales", null, -cos],
    ["Gross profit", null, gp],
    ["Less expenses:", null],
    ...ex.map(([l, v]) => [l, v]),
    ["Total expenses", null, -te],
    ["Profit for the year", null, np],
  ], { checks: [["cos", cos, 29000], ["gp", gp, rev - cos], ["np", np, gp - te]] }) + `\nGP margin ${round(f.grossMargin(gp, rev), 1)} profit margin ${round(f.profitMargin(np, rev), 1)}`);
  const y = [["Revenue", 60000, 72000], ["Cost of sales", 36000, 46800], ["Gross profit", 24000, 25200], ["Expenses", 15000, 16200], ["Profit", 9000, 9000]];
  check("y1", 60000 - 36000, 24000); check("y2", 72000 - 46800, 25200); check("p1", 24000 - 15000, 9000); check("p2", 25200 - 16200, 9000);
  out("is WE2", table(["US\\$", "Year 1", "Year 2"], y) + `\nGPM ${round(f.grossMargin(24000, 60000), 1)} ${round(f.grossMargin(25200, 72000), 1)} PM ${round(f.profitMargin(9000, 60000), 1)} ${round(f.profitMargin(9000, 72000), 1)}`);
}

// ---- financial position
{
  const nca = [["Premises", 40000], ["Equipment", 12000], ["Vehicle", 8000]];
  const ca = [["Inventory", 6000], ["Trade receivables (debtors)", 3500], ["Cash", 1500]];
  const cl = [["Trade payables (creditors)", 4000], ["Bank overdraft", 1000]];
  const ncl = [["Bank loan (repayable in 5 years)", 15000]];
  const tNca = sum(nca.map((x) => x[1])), tCa = sum(ca.map((x) => x[1])), tCl = sum(cl.map((x) => x[1])), tNcl = sum(ncl.map((x) => x[1]));
  const ta = tNca + tCa, tl = tCl + tNcl, net = ta - tl;
  const eq = [["Share capital", 40000], ["Retained profit", 11000]];
  const tEq = sum(eq.map((x) => x[1]));
  out("fp WE1", statement("Gweru Engineering Ltd: statement of financial position at 31 December", [
    ["Non-current assets", null],
    ...nca,
    ["Total non-current assets", null, tNca],
    ["Current assets", null],
    ...ca,
    ["Total current assets", null, tCa],
    ["Total assets", null, ta],
    ["Current liabilities", null],
    ...cl,
    ["Total current liabilities", null, -tCl],
    ["Non-current liabilities", null],
    ...ncl,
    ["Total non-current liabilities", null, -tNcl],
    ["Net assets", null, net],
    ["Equity (capital)", null],
    ...eq,
    ["Total equity", null, tEq],
  ], { checks: [["nca", tNca, 60000], ["ca", tCa, 11000], ["ta", ta, 71000], ["net", net, tEq]] }) + `\nWC ${f.workingCapital(tCa, tCl)} CE ${tEq + tNcl} = ${ta - tCl}`);
  const open = 9000, prof = 4500, draw = 2400;
  out("fp WE2", `closing capital ${open + prof - draw}`);
}

// ---- trading calculations
{
  const open = 3000, purch = 18000, close = 5000, turnover = 20000, exp = 2600;
  const cos = f.costOfSales(open, purch, close), gp = turnover - cos, np = gp - exp;
  const avg = f.averageStock(open, close), rst = f.rateOfStockTurnover(cos, open, close);
  out("tc WE1", `cos ${cos} gp ${gp} np ${np} avg ${avg} rst ${rst} markup ${f.markUp(gp, cos)} margin ${f.grossMargin(gp, turnover)}`);
  out("tc WE2", `mu50 -> margin ${round(f.marginFromMarkUp(50), 1)}; margin 25 -> mu ${round(f.markUpFromMargin(25), 1)}; cost 80 mu 25 -> price ${80 * 1.25}, margin ${f.grossMargin(20, 100)}`);
  out("tc WE3", `turnover 12000 margin 30 -> gp ${12000 * 0.3} cos ${12000 * 0.7}`);
}

// ---- profitability ratios
{
  const A = { rev: 120000, gp: 48000, p: 18000, ce: 150000 };
  const B = { rev: 150000, gp: 54000, p: 15000, ce: 160000 };
  for (const [k, x] of [["Y1", A], ["Y2", B]]) out(`pr ${k}`, `GPM ${round(f.grossMargin(x.gp, x.rev), 1)} PM ${round(f.profitMargin(x.p, x.rev), 1)} ROCE ${round(f.roce(x.p, x.ce), 1)}`);
  out("pr WE2 table", table(["", "Year 1", "Year 2"], [["Revenue (US\\$)", A.rev, B.rev], ["Gross profit (US\\$)", A.gp, B.gp], ["Profit (US\\$)", A.p, B.p], ["Capital employed (US\\$)", A.ce, B.ce]]));
}

// ---- liquidity ratios
{
  const inv = 10000, rec = 8000, cash = 6000, cl = 12000;
  const ca = inv + rec + cash;
  out("lr WE1", `CA ${ca} current ${round(f.current(ca, cl), 2)} acid ${round(f.acidTest(ca, inv, cl), 2)}`);
  const X = { ca: 30000, inv: 21000, cl: 15000 }, Y = { ca: 18000, inv: 4000, cl: 12000 };
  out("lr WE2", `X ${round(f.current(X.ca, X.cl), 2)} ${round(f.acidTest(X.ca, X.inv, X.cl), 2)}; Y ${round(f.current(Y.ca, Y.cl), 2)} ${round(f.acidTest(Y.ca, Y.inv, Y.cl), 2)}`);
}

// ---- efficiency
{
  const a = f.labourProductivity(1800, 12), bb = f.labourProductivity(1700, 10);
  out("eff", `before ${a} after ${bb} change ${round(((bb - a) / a) * 100, 1)}%`);
  const out1 = 960, w1 = 8, wage = 120;
  out("eff WE2", `lp ${out1 / w1}; labour cost per unit ${r2((w1 * wage) / out1)}; after 1200: ${r2((w1 * wage) / 1200)}`);
}

// ---- purchasing
{
  const A = { price: 4.2, del: 60, q: 500 }, B = { price: 4.0, del: 180, q: 500 };
  out("pur WE1", `A ${r2(A.price * A.q + A.del)} B ${r2(B.price * B.q + B.del)}`);
  out("pur WE2", `daily use 30 lead 5 buffer 50 -> reorder ${30 * 5 + 50}`);
}

// ---- costs
{
  const fc = 2000, vc = 3;
  for (const q of [500, 1000, 2000]) {
    const tvc = f.totalVariableCost(vc, q), tc = f.totalCost(fc, tvc);
    out(`cost q${q}`, `tvc ${tvc} tc ${tc} ac ${f.averageCost(tc, q)}`);
  }
  out("cost WE3", `order 300 at price 5.50: revenue ${300 * 5.5} extra cost ${300 * 3} gain ${300 * 5.5 - 300 * 3}`);
}

// ---- economies of scale
{
  const rows = [[1000, 4000, 2.5], [5000, 6000, 2.1], [20000, 10000, 1.9]];
  out("eos", table(["Output (bags a month)", "Fixed costs US\\$", "Variable cost per bag US\\$", "Total cost US\\$", "Average cost per bag US\\$"], rows.map(([q, fc, vc]) => {
    const tc = f.totalCost(fc, f.totalVariableCost(vc, q));
    return [q, fc, vc.toFixed(2), tc, f.averageCost(tc, q).toFixed(2)];
  })));
}

// ---- break-even calculation
{
  const fc = 6000, p = 20, vc = 12, sales = 1000;
  const be = f.breakEvenOutput(fc, p, vc);
  out("be WE1", `contr ${f.contribution(p, vc)} be ${be} rev ${be * p} mos ${f.marginOfSafety(sales, be)} mos% ${round((f.marginOfSafety(sales, be) / sales) * 100, 1)} profit ${sales * p - fc - sales * vc}`);
  out("be WE2", `p22 ${f.breakEvenOutput(fc, 22, vc)} fc7200 ${f.breakEvenOutput(7200, p, vc)} vc14 ${f.breakEvenOutput(fc, p, 14)}`);
  out("be WE3", `fc 5000 p 9 vc 5.5 -> ${f.breakEvenOutput(5000, 9, 5.5)} round up ${Math.ceil(f.breakEvenOutput(5000, 9, 5.5))}`);
}

// ---- break-even chart
{
  const t = breakEvenTable({ fixed: 4000, price: 10, vcPerUnit: 6, outputs: [0, 500, 1000, 1500, 2000], mustHit: true });
  out("bec WE1", t.md + `\nBE ${t.breakEven}; profit 1500: ${1500 * 10 - (4000 + 1500 * 6)}; loss 500: ${500 * 10 - (4000 + 500 * 6)}`);
  const t2 = breakEvenTable({ fixed: 4000, price: 12, vcPerUnit: 6, outputs: [0, 500, 1000, 1500, 2000] });
  out("bec WE2", `new BE ${round(t2.breakEven, 1)}; mos at 1500 old ${1500 - 1000} new ${1500 - t2.breakEven}`);
}
