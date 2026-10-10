---
{
  "key": "counting.combinations",
  "title": "Combinations: selections",
  "summary": "Use nCr to count selections in which order does not matter, including selections from several groups, with 'at least' and 'at most' conditions, with particular items included or excluded, and problems that combine a selection with an arrangement.",
  "concepts": ["amaths.counting.combinations"],
  "estimatedMinutes": 40,
  "level": "core"
}
---
## Introduction

A netball coach in Masvingo picks 7 players from a squad of 12; a school chooses a committee of 5 from its teachers and learners; a farmer selects 3 of his 9 fields to plant with tobacco. In each case only **which** items are chosen matters, not the order in which they are chosen. These are **combinations**.

This lesson covers ZIMSEC Statistics (Form 5, permutations and combinations) and Cambridge 9709 Paper 5 (topic 5.2). Both boards examine selections with conditions and problems that need a selection followed by an arrangement. Combinations also give many probabilities, and they are the ${}^nC_r$ in the binomial distribution.

## Key definitions

:::definition{term="Combination"}
A selection of objects in which **order does not matter**: the committees {Rudo, Sipho, Tatenda} and {Tatenda, Rudo, Sipho} are the same combination.
:::

:::formula{name="Combinations (nCr; the notation appears in MF19's binomial formulae)"}
$$
{}^nC_r = \binom{n}{r} = \frac{n!}{r!\,(n - r)!}
$$
the number of ways of selecting $r$ objects from $n$ different objects.
:::

:::keyfact{title="Useful facts"}
${}^nC_r = {}^nC_{n-r}$ (choosing which $r$ to take is the same as choosing which $n - r$ to leave). ${}^nC_0 = {}^nC_n = 1$. ${}^nP_r = {}^nC_r \times r!$: each selection of $r$ objects can be arranged in $r!$ ways.
:::

## Simple selections

:::worked-solution[Example 1: choosing 4 learners from a class of 11 to represent the school]
1. Order does not matter, so use combinations.
2. ${}^{11}C_4 = \dfrac{11!}{4!\,7!} = \dfrac{11 \times 10 \times 9 \times 8}{4 \times 3 \times 2 \times 1} = 330$.
:::

## Selections from several groups

When the selection comes from separate groups, choose from each group and **multiply**.

:::worked-solution[Example 2: a committee of 5 from 7 men and 6 women, with exactly 2 women]
1. Choose the 2 women: ${}^6C_2 = 15$ ways.
2. Choose the other 3 members from the men: ${}^7C_3 = 35$ ways.
3. Total: $15 \times 35 = 525$ committees.
:::

## "At least" and "at most"

For "at least one", it is usually quickest to subtract the selections with **none** from the total. For other conditions, list the cases and **add** them.

:::worked-solution[Example 3: a group of 4 from 5 teachers and 8 learners, with at least one teacher]
1. Total selections: ${}^{13}C_4 = 715$.
2. Selections with no teacher (all learners): ${}^8C_4 = 70$.
3. At least one teacher: $715 - 70 = 645$.
4. Check by cases: 1 teacher ($5 \times 56 = 280$), 2 ($10 \times 28 = 280$), 3 ($10 \times 8 = 80$), 4 ($5 \times 1 = 5$): $280 + 280 + 80 + 5 = 645$. ✓
:::

"At most one woman" means 0 women **or** 1 woman: add the two cases.

## Particular items included or excluded

If a particular person **must** be chosen, put them in and choose the rest from the others. If a person **must not** be chosen, remove them from the pool.

:::worked-solution[Example 4: a team of 6 from a squad of 12; the captain must play, but one injured player cannot]
1. The captain is in: 5 places remain.
2. The injured player is out: the pool is $12 - 1 - 1 = 10$ players.
3. Number of teams: ${}^{10}C_5 = 252$.
:::

## Selection followed by arrangement

Many questions first **select** and then **arrange** what has been selected. Count the selections, then multiply by the number of arrangements of each selection.

:::worked-solution[Example 5: 2 vowels and 3 consonants are chosen from the letters of MASVINGO and arranged in a row]
1. MASVINGO has 3 vowels (A, I, O) and 5 consonants (M, S, V, N, G), all different.
2. Select the vowels: ${}^3C_2 = 3$ ways. Select the consonants: ${}^5C_3 = 10$ ways.
3. Arrange the 5 chosen letters: $5! = 120$ ways.
4. Total: $3 \times 10 \times 120 = 3600$ arrangements.
:::

A quick test for "permutation or combination?": would swapping two chosen items give a different outcome? If yes (different posts, positions, order), it is a permutation; if no (members of a committee), it is a combination. For example, choosing 3 of 8 learners to stand in order on a stage is ${}^8C_3 \times 3! = 336 = {}^8P_3$.

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards examine ${}^nC_r$ and selections with conditions (ZIMSEC 6.2, Cambridge 5.2.1), and both set problems needing both selections and arrangements. ZIMSEC Form 6 uses them inside conditional probability questions.
:::

## Common mistakes

:::mistake{title="Adding when you should multiply"}
Choosing 2 women **and** 3 men: multiply. Adding is for separate cases joined by **or**.
:::

:::mistake{title="Counting 'at least one' by putting one in first"}
${}^5C_1 \times {}^{12}C_3$ counts some groups more than once (a group with two teachers is counted once for each teacher). Use "total minus none" or add separate cases.
:::

:::mistake{title="Using a permutation for a committee"}
Members of a committee have no order. Use ${}^nC_r$ unless positions or roles differ.
:::

:::mistake{title="Forgetting to arrange after selecting"}
"Choose and arrange in a row" needs the extra factor $r!$ (or the arrangements allowing for repeats).
:::

## Exam tips

:::exam-tip
For case questions, set out a small table of cases (number from each group) and add the products; it shows the examiner a complete method.
:::

:::exam-tip
Check "at least" answers by the other method (cases against complement) when time allows.
:::

:::exam-tip
Give the expression, such as ${}^6C_2 \times {}^7C_3$, before the value.
:::

## Summary

:::summary
- ${}^nC_r = \frac{n!}{r!\,(n - r)!}$ counts selections where order does not matter; ${}^nC_r = {}^nC_{n-r}$.
- From several groups: multiply the selections from each group.
- "At least one": total minus none; other conditions: add separate cases.
- Must include: put the item in first; must exclude: remove it from the pool.
- Select, then arrange: multiply by the number of arrangements of the selection.
:::
