// Lesson generator: ratios.liquidity (W3b)
import { coYear, R, writeLesson, front, F } from "./w3b-lib.mjs";
import { table, ratios, chk } from "../lib.mjs";

const p2 = (v) => v.toFixed(2);
const a = coYear({ name: "Zvishavane Millers Ltd", year: 2024, revenue: 380000, cos: 247000, distribution: 22000, admin: 61000, finance: 4000, tax: 11000, nca: 200000, inventory: 46000, receivables: 31000, bank: 14000, payables: 38000, otherCL: 12000, loan: 40000, shareCapital: 120000 });
const b = coYear({ name: "Zvishavane Millers Ltd", year: 2025, revenue: 532000, cos: 356440, distribution: 30000, admin: 79000, finance: 4000, tax: 13500, nca: 215000, inventory: 69000, receivables: 52000, bank: 3000, payables: 71000, otherCL: 19000, loan: 40000, shareCapital: 120000 });
const ext = table(["Extract at 31 December", "2024 US$", "2025 US$"], [
  ["Inventory", a.inventory, b.inventory], ["Trade receivables", a.receivables, b.receivables], ["Cash and cash equivalents", a.bank, b.bank],
  ["**Current assets**", a.ca, b.ca], ["Trade payables", a.payables, b.payables], ["Tax and accruals", a.otherCL, b.otherCL], ["**Current liabilities**", a.cl, b.cl],
  ["Revenue for the year", a.revenue, b.revenue],
]);
const wk = table(["Ratio", "Formula", "2024 working", "2025 working", "2024", "2025"], [
  ["Current ratio", "current assets : current liabilities", `${F(a.ca)} ÷ ${F(a.cl)}`, `${F(b.ca)} ÷ ${F(b.cl)}`, p2(R.current(a)) + " : 1", p2(R.current(b)) + " : 1"],
  ["Acid test ratio", "(current assets - inventory) : current liabilities", `(${F(a.ca)} - ${F(a.inventory)}) ÷ ${F(a.cl)}`, `(${F(b.ca)} - ${F(b.inventory)}) ÷ ${F(b.cl)}`, p2(R.acid(a)) + " : 1", p2(R.acid(b)) + " : 1"],
], ["l", "l", "l", "l", "r", "r"]);

// Example 2: effect of transactions
const base = { ca: 60000, inv: 24000, cl: 40000 };
const cases = [
  ["Base position", base.ca, base.inv, base.cl],
  ["1. Pay trade payables US\\$10,000 from the bank", base.ca - 10000, base.inv, base.cl - 10000],
  ["2. Buy inventory US\\$8,000 on credit", base.ca + 8000, base.inv + 8000, base.cl + 8000],
  ["3. Sell a machine for cash at its carrying amount of US\\$6,000", base.ca + 6000, base.inv, base.cl],
  ["4. Take a 5-year loan US\\$15,000 into the bank", base.ca + 15000, base.inv, base.cl],
];
const t2 = table(["Transaction", "Current assets", "Inventory", "Current liabilities", "Current ratio", "Acid test"], cases.map(([l, ca, inv, cl]) => [l, ca, inv, cl, p2(ca / cl) + " : 1", p2((ca - inv) / cl) + " : 1"]), ["l", "r", "r", "r", "r", "r"]);
chk(60000 / 40000, 1.5);
const c1 = cases[1], c2 = cases[2], c3 = cases[3], c4 = cases[4];

const body = `
## Introduction

Nyasha Chikwanha supplies maize meal to shops around Zvishavane. Her mill is profitable, but last month she could not pay the electricity bill on time because the cash was tied up in unsold stock and in customers who had not paid. A profitable business can still run out of cash. **Liquidity ratios** measure whether a business can pay its debts as they fall due, from the assets it can turn into cash within a year.

You should know the layout of the statement of financial position and the meaning of current assets and current liabilities. This lesson applies them to the current ratio and the acid test ratio and to the decisions that follow from them. Both boards examine it; it is tested in ZIMSEC Papers 1 to 3 and Cambridge Papers 1 to 3.

:::keyfact{title="ZIMSEC and Cambridge terms"}
| ZIMSEC (syllabus and common usage) | Cambridge 9706 |
| --- | --- |
| Current ratio; working capital ratio | Current ratio, written as x : 1 |
| Quick ratio; liquid ratio; acid test | Acid test ratio |
| Stock; debtors; creditors | Inventory; trade receivables; trade payables |
:::

## Key definitions

:::definition{term="Liquidity"}
The ability of a business to pay its short-term debts as they fall due, using cash or assets that will turn into cash soon.
:::

:::definition{term="Current ratio"}
Current assets divided by current liabilities, written as x : 1. It shows how many dollars of current assets support each dollar of current liabilities.
:::

:::definition{term="Acid test ratio"}
Current assets less inventory, divided by current liabilities, written as x : 1. Inventory is removed because it must be sold, and then collected from customers, before it becomes cash.
:::

:::definition{term="Overtrading"}
Expanding revenue faster than the business can finance. Inventory and receivables grow, cash runs out and the business relies on suppliers and overdrafts.
:::

## Calculating and reading the ratios

:::keyfact{title="Liquidity formulae"}
- Current ratio = current assets : current liabilities (divide, and write the answer as x : 1)
- Acid test ratio = (current assets - inventory) : current liabilities
- Give two decimal places unless the question says otherwise, and write ": 1" after the answer.
:::

There is no ratio that is right for every business. Textbooks often quote a current ratio near 2 : 1 and an acid test near 1 : 1, but these are only guides. A supermarket sells for cash, turns its inventory over quickly and is paid before it pays its suppliers, so it can run safely with a low ratio. A business that sells on long credit needs more. Always compare with the same business in earlier years, with a similar business, or with the credit terms stated in the question.

A high ratio is not automatically good. It may mean cash is idle, inventory is piling up or receivables are not collected. A low ratio is a warning, but it may be normal for the industry. Judge the ratios together with the trend and the rest of the statements.

:::worked-solution[Example 1: Zvishavane Millers Ltd, two years]
Extracts from the statements of financial position of Zvishavane Millers Ltd are given below. Calculate the current ratio and the acid test ratio for both years and comment.

${ext}

${wk}

Revenue rose by ${((b.revenue / a.revenue - 1) * 100).toFixed(1)}%, but liquidity worsened. The current ratio fell from ${p2(R.current(a))} : 1 to ${p2(R.current(b))} : 1 and the acid test ratio from ${p2(R.acid(a))} : 1 to ${p2(R.acid(b))} : 1. In 2025 the company held only US\\$${F(b.bank)} in cash against current liabilities of US\\$${F(b.cl)}. Inventory, receivables and payables all grew faster than cash. The pattern is typical of **overtrading**: the mill grew by buying meal and selling on credit, and relied on its suppliers for the funding. The acid test ratio of ${p2(R.acid(b))} : 1 means that without selling inventory the company holds only about ${(R.acid(b) * 100).toFixed(0)} cents of liquid assets for every dollar it owes in the short term.
:::

## What changes a liquidity ratio

Examiners like questions on the effect of a transaction. Work with the numbers: change the current assets and the current liabilities and recalculate. The result depends on whether the ratio starts above or below 1.

:::worked-solution[Example 2: effect of transactions on the ratios]
A trader has current assets of US\\$${F(base.ca)} (including inventory of US\\$${F(base.inv)}) and current liabilities of US\\$${F(base.cl)}. Each transaction below is considered separately, starting from this position. Calculate the new current ratio and acid test ratio.

${t2}

1. Paying a creditor from the bank reduces both totals by the same amount. Because the ratio is above 1, it **rises** (${p2(base.ca / base.cl)} to ${p2(c1[1] / c1[3])}). This is why a business may pay creditors just before the year end: it is a form of **window dressing**, which makes the year-end figure look better than the position during the year. The acid test ratio starts below 1, so for it the same payment has the opposite effect: it falls to ${p2((c1[1] - c1[2]) / c1[3])} : 1.
2. Buying inventory on credit adds the same amount to current assets and to current liabilities, so the current ratio **falls** (${p2(base.ca / base.cl)} to ${p2(c2[1] / c2[3])}). The acid test ratio falls more, to ${p2((c2[1] - c2[2]) / c2[3])} : 1, because the new asset is inventory.
3. Selling a non-current asset for cash adds to current assets only, so both ratios **rise** (current ratio ${p2(c3[1] / c3[3])}). The business has converted a long-term asset into a liquid one.
4. A long-term loan adds cash and does not add to current liabilities, so both ratios **rise** (current ratio ${p2(c4[1] / c4[3])}). Cash is raised for the long term and the ratio improves.
:::

## Improving liquidity

A business can improve its liquidity in several ways. Each has a cost.

- **Collect receivables sooner** by offering a cash discount or chasing late payers; discounts reduce profit.
- **Reduce inventory** by selling slow items or ordering less; the business may run out of items customers want.
- **Delay paying suppliers**, which works only until suppliers refuse credit or charge more.
- **Raise long-term finance** with loan notes or a share issue; this raises finance costs or dilutes ownership.
- **Sell surplus non-current assets**, which brings in cash but may reduce capacity.

Liquidity and profit are separate. The mill in Example 1 sold more every month and still ran short of cash. When you advise, say which action fits the problem: a business with slow receivables needs credit control, while a business with idle cash might invest it.

## Common mistakes

:::mistake{title="Using the wrong direction"}
The ratio is current assets divided by current liabilities, not the reverse. Write the answer as x : 1, for example 1.38 : 1.
:::

:::mistake{title="Leaving inventory in the acid test"}
The acid test excludes inventory only. Receivables and cash stay in. Do not remove receivables as well.
:::

:::mistake{title="Saying that a higher ratio is always better"}
A very high ratio can show idle cash or unsold inventory. Comment on the cause and on the industry, not only on the number.
:::

:::mistake{title="Confusing liquidity with profitability"}
A profitable business can run out of cash when inventory and receivables grow. Use the ratios to judge the ability to pay, not the size of the profit.
:::

## Exam tips

:::exam-tip
Liquidity ratios appear in ZIMSEC Papers 1 to 3 and Cambridge Papers 1 to 3. For *calculate*, show the formula and both totals and give the answer as x : 1 to two decimal places. For *comment* or *explain*, state the direction of change, give a cause from the statements, and say what it means for the ability to pay creditors.
:::

:::exam-tip
For *advise* or *evaluate*, give a recommendation with a reason, such as speeding up receivables or arranging long-term finance, and mention one limit of the ratios: they use year-end figures that may have been window dressed. For *explain the effect of a transaction*, recalculate both ratios; do not guess from the direction alone.
:::

## Summary

:::summary
- Current ratio = current assets : current liabilities; acid test ratio = (current assets - inventory) : current liabilities, both written as x : 1.
- Suitable levels depend on the industry and the credit terms; use trends and comparisons, not a fixed target.
- A fall in the ratios with rising revenue, inventory and receivables points to overtrading.
- Paying creditors raises a ratio that is above 1; buying inventory on credit lowers it; long-term finance raises it.
- Improve liquidity by collecting faster, holding less inventory, longer-term finance or selling surplus assets, each with a cost.
:::
`;
writeLesson("ratios/liquidity.md", front("ratios.liquidity", "Liquidity ratios and the ability to pay", "Calculate the current ratio and acid test ratio, interpret them for the industry, trace the effect of transactions and window dressing, and recommend ways to improve liquidity.", ["aacc.ratios.liquidity"], 50), body);
void ratios;
