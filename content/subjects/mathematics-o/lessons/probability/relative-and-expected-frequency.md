---
{
  "key": "probability.relative-and-expected-frequency",
  "title": "Relative and expected frequency",
  "summary": "Estimate probabilities from experiments using relative frequency, decide whether a dice or spinner is fair or biased, and calculate expected frequencies.",
  "concepts": ["math.probability.relative-and-expected-frequency"],
  "objectives": ["zimsec/o-level/mathematics:14.0.2", "cambridge/igcse/mathematics:8.2.1", "cambridge/igcse/mathematics:8.2.2"],
  "estimatedMinutes": 17,
  "level": "core"
}
---
## Introduction

A farmer near Chinhoyi buys a new batch of maize seed. Before planting a whole field, she tests the seed: she plants 200 seeds in a trial bed and counts how many germinate. If 184 of them grow, she can estimate the probability that a seed from this batch germinates, and use it to plan how much seed to buy.

Some probabilities, like the chance of rolling a 6 on a fair dice, can be worked out by counting equally likely outcomes. Others, like the chance that a seed germinates or that a drawing pin lands point up, cannot. For these we **experiment** and use the results. In this lesson you will estimate probabilities from experiments, judge whether a dice or spinner is fair, and predict how often an event should happen.

You should know how to calculate a probability from equally likely outcomes.

## Key definitions

:::definition{term="Relative frequency"}
The proportion of trials in which an event happened:

$$
\text{relative frequency} = \frac{\text{number of times the event happened}}{\text{total number of trials}}
$$

It is also called the **experimental probability**.
:::

:::definition{term="Theoretical probability"}
A probability worked out from equally likely outcomes, without doing an experiment, such as $\frac{1}{6}$ for rolling a 6 on a fair dice.
:::

:::definition{term="Fair and biased"}
A dice, coin or spinner is **fair** if all its outcomes are equally likely. It is **biased** if some outcomes are more likely than others.
:::

:::formula{name="Expected frequency"}
$$
\text{expected number of times} = \text{probability} \times \text{number of trials}
$$
:::

:::keyfact{title="More trials, better estimates"}
The more trials there are, the more reliable the relative frequency is as an estimate of the probability. With a small number of trials, results can be far from the true probability by chance.
:::

## Relative frequency as an estimate of probability

:::worked-solution[Example 1: the seed trial]
184 of the 200 seeds germinated. Estimate the probability that a seed from the batch germinates, and how many of 5000 seeds would be expected to germinate.

1. Relative frequency $= \dfrac{184}{200} = 0.92$.
2. Estimated probability of germinating: $0.92$.
3. Expected number from 5000 seeds $= 0.92 \times 5000 = 4600$.
:::

:::worked-solution[Example 2: a drawing pin]
A drawing pin is dropped 80 times and lands point up 28 times. Estimate the probability that it lands point up.

1. Relative frequency $= \dfrac{28}{80} = 0.35$.
2. There is no theoretical probability here: the pin is not symmetrical, so the two ways of landing are not equally likely.
:::

## How relative frequency settles down

When an experiment is repeated many times, the relative frequency tends to settle close to the true probability. In a class experiment with a fair coin, the running results might look like this:

| Number of tosses | 10 | 50 | 100 | 500 | 1000 |
| --- | :---: | :---: | :---: | :---: | :---: |
| Number of heads | 7 | 29 | 54 | 261 | 508 |
| Relative frequency | $0.7$ | $0.58$ | $0.54$ | $0.522$ | $0.508$ |

After 10 tosses the estimate ($0.7$) is far from $0.5$; after 1000 tosses it is very close. This is why the estimate from the largest number of trials is the most reliable. Notice that even after 1000 tosses the relative frequency is not exactly $0.5$: that is normal.

## Fair or biased?

To judge whether a dice or spinner is fair, compare the relative frequencies with the theoretical probabilities, or compare the observed frequencies with the expected frequencies. Small differences are normal. A large difference after a **large** number of trials is evidence of bias.

:::worked-solution[Example 3: a four-sided spinner]
A spinner numbered 1 to 4 is spun 200 times. The results are shown below.

| Score | 1 | 2 | 3 | 4 |
| --- | :---: | :---: | :---: | :---: |
| Frequency | 34 | 41 | 46 | 79 |

1. If the spinner were fair, each score would be expected $\frac{1}{4} \times 200 = 50$ times.
2. The score 4 came up 79 times: relative frequency $\dfrac{79}{200} = 0.395$, much more than $0.25$.
3. With 200 spins this is a large difference, so the spinner appears to be **biased** towards 4.
:::

## Expected frequency

Expected frequency tells you how many times an event should happen **on average**. It is a prediction, not a guarantee: a fair dice rolled 120 times is expected to show a 5 on $\frac{1}{6} \times 120 = 20$ occasions, but it might show 17 or 24.

An expected frequency does not have to be a whole number. A fair dice rolled 100 times is expected to show a six $\frac{1}{6} \times 100 \approx 16.7$ times (to 3 significant figures), which you can describe as "about 17 times".

:::worked-solution[Example 4: working backwards]
The probability that a spinner lands on red is $0.3$. In an experiment, red is expected 45 times. How many spins are in the experiment?

1. $0.3 \times n = 45$.
2. $n = 45 \div 0.3 = 150$ spins.
:::

## Common mistakes

:::mistake{title="Expecting the exact theoretical result"}
A fair coin tossed 10 times does not have to give exactly 5 heads. Expected frequency is an average over many repeats, not a promise.
:::

:::mistake{title="Trusting a small experiment"}
Three heads in four tosses does not show that a coin is biased. Only a large number of trials gives a reliable estimate.
:::

:::mistake{title="Dividing by the wrong total"}
Relative frequency divides by the **total number of trials**, not by the number of times something else happened.
:::

:::mistake{title="Using relative frequency when a theoretical value is known"}
For a fair dice, use $\frac{1}{6}$. Use relative frequency when no theoretical probability exists or when the question says the dice may be biased.
:::

## Exam tips

:::exam-tip
"**Estimate** the probability" after an experiment means "give the relative frequency". Show the fraction before you simplify or convert it.
:::

:::exam-tip
When asked whether a dice is fair, give a reason with numbers: compare a relative frequency with the theoretical probability (for example $0.395$ compared with $0.25$) and mention the number of trials.
:::

:::exam-tip
If several estimates are given, the most reliable one comes from the **largest** number of trials.
:::

## Summary

:::summary
- Relative frequency $=$ number of times the event happened ÷ total number of trials; it estimates the probability.
- More trials give a more reliable estimate.
- A fair object has equally likely outcomes; a biased one does not. Big differences after many trials suggest bias.
- Expected frequency $=$ probability $\times$ number of trials; it is an average, not a guaranteed result.
:::
