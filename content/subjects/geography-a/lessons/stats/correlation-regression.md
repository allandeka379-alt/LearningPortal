---
{
  "key": "stats.correlation-regression",
  "title": "Correlation and regression",
  "summary": "Use scatter graphs, Spearman's rank and Pearson's coefficients and the least-squares regression line to describe and test relationships between two geographical variables, with care over ties, extrapolation and cause.",
  "concepts": [
    "ageo.stats.correlation-regression"
  ],
  "estimatedMinutes": 40,
  "level": "core"
}
---
## Introduction

Geographers often suspect that two variables are linked: pebbles get smaller downstream; maize yields rise with rainfall; land values fall with distance from the city centre. **Correlation** measures how strongly two variables are related, and **regression** gives a line that can be used to estimate one from the other. Both appear in ZIMSEC Paper 3 Section A, where the formulae are used on small sets of data and the critical value is printed in the question.

You should already know how to plot a scatter graph, state a null hypothesis and compare a calculated value with a critical value (see the lesson on hypothesis testing).

## Key definitions

:::definition{term="Correlation"}
A statistical relationship between two variables. It is **positive** when both rise together and **negative** when one rises as the other falls.
:::

:::definition{term="Spearman's rank correlation coefficient (rs)"}
A measure of the strength and direction of the relationship between two sets of data that are ranked, from −1 (perfect negative) through 0 (none) to +1 (perfect positive). It suits ordinal data and measurements that are not normally distributed.
:::

:::definition{term="Pearson's product-moment correlation coefficient (r)"}
A measure of the strength of a straight-line relationship between two interval or ratio variables that are roughly normally distributed.
:::

:::definition{term="Regression line"}
The straight line $y = a + bx$ that best fits a scatter of points, found by the least-squares method; $b$ is the gradient (change in $y$ per unit of $x$) and $a$ is the intercept.
:::

## Scatter graphs first

Always plot the data. A scatter graph shows the direction (positive, negative), the strength (tightly or loosely clustered), any outlier and whether the pattern is a straight line. A coefficient calculated without looking at the graph can mislead.

## Spearman's rank correlation

$$
r_s = 1 - \frac{6 \sum d^2}{n^3 - n}
$$

1. Rank each variable separately (1 for the smallest). Tied values share the mean of the ranks they would have taken: the values 5, 7, 7, 9 are ranked 1, 2.5, 2.5, 4.
2. Find $d$, the difference between the two ranks for each pair, and square it.
3. Add the $d^2$ values and substitute.
4. Compare $|r_s|$ with the printed critical value for $n$ pairs. If it is larger, the relationship is significant.

Spearman needs at least 5 and preferably 10 or more pairs. When there are many ties the formula is only approximate, so keep ties few.

:::keyfact{title="Reading r and rs"}
Values near +1 or −1 are strong; values near 0 are weak. Significance depends on the number of pairs: with 8 pairs the 0.05 critical value is 0.738, with 20 pairs only 0.447.
:::

## Pearson's coefficient

$$
r = \frac{\sum xy - n\bar{x}\bar{y}}{(n - 1)\, s_x s_y}
$$

It uses the actual values, not ranks, so it needs measured data that are roughly normal and linearly related. It is read in the same way as $r_s$.

## The regression line

The least-squares line is $y = a + bx$ with

$$
b = \frac{\sum (x - \bar{x})(y - \bar{y})}{\sum (x - \bar{x})^2}, \qquad a = \bar{y} - b\bar{x}.
$$

The line always passes through the point $(\bar{x}, \bar{y})$. Use it to **interpolate** (estimate inside the range of the data), which is reasonably safe. **Extrapolation** (estimating beyond the data) is risky because the relationship may change.

## Worked examples

:::worked-solution[Spearman's rank: pebble size downstream]
Illustrative data from 8 sites: distance downstream (km) and median pebble length (mm).

H₀: there is no relationship between distance downstream and pebble length. H₁: pebble length decreases downstream. The 0.05 critical value for $n = 8$ is 0.738.

| Site | Distance (km) | Length (mm) | Rank dist. | Rank length | d | d² |
|---|---|---|---|---|---|---|
| 1 | 2 | 78 | 1 | 7 | −6 | 36 |
| 2 | 5 | 81 | 2 | 8 | −6 | 36 |
| 3 | 9 | 64 | 3 | 6 | −3 | 9 |
| 4 | 14 | 60 | 4 | 5 | −1 | 1 |
| 5 | 20 | 52 | 5 | 3 | 2 | 4 |
| 6 | 26 | 55 | 6 | 4 | 2 | 4 |
| 7 | 33 | 38 | 7 | 2 | 5 | 25 |
| 8 | 41 | 31 | 8 | 1 | 7 | 49 |

1. $\sum d^2 = 164$.
2. $r_s = 1 - \dfrac{6 \times 164}{8^3 - 8} = 1 - \dfrac{984}{504} = -0.952$.
3. $|r_s| = 0.952$ is greater than 0.738, so reject H₀.
4. Conclusion: there is a significant, strong negative relationship between distance downstream and pebble size. Pebbles get smaller downstream, consistent with abrasion and attrition, although eight sites is a small sample.
:::

:::worked-solution[Regression: rainfall and maize yield]
Illustrative data for 8 seasons: seasonal rainfall $x$ (mm) and maize yield $y$ (t/ha): rainfall 480, 520, 560, 610, 650, 700, 760, 820; yield 1.1, 1.3, 1.2, 1.7, 1.9, 2.0, 2.4, 2.5.

1. Means: $\bar{x} = 637.50$ mm, $\bar{y} = 1.763$ t/ha.
2. Gradient (from the least-squares formula): $b = 0.00443$, so each extra 100 mm of rain adds about 0.44 t/ha.
3. Intercept: $a = 1.763 - 0.00443 \times 637.50 = -1.063$.
4. The line is $y = -1.06 + 0.0044x$ (coefficients to the stated decimal places).
5. Interpolation: at 600 mm, $y = 1.60$ t/ha, inside the data range (480-820 mm), so reasonably reliable.
6. Extrapolation: at 1000 mm the line gives 3.37 t/ha, but that is beyond the data. Above some level extra rain stops helping and waterlogging may reduce yield, so this estimate should not be trusted.
7. Strength: Pearson's $r = 0.980$ (critical value for 8 pairs at 0.05: 0.707), a significant positive correlation; $r^2 = 0.961$, so about 96% of the variation in yield is accounted for by rainfall.
:::

## Correlation is not causation

A significant correlation shows a link, not a cause. Pebble size and distance downstream are both related to the energy of the river; they do not cause each other. A third factor may drive both variables, and with small samples a strong coefficient can arise by chance. Always suggest a geographical reason for the pattern and name possible other factors.

:::keyfact{title="ZIMSEC and Cambridge"}
Spearman, Pearson and regression are ZIMSEC Paper 3 content. Cambridge candidates should describe relationships on scatter graphs and lines of best fit, but no coefficient is set.
:::

## Common mistakes

:::mistake{title="Ranking the wrong way or in one column only"}
Both variables must be ranked in the same direction (smallest = 1 in both). A mixed direction turns a positive relationship into a negative one.
:::

:::mistake{title="Forgetting the minus sign"}
A calculated value of −0.95 is a strong negative correlation. Compare $|r_s|$ with the critical value but state the direction in your conclusion.
:::

:::mistake{title="Extrapolating confidently"}
Do not use a regression line far outside the data. State the range of the data and warn that the prediction is uncertain.
:::

## Exam tips

:::exam-tip
Show the table of ranks, $d$ and $d^2$ completely, write the formula, substitute, give $r_s$ to the requested decimal places, compare it with the printed critical value and conclude in words. *Describe* a scatter graph with direction, strength and any anomaly; *comment on* a regression estimate by saying whether it is interpolation or extrapolation.
:::

## Summary

:::summary
- Plot a scatter graph first: direction, strength, outliers.
- $r_s = 1 - 6\sum d^2 \div (n^3 - n)$ uses ranks; tied values share the mean rank.
- Compare $|r_s|$ (or $|r|$) with the critical value for $n$; larger means significant.
- Pearson's $r$ needs measured, roughly normal data and a linear relationship.
- The regression line $y = a + bx$ passes through the means; interpolate with care and avoid extrapolation.
- Correlation shows a relationship, not a cause.
:::
