---
{
  "key": "coordinate.length-and-midpoint",
  "title": "Length and midpoint of a line segment",
  "summary": "Use Pythagoras' theorem to find the length of a line segment from the coordinates of its ends, and average the coordinates to find its midpoint, giving exact surd or rounded answers.",
  "concepts": ["math.coordinate.length-and-midpoint"],
  "objectives": ["cambridge/igcse/mathematics:3.4.1", "cambridge/igcse/mathematics:3.4.2"],
  "estimatedMinutes": 25,
  "level": "extended"
}
---
## Introduction

A surveyor marks a new borehole at grid point $(2, 3)$ and a school at $(10, 9)$ on a map where one unit is one kilometre. How long would a straight water pipe between them be, and where is the halfway point for a pump station? Both questions can be answered from the coordinates alone, without measuring the map.

This lesson covers two short formulas. The **length** of a line segment comes straight from Pythagoras' theorem, and the **midpoint** is found by averaging. Both are used again and again in harder questions on circles, isosceles triangles, perpendicular bisectors and vectors.

You should already know Pythagoras' theorem, $a^2 + b^2 = c^2$, and be able to simplify simple surds such as $\sqrt{50} = 5\sqrt{2}$.

## Key definitions

:::definition{term="Line segment"}
The part of a straight line between two end points, such as $AB$. Unlike a line, it has a definite length.
:::

:::definition{term="Midpoint"}
The point on a line segment that is exactly halfway between its two end points.
:::

:::formula{name="Length of a line segment"}
The distance between $(x_1, y_1)$ and $(x_2, y_2)$ is

$$
d = \sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}
$$
:::

:::formula{name="Midpoint of a line segment"}
The midpoint of the segment joining $(x_1, y_1)$ and $(x_2, y_2)$ is

$$
\left( \frac{x_1 + x_2}{2},\ \frac{y_1 + y_2}{2} \right)
$$
:::

## Why the length formula works

Draw the segment $AB$ and complete a right-angled triangle with a horizontal side and a vertical side. The horizontal side is the change in $x$ and the vertical side is the change in $y$. The segment $AB$ is the hypotenuse, so by Pythagoras

$$
AB^2 = (\text{change in } x)^2 + (\text{change in } y)^2
$$

Squaring removes any negative signs, so it does not matter which point you call $A$.

:::worked-solution[Example 1: the borehole and the school]
Find the length of the pipe from $(2, 3)$ to $(10, 9)$, where one unit is one kilometre.
1. Change in $x$: $10 - 2 = 8$.
2. Change in $y$: $9 - 3 = 6$.
3. $d^2 = 8^2 + 6^2 = 64 + 36 = 100$.
4. $d = \sqrt{100} = 10$, so the pipe is $10\ \text{km}$ long.
:::

:::worked-solution[Example 2: an answer that is a surd]
Find the length of $PQ$ for $P(-3, 4)$ and $Q(2, -1)$. Give the exact value and the value correct to 3 significant figures.
1. Change in $x$: $2 - (-3) = 5$.
2. Change in $y$: $-1 - 4 = -5$.
3. $PQ^2 = 5^2 + (-5)^2 = 25 + 25 = 50$.
4. $PQ = \sqrt{50} = \sqrt{25 \times 2} = 5\sqrt{2}$ exactly.
5. $5\sqrt{2} = 7.0710\ldots = 7.07$ (3 s.f.).
:::

## Finding the midpoint

The midpoint is halfway across and halfway up, so its coordinates are the **means** of the end points' coordinates.

:::worked-solution[Example 3: midpoint of $(-4, 7)$ and $(6, -1)$]
1. $x$-coordinate: $\frac{-4 + 6}{2} = \frac{2}{2} = 1$.
2. $y$-coordinate: $\frac{7 + (-1)}{2} = \frac{6}{2} = 3$.
3. The midpoint is $(1, 3)$.
:::

### Working backwards to a missing end point

If you know one end and the midpoint, the other end is the same distance beyond the midpoint.

:::worked-solution[Example 4: find the other end]
$M(2, 5)$ is the midpoint of $AB$, and $A$ is $(-1, 3)$. Find $B$.
1. From $A$ to $M$: $x$ increases by $2 - (-1) = 3$ and $y$ increases by $5 - 3 = 2$.
2. Make the same step again from $M$: $B = (2 + 3, 5 + 2) = (5, 7)$.
3. Check: the midpoint of $(-1, 3)$ and $(5, 7)$ is $\left(\frac{4}{2}, \frac{10}{2}\right) = (2, 5)$.
:::

An equivalent method uses the formula: $\frac{-1 + x}{2} = 2$ gives $x = 5$, and $\frac{3 + y}{2} = 5$ gives $y = 7$.

## Problems that combine ideas

:::worked-solution[Example 5: an isosceles triangle]
Show that the triangle with vertices $A(1, 1)$, $B(4, 7)$ and $C(7, 1)$ is isosceles, and find its area.
1. $AB = \sqrt{3^2 + 6^2} = \sqrt{45}$.
2. $BC = \sqrt{3^2 + (-6)^2} = \sqrt{45}$.
3. $AB = BC$, so the triangle is isosceles.
4. $AC$ is horizontal with length $6$. Its midpoint is $M(4, 1)$, directly below $B$, so the height $BM$ is $7 - 1 = 6$.
5. Area $= \frac{1}{2} \times 6 \times 6 = 18$ square units.
:::

:::worked-solution[Example 6: an unknown coordinate]
The distance from $(1, k)$ to $(4, 7)$ is $5$ units. Find the two possible values of $k$.
1. $(4 - 1)^2 + (7 - k)^2 = 5^2$.
2. $9 + (7 - k)^2 = 25$, so $(7 - k)^2 = 16$.
3. $7 - k = 4$ or $7 - k = -4$.
4. $k = 3$ or $k = 11$.
:::

## Common mistakes

:::mistake{title="Subtracting for the midpoint"}
The midpoint uses the **sum** of the coordinates divided by 2. Halving the difference, $\frac{6 - (-4)}{2} = 5$, gives half the horizontal length of the segment, not the midpoint.
:::

:::mistake{title="Square rooting each term separately"}
$\sqrt{8^2 + 6^2}$ is $\sqrt{100} = 10$, not $8 + 6 = 14$. Add the squares first, then take the square root of the total.
:::

:::mistake{title="Squaring negative differences wrongly"}
$(-5)^2 = 25$, not $-25$. On a calculator, put brackets round negative numbers before squaring.
:::

:::mistake{title="Rounding too early"}
Keep the exact value $\sqrt{50}$ (or the full calculator value) until the last step. Rounding $\sqrt{50}$ to $7.1$ and then using it in a later part loses accuracy.
:::

## Exam tips

:::exam-tip
If a question asks for an **exact** length, leave it as a surd in its simplest form, such as $5\sqrt{2}$. Otherwise give the answer correct to 3 significant figures, as Cambridge papers expect.
:::

:::exam-tip
A quick sketch of the points shows whether your answers are sensible: the midpoint must lie between the end points, and a length must be at least as long as both the horizontal and the vertical change.
:::

:::exam-tip
For "**show that** the triangle is isosceles" or "right-angled", calculate all the lengths you need, then write a concluding sentence, such as "$AB = BC = \sqrt{45}$, so the triangle is isosceles."
:::

## Summary

:::summary
- Length of $AB$: $\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$, which is Pythagoras' theorem on the grid.
- Midpoint: $\left(\frac{x_1 + x_2}{2}, \frac{y_1 + y_2}{2}\right)$, the mean of the coordinates.
- To find a missing end point, step the same distance past the midpoint.
- Leave exact answers as simplified surds; otherwise round to 3 significant figures at the end.
- Lengths let you prove triangles isosceles or right-angled.
:::
