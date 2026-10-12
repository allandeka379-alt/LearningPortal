// Lesson generator: company.cash-flow-operating
import { fmt, chk, check, r2, sum, table } from "../lib.mjs";
import { writeLesson, front, grid, heading } from "./w3a-lib.mjs";
import { cfModel } from "./w3a-models.mjs";

// Example 1
const d1 = {
  name: "Murewa Poultry Ltd",
  open: { cost: 240000, accDep: 78000, inv: 28400, rec: 21700, bank: 9600, pay: 17300, taxPay: 6200, sc: 120000, prem: 20000, loan: 50000 },
  y: { pbt: 58200, intExp: 3600, dep: 14800, disp: { cost: 12000, accDep: 8500, proceeds: 2100 }, add: 31000, dInv: 5400, dRec: 3900, dPay: -2600, tax: 15200, taxPaid: 13900, divPaid: 9000, loanChange: 0 },
};
const m1 = cfModel(d1);
chk(m1.dispProfit, -1400); chk(m1.beforeWc, 58200 + 14800 + 1400 + 3600);
chk(m1.wc, -5400 - 3900 - 2600);
chk(m1.cashGen, 78000 - 11900);
const opRows = [["Profit before tax", null, d1.y.pbt], ["Depreciation", null, d1.y.dep], ["Loss on disposal of non-current assets", null, 1400], ["Finance costs", null, d1.y.intExp], ["Operating profit before working capital changes", null, m1.beforeWc], ["Increase in inventory", null, -d1.y.dInv], ["Increase in trade receivables", null, -d1.y.dRec], ["Decrease in trade payables", null, d1.y.dPay], ["**Cash generated from operations**", null, m1.cashGen], ["Interest paid", null, -d1.y.intExp], ["Income tax paid", null, -d1.y.taxPaid], ["**Net cash from operating activities**", null, m1.netOp]];
const opTable1 = heading(d1.name, "Cash generated from operations (extract of the statement of cash flows)", "for the year ended 31 December 2025") + "\n\n" + grid(opRows);
chk(m1.netOp, 66100 - 3600 - 13900);

// Example 2: derive from two statements of financial position
const d2 = {
  name: "Gweru Poultry Ltd",
  open: { cost: 150000, accDep: 45000, inv: 21000, rec: 18500, bank: 7000, pay: 15200, taxPay: 5400, sc: 80000, prem: 10000, loan: 30000 },
  y: { pbt: 41700, intExp: 2700, dep: 11200, disp: { cost: 14000, accDep: 9800, proceeds: 5600 }, add: 35000, dInv: -3000, dRec: 4600, dPay: 2900, tax: 10400, taxPaid: 9100, divPaid: 7500, loanChange: 0 },
};
const m2 = cfModel(d2);
const pat2 = r2(m2.c.ret - m2.retOpen + d2.y.divPaid); chk(pat2, 31300);
const taxChargeDerived = r2(m2.c.taxPay - d2.open.taxPay + d2.y.taxPaid); chk(taxChargeDerived, 10400);
const pbt2 = r2(pat2 + taxChargeDerived); chk(pbt2, d2.y.pbt);
chk(m2.dispProfit, 1400);
const note2 = `Further information: (a) dividends paid ${fmt(d2.y.divPaid)}; (b) income tax paid ${fmt(d2.y.taxPaid)}; (c) interest of ${fmt(d2.y.intExp)} was charged and paid in full; (d) depreciation charged ${fmt(d2.y.dep)}; (e) equipment which cost ${fmt(14000)} with accumulated depreciation of ${fmt(9800)} was sold for ${fmt(5600)}.`;
const opRows2 = [["Profit before tax", null, pbt2], ["Depreciation", null, d2.y.dep], ["Profit on disposal of non-current assets", null, -1400], ["Finance costs", null, d2.y.intExp], ["Operating profit before working capital changes", null, m2.beforeWc], ["Decrease in inventory", null, -d2.y.dInv], ["Increase in trade receivables", null, -d2.y.dRec], ["Increase in trade payables", null, d2.y.dPay], ["**Cash generated from operations**", null, m2.cashGen]];
const opTable2 = grid(opRows2);

const body = `## Introduction

Murewa Poultry Ltd made a profit before tax of US$${fmt(d1.y.pbt)} in 2025, but its bank balance did not rise by that amount. The directors want to know why. The answer is in the statement of cash flows, which starts with the profit and turns it into **cash generated from operations**. This lesson covers that first step. The next lesson completes the statement.

You need to know the difference between profit and cash, and you must be able to read a statement of financial position at two dates. The method (IAS 7, indirect) is the same every time: begin with profit before tax, add back items that are not cash flows or belong elsewhere, then adjust for changes in inventory, trade receivables and trade payables.

:::keyfact{title="ZIMSEC and Cambridge terms"}
| ZIMSEC (syllabus and common usage) | Cambridge 9706 |
| --- | --- |
| Cash flow statement; net cash from operating activities | Statement of cash flows; net cash from operating activities |
| Stock; debtors; creditors | Inventory; trade receivables; trade payables |
| Interest charged; loss on sale of a fixed asset | Finance costs; loss on disposal of a non-current asset |

Cash generated from operations is A Level only for Cambridge (Paper 3) and a Form 5 topic for ZIMSEC.
:::

## Key definitions

:::definition{term="Cash generated from operations"}
The cash produced by the normal trading of the business before interest and tax are paid. It starts from profit before tax and is adjusted for non-cash items and changes in working capital.
:::

:::definition{term="Indirect method"}
Calculating operating cash flow by starting with profit and adjusting for non-cash items and working capital changes, instead of listing receipts from customers and payments to suppliers.
:::

:::definition{term="Cash and cash equivalents"}
Cash in hand, bank balances and very short-term investments, less bank overdrafts repayable on demand.
:::

:::definition{term="Working capital changes"}
Changes in inventory, trade receivables and trade payables during the year. They show how much of the profit has been tied up in, or released from, working capital.
:::

## The adjustments

:::keyfact{title="Direction of each adjustment"}
- **Depreciation:** add back. It reduced profit but no cash left the business.
- **Loss on disposal:** add back. **Profit on disposal:** deduct. The cash received is shown in investing activities.
- **Finance costs:** add back, then deduct the interest actually paid below the line. Interest income is the reverse.
- **Increase in inventory or receivables:** deduct. Cash is tied up. **Decrease:** add.
- **Increase in trade payables:** add. The company has kept cash by paying later. **Decrease:** deduct.
:::

After cash generated from operations, interest paid and income tax paid are deducted to give **net cash from operating activities**. Dividends paid are in financing activities. A change in the retained earnings and tax liability can be used to work back to profit before tax if it is not given: profit for the year = closing retained earnings - opening retained earnings + dividends; income tax charge = tax paid + closing tax payable - opening tax payable; profit before tax = profit for the year + the tax charge.

:::worked-solution[Example 1: from profit before tax to cash]
For the year ended 31 December 2025 Murewa Poultry Ltd made a profit before tax of US$${fmt(d1.y.pbt)} after charging depreciation of US$${fmt(d1.y.dep)}, finance costs of US$${fmt(d1.y.intExp)} (paid in full) and a loss of US$${fmt(1400)} on the sale of equipment. Inventory rose by US$${fmt(d1.y.dInv)}, trade receivables rose by US$${fmt(d1.y.dRec)} and trade payables fell by US$${fmt(-d1.y.dPay)}. Income tax of US$${fmt(d1.y.taxPaid)} was paid. Prepare the operating activities section.

1. Add back the non-cash and non-operating items: ${fmt(d1.y.pbt)} + ${fmt(d1.y.dep)} + ${fmt(1400)} + ${fmt(d1.y.intExp)} = ${fmt(m1.beforeWc)}.
2. Working capital: -${fmt(d1.y.dInv)} - ${fmt(d1.y.dRec)} - ${fmt(-d1.y.dPay)} = ${fmt(m1.wc)}.
3. Cash generated from operations: ${fmt(m1.beforeWc)} - ${fmt(-m1.wc)} = ${fmt(m1.cashGen)}.
4. Net cash from operating activities: ${fmt(m1.cashGen)} - interest ${fmt(d1.y.intExp)} - tax ${fmt(d1.y.taxPaid)} = ${fmt(m1.netOp)}.

${opTable1}

The profit before tax of ${fmt(d1.y.pbt)} produced net operating cash of only ${fmt(m1.netOp)}, mostly because inventory, receivables and payables absorbed ${fmt(-m1.wc)}.
:::

## Working from two statements of financial position

Exams often give the statements of financial position at two dates and some extra information, but not the profit before tax. Use the retained earnings, the tax liability and the extra information to work it out.

:::worked-solution[Example 2: deriving cash generated from operations]
The statements of financial position of Gweru Poultry Ltd at 31 December 2024 and 2025 are below (2024 first).

${m2.sofpOpen}

${m2.sofpClose}

${note2} Calculate cash generated from operations.

1. Profit for the year: closing retained earnings ${fmt(m2.c.ret)} - opening ${fmt(m2.retOpen)} + dividends ${fmt(d2.y.divPaid)} = ${fmt(pat2)}.
2. Income tax charge: tax paid ${fmt(d2.y.taxPaid)} + closing payable ${fmt(m2.c.taxPay)} - opening payable ${fmt(d2.open.taxPay)} = ${fmt(taxChargeDerived)}.
3. Profit before tax: ${fmt(pat2)} + ${fmt(taxChargeDerived)} = ${fmt(pbt2)}.
4. Profit on disposal: proceeds ${fmt(5600)} - carrying amount (${fmt(14000)} - ${fmt(9800)}) = ${fmt(1400)}.
5. Working capital: inventory fell by ${fmt(-d2.y.dInv)}; receivables rose by ${fmt(d2.y.dRec)}; payables rose by ${fmt(d2.y.dPay)}.

${opTable2}
:::

## Why profit and cash differ

Profit includes depreciation, which uses no cash, and it records sales when made, not when the cash arrives. A growing business usually ties up cash in inventory and receivables. A business can be profitable and still run short of cash, for example when customers pay slowly. The cash generated from operations figure measures the cash side directly and, divided by profit, shows how well profit turns into cash.

## Common mistakes

:::mistake{title="Reversing the direction of working capital changes"}
An increase in inventory or receivables reduces cash; an increase in payables increases it. Check each by asking whether cash was tied up or released.
:::

:::mistake{title="Adding back the loss on disposal and also showing it in investing activities"}
Add the loss back to profit. The cash received (the proceeds) is the investing item.
:::

:::mistake{title="Deducting interest and tax before cash generated from operations"}
Cash generated from operations is before interest paid and tax paid; both are deducted afterwards.
:::

:::mistake{title="Using the charge for tax instead of tax paid"}
Tax paid = opening tax payable + charge - closing tax payable. Use the cash paid in the statement of cash flows.
:::

:::mistake{title="Adding back dividends paid"}
Dividends are not part of profit before tax. They belong in financing activities.
:::

## Exam tips

:::exam-tip
Tested in ZIMSEC Papers 2 and 3 and in Cambridge Paper 3. For *calculate cash generated from operations*, begin with profit before tax and set out each adjustment on its own line. For *explain why cash differs from profit*, name two reasons, depreciation and working capital, with the amounts. If profit before tax is not given, show how you worked it out.
:::

:::exam-tip
Check your answer another way: net cash from operating activities plus investing and financing cash flows must equal the change in cash and cash equivalents between the two statements. If not, look first at the direction of the working capital changes.
:::

## Summary

:::summary
- Cash generated from operations starts with profit before tax and adjusts for non-cash and non-operating items and working capital.
- Add back depreciation, losses on disposal and finance costs; deduct profits on disposal and interest income.
- Deduct increases in inventory and receivables and decreases in payables; add the opposite.
- Interest paid and tax paid are deducted after cash generated from operations.
- Profit before tax can be derived from retained earnings, dividends and the tax liability when it is not given.
:::
`;
writeLesson("company/cash-flow-operating.md", front("company.cash-flow-operating", "Cash generated from operations", "Reconcile profit before tax to cash generated from operations under the indirect method of IAS 7, reading working capital changes in the correct direction and working from two statements of financial position.", ["aacc.company.cash-flow-operating"], 55), body.split("US$").join("US\\$"));
