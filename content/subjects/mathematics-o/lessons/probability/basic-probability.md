---
{
  "key": "probability.basic-probability",
  "title": "Basic probability",
  "summary": "Use the language of probability and the scale from 0 to 1, calculate the probability of a single event from equally likely outcomes, and use P(not A) = 1 − P(A).",
  "concepts": ["math.probability.basic"],
  "objectives": ["zimsec/o-level/mathematics:14.0.1", "zimsec/o-level/mathematics:14.0.2", "cambridge/igcse/mathematics:8.1.1", "cambridge/igcse/mathematics:8.1.2", "cambridge/igcse/mathematics:8.1.3", "cambridge/igcse/mathematics:8.1.4"],
  "estimatedMinutes": 17,
  "freePreview": true,
  "level": "core"
}
---
## Introduction

At a school fundraiser in Gweru, 500 raffle tickets are sold and one winning ticket is drawn. If you hold 10 tickets, how likely are you to win? A weather report says there is a "70% chance of rain". A seed company states that most of its maize seeds will germinate. Each of these is a statement about **probability**: a number that measures how likely something is to happen.

In this lesson you will learn the language of probability, place events on a scale from 0 to 1, calculate probabilities when all the outcomes are equally likely, and find the probability that an event does **not** happen. These ideas are the base for everything else in the probability topic.

You should be able to simplify fractions and convert between fractions, decimals and percentages.

## Key definitions

:::definition{term="Experiment and outcome"}
An **experiment** (or trial) is an action with an uncertain result, such as rolling a dice. Each possible result is an **outcome**.
:::

:::definition{term="Event"}
A set of one or more outcomes, for example "rolling an even number".
:::

:::definition{term="Sample space"}
The list of all the possible outcomes of an experiment. For one roll of an ordinary dice it is $\{1, 2, 3, 4, 5, 6\}$.
:::

:::definition{term="Equally likely and random"}
Outcomes are **equally likely** when each has the same chance of happening. An object is chosen **at random** when every object has the same chance of being chosen.
:::

:::formula{name="Probability of an event"}
When all the outcomes are equally likely,

$$
\text{P(event)} = \frac{\text{number of outcomes in the event}}{\text{total number of possible outcomes}}
$$
:::

:::keyfact{title="The probability scale"}
Every probability lies between 0 and 1 inclusive. An **impossible** event has probability 0 and a **certain** event has probability 1. An event with probability $\frac{1}{2}$ has an **even chance**.
:::

## The probability scale

| Probability | Description | Example |
| :---: | --- | --- |
| $0$ | impossible | rolling a 7 on an ordinary dice |
| between $0$ and $\frac{1}{2}$ | unlikely | rolling a 6 |
| $\frac{1}{2}$ | even chance | a fair coin landing heads |
| between $\frac{1}{2}$ and $1$ | likely | rolling a number greater than 1 |
| $1$ | certain | rolling a number less than 7 |

Probabilities are written as **fractions, decimals or percentages**: $\frac{1}{4}$, $0.25$ and $25\%$ are all correct. Do not write them as ratios ("1 : 4") or in words ("1 in 4"): examiners do not accept those forms.

## Calculating probabilities

:::worked-solution[Example 1: beads in a bag]
A bag contains 4 red, 5 blue and 3 green beads. One bead is taken at random. Find the probability that it is blue.

1. Total number of beads: $4 + 5 + 3 = 12$. Each bead is equally likely to be chosen.
2. Number of blue beads: 5.
3. $\text{P(blue)} = \dfrac{5}{12}$.
:::

:::worked-solution[Example 2: rolling a fair dice]
A fair six-sided dice is rolled once. Find the probability of rolling a number greater than 4.

1. Sample space: $\{1, 2, 3, 4, 5, 6\}$, six equally likely outcomes.
2. Numbers greater than 4: 5 and 6, so 2 outcomes.
3. $\text{P(greater than 4)} = \dfrac{2}{6} = \dfrac{1}{3}$.
:::

## The probability that an event does not happen

An event either happens or it does not, so the two probabilities add up to 1.

:::formula{name="Complement"}
$$
\text{P(not } A) = 1 - \text{P}(A)
$$

Extended notation: $\text{P}(A') = 1 - \text{P}(A)$, where $A'$ means "not $A$".
:::

:::worked-solution[Example 3: not green]
Using the bag in Example 1, find the probability that the bead is **not** green.

1. $\text{P(green)} = \dfrac{3}{12} = \dfrac{1}{4}$.
2. $\text{P(not green)} = 1 - \dfrac{1}{4} = \dfrac{3}{4}$.
3. Check by counting: $4 + 5 = 9$ beads are not green, and $\dfrac{9}{12} = \dfrac{3}{4}$.
:::

## The probabilities of all the outcomes add up to 1

If an experiment has outcomes that cannot happen at the same time (they are **mutually exclusive**) and together cover every possibility, their probabilities add up to 1. This lets you find a missing probability, even for a spinner that is **biased** (not fair).

:::worked-solution[Example 4: a missing probability]
A biased spinner can land on red, blue, green or yellow. $\text{P(red)} = 0.25$, $\text{P(blue)} = 0.4$ and $\text{P(yellow)} = 0.15$. Find $\text{P(green)}$.

1. The four probabilities add up to 1.
2. $\text{P(green)} = 1 - (0.25 + 0.4 + 0.15) = 1 - 0.8 = 0.2$.
:::

## Finding an unknown number of objects

:::worked-solution[Example 5: form and solve an equation]
A bag contains 6 red counters and $x$ blue counters. The probability of taking a red counter at random is $\frac{2}{5}$. Find $x$.

1. Total number of counters: $6 + x$.
2. $\dfrac{6}{6 + x} = \dfrac{2}{5}$.
3. Cross-multiply: $30 = 2(6 + x) = 12 + 2x$, so $2x = 18$ and $x = 9$.
4. Check: $\dfrac{6}{15} = \dfrac{2}{5}$.
:::

## Common mistakes

:::mistake{title="A probability greater than 1"}
No probability can be greater than 1 or less than 0. If your answer is $\frac{12}{5}$ or $-0.2$, you have made an error, often by putting the fraction upside down.
:::

:::mistake{title="Writing a probability as a ratio"}
"3 : 8" and "3 in 8" are not accepted. Write $\frac{3}{8}$, $0.375$ or $37.5\%$.
:::

:::mistake{title="Using the wrong total"}
The denominator is the total number of **all** possible outcomes, including the one you want. With 3 black and 17 white balls, $\text{P(black)} = \frac{3}{20}$, not $\frac{3}{17}$.
:::

:::mistake{title="Assuming outcomes are equally likely"}
"It will either rain or not, so the probability is $\frac{1}{2}$" is wrong: the two outcomes are not equally likely. The counting formula only works for equally likely outcomes.
:::

## Exam tips

:::exam-tip
Simplify fractions where you can; a correct unsimplified fraction usually still earns the mark unless the question asks for the simplest form. A decimal that does not terminate should be given to 3 significant figures, for example $\frac{5}{12} \approx 0.417$.
:::

:::exam-tip
For "find $x$" questions, write the probability as a fraction containing $x$, set it equal to the given value and solve. Show the equation: it carries a method mark.
:::

:::exam-tip
Read whether a question says "not": it is often quicker to use $1 - \text{P}(A)$ than to count the outcomes.
:::

## Summary

:::summary
- Probability measures how likely an event is, on a scale from 0 (impossible) to 1 (certain).
- With equally likely outcomes, P(event) = number of outcomes in the event ÷ total number of outcomes.
- P(not $A$) $= 1 - \text{P}(A)$; Extended notation $\text{P}(A') = 1 - \text{P}(A)$.
- The probabilities of all the mutually exclusive outcomes of an experiment add up to 1.
- Give probabilities as fractions, decimals or percentages, never as ratios.
:::
