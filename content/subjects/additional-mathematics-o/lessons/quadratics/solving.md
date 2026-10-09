---
{
  "key": "quadratics.solving",
  "title": "Solving quadratic equations",
  "summary": "Rearrange an equation into the form ax² + bx + c = 0, then solve it by factorising, by completing the square or with the quadratic formula, giving exact surd answers or answers to 3 significant figures, and form quadratic equations from problems.",
  "concepts": ["amath.quadratics.solving"],
  "estimatedMinutes": 35,
  "level": "core"
}
---
## Introduction

Quadratic equations appear everywhere in Additional Mathematics. You meet them when a line cuts a curve, when you look for the stationary points of a cubic, when you solve a trigonometric equation such as $2\sin^2 x - \sin x - 1 = 0$, and when a word problem about an area, a speed or a price leads to an $x^2$ term. If your quadratic technique is slow or careless, every one of those questions costs you marks.

You already know how to solve simple quadratics from O-Level Mathematics. This lesson makes the three methods fast and reliable, shows how to choose between them, and practises the step that most mistakes come from: getting the equation into the form $ax^2 + bx + c = 0$ in the first place.

## Key definitions

:::definition{term="Quadratic equation"}
An equation that can be written as $ax^2 + bx + c = 0$, where $a$, $b$ and $c$ are constants and $a \neq 0$. Its solutions are called its **roots**.
:::

:::definition{term="Zero-product rule"}
If $PQ = 0$ then $P = 0$ or $Q = 0$. This is why an equation must equal **zero** before you factorise it.
:::

:::formula{name="The quadratic formula (in Cambridge's List of formulas)"}
The roots of $ax^2 + bx + c = 0$ are

$$
x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}
$$
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards expect all three methods. Cambridge prints the quadratic formula in its List of formulas; ZIMSEC does not print a formula list in the syllabus, so learn it by heart. Cambridge Paper 1 has no calculator, so exact answers in surd form, such as $x = 2 \pm \sqrt{3}$, are common there.
:::

## Step 1: rearrange to $ax^2 + bx + c = 0$

Before you choose a method, collect every term on one side so that the other side is zero.

- Expand brackets and multiply out fractions first.
- Never divide both sides by an expression containing $x$: you lose a root. For $x^2 = 7x$, write $x^2 - 7x = 0$, so $x(x - 7) = 0$ and $x = 0$ or $x = 7$. Dividing by $x$ would give only $x = 7$.
- It is easiest to work with a positive $x^2$ coefficient, so multiply through by $-1$ if necessary.

## Method 1: factorising

Factorising is quickest when the roots are rational. For $ax^2 + bx + c$, look for two numbers that multiply to $ac$ and add to $b$, then split the middle term.

:::worked-solution[Example 1: solve $6x^2 - x - 15 = 0$]
1. $ac = 6 \times (-15) = -90$. Two numbers with product $-90$ and sum $-1$ are $-10$ and $9$.
2. Split the middle term: $6x^2 - 10x + 9x - 15 = 0$.
3. Group: $2x(3x - 5) + 3(3x - 5) = 0$, so $(2x + 3)(3x - 5) = 0$.
4. Zero-product rule: $2x + 3 = 0$ or $3x - 5 = 0$.
5. $x = -\frac{3}{2}$ or $x = \frac{5}{3}$.
:::

## Method 2: completing the square

Write $x^2 + bx$ as $\left(x + \frac{b}{2}\right)^2 - \left(\frac{b}{2}\right)^2$, then take square roots. Remember $\pm$: a positive number has two square roots.

:::worked-solution[Example 2: solve $x^2 - 8x + 13 = 0$, giving exact answers]
1. Half of $-8$ is $-4$, so $x^2 - 8x = (x - 4)^2 - 16$.
2. The equation becomes $(x - 4)^2 - 16 + 13 = 0$, that is $(x - 4)^2 = 3$.
3. Square root both sides: $x - 4 = \pm\sqrt{3}$.
4. $x = 4 + \sqrt{3}$ or $x = 4 - \sqrt{3}$ (about $5.73$ and $2.27$).
:::

Completing the square is also the method behind turning points and the range of a quadratic function; that is covered in the lesson on completing the square.

## Method 3: the quadratic formula

The formula works for every quadratic. Write down $a$, $b$ and $c$ with their signs, work out $b^2 - 4ac$ first, then simplify any surd.

:::worked-solution[Example 3: solve $2x^2 + 6x - 3 = 0$, giving exact answers and then answers to 3 significant figures]
1. $a = 2$, $b = 6$, $c = -3$.
2. $b^2 - 4ac = 36 - 4(2)(-3) = 36 + 24 = 60$.
3. $x = \dfrac{-6 \pm \sqrt{60}}{4}$. Since $\sqrt{60} = \sqrt{4 \times 15} = 2\sqrt{15}$, $x = \dfrac{-6 \pm 2\sqrt{15}}{4} = \dfrac{-3 \pm \sqrt{15}}{2}$.
4. With $\sqrt{15} = 3.8729\ldots$: $x = \dfrac{0.8729\ldots}{2} = 0.436$ or $x = \dfrac{-6.8729\ldots}{2} = -3.44$ (3 s.f.).
:::

Notice that in step 3 the factor 2 is cancelled from **every** term of the numerator and the denominator. A common error is to cancel it from only the $-6$.

## Equations that become quadratic

Many exam equations are not quadratic at first sight. Equations with $x$ in a denominator are the commonest kind: multiply every term by the common denominator, then rearrange.

:::worked-solution[Example 4: solve $\dfrac{4}{x} - \dfrac{3}{x + 2} = 1$, giving your answers to 3 significant figures]
1. Multiply every term by $x(x + 2)$: $4(x + 2) - 3x = x(x + 2)$.
2. Expand: $4x + 8 - 3x = x^2 + 2x$, so $x + 8 = x^2 + 2x$.
3. Rearrange: $x^2 + x - 8 = 0$, so $a = 1$, $b = 1$, $c = -8$ and $b^2 - 4ac = 1 + 32 = 33$.
4. $x = \dfrac{-1 \pm \sqrt{33}}{2}$, so $x = 2.37$ or $x = -3.37$ (3 s.f.).
5. Neither value makes a denominator zero ($x \neq 0$, $x \neq -2$), so both are valid.
:::

## Forming a quadratic from a problem

In a word problem, define the unknown with its unit, form the equation, solve it, then **interpret** the roots: a length, a time or a number of people cannot be negative, so one root is often rejected with a reason.

:::worked-solution[Example 5: a maize field near Chinhoyi]
A rectangular maize plot is 15 m longer than it is wide, and its area is $1750\ \text{m}^2$. Show that the width $w$ metres satisfies $w^2 + 15w - 1750 = 0$, and hence find the perimeter of the plot.

1. Length $= w + 15$, so the area is $w(w + 15) = 1750$.
2. Expand and rearrange: $w^2 + 15w - 1750 = 0$, as required.
3. Factorise: two numbers with product $-1750$ and sum $15$ are $50$ and $-35$, so $(w + 50)(w - 35) = 0$.
4. $w = 35$ or $w = -50$. A width cannot be negative, so $w = 35$.
5. The plot is 35 m by 50 m, so the perimeter is $2(35 + 50) = 170$ m.
:::

## Choosing a method

| Clue in the question | Best method |
| --- | --- |
| Small whole-number coefficients, "solve" with no accuracy stated | try factorising first |
| "Give your answers in the form $p \pm \sqrt{q}$" or "exact" | complete the square, or the formula then simplify the surd |
| "Give your answers to 3 significant figures" | the formula |
| Non-calculator paper and a surd answer | the formula, then simplify the surd by hand |

A quick way to see whether factorising will work: $b^2 - 4ac$ must be a perfect square (0, 1, 4, 9, 16, …). If it is not, go straight to the formula.

## Checking your answers

Substitute each root back into the **original** equation, not your rearranged one: this also catches mistakes made while rearranging. For a pair of roots of $x^2 + bx + c = 0$, their sum must be $-b$ and their product $c$, which is a fast mental check.

## Common mistakes

:::mistake{title="Dividing by x"}
From $3x^2 = 12x$, dividing by $x$ gives only $x = 4$. Factorise instead: $3x(x - 4) = 0$ gives $x = 0$ or $x = 4$.
:::

:::mistake{title="Factorising when the right-hand side is not zero"}
$(x - 2)(x + 1) = 4$ does **not** mean $x - 2 = 4$ or $x + 1 = 4$. Expand and rearrange to $x^2 - x - 6 = 0$ first.
:::

:::mistake{title="Sign errors in the formula"}
With $b = -5$, $-b = 5$ and $b^2 = 25$, never $-25$. Put negative values in brackets when you substitute.
:::

:::mistake{title="Forgetting the ± sign"}
$(x + 1)^2 = 9$ gives $x + 1 = 3$ **or** $x + 1 = -3$, so $x = 2$ or $x = -4$.
:::

:::mistake{title="Rounding too early"}
Keep the full calculator value of the square root until the last step, then round to 3 significant figures.
:::

## Exam tips

:::exam-tip
"Solve" means find every root and show the method. "Show that the equation can be written as …" means you must reach the printed equation exactly with every step shown; "hence" means use that equation in the next part.
:::

:::exam-tip
Give answers to 3 significant figures unless the question asks otherwise, and give exact answers (surds, fractions) when the question says "exact" or when you are on Cambridge Paper 1, where no calculator is allowed.
:::

:::exam-tip
In a problem, state clearly which root you reject and why ("$w = -50$ is impossible because a width is positive"). The mark scheme usually gives a mark for this.
:::

## Summary

:::summary
- Rearrange to $ax^2 + bx + c = 0$ first; never divide by an expression in $x$.
- Factorise when $b^2 - 4ac$ is a perfect square; use the zero-product rule.
- Complete the square or use $x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$ for any quadratic; simplify surds fully.
- Clear fractions by multiplying every term by the common denominator, and check no root makes a denominator zero.
- In problems, define the unknown, interpret both roots and reject impossible ones with a reason.
:::
