---
{
  "key": "counting.combinations",
  "title": "Combinations: selections where order does not matter",
  "summary": "Use the notation and formula for nCr to count selections such as committees and teams, with conditions on particular items and on how many come from each group, and solve equations such as nC2 = 28.",
  "concepts": ["amath.counting.combinations"],
  "estimatedMinutes": 35,
  "level": "core"
}
---
## Introduction

A school in Mutare must send a committee of five learners to a regional science fair. Who goes matters; the order in which they are chosen does not. Choosing Tendai then Chipo gives the same committee as choosing Chipo then Tendai. A **combination** counts selections like this, where **order does not matter**.

Combinations are the second half of the Cambridge 0606 topic "Permutations and combinations". Typical questions involve committees, teams, menus or sets of questions, often with conditions such as "exactly two women", "at least one teacher" or "a particular person must be included". Questions that need **both** permutations and combinations in one calculation are not set.

You should already know factorial notation and the multiplication principle from the permutations lesson.

## Key definitions

:::definition{term="Combination"}
A selection of objects in which the order does not matter.
:::

:::formula{name="Number of combinations"}
The number of ways of choosing $r$ objects from $n$ distinct objects is

$$
{}^{n}C_{r} = \binom{n}{r} = \frac{n!}{r!\,(n - r)!}
$$

The notation $\binom{n}{r}$ appears in the binomial expansion in Cambridge's List of formulas, but the factorial formula itself is not given: learn it.
:::

:::keyfact{title="Useful facts"}
${}^{n}C_{0} = {}^{n}C_{n} = 1$, ${}^{n}C_{1} = n$, and ${}^{n}C_{r} = {}^{n}C_{n-r}$ (choosing the $r$ to take is the same as choosing the $n - r$ to leave).
:::

## Why divide by r!

${}^{n}P_{r}$ counts ordered arrangements of $r$ objects. Each selection of $r$ objects can be arranged in $r!$ orders, so each selection is counted $r!$ times. Dividing removes the repeats:

$$
{}^{n}C_{r} = \frac{{}^{n}P_{r}}{r!} = \frac{n!}{r!\,(n - r)!}
$$

:::worked-solution[Example 1: evaluate ${}^{7}C_{3}$ and ${}^{7}C_{4}$ without a calculator]
1. ${}^{7}C_{3} = \dfrac{7 \times 6 \times 5}{3 \times 2 \times 1} = \dfrac{210}{6} = 35$.
2. ${}^{7}C_{4} = {}^{7}C_{3}$, because choosing 4 to take means choosing 3 to leave. So ${}^{7}C_{4} = 35$.
:::

:::worked-solution[Example 2: in how many ways can a committee of 4 be chosen from 9 people?]
1. A committee is a selection: order does not matter.
2. ${}^{9}C_{4} = \dfrac{9 \times 8 \times 7 \times 6}{4 \times 3 \times 2 \times 1} = \dfrac{3024}{24} = 126$.
:::

## Selections from groups

When people come from different groups, choose from each group separately and **multiply** (the multiplication principle). When a condition allows several cases, work out each case and **add** them (the addition principle).

| Condition | Method |
| --- | --- |
| Exactly $k$ from group A | ${}^{A}C_{k} \times {}^{B}C_{r-k}$ |
| At least one from A | Total $-$ (none from A) |
| At most / at least $k$ (several cases) | Add the separate cases |
| A particular person included | Put them in; choose the other $r - 1$ from the remaining $n - 1$ |
| A particular person excluded | Choose all $r$ from the remaining $n - 1$ |

:::worked-solution[Example 3: a committee of 5 is chosen from 6 men and 4 women]
Find the number of committees (a) with no restriction, (b) with exactly 2 women, (c) with at least one woman, (d) that include a particular woman, Rudo.

1. (a) $10$ people altogether: ${}^{10}C_{5} = 252$.
2. (b) 2 women from 4 and 3 men from 6: ${}^{4}C_{2} \times {}^{6}C_{3} = 6 \times 20 = 120$.
3. (c) "At least one woman" $=$ total $-$ committees with no women. No women means 5 men from 6: ${}^{6}C_{5} = 6$. So $252 - 6 = 246$.
4. (d) Rudo is in. Choose the other 4 from the remaining 9 people: ${}^{9}C_{4} = 126$.
:::

:::worked-solution[Example 4: for the same 6 men and 4 women, how many committees of 5 contain at most one woman?]
1. At most one woman means 0 women or 1 woman.
2. 0 women: ${}^{6}C_{5} = 6$.
3. 1 woman: ${}^{4}C_{1} \times {}^{6}C_{4} = 4 \times 15 = 60$.
4. Add the cases: $6 + 60 = 66$.
:::

## Solving equations with nCr

Write ${}^{n}C_{r}$ out as a product, simplify, and solve. Remember that $n$ must be a positive integer at least as large as $r$.

:::worked-solution[Example 5: solve ${}^{n}C_{2} = 28$]
1. ${}^{n}C_{2} = \dfrac{n(n - 1)}{2}$, so $n(n - 1) = 56$.
2. $n^{2} - n - 56 = 0$, so $(n - 8)(n + 7) = 0$.
3. $n = 8$ (reject $n = -7$).
:::

## Combination or permutation?

Before calculating, ask one question: **if I swap two of the chosen objects, do I get a different outcome?**

- Choosing 3 learners to clean the laboratory: swapping two of them gives the same group, so use ${}^{n}C_{r}$.
- Choosing a chairperson, a secretary and a treasurer: swapping two people swaps their jobs, so the outcome changes and you use ${}^{n}P_{r}$.
- Choosing 4 questions to answer from 7 on an examination paper: the order in which you answer them does not change which questions you chose, so use ${}^{7}C_{4} = 35$.

Words such as *committee*, *team*, *group*, *selection* and *hand of cards* usually signal combinations. Words such as *arrange*, *order*, *line up*, *first, second and third* and *code* usually signal permutations. When in doubt, try a tiny case with three objects and list the possibilities.

:::keyfact{title="ZIMSEC and Cambridge"}
Combinations are in the Cambridge 0606 syllabus only. ZIMSEC students meet ${}^{n}C_{r}$ in the binomial probability distribution instead.
:::

## Common mistakes

:::mistake{title="Using permutations for a selection"}
A team, committee or group of questions is a selection. Using ${}^{n}P_{r}$ counts each team $r!$ times.
:::

:::mistake{title="Adding when you should multiply"}
"2 women **and** 3 men" means multiply: ${}^{4}C_{2} \times {}^{6}C_{3}$. Add only between **separate cases** ("0 women **or** 1 woman").
:::

:::mistake{title="Overcounting at least one"}
Choosing one woman first and then "any 4 others" counts some committees more than once. Use total $-$ none instead.
:::

## Exam tips

:::exam-tip
Write each case in words before the numbers ("2W, 3M: ${}^{4}C_{2} \times {}^{6}C_{3}$"). Examiners give method marks for correct cases even if the arithmetic slips.
:::

:::exam-tip
On the non-calculator paper, use ${}^{n}C_{r} = {}^{n}C_{n-r}$ to keep the numbers small: ${}^{12}C_{10} = {}^{12}C_{2} = 66$.
:::

:::exam-tip
Check that the cases in an "at least" or "at most" question cover every possibility exactly once, for example by checking that all the cases together add up to the total.
:::

## Summary

:::summary
- A combination is a selection where order does not matter: ${}^{n}C_{r} = \dfrac{n!}{r!\,(n - r)!}$.
- ${}^{n}C_{r} = {}^{n}C_{n-r}$, ${}^{n}C_{0} = 1$, ${}^{n}C_{1} = n$.
- From several groups: multiply the choices within one case; add separate cases.
- At least one $=$ total $-$ none.
- Included person: choose $r - 1$ from $n - 1$; excluded person: choose $r$ from $n - 1$.
:::
