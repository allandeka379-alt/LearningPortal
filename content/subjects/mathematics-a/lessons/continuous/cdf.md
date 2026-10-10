---
{
  "key": "continuous.cdf",
  "title": "Cumulative distribution functions",
  "summary": "Find the cumulative distribution function F(x) = P(X ≤ x) of a continuous random variable by integrating its pdf (including piecewise pdfs), recover the pdf by differentiating F, and use F for probabilities, medians, quartiles and percentiles.",
  "concepts": ["amaths.continuous.cdf"],
  "estimatedMinutes": 45,
  "level": "core"
}
---
## Introduction

When a pdf is given, every probability needs a fresh integral. The **cumulative distribution function** (cdf) does the integration once: $F(x)$ is the area under the pdf up to $x$, so any probability, the median or any percentile can then be read from one formula. Engineers use cdfs to state "the probability that a pump fails within $t$ hours"; agronomists use them for "the proportion of plots yielding less than 3 tonnes per hectare".

This lesson is for ZIMSEC Statistics Form 5 (topic 6.5.1), which asks learners to obtain the cdf from the pdf by integration and the pdf from the cdf by differentiation. You need the previous lesson on probability density functions and confident integration of polynomials.

## Key definitions

:::definition{term="Cumulative distribution function"}
For a continuous random variable $X$ with pdf $f$,
$$
F(x) = \mathrm{P}(X \le x) = \int_{-\infty}^{x} f(t)\,\mathrm{d}t.
$$
:::

:::formula{name="Links between f and F"}
$$
f(x) = F'(x), \qquad \mathrm{P}(a < X \le b) = F(b) - F(a)
$$
:::

:::keyfact{title="Properties of F"}
$F$ is continuous and non-decreasing; $F(x) = 0$ below the lowest possible value and $F(x) = 1$ above the highest. The median $m$ satisfies $F(m) = 0.5$, the quartiles $F(q) = 0.25$ and $0.75$, and the $p$th percentile $F(x) = \frac{p}{100}$.
:::

Notice the dummy variable $t$ inside the integral: the upper limit is $x$, so the variable of integration needs another name.

## From pdf to cdf

For a pdf defined on one interval $a \le x \le b$, integrate from $a$ to $x$ and write $F$ in three parts: 0 below $a$, the integral on $[a, b]$, and 1 above $b$. Always check that your formula gives $F(a) = 0$ and $F(b) = 1$.

For example, if $f(x) = \frac{x}{2}$ for $0 \le x \le 2$, then for $0 \le x \le 2$,
$$
F(x) = \int_0^x \frac{t}{2}\,\mathrm{d}t = \frac{x^2}{4},
$$
so $F(x) = 0$ for $x < 0$, $\frac{x^2}{4}$ for $0 \le x \le 2$, and $1$ for $x > 2$. Then $\mathrm{P}(0.5 < X < 1.5) = F(1.5) - F(0.5) = 0.5625 - 0.0625 = 0.5$, and the median solves $\frac{m^2}{4} = 0.5$, so $m = \sqrt{2}$.

## Piecewise pdfs

When the pdf changes formula, the cdf on the second piece must **carry forward** the area already accumulated on the first piece. This is the step most often missed.

:::worked-solution[Example 1: $X$ has pdf $f(x) = \frac{1}{4}$ for $0 \le x \le 2$, $f(x) = \frac{1}{4}(4 - x)$ for $2 < x \le 4$, and $0$ otherwise. Find $F(x)$, and hence find $\mathrm{P}(1 < X < 3)$ and the upper quartile.]
1. For $0 \le x \le 2$: $F(x) = \displaystyle\int_0^x \frac{1}{4}\,\mathrm{d}t = \frac{x}{4}$. So $F(2) = \frac{1}{2}$.
2. For $2 < x \le 4$: $F(x) = \dfrac{1}{2} + \displaystyle\int_2^x \frac{4 - t}{4}\,\mathrm{d}t = \frac{1}{2} + \left[t - \frac{t^2}{8}\right]_2^x = \frac{1}{2} + x - \frac{x^2}{8} - \frac{3}{2} = x - \frac{x^2}{8} - 1$.
3. Check: $F(4) = 4 - 2 - 1 = 1$.
4. $\mathrm{P}(1 < X < 3) = F(3) - F(1) = \left(3 - \frac{9}{8} - 1\right) - \frac{1}{4} = 0.875 - 0.25 = 0.625$.
5. Upper quartile: $F(2) = 0.5 < 0.75$, so it lies in $(2, 4]$: $x - \frac{x^2}{8} - 1 = \frac{3}{4}$ gives $x^2 - 8x + 14 = 0$.
6. $x = 4 \pm \sqrt{2}$; only $4 - \sqrt{2} = 2.59$ lies in $(2, 4]$.
:::

So the full cdf is
$$
F(x) = \begin{cases} 0 & x < 0, \\ \frac{x}{4} & 0 \le x \le 2, \\ x - \frac{x^2}{8} - 1 & 2 < x \le 4, \\ 1 & x > 4. \end{cases}
$$
The median is exactly 2, since $F(2) = 0.5$.

## From cdf to pdf

Differentiate each piece of $F$. A quick check that $F$ is a genuine cdf is that $F' \ge 0$ everywhere and $F$ runs from 0 to 1.

:::worked-solution[Example 2: $X$ has cdf $F(x) = \frac{1}{14}(x^3 + 3x)$ for $0 \le x \le 2$, with $F(x) = 0$ for $x < 0$ and $F(x) = 1$ for $x > 2$. (a) Find the pdf. (b) Find $\mathrm{P}(X > 1)$. (c) Show that the median lies between 1.4 and 1.5, and find it correct to 3 significant figures.]
1. (a) $f(x) = F'(x) = \dfrac{1}{14}(3x^2 + 3)$ for $0 \le x \le 2$, and $0$ otherwise.
2. (b) $\mathrm{P}(X > 1) = 1 - F(1) = 1 - \dfrac{4}{14} = \dfrac{5}{7} = 0.714$.
3. (c) The median satisfies $F(m) = 0.5$, i.e. $m^3 + 3m - 7 = 0$.
4. $F(1.4) = \frac{1}{14}(2.744 + 4.2) = 0.496 < 0.5$ and $F(1.5) = \frac{1}{14}(3.375 + 4.5) = 0.5625 > 0.5$; $F$ is continuous and increasing, so $1.4 < m < 1.5$.
5. Solving numerically, $m = 1.406$, so $1.41$ to 3 significant figures.
:::

Percentiles work the same way: the 80th percentile solves $F(x) = 0.8$, giving $x^3 + 3x = 11.2$ and $x = 1.80$.

## Unbounded ranges

A pdf may be defined on an infinite interval such as $x \ge 2$. The cdf then has only two pieces, and it approaches 1 as $x$ grows without ever reaching it. Probabilities in the upper tail are easiest as $1 - F(x)$.

:::worked-solution[Example 3: The lifetime $X$, in thousands of hours, of a pump bearing has cdf $F(x) = 1 - \frac{8}{x^3}$ for $x \ge 2$ and $F(x) = 0$ for $x < 2$. (a) Find the pdf. (b) Find $\mathrm{P}(X > 4)$. (c) Find the median and the interquartile range, correct to 3 significant figures.]
1. (a) $f(x) = F'(x) = \dfrac{24}{x^4}$ for $x \ge 2$, and $0$ for $x < 2$.
2. (b) $\mathrm{P}(X > 4) = 1 - F(4) = \dfrac{8}{64} = 0.125$.
3. (c) Median: $1 - \dfrac{8}{m^3} = 0.5 \Rightarrow m^3 = 16 \Rightarrow m = \sqrt[3]{16} = 2.52$ (thousand hours).
4. Lower quartile: $\dfrac{8}{q_1^3} = 0.75 \Rightarrow q_1^3 = \dfrac{32}{3} \Rightarrow q_1 = 2.2013$.
5. Upper quartile: $\dfrac{8}{q_3^3} = 0.25 \Rightarrow q_3^3 = 32 \Rightarrow q_3 = 3.1748$.
6. Interquartile range $= 3.1748 - 2.2013 = 0.974$ (thousand hours).
:::

The quartiles are not symmetrical about the median ($0.32$ below, $0.65$ above): the long upper tail of a $\frac{24}{x^4}$ density is typical of lifetimes.

## Reading a cdf

Because $F$ accumulates probability, its graph rises from 0 to 1. Steep parts of $F$ are where the pdf is large (many values); flat parts are where the pdf is small. The median is where the graph crosses $0.5$. For a symmetrical pdf the median equals the mean; for a positively skewed pdf $F$ rises steeply early and then levels off slowly.

## Common mistakes

:::mistake{title="Not carrying forward the earlier area"}
On the second piece, $F(x) = F(\text{end of first piece}) + \int$ over the second piece. Forgetting the first area makes $F(4)$ come out less than 1.
:::

:::mistake{title="Leaving out the outer pieces"}
A complete cdf states $F(x) = 0$ below the range and $F(x) = 1$ above it.
:::

:::mistake{title="Solving in the wrong piece"}
First decide which piece contains the percentile by evaluating $F$ at the join; reject roots outside that piece.
:::

:::mistake{title="Confusing F(x) with f(x)"}
$F(x)$ is a probability (an area); $f(x)$ is a density (a height). $\mathrm{P}(X \le 1) = F(1)$, not $f(1)$.
:::

## Exam tips

:::exam-tip
Write the cdf in full with all pieces and their intervals; the "0 for $x < a$" and "1 for $x > b$" lines carry marks.
:::

:::exam-tip
"Show that the median lies between …" needs both values of $F$ at the interval ends compared with 0.5, plus a conclusion.
:::

:::exam-tip
Check your cdf: $F$ equals 0 at the start, 1 at the end, and the pieces agree at each join.
:::

## Summary

:::summary
- $F(x) = \mathrm{P}(X \le x) = \int_{-\infty}^{x} f(t)\,\mathrm{d}t$ and $f(x) = F'(x)$.
- $\mathrm{P}(a < X \le b) = F(b) - F(a)$.
- For a piecewise pdf, carry the accumulated area into the next piece.
- The median solves $F(m) = 0.5$; quartiles and percentiles use $0.25$, $0.75$ and $\frac{p}{100}$.
- A valid cdf is continuous, non-decreasing and runs from 0 to 1.
:::
