---
{
  "key": "estimation.confidence-intervals",
  "title": "Confidence intervals for a mean and a proportion",
  "summary": "Calculate and interpret confidence intervals for a population mean (normal population with known variance, or a large sample) and approximate intervals for a proportion, and find widths, confidence levels and required sample sizes.",
  "concepts": ["amaths.estimation.confidence-intervals"],
  "estimatedMinutes": 45,
  "level": "core"
}
---
## Introduction

A single number such as "the mean yield is 4.2 tonnes per hectare" hides how uncertain it is. A **confidence interval** gives a range of plausible values for the population parameter, together with a level of confidence that describes how reliable the method is. Polling organisations, agricultural researchers and quality-control engineers all report intervals rather than bare estimates.

ZIMSEC examines confidence intervals in Statistics Form 6 (topic 6.7.2). Cambridge examines them in Paper 6 (topic 6.4): intervals for a mean (normal population with known variance, or a large sample) and approximate intervals for a proportion. Intervals using the $t$-distribution for small samples with unknown variance are ZIMSEC only and are covered in a separate lesson.

## Key definitions

:::definition{term="Confidence interval"}
An interval, calculated from sample data, that would contain the true value of the parameter in a stated proportion (for example 95%) of all possible samples.
:::

:::formula{name="Confidence interval for a population mean"}
$$
\bar{x} \pm z\frac{\sigma}{\sqrt{n}} \qquad \left(\text{large sample, } \sigma \text{ unknown: } \bar{x} \pm z\frac{s}{\sqrt{n}}\right)
$$
:::

:::formula{name="Approximate confidence interval for a proportion"}
$$
\hat{p} \pm z\sqrt{\frac{\hat{p}(1 - \hat{p})}{n}}, \qquad \hat{p} = \frac{\text{number of successes}}{n}
$$
:::

MF19 prints the interval formulae; the values of $z$ come from the normal tables: 90% uses $1.645$, 95% uses $1.96$, 98% uses $2.326$ and 99% uses $2.576$.

## Where the formula comes from

If $\bar{X} \sim \mathrm{N}\left(\mu, \frac{\sigma^2}{n}\right)$ then
$$
\mathrm{P}\left(-1.96 < \frac{\bar{X} - \mu}{\sigma/\sqrt{n}} < 1.96\right) = 0.95,
$$
which rearranges to $\mathrm{P}\left(\bar{X} - 1.96\frac{\sigma}{\sqrt{n}} < \mu < \bar{X} + 1.96\frac{\sigma}{\sqrt{n}}\right) = 0.95$. The **interval** is random (it moves with $\bar{X}$); $\mu$ is fixed. So "95% confidence" means that 95% of the intervals produced this way contain $\mu$. Once a particular interval has been calculated, it either contains $\mu$ or it does not.

The formula needs $\bar{X}$ to be normal. That is exact when the population is normal; otherwise it needs a large sample and the central limit theorem, which also justifies replacing $\sigma$ by the estimate $s$.

## Intervals for a mean

:::worked-solution[Example 1: The heights of a type of seedling are normally distributed with standard deviation 5 cm. A random sample of 20 seedlings has mean height 72.4 cm. Find a 95% confidence interval for the population mean.]
1. The population is normal and $\sigma$ is known, so $\bar{X}$ is exactly normal.
2. Standard error $= \frac{5}{\sqrt{20}} = 1.118$.
3. $72.4 \pm 1.96 \times 1.118 = 72.4 \pm 2.191$.
4. The interval is $(70.21, 74.59)$ cm.
:::

:::worked-solution[Example 2: The daily rainfall totals, $x$ mm, at a station in the Eastern Highlands on 100 randomly chosen wet days give $\sum x = 3450$ and $\sum x^2 = 122000$. Find a 99% confidence interval for the mean rainfall on a wet day.]
1. $\bar{x} = 34.5$; $s^2 = \frac{1}{99}\left(122000 - \frac{3450^2}{100}\right) = \frac{2975}{99} = 30.05$.
2. The distribution of rainfall is unknown, but $n = 100$ is large, so by the central limit theorem $\bar{X}$ is approximately normal.
3. Standard error $= \sqrt{\frac{30.05}{100}} = 0.5482$.
4. $34.5 \pm 2.576 \times 0.5482 = 34.5 \pm 1.412$, giving $(33.1, 35.9)$ mm.
:::

## Intervals for a proportion

The number of successes in a large sample is approximately normal, so $\hat{p}$ is approximately $\mathrm{N}\left(p, \frac{p(1 - p)}{n}\right)$. Since $p$ is unknown, the standard error uses $\hat{p}$; this is why the interval is called **approximate**.

:::worked-solution[Example 3: In a random sample of 150 households in Mutare, 57 use solar power. Find an approximate 90% confidence interval for the proportion of all households that use solar power.]
1. $\hat{p} = \frac{57}{150} = 0.38$.
2. Standard error $= \sqrt{\frac{0.38 \times 0.62}{150}} = 0.03963$.
3. $0.38 \pm 1.645 \times 0.03963 = 0.38 \pm 0.0652$.
4. The interval is $(0.315, 0.445)$.
:::

## Width, level and sample size

The width of an interval for a mean is $2z\frac{\sigma}{\sqrt{n}}$. It increases with the confidence level (larger $z$) and decreases as $n$ grows, in proportion to $\frac{1}{\sqrt{n}}$. To find the sample size needed, set the width (or half-width) to the target and solve for $n$, rounding **up**. For example, with $\sigma = 8$ and a 95% interval of total width at most 3: $2 \times 1.96 \times \frac{8}{\sqrt{n}} \le 3$ gives $n \ge 109.3$, so $n = 110$.

Working backwards from a given interval: the sample mean is the midpoint, and the half-width equals $z \times$ standard error, which gives $z$ (and hence the confidence level) or $\sigma$. For example, suppose an interval $(45.348, 54.652)$ was calculated from a sample of 25 values from a population with $\sigma = 10$. The midpoint gives $\bar{x} = 50$. The half-width is $4.652$ and the standard error is $\frac{10}{5} = 2$, so $z = \frac{4.652}{2} = 2.326$, which corresponds to a 98% interval. If instead the level were known and $\sigma$ unknown, the same equation would be solved for $\sigma$.

## Several intervals

Intervals from independent samples behave like independent trials. If each of 20 separate 95% intervals has probability 0.95 of containing $\mu$, the number that miss is $\mathrm{B}(20, 0.05)$, with mean 1: on average one interval in twenty misses. The probability that two independent 95% intervals both contain $\mu$ is $0.95^2 = 0.9025$. Questions of this kind test whether you understand that the confidence level is a probability about the method, not about one interval.

## Using an interval to judge a claim

A claimed value of $\mu$ that lies **outside** a 95% interval is not supported at that level; one inside is plausible. This is equivalent to a two-tailed hypothesis test at the 5% level.

## Common mistakes

:::mistake{title="Saying μ has a 95% probability of being in this interval"}
$\mu$ is fixed. The 95% describes how often the method succeeds over many samples.
:::

:::mistake{title="Using σ instead of σ/√n"}
The interval is for the mean, so it uses the standard error.
:::

:::mistake{title="Wrong z value"}
A 95% two-sided interval uses $1.96$, not $1.645$ (which is for 90%).
:::

:::mistake{title="Rounding the sample size down"}
$n \ge 109.3$ means $n = 110$: 109 is too small.
:::

## Exam tips

:::exam-tip
State why the normal distribution may be used: "population normal" or "large sample, so by the central limit theorem".
:::

:::exam-tip
Give interval limits to 3 significant figures (or as the question says), and write the interval as $(a, b)$.
:::

:::exam-tip
When asked to interpret, refer to repeated sampling and the context, never to individual values.
:::

## Summary

:::summary
- Mean: $\bar{x} \pm z\frac{\sigma}{\sqrt{n}}$ (or $s$ for a large sample).
- Proportion: $\hat{p} \pm z\sqrt{\frac{\hat{p}(1 - \hat{p})}{n}}$ (approximate, large $n$).
- $z$: 1.645 (90%), 1.96 (95%), 2.326 (98%), 2.576 (99%).
- Width $= 2z \times$ standard error; quadruple $n$ to halve it; round sample sizes up.
- A $C\%$ interval contains the parameter for $C\%$ of samples in the long run.
:::
