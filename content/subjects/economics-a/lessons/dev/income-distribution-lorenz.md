---
{
  "key": "dev.income-distribution-lorenz",
  "title": "Income distribution: the Lorenz curve and the Gini coefficient",
  "summary": "Describe and interpret a Lorenz curve from cumulative income and population shares, calculate the Gini coefficient, compare distributions over time and between countries, and explain the limitations of these measures.",
  "concepts": ["aecon.dev.income-distribution-lorenz"],
  "estimatedMinutes": 50,
  "level": "core"
}
---
## Introduction

Two countries can have the same average income and very different lives for their people. In one, the top fifth of households may receive almost half of all income; in the other, income may be spread more evenly. Economists use the **Lorenz curve** to picture the distribution of income and the **Gini coefficient** to turn the picture into a single number. These tools matter for judging development, because a rise in average income that goes mainly to the richest households may do little for poverty.

You should know the difference between average and total income and how to find cumulative percentages.

## Key definitions

:::definition{term="Lorenz curve"}
A curve showing the cumulative percentage of total income (vertical axis) received by the cumulative percentage of the population (horizontal axis), with the population ranked from the poorest to the richest.
:::

:::definition{term="Line of perfect equality"}
The 45-degree diagonal of the Lorenz diagram, on which every x% of the population receives x% of income. The Lorenz curve of any real economy lies below it.
:::

:::definition{term="Gini coefficient"}
A measure of inequality equal to the area between the line of perfect equality and the Lorenz curve, divided by the whole area under the line of perfect equality. It ranges from 0 (perfect equality) to 1 (one person receives all the income).
:::

## Constructing a Lorenz curve

The table shows the income distribution of a fictional country (illustrative data) divided into five equal groups of households (quintiles), ranked from poorest to richest.

| Quintile | Share of income (%) | Cumulative population (%) | Cumulative income (%) |
| --- | ---: | ---: | ---: |
| Quintile 1 | 5.0 | 20.0 | 5.0 |
| Quintile 2 | 10.0 | 40.0 | 15.0 |
| Quintile 3 | 15.0 | 60.0 | 30.0 |
| Quintile 4 | 25.0 | 80.0 | 55.0 |
| Quintile 5 | 45.0 | 100.0 | 100.0 |

The points to plot are (0, 0), (20, 5), (40, 15), (60, 30), (80, 55) and (100, 100). The curve starts at the origin, ends at (100, 100), and bows below the diagonal. The poorest 40% of households receive only 15% of income, and the richest 20% receive 45%. A curve **further from the diagonal** shows greater inequality.

## Calculating the Gini coefficient

:::keyfact{title="Gini"}
**Gini = area between the diagonal and the Lorenz curve ÷ area under the diagonal = 1 − 2 × (area under the Lorenz curve)**, with both axes measured from 0 to 1. With grouped data, add the areas of trapezia under the curve: width × (sum of the two cumulative shares ÷ 2).
:::

:::worked-solution{title="Gini for the table above"}
Using fractions (0.20 width per quintile):
1. Quintile 1: 0.20 × (0 + 0.05) ÷ 2 = **0.005**.
2. Quintile 2: 0.20 × (0.05 + 0.15) ÷ 2 = **0.020**.
3. Quintile 3: 0.20 × (0.15 + 0.30) ÷ 2 = **0.045**.
4. Quintile 4: 0.20 × (0.30 + 0.55) ÷ 2 = **0.085**.
5. Quintile 5: 0.20 × (0.55 + 1.00) ÷ 2 = **0.155**.
6. Area under the Lorenz curve = 0.005 + 0.020 + 0.045 + 0.085 + 0.155 = **0.310**.
7. Gini = 1 − 2 × 0.310 = **0.38**. (Check: the area under the diagonal is 0.5, and the area between is 0.5 − 0.31 = 0.19; 0.19 ÷ 0.5 = 0.38.)
:::

![Lorenz curves for the quintile data: before, the curve passes through (20, 5), (40, 15), (60, 30) and (80, 55) with the shaded area between it and the line of equality equal to 0.19 so Gini = 0.38; after progressive taxes and transfers the amber curve lies closer to the diagonal at (20, 8), (40, 20), (60, 37), (80, 61) and Gini falls to 0.296.](media:diagrams/lorenz-curves-gini.png "Figure: Lorenz curves before (blue) and after (amber) redistribution; the nearer the diagonal, the lower the Gini coefficient")

## Comparing distributions

Suppose that after a programme of progressive taxes and transfers the same country's quintile shares change to 8, 12, 17, 24 and 39% (illustrative).

| Quintile | Share of income (%) | Cumulative population (%) | Cumulative income (%) |
| --- | ---: | ---: | ---: |
| Quintile 1 | 8.0 | 20.0 | 8.0 |
| Quintile 2 | 12.0 | 40.0 | 20.0 |
| Quintile 3 | 17.0 | 60.0 | 37.0 |
| Quintile 4 | 24.0 | 80.0 | 61.0 |
| Quintile 5 | 39.0 | 100.0 | 100.0 |

:::worked-solution{title="Gini after the change"}
1. Areas: 0.20 × (0 + 0.08) ÷ 2 = 0.008; 0.20 × (0.08 + 0.20) ÷ 2 = 0.028; 0.20 × (0.20 + 0.37) ÷ 2 = 0.057; 0.20 × (0.37 + 0.61) ÷ 2 = 0.098; 0.20 × (0.61 + 1.00) ÷ 2 = 0.161.
2. Total area under the Lorenz curve = **0.352**.
3. Gini = 1 − 2 × 0.352 = **0.296** (about 0.30).
4. The Gini fell from 0.38 to 0.296: the distribution became **more equal**, the new Lorenz curve lies closer to the diagonal, and the richest quintile's share fell from 45% to 39%.
5. A second measure: the ratio of the richest 20%'s share to the poorest 20%'s share fell from 45 ÷ 5 = **9.0** to 39 ÷ 8 = **4.9**.
:::

:::example{title="Reading two Lorenz curves"}
If one country's Lorenz curve lies everywhere closer to the diagonal than another's, the first country is more equal, and its Gini is lower. If the curves cross, neither distribution is more equal at every point: one may give the poorest groups a larger share while giving the richest group a larger share too. Two countries can then have the same Gini yet different distributions, so the Gini alone cannot show where the inequality lies. This is a limitation of a single summary figure.
:::

## Causes and interpretation

Inequality depends on the distribution of ownership of land and capital, differences in education and skills, differences in pay between sectors, discrimination, taxes and transfers, and whether growth creates jobs for the poor. A rise in the Gini over a period of growth shows that the gains went disproportionately to richer groups, even if everyone's income rose. (Policies to reduce inequality are covered in the equity lessons.)

## Limitations

1. **Single number:** two different Lorenz curves can give the same Gini.
2. **Income or wealth?** Wealth is usually far more unequal than income. State which is measured.
3. **Before or after tax and transfers?** The Gini based on gross income differs from the Gini for disposable income.
4. **Data quality:** surveys miss the rich and the informal economy, and incomes may be misreported.
5. **Households versus individuals:** household size and composition affect results.
6. **Differences in time:** a snapshot hides lifetime income and mobility, and a student or retired person may appear poor.
7. **No information about the level of income:** a rich country and a poor country may have the same Gini.

:::keyfact{title="Cambridge only"}
This concept is Cambridge A Level only. The questions combine drawing or interpreting a Lorenz curve, calculating the Gini coefficient from cumulative shares, and assessing changes in distribution. ZIMSEC expects inequality in the equity topics but not this calculation.
:::

## Common mistakes

:::mistake{title="Using shares instead of cumulative shares"}
The Lorenz curve is plotted with **cumulative** percentages. Using the income share of each group gives a wrong curve and a wrong Gini.
:::

:::mistake{title="Reading a lower curve as more equal"}
The further the curve is from the diagonal, the greater the inequality. A curve close to the diagonal means a more equal distribution.
:::

:::mistake{title="Forgetting the factor of 2"}
Gini = 1 − 2 × (area under the curve), because the area under the diagonal is 0.5, not 1.
:::

## Exam tips

:::exam-tip{title="Where it is tested"}
Cambridge Paper 3 contains multiple-choice questions on reading a Lorenz curve, and Paper 4 may supply a table of income shares and ask for the Gini coefficient or for an evaluation of the change in inequality.
:::

:::exam-tip{title="Command words"}
*Calculate*: convert shares to cumulative fractions, find the trapezium areas, and compute 1 − 2A. *Explain*: link the Lorenz curve to the share of income received by the poorest groups. *Evaluate*: consider what the Gini leaves out and how the data were collected.
:::

## Summary

:::summary
- The Lorenz curve plots cumulative income against cumulative population, from poorest to richest.
- The further the curve is from the diagonal, the greater the inequality.
- Gini = area between the diagonal and the curve ÷ area under the diagonal = 1 − 2 × area under the Lorenz curve.
- A Gini of 0 means equality and 1 means complete inequality.
- The Gini is a single summary figure with limits: it does not show the level of income or where the inequality lies.
:::
