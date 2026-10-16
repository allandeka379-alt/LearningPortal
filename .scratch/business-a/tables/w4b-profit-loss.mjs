// Writes lessons/accounts/profit-loss.md from checked figures.
import { profitLoss, ratios, table, chk, r2, fmt } from "../lib.mjs";
import { lesson, D } from "./w4b-lib.mjs";

// Example 1
const cos1 = 42000 + 318000 - 48000;
chk(cos1, 312000);
const exp1 = [["Wages", 92000], ["Rent and rates", 36000], ["Electricity", 21500], ["Depreciation", 27500], ["Marketing", 14000], ["Other expenses", 8000]];
const p1 = profitLoss({ business: "Tafadzwa Mills Ltd (a fictional company)", period: "31 March 2026", revenue: 585000, costOfSales: cos1, expenses: exp1, financeCosts: 9000, tax: 13000, dividends: 20000 });
chk(p1.grossProfit, 273000); chk(p1.profitFromOperations, 74000); chk(p1.profitBeforeTax, 65000); chk(p1.profitForYear, 52000); chk(p1.retained, 32000);
const cosT = table(["Cost of sales workings", "US\\$"], [["Opening inventory", 42000], ["Add purchases", 318000], ["Goods available for sale", 360000], ["Less closing inventory", -48000], ["**Cost of sales**", cos1]], ["l", "r"]);

// Example 2: amendments
const cos2 = 42000 + 318000 - 42000;
const exp2 = [["Wages", 92000], ["Rent and rates", 36000], ["Electricity", 21500], ["Depreciation", 27500 + 3500], ["Marketing", 14000], ["Other expenses", 8000]];
const p2 = profitLoss({ business: "x", period: "x", revenue: 585000, costOfSales: cos2, expenses: exp2, financeCosts: 9000, tax: 11100, dividends: 20000 });
chk(p2.grossProfit, 267000); chk(p2.profitFromOperations, 64500); chk(p2.profitBeforeTax, 55500); chk(p2.profitForYear, 44400);
chk(0.2 * p2.profitBeforeTax, 11100);
const gm1 = ratios.grossMargin(p1.grossProfit, 585000), gm2 = ratios.grossMargin(p2.grossProfit, 585000), om1 = ratios.operatingMargin(p1.profitFromOperations, 585000), om2 = ratios.operatingMargin(p2.profitFromOperations, 585000);
chk(gm1, 46.667, 1e-3); chk(gm2, 45.641, 1e-3); chk(om1, 12.650, 1e-3); chk(om2, 11.026, 1e-3);
const amend = table(["US\\$", "Before", "After", "Change"], [
  ["Cost of sales", cos1, cos2, cos2 - cos1], ["Gross profit", p1.grossProfit, p2.grossProfit, p2.grossProfit - p1.grossProfit],
  ["Total expenses", 199000, 202500, 3500], ["Profit from operations", p1.profitFromOperations, p2.profitFromOperations, p2.profitFromOperations - p1.profitFromOperations],
  ["Profit before tax", p1.profitBeforeTax, p2.profitBeforeTax, p2.profitBeforeTax - p1.profitBeforeTax], ["Tax at 20%", 13000, 11100, -1900], ["Profit for the year", p1.profitForYear, p2.profitForYear, p2.profitForYear - p1.profitForYear],
  ["Gross profit margin (%)", gm1.toFixed(1), gm2.toFixed(1), (gm2 - gm1).toFixed(1)], ["Operating profit margin (%)", om1.toFixed(1), om2.toFixed(1), (om2 - om1).toFixed(1)],
]);

const body = `
## Introduction

At the end of its financial year, Tafadzwa Mills Ltd, a fictional maize-milling company in Gokwe, must tell its shareholders, its bank and the tax authority how well it traded. The **statement of profit or loss** does this: it matches the revenue earned in the year with the costs of earning it, and ends with the profit that belongs to the owners. Together with the statement of financial position (next lesson), it is the basis for every ratio in the later lessons.

This lesson is tested in ZIMSEC Business Studies (Form 6) and Business Enterprise Skills (Form 5) and in Cambridge **A Level** Paper 3 and Paper 4. Cambridge asks you to **explain** the purpose and contents, to **amend** a statement for a change and to **interpret** it; it does not ask you to draw up a full set of accounts. ZIMSEC asks for straightforward statements to be drawn up from given data.

:::keyfact{title="ZIMSEC and Cambridge terms"}
| ZIMSEC | Cambridge |
| --- | --- |
| Income statement; trading and profit and loss account; turnover or sales; stock; net profit; retained profit | Statement of profit or loss; revenue; inventory; profit from operations (operating profit); profit for the year; retained earnings |

The layout in this lesson follows Cambridge wording. Treat "net profit" (ZIMSEC) as the profit for the year after finance costs and tax unless the question defines it otherwise.
:::

## Key definitions

:::definition{term="Statement of profit or loss"}
A financial statement that shows a business's revenue, costs and profit for a stated period, usually a year.
:::

:::definition{term="Cost of sales"}
The direct cost of the goods sold in the period: opening inventory plus purchases less closing inventory.
:::

:::definition{term="Profit from operations"}
Gross profit less the expenses of running the business, before finance costs and tax.
:::

:::definition{term="Profit for the year"}
The profit left after all costs, finance costs and tax have been deducted; it belongs to the owners.
:::

## Purpose and contents

The statement is prepared for **owners** (to judge management), **lenders** (to judge the ability to pay interest), the **tax authority** (to assess tax), **managers** (to control costs) and **employees**. It follows the **accruals** idea: revenue and costs are recorded for the period in which they arise, not when cash is paid.

:::keyfact{title="Layout"}
Revenue − cost of sales = **gross profit**.
Gross profit − expenses (wages, rent, utilities, marketing, depreciation, other) = **profit from operations**.
Profit from operations − finance costs (interest) = **profit before tax**.
Profit before tax − tax = **profit for the year**.
Profit for the year − dividends = **retained profit** for the year, added to reserves in the statement of financial position.
:::

- **Dividends** are a distribution of profit and are not an expense. They are shown below profit for the year.
- **Depreciation** is an expense in the statement of profit or loss; it does not involve a cash payment in the year.
- **Cost of sales** adjusts for inventory: goods bought but unsold are not a cost of the year.
- **Capital items**, such as buying a vehicle, are not expenses; only the depreciation on them is.

## Amending a statement

A change in the data (an error found, an extra expense, a write-off of damaged inventory, a price change) must be worked **through the statement in order**:

1. decide which line changes and by how much;
2. recalculate each subtotal below it (gross profit, profit from operations, profit before tax);
3. recalculate tax if it is a percentage of profit;
4. state the effect on profit and, if asked, on ratios.

A write-off of inventory raises the cost of sales (so it lowers gross profit); an omitted depreciation charge raises expenses (so it lowers profit from operations but not gross profit).

:::worked-solution[Example 1: drawing up a statement from data]
**Context.** For the year ended 31 March 2026, Tafadzwa Mills Ltd (a fictional company) has revenue of ${D}585,000; opening inventory ${D}42,000; purchases ${D}318,000; closing inventory ${D}48,000; wages ${D}92,000; rent and rates ${D}36,000; electricity ${D}21,500; depreciation ${D}27,500; marketing ${D}14,000; other expenses ${D}8,000; finance costs ${D}9,000; tax ${D}13,000; dividends ${D}20,000.

${cosT}

${p1.md}

1. Gross profit = 585,000 − 312,000 = ${D}273,000, a margin of ${gm1.toFixed(1)}%.
2. Total expenses = ${D}199,000, giving profit from operations of ${D}74,000 (a margin of ${om1.toFixed(1)}%).
3. Profit for the year = 74,000 − 9,000 − 13,000 = ${D}52,000; after dividends of ${D}20,000, ${D}32,000 is retained and added to reserves.
4. **Judgement.** The company is profitable, and the profit is well covered: the dividend is a little over a third of the profit. A comparison with the previous year would show whether the margins are improving.
:::

:::worked-solution[Example 2: case analysis, amending the statement]
**Context.** After the first draft, the directors discover that inventory with a cost of ${D}6,000 was damaged by water and must be written off, and that depreciation on a new machine of ${D}3,500 was left out. The tax charge is 20% of profit before tax.

**Point.** Both corrections reduce profit but affect different lines.

**Application.** The write-off reduces closing inventory from ${D}48,000 to ${D}42,000, so cost of sales rises to ${D}${fmt(cos2)}. The depreciation is added to expenses, which rise to ${D}202,500. Tax falls to 20% × ${D}55,500 = ${D}11,100.

${amend}

**Analysis.** The write-off lowers the gross margin (from ${gm1.toFixed(1)}% to ${gm2.toFixed(1)}%) as well as profit, while the depreciation lowers only the operating profit. The profit for the year falls by ${D}7,600, which is less than the ${D}9,500 of extra costs, because tax is lower by ${D}1,900.

**Judgement.** The corrected profit of ${D}44,400 is the figure that shareholders and the bank should use. The dividend of ${D}20,000 is now covered 2.2 times instead of 2.6 times, so it is still safe. Ignoring the corrections would overstate profit and tax.
:::

## Common mistakes

:::mistake{title="Treating dividends or capital purchases as expenses"}
Dividends are a share-out of profit, and the purchase of an asset is capital expenditure. Only depreciation of the asset appears as an expense.
:::

:::mistake{title="Using closing inventory the wrong way in cost of sales"}
Cost of sales = opening inventory + purchases − closing inventory. Adding closing inventory overstates the cost of sales.
:::

:::mistake{title="Not carrying a correction through to the lower lines"}
After changing one line, recalculate every subtotal below it and any tax that depends on profit.
:::

## Exam tips

:::exam-tip
ZIMSEC Business Studies Papers 1 and 2 and Business Enterprise Skills Papers 1 and 2 ask you to *state*, *draw up* and *explain* the income statement; Cambridge Papers 3 and 4 ask you to *explain* its purpose, *calculate* items, *amend* it and *assess* the impact of a change. Show each subtotal, use the correct order, keep dividends below profit for the year, and when you assess a change say which profit figure and which ratio is affected and by how much.
:::

## Summary

:::summary
- The statement of profit or loss matches revenue with the costs of earning it for a period.
- Revenue − cost of sales = gross profit; − expenses = profit from operations; − finance costs and tax = profit for the year.
- Cost of sales = opening inventory + purchases − closing inventory.
- Dividends are not an expense; depreciation is an expense but not a cash payment.
- To amend the statement, change the affected line, recalculate every subtotal below and any tax.
- It is used by owners, lenders, managers, employees and the tax authority.
:::
`;
lesson("accounts/profit-loss", { key: "accounts.profit-loss", title: "The statement of profit or loss (income statement)", summary: "The purpose and contents of the statement of profit or loss, drawing up a straightforward statement from data, amending it for a given change and interpreting the result.", concept: "abus.accounts.profit-loss", minutes: 55 }, body);
