---
{
  "key": "series.binomial-positive",
  "title": "The binomial expansion for a positive integer index",
  "summary": "Expand (a + b)ⁿ for a positive integer n using n! and binomial coefficients, find a particular term, a coefficient or the term independent of x, expand products such as (1 + 2x)(3 − x)⁵, and use expansions for approximations.",
  "concepts": ["amaths.series.binomial-positive"],
  "estimatedMinutes": 45,
  "level": "core"
}
---
## Introduction

Multiplying out $(a + b)^2$ is easy; $(a + b)^{10}$ by repeated multiplication would take pages. The binomial theorem gives every term at once, using the numbers of Pascal's triangle. It is used to find a single coefficient quickly, to approximate powers such as $1.02^8$, and later (with fractional and negative powers) to build series for functions.

This topic is in ZIMSEC Pure Mathematics (series, Form 5) and Cambridge 9709 Paper 1 (topic 1.6). Typical questions: "find the first three terms in ascending powers of $x$", "find the coefficient of $x^3$", "find the term independent of $x$", and "hence find the coefficient of $x^2$ in the expansion of $(1 + 2x)(3 - x)^5$". Finding the greatest term and properties of the coefficients are not required.

## Key definitions

:::definition{term="Factorial"}
$n! = n \times (n - 1) \times \cdots \times 2 \times 1$ for a positive integer $n$, and $0! = 1$.
:::

:::definition{term="Binomial coefficient"}
$\displaystyle\binom{n}{r} = {}^n\mathrm{C}_r = \frac{n!}{r!\,(n - r)!}$: the number of ways of choosing $r$ objects from $n$. It is the coefficient of $a^{n-r}b^r$ in $(a + b)^n$.
:::

:::formula{name="Binomial theorem, n a positive integer (in MF19)"}
$$
(a + b)^n = a^n + \binom{n}{1}a^{n-1}b + \binom{n}{2}a^{n-2}b^2 + \cdots + \binom{n}{r}a^{n-r}b^r + \cdots + b^n
$$
:::

The **general term** is $\binom{n}{r}a^{n-r}b^r$; it is the $(r + 1)$th term. There are $n + 1$ terms, the powers of $a$ fall from $n$ to 0 while the powers of $b$ rise from 0 to $n$, and in every term the powers add up to $n$. The coefficients are symmetric: $\binom{n}{r} = \binom{n}{n - r}$.

## Pascal's triangle and the coefficients

Each row of Pascal's triangle starts and ends with 1, and every other entry is the sum of the two above it. Row $n$ gives the coefficients of $(a + b)^n$:

![Pascal's triangle for rows 0 to 7, each entry the sum of the two above it, with row 4 (1, 4, 6, 4, 1) highlighted: these are the coefficients used to expand (2 + x)⁴ = 16 + 32x + 24x² + 8x³ + x⁴, and row 7 is 1, 7, 21, 35, 35, 21, 7, 1.](media:diagrams/pascals-triangle-rows-0-7.png "Figure: row n of Pascal's triangle gives the coefficients of (a + b)ⁿ; row 4 expands (2 + x)⁴")

| $n$ | coefficients |
| --- | --- |
| 4 | 1, 4, 6, 4, 1 |
| 5 | 1, 5, 10, 10, 5, 1 |
| 6 | 1, 6, 15, 20, 15, 6, 1 |

For larger $n$, or for one coefficient only, use $\binom{n}{r}$ (the $^n\mathrm{C}_r$ key on a calculator) or the shortcut $\binom{n}{2} = \frac{n(n - 1)}{2}$, $\binom{n}{3} = \frac{n(n - 1)(n - 2)}{6}$.

:::worked-solution[Example 1: expand $(2 + x)^4$]
1. Coefficients from row 4: $1, 4, 6, 4, 1$.
2. $(2 + x)^4 = 2^4 + 4(2^3)x + 6(2^2)x^2 + 4(2)x^3 + x^4$.
3. $= 16 + 32x + 24x^2 + 8x^3 + x^4$.
:::

## Finding one term or coefficient

Write the general term, put the powers together, and choose $r$ to get the power you want. Keep negative signs **inside** the brackets: $(-2x)^3 = -8x^3$.

:::worked-solution[Example 2: find the coefficient of $x^3$ in the expansion of $(3 - 2x)^7$]
1. The term in $x^3$ has $r = 3$: $\binom{7}{3}(3)^4(-2x)^3$.
2. $\binom{7}{3} = 35$, $3^4 = 81$, $(-2)^3 = -8$.
3. Coefficient $= 35 \times 81 \times (-8) = -22\,680$.
:::

## The term independent of x

When both parts of the bracket contain $x$, the powers combine. The **term independent of $x$** (the constant term) is the one in which the power of $x$ is zero.

:::worked-solution[Example 3: find the term independent of $x$ in the expansion of $\left(x^2 + \dfrac{2}{x}\right)^6$]
1. General term: $\binom{6}{r}(x^2)^{6-r}\left(\dfrac{2}{x}\right)^r = \binom{6}{r}2^r x^{12 - 2r - r} = \binom{6}{r}2^r x^{12 - 3r}$.
2. Independent of $x$: $12 - 3r = 0$, so $r = 4$.
3. Term $= \binom{6}{4}2^4 = 15 \times 16 = 240$.
:::

If the equation for $r$ has no whole-number solution, there is no such term.

## Products of brackets

To find a coefficient in a product such as $(1 + 2x)(3 - x)^5$, expand the binomial only as far as you need, then collect every way of making the required power.

:::worked-solution[Example 4: find the first three terms of $(3 - x)^5$ in ascending powers of $x$, and hence the coefficient of $x^2$ in $(1 + 2x)(3 - x)^5$]
1. $(3 - x)^5 = 3^5 + 5(3^4)(-x) + 10(3^3)(-x)^2 + \cdots = 243 - 405x + 270x^2 + \cdots$
2. In $(1 + 2x)(243 - 405x + 270x^2 + \cdots)$, $x^2$ terms come from $1 \times 270x^2$ and $2x \times (-405x)$.
3. Coefficient of $x^2$ $= 270 - 810 = -540$.
:::

## Finding an unknown

If a coefficient is given, set the expression for it equal to the value and solve.

:::worked-solution[Example 5: the coefficient of $x^2$ in the expansion of $(1 + ax)^6$ is 135. Find the possible values of $a$]
1. The $x^2$ term is $\binom{6}{2}(ax)^2 = 15a^2x^2$.
2. $15a^2 = 135$, so $a^2 = 9$ and $a = 3$ or $a = -3$.
3. Both values work, because only $a^2$ appears; an extra condition (such as "the coefficient of $x$ is positive") would choose one.
:::

## Approximations

When $x$ is small, the higher powers of $x$ are tiny, so the first few terms give a good approximation.

:::worked-solution[Example 6: use the first three terms of the expansion of $(1 + 2x)^8$ to estimate $1.02^8$]
1. $(1 + 2x)^8 = 1 + 8(2x) + 28(2x)^2 + \cdots = 1 + 16x + 112x^2 + \cdots$
2. $1.02 = 1 + 2x$ when $x = 0.01$.
3. Estimate: $1 + 0.16 + 0.0112 = 1.1712$.
4. The calculator value is $1.1717$ (4 d.p.): the neglected $x^3$ and higher terms make up the difference.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards examine this content in the same way (Cambridge Paper 1, topic 1.6; MF19 prints the expansion and $\binom{n}{r}$). Neither requires the greatest term or properties of the coefficients. The expansion for rational (negative or fractional) $n$ is a separate topic: Cambridge Paper 3 only, ZIMSEC Form 5.
:::

## Common mistakes

:::mistake{title="Losing the sign or the coefficient inside the bracket"}
In $(3 - 2x)^7$, the bracket term is $(-2x)$; its cube is $-8x^3$, not $-2x^3$.
:::

:::mistake{title="Mixing up r and the term number"}
$\binom{n}{r}a^{n-r}b^r$ is the $(r + 1)$th term: the 4th term has $r = 3$.
:::

:::mistake{title="Forgetting that powers combine"}
In $\left(x^2 + \frac{2}{x}\right)^6$ the power of $x$ in each term is $2(6 - r) - r$, not $6 - r$.
:::

:::mistake{title="Missing a product term"}
The $x^2$ coefficient in $(1 + 2x)(\ldots)$ needs both $1 \times (x^2 \text{ term})$ and $2x \times (x \text{ term})$.
:::

## Exam tips

:::exam-tip
"In ascending powers of $x$" means the constant first, then $x$, $x^2$, … Simplify each coefficient fully.
:::

:::exam-tip
Show the general term with $r$ substituted (e.g. $\binom{7}{3}3^4(-2x)^3$) so that a method mark is earned even if the arithmetic slips.
:::

:::exam-tip
For approximations, state the value of $x$ you substitute and give the answer to the accuracy asked.
:::

## Summary

:::summary
- $(a + b)^n = \sum_{r=0}^{n}\binom{n}{r}a^{n-r}b^r$, with $\binom{n}{r} = \frac{n!}{r!(n - r)!}$; $n + 1$ terms.
- The $(r + 1)$th term is $\binom{n}{r}a^{n-r}b^r$; keep signs and coefficients inside the brackets.
- Term independent of $x$: set the combined power of $x$ to zero and solve for $r$.
- In products, add every pair of terms that gives the required power.
- For small $x$, the first few terms approximate powers such as $1.02^8$.
:::
