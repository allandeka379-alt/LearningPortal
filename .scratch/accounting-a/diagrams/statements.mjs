// accounting-a: verification, valuation, manufacturing, partnership, cash flow, ratios diagrams.
// Run: node .scratch/accounting-a/diagrams/statements.mjs
// Lessons are hand-edited except those with a matching .scratch/accounting-a/tables/w*-<folder>-<name>.mjs generator;
// re-run this script after re-running such a generator (idempotent).
import { D, money, assertEq, waterfall, grouped, publishBefore } from "./lib.mjs";
const F = "accounting-a";

// ---------------------------------------------------------------- sales ledger control account
{
  const open = 18400, sales = 96500, dis = 400, rec = 88200, disc = 1950, ret = 2750, bad = 600, contra = 1200;
  const close = open + sales + dis - rec - disc - ret - bad - contra;
  assertEq(close, 20600, "closing receivables");
  assertEq(open + sales + dis, 115300, "debit total");
  const svg = waterfall(
    [
      { label: "Opening", value: open, kind: "total", first: true },
      { label: "Credit\nsales", value: sales, kind: "delta" },
      { label: "Cheque\nreturned", value: dis, kind: "delta" },
      { label: "Receipts", value: -rec, kind: "delta" },
      { label: "Discount\nallowed", value: -disc, kind: "delta" },
      { label: "Returns\ninwards", value: -ret, kind: "delta" },
      { label: "Bad\ndebts", value: -bad, kind: "delta" },
      { label: "Contra", value: -contra, kind: "delta" },
      { label: "Closing", value: close, kind: "total" },
    ],
    { w: 640, h: 400, yMax: 130000, yTick: 20000, yLabel: "US$", padL: 78, labelSize: 13, valSize: 12 },
  );
  const alt = "Sales ledger control account for 2025: opening receivables of US$18,400 rise with credit sales of 96,500 and a returned cheque of 400, and fall with receipts of 88,200, discount allowed 1,950, returns 2,750, bad debts 600 and a contra of 1,200, leaving closing receivables of US$20,600.";
  await publishBefore(F, "sales-ledger-control-movement", svg, alt, "Figure: how the sales ledger control account moves from 18,400 to 20,600", "verification/control-accounts.md", "## What a control account does and does not detect");
}

// ---------------------------------------------------------------- suspense account cleared
{
  const start = 1300, e1 = -540, e2 = 740, e3 = -1500;
  assertEq(start + e1 + e2 + e3, 0, "suspense cleared");
  const svg = waterfall(
    [
      { label: "Opened\n(debit)", value: start, kind: "total", first: true },
      { label: "Error 1\ncredit 540", value: e1, kind: "delta" },
      { label: "Error 2\ndebit 740", value: e2, kind: "delta" },
      { label: "Error 3\ncredit 1,500", value: e3, kind: "delta" },
      { label: "Balance", value: 0, kind: "total" },
    ],
    { w: 560, h: 380, yMax: 1800, yTick: 300, yLabel: "Suspense balance (US$, debit)" },
  );
  const alt = "Clearing Rudo's suspense account: the debit balance of US$1,300 falls to 760 after crediting 540 for error 1, rises to 1,500 after debiting 740 for error 2, and falls to nil after crediting 1,500 for error 3, so every error has been found.";
  await publishBefore(F, "suspense-account-cleared", svg, alt, "Figure: the suspense balance of 1,300 is cleared to nil by three corrections", "verification/suspense.md", "## Corrected profit and working capital");
}

// ---------------------------------------------------------------- inventory: four methods split goods available for sale
{
  const avail = 1200 + 2600 + 2250;
  assertEq(avail, 6050, "goods available");
  const fifoCl = 1500, fifoCogs = 1850 + 2700;
  const avcoPerp = { cl: (3800 / 300) * 150 + 0, cogs: 0 };
  const avg1 = 3800 / 300;
  const cogs1 = 150 * avg1, val1 = 150 * avg1 + 2250, avg2 = val1 / 300, cogs2 = 200 * avg2, cl2 = 100 * avg2;
  const avcoP = { cl: cl2, cogs: cogs1 + cogs2 };
  const avgP = avail / 450, avcoPer = { cl: 100 * avgP, cogs: avail - 100 * avgP };
  assertEq(fifoCogs, 4550, "fifo cogs"); assertEq(fifoCogs + fifoCl, avail, "fifo split");
  assertEq(avcoP.cl, 1383.33, "avco perpetual closing"); assertEq(avcoP.cogs, 4666.67, "avco perpetual cogs");
  assertEq(avcoPer.cl, 1344.44, "avco periodic closing"); assertEq(avcoPer.cogs, 4705.56, "avco periodic cogs");
  const r2 = (v) => Math.round(v * 100) / 100;
  const g = (label, cl, cogs) => ({ label, bars: [{ value: r2(cl), fill: D.C.blue }, { value: r2(cogs), fill: D.C.amber }] });
  const svg = grouped(
    [g("FIFO\nperpetual", fifoCl, fifoCogs), g("FIFO\nperiodic", fifoCl, fifoCogs), g("AVCO\nperpetual", avcoP.cl, avcoP.cogs), g("AVCO\nperiodic", avcoPer.cl, avcoPer.cogs)].map((x) => x),
    { w: 640, h: 420, yMax: 5600, yTick: 1000, yLabel: "US$ (goods available for sale 6,050)", legend: [{ fill: D.C.blue, label: "Closing inventory" }, { fill: D.C.amber, label: "Cost of goods sold" }], legendW: 190, valSize: 13, padL: 70 },
  );
  const alt = "Cement bags under four costing methods: the 6,050 of goods available is split into closing inventory and cost of goods sold as 1,500 and 4,550 for FIFO (perpetual or periodic), 1,383.33 and 4,666.67 for perpetual AVCO, and 1,344.44 and 4,705.56 for periodic AVCO.";
  await publishBefore(F, "inventory-methods-split", svg, alt, "Figure: FIFO and AVCO split the same 6,050 of goods differently", "valuation/inventory.md", "## Rising and falling prices");
}

// ---------------------------------------------------------------- manufacturing cost build-up
{
  const rm = 14200 + 96500 + 2300 - 1800 - 16700;
  const prime = rm + 58000 + 3500, oh = 12400 + 9200 + 6500 + 12000 + 2100, factory = prime + oh, cop = factory + 7300 - 8900;
  assertEq(rm, 94500, "rm"); assertEq(prime, 156000, "prime"); assertEq(oh, 42200, "overheads"); assertEq(factory, 198200, "factory"); assertEq(cop, 196600, "cost of production");
  assertEq(cop / 2000, 98.3, "cost per chair");
  const svg = waterfall(
    [
      { label: "Materials\nconsumed", value: rm, kind: "delta" },
      { label: "Direct\nlabour", value: 58000, kind: "delta" },
      { label: "Royalties", value: 3500, kind: "delta" },
      { label: "Prime\ncost", value: prime, kind: "total" },
      { label: "Factory\noverheads", value: oh, kind: "delta" },
      { label: "Opening\nWIP", value: 7300, kind: "delta" },
      { label: "Closing\nWIP", value: -8900, kind: "delta" },
      { label: "Cost of\nproduction", value: cop, kind: "total" },
    ],
    { w: 640, h: 410, yMax: 240000, yTick: 40000, yLabel: "US$", padL: 78 },
  );
  const alt = "Manufacturing account for Mutasa Furniture: materials consumed 94,500, direct labour 58,000 and royalties 3,500 make prime cost 156,000; adding factory overheads of 42,200 and opening work in progress 7,300 and deducting closing work in progress 8,900 gives cost of production of 196,600.";
  await publishBefore(F, "manufacturing-cost-build-up", svg, alt, "Figure: from raw materials to a cost of production of 196,600", "manufacturing/account.md", "## Apportioning shared expenses");
}

// ---------------------------------------------------------------- partnership appropriation
{
  const profit = 38420, intDraw = 450 + 375, sal = 6000, intCap = 2400 + 1500;
  const resid = profit + intDraw - sal - intCap;
  assertEq(resid, 29345, "residual");
  assertEq(Math.round(resid * 0.6), 17607, "Tendai"); assertEq(Math.round(resid * 0.4), 11738, "Rudo");
  assertEq(0.06 * 40000, 2400, "int cap T"); assertEq(0.06 * 25000, 1500, "int cap R");
  const svg = waterfall(
    [
      { label: "Profit", value: profit, kind: "total", first: true },
      { label: "Interest on\ndrawings", value: intDraw, kind: "delta" },
      { label: "Salary\n(Tendai)", value: -sal, kind: "delta" },
      { label: "Interest on\ncapital", value: -intCap, kind: "delta" },
      { label: "Residual\nprofit", value: resid, kind: "total" },
      { label: "Tendai\n3/5", value: 17607, kind: "total", check: false, noConn: true, fill: D.C.purple },
      { label: "Rudo\n2/5", value: 11738, kind: "total", check: false, noConn: true, fill: D.C.purple },
    ],
    { w: 640, h: 400, yMax: 46000, yTick: 10000, yLabel: "US$", padL: 70 },
  );
  const alt = "Appropriation of Tendai and Rudo's profit of US$38,420: add interest on drawings 825, deduct Tendai's salary 6,000 and interest on capital 3,900, leaving residual profit of 29,345, shared 3 to 2 as 17,607 for Tendai and 11,738 for Rudo.";
  await publishBefore(F, "partnership-appropriation-flow", svg, alt, "Figure: from profit of 38,420 to the partners' shares of the residual profit", "partnership/accounts.md", "## Fixed and fluctuating capital accounts");
}

// ---------------------------------------------------------------- statement of cash flows
{
  const op = 82000, inv = -76100, fin = 27000, open = -6500;
  assertEq(74600 + 28500 + 2900 + 5400 - 7300 - 4800 + 5600, 104900, "cash generated");
  assertEq(104900 - 5400 - 17500, op, "operating");
  assertEq(-84000 + 7900, inv, "investing");
  assertEq(60000 - 20000 - 13000, fin, "financing");
  assertEq(op + inv + fin, 32900, "net increase");
  assertEq(open + 32900, 26400, "closing cash");
  const svg = waterfall(
    [
      { label: "Cash at\n1 Jan", value: open, kind: "total", first: true },
      { label: "Operating", value: op, kind: "delta" },
      { label: "Investing", value: inv, kind: "delta" },
      { label: "Financing", value: fin, kind: "delta" },
      { label: "Cash at\n31 Dec", value: 26400, kind: "total" },
    ],
    { w: 560, h: 400, yMin: -20000, yMax: 80000, yTick: 20000, yLabel: "US$", padL: 70 },
  );
  const alt = "Kadoma Cotton statement of cash flows for 2025: cash and cash equivalents start at an overdraft of US$6,500, operating activities add 82,000, investing activities use 76,100 and financing adds 27,000, so the net increase is 32,900 and the year ends with 26,400.";
  await publishBefore(F, "cash-flow-three-activities", svg, alt, "Figure: operating, investing and financing cash flows take cash from −6,500 to 26,400", "company/cash-flow-statement.md", "## Sole proprietors and partnerships (ZIMSEC)");
}

// ---------------------------------------------------------------- liquidity ratios, two years
{
  const d = { y24: { ca: 91000, inv: 46000, cl: 50000 }, y25: { ca: 124000, inv: 69000, cl: 90000 } };
  const cr = (x) => Math.round((x.ca / x.cl) * 100) / 100, at = (x) => Math.round(((x.ca - x.inv) / x.cl) * 100) / 100;
  assertEq(cr(d.y24), 1.82, "cr24"); assertEq(cr(d.y25), 1.38, "cr25"); assertEq(at(d.y24), 0.9, "at24"); assertEq(at(d.y25), 0.61, "at25");
  const f2 = (v) => v.toFixed(2) + " : 1";
  const svg = grouped(
    [
      { label: "Current ratio", bars: [{ value: cr(d.y24), fill: D.C.blue, text: f2(cr(d.y24)) }, { value: cr(d.y25), fill: D.C.amber, text: f2(cr(d.y25)) }] },
      { label: "Acid test ratio", bars: [{ value: at(d.y24), fill: D.C.blue, text: f2(at(d.y24)) }, { value: at(d.y25), fill: D.C.amber, text: f2(at(d.y25)) }] },
    ],
    { w: 560, h: 400, yMax: 2.2, yTick: 0.5, yLabel: "Times (x : 1)", legend: [{ fill: D.C.blue, label: "2024" }, { fill: D.C.amber, label: "2025" }], legendW: 100, valSize: 14 },
  );
  const alt = "Liquidity of Zvishavane Millers: the current ratio fell from 1.82 : 1 in 2024 to 1.38 : 1 in 2025 and the acid test ratio from 0.90 : 1 to 0.61 : 1, so the mill had only 61 cents of liquid assets for each dollar of short-term debt.";
  await publishBefore(F, "liquidity-ratios-two-years", svg, alt, "Figure: current and acid test ratios for 2024 and 2025", "ratios/liquidity.md", "## What changes a liquidity ratio");
}
console.log("statements done");
