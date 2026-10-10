---
{
  "key": "probability.events-rules",
  "title": "Probability: sample spaces, events and the addition rule",
  "summary": "Use the language of probability, list equally likely outcomes in sample spaces and outcome tables, use Venn diagrams, recognise mutually exclusive and exhaustive events, add probabilities, and find probabilities by counting with permutations and combinations.",
  "concepts": ["amaths.probability.events-rules"],
  "estimatedMinutes": 45,
  "level": "core",
  "freePreview": true
}
---
## Introduction

Will it rain in Harare tomorrow? Will a seed germinate? Will a randomly chosen learner wear glasses? Probability puts a number between 0 and 1 on how likely an event is. It is the foundation of every later statistics topic: random variables, the binomial and normal distributions, and hypothesis tests.

This lesson covers ZIMSEC Statistics (Forms 5–6, probability) and Cambridge 9709 Paper 5 (topic 5.3). Both boards examine equally likely outcomes, sample spaces, mutually exclusive events and probabilities found by counting with permutations and combinations. ZIMSEC also uses Venn diagrams, outcome tables and the **general addition rule**.

## Key definitions

:::definition{term="Experiment, outcome, sample space, event"}
An **experiment** (or trial) has several possible **outcomes**. The set of all outcomes is the **sample space** $S$. An **event** is a set of outcomes, such as "the score is even".
:::

:::definition{term="Probability with equally likely outcomes"}
If all outcomes are equally likely,
$$
\mathrm{P}(A) = \frac{n(A)}{n(S)} = \frac{\text{number of outcomes in } A}{\text{total number of outcomes}}
$$
:::

:::definition{term="Complement"}
$A'$ ("not $A$") contains the outcomes not in $A$: $\mathrm{P}(A') = 1 - \mathrm{P}(A)$.
:::

:::definition{term="Mutually exclusive and exhaustive events"}
Events are **mutually exclusive** if they cannot happen together: $\mathrm{P}(A \cap B) = 0$. Events are **exhaustive** if together they cover the whole sample space: at least one of them must happen.
:::

:::formula{name="Addition rules (not in MF19)"}
For mutually exclusive events: $\mathrm{P}(A \cup B) = \mathrm{P}(A) + \mathrm{P}(B)$.

In general:
$$
\mathrm{P}(A \cup B) = \mathrm{P}(A) + \mathrm{P}(B) - \mathrm{P}(A \cap B)
$$
:::

## Sample spaces and outcome tables

When two things happen together, such as throwing two dice, list the outcomes in a **possibility table**. Two fair six-sided dice give $6 \times 6 = 36$ equally likely outcomes.

:::worked-solution[Example 1: two fair dice are thrown and the scores added]
1. A total of 8 comes from $(2, 6), (3, 5), (4, 4), (5, 3), (6, 2)$: 5 outcomes, so $\mathrm{P}(\text{total} = 8) = \frac{5}{36}$.
2. A total of at least 10 comes from 10 (3 ways), 11 (2 ways) and 12 (1 way): $\mathrm{P}(\text{total} \ge 10) = \frac{6}{36} = \frac{1}{6}$.
3. $\mathrm{P}(\text{total} < 10) = 1 - \frac{1}{6} = \frac{5}{6}$, using the complement.
:::

:::worked-solution[Example 2: a spinner numbered 1 to 4 and a spinner numbered 1 to 3 are spun and the scores multiplied]
| × | 1 | 2 | 3 |
| --- | --- | --- | --- |
| 1 | 1 | 2 | 3 |
| 2 | 2 | 4 | 6 |
| 3 | 3 | 6 | 9 |
| 4 | 4 | 8 | 12 |

1. There are 12 equally likely outcomes.
2. Even products: 2, 2, 4, 6, 6, 4, 8, 12, which is 8 outcomes, so $\mathrm{P}(\text{even}) = \frac{8}{12} = \frac{2}{3}$.
3. Products greater than 6: 8, 9, 12, so $\mathrm{P} = \frac{3}{12} = \frac{1}{4}$.
:::

## Venn diagrams and the addition rule

A Venn diagram shows overlapping events. Fill it from the **middle outwards**: the intersection first, then the rest of each circle, then the region outside.

:::worked-solution[Example 3: in a class of 30 learners, 17 take Biology, 12 take Chemistry and 6 take both]
1. Intersection: 6. Biology only: $17 - 6 = 11$. Chemistry only: $12 - 6 = 6$.
2. Neither: $30 - (11 + 6 + 6) = 7$, so $\mathrm{P}(\text{neither}) = \frac{7}{30}$.
3. $\mathrm{P}(B \cup C) = \frac{17}{30} + \frac{12}{30} - \frac{6}{30} = \frac{23}{30}$, which agrees with $1 - \frac{7}{30}$.
4. Biology and Chemistry are not mutually exclusive, because $\mathrm{P}(B \cap C) = \frac{6}{30} \ne 0$.
:::

Adding $\mathrm{P}(A)$ and $\mathrm{P}(B)$ counts the overlap twice, which is why the general rule subtracts $\mathrm{P}(A \cap B)$ once. When $A$ and $B$ are mutually exclusive the overlap is empty and the simple rule applies.

## Probability by counting

When objects are chosen at random, every selection (or arrangement) is equally likely, so

$$
\mathrm{P}(A) = \frac{\text{number of selections (or arrangements) in } A}{\text{total number of selections (or arrangements)}}
$$

:::worked-solution[Example 4: 3 balls are taken at random, without replacement, from a bag of 5 red and 4 blue balls]
1. Total selections: ${}^9C_3 = 84$.
2. Exactly 2 red: choose 2 of the 5 red and 1 of the 4 blue: ${}^5C_2 \times {}^4C_1 = 10 \times 4 = 40$.
3. $\mathrm{P}(\text{exactly 2 red}) = \frac{40}{84} = \frac{10}{21}$.
4. All blue: ${}^4C_3 = 4$, so $\mathrm{P} = \frac{4}{84} = \frac{1}{21}$.
:::

:::worked-solution[Example 5: 7 people, including Nyasha and Farai, stand in a line in random order]
1. Total arrangements: $7!$.
2. Nyasha and Farai together: block them, $6!$ arrangements, times $2$ for the order inside the block.
3. $\mathrm{P}(\text{together}) = \frac{2 \times 6!}{7!} = \frac{2}{7}$.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards examine equally likely outcomes, mutually exclusive events and probabilities found with permutations and combinations (ZIMSEC 6.3, Cambridge 5.3). ZIMSEC uses the general addition rule $\mathrm{P}(A \cup B) = \mathrm{P}(A) + \mathrm{P}(B) - \mathrm{P}(A \cap B)$, Venn diagrams and outcome tables explicitly; Cambridge does not require the general rule, though Venn diagrams may still appear.
:::

## Common mistakes

:::mistake{title="Adding probabilities of events that overlap"}
$\mathrm{P}(A) + \mathrm{P}(B)$ is only $\mathrm{P}(A \cup B)$ when $A$ and $B$ are mutually exclusive.
:::

:::mistake{title="Treating totals as equally likely"}
The totals 2 to 12 of two dice are not equally likely; the 36 ordered pairs are.
:::

:::mistake{title="Filling a Venn diagram from the outside"}
Putting 17 in the "Biology only" region double counts the 6 who take both. Start with the intersection.
:::

:::mistake{title="Confusing exclusive with exhaustive"}
"Even" and "a six" on one die are not exclusive (6 is both); "odd" and "even" are exclusive **and** exhaustive.
:::

## Exam tips

:::exam-tip
Give probabilities as exact fractions or decimals to 3 significant figures; never as ratios ("3 : 8") or percentages unless asked.
:::

:::exam-tip
For "at least one", use the complement: $1 - \mathrm{P}(\text{none})$.
:::

:::exam-tip
When counting, show the expression, such as $\frac{{}^5C_2 \times {}^4C_1}{{}^9C_3}$, before simplifying.
:::

## Summary

:::summary
- With equally likely outcomes, $\mathrm{P}(A) = \frac{n(A)}{n(S)}$; $\mathrm{P}(A') = 1 - \mathrm{P}(A)$.
- List outcomes of two-stage experiments in a possibility table (36 outcomes for two dice).
- Fill Venn diagrams from the intersection outwards.
- Mutually exclusive: $\mathrm{P}(A \cup B) = \mathrm{P}(A) + \mathrm{P}(B)$; in general (ZIMSEC) subtract $\mathrm{P}(A \cap B)$.
- With random selections or arrangements, count favourable and total cases with ${}^nC_r$, ${}^nP_r$ or $n!$.
:::
