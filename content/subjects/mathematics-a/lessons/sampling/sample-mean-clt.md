---
{
  "key": "sampling.sample-mean-clt",
  "title": "The distribution of the sample mean and the central limit theorem",
  "summary": "Treat the sample mean as a random variable with mean μ and variance σ²/n, use its exact normal distribution when the population is normal, apply the central limit theorem for large samples, and find probabilities about sample means and totals.",
  "concepts": ["amaths.sampling.sample-mean-clt"],
  "estimatedMinutes": 45,
  "level": "core"
}
---
## Introduction

If ten different inspectors each weigh a random sample of 16 bags of mealie-meal from the same mill, they will get ten slightly different sample means. The sample mean is therefore a **random variable**, with its own distribution. Knowing that distribution lets us say how far a sample mean is likely to be from the true mean, which is the foundation of confidence intervals and hypothesis tests for a mean.

ZIMSEC examines this in Statistics Form 6 (topic 6.7.2, with the central limit theorem). Cambridge examines it in Paper 6 (topic 6.4), where the central limit theorem is used informally: "for a large sample, the sample mean is approximately normal". You need the normal distribution and the rules for linear combinations of random variables.

## Key definitions

:::definition{term="Sample mean"}
For a random sample $X_1, X_2, \dots, X_n$ from a population with mean $\mu$ and variance $\sigma^2$,
$$
\bar{X} = \frac{X_1 + X_2 + \dots + X_n}{n}.
$$
:::

:::formula{name="Mean and variance of the sample mean"}
$$
\mathrm{E}(\bar{X}) = \mu, \qquad \mathrm{Var}(\bar{X}) = \frac{\sigma^2}{n}, \qquad \text{standard error} = \frac{\sigma}{\sqrt{n}}
$$
:::

These follow from the rules for independent variables: $\mathrm{Var}(X_1 + \dots + X_n) = n\sigma^2$, and dividing by $n$ divides the variance by $n^2$. MF19 does not print these results, so learn them.

:::definition{term="Central limit theorem"}
For a random sample of size $n$ from **any** population with mean $\mu$ and finite variance $\sigma^2$, when $n$ is large
$$
\bar{X} \approx \mathrm{N}\left(\mu, \frac{\sigma^2}{n}\right).
$$
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards use the result for probabilities about sample means. Cambridge expects the theorem only in the informal form above, with "large" meaning about $n \ge 30$; ZIMSEC asks you to state it and to explain its implications for small and large samples.
:::

## Normal population: an exact result

If the population itself is normal, $X \sim \mathrm{N}(\mu, \sigma^2)$, then $\bar{X}$ is **exactly** normal for every sample size:
$$
\bar{X} \sim \mathrm{N}\left(\mu, \frac{\sigma^2}{n}\right).
$$
No theorem is needed; it is a property of sums of independent normal variables.

:::worked-solution[Example 1: The masses of eggs from a farm in Goromonzi are normally distributed with mean 65 g and standard deviation 8 g. Find the probability that the mean mass of a random sample of 16 eggs is more than 68 g.]
1. $\bar{X} \sim \mathrm{N}\left(65, \frac{64}{16}\right) = \mathrm{N}(65, 4)$, so the standard error is 2.
2. $z = \dfrac{68 - 65}{2} = 1.5$.
3. $\mathrm{P}(\bar{X} > 68) = 1 - \Phi(1.5) = 1 - 0.9332 = 0.0668$.
:::

Compare this with a single egg: $\mathrm{P}(X > 68) = 1 - \Phi(0.375) \approx 0.354$. Averages are much less variable than individual values.

## Any population: the central limit theorem

When the population is not normal (skewed waiting times, discrete counts, uniform scores), the sample mean is still approximately normal provided the sample is large. The approximation improves as $n$ increases, and faster when the population is nearly symmetrical. For small samples from a non-normal population, no normal calculation is justified.

:::worked-solution[Example 2: The number of goals per match in a league has mean 2.4 and variance 1.96. Find the probability that the mean number of goals in 49 randomly chosen matches is less than 2.2.]
1. The number of goals is discrete and skewed, but $n = 49$ is large, so by the central limit theorem $\bar{X} \approx \mathrm{N}\left(2.4, \frac{1.96}{49}\right)$.
2. Standard error $= \sqrt{0.04} = 0.2$.
3. $z = \dfrac{2.2 - 2.4}{0.2} = -1$.
4. $\mathrm{P}(\bar{X} < 2.2) \approx \Phi(-1) = 1 - 0.8413 = 0.1587$, so $0.159$.
:::

No continuity correction is used here: we approximate the distribution of the *mean*, not a single count.

## How large is "large"?

There is no single cut-off. The usual rule of thumb is $n \ge 30$, and examination questions treat samples of 30 or more as large. The real answer depends on the shape of the population. For a population that is already roughly symmetrical, such as the score on a fair die, the mean of as few as 10 observations is close to normal. For a strongly skewed population, such as waiting times or incomes, the approximation needs more observations before the long tail stops showing in the distribution of the mean. When asked to "explain whether the central limit theorem is needed", consider two questions: is the population known to be normal (then it is not needed), and if not, is the sample large enough for the theorem to apply?

## Totals

The total $T = X_1 + \dots + X_n$ has $\mathrm{E}(T) = n\mu$ and $\mathrm{Var}(T) = n\sigma^2$. A question about a total can be done either with $T$ or by converting to the mean, $\mathrm{P}(T > t) = \mathrm{P}\left(\bar{X} > \frac{t}{n}\right)$.

:::worked-solution[Example 3: Bags of cement have masses $\mathrm{N}(25, 0.5^2)$ kg. A pallet holds 20 randomly chosen bags. Find the probability that the total mass exceeds 502 kg.]
1. $T \sim \mathrm{N}(20 \times 25, 20 \times 0.25) = \mathrm{N}(500, 5)$.
2. $z = \dfrac{502 - 500}{\sqrt{5}} = 0.8944$.
3. $\mathrm{P}(T > 502) = 1 - \Phi(0.894) = 0.1855$, so $0.186$ (tables with $z = 0.89$ give $0.1867$).
4. Note: $\mathrm{Var}(T) = 20 \times 0.25 = 5$, not $20^2 \times 0.25$; the bags vary independently.
:::

## Choosing the sample size

The standard error $\frac{\sigma}{\sqrt{n}}$ shrinks as $n$ grows, but only with the square root: to halve it you need four times as many observations. To make $\mathrm{P}(|\bar{X} - \mu| < d) \ge 0.95$, solve $\frac{d}{\sigma/\sqrt{n}} \ge 1.96$. For example, with $\sigma = 3$ and $d = 0.5$, $\sqrt{n} \ge 11.76$, so $n \ge 138.3$ and the smallest sample is 139. Always round **up**.

## Common mistakes

:::mistake{title="Using σ instead of σ/√n"}
Probabilities about a sample mean use the standard error $\frac{\sigma}{\sqrt{n}}$, not the population standard deviation.
:::

:::mistake{title="Saying the population becomes normal"}
The central limit theorem is about the distribution of $\bar{X}$; the population distribution never changes.
:::

:::mistake{title="Applying the theorem to small samples"}
For a non-normal population and small $n$ (say 5 or 10), the sample mean is not reliably normal.
:::

:::mistake{title="Treating a total as a multiple"}
$\mathrm{Var}(X_1 + \dots + X_n) = n\sigma^2$, but $\mathrm{Var}(nX) = n^2\sigma^2$.
:::

## Exam tips

:::exam-tip
When you use the central limit theorem, say so and give the reason: "$n$ is large, so by the central limit theorem $\bar{X}$ is approximately normal".
:::

:::exam-tip
If the population is stated to be normal, say "$\bar{X}$ is exactly normal" and do not quote the central limit theorem.
:::

:::exam-tip
Give probabilities to 3 significant figures (ZIMSEC often 4 decimal places); state the distribution of $\bar{X}$ with both parameters before standardising.
:::

## Summary

:::summary
- $\mathrm{E}(\bar{X}) = \mu$, $\mathrm{Var}(\bar{X}) = \frac{\sigma^2}{n}$; standard error $\frac{\sigma}{\sqrt{n}}$.
- Normal population: $\bar{X}$ is exactly normal for any $n$.
- Any population, large $n$: $\bar{X} \approx \mathrm{N}\left(\mu, \frac{\sigma^2}{n}\right)$ by the central limit theorem.
- Totals: mean $n\mu$, variance $n\sigma^2$.
- Quadrupling $n$ halves the standard error; round sample sizes up.
:::
