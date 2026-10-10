---
{
  "key": "probability.bayes",
  "title": "Bayes' theorem",
  "summary": "State Bayes' theorem for a partition of two or more events, justify it from the definition of conditional probability, and use it with tree diagrams to reverse a conditional probability in contexts such as factory machines, medical tests and weather forecasts.",
  "concepts": ["amaths.probability.bayes"],
  "estimatedMinutes": 45,
  "level": "core"
}
---
## Introduction

A clinic in Masvingo uses a quick test for a disease. The test is usually right, yet most people who test positive turn out to be healthy. How can that be? The answer comes from **Bayes' theorem**, which turns a probability we know, such as "the probability of a positive test **given** the disease", into the one we want: "the probability of the disease **given** a positive test".

Bayes' theorem is examined by ZIMSEC Statistics in Form 6 (syllabus topic 6.3.2: "state Bayes' theorem and use it to solve probability problems"). It is not named in Cambridge 9709, although Paper 5 often asks for a reversed conditional probability from a tree, which is the same calculation. You need conditional probability and tree diagrams first.

## Key definitions

:::definition{term="Partition"}
Events $A_1, A_2, \ldots, A_n$ form a **partition** of the sample space if they are mutually exclusive (no two can happen together) and exhaustive (one of them must happen). Examples: "made by machine A, B or C"; "has the disease" and "does not have the disease".
:::

:::definition{term="Prior and posterior probabilities"}
$\mathrm{P}(A_i)$ is the **prior** probability of $A_i$, before any evidence. $\mathrm{P}(A_i \mid B)$ is the **posterior** probability, updated after we learn that $B$ has happened.
:::

:::formula{name="Law of total probability"}
If $A_1, \ldots, A_n$ form a partition, then for any event $B$
$$
\mathrm{P}(B) = \sum_{i=1}^{n} \mathrm{P}(A_i)\,\mathrm{P}(B \mid A_i)
$$
:::

:::formula{name="Bayes' theorem"}
$$
\mathrm{P}(A_j \mid B) = \frac{\mathrm{P}(A_j)\,\mathrm{P}(B \mid A_j)}{\sum_{i=1}^{n} \mathrm{P}(A_i)\,\mathrm{P}(B \mid A_i)}
$$
For two events $A$ and $A'$:
$$
\mathrm{P}(A \mid B) = \frac{\mathrm{P}(A)\,\mathrm{P}(B \mid A)}{\mathrm{P}(A)\,\mathrm{P}(B \mid A) + \mathrm{P}(A')\,\mathrm{P}(B \mid A')}
$$
:::

ZIMSEC prints no formula list, so learn both the statement and its justification.

## Why the theorem is true

The justification uses nothing but the definition of conditional probability. Writing $\mathrm{P}(A_j \cap B)$ in two ways,
$$
\mathrm{P}(A_j \cap B) = \mathrm{P}(B)\,\mathrm{P}(A_j \mid B) = \mathrm{P}(A_j)\,\mathrm{P}(B \mid A_j)
$$
so
$$
\mathrm{P}(A_j \mid B) = \frac{\mathrm{P}(A_j)\,\mathrm{P}(B \mid A_j)}{\mathrm{P}(B)}
$$
Because the $A_i$ are exclusive and exhaustive, $B$ splits into the exclusive pieces $A_1 \cap B, \ldots, A_n \cap B$, so $\mathrm{P}(B) = \sum \mathrm{P}(A_i \cap B) = \sum \mathrm{P}(A_i)\,\mathrm{P}(B \mid A_i)$. Substituting gives the theorem.

On a tree diagram with the partition on the first stage and $B$ on the second, the numerator is **one path** and the denominator is **the total of all the paths that end in $B$**. You can always solve a Bayes question with a tree; the formula is the same calculation written compactly.

## Worked examples

:::worked-solution[Example 1: three machines at a Bulawayo factory make 50%, 30% and 20% of the bolts. Their defect rates are 2%, 3% and 5%. A bolt chosen at random is defective. Find the probability that machine C made it]
1. Partition: $A$, $B$, $C$ (the machine). Evidence: $D$, "defective".
2. Paths ending in $D$: $\mathrm{P}(A \cap D) = 0.5 \times 0.02 = 0.010$; $\mathrm{P}(B \cap D) = 0.3 \times 0.03 = 0.009$; $\mathrm{P}(C \cap D) = 0.2 \times 0.05 = 0.010$.
3. Law of total probability: $\mathrm{P}(D) = 0.010 + 0.009 + 0.010 = 0.029$.
4. Bayes: $\mathrm{P}(C \mid D) = \frac{0.010}{0.029} = 0.345$ (3 s.f.).
5. Similarly $\mathrm{P}(A \mid D) = 0.345$ and $\mathrm{P}(B \mid D) = \frac{0.009}{0.029} = 0.310$. The three posteriors add to 1, a useful check. Machine C makes only 20% of the bolts but is responsible for over a third of the defective ones.
:::

:::worked-solution[Example 2: 4% of the people tested at a clinic have a disease. The test is positive for 95% of people with the disease and for 8% of people without it. Find the probability that a person who tests positive has the disease]
1. Let $S$ be "has the disease", $+$ be "tests positive". $\mathrm{P}(S) = 0.04$, $\mathrm{P}(+ \mid S) = 0.95$, $\mathrm{P}(+ \mid S') = 0.08$.
2. $\mathrm{P}(S \cap +) = 0.04 \times 0.95 = 0.038$; $\mathrm{P}(S' \cap +) = 0.96 \times 0.08 = 0.0768$.
3. $\mathrm{P}(+) = 0.038 + 0.0768 = 0.1148$.
4. $\mathrm{P}(S \mid +) = \frac{0.038}{0.1148} = 0.331$ (3 s.f.).
5. Interpretation: only about one positive in three has the disease, because healthy people are so much more numerous that their 8% false positives outnumber the true positives. A second, independent test is often used to confirm.
:::

:::worked-solution[Example 3: at Kariba, rain falls on 30% of days in a season. The forecast predicts rain on 80% of the days that turn out wet and on 25% of the days that turn out dry. Find the probability of rain (a) when rain is forecast, (b) when rain is not forecast]
1. Let $R$ be "rain" and $F$ be "rain is forecast". $\mathrm{P}(R \cap F) = 0.3 \times 0.8 = 0.24$; $\mathrm{P}(R' \cap F) = 0.7 \times 0.25 = 0.175$.
2. $\mathrm{P}(F) = 0.24 + 0.175 = 0.415$, so (a) $\mathrm{P}(R \mid F) = \frac{0.24}{0.415} = 0.578$ (3 s.f.).
3. $\mathrm{P}(R \cap F') = 0.3 \times 0.2 = 0.06$ and $\mathrm{P}(F') = 1 - 0.415 = 0.585$, so (b) $\mathrm{P}(R \mid F') = \frac{0.06}{0.585} = 0.103$ (3 s.f.).
4. The forecast is useful: it raises the chance of rain from the prior 0.3 to 0.578, or lowers it to 0.103.
:::

## Common mistakes

:::mistake{title="Confusing the two conditional probabilities"}
$\mathrm{P}(+ \mid S) = 0.95$ is not $\mathrm{P}(S \mid +)$. Read "given that" carefully and decide which event is known.
:::

:::mistake{title="Forgetting a path in the denominator"}
The denominator is the total probability of the evidence: every path that ends in $B$, including the ones through unlikely branches.
:::

:::mistake{title="Using a non-partition"}
The events on the first stage must be exclusive and exhaustive; check their probabilities add to 1.
:::

:::mistake{title="Rounding too early"}
Keep exact values such as 0.1148 until the final division; rounding $\mathrm{P}(B)$ to 0.11 changes the answer in the second significant figure.
:::

## Exam tips

:::exam-tip
Draw and label the tree first, then write Bayes' theorem with the numbers substituted: $\frac{0.04 \times 0.95}{0.04 \times 0.95 + 0.96 \times 0.08}$. This earns the method marks.
:::

:::exam-tip
"State Bayes' theorem" needs the formula with the conditions: the $A_i$ are mutually exclusive and exhaustive. "Prove" or "justify" needs the two-line argument from $\mathrm{P}(A \cap B)$ written two ways.
:::

:::exam-tip
Check that the posterior probabilities over the whole partition add to 1, and comment on the result in context when asked to interpret.
:::

## Summary

:::summary
- A partition is a set of mutually exclusive, exhaustive events.
- Law of total probability: $\mathrm{P}(B) = \sum \mathrm{P}(A_i)\,\mathrm{P}(B \mid A_i)$.
- Bayes' theorem: $\mathrm{P}(A_j \mid B) = \frac{\mathrm{P}(A_j)\,\mathrm{P}(B \mid A_j)}{\sum \mathrm{P}(A_i)\,\mathrm{P}(B \mid A_i)}$: one path over all paths that end in $B$.
- It follows from writing $\mathrm{P}(A_j \cap B)$ in two ways.
- A rare condition with an imperfect test gives many false positives, so $\mathrm{P}(S \mid +)$ can be small.
:::
