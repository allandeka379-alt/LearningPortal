// Writes lessons/ratios/liquidity.md from checked figures.
import { positionStatement, ratios, table, chk, r2, fmt } from "../lib.mjs";
import { lesson, D } from "./w4b-lib.mjs";

const pos = positionStatement({
  business: "Mapfumo Bakery Ltd (a fictional company)", date: "31 December 2025",
  nonCurrentAssets: [["Property and equipment", 212000]],
  currentAssets: [["Inventories", 46500], ["Trade receivables", 37500], ["Cash", 9800]],
  currentLiabilities: [["Trade payables", 40200], ["Bank overdraft", 15100], ["Tax payable", 7700]],
  nonCurrentLiabilities: [["Bank loan", 68000]],
  equity: [["Issued shares", 110000], ["Reserves", 64800]],
});
chk(pos.currentAssets, 93800); chk(pos.currentLiabilities, 63000); chk(pos.netAssets, 174800);
const cr25 = ratios.currentRatio(93800, 63000), at25 = ratios.acidTest(93800, 46500, 63000);
const cr24 = ratios.currentRatio(86400, 45000), at24 = ratios.acidTest(86400, 31200, 45000);
chk(cr25, 1.48889, 1e-4); chk(at25, 0.75079, 1e-4); chk(cr24, 1.92, 1e-9); chk(at24, 1.22667, 1e-4);
const caTable = table(["US\\$", "2024", "2025"], [
  ["Inventories", 31200, 46500], ["Trade receivables", 33800, 37500], ["Cash", 21400, 9800], ["**Current assets**", 86400, 93800],
  ["Current liabilities", 45000, 63000],
]);
const ratioTable = table(["Ratio", "2024", "2025"], [["Current ratio", `${cr24.toFixed(2)} : 1`, `${cr25.toFixed(2)} : 1`], ["Acid test ratio", `${at24.toFixed(2)} : 1`, `${at25.toFixed(2)} : 1`]], ["l", "r", "r"]);

// Example 2
const A = { ca: 120000, inv: 78000, cl: 60000 }, B = { ca: 51000, inv: 21000, cl: 42000 };
const aC = ratios.currentRatio(A.ca, A.cl), aA = ratios.acidTest(A.ca, A.inv, A.cl), bC = ratios.currentRatio(B.ca, B.cl), bA = ratios.acidTest(B.ca, B.inv, B.cl);
chk(aC, 2, 1e-9); chk(aA, 0.7, 1e-9); chk(bC, 1.21429, 1e-4); chk(bA, 0.71429, 1e-4);
const firms = table(["US\\$ unless stated", "Rudo's Wholesale", "Tafara's Supermarket"], [
  ["Current assets", A.ca, B.ca], ["of which inventories", A.inv, B.inv], ["Current liabilities", A.cl, B.cl],
  ["Current ratio", `${aC.toFixed(2)} : 1`, `${bC.toFixed(2)} : 1`], ["Acid test ratio", `${aA.toFixed(2)} : 1`, `${bA.toFixed(2)} : 1`],
], ["l", "r", "r"]);

const body = `
## Introduction

Mapfumo Bakery Ltd is a fictional company in Gweru. Its profit has been good, yet last month the owner had to ask the bank for an overdraft to pay the flour supplier and the wages on time. A business can be profitable and still run out of cash. **Liquidity** is the ability of a business to pay its short-term debts when they fall due. A bank manager, a supplier or a rival looking at the accounts uses liquidity ratios to judge whether a business is safe to lend to or to supply on credit.

This lesson is tested in ZIMSEC Business Studies and Business Enterprise Skills (Form 6) and in Cambridge **A Level** Paper 3 and Paper 4. You should know the items in the statement of financial position and the difference between current assets and current liabilities. Ratios are not printed in Cambridge papers, so you must learn the formulae.

:::keyfact{title="ZIMSEC and Cambridge terms"}
| ZIMSEC | Cambridge |
| --- | --- |
| Stock; debtors; creditors; working capital ratio (current ratio); liquid (quick) ratio or acid test | Inventory; trade receivables; trade payables; current ratio; acid test ratio |

Both boards use the same two ratios, written as **x : 1**. Compare the figures with an earlier year and with similar firms rather than with a fixed "rule".
:::

## Key definitions

:::definition{term="Liquidity"}
The ability of a business to meet its short-term debts as they fall due, using its cash and assets that can quickly be turned into cash.
:::

:::definition{term="Current ratio"}
A measure of liquidity that compares all current assets with current liabilities.
:::

:::definition{term="Acid test ratio"}
A stricter measure of liquidity that compares current assets excluding inventories with current liabilities.
:::

:::definition{term="Working capital"}
Current assets less current liabilities, the money available for the day-to-day running of the business.
:::

## The formulae

:::keyfact{title="Liquidity ratios"}
- Current ratio = current assets ÷ current liabilities (shown as x : 1)
- Acid test ratio = (current assets − inventories) ÷ current liabilities (shown as x : 1)
- Working capital = current assets − current liabilities
:::

Inventories are taken out of the acid test because they are the **least liquid** current asset: they must be sold, and possibly sold on credit, before cash arrives.

## Interpreting the ratios

A current ratio of **1.5 to 2 : 1** and an acid test of about **1 : 1** are often quoted as comfortable, but these are only guidelines. What is acceptable depends on the industry:

- A supermarket sells for cash and turns its inventory over quickly, so it can run safely with a **low** ratio.
- A firm with long credit periods or slow-moving inventory (a furniture maker or a hardware wholesaler) needs a **higher** ratio.

A ratio that is **too low** warns of difficulty paying suppliers, wages and loans on time: the business may need an overdraft, lose supplier trust or even fail (overtrading). A ratio that is **too high** is not necessarily good either: it may mean that too much money is tied up in idle cash, slow-selling inventory or customers who pay late, which earns nothing.

Always compare:

- with the **previous year** (is it improving or worsening?);
- with **similar businesses**;
- with the **acid test** (a good current ratio hides trouble if it depends on inventory).

## Improving liquidity

| Method | How it helps | Drawback |
| --- | --- | --- |
| Sell unused non-current assets | Raises cash quickly | May be needed in future; one-off |
| Reduce inventory | Frees cash | Risk of running out and losing sales |
| Collect from customers faster (credit control, shorter credit terms, discounts) | Brings cash in sooner | May lose customers who want credit |
| Delay payments to suppliers | Keeps cash longer | May lose supplier goodwill or discounts |
| Replace short-term debt with a long-term loan | Lowers current liabilities | Raises gearing and interest |
| Sale and leaseback of a building | Releases cash but keeps use | Rent must be paid; asset lost |

Which method is best depends on **why** liquidity is poor: if the inventory is bloated, reduce it; if customers are slow, tighten credit.

:::worked-solution[Example 1: calculating and interpreting liquidity ratios]
**Context.** The statement of financial position of Mapfumo Bakery Ltd is below, with the current figures for the previous year.

${pos.md}

${caTable}

1. Current ratio 2025 = 93,800 ÷ 63,000 = **${cr25.toFixed(2)} : 1**; 2024 = 86,400 ÷ 45,000 = **${cr24.toFixed(2)} : 1**.
2. Acid test 2025 = (93,800 − 46,500) ÷ 63,000 = 47,300 ÷ 63,000 = **${at25.toFixed(2)} : 1**; 2024 = (86,400 − 31,200) ÷ 45,000 = 55,200 ÷ 45,000 = **${at24.toFixed(2)} : 1**.

${ratioTable}

3. **Interpretation.** Both ratios have fallen. Inventory rose from ${D}31,200 to ${D}46,500 while cash fell from ${D}21,400 to ${D}9,800 and current liabilities rose by ${D}18,000, mostly because of a new overdraft of ${D}15,100. An acid test of ${at25.toFixed(2)} : 1 means that for each dollar owed within a year the bakery has only about 75 cents of quickly available assets.
4. **Judgement.** Liquidity is under pressure. The bakery should reduce inventory, collect receivables promptly and replace the overdraft with longer-term finance. The ratios are for a single date, so the owner should also look at the cash flow forecast.
:::

:::worked-solution[Example 2: case analysis, comparing two firms]
**Context.** Two fictional firms are compared by a supplier deciding whom to allow credit.

${firms}

**Point.** Rudo's looks stronger on the current ratio, yet the acid test ratios are almost the same.

**Application.** Rudo's current ratio of ${aC.toFixed(2)} : 1 seems comfortable, but ${D}78,000 of its ${D}120,000 current assets is inventory, so its acid test is only ${aA.toFixed(2)} : 1. Tafara's has a low current ratio of ${bC.toFixed(2)} : 1 but little inventory, and an acid test of ${bA.toFixed(2)} : 1.

**Analysis.** A wholesale firm that holds a lot of inventory must sell it, often on credit, before it has cash; so its high current ratio overstates its safety. A supermarket sells for cash and its inventory turns over quickly, so its low ratio is normal for a retailer.

**Judgement.** Both are similar in the quickly available assets they hold. The supplier should allow credit to both, but watch Rudo's, which depends on selling slow-moving inventory. The ratios are single-date figures, so recent payment records and the type of trade should also be considered.
:::

## Common mistakes

:::mistake{title="Using only the current ratio"}
A healthy current ratio may depend on inventory that is slow to sell. Calculate the acid test too, and comment on the difference.
:::

:::mistake{title="Quoting a fixed rule as if it were a law"}
"2 : 1 is good" and "1 : 1 is good" are guidelines. A supermarket can operate safely below 1 : 1, so always judge with the industry and the trend.
:::

:::mistake{title="Saying a higher ratio is always better"}
A very high ratio may mean idle cash, excess inventory or slow-paying customers, which reduces profit. Give both sides.
:::

## Exam tips

:::exam-tip
ZIMSEC Business Studies Papers 1 and 2 and Business Enterprise Skills Papers 1 and 2 ask you to *calculate*, *state*, *explain* and *discuss* liquidity; Cambridge Papers 3 and 4 ask you to *calculate*, *analyse*, *evaluate* and *advise*. Write the formula, show the working, give the answer as x : 1 and interpret it in context (compare years or firms, name the item that caused the change). For *evaluate* or *advise*, judge each method of improving liquidity against its drawback and the cause of the problem.
:::

## Summary

:::summary
- Liquidity is the ability to pay short-term debts; a profitable business can still be illiquid.
- Current ratio = current assets ÷ current liabilities; acid test = (current assets − inventories) ÷ current liabilities, both as x : 1.
- Guidelines of 1.5 to 2 : 1 and about 1 : 1 depend on the industry; compare with earlier years and rivals.
- A ratio that is too low risks failing to pay debts; one that is too high may mean idle resources.
- Improve liquidity by reducing inventory, collecting debts faster, selling idle assets or refinancing, each with a drawback.
- Choose the method that tackles the cause of the problem.
:::
`;
lesson("ratios/liquidity", { key: "ratios.liquidity", title: "Liquidity ratios: current ratio and acid test", summary: "Calculating the current ratio and acid test ratio as x : 1, interpreting what they show about ability to pay debts, comparing years and firms, and judging methods of improving liquidity.", concept: "abus.ratios.liquidity", minutes: 50 }, body);
