---
{
  "key": "calculus.tangents-normals",
  "title": "Tangents and normals to curves",
  "summary": "Use differentiation to find the gradient at a point, the equations of the tangent and the normal there, points where the gradient takes a given value, where tangents and normals meet the axes or each other, and the areas of triangles they form.",
  "concepts": ["amath.calculus.tangents-normals"],
  "estimatedMinutes": 45,
  "level": "core"
}
---
## Introduction

The derivative gives the gradient of a curve at any point. Combine that gradient with the point itself and you have everything needed for the equation of a straight line: the **tangent**, which touches the curve there, and the **normal**, which is perpendicular to the tangent. Engineers designing a road that leaves a curved bend in a straight line along its tangent, or a mirror whose normal sets the angle of reflection, use exactly this geometry.

Tangent and normal questions are among the most common calculus questions in both ZIMSEC (Form 3, applications of differentiation) and Cambridge 0606 (topic 14.5). They join differentiation to straight-line coordinate geometry: you need $y - y_1 = m(x - x_1)$, the perpendicular gradient rule $m_1 m_2 = -1$, intercepts with the axes and the area of a triangle. Typical exam questions end by asking where a tangent and a normal meet, or for the area of the triangle they make with an axis.

## Key definitions

:::definition{term="Tangent"}
The straight line that touches the curve at a point $P$ and has the same gradient as the curve at $P$.
:::

:::definition{term="Normal"}
The straight line through $P$ that is perpendicular to the tangent at $P$.
:::

:::formula{name="Equation of a line through (x₁, y₁) with gradient m (not in the List of formulas)"}
$$
y - y_1 = m(x - x_1)
$$
:::

:::formula{name="Gradient of the normal"}
If the tangent has gradient $m \neq 0$, the normal has gradient $-\dfrac{1}{m}$, since perpendicular gradients satisfy $m_1 m_2 = -1$.
:::

## The method

1. Find the coordinates of the point $P$. If only $x$ is given, substitute it into the **equation of the curve** to get $y$.
2. Differentiate and substitute the $x$-coordinate of $P$ to get the gradient of the tangent, $m$.
3. For the normal, use $-\dfrac{1}{m}$.
4. Substitute into $y - y_1 = m(x - x_1)$ and simplify to the form asked for.

Two special cases: if $m = 0$ the tangent is horizontal, $y = y_1$, and the normal is vertical, $x = x_1$.

:::worked-solution[Example 1: find the equation of the tangent to $y = x^3 - 2x^2 + 1$ at the point where $x = 2$]
1. $y = 8 - 8 + 1 = 1$, so $P$ is $(2, 1)$.
2. $\dfrac{dy}{dx} = 3x^2 - 4x$; at $x = 2$: $12 - 8 = 4$.
3. Tangent: $y - 1 = 4(x - 2)$.
4. $y = 4x - 7$.
:::

:::worked-solution[Example 2: find the equation of the normal to $y = \dfrac{4}{x}$ at the point $(4, 1)$]
1. $y = 4x^{-1}$, so $\dfrac{dy}{dx} = -4x^{-2} = -\dfrac{4}{x^2}$.
2. At $x = 4$: gradient of tangent $= -\dfrac{4}{16} = -\dfrac{1}{4}$.
3. Gradient of normal $= -1 \div \left(-\frac{1}{4}\right) = 4$.
4. Normal: $y - 1 = 4(x - 4)$, that is $y = 4x - 15$.
:::

## Points with a given gradient

Sometimes the gradient is given and the point is unknown, for example "the tangent is parallel to the line $y = 3x + 1$". Set the derivative equal to the given gradient and solve for $x$.

:::worked-solution[Example 3: find the equation of the tangent to $y = x^2 - 5x + 6$ that is parallel to $y = 3x + 1$]
1. Parallel lines have equal gradients, so we need $\dfrac{dy}{dx} = 3$.
2. $\dfrac{dy}{dx} = 2x - 5 = 3$, so $x = 4$.
3. $y = 16 - 20 + 6 = 2$, so the point is $(4, 2)$.
4. Tangent: $y - 2 = 3(x - 4)$, that is $y = 3x - 10$.
:::

If the derivative is a quadratic, there may be two such points, each with its own tangent. Always check how many solutions the equation for $x$ has.

## Intercepts, intersections and areas

:::worked-solution[Example 4: the curve $y = \sqrt{2x + 5}$ passes through $P(2, 3)$. The tangent and the normal at $P$ meet the $x$-axis at $A$ and $B$. Find the area of triangle $APB$]
1. $\dfrac{dy}{dx} = \frac{1}{2}(2x + 5)^{-\frac{1}{2}} \times 2 = \dfrac{1}{\sqrt{2x + 5}}$. At $x = 2$: $\dfrac{1}{\sqrt{9}} = \dfrac{1}{3}$.
2. Tangent: $y - 3 = \frac{1}{3}(x - 2)$, that is $3y - 9 = x - 2$, or $x - 3y + 7 = 0$.
3. On the $x$-axis $y = 0$: $x = -7$, so $A$ is $(-7, 0)$.
4. Normal gradient $= -3$: $y - 3 = -3(x - 2)$, that is $y = -3x + 9$. With $y = 0$, $x = 3$, so $B$ is $(3, 0)$.
5. $AB = 3 - (-7) = 10$ is the base on the $x$-axis, and the height is the $y$-coordinate of $P$, which is 3.
6. Area $= \frac{1}{2} \times 10 \times 3 = 15$ square units.
:::

The same structure answers "where does the tangent meet the normal at another point" (solve the two line equations simultaneously) and "where does the tangent meet the curve again" (substitute the line into the curve and solve).

A tangent at a point of an exponential or trigonometric curve works the same way. For $y = \mathrm{e}^{2x}$ at $(0, 1)$, the gradient is $2\mathrm{e}^0 = 2$, so the tangent is $y = 2x + 1$; it meets the $x$-axis at $\left(-\frac{1}{2}, 0\right)$.

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards ask for tangents and normals in exactly this way. Cambridge often specifies the form of the answer, such as $ax + by = c$ with integers, and its Paper 1 questions keep the arithmetic exact (fractions and surds). ZIMSEC questions are more often set on polynomial curves and ask for the point where the tangent meets an axis.
:::

## Common mistakes

:::mistake{title="Using the derivative as the y-coordinate"}
$y_1$ comes from the equation of the curve, not from $\frac{dy}{dx}$. Find the point first, then the gradient.
:::

:::mistake{title="Leaving x in the gradient"}
The gradient in $y - y_1 = m(x - x_1)$ must be a number. Substitute the $x$-coordinate into $\frac{dy}{dx}$ before writing the line.
:::

:::mistake{title="Normal gradient as −m or 1/m"}
The normal's gradient is the **negative reciprocal**: for $m = \frac{2}{3}$ it is $-\frac{3}{2}$, not $-\frac{2}{3}$ or $\frac{3}{2}$.
:::

:::mistake{title="Wrong height in a triangle area"}
For a triangle with its base on the $x$-axis, the height is the distance of the third vertex from the axis, its $y$-coordinate, not a slanted side.
:::

## Exam tips

:::exam-tip
State the point and the gradient on separate lines before writing the equation. Each usually earns a mark.
:::

:::exam-tip
Check the required form. "In the form $ax + by + c = 0$ where $a$, $b$ and $c$ are integers" means clear every fraction, as in $x - 3y + 7 = 0$.
:::

:::exam-tip
Sketch a quick diagram for area questions to see which points form the base and which gives the height. Give areas exactly unless told otherwise.
:::

## Summary

:::summary
- Point from the curve; gradient from $\dfrac{dy}{dx}$ at that $x$.
- Tangent: $y - y_1 = m(x - x_1)$. Normal: gradient $-\dfrac{1}{m}$.
- A given gradient (parallel line): set $\dfrac{dy}{dx}$ equal to it and solve for $x$.
- Intercepts: put $x = 0$ or $y = 0$; intersections: solve simultaneously.
- Triangle areas: $\frac{1}{2} \times$ base $\times$ perpendicular height.
:::
