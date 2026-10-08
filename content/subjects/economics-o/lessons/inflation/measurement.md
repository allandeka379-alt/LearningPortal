---
{
  "key": "inflation.measurement",
  "title": "Measuring inflation: the Consumer Price Index and weighted indices",
  "summary": "How a consumer price index is built from a base year, a basket of goods and weights, how to calculate a weighted price index and the rate of inflation, how to compare rates for different periods, and the limitations of the index.",
  "concepts": ["econ.inflation.measurement"],
  "estimatedMinutes": 30,
  "level": "core"
}
---
## Introduction

When the news reports that "annual inflation was 6% last month", the figure comes from a **price index**. In Zimbabwe the Consumer Price Index (CPI) is compiled and published by ZIMSTAT, the national statistics agency, from prices collected in shops and markets around the country. Workers and unions use it in wage talks, the government and the Reserve Bank use it to judge policy, and pensions and contracts may be adjusted in line with it.

You cannot measure the "general price level" by looking at one price, because some prices rise, some fall and some do not change. A price index combines many prices into a single number, giving more importance to the things households spend most on. ZIMSEC asks you to calculate the rate of inflation using the CPI (and the Retail Price Index, RPI) and to compare rates for different periods; Cambridge asks you to explain how inflation is measured with the CPI.

## Key definitions

:::definition{term="Price index"}
A number that shows the average level of prices in a period compared with a base year, whose index is set at 100.
:::

:::definition{term="Consumer Price Index (CPI)"}
A weighted price index that measures changes in the prices of a typical basket of goods and services bought by households.
:::

:::definition{term="Base year"}
The year with which other years are compared; its index number is 100.
:::

:::definition{term="Basket of goods and services"}
A representative selection of the items households buy, chosen from a household expenditure survey.
:::

:::definition{term="Weight"}
A number showing the importance of an item (or group of items) in household spending, usually its share of total spending.
:::

:::definition{term="Retail Price Index (RPI)"}
A price index of retail prices of goods and services bought by households, similar to the CPI; in some countries it also includes housing costs such as mortgage interest.
:::

:::formula{name="Price index calculations"}
Price index of an item = current price ÷ base-year price × 100

Weighted price index = sum of (weight × item index) ÷ sum of weights

Rate of inflation (%) = (index this year − index last year) ÷ index last year × 100
:::

## How a consumer price index is built

1. **Choose a base year** and set its index at 100.
2. **Find out what households buy.** A household expenditure survey shows how much typical households spend on food, housing, transport, clothing, education, health and so on.
3. **Select the basket.** A representative list of items (mealie-meal, bread, cooking oil, kombi fares, rent, school fees, airtime) is chosen.
4. **Give each group a weight** in proportion to its share of spending. If households spend 40% of their budget on food, food gets a weight of 40 (out of 100).
5. **Collect prices** regularly from many shops and markets in different areas.
6. **Calculate an index for each item**: current price ÷ base-year price × 100.
7. **Multiply each item index by its weight**, add the results and divide by the total of the weights.
8. **Calculate the rate of inflation** from the change in the index.

Weights matter because a 10% rise in the price of food, on which households spend a lot, affects living costs far more than a 10% rise in the price of matches.

:::worked-solution[Worked example 1: a weighted price index]
A fictional statistics office uses four groups of items. The prices are the average prices of a typical item in each group.

| Item | Weight | Price in base year (US\$) | Price in current year (US\$) |
| --- | ---: | ---: | ---: |
| Food | 40 | 5.00 | 5.60 |
| Transport | 20 | 2.00 | 2.30 |
| Housing | 25 | 80.00 | 84.00 |
| Clothing | 15 | 20.00 | 19.00 |

1. Item indices: food 5.60 ÷ 5.00 × 100 = 112; transport 2.30 ÷ 2.00 × 100 = 115; housing 84 ÷ 80 × 100 = 105; clothing 19 ÷ 20 × 100 = 95.
2. Multiply by the weights:

| Item | Weight | Price index | Weight × index |
| --- | ---: | ---: | ---: |
| Food | 40 | 112.0 | 4,480.0 |
| Transport | 20 | 115.0 | 2,300.0 |
| Housing | 25 | 105.0 | 2,625.0 |
| Clothing | 15 | 95.0 | 1,425.0 |
| **Total** | **100** |  | **10,830.0** |

3. Weighted index = 10,830 ÷ 100 = **108.3**.
4. Since the base year is 100, the rate of inflation since the base year = (108.3 − 100) ÷ 100 × 100 = **8.3%**.
5. Clothing became cheaper, but the large weight on food (which rose 12%) pulled the overall index up.
:::

## Comparing rates of inflation for different periods

An index rise in **points** is not the same as a **percentage** rise. Always divide by the earlier index.

:::worked-solution[Worked example 2: comparing years and finding a real wage]
A fictional country's CPI (2024 = 100) was 112.0 in 2025 and 126.0 in 2026.

1. Inflation in 2025 = (112 − 100) ÷ 100 × 100 = **12.0%**.
2. Inflation in 2026 = (126 − 112) ÷ 112 × 100 = **12.5%**. The index rose 14 points, but the rate is 12.5%, because the base is 112, not 100.
3. Inflation was slightly higher in 2026 than in 2025.
4. Real wage: Rudo's monthly wage rose from US\$300 in 2024 to US\$330 in 2025, a 10.0% rise. In 2024 prices her new wage is worth 330 ÷ 112 × 100 = **US\$294.64**, less than US\$300. Her wage rose by less than prices (10% against 12%), so her real wage fell.
:::

## Limitations of a consumer price index

- **The basket represents an "average" household.** Poor households spend more on food and less on cars, so their personal inflation rate may differ from the CPI.
- **Spending patterns change.** Weights based on an old survey may not reflect what people buy now.
- **Quality changes and new products** are hard to measure: a dearer phone may also be much better.
- **Prices in the informal sector** and in rural areas may be hard to collect accurately.
- **Different prices in different currencies or exchange rates** can make collection difficult, a problem Zimbabwe faced during periods of currency change.
- **Substitution:** when one item becomes dear, households switch to cheaper ones, but a fixed basket assumes they do not.

:::keyfact{title="ZIMSEC and Cambridge terms"}
ZIMSEC uses the **Consumer Price Index** and the **Retail Price Index**; Cambridge uses the **Consumer Prices Index (CPI)** only. The method of weighting and the inflation calculation are the same. ZIMSEC also asks you to identify the current rate of inflation in Zimbabwe: look up the latest CPI release from ZIMSTAT and note its date.
:::

## Common mistakes

:::mistake{title="Treating a rise in index points as a percentage"}
A rise from 112 to 126 is 14 points but 12.5%. Divide the change by the **earlier** index.
:::

:::mistake{title="Adding price changes without weights"}
A simple average of item indices ignores how much households spend on each item. Multiply each index by its weight and divide by the total weight.
:::

:::mistake{title="Saying the base year has the lowest prices"}
The base year is simply the comparison year (index 100). Later years can have indices below 100 if prices fall.
:::

## Exam tips

:::exam-tip
**Explain how the CPI is measured:** mention base year, household expenditure survey, basket, weights, price collection and the weighted average.
:::

:::exam-tip
**Calculate:** set out a table with columns for weight, price index and weight × index; show the totals; then find the rate of inflation, rounding as instructed.
:::

:::exam-tip
**Compare periods:** calculate each rate on its own base and state which is higher; note the difference between points and per cent.
:::

## Summary

:::summary
- A price index compares prices with a base year set at 100.
- The CPI uses a basket of goods and services weighted by their share of household spending.
- Weighted index = sum of (weight × item index) ÷ sum of weights.
- Rate of inflation = change in the index ÷ previous index × 100; points are not percentages.
- The CPI is an average and can miss changes in spending patterns, quality and informal prices.
:::
