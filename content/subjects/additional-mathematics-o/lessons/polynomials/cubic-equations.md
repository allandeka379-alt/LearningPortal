---
{
  "key": "polynomials.cubic-equations",
  "title": "Factorising cubics and solving cubic equations",
  "summary": "Find a first linear factor of a cubic with the factor theorem, find the quadratic factor by division, comparing coefficients or inspection, factorise completely and solve cubic equations, including roots in surd form.",
  "concepts": ["amath.polynomials.cubic-equations"],
  "estimatedMinutes": 40,
  "level": "core"
}
---
## Introduction

A rectangular sheet of metal has equal squares cut from its corners and is folded into an open box for a water trough. For which cut sizes does the box hold a given volume? The answer comes from a **cubic equation**. Cubics also appear when you find stationary points, intersections of curves and lines, and volumes in calculus.

There is a formula for cubics, but nobody uses it at this level. Instead you **find one root by trial**, use it to split off a linear factor, and solve the quadratic that is left. Both ZIMSEC and Cambridge 0606 set this as a standard multi-part question, usually beginning "show that $x = a$ is a root" or "find the value of $k$".

You need the factor theorem, long division by $x - a$, factorising quadratics and the quadratic formula.

## Key definitions

:::definition{term="Cubic equation"}
An equation that can be written $ax^{3} + bx^{2} + cx + d = 0$ with $a \neq 0$. It has at least one and at most three real roots.
:::

:::definition{term="Factorise completely"}
Write a polynomial as a product of factors that cannot be factorised further over the integers, for example $(x - 1)(x - 3)(x + 2)$. A quadratic factor with a negative discriminant, such as $x^{2} + 4$, is already complete.
:::

:::definition{term="Repeated root"}
A root that comes from a repeated factor. In $(x - 2)^{2}(x + 1) = 0$, $x = 2$ is a repeated root, so the equation has only two different roots.
:::

## Step 1: find a first factor by trial

If the cubic has integer coefficients and leading coefficient 1, any integer root must **divide the constant term**. So for $x^{3} - 2x^{2} - 5x + 6$, try $x = \pm 1, \pm 2, \pm 3, \pm 6$. When the leading coefficient is $a$, roots such as $\frac{1}{2}$ or $-\frac{3}{2}$ are also possible: try $\pm\frac{\text{factor of } d}{\text{factor of } a}$.

Start with the easy values $1$ and $-1$. A quick check: $f(1)$ is just the sum of the coefficients.

## Step 2: find the quadratic factor

Once $f(a) = 0$, divide $f(x)$ by $x - a$. There are three ways; use the one you are most accurate with.

- **Long division**, as in the previous lessons.
- **Comparing coefficients**: write $f(x) \equiv (x - a)\left(px^{2} + qx + r\right)$ and match terms.
- **Inspection**: the first term $p$ comes from the $x^{3}$ term and the last term $r$ from the constant; find $q$ from one middle coefficient and check with the other.

## Step 3: solve the quadratic

Factorise the quadratic if you can. If not, use the quadratic formula: the roots will be surds. If the discriminant is negative, the quadratic gives no real roots and the cubic has only the root(s) you already have.

:::worked-solution[Example 1: factorise $x^{3} - 2x^{2} - 5x + 6$ completely]
1. Try $x = 1$: $f(1) = 1 - 2 - 5 + 6 = 0$, so $x - 1$ is a factor.
2. Divide: $x^{3} - 2x^{2} - 5x + 6 = (x - 1)\left(x^{2} - x - 6\right)$.
3. Factorise the quadratic: $x^{2} - x - 6 = (x - 3)(x + 2)$.
4. So $x^{3} - 2x^{2} - 5x + 6 = (x - 1)(x - 3)(x + 2)$.
:::

:::worked-solution[Example 2: solve $2x^{3} + 3x^{2} - 11x - 6 = 0$]
1. Try integer factors of 6: $f(1) = -12$, $f(-1) = 6$, $f(2) = 16 + 12 - 22 - 6 = 0$. So $x - 2$ is a factor.
2. Inspection: $2x^{3} + 3x^{2} - 11x - 6 = (x - 2)\left(2x^{2} + qx + 3\right)$, because $2x^{2} \times x$ gives $2x^{3}$ and $3 \times (-2)$ gives $-6$.
3. The $x^{2}$ terms: $q - 4 = 3$, so $q = 7$. Check the $x$ terms: $3 - 2q = 3 - 14 = -11$. ✓
4. $2x^{2} + 7x + 3 = (2x + 1)(x + 3)$.
5. $x = 2$, $x = -\frac{1}{2}$ or $x = -3$.
:::

:::worked-solution[Example 3: solve $x^{3} - 3x^{2} - 2x + 4 = 0$, giving exact answers]
1. $f(1) = 1 - 3 - 2 + 4 = 0$, so $x - 1$ is a factor.
2. Divide: the quotient is $x^{2} - 2x - 4$.
3. This does not factorise, so use the formula: $x = \dfrac{2 \pm \sqrt{4 + 16}}{2} = \dfrac{2 \pm 2\sqrt{5}}{2} = 1 \pm \sqrt{5}$.
4. The roots are $x = 1$, $x = 1 + \sqrt{5}$ and $x = 1 - \sqrt{5}$.
:::

![Graph of y = x^3 - 3x^2 - 2x + 4 crossing the x-axis at x = 1 and at the surd roots 1 - sqrt 5 (about -1.24) and 1 + sqrt 5 (about 3.24) from the quadratic factor, and the y-axis at 4.](media:diagrams/cubic-surd-roots-graph.png "Figure: the three roots of the cubic: x = 1 and the surd roots 1 ± √5")

## Comparing coefficients

This method is neat when one factor is given and you want the other directly.

:::worked-solution[Example 4: given $x^{3} + 4x^{2} + x - 6 \equiv (x + 2)\left(x^{2} + bx + c\right)$, find $b$ and $c$ and factorise completely]
1. Constant terms: $2c = -6$, so $c = -3$.
2. $x^{2}$ terms: $b + 2 = 4$, so $b = 2$.
3. Check with the $x$ terms: $c + 2b = -3 + 4 = 1$. ✓
4. $x^{2} + 2x - 3 = (x + 3)(x - 1)$, so the cubic is $(x + 2)(x + 3)(x - 1)$.
:::

## A typical exam question

:::worked-solution[Example 5: show that $x = 3$ is a root of $x^{3} - 7x - 6 = 0$ and hence solve the equation]
1. $f(3) = 27 - 21 - 6 = 0$, so $x = 3$ is a root and $x - 3$ is a factor.
2. Divide $x^{3} + 0x^{2} - 7x - 6$ by $x - 3$: the quotient is $x^{2} + 3x + 2$.
3. $x^{2} + 3x + 2 = (x + 1)(x + 2)$.
4. The solutions are $x = 3$, $x = -1$ and $x = -2$.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards expect this method. Cambridge 0606 often asks for exact surd roots on the non-calculator paper and links cubics to sketching $y = f(x)$ (see the cubic graphs lesson); ZIMSEC sets the same skill in Paper 1 with "show that … hence solve".
:::

## Common mistakes

:::mistake{title="Stopping at one factor"}
"Factorise completely" means factorise the quadratic too. $(x - 1)\left(x^{2} - x - 6\right)$ is not complete.
:::

:::mistake{title="Trying values that cannot work"}
For $x^{3} + 2x^{2} - 5x - 6$, $x = 4$ cannot be a root because 4 does not divide 6. Save time by trying only divisors of the constant term (and fractions when the leading coefficient is not 1).
:::

:::mistake{title="Losing a root when the quadratic does not factorise"}
If the quadratic factor has a positive discriminant but does not factorise, use the formula: there are still two more roots.
:::

:::mistake{title="Sign errors linking roots and factors"}
A root $x = -3$ gives the factor $x + 3$, and a factor $2x - 1$ gives the root $x = \frac{1}{2}$.
:::

## Exam tips

:::exam-tip
"**Show that** $x = a$ is a root" needs the substitution written out and a conclusion. Then "**hence**" means divide by $x - a$: do not start again by trial.
:::

:::exam-tip
Check the quadratic factor by expanding it with the linear factor before you solve it. A wrong quotient costs every later mark.
:::

:::exam-tip
Read the required form: "exact" means surds; "to 3 significant figures" means use the formula and round at the end.
:::

## Summary

:::summary
- Find a root by trying divisors of the constant term (over divisors of the leading coefficient).
- Divide by the factor (long division, comparing coefficients or inspection) to get a quadratic.
- Factorise the quadratic or use the formula; a negative discriminant means no further real roots.
- A cubic has one, two (with a repeated root) or three different real roots.
- Root $x = a \Leftrightarrow$ factor $x - a$; root $\frac{b}{a} \Leftrightarrow$ factor $ax - b$.
:::
