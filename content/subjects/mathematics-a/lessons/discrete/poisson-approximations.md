---
{
  "key": "discrete.poisson-approximations",
  "title": "Poisson and normal approximations",
  "summary": "Approximate B(n, p) by Po(np) when n is large and p is small, approximate Po(λ) by N(λ, λ) with a continuity correction when λ is large, and justify each approximation from its conditions.",
  "concepts": ["amaths.discrete.poisson-approximations"],
  "estimatedMinutes": 40,
  "level": "core"
}
---
## Introduction

Some exact probabilities are painful to calculate. If 1 seed in 400 fails to germinate, the number of failures in a packet of 1000 seeds is $\mathrm{B}(1000, 0.0025)$, and "more than 4 failures" needs five binomial terms with huge binomial coefficients. If a call centre receives on average 22 calls an hour, "at least 25 calls" needs 25 Poisson terms. Approximations replace these awkward distributions with simpler ones that give almost the same answers.

This lesson covers two approximations examined in Cambridge Paper 6 (Probability & Statistics 2, topic 6.1): the **Poisson approximation to the binomial** and the **normal approximation to the Poisson**. The normal approximation to the binomial, from Paper 5, has its own lesson. You need the Poisson distribution, the normal distribution and continuity corrections.

## Key definitions

:::definition{term="Poisson approximation to the binomial"}
If $X \sim \mathrm{B}(n, p)$ with $n$ large and $p$ small, then $X$ is approximately $\mathrm{Po}(np)$. Cambridge uses the guide $n > 50$ and $np < 5$.
:::

:::definition{term="Normal approximation to the Poisson"}
If $X \sim \mathrm{Po}(\lambda)$ with $\lambda$ large, then $X$ is approximately $\mathrm{N}(\lambda, \lambda)$. Cambridge uses the guide $\lambda > 15$.
:::

:::definition{term="Continuity correction"}
An adjustment of $\frac{1}{2}$ used when a discrete distribution is approximated by a continuous one: the whole number $k$ is represented by the interval from $k - \frac{1}{2}$ to $k + \frac{1}{2}$.
:::

:::formula{name="Matching the parameters"}
$$
\mathrm{B}(n, p) \approx \mathrm{Po}(np), \qquad \mathrm{Po}(\lambda) \approx \mathrm{N}(\lambda, \lambda)
$$
:::

MF19 does not print these conditions; learn them. It does print the normal distribution table you use with the second approximation.

## The Poisson approximation to the binomial

Why does it work? $\mathrm{B}(n, p)$ has mean $np$ and variance $np(1 - p)$. When $p$ is small, $1 - p$ is close to 1, so the variance is close to the mean, just as for a Poisson distribution. As $n$ grows with $np$ fixed, the binomial probabilities approach the Poisson ones exactly.

Two things change when you approximate. First, use $\lambda = np$. Second, there is **no continuity correction**: both distributions are discrete, so $\mathrm{P}(X \le 2)$ stays $\mathrm{P}(X \le 2)$.

:::worked-solution[Example 1: 1.5% of the bolts made by a machine are faulty. A box contains 200 bolts. Use a suitable approximation to find the probability that the box contains at most 2 faulty bolts.]
1. Let $X$ be the number of faulty bolts: $X \sim \mathrm{B}(200, 0.015)$.
2. $n = 200 > 50$ and $np = 3 < 5$, so $X$ is approximately $\mathrm{Po}(3)$.
3. $\mathrm{P}(X \le 2) \approx \mathrm{e}^{-3}\left(1 + 3 + \dfrac{3^2}{2}\right) = 8.5\mathrm{e}^{-3} = 0.4232$, so $0.423$.
4. For comparison, the exact binomial answer is $0.4215$: the approximation is good.
:::

If $p$ is close to 1 rather than 0, count the other outcome. If 98% of seeds germinate, the number that **fail** is $\mathrm{B}(n, 0.02)$, which can be approximated by a Poisson distribution.

## The normal approximation to the Poisson

When $\lambda$ is large, the Poisson distribution becomes nearly symmetrical and bell-shaped, centred at $\lambda$ with variance $\lambda$. So $\mathrm{Po}(\lambda) \approx \mathrm{N}(\lambda, \lambda)$. Remember that the **variance** is $\lambda$, so the standard deviation is $\sqrt{\lambda}$.

Here you move from a discrete distribution to a continuous one, so a **continuity correction** is essential. Draw a quick number line and include or exclude the half-unit at each end:

| Poisson event | Normal event |
| --- | --- |
| $X \ge 25$ | $Y > 24.5$ |
| $X > 25$ | $Y > 25.5$ |
| $X \le 20$ | $Y < 20.5$ |
| $15 \le X \le 20$ | $14.5 < Y < 20.5$ |
| $X = 18$ | $17.5 < Y < 18.5$ |

:::worked-solution[Example 2: calls arrive at a call centre in Harare at an average rate of 22 per hour. Use a suitable approximation to find the probability of at least 25 calls in an hour.]
1. $X \sim \mathrm{Po}(22)$. Since $\lambda = 22 > 15$, use $Y \sim \mathrm{N}(22, 22)$.
2. Continuity correction: $\mathrm{P}(X \ge 25) \approx \mathrm{P}(Y > 24.5)$.
3. Standardise: $z = \dfrac{24.5 - 22}{\sqrt{22}} = 0.533$.
4. $\mathrm{P}(Y > 24.5) = 1 - \Phi(0.533) = 1 - 0.7030 = 0.2970$, so $0.297$.
5. (The exact Poisson value is $0.2883$; the approximation is close but not perfect.)
:::

## A typical exam question

:::worked-solution[Example 3: on average 1 in 400 seeds of a variety fails to germinate. (a) Find the probability that more than 4 seeds fail in a packet of 1000. (b) The number of packets sold by a shop in a month has distribution $\mathrm{Po}(18)$. Find the probability that between 15 and 20 packets inclusive are sold in a month.]
1. (a) $X \sim \mathrm{B}(1000, 0.0025)$; $n > 50$ and $np = 2.5 < 5$, so $X \approx \mathrm{Po}(2.5)$.
2. $\mathrm{P}(X > 4) = 1 - \mathrm{P}(X \le 4) = 1 - \mathrm{e}^{-2.5}\left(1 + 2.5 + \frac{2.5^2}{2} + \frac{2.5^3}{6} + \frac{2.5^4}{24}\right) = 1 - 0.8912 = 0.1088$, so $0.109$.
3. (b) $\lambda = 18 > 15$, so use $Y \sim \mathrm{N}(18, 18)$.
4. $\mathrm{P}(15 \le X \le 20) \approx \mathrm{P}(14.5 < Y < 20.5)$.
5. $z_1 = \dfrac{14.5 - 18}{\sqrt{18}} = -0.825$ and $z_2 = \dfrac{20.5 - 18}{\sqrt{18}} = 0.589$.
6. Probability $= \Phi(0.589) - \Phi(-0.825) = 0.7222 - 0.2047 = 0.5175$, so $0.517$ (tables with $z$ to 2 d.p. give $0.516$).
:::

When a question says "use a suitable approximation", the marks include **naming** the approximation and **justifying** it with the numbers: "$n = 1000 > 50$ and $np = 2.5 < 5$".

:::keyfact{title="ZIMSEC and Cambridge"}
Cambridge only: these two approximations are in Paper 6 (A Level). ZIMSEC Statistics does not name them; ZIMSEC uses the normal approximation to the binomial (when $np > 5$ and $nq > 5$) only.
:::

## Choosing the right approximation

- $\mathrm{B}(n, p)$, $n$ large, $np < 5$: **Poisson**, $\lambda = np$, no continuity correction.
- $\mathrm{B}(n, p)$, $np > 5$ and $nq > 5$: **normal**, $\mathrm{N}(np, npq)$, with continuity correction (Paper 5).
- $\mathrm{Po}(\lambda)$, $\lambda > 15$: **normal**, $\mathrm{N}(\lambda, \lambda)$, with continuity correction.

## Common mistakes

:::mistake{title="Using √λ as the variance"}
For $\mathrm{N}(\lambda, \lambda)$ the second parameter is the variance. Standardise by dividing by $\sqrt{\lambda}$, not by $\lambda$.
:::

:::mistake{title="Continuity correction in the wrong direction"}
"At least 25" includes 25, so the boundary is 24.5; "more than 25" excludes 25, so the boundary is 25.5. A number line settles it.
:::

:::mistake{title="Continuity correction with the Poisson approximation"}
Binomial to Poisson is discrete to discrete: no continuity correction.
:::

:::mistake{title="Forgetting to justify"}
Quote the conditions with numbers. "$n$ is large and $p$ is small" without values loses the mark.
:::

## Exam tips

:::exam-tip
Write the approximating distribution in full, for example "$X \approx \mathrm{N}(18, 18)$", before you standardise.
:::

:::exam-tip
If a question asks why a normal approximation to $\mathrm{Po}(\lambda)$ is **not** suitable, the answer is that $\lambda$ is too small (say $\lambda \le 15$), so the distribution is skewed.
:::

:::exam-tip
Give final answers to 3 significant figures, keeping 4 figures for $z$-values and probabilities in the working.
:::

## Summary

:::summary
- $\mathrm{B}(n, p) \approx \mathrm{Po}(np)$ when $n > 50$ and $np < 5$; no continuity correction.
- $\mathrm{Po}(\lambda) \approx \mathrm{N}(\lambda, \lambda)$ when $\lambda > 15$; use a continuity correction.
- The variance of the normal approximation is $\lambda$; standardise with $\sqrt{\lambda}$.
- Name the approximation and justify it with the numbers in the question.
- If $p$ is close to 1, count the failures so that the probability is small.
:::
