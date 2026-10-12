---
{
  "key": "circle.equation",
  "title": "The equation of a circle",
  "summary": "Write the equation of a circle as (x − a)² + (y − b)² = r² or in expanded form, find the centre and radius by completing the square, find the equation from a centre and a point, from the ends of a diameter or from three points, and decide whether a point lies inside, on or outside a circle.",
  "concepts": ["amath.circle.equation"],
  "estimatedMinutes": 35,
  "level": "core"
}
---
## Introduction

A centre-pivot irrigation arm on a farm near Chiredzi sweeps out a circle; a cellphone mast covers the villages within a fixed distance of it; a borehole pump can supply every homestead within 800 metres. Each describes the set of points at a fixed distance from a centre, which is exactly what a circle is. With coordinates we can write that set as an equation and answer questions such as "is this homestead covered?" with a single calculation.

The coordinate geometry of the circle was added to Cambridge 0606 from 2025 (it is not in the ZIMSEC syllabus). The equation of a circle is given in the Cambridge **List of formulas**, but you must be able to use it in any form. You need the distance formula, completing the square and perpendicular bisectors.

## Key definitions

:::definition{term="Circle"}
The set of all points at a fixed distance $r$ (the **radius**) from a fixed point (the **centre**).
:::

:::definition{term="Diameter"}
A chord through the centre. Its midpoint is the centre and its length is $2r$.
:::

:::formula{name="Equation of a circle (in the List of formulas)"}
$$
(x - a)^2 + (y - b)^2 = r^2 \qquad \text{centre } (a, b), \text{ radius } r
$$
:::

:::formula{name="Expanded form (not in the List of formulas)"}
$$
x^2 + y^2 + 2gx + 2fy + c = 0 \qquad \text{centre } (-g, -f), \quad r = \sqrt{g^2 + f^2 - c}
$$
:::

## Where the equation comes from

A point $P(x, y)$ is on the circle exactly when its distance from the centre $C(a, b)$ is $r$. By the distance formula,

$$
\sqrt{(x - a)^2 + (y - b)^2} = r \quad \Longleftrightarrow \quad (x - a)^2 + (y - b)^2 = r^2
$$

Watch the signs: a centre at $(3, -2)$ gives $(x - 3)^2 + (y + 2)^2$. The circle $x^2 + y^2 = r^2$ has its centre at the origin.

:::worked-solution[Example 1: write the equation of the circle with centre $(3, -2)$ and radius 5, in both forms]
1. $(x - 3)^2 + (y - (-2))^2 = 5^2$, that is $(x - 3)^2 + (y + 2)^2 = 25$.
2. Expand: $x^2 - 6x + 9 + y^2 + 4y + 4 = 25$.
3. Expanded form: $x^2 + y^2 - 6x + 4y - 12 = 0$.
:::

![Circle with centre (3, -2) and radius 5, equation (x - 3)^2 + (y + 2)^2 = 25; the point (7, 1) is at distance 5 from the centre (a 3-4-5 triangle) and (-2, -2) lies on the circle too.](media:diagrams/circle-centre-radius.png "Figure: the circle (x − 3)² + (y + 2)² = 25")

## Finding the centre and radius

An expanded equation is recognisable as a circle when the $x^2$ and $y^2$ terms have **equal coefficients** (divide through if they are both 2, say) and there is **no $xy$ term**. Complete the square in $x$ and in $y$ separately.

:::worked-solution[Example 2: find the centre and radius of the circle $x^2 + y^2 + 8x - 10y + 5 = 0$]
1. Group the terms: $(x^2 + 8x) + (y^2 - 10y) = -5$.
2. Complete the squares: $(x + 4)^2 - 16 + (y - 5)^2 - 25 = -5$.
3. $(x + 4)^2 + (y - 5)^2 = 36$.
4. Centre $(-4, 5)$, radius $\sqrt{36} = 6$.
5. Check with the formula: $g = 4$, $f = -5$, $c = 5$, so $r = \sqrt{16 + 25 - 5} = 6$.
:::

If $g^2 + f^2 - c$ turns out to be zero or negative, the equation does not describe a real circle.

## Finding the equation from given information

You always need two things: the **centre** and the **radius** (or $r^2$).

:::worked-solution[Example 3: find the equation of the circle with diameter $AB$, where $A(-1, 4)$ and $B(5, -4)$]
1. The centre is the midpoint of $AB$: $\left(\frac{-1 + 5}{2}, \frac{4 + (-4)}{2}\right) = (2, 0)$.
2. $AB = \sqrt{6^2 + (-8)^2} = 10$, so the radius is 5.
3. The circle is $(x - 2)^2 + y^2 = 25$.
:::

:::worked-solution[Example 4: find the equation of the circle with centre $(1, 3)$ that passes through $(6, 5)$]
1. The radius is the distance from the centre to the point: $r^2 = (6 - 1)^2 + (5 - 3)^2 = 25 + 4 = 29$.
2. The circle is $(x - 1)^2 + (y - 3)^2 = 29$. There is no need to find $r = \sqrt{29}$ itself.
:::

When three points on the circle are given, use the fact that **the perpendicular bisector of any chord passes through the centre**. The centre is where two perpendicular bisectors meet.

:::worked-solution[Example 5: find the equation of the circle through $A(1, 1)$, $B(7, 1)$ and $C(1, 9)$]
1. $AB$ is horizontal with midpoint $(4, 1)$, so its perpendicular bisector is $x = 4$.
2. $AC$ is vertical with midpoint $(1, 5)$, so its perpendicular bisector is $y = 5$.
3. The centre is $(4, 5)$. The radius is the distance to $A$: $r^2 = 3^2 + 4^2 = 25$.
4. The circle is $(x - 4)^2 + (y - 5)^2 = 25$. Check $B$: $9 + 16 = 25$; $C$: $9 + 16 = 25$.
:::

(Angle $BAC$ is a right angle, so $BC$ is a diameter. That is a second way to find the centre: the midpoint of $BC$ is $(4, 5)$.)

## Inside, on or outside?

Substitute the point into $(x - a)^2 + (y - b)^2$ and compare with $r^2$: smaller means inside, equal means on the circle, larger means outside. This compares the squared distance from the centre with $r^2$, so no square roots are needed.

:::worked-solution[Example 6: for the circle $(x - 2)^2 + (y + 1)^2 = 20$, decide where the points $(5, 2)$, $(6, 1)$ and $(-2, 2)$ lie]
1. $(5, 2)$: $3^2 + 3^2 = 18 < 20$, inside.
2. $(6, 1)$: $4^2 + 2^2 = 20$, on the circle.
3. $(-2, 2)$: $(-4)^2 + 3^2 = 25 > 20$, outside.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
The circle is examined by Cambridge only (0606 topic 8). The form $(x - a)^2 + (y - b)^2 = r^2$ is in the List of formulas; the expanded form and its centre $(-g, -f)$ are not, so be ready to complete the square. Paper 1 answers are exact: leave $r = \sqrt{29}$ as a surd.
:::

## Common mistakes

:::mistake{title="Sign errors in the centre"}
$(x + 4)^2 + (y - 5)^2 = 36$ has centre $(-4, 5)$, not $(4, -5)$. The centre's coordinates have the opposite signs to the numbers in the brackets.
:::

:::mistake{title="Giving r² as the radius"}
In $(x - 1)^2 + (y - 3)^2 = 29$ the radius is $\sqrt{29}$, not 29. Equally, a radius of 6 means the right-hand side is 36.
:::

:::mistake{title="Losing the constant when completing the square"}
$x^2 + 8x = (x + 4)^2 - 16$: the 16 must be subtracted (or added to the other side). Forgetting it gives the wrong radius.
:::

:::mistake{title="Using a diameter as a radius"}
When the ends of a diameter are given, the radius is **half** the distance between them, and the centre is their midpoint.
:::

## Exam tips

:::exam-tip
"Find the centre and radius" is worth a mark each: show the completed squares so that a slip in one does not cost both.
:::

:::exam-tip
To show that a point lies on a circle, substitute it and show both sides are equal, ending with a statement such as "so $P$ lies on the circle".
:::

:::exam-tip
A right angle at $A$ in triangle $ABC$ means $BC$ is a diameter of the circle through $A$, $B$ and $C$. Spotting this saves time.
:::

## Summary

:::summary
- $(x - a)^2 + (y - b)^2 = r^2$ is the circle with centre $(a, b)$ and radius $r$.
- $x^2 + y^2 + 2gx + 2fy + c = 0$ has centre $(-g, -f)$ and radius $\sqrt{g^2 + f^2 - c}$; find them by completing the square.
- To find a circle's equation, find its centre (midpoint of a diameter, or where perpendicular bisectors of chords meet) and its radius (a distance).
- Compare $(x - a)^2 + (y - b)^2$ with $r^2$ to decide whether a point is inside, on or outside.
:::
