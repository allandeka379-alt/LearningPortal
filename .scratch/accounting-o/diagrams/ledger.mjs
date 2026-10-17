// accounting-o diagrams (fundamentals, ledger, adjustments, verification, partnerships).
// Run: node .scratch/accounting-o/diagrams/ledger.mjs   (helpers shared with accounting-a: .scratch/accounting-a/diagrams/lib.mjs)
// Lessons are hand-edited except where a generator in .scratch/accounting/tables (w*-<folder>-<name>.mjs) exists;
// re-run this script after re-running such a generator (insertBefore is idempotent).
import { D, money, assertEq, waterfall, stacked, publish, publishBefore } from "../../accounting-a/diagrams/lib.mjs";
const F = "accounting-o";
const C = D.C;

// ---------------------------------------------------------------- accounting equation: Tendai's Tuck Shop at 28 December
{
  const bank = 4000, fit = 800, inv = 800, pay = 500, loan = 2000, cap = 3100;
  assertEq(bank + fit + inv, 5600, "assets"); assertEq(pay + loan + cap, 5600, "liab + capital");
  assertEq(3000 + 250 - 150, cap, "capital");
  const svg = stacked(
    [
      { label: "Assets", parts: [{ value: bank, fill: C.fillBlue }, { value: fit, fill: C.fillGreen }, { value: inv, fill: C.fillAmber }] },
      { label: "Capital + liabilities", parts: [{ value: cap, fill: C.fillGrey }, { value: loan, fill: C.fillBlue }, { value: pay, fill: C.fillAmber }] },
    ],
    { w: 600, h: 420, yMax: 6500, yTick: 1000, yLabel: "US$", legend: [] },
  );
  // legend as text because the segments differ per bar
  const key = D.text(70, 14, "Left, bottom to top: bank 4,000; fittings 800; inventory 800.", { size: 13, fill: C.muted }) + D.text(70, 32, "Right, bottom to top: capital 3,100; loan 2,000; trade payables 500.", { size: 13, fill: C.muted });
  const out = svg.replace("</g>\n</svg>", `${key}</g>\n</svg>`);
  const alt = "Tendai's Tuck Shop on 28 December: assets of US$5,600 (bank 4,000, shop fittings 800, inventory 800) equal capital of 3,100 plus a loan of 2,000 and trade payables of 500, which also total US$5,600.";
  await publishBefore(F, "accounting-equation-tuck-shop", out, alt, "Figure: assets equal capital plus liabilities at 28 December", "fundamentals/accounting-equation.md", "## From the equation to a statement of financial position");
}

// ---------------------------------------------------------------- the accounting cycle
{
  const W = 600, H = 320;
  let b = "";
  const stages = [
    ["1 Transaction", "goods bought\non credit"],
    ["2 Source document", "the supplier's\ninvoice"],
    ["3 Subsidiary book", "entered in the\npurchases journal"],
    ["4 Ledger", "debit purchases,\ncredit supplier"],
    ["5 Trial balance", "purchases in the\ndebit column"],
    ["6 Financial statements", "used in the\ncost of sales"],
  ];
  const pos = [[15, 40], [210, 40], [405, 40], [405, 180], [210, 180], [15, 180]];
  stages.forEach(([t, s], i) => {
    const [x, y] = pos[i];
    b += D.node(x, y, 180, 92, `${t}\n${s}`, { fill: i === 5 ? C.fillAmber : C.fillBlue, size: 13 });
  });
  b += D.arrow(195, 86, 210, 86) + D.arrow(390, 86, 405, 86) + D.arrow(495, 132, 495, 180) + D.arrow(405, 226, 390, 226) + D.arrow(210, 226, 195, 226);
  b += D.text(300, 24, "Each stage takes the output of the one before", { anchor: "middle", weight: 700 });
  b += D.text(300, 300, "Balances are carried forward and the cycle starts again in the next period", { anchor: "middle", size: 13, fill: C.muted });
  const alt = "The six stages of the accounting cycle in order: a transaction, its source document, the subsidiary book, the ledger, the trial balance and the financial statements, after which balances are carried forward and the cycle repeats.";
  await publishBefore(F, "accounting-cycle-six-stages", D.svg(W, H, b), alt, "Figure: the six stages of the accounting cycle", "fundamentals/accounting-cycle.md", "## A full month through the cycle");
}

// ---------------------------------------------------------------- rules of debit and credit
{
  const W = 600, H = 330;
  let b = "";
  b += D.line(40, 70, 560, 70, { width: 3 }) + D.line(300, 70, 300, 300, { width: 3 });
  b += D.text(170, 50, "DEBIT (left side)", { anchor: "middle", size: 17, weight: 700, fill: C.blue }) + D.text(430, 50, "CREDIT (right side)", { anchor: "middle", size: 17, weight: 700, fill: C.amber });
  b += D.text(60, 108, "Increases", { weight: 700 }) + D.text(60, 132, "Assets, expenses,\ndrawings", {});
  b += D.text(60, 202, "Decreases", { weight: 700, fill: C.muted }) + D.text(60, 226, "Liabilities, capital,\nincome", { fill: C.muted });
  b += D.text(320, 108, "Increases", { weight: 700 }) + D.text(320, 132, "Liabilities, capital,\nincome", {});
  b += D.text(320, 202, "Decreases", { weight: 700, fill: C.muted }) + D.text(320, 226, "Assets, expenses,\ndrawings", { fill: C.muted });
  b += D.text(300, 322, "Every transaction: one debit and one credit of the same amount", { anchor: "middle", size: 13, fill: C.muted });
  const alt = "The rule of debit and credit on a T account: debit entries increase assets, expenses and drawings and decrease liabilities, capital and income; credit entries increase liabilities, capital and income and decrease assets, expenses and drawings.";
  await publish(F, "debit-credit-rules-t-account", D.svg(W, H, b), alt, "Figure: which side of a T account increases each type of account", "ledger/double-entry.md", "## The rules of debit and credit");
}

// ---------------------------------------------------------------- divisions of the ledger
{
  const W = 600, H = 330;
  let b = "";
  b += D.node(60, 10, 480, 56, "Books of prime entry\nsales, purchases and returns journals, cash books, general journal", { fill: C.fillGrey, size: 13 });
  const cols = [
    [10, "Sales ledger\n(trade receivables)", "One account per credit\ncustomer. Usually a\ndebit balance: the\ncustomer owes us", C.fillBlue],
    [210, "General ledger\n(nominal)", "Sales, purchases, expenses,\nincome, non-current assets,\ninventory, capital, drawings,\nloans", C.fillGreen],
    [410, "Purchases ledger\n(trade payables)", "One account per credit\nsupplier. Usually a\ncredit balance: we owe\nthe supplier", C.fillAmber],
  ];
  cols.forEach(([x, t, s, f]) => {
    b += D.node(x, 130, 180, 56, t, { fill: f, size: 14 });
    b += D.rect(x, 196, 180, 100, { fill: "#ffffff", stroke: C.grid, width: 1.4, r: 6 }) + D.text(x + 90, 218, s, { anchor: "middle", size: 13 });
    b += D.arrow(300, 66, x + 90, 130, { stroke: C.muted, width: 1.5 });
  });
  b += D.tag(300, 118, "Posted to the ledger divisions", { anchor: "middle", size: 13, fill: C.muted });
  const alt = "The ledger is divided into three parts: the sales ledger holds each credit customer's account (normally a debit balance), the purchases ledger holds each credit supplier's account (normally a credit balance), and the general ledger holds all other accounts; all are posted from the books of prime entry.";
  await publish(F, "ledger-divisions", D.svg(W, H, b), alt, "Figure: the three divisions of the ledger", "ledger/divisions.md", "## The three main divisions");
}

// ---------------------------------------------------------------- closing entries: income statement for Tendai's Hardware
{
  const sales = 48600, os = 4200, pur = 31250, cs = 5150, wages = 6800, rent = 3600, elec = 1150;
  const cos = os + pur - cs, gp = sales - cos, exp = wages + rent + elec, np = gp - exp;
  assertEq(cos, 30300, "cos"); assertEq(gp, 18300, "gp"); assertEq(exp, 11550, "exp"); assertEq(np, 6750, "profit");
  const svg = waterfall(
    [
      { label: "Revenue", value: sales, kind: "total", first: true },
      { label: "Cost of\nsales", value: -cos, kind: "delta" },
      { label: "Gross\nprofit", value: gp, kind: "total" },
      { label: "Wages", value: -wages, kind: "delta" },
      { label: "Rent", value: -rent, kind: "delta" },
      { label: "Electricity", value: -elec, kind: "delta" },
      { label: "Profit for\nthe year", value: np, kind: "total" },
    ],
    { w: 600, h: 400, yMax: 56000, yTick: 10000, yLabel: "US$", padL: 70 },
  );
  const alt = "Income statement for Tendai's Hardware: revenue of US$48,600 less cost of sales of 30,300 (opening inventory 4,200 plus purchases 31,250 less closing inventory 5,150) gives gross profit of 18,300; wages 6,800, rent 3,600 and electricity 1,150 leave a profit for the year of 6,750.";
  await publishBefore(F, "closing-entries-income-statement", svg, alt, "Figure: closing the accounts to the income statement gives a profit of 6,750", "ledger/closing-entries.md", "## Profit and drawings to capital");
}

// ---------------------------------------------------------------- closing entries: capital account
{
  const open = 22000, profit = 6750, draw = 7200;
  assertEq(open + profit - draw, 21550, "closing capital"); assertEq(draw - profit, 450, "fall");
  const svg = waterfall(
    [
      { label: "Capital\n1 Jan", value: open, kind: "total", first: true },
      { label: "Profit", value: profit, kind: "delta" },
      { label: "Drawings", value: -draw, kind: "delta" },
      { label: "Capital\n31 Dec", value: 21550, kind: "total" },
    ],
    { w: 520, h: 380, yMin: 0, yMax: 32000, yTick: 8000, yLabel: "US$" },
  );
  const alt = "Tendai's capital: US$22,000 at 1 January plus profit of 6,750 less drawings of 7,200 gives US$21,550 at 31 December, so capital fell by 450 because he drew out more than he earned.";
  await publishBefore(F, "closing-entries-capital-movement", svg, alt, "Figure: capital rises with profit and falls with drawings", "ledger/closing-entries.md", "## Balances carried down");
}

// ---------------------------------------------------------------- posting and balancing: Chipo's bank account in May
{
  const items = [["Sales\n4 May", 1180], ["Purchases\n9 May", -860], ["Wages\n14 May", -420], ["F. Ncube\n19 May", 640], ["Repairs\n23 May", -275], ["Drawings\n28 May", -300], ["Sales\n30 May", 935]];
  const close = 2350 + items.reduce((a, [, v]) => a + v, 0);
  assertEq(close, 3250, "closing bank"); assertEq(2350 + 1180 + 640 + 935, 5105, "debit total"); assertEq(860 + 420 + 275 + 300, 1855, "credit entries");
  const svg = waterfall(
    [{ label: "Balance\nb/d 1 May", value: 2350, kind: "total", first: true }, ...items.map(([label, value]) => ({ label, value, kind: "delta" })), { label: "Balance\nc/d", value: close, kind: "total" }],
    { w: 640, h: 400, yMax: 4400, yTick: 1000, yLabel: "US$", padL: 62, valSize: 12 },
  );
  const alt = "Chipo's bank account in May: starting from 2,350, receipts of 1,180, 640 and 935 and payments of 860, 420, 275 and 300 in date order leave a closing balance of US$3,250, the balance carried down and brought down on the debit side.";
  await publishBefore(F, "bank-account-balance-may", svg, alt, "Figure: the bank balance moves from 2,350 to 3,250 through May", "ledger/posting-balancing.md", "## The three-column running balance format");
}

// ---------------------------------------------------------------- depreciation: straight line machine (stacked) and reducing balance van
{
  const cost = 18000, resid = 2000, ann = (cost - resid) / 4;
  assertEq(ann, 4000, "annual");
  const cats = [0, 1, 2, 3, 4].map((y) => ({ label: y === 0 ? "Purchase\n1 Jan 2022" : `End ${2021 + y}`, parts: [{ value: ann * y, fill: C.fillAmber }, { value: cost - ann * y, fill: C.fillBlue }].filter((p) => p.value > 0) }));
  assertEq(cost - ann * 4, resid, "NBV y4");
  const svg = stacked(cats, { w: 600, h: 410, yMax: 21000, yTick: 3000, yLabel: "US$", legend: [{ fill: C.fillAmber, label: "Accumulated depreciation" }, { fill: C.fillBlue, label: "Net book value" }], legendW: 230 });
  const alt = "Straight-line depreciation of Farai's cutting machine: cost of US$18,000 is split each year between accumulated depreciation, growing by 4,000 a year to 16,000, and net book value, falling from 14,000 to 10,000, 6,000 and finally the residual value of 2,000.";
  await publishBefore(F, "depreciation-straight-line-machine", svg, alt, "Figure: each year 4,000 of the machine's cost moves from net book value to accumulated depreciation", "adjustments/depreciation-methods.md", "## The reducing-balance method");
}
{
  const cost = 24000;
  let nbv = cost, acc = 0;
  const cats = [{ label: "Purchase\n1 Jan 2023", parts: [{ value: cost, fill: C.fillBlue }] }];
  [2023, 2024, 2025].forEach((y) => {
    const charge = nbv * 0.25; acc += charge; nbv -= charge;
    cats.push({ label: `End ${y}`, parts: [{ value: acc, fill: C.fillAmber }, { value: nbv, fill: C.fillBlue }] });
  });
  assertEq(acc, 13875, "acc dep"); assertEq(nbv, 10125, "nbv");
  const svg = stacked(cats, { w: 600, h: 410, yMax: 27000, yTick: 6000, yLabel: "US$", legend: [{ fill: C.fillAmber, label: "Accumulated depreciation" }, { fill: C.fillBlue, label: "Net book value" }], legendW: 230 });
  const alt = "Reducing-balance depreciation of Rudo's van at 25%: cost of US$24,000 gives charges of 6,000, 4,500 and 3,375, so accumulated depreciation rises to 6,000, 10,500 and 13,875 while net book value falls to 18,000, 13,500 and 10,125, with smaller falls each year.";
  await publishBefore(F, "depreciation-reducing-balance-van", svg, alt, "Figure: the van's depreciation charge shrinks each year under the reducing-balance method", "adjustments/depreciation-methods.md", "## The revaluation method");
}

// ---------------------------------------------------------------- sales and purchases ledger control accounts
{
  const open = 6240, sales = 18750, dis = 345, rec = 16385, disc = 412, ret = 638, bad = 290;
  const close = open + sales + dis - rec - disc - ret - bad;
  assertEq(close, 7610, "closing receivables"); assertEq(open + sales + dis, 25335, "total");
  const svg = waterfall(
    [
      { label: "Balance\n1 Dec", value: open, kind: "total", first: true },
      { label: "Credit\nsales", value: sales, kind: "delta" },
      { label: "Cheque\nreturned", value: dis, kind: "delta" },
      { label: "Receipts", value: -rec, kind: "delta" },
      { label: "Discount\nallowed", value: -disc, kind: "delta" },
      { label: "Returns\ninwards", value: -ret, kind: "delta" },
      { label: "Bad\ndebts", value: -bad, kind: "delta" },
      { label: "Balance\n31 Dec", value: close, kind: "total" },
    ],
    { w: 640, h: 400, yMax: 30000, yTick: 5000, yLabel: "US$", padL: 70, valSize: 12 },
  );
  const alt = "Nyasha's sales ledger control account for December: trade receivables of US$6,240 rise with credit sales of 18,750 and a dishonoured cheque of 345, and fall with receipts of 16,385, discount allowed 412, returns inwards 638 and irrecoverable debts 290, leaving US$7,610.";
  await publishBefore(F, "sales-ledger-control-december", svg, alt, "Figure: how the sales ledger control account moves from 6,240 to 7,610", "verification/sales-ledger-control.md", "## Common mistakes");
}
{
  const open = 5380, pur = 22640, pay = 20155, disc = 497, ret = 865;
  const close = open + pur - pay - disc - ret;
  assertEq(close, 6503, "closing payables"); assertEq(open + pur, 28020, "credit total"); assertEq(pay + disc + ret, 21517, "debit total");
  const svg = waterfall(
    [
      { label: "Balance\n1 Dec", value: open, kind: "total", first: true },
      { label: "Credit\npurchases", value: pur, kind: "delta" },
      { label: "Payments", value: -pay, kind: "delta" },
      { label: "Discount\nreceived", value: -disc, kind: "delta" },
      { label: "Returns\noutwards", value: -ret, kind: "delta" },
      { label: "Balance\n31 Dec", value: close, kind: "total" },
    ],
    { w: 600, h: 400, yMax: 30000, yTick: 5000, yLabel: "US$", padL: 70 },
  );
  const alt = "Thandeka's purchases ledger control account for December: the amount owed to suppliers of US$5,380 rises with credit purchases of 22,640 and falls with payments of 20,155, discount received of 497 and returns outwards of 865, leaving US$6,503 owed.";
  await publishBefore(F, "purchases-ledger-control-december", svg, alt, "Figure: how the amount owed to suppliers moves from 5,380 to 6,503", "verification/purchases-ledger-control.md", "## Common mistakes");
}

// ---------------------------------------------------------------- bank reconciliation (Tatenda)
{
  const cb = 2777, unp = 412 + 1056, unc = 930;
  assertEq(cb + unp - unc, 3315, "bank statement");
  const svg = waterfall(
    [
      { label: "Cash book\nbalance", value: cb, kind: "total", first: true },
      { label: "Unpresented\ncheques", value: unp, kind: "delta" },
      { label: "Uncredited\ndeposit", value: -unc, kind: "delta" },
      { label: "Bank statement\nbalance", value: 3315, kind: "total" },
    ],
    { w: 560, h: 380, yMax: 5000, yTick: 1000, yLabel: "US$" },
  );
  const alt = "Tatenda's bank reconciliation: the updated cash book balance of US$2,777 plus unpresented cheques of 1,468 (412 and 1,056) less the uncredited deposit of 930 equals the bank statement balance of US$3,315.";
  await publishBefore(F, "bank-reconciliation-tatenda", svg, alt, "Figure: reconciling the cash book balance of 2,777 to the bank statement balance of 3,315", "verification/bank-reconciliation.md", "## Overdrafts");
}

// ---------------------------------------------------------------- partnership appropriation (T & N Transport)
{
  const profit = 31620, intDraw = 360 + 240, intCap = 2400 + 1500, sal = 4800;
  const resid = profit + intDraw - intCap - sal;
  assertEq(resid, 23520, "residual"); assertEq(resid * 3 / 5, 14112, "T"); assertEq(resid * 2 / 5, 9408, "N");
  assertEq(0.06 * 40000, 2400, "ic T"); assertEq(0.12 * 6000 * 6 / 12, 360, "id T");
  const svg = waterfall(
    [
      { label: "Profit", value: profit, kind: "total", first: true },
      { label: "Interest on\ndrawings", value: intDraw, kind: "delta" },
      { label: "Interest on\ncapital", value: -intCap, kind: "delta" },
      { label: "Salary\n(Nyasha)", value: -sal, kind: "delta" },
      { label: "Residual\nprofit", value: resid, kind: "total" },
      { label: "Tatenda\n3/5", value: 14112, kind: "total", check: false, noConn: true, fill: C.purple },
      { label: "Nyasha\n2/5", value: 9408, kind: "total", check: false, noConn: true, fill: C.purple },
    ],
    { w: 640, h: 400, yMax: 38000, yTick: 10000, yLabel: "US$", padL: 70 },
  );
  const alt = "Appropriation of T and N Transport's profit of US$31,620: add interest on drawings of 600, deduct interest on capital of 3,900 and Nyasha's salary of 4,800, leaving residual profit of 23,520, shared 3 to 2 as 14,112 for Tatenda and 9,408 for Nyasha.";
  await publishBefore(F, "partnership-appropriation-tn-transport", svg, alt, "Figure: from profit of 31,620 to the partners' shares of the residual profit", "partnerships/appropriation.md", "## When the agreement takes more than the profit");
}

// ---------------------------------------------------------------- accrued income (rent receivable)
{
  const earned = 600 * 12, received = 6600, accrued = earned - received;
  assertEq(accrued, 600, "accrued");
  const svg = waterfall(
    [
      { label: "Rent\nreceived", value: received, kind: "delta" },
      { label: "Accrued at\n31 Dec", value: accrued, kind: "delta" },
      { label: "Rent earned\n2025", value: earned, kind: "total" },
    ],
    { w: 520, h: 360, yMax: 8400, yTick: 2000, yLabel: "US$" },
  );
  const alt = "Rent receivable for 2025: Nyasha received US$6,600 and December's rent of 600 was still owing, so rent earned for the year is US$7,200 (12 months at 600), and the accrued 600 is an asset at 31 December.";
  await publishBefore(F, "rent-receivable-accrued-income", svg, alt, "Figure: rent earned is the cash received plus the accrued income", "adjustments/accrued-prepaid-income.md", "## Why income received in advance is a liability");
}
console.log("accounting-o done");
