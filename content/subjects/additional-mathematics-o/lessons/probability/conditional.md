---
{
  "key": "probability.conditional",
  "title": "Conditional probability",
  "summary": "Find the probability of an event given that another has happened, P(A | B) = P(A ∩ B) / P(B), from two-way tables, Venn diagrams and tree diagrams; test independence; and work backwards through a tree to a 'reverse' conditional probability.",
  "concepts": ["amath.probability.conditional"],
  "estimatedMinutes": 45,
  "level": "core"
}
---
## Introduction

New information changes probabilities. The chance that a learner chosen at random uses the school library is one thing; the chance **given that** the learner is a boarder may be quite different. A doctor in Masvingo knows the chance that a patient has malaria, but wants the chance **given that** the rapid test is positive. A seed farmer knows how well each supplier's seeds germinate, but a seedling has come up and she wants to know which supplier it probably came from.

All of these are **conditional probabilities**. They are the natural final step of most ZIMSEC Paper 2 probability questions: after a tree diagram or a Venn diagram has been set up, the last part usually asks "given that …, find the probability that …". This lesson shows how to read conditional probabilities from tables and diagrams, how to use them to test independence, and how to reverse the direction of a tree diagram.

## Key definitions

:::definition{term="Conditional probability"}
The probability that $A$ happens **given that** $B$ has happened, written $P(A \mid B)$. Knowing that $B$ happened shrinks the sample space to $B$.
:::

:::formula{name="Conditional probability"}
$$
P(A \mid B) = \frac{P(A \cap B)}{P(B)}, \qquad P(B) \neq 0
$$
:::

:::formula{name="Multiplication rule (rearranged)"}
$$
P(A \cap B) = P(B) \times P(A \mid B) = P(A) \times P(B \mid A)
$$
:::

:::definition{term="Independence (conditional form)"}
$A$ and $B$ are independent when $P(A \mid B) = P(A)$: knowing that $B$ happened does not change the probability of $A$. This is equivalent to $P(A \cap B) = P(A) \times P(B)$.
:::

## Why the formula works

When you are told that $B$ has happened, only the outcomes in $B$ are still possible. Among those, the ones where $A$ also happens are the outcomes in $A \cap B$. So $P(A \mid B)$ is the fraction of $B$ that is also in $A$. With equally likely outcomes this is simply

$$
P(A \mid B) = \frac{n(A \cap B)}{n(B)}
$$

**The denominator is always the "given" event.** That single idea answers most conditional probability questions.

## From a two-way table

:::worked-solution[Example 1: a school in Bindura has 120 Form 4 learners. 50 are boarders, of whom 32 use the library regularly; of the 70 day scholars, 28 use the library. A learner is chosen at random. Find P(uses library | boarder), P(boarder | uses library), and decide whether being a boarder and using the library are independent.]
The table is:

| | Uses library | Does not | Total |
|---|---|---|---|
| Boarder | 32 | 18 | 50 |
| Day scholar | 28 | 42 | 70 |
| Total | 60 | 60 | 120 |

1. Given "boarder", the sample space is the 50 boarders: $P(L \mid B) = \frac{32}{50} = \frac{16}{25} = 0.64$.
2. Given "uses library", the sample space is the 60 library users: $P(B \mid L) = \frac{32}{60} = \frac{8}{15}$.
3. Overall, $P(L) = \frac{60}{120} = \frac{1}{2}$.
4. Since $P(L \mid B) = 0.64 \neq 0.5 = P(L)$, the events are **not** independent: boarders are more likely to use the library.
:::

Notice that $P(L \mid B)$ and $P(B \mid L)$ are different: the order matters.

## From a Venn diagram

:::worked-solution[Example 2: P(A) = 0.5, P(B) = 0.4 and P(A ∩ B) = 0.2. Find P(A | B) and P(B | A), and decide whether A and B are independent.]
1. $P(A \mid B) = \frac{P(A \cap B)}{P(B)} = \frac{0.2}{0.4} = 0.5$.
2. $P(B \mid A) = \frac{0.2}{0.5} = 0.4$.
3. $P(A \mid B) = 0.5 = P(A)$, so knowing $B$ does not change the probability of $A$: the events are independent.
4. Check with the product rule: $P(A) \times P(B) = 0.5 \times 0.4 = 0.2 = P(A \cap B)$. ✓
:::

## From a tree diagram, forwards and backwards

On a tree diagram, the **second-stage branches are already conditional probabilities**: the branch "germinates" after "supplier A" is $P(G \mid A)$. Multiplying along a path uses the rule $P(A \cap G) = P(A) \times P(G \mid A)$.

The harder question goes **backwards**: given the second-stage result, what is the probability of the first-stage result? Use the formula with the total probability of the given event in the denominator.

:::worked-solution[Example 3: a farmer near Chinhoyi buys 70% of her maize seed from supplier A and 30% from supplier B. Seeds from A germinate with probability 0.9 and seeds from B with probability 0.8. A seed is chosen at random. Find the probability that it germinates, and the probability that it came from A given that it germinated.]
1. Tree: first stage A 0.7, B 0.3; second stage G 0.9, not G 0.1 after A; G 0.8, not G 0.2 after B.
2. $P(A \cap G) = 0.7 \times 0.9 = 0.63$ and $P(B \cap G) = 0.3 \times 0.8 = 0.24$.
3. $P(G) = 0.63 + 0.24 = 0.87$ (add the two paths that end in G).
4. $P(A \mid G) = \frac{P(A \cap G)}{P(G)} = \frac{0.63}{0.87} = \frac{21}{29} \approx 0.724$.
5. Similarly, given that a seed did **not** germinate: $P(B \mid G') = \frac{0.3 \times 0.2}{1 - 0.87} = \frac{0.06}{0.13} = \frac{6}{13}$.
:::

The pattern for a reverse probability is always: the **one path** you want, divided by **all the paths** that give the known result.

## Conditional probability without replacement

:::worked-solution[Example 4: a bag contains 5 red and 3 blue counters. Two counters are taken at random without replacement. Given that the second counter is red, find the probability that the first was also red.]
1. Paths ending in "second red": $RR$ with probability $\frac{5}{8} \times \frac{4}{7} = \frac{20}{56} = \frac{5}{14}$, and $BR$ with probability $\frac{3}{8} \times \frac{5}{7} = \frac{15}{56}$.
2. $P(\text{second red}) = \frac{20}{56} + \frac{15}{56} = \frac{35}{56} = \frac{5}{8}$.
3. $P(\text{first red} \mid \text{second red}) = \dfrac{20/56}{35/56} = \frac{20}{35} = \frac{4}{7}$.
:::

It is no coincidence that $P(\text{second red}) = \frac{5}{8}$, the same as for the first counter: without any information about the first draw, the second counter is equally likely to be any of the eight.

:::keyfact{title="ZIMSEC and Cambridge"}
Conditional probability is examined in ZIMSEC Paper 2 (Probability and Statistics), usually as the last part of a tree diagram or Venn diagram question. Cambridge 0606 does not examine probability.
:::

## Common mistakes

:::mistake{title="Wrong denominator"}
$P(A \mid B)$ divides by $P(B)$, the given event, not by $P(A)$ and not by the whole sample space.
:::

:::mistake{title="Confusing P(A | B) with P(B | A)"}
"The probability a learner is a boarder given that they use the library" is not the same as "the probability a learner uses the library given that they are a boarder".
:::

:::mistake{title="Using one path for the denominator"}
In a reverse question, $P(G)$ is the sum of **all** the paths that end in $G$, not just the path through $A$.
:::

:::mistake{title="Writing P(A | B) = P(A ∩ B)"}
The numerator is only part of the answer; you must divide by $P(B)$.
:::

## Exam tips

:::exam-tip
Write the formula $P(A \mid B) = \frac{P(A \cap B)}{P(B)}$ with the events named in words before substituting: it earns the method mark and stops you swapping the events.
:::

:::exam-tip
In a tree diagram question, the "given that" part almost always needs the total probability you found in an earlier part; reuse it rather than recomputing.
:::

:::exam-tip
To show independence, compare $P(A \mid B)$ with $P(A)$, or $P(A \cap B)$ with $P(A) \times P(B)$; write both numbers and a conclusion.
:::

## Summary

:::summary
- $P(A \mid B) = \dfrac{P(A \cap B)}{P(B)}$: the given event becomes the new sample space.
- From a table or Venn diagram: divide the overlap by the total of the given event.
- Second-stage branches on a tree diagram are conditional probabilities.
- Reverse probability: the wanted path divided by the sum of all paths giving the known result.
- $A$ and $B$ are independent when $P(A \mid B) = P(A)$, equivalently $P(A \cap B) = P(A)P(B)$.
:::
