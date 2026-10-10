---
{
  "key": "series.binomial-rational",
  "title": "The binomial expansion for a rational index",
  "summary": "Expand (1 + x)ⁿ for negative and fractional n as an infinite series valid for |x| < 1, adapt it to (a + bx)ⁿ and state the range of validity, expand rational functions after splitting them into partial fractions, and use the series for approximations.",
  "concepts": ["amaths.series.binomial-rational"],
  "estimatedMinutes": 45,
  "level": "core"
}
---
## Introduction

The binomial theorem does not stop at positive whole-number powers. Newton discovered that $(1 + x)^n$ can be expanded for **any** rational $n$, such as $-1$, $\frac{1}{2}$ or $-\frac{2}{3}$, but then the series never ends, and it only makes sense for small enough $x$. These infinite expansions let you approximate square roots by hand, simplify complicated functions near $x = 0$, and lead on to the Maclaurin series of later work.

This is Cambridge 9709 Paper 3 (A Level only, topic 3.1) and ZIMSEC Pure Mathematics (series, Form 5). Typical questions: "expand $(1 - 4x)^{1/2}$ in ascending powers of $x$ up to and including the term in $x^3$, and state the set of values of $x$ for which the expansion is valid", and "express $f(x)$ in partial fractions; hence obtain the expansion of $f(x)$ up to the term in $x^2$". Finding the general term is not required by Cambridge.

## Key definitions

:::definition{term="Rational index"}
A power $n$ that is a fraction or a negative integer (any rational number). For such $n$ the expansion of $(1 + x)^n$ is an infinite series.
:::

:::definition{term="Range of validity"}
The set of values of $x$ for which the infinite series converges to $(1 + x)^n$: for $(1 + x)^n$ it is $|x| < 1$.
:::

:::formula{name="Binomial series, n rational, |x| < 1 (in MF19)"}
$$
(1 + x)^n = 1 + nx + \frac{n(n - 1)}{2!}x^2 + \frac{n(n - 1)(n - 2)}{3!}x^3 + \cdots
$$
:::

When $n$ is a positive integer the coefficients eventually become zero (a factor $n - n$ appears) and the series stops. For any other $n$ no coefficient is zero, so the series goes on for ever.

## Expanding (1 + x)ⁿ and (1 + bx)ⁿ

Substitute carefully, putting brackets round every replacement for $x$. For $(1 + bx)^n$, replace $x$ by $bx$ throughout, and the range of validity becomes $|bx| < 1$, that is $|x| < \frac{1}{|b|}$.

:::worked-solution[Example 1: expand $(1 + x)^{-2}$ up to the term in $x^3$]
1. $n = -2$: $1 + (-2)x + \dfrac{(-2)(-3)}{2}x^2 + \dfrac{(-2)(-3)(-4)}{6}x^3$.
2. $= 1 - 2x + 3x^2 - 4x^3 + \cdots$, valid for $|x| < 1$.
:::

:::worked-solution[Example 2: expand $\sqrt{1 - 4x}$ up to the term in $x^3$ and state the range of validity]
1. Write it as $(1 + (-4x))^{\frac{1}{2}}$.
2. $1 + \frac{1}{2}(-4x) + \dfrac{\frac{1}{2}\left(-\frac{1}{2}\right)}{2}(-4x)^2 + \dfrac{\frac{1}{2}\left(-\frac{1}{2}\right)\left(-\frac{3}{2}\right)}{6}(-4x)^3$.
3. The coefficients are $1$, $-2$, $-\frac{1}{8} \times 16 = -2$ and $\frac{1}{16} \times (-64) = -4$.
4. $\sqrt{1 - 4x} = 1 - 2x - 2x^2 - 4x^3 - \cdots$, valid for $|4x| < 1$, i.e. $|x| < \frac{1}{4}$.
:::

## Expanding (a + bx)ⁿ

The series needs a 1 in front. Take $a$ out of the bracket first:

$$
(a + bx)^n = a^n\left(1 + \frac{b}{a}x\right)^n \quad\text{valid for } \left|\frac{bx}{a}\right| < 1, \text{ i.e. } |x| < \left|\frac{a}{b}\right|
$$

:::worked-solution[Example 3: expand $\left(2 - \frac{1}{2}x\right)^{-1}$ up to the term in $x^3$, stating the range of validity]
1. $\left(2 - \frac{1}{2}x\right)^{-1} = 2^{-1}\left(1 - \frac{x}{4}\right)^{-1} = \frac{1}{2}\left(1 - \frac{x}{4}\right)^{-1}$.
2. $(1 - u)^{-1} = 1 + u + u^2 + u^3 + \cdots$ with $u = \frac{x}{4}$: $1 + \frac{x}{4} + \frac{x^2}{16} + \frac{x^3}{64}$.
3. Multiply by $\frac{1}{2}$: $\frac{1}{2} + \frac{x}{8} + \frac{x^2}{32} + \frac{x^3}{128} + \cdots$
4. Valid for $\left|\frac{x}{4}\right| < 1$, i.e. $|x| < 4$.
:::

The useful special cases $(1 - x)^{-1} = 1 + x + x^2 + \cdots$ (a geometric series) and $(1 + x)^{-1} = 1 - x + x^2 - \cdots$ are worth knowing by heart.

## Approximations

Choose $x$ so that the bracket equals the number you want, keep $x$ small, and add the first few terms.

:::worked-solution[Example 4: use the expansion in Example 2 with $x = 0.01$ to estimate $\sqrt{0.96}$]
1. $1 - 4(0.01) = 0.96$, so $\sqrt{0.96} \approx 1 - 2(0.01) - 2(0.01)^2 - 4(0.01)^3$.
2. $= 1 - 0.02 - 0.0002 - 0.000004 = 0.979796$.
3. The calculator gives $0.9797959$: the estimate is correct to 6 decimal places, because $x = 0.01$ is well inside $|x| < \frac{1}{4}$.
:::

## Rational functions and partial fractions

To expand a fraction such as $\dfrac{4 + 5x}{(1 + 2x)(1 - x)}$, first split it into partial fractions, then expand each part and add. The combined expansion is valid where **both** parts are valid: the smaller range.

:::worked-solution[Example 5: express $f(x) = \dfrac{4 + 5x}{(1 + 2x)(1 - x)}$ in partial fractions and hence expand $f(x)$ up to the term in $x^3$]
1. $\dfrac{4 + 5x}{(1 + 2x)(1 - x)} = \dfrac{A}{1 - x} + \dfrac{B}{1 + 2x}$, so $4 + 5x = A(1 + 2x) + B(1 - x)$.
2. $x = 1$: $9 = 3A$, $A = 3$. $x = -\frac{1}{2}$: $\frac{3}{2} = \frac{3}{2}B$, $B = 1$.
3. $\dfrac{3}{1 - x} = 3 + 3x + 3x^2 + 3x^3 + \cdots$ (valid $|x| < 1$).
4. $\dfrac{1}{1 + 2x} = 1 - 2x + 4x^2 - 8x^3 + \cdots$ (valid $|x| < \frac{1}{2}$).
5. $f(x) = 4 + x + 7x^2 - 5x^3 + \cdots$, valid for $|x| < \frac{1}{2}$.
:::

## Finding unknown constants

If the first terms of $(1 + ax)^n$ are given, compare coefficients to form two equations.

:::worked-solution[Example 6: the expansion of $(1 + ax)^n$ begins $1 - 6x + 24x^2$. Find $a$ and $n$, and the coefficient of $x^3$]
1. $na = -6$ and $\dfrac{n(n - 1)}{2}a^2 = 24$.
2. Write the second as $\dfrac{(na)(n - 1)a}{2} = \dfrac{-6(n - 1)a}{2} = 24$, so $(n - 1)a = -8$.
3. $na - a = -8$ gives $-6 - a = -8$, so $a = 2$ and $n = -3$.
4. Coefficient of $x^3$: $\dfrac{(-3)(-4)(-5)}{6} \times 2^3 = -10 \times 8 = -80$.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Cambridge examines this in Paper 3 only (A Level), including expansions after partial fractions; the general term is not required. ZIMSEC teaches it in Form 5 with the positive-integer case. Both expect the range of validity to be stated.
:::

## Common mistakes

:::mistake{title="Not taking out the constant"}
$(4 + x)^{\frac{1}{2}}$ is $2\left(1 + \frac{x}{4}\right)^{\frac{1}{2}}$, not $\left(1 + \frac{x}{4}\right)^{\frac{1}{2}}$ or $4(\ldots)$: the factor is $4^{\frac{1}{2}} = 2$.
:::

:::mistake{title="Brackets round the substitution"}
In $(1 - 4x)^{\frac{1}{2}}$ the $x^2$ term uses $(-4x)^2 = 16x^2$, not $-4x^2$.
:::

:::mistake{title="Wrong range of validity"}
$(1 + 3x)^{-1}$ is valid for $|3x| < 1$, i.e. $|x| < \frac{1}{3}$, not $|x| < 3$.
:::

:::mistake{title="Using x outside the range"}
Substituting $x = 2$ into the series for $(1 + x)^{-1}$ gives $1 - 2 + 4 - 8 + \cdots$, which does not converge to $\frac{1}{3}$.
:::

## Exam tips

:::exam-tip
"Up to and including the term in $x^3$" means four terms; simplify each coefficient to a fraction or integer.
:::

:::exam-tip
Always state the range of validity when asked, in the form $|x| < k$ or $-k < x < k$.
:::

:::exam-tip
In partial-fraction questions, the answer's range of validity is the narrower of the two.
:::

## Summary

:::summary
- For rational $n$ and $|x| < 1$: $(1 + x)^n = 1 + nx + \frac{n(n - 1)}{2!}x^2 + \frac{n(n - 1)(n - 2)}{3!}x^3 + \cdots$ (an infinite series).
- $(1 + bx)^n$ is valid for $|x| < \frac{1}{|b|}$; $(a + bx)^n = a^n\left(1 + \frac{b}{a}x\right)^n$, valid for $|x| < \left|\frac{a}{b}\right|$.
- Put brackets round every substitution; take $a^n$ outside first.
- Expand rational functions via partial fractions; the narrower range of validity applies.
- Approximate by substituting a small $x$ well inside the range.
:::
