---
{
  "key": "distributions.binomial",
  "title": "The binomial distribution",
  "summary": "Recognise when a binomial model X ~ B(n, p) fits, calculate P(X = r) = nCr pʳ(1 − p)ⁿ⁻ʳ and cumulative probabilities (at most, at least, between), use the mean np and variance np(1 − p), and find n or p from given information.",
  "concepts": ["amath.distributions.binomial"],
  "estimatedMinutes": 50,
  "level": "core"
}
---
## Introduction

A borehole pump starts first time on 85% of mornings; a quality inspector in Kwekwe checks 20 bolts from a machine that produces 5% faulty ones; a learner guesses all ten answers in a multiple-choice quiz. Each situation repeats the same trial a fixed number of times, each trial either "succeeds" or "fails", and we want the probability of a certain number of successes. The **binomial distribution** answers all of these questions with a single formula.

It is the most important discrete distribution in the ZIMSEC syllabus. Paper 2 questions ask you to state the conditions for a binomial model, calculate exact and cumulative probabilities, use the mean and variance, and work backwards to find $n$ or $p$.

## Key definitions

:::definition{term="Binomial conditions"}
A random variable $X$ has a binomial distribution when:
1. there is a **fixed number** $n$ of trials;
2. each trial has only **two outcomes**, "success" and "failure";
3. the probability of success $p$ is the **same** for every trial;
4. the trials are **independent**.

$X$ is the number of successes, and we write $X \sim B(n, p)$.
:::

:::formula{name="Binomial probability"}
$$
P(X = r) = \binom{n}{r} p^{r} (1 - p)^{n - r}, \qquad r = 0, 1, 2, \ldots, n
$$
:::

Here $\binom{n}{r} = {}^{n}C_{r} = \dfrac{n!}{r!\,(n - r)!}$ counts the number of orders in which the $r$ successes can occur. We often write $q = 1 - p$.

:::formula{name="Mean and variance of B(n, p)"}
$$
E(X) = np, \qquad \operatorname{Var}(X) = np(1 - p) = npq
$$
:::

## Why the formula works

Take $n = 3$ and ask for exactly 2 successes. The possible orders are SSF, SFS and FSS. Each has probability $p^2q$ (multiply along the branches, since the trials are independent), and there are $\binom{3}{2} = 3$ of them, so $P(X = 2) = 3p^2q$. In general, every arrangement of $r$ successes and $n - r$ failures has probability $p^r q^{n - r}$, and there are $\binom{n}{r}$ arrangements.

:::worked-solution[Example 1: X ~ B(8, 0.3). Find P(X = 3).]
1. $n = 8$, $p = 0.3$, $q = 0.7$, $r = 3$.
2. $\binom{8}{3} = \frac{8 \times 7 \times 6}{3 \times 2 \times 1} = 56$.
3. $P(X = 3) = 56 \times 0.3^3 \times 0.7^5 = 56 \times 0.027 \times 0.16807$.
4. $= 0.254$ (3 s.f.).
:::

## Cumulative probabilities

Words such as "at most", "at least" and "between" need several terms. Translate the words into values first (see the table in the discrete random variables lesson), then add, and use the complement when it saves work: $P(X \geq 1) = 1 - P(X = 0)$.

:::worked-solution[Example 2: 15% of the seedlings from a nursery near Rusape are diseased. A farmer buys 10 seedlings. Assuming a binomial model, find the probability that at most one is diseased, that at least two are diseased, and that two or three are diseased.]
1. $X \sim B(10, 0.15)$, where $X$ is the number of diseased seedlings.
2. $P(X = 0) = 0.85^{10} = 0.19687$.
3. $P(X = 1) = 10 \times 0.15 \times 0.85^9 = 0.34743$.
4. $P(X \leq 1) = 0.19687 + 0.34743 = 0.544$ (3 s.f.).
5. $P(X \geq 2) = 1 - P(X \leq 1) = 1 - 0.54430 = 0.456$.
6. $P(X = 2) = 45 \times 0.15^2 \times 0.85^8 = 0.27590$ and $P(X = 3) = 120 \times 0.15^3 \times 0.85^7 = 0.12983$.
7. $P(2 \leq X \leq 3) = 0.27590 + 0.12983 = 0.406$ (3 s.f.).
:::

Keep at least five significant figures in intermediate values and round only at the end; rounding each term to 3 s.f. first can change the last digit of the answer.

## Mean and variance

The mean $np$ is intuitive: if 15% of seedlings are diseased, a batch of 10 contains $1.5$ diseased seedlings on average. The variance $npq$ is largest when $p = 0.5$ and small when $p$ is near 0 or 1.

:::worked-solution[Example 3: X ~ B(n, p) with mean 6 and variance 4.2. Find n and p.]
1. $np = 6$ and $npq = 4.2$.
2. Divide: $q = \frac{4.2}{6} = 0.7$, so $p = 0.3$.
3. $n = \frac{6}{0.3} = 20$.
4. Check: $20 \times 0.3 = 6$ and $20 \times 0.3 \times 0.7 = 4.2$. ✓
:::

## Finding n: "how many trials are needed?"

:::worked-solution[Example 4: each ticket in a promotion wins a prize with probability 0.2, independently. Find the least number of tickets Chipo must buy for the probability of winning at least one prize to be more than 0.95.]
1. With $n$ tickets, $P(\text{at least one}) = 1 - 0.8^n$.
2. We need $1 - 0.8^n > 0.95$, that is $0.8^n < 0.05$.
3. Try values: $0.8^{13} = 0.0550$ (too big), $0.8^{14} = 0.0440$ (small enough).
4. Chipo needs at least **14** tickets.
:::

(Logarithms give the same answer: $n > \frac{\lg 0.05}{\lg 0.8} = 13.4$, so $n = 14$. Remember that dividing by $\lg 0.8 < 0$ reverses the inequality.)

## Is the binomial model appropriate?

In context questions you must judge the conditions.

- Choosing 5 learners **without replacement** from a class of 30 is not exactly binomial (the probability changes after each choice), although it is close when the population is large.
- The number of rainy days in a week is doubtful: rain on one day makes rain the next day more likely, so the trials may not be independent.
- The number of sixes in 12 rolls of a fair die is binomial: $B(12, \frac{1}{6})$.

:::keyfact{title="ZIMSEC and Cambridge"}
The binomial distribution is part of ZIMSEC Paper 2 (Probability and Statistics). Cambridge 0606 uses binomial coefficients in the binomial expansion but does not examine the binomial distribution.
:::

## Common mistakes

:::mistake{title="Leaving out the coefficient"}
$P(X = 3) = 0.3^3 \times 0.7^5$ is the probability of one particular order. Multiply by $\binom{8}{3}$ for all the orders.
:::

:::mistake{title="Using p for both success and failure"}
The powers must add up to $n$: $p^{r} q^{n - r}$.
:::

:::mistake{title="Wrong complement"}
$P(X \geq 2) = 1 - P(X \leq 1)$, not $1 - P(X \leq 2)$.
:::

:::mistake{title="Giving the standard deviation as npq"}
$npq$ is the variance; the standard deviation is $\sqrt{npq}$.
:::

## Exam tips

:::exam-tip
Start with a definition line such as "Let $X$ be the number of diseased seedlings; $X \sim B(10, 0.15)$". It earns a mark and makes every later step clear.
:::

:::exam-tip
When asked to *state* or *explain* an assumption, name the condition **in context**: "the seedlings are diseased independently of one another".
:::

:::exam-tip
For "find the least $n$", show the trial values on both sides of the boundary (as with $0.8^{13}$ and $0.8^{14}$) to justify your answer.
:::

## Summary

:::summary
- $X \sim B(n, p)$ needs a fixed number of independent trials, two outcomes and a constant $p$.
- $P(X = r) = \binom{n}{r}p^r(1 - p)^{n - r}$.
- Cumulative probabilities add terms; use $1 - P(\ldots)$ for "at least".
- $E(X) = np$ and $\operatorname{Var}(X) = np(1 - p)$; dividing them gives $q$.
- For the least $n$, solve an inequality such as $q^n < 0.05$ by trial or logarithms.
:::
