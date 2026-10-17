---
{
  "key": "probability.combined-events",
  "title": "Combined events",
  "summary": "Find probabilities of combined events from sample space diagrams, two-way tables and Venn diagrams, and use the addition rule for mutually exclusive events and the multiplication rule for independent events.",
  "concepts": ["math.probability.combined-events"],
  "objectives": ["zimsec/o-level/mathematics:14.0.1", "zimsec/o-level/mathematics:14.0.3", "cambridge/igcse/mathematics:8.3.1"],
  "estimatedMinutes": 17,
  "level": "core"
}
---
## Introduction

Many board games are played with two dice, and the total decides your move. Why does a total of 7 come up so often, and a total of 12 so rarely? To answer questions like this you need to look at **two events together**: the score on the first dice and the score on the second.

In this lesson you will list all the outcomes of a combined experiment in a **sample space diagram**, read probabilities from **two-way tables** and **Venn diagrams**, and use two rules that save a lot of counting: the **addition rule** for mutually exclusive events and the **multiplication rule** for independent events.

You should be able to find the probability of a single event and read a Venn diagram with two sets.

## Key definitions

:::definition{term="Sample space diagram"}
A table or list showing every possible outcome of a combined experiment, for example every pair of scores when two dice are rolled. It is also called a possibility diagram or an outcome table.
:::

:::definition{term="Mutually exclusive events"}
Events that cannot happen at the same time. Rolling a 2 and rolling a 5 with one dice are mutually exclusive.
:::

:::definition{term="Independent events"}
Events where the outcome of one does not affect the probability of the other, for example the result of tossing a coin and the score on a dice.
:::

:::formula{name="Addition rule (mutually exclusive events)"}
$$
\text{P}(A \text{ or } B) = \text{P}(A) + \text{P}(B)
$$
:::

:::formula{name="Multiplication rule (independent events)"}
$$
\text{P}(A \text{ and } B) = \text{P}(A) \times \text{P}(B)
$$
:::

## Sample space diagrams

When a coin is tossed and a dice is rolled, list the outcomes systematically: $H1, H2, H3, H4, H5, H6, T1, T2, T3, T4, T5, T6$. There are $2 \times 6 = 12$ equally likely outcomes.

For two dice, a grid is clearer. Each cell shows the total of the two scores:

| + | 1 | 2 | 3 | 4 | 5 | 6 |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **1** | 2 | 3 | 4 | 5 | 6 | 7 |
| **2** | 3 | 4 | 5 | 6 | 7 | 8 |
| **3** | 4 | 5 | 6 | 7 | 8 | 9 |
| **4** | 5 | 6 | 7 | 8 | 9 | 10 |
| **5** | 6 | 7 | 8 | 9 | 10 | 11 |
| **6** | 7 | 8 | 9 | 10 | 11 | 12 |

There are $6 \times 6 = 36$ equally likely outcomes. The total 7 appears 6 times (the longest diagonal), but 12 appears only once.

:::worked-solution[Example 1: two dice]
Two fair dice are rolled. Find the probability that the total is 8, and the probability of a double.

1. Totals of 8 in the grid: $(2, 6), (3, 5), (4, 4), (5, 3), (6, 2)$: 5 cells.
2. $\text{P(total 8)} = \dfrac{5}{36}$.
3. Doubles lie on the leading diagonal: 6 cells, so $\text{P(double)} = \dfrac{6}{36} = \dfrac{1}{6}$.
:::

## Two-way tables

A two-way table sorts a group by two features at once. The probability of choosing a person with a particular combination is that cell divided by the grand total.

:::worked-solution[Example 2: transport to school]
A survey of 60 learners records how they travel and whether they are in the junior or senior school.

| | Walk | Kombi | Car | Total |
| --- | :---: | :---: | :---: | :---: |
| Junior | 14 | 9 | 7 | 30 |
| Senior | 11 | 13 | 6 | 30 |
| Total | 25 | 22 | 13 | 60 |

1. P(a learner chosen at random is a senior who travels by kombi) $= \dfrac{13}{60}$.
2. P(the learner travels by car) $= \dfrac{13}{60}$, using the column total.
3. P(the learner is a junior who walks) $= \dfrac{14}{60} = \dfrac{7}{30}$.
:::

## Venn diagrams

Put the number of people (or outcomes) in each region of the Venn diagram, starting with the overlap. Then each probability is a region total divided by the total in the universal set $\mathscr{E}$.

![Venn diagram of 30 learners: Geography only 13, both subjects 5, History only 9 and neither 3, so P(Geography only) = 13/30 and P(G or H) = 27/30 = 9/10.](media:diagrams/venn-geography-history-30.png "Figure: fill in the overlap first, then each region and the outside")

:::worked-solution[Example 3: subject choices]
Of 30 learners, 18 take Geography ($G$), 14 take History ($H$) and 5 take both.

1. Overlap $G \cap H$: 5. $G$ only: $18 - 5 = 13$. $H$ only: $14 - 5 = 9$.
2. Neither: $30 - (13 + 5 + 9) = 3$.
3. $\text{P(Geography only)} = \dfrac{13}{30}$.
4. $\text{P}(G \cup H) = \dfrac{13 + 5 + 9}{30} = \dfrac{27}{30} = \dfrac{9}{10}$, and $\text{P(neither)} = \dfrac{3}{30} = \dfrac{1}{10}$.
:::

## Using the rules

:::worked-solution[Example 4: addition rule]
A biased spinner lands on red with probability $0.2$ and on blue with probability $0.35$. Find the probability that it lands on red or blue.

1. One spin cannot land on both colours, so the events are mutually exclusive.
2. $\text{P(red or blue)} = 0.2 + 0.35 = 0.55$.
:::

:::worked-solution[Example 5: multiplication rule]
A fair coin is tossed and a fair dice is rolled. Find the probability of a head and an even number.

1. The coin does not affect the dice, so the events are independent.
2. $\text{P(head and even)} = \dfrac{1}{2} \times \dfrac{3}{6} = \dfrac{1}{4}$.
3. Check with the list of 12 outcomes: $H2$, $H4$ and $H6$ give $\dfrac{3}{12} = \dfrac{1}{4}$.
:::

## Common mistakes

:::mistake{title="Missing outcomes"}
When two coins are tossed, the outcomes are $HH$, $HT$, $TH$ and $TT$. Treating "one head and one tail" as a single outcome gives the wrong answer $\frac{1}{3}$ for two heads; the correct answer is $\frac{1}{4}$.
:::

:::mistake{title="Adding when you should multiply"}
For independent events, "and" means **multiply**. Adding $\text{P}(A) + \text{P}(B)$ can even give an answer bigger than 1.
:::

:::mistake{title="Using the addition rule for overlapping events"}
$\text{P}(A \text{ or } B) = \text{P}(A) + \text{P}(B)$ only works when $A$ and $B$ cannot happen together. For "even or greater than 4" on one dice, the 6 would be counted twice. Count the outcomes instead: $2, 4, 5, 6$ gives $\frac{4}{6}$.
:::

:::mistake{title="Double-counting in a Venn diagram"}
"18 take Geography" includes the 5 who also take History. Fill in the overlap first and subtract it.
:::

## Exam tips

:::exam-tip
In a sample space diagram, write the outcome in every cell. The diagram often earns a mark of its own, and it makes the counting reliable.
:::

:::exam-tip
Before using a rule, say why it applies: "mutually exclusive, so add" or "independent, so multiply". This shows the examiner your reasoning.
:::

:::exam-tip
In a two-way table question, check whether the question asks about the whole group (divide by the grand total) or only a row or a column.
:::

## Summary

:::summary
- A sample space diagram lists every outcome of a combined experiment; two dice give 36 equally likely outcomes.
- Two-way tables and Venn diagrams give probabilities as (number in the cell or region) ÷ (total).
- Mutually exclusive events cannot happen together: $\text{P}(A \text{ or } B) = \text{P}(A) + \text{P}(B)$.
- Independent events do not affect each other: $\text{P}(A \text{ and } B) = \text{P}(A) \times \text{P}(B)$.
- List outcomes systematically so that none are missed or counted twice.
:::
