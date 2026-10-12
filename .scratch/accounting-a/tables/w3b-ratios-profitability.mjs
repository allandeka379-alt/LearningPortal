// Lesson generator: ratios.profitability (W3b). Run: node .scratch/accounting-a/tables/w3b-ratios-profitability.mjs
import { coYear, R, splMd, sofpMd, writeLesson, front, F } from "./w3b-lib.mjs";
import { ratios, table, chk } from "../lib.mjs";

const p1 = (v) => v.toFixed(1);
const a = coYear({ name: "Kwekwe Bakers Ltd", year: 2024, revenue: 420000, cos: 252000, distribution: 30000, admin: 84000, finance: 6000, tax: 12000, nca: 260000, inventory: 38000, receivables: 41000, bank: "plug", payables: 30000, otherCL: 8000, loan: 60000, shareCapital: 100000, sharePremium: 20000, retained: 130000 });
const b = coYear({ name: "Kwekwe Bakers Ltd", year: 2025, revenue: 504000, cos: 322560, distribution: 38000, admin: 92000, finance: 8000, tax: 10860, nca: 285000, inventory: 52000, receivables: 60000, bank: "plug", payables: 41000, otherCL: 9000, loan: 80000, shareCapital: 100000, sharePremium: 20000, retained: 150580 });

const rows1 = [
  ["Gross profit margin", "GP ÷ revenue × 100", `${F(a.gp)} ÷ ${F(a.revenue)}`, `${F(b.gp)} ÷ ${F(b.revenue)}`, p1(R.gpm(a)) + "%", p1(R.gpm(b)) + "%"],
  ["Mark-up", "GP ÷ cost of sales × 100", `${F(a.gp)} ÷ ${F(a.cos)}`, `${F(b.gp)} ÷ ${F(b.cos)}`, p1(R.markUp(a)) + "%", p1(R.markUp(b)) + "%"],
  ["Profit margin", "profit for the year ÷ revenue × 100", `${F(a.profit)} ÷ ${F(a.revenue)}`, `${F(b.profit)} ÷ ${F(b.revenue)}`, p1(R.pm(a)) + "%", p1(R.pm(b)) + "%"],
  ["Expenses to revenue", "(distribution + administrative expenses) ÷ revenue × 100", `${F(a.opex)} ÷ ${F(a.revenue)}`, `${F(b.opex)} ÷ ${F(b.revenue)}`, p1(R.e2r(a)) + "%", p1(R.e2r(b)) + "%"],
  ["ROCE", "profit from operations ÷ capital employed × 100", `${F(a.pfo)} ÷ ${F(a.capitalEmployed)}`, `${F(b.pfo)} ÷ ${F(b.capitalEmployed)}`, p1(R.roce(a)) + "%", p1(R.roce(b)) + "%"],
];
const t1 = table(["Ratio", "Formula", "2024 working", "2025 working", "2024", "2025"], rows1, ["l", "l", "l", "l", "r", "r"]);

const m = coYear({ name: "Mutare Motor Spares Ltd", year: "Mutare", revenue: 360000, cos: 252000, distribution: 20000, admin: 56000, finance: 4000, tax: 7000, nca: 150000, inventory: 60000, receivables: 28000, bank: "plug", payables: 36000, otherCL: 6000, loan: 40000, shareCapital: 100000, sharePremium: 0, retained: 56000 });
const g = coYear({ name: "Gweru Auto Parts Ltd", year: "Gweru", revenue: 540000, cos: 405000, distribution: 24000, admin: 62000, finance: 12000, tax: 9400, nca: 210000, inventory: 90000, receivables: 55000, bank: "plug", payables: 62000, otherCL: 9000, loan: 90000, shareCapital: 120000, sharePremium: 0, retained: 74000 });
const rows2 = [
  ["Gross profit margin (%)", p1(R.gpm(m)), p1(R.gpm(g))],
  ["Mark-up (%)", p1(R.markUp(m)), p1(R.markUp(g))],
  ["Expenses to revenue (%)", p1(R.e2r(m)), p1(R.e2r(g))],
  ["Profit margin (%)", p1(R.pm(m)), p1(R.pm(g))],
  ["ROCE (%)", p1(R.roce(m)), p1(R.roce(g))],
  ["Return on assets (%)", p1(R.roa(m)), p1(R.roa(g))],
  ["Return on equity (%)", p1(R.roe(m)), p1(R.roe(g))],
];
const t2 = table(["Ratio", "Mutare Motor Spares", "Gweru Auto Parts"], rows2);

const mu = 25;
const gm = ratios.marginFromMarkUp(mu);
chk(gm, 20, 1e-9);
const cm = ratios.markUpFromMargin(40);
chk(cm, 66.6667, 1e-3);

const body = `
## Introduction

Tendai Moyo bought a bakery in Kwekwe two years ago. Revenue grew by 20% in the latest year, yet he feels no richer. The shareholders of a company ask the same question: is the business earning enough for the money invested in it? **Profitability ratios** answer by relating profit to revenue and to capital. Examiners test them in ZIMSEC Papers 2 and 3 and in Cambridge Papers 1 to 3, and they are the base for the later ratio lessons.

You should already be able to prepare a company statement of profit or loss and statement of financial position. Here we use the figures in them to judge performance, not only to calculate it.

:::keyfact{title="ZIMSEC and Cambridge terms"}
| ZIMSEC (syllabus and common usage) | Cambridge 9706 |
| --- | --- |
| Net profit margin; net profit | Profit margin; profit for the year |
| Return on capital employed (ROCE) | ROCE = profit from operations ÷ capital employed × 100 |
| Return on assets; return on equity | Not in the Cambridge appendix |
| Operating expenses to revenue | Expenses to revenue |
| Trading and profit and loss account | Statement of profit or loss |
:::

Return on assets and return on equity are **ZIMSEC detail**. Cambridge candidates use only the formulae printed in the appendix to the syllabus.

## Key definitions

:::definition{term="Gross profit margin"}
Gross profit as a percentage of revenue. It shows how much of each dollar of sales is left after the direct cost of the goods sold.
:::

:::definition{term="Mark-up"}
Gross profit as a percentage of cost of sales. It shows how much a business adds to cost to reach its selling price.
:::

:::definition{term="Profit margin"}
Profit for the year as a percentage of revenue. It shows what is left of each dollar of sales after every cost, including finance costs and tax.
:::

:::definition{term="Return on capital employed (ROCE)"}
Profit from operations as a percentage of the capital employed. Capital employed is the issued shares plus all reserves plus non-current liabilities, which equals total assets less current liabilities.
:::

## The formulae

:::keyfact{title="Profitability formulae"}
- Gross profit margin = gross profit ÷ revenue × 100
- Mark-up = gross profit ÷ cost of sales × 100
- Profit margin = profit for the year ÷ revenue × 100
- Expenses to revenue = expenses ÷ revenue × 100
- ROCE = profit from operations ÷ capital employed × 100
- Return on assets (ZIMSEC) = profit ÷ total assets × 100; return on equity (ZIMSEC) = profit ÷ equity × 100 (the question states which profit to use)
:::

Three points stop most mistakes. First, **profit from operations** is profit before finance costs and tax: it measures what the business earned from its trading, before deciding how it is financed. Second, margin uses revenue as the base and mark-up uses cost of sales, so the two are never equal for the same trade: a mark-up of ${mu}% gives a margin of ${gm}%, and a margin of 40% means a mark-up of ${p1(cm)}%. Third, use year-end figures unless the question says *average*, and say which you used.

## Worked examples

:::worked-solution[Example 1: two years of Kwekwe Bakers Ltd]
The statements of Kwekwe Bakers Ltd for the years ended 31 December 2024 and 2025 are below. Calculate the profitability ratios for both years, to one decimal place, using year-end figures.

${splMd(a, b, { title: "Statement of profit or loss for the year ended 31 December" })}

${sofpMd(a, b, { title: "Statement of financial position at 31 December" })}

Capital employed is share capital ${F(a.shareCapital)} + share premium ${F(a.sharePremium)} + retained earnings + loan notes. For 2024 that is ${F(a.capitalEmployed)}; for 2025 it is ${F(b.capitalEmployed)}. As a check, total assets less current liabilities gives the same: ${F(a.assets)} - ${F(a.cl)} = ${F(a.capitalEmployed)} and ${F(b.assets)} - ${F(b.cl)} = ${F(b.capitalEmployed)}.

${t1}
:::

The ratios tell a clear story. Revenue rose by ${p1(((b.revenue - a.revenue) / a.revenue) * 100)}% but gross profit grew by only ${p1(((b.gp - a.gp) / a.gp) * 100)}%, because the gross margin fell from ${p1(R.gpm(a))}% to ${p1(R.gpm(b))}%. The bakery sold more but earned less on each dollar of sales. Expenses to revenue improved slightly, from ${p1(R.e2r(a))}% to ${p1(R.e2r(b))}%, which shows that cost control was not the problem. The fall in profit margin from ${p1(R.pm(a))}% to ${p1(R.pm(b))}% and in ROCE from ${p1(R.roce(a))}% to ${p1(R.roce(b))}% therefore comes mainly from the cost of sales. Possible causes are a lower selling price (a discount to win volume), dearer flour and ingredients, or a change in the sales mix. Link each reason you give to the evidence in the question.

ROCE also fell because more capital was employed: ${F(b.capitalEmployed)} against ${F(a.capitalEmployed)}. The extra loan notes and retained profit have not yet earned a matching return.

:::worked-solution[Example 2: comparing two businesses in the same year]
Mutare Motor Spares Ltd and Gweru Auto Parts Ltd both sell vehicle parts. Their figures for the year ended 31 December 2025 are summarised below. Calculate the ratios and compare the two businesses. For ZIMSEC, return on assets and return on equity use profit for the year.

| Item | Mutare US\\$ | Gweru US\\$ |
| --- | ---: | ---: |
| Revenue | ${F(m.revenue)} | ${F(g.revenue)} |
| Cost of sales | ${F(m.cos)} | ${F(g.cos)} |
| Distribution costs and administrative expenses | ${F(m.opex)} | ${F(g.opex)} |
| Profit from operations | ${F(m.pfo)} | ${F(g.pfo)} |
| Finance costs | ${F(m.finance)} | ${F(g.finance)} |
| Profit for the year | ${F(m.profit)} | ${F(g.profit)} |
| Total assets | ${F(m.assets)} | ${F(g.assets)} |
| Equity | ${F(m.equity)} | ${F(g.equity)} |
| Capital employed (equity + loan notes) | ${F(m.capitalEmployed)} | ${F(g.capitalEmployed)} |

${t2}

Mutare earns the higher gross margin (${p1(R.gpm(m))}% against ${p1(R.gpm(g))}%) and keeps its expenses at a lower share of revenue (${p1(R.e2r(m))}% against ${p1(R.e2r(g))}%). Gweru sells more, but at a low mark-up of ${p1(R.markUp(g))}%, so its volume does not turn into profit. Mutare's ROCE of ${p1(R.roce(m))}% is well above Gweru's ${p1(R.roce(g))}%. Mutare is the more profitable business on every measure.
:::

## Explaining a change in profitability

When a ratio moves, examiners reward an explanation, not a statement of the fall. Work through the chain in order.

1. **Gross margin** falls when the selling price falls, when the cost of goods rises faster than prices, or when the sales mix moves to lower-margin items.
2. **Expenses to revenue** shows cost control. If expenses grow more slowly than revenue the ratio improves; fixed costs such as rent make it fall as volume rises.
3. **Profit margin** adds finance costs and tax. Borrowing more raises finance costs and cuts the margin even when operations are unchanged.
4. **ROCE** brings in the capital. It improves when the margin improves or when the business earns more revenue for each dollar of capital employed (asset turnover is in the efficiency lesson).

A useful link: ROCE = operating profit margin × capital turnover. A business can earn a high ROCE with a thin margin if it turns capital over quickly, as a supermarket does.

## Common mistakes

:::mistake{title="Mixing margin and mark-up"}
Mark-up uses cost of sales as the base and margin uses revenue. A product sold for US\\$125 that cost US\\$100 has a mark-up of 25% but a margin of 20%.
:::

:::mistake{title="Using profit for the year in ROCE"}
The Cambridge appendix uses profit from operations, which is before finance costs and tax, because capital employed includes the loan notes that earn the interest.
:::

:::mistake{title="Forgetting non-current liabilities in capital employed"}
Capital employed is shares plus all reserves plus non-current liabilities. Using equity alone gives a return on equity, not ROCE.
:::

:::mistake{title="Describing the change without explaining it"}
"ROCE fell from ${p1(R.roce(a))}% to ${p1(R.roce(b))}%" earns one mark. The extra marks are for a reason that fits the figures, such as a lower gross margin or a larger capital base.
:::

## Exam tips

:::exam-tip
Profitability ratios are tested in ZIMSEC Papers 1 to 3 and Cambridge Papers 1 to 3. For *calculate*, write the formula, substitute the figures and give the answer to the stated decimal places with its % sign. For *compare*, use the same ratio for both years or businesses and state the direction of change. For *explain*, give a cause that is consistent with the other ratios.
:::

:::exam-tip
For *evaluate* or *advise*, give a judgement: say which business or year is better, support it with at least two figures, and note one limit, such as only two years of data or different accounting policies. For Cambridge, quote the appendix formula; for ZIMSEC, write the formula you use, because the syllabus does not print return on assets or return on equity.
:::

## Summary

:::summary
- Gross profit margin and mark-up measure trading; the first uses revenue as the base and the second uses cost of sales.
- Profit margin uses profit for the year; ROCE uses profit from operations over capital employed (shares + reserves + non-current liabilities).
- Capital employed also equals total assets less current liabilities, a useful check.
- Explain a change by working through gross margin, expenses to revenue, finance costs and the capital base.
- Return on assets and return on equity are ZIMSEC detail; state the formula you use.
:::
`;
writeLesson("ratios/profitability.md", front("ratios.profitability", "Profitability ratios and what they show", "Calculate gross profit margin, mark-up, profit margin, expenses to revenue and ROCE (and the ZIMSEC return on assets and equity), then explain the changes between years and businesses.", ["aacc.ratios.profitability"], 55, { freePreview: true }), body);
