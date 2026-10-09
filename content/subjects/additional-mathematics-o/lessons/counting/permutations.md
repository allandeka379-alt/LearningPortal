---
{
  "key": "counting.permutations",
  "title": "Permutations: arranging objects in order",
  "summary": "Use factorial notation and the formula for nPr to count arrangements of distinct objects in a line, including arrangements with items at the ends, items together or apart, and numbers with given properties.",
  "concepts": ["amath.counting.permutations"],
  "estimatedMinutes": 35,
  "level": "core"
}
---
## Introduction

How many different orders can the seven members of a relay team at a school athletics day in Bulawayo run in? How many four-digit PIN-style codes can be made from six different digits? Listing the possibilities is hopeless once there are more than a handful, so we need a way of **counting without listing**.

A **permutation** is an arrangement of objects in which the **order matters**. This lesson covers arrangements of distinct objects in a line, with and without conditions. The next lesson deals with **combinations**, where order does not matter.

This topic is examined by Cambridge 0606, on both papers, usually as a short question with three or four parts. Problems with repeated objects (such as the letters of BANANA) and circular arrangements are not in the syllabus.

## Key definitions

:::definition{term="Factorial"}
For a positive integer $n$, $n! = n \times (n - 1) \times (n - 2) \times \cdots \times 2 \times 1$. By definition, $0! = 1$.
:::

:::definition{term="Permutation"}
An ordered arrangement of objects. Swapping two objects gives a different permutation.
:::

:::formula{name="Number of permutations"}
The number of ways of arranging all $n$ distinct objects in a line is $n!$.

The number of ways of arranging $r$ objects chosen from $n$ distinct objects is

$$
{}^{n}P_{r} = \frac{n!}{(n - r)!}
$$

This formula is **not** in Cambridge's List of formulas, so learn it.
:::

## The multiplication principle

If one choice can be made in $a$ ways and, after it, a second choice in $b$ ways, then the two together can be made in $a \times b$ ways.

To arrange $n$ distinct objects in a line, fill the positions one at a time: $n$ choices for the first, $n - 1$ for the second, and so on, giving $n!$. If only $r$ positions are filled, you stop after $r$ factors:

$$
{}^{n}P_{r} = n(n - 1)(n - 2) \cdots (n - r + 1)
$$

That is why $0! = 1$ makes sense: ${}^{n}P_{n} = \dfrac{n!}{0!}$ must equal $n!$.

:::worked-solution[Example 1: evaluate $8!\,/\,5!$ and explain what it counts]
1. $\dfrac{8!}{5!} = \dfrac{8 \times 7 \times 6 \times 5!}{5!} = 8 \times 7 \times 6 = 336$.
2. This is ${}^{8}P_{3}$: the number of ways of arranging 3 objects chosen from 8, for example awarding first, second and third prizes to 8 entrants.
:::

:::worked-solution[Example 2: in how many ways can gold, silver and bronze medals be awarded among 7 runners?]
1. Order matters (gold is different from silver), so this is a permutation.
2. Gold: 7 choices; then silver: 6; then bronze: 5.
3. ${}^{7}P_{3} = 7 \times 6 \times 5 = 210$.
:::

## Arrangements with conditions

Deal with the **restricted positions or items first**, then arrange the rest.

- **Particular items in fixed places** (for example at the ends): place them first, then arrange the remaining items in the remaining places.
- **Items together**: glue them into a single "block". Arrange the block with the other items, then multiply by the number of ways of arranging the items inside the block.
- **Items not together**: total arrangements minus arrangements with the items together.

:::worked-solution[Example 3: the letters of the word PLANET are arranged in a line]
Find the number of arrangements (a) in total, (b) that begin with P and end with T, (c) in which the two vowels are next to each other, (d) in which the two vowels are not next to each other.

1. (a) Six different letters: $6! = 720$.
2. (b) Fix P first and T last. The other 4 letters fill the middle 4 places: $4! = 24$.
3. (c) Glue A and E into one block. Arrange the block and L, N, P, T (5 items): $5! = 120$. Inside the block: $2! = 2$ orders. Total $120 \times 2 = 240$.
4. (d) Not together $=$ total $-$ together $= 720 - 240 = 480$.
:::

## Forming numbers

When digits are arranged to form numbers, a condition usually fixes the **first** digit (size of the number) or the **last** digit (odd or even, or a multiple of 5). Fill that position first.

:::worked-solution[Example 4: four-digit numbers are formed from the digits 1, 2, 3, 4, 5, 6, with no digit repeated]
Find how many (a) can be formed, (b) are even, (c) are greater than 5000.

1. (a) ${}^{6}P_{4} = 6 \times 5 \times 4 \times 3 = 360$.
2. (b) The last digit must be 2, 4 or 6: 3 choices. The other three places are filled from the 5 remaining digits: ${}^{5}P_{3} = 60$. Total $3 \times 60 = 180$.
3. (c) The first digit must be 5 or 6: 2 choices. Then ${}^{5}P_{3} = 60$ for the rest. Total $2 \times 60 = 120$.
:::

If **two** conditions affect the same digit (for example "even **and** greater than 5000"), split into cases by the first digit, because whether the first digit is even changes how many even digits are left for the last place.

## Solving equations with nPr

:::worked-solution[Example 5: solve ${}^{n}P_{2} = 56$]
1. ${}^{n}P_{2} = n(n - 1)$, so $n(n - 1) = 56$.
2. $n^{2} - n - 56 = 0$, so $(n - 8)(n + 7) = 0$.
3. $n$ must be a positive integer, so $n = 8$.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Permutations are in the Cambridge 0606 syllabus only. Questions use distinct objects; repeated objects, circular arrangements and questions that mix permutations with combinations are excluded.
:::

## Common mistakes

:::mistake{title="Using a combination when order matters"}
Choosing a chairperson and a secretary is a permutation (the roles differ); choosing two committee members is a combination.
:::

:::mistake{title="Forgetting the arrangements inside a block"}
For "A and E together", the block can be AE or EA. Multiply by $2!$.
:::

:::mistake{title="Fixing a position after the others"}
For even numbers, choose the last digit **first**. If you fill the first digits first, the number of even digits left for the last place depends on what you used.
:::

## Exam tips

:::exam-tip
Write a short reason with each factor, for example "last digit: 3 ways; others: ${}^{5}P_{3}$". This shows the method if your arithmetic slips.
:::

:::exam-tip
"Not together" is almost always quickest as total minus together. Check that your answers to related parts add up.
:::

:::exam-tip
On the non-calculator paper, cancel factorials before multiplying: $\dfrac{9!}{6!} = 9 \times 8 \times 7$.
:::

## Summary

:::summary
- $n! = n(n - 1) \cdots 1$ and $0! = 1$; $n$ distinct objects can be arranged in $n!$ ways.
- ${}^{n}P_{r} = \dfrac{n!}{(n - r)!}$ counts ordered arrangements of $r$ from $n$.
- Restricted positions first; items together form a block (times the internal arrangements).
- Not together $=$ total $-$ together.
- For numbers, fix the first digit (size) or last digit (odd, even) first; use cases when both matter.
:::
