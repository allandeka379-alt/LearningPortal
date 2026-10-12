---
{
  "key": "coordinate.circles",
  "title": "The equation of a circle",
  "summary": "Write and recognise the equation of a circle in centre-radius and expanded form, find a circle through given points using circle geometry, find tangents, and decide whether a line meets, touches or misses a circle using the discriminant.",
  "concepts": ["amaths.coordinate.circles"],
  "estimatedMinutes": 45,
  "level": "core"
}
---
## Introduction

A circle is the simplest curve that is not a straight line, and it appears all through A-Level coordinate geometry: a sprinkler watering a circular patch of maize, the turning circle of a tractor, the boundary of a cell-phone mast's coverage. In this lesson you turn the geometric definition (every point the same distance from a centre) into an equation, then combine that equation with straight lines.

The equation of a circle is examined in ZIMSEC Pure Mathematics (Paper 1 and Paper 2) and in Cambridge 9709 Paper 1 (topic 1.3). Questions usually ask you to find a centre and radius, find a circle from given facts, find a tangent, or decide how a line and a circle meet. Everything here uses algebra only: implicit differentiation is not needed.

## Key definitions

:::definition{term="Circle"}
The set of all points in a plane at a fixed distance $r$ (the **radius**) from a fixed point $C$ (the **centre**).
:::

:::definition{term="Tangent and chord"}
A **tangent** is a line that touches the circle at exactly one point. A **chord** is a line segment joining two points of the circle; a chord through the centre is a **diameter**.
:::

:::formula{name="Centre-radius form (not in MF19)"}
$$
(x - a)^2 + (y - b)^2 = r^2 \qquad \text{centre } (a, b), \text{ radius } r
$$
:::

:::formula{name="Expanded form (not in MF19)"}
$$
x^2 + y^2 + 2gx + 2fy + c = 0 \qquad \text{centre } (-g, -f), \quad r = \sqrt{g^2 + f^2 - c}
$$
:::

Neither form is printed in the Cambridge list of formulae (MF19), and ZIMSEC prints no list, so learn both.

## Where the equation comes from

Take any point $P(x, y)$ on the circle with centre $C(a, b)$. By Pythagoras, the distance $CP$ satisfies $CP^2 = (x - a)^2 + (y - b)^2$. Every point on the circle has $CP = r$, which gives $(x - a)^2 + (y - b)^2 = r^2$. Points inside the circle have $CP^2 < r^2$ and points outside have $CP^2 > r^2$, so you can test where a point lies by substituting it.

Expanding the brackets gives the form $x^2 + y^2 + 2gx + 2fy + c = 0$. Notice the features of a circle's equation: the coefficients of $x^2$ and $y^2$ are **equal**, and there is **no $xy$ term**. If an equation has $2x^2 + 2y^2$, divide by 2 first.

To go back from the expanded form, complete the square in $x$ and in $y$. The shortcut "centre $(-g, -f)$" is exactly what completing the square gives, but in an exam it is safer to show the completed squares.

:::worked-solution[Example 1: find the centre and radius of $x^2 + y^2 - 6x + 10y - 2 = 0$]
1. Group the terms: $(x^2 - 6x) + (y^2 + 10y) = 2$.
2. Complete the squares: $(x - 3)^2 - 9 + (y + 5)^2 - 25 = 2$.
3. So $(x - 3)^2 + (y + 5)^2 = 36$.
4. The centre is $(3, -5)$ and the radius is $\sqrt{36} = 6$.
5. Check with the formula: $g = -3$, $f = 5$, $c = -2$, so $r = \sqrt{9 + 25 + 2} = 6$.
:::

If $g^2 + f^2 - c \le 0$ the equation does not describe a real circle, which is a useful check on your arithmetic.

## Circle geometry you will use

Three facts from O-Level geometry do most of the work at A Level:

- **The tangent is perpendicular to the radius** at the point of contact. So the gradient of a tangent is the negative reciprocal of the gradient of the radius.
- **The angle in a semicircle is a right angle.** If $\angle ABC = 90^\circ$ with $A$, $B$, $C$ on a circle, then $AC$ is a diameter.
- **The perpendicular from the centre to a chord bisects the chord**, so the perpendicular bisector of any chord passes through the centre.

The third fact gives a method for the circle through three points: the centre lies on the perpendicular bisector of each chord, so two perpendicular bisectors meet at the centre.

:::worked-solution[Example 2: find the equation of the circle through $A(-1, 2)$, $B(7, 2)$ and $C(6, -5)$]
1. $AB$ is horizontal with midpoint $(3, 2)$, so its perpendicular bisector is $x = 3$. The centre is $(3, b)$.
2. The centre is equidistant from $A$ and $C$: $(3 + 1)^2 + (b - 2)^2 = (3 - 6)^2 + (b + 5)^2$.
3. $16 + b^2 - 4b + 4 = 9 + b^2 + 10b + 25$, so $-14b = 14$ and $b = -1$.
4. Centre $(3, -1)$; $r^2 = 4^2 + 3^2 = 25$, so $r = 5$.
5. Equation: $(x - 3)^2 + (y + 1)^2 = 25$, or $x^2 + y^2 - 6x + 2y - 15 = 0$.
6. Check $C$: $36 + 25 - 36 - 10 - 15 = 0$. ✓
:::

:::worked-solution[Example 3: find the equation of the tangent to the circle in Example 2 at the point $P(6, 3)$]
1. Check that $P$ is on the circle: $(6 - 3)^2 + (3 + 1)^2 = 9 + 16 = 25$. ✓
2. Gradient of the radius $CP$: $\dfrac{3 - (-1)}{6 - 3} = \dfrac{4}{3}$.
3. The tangent is perpendicular, so its gradient is $-\dfrac{3}{4}$.
4. $y - 3 = -\dfrac{3}{4}(x - 6)$, so $4y - 12 = -3x + 18$.
5. The tangent is $3x + 4y = 30$.
:::

![Circle with centre C(3, -1) and radius 5 through A(-1, 2), B(7, 2) and (6, -5), with the tangent 3x + 4y = 30 touching it at P(6, 3): the radius CP has gradient 4/3 and the tangent, perpendicular to it, has gradient -3/4.](media:diagrams/circle-tangent-at-point.png "Figure: the tangent at P(6, 3) is perpendicular to the radius CP")

## Lines and circles: the discriminant method

To find where a line meets a circle, make $y$ (or $x$) the subject of the line and substitute into the circle. The result is a quadratic equation, and its discriminant $b^2 - 4ac$ tells you how the line and circle meet:

| Discriminant | Number of intersection points | The line is |
| --- | --- | --- |
| $b^2 - 4ac > 0$ | 2 | a secant (it cuts the circle) |
| $b^2 - 4ac = 0$ | 1 (repeated root) | a tangent |
| $b^2 - 4ac < 0$ | 0 | outside the circle |

An equivalent geometric test compares the perpendicular distance from the centre to the line with the radius. The algebraic method is what most mark schemes expect, especially when the question says "show that".

:::worked-solution[Example 4: find the values of $k$ for which $y = x + k$ is a tangent to $x^2 + y^2 - 4x - 2y - 3 = 0$]
1. Substitute $y = x + k$: $x^2 + (x + k)^2 - 4x - 2(x + k) - 3 = 0$.
2. Collect terms: $2x^2 + (2k - 6)x + k^2 - 2k - 3 = 0$.
3. Tangent means a repeated root: $(2k - 6)^2 - 4 \times 2 \times (k^2 - 2k - 3) = 0$.
4. Expand: $4k^2 - 24k + 36 - 8k^2 + 16k + 24 = 0$, so $-4k^2 - 8k + 60 = 0$.
5. Divide by $-4$: $k^2 + 2k - 15 = 0$, so $(k + 5)(k - 3) = 0$.
6. $k = 3$ or $k = -5$. The line cuts the circle twice for $-5 < k < 3$ and misses it for $k < -5$ or $k > 3$.
:::

:::worked-solution[Example 5: the line $x + y = 8$ meets the circle $x^2 + y^2 - 2x - 4y - 20 = 0$ at $P$ and $Q$. Find $PQ$]
1. Substitute $y = 8 - x$: $x^2 + (8 - x)^2 - 2x - 4(8 - x) - 20 = 0$.
2. $2x^2 - 14x + 12 = 0$, so $x^2 - 7x + 6 = 0$ and $(x - 1)(x - 6) = 0$.
3. $x = 1$ gives $y = 7$; $x = 6$ gives $y = 2$. So $P(1, 7)$ and $Q(6, 2)$.
4. $PQ = \sqrt{(6 - 1)^2 + (2 - 7)^2} = \sqrt{50} = 5\sqrt{2}$ (about $7.07$ units).
:::

## Tangents from an external point

From a point $T$ outside a circle two tangents can be drawn, and they have equal length. The radius to the point of contact, the tangent and the line $CT$ form a right-angled triangle, so

$$
(\text{tangent length})^2 = CT^2 - r^2
$$

:::worked-solution[Example 6: find the length of a tangent from $T(10, 7)$ to the circle of Example 5]
1. The circle is $(x - 1)^2 + (y - 2)^2 = 25$: centre $C(1, 2)$, radius $5$.
2. $CT^2 = 9^2 + 5^2 = 106$.
3. Tangent length $= \sqrt{106 - 25} = \sqrt{81} = 9$ units.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards examine the same content here. Cambridge Paper 1 often combines a circle with a line ("find the set of values of $k$ for which the line meets the circle") and with tangents at two points; ZIMSEC questions may also ask you to prove that two circles touch by comparing the distance between centres with the sum or difference of the radii.
:::

## Common mistakes

:::mistake{title="Wrong signs for the centre"}
$(x + 4)^2 + (y - 1)^2 = 9$ has centre $(-4, 1)$, not $(4, -1)$. The centre makes each bracket zero.
:::

:::mistake{title="Forgetting the square root"}
$(x - 2)^2 + y^2 = 49$ has radius $7$, not $49$. And $x^2 + y^2 + 2gx + 2fy + c = 0$ has $r = \sqrt{g^2 + f^2 - c}$: the sign in front of $c$ is minus.
:::

:::mistake{title="Using the gradient of the radius for the tangent"}
The tangent is perpendicular to the radius: use $-\dfrac{1}{m}$, where $m$ is the gradient of the radius.
:::

:::mistake{title="Not dividing through first"}
In $2x^2 + 2y^2 - 8x + 12y - 6 = 0$ divide by 2 before reading off $g$, $f$ and $c$.
:::

## Exam tips

:::exam-tip
In a "show that the line is a tangent" question, substitute, simplify to a quadratic and show the discriminant is zero (or factorise into a perfect square). State the conclusion in words: "repeated root, so the line touches the circle".
:::

:::exam-tip
"Find the set of values of $k$" for two intersection points needs a strict inequality from $b^2 - 4ac > 0$; solve the quadratic inequality carefully and give the answer as an interval.
:::

:::exam-tip
Give exact answers (surds) unless the question asks for decimals; otherwise use 3 significant figures.
:::

## Summary

:::summary
- A circle with centre $(a, b)$ and radius $r$ is $(x - a)^2 + (y - b)^2 = r^2$; the expanded form $x^2 + y^2 + 2gx + 2fy + c = 0$ has centre $(-g, -f)$ and radius $\sqrt{g^2 + f^2 - c}$.
- Complete the square to find the centre and radius; substitute a point to test whether it is inside, on or outside.
- Tangent ⟂ radius; angle in a semicircle $= 90^\circ$; the perpendicular bisector of a chord passes through the centre.
- Substitute a line into a circle: the discriminant of the quadratic decides two points, a tangent or no intersection.
- Tangent length from an external point $T$: $\sqrt{CT^2 - r^2}$.
:::
