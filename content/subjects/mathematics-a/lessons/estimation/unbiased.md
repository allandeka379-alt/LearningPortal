---
{
  "key": "estimation.unbiased",
  "title": "Unbiased estimates of the population mean and variance",
  "summary": "Calculate unbiased estimates of a population mean and variance from raw data, frequency tables, summary sums and coded sums, understand why the divisor is n − 1, and convert between the sample variance and the unbiased estimate.",
  "concepts": ["amaths.estimation.unbiased"],
  "estimatedMinutes": 40,
  "level": "core"
}
---
## Introduction

A sample is taken to estimate something about the population: the mean yield of a maize variety, the variance of the masses a filling machine produces. A sample statistic used for this purpose is an **estimator**, and its value for a particular sample is an **estimate**. Some estimators are systematically too high or too low; the ones we use are chosen to be right **on average**.

ZIMSEC examines this in Statistics Form 5 (topic 6.7.1), together with the sample mean, variance and standard deviation. Cambridge examines it in Paper 6 (topic 6.4), where unbiased estimates feed straight into confidence intervals and hypothesis tests. MF19 prints the formula for the unbiased variance estimate.

## Key definitions

:::definition{term="Unbiased estimator"}
A statistic $T$ is an unbiased estimator of a parameter $\theta$ if $\mathrm{E}(T) = \theta$: averaged over all possible samples, it gives the true value.
:::

:::formula{name="Unbiased estimate of the population mean"}
$$
\bar{x} = \frac{\sum x}{n}
$$
:::

:::formula{name="Unbiased estimate of the population variance"}
$$
s^2 = \frac{1}{n - 1}\sum (x - \bar{x})^2 = \frac{1}{n - 1}\left(\sum x^2 - \frac{(\sum x)^2}{n}\right)
$$
:::

The **sample variance** (divisor $n$) is $\frac{\sum x^2}{n} - \bar{x}^2$, and $s^2 = \frac{n}{n - 1} \times$ sample variance.

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards use $s^2$ with divisor $n - 1$ for estimates. ZIMSEC also asks for the sample variance and standard deviation with divisor $n$, so read the question: "sample variance" or "variance of the sample" means divisor $n$; "unbiased estimate of the population variance" means divisor $n - 1$.
:::

## Why divide by n − 1?

Deviations are measured from $\bar{x}$, which is calculated from the same data and is always the point that makes $\sum (x - a)^2$ smallest. So $\sum (x - \bar{x})^2$ is, on average, smaller than $\sum (x - \mu)^2$. It can be shown that
$$
\mathrm{E}\left(\sum (X - \bar{X})^2\right) = (n - 1)\sigma^2,
$$
so dividing by $n - 1$ gives an estimator whose expected value is exactly $\sigma^2$. Another way to see it: once $\bar{x}$ is fixed, only $n - 1$ of the deviations are free (they must add to zero). For large samples the difference between the two divisors is small, but for small samples it matters.

## Estimates from raw data

:::worked-solution[Example 1: The masses, in kg, of six randomly chosen pumpkins are 4.2, 3.8, 5.1, 4.6, 3.9, 4.4. Find the sample variance and unbiased estimates of the population mean and variance.]
1. $\sum x = 26$ and $\sum x^2 = 113.82$.
2. $\bar{x} = \frac{26}{6} = 4.333$ kg (unbiased estimate of $\mu$).
3. Sample variance $= \frac{113.82}{6} - 4.3333^2 = 0.1922$.
4. $s^2 = \frac{1}{5}\left(113.82 - \frac{26^2}{6}\right) = \frac{1.1533}{5} = 0.2307$.
5. Check: $\frac{6}{5} \times 0.1922 = 0.2307$.
:::

## Estimates from summaries and coded data

Many questions give only $n$, $\sum x$ and $\sum x^2$. Substitute directly into the formula. If the data have been **coded** as $y = x - a$, then $\bar{x} = \bar{y} + a$ but the variance is unchanged, because shifting every value moves the mean but not the spread. If $y = \frac{x - a}{c}$, then $\bar{x} = c\bar{y} + a$ and $s_x^2 = c^2 s_y^2$.

:::worked-solution[Example 2: A random sample of 40 journey times, $x$ minutes, gives $\sum x = 1260$ and $\sum x^2 = 40500$. Find unbiased estimates of the population mean and variance.]
1. $\bar{x} = \frac{1260}{40} = 31.5$ minutes.
2. $\frac{(\sum x)^2}{n} = \frac{1260^2}{40} = 39690$.
3. $s^2 = \frac{1}{39}(40500 - 39690) = \frac{810}{39} = 20.77$ (to 4 s.f.).
:::

:::worked-solution[Example 3: The lengths, $x$ mm, of 25 bolts are coded as $y = x - 200$, giving $\sum y = -15$ and $\sum y^2 = 289$. Find unbiased estimates of the mean and variance of the lengths.]
1. $\bar{y} = \frac{-15}{25} = -0.6$, so $\bar{x} = 200 - 0.6 = 199.4$ mm.
2. $s_y^2 = \frac{1}{24}\left(289 - \frac{(-15)^2}{25}\right) = \frac{289 - 9}{24} = \frac{280}{24} = 11.67$.
3. Coding by subtraction does not change the variance, so $s_x^2 = 11.67$ mm$^2$.
:::

## Frequency tables and combined samples

For a frequency table use $n = \sum f$, $\sum fx$ and $\sum fx^2$. For example, scores 1, 2, 3, 4 with frequencies 12, 15, 9, 4 give $n = 40$, $\sum fx = 85$, $\sum fx^2 = 217$, so $\bar{x} = 2.125$ and $s^2 = \frac{1}{39}\left(217 - \frac{85^2}{40}\right) = 0.933$.

To combine two samples from the same population, **add** their $n$'s, $\sum x$'s and $\sum x^2$'s and use the formula once. Averaging two separate variance estimates is wrong: it ignores the different sample sizes and the difference between the two sample means.

For example, Tendai's sample has $n = 12$, $\sum x = 96$, $\sum x^2 = 800$ and Rudo's has $n = 8$, $\sum x = 70$, $\sum x^2 = 640$. Separately, the estimates of the variance are $2.909$ and $3.929$. Combined, $n = 20$, $\sum x = 166$ and $\sum x^2 = 1440$, so
$$
\bar{x} = 8.3, \qquad s^2 = \frac{1}{19}\left(1440 - \frac{166^2}{20}\right) = \frac{62.2}{19} = 3.274.
$$
The simple average of the two separate estimates, $3.419$, is not the same: it gives Rudo's smaller sample as much weight as Tendai's, and it misses the extra spread that comes from the two samples having different means (8 and 8.75).

## Choosing what to report

An unbiased estimate is not the only sensible summary. The sample variance (divisor $n$) describes the spread of the data actually collected, and is what ZIMSEC means by "the variance of the sample". The unbiased estimate $s^2$ is the better guess at the spread of the whole population, and is the one used in confidence intervals and tests. Read the wording carefully and say which one you are calculating.

## Common mistakes

:::mistake{title="Dividing by n for an unbiased estimate"}
"Unbiased estimate of the population variance" always means divisor $n - 1$.
:::

:::mistake{title="Adding the coding constant to the variance"}
With $y = x - a$, only the mean changes. The variance is the same for $x$ and $y$.
:::

:::mistake{title="Rounding too early"}
Keep full calculator values of $\frac{(\sum x)^2}{n}$; subtracting two large, rounded numbers can destroy the accuracy of $s^2$.
:::

:::mistake{title="Confusing s² with s"}
The unbiased estimate of the variance is $s^2$; an estimate of the standard deviation is $s = \sqrt{s^2}$.
:::

## Exam tips

:::exam-tip
Write the formula with the numbers substituted before giving the answer; a slip in $\sum x^2$ then still earns method marks.
:::

:::exam-tip
If a later part needs a standard error, use $\sqrt{\frac{s^2}{n}}$ with your unbiased estimate.
:::

:::exam-tip
"Explain what is meant by unbiased" needs the idea of an average over many samples equal to the true value, not "the sample was chosen fairly".
:::

## Summary

:::summary
- Unbiased: $\mathrm{E}(T) = \theta$, correct on average over all samples.
- $\bar{x} = \frac{\sum x}{n}$; $s^2 = \frac{1}{n - 1}\left(\sum x^2 - \frac{(\sum x)^2}{n}\right)$.
- $s^2 = \frac{n}{n - 1} \times$ sample variance (divisor $n$).
- Coding $y = x - a$ changes the mean only; $y = \frac{x - a}{c}$ scales the variance by $c^2$.
- Combine samples by adding $n$, $\sum x$ and $\sum x^2$.
:::
