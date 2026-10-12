// Lesson generator: ratios.analysis-limits (W3b)
import { coYear, R, splMd, sofpMd, writeLesson, front, F } from "./w3b-lib.mjs";
import { table, ratios, chk, rd } from "../lib.mjs";

const p0 = (v) => Math.round(v).toString();
const p1 = (v) => v.toFixed(1);
const p2 = (v) => v.toFixed(2);
const a = coYear({ name: "Murewa Cold Stores Ltd", year: 2024, revenue: 800000, cos: 520000, distribution: 48000, admin: 132000, finance: 10000, tax: 22000, nca: 520000, inventory: 70000, receivables: 90000, bank: 40000, payables: 65000, otherCL: 25000, loan: 100000, shareCapital: 250000, sharePremium: 50000, creditSales: 720000, creditPurchases: 540000 });
const b = coYear({ name: "Murewa Cold Stores Ltd", year: 2025, revenue: 880000, cos: 616000, distribution: 55000, admin: 139000, finance: 14000, tax: 14000, nca: 591000, inventory: 105000, receivables: 150000, bank: 8000, payables: 118000, otherCL: 22000, loan: 160000, shareCapital: 250000, sharePremium: 50000, retained: 254000, creditSales: 792000, creditPurchases: 650000 });
chk(b.profit, 42000, 1e-6);
const rows = [
  ["**Profitability**", "", ""],
  ["Gross profit margin (%)", p1(R.gpm(a)), p1(R.gpm(b))],
  ["Expenses to revenue (%)", p1(R.e2r(a)), p1(R.e2r(b))],
  ["Profit margin (%)", p1(R.pm(a)), p1(R.pm(b))],
  ["ROCE (%)", p1(R.roce(a)), p1(R.roce(b))],
  ["**Liquidity**", "", ""],
  ["Current ratio (x : 1)", p2(R.current(a)), p2(R.current(b))],
  ["Acid test ratio (x : 1)", p2(R.acid(a)), p2(R.acid(b))],
  ["**Efficiency**", "", ""],
  ["Inventory days", p0(R.invDays(a)), p0(R.invDays(b))],
  ["Trade receivables days", p0(R.recDays(a, a.creditSales)), p0(R.recDays(b, b.creditSales))],
  ["Trade payables days", p0(R.payDays(a, a.creditPurchases)), p0(R.payDays(b, b.creditPurchases))],
  ["**Solvency**", "", ""],
  ["Gearing (%)", p1(R.gearing(a)), p1(R.gearing(b))],
  ["Interest cover (times)", p1(R.cover(a)), p1(R.cover(b))],
];
const t1 = table(["Ratio", "2024", "2025"], rows);

// Example 2: margin x turnover
const S = { name: "Supermarket", revenue: 1200000, pfo: 48000, ce: 300000 };
const J = { name: "Jeweller", revenue: 300000, pfo: 48000, ce: 300000 };
const dec = [S, J].map((x) => [x.name, F(x.revenue), F(x.pfo), F(x.ce), p1((x.pfo / x.revenue) * 100) + "%", p1(x.revenue / x.ce) + " times", p1((x.pfo / x.ce) * 100) + "%"]);
chk((S.pfo / S.revenue) * (S.revenue / S.ce) * 100, 16, 1e-9);
chk((J.pfo / J.revenue) * (J.revenue / J.ce) * 100, 16, 1e-9);
const t2 = table(["Business", "Revenue US\\$", "Profit from operations US\\$", "Capital employed US\\$", "Operating margin", "Capital turnover", "ROCE"], dec, ["l", "r", "r", "r", "r", "r", "r"]);

const body = `
## Introduction

Anesu Ncube is a director of a bank in Harare. Every week she receives the accounts of businesses that want loans, and calculating ratios is only the start of her work. What she needs is a short written judgement: is this business improving, where are the weaknesses and should the bank lend? Examiners ask for the same skill. A list of ratios earns the calculation marks; a structured analysis that links the ratios, reaches a conclusion and recognises the limits of the data earns the rest.

You have met the profitability, liquidity, efficiency, solvency and investment ratios. This lesson shows how to put them together into a report. It also explains why ratios cannot answer every question. Both boards examine it: in ZIMSEC Papers 2 and 3 and Cambridge Papers 2 and 3.

:::keyfact{title="ZIMSEC and Cambridge terms"}
| ZIMSEC (syllabus and common usage) | Cambridge 9706 |
| --- | --- |
| Interpretation of accounts; ratio analysis | Analysis and interpretation of financial statements |
| Net profit margin; stock turnover; debtors' collection period | Profit margin; inventory turnover; trade receivables turnover (days) |
| Report to the shareholders or the bank manager | Report, memorandum or notes (AO3: analyse and evaluate) |
:::

## Key definitions

:::definition{term="Ratio analysis"}
The process of calculating ratios from the financial statements and using them to judge the performance and position of a business over time or against other businesses.
:::

:::definition{term="Inter-firm comparison"}
Comparing the ratios of a business with those of another business, or with the average for its industry, for the same period.
:::

:::definition{term="Window dressing"}
Arranging transactions near the year end so that the statement of financial position looks stronger than the position during the year.
:::

## How to write the analysis

A good analysis follows a fixed route. The route stops you from writing a random list and shows the examiner that you have a method.

1. **Calculate** the ratios you need, from the same formulae for each year or business, and show the formula and the figures.
2. **Compare**: the same ratio for the two years or two businesses. State the direction and the size of the change, with the figures.
3. **Explain**: give a cause for each change that fits the other ratios and the facts in the question (a lower gross margin from price cutting; higher receivables days from weaker credit control).
4. **Link**: show how ratios affect each other. A fall in the gross margin lowers the profit margin and ROCE; slower collection from customers worsens liquidity; more borrowing raises gearing and lowers interest cover.
5. **Conclude and advise**: reach a judgement for the user named in the question (shareholder, lender, supplier, manager) and give a recommendation with a reason.
6. **State the limits**: mention what the ratios cannot show.

Different users want different ratios. A lender looks at gearing, interest cover and liquidity; a shareholder looks at profitability and the investment ratios; a supplier looks at liquidity and payables days; a manager looks at all of them and at efficiency.

:::worked-solution[Example 1: a two-year analysis of Murewa Cold Stores Ltd]
Murewa Cold Stores Ltd sells frozen foods to shops in Murewa and Marondera. Its statements for 2024 and 2025 are below. Use them to analyse the performance and position of the company and advise a bank that is asked to lend a further US\\$50,000.

${splMd(a, b, { title: "Statement of profit or loss for the year ended 31 December" })}

${sofpMd(a, b, { title: "Statement of financial position at 31 December" })}

Other information: credit sales were US\\$${F(a.creditSales)} in 2024 and US\\$${F(b.creditSales)} in 2025; credit purchases were US\\$${F(a.creditPurchases)} and US\\$${F(b.creditPurchases)}. Year-end balances are used.

${t1}

**Report to the bank**

*Profitability.* Revenue grew by ${p1(((b.revenue - a.revenue) / a.revenue) * 100)}%, but the gross margin fell from ${p1(R.gpm(a))}% to ${p1(R.gpm(b))}%, so gross profit actually fell by ${p1(((a.gp - b.gp) / a.gp) * 100)}%, from US\\$${F(a.gp)} to US\\$${F(b.gp)}. Expenses to revenue improved slightly (${p1(R.e2r(a))}% to ${p1(R.e2r(b))}%), so the weakness is in the cost of goods or the selling price, not overheads. Profit for the year fell from US\\$${F(a.profit)} to US\\$${F(b.profit)} and ROCE from ${p1(R.roce(a))}% to ${p1(R.roce(b))}%, partly because capital employed grew from US\\$${F(a.capitalEmployed)} to US\\$${F(b.capitalEmployed)}.

*Liquidity and efficiency.* The current ratio fell from ${p2(R.current(a))} to ${p2(R.current(b))} and the acid test ratio from ${p2(R.acid(a))} to ${p2(R.acid(b))}; cash fell to US\\$${F(b.bank)}. Inventory days rose from ${p0(R.invDays(a))} to ${p0(R.invDays(b))} and receivables days from ${p0(R.recDays(a, a.creditSales))} to ${p0(R.recDays(b, b.creditSales))}, while the company took ${p0(R.payDays(b, b.creditPurchases))} days to pay suppliers instead of ${p0(R.payDays(a, a.creditPurchases))}. Customers and inventory absorbed cash, and the company is using its suppliers to fill the gap.

*Solvency.* Gearing rose from ${p1(R.gearing(a))}% to ${p1(R.gearing(b))}% and interest cover fell from ${p1(R.cover(a))} to ${p1(R.cover(b))} times. Interest is now covered ${p1(R.cover(b))} times, which is still adequate but gives less margin.

*Conclusion and recommendation.* Performance has weakened in every area, although the company is not in danger yet. The bank should not lend the extra US\\$50,000 without conditions: the company should show how it will restore the gross margin, collect receivables faster and reduce inventory, and the bank should ask for security. This analysis uses two years only and year-end balances; the bank should also see the cash flow forecast and the reasons for the lower margin.
:::

## Linking the ratios: margin and turnover

ROCE can be split into two parts: the operating margin (profit from operations ÷ revenue) and the capital turnover (revenue ÷ capital employed). Multiplying them gives ROCE. This explains why a low margin is not always a weakness.

:::worked-solution[Example 2: two businesses with the same ROCE]
A supermarket and a jeweller each employ US\\$${F(S.ce)} of capital. Calculate the operating margin, capital turnover and ROCE of each and comment.

${t2}

Both businesses earn ${p1((S.pfo / S.ce) * 100)}% on the capital employed, but by opposite routes. The supermarket earns a thin margin of ${p1((S.pfo / S.revenue) * 100)}% and turns its capital over ${p1(S.revenue / S.ce)} times, selling a large volume of low-priced goods. The jeweller earns a high margin of ${p1((J.pfo / J.revenue) * 100)}% on a small volume and turns its capital over only ${p1(J.revenue / J.ce)} time. Comparing the margins alone would wrongly suggest that the jeweller is far more profitable.
:::

## Limitations of ratio analysis

Ratios are tools, not answers. Mention the limit that fits the facts in the question.

- **Historical.** The ratios describe the past and may not show what will happen next.
- **Window dressing.** Year-end balances may have been arranged to look better than the position during the year.
- **Different accounting policies.** Two businesses using different depreciation or inventory valuation methods are not strictly comparable.
- **Inflation and price changes.** Historical-cost figures make comparisons between years unreliable when prices change quickly.
- **No standard benchmark.** There is no fixed ratio that is right for every business; the industry and size matter.
- **Seasonal trade.** A year-end balance may not represent a typical month of a seasonal business.
- **Non-financial factors are ignored.** Staff morale, customer service, market position, the quality of management and environmental matters do not appear in the ratios.
- **Few periods or businesses.** Two years of figures give little evidence of a trend.

## Common mistakes

:::mistake{title="Listing ratios without comment"}
A table of ratios earns calculation marks only. State the direction of the change, a reason for it and what it means for the user.
:::

:::mistake{title="Giving reasons that the figures do not support"}
"Credit control is weak" needs a rise in receivables days. Do not give reasons that contradict other ratios or the facts in the question.
:::

:::mistake{title="Forgetting the user of the report"}
Advice to a lender differs from advice to a shareholder. Choose the ratios and the conclusion that suit the user named.
:::

:::mistake{title="Using the limits as a way to avoid a conclusion"}
State the limits briefly, then still reach a conclusion. "Ratios cannot be trusted" is not a recommendation.
:::

## Exam tips

:::exam-tip
Ratio analysis appears in ZIMSEC Papers 2 and 3 and in Cambridge Papers 2 and 3, usually as the last part of a long question. For *comment*, give direction, cause and effect. For *evaluate* or *advise*, give a judgement for the stated user, use at least three figures, and end with one recommendation and one limit.
:::

:::exam-tip
Use headings in a report (profitability, liquidity, efficiency, solvency, conclusion), but keep each paragraph short. Examiners award marks for each separate reasoned point, so a point made twice earns nothing extra. Use the same decimal places as the question asks for.
:::

## Summary

:::summary
- Analyse in steps: calculate, compare, explain, link, conclude and advise, state the limits.
- Choose ratios to suit the user: lenders look at gearing, interest cover and liquidity; shareholders at profitability and investment ratios.
- ROCE = operating margin × capital turnover, so a low margin can be offset by a high turnover.
- Limits: historical, window dressing, different policies, inflation, no benchmark, seasonal trade, non-financial factors, few periods.
- A report states a conclusion and a recommendation; it does not stop at calculations.
:::
`;
writeLesson("ratios/analysis-limits.md", front("ratios.analysis-limits", "Interpreting ratios, linking them and their limits", "Write a structured ratio analysis and report for a named user, link margin, turnover, liquidity and gearing, and state the limitations of ratio analysis.", ["aacc.ratios.analysis-limits"], 55), body);
void ratios; void rd;
