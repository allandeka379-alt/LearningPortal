---
{
  "key": "normal.binomial-approximation",
  "title": "The normal approximation to the binomial distribution",
  "summary": "Decide when B(n, p) can be approximated by N(np, npq), apply a continuity correction, and use the approximation to find probabilities and unknown values in context.",
  "concepts": ["amaths.normal.binomial-approximation"],
  "estimatedMinutes": 40,
  "level": "core"
}
---
## Introduction

Suppose 40% of households in a Harare suburb use solar lighting and a researcher visits 60 households. The number using solar is $\mathrm{B}(60, 0.4)$, and the probability that at least 30 use it needs 31 binomial terms. Exam questions with $n = 60$, 100 or 200 are designed so that you **cannot** add terms by hand; instead you approximate the binomial distribution by a normal distribution with the same mean and variance.

ZIMSEC examines the approximation in Statistics Form 5 (topic 6.5.3, the normal distribution), and uses it again for hypothesis tests. Cambridge examines it in Paper 5 (Probability & Statistics 1, topic 5.5), and Paper 6 builds on it for tests. You need the binomial distribution, standardising with $z = \frac{x - \mu}{\sigma}$, and reading normal tables.

## Key definitions

:::definition{term="Normal approximation to the binomial"}
If $X \sim \mathrm{B}(n, p)$ and $n$ is large enough that $np > 5$ and $nq > 5$ (where $q = 1 - p$), then $X$ is approximately $\mathrm{N}(np, npq)$.
:::

:::formula{name="Parameters"}
$$
\mu = np, \qquad \sigma^2 = npq = np(1 - p), \qquad \sigma = \sqrt{npq}
$$
:::

:::definition{term="Continuity correction"}
A discrete value $k$ is treated as the interval $k - 0.5$ to $k + 0.5$ of the continuous approximating variable.
:::

MF19 gives the binomial mean and variance and the normal table, but not the conditions: learn $np > 5$ and $nq > 5$. ZIMSEC prints no formula list.

## Why the approximation works

A binomial histogram with $p$ near $\frac12$ is symmetrical. As $n$ grows, the histogram becomes smoother and bell-shaped, centred on $np$. If $p$ is small (or large), the histogram is skewed, and it takes a bigger $n$ before the bell shape appears. The two conditions $np > 5$ and $nq > 5$ make sure that the mean is far enough from both ends, 0 and $n$, for the skew not to matter.

Because a continuous normal curve is replacing the bars of a histogram, each whole number $k$ is represented by the bar from $k - 0.5$ to $k + 0.5$. That is the **continuity correction**. Draw a number line, mark the whole numbers that are included, and the boundary is half a unit beyond the last included value.

| Binomial event | Normal event |
| --- | --- |
| $X \ge 30$ | $Y > 29.5$ |
| $X > 30$ | $Y > 30.5$ |
| $X < 40$ | $Y < 39.5$ |
| $X \le 40$ | $Y < 40.5$ |
| $X = 35$ | $34.5 < Y < 35.5$ |

## Using the approximation

:::worked-solution[Example 1: 40% of households in a suburb use solar lighting. 60 households are chosen at random. Use a suitable approximation to find the probability that at least 30 of them use solar lighting.]
1. $X \sim \mathrm{B}(60, 0.4)$. Check: $np = 24 > 5$ and $nq = 36 > 5$, so use the normal approximation.
2. $\mu = 24$, $\sigma^2 = 60 \times 0.4 \times 0.6 = 14.4$, so $Y \sim \mathrm{N}(24, 14.4)$.
3. Continuity correction: $\mathrm{P}(X \ge 30) \approx \mathrm{P}(Y > 29.5)$.
4. $z = \dfrac{29.5 - 24}{\sqrt{14.4}} = 1.449$.
5. $\mathrm{P}(Y > 29.5) = 1 - \Phi(1.449) = 1 - 0.9264 = 0.0736$ (tables with $z = 1.45$ give $0.0735$).
:::

The exact binomial answer is $0.0746$, so the approximation is good to two decimal places. Always state the approximating distribution in full before standardising.

:::worked-solution[Example 2: $X \sim \mathrm{B}(100, 0.35)$. Use a normal approximation to find $\mathrm{P}(30 \le X < 40)$.]
1. $np = 35$ and $nq = 65$, both greater than 5. $\sigma^2 = 100 \times 0.35 \times 0.65 = 22.75$.
2. $30 \le X < 40$ means $X = 30, 31, \dots, 39$, so use $\mathrm{P}(29.5 < Y < 39.5)$.
3. $z_1 = \dfrac{29.5 - 35}{\sqrt{22.75}} = -1.153$ and $z_2 = \dfrac{39.5 - 35}{\sqrt{22.75}} = 0.943$.
4. Probability $= \Phi(0.943) - \Phi(-1.153) = 0.8273 - 0.1244 = 0.7028$, so $0.703$.
:::

## Working backwards

Some questions give a probability and ask for a boundary value. Use the same continuity-corrected boundary and compare probabilities, or use an inverse normal value.

:::worked-solution[Example 3: 85% of seeds of a maize variety germinate. Tatenda plants 80 seeds. (a) Use a suitable approximation to find the probability that fewer than 65 seeds germinate. (b) Find the smallest $k$ for which the probability that at least $k$ seeds germinate is less than 0.05.]
1. $X \sim \mathrm{B}(80, 0.85)$: $np = 68 > 5$, $nq = 12 > 5$. $\sigma^2 = 80 \times 0.85 \times 0.15 = 10.2$, so $Y \sim \mathrm{N}(68, 10.2)$.
2. (a) $\mathrm{P}(X < 65) = \mathrm{P}(X \le 64) \approx \mathrm{P}(Y < 64.5)$, $z = \dfrac{64.5 - 68}{\sqrt{10.2}} = -1.096$.
3. $\Phi(-1.096) = 0.1366$, so the probability is $0.137$.
4. (b) $\mathrm{P}(X \ge k) \approx \mathrm{P}(Y > k - 0.5) < 0.05$ requires $\dfrac{k - 0.5 - 68}{\sqrt{10.2}} > 1.645$.
5. $k > 68.5 + 1.645\sqrt{10.2} = 73.75$, so the smallest integer is $k = 74$.
6. Check: $\mathrm{P}(Y > 73.5) = 1 - \Phi(1.722) = 0.0425 < 0.05$, while $\mathrm{P}(Y > 72.5) = 1 - \Phi(1.409) = 0.0794$.
:::

## The normal distribution as a model

The same idea, matching a normal curve to a distribution by its mean and variance, lets you use the normal distribution as a **model** for real data such as masses, heights or test marks. A model is reasonable if the data are roughly symmetrical and bell-shaped, with about 68% of values within one standard deviation of the mean and about 95% within two. It is unreasonable if the data are strongly skewed or bounded close to the mean, for example waiting times with mean 2 minutes and standard deviation 3 minutes, where the model would give a large probability to negative times.

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards use the conditions $np > 5$ and $nq > 5$ and a continuity correction. ZIMSEC candidates read 4-figure normal tables (round $z$ to 2 decimal places) and are often asked for 4 decimal places. Cambridge expects 3 significant figures; Paper 6 adds the Poisson approximation to the binomial for small $p$, which ZIMSEC does not name.
:::

## Common mistakes

:::mistake{title="Using npq as the standard deviation"}
$npq$ is the variance. Standardise with $\sqrt{npq}$.
:::

:::mistake{title="Missing or reversed continuity correction"}
"Fewer than 65" is $X \le 64$, so the boundary is $64.5$, not $65.5$ or $65$. Write the inequality in whole numbers first.
:::

:::mistake{title="Not checking the conditions"}
Both $np$ and $nq$ must exceed 5. For $\mathrm{B}(40, 0.1)$, $np = 4$, so the normal approximation is not suitable.
:::

:::mistake{title="Rounding z too early"}
Keep $z$ to at least 3 decimal places (or 2 when using 4-figure tables) and the probability to 4 figures until the final answer.
:::

## Exam tips

:::exam-tip
"Use a suitable approximation" earns marks for: naming $\mathrm{N}(np, npq)$ with values, justifying with $np > 5$ and $nq > 5$, the continuity correction, standardising and the final answer.
:::

:::exam-tip
Sketch a normal curve and shade the required area: it shows at once whether you need $\Phi(z)$ or $1 - \Phi(z)$.
:::

:::exam-tip
In a backward question, check your final integer by working out the probabilities for it and for the integer next to it.
:::

## Summary

:::summary
- $\mathrm{B}(n, p) \approx \mathrm{N}(np, npq)$ when $np > 5$ and $nq > 5$.
- The variance is $npq$; standardise with $\sqrt{npq}$.
- Use a continuity correction: the whole number $k$ becomes the interval from $k - 0.5$ to $k + 0.5$.
- Write the event in whole numbers, then convert it to a normal event.
- A normal model suits roughly symmetrical, bell-shaped data that are not bounded near the mean.
:::
