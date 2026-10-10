---
{
  "key": "inference.t-distribution",
  "title": "The t-distribution: small-sample intervals and t-tests",
  "summary": "Use Student's t-distribution with n − 1 degrees of freedom to find confidence intervals for the mean of a normal population with unknown variance from a small sample, and to carry out one-sample t-tests of a population mean.",
  "concepts": ["amaths.inference.t-distribution"],
  "estimatedMinutes": 45,
  "level": "core"
}
---
## Introduction

An agricultural officer in Mashonaland measures the maize yield on just eight plots of a new hybrid. A quality controller at a sugar mill weighs ten packets. A clinic records the waiting times of a dozen patients. In each case the sample is **small** and the population variance is **unknown**, so the normal-distribution methods for a mean are not quite right: replacing $\sigma$ by the sample estimate $s$ adds extra uncertainty, and with a small sample that extra uncertainty matters. The **t-distribution** takes it into account.

ZIMSEC Statistics examines the t-distribution in Form 6 (inference): its characteristics, degrees of freedom, confidence intervals for a mean, and one-sample t-tests. Cambridge 9709 does not include the t-distribution, so this lesson is for ZIMSEC candidates. You need unbiased estimates ($\bar{x}$ and $s^2$ with divisor $n - 1$) and the language of hypothesis testing.

## Key definitions

:::definition{term="The t statistic"}
If $X_1, \dots, X_n$ is a random sample from a **normal** population with mean $\mu$, and $\bar{X}$ and $S^2$ are the sample mean and unbiased variance estimate, then
$$
T = \frac{\bar{X} - \mu}{S / \sqrt{n}}
$$
has a t-distribution with $\nu = n - 1$ degrees of freedom, written $T \sim t_{n-1}$.
:::

:::definition{term="Degrees of freedom"}
The number of independent pieces of information left for estimating the spread. With $n$ observations one is "used up" by estimating the mean, so a one-sample problem has $\nu = n - 1$.
:::

:::formula{name="Confidence interval and test statistic (normal population, σ unknown)"}
$$
\bar{x} \pm t_{\nu}\,\frac{s}{\sqrt{n}}, \qquad t = \frac{\bar{x} - \mu_0}{s / \sqrt{n}}, \qquad \nu = n - 1,
\qquad s^2 = \frac{1}{n - 1}\left(\sum x^2 - \frac{(\sum x)^2}{n}\right)
$$
:::

The ZIMSEC syllabus prints no formula list; learn these results.

## Characteristics of the t-distribution

- It is **symmetrical about 0** and bell-shaped, like the standard normal distribution.
- It has **heavier tails** than $\mathrm{N}(0, 1)$: extreme values are more likely, because $s$ itself varies from sample to sample.
- There is a different t-distribution for each value of $\nu$. As $\nu$ increases the tails get lighter, and as $\nu \to \infty$ the t-distribution approaches $\mathrm{N}(0, 1)$.
- So t critical values are **larger** than the matching z values, and shrink towards them as $n$ grows.

| $\nu$ | 5 | 10 | 20 | 30 | $\infty$ (normal) |
|---|---|---|---|---|---|
| two-tailed 5% value | 2.571 | 2.228 | 2.086 | 2.042 | 1.960 |

Tables give $t_\nu(p)$, the value with probability $p$ **below** it. For a two-tailed 5% test or a 95% interval you read $p = 0.975$; for a one-tailed 5% test, $p = 0.95$.

The method needs the population to be **normal** (or close to it). It does not need a large sample: that is the whole point. For large samples the t and z methods give almost the same answer.

## Confidence intervals for a mean

:::worked-solution[Example 1: The yields, in tonnes per hectare, of eight plots of a new maize hybrid in Mashonaland were 4.2, 3.8, 5.1, 4.6, 4.9, 3.9, 4.4, 5.3. Assuming yields are normally distributed, find a 95% confidence interval for the mean yield.]
1. $n = 8$, $\sum x = 36.2$, $\sum x^2 = 165.92$.
2. $\bar{x} = \dfrac{36.2}{8} = 4.525$.
3. $s^2 = \dfrac{1}{7}\left(165.92 - \dfrac{36.2^2}{8}\right) = \dfrac{1}{7}(165.92 - 163.805) = 0.30214$, so $s = 0.5497$.
4. $\nu = 7$; for 95%, $t_7(0.975) = 2.365$.
5. Half-width $= 2.365 \times \dfrac{0.5497}{\sqrt{8}} = 0.4596$.
6. Interval: $4.525 \pm 0.4596$, that is $(4.07, 4.98)$ tonnes per hectare, to 3 significant figures.
:::

With $z = 1.96$ the interval would have been narrower, wrongly suggesting more precision than eight plots can give.

**Interpreting the interval.** If the sampling were repeated many times, about 95% of intervals made this way would contain the true mean. It is wrong to say "there is a 95% probability that $\mu$ lies in $(4.07, 4.98)$": $\mu$ is fixed; the interval is what varies.

## One-sample t-tests

The steps are the same as for any hypothesis test:

1. State $H_0: \mu = \mu_0$ and $H_1$ ($\mu < \mu_0$, $\mu > \mu_0$ or $\mu \ne \mu_0$), and the significance level.
2. Calculate $\bar{x}$, $s$ and the test statistic $t = \dfrac{\bar{x} - \mu_0}{s/\sqrt{n}}$.
3. Find the critical value from $t_{n-1}$ (one or two tails).
4. Compare, decide, and **conclude in context**, without claiming proof.

:::worked-solution[Example 2: A sugar mill in the Lowveld fills packets labelled 500 g. An inspector suspects underfilling. A random sample of 10 packets gives $\sum x = 4968$ and $\sum x^2 = 2\,468\,244$. Assuming masses are normal, test at the 5% level whether the mean mass is less than 500 g.]
1. $H_0: \mu = 500$, $H_1: \mu < 500$; one-tailed, 5%.
2. $\bar{x} = 496.8$; $s^2 = \dfrac{1}{9}\left(2\,468\,244 - \dfrac{4968^2}{10}\right) = \dfrac{141.6}{9} = 15.733$, so $s = 3.967$.
3. $t = \dfrac{496.8 - 500}{3.967/\sqrt{10}} = \dfrac{-3.2}{1.2543} = -2.551$.
4. $\nu = 9$; critical value $-t_9(0.95) = -1.833$.
5. $-2.551 < -1.833$, so reject $H_0$. There is evidence at the 5% level that the mean mass is less than 500 g.
:::

:::worked-solution[Example 3: Twelve patients at a Gweru clinic waited a mean of 23.4 minutes, with $s = 2.9$ minutes. The clinic claims a mean wait of 25 minutes. Test the claim at the 1% level, assuming waiting times are normal.]
1. $H_0: \mu = 25$, $H_1: \mu \ne 25$; two-tailed, 1%.
2. $t = \dfrac{23.4 - 25}{2.9/\sqrt{12}} = \dfrac{-1.6}{0.8372} = -1.911$.
3. $\nu = 11$; two-tailed 1% critical values $\pm t_{11}(0.995) = \pm 3.106$.
4. $|-1.911| < 3.106$, so do not reject $H_0$. There is not enough evidence at the 1% level to doubt the clinic's claim.
:::

Note that "do not reject" is not "accept as proven": the sample is small, and the test has little power to detect a modest difference.

## Which method for a mean?

| Population | Variance | Sample size | Method |
|---|---|---|---|
| normal | known | any | z with $\sigma$ |
| any | unknown | large | z with $s$ (central limit theorem) |
| normal | unknown | small | **t with $s$, $\nu = n - 1$** |

## Common mistakes

:::mistake{title="Using n instead of n − 1"}
Both the variance estimate and the degrees of freedom use $n - 1$. With $n = 8$, read the table at $\nu = 7$.
:::

:::mistake{title="Using z when σ is unknown and n is small"}
The value 1.96 makes the interval too narrow and the test too ready to reject. Use the t critical value.
:::

:::mistake{title="Reading the wrong tail probability"}
A 95% interval or two-tailed 5% test needs $t_\nu(0.975)$, not $t_\nu(0.95)$.
:::

:::mistake{title="Forgetting the normality assumption"}
The t method requires the population to be normal. State it, and say why it is reasonable (or doubtful) in context.
:::

## Exam tips

:::exam-tip
Show $\bar{x}$, $s^2$ (or $s$), $\nu$ and the critical value in separate lines: method marks are given for each, even if the final arithmetic slips.
:::

:::exam-tip
End every test with a sentence in context ("there is evidence that the mean mass is less than 500 g"). When asked for an assumption, say "the population is normally distributed" and, for a sample, "the sample is random". Give answers to 3 significant figures and critical values to 3 decimal places.
:::

## Summary

:::summary
- For a normal population with unknown variance and a small sample, $\dfrac{\bar{X} - \mu}{S/\sqrt{n}} \sim t_{n-1}$.
- The t-distribution is symmetrical with heavier tails than $\mathrm{N}(0, 1)$, and tends to it as $\nu$ grows.
- Confidence interval: $\bar{x} \pm t_{n-1}\,\dfrac{s}{\sqrt{n}}$.
- t-test: $t = \dfrac{\bar{x} - \mu_0}{s/\sqrt{n}}$ compared with the $t_{n-1}$ critical value; conclude in context.
:::
