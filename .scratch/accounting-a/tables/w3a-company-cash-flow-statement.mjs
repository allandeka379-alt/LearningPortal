// Lesson generator: company.cash-flow-statement
import { fmt, chk, check, r2, sum, table } from "../lib.mjs";
import { writeLesson, front, grid, heading } from "./w3a-lib.mjs";
import { cfModel } from "./w3a-models.mjs";

const d1 = {
  name: "Kadoma Cotton Ltd",
  open: { cost: 320000, accDep: 112000, inv: 41500, rec: 36800, bank: -6500, pay: 29400, taxPay: 9300, sc: 150000, prem: 25000, loan: 60000 },
  y: { pbt: 74600, intExp: 5400, dep: 28500, disp: { cost: 38000, accDep: 27200, proceeds: 7900 }, add: 84000, dInv: 7300, dRec: 4800, dPay: 5600, tax: 19800, taxPaid: 17500, divPaid: 13000, issue: { nominal: 40000, premium: 20000 }, loanChange: -20000 },
};
export const m1 = cfModel(d1);
chk(m1.dispProfit, -2900);
chk(m1.net, m1.bankClose - d1.open.bank);

// Example 2: a sole proprietor (ZIMSEC)
const s = { ncaCostOpen: 90000, ncaAccOpen: 30000, inv: 12000, rec: 9000, bank: 4000, pay: 8000, loan: 10000 };
const capitalOpen = r2(s.ncaCostOpen - s.ncaAccOpen + s.inv + s.rec + s.bank - s.pay - s.loan); chk(capitalOpen, 67000);
const y = { profit: 21000, interest: 1000, dep: 6000, drawings: 9500, add: 14000, dInv: 2500, dRec: -1000, dPay: 1500, repay: 4000 };
const beforeWc = r2(y.profit + y.dep + y.interest); chk(beforeWc, 28000);
const wc = r2(-y.dInv - y.dRec + y.dPay); chk(wc, 0);
const cashGen = r2(beforeWc + wc);
const netOp = r2(cashGen - y.interest);
const netInv = -y.add;
const netFin = r2(-y.repay - y.drawings);
const net = r2(netOp + netInv + netFin); chk(net, 27000 - 14000 - 13500);
const bankClose = r2(s.bank + net);
const cl = { nca: r2(s.ncaCostOpen + y.add - (s.ncaAccOpen + y.dep)), inv: r2(s.inv + y.dInv), rec: r2(s.rec + y.dRec), bank: bankClose, pay: r2(s.pay + y.dPay), loan: r2(s.loan - y.repay) };
const capitalClose = r2(capitalOpen + y.profit - y.drawings);
check("sole trader balances", cl.nca + cl.inv + cl.rec + cl.bank - cl.pay - cl.loan, capitalClose);
const soleRows = [["**Cash flows from operating activities**"], ["Net profit", null, y.profit], ["Depreciation", null, y.dep], ["Finance costs", null, y.interest], ["Operating profit before working capital changes", null, beforeWc], ["Increase in inventory", null, -y.dInv], ["Decrease in trade receivables", null, -y.dRec], ["Increase in trade payables", null, y.dPay], ["**Cash generated from operations**", null, cashGen], ["Interest paid", null, -y.interest], ["**Net cash from operating activities**", null, netOp], ["**Cash flows from investing activities**"], ["Purchase of property, plant and equipment", null, -y.add], ["**Net cash used in investing activities**", null, netInv], ["**Cash flows from financing activities**"], ["Repayment of loan", null, -y.repay], ["Drawings", null, -y.drawings], ["**Net cash used in financing activities**", null, netFin], null, ["**Net increase (decrease) in cash and cash equivalents**", null, net], ["Cash and cash equivalents at 1 January 2025", null, s.bank], ["**Cash and cash equivalents at 31 December 2025**", null, bankClose]];
const soleCf = heading("Tendai Moyo, trading as Mbare Fresh Foods", "Statement of cash flows", "for the year ended 31 December 2025") + "\n\n" + grid(soleRows);

const netOp1 = m1.netOp;
const reconTable = table(["Reconciliation of cash and cash equivalents", "US\\$"], [["Bank overdraft at 1 January 2025", d1.open.bank], ["Net increase in cash and cash equivalents", m1.net], ["**Cash and cash equivalents at 31 December 2025**", m1.bankClose]]);

const body = `## Introduction

Kadoma Cotton Ltd started 2025 with a bank overdraft and ended it with cash in the bank. In between it bought new equipment, sold old equipment, issued shares, repaid loan notes and paid a dividend. The statement of profit or loss records none of these cash movements in full. The **statement of cash flows** explains the change in cash and cash equivalents by sorting every cash movement into one of three activities.

The previous lesson dealt with cash generated from operations. Here you complete the statement: operating, investing and financing activities, the net movement and the reconciliation with the cash and bank balances. The method follows IAS 7. Cambridge treats the statement as A Level (Paper 3); ZIMSEC asks for it in Form 5 and also for sole proprietors and partnerships.

:::keyfact{title="ZIMSEC and Cambridge terms"}
| ZIMSEC (syllabus and common usage) | Cambridge 9706 |
| --- | --- |
| Cash flow statement | Statement of cash flows |
| Debentures; loan notes | Loan notes (debentures) |
| Drawings (sole proprietors and partnerships) | Not examined: Cambridge tests companies only |
| Net book value | Carrying amount |

For a sole proprietor or partnership there is no income tax and no share issue, and drawings or partners' drawings replace dividends paid.
:::

## Key definitions

:::definition{term="Statement of cash flows"}
A statement that reports the cash receipts and payments of an entity in a period, classified into operating, investing and financing activities, and explains the change in cash and cash equivalents.
:::

:::definition{term="Investing activities"}
The purchase and sale of non-current assets and other long-term investments, and interest and dividends received on them.
:::

:::definition{term="Financing activities"}
Activities that change the size or make-up of equity and borrowing: shares issued, loan notes issued or repaid, and dividends paid.
:::

:::definition{term="Cash and cash equivalents"}
Cash in hand and at the bank plus very short-term deposits, minus bank overdrafts repayable on demand.
:::

## The layout

:::keyfact{title="Order of the statement"}
1. **Operating activities:** cash generated from operations, then interest paid and income tax paid, giving net cash from operating activities.
2. **Investing activities:** purchase of property, plant and equipment (negative), proceeds of sale (positive), interest received and dividends received.
3. **Financing activities:** proceeds of issue of shares (nominal value plus premium), loan notes issued or repaid, dividends paid.
4. **Net increase or decrease** in cash and cash equivalents, then the opening balance, giving the closing balance.
:::

Find each figure in the statements of financial position and the notes. The cash paid for new equipment is closing cost - opening cost + cost of equipment sold. Tax paid is the opening liability plus the charge less the closing liability. A share issue brings in both the nominal value and the premium. Interest paid is the expense adjusted for any accrued interest. Dividends paid are the dividends declared adjusted for amounts still unpaid. An overdraft is a negative cash equivalent, not a financing item.

:::worked-solution[Example 1: statement of cash flows of a company]
The statements of financial position of Kadoma Cotton Ltd are below. During the year equipment which cost US$${fmt(38000)} and had accumulated depreciation of US$${fmt(27200)} was sold for US$${fmt(7900)}; depreciation charged was US$${fmt(d1.y.dep)}; profit before tax was US$${fmt(d1.y.pbt)} after finance costs of US$${fmt(d1.y.intExp)} (paid in full); tax paid was US$${fmt(d1.y.taxPaid)}; dividends paid were US$${fmt(d1.y.divPaid)}; ${fmt(40000)} shares of US$1 were issued at US$1.50; loan notes of US$${fmt(20000)} were repaid. Prepare the statement of cash flows.

${m1.sofpOpen}

${m1.sofpClose}

1. Purchases of equipment: closing cost ${fmt(m1.c.cost)} - opening cost ${fmt(d1.open.cost)} + cost of equipment sold ${fmt(38000)} = ${fmt(d1.y.add)}.
2. Loss on disposal: proceeds ${fmt(7900)} - carrying amount (${fmt(38000)} - ${fmt(27200)}) = ${fmt(m1.dispProfit)}, a loss of ${fmt(-m1.dispProfit)}.
3. Share issue: ${fmt(40000)} × US$1.50 = ${fmt(60000)} (nominal ${fmt(40000)} plus premium ${fmt(20000)}).
4. Working capital: inventory rose ${fmt(d1.y.dInv)}, receivables rose ${fmt(d1.y.dRec)} and payables rose ${fmt(d1.y.dPay)}: net ${fmt(m1.wc)}.

${m1.cf}

${reconTable}

Check: the closing cash and cash equivalents of ${fmt(m1.bankClose)} equals the bank balance in the 2025 statement of financial position.
:::

## Sole proprietors and partnerships (ZIMSEC)

The same structure applies to a business with no company features. There is no income tax and no share issue. The starting point is net profit, and drawings are a financing outflow in place of dividends. Introduced capital would be a financing inflow.

:::worked-solution[Example 2: statement of cash flows of a sole proprietor]
Tendai Moyo's business, Mbare Fresh Foods, had at 1 January 2025: property, plant and equipment at cost US$${fmt(s.ncaCostOpen)} less depreciation US$${fmt(s.ncaAccOpen)}, inventory US$${fmt(s.inv)}, trade receivables US$${fmt(s.rec)}, bank US$${fmt(s.bank)}, trade payables US$${fmt(s.pay)} and a loan of US$${fmt(s.loan)}. In 2025 the net profit was US$${fmt(y.profit)} after depreciation of US$${fmt(y.dep)} and loan interest of US$${fmt(y.interest)} (paid). Equipment costing US$${fmt(y.add)} was bought for cash. Inventory rose by US$${fmt(y.dInv)}, trade receivables fell by US$${fmt(-y.dRec)} and trade payables rose by US$${fmt(y.dPay)}. Drawings were US$${fmt(y.drawings)} and US$${fmt(y.repay)} of the loan was repaid. Prepare the statement of cash flows.

${soleCf}

Check: closing bank ${fmt(bankClose)}. Closing capital is ${fmt(capitalOpen)} + ${fmt(y.profit)} - ${fmt(y.drawings)} = ${fmt(capitalClose)}, which equals net assets of ${fmt(r2(cl.nca + cl.inv + cl.rec + cl.bank - cl.pay - cl.loan))}.
:::

## Interpreting the statement

In Example 1, net cash from operating activities was ${fmt(netOp1)}, which paid for most of the ${fmt(d1.y.add)} spent on equipment together with the dividend, but the company also relied on the ${fmt(60000)} raised from the share issue and still repaid ${fmt(20000)} of loan notes. A healthy company finances its investment from operating cash, borrows or issues shares for expansion and repays debt when cash allows. If operating cash is negative while the company keeps paying dividends, it is paying out from borrowing or sales of assets, which cannot continue.

## Common mistakes

:::mistake{title="Putting the share premium in the wrong place"}
The financing inflow is the full cash received, nominal value plus premium, not only the nominal value.
:::

:::mistake{title="Treating a bank overdraft as financing"}
For IAS 7 purposes an overdraft repayable on demand is part of cash and cash equivalents. Its change is not a financing flow.
:::

:::mistake{title="Using the depreciation charge for purchases of equipment"}
The cash paid for new equipment comes from the movement in cost plus the cost of equipment sold, not from depreciation.
:::

:::mistake{title="Showing dividends declared instead of dividends paid"}
Use the dividends actually paid. If a final dividend was declared but unpaid, it is not a cash outflow of the year.
:::

:::mistake{title="Forgetting that sole proprietors have drawings, not dividends"}
In ZIMSEC questions for sole proprietors, deduct drawings in financing activities and include no tax.
:::

## Exam tips

:::exam-tip
Tested in ZIMSEC Papers 2 and 3 (company, sole proprietor or partnership) and Cambridge Paper 3. For *prepare*, set out the three sections with subtotals, then the net change and the reconciliation with the opening and closing cash. Show a working for each figure that is not given: tax paid, purchases of equipment, share issue proceeds and dividends paid. For *comment*, compare the three subtotals.
:::

:::exam-tip
The closing cash and cash equivalents must equal the bank (and cash) figure in the closing statement of financial position. If it does not, check the direction of each working capital change and that every statement of financial position movement has been classified.
:::

## Summary

:::summary
- The statement of cash flows has operating, investing and financing sections and explains the change in cash and cash equivalents.
- Operating activities start from profit before tax, then deduct interest paid and tax paid.
- Investing: purchase and sale of non-current assets; financing: shares issued, loan notes issued or repaid and dividends paid (drawings for sole proprietors and partners).
- Cash for new assets = movement in cost + cost of assets sold; tax paid = opening liability + charge - closing liability.
- The closing figure agrees with the bank and cash in the statement of financial position; overdrafts are part of cash equivalents.
:::
`;
writeLesson("company/cash-flow-statement.md", front("company.cash-flow-statement", "Statement of cash flows", "Prepare the full IAS 7 statement of cash flows for a company, and for a sole proprietor, with operating, investing and financing activities, and reconcile to cash and cash equivalents.", ["aacc.company.cash-flow-statement"], 65), body.split("US$").join("US\\$"));
