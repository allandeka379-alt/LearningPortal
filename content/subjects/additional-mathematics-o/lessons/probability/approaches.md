---
{
  "key": "probability.approaches",
  "title": "Approaches to probability: classical, experimental and subjective",
  "summary": "Find probabilities in three ways (classical from equally likely outcomes, experimental from relative frequency, subjective from judgement), compare the approaches, and use expected frequency = number of trials × probability.",
  "concepts": ["amath.probability.approaches"],
  "estimatedMinutes": 35,
  "level": "core"
}
---
## Introduction

Where does a probability come from? Sometimes it follows from symmetry: a fair coin has two faces, so the chance of a head is $\frac{1}{2}$. Sometimes there is no symmetry to use, and the only honest way to find a probability is to repeat an experiment many times and count: a seed supplier in Chinhoyi plants 500 seeds to estimate the germination rate. And sometimes there is neither symmetry nor data, so an expert has to give a considered judgement, as when a forecaster says there is a 70% chance of rain in Harare tomorrow.

The ZIMSEC syllabus asks you to **describe** these three approaches (classical, experimental and subjective), to calculate with the first two, and to know when each is appropriate. Questions are short but common in Paper 2 Section A, and expected frequency appears again whenever probability meets real data.

## Key definitions

:::definition{term="Objective probability"}
A probability found from facts rather than opinion. It comes in two kinds: **classical** (theoretical) probability, worked out from equally likely outcomes, and **experimental** probability, estimated from the results of repeated trials.
:::

:::definition{term="Classical (theoretical) probability"}
When all outcomes of a trial are equally likely, $P(A) = \dfrac{n(A)}{n(S)}$. No experiment is needed; the probability follows from the structure of the trial.
:::

:::definition{term="Relative frequency (experimental probability)"}
If an event happens $k$ times in $n$ repetitions of a trial, its relative frequency is $\dfrac{k}{n}$. As $n$ grows, the relative frequency settles down towards the true probability.
:::

:::definition{term="Subjective probability"}
A probability that expresses a person's degree of belief, based on experience, expertise or available information, for example a coach's estimate that a team will win a match.
:::

:::formula{name="Expected frequency"}
$$
\text{expected frequency} = n \times P(A)
$$
:::

Here $n$ is the number of trials. The expected frequency is a long-run average, not a promise: the actual count will usually differ a little from it.

## The probability scale

All three approaches give a number on the same scale from 0 to 1. A probability of 0 means the event is impossible; 1 means it is certain; $\frac{1}{2}$ means it is as likely to happen as not. Probabilities may be written as fractions, decimals or percentages ("a 30% chance" is 0.3), but never as a number greater than 1 or less than 0.

## Classical probability

Classical probability needs **equally likely** outcomes. Fair coins, fair dice, well-shuffled cards and "a person chosen at random" all provide them.

:::worked-solution[Example 1: a bag contains 5 red, 7 blue and 8 green counters. One counter is taken at random. Find the probability that it is blue, and the probability that it is not blue.]
1. There are $5 + 7 + 8 = 20$ counters, each equally likely to be chosen.
2. $P(\text{blue}) = \frac{7}{20}$.
3. $P(\text{not blue}) = 1 - \frac{7}{20} = \frac{13}{20}$, which is also $\frac{5 + 8}{20}$.
:::

Classical probability fails when the outcomes are **not** equally likely. A drawing pin dropped on a table lands "point up" or "point down", but there is no reason to believe these are equally likely, so the probability is not $\frac{1}{2}$.

## Experimental probability

When symmetry gives no answer, repeat the trial and count. The relative frequency $\frac{k}{n}$ is the estimate of the probability.

:::worked-solution[Example 2: Nyasha drops a drawing pin repeatedly and records how often it lands point up. Find the relative frequency after each stage and estimate the probability.]
The running totals were:

| Number of drops $n$ | 20 | 50 | 100 | 250 |
|---|---|---|---|---|
| Point up $k$ | 9 | 21 | 37 | 95 |
| Relative frequency $k/n$ | 0.45 | 0.42 | 0.37 | 0.38 |

1. Each relative frequency is $k \div n$, for example $95 \div 250 = 0.38$.
2. The early values jump around; by 100 and 250 drops they settle near 0.38.
3. The best estimate uses the most trials: $P(\text{point up}) \approx 0.38$.
4. In 1000 further drops Nyasha would expect about $1000 \times 0.38 = 380$ to land point up.
:::

The key idea is that **more trials give a more reliable estimate**. An estimate from 20 trials can be badly wrong; one from 250 trials is much better. This is sometimes called the law of large numbers.

## Using experiments to test whether something is fair

If a coin, die or spinner is fair, its relative frequencies should be close to the classical probabilities after many trials. A large, persistent difference suggests bias.

:::worked-solution[Example 3: a spinner has four equal sectors labelled 1 to 4. Farai spins it 200 times and records the counts 62, 45, 48 and 45. Is there evidence that the spinner is biased?]
1. If the spinner is fair, each number has probability $\frac{1}{4}$, so the expected frequency of each is $200 \times \frac{1}{4} = 50$.
2. Relative frequencies: $\frac{62}{200} = 0.31$, $\frac{45}{200} = 0.225$, $\frac{48}{200} = 0.24$, $\frac{45}{200} = 0.225$.
3. The value for "1" (0.31, or 62 against an expected 50) is well above 0.25, while the others are slightly below.
4. Conclusion: there is some evidence that the spinner favours 1. Spinning it many more times would show whether this difference persists or is chance.
:::

## Expected frequency

Whichever way a probability was found, multiplying by the number of trials gives the number of times the event is expected to happen.

:::worked-solution[Example 4: a spinner lands on red with probability 0.15. It is spun 360 times. How many reds are expected? A fair die is rolled 270 times: how many sixes are expected?]
1. Expected reds: $360 \times 0.15 = 54$.
2. For the die, $P(6) = \frac{1}{6}$ (classical), so expected sixes: $270 \times \frac{1}{6} = 45$.
3. Neither number is guaranteed; in a real experiment the counts will be close to 54 and 45 but rarely exactly equal.
:::

## Subjective probability

Many important events cannot be repeated and have no equally likely outcomes: whether it rains on a particular day, whether a new clinic opens on time, whether Zimbabwe wins its next cricket match. A probability for such an event is a **judgement**, informed by knowledge but not calculated from a formula. Different people can reasonably give different subjective probabilities for the same event.

| Approach | Based on | Example | Limitation |
|---|---|---|---|
| Classical | equally likely outcomes | $P(\text{head}) = \frac{1}{2}$ for a fair coin | needs symmetry; the outcomes must be equally likely |
| Experimental | relative frequency in many trials | germination rate of seeds from a trial planting | only an estimate; needs many repeatable trials |
| Subjective | judgement or degree of belief | a forecaster's chance of rain | depends on the person; cannot be checked by repetition |

:::keyfact{title="ZIMSEC and Cambridge"}
The approaches to probability are part of the ZIMSEC Probability and Statistics topic (Paper 2). Cambridge 0606 does not examine probability.
:::

## Common mistakes

:::mistake{title="Assuming outcomes are equally likely"}
"Two outcomes, so the probability is one half" is only true when the two outcomes are equally likely. A drawing pin, a bottle top or a weighted die needs an experiment.
:::

:::mistake{title="Treating expected frequency as exact"}
Expecting 45 sixes in 270 rolls does not mean you will get 45 sixes. Expected frequency is a long-run average.
:::

:::mistake{title="Trusting a small experiment"}
A relative frequency from 10 or 20 trials can be far from the true probability. Use the estimate based on the largest number of trials.
:::

:::mistake{title="Calling a judgement 'objective'"}
A probability based on someone's opinion or experience is subjective, even if the person is an expert.
:::

## Exam tips

:::exam-tip
When asked to *explain* which approach was used, name it and give the reason in a few words: "experimental, because it was estimated from the results of repeated trials".
:::

:::exam-tip
For "how many times would you expect…", multiply the number of trials by the probability. The answer need not be a whole number, but in context it is usually rounded sensibly.
:::

:::exam-tip
To judge whether a dice, coin or spinner is fair, compare observed and expected frequencies and comment on the size of the difference and the number of trials.
:::

## Summary

:::summary
- Objective probability is classical (from equally likely outcomes) or experimental (relative frequency $\frac{k}{n}$ from repeated trials).
- Subjective probability is a degree of belief based on judgement.
- Relative frequencies settle down as the number of trials grows; more trials give better estimates.
- Expected frequency $= n \times P(A)$, a long-run average, not an exact prediction.
- Probabilities always lie between 0 (impossible) and 1 (certain).
:::
