---
{
  "key": "discrete.random-variables",
  "title": "Discrete random variables: expectation and variance",
  "summary": "Define a discrete random variable, draw up its probability distribution table, use the fact that the probabilities add to 1 to find unknowns, and calculate the expectation, variance and standard deviation, including those of the discrete uniform distribution.",
  "concepts": ["amaths.discrete.random-variables"],
  "estimatedMinutes": 45,
  "level": "core"
}
---
## Introduction

How many of the three learners chosen for a debate team will be girls? How many seeds in a row of four will germinate? How much will a player win, on average, in a fund-raising game at a school fête in Chitungwiza? Each answer is a number decided by chance: a **random variable**. Listing its possible values with their probabilities gives a **probability distribution**, and from that we can find its long-run average (the **expectation**) and its spread (the **variance**).

This lesson covers ZIMSEC Statistics (Form 5, topic 6.4.1, and the uniform distribution from 6.4.2) and Cambridge 9709 Paper 5 (topic 5.4). Everything here is used again for the binomial, geometric and Poisson distributions.

## Key definitions

:::definition{term="Discrete random variable"}
A **random variable** $X$ takes numerical values determined by the outcome of an experiment. It is **discrete** if its values can be listed, such as $0, 1, 2, 3$. Capital $X$ names the variable; small $x$ is one of its values.
:::

:::definition{term="Probability distribution"}
A table (or formula) giving $\mathrm{P}(X = x)$ for every possible value $x$. Every probability lies between 0 and 1, and
$$
\sum \mathrm{P}(X = x) = 1
$$
:::

:::formula{name="Expectation and variance (MF19 gives both)"}
$$
\mathrm{E}(X) = \mu = \sum x\,\mathrm{P}(X = x)
$$
$$
\mathrm{Var}(X) = \sum x^2\,\mathrm{P}(X = x) - \mu^2 = \mathrm{E}(X^2) - [\mathrm{E}(X)]^2
$$
The standard deviation is $\sqrt{\mathrm{Var}(X)}$.
:::

:::definition{term="Discrete uniform distribution (ZIMSEC)"}
$X$ takes the values $1, 2, \ldots, n$, each with probability $\frac{1}{n}$ (for example the score on a fair die). Then
$$
\mathrm{E}(X) = \frac{n + 1}{2}, \qquad \mathrm{Var}(X) = \frac{n^2 - 1}{12}
$$
:::

## Drawing up a distribution

List every value $X$ can take, find each probability (by counting, a tree or a formula), and check the total is 1. Writing the probabilities over a common denominator makes the check and the later sums easier.

:::worked-solution[Example 1: three learners are chosen at random from 4 boys and 3 girls. X is the number of girls chosen. Find the distribution of X, E(X) and Var(X)]
1. Total selections: ${}^7C_3 = 35$. $\mathrm{P}(X = x) = \frac{{}^3C_x \times {}^4C_{3 - x}}{35}$.
2. $\mathrm{P}(X = 0) = \frac{4}{35}$, $\mathrm{P}(X = 1) = \frac{3 \times 6}{35} = \frac{18}{35}$, $\mathrm{P}(X = 2) = \frac{3 \times 4}{35} = \frac{12}{35}$, $\mathrm{P}(X = 3) = \frac{1}{35}$. Check: $4 + 18 + 12 + 1 = 35$.
3. $\mathrm{E}(X) = \frac{0 + 18 + 24 + 3}{35} = \frac{45}{35} = \frac{9}{7}$.
4. $\mathrm{E}(X^2) = \frac{0 + 18 + 48 + 9}{35} = \frac{75}{35} = \frac{15}{7}$.
5. $\mathrm{Var}(X) = \frac{15}{7} - \left(\frac{9}{7}\right)^2 = \frac{105 - 81}{49} = \frac{24}{49} \approx 0.490$, so the standard deviation is about $0.700$.
:::

| $x$ | 0 | 1 | 2 | 3 |
| --- | --- | --- | --- | --- |
| $\mathrm{P}(X = x)$ | $\frac{4}{35}$ | $\frac{18}{35}$ | $\frac{12}{35}$ | $\frac{1}{35}$ |

## Unknown probabilities

When a table contains unknowns, use $\sum \mathrm{P} = 1$, and any extra information such as a given expectation, to form equations.

:::worked-solution[Example 2: the table shows the distribution of X, and E(X) = 2.9. Find a, b and Var(X)]
| $x$ | 1 | 2 | 3 | 4 |
| --- | --- | --- | --- | --- |
| $\mathrm{P}(X = x)$ | 0.1 | $a$ | 0.3 | $b$ |

1. Total: $0.1 + a + 0.3 + b = 1$, so $a + b = 0.6$.
2. Expectation: $0.1 + 2a + 0.9 + 4b = 2.9$, so $2a + 4b = 1.9$, that is $a + 2b = 0.95$.
3. Subtracting: $b = 0.35$, then $a = 0.25$.
4. $\mathrm{E}(X^2) = 1(0.1) + 4(0.25) + 9(0.3) + 16(0.35) = 0.1 + 1 + 2.7 + 5.6 = 9.4$.
5. $\mathrm{Var}(X) = 9.4 - 2.9^2 = 9.4 - 8.41 = 0.99$.
:::

A distribution may also be given by a formula. If $\mathrm{P}(X = x) = kx$ for $x = 1, 2, 3, 4$, then $k(1 + 2 + 3 + 4) = 1$ gives $k = \frac{1}{10}$, and then $\mathrm{E}(X) = \frac{1 + 4 + 9 + 16}{10} = 3$, $\mathrm{E}(X^2) = \frac{1 + 8 + 27 + 64}{10} = 10$ and $\mathrm{Var}(X) = 10 - 9 = 1$.

## Interpreting expectation and variance

$\mathrm{E}(X)$ is the mean of $X$ in the long run: the average of a very large number of observations. It need not be a value $X$ can take ($\frac{9}{7}$ girls is impossible in one selection). $\mathrm{Var}(X)$ measures spread about that mean in squared units; the standard deviation is in the units of $X$. These are the population versions of the mean and variance of data, with probabilities in place of relative frequencies.

In games of chance, the expectation decides whether a game is fair. If a player's gain $G$ (winnings minus the stake) has $\mathrm{E}(G) = 0$, the game is fair; a negative expectation means the organiser profits in the long run. Organisers of a school fête in Chitungwiza can therefore choose prizes so that the expected gain per game is a small negative amount, raising money while still offering attractive prizes.

## The discrete uniform distribution

:::worked-solution[Example 3: a fair spinner has eight equal sectors numbered 1 to 8. X is the score. Find E(X), Var(X) and P(X > E(X))]
1. $X$ is uniform on $1, \ldots, 8$, so $\mathrm{E}(X) = \frac{8 + 1}{2} = 4.5$.
2. $\mathrm{Var}(X) = \frac{8^2 - 1}{12} = \frac{63}{12} = 5.25$, and the standard deviation is $\sqrt{5.25} \approx 2.29$.
3. Check from the definition: $\mathrm{E}(X^2) = \frac{1 + 4 + \cdots + 64}{8} = \frac{204}{8} = 25.5$, and $25.5 - 4.5^2 = 5.25$.
4. $\mathrm{P}(X > 4.5) = \mathrm{P}(X \ge 5) = \frac{4}{8} = \frac{1}{2}$.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards examine distribution tables, $\mathrm{E}(X)$ and $\mathrm{Var}(X)$ (ZIMSEC 6.4.1, Cambridge 5.4). ZIMSEC also names the discrete uniform distribution with mean $\frac{n+1}{2}$ and variance $\frac{n^2 - 1}{12}$; Cambridge does not require these formulae, though a fair-die distribution may still appear.
:::

## Common mistakes

:::mistake{title="Forgetting to subtract the mean squared"}
$\sum x^2\,\mathrm{P}(X = x)$ is $\mathrm{E}(X^2)$, not the variance. Subtract $[\mathrm{E}(X)]^2$.
:::

:::mistake{title="Squaring the probabilities"}
In $\mathrm{E}(X^2)$ the values are squared, not the probabilities: $\sum x^2 p$, not $\sum x p^2$.
:::

:::mistake{title="Missing a value"}
Check that the probabilities add to 1; if not, a value (often 0) is missing from the table.
:::

:::mistake{title="Rounding inside the sums"}
Keep exact fractions until the end; rounded probabilities give a variance that can be wrong in the second significant figure.
:::

## Exam tips

:::exam-tip
"Draw up the probability distribution table" means a table with every value of $x$ and its probability, ideally as exact fractions; show how one or two of them were found.
:::

:::exam-tip
"Show that $\mathrm{P}(X = 2) = \frac{12}{35}$": write the full calculation leading to the given value, such as $\frac{{}^3C_2 \times {}^4C_1}{{}^7C_3}$.
:::

:::exam-tip
Give the variance exactly or to 3 significant figures; never round $\mathrm{E}(X)$ before squaring it.
:::

## Summary

:::summary
- A probability distribution lists every value with its probability; $\sum \mathrm{P}(X = x) = 1$.
- $\mathrm{E}(X) = \sum x p$; $\mathrm{Var}(X) = \sum x^2 p - [\mathrm{E}(X)]^2$; sd $= \sqrt{\mathrm{Var}(X)}$.
- Use $\sum p = 1$ and given information to find unknown probabilities.
- Discrete uniform on $1, \ldots, n$ (ZIMSEC): mean $\frac{n+1}{2}$, variance $\frac{n^2 - 1}{12}$.
:::
