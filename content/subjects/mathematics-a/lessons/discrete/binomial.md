---
{
  "key": "discrete.binomial",
  "title": "The binomial distribution",
  "summary": "Recognise when the binomial model B(n, p) applies, calculate probabilities of exactly, at most, at least and between values from the formula, use the mean np and variance np(1 − p), find n or p, and (ZIMSEC) use the Bernoulli distribution.",
  "concepts": ["amaths.discrete.binomial"],
  "estimatedMinutes": 50,
  "level": "core"
}
---
## Introduction

A farmer in Mashonaland plants maize seeds that each germinate with probability 0.85. Out of 10 seeds in a row, how likely is it that at least 9 come up? Situations like this, with a fixed number of independent attempts that each succeed or fail, are modelled by the **binomial distribution**. It is the most frequently examined discrete distribution at A Level and the basis of the binomial hypothesis test and the normal approximation later in the course.

This lesson covers ZIMSEC Statistics (Form 5, topic 6.4.2, with the Bernoulli distribution in Form 6) and Cambridge 9709 Paper 5 (topic 5.4). Probabilities are calculated from the formula; neither board expects cumulative binomial tables at this stage.

## Key definitions

:::definition{term="Conditions for a binomial model"}
$X \sim \mathrm{B}(n, p)$, the number of successes, when:
1. there is a **fixed number** $n$ of trials;
2. each trial has exactly **two outcomes**, success or failure;
3. the probability of success $p$ is the **same** for every trial;
4. the trials are **independent**.
:::

:::formula{name="Binomial probabilities (MF19 gives this)"}
$$
\mathrm{P}(X = r) = {}^nC_r\,p^r(1 - p)^{n - r}, \qquad r = 0, 1, \ldots, n
$$
:::

:::formula{name="Mean and variance (MF19 gives these)"}
$$
\mathrm{E}(X) = np, \qquad \mathrm{Var}(X) = np(1 - p)
$$
:::

:::definition{term="Bernoulli distribution (ZIMSEC)"}
A single trial ($n = 1$): $X = 1$ for success with probability $p$, $X = 0$ for failure. Mean $p$, variance $p(1 - p)$. A binomial variable is the sum of $n$ independent Bernoulli variables, which is why its mean and variance are $n$ times larger.
:::

## Why the formula works

For exactly $r$ successes in $n$ trials, any one particular order (say $r$ successes followed by $n - r$ failures) has probability $p^r(1 - p)^{n - r}$, by independence. The number of different orders is the number of ways of choosing which $r$ of the $n$ trials are the successes, ${}^nC_r$. Adding these equally likely orders gives the formula.

:::worked-solution[Example 1: each maize seed germinates with probability 0.85, independently. Ten seeds are planted. Find the probability that (a) exactly 8 germinate, (b) at least 9 germinate]
1. Let $X \sim \mathrm{B}(10, 0.85)$ be the number that germinate.
2. (a) $\mathrm{P}(X = 8) = {}^{10}C_8\,(0.85)^8(0.15)^2 = 45 \times 0.85^8 \times 0.0225 = 0.276$ (3 s.f.).
3. (b) $\mathrm{P}(X \ge 9) = \mathrm{P}(X = 9) + \mathrm{P}(X = 10) = 10(0.85)^9(0.15) + (0.85)^{10}$.
4. $= 0.34743 + 0.19687 = 0.544$ (3 s.f.).
:::

## At most, at least and between

Translate words into inequalities carefully, then list the values or use the complement:

| Words | Inequality | Values for $n = 12$ |
| --- | --- | --- |
| at most 2 | $X \le 2$ | 0, 1, 2 |
| fewer than 3 | $X < 3$ | 0, 1, 2 |
| at least 3 | $X \ge 3$ | 3 to 12: use $1 - \mathrm{P}(X \le 2)$ |
| more than 4 | $X > 4$ | 5 to 12 |
| between 2 and 4 inclusive | $2 \le X \le 4$ | 2, 3, 4 |

:::worked-solution[Example 2: 30% of the customers at a Bulawayo supermarket pay by mobile money. A random sample of 12 customers is taken. Find P(at most 2 pay by mobile money), P(at least 3) and P(between 2 and 4 inclusive)]
1. $X \sim \mathrm{B}(12, 0.3)$.
2. $\mathrm{P}(X = 0) = 0.7^{12} = 0.013841$; $\mathrm{P}(X = 1) = 12(0.3)(0.7)^{11} = 0.071184$; $\mathrm{P}(X = 2) = 66(0.3)^2(0.7)^{10} = 0.167790$.
3. $\mathrm{P}(X \le 2) = 0.013841 + 0.071184 + 0.167790 = 0.253$ (3 s.f.).
4. $\mathrm{P}(X \ge 3) = 1 - 0.252815 = 0.747$ (3 s.f.).
5. $\mathrm{P}(X = 3) = 220(0.3)^3(0.7)^9 = 0.239700$ and $\mathrm{P}(X = 4) = 495(0.3)^4(0.7)^8 = 0.231140$.
6. $\mathrm{P}(2 \le X \le 4) = 0.167790 + 0.239700 + 0.231140 = 0.639$ (3 s.f.).
:::

Keep at least five or six significant figures in each term before adding; rounding each term to 3 s.f. first can change the final answer.

## Finding n

"How many trials are needed so that the probability of at least one success exceeds 0.95?" Use the complement: $\mathrm{P}(X \ge 1) = 1 - (1 - p)^n$.

:::worked-solution[Example 3: each ticket in a raffle wins with probability 0.2. Find the least number of tickets Tatenda must buy so that the probability she wins at least once is greater than 0.95]
1. $\mathrm{P}(\text{at least one win}) = 1 - 0.8^n > 0.95$, so $0.8^n < 0.05$.
2. Taking logarithms: $n \ln 0.8 < \ln 0.05$. Since $\ln 0.8 < 0$, the inequality reverses: $n > \frac{\ln 0.05}{\ln 0.8} = 13.4$.
3. Check: $n = 13$ gives $1 - 0.8^{13} = 0.945$ (not enough); $n = 14$ gives $1 - 0.8^{14} = 0.956$.
4. She must buy at least 14 tickets.
:::

## Mean and variance

For $X \sim \mathrm{B}(20, 0.35)$, $\mathrm{E}(X) = 20 \times 0.35 = 7$ and $\mathrm{Var}(X) = 7 \times 0.65 = 4.55$. Working backwards, if a binomial variable has mean 6 and variance 4.2, then $1 - p = \frac{4.2}{6} = 0.7$, so $p = 0.3$ and $n = \frac{6}{0.3} = 20$.

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards examine the binomial conditions, probabilities from the formula, and the mean and variance (ZIMSEC 6.4.2, Cambridge 5.4). ZIMSEC also names the Bernoulli distribution (Form 6) with mean $p$ and variance $p(1 - p)$, and asks you to "outline the characteristics" of each distribution.
:::

## Common mistakes

:::mistake{title="Wrong boundary in 'at least'"}
$\mathrm{P}(X \ge 3) = 1 - \mathrm{P}(X \le 2)$, not $1 - \mathrm{P}(X \le 3)$.
:::

:::mistake{title="Forgetting the coefficient"}
$\mathrm{P}(X = 8)$ is not $0.85^8 \times 0.15^2$; that is the probability of one particular order. Multiply by ${}^{10}C_8$.
:::

:::mistake{title="Using the binomial when trials are not independent"}
Choosing people without replacement from a small group changes $p$ from trial to trial, so the binomial model is only an approximation (good when the group is large).
:::

:::mistake{title="Not reversing the inequality"}
Dividing by $\ln 0.8$, which is negative, reverses the inequality sign.
:::

## Exam tips

:::exam-tip
Define the variable and its distribution first: "Let $X$ be the number of seeds that germinate; $X \sim \mathrm{B}(10, 0.85)$." This usually earns a mark.
:::

:::exam-tip
When asked to "state an assumption" or "give a reason why the binomial may not be suitable", refer to the context: independence of the trials or a constant probability, not just the textbook words.
:::

:::exam-tip
For "find the least $n$", show the values of the probability at $n$ and $n - 1$ on either side of the boundary.
:::

## Summary

:::summary
- $\mathrm{B}(n, p)$ needs a fixed $n$, two outcomes, constant $p$ and independent trials.
- $\mathrm{P}(X = r) = {}^nC_r\,p^r(1 - p)^{n - r}$.
- Use the complement for "at least"; list the values for "at most" and "between".
- $\mathrm{E}(X) = np$, $\mathrm{Var}(X) = np(1 - p)$; Bernoulli (ZIMSEC): mean $p$, variance $p(1 - p)$.
- To find $n$, solve $(1 - p)^n < k$ with logarithms and check neighbouring values.
:::
