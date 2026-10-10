---
{
  "key": "evolution.t-test",
  "title": "Comparing two means with the t-test",
  "summary": "When and how to use the t-test to decide whether the means of two samples of continuous data differ significantly: the null hypothesis, calculating means and standard deviations, the t formula, degrees of freedom, critical values at p = 0.05 and writing the conclusion in words.",
  "concepts": ["abio.evolution.t-test"],
  "estimatedMinutes": 40,
  "freePreview": true,
  "level": "core"
}
---
## Introduction

Near a waterhole in Hwange National Park, elephants browse mopane trees heavily. Nyasha measures the leaves on mopane shrubs near the waterhole and on shrubs far from it, and finds that the leaves near the water are shorter on average. Leaves always vary in length, though, so a difference between two sample means could simply be chance: if she measured another eight leaves at each site, the means would change. The **t-test** tells her whether the difference between the two means is large compared with the variation inside each sample, and so whether it is **significant**.

Variation of this kind is the raw material of natural selection, and the t-test is one of the main tools biologists use to compare populations. You should already be able to calculate a mean and a sample standard deviation.

## Key definitions

:::definition{term="t-test"}
A statistical test used to find whether the difference between the means of two samples of continuous, approximately normally distributed data is significant.
:::

:::definition{term="Null hypothesis (t-test)"}
There is no significant difference between the means of the two populations sampled; any difference between the sample means is due to chance.
:::

:::definition{term="Degrees of freedom (t-test)"}
For two independent samples, $n_1 + n_2 - 2$, where $n_1$ and $n_2$ are the numbers of values in the samples.
:::

:::definition{term="Critical value"}
The value of $t$, read from a table at p = 0.05 for the degrees of freedom, above which the difference is significant and the null hypothesis is rejected.
:::

:::keyfact{title="The formulae (provided in Cambridge papers)"}
$$t = \frac{|\bar{x}_1 - \bar{x}_2|}{\sqrt{\dfrac{s_1^2}{n_1} + \dfrac{s_2^2}{n_2}}} \qquad s = \sqrt{\frac{\sum (x - \bar{x})^2}{n - 1}}$$
$\bar{x}_1$ and $\bar{x}_2$ are the sample means, $s_1$ and $s_2$ the sample standard deviations and $n_1$ and $n_2$ the sample sizes.
:::

## When to use the t-test

Use the t-test when **all** of these apply:

- You are comparing the **means of two samples** (not three or more, and not looking for a relationship between two variables).
- The data are **continuous** measurements, such as length, mass, time or volume, not counts in categories.
- The data in each sample are roughly **normally distributed**.
- The two samples have **similar standard deviations**.
- The samples are usually small (fewer than about 30 values each), but each should contain at least five or so values; with very few values a real difference is hard to detect.

Compare this with the other tests at A Level: **chi-squared** compares observed and expected **counts in categories**; **Pearson** and **Spearman** test for a **correlation** between two variables measured on the same individuals.

## How the formula works

The top of the formula is the **difference between the means**. The bottom is a combined standard error: it gets bigger when the samples are more variable (large $s$) and smaller when the samples are larger (large $n$). So $t$ is large when the means are far apart compared with the variation within the samples. A large $t$ means a small probability that the difference arose by chance.

## The method, step by step

1. State the **null hypothesis**.
2. Calculate the **mean** of each sample.
3. Calculate the **standard deviation** of each sample (divide by $n - 1$).
4. Calculate $s^2 / n$ for each sample, add them and take the square root.
5. Divide the difference between the means by this value to get $t$.
6. Calculate the **degrees of freedom**: $n_1 + n_2 - 2$.
7. Find the **critical value** at p = 0.05 for those degrees of freedom.
8. **Conclude**: if $t$ is greater than the critical value, the difference is significant and the null hypothesis is rejected; if $t$ is smaller, the difference is not significant, it is due to chance, and the null hypothesis is accepted.

| Degrees of freedom | 6 | 8 | 10 | 12 | 14 | 16 | 18 | 20 |
|---|---|---|---|---|---|---|---|---|
| Critical value at p = 0.05 | 2.45 | 2.31 | 2.23 | 2.18 | 2.14 | 2.12 | 2.10 | 2.09 |
| Critical value at p = 0.01 | 3.71 | 3.36 | 3.17 | 3.05 | 2.98 | 2.92 | 2.88 | 2.85 |

:::worked-solution[Mopane leaf length near and far from a waterhole]
Nyasha measured eight leaves at each site. Near the waterhole: 42, 38, 45, 40, 36, 41, 39, 43 mm. Far from it: 51, 47, 55, 49, 53, 46, 50, 52 mm.
1. Null hypothesis: there is no significant difference between the mean leaf length near and far from the waterhole; any difference is due to chance.
2. Means: near $= 324 \div 8 = 40.5$ mm; far $= 403 \div 8 = 50.375$ mm.
3. Standard deviation near the waterhole:

| x / mm | x − x̄ | (x − x̄)² |
|---|---|---|
| 42 | 1.50 | 2.25 |
| 38 | −2.50 | 6.25 |
| 45 | 4.50 | 20.25 |
| 40 | −0.50 | 0.25 |
| 36 | −4.50 | 20.25 |
| 41 | 0.50 | 0.25 |
| 39 | −1.50 | 2.25 |
| 43 | 2.50 | 6.25 |

$\sum (x - \bar{x})^2 = 58$, so $s_1 = \sqrt{58 \div 7} = 2.88$ mm. In the same way, for the far site $\sum (x - \bar{x})^2 = 63.875$ and $s_2 = 3.02$ mm.
4. $\dfrac{s_1^2}{n_1} = \dfrac{8.286}{8} = 1.036$ and $\dfrac{s_2^2}{n_2} = \dfrac{9.125}{8} = 1.141$; the square root of their sum is $\sqrt{2.176} = 1.475$.
5. $t = \dfrac{50.375 - 40.5}{1.475} = 6.69$.
6. Degrees of freedom $= 8 + 8 - 2 = 14$; critical value at p = 0.05 is 2.14.
7. $6.69 > 2.14$, so the difference is significant (it is even above 2.98, the value at p = 0.01). Reject the null hypothesis: leaves near the waterhole are significantly shorter.
:::

A significant result tells you the means differ, not **why**. Nyasha could suggest that heavy browsing near the waterhole removes the larger leaves or stimulates smaller regrowth, but soil water and other variables also differ between sites.

:::worked-solution[A difference that is not significant]
Farai weighed six tilapia from each of two small dams near Masvingo. Dam A: 212, 236, 198, 225, 240, 219 g. Dam B: 228, 205, 247, 231, 214, 239 g.
1. Null hypothesis: no significant difference between the mean masses of tilapia in the two dams.
2. Means: A $= 1330 \div 6 = 221.7$ g; B $= 1364 \div 6 = 227.3$ g.
3. Both samples happen to have $\sum (x - \bar{x})^2 = 1213.3$, so $s_1 = s_2 = \sqrt{1213.3 \div 5} = 15.6$ g.
4. $\dfrac{s^2}{n} = \dfrac{242.7}{6} = 40.44$ for each sample; $\sqrt{40.44 + 40.44} = 8.99$.
5. $t = \dfrac{227.3 - 221.7}{8.99} = 0.630$.
6. Degrees of freedom $= 6 + 6 - 2 = 10$; critical value 2.23.
7. $0.630 < 2.23$: the difference is not significant; it is due to chance; accept the null hypothesis. The large spread within each dam hides the small difference between the means.
:::

:::example{title="Reading a partly completed calculation"}
Cambridge Paper 4 and Paper 5 questions often give the means and standard deviations and ask only for the last steps. Suppose $\bar{x}_1 = 18.6$, $\bar{x}_2 = 16.2$, $s_1^2/n_1 = 0.52$ and $s_2^2/n_2 = 0.47$, with 12 values in each sample. Then $t = 2.4 \div \sqrt{0.99}$, which is a little above 2.4, and the degrees of freedom are 22. The critical value for 22 degrees of freedom (about 2.07) is smaller, so the difference is significant. Always write down the degrees of freedom and the critical value you use before concluding.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
The t-test is Cambridge A Level content (Papers 4 and 5; formula provided, degrees of freedom not). It is not in the ZIMSEC syllabus, although ZIMSEC candidates compare means and use error bars in Paper 4.
:::

## Common mistakes

:::mistake{title="Using the t-test on counts in categories"}
Numbers of individuals in phenotype classes need the chi-squared test. The t-test is for continuous measurements.
:::

:::mistake{title="Wrong degrees of freedom"}
For two samples, df $= n_1 + n_2 - 2$, not $n - 1$ and not the number of classes.
:::

:::mistake{title="Forgetting to square the standard deviation"}
The formula needs $s^2 / n$. Using $s / n$ gives a much smaller denominator and a $t$ value that is far too large.
:::

:::mistake{title="Saying that the test proves a cause"}
A significant $t$ shows that the means differ; it does not show what caused the difference. Other variables may differ between the samples.
:::

## Exam tips

:::exam-tip
*Justify the choice of test*: two samples, continuous data, roughly normal distribution, similar standard deviations, comparing means. Each point can earn a mark in Paper 5.
:::

:::exam-tip
A full conclusion compares $t$ with the critical value (quoting both numbers and the degrees of freedom), says whether the difference is significant or due to chance, and accepts or rejects the null hypothesis. Then *suggest* a biological explanation, noting other variables that might be responsible.
:::

## Summary

:::summary
- The t-test compares the means of two samples of continuous, roughly normally distributed data with similar spreads.
- Null hypothesis: no significant difference between the means; any difference is due to chance.
- $t = |\bar{x}_1 - \bar{x}_2| \div \sqrt{s_1^2/n_1 + s_2^2/n_2}$, with degrees of freedom $n_1 + n_2 - 2$.
- $t$ above the critical value at p = 0.05: significant, reject the null hypothesis; below: not significant, accept it.
- A significant difference does not identify its cause.
:::
