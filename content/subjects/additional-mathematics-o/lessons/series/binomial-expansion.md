---
{
  "key": "series.binomial-expansion",
  "title": "The binomial expansion",
  "summary": "Expand (a + b)ⁿ for a positive integer n using Pascal's triangle or the binomial coefficients nCr, write full expansions and the first few terms of expansions such as (2 − 3x)⁵ with simplified coefficients, and use an expansion to estimate a value such as 1.02⁶.",
  "concepts": ["amath.series.binomial-expansion"],
  "estimatedMinutes": 40,
  "level": "core"
}
---
## Introduction

Multiplying out $(a + b)^2 = a^2 + 2ab + b^2$ is quick, but $(2 - 3x)^5$ by repeated multiplication would take a page of working and invite mistakes. The **binomial theorem** gives every term of $(a + b)^n$ directly, for any positive whole number $n$. It is used in probability (the binomial distribution), in approximations, and in calculus.

On the Cambridge 0606 papers you are asked to expand an expression fully, to give the first three or four terms of an expansion in ascending powers of $x$, or to use an expansion to estimate a number. Paper 1 has no calculator, so you must be able to find the coefficients by hand. The next lesson uses the general term to pick out one particular term.

## Key definitions

:::definition{term="Binomial"}
An expression with two terms, such as $a + b$ or $2 - 3x$.
:::

:::definition{term="Binomial coefficient"}
The number $\dbinom{n}{r} = \dfrac{n!}{r!\,(n - r)!}$, also written $^{n}C_{r}$, read "$n$ choose $r$". It is the coefficient of $a^{n-r}b^r$ in $(a + b)^n$. Here $n! = n(n - 1)\cdots 2 \times 1$ and $0! = 1$.
:::

:::formula{name="The binomial theorem (in Cambridge's List of formulas)"}
$$
(a + b)^n = a^n + \binom{n}{1}a^{n-1}b + \binom{n}{2}a^{n-2}b^2 + \cdots + \binom{n}{r}a^{n-r}b^r + \cdots + b^n
$$

for a positive integer $n$.
:::

Features of every expansion of $(a + b)^n$:

- there are $n + 1$ terms;
- the power of $a$ falls from $n$ to 0 while the power of $b$ rises from 0 to $n$; in each term the two powers add up to $n$;
- the coefficients are symmetric: $\binom{n}{r} = \binom{n}{n - r}$.

## Pascal's triangle

Each row starts and ends with 1, and every other number is the sum of the two numbers above it:

| $n$ | Coefficients |
| --- | --- |
| 1 | 1, 1 |
| 2 | 1, 2, 1 |
| 3 | 1, 3, 3, 1 |
| 4 | 1, 4, 6, 4, 1 |
| 5 | 1, 5, 10, 10, 5, 1 |
| 6 | 1, 6, 15, 20, 15, 6, 1 |

The row for $n$ gives $\binom{n}{0}, \binom{n}{1}, \ldots, \binom{n}{n}$. For larger $n$, or when you need only one coefficient, use the formula: for example $\binom{8}{3} = \frac{8 \times 7 \times 6}{3 \times 2 \times 1} = 56$.

## Full expansions

Write each term as (coefficient) $\times$ (first term)$^{\text{power}}$ $\times$ (second term)$^{\text{power}}$, **keeping brackets** around terms such as $(-3x)$ or $\left(\frac{2}{x}\right)$, then simplify.

:::worked-solution[Example 1: expand $(2 + x)^4$ fully]
1. Row 4 of Pascal's triangle: $1, 4, 6, 4, 1$.
2. $(2 + x)^4 = 1(2)^4 + 4(2)^3x + 6(2)^2x^2 + 4(2)x^3 + 1x^4$.
3. $= 16 + 32x + 24x^2 + 8x^3 + x^4$.
:::

![Pascal's triangle for n = 0 to 6: row 4 is 1, 4, 6, 4, 1 (the coefficients of (2 + x)^4) and row 6 is 1, 6, 15, 20, 15, 6, 1 (the first four coefficients used for (1 + 2x)^6); each number is the sum of the two above it.](media:diagrams/pascal-triangle-rows-0-to-6.png "Figure: row n gives the coefficients of (a + b)ⁿ; rows 4 and 6 are used in Examples 1 and 4")

:::worked-solution[Example 2: expand $\left(x + \dfrac{2}{x}\right)^4$ fully, simplifying each term]
1. Coefficients $1, 4, 6, 4, 1$; first term $x$, second term $\frac{2}{x}$.
2. $x^4 + 4x^3\left(\frac{2}{x}\right) + 6x^2\left(\frac{2}{x}\right)^2 + 4x\left(\frac{2}{x}\right)^3 + \left(\frac{2}{x}\right)^4$.
3. $= x^4 + 8x^2 + 24 + \dfrac{32}{x^2} + \dfrac{16}{x^4}$.
4. Note the constant term 24: the middle term, where the powers of $x$ cancel.
:::

## The first few terms

"In ascending powers of $x$" means start with the constant term, then the $x$ term, then $x^2$, and so on. A negative second term makes the signs alternate.

:::worked-solution[Example 3: find the first three terms, in ascending powers of $x$, of $(2 - 3x)^5$]
1. $a = 2$, $b = -3x$, $n = 5$.
2. Term 1: $2^5 = 32$.
3. Term 2: $\binom{5}{1}2^4(-3x) = 5 \times 16 \times (-3x) = -240x$.
4. Term 3: $\binom{5}{2}2^3(-3x)^2 = 10 \times 8 \times 9x^2 = 720x^2$.
5. $(2 - 3x)^5 = 32 - 240x + 720x^2 + \cdots$
:::

The most common error is $(-3x)^2 = -9x^2$ or $3x^2$; with brackets it is clearly $9x^2$.

## The special case (1 + x)ⁿ

When the first term is 1, all its powers are 1, so only the coefficients and the powers of $x$ remain:

$$
(1 + x)^n = 1 + nx + \frac{n(n - 1)}{2}x^2 + \frac{n(n - 1)(n - 2)}{6}x^3 + \cdots + x^n
$$

This form is the quickest to use for estimates and for questions with an unknown $n$. For $(1 + bx)^n$ simply replace $x$ by $bx$ throughout, remembering that $(bx)^2 = b^2x^2$. Two quick checks on any expansion: putting $x = 1$ in $(a + bx)^n$ must give $(a + b)^n$, and a minus sign in the bracket must make the signs alternate.

## Estimating with an expansion

If $x$ is small, high powers of $x$ are tiny, so the first few terms of an expansion give an accurate estimate. Choose $x$ so that the bracket becomes the number you want.

:::worked-solution[Example 4: find the first four terms of $(1 + 2x)^6$ in ascending powers of $x$, and use them to estimate $1.02^6$]
1. Coefficients for $n = 6$: $1, 6, 15, 20, \ldots$
2. $(1 + 2x)^6 = 1 + 6(2x) + 15(2x)^2 + 20(2x)^3 + \cdots = 1 + 12x + 60x^2 + 160x^3 + \cdots$
3. $1 + 2x = 1.02$ when $x = 0.01$.
4. $1.02^6 \approx 1 + 0.12 + 0.006 + 0.00016 = 1.12616$.
5. A calculator gives $1.126162\ldots$: the four terms are correct to 5 decimal places.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
The binomial expansion is in the Cambridge 0606 syllabus only (topic 12.1); it is not part of ZIMSEC O-Level Additional Mathematics. Cambridge prints the binomial theorem in the List of formulas but you must still evaluate the coefficients without a calculator on Paper 1.
:::

## Common mistakes

:::mistake{title="Dropping the brackets on the second term"}
In $(2 - 3x)^5$ the third term contains $(-3x)^2 = 9x^2$, not $-3x^2$. Always bracket the whole term, sign included.
:::

:::mistake{title="Forgetting to raise the first term to a power"}
$\binom{5}{1}(2)^4(-3x)$, not $\binom{5}{1}(2)(-3x)$. The powers of the first term go down from $n$.
:::

:::mistake{title="Using the wrong row of Pascal's triangle"}
The row for $n = 5$ has **six** numbers: $1, 5, 10, 10, 5, 1$. If your expansion has $n$ terms, you have used the wrong row.
:::

:::mistake{title="Descending instead of ascending"}
"Ascending powers of $x$" starts with the constant. For $(2 - 3x)^5$ that is 32, not $-243x^5$.
:::

## Exam tips

:::exam-tip
Set out each term as coefficient $\times$ power $\times$ power before simplifying. Method marks are given for the correct structure even if the arithmetic slips.
:::

:::exam-tip
For an estimate, show the value of $x$ you substitute and say how many terms you used. Do not use a calculator value as your answer to an "estimate" question.
:::

:::exam-tip
Check: putting $x = 1$ in a full expansion of $(a + bx)^n$ should give $(a + b)^n$. For $(2 + x)^4$: $16 + 32 + 24 + 8 + 1 = 81 = 3^4$.
:::

## Summary

:::summary
- $(a + b)^n = \sum \binom{n}{r}a^{n-r}b^r$, with $n + 1$ terms and powers adding to $n$.
- Coefficients from Pascal's triangle or $\binom{n}{r} = \frac{n!}{r!(n - r)!}$; they are symmetric.
- Bracket the second term, including its sign and any coefficient.
- Ascending powers start with the constant term.
- For small $x$, the first few terms give a good estimate, e.g. $1.02^6 \approx 1.12616$.
:::
