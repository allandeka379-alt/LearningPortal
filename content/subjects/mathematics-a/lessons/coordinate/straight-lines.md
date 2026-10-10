---
{
  "key": "coordinate.straight-lines",
  "title": "Coordinate geometry of straight lines",
  "summary": "Find gradients, midpoints, distances and equations of straight lines in all three standard forms, work with parallel and perpendicular lines and perpendicular bisectors, find intersections, and (ZIMSEC) the perpendicular distance from a point to a line.",
  "concepts": ["amaths.coordinate.straight-lines"],
  "estimatedMinutes": 40,
  "freePreview": true,
  "level": "core"
}
---
## Introduction

Coordinate geometry turns geometry into algebra. Instead of measuring a diagram, you calculate: the length of a fence between two marked points on a surveyor's plan of a plot in Ruwa, the point where two straight roads meet, or the line that is equidistant from two boreholes. Straight lines are the foundation for circles, tangents and normals later in the course.

ZIMSEC Pure Mathematics (Form 5, *Graphs and coordinate geometry*) asks for equations of parallel and perpendicular lines, the distance between two points and the **perpendicular distance from a point to a line**. Cambridge 9709 (Paper 1, topic 1.3) examines equations of lines in all forms, gradients, midpoints, distances, parallel and perpendicular lines and intersections. You should be able to solve simultaneous linear equations.

## Key definitions

:::formula{name="Two points A(x₁, y₁) and B(x₂, y₂)"}
$$
\text{gradient } m = \frac{y_{2} - y_{1}}{x_{2} - x_{1}}, \qquad \text{midpoint } \left(\frac{x_{1} + x_{2}}{2}, \frac{y_{1} + y_{2}}{2}\right)
$$

$$
AB = \sqrt{(x_{2} - x_{1})^{2} + (y_{2} - y_{1})^{2}}
$$
:::

:::formula{name="Equation of a line"}
$$
y = mx + c, \qquad y - y_{1} = m(x - x_{1}), \qquad ax + by + c = 0
$$
:::

:::definition{term="Parallel and perpendicular lines"}
Parallel lines have **equal gradients**: $m_{1} = m_{2}$. Perpendicular lines have gradients whose **product is $-1$**: $m_{1}m_{2} = -1$, so $m_{2} = -\dfrac{1}{m_{1}}$.
:::

:::definition{term="Perpendicular bisector"}
The line through the midpoint of $AB$ that is perpendicular to $AB$. Every point on it is the same distance from $A$ as from $B$.
:::

:::formula{name="Perpendicular distance (ZIMSEC)"}
The distance from the point $(x_{1}, y_{1})$ to the line $ax + by + c = 0$ is
$$
d = \frac{|ax_{1} + by_{1} + c|}{\sqrt{a^{2} + b^{2}}}
$$
:::

None of these is on Cambridge's MF19 list.

## Lines through given points

The point–gradient form $y - y_{1} = m(x - x_{1})$ is the quickest way to write down a line: you only need one point and the gradient. Rearrange afterwards into whatever form the question asks for.

:::worked-solution[Example 1: $A(-2, 5)$ and $B(4, -1)$. Find the gradient, midpoint and length of $AB$, and the equation of the line $AB$]
1. Gradient: $m = \dfrac{-1 - 5}{4 - (-2)} = \dfrac{-6}{6} = -1$.
2. Midpoint: $\left(\dfrac{-2 + 4}{2}, \dfrac{5 + (-1)}{2}\right) = (1, 2)$.
3. Length: $\sqrt{6^{2} + (-6)^{2}} = \sqrt{72} = 6\sqrt{2}$.
4. Equation: $y - 5 = -1(x + 2)$, so $y = -x + 3$, or $x + y - 3 = 0$.
5. Check with $B$: $4 + (-1) - 3 = 0$.
:::

## Parallel and perpendicular lines

To use the gradient of a line given as $ax + by + c = 0$, rearrange it to $y = mx + c$ first.

:::worked-solution[Example 2: find the line through $(3, -2)$ perpendicular to $2x - 5y + 7 = 0$]
1. Rearrange: $5y = 2x + 7$, so $y = \frac{2}{5}x + \frac{7}{5}$; the gradient is $\frac{2}{5}$.
2. Perpendicular gradient: $-\dfrac{1}{2/5} = -\dfrac{5}{2}$.
3. Line: $y + 2 = -\dfrac{5}{2}(x - 3)$.
4. Multiply by 2: $2y + 4 = -5x + 15$, so $5x + 2y - 11 = 0$.
5. Check: $5(3) + 2(-2) - 11 = 0$, and $\frac{2}{5} \times \left(-\frac{5}{2}\right) = -1$.
:::

:::worked-solution[Example 3: find the perpendicular bisector of $P(1, 7)$ and $Q(7, 3)$]
1. Midpoint of $PQ$: $(4, 5)$.
2. Gradient of $PQ$: $\dfrac{3 - 7}{7 - 1} = -\dfrac{2}{3}$, so the perpendicular gradient is $\dfrac{3}{2}$.
3. Line: $y - 5 = \dfrac{3}{2}(x - 4)$, so $2y - 10 = 3x - 12$.
4. Answer: $3x - 2y - 2 = 0$.
:::

## Intersections and areas

The intersection of two lines is the solution of their equations as simultaneous equations. In the same way, any intersection of two graphs corresponds to a solution of an equation.

:::worked-solution[Example 4: a typical "show that"]
The lines $L_{1}: y = 2x - 1$ and $L_{2}: x + 3y = 18$ meet at $P$.

(a) Show that $P$ is $(3, 5)$. (b) Find the area of the triangle formed by $L_{1}$, $L_{2}$ and the $y$-axis.

1. (a) Substitute $L_{1}$ into $L_{2}$: $x + 3(2x - 1) = 18$, so $7x = 21$ and $x = 3$.
2. Then $y = 2(3) - 1 = 5$, so $P = (3, 5)$ as required.
3. (b) $L_{1}$ meets the $y$-axis at $(0, -1)$; $L_{2}$ meets it where $3y = 18$, at $(0, 6)$.
4. The base along the $y$-axis has length $6 - (-1) = 7$; the height is the $x$-coordinate of $P$, which is $3$.
5. Area $= \frac{1}{2} \times 7 \times 3 = 10.5$ square units.
:::

## Perpendicular distance from a point to a line (ZIMSEC)

:::worked-solution[Example 5: find the distance from $(5, 1)$ to the line $3x + 4y - 4 = 0$]
1. Substitute the point into the left side: $3(5) + 4(1) - 4 = 15$.
2. Divide by $\sqrt{3^{2} + 4^{2}} = 5$.
3. Distance $= \dfrac{|15|}{5} = 3$ units.
:::

You can also find this distance without the formula: find the foot of the perpendicular (the intersection of the line with the perpendicular through the point), then use the distance formula. That method works for both boards.

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards examine gradients, lengths, midpoints, equations of lines, parallel and perpendicular lines, perpendicular bisectors and intersections. The perpendicular-distance formula is ZIMSEC only; a Cambridge question would expect the foot-of-perpendicular method instead.
:::

## Common mistakes

:::mistake{title="Mixing up the order of subtraction"}
In the gradient, subtract in the same order on top and bottom: $\frac{y_{2} - y_{1}}{x_{2} - x_{1}}$, not $\frac{y_{2} - y_{1}}{x_{1} - x_{2}}$.
:::

:::mistake{title="Reading the gradient from ax + by + c = 0 directly"}
The gradient of $2x - 5y + 7 = 0$ is $\frac{2}{5}$, not $2$ or $-5$. Make $y$ the subject first.
:::

:::mistake{title="Negative reciprocal half done"}
The perpendicular gradient to $\frac{2}{5}$ is $-\frac{5}{2}$: flip **and** change the sign.
:::

:::mistake{title="Forgetting the modulus in the distance formula"}
A distance cannot be negative: take the absolute value of $ax_{1} + by_{1} + c$.
:::

## Exam tips

:::exam-tip
"Give your answer in the form $ax + by + c = 0$" usually means integers $a$, $b$, $c$: multiply out fractions.
:::

:::exam-tip
In "show that" questions, show the substitution or calculation fully and finish by stating the given result.
:::

:::exam-tip
A quick sketch of the points helps you spot sign errors: a line falling from left to right must have a negative gradient.
:::

## Summary

:::summary
- Gradient $\frac{y_{2} - y_{1}}{x_{2} - x_{1}}$; midpoint is the average of coordinates; distance by Pythagoras.
- Use $y - y_{1} = m(x - x_{1})$, then rearrange to the form requested.
- Parallel: equal gradients. Perpendicular: $m_{1}m_{2} = -1$.
- Perpendicular bisector: through the midpoint, perpendicular to the segment.
- Intersections solve simultaneous equations; ZIMSEC: distance from a point to a line is $\frac{|ax_{1} + by_{1} + c|}{\sqrt{a^{2} + b^{2}}}$.
:::
