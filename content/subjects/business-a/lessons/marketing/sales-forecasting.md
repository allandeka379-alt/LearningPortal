---
{
  "key": "marketing.sales-forecasting",
  "title": "Sales forecasting: time series and qualitative methods",
  "summary": "Why businesses forecast sales; time-series analysis with the four-period centred moving average to find the trend, seasonal variations and a forecast; qualitative methods such as the Delphi method and expert opinion; and the limitations of forecasts.",
  "concepts": ["abus.marketing.sales-forecasting"],
  "estimatedMinutes": 60,
  "level": "core"
}
---
## Introduction

A fictional cold-drinks supplier in Harare sells many more bottles in the hot months than in winter. If it orders too little in summer, shops run out and customers buy a rival's drink; if it orders too much in winter, drinks sit in the store and ties up cash. To plan production, staff, inventory (stock), transport and the cash flow forecast, the supplier must **forecast** future sales. Forecasts help managers to decide *before* they are committed, but they are never exact. This lesson shows how to produce and judge them.

This lesson applies to ZIMSEC Business Studies (Form 5) and Cambridge **A Level** (Papers 3 and 4). Cambridge asks you to calculate the four-period centred moving average, seasonal variations and a forecast, and to evaluate the methods. ZIMSEC expects the idea of the trend and forecasting methods. Every table below is produced by code.

:::keyfact{title="ZIMSEC and Cambridge terms"}
| ZIMSEC | Cambridge |
| --- | --- |
| Sales forecasting; trends; moving averages (as taught); forecasting methods and their limits | Time series analysis; four-period centred moving average; trend; seasonal variation; extrapolation; qualitative forecasting (Delphi); limitations |

The additive model is used here: actual sales = trend + seasonal variation (+ random variation).
:::

## Key definitions

:::definition{term="Sales forecast"}
An estimate of the sales a business will make in a future period.
:::

:::definition{term="Time-series analysis"}
A method of forecasting that uses sales figures recorded over a series of past periods to find the trend and seasonal pattern and to extend them into the future.
:::

:::definition{term="Trend"}
The underlying long-term direction of the sales figures, once short-term (seasonal and random) variations are removed.
:::

:::definition{term="Seasonal variation"}
A regular, repeated difference between actual sales and the trend in particular periods, such as the quarters of the year.
:::

:::definition{term="Delphi method"}
A qualitative technique in which a panel of experts answer questions separately and anonymously over several rounds, seeing a summary of the group's views each time, until their opinions converge.
:::

## Why forecast?

Forecasts are used to plan **production and inventory**, **staffing**, **purchasing**, **cash flow** and **budgets**, to set marketing targets, and to decide whether to expand. A wrong forecast has costs: shortages and lost sales if the forecast is too low; unsold inventory and wasted cash if it is too high.

## Quantitative method: the four-period centred moving average

With **quarterly** data the four-quarter moving average removes the seasonal pattern and leaves the **trend**.

1. Add four consecutive quarters (the **moving total**); the total covers one whole year, so seasonal effects cancel.
2. Divide by 4 to find the moving average. It lies *between* two quarters.
3. **Centre** it: take the mean of two consecutive moving averages (or divide two consecutive moving totals' sum by 8). This gives a trend figure that lines up with an actual quarter.
4. **Seasonal variation** (additive) = actual sales − centred moving average.
5. Find the **average seasonal variation** for each quarter from all the years. The four averages should sum to about zero; if not, adjust each by the same amount.
6. **Trend change**: the average change per quarter in the centred moving average (last − first, divided by the number of quarters between them).
7. **Forecast** = extended trend + average seasonal variation for that quarter.

:::worked-solution[Example 1: finding the trend, seasonal variations and a forecast]
**Context.** The fictional cold-drinks supplier records quarterly sales in thousands of bottles for three years.

| Period | Sales | Moving total of 4 quarters | Centred moving average | Seasonal variation |
| --- | ---: | ---: | ---: | ---: |
| Y1 Q1 | 40 |  |  |  |
| Y1 Q2 | 62 | 236 |  |  |
| Y1 Q3 | 84 | 242 | 59.75 | 24.25 |
| Y1 Q4 | 50 | 248 | 61.25 | (11.25) |
| Y2 Q1 | 46 | 252 | 62.50 | (16.50) |
| Y2 Q2 | 68 | 258 | 63.75 | 4.25 |
| Y2 Q3 | 88 | 264 | 65.25 | 22.75 |
| Y2 Q4 | 56 | 270 | 66.75 | (10.75) |
| Y3 Q1 | 52 | 278 | 68.50 | (16.50) |
| Y3 Q2 | 74 | 284 | 70.25 | 3.75 |
| Y3 Q3 | 96 |  |  |  |
| Y3 Q4 | 62 |  |  |  |

(Each moving total is placed between the quarter shown and the next one.)

1. The first moving total is 40 + 62 + 84 + 50 = 236, so the first moving average is 59. The second is 242 ÷ 4 = 60.5. The centred average for Y1 Q3 is (59 + 60.5) ÷ 2 = 59.75.
2. Seasonal variation for Y1 Q3 = 84 − 59.75 = +24.25.
3. Average seasonal variations: Q1 (−16.50 and −16.50) = −16.50; Q2 (4.25 and 3.75) = +4.00; Q3 (24.25 and 22.75) = +23.50; Q4 (−11.25 and −10.75) = −11.00. These sum to 0.
4. Trend change per quarter = (70.25 − 59.75) ÷ 7 = +1.5 thousand bottles per quarter (there are 7 quarters between Y1 Q3 and Y3 Q2).
5. Forecast for Y4 Q1: the last centred average is 70.25 (Y3 Q2). Y4 Q1 is three quarters later, so the trend is 70.25 + 3 × 1.5 = 74.75. Forecast = 74.75 − 16.50 = **58.25** thousand bottles.
6. Forecasts for Y4 Q2 to Q4 in the same way: 80.25, 101.25 and 68.25.
7. **Judgement.** The trend is rising steadily and the seasonal pattern is stable (the two years agree), so the forecast looks reliable for the next year. It assumes that the trend continues at +1.5 and that nothing unusual (a new rival, a price change) occurs.
:::

![Sales forecast chart for the cold-drinks supplier: quarterly sales swing between 40 and 96 thousand bottles around a centred moving average that rises from 59.75 to 70.25 (+1.5 a quarter); extending the trend and adding the seasonal variations gives year 4 forecasts of 58.25, 80.25, 101.25 and 68.25 thousand bottles.](media:diagrams/sales-forecast-trend.png "Figure: actual sales, the centred moving average and the year 4 forecasts for the cold-drinks supplier")

## Qualitative methods

Qualitative methods rely on **opinion and judgement** rather than numbers. They are used when there is no past data (a new product), when the market is changing rapidly, or to adjust a statistical forecast.

| Method | How it works | Strength | Weakness |
| --- | --- | --- | --- |
| Expert opinion | Specialists give their judgement of future sales | Draws on experience; quick | Experts may be biased or wrong |
| Delphi method | Experts answer anonymously over several rounds, shown a summary each time | Reduces the influence of dominant people; considers many views | Slow and costly; experts may follow the group |
| Sales force opinion | Sales staff estimate sales in their area | They know customers | May be too optimistic or too cautious, depending on targets and bonuses |
| Consumer panels | A group of customers gives views and intentions | Direct customer evidence | A small panel may not represent the market; intentions differ from actions |

## Impact and limitations

Forecasts affect decisions on production, staffing, finance and marketing. **Limitations** of forecasting:

- the future may differ from the past (new rivals, a recession, changing tastes);
- **outside shocks** (floods, a currency crisis, new laws) cannot be foreseen;
- the data may be too short or inaccurate; a trend line assumes the same rate of change continues;
- seasonal patterns may change; the further ahead, the less reliable;
- qualitative forecasts depend on the opinions of the people asked.

A business should therefore **combine methods**, review forecasts regularly against actual sales, and keep some **flexibility** (for example an overdraft, or a contract with a supplier that allows later changes).

:::worked-solution[Example 2: case analysis, choosing a method]
**Context.** A fictional software start-up in Bulawayo is about to launch a payroll app that no competitor in Zimbabwe offers. It has no sales history. A mining company, a retail chain and a school have said they might buy it.

**Point.** Time-series analysis cannot be used because there is no past sales data.

**Application.** The firm could ask a panel of three business consultants for estimates using the Delphi method, and ask the mining company, retail chain and school how many licences they would buy.

**Analysis.** The Delphi method reduces the influence of any one expert, but takes several weeks and fees. Customer intentions are direct evidence, but "might buy" is not a firm order; many may not buy.

**Judgement.** The start-up should use both qualitative methods, then plan cautiously (a low and a high forecast), and review the forecast monthly as real sales data arrive. After four quarters the firm can start to use a moving average.
:::

## Common mistakes

:::mistake{title="Forgetting to centre the moving average"}
A four-period average lies *between* two quarters. It must be centred (averaged with the next one) before it is compared with an actual quarter.
:::

:::mistake{title="Seasonal variation the wrong way round"}
Additive seasonal variation = **actual − trend**. Use brackets or a minus sign for a quarter that is below the trend.
:::

:::mistake{title="Extending the trend from the last actual figure"}
The trend is measured on the **centred averages**. Start from the last centred average and add the trend change for each quarter that has passed.
:::

## Exam tips

:::exam-tip
Cambridge Papers 3 and 4 ask you to *calculate* the moving average, seasonal variation and forecast (show every step and state your rounding) and to *evaluate* the usefulness of forecasting methods. Business Studies Papers 1 and 2 ask you to *state*, *describe* or *discuss* forecasting and its limits. For an evaluation, refer to the data (how stable the pattern is, how many years) and the context (a new product has no history), and give a judgement with a condition such as regular review.
:::

## Summary

:::summary
- Sales forecasts support production, staffing, finance and marketing decisions but are never exact.
- A four-period centred moving average gives the trend; seasonal variation = actual − trend (additive model).
- Forecast = extended trend + average seasonal variation for the quarter.
- Qualitative methods (expert opinion, Delphi, sales force, consumer panels) suit new products and changing markets.
- Limitations include changes in the future, outside shocks, short data and bias; combine methods and review often.
:::
