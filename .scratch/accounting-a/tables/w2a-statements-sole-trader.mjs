// Lesson generator: statements.sole-trader
import { fmt, chk, check, r2 } from "../lib.mjs";
import { writeLesson } from "./w2a-lib.mjs";
import { tradingModel, adjustmentNotes } from "./w2a-models.mjs";

const d1 = {
  biz: "Ndlovu Electricals", grouped: true,
  nca: [{ label: "Motor vehicle", cost: 24000, accDep: 6000, rate: 20, group: "dist" }, { label: "Equipment", cost: 16000, accDep: 3200, rate: 10 }],
  sales: 148900, returnsIn: 2160, openInv: 11200, purchases: 84600, carriageIn: 1850, returnsOut: 1950, closingInv: 13500,
  income: [{ label: "Discount received", tb: 870 }, { label: "Commission received", tb: 1400, adv: 300 }],
  expenses: [{ label: "Wages", tb: 21400, acc: 1100 }, { label: "Rent", tb: 6000 }, { label: "Carriage outwards", tb: 2300, group: "dist" }, { label: "Discount allowed", tb: 1150 }, { label: "Insurance", tb: 1830, pre: 450 }, { label: "General expenses", tb: 3020 }],
  recv: 16300, writeOff: 700, allowPct: 3, allowOpen: 400, bank: 4100, cash: 380, payables: 9350, drawings: 9500,
};
const m1 = tradingModel(d1);





const notes1 = adjustmentNotes(d1);

const d2 = {
  biz: "Chinhoyi Driving School", grouped: true, service: true, salesLabel: "Revenue: driving lesson fees",
  nca: [{ label: "Vehicles", cost: 48000, accDep: 16000, rate: 20, group: "dist" }, { label: "Office equipment", cost: 6000, accDep: 2250, rate: 10 }],
  sales: 86400,
  income: [{ label: "Interest received", tb: 540, acc: 60 }],
  expenses: [{ label: "Instructors' wages", tb: 29800, acc: 900 }, { label: "Fuel", tb: 9400, group: "dist" }, { label: "Vehicle repairs", tb: 3180, group: "dist" }, { label: "Insurance", tb: 4200, pre: 700 }, { label: "Rent of office", tb: 7200 }, { label: "Office expenses", tb: 2600 }, { label: "Loan interest", tb: 800, acc: 200, group: "fin" }],
  recv: 2800, bank: 7900, payables: 3260, loan: 10000, drawings: 12000,
};
const m2 = tradingModel(d2);
console.error("service profit", m2.profit, "cap", m2.capOpen);
const notes2 = adjustmentNotes(d2);

const body = `## Introduction

Sipho Ndlovu sells electrical goods in Bulawayo and Thandeka Moyo runs a driving school in Chinhoyi. Both are sole traders: one person owns each business and is personally responsible for its debts. At the end of the year each prepares two statements for the bank, the tax office and, above all, for themselves: a **statement of profit or loss** to show whether the year paid and a **statement of financial position** to show what the business owns and owes.

You already know how to prepare trading and profit and loss accounts from O-Level and how to make each adjustment. Here you put everything together in the A-Level layout: revenue and cost of sales, expenses grouped by function, non-current assets at carrying amount, and capital that rolls forward from one year to the next. A service business has no goods for resale, so it has no cost of sales or inventory.

:::keyfact{title="ZIMSEC and Cambridge terms"}
| ZIMSEC (syllabus and common usage) | Cambridge 9706 |
| --- | --- |
| Income statement (trading account and profit and loss account); net profit | Statement of profit or loss; profit for the year |
| Sales; turnover | Revenue |
| Stock; debtors; creditors | Inventory; trade receivables; trade payables |
| Net book value | Carrying amount |
| Bad debts; allowance for doubtful debts | Irrecoverable debts; allowance for irrecoverable debts |

Both boards examine the final accounts of a sole trader. ZIMSEC often lists expenses in one block; Cambridge follows the IAS 1 headings of distribution costs and administrative expenses. Either grouping earns full marks if the totals are right and the headings are clear.
:::

## Key definitions

:::definition{term="Revenue"}
The income from selling goods or services in the ordinary activities of the business, after deducting returns inwards. Cash discounts allowed are an expense, not a deduction from revenue.
:::

:::definition{term="Cost of sales"}
The cost of the goods that were sold: opening inventory plus purchases and carriage inwards, less returns outwards, less closing inventory.
:::

:::definition{term="Gross profit"}
Revenue less cost of sales. A service business with no cost of sales has no gross profit line; its fees go straight to the expense section.
:::

:::definition{term="Carrying amount"}
The cost of a non-current asset less its accumulated depreciation at the date of the statement of financial position.
:::

## Layout of the statements

:::keyfact{title="Statement of profit or loss, in order"}
1. Revenue (sales less returns inwards).
2. Cost of sales, giving gross profit.
3. Other income: discount received, commission, rent received, interest received.
4. Distribution costs: carriage outwards, delivery vehicle expenses, selling costs.
5. Administrative expenses: wages, rent, insurance, general expenses, depreciation, irrecoverable debts and discount allowed.
6. Finance costs: loan interest.
7. Profit for the year.
:::

Carriage **inwards** is part of the cost of getting goods ready for sale and belongs in cost of sales. Carriage **outwards** is the cost of delivering to customers and is an expense. The statement of financial position lists non-current assets with cost, accumulated depreciation and carrying amount, then current assets (in order of liquidity, or inventory first), then capital, non-current liabilities and current liabilities.

Check your work with the accounting equation: total assets must equal capital plus liabilities. Closing capital = opening capital + profit for the year - drawings, and drawings include goods taken for own use.

:::worked-solution[Example 1: a trading business]
Sipho Ndlovu's trial balance and adjustments for the year ended 31 December 2025 are below. The statements are for internal use. Calculate revenue, cost of sales, gross profit and profit for the year, and prepare both statements.

${m1.tb.md}

${notes1}

1. Revenue: ${fmt(d1.sales)} - ${fmt(d1.returnsIn)} = ${fmt(m1.revenue)}.
2. Cost of sales: ${fmt(d1.openInv)} + ${fmt(d1.purchases)} + ${fmt(d1.carriageIn)} - ${fmt(d1.returnsOut)} - ${fmt(d1.closingInv)} = ${fmt(m1.cos)}; gross profit ${fmt(m1.revenue)} - ${fmt(m1.cos)} = ${fmt(m1.gp)}.
3. Wages: ${fmt(m1.exps[0].tb)} + ${fmt(m1.exps[0].acc)} = ${fmt(m1.exps[0].amt)}. Insurance: ${fmt(m1.exps[4].tb)} - ${fmt(m1.exps[4].pre)} = ${fmt(m1.exps[4].amt)}. Commission: ${fmt(m1.incs[1].tb)} - ${fmt(m1.incs[1].adv)} = ${fmt(m1.incs[1].amt)}.
4. Irrecoverable debts: after writing off ${fmt(d1.writeOff)}, receivables are ${fmt(m1.recvAfter)}; the allowance is ${d1.allowPct}% = ${fmt(m1.allowNew)}; the increase over ${fmt(d1.allowOpen)} is ${fmt(m1.allowInc)}; the charge is ${fmt(d1.writeOff)} + ${fmt(m1.allowInc)} = ${fmt(m1.irrExp)}.
5. Depreciation: vehicle ${m1.nca[0].rate}% × ${fmt(m1.nca[0].cost)} = ${fmt(m1.nca[0].charge)}; equipment ${m1.nca[1].rate}% × ${fmt(m1.nca[1].cost)} = ${fmt(m1.nca[1].charge)}.

${m1.spl.md}

${m1.sfp.md}

Check: total assets ${fmt(m1.assets)} equal capital of ${fmt(m1.capClose)} plus current liabilities of ${fmt(m1.clTotal)}.
:::

## A service business

A service business sells time, skill or use of equipment, so it buys no goods for resale. Its first line is revenue (fees), and the statement has no cost of sales or gross profit. Its main costs, such as wages, fuel and rent, appear as expenses; if it owns vehicles that are used to deliver the service, their depreciation is still an expense. Inventory does not appear in its statement of financial position, but consumable supplies may appear as other receivables if material.

:::worked-solution[Example 2: a service business]
Thandeka Moyo's Chinhoyi Driving School has the trial balance below at 31 December 2025. Prepare the statements. A loan of US\\$10,000 carries interest charged as an expense.

${m2.tb.md}

${notes2}

1. Instructors' wages: ${fmt(m2.exps[0].tb)} + ${fmt(m2.exps[0].acc)} = ${fmt(m2.exps[0].amt)}. Insurance: ${fmt(m2.exps[3].tb)} - ${fmt(m2.exps[3].pre)} = ${fmt(m2.exps[3].amt)}. Loan interest: ${fmt(m2.exps[6].tb)} + ${fmt(m2.exps[6].acc)} = ${fmt(m2.exps[6].amt)}. Interest received: ${fmt(m2.incs[0].tb)} + ${fmt(m2.incs[0].acc)} = ${fmt(m2.incs[0].amt)}.
2. Depreciation: vehicles ${m2.nca[0].rate}% × ${fmt(m2.nca[0].cost)} = ${fmt(m2.nca[0].charge)}; office equipment ${m2.nca[1].rate}% × ${fmt(m2.nca[1].cost)} = ${fmt(m2.nca[1].charge)}.

${m2.spl.md}

${m2.sfp.md}

The business has no gross profit because it has no cost of sales. Check: assets ${fmt(m2.assets)} equal closing capital ${fmt(m2.capClose)} plus the loan of 10,000 and current liabilities of ${fmt(m2.clTotal)}.
:::

## Comparing and interpreting

Marks are also given for interpretation. Profit for the year divided by revenue gives the profit margin; closing capital against opening capital shows whether the owner is building or drawing down the business. In Example 1, drawings of 9,500 are much less than the profit of ${fmt(m1.profit)}, so capital grows by ${fmt(m1.capClose - m1.capOpen)}. If drawings regularly exceeded profit the business could not replace its assets or repay creditors. The statements also have limits: inventory and receivables rest on estimates, and non-current assets are at depreciated cost, not market value.

## Common mistakes

:::mistake{title="Putting carriage outwards in cost of sales"}
Only carriage inwards belongs in cost of sales. Carriage outwards is a distribution cost.
:::

:::mistake{title="Deducting discount allowed from sales"}
Discounts allowed and received are shown as an expense and as other income. Only returns inwards are deducted from sales to give revenue.
:::

:::mistake{title="Forgetting drawings or goods taken for own use"}
Closing capital is opening capital plus profit less all drawings. Goods taken for personal use are drawings at cost.
:::

:::mistake{title="Showing non-current assets at cost"}
The statement of financial position shows the carrying amount. List cost, accumulated depreciation and the difference.
:::

:::mistake{title="A statement of financial position that does not balance"}
Check each adjustment appears in both statements. A missing prepayment, accrual or the allowance is the usual cause.
:::

## Exam tips

:::exam-tip
ZIMSEC Paper 2 and Paper 3 and Cambridge Papers 2 and 3 (and the multiple-choice Papers 1) test final accounts of a sole trader with adjustments. For *prepare*, give the three-line heading (business name, statement, date), show cost of sales workings and keep subtotals visible so that own-figure marks can follow. For *calculate*, show each step. For *comment* or *evaluate*, use the profit, margin and capital movement together.
:::

:::exam-tip
A statement of financial position that fails to balance loses the final mark only if the error is not traced; where two figures can be compared (for example total assets against capital plus liabilities), show the check line so that the examiner can see your reasoning.
:::

## Summary

:::summary
- The statement of profit or loss runs from revenue through cost of sales and gross profit, other income and expenses to profit for the year; a service business has no cost of sales.
- Carriage inwards, returns and closing inventory belong to cost of sales; carriage outwards and discounts allowed are expenses.
- Non-current assets are shown at carrying amount: cost less accumulated depreciation.
- Closing capital = opening capital + profit for the year - drawings (including goods taken for own use).
- Total assets must equal capital plus liabilities, which checks every adjustment.
- Use the profit margin and the capital movement to comment on the results.
:::
`;

writeLesson(
  "statements/sole-trader.md",
  {
    key: "statements.sole-trader",
    title: "Final accounts of a sole trader",
    summary: "Prepare the statement of profit or loss and the statement of financial position of a trading or service sole trader from a trial balance and adjustments, and interpret the results.",
    concepts: ["aacc.statements.sole-trader"],
    estimatedMinutes: 60,
    level: "core",
  },
  body,
);
