---
{
  "key": "algebra.simultaneous-equations",
  "title": "Simultaneous equations: one linear, one non-linear",
  "summary": "Solve a linear equation together with a quadratic or other non-linear equation by substitution, pair the solutions correctly, and interpret them as the points where a line meets a curve.",
  "concepts": ["amath.algebra.simultaneous-equations"],
  "estimatedMinutes": 35,
  "level": "core"
}
---
## Introduction

Where does a straight irrigation pipe cross a curved boundary of a field? Where does the path of a ball meet a sloping hillside? Questions like these lead to a pair of equations: one **linear** (a straight line) and one **non-linear** (a curve such as $y = x^{2} - 4x + 5$, a circle $x^{2} + y^{2} = 13$ or a hyperbola $xy = 3$).

Both ZIMSEC and Cambridge 0606 set this every year, often as the first step of a longer coordinate geometry question ("the line meets the curve at $A$ and $B$; find the length $AB$"). The method is always the same, and the marks are lost mainly through algebra slips and wrongly paired answers.

Before you start, you should be able to solve two **linear** simultaneous equations and solve quadratic equations by factorising or by the formula.

## Key definitions

:::definition{term="Simultaneous equations"}
Two (or more) equations that must be satisfied by the **same** values of the unknowns at the same time.
:::

:::definition{term="Solution pair"}
A pair of values $(x, y)$ that satisfies both equations. Each solution is a point where the two graphs meet.
:::

:::keyfact{title="Number of solutions"}
Substituting the line into the curve gives a quadratic. Two different real roots: the line **crosses** the curve at two points. One repeated root: the line **touches** the curve (it is a tangent). No real roots: the line and curve **do not meet**.
:::

## The substitution method

1. **Rearrange the linear equation** to make $x$ or $y$ the subject. Choose the one that avoids fractions.
2. **Substitute** into the non-linear equation, using brackets.
3. **Expand and simplify** to a quadratic equal to zero.
4. **Solve** the quadratic.
5. **Substitute each value back into the linear equation** to find the matching value of the other unknown.
6. **Pair** the answers and check one pair in the non-linear equation.

Always substitute back into the **linear** equation. Substituting into the quadratic one can produce extra values that do not satisfy both.

:::worked-solution[Example 1: solve $y = 2x - 1$ and $x^{2} + y^{2} = 13$]
1. The linear equation already gives $y$.
2. Substitute: $x^{2} + (2x - 1)^{2} = 13$.
3. Expand: $x^{2} + 4x^{2} - 4x + 1 = 13$, so $5x^{2} - 4x - 12 = 0$.
4. Factorise: $(5x + 6)(x - 2) = 0$, so $x = 2$ or $x = -\frac{6}{5}$.
5. $x = 2$: $y = 2(2) - 1 = 3$. $x = -\frac{6}{5}$: $y = -\frac{12}{5} - 1 = -\frac{17}{5}$.
6. Solutions: $x = 2, y = 3$ and $x = -\frac{6}{5}, y = -\frac{17}{5}$. Check the first: $4 + 9 = 13$. ✓
:::

:::worked-solution[Example 2: solve $x - 2y = 1$ and $xy = 3$]
1. Make $x$ the subject (no fractions): $x = 1 + 2y$.
2. Substitute: $(1 + 2y)y = 3$, so $2y^{2} + y - 3 = 0$.
3. Factorise: $(2y + 3)(y - 1) = 0$, so $y = 1$ or $y = -\frac{3}{2}$.
4. $y = 1$: $x = 3$. $y = -\frac{3}{2}$: $x = 1 - 3 = -2$.
5. Solutions: $(3, 1)$ and $\left(-2, -\frac{3}{2}\right)$. Check: $3 \times 1 = 3$ and $(-2)\left(-\frac{3}{2}\right) = 3$. ✓
:::

## Lines meeting curves

Each solution pair is a point of intersection. A common exam follow-up asks for the distance between the two points or the midpoint.

:::worked-solution[Example 3: the line $y = 2x - 3$ meets the curve $y = x^{2} - 4x + 5$ at $A$ and $B$. Find the coordinates of $A$ and $B$ and the exact length $AB$]
1. At the intersections the $y$ values are equal: $x^{2} - 4x + 5 = 2x - 3$.
2. Rearrange: $x^{2} - 6x + 8 = 0$, so $(x - 2)(x - 4) = 0$.
3. $x = 2$: $y = 1$. $x = 4$: $y = 5$. So $A(2, 1)$ and $B(4, 5)$.
4. $AB = \sqrt{(4 - 2)^{2} + (5 - 1)^{2}} = \sqrt{4 + 16} = \sqrt{20} = 2\sqrt{5}$.
:::

## Equations with fractions or products

Some non-linear equations involve $\frac{x}{y}$ or products like $xy$. Clear the fractions first by multiplying through.

:::worked-solution[Example 4: solve $x + y = 6$ and $\dfrac{x}{y} + \dfrac{2y}{x} = 3$]
1. Multiply the second equation by $xy$: $x^{2} + 2y^{2} = 3xy$.
2. Rearrange and factorise: $x^{2} - 3xy + 2y^{2} = 0$, so $(x - y)(x - 2y) = 0$.
3. Case $x = y$: with $x + y = 6$, $x = 3$, $y = 3$.
4. Case $x = 2y$: $3y = 6$, so $y = 2$, $x = 4$.
5. Solutions: $(3, 3)$ and $(4, 2)$. Neither makes $x$ or $y$ zero, so both are valid.
:::

## When the line misses the curve

:::worked-solution[Example 5: show that the line $x + y = 4$ does not meet the circle $x^{2} + y^{2} = 4$]
1. Substitute $y = 4 - x$: $x^{2} + (4 - x)^{2} = 4$.
2. Expand: $2x^{2} - 8x + 16 = 4$, so $2x^{2} - 8x + 12 = 0$.
3. Discriminant: $(-8)^{2} - 4(2)(12) = 64 - 96 = -32 < 0$.
4. There are no real solutions, so the line does not meet the circle.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards examine one linear and one non-linear equation. Cambridge 0606 often continues with lengths, midpoints or perpendicular bisectors of the chord, and may require exact (surd) answers on the non-calculator paper.
:::

## Common mistakes

:::mistake{title="Mixing up the pairs"}
Writing "$x = 2$ or $-\frac{6}{5}$, $y = 3$ or $-\frac{17}{5}$" does not say which $y$ goes with which $x$. Present the answers as pairs or coordinates.
:::

:::mistake{title="Squaring a bracket wrongly"}
$(2x - 1)^{2} = 4x^{2} - 4x + 1$, not $4x^{2} + 1$ or $2x^{2} - 1$.
:::

:::mistake{title="Substituting back into the curve"}
Using the curve to find $y$ can give extra values (for example two values of $y$ from $y^{2} = 9$). Use the linear equation.
:::

## Exam tips

:::exam-tip
"**Solve the simultaneous equations**" needs all solution pairs. Finding only one pair usually loses at least two marks.
:::

:::exam-tip
Choose the subject that keeps the algebra simple: from $x - 2y = 1$ take $x = 1 + 2y$, not $y = \frac{x - 1}{2}$.
:::

:::exam-tip
In a "**show that** the line is a tangent" or "does not meet" question, finish with the discriminant and a sentence of conclusion.
:::

## Summary

:::summary
- Make one unknown the subject of the linear equation and substitute into the non-linear one.
- Simplify to a quadratic, solve it, then use the linear equation to find the partner values.
- Present solutions as pairs or coordinates.
- Each solution pair is an intersection point of the line and the curve.
- Discriminant of the quadratic: positive, two points; zero, a tangent; negative, no meeting.
:::
