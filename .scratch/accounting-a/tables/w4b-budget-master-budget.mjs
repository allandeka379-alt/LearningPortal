import { table, chk, r2, ratios } from "../lib.mjs";
import { F, usd, writeLesson, front, p1, p2 } from "./w4b-lib.mjs";
import { masterBudget, masterStatements } from "./w4b-master.mjs";

const base = {
  units: 5000, price: 12, openFGUnits: 300, closeFGUnits: 400, matUnit: 4, labUnit: 2, vohUnit: 1,
  fixedOverhead: 8000, depreciation: 3000, admin: 6500, interest: 300, dividend: 4000, equipment: 6000,
  openRec: 9000, closeRec: 18000, openPay: 6000, closePay: 9000, openBank: 4000,
  ncaCost: 60000, ncaDep: 18000, shareCapital: 30000, openRE: 18100, loan: 3000,
};
const m = masterBudget(base);
chk(m.sales, 60000); chk(m.production, 5100); chk(m.cos, 35000); chk(m.gp, 25000); chk(m.pbit, 10500); chk(m.profit, 10200);
chk(m.collections, 51000); chk(m.toSuppliers, 17400); chk(m.payments, 54500); chk(m.closeBank, 500);
chk(m.re1, 24300); chk(m.assets1, 66300);
const { pl, sofp } = masterStatements(m);

const cashSum = table(["Cash budget summary for the quarter", "US\\$"], [
  ["Opening bank balance", m.openBank],
  [`Cash from customers (9,000 + 60,000 - 18,000)`, m.collections],
  [`Payments to suppliers for materials (20,400 + 6,000 - 9,000)`, -m.toSuppliers],
  [`Wages (5,100 units × US\\$2.00)`, -m.labour],
  [`Variable overheads (5,100 × US\\$1.00)`, -m.voh],
  [`Fixed production overhead paid (8,000 - 3,000 depreciation)`, -m.fixedCash],
  ["Administration and selling expenses", -m.admin],
  ["Loan interest", -m.interest],
  ["Dividend paid", -m.dividend],
  ["Equipment purchased", -m.equipment],
  ["**Closing bank balance**", `**${F(m.closeBank)}**`],
]);
chk(m.openBank + m.collections - m.toSuppliers - m.labour - m.voh - m.fixedCash - m.admin - m.interest - m.dividend - m.equipment, m.closeBank);

// Example 2
const ca = m.closeFG + m.closeRec + m.closeBank;
const cl = m.closePay;
const gm = ratios.grossMargin(m.gp, m.sales);
const pm = ratios.profitMargin(m.profit, m.sales);
const cr = ratios.current(ca, cl);
const at = ratios.acidTest(ca, m.closeFG, cl);
const capEmp = m.shareCapital + m.re1 + m.loan;
const roce = ratios.roce(m.pbit, capEmp);
chk(capEmp, 57300);
const low = masterBudget({ ...base, units: 4500, closeRec: 16200, closePay: 8100 });
chk(low.production, 4600); chk(low.profit, 7700); chk(low.closeBank, -1100);
const t2 = table(["", "Master budget", "Sales 10% lower"], [
  ["Units sold", F(m.units), F(low.units)],
  ["Profit for the quarter (US\\$)", F(m.profit), F(low.profit)],
  ["Closing bank balance (US\\$)", F(m.closeBank), `(${F(Math.abs(low.closeBank))})`],
  ["Closing receivables (US\\$)", F(m.closeRec), F(low.closeRec)],
  ["Closing trade payables (US\\$)", F(m.closePay), F(low.closePay)],
], ["l", "r", "r"]);

const body = `
## Introduction

At the end of the planning season, Zambezi Bakers in Masvingo wants one answer to the owner's questions: "If we follow all these plans, what profit will we make, what will the business own and owe on 31 March, and will we have enough cash?" The **master budget** gives the answer. It combines the sales, production, purchases, labour, overhead and cash budgets into a budgeted statement of profit or loss and a budgeted statement of financial position for the period. If the budgeted statement of financial position balances, the budgets agree with each other. The lesson is Form 6 for ZIMSEC and A Level only for Cambridge (Paper 4); it builds on the operating budgets and the cash budget.

:::keyfact{title="ZIMSEC and Cambridge terms"}
| ZIMSEC (Form 6) | Cambridge 9706 (A Level only) |
| --- | --- |
| Master budget; budgeted income statement | Master budget; budgeted statement of profit or loss |
| Budgeted balance sheet | Budgeted statement of financial position |
| Debtors, creditors, stock | Trade receivables, trade payables, inventory |
| Retained profits | Retained earnings |
:::

## Key definitions

:::definition{term="Master budget"}
The summary budget that brings the operating budgets and the cash budget together into a budgeted statement of profit or loss, a budgeted statement of financial position and often a budgeted statement of cash flows for the planning period.
:::

:::definition{term="Budgeted statement of financial position"}
The assets, liabilities and equity expected at the end of the period: the opening statement of financial position updated for every budgeted transaction.
:::

:::keyfact
Closing balance = opening balance + budgeted changes. Retained earnings close = opening + budgeted profit - dividends. Receivables, payables and inventory come from the operating budgets, cash from the cash budget, and non-current assets from opening cost + purchases - accumulated depreciation. The budgeted statement of financial position must balance.
:::

## How the master budget is built

1. Start with the **opening statement of financial position**.
2. Take **revenue** from the sales budget and **cost of sales** from the production and inventory budgets.
3. Take **expenses** (including depreciation and interest) from the overhead and expense budgets to get **profit for the period**.
4. Update each balance: **inventory** from the inventory budget, **trade receivables** and **trade payables** from their budgets, **non-current assets** (cost plus purchases less depreciation to date), **retained earnings** (opening + profit - dividends) and loans.
5. Take **cash** from the cash budget. This is the balancing check: if total assets differ from equity and liabilities, an error exists somewhere.

:::worked-solution[Example 1: Zambezi Bakers Ltd, quarter to 31 March]
The business sells ${F(base.units)} loaves (all on credit) at US\\$12 each. Finished goods fall from 300 to 400 units, valued at the variable cost of US\\$7 a unit (materials US\\$4, labour US\\$2, variable overhead US\\$1); there is no other inventory. Production = ${F(base.units)} + 400 - 300 = ${F(m.production)} units. Fixed production overhead is ${usd(base.fixedOverhead)} (including depreciation ${usd(base.depreciation)}), administration and selling expenses ${usd(base.admin)}, loan interest ${usd(base.interest)}. A dividend of ${usd(base.dividend)} is paid and equipment costing ${usd(base.equipment)} is bought for cash. Receivables: opening ${usd(base.openRec)}, closing ${usd(base.closeRec)}. Trade payables (materials only): opening ${usd(base.openPay)}, closing ${usd(base.closePay)}. Wages and other costs are paid as incurred.

The cash budget summary for the quarter is:

${cashSum}

The budgeted statement of profit or loss:

${pl}

The budgeted statement of financial position:

${sofp}

The statement balances at ${usd(m.assets1)}, so the plans agree. Retained earnings rise from ${usd(base.openRE)} to ${usd(m.re1)} (profit ${usd(m.profit)} less the dividend ${usd(base.dividend)}); non-current assets rise by the ${usd(base.equipment)} of equipment less ${usd(base.depreciation)} of depreciation. The bank balance is only ${usd(m.closeBank)} at the end of the quarter.
:::

## Using the master budget to assess a plan

A master budget is a tool for asking "is this plan acceptable?" Compare the budgeted figures with targets and with the last period, calculate ratios from the budgeted statements (profitability, liquidity, return on capital), and test the effect of changes in the assumptions. The question is not only "what profit?" but also "does the business remain liquid, and is the return worth the risk?"

:::worked-solution[Example 2: is the Zambezi Bakers plan satisfactory?]
Ratios from the budgeted statements (using the formulas in the syllabus):

- Gross profit margin = ${F(m.gp)} ÷ ${F(m.sales)} × 100 = ${p1(gm)}%.
- Profit margin = ${F(m.profit)} ÷ ${F(m.sales)} × 100 = ${p1(pm)}%.
- Current ratio = ${F(ca)} ÷ ${F(cl)} = ${p2(cr)} : 1; acid test = (${F(ca)} - ${F(m.closeFG)}) ÷ ${F(cl)} = ${p2(at)} : 1.
- ROCE = profit from operations ÷ capital employed = ${F(m.pbit)} ÷ ${F(capEmp)} × 100 = ${p1(roce)}%, where capital employed is share capital + reserves + non-current liabilities.

The profitability is good and the current ratio is healthy, yet the bank balance of only ${usd(m.closeBank)} is dangerously low, because US\\$18,000 of the current assets is tied up in receivables. Test a 10% fall in sales (4,500 loaves, receivables US\\$16,200, payables US\\$8,100, other assumptions unchanged):

${t2}

A 10% fall in sales reduces profit by ${usd(m.profit - low.profit)} and turns the bank balance into an overdraft of ${usd(Math.abs(low.closeBank))}. Recommendations: collect receivables faster, delay or reduce the dividend of ${usd(base.dividend)} or the equipment purchase, and arrange an overdraft in advance. Non-financial factors, such as the security of customers' orders, should also be considered.
:::

## Common mistakes

:::mistake{title="Adding depreciation to the cash outflows"}
Depreciation reduces profit and the carrying amount of assets, but it is not a payment. It must not appear in the cash budget. It does reduce the non-current assets in the statement of financial position.
:::

:::mistake{title="Forgetting the dividend or drawings in retained earnings"}
Retained earnings at the end = opening retained earnings + profit - dividends. Forgetting the dividend makes the statement of financial position fail to balance.
:::

:::mistake{title="Taking cash from the profit"}
The closing cash is the figure from the cash budget (receipts and payments), not the profit. Profit includes sales not yet collected and excludes capital items.
:::

:::mistake{title="Forcing the statement to balance"}
If the statement does not balance, look for the error; do not insert a balancing figure. The imbalance usually shows a missed transaction, such as equipment or interest.
:::

## Exam tips

:::exam-tip
Master budgets appear in ZIMSEC Papers 2 and 3 (Form 6) and in Cambridge Paper 4 (A Level only). For *prepare*, give a three-line heading for each statement, show workings for cash, inventory, receivables and payables, and check that the budgeted statement of financial position balances. A correct balance earns credit even if a small mistake is carried.
:::

:::exam-tip
For *assess*, *comment* or *advise*, calculate two or three ratios from the budgeted statements, state the lowest cash balance, test one change in the assumptions (for example lower sales), and make a recommendation with a financial and a non-financial reason.
:::

## Summary

:::summary
- The master budget combines the operating and cash budgets into a budgeted statement of profit or loss and statement of financial position.
- Closing balances are opening balances updated for the budgeted transactions; retained earnings = opening + profit - dividends.
- Cash comes from the cash budget; depreciation reduces profit and non-current assets but not cash.
- If the budgeted statement of financial position balances, the budgets agree; if not, look for an omitted item.
- Ratios and "what if" tests on the master budget show whether the plan is profitable, liquid and acceptable.
:::
`;
writeLesson("budget/master-budget.md", front("budget.master-budget", "Master budget: budgeted profit and financial position", "Combine the operating and cash budgets into a budgeted statement of profit or loss and statement of financial position, check that it balances, and use it to assess a plan.", "aacc.budget.master-budget", 60), body);
void r2;
