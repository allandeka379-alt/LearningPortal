// Lesson: manufacturing.statements
import { money, fmt, chk, r2, sum, statement, trialBalance, check } from "../lib.mjs";
import { writeLesson, U, mfg } from "./w2b-lib.mjs";

// Example 1: Tendai Carpentry (sole trader)
const tb = trialBalance("Trial balance of Tendai Carpentry at 31 December 2025", [
  ["Inventories at 1 January 2025: raw materials", 12000, null], ["Inventories at 1 January 2025: work in progress", 6500, null], ["Inventories at 1 January 2025: finished goods", 18000, null],
  ["Purchases of raw materials", 84000, null], ["Carriage inwards", 2000, null], ["Manufacturing wages", 52000, null], ["Factory power", 7800, null], ["Factory rent and rates", 14000, null],
  ["Machinery at cost", 90000, null], ["Office equipment at cost", 20000, null], ["Selling and distribution expenses", 15300, null], ["Administration expenses (including insurance)", 28700, null],
  ["Trade receivables", 21500, null], ["Bank", 9800, null], ["Drawings", 90000, null],
  ["Sales", null, 330000], ["Trade payables", null, 17400], ["Accumulated depreciation: machinery", null, 36000], ["Accumulated depreciation: office equipment", null, 8000], ["Capital at 1 January 2025", null, 80200],
]);
const adj = { rmClose: 14500, wipClose: 7200, fgClose: 21000, depMach: 9000, depOffice: 4000, powerAcc: 600, insPre: 900 };
chk(90000 * 0.1, adj.depMach); chk(20000 * 0.2, adj.depOffice);
const m = mfg({
  rmOpen: 12000, rmPurch: 84000, carriageIn: 2000, rmClose: adj.rmClose, labour: 52000,
  overheads: [["Factory power (7,800 + 600 accrued)", 7800 + adj.powerAcc], ["Factory rent and rates", 14000], ["Depreciation of machinery (10% on cost)", adj.depMach]],
  wipOpen: 6500, wipClose: adj.wipClose,
}, { title: "Tendai Carpentry: manufacturing account for the year ended 31 December 2025" });
chk(m.rmUsed, 83500); chk(m.prime, 135500); chk(m.foh, 31400); chk(m.cop, 166200);
const cos = chk(18000 + m.cop - adj.fgClose, 163200);
const gp = chk(330000 - cos, 166800);
const admin = 28700 - adj.insPre;
const exp = 15300 + admin + adj.depOffice;
const np = chk(gp - exp, 119700);
const pl = statement("Tendai Carpentry: statement of profit or loss for the year ended 31 December 2025", [
  ["Revenue", null, 330000], ["Opening inventory of finished goods", 18000, null], ["Cost of production (from the manufacturing account)", m.cop, null], ["Less closing inventory of finished goods", -adj.fgClose, null],
  ["Cost of sales", null, -cos], ["**Gross profit**", null, gp], ["Selling and distribution expenses", 15300, null], ["Administration expenses (28,700 − 900 prepaid)", admin, null], ["Depreciation of office equipment (20% on cost)", adj.depOffice, null],
  ["Total expenses", null, -exp], ["**Profit for the year**", null, np],
], { cols: [U, U], checks: [["gp", gp, 330000 - cos], ["np", np, gp - exp]] });
const nbvM = 90000 - 36000 - adj.depMach, nbvO = 20000 - 8000 - adj.depOffice;
const ca = adj.rmClose + adj.wipClose + adj.fgClose + 21500 + adj.insPre + 9800;
const cl = 17400 + adj.powerAcc;
const capClose = 80200 + np - 90000;
chk(nbvM + nbvO + ca - cl, capClose);
const sofp = statement("Tendai Carpentry: statement of financial position at 31 December 2025", [
  ["Non-current assets (cost less accumulated depreciation)", null, null], ["Machinery (90,000 − 45,000)", nbvM, null], ["Office equipment (20,000 − 12,000)", nbvO, null], ["", null, nbvM + nbvO],
  ["Current assets", null, null], ["Inventories: raw materials", adj.rmClose, null], ["Inventories: work in progress", adj.wipClose, null], ["Inventories: finished goods", adj.fgClose, null],
  ["Trade receivables", 21500, null], ["Prepayment", adj.insPre, null], ["Bank", 9800, null], ["", null, ca],
  ["Current liabilities: trade payables and accrual", -cl, null], ["Net current assets", null, ca - cl], ["**Net assets**", null, nbvM + nbvO + ca - cl],
  ["Capital at 1 January 2025", null, 80200], ["Add profit for the year", null, np], ["Less drawings", null, -90000], ["**Capital at 31 December 2025**", null, capClose],
], { cols: [U, U], checks: [["balance", nbvM + nbvO + ca - cl, capClose]] });

// Example 2: company
const co = { cop: 412600, rev: 780000, fgO: 46000, fgC: 52000, dist: 61200, adm: 98400, loan: 150000, rate: 0.06, taxRate: 0.25, div: 40000, reO: 168000, sc: 300000, sp: 40000, rm: 31000, wip: 18500, rec: 74000, bank: 23500, pay: 41400 };
const cosC = chk(co.fgO + co.cop - co.fgC, 406600);
const gpC = chk(co.rev - cosC, 373400);
const fin = chk(co.loan * co.rate, 9000);
const pbt = chk(gpC - co.dist - co.adm - fin, 204800);
const tax = chk(pbt * co.taxRate, 51200);
const pfy = chk(pbt - tax, 153600);
const reC = chk(co.reO + pfy - co.div, 281600);
const inv = co.rm + co.wip + co.fgC;
const cac = inv + co.rec + co.bank;
const eqC = co.sc + co.sp + reC;
const totEL = eqC + co.loan + co.pay + tax;
const ppe = chk(totEL - cac, 665200);
const plC = statement("Harare Steel Ltd: statement of profit or loss for the year ended 31 December 2025", [
  ["Revenue", null, co.rev], ["Opening inventory of finished goods", co.fgO, null], ["Cost of production", co.cop, null], ["Less closing inventory of finished goods", -co.fgC, null], ["Cost of sales", null, -cosC],
  ["**Gross profit**", null, gpC], ["Distribution costs", null, -co.dist], ["Administrative expenses", null, -co.adm], ["Finance costs (6% on loan notes of 150,000)", null, -fin],
  ["**Profit before tax**", null, pbt], ["Income tax (25% assumed for illustration)", null, -tax], ["**Profit for the year**", null, pfy],
], { cols: [U, U], checks: [["pbt", pbt, gpC - co.dist - co.adm - fin], ["pfy", pfy, pbt - tax]] });
const sofpC = statement("Harare Steel Ltd: statement of financial position at 31 December 2025", [
  ["Non-current assets: property, plant and equipment (carrying amount)", null, ppe], ["Current assets", null, null],
  ["Inventories: raw materials", co.rm, null], ["Inventories: work in progress", co.wip, null], ["Inventories: finished goods", co.fgC, null], ["Trade receivables", co.rec, null], ["Bank", co.bank, null], ["Total current assets", null, cac],
  ["**Total assets**", null, ppe + cac],
  ["Equity", null, null], ["Ordinary share capital (US\\$1 shares)", co.sc, null], ["Share premium", co.sp, null], ["Retained earnings", reC, null], ["Total equity", null, eqC],
  ["Non-current liabilities: loan notes", null, co.loan], ["Current liabilities", null, null], ["Trade payables", co.pay, null], ["Income tax payable", tax, null], ["Total current liabilities", null, co.pay + tax],
  ["**Total equity and liabilities**", null, totEL],
], { cols: [U, U], checks: [["balance", ppe + cac, totEL]] });

const body = `
## Introduction

Tendai Carpentry in Mutare makes furniture. At the end of the year the owner wants three documents: a manufacturing account to show what it cost to make the furniture, a statement of profit or loss to show the profit, and a statement of financial position to show what the business owns and owes. The pieces fit together: the **cost of production** from the factory goes to the trading section; the **three kinds of inventory** (raw materials, work in progress and finished goods) appear separately in the statement of financial position.

The complete final accounts of a manufacturer are ZIMSEC Form 5 and, for Cambridge, A Level only (Paper 3). They cover a sole trader and a company; ZIMSEC speaks of small to medium and large firms. You should know the manufacturing account, year-end adjustments and company statements.

:::keyfact{title="ZIMSEC and Cambridge terms"}
ZIMSEC: **income statement**, **balance sheet / statement of financial position**, **debtors**, **creditors**. Cambridge: **statement of profit or loss**, **statement of financial position**, **trade receivables**, **trade payables**, **inventories**. Internal statements of ZIMSEC items are for internal use, not for publication.
:::

## Key definitions

:::definition{term="Final accounts of a manufacturer"}
The manufacturing account, the statement of profit or loss (with the trading section) and the statement of financial position, prepared together from one trial balance and the year-end adjustments.
:::

:::definition{term="Three inventories"}
Raw materials, work in progress and finished goods. Each is counted at the year end and shown separately in current assets.
:::

## The order of preparation

1. **Adjust** the trial balance for the year-end items: closing inventories (three kinds), depreciation (factory machinery goes to the manufacturing account, office equipment to administration), accruals and prepayments.
2. **Manufacturing account:** raw materials consumed, prime cost, factory overheads, work in progress, cost of production.
3. **Statement of profit or loss:** revenue less cost of sales (opening finished goods + cost of production − closing finished goods) gives gross profit; deduct selling, distribution and administration expenses, finance costs and tax (for a company).
4. **Statement of financial position:** non-current assets at carrying amount, the three inventories, receivables, prepayments, bank; liabilities; and capital (sole trader) or equity (company).

:::keyfact
Costs go to the account where they were incurred: factory costs to the manufacturing account, selling and administration costs to the statement of profit or loss. Machinery depreciation is a factory overhead; office equipment depreciation is an administration expense.
:::

:::worked-solution[Example 1: final accounts of a sole trader from a trial balance]
${tb.md}

Adjustments: closing inventories were raw materials ${money(adj.rmClose)}, work in progress ${money(adj.wipClose)} and finished goods ${money(adj.fgClose)}. Machinery is depreciated at 10% on cost and office equipment at 20% on cost. Factory power of ${money(adj.powerAcc)} is accrued. Insurance of ${money(adj.insPre)} included in administration expenses is prepaid. Goods are transferred at cost.

1. Raw materials consumed: 12,000 + 84,000 + 2,000 − 14,500 = 83,500; prime cost 135,500.
2. Factory overheads: power 8,400, rent and rates 14,000, depreciation 9,000 = 31,400; cost of production 166,900 + 6,500 − 7,200 = 166,200.
3. Cost of sales 18,000 + 166,200 − 21,000 = 163,200; gross profit 166,800; expenses 47,100; profit 119,700.

${m.md}

${pl}

${sofp}
:::

## A company

For a limited company the same manufacturing account applies. The differences are in the statements: the statement of profit or loss shows **distribution costs, administrative expenses, finance costs** and **income tax**, and the statement of financial position shows **equity** (share capital, share premium, retained earnings) and liabilities in the IAS 1 order. The three inventories appear in current assets. In the exam the tax rate is given as an assumption in the question; the rate used here is for illustration only.

:::worked-solution[Example 2: a company]
Harare Steel Ltd has a cost of production of ${money(co.cop)} for the year (from its manufacturing account). Revenue ${money(co.rev)}; finished goods opening ${money(co.fgO)}, closing ${money(co.fgC)}; distribution costs ${money(co.dist)}; administrative expenses ${money(co.adm)}; 6% loan notes of ${money(co.loan)}; income tax at 25% (assumed for illustration). Dividends paid ${money(co.div)}. Opening retained earnings ${money(co.reO)}. Closing inventories: raw materials ${money(co.rm)}, work in progress ${money(co.wip)}. Trade receivables ${money(co.rec)}, bank ${money(co.bank)}, trade payables ${money(co.pay)}. Share capital ${money(co.sc)} and share premium ${money(co.sp)}.

1. Cost of sales 46,000 + 412,600 − 52,000 = 406,600; gross profit 373,400.
2. Finance costs 6% × 150,000 = 9,000; profit before tax 204,800; tax 51,200; profit for the year 153,600.
3. Closing retained earnings 168,000 + 153,600 − 40,000 = 281,600.

${plC}

${sofpC}

The carrying amount of property, plant and equipment (665,200) is the figure that makes the statement balance with the data given.
:::

## Common mistakes

:::mistake{title="Using the wrong inventory in the wrong place"}
Raw materials and work in progress are adjusted in the manufacturing account; finished goods are adjusted in the trading section.
:::

:::mistake{title="Putting all depreciation in the manufacturing account"}
Only the depreciation of factory assets is a factory overhead. Office equipment depreciation is an administration expense.
:::

:::mistake{title="Showing only one inventory figure in the statement of financial position"}
The three inventories are shown separately: raw materials, work in progress and finished goods.
:::

:::mistake{title="Forgetting the accruals and prepayments in the right account"}
An accrued factory expense is added to the factory overhead; a prepaid office expense is deducted from administration expenses.
:::

## Exam tips

:::exam-tip
ZIMSEC Papers 2 and 3 and Cambridge Paper 3 test the complete set. With **prepare**, work in the order manufacturing account, statement of profit or loss, statement of financial position, with sub-totals and brackets. With **calculate**, show the cost of production and the gross profit. With **explain** or **advise**, comment on profit per unit or the level of inventories using the figures.
:::

## Summary

:::summary
- Prepare the adjustments first, then the manufacturing account, statement of profit or loss and statement of financial position.
- The cost of production replaces purchases; cost of sales = opening finished goods + cost of production − closing finished goods.
- Factory costs and machinery depreciation are in the manufacturing account; office costs are in the statement of profit or loss.
- The statement of financial position shows raw materials, work in progress and finished goods separately.
- A company adds distribution costs, finance costs, tax and the equity section.
- Check that net assets equal capital (or total assets equal equity and liabilities).
:::
`;

writeLesson("manufacturing/statements", {
  key: "manufacturing.statements",
  title: "Final accounts of a manufacturing business",
  summary: "Prepare the manufacturing account, statement of profit or loss and statement of financial position of a sole trader or a company that makes goods, with year-end adjustments.",
  concepts: ["aacc.manufacturing.statements"],
  estimatedMinutes: 55,
}, body);
