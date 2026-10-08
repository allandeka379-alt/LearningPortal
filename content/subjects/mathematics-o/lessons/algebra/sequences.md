---
{
  "key": "algebra.sequences",
  "title": "Sequences and number patterns",
  "summary": "Continue sequences and patterns, use term-to-term rules, recognise special sequences, and find and use the nth term of a linear sequence, including matchstick and tile patterns.",
  "concepts": ["math.algebra.sequences"],
  "objectives": ["zimsec/o-level/mathematics:1.1.8", "cambridge/igcse/mathematics:2.7.1", "cambridge/igcse/mathematics:2.7.2", "cambridge/igcse/mathematics:2.7.3"],
  "estimatedMinutes": 30,
  "level": "core"
}
---
## Introduction

For a school prize-giving in Kwekwe, square tables are pushed together in a long row. One table seats 4 people, two tables seat 6, and three tables seat 8. How many people can sit at a row of 40 tables? Counting chairs would take a long time; spotting the **pattern** and writing a rule takes seconds.

Number patterns like this are called **sequences**. In this lesson you will continue sequences, describe them with term-to-term rules, recognise some special sequences and, most importantly, find the **$n$th term** of a linear sequence so that you can work out any term directly.

## Key definitions

:::definition{term="Sequence and term"}
A sequence is an ordered list of numbers that follow a rule. Each number is a **term**. The first term is $T_1$ (or $u_1$), the second is $T_2$, and so on.
:::

:::definition{term="Term-to-term rule"}
A rule for getting from one term to the next, such as “add 3” or “multiply by 2, then subtract 1”.
:::

:::definition{term="nth term (position-to-term rule)"}
A formula in $n$ that gives the term in position $n$. For example, with $n$th term $5n - 1$, the 10th term is $5(10) - 1 = 49$.
:::

:::definition{term="Linear sequence"}
A sequence in which the terms go up or down by the same amount each time: the **common difference**.
:::

## Special sequences

Learn to recognise these at a glance:

| Sequence | First terms | $n$th term |
| --- | --- | --- |
| Even numbers | $2, 4, 6, 8, \ldots$ | $2n$ |
| Odd numbers | $1, 3, 5, 7, \ldots$ | $2n - 1$ |
| Square numbers | $1, 4, 9, 16, \ldots$ | $n^2$ |
| Cube numbers | $1, 8, 27, 64, \ldots$ | $n^3$ |
| Triangular numbers | $1, 3, 6, 10, \ldots$ | $\frac{n(n + 1)}{2}$ |

## Finding the nth term of a linear sequence

:::keyfact{title="Method"}
1. Find the common difference $d$. The $n$th term starts $dn$.
2. Compare $dn$ with the actual terms (or find the “zeroth term”, one step before the first) to get the constant.
3. Check with another term.
:::

:::worked-solution[Example 1: find the nth term of $2, 9, 16, 23, \ldots$]
1. The common difference is 7, so the $n$th term is $7n + c$.
2. The multiples of 7 are $7, 14, 21, 28$; each term is 5 less. So $c = -5$.
3. The $n$th term is $7n - 5$. Check: $n = 4$ gives $23$. ✓
:::

:::worked-solution[Example 2: find the nth term of $30, 26, 22, 18, \ldots$]
1. The common difference is $-4$, so the $n$th term is $-4n + c$.
2. The zeroth term is $30 + 4 = 34$, so $c = 34$.
3. The $n$th term is $34 - 4n$. Check: $n = 3$ gives $22$. ✓
:::

## Using the nth term

Once you have the $n$th term you can find any term, find the position of a term, or test whether a number belongs to the sequence.

:::worked-solution[Example 3: is 150 a term of the sequence with nth term 4n + 3?]
1. Suppose $4n + 3 = 150$.
2. Then $4n = 147$, so $n = 36.75$.
3. $n$ is not a whole number, so 150 is **not** a term. (The 36th term is 147 and the 37th is 151.)
:::

## Patterns of shapes

:::worked-solution[Example 4: the prize-giving tables]
1. Seats: $4, 6, 8, \ldots$ The common difference is 2, so the $n$th term is $2n + c$.
2. When $n = 1$: $2 + c = 4$, so $c = 2$. The rule is $2n + 2$.
3. It makes sense: each table seats one person on each of its two sides along the row, and one more person sits at each end of the row.
4. For 40 tables: $2(40) + 2 = 82$ people.
5. Could a row seat exactly 75 people? $2n + 2$ is always even, so no.
:::

Matchstick patterns work in the same way. A row of triangles uses $3, 5, 7, \ldots$ matchsticks: each new triangle shares a side with the last one and adds 2 sticks, so pattern $n$ needs $2n + 1$.

## Common mistakes

:::mistake{title="Using the first term as the coefficient of n"}
For $2, 9, 16, \ldots$ the $n$th term is not $2n + 7$. The coefficient of $n$ is the **common difference**, 7.
:::

:::mistake{title="Wrong constant for a decreasing sequence"}
For $30, 26, 22, \ldots$, the $n$th term is $34 - 4n$, not $30 - 4n$. Check with $n = 1$: $30 - 4 = 26$ is the second term.
:::

:::mistake{title="Checking only the first step"}
For $3, 6, 12, 24$, “add 3” works once but not again. Check a rule on every step: here it is “multiply by 2”.
:::

## Exam tips

:::exam-tip
Always check your $n$th term by substituting $n = 1$ and $n = 2$. It takes a few seconds and catches most errors.
:::

:::exam-tip
“Explain why 75 cannot be a term” needs a reason: show that solving gives a non-integer $n$, or that every term is even (or a multiple of some number).
:::

:::exam-tip
In pattern questions, read whether the question wants the **pattern number** or the **number of items**. They are easy to confuse.
:::

## Summary

:::summary
- A sequence follows a rule; a term-to-term rule links consecutive terms.
- The $n$th term gives any term from its position.
- For a linear sequence, the $n$th term is $dn + c$, where $d$ is the common difference.
- To test a number, set the $n$th term equal to it: $n$ must be a positive whole number.
- Learn the square, cube, triangular, odd and even number sequences.
:::
