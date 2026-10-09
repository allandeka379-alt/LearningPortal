---
{
  "key": "distributions.discrete-random-variables",
  "title": "Discrete random variables: distributions, expectation and variance",
  "summary": "Write the probability distribution of a discrete random variable as a table, use ΣP = 1 to find unknown probabilities, and calculate cumulative probabilities, the expectation E(X) = Σxp and the variance Var(X) = Σx²p − [E(X)]².",
  "concepts": ["amath.distributions.discrete-random-variables"],
  "estimatedMinutes": 45,
  "level": "core"
}
---
## Introduction

Many trials produce a **number**: the number of heads when three coins are tossed, the number of eggs in a box that are cracked, the number of customers who arrive at a bank in Bulawayo in a minute. When the number is decided by chance, it is called a **random variable**. Listing each possible value with its probability gives the random variable's **probability distribution**, and from that table we can work out the value we expect on average and how spread out the values are.

This is the foundation for the binomial distribution (a special discrete distribution) and for continuous distributions such as the normal. In ZIMSEC Paper 2, discrete random variable questions are popular in Section C: complete a table with an unknown $k$, find the mean and variance, then answer a cumulative or "given that" question.

## Key definitions

:::definition{term="Random variable"}
A quantity whose value is decided by the outcome of a trial. Random variables are written with capital letters ($X$, $Y$); particular values with small letters ($x$, $y$).
:::

:::definition{term="Discrete random variable"}
A random variable that takes separate (countable) values, usually whole numbers, such as $0, 1, 2, 3$.
:::

:::definition{term="Probability distribution"}
A table (or formula) giving every value $x$ of $X$ with its probability $P(X = x)$. Every probability is between 0 and 1, and the probabilities add up to 1: $\sum P(X = x) = 1$.
:::

:::formula{name="Expectation (mean)"}
$$
E(X) = \mu = \sum x\,P(X = x)
$$
:::

:::formula{name="Variance and standard deviation"}
$$
\operatorname{Var}(X) = \sum x^2\,P(X = x) - \left[E(X)\right]^2, \qquad \sigma = \sqrt{\operatorname{Var}(X)}
$$
:::

## Using ΣP = 1

The rule that the probabilities add up to 1 is how unknown constants are found.

:::worked-solution[Example 1: the random variable X has P(X = x) = kx for x = 1, 2, 3, 4. Find k, P(X ≤ 2), E(X) and Var(X).]
1. Write the table:

| $x$ | 1 | 2 | 3 | 4 |
|---|---|---|---|---|
| $P(X = x)$ | $k$ | $2k$ | $3k$ | $4k$ |

2. $k + 2k + 3k + 4k = 10k = 1$, so $k = \frac{1}{10} = 0.1$.
3. $P(X \leq 2) = 0.1 + 0.2 = 0.3$ (a **cumulative** probability).
4. $E(X) = 1(0.1) + 2(0.2) + 3(0.3) + 4(0.4) = 0.1 + 0.4 + 0.9 + 1.6 = 3$.
5. $E(X^2) = 1(0.1) + 4(0.2) + 9(0.3) + 16(0.4) = 0.1 + 0.8 + 2.7 + 6.4 = 10$.
6. $\operatorname{Var}(X) = 10 - 3^2 = 1$.
:::

## Expectation: the long-run average

$E(X)$ is not necessarily a value that $X$ can take; it is the average value of $X$ over a very large number of trials. If you repeated the trial in Example 1 many times, the values would average out at about 3. Think of it as a weighted mean: each value is weighted by how often it occurs.

## Variance: how spread out the values are

The variance measures spread about the mean. The formula $\sum x^2 p - \mu^2$ is "the mean of the squares minus the square of the mean". Two working habits keep it accurate:

- Add a row $x^2$ (or $x^2 p$) to the table so that $E(X^2)$ is a simple sum.
- Square $E(X)$ **after** finding it; do not square the probabilities.

A variance is never negative; a negative answer means an arithmetic slip, usually forgetting to square $x$.

## Two unknowns

When two probabilities are unknown, you need two equations: one from $\sum P = 1$ and one from given information, typically the value of $E(X)$.

:::worked-solution[Example 2: X takes the values 0, 1, 2 and 3 with probabilities 0.2, a, b and 0.1. Given that E(X) = 1.4, find a and b, then Var(X).]
1. Sum: $0.2 + a + b + 0.1 = 1$, so $a + b = 0.7$.
2. Mean: $0(0.2) + 1(a) + 2(b) + 3(0.1) = 1.4$, so $a + 2b = 1.1$.
3. Subtract: $b = 0.4$, then $a = 0.3$.
4. $E(X^2) = 0 + 1(0.3) + 4(0.4) + 9(0.1) = 0.3 + 1.6 + 0.9 = 2.8$.
5. $\operatorname{Var}(X) = 2.8 - 1.4^2 = 2.8 - 1.96 = 0.84$.
:::

## Building a distribution from a situation

Often you must work out the probabilities yourself, with a tree diagram or by counting.

:::worked-solution[Example 3: a bag contains 3 red and 5 blue counters. Two counters are taken at random without replacement. X is the number of red counters taken. Find the probability distribution of X and E(X).]
1. $P(X = 0) = P(BB) = \frac{5}{8} \times \frac{4}{7} = \frac{20}{56} = \frac{5}{14}$.
2. $P(X = 1) = P(RB) + P(BR) = \frac{3}{8} \times \frac{5}{7} + \frac{5}{8} \times \frac{3}{7} = \frac{30}{56} = \frac{15}{28}$.
3. $P(X = 2) = P(RR) = \frac{3}{8} \times \frac{2}{7} = \frac{6}{56} = \frac{3}{28}$.
4. Check: $\frac{20}{56} + \frac{30}{56} + \frac{6}{56} = 1$. ✓
5. $E(X) = 0 + 1 \times \frac{15}{28} + 2 \times \frac{3}{28} = \frac{21}{28} = \frac{3}{4}$.
6. Going further: $E(X^2) = \frac{15}{28} + 4 \times \frac{3}{28} = \frac{27}{28}$, so $\operatorname{Var}(X) = \frac{27}{28} - \frac{9}{16} = \frac{45}{112} \approx 0.402$.
:::

## Cumulative probabilities

Questions often use inequalities. Read them carefully: for a discrete variable taking whole numbers,

| Words | Symbols | Values included |
|---|---|---|
| at most 2 | $X \leq 2$ | 0, 1, 2 |
| fewer than 2 | $X < 2$ | 0, 1 |
| at least 2 | $X \geq 2$ | 2, 3, … |
| more than 2 | $X > 2$ | 3, 4, … |

It is often quicker to use the complement: $P(X \geq 2) = 1 - P(X \leq 1)$. In Example 1, $P(X \geq 2) = 1 - 0.1 = 0.9$.

:::keyfact{title="ZIMSEC and Cambridge"}
Discrete random variables are part of ZIMSEC Paper 2 (Probability and Statistics). Cambridge 0606 does not examine probability distributions.
:::

## Common mistakes

:::mistake{title="Forgetting to square E(X)"}
$\operatorname{Var}(X) = E(X^2) - [E(X)]^2$. Writing $E(X^2) - E(X)$ is a common slip.
:::

:::mistake{title="Squaring the probabilities"}
$E(X^2) = \sum x^2 p$: square the **values**, not the probabilities.
:::

:::mistake{title="Mixing up < and ≤"}
For whole-number values, $P(X < 3) = P(X \leq 2)$. Write the list of values included before adding.
:::

:::mistake{title="Not checking ΣP = 1"}
After building a distribution from a tree, add the probabilities; if they do not add to 1, a path has been missed.
:::

## Exam tips

:::exam-tip
Lay out a table with rows $x$, $P(X = x)$, $xP(X = x)$ and $x^2P(X = x)$. The sums of the last two rows are $E(X)$ and $E(X^2)$, and the marks for method are easy to award.
:::

:::exam-tip
Keep exact fractions when the probabilities are fractions; give the final answer as a fraction or to 3 significant figures.
:::

:::exam-tip
When a question says "show that $k = \frac{1}{10}$", write the equation $\sum P = 1$ in full before solving it.
:::

## Summary

:::summary
- A discrete random variable takes separate values; its distribution lists each value with its probability, and $\sum P = 1$.
- $E(X) = \sum xp$ is the long-run average value.
- $\operatorname{Var}(X) = \sum x^2p - [E(X)]^2$; the standard deviation is its square root.
- Unknown probabilities come from $\sum P = 1$ and any extra information such as $E(X)$.
- Cumulative probabilities add the values included; the complement often saves work.
:::
