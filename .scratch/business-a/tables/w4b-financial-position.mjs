// Writes lessons/accounts/financial-position.md from checked figures.
import { positionStatement, ratios, table, chk, r2, fmt } from "../lib.mjs";
import { lesson, D } from "./w4b-lib.mjs";

const p1 = positionStatement({
  business: "Hlalani Hardware Ltd (a fictional company)", date: "31 December 2025",
  nonCurrentAssets: [["Land and buildings", 180000], ["Machinery and vehicles", 96000]],
  currentAssets: [["Inventories", 41000], ["Trade receivables", 28500], ["Cash", 12400]],
  currentLiabilities: [["Trade payables", 33700], ["Tax payable", 8300]],
  nonCurrentLiabilities: [["Bank loan", 60000]],
  equity: [["Issued shares", 150000], ["Reserves", 105900]],
});
chk(p1.netCurrentAssets, 39900); chk(p1.netAssets, 255900); chk(p1.capitalEmployed, 315900);
chk(87900 + 18000, 105900);
const p2 = positionStatement({
  business: "Hlalani Hardware Ltd (a fictional company)", date: "31 December 2025 (amended)",
  nonCurrentAssets: [["Land and buildings", 180000], ["Machinery and vehicles", 96000 + 24000]],
  currentAssets: [["Inventories", 41000], ["Trade receivables", 23500], ["Cash", 12400]],
  currentLiabilities: [["Trade payables", 57700], ["Tax payable", 8300]],
  nonCurrentLiabilities: [["Bank loan", 60000]],
  equity: [["Issued shares", 150000], ["Reserves", 100900]],
});
chk(p2.netCurrentAssets, 10900); chk(p2.netAssets, 250900);
const cr1 = ratios.currentRatio(p1.currentAssets, p1.currentLiabilities), cr2 = ratios.currentRatio(p2.currentAssets, p2.currentLiabilities);
chk(cr1, 1.95, 1e-9); chk(cr2, 1.16515, 1e-4);
const cmp = table(["US\\$", "Before", "After", "Change"], [
  ["Non-current assets", 276000, 300000, 24000], ["Current assets", p1.currentAssets, p2.currentAssets, p2.currentAssets - p1.currentAssets],
  ["Current liabilities", p1.currentLiabilities, p2.currentLiabilities, p2.currentLiabilities - p1.currentLiabilities], ["Net current assets", p1.netCurrentAssets, p2.netCurrentAssets, p2.netCurrentAssets - p1.netCurrentAssets],
  ["Net assets", p1.netAssets, p2.netAssets, p2.netAssets - p1.netAssets], ["Reserves", 105900, 100900, -5000], ["Current ratio (x : 1)", cr1.toFixed(2), cr2.toFixed(2), (cr2 - cr1).toFixed(2)],
]);

const body = `
## Introduction

If the statement of profit or loss is a film of a year's trading, the **statement of financial position** is a photograph taken on the last day. It shows what the business **owns** (assets), what it **owes** (liabilities) and what is left for the owners (equity) on one date. Hlalani Hardware Ltd, a fictional company in Chinhoyi, wants to borrow money for a bigger yard. The bank will look first at what the company owns and owes, and at how its profits have built up its reserves.

This lesson is tested in ZIMSEC Business Studies (Form 6) and Business Enterprise Skills (Form 5) and in Cambridge **A Level** Paper 3 and Paper 4. Cambridge asks you to **explain** the purpose and contents, to **amend** the statement for a change and to explain the **relationship with the statement of profit or loss**; ZIMSEC also asks for a straightforward statement to be drawn up.

:::keyfact{title="ZIMSEC and Cambridge terms"}
| ZIMSEC | Cambridge |
| --- | --- |
| Balance sheet; fixed assets; stock; debtors; creditors; long-term liabilities; capital and reserves; working capital | Statement of financial position; non-current assets; inventories; trade receivables; trade payables; non-current liabilities; equity (issued shares and reserves); net current assets |

Both boards use the same logic. The layout here is: non-current assets + net current assets − non-current liabilities = net assets = equity.
:::

## Key definitions

:::definition{term="Statement of financial position"}
A financial statement that lists the assets, liabilities and equity of a business at a particular date.
:::

:::definition{term="Net current assets"}
Current assets less current liabilities, also called working capital.
:::

:::definition{term="Net assets"}
Total assets less total liabilities; it equals the owners' equity.
:::

:::definition{term="Reserves"}
The profits kept in the business over time, plus other gains, that belong to the owners.
:::

## Contents

:::keyfact{title="The layout"}
**Non-current assets** (used for more than a year: land, buildings, machinery, vehicles; shown at net book value, cost less accumulated depreciation)
+ **Current assets** (inventories, trade receivables, cash) − **Current liabilities** (trade payables, overdraft, tax payable, due within a year) = **Net current assets**
− **Non-current liabilities** (loans due after more than a year)
= **Net assets** = **Equity** (issued shares + reserves).
:::

The statement **balances** because what the business has (net assets) was paid for by the owners (equity). **Capital employed** = issued shares + reserves + non-current liabilities, which equals non-current assets + net current assets.

### Relationships with the statement of profit or loss

- **Retained profit** of the year is added to **reserves**: closing reserves = opening reserves + retained profit.
- **Depreciation** reduces the **net book value** of non-current assets and is an expense in the statement of profit or loss.
- **Closing inventory** is both a current asset and a deduction in cost of sales.
- **Tax** unpaid at the year end is a **current liability**; **dividends** declared but not paid are also current liabilities.
- **Revenue on credit** raises trade receivables; **purchases on credit** raise trade payables.

## Amending the statement

For a given change, apply **both sides** of the transaction and check that the statement still balances:

1. decide which assets, liabilities or reserves change, and by how much;
2. recalculate the subtotals (current assets, current liabilities, net current assets, net assets);
3. check that net assets equal equity.

Buying a non-current asset **on credit** raises non-current assets and current liabilities, so net current assets fall but net assets do not. Writing off a bad debt reduces receivables and, through profit, reserves, so net assets fall.

:::worked-solution[Example 1: the statement of financial position]
**Context.** The statement of financial position of Hlalani Hardware Ltd (a fictional company) at 31 December 2025 is below. Reserves at the start of the year were US$87,900 and the company's retained profit for the year was US$18,000.

${p1.md}

1. Net current assets = 81,900 − 42,000 = ${D}39,900. Total assets less current liabilities = 276,000 + 39,900 = ${D}315,900, which is also the **capital employed** (150,000 + 105,900 + 60,000).
2. Net assets = 315,900 − 60,000 = ${D}255,900, which equals total equity: the statement balances.
3. **Link with profit.** Closing reserves = 87,900 + 18,000 = ${D}105,900.
4. **Interpretation.** The company's current ratio is ${cr1.toFixed(2)} : 1, so it can pay its short-term debts. Land and buildings are two-thirds of non-current assets, which are good security for a lender. Of the capital employed of ${D}315,900, the bank loan is 19%.
5. **Judgement.** The position is sound. The statement shows values at one date and at net book value, not market value, so a lender would also want the cash flow forecast.
:::

:::worked-solution[Example 2: case analysis, amending for two changes]
**Context.** The directors discover two items that were not recorded: (i) machinery worth ${D}24,000 was bought on credit from a supplier; (ii) a customer who owed ${D}5,000 has gone out of business and the debt must be written off.

**Point.** One change affects the structure of the statement without changing net assets; the other reduces net assets and reserves.

**Application.** (i) Non-current assets rise by ${D}24,000 and trade payables rise by ${D}24,000, so net current assets fall by ${D}24,000. (ii) Trade receivables fall by ${D}5,000, and since the write-off is a loss, reserves fall by ${D}5,000.

${cmp}

**Analysis.** Net assets fall by ${D}5,000 only (255,900 to 250,900), but net current assets fall from ${D}39,900 to ${D}10,900 and the current ratio from ${cr1.toFixed(2)} to ${cr2.toFixed(2)} : 1. The company has become much less liquid because it now owes the supplier for the machinery, even though its long-term position is stronger.

**Judgement.** The company can still pay its debts, but with a current ratio of ${cr2.toFixed(2)} : 1 it should arrange payment terms with the supplier and improve its credit control. The statement shows a single date, so the timing of the supplier's payment is the important further information.
:::

## Common mistakes

:::mistake{title="Putting items in the wrong section"}
Loans repayable after more than a year are non-current liabilities; the part due within a year, tax payable and the overdraft are current liabilities. Check the due date.
:::

:::mistake{title="Forgetting the double entry when amending"}
Every change affects two items. If only one side is changed the statement will not balance.
:::

:::mistake{title="Confusing net assets with net current assets"}
Net current assets are current assets less current liabilities. Net assets are all assets less all liabilities and equal equity.
:::

## Exam tips

:::exam-tip
ZIMSEC Business Studies Papers 1 and 2 and Business Enterprise Skills Papers 1 and 2 ask you to *state*, *draw up* and *explain* the balance sheet; Cambridge Papers 3 and 4 ask you to *explain* its purpose, *calculate* items, *amend* it and explain its link with the statement of profit or loss. Work through the layout in order, show each subtotal, check that net assets equal equity and, for an amendment, show both sides of the change and the effect on liquidity.
:::

## Summary

:::summary
- The statement of financial position lists assets, liabilities and equity at a particular date.
- Non-current assets + net current assets − non-current liabilities = net assets = equity.
- Capital employed = issued shares + reserves + non-current liabilities.
- Retained profit is added to reserves; depreciation reduces the net book value of assets.
- To amend the statement, change both sides of the transaction and check that it still balances.
- It shows one date and book values, so it must be read with the statement of profit or loss and cash flow information.
:::
`;
lesson("accounts/financial-position", { key: "accounts.financial-position", title: "The statement of financial position", summary: "The purpose and contents of the statement of financial position, its relationship with the statement of profit or loss, amending it for a given change and drawing up and interpreting a straightforward statement.", concept: "abus.accounts.financial-position", minutes: 55 }, body.replace(/US\$(?=\d)/g, "US\\$"));
