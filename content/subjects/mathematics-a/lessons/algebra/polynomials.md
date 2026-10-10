---
{
  "key": "algebra.polynomials",
  "title": "Polynomials: division, identities and the factor and remainder theorems",
  "summary": "Divide polynomials by linear and quadratic divisors, find unknown coefficients in identities, and use the remainder and factor theorems to factorise cubics and quartics and solve polynomial equations.",
  "concepts": ["amaths.algebra.polynomials"],
  "estimatedMinutes": 45,
  "level": "core"
}
---
## Introduction

Polynomials are the simplest functions in mathematics, and A-Level questions on them are a reliable source of marks. You need them to find roots of cubic equations, to split rational functions into partial fractions, to sketch curves and to check answers in calculus. An engineer modelling the shape of a dam wall at Kariba, or an economist fitting a cubic cost curve, uses exactly the skills in this lesson.

ZIMSEC Pure Mathematics (Form 5) examines adding, subtracting, multiplying and dividing polynomials, identities with unknown coefficients and the remainder and factor theorems. Cambridge 9709 examines the same content in Papers 2 and 3 (topic 2.1 / 3.1), with division by linear or quadratic divisors and polynomials up to degree 4. You should be able to expand brackets and solve quadratic equations.

## Key definitions

:::definition{term="Polynomial"}
An expression $a_{n}x^{n} + a_{n-1}x^{n-1} + \dots + a_{1}x + a_{0}$ in which every power of $x$ is a non-negative integer. Its **degree** is the highest power with a non-zero coefficient.
:::

:::definition{term="Identity"}
A statement that is true for **every** value of $x$, written with $\equiv$. For example $(x + 1)^{2} \equiv x^{2} + 2x + 1$. An **equation** such as $x^{2} = 2x + 3$ is true only for particular values.
:::

:::formula{name="Division statement"}
When $f(x)$ is divided by $d(x)$ there are a quotient $q(x)$ and a remainder $r(x)$, with the degree of $r$ less than the degree of $d$, such that

$$
f(x) \equiv d(x)\,q(x) + r(x)
$$
:::

:::formula{name="Remainder theorem"}
When $f(x)$ is divided by $(ax + b)$, the remainder is $f\left(-\dfrac{b}{a}\right)$. In particular, dividing by $(x - c)$ leaves remainder $f(c)$.
:::

:::formula{name="Factor theorem"}
$(ax + b)$ is a factor of $f(x)$ if and only if $f\left(-\dfrac{b}{a}\right) = 0$.
:::

None of these is printed in Cambridge's MF19 list: learn them.

## Polynomial long division

Long division of polynomials works just like long division of numbers: divide the leading terms, multiply back, subtract, bring down, repeat.

:::worked-solution[Example 1: divide $2x^{3} - 3x^{2} + 4x - 5$ by $x - 2$]
1. $2x^{3} \div x = 2x^{2}$. Multiply: $2x^{2}(x - 2) = 2x^{3} - 4x^{2}$. Subtract: $x^{2} + 4x$.
2. $x^{2} \div x = x$. Multiply: $x(x - 2) = x^{2} - 2x$. Subtract and bring down $-5$: $6x - 5$.
3. $6x \div x = 6$. Multiply: $6(x - 2) = 6x - 12$. Subtract: $7$.
4. Quotient $2x^{2} + x + 6$, remainder $7$, so $2x^{3} - 3x^{2} + 4x - 5 \equiv (x - 2)(2x^{2} + x + 6) + 7$.
5. Check with the remainder theorem: $f(2) = 16 - 12 + 8 - 5 = 7$.
:::

Write in a $0$ coefficient for any missing power before you start: $x^{3} - 2x + 1$ becomes $x^{3} + 0x^{2} - 2x + 1$. Otherwise the columns slip.

When the divisor is quadratic, the remainder can be linear, $px + q$.

:::worked-solution[Example 2: divide $x^{4} - 3x^{3} + 2x^{2} + 5x - 1$ by $x^{2} - x + 2$]
1. $x^{4} \div x^{2} = x^{2}$. Subtract $x^{2}(x^{2} - x + 2) = x^{4} - x^{3} + 2x^{2}$: this leaves $-2x^{3} + 0x^{2} + 5x - 1$.
2. $-2x^{3} \div x^{2} = -2x$. Subtract $-2x(x^{2} - x + 2) = -2x^{3} + 2x^{2} - 4x$: this leaves $-2x^{2} + 9x - 1$.
3. $-2x^{2} \div x^{2} = -2$. Subtract $-2(x^{2} - x + 2) = -2x^{2} + 2x - 4$: this leaves $7x + 3$.
4. Quotient $x^{2} - 2x - 2$, remainder $7x + 3$.
:::

## Identities and unknown coefficients

Because an identity holds for every $x$, you can find unknown constants in two ways:

- **substitute** convenient values of $x$ (ones that make brackets zero);
- **equate coefficients** of each power of $x$ on the two sides.

Often a mixture is quickest.

:::worked-solution[Example 3: find $A$, $B$ and $C$ such that $3x^{2} - 5x + 4 \equiv A(x - 1)^{2} + B(x - 1) + C$]
1. Put $x = 1$: $3 - 5 + 4 = C$, so $C = 2$.
2. Equate coefficients of $x^{2}$: $A = 3$.
3. Equate coefficients of $x$: the right side gives $-2A + B$, so $-5 = -6 + B$ and $B = 1$.
4. Check with $x = 0$: left side $4$; right side $3 - 1 + 2 = 4$.
:::

## The remainder and factor theorems

The remainder theorem follows straight from the division statement. If $f(x) \equiv (x - c)q(x) + R$, then putting $x = c$ makes the first term zero, so $f(c) = R$. The factor theorem is the special case $R = 0$.

To **factorise a cubic** with integer coefficients, try $f(\pm 1)$, $f(\pm 2)$, … using divisors of the constant term (and fractions $\frac{p}{q}$ where $q$ divides the leading coefficient). Once you find one factor, divide (or compare coefficients) to get the quadratic factor.

:::worked-solution[Example 4: an exam-style question with two unknowns]
The polynomial $p(x) = 2x^{3} + ax^{2} + bx - 6$ has a factor $(x + 2)$, and leaves remainder $-12$ when divided by $(x - 1)$.

(a) Find $a$ and $b$. (b) Hence solve $p(x) = 0$, giving the non-integer roots exactly.

1. $p(-2) = 0$: $-16 + 4a - 2b - 6 = 0$, so $2a - b = 11$.
2. $p(1) = -12$: $2 + a + b - 6 = -12$, so $a + b = -8$.
3. Add: $3a = 3$, so $a = 1$ and $b = -9$. So $p(x) = 2x^{3} + x^{2} - 9x - 6$.
4. (b) Divide by $(x + 2)$: $p(x) = (x + 2)(2x^{2} - 3x - 3)$.
5. $2x^{2} - 3x - 3 = 0$ gives $x = \dfrac{3 \pm \sqrt{9 + 24}}{4} = \dfrac{3 \pm \sqrt{33}}{4}$.
6. Roots: $x = -2$, $x = \dfrac{3 + \sqrt{33}}{4}$, $x = \dfrac{3 - \sqrt{33}}{4}$.
:::

:::worked-solution[Example 5: show that $(x - 3)$ is a factor of $f(x) = x^{4} - x^{3} - 7x^{2} + x + 6$ and factorise $f(x)$ completely]
1. $f(3) = 81 - 27 - 63 + 3 + 6 = 0$, so $(x - 3)$ is a factor by the factor theorem.
2. Divide: $f(x) = (x - 3)(x^{3} + 2x^{2} - x - 2)$.
3. For the cubic $g(x) = x^{3} + 2x^{2} - x - 2$: $g(1) = 1 + 2 - 1 - 2 = 0$, so $(x - 1)$ is a factor.
4. Group: $g(x) = x^{2}(x + 2) - (x + 2) = (x + 2)(x^{2} - 1) = (x + 2)(x - 1)(x + 1)$.
5. So $f(x) = (x - 3)(x + 2)(x - 1)(x + 1)$.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards examine this content. Cambridge places it in Papers 2 and 3 and limits division to polynomials of degree at most 4 by linear or quadratic divisors. ZIMSEC asks you to "derive" the remainder and factor theorems, so be ready to explain them from the division statement as above.
:::

## Common mistakes

:::mistake{title="Wrong sign in the remainder theorem"}
Dividing by $(x + 3)$ means substituting $x = -3$, not $x = 3$. For $(2x - 1)$ substitute $x = \frac{1}{2}$.
:::

:::mistake{title="Missing zero coefficients"}
In $x^{3} - 7x + 6$ there is no $x^{2}$ term. Write $x^{3} + 0x^{2} - 7x + 6$ before long division.
:::

:::mistake{title="Subtracting only the first term"}
When you subtract the product in long division, change the sign of **every** term: $(x^{2} + 4x) - (x^{2} - 2x) = 6x$, not $2x$.
:::

:::mistake{title="Confusing remainder and factor conditions"}
"Leaves remainder 5 when divided by $(x - 2)$" gives $f(2) = 5$, not $f(2) = 0$.
:::

## Exam tips

:::exam-tip
"Show that $(x - 3)$ is a factor" needs the substitution written out, $f(3) = 81 - 27 - 63 + 3 + 6 = 0$, and a conclusion that names the factor theorem.
:::

:::exam-tip
"Hence" means use the factor you have just found: divide by it rather than starting again. Give irrational roots exactly unless the question asks for decimals.
:::

:::exam-tip
After long division, check the remainder with the remainder theorem. It takes ten seconds and catches most sign errors.
:::

## Summary

:::summary
- $f(x) \equiv d(x)q(x) + r(x)$, with the degree of $r$ less than that of $d$; write missing powers as $0$.
- Identities hold for all $x$: substitute convenient values or equate coefficients.
- Remainder on division by $(ax + b)$ is $f\left(-\frac{b}{a}\right)$; it is a factor exactly when this is $0$.
- Factorise cubics by finding one root by trial, then dividing to leave a quadratic.
- Conditions on remainders and factors give simultaneous equations for unknown coefficients.
:::
