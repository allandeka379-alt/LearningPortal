---
{
  "key": "probability.set-language",
  "title": "Probability language: sample spaces, events and Venn diagrams",
  "summary": "Use the words of probability (trial, outcome, sample space, event), write events in set notation (A ∪ B, A ∩ B, A′), and find probabilities from Venn diagrams with two or three events.",
  "concepts": ["amath.probability.set-language"],
  "estimatedMinutes": 40,
  "freePreview": true,
  "level": "core"
}
---
## Introduction

Probability measures how likely something is to happen. A seed company in Chinhoyi wants to know the chance that a maize seed germinates; a Lake Kariba fishing co-operative wants the chance of a good catch; a school wants the chance that a learner chosen at random takes both Geography and History. Before any of these can be calculated, you need a precise language for what can happen and a way of organising the possibilities.

This lesson sets up that language. It borrows the notation of **sets**, which you already know, and uses **Venn diagrams** to picture events. In ZIMSEC Paper 2, Venn diagram questions appear in Section A and as the opening parts of longer Section C questions, and the same notation runs through every later probability topic: the addition rule, conditional probability and probability distributions.

## Key definitions

:::definition{term="Trial (experiment)"}
An action whose result is uncertain, such as rolling a die, tossing a coin or choosing a learner at random from a class.
:::

:::definition{term="Outcome"}
One possible result of a trial. Rolling a die has six outcomes: 1, 2, 3, 4, 5 and 6.
:::

:::definition{term="Sample space"}
The set $S$ of all possible outcomes of a trial. For one roll of a die, $S = \{1, 2, 3, 4, 5, 6\}$ and $n(S) = 6$.
:::

:::definition{term="Event"}
A set of outcomes, that is, a subset of the sample space. "The score is even" is the event $A = \{2, 4, 6\}$. An event **happens** when the outcome of the trial is one of its members.
:::

:::definition{term="Equally likely outcomes"}
Outcomes that all have the same chance of happening, such as the faces of a fair die or the learners of a class chosen "at random".
:::

:::formula{name="Probability with equally likely outcomes"}
$$
P(A) = \frac{n(A)}{n(S)} = \frac{\text{number of outcomes in } A}{\text{number of outcomes in the sample space}}
$$
:::

Every probability lies on the scale $0 \leq P(A) \leq 1$: an impossible event has probability 0 and a certain event has probability 1.

## Events written as sets

Because events are sets, the set operations describe combined events.

| Notation | Read as | Meaning for the events |
|---|---|---|
| $A \cup B$ | $A$ union $B$ | $A$ happens **or** $B$ happens (or both) |
| $A \cap B$ | $A$ intersection $B$ | $A$ **and** $B$ both happen |
| $A'$ | the complement of $A$ | $A$ does **not** happen |
| $A \cap B'$ | $A$ and not $B$ | $A$ happens but $B$ does not ("$A$ only") |
| $(A \cup B)'$ | neither $A$ nor $B$ | neither event happens |

Since every outcome is either in $A$ or in $A'$, but never both,

$$
P(A') = 1 - P(A)
$$

Two events with no outcomes in common, $A \cap B = \varnothing$, are called **mutually exclusive**: they cannot happen together. On a Venn diagram their circles do not overlap.

:::worked-solution[Example 1: a fair die is rolled once. A is the event "the score is even" and B is "the score is more than 3". Find P(A ∪ B), P(A ∩ B) and P(A′).]
1. $S = \{1, 2, 3, 4, 5, 6\}$, $A = \{2, 4, 6\}$, $B = \{4, 5, 6\}$.
2. $A \cup B = \{2, 4, 5, 6\}$, so $P(A \cup B) = \frac{4}{6} = \frac{2}{3}$.
3. $A \cap B = \{4, 6\}$, so $P(A \cap B) = \frac{2}{6} = \frac{1}{3}$.
4. $A' = \{1, 3, 5\}$, so $P(A') = \frac{3}{6} = \frac{1}{2}$, which agrees with $1 - P(A)$.
:::

## Venn diagrams for two events

A Venn diagram draws the sample space as a rectangle and each event as a circle inside it. With two overlapping circles there are **four regions**: $A$ only, $B$ only, both, and neither. Fill them **from the inside out**: the overlap first, then the rest of each circle, then the outside, so that nothing is counted twice.

:::worked-solution[Example 2: in a Form 4 class of 40 learners, 23 study Geography (G), 18 study History (H) and 7 study both. A learner is chosen at random. Find the probability that the learner studies neither subject, exactly one of them, and at least one of them.]
1. Overlap: $n(G \cap H) = 7$.
2. Geography only: $23 - 7 = 16$. History only: $18 - 7 = 11$.
3. Neither: $40 - (16 + 11 + 7) = 6$.
4. $P(\text{neither}) = \frac{6}{40} = \frac{3}{20}$.
5. $P(\text{exactly one}) = \frac{16 + 11}{40} = \frac{27}{40}$.
6. $P(G \cup H) = \frac{16 + 11 + 7}{40} = \frac{34}{40} = \frac{17}{20}$, which also equals $1 - \frac{3}{20}$.
:::

Notice that $23 + 18 = 41$ is more than the class: adding the two circle totals counts the 7 learners in the overlap twice.

## Venn diagrams for three events

Three overlapping circles make **eight regions**: one in all three circles, three in exactly two circles, three in exactly one circle, and the outside. The order of filling is the same: the centre first, then the three "two only" regions, then the "one only" regions, then the outside.

:::worked-solution[Example 3: a survey of 60 households in a village near Masvingo records whether each keeps cattle (C), goats (G) or chickens (K). 30 keep cattle, 25 keep goats and 28 keep chickens; 5 keep all three; 7 keep cattle and goats only, 4 keep goats and chickens only and 6 keep cattle and chickens only. Find the probability that a household chosen at random keeps exactly two kinds of animal, exactly one kind, and none of them.]
1. Centre: 5. "Two only" regions: 7, 4 and 6 (given).
2. Cattle only: $30 - 5 - 7 - 6 = 12$.
3. Goats only: $25 - 5 - 7 - 4 = 9$.
4. Chickens only: $28 - 5 - 4 - 6 = 13$.
5. Inside the circles: $12 + 9 + 13 + 7 + 4 + 6 + 5 = 56$, so none: $60 - 56 = 4$.
6. $P(\text{exactly two}) = \frac{7 + 4 + 6}{60} = \frac{17}{60}$.
7. $P(\text{exactly one}) = \frac{12 + 9 + 13}{60} = \frac{34}{60} = \frac{17}{30}$.
8. $P(\text{none}) = \frac{4}{60} = \frac{1}{15}$.
:::

## Venn diagrams with probabilities

A Venn diagram can hold probabilities instead of counts. The four (or eight) regions then add up to 1, and the same inside-out method works.

:::worked-solution[Example 4: for events A and B, P(A) = 0.45, P(B) = 0.3 and P(A ∩ B) = 0.12. Complete a Venn diagram of probabilities and find P(A ∪ B) and P(neither).]
1. Overlap: $0.12$.
2. $A$ only: $0.45 - 0.12 = 0.33$. $B$ only: $0.3 - 0.12 = 0.18$.
3. Outside: $1 - (0.33 + 0.18 + 0.12) = 0.37$.
4. $P(A \cup B) = 0.33 + 0.18 + 0.12 = 0.63$.
5. $P\left((A \cup B)'\right) = 0.37$, which is $1 - 0.63$.
:::

When a region contains an unknown, such as $x$ learners in all three circles, write every region in terms of $x$, add all the regions and set the total equal to the size of the sample space. The resulting linear equation gives $x$.

:::keyfact{title="ZIMSEC and Cambridge"}
Probability is in the ZIMSEC Additional Mathematics syllabus (Paper 2, Probability and Statistics) only; Cambridge 0606 does not examine probability. The notation $A'$ for the complement is standard in ZIMSEC papers.
:::

## Common mistakes

:::mistake{title="Adding circle totals"}
$n(A) + n(B)$ counts the overlap twice. Use $n(A \cup B) = n(A) + n(B) - n(A \cap B)$, or fill the regions of the Venn diagram first.
:::

:::mistake{title="Filling a Venn diagram from the outside"}
Writing 23 in the "Geography" part of the circle when 7 of those learners are also in the overlap double counts. Start with the overlap and subtract.
:::

:::mistake{title="Confusing ∪ and ∩"}
$A \cup B$ is "$A$ or $B$ or both" (the larger set); $A \cap B$ is "both $A$ and $B$" (the smaller set).
:::

:::mistake{title="Forgetting the outside region"}
Some outcomes may lie in none of the events. They still belong to the sample space and count in $n(S)$.
:::

## Exam tips

:::exam-tip
When asked to *draw* or *complete* a Venn diagram, label the rectangle (with $n(S)$ or "1") and every circle, and write a number in every region, including 0 and the outside.
:::

:::exam-tip
Leave probabilities as fractions in their lowest terms, or give decimals exactly. A probability never exceeds 1, so an answer above 1 is a signal to recheck.
:::

:::exam-tip
"Exactly one", "at least one" and "neither" are different events: read the wording and shade the regions you mean before adding.
:::

## Summary

:::summary
- A trial has outcomes; the sample space $S$ is the set of all outcomes; an event is a subset of $S$.
- With equally likely outcomes, $P(A) = \frac{n(A)}{n(S)}$, and $0 \leq P(A) \leq 1$.
- $A \cup B$ means $A$ or $B$ (or both), $A \cap B$ means both, $A'$ means not $A$, and $P(A') = 1 - P(A)$.
- Venn diagrams have 4 regions for two events and 8 for three; fill them from the centre outwards.
- Venn diagrams can hold counts or probabilities; the regions add up to $n(S)$ or to 1.
:::
