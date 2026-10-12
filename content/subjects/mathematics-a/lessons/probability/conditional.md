---
{
  "key": "probability.conditional",
  "title": "Conditional probability, independence and tree diagrams",
  "summary": "Multiply probabilities along tree diagrams with and without replacement, find conditional probabilities with P(A | B) = P(A ∩ B)/P(B), use two-way tables and counting, and test whether two events are independent.",
  "concepts": ["amaths.probability.conditional"],
  "estimatedMinutes": 50,
  "level": "core"
}
---
## Introduction

Many real probabilities depend on what has already happened. The chance that Farai is late for work depends on whether he caught the early kombi; the chance that the second sweet taken from a packet is lemon depends on what the first one was. **Conditional probability** handles this "given that" information, and **tree diagrams** organise experiments that happen in stages.

This lesson covers ZIMSEC Statistics (Form 5 conditional probability, tree diagrams; Form 6 conditional probability with permutations and combinations) and Cambridge 9709 Paper 5, topic 5.3. Both boards ask you to multiply probabilities, find conditional probabilities "in simple cases" and test two events for independence. It leads directly into Bayes' theorem (ZIMSEC) and into the binomial distribution, which is built from independent trials.

## Key definitions

:::definition{term="Conditional probability"}
$\mathrm{P}(A \mid B)$ is the probability that $A$ happens **given that** $B$ has happened. Knowing $B$ has happened shrinks the sample space to $B$.
:::

:::formula{name="Conditional probability (not in MF19)"}
$$
\mathrm{P}(A \mid B) = \frac{\mathrm{P}(A \cap B)}{\mathrm{P}(B)}, \qquad \mathrm{P}(B) \ne 0
$$
Rearranged, this is the **multiplication rule**: $\mathrm{P}(A \cap B) = \mathrm{P}(B)\,\mathrm{P}(A \mid B)$.
:::

:::definition{term="Independent events"}
$A$ and $B$ are **independent** if one happening does not change the probability of the other: $\mathrm{P}(A \mid B) = \mathrm{P}(A)$. Equivalently,
$$
\mathrm{P}(A \cap B) = \mathrm{P}(A) \times \mathrm{P}(B)
$$
:::

Neither the conditional probability formula nor the independence test is printed in MF19, so learn both.

## Tree diagrams

A tree diagram shows each stage of an experiment as a set of branches. Write the probability on every branch: the branches leaving one point add up to 1. Then:

- **multiply along a path** to get the probability of that sequence of outcomes;
- **add the paths** that give the event you want.

From the second stage on, branch probabilities are **conditional** probabilities: they assume the earlier outcome on that path has happened. When objects are taken **without replacement**, the numbers in the bag change after each pick, so the second-stage probabilities change from branch to branch.

:::worked-solution[Example 1: Rudo takes two sweets at random, without replacement, from a packet of 8 orange and 4 lemon sweets]
1. First sweet: $\mathrm{P}(O) = \frac{8}{12}$, $\mathrm{P}(L) = \frac{4}{12}$.
2. Second sweet after an orange (7 orange, 4 lemon left): $\frac{7}{11}$ orange, $\frac{4}{11}$ lemon. After a lemon (8 orange, 3 lemon left): $\frac{8}{11}$ orange, $\frac{3}{11}$ lemon.
3. Both the same flavour: $\mathrm{P}(OO) + \mathrm{P}(LL) = \frac{8}{12} \times \frac{7}{11} + \frac{4}{12} \times \frac{3}{11} = \frac{56 + 12}{132} = \frac{68}{132} = \frac{17}{33}$.
4. One of each: $1 - \frac{17}{33} = \frac{16}{33}$, which agrees with $\mathrm{P}(OL) + \mathrm{P}(LO) = \frac{32}{132} + \frac{32}{132}$.
5. Second sweet lemon: $\mathrm{P}(OL) + \mathrm{P}(LL) = \frac{32}{132} + \frac{12}{132} = \frac{44}{132} = \frac{1}{3}$. Without knowing the first sweet, the second is lemon with the same probability as the first.
:::

![Tree diagram for two sweets taken without replacement from 8 orange and 4 lemon: the first-stage branches are 8/12 and 4/12; after an orange the second branches are 7/11 and 4/11, after a lemon 8/11 and 3/11; the four outcomes OO, OL, LO and LL have probabilities 56/132, 32/132, 32/132 and 12/132.](media:diagrams/tree-diagram-sweets-no-replacement.png "Figure: multiply along each path; the second-stage probabilities change because there is no replacement")

With replacement, the second stage is identical to the first, so the two picks are independent: $\mathrm{P}(OO) = \left(\frac{2}{3}\right)^2 = \frac{4}{9}$, compared with $\frac{56}{132} = \frac{14}{33}$ without replacement.

## Conditional probability from a tree

To "reverse" a tree and find the probability of a first-stage outcome given a second-stage outcome, use the definition directly: the top is the path you want, the bottom is the total of all paths that give the known outcome.

:::worked-solution[Example 2: Farai catches the early kombi on 70% of days. If he catches it, he is late for work with probability 0.1; otherwise he is late with probability 0.4]
1. Let $E$ be "catches the early kombi" and $L$ be "late". The tree gives $\mathrm{P}(E \cap L) = 0.7 \times 0.1 = 0.07$ and $\mathrm{P}(E' \cap L) = 0.3 \times 0.4 = 0.12$.
2. $\mathrm{P}(L) = 0.07 + 0.12 = 0.19$.
3. Given that Farai is late, the probability he caught the early kombi is
$$
\mathrm{P}(E \mid L) = \frac{\mathrm{P}(E \cap L)}{\mathrm{P}(L)} = \frac{0.07}{0.19} = \frac{7}{19} \approx 0.368
$$
4. Interpretation: lateness makes the early kombi less likely than its usual 0.7, as we would expect.
:::

This reversal is the idea behind Bayes' theorem, which ZIMSEC states formally in Form 6.

## Two-way tables and testing independence

A two-way table of counts gives conditional probabilities by restricting attention to one row or column. To **test** independence, compare $\mathrm{P}(A \cap B)$ with $\mathrm{P}(A) \times \mathrm{P}(B)$, or compare $\mathrm{P}(A \mid B)$ with $\mathrm{P}(A)$. Show the numbers and write a conclusion.

:::worked-solution[Example 3: 200 learners at a Bulawayo school are classified by gender and whether they wear glasses]
| | Glasses | No glasses | Total |
| --- | --- | --- | --- |
| Boys | 30 | 90 | 120 |
| Girls | 20 | 60 | 80 |
| Total | 50 | 150 | 200 |

1. Let $G$ be "wears glasses" and $W$ be "is a girl". $\mathrm{P}(G) = \frac{50}{200} = 0.25$ and $\mathrm{P}(W) = \frac{80}{200} = 0.4$.
2. $\mathrm{P}(G \cap W) = \frac{20}{200} = 0.1$.
3. $\mathrm{P}(G) \times \mathrm{P}(W) = 0.25 \times 0.4 = 0.1$, which equals $\mathrm{P}(G \cap W)$.
4. So $G$ and $W$ are independent. Check: $\mathrm{P}(G \mid W) = \frac{20}{80} = 0.25 = \mathrm{P}(G)$.
:::

Do not confuse independence with exclusivity. Exclusive events with non-zero probabilities are never independent: if one happens, the other becomes impossible, which certainly changes its probability.

## Conditional probability with counting

When people or objects are chosen at random, find each probability by counting selections, then divide. "Given that" means the bottom of the fraction is the number of selections in the condition.

:::worked-solution[Example 4: a team of 3 is chosen at random from 5 boys and 4 girls. Given that the team contains at least one girl, find the probability that it contains exactly one girl]
1. All teams: ${}^9C_3 = 84$. Teams with no girl: ${}^5C_3 = 10$. So $74$ teams contain at least one girl.
2. Exactly one girl: ${}^4C_1 \times {}^5C_2 = 4 \times 10 = 40$ teams (all of these contain at least one girl).
3. $\mathrm{P}(\text{exactly one girl} \mid \text{at least one girl}) = \frac{40/84}{74/84} = \frac{40}{74} = \frac{20}{37} \approx 0.541$.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards examine tree diagrams, conditional probability and the independence test (ZIMSEC 6.3, Cambridge 5.3). ZIMSEC places conditional probability with permutations and combinations in Form 6 and goes on to Bayes' theorem; Cambridge expects conditional probability "in simple cases" and does not name Bayes' theorem, although reversing a tree as in Example 2 is a common Paper 5 question.
:::

## Common mistakes

:::mistake{title="Dividing by the wrong total"}
In $\mathrm{P}(A \mid B)$ the denominator is $\mathrm{P}(B)$, the probability of the **given** event, not $\mathrm{P}(A)$ and not 1.
:::

:::mistake{title="Forgetting that the bag changes"}
Without replacement, the second-stage fractions have denominator one less, and the numerator of the colour already taken falls by one.
:::

:::mistake{title="Adding along a path"}
Multiply along branches; add only between complete paths.
:::

:::mistake{title="Claiming independence without numbers"}
"They do not affect each other" is not a test. Calculate $\mathrm{P}(A) \times \mathrm{P}(B)$ and compare it with $\mathrm{P}(A \cap B)$.
:::

## Exam tips

:::exam-tip
Draw the tree even when the question does not ask for one; label every branch with its event and probability.
:::

:::exam-tip
For "given that" questions, write the formula first, then $\frac{\text{one path (or count)}}{\text{all paths giving the condition}}$, so the method mark is earned even after an arithmetic slip.
:::

:::exam-tip
Give final answers as exact fractions or to 3 significant figures; keep full accuracy in intermediate products.
:::

## Summary

:::summary
- $\mathrm{P}(A \mid B) = \frac{\mathrm{P}(A \cap B)}{\mathrm{P}(B)}$; rearranged, $\mathrm{P}(A \cap B) = \mathrm{P}(B)\,\mathrm{P}(A \mid B)$.
- On a tree, multiply along paths and add between paths; later branches are conditional probabilities.
- Without replacement the second-stage probabilities change; with replacement the stages are independent.
- $A$ and $B$ are independent if and only if $\mathrm{P}(A \cap B) = \mathrm{P}(A)\,\mathrm{P}(B)$; show the numbers.
- With random selections, count: $\mathrm{P}(A \mid B) = \frac{n(A \cap B)}{n(B)}$.
:::
