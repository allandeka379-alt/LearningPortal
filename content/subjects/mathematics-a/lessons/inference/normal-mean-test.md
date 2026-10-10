---
{
  "key": "inference.normal-mean-test",
  "title": "Hypothesis tests for a population mean (z-tests)",
  "summary": "Test a population mean with a z statistic, using a normal population with known variance or a large sample with an estimated variance, by comparing with critical values or probabilities, and find critical regions for the sample mean.",
  "concepts": ["amaths.inference.normal-mean-test"],
  "estimatedMinutes": 45,
  "level": "core"
}
---
## Introduction

Packets of sugar are labelled 500 g; a consumer group suspects they are underfilled. A new teaching method is claimed to raise mean test scores above 60. A borehole is said to deliver 30 litres per minute on average. Each claim is about a **population mean**, and each can be tested with a sample mean. Because sample means are (exactly or approximately) normally distributed, the test uses the standard normal distribution: it is called a **z-test**.

ZIMSEC examines z-tests for a mean in Statistics Form 5 (topic 6.8.1); small samples with unknown variance use the $t$-distribution, a separate ZIMSEC-only lesson. Cambridge examines z-tests for a mean in Paper 6 (topic 6.5).

## Key definitions

:::formula{name="Test statistic for a mean"}
$$
z = \frac{\bar{x} - \mu_0}{\sigma/\sqrt{n}}
$$
where $\mu_0$ is the value of $\mu$ in $H_0$. For a large sample with unknown $\sigma$, use the unbiased estimate $s$ in place of $\sigma$.
:::

:::definition{term="Conditions for a z-test"}
Either the population is normal with known variance (any sample size), or the sample is large, so that by the central limit theorem $\bar{X}$ is approximately normal and $s$ is a reliable estimate of $\sigma$.
:::

:::keyfact{title="Critical values"}
One-tailed: $1.645$ (5%), $2.326$ (1%). Two-tailed: $\pm 1.96$ (5%), $\pm 2.576$ (1%). For a lower-tailed test use the negative value.
:::

## The method

1. State $H_0: \mu = \mu_0$ and $H_1$ ($\mu < \mu_0$, $\mu > \mu_0$ or $\mu \ne \mu_0$), with $\mu$ defined in context.
2. Say why $\bar{X}$ is normal (normal population, or the central limit theorem).
3. Calculate $z$.
4. Compare $z$ with the critical value, or find the p-value and compare it with the significance level.
5. Decide and conclude in context.

## Worked examples

:::worked-solution[Example 1: Packets of sugar are labelled 500 g. The masses are normally distributed with standard deviation 8 g. A random sample of 30 packets has mean 497.2 g. Test at the 5% level whether the packets are underfilled. Would the conclusion change at the 1% level?]
1. $H_0: \mu = 500$, $H_1: \mu < 500$, where $\mu$ g is the mean mass of all packets.
2. The masses are normal, so $\bar{X} \sim \mathrm{N}\left(500, \frac{64}{30}\right)$ under $H_0$; standard error $\frac{8}{\sqrt{30}} = 1.4606$.
3. $z = \dfrac{497.2 - 500}{1.4606} = -1.917$.
4. $-1.917 < -1.645$, so reject $H_0$ at the 5% level: there is evidence that the packets are underfilled.
5. At the 1% level the critical value is $-2.326$; $-1.917 > -2.326$, so $H_0$ would not be rejected.
6. Equivalently, the p-value is $\Phi(-1.917) = 0.0276$, which lies between 0.01 and 0.05.
:::

The same data can be significant at one level and not at another. That is why the significance level must be fixed before the data are examined.

## Large samples with an estimated variance

:::worked-solution[Example 2: The flow rate, $x$ litres per minute, of a borehole pump is recorded on 50 randomly chosen occasions: $\sum x = 1485$ and $\sum x^2 = 44620$. Test at the 5% level whether the mean flow rate differs from 30 litres per minute.]
1. $H_0: \mu = 30$, $H_1: \mu \ne 30$ (two-tailed).
2. $\bar{x} = 29.7$; $s^2 = \frac{1}{49}\left(44620 - \frac{1485^2}{50}\right) = 10.52$.
3. The distribution of flow rates is unknown, but $n = 50$ is large, so by the central limit theorem $\bar{X}$ is approximately normal. Standard error $= \sqrt{\frac{10.52}{50}} = 0.4587$.
4. $z = \dfrac{29.7 - 30}{0.4587} = -0.654$.
5. $|-0.654| < 1.96$, so do not reject $H_0$. There is no evidence at the 5% level that the mean flow rate differs from 30 litres per minute.
:::

## Critical regions for the sample mean

Instead of standardising, you can find the critical region in terms of $\bar{x}$. For an upper-tailed test, reject $H_0$ when
$$
\bar{x} > \mu_0 + z\frac{\sigma}{\sqrt{n}}.
$$

:::worked-solution[Example 3: A population is normal with standard deviation 6. Using samples of 25, find the critical region for $\bar{x}$ for a test of $H_0: \mu = 75$ (a) against $H_1: \mu > 75$ at 5%, (b) against $H_1: \mu \ne 75$ at 5%.]
1. Standard error $= \frac{6}{5} = 1.2$.
2. (a) Reject if $\bar{x} > 75 + 1.645 \times 1.2 = 76.974$, i.e. $\bar{x} > 76.97$.
3. (b) Reject if $\bar{x} < 75 - 1.96 \times 1.2 = 72.648$ or $\bar{x} > 75 + 1.96 \times 1.2 = 77.352$.
4. So a sample mean of 77.1 would be significant in the one-tailed test but not in the two-tailed test.
:::

Critical regions for $\bar{x}$ are needed later for Type II error calculations, where the true mean differs from $\mu_0$.

## p-values in two-tailed tests

In a two-tailed test, the p-value counts both tails: it is twice the tail probability beyond the observed $z$. In Example 2, $\mathrm{P}(Z < -0.654) = 0.2565$, so the p-value is $2 \times 0.2565 = 0.513$, far above 0.05. An equivalent approach, often quicker with tables, is to compare the single tail probability with half the significance level (0.025 for a 5% test). Do not mix the two: either double the tail probability and compare with 0.05, or keep it and compare with 0.025.

## Which test should be used?

Before calculating, check which situation you are in. If the population is normal and $\sigma$ is given, the z-test is exact for any sample size. If $\sigma$ is not given but the sample is large (roughly 30 or more), estimate it with $s$ and quote the central limit theorem. If the sample is small, the population is not known to be normal, and $\sigma$ is unknown, a z-test is not justified: ZIMSEC candidates who know the population is normal use the $t$-distribution instead, and otherwise more data are needed. Saying which case applies, and why, is often worth a mark on its own.

## Common mistakes

:::mistake{title="Dividing by σ instead of σ/√n"}
The test is about the sample mean, so standardise with its standard deviation $\frac{\sigma}{\sqrt{n}}$.
:::

:::mistake{title="Using 1.645 in a two-tailed test"}
Two-tailed 5% tests use $\pm 1.96$.
:::

:::mistake{title="Sign errors in lower-tailed tests"}
Keep the sign of $z$: compare $-1.917$ with $-1.645$, or compare the p-value with the significance level.
:::

:::mistake{title="Omitting the justification"}
For a large sample from an unknown population, say that the central limit theorem makes $\bar{X}$ approximately normal.
:::

## Exam tips

:::exam-tip
Hypotheses must be about $\mu$, with the value from the claim; the observed $\bar{x}$ never appears in them.
:::

:::exam-tip
Write the comparison and the decision ("$-1.917 < -1.645$, reject $H_0$") before the contextual conclusion.
:::

:::exam-tip
Give $z$ to at least 3 significant figures; when $z$ is very close to a critical value, keep more figures to avoid a wrong decision.
:::

## Summary

:::summary
- $z = \dfrac{\bar{x} - \mu_0}{\sigma/\sqrt{n}}$; use $s$ for a large sample with unknown $\sigma$.
- Valid for a normal population with known $\sigma$, or for large $n$ by the central limit theorem.
- Critical values: 1.645 / 2.326 one-tailed, 1.96 / 2.576 two-tailed (5% / 1%).
- Critical region for $\bar{x}$: $\mu_0 \pm z\frac{\sigma}{\sqrt{n}}$.
- Significant at 1% implies significant at 5%, not the reverse.
:::
