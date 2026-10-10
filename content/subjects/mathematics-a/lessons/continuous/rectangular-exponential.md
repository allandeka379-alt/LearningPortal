---
{
  "key": "continuous.rectangular-exponential",
  "title": "The rectangular and exponential distributions",
  "summary": "Use the continuous uniform (rectangular) distribution on [a, b] and the exponential distribution with rate λ: their pdfs and cdfs, probabilities, means, variances (derived by integration, including integration by parts) and medians, in problems on waiting times and lifetimes.",
  "concepts": ["amaths.continuous.rectangular-exponential"],
  "estimatedMinutes": 40,
  "level": "core"
}
---
## Introduction

Two continuous distributions appear again and again in practical statistics. If a kombi leaves a rank every 15 minutes and you arrive at a random moment, your wait is equally likely to be anywhere between 0 and 15 minutes: a **rectangular** (continuous uniform) distribution. If calls arrive at a clinic switchboard at random, the time until the next call has an **exponential** distribution, and so does the lifetime of many electronic components that fail at random rather than wearing out.

ZIMSEC Statistics examines the rectangular distribution in Form 5 and the exponential distribution in Form 6 (topic 6.5.2), including integration by parts for the exponential mean and variance. Cambridge 9709 does not include these distributions, so this lesson is for ZIMSEC candidates. You need the pdf and cdf of a continuous random variable, $\mathrm{E}(X) = \int x f(x)\,\mathrm{d}x$ and $\mathrm{Var}(X) = \mathrm{E}(X^2) - [\mathrm{E}(X)]^2$.

## Key definitions

:::definition{term="Rectangular (continuous uniform) distribution"}
$X \sim \mathrm{U}(a, b)$ has constant pdf on $[a, b]$:
$$
f(x) = \frac{1}{b - a} \quad (a \le x \le b), \qquad f(x) = 0 \text{ otherwise}.
$$
:::

:::definition{term="Exponential distribution"}
$X$ has the exponential distribution with parameter (rate) $\lambda > 0$ if
$$
f(x) = \lambda\mathrm{e}^{-\lambda x} \quad (x \ge 0), \qquad f(x) = 0 \quad (x < 0).
$$
:::

:::formula{name="Summary of results"}
| | Rectangular $\mathrm{U}(a, b)$ | Exponential, rate $\lambda$ |
|---|---|---|
| cdf $F(x)$ | $\dfrac{x - a}{b - a}$ on $[a, b]$ | $1 - \mathrm{e}^{-\lambda x}$ for $x \ge 0$ |
| mean | $\dfrac{a + b}{2}$ | $\dfrac{1}{\lambda}$ |
| variance | $\dfrac{(b - a)^2}{12}$ | $\dfrac{1}{\lambda^2}$ |
| median | $\dfrac{a + b}{2}$ | $\dfrac{\ln 2}{\lambda}$ |
:::

The ZIMSEC syllabus prints no formula list, and questions may ask you to **derive** these results.

## The rectangular distribution

All intervals of the same length inside $[a, b]$ are equally likely, so probabilities are lengths divided by the total length: $\mathrm{P}(c < X < d) = \dfrac{d - c}{b - a}$.

**Variance by integration.** $\mathrm{E}(X^2) = \displaystyle\int_a^b \frac{x^2}{b - a}\,\mathrm{d}x = \frac{b^3 - a^3}{3(b - a)} = \frac{a^2 + ab + b^2}{3}$. Then
$$
\mathrm{Var}(X) = \frac{a^2 + ab + b^2}{3} - \frac{(a + b)^2}{4} = \frac{4a^2 + 4ab + 4b^2 - 3a^2 - 6ab - 3b^2}{12} = \frac{(b - a)^2}{12}.
$$

:::worked-solution[Example 1: A kombi leaves a rank every 15 minutes. Tatenda arrives at a random time, and his waiting time is $W \sim \mathrm{U}(0, 15)$ minutes. Find the probability that he waits more than 10 minutes, and the mean and standard deviation of his waiting time.]
1. $f(w) = \dfrac{1}{15}$ for $0 \le w \le 15$.
2. $\mathrm{P}(W > 10) = \dfrac{15 - 10}{15} = \dfrac{1}{3} = 0.333$.
3. $\mathrm{E}(W) = \dfrac{0 + 15}{2} = 7.5$ minutes.
4. $\mathrm{Var}(W) = \dfrac{15^2}{12} = 18.75$, so the standard deviation is $\sqrt{18.75} = 4.33$ minutes.
:::

Rounding errors are a classic rectangular variable: a length measured to the nearest centimetre has a rounding error uniformly distributed on $[-0.5, 0.5]$ cm, with mean 0 and variance $\frac{1}{12}$.

## The exponential distribution

The cdf is $F(x) = \displaystyle\int_0^x \lambda\mathrm{e}^{-\lambda t}\,\mathrm{d}t = 1 - \mathrm{e}^{-\lambda x}$, so the most useful result is the **survival probability**
$$
\mathrm{P}(X > x) = \mathrm{e}^{-\lambda x}.
$$
The median $m$ solves $\mathrm{e}^{-\lambda m} = \frac{1}{2}$, so $m = \frac{\ln 2}{\lambda}$, which is less than the mean $\frac{1}{\lambda}$: the distribution is positively skewed, with a long right tail.

:::worked-solution[Example 2: The lifetime $T$ years of a solar battery has an exponential distribution with mean 4 years. Find $\mathrm{P}(T > 6)$, $\mathrm{P}(2 < T < 5)$ and the median lifetime.]
1. Mean $\dfrac{1}{\lambda} = 4$, so $\lambda = 0.25$.
2. $\mathrm{P}(T > 6) = \mathrm{e}^{-0.25 \times 6} = \mathrm{e}^{-1.5} = 0.223$.
3. $\mathrm{P}(2 < T < 5) = \mathrm{e}^{-0.5} - \mathrm{e}^{-1.25} = 0.6065 - 0.2865 = 0.320$.
4. Median: $\mathrm{e}^{-0.25m} = 0.5$, so $m = 4\ln 2 = 2.77$ years.
:::

Half the batteries fail before 2.77 years, even though the mean lifetime is 4 years: a few long-lived batteries pull the mean up.

## Mean and variance by integration by parts

:::worked-solution[Example 3: Show that the exponential distribution with rate $\lambda$ has mean $\dfrac{1}{\lambda}$ and variance $\dfrac{1}{\lambda^2}$.]
1. $\mathrm{E}(X) = \displaystyle\int_0^\infty x\lambda\mathrm{e}^{-\lambda x}\,\mathrm{d}x$. By parts with $u = x$, $\frac{\mathrm{d}v}{\mathrm{d}x} = \lambda\mathrm{e}^{-\lambda x}$, $v = -\mathrm{e}^{-\lambda x}$:
2. $\mathrm{E}(X) = \left[-x\mathrm{e}^{-\lambda x}\right]_0^\infty + \displaystyle\int_0^\infty \mathrm{e}^{-\lambda x}\,\mathrm{d}x = 0 + \left[-\frac{1}{\lambda}\mathrm{e}^{-\lambda x}\right]_0^\infty = \frac{1}{\lambda}$.
3. $\mathrm{E}(X^2) = \left[-x^2\mathrm{e}^{-\lambda x}\right]_0^\infty + \displaystyle\int_0^\infty 2x\mathrm{e}^{-\lambda x}\,\mathrm{d}x = 0 + \frac{2}{\lambda}\mathrm{E}(X) = \frac{2}{\lambda^2}$.
4. $\mathrm{Var}(X) = \dfrac{2}{\lambda^2} - \dfrac{1}{\lambda^2} = \dfrac{1}{\lambda^2}$, so the standard deviation equals the mean, $\frac{1}{\lambda}$.
:::

The boundary terms vanish because $x\mathrm{e}^{-\lambda x} \to 0$ as $x \to \infty$ (the exponential decays faster than any power grows).

## Finding the parameter

Questions often give a probability and ask for $\lambda$. If, for example, 40% of components last longer than 3 years, then $\mathrm{e}^{-3\lambda} = 0.4$, so $\lambda = -\frac{\ln 0.4}{3} = 0.305$ per year and the mean lifetime is $\frac{1}{0.305} = 3.27$ years.

The exponential distribution is **memoryless**: $\mathrm{P}(X > s + t \mid X > s) = \frac{\mathrm{e}^{-\lambda(s + t)}}{\mathrm{e}^{-\lambda s}} = \mathrm{e}^{-\lambda t}$. A component that has survived $s$ years is "as good as new". This suits random failures, not wear-out.

## Common mistakes

:::mistake{title="Using the variance formula (b − a)/12"}
The rectangular variance is $\frac{(b - a)^2}{12}$; square the length of the interval.
:::

:::mistake{title="Confusing λ with the mean"}
For the exponential distribution the mean is $\frac{1}{\lambda}$. A mean of 4 years means $\lambda = 0.25$, not 4.
:::

:::mistake{title="Using F(x) for 'more than'"}
$\mathrm{P}(X > x) = \mathrm{e}^{-\lambda x}$ directly; $1 - \mathrm{e}^{-\lambda x}$ is $\mathrm{P}(X \le x)$.
:::

:::mistake{title="Taking the median equal to the mean"}
Only for a symmetrical distribution (such as the rectangular). The exponential median $\frac{\ln 2}{\lambda}$ is smaller than the mean.
:::

## Exam tips

:::exam-tip
Define the distribution in your first line: "$T \sim$ exponential, $\lambda = 0.25$" or "$W \sim \mathrm{U}(0, 15)$". Then each probability needs only one line.
:::

:::exam-tip
In a "show that the mean is $\frac{1}{\lambda}$" question, show the integration by parts, the boundary term going to zero, and the final integral. Give probabilities to 3 significant figures (or 4 decimal places if the question asks).
:::

## Summary

:::summary
- $\mathrm{U}(a, b)$: $f = \frac{1}{b - a}$; probabilities are proportions of length; mean $\frac{a + b}{2}$; variance $\frac{(b - a)^2}{12}$.
- Exponential, rate $\lambda$: $f = \lambda\mathrm{e}^{-\lambda x}$; $\mathrm{P}(X > x) = \mathrm{e}^{-\lambda x}$; mean $\frac{1}{\lambda}$; variance $\frac{1}{\lambda^2}$; median $\frac{\ln 2}{\lambda}$.
- Derive the exponential mean and variance by integration by parts.
- Exponential lifetimes are memoryless.
:::
