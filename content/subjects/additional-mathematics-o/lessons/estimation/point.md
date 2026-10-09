---
{
  "key": "estimation.point",
  "title": "Point estimates: unbiased estimators of the mean and variance",
  "summary": "Understand estimators and estimates, calculate unbiased estimates of a population mean (x̄) and variance (s² with divisor n − 1) from raw data and from Σx and Σx², convert a sample variance with divisor n, and find the standard error of the mean σ/√n.",
  "concepts": ["amath.estimation.point"],
  "estimatedMinutes": 40,
  "level": "core"
}
---
## Introduction

We almost never know the true mean or variance of a population. What is the average mass of oranges from an orchard in Mazowe? What is the variance of the yields of maize plots across Mashonaland? To answer, we take a sample and use it to **estimate** the population values. A single number used as an estimate is a **point estimate**.

Estimation matters because decisions are made on these numbers: how much fertiliser to order, whether a machine is filling packets correctly, how much variation a crop shows. The ZIMSEC syllabus asks you to recognise why estimation is important and to calculate **unbiased** estimates of the population mean and variance, from raw data or from summary statistics, together with the standard error of the mean. These are the ingredients of the confidence intervals in the next lesson.

## Key definitions

:::definition{term="Parameter and statistic"}
A **parameter** is a number describing the population (such as $\mu$ or $\sigma^2$); it is usually unknown. A **statistic** is a number calculated from a sample (such as $\bar{x}$); it is known once the sample is taken.
:::

:::definition{term="Estimator and estimate"}
An **estimator** is a rule (a formula) for calculating an estimate of a parameter from a sample, for example "add the values and divide by $n$". An **estimate** is the number the rule gives for a particular sample.
:::

:::definition{term="Unbiased estimator"}
An estimator is **unbiased** if its expected value equals the parameter: on average over all possible samples it is neither too high nor too low. The sample mean is unbiased for $\mu$ because $E(\bar{X}) = \mu$.
:::

:::formula{name="Unbiased estimates of the population mean and variance"}
$$
\hat{\mu} = \bar{x} = \frac{\sum x}{n}, \qquad s^2 = \frac{\sum (x - \bar{x})^2}{n - 1} = \frac{1}{n - 1}\left(\sum x^2 - \frac{\left(\sum x\right)^2}{n}\right)
$$
:::

:::formula{name="Standard error of the mean"}
$$
\text{standard error} = \frac{\sigma}{\sqrt{n}} \approx \frac{s}{\sqrt{n}}
$$
:::

## Why divide by n − 1?

The variance of the sample data, with divisor $n$, measures spread about the **sample** mean $\bar{x}$. But $\bar{x}$ is calculated from the same data, so the values are always as close as possible to it; the spread about the true mean $\mu$ is, on average, a little larger. Dividing by $n$ therefore **underestimates** $\sigma^2$ on average. Dividing by $n - 1$ instead corrects this exactly, which is why $s^2$ is called the unbiased estimate.

The two are linked by

$$
s^2 = \frac{n}{n - 1} \times (\text{sample variance with divisor } n)
$$

For large samples the difference is small, but for small samples it matters, and examiners check which divisor you use. Read questions carefully: "the variance of the sample" means divisor $n$; "an unbiased estimate of the population variance" means divisor $n - 1$.

## Estimates from raw data

:::worked-solution[Example 1: the masses, in grams, of a random sample of 8 oranges from an orchard in Mazowe are 142, 155, 138, 160, 149, 151, 144, 153. Find unbiased estimates of the population mean and variance.]
1. $\sum x = 1192$, so $\bar{x} = \frac{1192}{8} = 149$ g.
2. Deviations from 149: $-7, 6, -11, 11, 0, 2, -5, 4$.
3. Squares: $49, 36, 121, 121, 0, 4, 25, 16$, total $\sum (x - \bar{x})^2 = 372$.
4. $s^2 = \frac{372}{8 - 1} = \frac{372}{7} = 53.1$ g² (3 s.f.).
5. For comparison, the sample variance with divisor 8 is $\frac{372}{8} = 46.5$, smaller, as expected.
:::

## Estimates from summary statistics

Questions often give only $n$, $\sum x$ and $\sum x^2$. Use the second form of the formula.

:::worked-solution[Example 2: for a random sample of 40 maize plots, the yields x (in bags) give Σx = 1520 and Σx² = 59 800. Find unbiased estimates of the population mean and variance, and the standard error of the mean.]
1. $\bar{x} = \frac{1520}{40} = 38$ bags.
2. $\sum x^2 - \frac{(\sum x)^2}{n} = 59\,800 - \frac{1520^2}{40} = 59\,800 - 57\,760 = 2040$.
3. $s^2 = \frac{2040}{39} = 52.3$ (3 s.f.).
4. Standard error $\approx \frac{s}{\sqrt{n}} = \sqrt{\frac{52.31}{40}} = 1.14$ bags.
:::

## Converting a given sample variance

:::worked-solution[Example 3: a sample of 15 bolts has variance 12.6 mm² (calculated with divisor 15). Find an unbiased estimate of the population variance.]
1. $s^2 = \frac{n}{n - 1} \times 12.6 = \frac{15}{14} \times 12.6$.
2. $s^2 = 13.5$ mm².
:::

## The standard error of the mean

The standard error $\frac{\sigma}{\sqrt{n}}$ measures how precisely $\bar{x}$ estimates $\mu$: it is the standard deviation of the sample mean. When $\sigma$ is unknown, use $s$ in its place. A small standard error means the estimate is precise. Because of the $\sqrt{n}$, increasing the sample size improves precision, but with diminishing returns: four times the data halves the standard error.

## Why estimation matters

- A census is often impossible or too expensive, so decisions must rest on samples.
- A point estimate gives a single best guess, but on its own it says nothing about how reliable it is. The standard error adds that information, and confidence intervals (next lesson) combine the two.
- Unbiased estimators are preferred because they are right on average; their errors do not all lean the same way.

:::keyfact{title="ZIMSEC and Cambridge"}
Unbiased estimates of the mean and variance and the standard error are in ZIMSEC Paper 2 (Probability and Statistics). Cambridge 0606 does not examine statistics.
:::

## Common mistakes

:::mistake{title="Using divisor n for an unbiased estimate"}
An unbiased estimate of $\sigma^2$ divides by $n - 1$. Dividing by $n$ gives the (biased) sample variance.
:::

:::mistake{title="Forgetting to square Σx"}
In $\sum x^2 - \frac{(\sum x)^2}{n}$, the sum is squared **after** adding: $1520^2$, not $\sum x^2$ again.
:::

:::mistake{title="Confusing the standard error with the standard deviation"}
$s$ describes the spread of individual values; $\frac{s}{\sqrt{n}}$ describes the spread of sample means.
:::

:::mistake{title="Rounding too early"}
Keep $\bar{x}$ and $s^2$ unrounded until the end; small rounding errors in $\sum x^2 - \frac{(\sum x)^2}{n}$ can be large.
:::

## Exam tips

:::exam-tip
Write the formula with $n - 1$ before substituting; it shows the examiner you know which estimate is required.
:::

:::exam-tip
If the question says "use your calculator", still show $\sum x$ and $\sum x^2$ (or $\sum(x - \bar{x})^2$) so that method marks can be given.
:::

:::exam-tip
Give units where they apply: the variance has squared units (g², mm²), the mean and standard error have the original units.
:::

## Summary

:::summary
- A point estimate is a single value estimating a population parameter; an estimator is the rule that produces it.
- Unbiased estimate of $\mu$: $\bar{x} = \frac{\sum x}{n}$.
- Unbiased estimate of $\sigma^2$: $s^2 = \frac{1}{n - 1}\left(\sum x^2 - \frac{(\sum x)^2}{n}\right) = \frac{n}{n - 1} \times$ (sample variance).
- The standard error of the mean is $\frac{\sigma}{\sqrt{n}}$, estimated by $\frac{s}{\sqrt{n}}$.
:::
