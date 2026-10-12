---
{
  "key": "probability.tree-diagrams",
  "title": "Tree diagrams",
  "summary": "Draw and use tree diagrams for two or three events, with and without replacement, multiply along branches and add the results, and solve 'at least one' problems.",
  "concepts": ["math.probability.tree-diagrams"],
  "objectives": ["zimsec/o-level/mathematics:14.0.3", "cambridge/igcse/mathematics:8.3.1", "cambridge/igcse/mathematics:8.3.2"],
  "estimatedMinutes": 16,
  "level": "core"
}
---
## Introduction

Farai takes a sweet from a packet, eats it, then takes another. The chance that the second sweet is his favourite flavour depends on what happened first. When events happen one after another, a sample space grid becomes awkward, especially when the probabilities change or there are three stages. A **tree diagram** organises the events in order and makes the calculations almost automatic.

In this lesson you will draw tree diagrams for two and three events, use them **with replacement** and **without replacement**, and solve "at least one" problems. You should know the multiplication rule for independent events and the addition rule for mutually exclusive events.

## Key definitions

:::definition{term="Tree diagram"}
A diagram in which each event is a set of **branches**. Each branch is labelled with an outcome and its probability, and the branches for the next event start from the end of each branch.
:::

:::definition{term="With replacement"}
The object chosen is put back before the next choice, so the probabilities are the same for every choice: the events are independent.
:::

:::definition{term="Without replacement"}
The object chosen is not put back, so the numbers in the bag change and the probabilities for the second choice depend on the first.
:::

:::keyfact{title="The two rules of tree diagrams"}
1. **Multiply** the probabilities **along** a path to get the probability of that combination of outcomes.
2. **Add** the probabilities of different paths when more than one path gives the result you want.

The probabilities on the branches leaving any one point add up to 1, and so do the probabilities of all the complete paths.
:::

## With replacement

A bag contains 3 red and 7 blue counters. A counter is taken at random, its colour is noted, and it is **replaced**. A second counter is then taken. The tree diagram, written as a table of paths:

| First counter | Second counter | Path | Probability |
| --- | --- | --- | :---: |
| red $\left(\frac{3}{10}\right)$ | red $\left(\frac{3}{10}\right)$ | RR | $\frac{9}{100}$ |
| red $\left(\frac{3}{10}\right)$ | blue $\left(\frac{7}{10}\right)$ | RB | $\frac{21}{100}$ |
| blue $\left(\frac{7}{10}\right)$ | red $\left(\frac{3}{10}\right)$ | BR | $\frac{21}{100}$ |
| blue $\left(\frac{7}{10}\right)$ | blue $\left(\frac{7}{10}\right)$ | BB | $\frac{49}{100}$ |

The four path probabilities add up to $\frac{100}{100} = 1$, which is a useful check.

:::worked-solution[Example 1: one of each colour (with replacement)]
Find the probability that the two counters are different colours.

1. Two paths give different colours: RB and BR.
2. $\text{P(RB)} = \dfrac{3}{10} \times \dfrac{7}{10} = \dfrac{21}{100}$ and $\text{P(BR)} = \dfrac{7}{10} \times \dfrac{3}{10} = \dfrac{21}{100}$.
3. Add the paths: $\dfrac{21}{100} + \dfrac{21}{100} = \dfrac{42}{100} = 0.42$.
:::

## Without replacement

Now the first counter is **not** put back. After a red counter is taken, 2 red and 7 blue remain (9 counters); after a blue counter, 3 red and 6 blue remain.

:::note{title="Syllabus"}
Cambridge Core questions use tree diagrams **with replacement** (independent events). Choosing without replacement, and other trees in which the second probabilities depend on the first outcome, are Cambridge Extended. ZIMSEC candidates need both.
:::

![Tree diagram for two counters taken without replacement from 3 red and 7 blue: first branches red 3/10 and blue 7/10; after red the second branches are red 2/9 and blue 7/9, after blue they are red 3/9 and blue 6/9; the four path probabilities are 6/90, 21/90, 21/90 and 42/90, which add up to 1.](media:diagrams/tree-without-replacement.png "Figure: multiply along the branches; add the paths that give the result you want")

:::worked-solution[Example 2: the same bag, without replacement]
Find the probability that both counters are red, and the probability that they are different colours.

1. $\text{P(RR)} = \dfrac{3}{10} \times \dfrac{2}{9} = \dfrac{6}{90} = \dfrac{1}{15}$.
2. $\text{P(RB)} = \dfrac{3}{10} \times \dfrac{7}{9} = \dfrac{21}{90}$ and $\text{P(BR)} = \dfrac{7}{10} \times \dfrac{3}{9} = \dfrac{21}{90}$.
3. $\text{P(different colours)} = \dfrac{21}{90} + \dfrac{21}{90} = \dfrac{42}{90} = \dfrac{7}{15}$.
:::

Notice how the second set of branches has denominator 9 and the numerator of the colour already taken goes down by one.

## Events that depend on each other

Tree diagrams also work when the second event depends on the first in other ways.

:::worked-solution[Example 3: rain and a postponed match]
The probability that it rains on Saturday is $0.3$. If it rains, the probability that the school match is postponed is $0.8$; if it does not rain, the probability is $0.1$. Find the probability that the match is postponed.

1. Path "rain, postponed": $0.3 \times 0.8 = 0.24$.
2. Path "no rain, postponed": $0.7 \times 0.1 = 0.07$.
3. $\text{P(postponed)} = 0.24 + 0.07 = 0.31$.
:::

## Three stages and "at least one"

For three events the tree has three sets of branches and up to 8 paths. Often a shortcut is quicker.

:::keyfact{title="At least one"}
$$
\text{P(at least one)} = 1 - \text{P(none)}
$$
:::

:::worked-solution[Example 4: guessing three multiple-choice answers]
Musa guesses the answers to three questions, each with 4 options, so $\text{P(correct)} = \frac{1}{4}$ each time, independently.

1. $\text{P(all three correct)} = \left(\dfrac{1}{4}\right)^3 = \dfrac{1}{64}$.
2. $\text{P(none correct)} = \left(\dfrac{3}{4}\right)^3 = \dfrac{27}{64}$.
3. $\text{P(at least one correct)} = 1 - \dfrac{27}{64} = \dfrac{37}{64}$.
4. Exactly one correct can happen in 3 ways (first, second or third), so its probability is $3 \times \dfrac{1}{4} \times \dfrac{3}{4} \times \dfrac{3}{4} = \dfrac{27}{64}$.
:::

## Common mistakes

:::mistake{title="Adding along a branch"}
Along a path you **multiply**. Adding $\frac{3}{10} + \frac{3}{10}$ for "red then red" gives $\frac{6}{10}$, which is far too big.
:::

:::mistake{title="Forgetting one of the orders"}
"One red and one blue" includes **both** RB and BR. Missing one path halves the answer.
:::

:::mistake{title="Not changing the second branches without replacement"}
Without replacement, both the total and the number of the colour already taken go down by one on the second set of branches.
:::

:::mistake{title="Listing paths for 'at least one'"}
Listing every path with at least one success is slow and easy to get wrong. Use $1 - \text{P(none)}$.
:::

## Exam tips

:::exam-tip
When asked to complete a tree diagram, check that each pair of branches from one point adds up to 1. This catches most errors.
:::

:::exam-tip
Leave fractions unsimplified on the branches (such as $\frac{2}{9}$ and $\frac{7}{9}$); simplify only the final answer if you wish. It keeps the arithmetic clear for the examiner.
:::

:::exam-tip
Write which paths you are using, for example "P(RB) + P(BR)", before calculating. A method mark is often given for the correct combination of paths.
:::

## Summary

:::summary
- Draw one set of branches for each event; label every branch with its outcome and probability.
- Multiply along a path; add the probabilities of the paths you want.
- With replacement the probabilities stay the same; without replacement they change for the second choice.
- The branches from any point, and all the complete paths, add up to 1.
- $\text{P(at least one)} = 1 - \text{P(none)}$.
:::
