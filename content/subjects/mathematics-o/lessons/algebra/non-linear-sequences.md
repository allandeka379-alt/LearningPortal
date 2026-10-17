---
{
  "key": "algebra.non-linear-sequences",
  "title": "nth term of non-linear sequences",
  "summary": "Find and use the nth term of quadratic and simple cubic sequences using differences, and (Cambridge Extended) of exponential sequences and simple combinations, using subscript notation such as uₙ.",
  "concepts": ["math.algebra.non-linear-sequences"],
  "objectives": ["cambridge/igcse/mathematics:2.7.3", "cambridge/igcse/mathematics:2.7.4"],
  "estimatedMinutes": 35,
  "level": "extended"
}
---
## Introduction

Not every pattern grows by the same amount each time. Arrange dots in squares with an extra row and column added each time and the totals grow faster and faster. Treble the number of people who have heard a piece of news every day and you get $7, 21, 63, 189, \ldots$: the gaps grow even faster. These are **non-linear** sequences.

In this lesson you will learn to recognise quadratic, cubic and exponential sequences and to find their $n$th terms. Cambridge Core candidates need simple cases such as $n^2 + 1$ and $n^3$; Cambridge Extended candidates need general quadratics $an^2 + bn + c$, exponential sequences and simple combinations, written with subscript notation.

You should already be able to find the $n$th term of a linear sequence.

## Key definitions

:::definition{term="First and second differences"}
The **first differences** are the gaps between consecutive terms. The **second differences** are the gaps between consecutive first differences.
:::

:::definition{term="Quadratic sequence"}
A sequence whose $n$th term has the form $an^2 + bn + c$ with $a \neq 0$. Its second differences are all equal to $2a$.
:::

:::definition{term="Exponential (geometric) sequence"}
A sequence in which each term is multiplied by the same number, the **common ratio** $r$. With first term $a$, the $n$th term is $a \times r^{n - 1}$.
:::

:::definition{term="Subscript notation"}
$u_n$ means the $n$th term of the sequence $u$. So $u_1$ is the first term and $u_{n + 1}$ is the term after $u_n$.
:::

## Simple quadratic and cubic sequences

Many sequences are close relatives of the square numbers $1, 4, 9, 16, 25$ or the cube numbers $1, 8, 27, 64, 125$. Compare term by term:

| Sequence | Compared with | $n$th term |
| --- | --- | --- |
| $3, 6, 11, 18, 27$ | each is two more than $n^2$ | $n^2 + 2$ |
| $9, 16, 25, 36$ | squares starting at $3^2$ | $(n + 2)^2$ |
| $-1, 2, 7, 14$ | each is two less than $n^2$ | $n^2 - 2$ |
| $0, 7, 26, 63$ | each is one less than $n^3$ | $n^3 - 1$ |

## General quadratic sequences (Cambridge Extended)

:::keyfact{title="Method for an² + bn + c"}
1. Find the second difference; $a$ is half of it.
2. Subtract $an^2$ from each term.
3. The numbers left form a linear sequence: find its $n$th term $bn + c$.
4. Add the parts and check with a term.
:::

:::worked-solution[Example 1: find the nth term of $4, 11, 22, 37, 56, \ldots$]
1. First differences: $7, 11, 15, 19$. Second differences: $4, 4, 4$. So $a = 2$.
2. Subtract $2n^2$ ($2, 8, 18, 32, 50$): $2, 3, 4, 5, 6$.
3. The remainder has $n$th term $n + 1$.
4. The $n$th term is $2n^2 + n + 1$. Check $n = 3$: $18 + 3 + 1 = 22$. ✓
:::

![Difference table for the sequence 4, 11, 22, 37, 56: the first differences are 7, 11, 15, 19 and the second differences are all 4, so the nth term is quadratic with 2n² as its leading part (2n² + n + 1).](media:diagrams/sequence-difference-table-quadratic.png "Figure: a constant second difference means a quadratic nth term")

:::worked-solution[Example 2: find the nth term of $1, 3, 7, 13, 21, \ldots$ and the 20th term]
1. First differences: $2, 4, 6, 8$. Second differences: 2, so $a = 1$.
2. Subtract $n^2$ ($1, 4, 9, 16, 25$): $0, -1, -2, -3, -4$.
3. The remainder has $n$th term $1 - n$.
4. The $n$th term is $n^2 - n + 1$, and the 20th term is $400 - 20 + 1 = 381$.
:::

## Exponential sequences (Cambridge Extended)

If the **ratio** between consecutive terms is constant, the sequence is exponential.

:::worked-solution[Example 3: find the nth term of $7, 21, 63, 189, \ldots$]
1. Ratio: $21 \div 7 = 3$, $63 \div 21 = 3$, so $r = 3$.
2. The first term is 7, so $u_n = 7 \times 3^{n - 1}$.
3. Check: $u_4 = 7 \times 3^3 = 189$. ✓
:::

The power is $n - 1$ because the first term has not yet been multiplied. A decreasing sequence such as $64, 16, 4, 1, \ldots$ has ratio $\frac{1}{4}$, so $u_n = 64 \times \left(\frac{1}{4}\right)^{n - 1}$ and $u_5 = \frac{1}{4}$.

## Combinations and term-to-term rules

Some sequences combine two types. With $u_n = 3^n - n$, work out each part and subtract: $u_4 = 81 - 4 = 77$. A sequence can also be given by a term-to-term rule in subscript form: $u_{n + 1} = 3u_n - 2$ with $u_1 = 2$ gives $2, 4, 10, 28, 82, \ldots$, which is the sequence $u_n = 3^{n - 1} + 1$.

## Common mistakes

:::mistake{title="Using the second difference as the coefficient"}
If the second difference is 4, the $n$th term starts $2n^2$, not $4n^2$. The coefficient of $n^2$ is **half** the second difference.
:::

:::mistake{title="Wrong power in an exponential sequence"}
$5, 15, 45, 135$ has $n$th term $5 \times 3^{n - 1}$, not $5 \times 3^n$. Check by putting $n = 1$.
:::

:::mistake{title="Squaring the coefficient"}
In $u_n = 2n^2 + n$, only $n$ is squared: $u_3 = 2 \times 9 + 3 = 21$, not $(2 \times 3)^2 + 3 = 39$.
:::

## Exam tips

:::exam-tip
Lay out differences in rows under the sequence so the examiner can follow them. A correct second difference often earns the first mark.
:::

:::exam-tip
Test the first two **and** a later term in your formula. A formula that fits only the first term or two is the most common error.
:::

:::exam-tip
Look for a constant **ratio** if the differences keep growing quickly: that signals an exponential sequence rather than a quadratic one.
:::

## Summary

:::summary
- Constant first differences: linear; constant second differences: quadratic; constant third differences: cubic.
- For $an^2 + bn + c$: $a$ is half the second difference; subtract $an^2$ and find the linear part.
- Compare simple sequences with $n^2$ and $n^3$.
- An exponential sequence with first term $a$ and ratio $r$ has $n$th term $a \times r^{n - 1}$.
- $u_n$ is the $n$th term; $u_{n + 1}$ is the next term.
:::
