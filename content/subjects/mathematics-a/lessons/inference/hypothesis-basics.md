---
{
  "key": "inference.hypothesis-basics",
  "title": "The language of hypothesis testing",
  "summary": "Understand what a hypothesis test does: write null and alternative hypotheses, choose one- or two-tailed tests, use significance levels, test statistics, p-values and critical regions, and state conclusions in context.",
  "concepts": ["amaths.inference.hypothesis-basics"],
  "estimatedMinutes": 45,
  "freePreview": true,
  "level": "core"
}
---
## Introduction

A seed company says that 30% of its customers come back the following season. A sales manager thinks the figure is now higher. A sample of customers will never settle the question with certainty, because samples vary. A **hypothesis test** is a formal way of deciding whether sample evidence is strong enough to doubt a stated value of a population parameter, while controlling the risk of being wrong.

ZIMSEC examines the ideas of significance testing in Statistics Form 5 (topic 6.8.1). Cambridge examines them in Paper 6 (topic 6.5). The same language is used for every test in the course: tests on a binomial proportion, a Poisson mean (Cambridge), a normal mean and, at ZIMSEC, the $t$ and $\chi^2$ tests.

## Key definitions

:::definition{term="Null hypothesis, H₀"}
The hypothesis that is assumed true during the test. It gives a single value of the parameter, e.g. $H_0: p = 0.3$ or $H_0: \mu = 50$.
:::

:::definition{term="Alternative hypothesis, H₁"}
What we conclude if the evidence is strong enough to reject $H_0$: $H_1: p > 0.3$ or $p < 0.3$ (one-tailed), or $H_1: p \ne 0.3$ (two-tailed).
:::

:::definition{term="Test statistic"}
A quantity calculated from the sample whose distribution is known when $H_0$ is true (the number of successes, a sample mean, a $z$ value).
:::

:::definition{term="Significance level"}
The probability of rejecting $H_0$ when it is in fact true, chosen before the test (commonly 5% or 1%).
:::

:::definition{term="Critical region"}
The set of values of the test statistic that lead to rejecting $H_0$. Its boundary is the **critical value**; the remaining values form the **acceptance region**.
:::

:::definition{term="p-value"}
The probability, assuming $H_0$, of a result at least as extreme as the one observed (in the direction of $H_1$).
:::

## The logic of a test

1. State $H_0$ and $H_1$ in terms of a population parameter, and define it in context.
2. Choose the significance level.
3. Assume $H_0$ is true and find the distribution of the test statistic.
4. Either find the p-value and compare it with the significance level, or find the critical region and see whether the observed value lies in it.
5. Decide: reject $H_0$ or do not reject $H_0$.
6. Conclude in context, without claiming certainty.

The test treats $H_0$ like a person on trial who is presumed innocent: we reject it only when the evidence would be very surprising if it were true. Failing to reject $H_0$ does **not** prove it; there may simply not be enough evidence.

## One-tailed or two-tailed?

The wording of the question decides. "Has increased", "is more than", "is higher": upper tail. "Has decreased", "is less than", "underfilled": lower tail. "Has changed", "is different", "is biased" with no direction: two-tailed, with the significance level split equally between the tails.

:::keyfact{title="Critical z values"}
5% level: one-tailed $1.645$, two-tailed $\pm 1.96$. 1% level: one-tailed $2.326$, two-tailed $\pm 2.576$.
:::

## Worked examples

:::worked-solution[Example 1: A seed company claims that 30% of customers return. A manager believes the proportion is higher. In a random sample of 18 customers, 9 return. Test the claim at the 5% significance level.]
1. Let $p$ be the proportion of customers who return. $H_0: p = 0.3$, $H_1: p > 0.3$ (one-tailed).
2. Under $H_0$, the number who return is $X \sim \mathrm{B}(18, 0.3)$.
3. p-value: $\mathrm{P}(X \ge 9) = 1 - \mathrm{P}(X \le 8) = 0.0596$.
4. $0.0596 > 0.05$, so do not reject $H_0$.
5. There is insufficient evidence at the 5% level that more than 30% of customers return.
:::

Notice that 9 out of 18 (50%) looks well above 30%, yet with such a small sample it could easily happen by chance. The test protects us from over-reading small samples.

:::worked-solution[Example 2: The masses of a population are normal with standard deviation 4 kg. A random sample of 40 has mean 31.2 kg. Test $H_0: \mu = 30$ against $H_1: \mu > 30$ at the 5% level.]
1. Under $H_0$, $\bar{X} \sim \mathrm{N}\left(30, \frac{16}{40}\right)$.
2. Test statistic: $z = \dfrac{31.2 - 30}{4/\sqrt{40}} = 1.897$.
3. Critical value method: $1.897 > 1.645$, so $z$ lies in the critical region.
4. p-value method: $\mathrm{P}(Z \ge 1.897) = 0.0289 < 0.05$ (tables with $z = 1.90$ give $0.0287$).
5. Reject $H_0$: there is evidence at the 5% level that the population mean is greater than 30 kg.
:::

Both methods always agree. Use whichever the question asks for; "find the critical region" requires the critical value method.

:::worked-solution[Example 3: A coin is thrown 20 times to test whether it is biased, and shows 15 heads. Carry out a test at the 5% level.]
1. $H_0: p = 0.5$, $H_1: p \ne 0.5$, where $p$ is the probability of a head (two-tailed: "biased" has no direction).
2. Under $H_0$, $X \sim \mathrm{B}(20, 0.5)$; 15 is in the upper tail.
3. $\mathrm{P}(X \ge 15) = 0.0207$.
4. Two-tailed at 5%: compare with $0.025$. Since $0.0207 < 0.025$, reject $H_0$.
5. There is evidence at the 5% level that the coin is biased.
:::

## Writing conclusions

A full conclusion has two parts: the **decision** about $H_0$ and a **contextual** statement that is not definite. Good: "There is sufficient evidence at the 5% level to suggest that the mean mass has increased." Poor: "$H_0$ is accepted, so the mean is 30" or "this proves the coin is biased".

## Common mistakes

:::mistake{title="Hypotheses about sample values"}
Write $H_0: \mu = 30$, never $H_0: \bar{x} = 30$; hypotheses describe the population.
:::

:::mistake{title="Using the whole significance level in each tail"}
In a two-tailed 5% test, each tail has 2.5%. Compare a one-tail probability with 0.025, or double it.
:::

:::mistake{title="P(X = x) instead of a tail probability"}
The p-value includes the observed value and everything more extreme: $\mathrm{P}(X \ge 9)$, not $\mathrm{P}(X = 9)$.
:::

:::mistake{title="Over-confident conclusions"}
Never "prove" or "accept as true"; say there is (or is not) sufficient evidence.
:::

## Exam tips

:::exam-tip
Define the parameter in words ("$p$ is the proportion of …") when you state hypotheses; this usually carries a mark.
:::

:::exam-tip
Show the comparison explicitly ("$0.0596 > 0.05$") before the decision, and finish with a sentence in context.
:::

:::exam-tip
Decide one- or two-tailed from the wording before doing any calculation.
:::

## Summary

:::summary
- $H_0$ gives one value of the parameter; $H_1$ says how it may differ ($<$, $>$, $\ne$).
- Significance level = P(reject $H_0$ | $H_0$ true); critical region = values leading to rejection.
- p-value = P(result at least as extreme | $H_0$); reject if it is below the significance level (half of it per tail in a two-tailed test).
- Critical $z$: 1.645 / 1.96 at 5%, 2.326 / 2.576 at 1%.
- Conclude with a decision and a non-definite statement in context.
:::
