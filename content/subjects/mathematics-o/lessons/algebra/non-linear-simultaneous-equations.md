---
{
  "key": "algebra.non-linear-simultaneous-equations",
  "title": "Simultaneous equations with one non-linear equation",
  "summary": "Solve a linear equation together with a quadratic equation (such as y = x² + 2x − 3, xy = 6 or x² + y² = 25) by substitution, and interpret the solutions as the points where a line meets a curve.",
  "concepts": ["math.algebra.non-linear-simultaneous-equations"],
  "objectives": ["cambridge/igcse/mathematics:2.5.4"],
  "estimatedMinutes": 30,
  "level": "extended"
}
---
## Introduction

A rectangular garden in Mutare has a perimeter of 46 m and an area of 120 m². If its length is $l$ and its width is $w$, then

$$
l + w = 23 \qquad lw = 120
$$

The first equation is linear, but the second contains the product $lw$, so it is **non-linear**. Elimination does not work here; instead we use **substitution**, which leads to a quadratic equation. Pairs like this usually have two solutions, and on a graph they are the points where a straight line crosses a curve.

This is Cambridge IGCSE **Extended** content. You need to be confident with substitution for linear simultaneous equations and with solving quadratic equations by factorising and by the formula.

## Key definitions

:::definition{term="Non-linear equation"}
An equation containing a square, a product of unknowns or a reciprocal, such as $y = x^2 - 2x - 3$, $xy = 12$, $x^2 + y^2 = 25$ or $y = \frac{3}{x}$.
:::

:::keyfact{title="The substitution method"}
1. Make one unknown the subject of the **linear** equation.
2. Substitute into the non-linear equation.
3. Rearrange to a quadratic equal to zero and solve it.
4. Substitute each root into the **linear** equation to find the other unknown.
5. Write the solutions as matching pairs.
:::

## Line and parabola

:::worked-solution[Example 1: solve $y = x^2 + x - 5$ and $y = 2x + 1$]
1. Both equal $y$, so $x^2 + x - 5 = 2x + 1$.
2. Rearrange: $x^2 - x - 6 = 0$.
3. Factorise: $(x - 3)(x + 2) = 0$, so $x = 3$ or $x = -2$.
4. Use $y = 2x + 1$: when $x = 3$, $y = 7$; when $x = -2$, $y = -3$.
5. Solutions: $(3, 7)$ and $(-2, -3)$.
:::

## Products and reciprocals

:::worked-solution[Example 2: the garden, $l + w = 23$ and $lw = 120$]
1. From the linear equation, $l = 23 - w$.
2. Substitute: $(23 - w)w = 120$, so $23w - w^2 = 120$.
3. Rearrange: $w^2 - 23w + 120 = 0$, so $(w - 8)(w - 15) = 0$.
4. $w = 8$ gives $l = 15$; $w = 15$ gives $l = 8$.
5. Both describe the same garden: it is 15 m long and 8 m wide.
:::

For a reciprocal such as $y = \frac{4}{x}$ with $y = x + 3$, multiply through by $x$ to clear the fraction: $4 = x^2 + 3x$, so $x^2 + 3x - 4 = 0$ and $(x + 4)(x - 1) = 0$, giving $(-4, -1)$ and $(1, 4)$.

## Equations with $x^2 + y^2$

:::worked-solution[Example 3: solve $x^2 + y^2 = 13$ and $x - y = 1$]
1. $x = y + 1$.
2. Substitute: $(y + 1)^2 + y^2 = 13$.
3. Expand carefully: $y^2 + 2y + 1 + y^2 = 13$, so $2y^2 + 2y - 12 = 0$.
4. Divide by 2: $y^2 + y - 6 = 0$, so $(y + 3)(y - 2) = 0$.
5. $y = 2$ gives $x = 3$; $y = -3$ gives $x = -2$. Solutions: $(3, 2)$ and $(-2, -3)$.
:::

## When the quadratic does not factorise

Use the quadratic formula and round only at the end.

:::worked-solution[Example 4: solve $y = x^2 - 2x - 1$ and $y = x + 1$ to 2 decimal places]
1. $x^2 - 2x - 1 = x + 1$, so $x^2 - 3x - 2 = 0$.
2. $x = \dfrac{3 \pm \sqrt{9 + 8}}{2} = \dfrac{3 \pm \sqrt{17}}{2}$.
3. $x = 3.5615\ldots$ or $x = -0.5615\ldots$.
4. $y = x + 1$: $y = 4.5615\ldots$ or $y = 0.4384\ldots$.
5. To 2 d.p.: $(3.56, 4.56)$ and $(-0.56, 0.44)$.
:::

## What the number of solutions tells you

The quadratic you form decides how many times the line meets the curve:

| Roots of the quadratic | Meaning on the graph |
| --- | --- |
| Two different roots | The line crosses the curve at two points |
| One repeated root | The line is a **tangent**: it touches the curve once |
| No real roots | The line and the curve do not meet |

For example, $y = x^2$ and $y = 4x - 4$ give $x^2 - 4x + 4 = (x - 2)^2 = 0$, so the line touches the curve only at $(2, 4)$.

## Common mistakes

:::mistake{title="Expanding a squared bracket wrongly"}
$(9 - x)^2 = 81 - 18x + x^2$, not $81 + x^2$ or $81 - x^2$. Write it as $(9 - x)(9 - x)$ if in doubt.
:::

:::mistake{title="Mismatching the pairs"}
Each $x$ goes with its own $y$. Writing “$x = 3$ or $-2$, $y = 7$ or $-3$” without pairing them loses marks. Write $(3, 7)$ and $(-2, -3)$.
:::

:::mistake{title="Using the non-linear equation to find the other value"}
Substituting $x = 3$ into $x^2 + y^2 = 13$ gives $y = \pm 2$, and $y = -2$ is not a solution of $x - y = 1$. Always use the linear equation.
:::

:::mistake{title="Losing a solution"}
$x^2 = 9$ has two solutions, $x = 3$ and $x = -3$: taking only the positive square root loses one. In the same way, dividing both sides of $x^2 = 5x$ by $x$ loses the solution $x = 0$.
:::

## Exam tips

:::exam-tip
These questions often start with “**show that** … $= 0$”. Show the substitution line and the expansion before the final equation; that is where the marks are.
:::

:::exam-tip
When answers must be given to a stated accuracy, keep the unrounded $x$ in your calculator to work out $y$, then round both.
:::

:::exam-tip
Check one solution pair in **both** original equations. It takes a moment and confirms the pairing.
:::

## Summary

:::summary
- Make one unknown the subject of the linear equation and substitute into the non-linear one.
- Solve the quadratic by factorising or by the formula.
- Find each matching value from the linear equation and write the answers as pairs.
- Two roots: two intersection points; a repeated root: a tangent; no real roots: no intersection.
:::
