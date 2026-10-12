---
{
  "key": "complex.cartesian",
  "title": "Complex numbers in Cartesian form",
  "summary": "Meet the imaginary unit i, write complex numbers as x + iy, find real and imaginary parts and conjugates, add, subtract, multiply and divide with full working, solve quadratics with complex roots and find the square roots of a complex number.",
  "concepts": ["amaths.complex.cartesian"],
  "estimatedMinutes": 45,
  "freePreview": true,
  "level": "core"
}
---
## Introduction

The equation $x^2 + 1 = 0$ has no real solution, because no real number squares to give $-1$. Mathematicians removed the obstacle by inventing a number $\mathrm{i}$ with $\mathrm{i}^2 = -1$. Numbers built from it, such as $3 + 2\mathrm{i}$, are called complex numbers. They are not a curiosity: electrical engineers at ZESA describe alternating currents with them, and they make every quadratic equation solvable.

This lesson covers the Cartesian form $x + \mathrm{i}y$ and the arithmetic you will use in every later complex-numbers lesson. ZIMSEC examines it in Pure Mathematics (Form 5, topic 6.7); Cambridge examines it in Paper 3 (A Level only, topic 3.9), usually as the first part of a longer complex-numbers question.

## Key definitions

:::definition{term="Imaginary unit"}
The number $\mathrm{i}$ with $\mathrm{i}^2 = -1$. So $\sqrt{-16} = 4\mathrm{i}$ and $\sqrt{-7} = \mathrm{i}\sqrt{7}$.
:::

:::definition{term="Complex number"}
A number $z = x + \mathrm{i}y$, where $x$ and $y$ are real. $x$ is the **real part**, $\mathrm{Re}(z)$, and $y$ is the **imaginary part**, $\mathrm{Im}(z)$. Note that the imaginary part is the real number $y$, not $\mathrm{i}y$.
:::

:::definition{term="Complex conjugate"}
The conjugate of $z = x + \mathrm{i}y$ is $z^{*} = x - \mathrm{i}y$ (some books write $\bar{z}$). Changing the sign of the imaginary part reflects the number in the real axis.
:::

:::formula{name="Product of a number and its conjugate"}
$$
z z^{*} = (x + \mathrm{i}y)(x - \mathrm{i}y) = x^2 + y^2
$$
:::

This is always real and never negative. It is the key to division. MF19 does not list it; you are expected to know it.

:::definition{term="Equality of complex numbers"}
$a + \mathrm{i}b = c + \mathrm{i}d$ (with $a, b, c, d$ real) if and only if $a = c$ **and** $b = d$. One complex equation therefore gives two real equations.
:::

## Adding, subtracting and multiplying

Treat $\mathrm{i}$ like an algebraic letter, collect real and imaginary parts, and replace $\mathrm{i}^2$ by $-1$ whenever it appears. Powers of $\mathrm{i}$ cycle with period 4: $\mathrm{i}^2 = -1$, $\mathrm{i}^3 = -\mathrm{i}$, $\mathrm{i}^4 = 1$, then $\mathrm{i}^5 = \mathrm{i}$ again.

:::worked-solution[Example 1: given $z = 2 - 3\mathrm{i}$ and $w = 1 + 4\mathrm{i}$, find $z + w$, $z - w$ and $zw$]
1. $z + w = (2 + 1) + (-3 + 4)\mathrm{i} = 3 + \mathrm{i}$.
2. $z - w = (2 - 1) + (-3 - 4)\mathrm{i} = 1 - 7\mathrm{i}$.
3. $zw = (2 - 3\mathrm{i})(1 + 4\mathrm{i}) = 2 + 8\mathrm{i} - 3\mathrm{i} - 12\mathrm{i}^2$.
4. Replace $\mathrm{i}^2$ by $-1$: $zw = 2 + 5\mathrm{i} + 12 = 14 + 5\mathrm{i}$.
:::

![Argand diagram showing z = 2 - 3i, w = 1 + 4i and their sum z + w = 3 + i: the sum is the fourth vertex of the parallelogram formed by the arrows from the origin to z and to w, so real parts add (2 + 1 = 3) and imaginary parts add (-3 + 4 = 1).](media:diagrams/argand-sum-of-two-numbers.png "Figure: adding complex numbers is vector addition on the Argand diagram")

## Dividing

To divide, multiply the numerator and the denominator by the conjugate of the denominator. The denominator becomes the real number $x^2 + y^2$, and you can split the answer into real and imaginary parts.

:::worked-solution[Example 2: with $z$ and $w$ as in Example 1, find $\dfrac{z}{w}$ in the form $x + \mathrm{i}y$]
1. Multiply top and bottom by $w^{*} = 1 - 4\mathrm{i}$: $\dfrac{(2 - 3\mathrm{i})(1 - 4\mathrm{i})}{(1 + 4\mathrm{i})(1 - 4\mathrm{i})}$.
2. Denominator: $1^2 + 4^2 = 17$.
3. Numerator: $2 - 8\mathrm{i} - 3\mathrm{i} + 12\mathrm{i}^2 = 2 - 11\mathrm{i} - 12 = -10 - 11\mathrm{i}$.
4. So $\dfrac{z}{w} = -\dfrac{10}{17} - \dfrac{11}{17}\mathrm{i}$.
:::

Leave the answer as exact fractions unless the question asks for decimals.

## Quadratic equations with complex roots

When the discriminant $b^2 - 4ac$ is negative, the quadratic formula still works: the square root of a negative number is imaginary. The two roots are then conjugates of each other, $p \pm \mathrm{i}q$.

:::worked-solution[Example 3: solve $z^2 - 6z + 13 = 0$]
1. Discriminant: $(-6)^2 - 4(1)(13) = 36 - 52 = -16$.
2. $\sqrt{-16} = 4\mathrm{i}$.
3. $z = \dfrac{6 \pm 4\mathrm{i}}{2} = 3 \pm 2\mathrm{i}$.
4. Check $z = 3 + 2\mathrm{i}$: $z^2 = 9 + 12\mathrm{i} - 4 = 5 + 12\mathrm{i}$, and $5 + 12\mathrm{i} - 18 - 12\mathrm{i} + 13 = 0$.
:::

![Argand diagram of the roots 3 + 2i and 3 - 2i of z^2 - 6z + 13 = 0: they are mirror images of each other in the real axis, so complex roots of a real quadratic form a conjugate pair with the same real part 3.](media:diagrams/argand-conjugate-roots.png "Figure: the roots 3 ± 2i are reflections of each other in the real axis")

Completing the square gives the same result: $(z - 3)^2 = -4$, so $z - 3 = \pm 2\mathrm{i}$.

## Using equality: square roots of a complex number

To find $\sqrt{a + \mathrm{i}b}$, let the root be $x + \mathrm{i}y$ with $x$ and $y$ real, square it, and equate real and imaginary parts. You get two equations: $x^2 - y^2 = a$ and $2xy = b$. Substitute $y = \frac{b}{2x}$ into the first to get a quadratic in $x^2$; reject the negative value of $x^2$ because $x$ is real.

:::worked-solution[Example 4: find the square roots of $5 + 12\mathrm{i}$]
1. Let $(x + \mathrm{i}y)^2 = 5 + 12\mathrm{i}$, so $x^2 - y^2 + 2xy\mathrm{i} = 5 + 12\mathrm{i}$.
2. Real parts: $x^2 - y^2 = 5$. Imaginary parts: $2xy = 12$, so $y = \dfrac{6}{x}$.
3. Substitute: $x^2 - \dfrac{36}{x^2} = 5$, so $x^4 - 5x^2 - 36 = 0$.
4. Factorise: $(x^2 - 9)(x^2 + 4) = 0$. Since $x$ is real, $x^2 = 9$, so $x = 3$ or $x = -3$.
5. $y = \dfrac{6}{x}$ gives $y = 2$ or $y = -2$.
6. The square roots are $3 + 2\mathrm{i}$ and $-3 - 2\mathrm{i}$, that is $\pm(3 + 2\mathrm{i})$.
:::

A quick check: the two square roots are always negatives of each other, and $(3 + 2\mathrm{i})^2 = 9 + 12\mathrm{i} - 4 = 5 + 12\mathrm{i}$.

The same method of equating parts solves equations such as $(a + \mathrm{i}b)(2 - \mathrm{i}) = 7 + 4\mathrm{i}$: expanding gives $2a + b = 7$ and $2b - a = 4$, so $a = 2$ and $b = 3$. (Dividing $7 + 4\mathrm{i}$ by $2 - \mathrm{i}$ gives the same answer.)

## A typical exam question

:::worked-solution[Example 5: the complex number $u = 3 + \mathrm{i}$. (a) Show that $u^2 = 8 + 6\mathrm{i}$. (b) Hence find the real numbers $p$ and $q$ such that $u^2 + pu + q = 0$.]
1. (a) $u^2 = (3 + \mathrm{i})^2 = 9 + 6\mathrm{i} + \mathrm{i}^2 = 9 + 6\mathrm{i} - 1 = 8 + 6\mathrm{i}$, as required.
2. (b) $u^2 + pu + q = 8 + 6\mathrm{i} + 3p + p\mathrm{i} + q$.
3. Real part: $8 + 3p + q = 0$. Imaginary part: $6 + p = 0$.
4. So $p = -6$, and $q = -8 - 3p = -8 + 18 = 10$.
5. Check: $u$ is a root of $z^2 - 6z + 10 = 0$, whose roots are $3 \pm \mathrm{i}$.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards examine the same Cartesian arithmetic. Cambridge (Paper 3, A Level only) asks for answers "in the form $x + \mathrm{i}y$, where $x$ and $y$ are real" and expects full working without a calculator's complex mode. ZIMSEC (Form 5) uses the same notation and may write $\bar{z}$ for the conjugate.
:::

## Common mistakes

:::mistake{title="Forgetting that i² = −1"}
$(2 - 3\mathrm{i})(1 + 4\mathrm{i})$ contains $-12\mathrm{i}^2$, which is $+12$, not $-12$.
:::

:::mistake{title="Giving the imaginary part as 4i"}
For $z = 3 + 4\mathrm{i}$, $\mathrm{Im}(z) = 4$, a real number.
:::

:::mistake{title="Dividing the parts separately"}
$\dfrac{2 - 3\mathrm{i}}{1 + 4\mathrm{i}}$ is **not** $\dfrac{2}{1} - \dfrac{3}{4}$. Multiply by the conjugate of the denominator.
:::

:::mistake{title="Keeping the negative value of x²"}
In square-root questions $x$ and $y$ are real, so $x^2 = -4$ is rejected.
:::

## Exam tips

:::exam-tip
"Show all necessary working" means each multiplication and the conjugate step must be visible: a calculator in complex mode earns no method marks.
:::

:::exam-tip
After finding square roots, square one of them to check: it takes ten seconds and catches sign errors.
:::

:::exam-tip
When a question says "hence", use the result you have just shown (here $u^2 = 8 + 6\mathrm{i}$) rather than starting again.
:::

## Summary

:::summary
- $\mathrm{i}^2 = -1$; a complex number is $z = x + \mathrm{i}y$ with real part $x$ and imaginary part $y$.
- The conjugate is $z^{*} = x - \mathrm{i}y$ and $zz^{*} = x^2 + y^2$.
- Add, subtract and multiply like algebra, replacing $\mathrm{i}^2$ by $-1$.
- Divide by multiplying top and bottom by the conjugate of the denominator.
- Quadratics with negative discriminant have conjugate roots $p \pm \mathrm{i}q$.
- Equal complex numbers have equal real parts and equal imaginary parts: use this for square roots.
:::
