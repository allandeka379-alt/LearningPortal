---
{
  "key": "rv.linear-combinations",
  "title": "Linear combinations of random variables",
  "summary": "Use E(aX + b), Var(aX + b), E(aX + bY) and Var(aX + bY) for independent variables, recognise that linear combinations of independent normal variables are normal and sums of independent Poisson variables are Poisson, and distinguish 2X from X₁ + X₂.",
  "concepts": ["amaths.rv.linear-combinations"],
  "estimatedMinutes": 45,
  "level": "core"
}
---
## Introduction

A lift in a Bulawayo office block carries up to 600 kg. If the masses of adults vary, what is the chance that eight people exceed the limit? A shop sells mangoes and oranges by the bag: is a bag of three oranges likely to weigh more than two mangoes? Questions like these combine several random variables: a total, a difference or a scaled value. This lesson gives the rules for the mean and variance of such combinations, and the distributions that result.

ZIMSEC examines linear combinations in Statistics Form 6 (topic 6.6). Cambridge examines them in Paper 6 (topic 6.2). You need expectation and variance of discrete and continuous variables, the normal distribution and the Poisson distribution. Proofs of the rules are not required by either board.

## Key definitions

:::definition{term="Linear combination"}
A random variable formed from others by multiplying by constants and adding, such as $aX + b$ or $aX + bY$. A sum of $n$ independent observations of $X$ is written $X_1 + X_2 + \dots + X_n$.
:::

:::formula{name="One variable: scaling and shifting"}
$$
\mathrm{E}(aX + b) = a\,\mathrm{E}(X) + b, \qquad \mathrm{Var}(aX + b) = a^2\,\mathrm{Var}(X)
$$
:::

:::formula{name="Two variables"}
$$
\mathrm{E}(aX + bY) = a\,\mathrm{E}(X) + b\,\mathrm{E}(Y)
$$
$$
\mathrm{Var}(aX + bY) = a^2\,\mathrm{Var}(X) + b^2\,\mathrm{Var}(Y) \quad \text{if } X \text{ and } Y \text{ are independent}
$$
:::

:::keyfact{title="Distributions of combinations"}
If $X$ and $Y$ are **independent normal** variables, then $aX + b$ and $aX + bY$ are also normal. If $X \sim \mathrm{Po}(\lambda)$ and $Y \sim \mathrm{Po}(\mu)$ are independent, then $X + Y \sim \mathrm{Po}(\lambda + \mu)$.
:::

MF19 prints the expectation and variance results; ZIMSEC prints no list, so learn them.

## Scaling and shifting one variable

Adding a constant $b$ moves every value by the same amount: the mean moves by $b$ but the spread is unchanged, so the variance is unaffected. Multiplying by $a$ stretches the spread by a factor $|a|$, so the standard deviation is multiplied by $|a|$ and the variance by $a^2$.

For example, if $\mathrm{E}(X) = 12$ and $\mathrm{Var}(X) = 4$, then $\mathrm{E}(3X - 5) = 3 \times 12 - 5 = 31$ and $\mathrm{Var}(3X - 5) = 9 \times 4 = 36$. A typical use is converting units: a temperature in °C with variance 4 has variance $1.8^2 \times 4 = 12.96$ in °F, because $F = 1.8C + 32$.

## Sums and differences

The mean of a combination always follows the obvious rule. The variance rule needs **independence**, and the key surprise is that variances **add** even for a difference:
$$
\mathrm{Var}(X - Y) = \mathrm{Var}(X) + (-1)^2\mathrm{Var}(Y) = \mathrm{Var}(X) + \mathrm{Var}(Y).
$$
Subtracting one uncertain quantity from another makes the result **more** uncertain, not less.

:::worked-solution[Example 1: the masses of adults using a lift are distributed as $\mathrm{N}(72, 9^2)$ kg. Find the probability that the total mass of 8 randomly chosen adults is less than 600 kg.]
1. Let $T = X_1 + X_2 + \dots + X_8$, where the $X_i$ are independent, each $\mathrm{N}(72, 81)$.
2. $\mathrm{E}(T) = 8 \times 72 = 576$.
3. $\mathrm{Var}(T) = 8 \times 81 = 648$ (eight separate people, so add eight variances).
4. $T$ is a sum of independent normals, so $T \sim \mathrm{N}(576, 648)$.
5. $\mathrm{P}(T < 600) = \Phi\left(\dfrac{600 - 576}{\sqrt{648}}\right) = \Phi(0.943) = 0.8271$, so $0.827$.
:::

## The difference between 2X and X₁ + X₂

This is the most common source of lost marks. $2X$ means **one** observation doubled; $X_1 + X_2$ means **two independent** observations added.

| | Mean | Variance |
| --- | --- | --- |
| $2X$ | $2\mu$ | $4\sigma^2$ |
| $X_1 + X_2$ | $2\mu$ | $2\sigma^2$ |

The means agree, but $2X$ is more variable: doubling one value doubles its error, while in two independent values the errors partly cancel. Read the context: "the mass of 8 adults" is $X_1 + \dots + X_8$, but "a recipe uses twice the mass of one bag of flour" is $2X$.

:::worked-solution[Example 2: Tendai's journey times to school by bus, $A$, and by kombi, $B$, are independent with $A \sim \mathrm{N}(35, 4^2)$ and $B \sim \mathrm{N}(32, 3^2)$ minutes. Find the probability that on a given day the bus journey takes longer than the kombi journey.]
1. Let $D = A - B$. $\mathrm{E}(D) = 35 - 32 = 3$.
2. $\mathrm{Var}(D) = 16 + 9 = 25$ (variances add), so $D \sim \mathrm{N}(3, 25)$.
3. $\mathrm{P}(A > B) = \mathrm{P}(D > 0) = 1 - \Phi\left(\dfrac{0 - 3}{5}\right) = \Phi(0.6) = 0.7257$, so $0.726$.
:::

:::worked-solution[Example 3: oranges have masses $X \sim \mathrm{N}(200, 20^2)$ g and mangoes $Y \sim \mathrm{N}(250, 30^2)$ g, all independent. Find the probability that 3 oranges weigh less than 2 mangoes.]
1. Let $S = (X_1 + X_2 + X_3) - (Y_1 + Y_2)$.
2. $\mathrm{E}(S) = 3 \times 200 - 2 \times 250 = 100$.
3. $\mathrm{Var}(S) = 3 \times 400 + 2 \times 900 = 3000$, using separate fruit, not $9 \times 400 + 4 \times 900$.
4. $S \sim \mathrm{N}(100, 3000)$, so $\mathrm{P}(S < 0) = \Phi\left(\dfrac{-100}{\sqrt{3000}}\right) = \Phi(-1.826) = 0.0339$.
:::

Notice that step 3 is exactly where $3X$ and $X_1 + X_2 + X_3$ differ. If the question had said "three times the mass of one orange", the variance would have been $9 \times 400$.

## Sums of Poisson variables

If calls to two independent help lines arrive at rates $\mathrm{Po}(2.1)$ and $\mathrm{Po}(1.4)$ per hour, the total number of calls is $\mathrm{Po}(3.5)$. So the probability of at most 2 calls altogether in an hour is
$$
\mathrm{e}^{-3.5}\left(1 + 3.5 + \frac{3.5^2}{2}\right) = 0.3208.
$$
Only **sums** of independent Poisson variables are Poisson. A difference $X - Y$ can be negative, and a multiple $2X$ takes only even values with mean and variance $2\lambda$ and $4\lambda$, so neither is Poisson.

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards examine the same results: $\mathrm{E}(aX \pm bY)$, $\mathrm{Var}(aX \pm bY) = a^2\mathrm{Var}(X) + b^2\mathrm{Var}(Y)$ for independent variables, normal combinations and Poisson sums. Cambridge questions usually ask for 3 significant figures; ZIMSEC questions often ask for 4 decimal places using tables.
:::

## Common mistakes

:::mistake{title="Subtracting variances"}
$\mathrm{Var}(X - Y) = \mathrm{Var}(X) + \mathrm{Var}(Y)$, never $\mathrm{Var}(X) - \mathrm{Var}(Y)$.
:::

:::mistake{title="Confusing 2X with X₁ + X₂"}
For $n$ separate items, multiply the variance by $n$; for one item multiplied by $n$, multiply by $n^2$.
:::

:::mistake{title="Adding standard deviations"}
Standard deviations do not add. Add variances, then take the square root.
:::

:::mistake{title="Forgetting the constant has no variance"}
$\mathrm{Var}(X + 5) = \mathrm{Var}(X)$. The 5 shifts the distribution but does not spread it.
:::

## Exam tips

:::exam-tip
Define the new variable in words and symbols ("$S = X_1 + X_2 + X_3 - Y_1 - Y_2$") and state its distribution with both parameters before you calculate.
:::

:::exam-tip
"$P(A > B)$" questions are always done with $D = A - B$ and $\mathrm{P}(D > 0)$.
:::

:::exam-tip
State the assumption of **independence** when a question asks what you have assumed.
:::

## Summary

:::summary
- $\mathrm{E}(aX + b) = a\mathrm{E}(X) + b$ and $\mathrm{Var}(aX + b) = a^2\mathrm{Var}(X)$.
- For independent $X$, $Y$: $\mathrm{Var}(aX \pm bY) = a^2\mathrm{Var}(X) + b^2\mathrm{Var}(Y)$; variances always add.
- Linear combinations of independent normal variables are normal.
- Sums of independent Poisson variables are Poisson with the rates added.
- $\mathrm{Var}(2X) = 4\sigma^2$ but $\mathrm{Var}(X_1 + X_2) = 2\sigma^2$.
:::
