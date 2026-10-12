// Lesson generator: ratios.solvency-gearing (W3b)
import { coYear, R, splMd, sofpMd, writeLesson, front, F } from "./w3b-lib.mjs";
import { table, ratios, chk, rd } from "../lib.mjs";

const p1 = (v) => v.toFixed(1);
const p2 = (v) => v.toFixed(2);
const a = coYear({ name: "Beitbridge Haulage Ltd", year: 2024, revenue: 600000, cos: 390000, distribution: 40000, admin: 110000, finance: 8000, tax: 13000, nca: 380000, inventory: 40000, receivables: 77000, bank: 10000, payables: 52000, otherCL: 15000, loan: 100000, shareCapital: 150000, creditSales: 540000, creditPurchases: 400000 });
const b = coYear({ name: "Beitbridge Haulage Ltd", year: 2025, revenue: 660000, cos: 442200, distribution: 46000, admin: 118000, finance: 15000, tax: 8800, nca: 447000, inventory: 55000, receivables: 105000, bank: 6000, payables: 61000, otherCL: 12000, loan: 180000, shareCapital: 150000, retained: 210000, creditSales: 594000, creditPurchases: 460000 });
const wcc = (x) => rd(R.invDays(x)) + rd(R.recDays(x, x.creditSales)) - rd(R.payDays(x, x.creditPurchases));
const nwa = (x) => x.inventory + x.receivables - x.payables;
chk(b.profit, 30000, 1e-6);
const rows = [
  ["Gearing", "NCL ÷ (shares + reserves + NCL) × 100", `${F(a.loan)} ÷ ${F(a.capitalEmployed)}`, `${F(b.loan)} ÷ ${F(b.capitalEmployed)}`, p1(R.gearing(a)) + "%", p1(R.gearing(b)) + "%"],
  ["Interest cover", "profit from operations ÷ interest payable", `${F(a.pfo)} ÷ ${F(a.finance)}`, `${F(b.pfo)} ÷ ${F(b.finance)}`, p1(R.cover(a)) + " times", p1(R.cover(b)) + " times"],
  ["Debt to equity (ZIMSEC)", "loan notes ÷ equity", `${F(a.loan)} ÷ ${F(a.equity)}`, `${F(b.loan)} ÷ ${F(b.equity)}`, p2(ratios.debtToEquity(a.loan, a.equity)) + " : 1", p2(ratios.debtToEquity(b.loan, b.equity)) + " : 1"],
  ["Net working assets to revenue", "(inventory + receivables - payables) ÷ revenue × 100", `${F(nwa(a))} ÷ ${F(a.revenue)}`, `${F(nwa(b))} ÷ ${F(b.revenue)}`, p1(ratios.netWorkingAssetsToRevenue(nwa(a), a.revenue)) + "%", p1(ratios.netWorkingAssetsToRevenue(nwa(b), b.revenue)) + "%"],
];
const t1 = table(["Ratio", "Formula", "2024 working", "2025 working", "2024", "2025"], rows, ["l", "l", "l", "l", "r", "r"]);
const wt = table(["Component (days, nearest whole day)", "2024", "2025"], [
  ["Inventory days: inventory ÷ cost of sales × 365", rd(R.invDays(a)), rd(R.invDays(b))],
  ["Trade receivables days: receivables ÷ credit sales × 365", rd(R.recDays(a, a.creditSales)), rd(R.recDays(b, b.creditSales))],
  ["Trade payables days: payables ÷ credit purchases × 365", rd(R.payDays(a, a.creditPurchases)), rd(R.payDays(b, b.creditPurchases))],
  ["**Working capital cycle** (inventory + receivables - payables)", wcc(a), wcc(b)],
]);

// Example 2: gearing effects
const sets = [["Low-geared company", 400000, 100000], ["High-geared company", 200000, 300000]];
const prof = [["Good year", 100000], ["Poor year", 40000]];
const rows2 = [];
for (const [nm, sh, ln] of sets) {
  const intr = ln * 0.1;
  const gear = (ln / (sh + ln)) * 100;
  for (const [yr, pfo] of prof) {
    const pbt = pfo - intr;
    rows2.push([nm, yr, pfo, intr, pbt, p1((pbt / sh) * 100) + "%", p1(pfo / intr) + " times", p1(gear) + "%"]);
  }
}
const t2 = table(["Company", "Year", "Profit from operations US\\$", "Interest at 10% US\\$", "Profit before tax US\\$", "Return on shares", "Interest cover", "Gearing"], rows2, ["l", "l", "r", "r", "r", "r", "r", "r"]);

const body = `
## Introduction

Rudo Chikafu wants to buy four more lorries for her haulage firm in Beitbridge. She can raise the money by asking shareholders for more capital, or by borrowing from a bank. Borrowing is cheaper and she keeps control of the company, but the bank must be paid interest every year, whether or not the lorries earn a profit. **Gearing** and **interest cover** measure that risk. They show how much of the company's capital comes from lenders and whether profit can pay for the interest.

You should know profitability, liquidity and efficiency ratios and the layout of a company statement of financial position. This lesson looks at the long-term position of the business. Solvency means the ability to pay debts in the long run. The Cambridge syllabus examines this lesson at A Level (Paper 3); in ZIMSEC it is Form 6 content.

:::keyfact{title="ZIMSEC and Cambridge terms"}
| ZIMSEC (syllabus and common usage) | Cambridge 9706 (A Level) |
| --- | --- |
| Gearing; capital gearing | Gearing = non-current liabilities ÷ (ordinary shares + all reserves + non-current liabilities) × 100 |
| Times interest earned; interest cover | Interest cover = profit from operations ÷ interest payable |
| Debt to equity ratio | Not in the Cambridge appendix |
| Operating cycle; cash cycle | Working capital cycle; net working assets to revenue |
:::

The debt to equity ratio is **ZIMSEC detail**. The working capital cycle and net working assets to revenue are **Cambridge A Level**; they are also useful to ZIMSEC candidates.

## Key definitions

:::definition{term="Gearing"}
The proportion of the capital employed that comes from non-current liabilities, which carry a fixed interest cost. The higher the gearing, the more risk the shareholders carry.
:::

:::definition{term="Interest cover"}
The number of times profit from operations covers the interest payable for the year. It shows how far profit could fall before the interest cannot be paid.
:::

:::definition{term="Working capital cycle"}
The number of days between paying suppliers and receiving cash from customers: inventory days plus trade receivables days less trade payables days.
:::

:::definition{term="Net working assets"}
Inventory plus trade receivables less trade payables. Expressed as a percentage of revenue it shows how much working capital each dollar of sales needs.
:::

## The formulae

:::keyfact{title="Solvency and gearing formulae"}
- Gearing = non-current liabilities ÷ (issued ordinary shares + all reserves + non-current liabilities) × 100
- Interest cover = profit from operations ÷ interest payable
- Debt to equity (ZIMSEC) = debt ÷ equity, with the debt defined in the question
- Working capital cycle (days) = inventory days + trade receivables days - trade payables days
- Net working assets to revenue = (inventory + trade receivables - trade payables) ÷ revenue × 100
:::

Gearing uses the same capital employed as ROCE, so the denominator is the same figure. Interest payable is the finance cost for the year, including any accrued. For the working capital cycle, calculate each component in days to the nearest whole day, as in the efficiency lesson, then combine them. Say which basis (credit sales and credit purchases or revenue and cost of sales) you used.

:::worked-solution[Example 1: Beitbridge Haulage Ltd, two years]
The statements of Beitbridge Haulage Ltd for the years ended 31 December 2024 and 2025 are below. Calculate the solvency and gearing ratios and the working capital cycle.

${splMd(a, b, { title: "Statement of profit or loss (extract)" })}

${sofpMd(a, b, { title: "Statement of financial position at 31 December" })}

Other information: credit sales were US\\$${F(a.creditSales)} in 2024 and US\\$${F(b.creditSales)} in 2025; credit purchases were US\\$${F(a.creditPurchases)} and US\\$${F(b.creditPurchases)}.

${t1}

${wt}
:::

The company borrowed US\\$${F(b.loan - a.loan)} more in 2025. Gearing rose from ${p1(R.gearing(a))}% to ${p1(R.gearing(b))}%, and interest cover fell from ${p1(R.cover(a))} to ${p1(R.cover(b))} times because the interest nearly doubled while profit from operations fell. The company can still pay its interest, but there is much less room for a poor year. The working capital cycle lengthened from ${wcc(a)} to ${wcc(b)} days, mainly because customers took longer to pay, and net working assets rose from ${p1(ratios.netWorkingAssetsToRevenue(nwa(a), a.revenue))}% to ${p1(ratios.netWorkingAssetsToRevenue(nwa(b), b.revenue))}% of revenue. Each dollar of sales now needs more finance, which adds to the pressure on cash.

## The effect of gearing in good years and bad

Interest is a fixed cost. When profit from operations is high, the shareholders keep all the extra after the fixed interest, so a geared company can earn a higher return for them. When profit is low, the interest is still due and the shareholders may be left with little or nothing. Gearing therefore magnifies the results in both directions.

:::worked-solution[Example 2: low and high gearing in a good year and a poor year]
Two companies each employ US\\$500,000 of capital. The low-geared company has US\\$400,000 of shares and US\\$100,000 of 10% loan notes; the high-geared company has US\\$200,000 of shares and US\\$300,000 of 10% loan notes. Ignore tax. In a good year each earns a profit from operations of US\\$100,000; in a poor year US\\$40,000. Calculate the profit before tax, the return on the shares, the interest cover and the gearing.

${t2}
:::

In the good year the high-geared company gives its shareholders ${p1(((100000 - 30000) / 200000) * 100)}% against ${p1(((100000 - 10000) / 400000) * 100)}% for the low-geared company. In the poor year the position reverses: ${p1(((40000 - 30000) / 200000) * 100)}% against ${p1(((40000 - 10000) / 400000) * 100)}%, and interest cover of only ${p1(40000 / 30000)} times means a further fall in profit would leave it unable to pay the interest. The high-geared company is the riskier investment, and lenders may refuse to lend more or may charge a higher rate.

## Why gearing matters, and changing it

High gearing is riskier for lenders and shareholders, but it is not always bad: a steady business such as a water utility can carry more debt than a business whose profit swings from year to year. Judge gearing together with interest cover, the stability of profit and the security the lender holds.

A company can **reduce** gearing by issuing shares, retaining profit, repaying loan notes or converting loan notes into shares. It can **increase** gearing by borrowing, or (ZIMSEC) by buying back its own shares. The cost of each choice differs: new shares dilute control and may cost more in dividends over time, while loans carry interest and security.

## Common mistakes

:::mistake{title="Using the wrong denominator for gearing"}
The denominator is shares plus all reserves plus non-current liabilities, not equity alone. Using equity alone gives the debt to equity ratio.
:::

:::mistake{title="Using profit before tax for interest cover"}
Cambridge interest cover uses profit from operations, which is before the interest. Profit after interest would deduct the interest twice.
:::

:::mistake{title="Leaving out the sign for payables in the working capital cycle"}
The cycle is inventory days plus receivables days **minus** payables days. Adding the payables days gives a wrong, much longer cycle.
:::

:::mistake{title="Saying that high gearing is always bad"}
High gearing raises risk, but it may raise the return to shareholders in good years. Comment on the stability of profit and the interest cover.
:::

## Exam tips

:::exam-tip
Gearing, interest cover and the working capital cycle are tested in Cambridge Paper 3 and ZIMSEC Papers 2 and 3. For *calculate*, write the formula, the figures and the answer with its unit (%, times or days). For *comment*, say what the change means for risk, and use interest cover to support the point.
:::

:::exam-tip
For *evaluate* or *advise* on raising finance, compare the effect on gearing and interest cover of a loan and of a share issue, and give one non-financial point such as control or the lender's security. State whether you recommend shares, loan notes or a mixture, and why.
:::

## Summary

:::summary
- Gearing = non-current liabilities ÷ (shares + all reserves + non-current liabilities) × 100; interest cover = profit from operations ÷ interest.
- Higher gearing and lower interest cover mean more risk, because interest is a fixed cost.
- Gearing magnifies the return to shareholders in good years and reduces it in poor years.
- Working capital cycle = inventory days + receivables days - payables days; net working assets to revenue shows the finance needed for each dollar of sales.
- The debt to equity ratio is ZIMSEC detail; the working capital cycle and net working assets to revenue are Cambridge A Level.
:::
`;
writeLesson("ratios/solvency-gearing.md", front("ratios.solvency-gearing", "Solvency, gearing and the working capital cycle", "Calculate gearing, interest cover, the debt to equity ratio, the working capital cycle and net working assets to revenue, and judge the risk of borrowing in good and poor years.", ["aacc.ratios.solvency-gearing"], 55), body);
