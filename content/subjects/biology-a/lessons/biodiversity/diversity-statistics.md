---
{
  "key": "biodiversity.diversity-statistics",
  "title": "Simpson's index of diversity and correlation tests",
  "summary": "How to calculate and interpret Simpson's index of diversity from sample data, and how to use Pearson's and Spearman's rank correlation coefficients to test for a relationship between two variables, including ranking with ties, critical values and the difference between correlation and causation.",
  "concepts": ["abio.biodiversity.diversity-statistics"],
  "estimatedMinutes": 45,
  "level": "core"
}
---
## Introduction

Two grassland plots near Gweru look equally green. In one, cattle are moved on regularly; in the other they graze all year. A quadrat survey shows the same five plant species in both, yet one plot is clearly "more diverse": its plants are spread evenly among the species, while the other is dominated by a single grass. **Simpson's index of diversity** turns this impression into a number between 0 and 1 that takes account of both the number of species and how evenly the individuals are shared among them.

Ecologists also want to know whether the abundance of a species is related to an environmental factor, such as distance from a river or soil moisture. **Correlation coefficients** measure the strength and direction of such relationships and allow you to test whether they are significant.

You should already know how quadrats and transects are used to collect data (see the lesson on sampling).

## Key definitions

:::definition{term="Species richness"}
The number of different species present in a community or sample.
:::

:::definition{term="Species evenness"}
How evenly the individuals in a community are distributed among the species present.
:::

:::definition{term="Simpson's index of diversity"}
A measure of biodiversity, $D = 1 - \sum (n/N)^2$, that takes account of both species richness and evenness; values close to 1 indicate high diversity.
:::

:::definition{term="Correlation"}
A relationship between two variables in which one tends to increase (positive correlation) or decrease (negative correlation) as the other increases.
:::

:::definition{term="Correlation coefficient"}
A number between −1 and +1 that measures the strength and direction of a correlation: +1 is a perfect positive correlation, −1 a perfect negative correlation and 0 no correlation.
:::

:::keyfact{title="Formulae (provided in Cambridge papers)"}
$$D = 1 - \sum \left(\frac{n}{N}\right)^2 \qquad r_s = 1 - \frac{6 \sum D^2}{n^3 - n} \qquad r = \frac{\sum xy - n\bar{x}\bar{y}}{(n - 1)\,s_x s_y}$$
In Simpson's index, $n$ is the number of individuals of one species and $N$ the total of all species. In Spearman's formula, $D$ is the difference between the ranks of a pair and $n$ the number of pairs.
:::

## Simpson's index of diversity

### Calculating it

1. Count (or estimate) the number of individuals, $n$, of each species in the sample.
2. Add them to give $N$.
3. For each species, calculate $n/N$ and square it.
4. Add the squares.
5. Subtract the total from 1.

:::worked-solution[Simpson's index for a well-managed grassland plot]
Thandeka counted the plants in ten quadrats on the rotationally grazed plot.

| Species | n | n/N | (n/N)² |
|---|---|---|---|
| Species A (a grass) | 24 | 0.400 | 0.1600 |
| Species B (a grass) | 18 | 0.300 | 0.0900 |
| Species C (a legume) | 9 | 0.150 | 0.0225 |
| Species D (a herb) | 6 | 0.100 | 0.0100 |
| Species E (a sedge) | 3 | 0.050 | 0.0025 |

1. $N = 24 + 18 + 9 + 6 + 3 = 60$.
2. $\sum (n/N)^2 = 0.1600 + 0.0900 + 0.0225 + 0.0100 + 0.0025 = 0.285$.
3. $D = 1 - 0.285 = 0.715$.

On the continuously grazed plot she found the same five species, but 52 of the 60 plants belonged to one grass (the others: 4, 2, 1 and 1). Here $\sum (n/N)^2 = 0.757$ and $D = 0.243$.
:::

### Interpreting it

- $D$ ranges from 0 (no diversity: one species only) towards 1 (very high diversity).
- Both plots have the same **richness** (five species), but the first has much greater **evenness**, so its $D$ is much higher.
- A high $D$ usually indicates a stable community with many niches and complex food webs, more able to withstand change. A low $D$ suggests a community dominated by a few species, often because of an extreme or disturbed environment (here, continuous grazing).
- Compare $D$ only between samples collected in the same way, with similar sampling effort.

## Correlation

A **scatter graph** of two variables measured at the same places (or on the same individuals) shows whether they are correlated. A correlation coefficient puts a number on the pattern. Two tests are used.

| Feature | Pearson's correlation coefficient, $r$ | Spearman's rank correlation coefficient, $r_s$ |
|---|---|---|
| Type of relationship | Linear | Any consistent increase or decrease (monotonic) |
| Data | Continuous, both variables roughly normally distributed | Can be ranked; need not be normal; suits ordinal data such as abundance scales |
| Number of pairs | At least 5 | Between 5 and 20 (the range of the critical value table) |
| Calculation | Uses the actual values | Uses the ranks of the values |

### Spearman's rank, step by step

1. Draw a scatter graph to see if a relationship is likely.
2. State the **null hypothesis**: there is no correlation between the two variables.
3. Rank each variable separately (1 for the smallest). **Tied values** share the mean of the ranks they would have taken: two values tied for 3rd and 4th place both get 3.5.
4. For each pair, find $D$ (the difference in ranks) and $D^2$.
5. Calculate $r_s$ with the formula.
6. Compare the **size** of $r_s$ (ignoring its sign) with the critical value for $n$ pairs at p = 0.05. If it is larger, the correlation is significant; reject the null hypothesis.

:::worked-solution[Reeds along a transect from the Mazowe river bank]
Sipho counted reed stems in quadrats at 5 m intervals along a transect leading away from the river.

| Distance / m | Rank | Reeds | Rank | D | D² |
|---|---|---|---|---|---|
| 0 | 1 | 31 | 8 | −7 | 49 |
| 5 | 2 | 27 | 6 | −4 | 16 |
| 10 | 3 | 28 | 7 | −4 | 16 |
| 15 | 4 | 18 | 5 | −1 | 1 |
| 20 | 5 | 12 | 3.5 | 1.5 | 2.25 |
| 25 | 6 | 12 | 3.5 | 2.5 | 6.25 |
| 30 | 7 | 7 | 2 | 5 | 25 |
| 35 | 8 | 3 | 1 | 7 | 49 |

1. Null hypothesis: there is no correlation between distance from the river and the number of reeds.
2. The two counts of 12 are tied for ranks 3 and 4, so each gets 3.5.
3. $\sum D^2 = 164.5$ and $n = 8$.
4. $r_s = 1 - \dfrac{6 \times 164.5}{8^3 - 8} = 1 - \dfrac{987}{504} = -0.958$.
5. The critical value for 8 pairs at p = 0.05 is 0.738. Because 0.958 is greater than 0.738, there is a significant negative correlation: reject the null hypothesis. The number of reeds falls as distance from the river increases.
:::

### Pearson's correlation

Pearson's $r$ is used when both variables are continuous, roughly normally distributed and the scatter graph suggests a straight line. It is calculated from the values themselves.

:::example{title="Soil moisture and fern height"}
At seven points in a forest in the Eastern Highlands, Tendai measured soil moisture (12, 18, 22, 25, 30, 34 and 38%) and the height of a fern (14, 19, 25, 24, 31, 33 and 40 cm). The scatter graph rises as a fairly straight line, and both variables are continuous, so Pearson's test fits. Using the formula, $r = 0.986$. The critical value for 7 pairs at p = 0.05 is 0.754. Since 0.986 > 0.754, there is a significant positive linear correlation between soil moisture and fern height.
:::

### Correlation is not causation

A significant correlation shows that two variables change together. It does not show that one **causes** the other. Moisture and fern height might both depend on a third factor, such as shade from the canopy, which keeps the soil damp and also affects plant growth. Only a controlled experiment, in which one variable is changed and others kept constant, can show cause.

:::keyfact{title="ZIMSEC and Cambridge"}
Simpson's index and the Pearson and Spearman tests are Cambridge A Level content (Papers 4 and 5; formulae provided). They are not in the ZIMSEC syllabus, which assesses biodiversity through species richness and the classification of organisms.
:::

## Common mistakes

:::mistake{title="Forgetting to subtract from 1"}
$\sum (n/N)^2$ alone gives a value that is **low** for diverse communities. Simpson's index of diversity is $1 - \sum (n/N)^2$.
:::

:::mistake{title="Ranking tied values wrongly"}
Tied values share the mean of the ranks they occupy: three values tied for 4th, 5th and 6th place all get rank 5.
:::

:::mistake{title="Comparing a negative coefficient with the critical value"}
Compare the size of $r_s$ or $r$, ignoring the sign. The sign only tells you the direction of the correlation.
:::

:::mistake{title="Claiming that a correlation proves cause"}
Say that the variables are correlated, then suggest possible reasons, including other factors that might affect both.
:::

## Exam tips

:::exam-tip
In Paper 5 you may have to **choose** a test: Pearson if both variables are continuous, normally distributed and the relationship looks linear; Spearman if the data are ranked, not normal, or the relationship is curved but consistent. Give the reason in each case.
:::

:::exam-tip
A full conclusion for a correlation test states the coefficient, compares it with the critical value (quoting $n$ and p = 0.05), says whether the correlation is significant and its direction, and accepts or rejects the null hypothesis. Then *suggest* a biological reason, without claiming cause.
:::

## Summary

:::summary
- Simpson's index $D = 1 - \sum (n/N)^2$ combines richness and evenness; values near 1 mean high diversity.
- Low $D$ indicates a community dominated by few species, often in a harsh or disturbed habitat.
- Spearman's $r_s = 1 - 6\sum D^2 / (n^3 - n)$ uses ranks; ties share the mean rank.
- Pearson's $r$ tests a linear relationship between two normally distributed continuous variables.
- Compare the size of the coefficient with the critical value; a significant correlation does not prove cause.
:::
