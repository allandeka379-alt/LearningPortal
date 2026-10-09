---
{
  "key": "coordinate.parallel-perpendicular",
  "title": "Parallel and perpendicular lines",
  "summary": "Use the conditions m₁ = m₂ and m₁m₂ = −1 to find equations of parallel lines, perpendicular lines and normals, the perpendicular bisector of a segment and the foot of a perpendicular, and solve problems about right angles, kites, rhombuses and other quadrilaterals.",
  "concepts": ["amath.coordinate.parallel-perpendicular"],
  "estimatedMinutes": 40,
  "level": "core"
}
---
## Introduction

Roads that never meet, a fence built at right angles to a boundary wall, the shortest path from a village to a straight tarred road: each of these is a question about parallel or perpendicular lines. In coordinate geometry the answer always comes down to **gradients**.

This lesson extends straight-line work. ZIMSEC asks you to use the gradients of parallel and perpendicular lines to find the equation of a **normal** to a line; Cambridge adds midpoints and the **perpendicular bisector**, and both boards build longer questions about triangles and quadrilaterals from these ideas. You should be fluent with the gradient formula, the midpoint formula and the equation $y - y_1 = m(x - x_1)$.

## Key definitions

:::definition{term="Parallel lines"}
Lines in the same direction that never meet. Non-vertical parallel lines have **equal gradients**: $m_1 = m_2$.
:::

:::definition{term="Perpendicular lines"}
Lines that meet at a right angle. If neither is vertical, the product of their gradients is $-1$: $m_1 m_2 = -1$, so $m_2 = -\dfrac{1}{m_1}$.
:::

:::definition{term="Normal"}
A line perpendicular to a given line (or to a curve) at a point on it.
:::

:::definition{term="Perpendicular bisector"}
The line that passes through the midpoint of a segment $AB$ at right angles to $AB$. Every point on it is the same distance from $A$ as from $B$.
:::

:::formula{name="Gradient conditions (not in the List of formulas)"}
$$
\text{parallel: } m_1 = m_2 \qquad \text{perpendicular: } m_1 m_2 = -1
$$
:::

## Why $m_1 m_2 = -1$

Rotating a line through $90^\circ$ turns a step of "$a$ across, $b$ up" into "$b$ back, $a$ up". The first gradient is $\frac{b}{a}$ and the second is $\frac{a}{-b} = -\frac{a}{b}$, so the product is $\frac{b}{a} \times \left(-\frac{a}{b}\right) = -1$. To find a perpendicular gradient, **flip the fraction and change the sign**: $\frac{2}{3}$ becomes $-\frac{3}{2}$, $-4$ becomes $\frac{1}{4}$.

Horizontal lines ($m = 0$) and vertical lines (no gradient) are perpendicular to each other; the product rule does not apply to them.

:::worked-solution[Example 1: find the equations of the lines through $(-1, 3)$ that are (a) parallel and (b) perpendicular to $2x + 5y = 7$]
1. Gradient of the given line: $5y = -2x + 7$, so $m = -\frac{2}{5}$.
2. (a) A parallel line has the same left-hand side $2x + 5y$; substitute the point: $2(-1) + 5(3) = 13$. The line is $2x + 5y = 13$.
3. (b) Perpendicular gradient: $-1 \div \left(-\frac{2}{5}\right) = \frac{5}{2}$.
4. $y - 3 = \frac{5}{2}(x + 1)$; multiply by 2: $2y - 6 = 5x + 5$.
5. The line is $5x - 2y + 11 = 0$. Check: $5(-1) - 2(3) + 11 = 0$.
:::

The shortcut in step 2 is worth remembering: lines parallel to $ax + by = c$ have the form $ax + by = k$, and lines perpendicular to it have the form $bx - ay = k$.

## The perpendicular bisector

:::worked-solution[Example 2: find the perpendicular bisector of $AB$, where $A(1, -2)$ and $B(7, 6)$]
1. Midpoint: $\left(\frac{1 + 7}{2}, \frac{-2 + 6}{2}\right) = (4, 2)$.
2. Gradient of $AB$: $\frac{6 - (-2)}{7 - 1} = \frac{8}{6} = \frac{4}{3}$, so the perpendicular gradient is $-\frac{3}{4}$.
3. $y - 2 = -\frac{3}{4}(x - 4)$; multiply by 4: $4y - 8 = -3x + 12$.
4. The perpendicular bisector is $3x + 4y - 20 = 0$.
5. Check with a point on it, $(0, 5)$: its distance to $A$ is $\sqrt{1 + 49} = \sqrt{50}$ and to $B$ is $\sqrt{49 + 1} = \sqrt{50}$. Equal, as expected.
:::

## The foot of the perpendicular

The shortest distance from a point $P$ to a line is along the perpendicular from $P$ to the line. The point where the perpendicular meets the line is the **foot** of the perpendicular. To find it: write the equation of the perpendicular through $P$, then solve it simultaneously with the line.

:::worked-solution[Example 3: find the foot of the perpendicular from $P(7, 4)$ to the line $y = 2x - 5$, and the shortest distance from $P$ to the line]
1. The line has gradient 2, so the perpendicular has gradient $-\frac{1}{2}$.
2. Perpendicular through $P$: $y - 4 = -\frac{1}{2}(x - 7)$, so $y = -\frac{1}{2}x + 7.5$.
3. Solve with $y = 2x - 5$: $2x - 5 = -\frac{1}{2}x + 7.5$, so $2.5x = 12.5$ and $x = 5$; then $y = 5$.
4. The foot is $F(5, 5)$.
5. Shortest distance $PF = \sqrt{(7 - 5)^2 + (4 - 5)^2} = \sqrt{5} \approx 2.24$.
:::

## Right angles and quadrilaterals

To prove an angle is a right angle, show that the gradients of its two arms multiply to $-1$. Quadrilateral facts you will use:

| Shape | Gradient and length facts |
| --- | --- |
| parallelogram | both pairs of opposite sides parallel |
| rectangle | parallelogram with adjacent sides perpendicular |
| rhombus | all sides equal; diagonals bisect each other at right angles |
| square | rhombus with a right angle (diagonals equal and perpendicular) |
| kite | one diagonal is the perpendicular bisector of the other |
| trapezium | one pair of opposite sides parallel |

:::worked-solution[Example 4: show that the triangle with vertices $A(-3, 1)$, $B(1, 3)$ and $C(3, -1)$ has a right angle at $B$]
1. Gradient $AB = \frac{3 - 1}{1 - (-3)} = \frac{2}{4} = \frac{1}{2}$.
2. Gradient $BC = \frac{-1 - 3}{3 - 1} = \frac{-4}{2} = -2$.
3. Product: $\frac{1}{2} \times (-2) = -1$, so $AB$ is perpendicular to $BC$: angle $ABC = 90^\circ$.
:::

:::worked-solution[Example 5: $ABCD$ is a rhombus with $A(2, 1)$ and $C(6, 9)$. The vertex $B$ lies on the $x$-axis. Find $B$, $D$ and the area of the rhombus]
1. The diagonal $BD$ is the perpendicular bisector of $AC$. Midpoint of $AC$: $M(4, 5)$; gradient $AC = \frac{8}{4} = 2$, so $BD$ has gradient $-\frac{1}{2}$.
2. Equation of $BD$: $y - 5 = -\frac{1}{2}(x - 4)$, so $y = -\frac{1}{2}x + 7$.
3. $B$ is on the $x$-axis: $0 = -\frac{1}{2}x + 7$, so $x = 14$ and $B = (14, 0)$.
4. $M$ is also the midpoint of $BD$: $D = (2 \times 4 - 14, 2 \times 5 - 0) = (-6, 10)$.
5. Diagonals: $AC = \sqrt{16 + 64} = \sqrt{80}$, $BD = \sqrt{400 + 100} = \sqrt{500}$.
6. Area of a rhombus $= \frac{1}{2} \times AC \times BD = \frac{1}{2}\sqrt{80 \times 500} = \frac{1}{2}\sqrt{40\,000} = 100$ square units.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
ZIMSEC's objective is the equation of a normal to a given straight line, using the gradient conditions. Cambridge names parallel and perpendicular lines, midpoints, lengths and the perpendicular bisector. Questions on both papers combine these with areas and quadrilateral properties, as in Example 5.
:::

## Common mistakes

:::mistake{title="Only changing the sign, or only flipping"}
The perpendicular to a gradient of $\frac{2}{3}$ has gradient $-\frac{3}{2}$, not $-\frac{2}{3}$ and not $\frac{3}{2}$. Do both: flip and change sign.
:::

:::mistake{title="Using the wrong point for the perpendicular bisector"}
The perpendicular bisector passes through the **midpoint** of $AB$, not through $A$ or $B$.
:::

:::mistake{title="Reading the gradient from ax + by = c as a"}
The gradient of $3x - y + 4 = 0$ is $3$ but the gradient of $2x + 5y = 7$ is $-\frac{2}{5}$. Make $y$ the subject every time.
:::

:::mistake{title="Assuming a quadrilateral is special"}
A shape is a rectangle only when you have shown it: parallel opposite sides **and** a right angle. Equal-looking sketches prove nothing.
:::

## Exam tips

:::exam-tip
In "show that angle $ABC$ is a right angle", state both gradients, multiply them, and write the conclusion "product $= -1$, so $AB \perp BC$".
:::

:::exam-tip
For areas of rhombuses and kites, $\frac{1}{2} \times d_1 \times d_2$ (half the product of the diagonals) is quick once you have the vertices; otherwise use the shoelace method.
:::

:::exam-tip
A "hence" after finding a perpendicular bisector usually wants a point on it: substitute the given condition (on an axis, on another line) into its equation.
:::

## Summary

:::summary
- Parallel lines: equal gradients. Perpendicular lines: $m_1m_2 = -1$, so flip the gradient and change its sign.
- Lines parallel to $ax + by = c$ are $ax + by = k$; perpendicular lines are $bx - ay = k$.
- Perpendicular bisector of $AB$: through the midpoint, perpendicular to $AB$.
- Foot of the perpendicular from $P$: solve the perpendicular through $P$ with the line; the shortest distance is from $P$ to the foot.
- Use gradients and lengths to prove right angles and to identify rectangles, rhombuses, kites and squares.
:::
