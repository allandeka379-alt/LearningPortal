---
{
  "key": "skills.descriptive-statistics",
  "title": "Descriptive statistics: standard deviation, standard error and error bars",
  "summary": "How to summarise biological data with the mean, median, mode and range; how to calculate the sample standard deviation, the standard error and a 95% confidence interval; and how to use error bars to judge whether two means are likely to differ significantly, with percentage error for measurements.",
  "concepts": ["abio.skills.descriptive-statistics"],
  "estimatedMinutes": 40,
  "level": "core"
}
---
## Introduction

Farai grows maize seedlings with and without a fertiliser and finds that the fertilised seedlings are, on average, almost 2 cm taller. Is that a real effect of the fertiliser, or could it have happened by chance because individual seedlings vary? Biology is full of variation: no two leaves, pods or pulse rates are the same. **Descriptive statistics** summarise a set of measurements with a few numbers, so that you can see how big the average is and how spread out the values are. Those numbers are also the raw material for every statistical test you meet later, including the t-test.

You should already be able to calculate a mean and draw a line graph or bar chart with labelled axes and units.

## Key definitions

:::definition{term="Mean"}
The sum of all the values divided by the number of values, $\bar{x} = \dfrac{\sum x}{n}$.
:::

:::definition{term="Median"}
The middle value when the values are put in order; for an even number of values, the mean of the two middle values.
:::

:::definition{term="Mode"}
The value (or class) that occurs most often.
:::

:::definition{term="Range"}
The difference between the largest and the smallest value: a simple but crude measure of spread.
:::

:::definition{term="Standard deviation"}
A measure of how widely the values in a sample are spread around the mean; about 68% of normally distributed values lie within one standard deviation of the mean, and about 95% within two.
:::

:::definition{term="Standard error of the mean"}
A measure of how precisely a sample mean estimates the true mean of the population; it gets smaller as the sample gets larger.
:::

:::keyfact{title="Formulae (provided in Cambridge papers)"}
$$s = \sqrt{\frac{\sum (x - \bar{x})^2}{n - 1}} \qquad SE = \frac{s}{\sqrt{n}} \qquad 95\%\ \text{CI} = \bar{x} \pm 2\,SE$$
Here $s$ is the sample standard deviation, $n$ the number of values and $\bar{x}$ the mean. Dividing by $n - 1$ rather than $n$ corrects for using a sample instead of the whole population.
:::

## Averages and spread

**Which average?** The mean uses every value and is the usual choice for continuous data that are roughly symmetrical. The median is better when the data are skewed or contain an extreme value, because one very large value pulls the mean but not the median. The mode suits categories (such as the most common blood group) or discrete counts.

**Normal and non-normal distributions.** Many continuous variables, such as leaf length or human height, give a **normal distribution** when plotted as a histogram: a symmetrical bell shape with the mean, median and mode at the same central value. A **skewed** distribution has a long tail to one side, and the mean is pulled towards the tail. Tests such as the t-test assume roughly normal data.

**Spread.** Two samples can have the same mean but very different spread. The range uses only two values, so one unusual value can make it large. The **standard deviation** uses every value, so it is the better measure. A large standard deviation means the values vary widely around the mean; a small one means they are clustered close to it.

## Calculating the standard deviation, step by step

1. Calculate the mean, $\bar{x}$.
2. Subtract the mean from each value to get $x - \bar{x}$ (some are negative).
3. Square each difference, $(x - \bar{x})^2$ (all now positive).
4. Add the squares to get $\sum (x - \bar{x})^2$.
5. Divide by $n - 1$.
6. Take the square root. The standard deviation has the **same unit** as the data.

:::worked-solution[Standard deviation of eight bean pod lengths]
Rudo measured eight bean pods: 92, 105, 98, 110, 101, 96, 103 and 99 mm.
1. Mean: $\bar{x} = \dfrac{804}{8} = 100.5\ \text{mm}$.
2. Set out the differences and their squares in a table:

| Pod | x / mm | x − x̄ / mm | (x − x̄)² / mm² |
|---|---|---|---|
| 1 | 92 | −8.50 | 72.25 |
| 2 | 105 | 4.50 | 20.25 |
| 3 | 98 | −2.50 | 6.25 |
| 4 | 110 | 9.50 | 90.25 |
| 5 | 101 | 0.50 | 0.25 |
| 6 | 96 | −4.50 | 20.25 |
| 7 | 103 | 2.50 | 6.25 |
| 8 | 99 | −1.50 | 2.25 |

3. $\sum (x - \bar{x})^2 = 218$.
4. $s = \sqrt{\dfrac{218}{8 - 1}} = \sqrt{31.14} = 5.58\ \text{mm}$ (3 s.f.).
5. Standard error: $SE = \dfrac{5.58}{\sqrt{8}} = 1.97\ \text{mm}$.
6. 95% confidence interval: $100.5 \pm 2 \times 1.97$, so from about 96.6 mm to 104.4 mm.
:::

The median of these pods is 100 mm (the mean of 99 and 101) and the range is 18 mm. Notice that the standard deviation is far smaller than the range: it describes typical spread, not the extremes.

## Standard error and confidence intervals

The standard deviation describes the spread of the **individual values**. The standard error describes how much the **mean** would vary if you repeated the whole sampling many times. Because $SE = s / \sqrt{n}$, collecting four times as many values halves the standard error, so larger samples give more precise means.

The **95% confidence interval** ($\bar{x} \pm 2SE$) is the range within which we can be about 95% confident that the true population mean lies. (The exact multiplier is about 1.96 for large samples; both boards accept 2.)

## Error bars and overlap

On a bar chart or line graph, each mean can carry an **error bar**. The caption must say what the bar shows: the range, ± one standard deviation, ± one standard error, or the 95% confidence interval.

- With **95% confidence interval** bars (± 2SE): if the bars of two means **do not overlap**, the difference between the means is likely to be **significant**. If they overlap a lot, the difference is probably not significant.
- With **standard deviation** bars: overlap is expected even when the means differ, so SD bars mainly show variability; they cannot be used alone to judge significance.
- In every case, overlap or no overlap is only a guide. A statistical test (such as the t-test) is needed to decide.

:::example{title="Do the fertiliser error bars overlap?"}
Farai measured ten seedlings in each group after 14 days.

| Group | Mean height / cm | Standard error / cm | 95% CI / cm |
|---|---|---|---|
| With fertiliser | 14.97 | 0.224 | 14.52 to 15.42 |
| Without fertiliser | 13.08 | 0.202 | 12.68 to 13.48 |

**Describe:** the mean height with fertiliser is 1.89 cm greater. **Interpret:** the 95% confidence intervals do not overlap (the lowest end of the fertilised interval, 14.52 cm, is above the top of the other, 13.48 cm), so the difference is likely to be significant and not due to chance. **Next step:** a t-test would confirm this; other variables (light, water, seed batch) must have been kept the same before the fertiliser can be named as the cause.
:::

## Percentage error

Every instrument has an **uncertainty**, usually half the smallest division for a scale you read by eye (± 0.5 mm on a ruler marked in mm). The percentage error is

$$\text{percentage error} = \frac{\text{uncertainty}}{\text{measured value}} \times 100$$

A pod of 25 mm measured with a ± 0.5 mm ruler has a percentage error of 2%. Measuring a small quantity with a coarse instrument gives a large percentage error, which is why longer times, larger volumes or more sensitive instruments improve precision.

:::keyfact{title="ZIMSEC and Cambridge"}
Standard deviation, standard error, confidence intervals and error bars are Cambridge A Level content (Papers 4 and 5; formulae provided). ZIMSEC candidates need means, ranges, percentages and percentage error, and should be able to read error bars on a graph.
:::

## Common mistakes

:::mistake{title="Dividing by n instead of n − 1"}
The sample standard deviation divides $\sum (x - \bar{x})^2$ by $n - 1$. Dividing by $n$ underestimates the spread.
:::

:::mistake{title="Forgetting to take the square root"}
$\sum (x - \bar{x})^2 / (n - 1)$ is the variance, not the standard deviation, and its unit is squared.
:::

:::mistake{title="Confusing standard deviation with standard error"}
SD describes the spread of individual values; SE describes the precision of the mean. SE is always smaller than SD when $n > 1$.
:::

:::mistake{title="Treating non-overlap of SD bars as proof"}
Only 95% CI bars give a useful guide from overlap, and even then a statistical test is needed for a firm conclusion.
:::

## Exam tips

:::exam-tip
In Cambridge Papers 4 and 5 you are often given a partly completed table of $x - \bar{x}$ and $(x - \bar{x})^2$. Fill in the missing values, show $\sum$, write $n - 1$ in the denominator and give the answer to the same number of significant figures as the data, or one more, with its unit.
:::

:::exam-tip
*Describe* the data: quote both means with units and the difference. *Explain* what the error bars show: state whether the 95% CIs overlap and what that suggests about significance. *Suggest* improvements: a larger sample reduces the standard error.
:::

## Summary

:::summary
- Mean for symmetrical continuous data; median when skewed or with extreme values; mode for categories.
- Sample standard deviation $s = \sqrt{\sum (x - \bar{x})^2 / (n - 1)}$ measures spread and has the unit of the data.
- Standard error $SE = s / \sqrt{n}$ measures the precision of a mean; larger samples give smaller SE.
- 95% confidence interval $= \bar{x} \pm 2SE$; non-overlapping 95% CI bars suggest a significant difference.
- Percentage error = uncertainty ÷ measured value × 100.
:::
