---
{
  "key": "probability.conditional-probability",
  "title": "Conditional probability",
  "summary": "Calculate the probability of an event given that another event has happened, using two-way tables, Venn diagrams and tree diagrams (Cambridge Extended).",
  "concepts": ["math.probability.conditional"],
  "objectives": ["cambridge/igcse/mathematics:8.4.1"],
  "estimatedMinutes": 15,
  "level": "extended"
}
---
## Introduction

A school in Masvingo has 120 learners in Form 3. If you choose one at random, the probability that they play chess might be one value. But if you are told that the learner is a **boarder**, the probability may be quite different, because boarders have more time in the evenings. Extra information changes a probability.

The probability of an event **given that** another event has happened is called a **conditional probability**. This is a Cambridge IGCSE Extended topic. You will find conditional probabilities from two-way tables, Venn diagrams and tree diagrams. No special formula or notation is required: the key idea is to **restrict** attention to the outcomes where the given event happened.

You should be confident with two-way tables, two-set Venn diagrams and tree diagrams.

## Key definitions

:::definition{term="Conditional probability"}
The probability that an event happens **given that** another event is known to have happened.
:::

:::keyfact{title="Restrict, then count"}
Given that $B$ has happened, only the outcomes in $B$ are possible. So

$$
\text{probability of } A \text{ given } B = \frac{\text{number of outcomes in both } A \text{ and } B}{\text{number of outcomes in } B}
$$

The denominator is the total for the **given** event, not the grand total.
:::

## From a two-way table

:::worked-solution[Example 1: boarders and chess]
The table shows 120 Form 3 learners.

| | Plays chess | Does not play chess | Total |
| --- | :---: | :---: | :---: |
| Boarder | 18 | 42 | 60 |
| Day scholar | 12 | 48 | 60 |
| Total | 30 | 90 | 120 |

1. A learner is chosen at random. Given that the learner is a boarder, look only at the Boarder row: 60 learners.
2. 18 of them play chess, so the probability is $\dfrac{18}{60} = \dfrac{3}{10}$.
3. Given instead that the learner plays chess, look only at the chess column: 30 learners, 18 of them boarders, so the probability that the learner is a boarder is $\dfrac{18}{30} = \dfrac{3}{5}$.
:::

Notice that "the probability of chess given boarder" and "the probability of boarder given chess" are different. Always check which event is **given**.

## From a Venn diagram

:::worked-solution[Example 2: tea and coffee]
50 people were asked what they drink. 28 drink tea ($T$), 20 drink coffee ($C$) and 8 drink both.

1. Fill in the regions: $T$ only $= 20$, both $= 8$, $C$ only $= 12$, neither $= 50 - 40 = 10$.
2. Given that a person drinks coffee, only the 20 people in circle $C$ count.
3. Of these, 8 also drink tea, so the probability is $\dfrac{8}{20} = \dfrac{2}{5}$.
:::

## From a sample space

:::worked-solution[Example 3: two dice]
Two fair dice are rolled. Given that the total is 8, find the probability that both dice show the same number.

1. Outcomes with total 8: $(2, 6), (3, 5), (4, 4), (5, 3), (6, 2)$: 5 equally likely outcomes.
2. Only $(4, 4)$ is a double.
3. The probability is $\dfrac{1}{5}$. Compare this with $\dfrac{6}{36} = \dfrac{1}{6}$ for a double when nothing is known about the total.
:::

## From a tree diagram

The branches for the second event in a tree diagram are already conditional probabilities: after a red counter is removed, the probability of red on the next draw is a probability **given** that the first was red.

A tree can also answer "given" questions about the whole experiment. Find the probability of the given event by adding its paths, then find what fraction of it the required outcome makes up.

:::worked-solution[Example 4: same colour]
A bag contains 4 red and 6 blue counters. Two are taken without replacement. Given that they are the same colour, find the probability that both are red.

1. $\text{P(RR)} = \dfrac{4}{10} \times \dfrac{3}{9} = \dfrac{12}{90}$ and $\text{P(BB)} = \dfrac{6}{10} \times \dfrac{5}{9} = \dfrac{30}{90}$.
2. $\text{P(same colour)} = \dfrac{12}{90} + \dfrac{30}{90} = \dfrac{42}{90}$.
3. Given the same colour, the probability of both red is $\dfrac{12}{90} \div \dfrac{42}{90} = \dfrac{12}{42} = \dfrac{2}{7}$.
:::

The same idea works in general: the probability of $A$ given $B$ equals the probability of both $A$ and $B$, divided by the probability of $B$.

## Common mistakes

:::mistake{title="Dividing by the grand total"}
"Given that the learner is a boarder" means the denominator is the number of boarders (60), not all 120 learners.
:::

:::mistake{title="Reversing the condition"}
The probability of a boarder given chess ($\frac{3}{5}$) is not the same as the probability of chess given a boarder ($\frac{3}{10}$). Underline the event after "given that".
:::

:::mistake{title="Ignoring the information"}
If you are told the total of two dice is 8, the 36-outcome grid is no longer the right sample space; only the 5 outcomes with total 8 remain.
:::

## Exam tips

:::exam-tip
When you see "**given that**", circle the given group in the table or Venn diagram before you calculate. Your denominator is the total of that group.
:::

:::exam-tip
In tree diagram questions, write the probability of the given event first (adding the right paths), then divide. Show both steps: each usually earns a method mark.
:::

:::exam-tip
Check that your conditional probability makes sense: it must still lie between 0 and 1, and the numerator group must be part of the denominator group.
:::

## Summary

:::summary
- A conditional probability is the probability of an event given that another event has happened.
- Restrict to the given group: probability $=$ (number in both) ÷ (number in the given group).
- In a two-way table use the given row or column total; in a Venn diagram use the total of the given circle or region.
- Second-stage branches of a tree diagram are conditional probabilities; for "given" questions, divide the probability of the paths you want by the probability of the given event.
- The probability of $A$ given $B$ is usually different from the probability of $B$ given $A$.
:::
