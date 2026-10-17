---
{
  "key": "distributions.normal",
  "title": "The normal distribution and standard normal tables",
  "summary": "Know the properties of the normal curve, standardise X ~ N(μ, σ²) with Z = (X − μ)/σ, use standard normal tables Φ(z) for probabilities to the left, to the right and between values, and use the tables in reverse to find z and then x from a probability.",
  "concepts": ["amath.distributions.normal"],
  "estimatedMinutes": 40,
  "level": "core"
}
---
## Introduction

Measure the heights of Form 4 learners, the masses of bags of sugar from a factory, or the lengths of bream caught in Lake Kariba, and draw a histogram: again and again the same shape appears, a symmetrical bell with most values near the middle and fewer and fewer towards the ends. This shape is the **normal distribution**, the most widely used model in statistics.

Every normal distribution is described by two numbers, its mean $\mu$ and its standard deviation $\sigma$, and every normal probability can be found from **one** table, the table of the standard normal distribution. ZIMSEC Paper 2 has a normal distribution question almost every year, and the skills here (standardising, reading tables both ways) are also needed for the sample mean and for confidence intervals later.

## Key definitions

:::definition{term="Normal distribution"}
A continuous distribution whose pdf is a symmetrical bell-shaped curve centred on the mean $\mu$. We write $X \sim N(\mu, \sigma^2)$: the **second number is the variance**, not the standard deviation.
:::

:::definition{term="Standard normal distribution"}
The normal distribution with mean 0 and variance 1, written $Z \sim N(0, 1)$. Its cumulative probabilities $\Phi(z) = P(Z < z)$ are printed in the standard normal tables.
:::

:::formula{name="Standardising"}
$$
Z = \frac{X - \mu}{\sigma}
$$
:::

The $z$-value says how many standard deviations $x$ lies above (positive $z$) or below (negative $z$) the mean.

## Properties of the normal curve

- It is **bell-shaped** and **symmetrical about the mean** $\mu$; the mean, median and mode are equal.
- It extends in both directions without ever touching the $x$-axis, but almost all of the probability is within 3 standard deviations of the mean.
- The total area under the curve is 1.
- About **68%** of values lie within 1 standard deviation of the mean, about **95%** within 2, and about **99.7%** within 3.

So if the masses of bags of maize meal are normal with mean 10 kg and standard deviation 0.2 kg, about 95% of bags weigh between 9.6 kg and 10.4 kg.

## Using the tables

Tables give $\Phi(z) = P(Z < z)$, the area to the **left** of $z$, for $z \geq 0$, to 4 decimal places. Every other probability comes from symmetry and the fact that the total area is 1.

| Probability wanted | Use |
|---|---|
| $P(Z < a)$, $a > 0$ | $\Phi(a)$ |
| $P(Z > a)$ | $1 - \Phi(a)$ |
| $P(Z < -a)$ | $1 - \Phi(a)$ (by symmetry) |
| $P(Z > -a)$ | $\Phi(a)$ |
| $P(a < Z < b)$ | $\Phi(b) - \Phi(a)$ |

:::worked-solution[Example 1: Z ~ N(0, 1). Find P(Z < 1.24), P(Z < −0.65), P(Z > −0.65) and P(−0.5 < Z < 1.2).]
1. $P(Z < 1.24) = \Phi(1.24) = 0.8925$.
2. $P(Z < -0.65) = 1 - \Phi(0.65) = 1 - 0.7422 = 0.2578$.
3. $P(Z > -0.65) = \Phi(0.65) = 0.7422$.
4. $P(-0.5 < Z < 1.2) = \Phi(1.2) - [1 - \Phi(0.5)] = 0.8849 - 0.3085 = 0.5764$.
:::

A quick sketch of the bell curve with the required area shaded prevents most sign errors: shade first, then decide which table value to use.

## Probabilities for any normal distribution

To find a probability for $X \sim N(\mu, \sigma^2)$, standardise the boundary values, then use the tables.

:::worked-solution[Example 2: the lengths, X cm, of bream caught in a Lake Kariba fishery are modelled by X ~ N(50, 16). Find the probability that a bream is longer than 55 cm.]
1. $\mu = 50$, $\sigma^2 = 16$, so $\sigma = 4$.
2. $z = \frac{55 - 50}{4} = 1.25$.
3. $P(X > 55) = P(Z > 1.25) = 1 - \Phi(1.25) = 1 - 0.8944 = 0.1056$.
:::

![Normal curve for bream lengths X ~ N(50, 16), mean 50 cm and standard deviation 4 cm: the shaded upper tail beyond x = 55 cm (z = 1.25) has area 0.1056, the probability that a bream is longer than 55 cm.](media:diagrams/normal-bream-longer-than-55.png "Figure: P(X > 55) is the shaded tail beyond z = 1.25, which is 1 − 0.8944 = 0.1056")

:::worked-solution[Example 3: for the same fish, find P(46 < X < 53).]
1. $z_1 = \frac{46 - 50}{4} = -1$ and $z_2 = \frac{53 - 50}{4} = 0.75$.
2. $P(-1 < Z < 0.75) = \Phi(0.75) - [1 - \Phi(1)] = 0.7734 - 0.1587 = 0.6147$.
3. About 61% of the bream are between 46 cm and 53 cm long.
:::

![Normal curve for X ~ N(50, 16): the shaded area between x = 46 (z = -1) and x = 53 (z = 0.75) is 0.7734 - 0.1587 = 0.6147, so about 61% of bream are between 46 cm and 53 cm long.](media:diagrams/normal-bream-between-46-and-53.png "Figure: P(46 < X < 53) is the shaded area between z = −1 and z = 0.75, which is 0.6147")

## Reverse use of the tables

Sometimes the probability is given and a value of $x$ is wanted: "90% of bream are shorter than what length?" Read the table **backwards** to find $z$, then **un-standardise** with $x = \mu + z\sigma$.

:::worked-solution[Example 4: for X ~ N(50, 16), find the length x such that 90% of bream are shorter than x, and the length exceeded by only 5% of bream.]
1. $P(X < x) = 0.9$, so $\Phi(z) = 0.9$. From the table, $z = 1.282$.
2. $x = 50 + 1.282 \times 4 = 55.1$ cm (3 s.f.).
3. Only 5% exceed $x$: $P(X > x) = 0.05$, so $\Phi(z) = 0.95$ and $z = 1.645$.
4. $x = 50 + 1.645 \times 4 = 56.58 \approx 56.6$ cm.
:::

If the probability to the left is **less** than 0.5, the $z$-value is negative: for $P(X < x) = 0.2$, use $\Phi(0.8416) = 0.8$ to get $z = -0.8416$.

Some values are used so often that they are worth knowing: $\Phi(1.645) = 0.95$, $\Phi(1.96) = 0.975$ and $\Phi(2.576) = 0.995$.

:::keyfact{title="ZIMSEC and Cambridge"}
The normal distribution is part of ZIMSEC Paper 2 (Probability and Statistics); candidates use four-figure standard normal tables. Cambridge 0606 does not examine statistics.
:::

## Common mistakes

:::mistake{title="Using the variance as the standard deviation"}
In $N(50, 16)$ the standard deviation is $\sqrt{16} = 4$, not 16. Always take the square root before standardising.
:::

:::mistake{title="Forgetting 1 − Φ"}
The table gives the area to the left. For "more than", subtract from 1.
:::

:::mistake{title="Negative z in the table"}
Tables list only $z \geq 0$. For a negative $z$, use symmetry: $\Phi(-a) = 1 - \Phi(a)$.
:::

:::mistake{title="Wrong sign in reverse problems"}
If the area to the left is below 0.5, $x$ is below the mean, so $z$ must be negative.
:::

## Exam tips

:::exam-tip
Write the standardisation in full, such as $P\left(Z > \frac{55 - 50}{4}\right) = P(Z > 1.25)$, before using the tables: it earns the method mark even if a table value is misread.
:::

:::exam-tip
Draw and shade a quick bell curve for each probability. It shows immediately whether your answer should be more or less than 0.5.
:::

:::exam-tip
Give probabilities to 4 decimal places (as read from the tables) or 3 significant figures, and values of $x$ to 3 significant figures with units.
:::

## Summary

:::summary
- $X \sim N(\mu, \sigma^2)$ is bell-shaped and symmetrical about $\mu$; about 68%, 95% and 99.7% of values lie within 1, 2 and 3 standard deviations.
- Standardise with $Z = \frac{X - \mu}{\sigma}$; tables give $\Phi(z) = P(Z < z)$.
- Use $1 - \Phi(z)$ for "greater than" and symmetry for negative $z$.
- Reverse problems: probability → $z$ (from the tables) → $x = \mu + z\sigma$.
:::
