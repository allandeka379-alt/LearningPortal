---
{
  "key": "macro.price-indices-real-values",
  "title": "Price indices, inflation and real values",
  "summary": "Construct a weighted consumer price index, calculate the inflation rate, distinguish nominal from real values, use the GDP deflator to find real GDP, and explain the difficulties of measuring price changes, with worked calculations.",
  "concepts": ["aecon.macro.price-indices-real-values"],
  "estimatedMinutes": 60,
  "level": "core"
}
---
## Introduction

A worker in Harare is paid US\$640 this month and was paid US\$600 last year. Is she better off? The answer depends on what happened to prices. If prices rose by more than 6.7%, her pay buys less than before. Economists therefore separate **nominal** values (measured at the prices of the time) from **real** values (adjusted for changes in prices). To do so they need a measure of the general price level: a **price index**.

You should know what inflation is, how to calculate percentage changes and how GDP is measured. This lesson shows how a consumer price index is constructed from a weighted basket, how to calculate the rate of inflation, how to turn nominal figures into real ones, and why measurement is difficult. The causes and consequences of inflation are in a later lesson.

## Key definitions

:::definition{term="Consumer price index (CPI)"}
A weighted average of the prices of a representative basket of goods and services bought by typical households, expressed as an index relative to a base year (base year = 100). ZIMSEC also names the **retail price index (RPI)**, a similar measure; Cambridge uses CPI.
:::

:::definition{term="Base year"}
The year with which other years are compared; its index is set at 100.
:::

:::definition{term="Weights"}
Numbers that show the importance of each item in a typical household's spending (for example the share of spending going on food), obtained from a household expenditure survey.
:::

:::definition{term="Inflation rate"}
The percentage rate of change of the price level over a period, usually a year: (index this year − index last year) ÷ index last year × 100.
:::

:::definition{term="Nominal and real values"}
A **nominal** (money) value is measured at current prices. A **real** value is adjusted for changes in prices, so that it measures purchasing power or quantities.
:::

:::definition{term="GDP deflator"}
A price index for the whole economy: nominal GDP ÷ real GDP × 100.
:::

:::keyfact{title="Formulae"}
Price relative = new price ÷ base price × 100.
Weighted index = Σ (weight × price relative) ÷ Σ weights.
Inflation rate = (index₁ − index₀) ÷ index₀ × 100.
Real value = nominal value ÷ price index × 100.
Real GDP = nominal GDP ÷ GDP deflator × 100.
:::

## Constructing a weighted price index

1. **Choose the base year** and a **basket** of goods and services that typical households buy.
2. **Collect prices** for each item in the base year and the current year.
3. **Calculate the price relative** of each item: current price ÷ base price × 100.
4. **Find the weights** from household spending (these must add up to a fixed total such as 100).
5. **Multiply** each price relative by its weight, **add** and **divide** by the total of the weights.

:::worked-solution{title="A weighted consumer price index (illustrative data)"}
A fictional country uses a four-item basket. Prices are in US\$ per unit.

| Item | Weight | Base price | Current price | Price index | Weight × index |
| --- | ---: | ---: | ---: | ---: | ---: |
| Food | 40 | 5.00 | 5.60 | 112.0 | 4,480.0 |
| Housing and utilities | 25 | 120.00 | 132.00 | 110.0 | 2,750.0 |
| Transport | 20 | 2.00 | 2.50 | 125.0 | 2,500.0 |
| Clothing | 15 | 30.00 | 33.00 | 110.0 | 1,650.0 |
| **Total** | **100** | | | | **11,380.0** |

1. Price relative for food = 5.60 ÷ 5.00 × 100 = **112.0**; housing 132 ÷ 120 × 100 = **110.0**; transport 2.50 ÷ 2.00 × 100 = **125.0**; clothing 33 ÷ 30 × 100 = **110.0**.
2. Weight × index: 40 × 112 = 4,480; 25 × 110 = 2,750; 20 × 125 = 2,500; 15 × 110 = 1,650. The total is **11,380**.
3. CPI = 11,380 ÷ 100 = **113.8**. Prices of the basket are, on average, 13.8% higher than in the base year.
4. Transport has the largest rise (25%) but a smaller weight than food, so food (12% rise, weight 40) contributes more to the index: its weighted contribution is 4,480 against 2,500.
:::

## The inflation rate

:::worked-solution{title="Inflation (illustrative data)"}
The CPI was 108.0 last year and is 113.8 this year.

1. Inflation rate = (113.8 − 108.0) ÷ 108.0 × 100 = 5.8 ÷ 108.0 × 100 = **5.4%** (to one decimal place).
2. The index shows that prices are 13.8% above the base year, but the **annual inflation** is only 5.4%. Do not mix the two: the percentage above the base year is not the rate of inflation.
3. If the index fell from 113.8 to 112.0 the price level would be falling (deflation): (112.0 − 113.8) ÷ 113.8 × 100 = −1.6%. If inflation falls from 5.4% to 3%, prices are still rising, but more slowly (disinflation).
:::

## Nominal and real values

Dividing a nominal value by a price index (and multiplying by 100) gives its value at base-year prices.

:::worked-solution{title="Real wages (illustrative data)"}
A worker earned US\$600 a month when the price index was 108.0 and earns US\$640 now when the index is 113.8.

1. Nominal wage growth = (640 − 600) ÷ 600 × 100 = **6.7%**.
2. Real wage then = 600 ÷ 108.0 × 100 = **US\$555.56** (at base-year prices).
3. Real wage now = 640 ÷ 113.8 × 100 = **US\$562.39**.
4. Real wage growth = (562.39 − 555.56) ÷ 555.56 × 100 = **1.2%**. Her nominal pay rose by 6.7% but prices rose by 5.4%, so her purchasing power rose by only about 1.2%.
5. Approximation: real growth ≈ nominal growth − inflation = 6.7 − 5.4 = 1.3 percentage points; the exact method gives 1.2%.
:::

## The GDP deflator and real GDP

The CPI covers only household purchases. The **GDP deflator** covers all goods and services produced in the economy, including investment goods, government output and exports. It is used to turn nominal GDP into real GDP, so that growth is measured in volume and not distorted by price changes.

:::worked-solution{title="Real GDP and growth (illustrative data)"}
Nominal GDP is US\$5,100 million in the base year (deflator 100) and US\$6,300 million this year, when the GDP deflator is 120.

1. Deflator check: nominal GDP ÷ real GDP × 100 = 6,300 ÷ 5,250 × 100 = **120**.
2. Real GDP this year = 6,300 ÷ 120 × 100 = **US\$5,250 million** (at base-year prices).
3. Nominal growth = (6,300 − 5,100) ÷ 5,100 × 100 = **23.5%**.
4. Real growth = (5,250 − 5,100) ÷ 5,100 × 100 = **2.9%**.
5. Most of the 23.5% rise in nominal GDP reflects higher prices, not more output: real output rose by only 2.9%. Judging growth from nominal GDP would be misleading.
:::

## Using real values to compare living standards

Real GDP per head, real wages and real incomes over time show whether living standards are improving. Comparing nominal figures can mislead, especially when inflation is high or when a currency has lost value. Comparing across countries requires a common currency and price level (for instance, purchasing power parity).

## Difficulties in measuring price changes

1. **Choice of basket and weights.** The basket reflects an average household. A poor household spends a larger share on food than the average, so the index may not match its experience; rural and urban households differ.
2. **Changing patterns of spending.** Weights are updated only periodically, so a fixed basket may include goods people have stopped buying and miss new ones.
3. **Substitution.** When a price rises, consumers switch to cheaper goods; a fixed basket overstates the cost of living.
4. **Quality changes.** If a product improves, a price rise may partly reflect better quality, which the index may count as inflation.
5. **New goods.** Mobile services and new products may not be in the basket at first.
6. **Informal and varying prices.** Prices in informal markets differ between traders and places, and are harder to collect; where several currencies or rates are used, prices can vary with the payment method.
7. **Regional differences and sampling errors.**
8. **Housing and other items** are difficult to measure (rents, owner-occupied homes).

:::example{title="An evaluation paragraph"}
A single consumer price index is a useful measure of the average change in the cost of living and can be used to adjust wages and pensions. However, it is based on the spending pattern of a typical household. A low-income household that spends more on food may face higher inflation than the index shows if food prices rise faster than other prices. The index also cannot fully account for quality change or substitution, so it can overstate or understate the true change in living costs. For policy purposes it should be supplemented by separate indices for different groups.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards require the construction of a weighted index, the inflation rate, nominal against real values, the GDP deflator and real GDP, and the difficulties of measurement. ZIMSEC mentions the retail price index (RPI) and the consumer price index (CPI); Cambridge uses CPI. Cambridge does not print formulae in the paper: learn them.
:::

## Common mistakes

:::mistake{title="Using the index level as the inflation rate"}
A CPI of 113.8 means prices are 13.8% above the base year. The inflation rate is the percentage change from last year's index.
:::

:::mistake{title="Forgetting to divide by the price index"}
Real value = nominal ÷ index × 100. Multiplying by the index, or dividing by 100 only, gives a wrong result.
:::

:::mistake{title="Using unweighted averages"}
If items matter differently in spending, the index must use weights. A simple average of price relatives treats clothing as important as food.
:::

## Exam tips

:::exam-tip{title="Where it is tested"}
ZIMSEC Paper 1 asks for calculation of an index and inflation; Paper 2 gives a price table to calculate a weighted index and real wages, with discussion of the limits; Paper 3 essays ask about measuring inflation. Cambridge Paper 1 tests index calculations and the interpretation of real data in multiple choice; Paper 2 data response includes real/nominal conversion and evaluation of the CPI.
:::

:::exam-tip{title="Command words"}
*Calculate*: show weights × price relatives, the total and the division; for real values divide by the index and multiply by 100. *Explain*: why real data are needed. *Compare*: use real values. *Evaluate*: difficulties in measurement and their effect on conclusions.
:::

## Summary

:::summary
- A weighted price index = Σ (weight × price relative) ÷ Σ weights, with base year = 100.
- The inflation rate is the percentage change in the index from one year to the next, not the index level above 100.
- Real value = nominal value ÷ price index × 100; real GDP = nominal GDP ÷ GDP deflator × 100.
- Real growth removes the effect of price changes; nominal growth can greatly overstate real growth.
- Measurement difficulties include the choice of basket and weights, substitution, quality change, new goods and informal prices.
:::
