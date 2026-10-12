import { table, chk, r2, sum } from "../lib.mjs";
import { F, usd, writeLesson, front } from "./w4b-lib.mjs";

// Example 1
const mo1 = ["January", "February", "March", "April"];
const sales1 = { Nov: 14000, Dec: 15000, Jan: 16000, Feb: 18000, Mar: 20000, Apr: 22000 };
const pur1 = { Dec: 9000, Jan: 10000, Feb: 11000, Mar: 12500, Apr: 13500 };
const keysS = ["Dec", "Jan", "Feb", "Mar", "Apr"];
const recs = [];
const cashSales = [], credColl = [];
for (let i = 1; i < 5; i += 1) {
  cashSales.push(0.3 * sales1[keysS[i]]);
  credColl.push(0.7 * sales1[keysS[i - 1]]);
  recs.push(cashSales[i - 1] + credColl[i - 1]);
}
chk(recs[0], 15300); chk(recs[1], 16600); chk(recs[2], 18600); chk(recs[3], 20600);
const purKeys = ["Dec", "Jan", "Feb", "Mar"];
const purPay = purKeys.map((k) => pur1[k]);
const wages = 2400, rent = 1200, other = 900, draw = 1500;
const equip = [0, 0, 8000, 0], loan = [0, 6000, 0, 0];
let bal = 3200;
const rows1 = [];
const open1 = [], close1 = [], netl = [];
for (let i = 0; i < 4; i += 1) {
  const inflow = recs[i] + loan[i];
  const out = purPay[i] + wages + rent + other + draw + equip[i];
  open1.push(bal);
  bal = bal + inflow - out;
  netl.push(inflow - out);
  close1.push(bal);
  rows1.push({ inflow, out });
}
chk(close1[0], 3500); chk(close1[1], 10100); chk(close1[2], 3700); chk(close1[3], 5800);
const L = (label, arr) => [label, ...arr.map((x) => (x === 0 ? "-" : F(x))), F(sum(arr))];
const t1 = table(["Cash budget (US\\$)", ...mo1, "Total"], [
  L("Cash sales (30%)", cashSales),
  L("Credit sales collected (70% of previous month)", credColl),
  L("Loan received", loan),
  ["**Total receipts**", ...rows1.map((r) => `**${F(r.inflow)}**`), `**${F(sum(rows1.map((r) => r.inflow)))}**`],
  L("Payments for purchases (previous month's purchases)", purPay),
  L("Wages", [wages, wages, wages, wages]),
  L("Rent", [rent, rent, rent, rent]),
  L("Other expenses", [other, other, other, other]),
  L("Drawings", [draw, draw, draw, draw]),
  L("Equipment", equip),
  ["**Total payments**", ...rows1.map((r) => `**${F(r.out)}**`), `**${F(sum(rows1.map((r) => r.out)))}**`],
  ["**Net cash flow**", ...netl.map((x) => `**${F(x)}**`), `**${F(sum(netl))}**`],
  ["Opening bank balance", ...open1.map(F), F(open1[0])],
  ["**Closing bank balance**", ...close1.map((x) => `**${F(x)}**`), `**${F(close1[3])}**`],
]);
chk(open1[0] + sum(netl), close1[3]);

// Example 2: discount and deficit
const mo2 = ["July", "August", "September"];
const sales2 = [32000, 30000, 28000, 26000]; // Jun, Jul, Aug, Sep
const pur2 = [18000, 20000, 22000]; // Jun, Jul, Aug (paid next month)
const disc = 0.05, promptPct = 0.4;
const prompt2 = [1, 2, 3].map((i) => promptPct * sales2[i] * (1 - disc));
const late2 = [1, 2, 3].map((i) => (1 - promptPct) * sales2[i - 1]);
const rec2 = prompt2.map((p, i) => p + late2[i]);
chk(rec2[0], 30600); chk(rec2[1], 28640); chk(rec2[2], 26680);
const exp2 = 6500, div2 = [0, 0, 4000], loanRep = [0, 0, 12000];
const pay2 = [0, 1, 2].map((i) => pur2[i] + exp2 + div2[i] + loanRep[i]);
chk(pay2[0], 24500); chk(pay2[1], 26500); chk(pay2[2], 44500);
let b2 = 2000;
const o2 = [], c2 = [], n2 = [];
for (let i = 0; i < 3; i += 1) {
  o2.push(b2);
  n2.push(rec2[i] - pay2[i]);
  b2 += n2[i];
  c2.push(b2);
}
chk(c2[0], 8100); chk(c2[1], 10240); chk(c2[2], -7580);
const neg = (x) => (x < 0 ? `(${F(-x)})` : F(x));
const t2 = table(["Cash budget (US\\$)", ...mo2, "Total"], [
  L("Customers paying in the month (40% less 5% discount)", prompt2),
  L("Customers paying a month later (60% of previous month)", late2),
  ["**Total receipts**", ...rec2.map((x) => `**${F(x)}**`), `**${F(sum(rec2))}**`],
  L("Payments for purchases (previous month)", pur2),
  L("Expenses (excluding depreciation of US\\$1,500)", [exp2, exp2, exp2]),
  L("Dividend", div2),
  L("Loan repayment", loanRep),
  ["**Total payments**", ...pay2.map((x) => `**${F(x)}**`), `**${F(sum(pay2))}**`],
  ["**Net cash flow**", ...n2.map((x) => `**${neg(x)}**`), `**${neg(sum(n2))}**`],
  ["Opening bank balance", ...o2.map(neg), neg(o2[0])],
  ["**Closing bank balance**", ...c2.map((x) => `**${neg(x)}**`), `**${neg(c2[2])}**`],
]);
chk(o2[0] + sum(n2), c2[2]);

const body = `
## Introduction

Chipo Fresh Produce in Chinhoyi sells vegetables to shops and schools. The business is profitable, yet in March it cannot pay its suppliers because the bank account is empty: customers pay a month late, an equipment purchase has just been made and the owner's drawings are fixed. Profit and cash are different things. A **cash budget** forecasts the cash received and paid in each month, so that the owner can see shortages and surpluses in advance and act. It is the most frequently examined budget. The lesson is Form 6 for ZIMSEC and A Level only for Cambridge (Paper 4). You need the receivables and payables budgets from the previous lesson.

:::keyfact{title="ZIMSEC and Cambridge terms"}
| ZIMSEC (Form 6) | Cambridge 9706 (A Level only) |
| --- | --- |
| Cash budget; cash and bank balance | Cash budget; bank balance (overdrawn shown in brackets) |
| Debtors pay after 30 days | Trade receivables pay after one month |
| Creditors paid after 30 days | Trade payables paid after one month |
| Cash discount allowed / received | Discount allowed / discount received |
| Dividend, drawings, loan repayment | Dividend (company), drawings (sole trader), loan repayment |
:::

## Key definitions

:::definition{term="Cash budget"}
A forecast, month by month, of cash and bank receipts and payments and the resulting bank balance. It includes only items that move cash.
:::

:::definition{term="Non-cash item"}
An expense or entry that does not involve a payment in the period, such as depreciation, an allowance for irrecoverable debts or a profit on disposal. It is **not** in the cash budget.
:::

:::keyfact
Closing balance = opening balance + receipts - payments. The closing balance of a month is the opening balance of the next. Include capital items (equipment, loans, dividends, drawings, tax) in the month they are paid or received, and exclude depreciation.
:::

## Preparing a cash budget

1. **Receipts**: cash sales in the month; credit sales collected according to the credit terms (and less any discount taken); loans and capital introduced; proceeds from selling assets.
2. **Payments**: suppliers according to the credit period; wages, rent and other expenses in the month they are paid (not when they are incurred); drawings; equipment and other capital expenditure; loan repayments and interest; tax and dividends.
3. **Exclude** depreciation, allowances and anything that does not move cash.
4. Calculate the **net cash flow** (receipts less payments), add the opening balance and carry the closing balance forward. Show an overdraft in brackets.

:::worked-solution[Example 1: Chipo Fresh Produce, January to April]
Sales are: November ${usd(sales1.Nov)}, December ${usd(sales1.Dec)}, January ${usd(sales1.Jan)}, February ${usd(sales1.Feb)}, March ${usd(sales1.Mar)}, April ${usd(sales1.Apr)}. 30% of sales are for cash; the rest are collected in the month after the sale. Purchases (paid in the month after) are: December ${usd(pur1.Dec)}, January ${usd(pur1.Jan)}, February ${usd(pur1.Feb)}, March ${usd(pur1.Mar)}. Wages ${usd(wages)}, rent ${usd(rent)} and other expenses ${usd(other)} are paid each month. Drawings are ${usd(draw)} a month. Depreciation is US\\$600 a month. Equipment costing ${usd(8000)} is bought and paid for in March. A loan of ${usd(6000)} is received in February. The bank balance on 1 January is ${usd(3200)}.

${t1}

Depreciation of US\\$600 a month is excluded because no cash is paid. The balance never goes below zero, but it falls from ${usd(close1[1])} to ${usd(close1[2])} in March because of the equipment. A manager who looked only at the monthly profit would not see this.
:::

## Cash discounts and timing

When customers who pay promptly receive a **discount**, the receipt is the sales value less the discount. When the business pays early to earn a discount, the payment is reduced in the same way. Always check *which* month the cash moves: sales in June collected in July appear as July receipts. Sales are shown in the budget only through their receipts, never at invoice value.

:::worked-solution[Example 2: Bulawayo Furniture and a deficit in September]
Sales: June ${usd(sales2[0])}, July ${usd(sales2[1])}, August ${usd(sales2[2])}, September ${usd(sales2[3])}. 40% of customers pay in the month of sale and take a 5% discount; 60% pay in the following month. Purchases: June ${usd(pur2[0])}, July ${usd(pur2[1])}, August ${usd(pur2[2])}, paid in the month after. Expenses of ${usd(exp2)} a month are paid in cash (depreciation of US\\$1,500 a month is excluded). A dividend of ${usd(4000)} and a loan repayment of ${usd(12000)} are paid in September. The bank balance on 1 July is ${usd(2000)}.

${t2}

September shows an overdraft of ${usd(7580)}. The business is profitable, but it is paying a dividend and a loan repayment in the same month as sales fall.
:::

## Interpreting the cash budget and recommending action

A **deficit** (overdraft) needs action. Options: arrange an overdraft in advance (cost: interest and approval); delay the dividend or loan repayment; ask suppliers for longer credit; speed up collections (discounts for prompt payment, chasing late payers); sell surplus assets; lease instead of buy equipment; reduce drawings; or delay capital expenditure. A **surplus** can be used to pay suppliers early (to earn discounts), repay loans, or invest short-term, but should not be left idle for long. In the example above, the best response is to delay the dividend and negotiate the loan repayment, because the shortage is caused by those two payments and is a single month. A cash budget is only a forecast: if customers pay later than planned, the deficit may be larger, so the owner should keep a reserve. Cash problems also arise from over-trading and from tying up cash in inventory.

## Common mistakes

:::mistake{title="Including depreciation in the payments"}
Depreciation is a non-cash expense. Including it understates the bank balance. Do the same for allowances for irrecoverable debts and any provision.
:::

:::mistake{title="Showing sales instead of receipts"}
The cash budget shows when customers pay, not when they buy. A sale in April on one month's credit appears as a receipt in May.
:::

:::mistake{title="Forgetting the capital items"}
Equipment, loans, drawings, dividends and tax are cash flows even though they are not part of profit. Put each in the month it is paid.
:::

:::mistake{title="Recommending action without using the figures"}
A recommendation such as "get an overdraft" earns little. Say how much is needed, in which month, and why the chosen action suits the business.
:::

## Exam tips

:::exam-tip
The cash budget is examined in ZIMSEC Papers 1 to 3 (Form 6) and Cambridge Paper 4 (A Level only), and is one of the most common ZIMSEC Paper 2 questions. For *prepare*, give a clear heading and column for each month, separate receipts and payments, show totals, net cash flow, opening and closing balances, and check that the closing balance carries forward correctly.
:::

:::exam-tip
For *comment*, *advise* or *evaluate*, state the month and size of the lowest balance, the cause (use the figures), two actions with a cost or risk for each, and a recommendation. Mention that the budget is only a forecast.
:::

## Summary

:::summary
- A cash budget lists the receipts and payments in the month they occur and ends with the closing bank balance.
- Exclude depreciation and other non-cash items; include capital items, drawings, dividends and loans.
- Closing balance = opening balance + receipts - payments, and it becomes the next month's opening balance.
- Discounts reduce the cash received or paid.
- Deficits are solved by delaying payments, speeding up receipts, borrowing or leasing; surpluses can be used to earn discounts, repay loans or invest.
- Recommendations must use the figures and weigh costs and risks.
:::
`;
writeLesson("budget/cash-budget.md", front("budget.cash-budget", "The cash budget", "Prepare a monthly cash budget from sales, purchases, expenses, credit terms, discounts, capital items and loans, exclude non-cash items, and recommend action for a deficit or surplus.", "aacc.budget.cash-budget", 55), body);
