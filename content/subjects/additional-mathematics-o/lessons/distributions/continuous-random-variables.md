---
{
  "key": "distributions.continuous-random-variables",
  "title": "Continuous random variables and probability density functions",
  "summary": "Describe a continuous random variable by a probability density function f(x) ≥ 0 with total area 1, find an unknown constant, calculate probabilities as areas P(a < X < b) = ∫f(x) dx, and find E(X) and Var(X) by integration for simple polynomial pdfs.",
  "concepts": ["amath.distributions.continuous-random-variables"],
  "estimatedMinutes": 45,
  "level": "core"
}
---
## Introduction

Some random quantities are **measured**, not counted: the time a learner waits for a kombi in Harare, the mass of a bag of maize meal, the length of a fish caught in Lake Kariba. These can take any value in an interval, so we cannot list the values with their probabilities as we did for discrete variables. Instead, probability is spread continuously along the number line and described by a curve, the **probability density function**.

Probabilities become **areas under the curve**, and areas are found by integration, so this topic uses the calculus you learned in Paper 1. ZIMSEC Paper 2 questions give a pdf with an unknown constant, ask you to find it, then to find probabilities, the mean and the variance. The normal distribution, which comes next, is the most important continuous distribution of all.

## Key definitions

:::definition{term="Continuous random variable"}
A random variable that can take any value in an interval (for example any time from 0 to 10 minutes), rather than separate values.
:::

:::definition{term="Probability density function (pdf)"}
A function $f(x)$ that describes a continuous random variable $X$. It must satisfy $f(x) \geq 0$ for all $x$, and the total area under its graph is 1: $\displaystyle\int f(x)\,dx = 1$ over all the values $X$ can take. Outside that interval, $f(x) = 0$.
:::

:::formula{name="Probability as an area"}
$$
P(a < X < b) = \int_a^b f(x)\,dx
$$
:::

:::formula{name="Mean and variance of a continuous random variable"}
$$
E(X) = \int x f(x)\,dx, \qquad \operatorname{Var}(X) = \int x^2 f(x)\,dx - \left[E(X)\right]^2
$$
:::

These are the continuous versions of $\sum xp$ and $\sum x^2p - \mu^2$: the sum becomes an integral and $p$ becomes $f(x)\,dx$.

## Single values have probability zero

For a continuous variable, $P(X = a) = \int_a^a f(x)\,dx = 0$. The probability of a waiting time of **exactly** 3 minutes (3.000000… minutes) is zero; only intervals have positive probability. One consequence is useful:

$$
P(a < X < b) = P(a \leq X \leq b)
$$

so for continuous variables you need not worry about $<$ against $\leq$. Note also that $f(x)$ itself is a **density**, not a probability, and it may be greater than 1 at some points as long as the total area is 1.

## Finding the constant

:::worked-solution[Example 1: X has pdf f(x) = kx² for 0 ≤ x ≤ 3, and f(x) = 0 otherwise. Find k, P(1 < X < 2), E(X) and Var(X).]
1. Total area: $\displaystyle\int_0^3 kx^2\,dx = k\Big[\tfrac{x^3}{3}\Big]_0^3 = 9k = 1$, so $k = \frac{1}{9}$.
2. $P(1 < X < 2) = \displaystyle\int_1^2 \tfrac{x^2}{9}\,dx = \Big[\tfrac{x^3}{27}\Big]_1^2 = \tfrac{8 - 1}{27} = \tfrac{7}{27}$.
3. $E(X) = \displaystyle\int_0^3 x \cdot \tfrac{x^2}{9}\,dx = \Big[\tfrac{x^4}{36}\Big]_0^3 = \tfrac{81}{36} = \tfrac{9}{4}$.
4. $E(X^2) = \displaystyle\int_0^3 x^2 \cdot \tfrac{x^2}{9}\,dx = \Big[\tfrac{x^5}{45}\Big]_0^3 = \tfrac{243}{45} = \tfrac{27}{5}$.
5. $\operatorname{Var}(X) = \tfrac{27}{5} - \left(\tfrac{9}{4}\right)^2 = \tfrac{432 - 405}{80} = \tfrac{27}{80} = 0.3375$.
:::

The mean $\frac{9}{4} = 2.25$ is above the middle of the interval because the density $kx^2$ increases with $x$: larger values are more likely.

## A decreasing pdf

:::worked-solution[Example 2: the time, X minutes, that a customer waits at a bank counter in Gweru has pdf f(x) = k(4 − x) for 0 ≤ x ≤ 4. Find k, the probability that a customer waits less than 1 minute, and the mean waiting time.]
1. $\displaystyle\int_0^4 k(4 - x)\,dx = k\Big[4x - \tfrac{x^2}{2}\Big]_0^4 = k(16 - 8) = 8k = 1$, so $k = \frac{1}{8}$.
2. (Check with geometry: the graph is a triangle with base 4 and height $4k$, area $\frac{1}{2} \times 4 \times 4k = 8k$.)
3. $P(X < 1) = \displaystyle\int_0^1 \tfrac{4 - x}{8}\,dx = \tfrac{1}{8}\Big[4x - \tfrac{x^2}{2}\Big]_0^1 = \tfrac{1}{8} \times \tfrac{7}{2} = \tfrac{7}{16}$.
4. $E(X) = \displaystyle\int_0^4 \tfrac{x(4 - x)}{8}\,dx = \tfrac{1}{8}\Big[2x^2 - \tfrac{x^3}{3}\Big]_0^4 = \tfrac{1}{8}\left(32 - \tfrac{64}{3}\right) = \tfrac{4}{3}$ minutes.
:::

Describing the graph helps: $f(x) = \frac{4 - x}{8}$ is a straight line from $(0, 0.5)$ down to $(4, 0)$, so short waits are the most likely, and the mean is pulled towards 0.

## Symmetry saves work

If the graph of $f$ is symmetrical about a line $x = c$, then $E(X) = c$ with no integration needed.

:::worked-solution[Example 3: X has pdf f(x) = kx(4 − x) for 0 ≤ x ≤ 4. Show that k = 3/32, find P(X > 3), and state E(X).]
1. $\displaystyle\int_0^4 (4x - x^2)\,dx = \Big[2x^2 - \tfrac{x^3}{3}\Big]_0^4 = 32 - \tfrac{64}{3} = \tfrac{32}{3}$.
2. So $k \times \frac{32}{3} = 1$ and $k = \frac{3}{32}$, as required.
3. $P(X > 3) = \tfrac{3}{32}\Big[2x^2 - \tfrac{x^3}{3}\Big]_3^4 = \tfrac{3}{32}\left(\tfrac{32}{3} - 9\right) = \tfrac{3}{32} \times \tfrac{5}{3} = \tfrac{5}{32}$.
4. The graph is an upside-down parabola with roots 0 and 4, symmetrical about $x = 2$, so $E(X) = 2$.
5. (Integration confirms it: $\int_0^4 x f(x)\,dx = 2$; and $E(X^2) = \frac{24}{5}$, so $\operatorname{Var}(X) = 4.8 - 4 = 0.8$.)
:::

## Reading a pdf in context

Always connect the answers back to the situation. In Example 2, $P(X < 1) = \frac{7}{16}$ means that a little under half of all customers are served within a minute, and the mean wait of $\frac{4}{3}$ minutes (1 minute 20 seconds) is what the bank manager would quote as the "average" wait. A probability above 1, a negative probability, or a mean outside the interval where $f(x)$ is defined is a sure sign of an error.

:::keyfact{title="ZIMSEC and Cambridge"}
Continuous random variables are in ZIMSEC Paper 2 (Probability and Statistics) and use the integration of Paper 1. Cambridge 0606 does not examine probability distributions.
:::

## Common mistakes

:::mistake{title="Treating f(x) as a probability"}
$f(2)$ is a density, not $P(X = 2)$. Probabilities are areas: integrate over an interval.
:::

:::mistake{title="Forgetting the x in E(X)"}
$E(X) = \int x f(x)\,dx$. Integrating $f(x)$ alone always gives 1 over the whole range.
:::

:::mistake{title="Integrating over the wrong limits"}
Use the interval where $f(x)$ is defined. Outside it, $f(x) = 0$ contributes nothing.
:::

:::mistake{title="Not squaring the mean"}
$\operatorname{Var}(X) = E(X^2) - [E(X)]^2$, exactly as for discrete variables.
:::

## Exam tips

:::exam-tip
"Show that $k = \ldots$": write $\int f(x)\,dx = 1$ with the limits, integrate, and solve. Every line is a method mark.
:::

:::exam-tip
Keep $k$ as an exact fraction ($\frac{3}{32}$, not 0.094) all the way through; give final probabilities as fractions or to 3 significant figures.
:::

:::exam-tip
A quick sketch (described in words if needed) of $f(x)$ tells you where most of the probability lies and whether your mean is sensible.
:::

## Summary

:::summary
- A pdf has $f(x) \geq 0$ and total area 1; use $\int f(x)\,dx = 1$ to find unknown constants.
- $P(a < X < b) = \int_a^b f(x)\,dx$; $P(X = a) = 0$, so $<$ and $\leq$ give the same probability.
- $E(X) = \int x f(x)\,dx$ and $\operatorname{Var}(X) = \int x^2 f(x)\,dx - [E(X)]^2$.
- If the pdf is symmetrical about $x = c$, then $E(X) = c$.
:::
