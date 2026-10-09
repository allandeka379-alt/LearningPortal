---
{
  "key": "series.binomial-terms",
  "title": "Using the general term of a binomial expansion",
  "summary": "Use the general term nCr a^(n−r) b^r to find a particular term or coefficient of a binomial expansion, find the term independent of x in expansions such as (2x + 1/x)¹⁰, find coefficients in products such as (1 + kx)(2 − x)⁶, and find an unknown n or k from given coefficients.",
  "concepts": ["amath.series.binomial-terms"],
  "estimatedMinutes": 40,
  "level": "core"
}
---
## Introduction

Writing out all eleven terms of $\left(2x + \frac{1}{x}\right)^{10}$ to find one of them would be slow and risky. The **general term** of a binomial expansion lets you go straight to the term you need: the coefficient of $x^5$, the term that does not contain $x$ at all, or the coefficient that tells you the value of an unknown constant.

Cambridge 0606 questions on this topic are short but demand careful algebra with indices: you set the power of $x$ in the general term equal to the power you want and solve for $r$. They are often combined with the full expansions of the previous lesson in one question.

## Key definitions

:::definition{term="General term"}
The term of $(a + b)^n$ containing $b^r$, written $T_{r+1}$ because it is the $(r + 1)$th term (the first term has $r = 0$).
:::

:::formula{name="General term of (a + b)ⁿ (from the binomial theorem in Cambridge's List of formulas)"}
$$
T_{r+1} = \binom{n}{r}a^{n-r}b^r, \qquad r = 0, 1, 2, \ldots, n
$$
:::

:::definition{term="Term independent of x"}
The term that contains no $x$ (the power of $x$ is 0): a constant. It exists only if the equation "power of $x$ = 0" has a whole-number solution $r$ between 0 and $n$.
:::

## Finding a particular coefficient

1. Write the general term with the actual $a$, $b$ and $n$, keeping brackets.
2. Collect the powers of $x$ into one power, $x^{(\ldots)}$.
3. Set that power equal to the one required and solve for $r$.
4. Substitute $r$ back to get the coefficient.

:::worked-solution[Example 1: find the coefficient of $x^5$ in the expansion of $(2 + 3x)^8$]
1. $T_{r+1} = \binom{8}{r}2^{8-r}(3x)^r = \binom{8}{r}2^{8-r}3^r x^r$.
2. For $x^5$: $r = 5$.
3. Coefficient $= \binom{8}{5}2^3 3^5 = 56 \times 8 \times 243 = 108\,864$.
:::

## The term independent of x

When both terms of the binomial contain $x$, the powers combine. Use the index laws: $\left(\frac{1}{x}\right)^r = x^{-r}$ and $(x^2)^{n-r} = x^{2n-2r}$.

:::worked-solution[Example 2: find the term independent of $x$ in the expansion of $\left(2x + \dfrac{1}{x}\right)^{10}$]
1. $T_{r+1} = \binom{10}{r}(2x)^{10-r}\left(\frac{1}{x}\right)^r = \binom{10}{r}2^{10-r}x^{10-r}x^{-r}$.
2. Power of $x$: $10 - r - r = 10 - 2r$.
3. Independent of $x$: $10 - 2r = 0$, so $r = 5$.
4. Term $= \binom{10}{5}2^5 = 252 \times 32 = 8064$.
:::

:::worked-solution[Example 3: find the term independent of $x$ in the expansion of $\left(x^2 - \dfrac{2}{x}\right)^6$]
1. $T_{r+1} = \binom{6}{r}(x^2)^{6-r}\left(-\frac{2}{x}\right)^r = \binom{6}{r}(-2)^r x^{12 - 2r}x^{-r}$.
2. Power of $x$: $12 - 3r = 0$, so $r = 4$.
3. Term $= \binom{6}{4}(-2)^4 = 15 \times 16 = 240$.
:::

If the equation for $r$ has no whole-number solution, there is no such term. For example, in $\left(x + \frac{1}{x}\right)^7$ the power is $7 - 2r$, which is never 0 for a whole number $r$, so there is no term independent of $x$.

## Coefficients in a product

To find a coefficient in a product such as $(1 + 3x)(2 - x)^6$, expand the binomial as far as needed, then collect **every** way of making the power you want.

:::worked-solution[Example 4: find the coefficient of $x^2$ in the expansion of $(1 + 3x)(2 - x)^6$]
1. $(2 - x)^6 = 64 + \binom{6}{1}2^5(-x) + \binom{6}{2}2^4(-x)^2 + \cdots = 64 - 192x + 240x^2 + \cdots$
2. Terms in $x^2$ come from $1 \times 240x^2$ and $3x \times (-192x)$.
3. Coefficient $= 240 - 576 = -336$.
:::

The same idea works backwards. If the coefficient of $x$ in $(1 + kx)(2 - x)^6$ is zero, then the two contributions must cancel: $1 \times (-192) + k \times 64 = 0$, using the first two terms $64 - 192x$ found above. So $64k = 192$ and $k = 3$.

## Finding an unknown n or k

A given coefficient gives an equation. For an unknown $n$, $\binom{n}{2} = \frac{n(n - 1)}{2}$ and $\binom{n}{3} = \frac{n(n - 1)(n - 2)}{6}$ turn it into a polynomial equation; $n$ must be a positive integer.

:::worked-solution[Example 5: the coefficient of $x^2$ in the expansion of $(1 + 2x)^n$ is 180. Find $n$]
1. The $x^2$ term is $\binom{n}{2}(2x)^2 = \frac{n(n - 1)}{2} \times 4x^2 = 2n(n - 1)x^2$.
2. $2n(n - 1) = 180$, so $n^2 - n - 90 = 0$.
3. $(n - 10)(n + 9) = 0$, and $n$ is a positive integer, so $n = 10$.
:::

:::worked-solution[Example 6 (exam style): the coefficient of $x^3$ in the expansion of $(1 + kx)^5$ is $-80$. Find $k$]
1. The $x^3$ term is $\binom{5}{3}(kx)^3 = 10k^3x^3$.
2. $10k^3 = -80$, so $k^3 = -8$ and $k = -2$.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
The general term is in the Cambridge 0606 syllabus only (topic 12.2), which states that the greatest term and properties of the coefficients are not required. It is not part of ZIMSEC O-Level Additional Mathematics.
:::

## Common mistakes

:::mistake{title="Confusing the (r + 1)th term with the rth term"}
$\binom{n}{r}a^{n-r}b^r$ is the $(r + 1)$th term. The 4th term has $r = 3$.
:::

:::mistake{title="Index errors with reciprocal terms"}
$\left(\frac{1}{x}\right)^r = x^{-r}$ and $\left(\frac{2}{x}\right)^r = 2^r x^{-r}$. Forgetting the $2^r$ is common.
:::

:::mistake{title="Missing a contribution in a product"}
In $(1 + 3x)(2 - x)^6$ the $x^2$ term has **two** parts: $1 \times (x^2 \text{ term})$ and $3x \times (x \text{ term})$.
:::

:::mistake{title="Answering with the term instead of the coefficient"}
If asked for the coefficient of $x^5$, give the number (108 864), not $108\,864x^5$. If asked for the term, include the $x^5$.
:::

## Exam tips

:::exam-tip
Write the general term in full and simplify the power of $x$ **before** substituting numbers. Examiners award a method mark for the correct power equation, such as $12 - 3r = 0$.
:::

:::exam-tip
Check that the value of $r$ you find is a whole number between 0 and $n$. If it is not, say that no such term exists.
:::

:::exam-tip
When the unknown is $n$, reject negative or non-integer solutions with a reason; when it is $k$, use any condition given (such as $k > 0$) to choose between roots.
:::

## Summary

:::summary
- General term of $(a + b)^n$: $T_{r+1} = \binom{n}{r}a^{n-r}b^r$.
- For a given power of $x$: simplify the power in the general term, solve for $r$, substitute back.
- Term independent of $x$: power of $x$ equals 0; it exists only for a whole-number $r$.
- Products: add every pair of terms giving the required power.
- Given coefficients give equations for an unknown $n$ (polynomial) or $k$.
:::
