---
{
  "key": "series.arithmetic",
  "title": "Sequences, sigma notation and arithmetic progressions",
  "summary": "Generate sequences from a formula or a recurrence relation, describe their behaviour, use sigma notation, and find the nth term and the sum of an arithmetic progression, including the condition 2b = a + c and problems in context.",
  "concepts": ["amaths.series.arithmetic"],
  "estimatedMinutes": 45,
  "level": "core",
  "freePreview": true
}
---
## Introduction

A sequence is an ordered list of numbers, and patterns in sequences are everywhere: the seats in each row of a stadium, monthly savings that rise by a fixed amount, the money paid back on a loan. The simplest sequences, **arithmetic progressions**, go up or down by the same amount each time, and they come with neat formulas for any term and for the sum of many terms.

This lesson covers ZIMSEC Pure Mathematics (sequences and series, Form 5) and Cambridge 9709 Paper 1 (topic 1.6). Exam questions ask you to find terms and sums, to find the first term and common difference from given information, to find how many terms are needed for a sum to exceed a target, and to apply the formulas to everyday situations. ZIMSEC also asks you to describe the behaviour of sequences (periodic, oscillating, convergent, divergent).

## Key definitions

:::definition{term="Sequence and term"}
A **sequence** is an ordered list $u_1, u_2, u_3, \ldots$; $u_n$ is the **nth term**. A sequence can be defined by a formula for $u_n$ (e.g. $u_n = n^2$) or by a **recurrence relation** giving each term from the previous one (e.g. $u_{n+1} = 2u_n$ with $u_1 = 3$).
:::

:::definition{term="Series and sigma notation"}
A **series** is the sum of the terms of a sequence. $\displaystyle\sum_{r=1}^{n} u_r$ means $u_1 + u_2 + \cdots + u_n$.
:::

:::definition{term="Arithmetic progression (AP)"}
A sequence in which each term is the previous term plus a constant **common difference** $d$. The first term is $a$ and the last term is often called $l$.
:::

:::formula{name="Arithmetic progression (in MF19)"}
$$
u_n = a + (n - 1)d \qquad S_n = \frac{n}{2}\{2a + (n - 1)d\} = \frac{n}{2}(a + l)
$$
:::

## Sequences and their behaviour

:::worked-solution[Example 1: a sequence is defined by $u_1 = 3$ and $u_{n+1} = 2u_n - 1$. Find the first four terms]
1. $u_2 = 2(3) - 1 = 5$.
2. $u_3 = 2(5) - 1 = 9$.
3. $u_4 = 2(9) - 1 = 17$.
4. The sequence is $3, 5, 9, 17, \ldots$; the differences $2, 4, 8$ double, so it is not arithmetic.
:::

ZIMSEC describes sequences by their long-run behaviour:

- **Convergent**: the terms approach a limit, e.g. $u_n = 5 - \frac{1}{n}$ tends to 5.
- **Divergent**: the terms do not approach a limit, e.g. $u_n = 2^n$ grows without bound.
- **Oscillating**: the terms go up and down alternately, e.g. $u_n = (-1)^n n$ (this one also diverges).
- **Periodic**: the terms repeat in a cycle, e.g. $u_n = \sin\frac{n\pi}{2}$ gives $1, 0, -1, 0, 1, \ldots$ with period 4.

An arithmetic progression with $d \ne 0$ always diverges: its terms grow (or fall) steadily.

## Sigma notation

The letter below the $\Sigma$ is a counter; the numbers show where it starts and stops. The number of terms in $\sum_{r=m}^{n}$ is $n - m + 1$. A sum such as $\sum (3r + 2)$ is an AP, so you can use the AP formula, or split it into $3\sum r + \sum 2$.

:::worked-solution[Example 2: evaluate $\displaystyle\sum_{r=1}^{20}(3r + 2)$]
1. The terms are $5, 8, 11, \ldots, 62$: an AP with $a = 5$, $d = 3$, 20 terms.
2. $S_{20} = \frac{20}{2}(5 + 62) = 10 \times 67 = 670$.
:::

## The nth term and the sum

The formula for $u_n$ follows because getting from $u_1$ to $u_n$ takes $n - 1$ steps of size $d$. The sum formula comes from writing the series forwards and backwards and adding: each pair of terms adds to $a + l$, and there are $n$ pairs, so $2S_n = n(a + l)$. You will prove this in the questions.

When two terms are given, write each in the form $a + (n - 1)d$ and solve simultaneously.

:::worked-solution[Example 3: the 7th term of an AP is 25 and the 15th term is 49. Find the sum of the first 20 terms]
1. $a + 6d = 25$ and $a + 14d = 49$.
2. Subtract: $8d = 24$, so $d = 3$ and $a = 25 - 18 = 7$.
3. $S_{20} = \frac{20}{2}\{2(7) + 19(3)\} = 10(14 + 57) = 710$.
:::

## How many terms?

To find the least $n$ for which $S_n$ exceeds a value, form a quadratic inequality, solve the corresponding equation with the formula, and round **up** to the next whole number. Then check the integers on either side.

:::worked-solution[Example 4: find the least number of terms of the AP $5 + 9 + 13 + \cdots$ whose sum exceeds 1000]
1. $a = 5$, $d = 4$: $S_n = \frac{n}{2}\{10 + 4(n - 1)\} = n(2n + 3)$.
2. Solve $2n^2 + 3n - 1000 > 0$. The positive root of $2n^2 + 3n - 1000 = 0$ is $n = \dfrac{-3 + \sqrt{8009}}{4} = 21.62$.
3. So $n > 21.62$, and the least whole number is $n = 22$.
4. Check: $S_{21} = 21 \times 45 = 945 < 1000$ and $S_{22} = 22 \times 47 = 1034 > 1000$. ✓
:::

## Three terms in arithmetic progression

$a$, $b$, $c$ are consecutive terms of an AP when $b - a = c - b$, that is

$$
2b = a + c
$$

so the middle term is the mean of its neighbours.

:::worked-solution[Example 5: $x$, $2x + 3$ and $5x - 4$ are consecutive terms of an AP. Find $x$ and the terms]
1. $2(2x + 3) = x + (5x - 4)$.
2. $4x + 6 = 6x - 4$, so $2x = 10$ and $x = 5$.
3. The terms are $5, 13, 21$, with common difference 8.
:::

## Problems in context

Identify $a$, $d$ and $n$ from the words: "increases by the same amount each month" signals an AP. Decide whether the question wants one term (the amount in a particular month) or a sum (the total over several months).

:::worked-solution[Example 6: Tendai saves US\$20 in the first month and increases his saving by US\$5 each month. How much does he save in the 24th month, and in total over two years?]
1. $a = 20$, $d = 5$, $n = 24$.
2. 24th month: $u_{24} = 20 + 23 \times 5 = 135$, so US\$135.
3. Total: $S_{24} = \frac{24}{2}(20 + 135) = 12 \times 155 = 1860$, so US\$1860.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards examine sequences, sigma notation and APs (Cambridge Paper 1, topic 1.6). ZIMSEC also examines periodic, oscillating, convergent and divergent sequences; Cambridge does not use these terms. MF19 prints the AP formulas for Cambridge candidates.
:::

## Common mistakes

:::mistake{title="Using n instead of n − 1"}
$u_n = a + (n - 1)d$: the 20th term of $7, 11, 15, \ldots$ is $7 + 19 \times 4 = 83$, not $7 + 20 \times 4$.
:::

:::mistake{title="Miscounting terms in sigma notation"}
$\sum_{r=10}^{30}$ has $30 - 10 + 1 = 21$ terms, not 20.
:::

:::mistake{title="Rounding down in 'least n'"}
If $n > 21.62$, the least integer is 22. Rounding to 21 gives a sum that is too small.
:::

:::mistake{title="Confusing a term with a sum"}
"How much in the 24th month" is $u_{24}$; "how much altogether" is $S_{24}$.
:::

## Exam tips

:::exam-tip
Write the two equations from the given information in full ($a + 6d = 25$) before solving; method marks depend on them.
:::

:::exam-tip
For "show that" questions about $S_n$, substitute into the formula and simplify step by step to the printed expression.
:::

:::exam-tip
Check answers to "least $n$" questions by computing $S_{n-1}$ and $S_n$.
:::

## Summary

:::summary
- A sequence can be given by a formula for $u_n$ or by a recurrence relation; ZIMSEC classifies sequences as convergent, divergent, oscillating or periodic.
- $\sum_{r=m}^{n}$ has $n - m + 1$ terms.
- AP: $u_n = a + (n - 1)d$, $S_n = \frac{n}{2}\{2a + (n - 1)d\} = \frac{n}{2}(a + l)$.
- $a, b, c$ in AP $\iff 2b = a + c$.
- For "least $n$", solve the quadratic and round up; check neighbouring values.
:::
