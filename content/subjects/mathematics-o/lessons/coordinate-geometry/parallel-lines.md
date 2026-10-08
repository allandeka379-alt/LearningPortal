---
{
  "key": "coordinate.parallel-lines",
  "title": "Parallel lines and their equations",
  "summary": "Parallel lines have equal gradients: recognise parallel lines from their equations, find the equation of a line parallel to a given line through a given point, and use gradients to identify parallelograms and trapezia.",
  "concepts": ["math.coordinate.parallel-lines"],
  "objectives": ["zimsec/o-level/mathematics:5.1.2", "cambridge/igcse/mathematics:3.6.1"],
  "estimatedMinutes": 25,
  "level": "core"
}
---
## Introduction

On a commercial farm near Chinhoyi, maize is planted in long straight rows the same distance apart. The rows never meet, however far they run: they are **parallel**. The two rails of the line from Bulawayo to Victoria Falls are parallel for the same reason.

On a coordinate grid, parallel lines rise or fall at exactly the same rate. That means they have the **same gradient**. This simple fact lets you spot parallel lines from their equations, write down the equation of a line parallel to another, and prove that shapes such as parallelograms have parallel sides.

You should already be able to find a gradient and use $y = mx + c$.

## Key definitions

:::definition{term="Parallel lines"}
Lines in the same plane that never meet. They are always the same distance apart and point in the same direction.
:::

:::keyfact{title="The parallel lines rule"}
Two non-vertical lines are parallel exactly when their gradients are equal: $m_1 = m_2$.

If they also have the same $y$-intercept, they are the **same** line, not two parallel lines.
:::

:::keyfact{title="Special cases"}
All horizontal lines ($y = b$) are parallel to each other and to the $x$-axis. All vertical lines ($x = a$) are parallel to each other and to the $y$-axis.
:::

## Recognising parallel lines

To compare gradients, write every equation in the form $y = mx + c$ first.

:::worked-solution[Example 1: which lines are parallel to $y = 3x + 1$?]
Test $y = 3x - 4$, $2y = 6x + 5$, $6x - 2y = 7$ and $y = 1 - 3x$.
1. $y = 3x - 4$: gradient $3$. Parallel.
2. $2y = 6x + 5$ becomes $y = 3x + 2.5$: gradient $3$. Parallel.
3. $6x - 2y = 7$ becomes $2y = 6x - 7$, so $y = 3x - 3.5$: gradient $3$. Parallel.
4. $y = 1 - 3x$ is $y = -3x + 1$: gradient $-3$. **Not** parallel; it slopes the other way.
:::

## The equation of a parallel line

A line parallel to $y = mx + c$ has the same $m$ but (usually) a different $c$. Use the given point to find the new $c$.

:::worked-solution[Example 2: parallel to $y = 2x - 7$ through $(3, 1)$]
1. A parallel line has gradient $2$: $y = 2x + c$.
2. Substitute $(3, 1)$: $1 = 2(3) + c = 6 + c$.
3. $c = -5$.
4. The equation is $y = 2x - 5$.
:::

When the given line is in the form $ax + by = c$, there is a quick method: a parallel line keeps the same left-hand side $ax + by$, and only the number on the right changes.

:::worked-solution[Example 3: parallel to $3x + 4y = 12$ through $(4, -1)$]
1. The parallel line is $3x + 4y = k$ for some number $k$.
2. Substitute $(4, -1)$: $3(4) + 4(-1) = 12 - 4 = 8$, so $k = 8$.
3. The equation is $3x + 4y = 8$.
4. Check by the long method: the gradient is $-\frac{3}{4}$, and $-1 = -\frac{3}{4}(4) + c$ gives $c = 2$, so $y = -\frac{3}{4}x + 2$. Multiplying by 4 gives $4y = -3x + 8$, the same line.
:::

## Finding an unknown so that lines are parallel

:::worked-solution[Example 4: find $k$]
The lines $y = (k - 1)x + 4$ and $y = 5x - 2$ are parallel. Find $k$.
1. Parallel lines have equal gradients: $k - 1 = 5$.
2. $k = 6$.
:::

## Parallel sides in shapes

Gradients let you decide what kind of quadrilateral you have without drawing it accurately.

:::worked-solution[Example 5: show that $ABCD$ is a parallelogram]
The vertices are $A(0, 1)$, $B(4, 3)$, $C(5, 6)$ and $D(1, 4)$.
1. Gradient $AB = \frac{3 - 1}{4 - 0} = \frac{1}{2}$ and gradient $DC = \frac{6 - 4}{5 - 1} = \frac{1}{2}$, so $AB \parallel DC$.
2. Gradient $AD = \frac{4 - 1}{1 - 0} = 3$ and gradient $BC = \frac{6 - 3}{5 - 4} = 3$, so $AD \parallel BC$.
3. Both pairs of opposite sides are parallel, so $ABCD$ is a parallelogram.
:::

If only **one** pair of opposite sides is parallel, the quadrilateral is a trapezium.

### Parallel lines and simultaneous equations

Two different parallel lines never meet, so a pair of simultaneous equations whose graphs are parallel lines, such as $y = 3x + 2$ and $6x - 2y = 5$, has **no solution**.

## Common mistakes

:::mistake{title="Comparing coefficients before rearranging"}
$2y = 6x + 5$ looks as if it has gradient $6$, but dividing by 2 gives gradient $3$. Always make $y$ the subject first.
:::

:::mistake{title="Thinking equal intercepts mean parallel"}
$y = 4x + 1$ and $y = -4x + 1$ share the intercept $(0, 1)$, so they actually **cross** there. It is the gradients that must be equal.
:::

:::mistake{title="Copying the original line"}
"Find the line parallel to $y = 2x - 7$ through $(3, 1)$" needs a new value of $c$. Check that your point satisfies your answer: $2(3) - 5 = 1$.
:::

:::mistake{title="Sign errors with ax + by = c"}
The gradient of $ax + by = c$ is $-\frac{a}{b}$. For $3x + 4y = 12$ it is $-\frac{3}{4}$, not $\frac{3}{4}$ or $\frac{4}{3}$.
:::

## Exam tips

:::exam-tip
Write "gradient $= 2$ (parallel lines have equal gradients)" as your first line of working. It earns the method mark even if the arithmetic later slips.
:::

:::exam-tip
To **show** that a shape is a parallelogram or a trapezium, calculate the gradients of the relevant sides and finish with a sentence naming which sides are parallel and why.
:::

:::exam-tip
Check your final equation by substituting the given point. If it does not fit, your value of $c$ is wrong.
:::

## Summary

:::summary
- Parallel lines have equal gradients; equal gradient and equal intercept means the same line.
- Rearrange to $y = mx + c$ before comparing gradients.
- For a parallel line through a point: keep $m$, substitute the point, find the new $c$.
- For $ax + by = c$, a parallel line is $ax + by = k$; substitute the point to find $k$.
- Use gradients to show sides of quadrilaterals are parallel.
:::
