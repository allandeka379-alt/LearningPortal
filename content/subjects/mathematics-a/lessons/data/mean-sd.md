---
{
  "key": "data.mean-sd",
  "title": "Variance and standard deviation, including summary and coded data",
  "summary": "Calculate the variance and standard deviation of raw, frequency and grouped data, work from the totals Σx and Σx² or from coded totals Σ(x − a) and Σ(x − a)², and combine two data sets into one.",
  "concepts": ["amaths.data.mean-sd"],
  "estimatedMinutes": 45,
  "level": "core"
}
---
## Introduction

Two dairy herds in the Midlands may give the same mean amount of milk per cow, yet one herd may be far more consistent than the other. The **standard deviation** measures this consistency: it is, roughly, the typical distance of a value from the mean. Unlike the range and the interquartile range, it uses every value.

This lesson covers ZIMSEC Statistics (Form 5, measures of dispersion) and Cambridge 9709 Paper 5 (topic 5.1.5). Both boards ask you to calculate the standard deviation from raw data, from frequency tables and from summary totals, including **coded** totals, and to combine two data sets.

## Key definitions

:::definition{term="Variance"}
The mean of the squared deviations from the mean: $\sigma^2 = \dfrac{\sum (x - \bar{x})^2}{n}$. Its units are the square of the data's units.
:::

:::definition{term="Standard deviation"}
The square root of the variance, $\sigma$. It has the same units as the data.
:::

:::formula{name="Summary statistics (given in MF19)"}
$$
\sigma = \sqrt{\frac{\sum (x - \bar{x})^2}{n}} = \sqrt{\frac{\sum x^2}{n} - \bar{x}^2}
\qquad
\sigma = \sqrt{\frac{\sum f(x - \bar{x})^2}{\sum f}} = \sqrt{\frac{\sum fx^2}{\sum f} - \bar{x}^2}
$$
:::

The second form, "mean of the squares minus the square of the mean", is the one to use with a calculator or with totals.

:::formula{name="Coded data"}
If $y = x - a$, then

$$
\bar{x} = a + \frac{\sum (x - a)}{n} \qquad \sigma_x = \sigma_y = \sqrt{\frac{\sum (x - a)^2}{n} - \left(\frac{\sum (x - a)}{n}\right)^2}
$$
Subtracting a constant moves the mean but does not change the spread.
:::

## Raw data

:::worked-solution[Example 1: daily milk yields, in litres, of 6 cows: 12, 15, 9, 18, 14, 16]
1. $\sum x = 84$, so $\bar{x} = \frac{84}{6} = 14$ litres.
2. $\sum x^2 = 144 + 225 + 81 + 324 + 196 + 256 = 1226$.
3. $\sigma^2 = \frac{1226}{6} - 14^2 = 204.33 - 196 = 8.33$ (3 s.f.).
4. $\sigma = \sqrt{8.333\ldots} = 2.89$ litres (3 s.f.).
:::

Check with the definition: the deviations are $-2, 1, -5, 4, 0, 2$, their squares add to $50$, and $\frac{50}{6} = 8.33$. ✓

## Frequency tables and grouped data

Multiply by the frequencies: use $\sum fx$ and $\sum fx^2$. For grouped data, $x$ is the class mid-point and the answers are estimates.

:::worked-solution[Example 2: power cuts per week in a suburb of Gweru, over 40 weeks]
| Cuts $x$ | 0 | 1 | 2 | 3 | 4 |
| --- | --- | --- | --- | --- | --- |
| Weeks $f$ | 6 | 11 | 13 | 7 | 3 |

1. $\sum fx = 0 + 11 + 26 + 21 + 12 = 70$, so $\bar{x} = \frac{70}{40} = 1.75$.
2. $\sum fx^2 = 0 + 11 + 52 + 63 + 48 = 174$.
3. $\sigma^2 = \frac{174}{40} - 1.75^2 = 4.35 - 3.0625 = 1.2875$.
4. $\sigma = \sqrt{1.2875} = 1.13$ cuts per week (3 s.f.).
:::

## Working from totals

Exam questions often give only $n$, $\sum x$ and $\sum x^2$.

:::worked-solution[Example 3: for 25 bags of fertiliser, $\sum x = 1150$ and $\sum x^2 = 54\,000$, where $x$ is the mass in kg]
1. $\bar{x} = \frac{1150}{25} = 46$ kg.
2. $\sigma^2 = \frac{54\,000}{25} - 46^2 = 2160 - 2116 = 44$.
3. $\sigma = \sqrt{44} = 6.63$ kg (3 s.f.).
:::

## Coded totals

Coding with $y = x - a$ keeps the numbers small. Work with $y$, then add $a$ back to the mean only.

:::worked-solution[Example 4: the times $x$ seconds of 40 runners give $\sum (x - 50) = 84$ and $\sum (x - 50)^2 = 1426$]
1. $\bar{y} = \frac{84}{40} = 2.1$, so $\bar{x} = 50 + 2.1 = 52.1$ s.
2. $\sigma^2 = \frac{1426}{40} - 2.1^2 = 35.65 - 4.41 = 31.24$.
3. $\sigma = \sqrt{31.24} = 5.59$ s (3 s.f.), the same for $x$ as for $y$.
4. If needed: $\sum x = 40 \times 52.1 = 2084$ and $\sum x^2 = \sum (x - 50)^2 + 100\sum (x - 50) + 40 \times 2500 = 109\,826$.
:::

## Combining two data sets

To combine two groups, find each group's $\sum x$ and $\sum x^2$, add them, and use the formulas for the whole group. From a mean and a standard deviation: $\sum x = n\bar{x}$ and $\sum x^2 = n(\sigma^2 + \bar{x}^2)$.

:::worked-solution[Example 5: group A has 20 values with mean 31 and standard deviation 4; group B has 30 values with mean 36 and standard deviation 5. Find the mean and standard deviation of all 50 values]
1. A: $\sum x = 20 \times 31 = 620$, $\sum x^2 = 20(16 + 961) = 19\,540$.
2. B: $\sum x = 30 \times 36 = 1080$, $\sum x^2 = 30(25 + 1296) = 39\,630$.
3. Combined: $\bar{x} = \frac{620 + 1080}{50} = 34$.
4. $\sigma^2 = \frac{19\,540 + 39\,630}{50} - 34^2 = 1183.4 - 1156 = 27.4$, so $\sigma = 5.23$ (3 s.f.).
:::

Notice that the combined standard deviation (5.23) is larger than both 4 and 5: the difference between the two means adds to the spread.

## Using the standard deviation

- Pair the **mean** with the **standard deviation** when comparing data sets, and say what a smaller standard deviation means in context ("more consistent").
- For many roughly symmetrical data sets, most values lie within two standard deviations of the mean.
- Adding a constant to every value leaves $\sigma$ unchanged; multiplying every value by $k$ multiplies $\sigma$ by $|k|$.

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards use the divisor $n$ for the standard deviation of data (ZIMSEC 6.1.3, Cambridge 5.1.5). The divisor $n - 1$ belongs to estimating a population variance from a sample, a later topic. MF19 prints the summary statistics formulas for Cambridge candidates; ZIMSEC candidates should learn them.
:::

## Common mistakes

:::mistake{title="Squaring the mean of the totals the wrong way"}
$\frac{\sum x^2}{n} - \bar{x}^2$, not $\frac{(\sum x)^2}{n} - \bar{x}^2$ and not $\frac{\sum x^2 - \bar{x}^2}{n}$.
:::

:::mistake{title="Adding a back to the standard deviation"}
With coded data $y = x - a$, add $a$ to the mean only. The spread is unchanged.
:::

:::mistake{title="Combining standard deviations directly"}
The combined standard deviation is not the mean of the two standard deviations. Rebuild $\sum x$ and $\sum x^2$ for each group first.
:::

:::mistake{title="Forgetting to square-root"}
The variance has squared units; the question usually asks for the standard deviation.
:::

## Exam tips

:::exam-tip
Write down $\sum fx$ and $\sum fx^2$ (or the coded totals) before the final answer, so method marks are available even after a slip.
:::

:::exam-tip
Keep full calculator accuracy in $\bar{x}$ when you square it; rounding $\bar{x}$ first can change the third significant figure of $\sigma$.
:::

:::exam-tip
A negative value of $\frac{\sum x^2}{n} - \bar{x}^2$ always means an arithmetic error.
:::

## Summary

:::summary
- $\sigma^2 = \frac{\sum x^2}{n} - \bar{x}^2$ (or $\frac{\sum fx^2}{\sum f} - \bar{x}^2$); $\sigma$ is its square root.
- Grouped data: use mid-points; the results are estimates.
- Coding $y = x - a$: $\bar{x} = a + \bar{y}$ and $\sigma_x = \sigma_y$.
- To combine groups, use $\sum x = n\bar{x}$ and $\sum x^2 = n(\sigma^2 + \bar{x}^2)$, add, and recompute.
- Pair the mean with the standard deviation when comparing data sets, in context.
:::
