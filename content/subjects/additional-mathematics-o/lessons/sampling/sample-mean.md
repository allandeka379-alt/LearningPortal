---
{
  "key": "sampling.sample-mean",
  "title": "The distribution of the sample mean and the central limit theorem",
  "summary": "Treat the sample mean X̄ as a random variable with E(X̄) = μ and Var(X̄) = σ²/n, use X̄ ~ N(μ, σ²/n) for samples from a normal population, apply the central limit theorem (without proof) for large samples from any population, and find probabilities about a sample mean.",
  "concepts": ["amath.sampling.sample-mean"],
  "estimatedMinutes": 45,
  "level": "core"
}
---
## Introduction

Take a random sample of 16 bags of maize meal from a mill in Gweru and work out their mean mass. Take another sample of 16 and the mean will be slightly different; a third sample gives a third value. The **sample mean** changes from sample to sample: it is itself a **random variable**, written $\bar{X}$, with its own distribution.

Knowing that distribution answers two kinds of question. First, "how likely is it that a sample mean is far from the population mean?", which tells a mill manager whether a low sample mean is a warning sign or just chance. Second, it is the basis of **estimation** and confidence intervals, the last topic of the course. The key facts are simple: sample means are centred on the population mean, they are less spread out than single values, and for large samples they are approximately normal whatever the shape of the population.

## Key definitions

:::definition{term="Sample mean as a random variable"}
For a random sample $X_1, X_2, \ldots, X_n$ from a population with mean $\mu$ and variance $\sigma^2$, the sample mean $\bar{X} = \dfrac{X_1 + X_2 + \cdots + X_n}{n}$ is a random variable. Its distribution is called the **sampling distribution of the mean**.
:::

:::formula{name="Mean and variance of the sample mean"}
$$
E(\bar{X}) = \mu, \qquad \operatorname{Var}(\bar{X}) = \frac{\sigma^2}{n}
$$
:::

The standard deviation of $\bar{X}$, $\dfrac{\sigma}{\sqrt{n}}$, is called the **standard error of the mean**.

:::formula{name="Sample mean from a normal population"}
$$
X \sim N(\mu, \sigma^2) \Rightarrow \bar{X} \sim N\left(\mu, \frac{\sigma^2}{n}\right) \text{ for any } n
$$
:::

:::definition{term="Central limit theorem"}
For a random sample of size $n$ from **any** population with mean $\mu$ and variance $\sigma^2$, the distribution of $\bar{X}$ is approximately $N\left(\mu, \frac{\sigma^2}{n}\right)$ when $n$ is large. The approximation improves as $n$ increases; $n \geq 30$ is usually taken as "large". It is used without proof.
:::

## What the formulas mean

- $E(\bar{X}) = \mu$: on average, sample means hit the population mean. There is no tendency to be too high or too low.
- $\operatorname{Var}(\bar{X}) = \frac{\sigma^2}{n}$: the variance falls as the sample size grows. Means of large samples cluster tightly around $\mu$; this is why larger samples give more reliable estimates.
- Because the standard error is $\frac{\sigma}{\sqrt{n}}$, making it half as big needs a sample **four** times as large.

## Samples from a normal population

:::worked-solution[Example 1: the masses, X grams, of eggs from a poultry farm are N(40, 9). A random sample of 16 eggs is taken. Find the probability that the mean mass of the sample exceeds 41 g, and compare with the probability that a single egg exceeds 41 g.]
1. $\bar{X} \sim N\left(40, \frac{9}{16}\right)$, so the standard error is $\sqrt{\frac{9}{16}} = 0.75$.
2. $z = \frac{41 - 40}{0.75} = 1.33$.
3. $P(\bar{X} > 41) = 1 - \Phi(1.33) = 1 - 0.9082 = 0.0918$.
4. For one egg, $\sigma = 3$: $z = \frac{41 - 40}{3} = 0.33$ and $P(X > 41) = 1 - 0.6293 = 0.3707$.
5. A single egg above 41 g is common, but a sample of 16 averaging above 41 g is unusual: averaging smooths out the variation.
:::

## The central limit theorem

When the population is **not** normal (or its shape is unknown), the exact distribution of $\bar{X}$ may be complicated. The central limit theorem says that for a large sample it does not matter: $\bar{X}$ is approximately normal anyway. This remarkable result is why the normal distribution appears in so many statistical methods.

:::worked-solution[Example 2: the time customers spend in a bank in Masvingo has mean 150 seconds and standard deviation 30 seconds; the distribution is skewed (a few customers take a long time). Find the probability that the mean time of a random sample of 50 customers is less than 145 seconds.]
1. The population is not normal, but $n = 50$ is large, so by the central limit theorem $\bar{X} \approx N\left(150, \frac{30^2}{50}\right)$.
2. Standard error $= \frac{30}{\sqrt{50}} = 4.243$.
3. $z = \frac{145 - 150}{4.243} = -1.18$.
4. $P(\bar{X} < 145) = 1 - \Phi(1.18) = 1 - 0.8810 = 0.119$.
:::

The theorem also applies to discrete populations. The score on a fair die has mean 3.5 and variance $\frac{35}{12}$, and the distribution is flat, not bell-shaped. Yet the mean score of 36 rolls is approximately $N\left(3.5, \frac{35}{432}\right)$, with standard error about 0.285.

## How large a sample?

The formula for the standard error lets you choose $n$ to make a sample mean reliable.

:::worked-solution[Example 3: a population has standard deviation 10. How large a sample is needed for the probability that the sample mean exceeds the population mean by more than 2 to be less than 0.05?]
1. $P(\bar{X} > \mu + 2) = P\left(Z > \frac{2}{10/\sqrt{n}}\right) = P\left(Z > \frac{\sqrt{n}}{5}\right)$.
2. We need this to be less than 0.05, so $\frac{\sqrt{n}}{5} > 1.645$.
3. $\sqrt{n} > 8.225$, so $n > 67.65$.
4. The smallest sample size is $n = 68$.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
The distribution of the sample mean and the central limit theorem are in ZIMSEC Paper 2 (Probability and Statistics). Cambridge 0606 does not examine statistics.
:::

## Common mistakes

:::mistake{title="Using σ instead of σ/√n"}
A question about a **sample mean** needs the standard error $\frac{\sigma}{\sqrt{n}}$. Using $\sigma$ answers a question about a single value.
:::

:::mistake{title="Dividing the standard deviation by n"}
$\operatorname{Var}(\bar{X}) = \frac{\sigma^2}{n}$, so the standard deviation is $\frac{\sigma}{\sqrt{n}}$, not $\frac{\sigma}{n}$.
:::

:::mistake{title="Saying the population becomes normal"}
The central limit theorem is about the distribution of the **sample mean**, not the population. A skewed population stays skewed.
:::

:::mistake{title="Using the central limit theorem for small samples"}
For a small sample from a non-normal population, $\bar{X}$ need not be close to normal. The theorem needs a large $n$ (unless the population itself is normal).
:::

## Exam tips

:::exam-tip
State the distribution in full before using it, for example "$\bar{X} \sim N\left(40, \frac{9}{16}\right)$" or "by the central limit theorem, $\bar{X} \approx N\left(150, \frac{900}{50}\right)$". This shows which result you are using.
:::

:::exam-tip
When a question asks why a normal distribution can be used, answer either "the population is normal" or "the sample is large, so the central limit theorem applies", whichever is true.
:::

:::exam-tip
For "find the least $n$", solve the inequality and round **up**.
:::

## Summary

:::summary
- $\bar{X}$ is a random variable with $E(\bar{X}) = \mu$ and $\operatorname{Var}(\bar{X}) = \frac{\sigma^2}{n}$; its standard deviation $\frac{\sigma}{\sqrt{n}}$ is the standard error.
- From a normal population, $\bar{X} \sim N\left(\mu, \frac{\sigma^2}{n}\right)$ exactly.
- Central limit theorem: for large $n$, $\bar{X}$ is approximately $N\left(\mu, \frac{\sigma^2}{n}\right)$ for any population.
- Standardise with $z = \dfrac{\bar{x} - \mu}{\sigma/\sqrt{n}}$.
- Larger samples give sample means closer to $\mu$; to halve the standard error, quadruple $n$.
:::
