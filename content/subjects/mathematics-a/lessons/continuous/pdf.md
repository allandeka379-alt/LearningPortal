---
{
  "key": "continuous.pdf",
  "title": "Continuous random variables and probability density functions",
  "summary": "Use a probability density function to find an unknown constant, probabilities, the mean, the variance and percentiles such as the median by integration, and (for ZIMSEC) the mode.",
  "concepts": ["amaths.continuous.pdf"],
  "estimatedMinutes": 50,
  "level": "core"
}
---
## Introduction

The time a borehole pump runs before it fails, the depth of rain in a Harare storm, the distance a seed travels from its parent tree: these are **continuous** random variables. They can take any value in a range, so it makes no sense to ask for the probability of one exact value. Instead, probability is spread over the range like mass along a rod, and a **probability density function** (pdf) describes how densely it is packed. Probabilities are areas under the graph of the pdf, found by integration.

ZIMSEC examines this in Statistics Form 5 (topic 6.5.1). Cambridge examines it in Paper 6 (topic 6.3), using the calculus of Paper 3. You should be fluent at integrating polynomials and powers such as $x^{-4}$, and know $\mathrm{E}(X)$ and $\mathrm{Var}(X)$ for discrete variables.

## Key definitions

:::definition{term="Probability density function"}
A function $f$ with $f(x) \ge 0$ for all $x$ and $\displaystyle\int f(x)\,\mathrm{d}x = 1$ over all possible values. Probabilities are areas: $\mathrm{P}(a < X < b) = \displaystyle\int_a^b f(x)\,\mathrm{d}x$.
:::

:::formula{name="Mean and variance"}
$$
\mathrm{E}(X) = \int x f(x)\,\mathrm{d}x, \qquad \mathrm{Var}(X) = \int x^2 f(x)\,\mathrm{d}x - \left[\mathrm{E}(X)\right]^2
$$
:::

:::definition{term="Median and percentiles"}
The median $m$ satisfies $\displaystyle\int_{\text{lowest}}^{m} f(x)\,\mathrm{d}x = 0.5$. The lower quartile uses $0.25$, the upper quartile $0.75$, and the $p$th percentile $\frac{p}{100}$.
:::

:::definition{term="Mode"}
The value of $x$ at which $f(x)$ is greatest (ZIMSEC only).
:::

MF19 gives the integrals for $\mathrm{E}(X)$ and $\mathrm{Var}(X)$; ZIMSEC prints no list. Each integral is taken over the interval where $f$ is non-zero.

## Properties of a pdf

A pdf is usually written piecewise, for example
$$
f(x) = \begin{cases} k x(4 - x) & 0 \le x \le 4, \\ 0 & \text{otherwise.} \end{cases}
$$
Two properties must hold: $f(x) \ge 0$ everywhere (density cannot be negative), and the total area is 1. Note that $f(x)$ itself can be **greater than 1**; it is a density, not a probability. Because a single point has no width, $\mathrm{P}(X = c) = 0$, and so $\mathrm{P}(X < c) = \mathrm{P}(X \le c)$.

The interval can be infinite. Cambridge's syllabus gives $f(x) = \frac{3}{x^4}$ for $x \ge 1$ as an example: the area from 1 to infinity is finite even though the interval is not.

:::worked-solution[Example 1: $X$ has pdf $f(x) = kx(4 - x)$ for $0 \le x \le 4$ and $0$ otherwise. (a) Find $k$. (b) Find $\mathrm{P}(X < 1)$. (c) Find $\mathrm{E}(X)$ and $\mathrm{Var}(X)$.]
1. (a) $\displaystyle\int_0^4 k(4x - x^2)\,\mathrm{d}x = k\left[2x^2 - \frac{x^3}{3}\right]_0^4 = k\left(32 - \frac{64}{3}\right) = \frac{32k}{3} = 1$, so $k = \frac{3}{32}$.
2. (b) $\mathrm{P}(X < 1) = \dfrac{3}{32}\left[2x^2 - \dfrac{x^3}{3}\right]_0^1 = \dfrac{3}{32} \times \dfrac{5}{3} = \dfrac{5}{32} = 0.156$.
3. (c) The graph is symmetrical about $x = 2$, so $\mathrm{E}(X) = 2$. (Check: $\int_0^4 x f(x)\,\mathrm{d}x = 2$.)
4. $\mathrm{E}(X^2) = \dfrac{3}{32}\displaystyle\int_0^4 (4x^3 - x^4)\,\mathrm{d}x = \dfrac{3}{32}\left[x^4 - \dfrac{x^5}{5}\right]_0^4 = \dfrac{3}{32}(256 - 204.8) = 4.8$.
5. $\mathrm{Var}(X) = 4.8 - 2^2 = 0.8$.
:::

## Medians and percentiles

The median splits the area in half. Write the area from the lowest value up to $m$, set it equal to $0.5$ and solve. Percentiles work the same way with other fractions. Always check that your answer lies inside the interval where $f$ is defined: a cubic equation may have other roots that are not valid.

:::worked-solution[Example 2: $X$ has pdf $f(x) = \dfrac{3}{x^4}$ for $x \ge 1$ and $0$ otherwise. Find (a) $\mathrm{P}(X > 2)$, (b) the median, (c) $\mathrm{E}(X)$ and $\mathrm{Var}(X)$.]
1. (a) $\mathrm{P}(X > 2) = \displaystyle\int_2^\infty 3x^{-4}\,\mathrm{d}x = \left[-x^{-3}\right]_2^\infty = 0 - \left(-\frac{1}{8}\right) = \frac{1}{8}$.
2. (b) $\displaystyle\int_1^m 3x^{-4}\,\mathrm{d}x = 1 - m^{-3} = 0.5$, so $m^3 = 2$ and $m = \sqrt[3]{2} = 1.26$.
3. (c) $\mathrm{E}(X) = \displaystyle\int_1^\infty 3x^{-3}\,\mathrm{d}x = \left[-\frac{3}{2}x^{-2}\right]_1^\infty = \frac{3}{2}$.
4. $\mathrm{E}(X^2) = \displaystyle\int_1^\infty 3x^{-2}\,\mathrm{d}x = \left[-3x^{-1}\right]_1^\infty = 3$, so $\mathrm{Var}(X) = 3 - \frac{9}{4} = \frac{3}{4}$.
:::

Notice that the median (1.26) is less than the mean (1.5): the long tail to the right pulls the mean up. This is how a pdf shows **positive skew**.

## The mode

The mode is where the density is highest. If $f$ has a turning point inside the interval, solve $f'(x) = 0$; if $f$ is increasing (or decreasing) throughout, the mode is at an end of the interval. For $f(x) = \frac{3}{32}x(4 - x)$, $f'(x) = \frac{3}{32}(4 - 2x) = 0$ gives the mode $x = 2$.

:::worked-solution[Example 3: the time, in hours, that a learner spends on homework each evening is modelled by $f(x) = kx^2$ for $0 \le x \le 3$ and $0$ otherwise. (a) Show that $k = \frac{1}{9}$. (b) Find the median and the upper quartile. (c) Find the mean and state the mode.]
1. (a) $\displaystyle\int_0^3 kx^2\,\mathrm{d}x = k\left[\frac{x^3}{3}\right]_0^3 = 9k = 1$, so $k = \frac{1}{9}$ (as required).
2. (b) $\displaystyle\int_0^m \frac{x^2}{9}\,\mathrm{d}x = \frac{m^3}{27} = 0.5$, so $m^3 = 13.5$ and $m = 2.38$ hours.
3. Upper quartile: $\dfrac{q^3}{27} = 0.75$, so $q^3 = 20.25$ and $q = 2.73$ hours.
4. (c) $\mathrm{E}(X) = \displaystyle\int_0^3 \frac{x^3}{9}\,\mathrm{d}x = \left[\frac{x^4}{36}\right]_0^3 = \frac{81}{36} = 2.25$ hours.
5. $f$ is increasing on $[0, 3]$, so the mode is at the right-hand end: 3 hours.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards: properties of a pdf, finding constants, probabilities, mean, variance, median and percentiles. ZIMSEC also asks for the **mode** and uses cumulative distribution functions $F(x)$ (see the next lesson). Cambridge Paper 6 finds medians and percentiles "by direct consideration of area" and does not use $F(x)$ notation.
:::

## Common mistakes

:::mistake{title="Forgetting to subtract the mean squared"}
$\mathrm{Var}(X) = \mathrm{E}(X^2) - [\mathrm{E}(X)]^2$. Stopping at $\mathrm{E}(X^2)$ is a common slip.
:::

:::mistake{title="Thinking f(x) is a probability"}
$f(2) = 0.375$ is a density, not $\mathrm{P}(X = 2)$, which is 0. Densities may exceed 1.
:::

:::mistake{title="Wrong limits for the median"}
Integrate from the **lowest** possible value to $m$, not from 0 when the range starts elsewhere (for example from 1 for $\frac{3}{x^4}$).
:::

:::mistake{title="Taking the mode where f′(x) = 0 is outside the range"}
Check the interval. If $f$ only increases on it, the mode is at the upper end.
:::

## Exam tips

:::exam-tip
"Show that $k = \dots$" needs the integral with limits written out and the equation "$= 1$" stated before solving.
:::

:::exam-tip
Sketch the pdf. Symmetry often gives the mean or median without integration, and the sketch shows the skew.
:::

:::exam-tip
Give exact answers (fractions, cube roots) when they arise and decimals to 3 significant figures otherwise.
:::

## Summary

:::summary
- A pdf satisfies $f(x) \ge 0$ and total area 1; probabilities are areas under $f$.
- $\mathrm{P}(X = c) = 0$, so strict and non-strict inequalities give the same probability.
- $\mathrm{E}(X) = \int x f(x)\,\mathrm{d}x$ and $\mathrm{Var}(X) = \int x^2 f(x)\,\mathrm{d}x - [\mathrm{E}(X)]^2$.
- The median and percentiles come from areas of $0.5$, $0.25$, $0.75$ and so on from the lowest value.
- The mode (ZIMSEC) is where $f$ is greatest: a turning point or an end of the interval.
:::
