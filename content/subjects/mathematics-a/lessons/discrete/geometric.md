---
{
  "key": "discrete.geometric",
  "title": "The geometric distribution",
  "summary": "Model the number of trials up to and including the first success with Geo(p), calculate P(X = r), P(X > r) and cumulative probabilities, use the expectation 1/p, and (ZIMSEC) the variance (1 − p)/p² and standard deviation.",
  "concepts": ["amaths.discrete.geometric"],
  "estimatedMinutes": 40,
  "level": "core"
}
---
## Introduction

Farai's old tractor in Chiredzi starts with probability 0.3 on each attempt. How many attempts will it take? The binomial distribution fixes the number of trials and counts successes; the **geometric distribution** does the opposite: it counts the trials **until the first success**. It models waiting: throws of a die until a six, calls until someone answers, seeds planted until one germinates.

This lesson covers ZIMSEC Statistics (Form 5, topic 6.4.2) and Cambridge 9709 Paper 5 (topic 5.4). Both boards use probabilities and the expectation; ZIMSEC also asks for the variance and standard deviation.

## Key definitions

:::definition{term="Conditions for a geometric model"}
$X \sim \mathrm{Geo}(p)$ is the number of the trial on which the **first success** occurs, when:
1. the trials are **independent**;
2. each trial is a success or a failure;
3. the probability of success $p$ is the **same** for every trial;
4. trials continue **until** the first success (there is no fixed number of trials).

$X$ takes the values $1, 2, 3, \ldots$ with no upper limit.
:::

:::formula{name="Geometric probabilities (MF19 gives P(X = r))"}
$$
\mathrm{P}(X = r) = (1 - p)^{r - 1}p, \qquad r = 1, 2, 3, \ldots
$$
$$
\mathrm{P}(X > r) = (1 - p)^r, \qquad \mathrm{P}(X \le r) = 1 - (1 - p)^r
$$
:::

:::formula{name="Expectation and variance"}
$$
\mathrm{E}(X) = \frac{1}{p}
$$
ZIMSEC only:
$$
\mathrm{Var}(X) = \frac{1 - p}{p^2}
$$
MF19 gives the mean $\frac{1}{p}$; Cambridge does not require the variance.
:::

## Where the formulae come from

The first success on trial $r$ means $r - 1$ failures followed by one success. By independence its probability is $(1 - p)^{r - 1} \times p$.

"More than $r$ trials are needed" means the first $r$ trials are all failures, so $\mathrm{P}(X > r) = (1 - p)^r$. This is far quicker than adding an infinite list of terms, and it gives the cumulative probability by the complement. The probabilities form a geometric series with first term $p$ and common ratio $1 - p$, whose sum to infinity is $\frac{p}{1 - (1 - p)} = 1$, as it must be; this is where the name comes from.

The expectation $\frac{1}{p}$ matches intuition: if one attempt in three succeeds, you wait three attempts on average.

:::worked-solution[Example 1: the tractor starts with probability 0.3 on each attempt, independently. X is the number of attempts needed. Find P(X = 4), P(X > 5), P(X ≤ 3) and E(X)]
1. $X \sim \mathrm{Geo}(0.3)$, so $1 - p = 0.7$.
2. $\mathrm{P}(X = 4) = 0.7^3 \times 0.3 = 0.343 \times 0.3 = 0.1029$.
3. $\mathrm{P}(X > 5) = 0.7^5 = 0.16807 = 0.168$ (3 s.f.): the first five attempts all fail.
4. $\mathrm{P}(X \le 3) = 1 - 0.7^3 = 1 - 0.343 = 0.657$.
5. $\mathrm{E}(X) = \frac{1}{0.3} = 3\frac{1}{3}$ attempts.
6. ZIMSEC: $\mathrm{Var}(X) = \frac{0.7}{0.09} = 7.78$ (3 s.f.), so the standard deviation is $2.79$ (3 s.f.).
:::

## Probabilities between two values

Combine two tail probabilities: $\mathrm{P}(a \le X \le b) = \mathrm{P}(X > a - 1) - \mathrm{P}(X > b) = (1 - p)^{a - 1} - (1 - p)^b$.

:::worked-solution[Example 2: for the tractor, find the probability that it starts on the 2nd, 3rd, 4th or 5th attempt]
1. $\mathrm{P}(2 \le X \le 5) = \mathrm{P}(X > 1) - \mathrm{P}(X > 5)$.
2. $= 0.7^1 - 0.7^5 = 0.7 - 0.16807 = 0.53193 = 0.532$ (3 s.f.).
3. Check by adding: $0.21 + 0.147 + 0.1029 + 0.07203 = 0.53193$.
:::

## Working backwards

:::worked-solution[Example 3: the number of calls Nyasha makes until a customer answers has a geometric distribution with mean 2.5. Find P(X = 3) and the least n such that P(X ≤ n) > 0.95]
1. $\frac{1}{p} = 2.5$, so $p = 0.4$ and $1 - p = 0.6$.
2. $\mathrm{P}(X = 3) = 0.6^2 \times 0.4 = 0.144$.
3. $\mathrm{P}(X \le n) = 1 - 0.6^n > 0.95$, so $0.6^n < 0.05$, giving $n > \frac{\ln 0.05}{\ln 0.6} = 5.86$ (the inequality reverses because $\ln 0.6 < 0$).
4. Check: $1 - 0.6^5 = 0.922$ and $1 - 0.6^6 = 0.953$. The least $n$ is 6.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards examine the geometric probabilities, including $\mathrm{P}(X > r) = (1 - p)^r$, and the expectation $\frac{1}{p}$ (ZIMSEC 6.4.2, Cambridge 5.4). ZIMSEC also asks for the variance $\frac{1 - p}{p^2}$ and the standard deviation; Cambridge requires the expectation only.
:::

## Geometric or binomial?

| | Binomial $\mathrm{B}(n, p)$ | Geometric $\mathrm{Geo}(p)$ |
| --- | --- | --- |
| Number of trials | fixed, $n$ | not fixed: stop at the first success |
| $X$ counts | successes | trials up to and including the first success |
| Values | $0, 1, \ldots, n$ | $1, 2, 3, \ldots$ |
| Mean | $np$ | $\frac{1}{p}$ |

## Judging the model in context

Examiners often ask whether a geometric model is suitable, or what must be assumed. Answer in the language of the question. For the tractor, the model assumes that each attempt succeeds with the same probability, 0.3, whatever happened on earlier attempts. That is doubtful: a cold engine may warm up with each try, making later attempts more likely to succeed, or the battery may weaken, making them less likely. Either way the probability is not constant and the attempts are not independent. A good answer names the condition that may fail and gives a reason from the context, rather than repeating the textbook list.

A useful check on data is that the observed frequencies should fall away steadily, each roughly $(1 - p)$ times the one before, with the largest frequency at $X = 1$.

## Common mistakes

:::mistake{title="Wrong power"}
$\mathrm{P}(X = r)$ has $(1 - p)^{r - 1}$, not $(1 - p)^r$: there are $r - 1$ failures before the success.
:::

:::mistake{title="Mixing up the tails"}
$\mathrm{P}(X > r) = (1 - p)^r$ but $\mathrm{P}(X \ge r) = (1 - p)^{r - 1}$. Write the inequality as "more than" before using the formula.
:::

:::mistake{title="Starting at zero"}
The smallest value of $X$ is 1 (success on the first trial), so $\mathrm{P}(X = 0) = 0$.
:::

:::mistake{title="Using a binomial idea"}
There is no ${}^nC_r$ in the geometric formula: the order is fixed (all failures, then the success).
:::

## Exam tips

:::exam-tip
Define the distribution: "Let $X$ be the number of attempts up to and including the first start; $X \sim \mathrm{Geo}(0.3)$."
:::

:::exam-tip
"Find the probability that more than 5 attempts are needed" is a one-line answer, $0.7^5$; do not add terms.
:::

:::exam-tip
Questions often combine distributions: "the first six occurs on the 4th throw" is geometric, but "exactly two sixes in the first 10 throws" is binomial. Read each part carefully.
:::

## Summary

:::summary
- $\mathrm{Geo}(p)$: number of trials up to and including the first success; values $1, 2, 3, \ldots$
- $\mathrm{P}(X = r) = (1 - p)^{r - 1}p$; $\mathrm{P}(X > r) = (1 - p)^r$; $\mathrm{P}(X \le r) = 1 - (1 - p)^r$.
- $\mathrm{E}(X) = \frac{1}{p}$; ZIMSEC: $\mathrm{Var}(X) = \frac{1 - p}{p^2}$.
- Between two values: subtract two tail probabilities.
:::
