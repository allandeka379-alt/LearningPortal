// Writes lessons/ratios/profitability.md from checked figures.
import { profitLoss, ratios, table, chk, r2, rd } from "../lib.mjs";
import { lesson, D } from "./w4b-lib.mjs";

const exp24 = [["Wages", 130000], ["Rent and utilities", 60000], ["Depreciation", 30000], ["Other expenses", 20000]];
const exp25 = [["Wages", 138000], ["Rent and utilities", 62000], ["Depreciation", 32000], ["Other expenses", 18000]];
const p24 = profitLoss({ business: "Zambezi Packaging Ltd (a fictional company)", period: "31 December 2024", revenue: 800000, costOfSales: 480000, expenses: exp24, financeCosts: 8000, tax: 18000 });
const p25 = profitLoss({ business: "Zambezi Packaging Ltd (a fictional company)", period: "31 December 2025", revenue: 920000, costOfSales: 598000, expenses: exp25, financeCosts: 15000, tax: 11400 });
chk(p24.grossProfit, 320000); chk(p24.profitFromOperations, 80000); chk(p24.profitForYear, 54000);
chk(p25.grossProfit, 322000); chk(p25.profitFromOperations, 72000); chk(p25.profitForYear, 45600);
const ce24 = ratios.capitalEmployed(200000, 150000, 100000), ce25 = ratios.capitalEmployed(200000, 186000, 160000);
chk(ce24, 450000); chk(ce25, 546000);
const g24 = ratios.grossMargin(p24.grossProfit, 800000), g25 = ratios.grossMargin(p25.grossProfit, 920000);
const o24 = ratios.operatingMargin(p24.profitFromOperations, 800000), o25 = ratios.operatingMargin(p25.profitFromOperations, 920000);
const r24 = ratios.roce(p24.profitFromOperations, ce24), r25 = ratios.roce(p25.profitFromOperations, ce25);
const n24 = ratios.netMargin(p24.profitForYear, 800000), n25 = ratios.netMargin(p25.profitForYear, 920000);
chk(g24, 40); chk(g25, 35, 1e-9); chk(o24, 10); chk(o25, 7.826, 0.001); chk(r24, 17.778, 0.001); chk(r25, 13.187, 0.001);
chk(n24, 6.75); chk(n25, 4.957, 0.001);
const ratioTable = table(["Ratio", "2024", "2025"], [
  ["Gross profit margin (%)", g24.toFixed(1), g25.toFixed(1)],
  ["Operating profit margin (%)", o24.toFixed(1), o25.toFixed(1)],
  ["ROCE (%)", r24.toFixed(1), r25.toFixed(1)],
  ["Net profit margin (%) (ZIMSEC)", n24.toFixed(1), n25.toFixed(1)],
], ["l", "r", "r"]);
const capTable = table(["US\\$", "2024", "2025"], [["Issued shares", 200000, 200000], ["Reserves", 150000, 186000], ["Non-current liabilities", 100000, 160000], ["**Capital employed**", ce24, ce25]]);

// Example 2: two firms
const A = { rev: 1200000, gp: 300000, exp: 228000, ce: 400000 };
const B = { rev: 500000, gp: 225000, exp: 180000, ce: 450000 };
const aOp = A.gp - A.exp, bOp = B.gp - B.exp;
chk(aOp, 72000); chk(bOp, 45000);
const aG = ratios.grossMargin(A.gp, A.rev), bG = ratios.grossMargin(B.gp, B.rev);
const aO = ratios.operatingMargin(aOp, A.rev), bO = ratios.operatingMargin(bOp, B.rev);
const aR = ratios.roce(aOp, A.ce), bR = ratios.roce(bOp, B.ce);
chk(aG, 25); chk(bG, 45); chk(aO, 6); chk(bO, 9); chk(aR, 18); chk(bR, 10);
const firmTable = table(["US\\$ unless stated", "Rudo's Hardware", "Sipho's Furniture"], [
  ["Revenue", A.rev, B.rev], ["Gross profit", A.gp, B.gp], ["Profit from operations", aOp, bOp], ["Capital employed", A.ce, B.ce],
  ["Gross profit margin (%)", aG.toFixed(1), bG.toFixed(1)], ["Operating profit margin (%)", aO.toFixed(1), bO.toFixed(1)], ["ROCE (%)", aR.toFixed(1), bR.toFixed(1)],
], ["l", "r", "r"]);

const body = `
## Introduction

Zambezi Packaging Ltd is a fictional company in Harare that makes cartons for farmers and shops. Its revenue rose by 15% in 2025, and the directors expected a good year. The shareholders were not so sure: the profit they received was lower. Looking at the revenue figure alone told them nothing about whether the company was becoming **more or less profitable**. Profitability ratios answer that question, because they compare profit with the revenue or the capital that produced it.

This lesson is tested in ZIMSEC Business Studies (Form 6) and Business Enterprise Skills (Form 6), and in Cambridge **A Level** Paper 3 and Paper 4. You should already know the contents of the statement of profit or loss and the statement of financial position (see the two earlier lessons in this section). Ratios are **not** printed in Cambridge question papers: you must know the formulae.

:::keyfact{title="ZIMSEC and Cambridge terms"}
| ZIMSEC | Cambridge |
| --- | --- |
| Income statement; net profit; turnover | Statement of profit or loss; profit for the year; profit from operations; revenue |
| Gross profit percentage; net profit margin (net profit ÷ turnover); ROCE | Gross profit margin; operating (profit) margin; ROCE |

The **net profit margin** is ZIMSEC detail; Cambridge uses the **operating profit margin** (profit from operations ÷ revenue). Both boards use gross profit margin and ROCE. State the profit figure you use whenever the word "net" could be ambiguous.
:::

## Key definitions

:::definition{term="Profitability"}
The ability of a business to earn profit from its revenue and from the capital invested in it.
:::

:::definition{term="Gross profit margin"}
The percentage of revenue left after the direct cost of the goods or services sold has been deducted.
:::

:::definition{term="Operating profit margin"}
The percentage of revenue left as profit from operations after all the running expenses have been deducted, but before finance costs and tax.
:::

:::definition{term="Return on capital employed (ROCE)"}
The profit from operations earned for each 100 of long-term finance used in the business, expressed as a percentage.
:::

:::definition{term="Capital employed"}
The long-term finance of a business: issued shares plus reserves plus non-current liabilities.
:::

## The formulae

:::keyfact{title="Profitability ratios (Cambridge appendix basis)"}
- Gross profit margin (%) = gross profit ÷ revenue × 100
- Operating profit margin (%) = profit from operations ÷ revenue × 100
- ROCE (%) = profit from operations ÷ capital employed × 100
- Capital employed = issued shares + reserves + non-current liabilities
- Net profit margin (%), ZIMSEC = profit for the year ÷ revenue × 100
:::

Profit from operations is **before** finance costs (interest) and tax, so ROCE is not affected by how the capital was raised. Take capital employed from the **year-end** statement of financial position unless a question says "average".

## Interpreting each ratio

**Gross profit margin** shows how well the business buys or makes its goods and prices them. A rise means that either prices rose faster than the direct cost of sales, or the cost of materials fell, or the sales mix moved towards higher-margin products. A fall may result from dearer suppliers, discounting to win sales, wastage or theft.

**Operating profit margin** shows how well the whole business is run. It can fall even when the gross margin is steady, if wages, rent, marketing or depreciation grow faster than revenue.

**ROCE** is the key measure of the *efficiency of the capital used*. A business with a ROCE of 18% earns US${"\\$"}18 of operating profit from every US${"\\$"}100 of long-term finance. It should be compared with the **interest rate on loans** and with what the owners could earn elsewhere: if ROCE is below the cost of borrowing, expansion financed by debt reduces the owners' wealth.

A ratio means little alone. Compare it with **earlier years** (trend), with **competitors** (inter-firm comparison) and with the **target** set by the business.

### Why ratios change

| Ratio | Possible reasons for a rise | Possible reasons for a fall |
| --- | --- | --- |
| Gross profit margin | Price increase; cheaper suppliers; less waste; better product mix | Discounts; dearer materials; theft or waste; more low-margin sales |
| Operating profit margin | Higher gross margin; cost control; more revenue spread over fixed costs | Rising wages, rent or marketing; higher depreciation; falling revenue |
| ROCE | Higher profit from operations; repayment of loans; sale of unused assets | New loan or share issue before the profit arrives; falling profit |

### Improving profitability

- **Raise prices** or sell a better mix. This lifts the gross margin, but demand may fall if customers are price sensitive (see the elasticity lesson).
- **Cut the cost of sales** by negotiating with suppliers or buying in bulk. Quality, reliability and supplier relationships may suffer.
- **Cut expenses** such as energy or marketing. Savings that damage motivation or sales are self-defeating.
- **Raise ROCE** by earning more profit from the same capital, or by reducing capital employed (for example repaying a loan or selling idle equipment). Repaying a loan lowers capital employed but uses cash that may be needed.

The right method depends on **why** the ratio is weak, so diagnose first and then choose.

:::worked-solution[Example 1: calculating and interpreting three ratios]
**Context.** The statements of profit or loss for Zambezi Packaging Ltd (a fictional company) are below.

${p24.md}

${p25.md}

**Capital employed** (year-end figures, issued shares + reserves + non-current liabilities):

${capTable}

${ratioTable}

1. Gross profit margin 2025 = 322,000 ÷ 920,000 × 100 = ${g25.toFixed(1)}%, down from ${g24.toFixed(1)}%.
2. Operating profit margin 2025 = 72,000 ÷ 920,000 × 100 = ${o25.toFixed(1)}%, down from ${o24.toFixed(1)}%.
3. ROCE 2025 = 72,000 ÷ 546,000 × 100 = ${r25.toFixed(1)}%, down from ${r24.toFixed(1)}%.
4. **Interpretation.** Revenue rose by 15% but every ratio fell. Cost of sales rose from 60% to 65% of revenue, which explains the fall in the gross margin; expenses grew by only about 4%, so the cost problem lies in the *materials and production*, not in overheads. Capital employed rose by US${"\\$"}96,000, partly from a new loan of US${D}60,000, but the extra capital has not yet raised profit, so ROCE fell.
5. **Judgement.** The directors should investigate supplier prices and wastage first. The result is a single-year comparison; a longer trend and the loan's purpose (for example a machine that has not yet started producing) are needed before the fall is called a permanent decline.
:::

:::worked-solution[Example 2: case analysis, comparing two firms]
**Context.** Rudo's Hardware and Sipho's Furniture are fictional businesses in Gweru. Rudo says: "My hardware shop is the stronger business because it sells more." Sipho replies: "Mine earns more from each sale."

${firmTable}

**Point.** The two margins and ROCE point to different conclusions.

**Application.** Sipho's gross margin of ${bG.toFixed(1)}% and operating margin of ${bO.toFixed(1)}% are higher than Rudo's ${aG.toFixed(1)}% and ${aO.toFixed(1)}%. Yet Rudo's ROCE is ${aR.toFixed(1)}%, against ${bR.toFixed(1)}% for Sipho.

**Analysis.** Rudo's sells at low margins but turns over a large revenue from a modest US${"\\$"}400,000 of capital, so each dollar invested works hard. Sipho's earns well on each sale, but its revenue is small compared with the capital tied up in workshop and stock, so the capital earns a lower return.

**Judgement.** If the owners are judging how well their *money* is used, Rudo's is stronger; if they are judging pricing power and skill, Sipho's is stronger. A lender comparing the return with an interest rate would care most about ROCE. The conclusion holds only for this year; a trend and the industry norm would be needed before a final decision.
:::

## Common mistakes

:::mistake{title="Using the wrong profit or the wrong capital"}
ROCE uses **profit from operations** (before finance costs and tax) divided by **capital employed**, not profit for the year or total assets. Capital employed is shares plus reserves plus non-current liabilities, not shares alone.
:::

:::mistake{title="Describing a ratio without explaining it"}
"The ratio fell" earns little. Say what the ratio shows, quote the figures, give a reason from the case and state a consequence.
:::

:::mistake{title="Confusing margin with mark-up"}
A gross profit **margin** is a percentage of revenue; a **mark-up** is a percentage of cost. A 40% mark-up gives a margin of only 28.6%.
:::

## Exam tips

:::exam-tip
ZIMSEC Business Studies Papers 1 and 2 and Business Enterprise Skills Papers 1 and 2 ask you to *calculate*, *state* and *discuss* profitability; Cambridge Papers 3 and 4 ask you to *calculate*, *analyse*, *evaluate* and *advise*. Always write the formula, show the working, give the answer with its unit (%), and then interpret it using the case. For *evaluate* or *advise*, compare with an earlier year or a rival, name a limitation (one year only, different accounting policies) and make a judgement.
:::

## Summary

:::summary
- Gross profit margin = gross profit ÷ revenue × 100; operating margin = profit from operations ÷ revenue × 100.
- ROCE = profit from operations ÷ capital employed × 100, with capital employed = shares + reserves + non-current liabilities.
- ZIMSEC also uses the net profit margin (profit for the year ÷ revenue × 100).
- A fall in the gross margin points to cost of sales or pricing; a fall in the operating margin may point to expenses; a fall in ROCE may follow new capital that has not yet earned.
- Ratios must be compared with earlier years, rivals or targets, and explained using the case.
- Improving profitability depends on the cause: price, cost of sales, expenses or capital used, each with a trade-off.
:::
`;
lesson("ratios/profitability", { key: "ratios.profitability", title: "Profitability ratios: gross margin, operating margin and return on capital employed", summary: "Calculating and interpreting the gross profit margin, operating margin and ROCE (with the ZIMSEC net profit margin), explaining changes and judging ways of improving profitability.", concept: "abus.ratios.profitability", minutes: 55 }, body);
