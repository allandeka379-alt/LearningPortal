---
{
  "key": "normal.probabilities",
  "title": "The normal distribution: standardising and finding probabilities",
  "summary": "Describe the normal curve and when it models a continuous variable, standardise with Z = (X − μ)/σ, and use normal tables to find probabilities above, below and between values, with sketches to guide the working.",
  "concepts": ["amaths.normal.probabilities"],
  "estimatedMinutes": 40,
  "level": "core"
}
---
## Introduction

Heights of learners, masses of oranges from a farm in Mazowe, the volume of drink in a can, the time a kombi takes from Harare to Chitungwiza: many continuous measurements cluster around an average, with values further away becoming steadily rarer. The **normal distribution** models this bell-shaped pattern. It is the most important distribution in statistics, used for approximations, confidence intervals and hypothesis tests later in the course.

This lesson covers ZIMSEC Statistics (Form 5, topic 6.5.3) and Cambridge 9709 Paper 5 (topic 5.5). Both boards supply a table of the standard normal function $\Phi(z)$; in this course table values are computed in code and quoted to 4 decimal places, as in printed tables.

## Key definitions

:::definition{term="Normal distribution"}
$X \sim \mathrm{N}(\mu, \sigma^2)$ is a continuous random variable with mean $\mu$ and variance $\sigma^2$ (standard deviation $\sigma$). Note that the second parameter is the **variance**: $\mathrm{N}(165, 64)$ has $\sigma = 8$.
:::

:::definition{term="Properties of the normal curve"}
- bell-shaped and **symmetrical** about $x = \mu$; mean, median and mode are equal;
- the total area under the curve is 1, and probability is area;
- the curve never touches the $x$-axis, but almost all the area (about 99.7%) lies within $3\sigma$ of the mean; about 95% lies within $2\sigma$ and about 68% within $1\sigma$;
- for a continuous variable, $\mathrm{P}(X = a) = 0$, so $\mathrm{P}(X < a) = \mathrm{P}(X \le a)$.
:::

:::formula{name="Standardising"}
$$
Z = \frac{X - \mu}{\sigma} \sim \mathrm{N}(0, 1)
$$
$\Phi(z) = \mathrm{P}(Z < z)$ is tabulated for $z \ge 0$ (MF19 and ZIMSEC tables). For negative values use symmetry: $\Phi(-z) = 1 - \Phi(z)$.
:::

## Using the table

Every probability reduces to $\Phi$ of a positive number. Always sketch the curve and shade the required area: the sketch tells you whether to use $\Phi(z)$ or $1 - \Phi(z)$.

| Required | Rewrite as |
| --- | --- |
| $\mathrm{P}(Z < a)$, $a > 0$ | $\Phi(a)$ |
| $\mathrm{P}(Z > a)$, $a > 0$ | $1 - \Phi(a)$ |
| $\mathrm{P}(Z < -a)$ | $1 - \Phi(a)$ |
| $\mathrm{P}(Z > -a)$ | $\Phi(a)$ |
| $\mathrm{P}(a < Z < b)$ | $\Phi(b) - \Phi(a)$ |

The standardised value $z$ says how many standard deviations $x$ lies from the mean: $z = 1.25$ means $1.25\sigma$ above it.

## Worked examples

:::worked-solution[Example 1: the heights of Form 5 learners at a school in Gweru are modelled by X ~ N(165, 64), in cm. Find P(X < 175), P(X > 155) and P(153 < X < 171)]
1. $\sigma = \sqrt{64} = 8$.
2. $\mathrm{P}(X < 175) = \mathrm{P}\left(Z < \frac{175 - 165}{8}\right) = \mathrm{P}(Z < 1.25) = \Phi(1.25) = 0.8944$.
3. $\mathrm{P}(X > 155) = \mathrm{P}(Z > -1.25) = \Phi(1.25) = 0.8944$, by symmetry (155 is as far below the mean as 175 is above).
4. $\mathrm{P}(153 < X < 171) = \mathrm{P}(-1.5 < Z < 0.75) = \Phi(0.75) - [1 - \Phi(1.5)]$.
5. $= 0.7734 - (1 - 0.9332) = 0.7734 - 0.0668 = 0.7066$, or $0.707$ to 3 s.f.
:::

Sketch for step 4: a bell curve centred on 165 with the area shaded from 153 (on the left, 1.5 standard deviations below) to 171 (on the right, 0.75 above). The shaded part is "everything left of 171" minus "everything left of 153".

:::worked-solution[Example 2: a machine fills cans with X ml of drink, where X ~ N(330, 2.5²). A can is underweight if it holds less than 326 ml. Find the probability that a can is underweight, and the expected number of underweight cans in a crate of 500]
1. $z = \frac{326 - 330}{2.5} = -1.6$.
2. $\mathrm{P}(X < 326) = \mathrm{P}(Z < -1.6) = 1 - \Phi(1.6) = 1 - 0.9452 = 0.0548$.
3. Expected number in 500 cans: $500 \times 0.0548 = 27.4$, so about 27 cans.
:::

:::worked-solution[Example 3: for the same machine, find the probability that a can holds within 3 ml of 330 ml, and the probability that three cans chosen at random are all underweight]
1. Within 3 ml means $327 < X < 333$: $z = \pm\frac{3}{2.5} = \pm 1.2$.
2. $\mathrm{P}(-1.2 < Z < 1.2) = 2\Phi(1.2) - 1 = 2(0.8849) - 1 = 0.7698$, or $0.770$ to 3 s.f.
3. Three independent cans all underweight: $0.0548^3 = 0.000165$ (3 s.f.).
:::

The last step combines the normal distribution with earlier probability rules. Questions often go further, for example "find the probability that exactly 2 of 5 cans are underweight" (a binomial calculation with $p = 0.0548$).

## When is a normal model sensible?

A normal model suits a continuous variable whose distribution is roughly symmetrical and bell-shaped, with values rare far from the mean. A quick check: almost all values should lie within $\mu \pm 3\sigma$. If a variable cannot be negative (a mass, a time) but $\mu - 3\sigma$ is well below zero, the normal model is poor. A model is an approximation: "the masses are normally distributed" is an assumption, not a fact.

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards examine standardising and finding probabilities from tables, with sketches (ZIMSEC 6.5.3, Cambridge 5.5). Cambridge mark schemes accept probabilities from a calculator or tables to 3 significant figures; ZIMSEC answers are often given to 4 decimal places. Show the standardisation $\frac{x - \mu}{\sigma}$ with numbers substituted, because it carries a method mark on both boards.
:::

## Common mistakes

:::mistake{title="Dividing by the variance"}
In $\mathrm{N}(165, 64)$, divide by $\sigma = 8$, not by 64.
:::

:::mistake{title="The wrong side of the curve"}
$\mathrm{P}(Z > 1.25)$ is $1 - \Phi(1.25)$, not $\Phi(1.25)$. Sketch and shade before reading the table.
:::

:::mistake{title="Negative z in the table"}
Tables give $\Phi(z)$ for $z \ge 0$ only. Write $\Phi(-1.6) = 1 - \Phi(1.6)$.
:::

:::mistake{title="Subtracting areas the wrong way"}
For a probability between two values, subtract the smaller cumulative area from the larger; a negative answer means the order is wrong.
:::

## Exam tips

:::exam-tip
Write the standardisation with numbers, $\mathrm{P}\left(Z < \frac{175 - 165}{8}\right)$, then the table value: both lines earn marks.
:::

:::exam-tip
Give probabilities to 3 significant figures (Cambridge) or as the question asks (often 4 decimal places for ZIMSEC). Do not round $z$ to 1 decimal place.
:::

:::exam-tip
"Sketch" means a bell curve with the mean marked on the axis and the required region shaded; label the $x$ values.
:::

## Summary

:::summary
- $X \sim \mathrm{N}(\mu, \sigma^2)$: symmetrical bell curve, probability = area, $\mathrm{P}(X = a) = 0$.
- Standardise: $Z = \frac{X - \mu}{\sigma} \sim \mathrm{N}(0, 1)$, then use $\Phi(z)$.
- $\mathrm{P}(Z > a) = 1 - \Phi(a)$; $\Phi(-a) = 1 - \Phi(a)$; $\mathrm{P}(a < Z < b) = \Phi(b) - \Phi(a)$.
- Sketch and shade every time; multiply by $n$ for an expected number.
:::
