---
{
  "key": "statistics.dispersion",
  "title": "Measures of dispersion: range, quartiles and standard deviation",
  "summary": "Measure the spread of raw, frequency and grouped data with the range, quartiles and interquartile range, variance and standard deviation, and the coefficient of variation, and use them to compare distributions.",
  "concepts": ["amath.statistics.dispersion"],
  "estimatedMinutes": 50,
  "level": "core"
}
---
## Introduction

Two maize farmers near Chinhoyi can have the same average yield, yet one harvests almost the same amount every year while the other swings between bumper crops and failures. An average alone cannot show this; a **measure of dispersion** (spread) can. Spread tells you how consistent, reliable or risky something is, which is why examiners almost always ask for an average **and** a measure of spread when comparing two groups.

ZIMSEC Paper 2 Section C asks you to calculate the range, interquartile range, variance, standard deviation and coefficient of variation, and to explain why measures of dispersion matter. You need the mean, median and cumulative frequency from the previous lesson.

## Key definitions

:::definition{term="Range"}
Largest value minus smallest value.
:::

:::definition{term="Quartiles"}
The lower quartile $Q_1$ and upper quartile $Q_3$ cut the ordered data into quarters: a quarter of the values lie below $Q_1$ and a quarter above $Q_3$. The median is $Q_2$.
:::

:::definition{term="Interquartile range (IQR)"}
$Q_3 - Q_1$, the spread of the middle half of the data.
:::

:::definition{term="Variance and standard deviation"}
The variance is the mean of the squared deviations from the mean. The standard deviation $\sigma$ is its square root, in the same units as the data.
:::

:::definition{term="Coefficient of variation"}
The standard deviation as a percentage of the mean; it compares spreads of data with different means or units.
:::

:::formula{name="Variance and standard deviation (divide by n)"}
$$
\sigma^2 = \frac{\sum (x - \bar{x})^2}{n} = \frac{\sum x^2}{n} - \bar{x}^2
$$

$$
\sigma^2 = \frac{\sum f(x - \bar{x})^2}{\sum f} = \frac{\sum fx^2}{\sum f} - \bar{x}^2
$$
:::

:::formula{name="Coefficient of variation"}
$$
\text{CV} = \frac{\sigma}{\bar{x}} \times 100\%
$$
:::

## Range, quartiles and interquartile range

The range is quick but depends only on the two most extreme values. The IQR ignores the top and bottom quarters, so outliers do not affect it. For raw data, this course finds the quartiles as the medians of the lower and upper halves (leaving out the median itself when $n$ is odd).

:::worked-solution[Example 1: find the range, quartiles and interquartile range of 4, 7, 8, 10, 12, 13, 15, 18, 20, 22, 30.]
1. Range $= 30 - 4 = 26$.
2. $n = 11$, median $= 13$ (6th value).
3. Lower half 4, 7, 8, 10, 12: $Q_1 = 8$. Upper half 15, 18, 20, 22, 30: $Q_3 = 20$.
4. IQR $= 20 - 8 = 12$.
:::

## Variance and standard deviation of raw data

The two formulas give the same answer. The first shows the meaning (average squared distance from the mean); the second is quicker with a calculator.

:::worked-solution[Example 2: find the variance and standard deviation of 2, 4, 6, 8, 10.]
1. Mean $= \dfrac{30}{5} = 6$.
2. Squared deviations: $16, 4, 0, 4, 16$, total 40, so $\sigma^2 = \dfrac{40}{5} = 8$.
3. Check: $\sum x^2 = 4 + 16 + 36 + 64 + 100 = 220$, and $\dfrac{220}{5} - 6^2 = 44 - 36 = 8$.
4. $\sigma = \sqrt{8} \approx 2.83$.
:::

## Frequency tables

Add columns for $fx$ and $fx^2$ (that is $f \times x^2$, not $(fx)^2$).

:::worked-solution[Example 3: the numbers of books read in a term by 30 learners are shown below. Find the mean and standard deviation.]
1. $\sum f = 30$, $\sum fx = 3 + 14 + 30 + 24 + 20 = 91$, so $\bar{x} = \dfrac{91}{30} \approx 3.03$.
2. $\sum fx^2 = 3 + 28 + 90 + 96 + 100 = 317$.
3. $\sigma^2 = \dfrac{317}{30} - \left(\dfrac{91}{30}\right)^2 = 10.567 - 9.201 = 1.366$.
4. $\sigma = \sqrt{1.366} \approx 1.17$ books.
:::

| $x$ | 1 | 2 | 3 | 4 | 5 |
| --- | --- | --- | --- | --- | --- |
| $f$ | 3 | 7 | 10 | 6 | 4 |
| $fx$ | 3 | 14 | 30 | 24 | 20 |
| $fx^2$ | 3 | 28 | 90 | 96 | 100 |

## Grouped data

Use the midpoints for $x$ (the results are estimates). The quartiles come from interpolation, exactly like the median, at positions $\frac{n}{4}$ and $\frac{3n}{4}$, or from a cumulative frequency curve.

:::worked-solution[Example 4: the marks of 50 learners are grouped as below. Estimate the mean, the standard deviation and the interquartile range.]
1. Midpoints 10, 30, 50, 70, 90: $\sum fx = 60 + 420 + 900 + 630 + 270 = 2280$, so $\bar{x} = 45.6$.
2. $\sum fx^2 = 600 + 12\,600 + 45\,000 + 44\,100 + 24\,300 = 126\,600$.
3. $\sigma^2 = \dfrac{126\,600}{50} - 45.6^2 = 2532 - 2079.36 = 452.64$, so $\sigma \approx 21.3$ marks.
4. $Q_1$: position 12.5, in $20 \leq x < 40$: $20 + \dfrac{12.5 - 6}{14} \times 20 \approx 29.3$.
5. $Q_3$: position 37.5, in $40 \leq x < 60$: $40 + \dfrac{37.5 - 20}{18} \times 20 \approx 59.4$.
6. IQR $\approx 59.4 - 29.3 = 30.2$ marks.
:::

| Marks | $0 \leq x < 20$ | $20 \leq x < 40$ | $40 \leq x < 60$ | $60 \leq x < 80$ | $80 \leq x < 100$ |
| --- | --- | --- | --- | --- | --- |
| $f$ | 6 | 14 | 18 | 9 | 3 |
| cumulative $f$ | 6 | 20 | 38 | 47 | 50 |

## Comparing distributions

Compare an **average** and a **spread**, in context. When the means differ a lot, or the units differ, compare coefficients of variation.

:::worked-solution[Example 5: over several seasons, farm A had a mean yield of 4.2 t/ha with standard deviation 0.6 t/ha; farm B had mean 3.5 t/ha and standard deviation 0.7 t/ha. Which farm's yield is more consistent?]
1. CV for A $= \dfrac{0.6}{4.2} \times 100\% \approx 14.3\%$.
2. CV for B $= \dfrac{0.7}{3.5} \times 100\% = 20\%$.
3. Farm A has the higher average yield and the smaller relative spread, so its yields are higher and more consistent.
:::

## Why measures of dispersion matter

- Two data sets with the same average can be very different; the spread shows how far values typically are from the average.
- Small spread means consistency and reliability (a machine filling bags, a batsman's scores, a farmer's yields).
- The standard deviation is used in further statistics, such as the normal distribution and confidence intervals.

:::keyfact{title="ZIMSEC and Cambridge"}
This topic is ZIMSEC Paper 2 Section C only. Here the variance of data divides by $n$; dividing by $n - 1$ gives the unbiased estimate of a population variance, which belongs to the estimation topic.
:::

## Common mistakes

:::mistake{title="Forgetting to subtract the mean squared"}
$\frac{\sum x^2}{n}$ alone is not the variance; subtract $\bar{x}^2$.
:::

:::mistake{title="Squaring fx"}
The column needed is $fx^2 = f \times x^2$. Squaring $fx$ gives far too large a value.
:::

:::mistake{title="Giving the variance when the standard deviation is asked"}
Take the square root at the end. The standard deviation has the same units as the data.
:::

:::mistake{title="Rounding the mean too early"}
Rounding $\bar{x}$ before squaring can change the variance noticeably. Keep full calculator values.
:::

## Exam tips

:::exam-tip
Write the formula you use and show $\sum fx$ and $\sum fx^2$; these totals carry method marks.
:::

:::exam-tip
In a comparison, make two statements in context, for example "Group A scored higher on average (mean 62 > 55) and more consistently (smaller standard deviation)".
:::

:::exam-tip
Give the coefficient of variation as a percentage to 3 significant figures.
:::

## Summary

:::summary
- Range = largest − smallest; IQR = $Q_3 - Q_1$ (middle half, unaffected by outliers).
- Variance $= \frac{\sum x^2}{n} - \bar{x}^2$ (or $\frac{\sum fx^2}{\sum f} - \bar{x}^2$); standard deviation is its square root.
- For grouped data use midpoints and interpolate for the quartiles.
- $\text{CV} = \frac{\sigma}{\bar{x}} \times 100\%$ compares spreads with different means.
- Compare distributions with an average and a spread, in context.
:::
