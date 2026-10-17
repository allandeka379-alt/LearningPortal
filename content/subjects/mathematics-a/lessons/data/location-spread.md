---
{
  "key": "data.location-spread",
  "title": "Measures of central tendency and spread",
  "summary": "Find the mean, median and mode of raw, ungrouped and grouped data, find the range, quartiles, interquartile range and percentiles, choose the most suitable measure, and compare two data sets using a measure of location and a measure of spread.",
  "concepts": ["amaths.data.location-spread"],
  "estimatedMinutes": 45,
  "level": "core",
  "freePreview": true
}
---
## Introduction

A single number can summarise a whole data set. A shop owner in Mbare wants to know a "typical" day's takings; a teacher wants to know whether her class's marks are bunched together or widely spread. **Measures of central tendency** (mean, median, mode) describe where the data are centred, and **measures of spread** (range, interquartile range, and later the standard deviation) describe how spread out they are.

This lesson covers ZIMSEC Statistics (Form 5, measures of central tendency and dispersion) and Cambridge 9709 Paper 5 (topic 5.1). Both boards ask you to calculate these measures for raw data, frequency tables and grouped data, to choose a suitable measure, and to compare two data sets in context.

## Key definitions

:::definition{term="Mean"}
The sum of the values divided by the number of values. For a frequency table, $\bar{x} = \dfrac{\sum fx}{\sum f}$.
:::

:::definition{term="Median"}
The middle value when the data are in order. For $n$ values it is the $\frac{n + 1}{2}$th value; for even $n$ it is the mean of the two middle values.
:::

:::definition{term="Mode"}
The most common value. For grouped data, the **modal class** is the class with the highest frequency density.
:::

:::definition{term="Range, quartiles and interquartile range"}
**Range** = largest − smallest value. The **quartiles** $Q_1$ and $Q_3$ cut off the lowest and highest quarter of the data. **Interquartile range** $\text{IQR} = Q_3 - Q_1$ is the spread of the middle half. The $k$th **percentile** has $k\%$ of the data below it.
:::

:::formula{name="Mean of a frequency distribution (MF19 gives the sd formula, not this)"}
$$
\bar{x} = \frac{\sum x}{n} \qquad \bar{x} = \frac{\sum fx}{\sum f}
$$
For grouped data, $x$ is the class mid-point and the result is an **estimate**.
:::

## Raw data

:::worked-solution[Example 1: daily airtime sales, in US dollars, at a kiosk on 11 days: 14, 9, 22, 17, 9, 31, 12, 19, 9, 26, 15]
1. In order: $9, 9, 9, 12, 14, 15, 17, 19, 22, 26, 31$.
2. Mean: $\frac{183}{11} = 16.6$ dollars (3 s.f.).
3. Median: the $\frac{11 + 1}{2} = 6$th value, 15 dollars. Mode: 9 dollars.
4. Range: $31 - 9 = 22$ dollars. Quartiles (medians of the two halves of 5 values): $Q_1 = 9$, $Q_3 = 22$, so $\text{IQR} = 13$ dollars.
:::

![Box-and-whisker plot of 11 daily airtime sales: minimum 9, lower quartile 9, median 15, upper quartile 22 and maximum 31 dollars, so the interquartile range is 13; the mean 16.6 (marked with a cross) is slightly above the median, and the dots below show the 11 values with three days at 9.](media:diagrams/box-plot-airtime-sales.png "Figure: the box spans Q₁ = 9 to Q₃ = 22 (IQR 13) with the median at 15 and whiskers to 9 and 31")

For raw data there are several conventions for quartiles. A common one, used here, takes the median of the lower half and the median of the upper half (leaving out the median itself when $n$ is odd). Exam questions accept any sensible method; for $n = 4k + 3$ the usual methods give the same answer.

## Frequency tables

:::worked-solution[Example 2: the number of children in 50 households in a village near Murehwa]
| Children $x$ | 0 | 1 | 2 | 3 | 4 | 5 |
| --- | --- | --- | --- | --- | --- | --- |
| Households $f$ | 7 | 12 | 18 | 9 | 3 | 1 |

1. $\sum fx = 0 + 12 + 36 + 27 + 12 + 5 = 92$, so $\bar{x} = \frac{92}{50} = 1.84$ children.
2. Median: the mean of the 25th and 26th values. Cumulative frequencies are 7, 19, 37, …, so the 20th to 37th values are all 2. Median $= 2$.
3. Mode: 2 (frequency 18).
4. $Q_1$ is the 13th value and $Q_3$ the 38th (medians of the halves of 25): $Q_1 = 1$, $Q_3 = 3$, $\text{IQR} = 2$.
:::

## Grouped data

With grouped data the raw values are lost, so every measure is an **estimate**. Use class mid-points for the mean and linear interpolation for the median.

:::worked-solution[Example 3: masses of 50 broiler chickens]
| Mass $m$ (kg) | $1.2 \le m < 1.6$ | $1.6 \le m < 2.0$ | $2.0 \le m < 2.4$ | $2.4 \le m < 2.8$ | $2.8 \le m < 3.2$ |
| --- | --- | --- | --- | --- | --- |
| Frequency | 6 | 14 | 17 | 9 | 4 |

1. Mid-points: 1.4, 1.8, 2.2, 2.6, 3.0.
2. $\sum fx = 8.4 + 25.2 + 37.4 + 23.4 + 12.0 = 106.4$, so the estimated mean is $\frac{106.4}{50} = 2.128 \approx 2.13$ kg.
3. Median: the 25th value lies in $2.0 \le m < 2.4$ (cumulative 20 before it): $2.0 + \frac{25 - 20}{17} \times 0.4 = 2.12$ kg.
4. Modal class: $2.0 \le m < 2.4$ (equal widths, highest frequency).
:::

## Choosing a measure

| Measure | Use it when | Drawback |
| --- | --- | --- |
| Mean | data are fairly symmetrical with no extreme values; you need every value to count | distorted by outliers |
| Median | data are skewed or contain outliers | ignores the size of most values |
| Mode | data are qualitative, or the most common value matters (shoe sizes to stock) | may not exist or may not be unique |
| Range | a quick idea of spread | depends only on the two extremes |
| IQR | data are skewed or contain outliers; goes with the median | ignores half the data |

:::worked-solution[Example 4: monthly wages, in US dollars, of 7 workers at a small business: 420, 450, 460, 480, 500, 520, 3900]
1. Mean: $\frac{6730}{7} = 961$ dollars (3 s.f.). Median: 480 dollars.
2. Six of the seven workers earn less than the mean, because the owner's wage of 3900 dollars pulls it up.
3. The median (480 dollars) is the better "typical wage" here, with the IQR as its measure of spread.
:::

## Comparing data sets

A good comparison makes **two** points, each with values and in context:

1. **Location**: "On average the Form 6 learners took longer (median 34 min against 28 min)."
2. **Spread**: "The Form 5 times were more consistent (IQR 6 min against 11 min)."

Pair the median with the IQR, and the mean with the standard deviation (next lesson).

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards examine all of these measures (ZIMSEC 6.1.3, Cambridge 5.1.3) and comparisons of two data sets. Cambridge mark schemes accept any sensible quartile method for raw data, and expect estimates from grouped data to use mid-points and class boundaries.
:::

## Common mistakes

:::mistake{title="Dividing by the number of classes"}
For a frequency table the mean is $\frac{\sum fx}{\sum f}$, not $\frac{\sum fx}{\text{number of rows}}$.
:::

:::mistake{title="Giving the frequency as the mode"}
In Example 2 the mode is 2 children, not 18 (that is how many households have 2 children).
:::

:::mistake{title="Using class limits instead of mid-points from boundaries"}
For masses to the nearest kg in a class "10–14", the boundaries are 9.5 and 14.5 and the mid-point is 12.
:::

:::mistake{title="Comparing without context"}
"Set A has a bigger median" earns little. Say what the median measures and what the difference means.
:::

## Exam tips

:::exam-tip
Write down $\sum fx$ (and later $\sum fx^2$) before dividing: method marks are given for these totals.
:::

:::exam-tip
When asked to **state** which average is more suitable, give a reason linked to the data: "the median, because the wage of 3900 dollars is an outlier".
:::

:::exam-tip
Grouped-data answers are estimates: write "approximately" and keep 3 significant figures.
:::

## Summary

:::summary
- Mean $= \frac{\sum x}{n}$ or $\frac{\sum fx}{\sum f}$; median is the middle value; mode is the most common value.
- Grouped data: use mid-points for the mean and interpolation for the median; the answers are estimates.
- Range $=$ max $-$ min; $\text{IQR} = Q_3 - Q_1$; the $k$th percentile has $k\%$ of the data below it.
- Use the median and IQR for skewed data or data with outliers; the mean (with the standard deviation) for symmetrical data.
- Compare data sets with one measure of location and one of spread, with values and in context.
:::
