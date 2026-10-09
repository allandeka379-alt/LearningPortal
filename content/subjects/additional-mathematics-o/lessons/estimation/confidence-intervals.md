---
{
  "key": "estimation.confidence-intervals",
  "title": "Confidence intervals for a population mean",
  "summary": "Build and interpret confidence intervals x̄ ± z σ/√n for a population mean at the 95% and 99% levels, for a normal population with known variance or for any population from a large sample (σ estimated by s), and find the margin of error and the sample size needed for a given width.",
  "concepts": ["amath.estimation.confidence-intervals"],
  "estimatedMinutes": 45,
  "level": "core"
}
---
## Introduction

A point estimate such as "the mean yield is 38 bags per hectare" is a single best guess, but it is almost certainly not exactly right. A more honest statement gives a range: "we are 95% confident that the mean yield is between 35.8 and 40.2 bags per hectare". Such a range is a **confidence interval**. It combines the point estimate with its standard error, and its width shows how precise the estimate is.

Confidence intervals are used everywhere: in opinion polls, in medical studies, in quality control at factories and in agricultural research stations. In ZIMSEC Paper 2 you calculate intervals at the 95% and 99% levels (the "5% and 1% significance levels"), interpret them in context, and work backwards to find the sample size needed for a required precision. This lesson draws together the normal distribution, the distribution of the sample mean and point estimation.

## Key definitions

:::definition{term="Confidence interval"}
An interval, calculated from a sample, that is constructed so that a stated proportion of such intervals (for example 95%) contain the true population parameter.
:::

:::definition{term="Confidence level and significance level"}
The confidence level (95%, 99%) is the long-run proportion of intervals that contain the parameter. The matching significance level is the remaining proportion, 5% or 1%.
:::

:::formula{name="Confidence interval for a population mean"}
$$
\bar{x} \pm z \times \frac{\sigma}{\sqrt{n}}
$$
:::

with $z = 1.96$ for 95% confidence and $z = 2.576$ for 99% confidence. If $\sigma$ is unknown and the sample is large, replace it by $s$.

:::definition{term="Margin of error and width"}
The margin of error is $z \times \frac{\sigma}{\sqrt{n}}$, the amount added to and subtracted from $\bar{x}$. The width of the interval is twice the margin of error.
:::

## Where the formula comes from

If $\bar{X} \sim N\left(\mu, \frac{\sigma^2}{n}\right)$, then 95% of sample means lie within $1.96$ standard errors of $\mu$, because $\Phi(1.96) = 0.975$ leaves 2.5% in each tail:

$$
P\left(\mu - 1.96\frac{\sigma}{\sqrt{n}} < \bar{X} < \mu + 1.96\frac{\sigma}{\sqrt{n}}\right) = 0.95
$$

Rearranging the inequalities so that $\mu$ is in the middle gives the interval $\bar{X} \pm 1.96\frac{\sigma}{\sqrt{n}}$. For 99%, the tails hold 0.5% each and $\Phi(2.576) = 0.995$.

## When can the formula be used?

| Population | Variance | Sample size | Use |
|---|---|---|---|
| Normal | known $\sigma^2$ | any | $\bar{x} \pm z\frac{\sigma}{\sqrt{n}}$ (exact) |
| Any shape | known $\sigma^2$ | large ($n \geq 30$) | $\bar{x} \pm z\frac{\sigma}{\sqrt{n}}$ (central limit theorem) |
| Any shape | unknown | large | $\bar{x} \pm z\frac{s}{\sqrt{n}}$, with $s^2$ the unbiased estimate |

Small samples with unknown variance need a different distribution, which is beyond this syllabus.

:::worked-solution[Example 1: the masses of packets of roasted peanuts from a factory in Harare are normally distributed with standard deviation 6 g. A random sample of 36 packets has mean mass 72.5 g. Find a 95% confidence interval for the population mean mass.]
1. Normal population, known $\sigma = 6$, so the formula applies for any $n$.
2. Standard error $= \frac{6}{\sqrt{36}} = 1$.
3. Margin of error $= 1.96 \times 1 = 1.96$.
4. Interval: $72.5 \pm 1.96$, that is $(70.54, 74.46)$ g.
5. At 99%: $72.5 \pm 2.576 \times 1 = (69.92, 75.08)$ g, a wider interval.
:::

:::worked-solution[Example 2: a random sample of 80 learners' daily screen times x minutes gives Σx = 4280 and Σx² = 233 520. Find a 99% confidence interval for the population mean screen time.]
1. $\bar{x} = \frac{4280}{80} = 53.5$ minutes.
2. $s^2 = \frac{1}{79}\left(233\,520 - \frac{4280^2}{80}\right) = \frac{4540}{79} = 57.47$, so $s = 7.581$.
3. The population variance is unknown but $n = 80$ is large: use $s$ and the central limit theorem.
4. Standard error $= \frac{7.581}{\sqrt{80}} = 0.8476$; margin $= 2.576 \times 0.8476 = 2.183$.
5. Interval: $53.5 \pm 2.183 = (51.3, 55.7)$ minutes (3 s.f.).
:::

## Interpreting a confidence interval

The population mean $\mu$ is a fixed number; it is the **interval** that varies from sample to sample. A correct interpretation of a 95% interval is:

> If many random samples were taken and a 95% interval calculated from each, about 95% of the intervals would contain the true mean.

So for one interval we say "we are 95% confident that $\mu$ lies between 70.54 and 74.46". It is not correct to say that 95% of the **data** lie in the interval: the interval is about the mean, not about individual values.

Intervals can be used to judge claims. If a manufacturer claims a mean mass of 75 g and the 95% interval is $(70.54, 74.46)$, the claimed value lies outside the interval, so the data cast doubt on the claim at the 5% level.

## Width and sample size

The width $2z\frac{\sigma}{\sqrt{n}}$ depends on three things:

- the **confidence level**: higher confidence means a larger $z$ and a wider interval;
- the **variability** $\sigma$: more variable populations give wider intervals;
- the **sample size**: larger $n$ gives narrower intervals, in proportion to $\frac{1}{\sqrt{n}}$.

:::worked-solution[Example 3: a population has standard deviation 5. How large a sample is needed for a 95% confidence interval for the mean to have width at most 2?]
1. Width $= 2 \times 1.96 \times \frac{5}{\sqrt{n}} \leq 2$.
2. So $\frac{9.8}{\sqrt{n}} \leq 1$, giving $\sqrt{n} \geq 9.8$.
3. $n \geq 96.04$, so the smallest sample size is $n = 97$ (round **up**).
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Confidence intervals for a population mean at the 95% and 99% levels are in ZIMSEC Paper 2 (Probability and Statistics). Cambridge 0606 does not examine statistics.
:::

## Common mistakes

:::mistake{title="Using σ instead of σ/√n"}
The interval uses the standard error of the mean. Using $\sigma$ alone gives an interval that is far too wide.
:::

:::mistake{title="Using 1.645 for 95%"}
A two-sided 95% interval uses $z = 1.96$ (2.5% in each tail). 1.645 leaves 5% in one tail only.
:::

:::mistake{title="Wrong interpretation"}
"There is a 95% probability that $\mu$ is in this interval" or "95% of the values lie in it" are not correct. Say that 95% of such intervals contain $\mu$.
:::

:::mistake{title="Rounding n down"}
For a required width, always round the sample size **up** to the next whole number.
:::

## Exam tips

:::exam-tip
Show the structure: $\bar{x} \pm z \times \frac{\sigma}{\sqrt{n}}$ with numbers substituted, then the interval as $(a, b)$. Give the end-points to 3 significant figures (or the accuracy asked for) with units.
:::

:::exam-tip
If the population is not stated to be normal, say why the method is valid: "the sample is large, so by the central limit theorem $\bar{X}$ is approximately normal".
:::

:::exam-tip
When asked to comment on a claim, say whether the claimed value is inside or outside the interval and what that suggests, in context.
:::

## Summary

:::summary
- A confidence interval for $\mu$ is $\bar{x} \pm z\frac{\sigma}{\sqrt{n}}$, with $z = 1.96$ (95%) or $2.576$ (99%).
- Use it for a normal population with known variance, or any population with a large sample (with $s$ if $\sigma$ is unknown).
- 95% of such intervals contain $\mu$; a claim outside the interval is doubtful.
- Width $= 2z\frac{\sigma}{\sqrt{n}}$: higher confidence widens it; larger samples narrow it.
- For a required width, solve for $n$ and round up.
:::
