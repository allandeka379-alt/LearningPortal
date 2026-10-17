---
{
  "key": "probability.addition-product-rules",
  "title": "Addition and product rules, outcome tables and tree diagrams",
  "summary": "Combine probabilities with the addition rule (mutually exclusive events and the general rule) and the product rule (independent events), and organise two-stage trials with outcome tables and tree diagrams, with and without replacement.",
  "concepts": ["amath.probability.addition-product-rules"],
  "estimatedMinutes": 45,
  "level": "core"
}
---
## Introduction

Most probability questions involve more than one event: rolling two dice, choosing two learners for a committee, checking whether a bus is late **and** whether it rains. You could list every outcome each time, but two rules do most of the work: the **addition rule** for "or" and the **product rule** for "and". Two diagrams, the **outcome table** and the **tree diagram**, organise the outcomes so that the rules are easy to apply.

These ideas are the core of ZIMSEC Paper 2 probability questions. Tree diagrams in particular appear in almost every Section C probability question, often as the first part before a conditional probability.

## Key definitions

:::definition{term="Mutually exclusive events"}
Events that cannot happen at the same time: $P(A \cap B) = 0$. Scoring 2 and scoring 5 on one roll of a die are mutually exclusive.
:::

:::definition{term="Independent events"}
Events where the occurrence of one does not change the probability of the other. Getting a head on a coin and a six on a die are independent.
:::

:::formula{name="Addition rule for mutually exclusive events"}
$$
P(A \cup B) = P(A) + P(B)
$$
:::

:::formula{name="General addition rule"}
$$
P(A \cup B) = P(A) + P(B) - P(A \cap B)
$$
:::

:::formula{name="Product rule for independent events"}
$$
P(A \cap B) = P(A) \times P(B)
$$
:::

## The addition rule

"Or" questions use addition. If the events cannot happen together, simply add.

:::worked-solution[Example 1: in a survey, the probability that a learner walks to school is 0.35 and the probability that the learner cycles is 0.4. Each learner uses only one way of travelling. Find the probability that a learner walks or cycles.]
1. A learner cannot walk and cycle on the same journey, so the events are mutually exclusive.
2. $P(\text{walk} \cup \text{cycle}) = 0.35 + 0.4 = 0.75$.
:::

If the events can overlap, adding counts the overlap twice, so subtract it once. This is exactly the Venn diagram fact $n(A \cup B) = n(A) + n(B) - n(A \cap B)$.

:::worked-solution[Example 2: P(A) = 0.6, P(B) = 0.45 and P(A ∪ B) = 0.8. Find P(A ∩ B) and decide whether A and B are independent.]
1. General rule: $0.8 = 0.6 + 0.45 - P(A \cap B)$, so $P(A \cap B) = 1.05 - 0.8 = 0.25$.
2. If $A$ and $B$ were independent, $P(A \cap B)$ would equal $P(A) \times P(B) = 0.6 \times 0.45 = 0.27$.
3. Since $0.25 \neq 0.27$, the events are **not** independent.
4. They are not mutually exclusive either, because $P(A \cap B) \neq 0$.
:::

Example 2 shows the standard **test for independence**: compare $P(A \cap B)$ with $P(A) \times P(B)$.

:::keyfact{title="Mutually exclusive is not the same as independent"}
Mutually exclusive events cannot happen together, so if one happens the other certainly does not: knowing one changes the other's probability to 0. Two events with non-zero probabilities can therefore never be both mutually exclusive and independent.
:::

## Outcome (possibility) tables

When a trial has two stages with equally likely outcomes, such as two dice, an outcome table lists every combined outcome.

| + | 1 | 2 | 3 | 4 | 5 | 6 |
|---|---|---|---|---|---|---|
| **1** | 2 | 3 | 4 | 5 | 6 | 7 |
| **2** | 3 | 4 | 5 | 6 | 7 | 8 |
| **3** | 4 | 5 | 6 | 7 | 8 | 9 |
| **4** | 5 | 6 | 7 | 8 | 9 | 10 |
| **5** | 6 | 7 | 8 | 9 | 10 | 11 |
| **6** | 7 | 8 | 9 | 10 | 11 | 12 |

:::worked-solution[Example 3: two fair dice are rolled and the scores are added. Use the outcome table to find P(total = 8), P(total ≥ 10) and P(the two scores are equal).]
1. There are $6 \times 6 = 36$ equally likely cells.
2. Total 8 appears 5 times (2+6, 3+5, 4+4, 5+3, 6+2): $P = \frac{5}{36}$.
3. Totals 10, 11 and 12 appear $3 + 2 + 1 = 6$ times: $P(\text{total} \geq 10) = \frac{6}{36} = \frac{1}{6}$.
4. Equal scores lie on the diagonal (1+1, …, 6+6), 6 cells: $P = \frac{6}{36} = \frac{1}{6}$.
:::

## Tree diagrams

A tree diagram shows a sequence of stages. Each branch carries a probability, and the branches from any one point add up to 1.

- **Multiply along** a path to get the probability of that combination (product rule).
- **Add across** the paths that make up an event (addition rule: different paths are mutually exclusive).

:::worked-solution[Example 4: on a school day in Gweru the probability of rain is 0.3. Independently, the probability that the school bus is late is 0.2. Find the probability that it is dry and the bus is on time, and the probability that at least one of these "problems" (rain or a late bus) happens.]
1. First stage: rain 0.3, dry 0.7. Second stage (the same on every branch, because the events are independent): late 0.2, on time 0.8.
2. $P(\text{dry and on time}) = 0.7 \times 0.8 = 0.56$.
3. "At least one problem" is everything except "dry and on time": $1 - 0.56 = 0.44$.
:::

The complement trick in step 3 is worth remembering: **at least one** $= 1 - P(\text{none})$.

## With and without replacement

When objects are chosen one after another, it matters whether the first is put back.

- **With replacement**: the bag is the same for the second draw, so the second-stage probabilities repeat the first (the draws are independent).
- **Without replacement**: one object fewer remains, and the second-stage probabilities depend on what was taken first.

:::worked-solution[Example 5: a bag holds 4 red and 6 white beads. Two beads are taken at random without replacement. Find the probability that both are the same colour, and the probability that at least one is red.]
1. First draw: $P(R) = \frac{4}{10}$, $P(W) = \frac{6}{10}$.
2. After a red: 3 red and 6 white remain, so $P(R) = \frac{3}{9}$, $P(W) = \frac{6}{9}$. After a white: 4 red and 5 white remain, so $P(R) = \frac{4}{9}$, $P(W) = \frac{5}{9}$.
3. $P(RR) = \frac{4}{10} \times \frac{3}{9} = \frac{12}{90} = \frac{2}{15}$.
4. $P(WW) = \frac{6}{10} \times \frac{5}{9} = \frac{30}{90} = \frac{1}{3}$.
5. $P(\text{same colour}) = \frac{2}{15} + \frac{1}{3} = \frac{7}{15}$.
6. $P(\text{at least one red}) = 1 - P(WW) = 1 - \frac{1}{3} = \frac{2}{3}$.
:::

![Tree diagram for two beads taken without replacement from 4 red and 6 white: after a red the second-stage probabilities are 3/9 and 6/9, after a white 4/9 and 5/9; the paths give RR 2/15, RW 4/15, WR 4/15 and WW 1/3, so P(same colour) = 2/15 + 1/3 = 7/15.](media:diagrams/tree-beads-without-replacement.png "Figure: multiply along each path; the second-stage probabilities change because one bead has been removed")

With replacement the same bag gives $P(\text{same colour}) = \left(\frac{4}{10}\right)^2 + \left(\frac{6}{10}\right)^2 = \frac{13}{25}$, a different answer, so always check which situation the question describes.

:::keyfact{title="ZIMSEC and Cambridge"}
The addition and product rules, outcome tables and tree diagrams are part of ZIMSEC Paper 2 (Probability and Statistics). Cambridge 0606 does not examine probability.
:::

## Common mistakes

:::mistake{title="Adding overlapping events"}
$P(A) + P(B)$ is only correct for mutually exclusive events. Otherwise subtract $P(A \cap B)$.
:::

:::mistake{title="Multiplying dependent events with unchanged probabilities"}
Without replacement, the second-stage probabilities change: $\frac{4}{10} \times \frac{3}{9}$, not $\frac{4}{10} \times \frac{4}{10}$.
:::

:::mistake{title="Forgetting the second order"}
"One red and one white" includes red-then-white **and** white-then-red. Add both paths.
:::

:::mistake{title="Confusing independent with mutually exclusive"}
Independent events can happen together (multiply); mutually exclusive events cannot (add).
:::

## Exam tips

:::exam-tip
Draw the tree diagram even when it is not asked for, and write the probability on every branch. Check that each set of branches adds to 1.
:::

:::exam-tip
For "at least one", use $1 - P(\text{none})$; it is usually one multiplication instead of several.
:::

:::exam-tip
To *show* that events are (or are not) independent, write $P(A) \times P(B)$ as a number and compare it with $P(A \cap B)$ explicitly.
:::

## Summary

:::summary
- Mutually exclusive: $P(A \cup B) = P(A) + P(B)$. In general: $P(A \cup B) = P(A) + P(B) - P(A \cap B)$.
- Independent: $P(A \cap B) = P(A) \times P(B)$; this is also the test for independence.
- Outcome tables list equally likely combined outcomes (36 for two dice).
- On a tree diagram, multiply along branches and add across paths.
- Without replacement, the second-stage probabilities change; "at least one" $= 1 - P(\text{none})$.
:::
