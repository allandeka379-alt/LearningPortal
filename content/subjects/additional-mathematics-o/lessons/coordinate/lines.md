---
{
  "key": "coordinate.lines",
  "title": "Straight lines: distance, midpoint, gradient and equation",
  "summary": "Find the distance between two points, the midpoint and gradient of a line segment, the equation of a straight line in its three standard forms, intercepts and points of intersection, and use them to test collinearity and find the areas of triangles and quadrilaterals from their vertices.",
  "concepts": ["amath.coordinate.lines"],
  "estimatedMinutes": 40,
  "level": "core"
}
---
## Introduction

A surveyor marking out a plot near Chinhoyi, an engineer planning a straight pipeline from a borehole to a school, and a pilot plotting a route all work with points and lines on a coordinate grid. Coordinate geometry turns geometric questions (how long? how steep? where do these meet? what is the area?) into algebra that you can do with certainty.

Much of this lesson revises IGCSE and O-Level Mathematics, but Additional Mathematics questions are longer and combine the ideas: find a gradient, use it to write an equation, solve two equations to find a vertex, then find an area. Both ZIMSEC and Cambridge examine every skill here, and most of it must be done **without a calculator**, so practise exact working with fractions and surds.

## Key definitions

:::definition{term="Gradient"}
The steepness of a line: the change in $y$ divided by the change in $x$ between any two points on it. A line sloping up to the right has a positive gradient; a horizontal line has gradient 0; a vertical line has no gradient (it is undefined).
:::

:::definition{term="Intercepts"}
The $y$-intercept is where a line crosses the $y$-axis (put $x = 0$); the $x$-intercept is where it crosses the $x$-axis (put $y = 0$).
:::

:::definition{term="Collinear points"}
Three or more points that lie on one straight line.
:::

:::formula{name="For points (x₁, y₁) and (x₂, y₂) (not in the List of formulas)"}
$$
\text{distance} = \sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}
$$

$$
\text{midpoint} = \left(\frac{x_1 + x_2}{2}, \frac{y_1 + y_2}{2}\right), \qquad m = \frac{y_2 - y_1}{x_2 - x_1}
$$
:::

:::formula{name="Equation of a straight line"}
$$
y = mx + c \qquad y - y_1 = m(x - x_1) \qquad ax + by + c = 0
$$
:::

## Distance, midpoint and gradient

The distance formula is Pythagoras' theorem: the horizontal and vertical changes are the two shorter sides of a right-angled triangle. The midpoint is the mean of the coordinates.

:::worked-solution[Example 1: for $A(-2, 5)$ and $B(4, -3)$, find the length $AB$, the midpoint of $AB$ and the gradient of $AB$]
1. Changes: $x$ increases by $4 - (-2) = 6$ and $y$ changes by $-3 - 5 = -8$.
2. Length: $AB = \sqrt{6^2 + (-8)^2} = \sqrt{36 + 64} = \sqrt{100} = 10$.
3. Midpoint: $\left(\dfrac{-2 + 4}{2}, \dfrac{5 + (-3)}{2}\right) = (1, 1)$.
4. Gradient: $m = \dfrac{-8}{6} = -\dfrac{4}{3}$.
:::

Keep the subtraction in the same order on top and bottom of the gradient. Brackets around negative coordinates prevent most sign errors.

## The equation of a line

Choose the form that suits the information:

- gradient and $y$-intercept known: $y = mx + c$;
- gradient and any point known: $y - y_1 = m(x - x_1)$;
- two points known: find the gradient first, then use either point.

Questions often ask for the answer in the form $ax + by + c = 0$ **with integers** $a$, $b$, $c$; multiply out any fractions.

:::worked-solution[Example 2: find the equation of the line through $(3, -1)$ with gradient $\frac{2}{5}$, in the form $ax + by + c = 0$, and its intercepts]
1. Point–gradient form: $y - (-1) = \frac{2}{5}(x - 3)$, that is $y + 1 = \frac{2}{5}(x - 3)$.
2. Multiply by 5: $5y + 5 = 2x - 6$.
3. Rearrange: $2x - 5y - 11 = 0$.
4. $x$-intercept ($y = 0$): $2x = 11$, so $x = 5.5$: the point $(5.5, 0)$.
5. $y$-intercept ($x = 0$): $-5y = 11$, so $y = -\frac{11}{5}$: the point $(0, -2.2)$.
:::

To read the gradient from $ax + by + c = 0$, rearrange to $y = -\frac{a}{b}x - \frac{c}{b}$: the gradient is $-\frac{a}{b}$.

## Where two lines meet

The point of intersection satisfies both equations, so solve them **simultaneously**.

:::worked-solution[Example 3: find the point where $3x + 2y = 17$ meets $y = 2x - 2$]
1. Substitute the second equation into the first: $3x + 2(2x - 2) = 17$.
2. $3x + 4x - 4 = 17$, so $7x = 21$ and $x = 3$.
3. $y = 2(3) - 2 = 4$.
4. Check in the first equation: $3(3) + 2(4) = 9 + 8 = 17$. The lines meet at $(3, 4)$.
:::

## Collinear points

Three points $P$, $Q$, $R$ are collinear when the gradient of $PQ$ equals the gradient of $QR$ (the common point $Q$ means the two segments cannot be parallel and separate).

:::worked-solution[Example 4: show that $P(-1, -4)$, $Q(2, 2)$ and $R(5, 8)$ are collinear, and find $k$ if $S(k, 10)$ is also on the line]
1. Gradient $PQ = \dfrac{2 - (-4)}{2 - (-1)} = \dfrac{6}{3} = 2$; gradient $QR = \dfrac{8 - 2}{5 - 2} = \dfrac{6}{3} = 2$.
2. Equal gradients and the common point $Q$, so $P$, $Q$, $R$ are collinear.
3. The line is $y - 2 = 2(x - 2)$, that is $y = 2x - 2$.
4. $S$ is on it: $10 = 2k - 2$, so $k = 6$.
:::

## Areas from coordinates

For a polygon with vertices $(x_1, y_1), (x_2, y_2), \ldots, (x_n, y_n)$ taken **in order** round the shape, the area is

$$
\text{Area} = \frac{1}{2}\left|(x_1y_2 - x_2y_1) + (x_2y_3 - x_3y_2) + \cdots + (x_ny_1 - x_1y_n)\right|
$$

A tidy way to set this out is to write the coordinates in two columns, repeat the first point at the bottom, and take "down-right products minus up-right products". This is sometimes called the shoelace method. Alternatively, enclose the shape in a rectangle and subtract right-angled triangles.

:::worked-solution[Example 5: find the area of the triangle with vertices $A(1, 2)$, $B(7, 4)$ and $C(3, 9)$]
1. Products: $x_Ay_B - x_By_A = 1(4) - 7(2) = -10$.
2. $x_By_C - x_Cy_B = 7(9) - 3(4) = 63 - 12 = 51$.
3. $x_Cy_A - x_Ay_C = 3(2) - 1(9) = -3$.
4. Area $= \frac{1}{2}\left|-10 + 51 - 3\right| = \frac{1}{2}(38) = 19$ square units.
:::

:::worked-solution[Example 6: a maize field has corners at $(0, 0)$, $(8, 1)$, $(9, 7)$ and $(2, 6)$, in units of 10 metres. Find its area in square metres]
1. Products in order: $0(1) - 8(0) = 0$; $8(7) - 9(1) = 47$; $9(6) - 2(7) = 40$; $2(0) - 0(6) = 0$.
2. Area $= \frac{1}{2}\left|0 + 47 + 40 + 0\right| = 43.5$ square units.
3. One square unit is $10\ \text{m} \times 10\ \text{m} = 100\ \text{m}^2$, so the area is $4350\ \text{m}^2$.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both syllabuses test distance, gradient and the equation of a line. Cambridge lists midpoints, lengths and areas explicitly and its Paper 1 is non-calculator, so leave lengths as surds such as $\sqrt{80} = 4\sqrt{5}$ when asked for exact values.
:::

## Common mistakes

:::mistake{title="Mixing the order in the gradient"}
$\dfrac{y_2 - y_1}{x_1 - x_2}$ gives the wrong sign. Subtract in the same order on the top and the bottom.
:::

:::mistake{title="Reading the gradient straight from ax + by + c = 0"}
The gradient of $2x - 5y - 11 = 0$ is $\frac{2}{5}$, not 2 and not $-5$. Rearrange to make $y$ the subject first.
:::

:::mistake{title="Taking the vertices out of order"}
The area formula needs the vertices in order round the shape (clockwise or anticlockwise). Jumping across a diagonal gives a wrong value.
:::

:::mistake{title="Forgetting the modulus or the half"}
The bracket can come out negative (when the vertices go clockwise); the area is the positive value, and it is **half** the bracket.
:::

## Exam tips

:::exam-tip
"Find the equation" with no form stated: any correct form scores, but $ax + by + c = 0$ with integers or $y = mx + c$ are safest. When a form is given, use exactly that form.
:::

:::exam-tip
Draw a quick sketch of the points, even if the question does not ask for one. It shows the order of the vertices and catches impossible answers such as a negative length.
:::

:::exam-tip
"Show that the points are collinear" needs both gradients worked out and a concluding sentence mentioning the common point.
:::

## Summary

:::summary
- Distance $\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$, midpoint $\left(\frac{x_1 + x_2}{2}, \frac{y_1 + y_2}{2}\right)$, gradient $\frac{y_2 - y_1}{x_2 - x_1}$.
- Equation of a line: $y = mx + c$, $y - y_1 = m(x - x_1)$, or $ax + by + c = 0$ (gradient $-\frac{a}{b}$).
- Intercepts: put $x = 0$ or $y = 0$; intersections: solve the equations simultaneously.
- Collinear points: equal gradients through a common point.
- Area of a polygon: half the modulus of the shoelace sum, vertices taken in order.
:::
