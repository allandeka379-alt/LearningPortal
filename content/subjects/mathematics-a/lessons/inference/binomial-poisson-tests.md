---
{
  "key": "inference.binomial-poisson-tests",
  "title": "Hypothesis tests for a binomial proportion and a Poisson mean",
  "summary": "Test a binomial proportion (and, for Cambridge, a Poisson mean) using exact probabilities or a normal approximation, find one- and two-tailed critical regions, and state the actual significance level.",
  "concepts": ["amaths.inference.binomial-poisson-tests"],
  "estimatedMinutes": 50,
  "level": "core"
}
---
## Introduction

Many claims are about a **proportion** ("15% of seeds fail to germinate") or a **rate** ("faults occur at 2.5 per week"). A single observation of a count, such as the number of failed seeds in a sample or the number of faults in a month, can test such a claim. Because counts are discrete, these tests have features that tests on a continuous variable do not: tail probabilities jump in steps, so the actual significance level is usually a little below the nominal one.

ZIMSEC examines tests on a binomial proportion in Statistics Form 5 (topic 6.8.1). Cambridge examines tests on a binomial proportion and on a Poisson mean in Paper 6 (topic 6.5), using exact probabilities or a normal approximation where appropriate. You need the binomial and Poisson distributions and the language of hypothesis testing.

## Key definitions

:::definition{term="Test on a binomial proportion"}
$H_0: p = p_0$ against $H_1: p > p_0$, $p < p_0$ or $p \ne p_0$. The test statistic is the number of successes $X$; under $H_0$, $X \sim \mathrm{B}(n, p_0)$.
:::

:::definition{term="Test on a Poisson mean (Cambridge)"}
$H_0: \lambda = \lambda_0$, with $\lambda_0$ scaled to the period observed. Under $H_0$, the count $X \sim \mathrm{Po}(\lambda_0)$.
:::

:::definition{term="Actual significance level"}
The probability, under $H_0$, of the critical region actually used. For a discrete test it is the largest attainable tail probability not exceeding the nominal level.
:::

:::formula{name="Critical region for a discrete test"}
$$
\text{lower: largest } c \text{ with } \mathrm{P}(X \le c) \le \alpha; \qquad \text{upper: smallest } c \text{ with } \mathrm{P}(X \ge c) \le \alpha
$$
For a two-tailed test use $\frac{\alpha}{2}$ in each tail.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Binomial tests: both boards. Poisson tests, including scaling $\lambda$ and using $\mathrm{N}(\lambda, \lambda)$ when $\lambda > 15$, are Cambridge only.
:::

## Testing with a p-value

:::worked-solution[Example 1: A supplier claims that 10% of its solar lamps are faulty. A shop owner suspects the proportion is higher. In a random sample of 20 lamps, 5 are faulty. Test at the 5% level.]
1. Let $p$ be the proportion of faulty lamps. $H_0: p = 0.1$, $H_1: p > 0.1$.
2. Under $H_0$, $X \sim \mathrm{B}(20, 0.1)$.
3. $\mathrm{P}(X \ge 5) = 1 - \mathrm{P}(X \le 4) = 0.0432$.
4. $0.0432 < 0.05$, so reject $H_0$.
5. There is evidence at the 5% level that more than 10% of the lamps are faulty.
:::

The assumptions behind the binomial model should be stated when asked: lamps are faulty independently of each other, with the same probability, in a fixed sample of 20.

## Finding critical regions

To find a critical region, work along the cumulative probabilities until you pass the significance level. Always quote the two probabilities either side of the boundary; that is the evidence examiners want.

:::worked-solution[Example 2: A test of $H_0: p = 0.4$ against $H_1: p \ne 0.4$ at the 5% level uses $X \sim \mathrm{B}(30, 0.4)$. Find the critical region and the actual significance level.]
1. Two-tailed: 2.5% in each tail.
2. Lower tail: $\mathrm{P}(X \le 6) = 0.0172 \le 0.025$ but $\mathrm{P}(X \le 7) = 0.0435 > 0.025$, so the lower region is $X \le 6$.
3. Upper tail: $\mathrm{P}(X \ge 18) = 0.0212 \le 0.025$ but $\mathrm{P}(X \ge 17) = 0.0481 > 0.025$, so the upper region is $X \ge 18$.
4. Critical region: $X \le 6$ or $X \ge 18$.
5. Actual significance level $= 0.0172 + 0.0212 = 0.0384$, i.e. 3.84%.
:::

The tails are not symmetrical because $p \ne 0.5$, and the actual level (3.84%) is below 5% because no region has probability exactly 2.5% in each tail.

## Tests on a Poisson mean (Cambridge)

First scale the rate to the period observed: if faults occur at 2.5 per week, the number in 3 weeks is $\mathrm{Po}(7.5)$ under $H_0$.

:::worked-solution[Example 3: Breakdowns on a production line used to occur at an average rate of 2.5 per week. After a change of supplier there are 13 breakdowns in 3 weeks. Test at the 5% level whether the rate has increased.]
1. Let $\lambda$ be the mean number of breakdowns in 3 weeks. $H_0: \lambda = 7.5$, $H_1: \lambda > 7.5$.
2. Under $H_0$, $X \sim \mathrm{Po}(7.5)$.
3. $\mathrm{P}(X \ge 13) = 1 - \mathrm{P}(X \le 12) = 1 - 0.9573 = 0.0427$.
4. $0.0427 < 0.05$: reject $H_0$.
5. There is evidence at the 5% level that the breakdown rate has increased.
:::

Twelve breakdowns would not have been enough: $\mathrm{P}(X \ge 12) = 0.0792 > 0.05$. So the critical region is $X \ge 13$.

## Using a normal approximation

When $n$ is large (with $np > 5$ and $nq > 5$), or $\lambda > 15$ for Poisson, exact cumulative probabilities are tedious and a normal approximation with a continuity correction is used: $\mathrm{B}(n, p) \approx \mathrm{N}(np, npq)$ and $\mathrm{Po}(\lambda) \approx \mathrm{N}(\lambda, \lambda)$.

:::worked-solution[Example 4: Nationally, 25% of adults have a particular blood group. In a random sample of 200 adults from one district, 38 have it. Test at the 5% level whether the proportion in the district is lower.]
1. $H_0: p = 0.25$, $H_1: p < 0.25$. Under $H_0$, $X \sim \mathrm{B}(200, 0.25)$.
2. $np = 50$ and $nq = 150$ are both large, so $X \approx \mathrm{N}(50, 37.5)$.
3. With a continuity correction, $\mathrm{P}(X \le 38) \approx \mathrm{P}(Y < 38.5)$.
4. $z = \dfrac{38.5 - 50}{\sqrt{37.5}} = -1.878$, so the probability is $0.0302$.
5. $0.0302 < 0.05$: reject $H_0$. There is evidence at the 5% level that the proportion in the district is lower than 25%.
:::

## Common mistakes

:::mistake{title="Using P(X = x) as the p-value"}
The p-value is a tail probability: $\mathrm{P}(X \ge 5)$, not $\mathrm{P}(X = 5)$.
:::

:::mistake{title="Wrong boundary for an upper tail"}
$\mathrm{P}(X \ge 13) = 1 - \mathrm{P}(X \le 12)$, not $1 - \mathrm{P}(X \le 13)$.
:::

:::mistake{title="Forgetting to scale λ"}
A count over 3 weeks needs $3\lambda$, not the weekly rate.
:::

:::mistake{title="Full α in each tail"}
For a two-tailed test, each tail gets $\frac{\alpha}{2}$.
:::

## Exam tips

:::exam-tip
When finding a critical region, write both cumulative probabilities that bracket the boundary (e.g. $0.0172 \le 0.025 < 0.0435$).
:::

:::exam-tip
"State the actual significance level" means the probability of your critical region under $H_0$, to 3 significant figures or as a percentage.
:::

:::exam-tip
Give the conclusion in context, and for Poisson tests mention the period ("in 3 weeks").
:::

## Summary

:::summary
- Binomial test: $X \sim \mathrm{B}(n, p_0)$ under $H_0$; Poisson test (Cambridge): $X \sim \mathrm{Po}(\lambda_0)$ with $\lambda_0$ scaled to the period.
- p-value: tail probability including the observed value; compare with $\alpha$ (or $\frac{\alpha}{2}$ per tail).
- Critical region: work from the tail inwards; quote the bracketing probabilities.
- Actual significance level is usually below the nominal level for discrete tests.
- Large samples: normal approximation with continuity correction.
:::
