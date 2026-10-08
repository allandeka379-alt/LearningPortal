---
{
  "key": "analysis.mark-up-margin",
  "title": "Mark-up and margin: converting and finding missing figures",
  "summary": "The difference between mark-up on cost and margin on selling price, how to convert one into the other, and how to use either to find revenue, cost of sales, gross profit or closing inventory.",
  "concepts": ["acc.analysis.mark-up-margin"],
  "estimatedMinutes": 30,
  "level": "core"
}
---
## Introduction

Sipho buys school shoes for US\$20 a pair and sells them for US\$25 in his shop in Masvingo. He says he makes "25%". His sister, who studied accounting, says he makes "20%". They are both right, because they are measuring the same US\$5 of gross profit against different bases: Sipho compares it with what the shoes **cost**, his sister with what they **sell** for.

Confusing these two percentages is one of the most common errors in O-Level Accounting. Both ZIMSEC (Form 4: "apply the ratios to arrive at missing figures") and Cambridge 0452 (incomplete records "using mark-up, margin and inventory turnover") set questions that give one percentage and ask you to find sales, cost of sales or closing inventory. This lesson gives you a reliable method.

:::keyfact{title="ZIMSEC and Cambridge terms"}
Both boards say **mark-up** for gross profit as a percentage of cost. ZIMSEC often says **margin** and Cambridge **gross profit margin** for gross profit as a percentage of selling price (revenue). Some older books call the mark-up "profit on cost" and the margin "profit on sales".
:::

## Key definitions

:::definition{term="Mark-up"}
Gross profit as a percentage of cost price (cost of sales): gross profit ÷ cost × 100.
:::

:::definition{term="Margin"}
Gross profit as a percentage of selling price (revenue): gross profit ÷ revenue × 100.
:::

:::definition{term="Cost structure"}
The proportions of cost, gross profit and selling price, written so that the base of the percentage equals 100.
:::

## The cost structure method

Every problem can be solved by writing out the three parts of the selling price with the base equal to 100:

| Given | Cost | Gross profit | Selling price |
| --- | ---: | ---: | ---: |
| Mark-up of 25% (base = cost) | 100 | 25 | 125 |
| Margin of 20% (base = selling price) | 80 | 20 | 100 |

The two lines describe the same business: 25/125 = 20/100 = 1/5. From the structure you can read any fraction you need:

- gross profit ÷ selling price (the margin),
- gross profit ÷ cost (the mark-up),
- cost ÷ selling price (to find cost of sales from revenue),
- selling price ÷ cost (to find revenue from cost of sales).

## Converting between mark-up and margin

**Margin = mark-up ÷ (100 + mark-up) × 100**

**Mark-up = margin ÷ (100 − margin) × 100**

Fractions make this quick. A mark-up of 1/n is a margin of 1/(n + 1); a margin of 1/n is a mark-up of 1/(n − 1). So a mark-up of 1/3 (33⅓%) is a margin of 1/4 (25%), and a margin of 1/5 (20%) is a mark-up of 1/4 (25%).

Because cost is always smaller than selling price (when there is a profit), the mark-up is always the larger of the two percentages.

:::worked-solution[Example 1: conversions]
Convert each figure, giving answers to one decimal place.

1. Mark-up 50%: margin = 50 ÷ 150 × 100 = **33.3%**.
2. Mark-up 60%: margin = 60 ÷ 160 × 100 = **37.5%**.
3. Margin 40%: mark-up = 40 ÷ 60 × 100 = **66.7%**.
4. Margin 25%: mark-up = 25 ÷ 75 × 100 = **33.3%**.

| Mark-up | Cost : gross profit : selling price | Margin |
| ---: | --- | ---: |
| 50% | 100 : 50 : 150 | 33.3% |
| 60% | 100 : 60 : 160 | 37.5% |
| 66.7% | 60 : 40 : 100 | 40% |
| 33.3% | 75 : 25 : 100 | 25% |

Check: in every row the mark-up is larger than the margin.
:::

## Finding missing figures

The usual chain is:

1. Use the percentage to find the missing trading figure (revenue, cost of sales or gross profit).
2. Use **cost of sales = opening inventory + purchases − closing inventory** to find the one figure still missing.

Typical questions:

- **Revenue known, mark-up given** → gross profit = revenue × m/(100 + m); cost of sales = revenue − gross profit.
- **Cost of sales known, margin given** → revenue = cost of sales × 100/(100 − g).
- **Closing inventory missing** (after a fire or theft) → cost of sales from the percentage, then closing inventory = opening inventory + purchases − cost of sales.

:::worked-solution[Example 2: finding closing inventory]
Chipo sells stationery in Chinhoyi at a mark-up of 33⅓%. Her records for 2025 show revenue of US\$40,000, opening inventory of US\$4,300 and purchases of US\$31,500. Her inventory count sheets were lost. Find her gross profit, cost of sales and closing inventory.

1. Cost structure (base = cost): cost 3, gross profit 1, selling price 4. (A mark-up of 1/3 is a margin of 1/4.)
2. Gross profit = 40,000 × 1/4 = **US\$10,000**.
3. Cost of sales = 40,000 − 10,000 = **US\$30,000** (or 40,000 × 3/4).
4. Closing inventory = 4,300 + 31,500 − 30,000 = **US\$5,800**.

| Trading figures | US\$ |
| --- | ---: |
| Opening inventory | 4,300 |
| Add: Purchases | 31,500 |
| Goods available for sale | 35,800 |
| Less: Closing inventory (missing figure) | (5,800) |
| Cost of sales | 30,000 |
| Gross profit | 10,000 |
| Revenue | 40,000 |

The common wrong answer takes 33⅓% of revenue (13,333) as the gross profit. That would be correct only for a **margin** of 33⅓%.
:::

## Common mistakes

:::mistake{title="Applying a mark-up to revenue"}
A mark-up is a percentage of cost. To use it with revenue, convert it first: gross profit = revenue × m/(100 + m).
:::

:::mistake{title="Applying a margin to cost of sales"}
A margin is a percentage of selling price. Gross profit = cost of sales × g/(100 − g), not cost of sales × g/100.
:::

:::mistake{title="Rounding too early"}
Keep exact fractions (1/3, 1/4) or full calculator values until the final answer. Rounding 33⅓% to 33% changes the result by hundreds of dollars on large figures.
:::

## Exam tips

:::exam-tip
Write the cost structure (for example "cost 100, gross profit 25, selling price 125") as your first line of working. It shows the examiner your method and stops you mixing the bases.
:::

:::exam-tip
After finding a missing figure, check it: recompute the percentage from your answer. If Chipo's gross profit is 10,000 on cost of sales of 30,000, the mark-up is 33⅓%, as given.
:::

:::exam-tip
In multiple-choice questions the wrong options are usually the result of the margin/mark-up swap. Decide which base applies before you calculate.
:::

## Summary

:::summary
- Mark-up = gross profit ÷ cost × 100; margin = gross profit ÷ selling price × 100.
- Margin = m ÷ (100 + m) × 100; mark-up = g ÷ (100 − g) × 100.
- A mark-up of 1/n equals a margin of 1/(n + 1).
- Write the cost structure first, then use cost of sales = opening inventory + purchases − closing inventory.
- The mark-up is always the larger percentage.
:::
