// accounting-a ledger lessons diagrams. Run: node .scratch/accounting-a/diagrams/ledger.mjs
// Lesson files are hand-edited (not regenerated) apart from the w*-ledger-*.mjs table scripts in .scratch/accounting-a/tables:
// if one of those is re-run, re-run this script afterwards (insertAfter is idempotent).
import { D, money, assertEq, waterfall, grouped, publish, publishBefore } from "./lib.mjs";
const F = "accounting-a";

// ---------------------------------------------------------------- double entry: accounting equation at 31 March
{
  const bank = 7280, equip = 3600, recv = 300, pay = 250, cap = 10000, profit = 1230, draw = 300;
  const assets = bank + equip + recv;
  const capital = cap + profit - draw;
  assertEq(assets, 11180, "assets");
  assertEq(capital, 10930, "capital");
  assertEq(assets, capital + pay, "equation");
  const W = 600, H = 400, base = 350, top = 40, scale = (base - top) / assets;
  const seg = (x, from, v, label, fill) => {
    const y = base - (from + v) * scale, hh = v * scale;
    return D.rect(x, y, 110, hh, { fill, stroke: "#ffffff", width: 1.5 }) + D.text(x + 122, y + hh / 2 + 5, label, { size: 14 });
  };
  let b = "";
  b += seg(30, 0, bank, `Bank ${money(bank)}`, D.C.fillBlue) + seg(30, bank, equip, `Equipment ${money(equip)}`, D.C.fillGreen) + seg(30, bank + equip, recv, `Receivable ${money(recv)}`, D.C.fillAmber);
  b += seg(330, 0, capital, `Capital ${money(capital)}`, D.C.fillGrey) + seg(330, capital, pay, `Payable ${money(pay)}`, D.C.fillAmber);
  b += D.line(20, base, 480, base, { stroke: D.C.axis, width: 1.6 });
  b += D.text(85, base + 24, "Assets", { anchor: "middle", weight: 700 }) + D.text(385, base + 24, "Capital + liabilities", { anchor: "middle", weight: 700 });
  b += D.text(85, top - 12, `US$${money(assets)}`, { anchor: "middle", weight: 700, fill: D.C.blue }) + D.text(385, top - 12, `US$${money(capital + pay)}`, { anchor: "middle", weight: 700, fill: D.C.blue });
  b += D.text(237, top + 40, "=", { anchor: "middle", size: 40, weight: 700 });
  b += D.text(300, H - 8, "Capital = 10,000 + profit 1,230 − drawings 300", { anchor: "middle", size: 13, fill: D.C.muted });
  const alt = "Accounting equation for Rudo's poultry business at 31 March: assets of US$11,180 (bank 7,280, equipment 3,600, receivable 300) equal capital of US$10,930 plus a payable of US$250; capital is 10,000 invested plus profit 1,230 less drawings 300.";
  await publishBefore(F, "double-entry-equation-31-march", D.svg(W, H, b), alt, "Figure: assets equal capital plus liabilities for Rudo at 31 March", "ledger/double-entry.md", "## Returns, carriage and discounts");
}

// ---------------------------------------------------------------- books of prime entry to final accounts
{
  const W = 600, H = 640;
  let b = "";
  const box = (x, y, w, h, t, f = D.C.fillBlue, o = {}) => D.node(x, y, w, h, t, { fill: f, ...o });
  b += box(150, 10, 300, 44, "Source documents\ninvoices, credit and debit notes, receipts, memos", D.C.fillGrey, { size: 13 });
  b += D.rect(10, 84, 580, 170, { fill: "#fbfaf8", stroke: D.C.muted, width: 1.4 });
  b += D.arrow(300, 54, 300, 84, { stroke: D.C.ink });
  b += D.text(300, 106, "Books of prime entry (first record)", { anchor: "middle", size: 14, weight: 700 });
  const books = ["Sales\njournal", "Sales returns\njournal", "Purchases\njournal", "Purchases returns\njournal", "Cash book", "General\njournal"];
  books.forEach((t, i) => {
    const x = 20 + (i % 3) * 195, y = 120 + Math.floor(i / 3) * 62;
    b += box(x, y, 170, 48, t, D.C.fillBlue, { size: 14 });
  });
  b += box(20, 296, 170, 56, "Sales ledger\n(customers' accounts)", D.C.fillGreen);
  b += box(215, 296, 170, 56, "General ledger\n(all other accounts)", D.C.fillGreen);
  b += box(410, 296, 170, 56, "Purchases ledger\n(suppliers' accounts)", D.C.fillGreen);
  [105, 300, 495].forEach((x) => (b += D.arrow(x, 254, x, 296, { stroke: D.C.muted, width: 1.4 })));
  b += D.tag(300, 281, "Items posted one by one; totals to the control accounts", { anchor: "middle", size: 13, fill: D.C.muted });
  b += box(150, 394, 300, 48, "Trial balance\n(debit and credit totals agree)", D.C.fillAmber);
  [105, 300, 495].forEach((x) => (b += D.arrow(x, 352, 300, 394, { stroke: D.C.muted, width: 1.4 })));
  b += box(150, 486, 300, 48, "Adjustments\naccruals, depreciation, closing inventory", D.C.fillGrey, { size: 13 });
  b += D.arrow(300, 442, 300, 486, { stroke: D.C.ink });
  b += box(40, 578, 230, 48, "Statement of\nprofit or loss", D.C.fillBlue);
  b += box(330, 578, 230, 48, "Statement of\nfinancial position", D.C.fillBlue);
  b += D.arrow(260, 534, 155, 578) + D.arrow(340, 534, 445, 578);
  const alt = "Flow from the first record to the final accounts: source documents are entered in the six books of prime entry, posted to the sales, general and purchases ledgers, listed in a trial balance, adjusted, and used to prepare the statement of profit or loss and the statement of financial position.";
  await publish(F, "books-prime-entry-to-final-accounts", D.svg(W, H, b), alt, "Figure: from source documents to the final accounts", "ledger/books-prime-entry.md", "## Source documents and books");
}

// ---------------------------------------------------------------- trial balance: what it proves, finding a difference
{
  const W = 600, H = 330;
  const debit = 96150, credit = 96240, diff = credit - debit;
  assertEq(diff, 90, "difference");
  assertEq(diff % 9, 0, "divisible by 9");
  assertEq(18430 - 18340, 90, "transposition");
  let b = "";
  b += D.text(300, 24, "Hardware shop trial balance: credits exceed debits", { anchor: "middle", weight: 700 });
  b += D.node(40, 44, 220, 52, `Debit total\nUS$${money(debit)}`, { fill: D.C.fillBlue });
  b += D.node(340, 44, 220, 52, `Credit total\nUS$${money(credit)}`, { fill: D.C.fillBlue });
  b += D.text(300, 76, "≠", { anchor: "middle", size: 30, weight: 700, fill: D.C.red });
  b += D.arrow(300, 100, 300, 124, { stroke: D.C.ink });
  b += D.node(150, 124, 300, 44, `Difference = US$${diff}`, { fill: D.C.fillAmber });
  b += D.arrow(300, 168, 300, 192);
  b += D.node(110, 192, 380, 44, `${diff} ÷ 9 = ${diff / 9}: digits may be transposed`, { fill: D.C.fillGrey });
  b += D.arrow(300, 236, 300, 260);
  b += D.node(60, 260, 480, 52, "Purchases 18,430 copied as 18,340 (90 too low on the debit side).\nCorrect it and both columns agree at US$96,240", { fill: D.C.fillGreen, size: 13 });
  const alt = "Finding a trial balance difference: debits of US$96,150 and credits of US$96,240 differ by US$90; 90 divides by 9, so a transposition is suspected, and purchases of 18,430 copied as 18,340 explain it, after which both columns agree at US$96,240.";
  await publishBefore(F, "trial-balance-find-difference", D.svg(W, H, b), alt, "Figure: tracing a US$90 trial balance difference to a transposed figure", "ledger/trial-balance.md", "## From trial balance to final accounts");
}

// ---------------------------------------------------------------- accruals/prepayments: rent expense for 2025
{
  const open = 380, paid = 4940, close = 760, expense = open + paid - close;
  assertEq(expense, 4560, "rent expense");
  assertEq(12 * 380, 4560, "12 months");
  const svg = waterfall(
    [
      { label: "Prepaid\n1 Jan", value: open, kind: "delta" },
      { label: "Rent paid\nin 2025", value: paid, kind: "delta" },
      { label: "Prepaid\n31 Dec", value: -close, kind: "delta" },
      { label: "Rent expense\n2025", value: expense, kind: "total" },
    ],
    { w: 560, h: 380, yMax: 6000, yTick: 1000, yLabel: "US$" },
  );
  const alt = "Rent expense for 2025 at Gweru Motor Spares: the opening prepayment of US$380 plus rent paid of US$4,940 less the closing prepayment of US$760 gives the expense of US$4,560, which is twelve months at US$380.";
  await publishBefore(F, "rent-prepayment-expense-build", svg, alt, "Figure: building the rent expense from cash paid and the prepayments", "ledger/accruals-prepayments.md", "## Effect on profit and on the statements");
}

// ---------------------------------------------------------------- depreciation: straight line carrying amount (oven)
{
  const cost = 18500, resid = 2500, life = 5, ann = (cost - resid) / life;
  assertEq(ann, 3200, "SL charge");
  const cv = (y) => cost - ann * y;
  assertEq(cv(1), 15300, "y1"); assertEq(cv(5), 2500, "y5");
  const ax = D.axes({ x: [0, 5.4], y: [0, 20000], xTicks: [0, 1, 2, 3, 4, 5], yTicks: 5000, xLabel: "Years from 1 Jan 2023", yLabel: "US$", w: 560, h: 380 });
  let b = ax.frame;
  b += ax.line([[0, cv(0)], [5, cv(5)]], { stroke: D.C.blue });
  for (let y = 0; y <= 5; y += 1) b += ax.point(y, cv(y));
  b += ax.line([[0, resid], [5.2, resid]], { stroke: D.C.muted, width: 1.6, dash: true });
  const lab = (y, t) => ax.tag(y, cv(y), t, { dx: y === 5 ? -14 : 12, dy: y === 5 ? 34 : -8 });
  b += lab(0, "Cost 18,500") + lab(1, "15,300") + lab(2, "12,100") + lab(3, "8,900") + lab(4, "5,700") + lab(5, "2,500");
  b += ax.tag(0.1, resid - 600, "Residual value 2,500 (dashed line)", { fill: D.C.muted });
  const alt = "Straight-line depreciation of Chipo's oven: carrying amount falls by the same US$3,200 every year, from cost of US$18,500 to 15,300, 12,100, 8,900, 5,700 and finally the residual value of US$2,500 after five years.";
  await publishBefore(F, "depreciation-straight-line-oven", D.svg(560, 380, b), alt, "Figure: straight-line depreciation takes the oven from 18,500 to its residual value of 2,500", "ledger/depreciation.md", "## Part-year and additions");
}

// ---------------------------------------------------------------- depreciation: straight line vs reducing balance (pick-up), annual charge
{
  const cost = 24000;
  const sl = [4800, 4800, 4800];
  const rb = []; let c = cost;
  for (let y = 0; y < 3; y += 1) { rb.push(c * 0.25); c = c * 0.75; }
  assertEq(rb[0], 6000, "rb1 charge"); assertEq(rb[1], 4500, "rb2 charge"); assertEq(rb[2], 3375, "rb3 charge");
  assertEq(c, 10125, "rb carrying y3");
  assertEq(rb.reduce((a, v) => a + v, 0), 13875, "rb total");
  assertEq(sl.reduce((a, v) => a + v, 0), 14400, "sl total");
  assertEq(cost - 14400, 9600, "sl carrying y3");
  const svg = grouped(
    sl.map((v, i) => ({ label: `Year ${i + 1}`, bars: [{ value: v, fill: D.C.blue }, { value: rb[i], fill: D.C.amber }] })),
    { w: 580, h: 400, yMax: 7500, yTick: 1500, yLabel: "Annual depreciation charge (US$)", legend: [{ fill: D.C.blue, label: "Straight line, 20% of cost" }, { fill: D.C.amber, label: "Reducing balance, 25%" }], legendW: 250, padL: 70 },
  );
  const alt = "Annual depreciation on the 24,000 pick-up: straight line at 20% of cost charges 4,800 every year, while reducing balance at 25% charges 6,000, 4,500 and 3,375; over three years that is 14,400 against 13,875, leaving carrying amounts of 9,600 and 10,125.";
  await publishBefore(F, "depreciation-sl-vs-reducing-balance", svg, alt, "Figure: annual charge on the pick-up, straight line against reducing balance", "ledger/depreciation.md", "## Part-year and additions");
}

console.log("ledger done");
