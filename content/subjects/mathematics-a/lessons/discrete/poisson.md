---
{
  "key": "discrete.poisson",
  "title": "The Poisson distribution",
  "summary": "Model the number of random events in a fixed interval with Po(λ), calculate exact and cumulative probabilities from the formula, scale λ to the interval, and use mean = variance = λ to judge whether a Poisson model fits.",
  "concepts": ["amaths.discrete.poisson"],
  "estimatedMinutes": 45,
  "freePreview": true,
  "level": "core"
}
---
## Introduction

How many calls reach a ZESA fault line in an hour? How many kombis break down on the Harare–Bulawayo road in a week? How many flaws are there in a 100 m roll of cloth? Each of these counts events that happen **at random**, one at a time, scattered through time or space. There is no fixed number of trials, so the binomial distribution does not apply. The model for such counts is the **Poisson distribution**.

ZIMSEC examines the Poisson distribution in Statistics Form 6 (topic 6.4, special discrete distributions), alongside the Bernoulli distribution. Cambridge examines it in Paper 6 (Probability & Statistics 2, topic 6.1). You should already be confident with discrete random variables, $\mathrm{E}(X)$, $\mathrm{Var}(X)$ and the binomial distribution.

## Key definitions

:::definition{term="Poisson distribution"}
A discrete random variable $X$ taking the values $0, 1, 2, 3, \dots$ (with no upper limit) has a Poisson distribution with parameter $\lambda > 0$, written $X \sim \mathrm{Po}(\lambda)$, if
$$
\mathrm{P}(X = r) = \mathrm{e}^{-\lambda}\frac{\lambda^{r}}{r!}, \qquad r = 0, 1, 2, \dots
$$
:::

:::formula{name="Mean and variance of Po(λ)"}
$$
\mathrm{E}(X) = \lambda, \qquad \mathrm{Var}(X) = \lambda, \qquad \text{standard deviation} = \sqrt{\lambda}
$$
:::

MF19 (the Cambridge list of formulae) prints the probability formula and the mean and variance. ZIMSEC prints no formula list, so learn them.

:::definition{term="Conditions for a Poisson model"}
Events occur **singly** (never two at exactly the same instant), **independently** of one another, and **at random** at a **constant average rate** $\lambda$ per interval.
:::

## Why the model works

Think of an hour divided into thousands of tiny time slots. In each slot a call either arrives or it does not, independently, with a tiny probability. That is a binomial distribution with huge $n$ and tiny $p$, and as $n \to \infty$ with $np = \lambda$ fixed, the binomial probabilities settle down to $\mathrm{e}^{-\lambda}\lambda^{r}/r!$. This is why the conditions above (independence, events one at a time, constant rate) are exactly the binomial conditions in disguise.

When you are asked to "state an assumption" or "explain why a Poisson model may not be suitable", use these conditions **in context**. Calls to a fault line are not independent during a storm (one fault causes many calls), and the rate is not constant through the day (more calls in the evening peak).

## Calculating probabilities

Use the formula for single values, and add terms for cumulative probabilities. For "at least" questions, use the complement.

:::worked-solution[Example 1: calls to a fault line arrive at random at an average rate of 4.2 per hour. Find the probability that in one hour there are (a) exactly 3 calls, (b) at most 2 calls, (c) at least 2 calls.]
1. Let $X$ be the number of calls in one hour: $X \sim \mathrm{Po}(4.2)$.
2. (a) $\mathrm{P}(X = 3) = \mathrm{e}^{-4.2}\dfrac{4.2^{3}}{3!} = 0.1852$, so $0.185$ to 3 s.f.
3. (b) $\mathrm{P}(X \le 2) = \mathrm{e}^{-4.2}\left(1 + 4.2 + \dfrac{4.2^{2}}{2}\right) = \mathrm{e}^{-4.2} \times 14.02 = 0.2102$, so $0.210$.
4. (c) $\mathrm{P}(X \ge 2) = 1 - \mathrm{P}(X \le 1) = 1 - \mathrm{e}^{-4.2}(1 + 4.2) = 0.9220$, so $0.922$.
:::

Taking out the common factor $\mathrm{e}^{-\lambda}$, as in step 3, saves time and reduces rounding errors. A useful check is the **recurrence**
$$
\mathrm{P}(X = r) = \frac{\lambda}{r}\,\mathrm{P}(X = r - 1),
$$
so each probability is the previous one multiplied by $\lambda / r$. For $\mathrm{Po}(2.6)$ this gives $0.0743, 0.1931, 0.2510, 0.2176, 0.1414, \dots$ for $r = 0, 1, 2, 3, 4$. The probabilities rise while $\lambda / r > 1$ and fall afterwards, so the most likely value (the mode) is the integer part of $\lambda$ when $\lambda$ is not a whole number.

## Scaling the parameter to the interval

Because the rate is constant, the mean count is proportional to the length of the interval. If breakdowns occur at 1.5 per week, then the number in a fortnight is $\mathrm{Po}(3)$ and the number in three weeks is $\mathrm{Po}(4.5)$. Always define the new variable and its distribution before calculating.

:::worked-solution[Example 2: kombis on a route break down at random at an average rate of 1.5 per week. Find the probability of (a) at least 2 breakdowns in a fortnight, (b) fewer than 4 breakdowns in 3 weeks.]
1. (a) Let $Y$ be the number in two weeks: $Y \sim \mathrm{Po}(3)$.
2. $\mathrm{P}(Y \ge 2) = 1 - \mathrm{e}^{-3}(1 + 3) = 1 - 4\mathrm{e}^{-3} = 0.8009$, so $0.801$.
3. (b) Let $Z$ be the number in three weeks: $Z \sim \mathrm{Po}(4.5)$.
4. "Fewer than 4" means $Z \le 3$: $\mathrm{P}(Z \le 3) = \mathrm{e}^{-4.5}\left(1 + 4.5 + \dfrac{4.5^{2}}{2} + \dfrac{4.5^{3}}{6}\right) = 0.3423$, so $0.342$.
:::

## Finding λ and checking a model

Some questions give a probability and ask for $\lambda$. Write the equation and solve it, often with logarithms.

:::worked-solution[Example 3: the number of flaws in a 10 m length of cloth has a Poisson distribution. The probability that a 10 m length has no flaws is 0.2. (a) Show that the mean number of flaws per 10 m is $\ln 5$. (b) Find the probability that a 10 m length has at least 2 flaws.]
1. (a) $\mathrm{P}(X = 0) = \mathrm{e}^{-\lambda} = 0.2$.
2. Take natural logarithms: $-\lambda = \ln 0.2$, so $\lambda = -\ln 0.2 = \ln 5$ (as required). Numerically $\lambda = 1.6094$.
3. (b) $\mathrm{P}(X \ge 2) = 1 - \mathrm{e}^{-\lambda}(1 + \lambda) = 1 - 0.2(1 + 1.6094) = 0.4781$, so $0.478$.
:::

To judge whether data could come from a Poisson distribution, compare the sample **mean** and **variance**: for a Poisson model they should be roughly equal. For example, 100 one-minute counts with frequencies 18, 31, 26, 15, 7, 3 for $0, 1, \dots, 5$ events give a mean of $1.71$ and a variance of $1.65$. These are close, which supports a Poisson model with $\lambda \approx 1.7$. If the variance were much larger than the mean, events would be clustering, which breaks independence.

:::keyfact{title="ZIMSEC and Cambridge"}
ZIMSEC (Form 6) asks for the mean, variance **and standard deviation** of the Poisson and Bernoulli distributions and does not name the Poisson approximation to the binomial. Cambridge (Paper 6) also uses the Poisson distribution as an approximation to $\mathrm{B}(n, p)$ and approximates $\mathrm{Po}(\lambda)$ by a normal distribution for large $\lambda$: see the lesson on Poisson and normal approximations.
:::

## Common mistakes

:::mistake{title="Forgetting to rescale λ"}
A rate of 1.5 per week does not give $\mathrm{Po}(1.5)$ for a fortnight. Multiply the rate by the length of the new interval first.
:::

:::mistake{title="Misreading inequalities"}
"Fewer than 4" is $X \le 3$, "more than 2" is $X \ge 3$, "at least 2" is $X \ge 2$. Write the inequality before you calculate.
:::

:::mistake{title="Using 1 − P(X = 0) for 'at least 2'"}
$\mathrm{P}(X \ge 2) = 1 - \mathrm{P}(X = 0) - \mathrm{P}(X = 1)$. Leaving out $\mathrm{P}(X = 1)$ is a common slip.
:::

:::mistake{title="Quoting conditions without context"}
"Events are independent" earns little on its own. Say what must be independent: "one breakdown does not make another more likely".
:::

## Exam tips

:::exam-tip
Start each part by defining the variable and its distribution, for example "$X \sim \mathrm{Po}(3)$, where $X$ is the number of breakdowns in a fortnight". It earns the method mark even if the arithmetic slips.
:::

:::exam-tip
Give probabilities to 3 significant figures (Cambridge) or 4 decimal places when ZIMSEC asks for it, and keep at least 4 significant figures in the working.
:::

:::exam-tip
When asked to **explain** why a Poisson model may be unsuitable, name the condition that fails and give a reason from the context (rush hours, storms, clustering).
:::

## Summary

:::summary
- $X \sim \mathrm{Po}(\lambda)$ counts random events in an interval: $\mathrm{P}(X = r) = \mathrm{e}^{-\lambda}\lambda^{r}/r!$ for $r = 0, 1, 2, \dots$
- Mean and variance are both $\lambda$; the standard deviation is $\sqrt{\lambda}$.
- Events must occur singly, independently, at random and at a constant average rate.
- Scale $\lambda$ in proportion to the length of the interval.
- Use $1 - \mathrm{P}(X \le k)$ for "at least" questions, and compare mean and variance to judge a model.
:::
