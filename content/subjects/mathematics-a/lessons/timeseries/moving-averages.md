---
{
  "key": "timeseries.moving-averages",
  "title": "Time series: trends and moving averages",
  "summary": "Describe a time series by its components (trend, seasonal, cyclical and irregular variation), plot time-series graphs, smooth the data with moving averages (centred averages for an even period), draw a trend line through them, and use it to describe the trend and make simple estimates.",
  "concepts": ["amaths.timeseries.moving-averages"],
  "estimatedMinutes": 45,
  "level": "core"
}
---
## Introduction

A school tuckshop records its sales every term. A uniform shop in Gweru counts the number of uniforms sold each quarter. ZESA logs electricity demand every hour. Each is a **time series**: values of a variable recorded at successive, usually equal, intervals of time. Managers want to know whether things are getting better or worse **underneath** the ups and downs that repeat every year, and that is what moving averages reveal.

ZIMSEC Statistics examines time series in Form 5: key terms, the components of a time series, time-series graphs, the purpose of smoothing, calculating and plotting moving averages, and drawing trend lines to describe trends. Cambridge 9709 does not include time series, so this lesson is for ZIMSEC candidates.

## Key definitions

:::definition{term="Time series"}
A set of observations of a variable recorded at successive points or periods of time, such as monthly rainfall or quarterly sales.
:::

:::definition{term="Trend"}
The long-term, underlying movement of the series (upwards, downwards or steady), once short-term fluctuations are removed.
:::

:::definition{term="Moving average of order n"}
The mean of $n$ consecutive values, recalculated as the window moves forward one period at a time. Each average is plotted at the **middle** of the time periods it covers.
:::

:::formula{name="Moving averages"}
Order 3: $\dfrac{y_1 + y_2 + y_3}{3}, \dfrac{y_2 + y_3 + y_4}{3}, \dots$ plotted at periods $2, 3, \dots$

Order 4 (centred): $\dfrac{1}{2}\left(\dfrac{y_1 + y_2 + y_3 + y_4}{4} + \dfrac{y_2 + y_3 + y_4 + y_5}{4}\right)$ plotted at period 3, and so on.
:::

## The four components

| Component | Meaning | Zimbabwean example |
|---|---|---|
| Trend (T) | long-term direction | rising sales as a town grows |
| Seasonal variation (S) | a pattern that repeats every year (or week, or day) | uniform sales peak in January |
| Cyclical variation (C) | longer, irregular waves over several years | demand rising and falling with the economy or with drought years |
| Irregular (random) variation (I) | unpredictable, one-off effects | a shop closed by a power cut or a public holiday |

A **time-series graph** plots the values against time, with consecutive points joined by straight lines so that the pattern is easy to see. The time axis is the horizontal axis.

## Why smooth?

Seasonal and random variation hide the trend. A moving average whose order equals the **length of the seasonal cycle** (3 for termly data, 4 for quarterly, 12 for monthly, 7 for daily data over a week) contains exactly one value from each season, so the seasonal effect cancels out and the trend shows clearly.

:::worked-solution[Example 1: A school tuckshop's sales (US dollars) for terms 1, 2 and 3 over three years were 420, 310, 260, 450, 335, 280, 486, 362, 301. Calculate the three-point moving averages and describe the trend.]
1. The pattern repeats every 3 terms, so use order 3.
2. Moving totals: $420 + 310 + 260 = 990$, then $1020$, $1045$, $1065$, $1101$, $1128$, $1149$.
3. Moving averages (divide by 3): $330$, $340$, $348.3$, $355$, $367$, $376$, $383$.
4. Plot them at terms 2, 3, 4, 5, 6, 7, 8 (the middle of each group of three).
5. The averages rise steadily, by about $\frac{383 - 330}{6} \approx 8.8$ dollars per term: there is a steady upward trend in sales, hidden in the raw data by the high first term and low third term of each year.
:::

## Even periods: centring

With quarterly data, a four-point average such as $\frac{y_1 + y_2 + y_3 + y_4}{4}$ belongs to the middle of quarters 1 to 4, which is halfway between quarters 2 and 3. That is not a real time period, so we **centre** the averages by taking the mean of each pair of consecutive four-point averages. The result lines up with an actual quarter.

:::worked-solution[Example 2: A Gweru outfitter's school-uniform sales (hundreds) for quarters 1 to 4 of three years were 52, 38, 31, 47, 56, 41, 34, 51, 61, 45, 37, 55. Calculate the centred four-point moving averages.]
1. Four-point totals: $168, 172, 175, 178, 182, 187, 191, 194, 198$.
2. Four-point averages: $42, 43, 43.75, 44.5, 45.5, 46.75, 47.75, 48.5, 49.5$ (these sit between quarters).
3. Centre them by averaging consecutive pairs: $\frac{42 + 43}{2} = 42.5$, then $43.375$, $44.125$, $45$, $46.125$, $47.25$, $48.125$, $49$.
4. These centred averages belong to quarters 3, 4, 5, …, 10.
5. They increase from 42.5 to 49 over 7 quarters: a steady upward trend of about $\frac{49 - 42.5}{7} \approx 0.93$ hundred uniforms per quarter.
:::

Note that a moving average of order 4 loses two values at each end of the series: the trend is unknown for the first two and last two quarters.

## Trend lines and seasonal effects

Plot the moving averages on the same axes as the original series and draw a straight **trend line** through them by eye (or through two well-separated averages). Describe the trend in words: its direction, and roughly how fast it changes per period.

The **seasonal deviation** for a period is the actual value minus the trend value. Averaging the deviations for the same season over the years estimates the seasonal effect.

:::worked-solution[Example 3: Using Example 2, estimate the average seasonal deviation for quarter 1, and use the trend line through the first and last centred averages to estimate the sales in quarter 1 of the fourth year.]
1. Quarter 1 values with centred averages: quarter 5 ($56$, average $44.125$) and quarter 9 ($61$, average $48.125$).
2. Deviations: $56 - 44.125 = 11.875$ and $61 - 48.125 = 12.875$; mean $12.375$.
3. Trend line through $(3, 42.5)$ and $(10, 49)$: gradient $\frac{6.5}{7} = 0.9286$ per quarter.
4. Quarter 1 of year 4 is quarter 13: trend $= 42.5 + 0.9286 \times (13 - 3) = 51.79$.
5. Estimate $= 51.79 + 12.375 = 64.2$ hundred uniforms (about 6420).
6. This is an extrapolation of the trend, so it is only a rough guide.
:::

## Common mistakes

:::mistake{title="Choosing the wrong order"}
The order must match the seasonal cycle. A three-point average of quarterly data does not remove the seasonal pattern.
:::

:::mistake{title="Plotting averages at the end of the group"}
Each moving average is plotted at the middle of the periods it covers. An uncentred four-point average sits between two quarters.
:::

:::mistake{title="Forgetting to centre"}
For an even order, average consecutive pairs before plotting or calculating seasonal deviations.
:::

:::mistake{title="Joining moving averages to the end of the data"}
There are no moving averages for the first and last few periods. Do not invent them.
:::

## Exam tips

:::exam-tip
Lay out your work in a table: period, value, moving total, moving average, centred average. Give averages to 1 or 2 decimal places, and line each one up with the correct period.
:::

:::exam-tip
When asked to "describe the trend", give the direction and an approximate rate (per term, per quarter) with units, and mention the seasonal pattern separately. Say that forecasts from a trend line are extrapolations and may be unreliable.
:::

## Summary

:::summary
- A time series has trend, seasonal, cyclical and irregular components.
- Moving averages of order equal to the seasonal cycle smooth out seasonal variation and reveal the trend.
- Plot each average at the middle of its periods; centre even-order averages by averaging consecutive pairs.
- Draw a trend line through the moving averages, describe it in words, and use seasonal deviations (actual minus trend) for simple estimates.
:::
