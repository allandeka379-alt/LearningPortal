---
{
  "key": "inference.errors",
  "title": "Type I and Type II errors",
  "summary": "Define Type I and Type II errors in context, calculate their probabilities for tests based on the normal distribution and on binomial (and, for Cambridge, Poisson) probabilities, and explain how the significance level and sample size affect them.",
  "concepts": ["amaths.inference.errors"],
  "estimatedMinutes": 45,
  "level": "core"
}
---
## Introduction

Every hypothesis test can reach the wrong decision. A clinic might decide a new malaria test is better when it is not, and spend money replacing equipment; or it might miss a genuine improvement and keep using an inferior test. These two kinds of mistake have names, Type I and Type II errors, and their probabilities can be calculated. Understanding them explains why the significance level is chosen with care and why larger samples give better tests.

ZIMSEC examines Type I and Type II errors in Statistics Form 5 (topic 6.8.1). Cambridge examines them in Paper 6 (topic 6.5) for tests based on the normal distribution and on binomial and Poisson probabilities. You need the earlier lessons on hypothesis tests.

## Key definitions

:::definition{term="Type I error"}
Rejecting $H_0$ when $H_0$ is true.
:::

:::definition{term="Type II error"}
Not rejecting $H_0$ when $H_0$ is false.
:::

| | $H_0$ true | $H_0$ false |
|---|---|---|
| Reject $H_0$ | Type I error | correct decision |
| Do not reject $H_0$ | correct decision | Type II error |

:::formula{name="Error probabilities"}
$$
\mathrm{P}(\text{Type I}) = \mathrm{P}(\text{test statistic in critical region} \mid H_0 \text{ true})
$$
$$
\mathrm{P}(\text{Type II}) = \mathrm{P}(\text{test statistic not in critical region} \mid \text{the true parameter value})
$$
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards examine normal and binomial cases. Type I and II errors for Poisson tests are Cambridge only.
:::

## Type I errors

For a test with a continuous test statistic (a z-test), the critical region is chosen to have probability exactly $\alpha$ under $H_0$, so $\mathrm{P}(\text{Type I}) = \alpha$. For a discrete test (binomial or Poisson), $\mathrm{P}(\text{Type I})$ is the **actual significance level**, the probability of the critical region, which is usually less than $\alpha$.

## Type II errors

A Type II error depends on what the true parameter value is, so a question always gives one (for example, "the true proportion is 0.2"). The method has three steps:

1. Find the critical region using $H_0$.
2. Switch to the distribution with the **true** parameter value.
3. Find the probability that the test statistic falls **outside** the critical region.

## Worked examples

:::worked-solution[Example 1: A test of $H_0: p = 0.4$ against $H_1: p < 0.4$ at the 5% level uses $X \sim \mathrm{B}(20, 0.4)$. Find the critical region and the probability of a Type I error. Then find the probability of a Type II error when $p = 0.2$.]
1. $\mathrm{P}(X \le 3) = 0.0160 \le 0.05$ and $\mathrm{P}(X \le 4) = 0.0510 > 0.05$, so the critical region is $X \le 3$.
2. $\mathrm{P}(\text{Type I}) = \mathrm{P}(X \le 3 \mid p = 0.4) = 0.0160$.
3. When $p = 0.2$, $X \sim \mathrm{B}(20, 0.2)$.
4. A Type II error happens if $X \ge 4$: $\mathrm{P}(X \ge 4 \mid p = 0.2) = 1 - \mathrm{P}(X \le 3) = 0.589$.
:::

Even though the true proportion (0.2) is only half the claimed one, this small test misses it more than half the time. Small samples give weak tests.

:::worked-solution[Example 2: A population is normal with standard deviation 10. A test of $H_0: \mu = 120$ against $H_1: \mu > 120$ at the 5% level uses a sample of 25. Find the critical region for $\bar{x}$ and the probability of a Type II error when $\mu = 124$.]
1. Standard error $= \frac{10}{5} = 2$. Reject $H_0$ if $\bar{x} > 120 + 1.645 \times 2 = 123.29$.
2. $\mathrm{P}(\text{Type I}) = 0.05$ exactly, because the test is continuous.
3. When $\mu = 124$, $\bar{X} \sim \mathrm{N}(124, 2^2)$.
4. Type II: $\mathrm{P}(\bar{X} \le 123.29) = \Phi\left(\dfrac{123.29 - 124}{2}\right) = \Phi(-0.355) = 0.361$ (tables with $z = -0.36$ give $0.359$).
:::

:::worked-solution[Example 3 (Cambridge): Under $H_0$, the number of calls to a helpline per hour is $\mathrm{Po}(4)$. A test of $H_0: \lambda = 4$ against $H_1: \lambda > 4$ at the 5% level uses one hour's count. Find the probability of a Type I error, and of a Type II error when $\lambda = 7$.]
1. $\mathrm{P}(X \ge 8) > 0.05$ but $\mathrm{P}(X \ge 9) = 0.0214 \le 0.05$, so the critical region is $X \ge 9$.
2. $\mathrm{P}(\text{Type I}) = 0.0214$.
3. When $\lambda = 7$: $\mathrm{P}(\text{Type II}) = \mathrm{P}(X \le 8 \mid \lambda = 7) = 0.729$.
:::

## Balancing the two errors

For a fixed sample size, the two error probabilities pull against each other:

- Lowering the significance level (5% to 1%) shrinks the critical region, so Type I errors become rarer but Type II errors become more likely.
- Raising the significance level does the opposite.
- Increasing the sample size makes the test statistic less variable, which can reduce **both** probabilities.

In Example 2, a sample of 100 instead of 25 halves the standard error to 1. The 5% critical value becomes $120 + 1.645 = 121.645$, and when $\mu = 124$ the Type II probability falls to $\Phi(121.645 - 124) = \Phi(-2.355) = 0.0093$. The Type I probability is still 0.05, so the larger sample has made the test far better at detecting a real change without raising the risk of a false alarm.

Which error matters more depends on the context. Wrongly condemning a safe batch of medicine (Type I) wastes money; wrongly passing a faulty batch (Type II) may harm patients.

## Common mistakes

:::mistake{title="Using H₀ for a Type II probability"}
The Type II calculation uses the true parameter value, with the critical region found from $H_0$.
:::

:::mistake{title="Saying P(Type I) = 5% for a discrete test"}
For binomial and Poisson tests, P(Type I) is the actual size of the critical region, usually below 5%.
:::

:::mistake{title="Describing errors without context"}
"Rejecting $H_0$ when it is true" earns less than "concluding the packets are underfilled when the mean really is 500 g".
:::

:::mistake{title="Thinking both errors are possible after a decision"}
If $H_0$ is rejected, only a Type I error is possible; if not, only a Type II error.
:::

## Exam tips

:::exam-tip
Always find and state the critical region first; both error probabilities depend on it.
:::

:::exam-tip
In context answers, say what is concluded and what is actually true.
:::

:::exam-tip
Give error probabilities to 3 significant figures; for normal Type II answers, either calculator or table values are accepted.
:::

## Summary

:::summary
- Type I: reject a true $H_0$. Type II: fail to reject a false $H_0$.
- P(Type I) = size of the critical region under $H_0$ ($= \alpha$ for continuous tests).
- P(Type II) = probability of the acceptance region under the true parameter value.
- Lower $\alpha$ means fewer Type I but more Type II errors; larger samples reduce both.
:::
