---
{
  "key": "series.arithmetic",
  "title": "Arithmetic progressions",
  "summary": "Recognise an arithmetic progression and its common difference, use the nth term a + (n − 1)d and both forms of the sum of the first n terms, find a, d or n from given information (including counting the multiples of a number in a range), and solve problems in context.",
  "concepts": ["amath.series.arithmetic"],
  "estimatedMinutes": 40,
  "freePreview": true,
  "level": "core"
}
---
## Introduction

Some quantities grow by the **same amount** at each step: the seats in the rows of a stadium that each have three more than the row in front, a salary that rises by a fixed sum each year, the savings of a student who puts away five dollars more every month. Lists like these are **arithmetic progressions** (APs), and adding up their terms gives an **arithmetic series**.

Both ZIMSEC and Cambridge examine APs every year: short questions on the nth term and the sum, and longer ones where you form and solve simultaneous equations for $a$ and $d$, or a quadratic for $n$. The formulas are short, so the marks go to choosing the right one and handling the algebra carefully.

## Key definitions

:::definition{term="Arithmetic progression (AP)"}
A sequence in which each term is obtained from the previous one by adding a fixed number $d$, the **common difference**: $u_{n+1} - u_n = d$ for every $n$. The first term is written $a$.
:::

:::definition{term="Arithmetic series"}
The sum of the terms of an AP. $S_n$ is the sum of the first $n$ terms, and $l$ is used for the last term.
:::

:::formula{name="nth term of an AP (not in the List of formulas)"}
$$
u_n = a + (n - 1)d
$$
:::

:::formula{name="Sum of the first n terms of an AP (in Cambridge's List of formulas)"}
$$
S_n = \frac{n}{2}\left(a + l\right) = \frac{n}{2}\left\{2a + (n - 1)d\right\}
$$
:::

The terms are $a, a + d, a + 2d, \ldots$: the $n$th term has $n - 1$ steps of $d$ added to $a$. If $d > 0$ the AP increases; if $d < 0$ it decreases.

## Why the sum formula works

Write the sum forwards and backwards and add the two lines:

$$
S_n = a + (a + d) + \cdots + (l - d) + l
$$

$$
S_n = l + (l - d) + \cdots + (a + d) + a
$$

Each of the $n$ columns adds up to $a + l$, so $2S_n = n(a + l)$ and $S_n = \frac{n}{2}(a + l)$. Replacing $l$ by $a + (n - 1)d$ gives the second form. Use the first form when you know the last term, the second when you know $d$.

:::worked-solution[Example 1: for the AP $7, 11, 15, \ldots$ find the 20th term and the sum of the first 20 terms]
1. $a = 7$, $d = 11 - 7 = 4$.
2. $u_{20} = 7 + 19 \times 4 = 83$.
3. $S_{20} = \frac{20}{2}(7 + 83) = 10 \times 90 = 900$.
:::

## Finding a and d

Two facts about an AP give two equations in $a$ and $d$; solve them simultaneously.

:::worked-solution[Example 2: the 5th term of an AP is 17 and the 12th term is 45. Find $a$, $d$ and the sum of the first 30 terms]
1. $a + 4d = 17$ and $a + 11d = 45$.
2. Subtract: $7d = 28$, so $d = 4$; then $a = 17 - 16 = 1$.
3. $S_{30} = \frac{30}{2}\left\{2(1) + 29(4)\right\} = 15 \times 118 = 1770$.
:::

## Counting terms in a range

To count or add the multiples of a number in a range, find the **first** and **last** multiples in the range, then use $l = a + (n - 1)d$ to find $n$.

:::worked-solution[Example 3: find the number of multiples of 7 between 100 and 300, and their sum]
1. $100 \div 7 = 14.3$, so the first multiple above 100 is $7 \times 15 = 105$.
2. $300 \div 7 = 42.9$, so the last multiple below 300 is $7 \times 42 = 294$.
3. $294 = 105 + (n - 1) \times 7$ gives $n - 1 = 27$, so $n = 28$.
4. Sum: $S_{28} = \frac{28}{2}(105 + 294) = 14 \times 399 = 5586$.
:::

## Finding n

When the unknown is the number of terms, the sum formula gives a **quadratic** in $n$. Remember that $n$ must be a positive integer.

:::worked-solution[Example 4: find the least number of terms of $3 + 7 + 11 + \cdots$ that must be added for the sum to exceed 500]
1. $a = 3$, $d = 4$: $S_n = \frac{n}{2}\left\{6 + 4(n - 1)\right\} = n(2n + 1)$.
2. Solve $2n^2 + n - 500 = 0$: $n = \frac{-1 + \sqrt{1 + 4000}}{4} = 15.56$ (the negative root is rejected).
3. The sum passes 500 between $n = 15$ and $n = 16$: $S_{15} = 15 \times 31 = 465$ and $S_{16} = 16 \times 33 = 528$.
4. The least number of terms is 16.
:::

## Problems in context

:::worked-solution[Example 5 (exam style): Tendai saves US\$20 in the first month, and each month saves US\$5 more than the month before. Find the amount saved in the 12th month, the total after 12 months, and the month in which the total first exceeds US\$1000]
1. $a = 20$, $d = 5$. 12th month: $u_{12} = 20 + 11 \times 5 = 75$, so US\$75.
2. Total: $S_{12} = \frac{12}{2}(20 + 75) = 570$, so US\$570.
3. $S_n = \frac{n}{2}\left\{40 + 5(n - 1)\right\} = \frac{n(5n + 35)}{2}$. Setting this above 1000 gives $5n^2 + 35n - 2000 > 0$, that is $n^2 + 7n - 400 > 0$.
4. The positive root is $n = \frac{-7 + \sqrt{1649}}{2} = 16.8$, so $n = 17$.
5. Check: $S_{16} = 920$ and $S_{17} = 1020$. The total first exceeds US\$1000 in the 17th month.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards examine the nth term, the sum and problems in context. Cambridge prints the sum formula in the List of formulas (not the nth-term formula); ZIMSEC prints no formulas, so learn both.
:::

## Common mistakes

:::mistake{title="Using nd instead of (n − 1)d"}
The 20th term is $a + 19d$, not $a + 20d$: the first term already counts as one term.
:::

:::mistake{title="Taking d the wrong way round"}
$d = u_2 - u_1$ (later minus earlier). For $12, 9, 6, \ldots$ it is $-3$, not $3$.
:::

:::mistake{title="Counting multiples from the boundary"}
For multiples of 7 between 100 and 300, the first term is 105, not 100: neither 100 nor 300 is a multiple of 7.
:::

:::mistake{title="Rounding n to the nearest integer"}
If $S_n > 500$ needs $n > 15.56$, the answer is 16, not "16 because 15.56 rounds up". Always check the sums on either side.
:::

## Exam tips

:::exam-tip
Write down $a$ and $d$ before you start, with signs. Most lost marks come from a wrong $d$ copied into every later step.
:::

:::exam-tip
In "find $n$" questions, solve the equation or inequality, reject non-positive or non-integer values with a reason, and state the final answer in words.
:::

:::exam-tip
Money in context questions: keep the units (US\$, km, seats) in your final sentence and answer the actual question asked (the 12th month's amount is a term; the total is a sum).
:::

## Summary

:::summary
- AP: constant difference $d = u_{n+1} - u_n$; first term $a$.
- nth term $u_n = a + (n - 1)d$.
- Sum $S_n = \frac{n}{2}(a + l) = \frac{n}{2}\{2a + (n - 1)d\}$.
- Two facts about an AP give simultaneous equations for $a$ and $d$.
- Multiples in a range: first and last multiples, then $l = a + (n - 1)d$ for $n$.
- "Find $n$" leads to a quadratic; $n$ is a positive integer, so check the neighbouring values.
:::
