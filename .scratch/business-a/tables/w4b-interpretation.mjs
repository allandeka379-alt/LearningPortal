// Writes lessons/ratios/interpretation-limits.md from checked figures.
import { ratios, table, chk, r2 } from "../lib.mjs";
import { lesson, D } from "./w4b-lib.mjs";

const F = {
  S24: { rev: 640000, cos: 416000, exp: 150000, fin: 6000, tax: 17000, div: 21000, sh: 150000, res: 130000, ncl: 70000, ca: 120000, inv: 58000, cl: 66000 },
  S25: { rev: 760000, cos: 502000, exp: 168000, fin: 14000, tax: 19000, div: 28000, sh: 150000, res: 150000, ncl: 150000, ca: 150000, inv: 82000, cl: 96000 },
  T25: { rev: 700000, cos: 434000, exp: 170000, fin: 3000, tax: 24000, div: 30000, sh: 150000, res: 190000, ncl: 40000, ca: 120000, inv: 40000, cl: 60000 },
};
const R = {};
for (const [k, f] of Object.entries(F)) {
  const gp = f.rev - f.cos, op = gp - f.exp, pfy = op - f.fin - f.tax, ce = ratios.capitalEmployed(f.sh, f.res, f.ncl);
  R[k] = { gp, op, pfy, ce, gm: ratios.grossMargin(gp, f.rev), om: ratios.operatingMargin(op, f.rev), roce: ratios.roce(op, ce), cr: ratios.currentRatio(f.ca, f.cl), at: ratios.acidTest(f.ca, f.inv, f.cl), gear: ratios.gearing(f.ncl, ce), cover: ratios.dividendCover(pfy, f.div) };
}
chk(R.S24.op, 74000); chk(R.S25.op, 90000); chk(R.T25.op, 96000);
chk(R.S24.pfy, 51000); chk(R.S25.pfy, 57000); chk(R.T25.pfy, 69000);
chk(R.S24.ce, 350000); chk(R.S25.ce, 450000); chk(R.T25.ce, 380000);
chk(R.S24.gm, 35, 1e-9); chk(R.S25.gm, 33.947, 1e-3); chk(R.T25.gm, 38, 1e-9);
chk(R.S24.roce, 21.143, 1e-3); chk(R.S25.roce, 20, 1e-9); chk(R.T25.roce, 25.263, 1e-3);
chk(R.S25.gear, 33.333, 1e-3); chk(R.T25.gear, 10.526, 1e-3);
chk(R.S25.cr, 1.5625, 1e-4); chk(R.S25.at, 0.70833, 1e-4);
chk(R.S25.cover, 2.0357, 1e-3); chk(R.S24.cover, 2.4286, 1e-3);
const f1 = (x) => x.toFixed(1), f2 = (x) => x.toFixed(2);
const row = (name, key, f, suffix = "") => [name, ...["S24", "S25", "T25"].map((k) => `${f(R[k][key])}${suffix}`)];
const rt = table(["Ratio", "Sipho Motors 2024", "Sipho Motors 2025", "Thandeka Autos 2025"], [
  row("Gross profit margin (%)", "gm", f1), row("Operating profit margin (%)", "om", f1), row("ROCE (%)", "roce", f1),
  row("Current ratio (x : 1)", "cr", f2), row("Acid test (x : 1)", "at", f2), row("Gearing (%)", "gear", f1), row("Dividend cover (times)", "cover", f2),
], ["l", "r", "r", "r"]);
const info = table(["US\\$", "Sipho Motors 2024", "Sipho Motors 2025", "Thandeka Autos 2025"], [
  ["Revenue", F.S24.rev, F.S25.rev, F.T25.rev], ["Cost of sales", F.S24.cos, F.S25.cos, F.T25.cos], ["Expenses", F.S24.exp, F.S25.exp, F.T25.exp],
  ["Profit from operations", R.S24.op, R.S25.op, R.T25.op], ["Profit for the year", R.S24.pfy, R.S25.pfy, R.T25.pfy], ["Capital employed", R.S24.ce, R.S25.ce, R.T25.ce],
  ["Non-current liabilities", F.S24.ncl, F.S25.ncl, F.T25.ncl], ["Current assets", F.S24.ca, F.S25.ca, F.T25.ca], ["of which inventories", F.S24.inv, F.S25.inv, F.T25.inv], ["Current liabilities", F.S24.cl, F.S25.cl, F.T25.cl],
], ["l", "r", "r", "r"]);

const body = `
## Introduction

A bank manager in Harare is asked to lend US$100,000 to Sipho Motors Ltd, a fictional car-repair and parts company. The manager has the company's published accounts and a set of ratios. One ratio on its own, such as a ROCE of 20.0%, says very little. Is that good? Better than last year? Better than a rival? Is it likely to continue? Skilled analysts use ratios **together**, over **time** and **against competitors**, and then ask what the figures cannot show. This lesson pulls together all the ratios from the previous lessons.

It is tested in ZIMSEC Business Studies and Business Enterprise Skills (Form 6) and in Cambridge **A Level** Paper 3 and Paper 4, usually as a data response or case question that ends with *evaluate*, *advise* or *recommend*. You should already know the formulae for the profitability, liquidity, efficiency, gearing and investor ratios.

:::keyfact{title="ZIMSEC and Cambridge terms"}
| ZIMSEC | Cambridge |
| --- | --- |
| Trend analysis; inter-firm comparison; limitations of ratio analysis; window dressing; the use of financial statements in developing strategies | Assessing performance over time and against competitors; impact of debt or equity, dividend and growth strategies on ratios; limitations of published accounts and ratio analysis |

Both boards expect a reasoned recommendation, not a list of ratios. ZIMSEC also names *window dressing*; Cambridge uses the idea in "limitations of published accounts".
:::

## Key definitions

:::definition{term="Trend analysis"}
Comparing a business's ratios for several years to see whether its performance is improving or declining.
:::

:::definition{term="Inter-firm comparison"}
Comparing a business's ratios with those of a competitor or with the industry average for the same period.
:::

:::definition{term="Window dressing"}
Arranging the figures in the accounts, often just before the year end, to make the business look more successful or more liquid than it really is.
:::

## Assessing performance

**Over time.** Compare at least two years of the same ratio. Look for the direction (better or worse), the size of the change and a **reason** found in the accounts. A fall in the gross margin points to cost of sales; a fall in ROCE with rising profit points to more capital.

**Against competitors.** A rival in the same industry faces the same market, so differences point to better or worse management, pricing or finance. Compare firms of a similar size and type. Differences in accounting policies, year-ends and the mix of products can make comparisons unfair.

**Linking ratios.** The ratios tell a story only when linked. A falling gross margin with a rising current liability may suggest that a firm is discounting to win sales and borrowing to pay suppliers. A rise in gearing with a fall in ROCE may mean that new borrowing has not yet earned a return.

## How strategies change the ratios

| Decision | Likely effect on ratios |
| --- | --- |
| Finance growth with a loan | Gearing rises; interest lowers profit for the year and dividend cover; ROCE rises only if the project earns |
| Finance growth with new shares | Gearing falls; earnings per share and dividend yield may fall as profit is shared among more shares |
| Cut prices to win market share | Gross and operating margins fall; revenue and inventory turnover may rise |
| Raise the dividend | Dividend yield rises; dividend cover and retained profit fall |
| Open new outlets (organic growth) | Expenses and capital employed rise first; ROCE may fall before sales mature |
| Reduce credit terms | Receivables days fall and liquidity improves; some customers may be lost |

## Limitations of published accounts and ratios

- **Historic data**: the accounts show the past, not the future, and changes since the year end are not shown.
- **Different accounting policies**: depreciation methods, inventory valuation and what counts as capital can differ between firms, so ratios are not strictly comparable.
- **Window dressing**: figures at one date can be improved temporarily, for example by delaying purchases or collecting debts just before the year end.
- **Non-financial factors are missing**: quality of management, staff morale, brand, customer loyalty, environmental record and market position do not appear in the ratios.
- **Inflation, seasonality and different year-ends** distort comparisons between years and firms.
- **Ratios show symptoms, not causes**: they must be followed by questions to management.
- **Industry differences**: a good ratio in one industry (a supermarket's low current ratio) is poor in another.

Use ratios as a starting point and combine them with the cash flow forecast, market data and non-financial information.

:::worked-solution[Example 1: trend analysis in a short report]
**Context.** The figures below are for Sipho Motors Ltd (a fictional company). In 2025 the company borrowed US$80,000 to open a second workshop.

${info}

${rt}

**Report.**

1. **Profitability.** Revenue rose by 18.8%, but the gross margin fell from ${f1(R.S24.gm)}% to ${f1(R.S25.gm)}% (cost of sales rose faster), the operating margin was almost unchanged at about 11.8%, and ROCE fell from ${f1(R.S24.roce)}% to ${f1(R.S25.roce)}% because capital employed rose by US$100,000.
2. **Liquidity.** The current ratio fell from ${f2(ratios.currentRatio(F.S24.ca, F.S24.cl))} : 1 to ${f2(R.S25.cr)} : 1 and the acid test from ${f2(ratios.acidTest(F.S24.ca, F.S24.inv, F.S24.cl))} : 1 to ${f2(R.S25.at)} : 1, because inventory and current liabilities rose.
3. **Gearing.** It rose from ${f1(ratios.gearing(F.S24.ncl, R.S24.ce))}% to ${f1(R.S25.gear)}% and interest rose from US$6,000 to US$14,000, so dividend cover fell from ${f2(R.S24.cover)} to ${f2(R.S25.cover)} times.
4. **Conclusion.** The expansion has increased sales but weakened margins, liquidity and cover. This is normal at the start of an expansion, so the 2025 figures alone do not show failure.
5. **Judgement.** The company should be watched, not rejected. The key test is whether the second workshop raises profit from operations in 2026 enough to lift ROCE above 20%. Also needed: the cash flow forecast and information on the workshop's bookings.
:::

:::worked-solution[Example 2: case analysis, inter-firm comparison and a recommendation]
**Context.** The bank also has the 2025 figures of a rival, Thandeka Autos Ltd (a fictional company in the same town), shown in the last column of the table in Example 1.

**Point.** Thandeka Autos is the stronger company on every measure.

**Application.** Thandeka's gross margin is ${f1(R.T25.gm)}% against ${f1(R.S25.gm)}%, its ROCE ${f1(R.T25.roce)}% against ${f1(R.S25.roce)}%, its acid test ${f2(R.T25.at)} : 1 against ${f2(R.S25.at)} : 1 and its gearing only ${f1(R.T25.gear)}% against ${f1(R.S25.gear)}%.

**Analysis.** Thandeka earns more on each sale and on its capital, holds less inventory and borrows little, so it can pay its debts. Sipho Motors has invested for growth and so has carried the costs before the benefits, but it has less margin for error if the second workshop is slow to fill.

**Judgement.** The bank should lend to Thandeka on these figures. Lending to Sipho Motors is possible if the company shows a cash flow forecast with bookings, offers security and accepts a shorter loan term. The comparison is limited: it uses one year, the firms may value inventory differently, and Sipho's expansion costs are temporary. Non-financial factors, such as customer loyalty and the skill of mechanics, also matter.
:::

## Common mistakes

:::mistake{title="Listing ratios without a conclusion"}
Writing "ROCE fell, gearing rose" earns little. Link the ratios, explain why, state what it means for the stakeholder and make a recommendation.
:::

:::mistake{title="Treating one year as a trend"}
A trend needs several years. If only two years are given, say so and call the result an indication, not a pattern.
:::

:::mistake{title="Ignoring the user of the report"}
A bank, a shareholder, a supplier and a manager want different ratios. Choose the ones that matter for the person who will use the report.
:::

## Exam tips

:::exam-tip
ZIMSEC Business Studies Paper 2 and Business Enterprise Skills Paper 2 ask you to *analyse*, *discuss* and *evaluate* statements and ratios; Cambridge Papers 3 and 4 ask you to *calculate*, *analyse*, *assess*, *evaluate* and *advise*. Calculate only what is asked, group the ratios (profitability, liquidity, gearing), give a reason for each change from the case, compare with a rival or the previous year, name two limitations and end with a clear recommendation that depends on a condition or time-frame.
:::

## Summary

:::summary
- Ratios are used over time (trends) and against competitors (inter-firm comparison), and must be linked to tell a story.
- A recommendation depends on the user of the report: lender, shareholder, supplier or manager.
- Debt finance raises gearing and interest; equity lowers gearing but dilutes earnings per share; price cuts lower margins; a higher dividend lowers cover.
- Limitations: historic data, different accounting policies, window dressing, missing non-financial factors, inflation and industry differences.
- Ratios show symptoms; managers must find the causes and check the cash flow forecast.
- A good answer ends with a judgement that is justified and conditional.
:::
`;
lesson("ratios/interpretation-limits", { key: "ratios.interpretation-limits", title: "Using ratios and accounts in strategy: trends, comparisons and limitations", summary: "Assessing performance over time and against competitors, how debt, equity, dividend and growth decisions change the ratios, combining ratios in a short report with a recommendation, and the limitations of accounts and ratio analysis.", concept: "abus.ratios.interpretation-limits", minutes: 60 }, body.replace(/US\$/g, "US\\$"));
