---
{
  "key": "coordinate.gradient",
  "title": "Gradient of a straight line",
  "summary": "Measure the steepness of a straight line as the change in y divided by the change in x, from a grid or from two points, and interpret positive, negative, zero and undefined gradients.",
  "concepts": ["math.coordinate.gradient"],
  "objectives": ["zimsec/o-level/mathematics:5.1.2", "cambridge/igcse/mathematics:3.3.1", "cambridge/igcse/mathematics:3.3.2"],
  "estimatedMinutes": 25,
  "level": "core"
}
---
## Introduction

The road from Mutare up through Christmas Pass climbs steeply, while the road across the flat lowveld near Chiredzi hardly rises at all. Engineers describe how steep a road is with a single number: how far it rises for every metre travelled horizontally. A road that rises 1 m for every 8 m across has a steepness of $\frac{1}{8}$.

In coordinate geometry this number is called the **gradient** of a line. It tells you how steep the line is and whether it goes up or down as you move to the right. Gradient is one of the most important ideas in the course: it appears in equations of lines, parallel and perpendicular lines, travel graphs (speed), and later in calculus.

You should be able to plot coordinates and subtract negative numbers confidently.

## Key definitions

:::definition{term="Gradient"}
The steepness of a straight line: the change in $y$ divided by the corresponding change in $x$ between any two points on the line. It is often written $m$.
:::

:::formula{name="Gradient from two points"}
For the line through $(x_1, y_1)$ and $(x_2, y_2)$:

$$
m = \frac{\text{change in } y}{\text{change in } x} = \frac{y_2 - y_1}{x_2 - x_1}
$$
:::

:::keyfact{title="The four kinds of gradient"}
- **Positive**: the line rises from left to right.
- **Negative**: the line falls from left to right.
- **Zero**: the line is horizontal ($y$ does not change).
- **Undefined**: the line is vertical (the change in $x$ is zero, and we cannot divide by zero).
:::

The bigger the size of the gradient (ignoring its sign), the steeper the line. A line with gradient $-4$ is steeper than one with gradient $3$, but it slopes the other way.

![Four sketches of lines: a line rising left to right has a positive gradient, one falling has a negative gradient, a horizontal line has gradient zero, and a vertical line has an undefined gradient.](media:diagrams/gradient-four-kinds.png "Figure: the four kinds of gradient")

## Finding the gradient from a grid

On a grid, pick two points where the line crosses the grid exactly. Draw a right-angled triangle under (or over) the line, with a horizontal side and a vertical side.

![A line through (0, 1) and (2, 7) with a right-angled triangle drawn under it: the run is 2 units across and the rise is 6 units up, so the gradient is 6 divided by 2, which is 3.](media:diagrams/gradient-triangle-rise-run.png "Figure: gradient is rise over run, here 6 ÷ 2 = 3")

1. Count the horizontal distance (the **run**), always moving to the right.
2. Count the vertical distance (the **rise**): up is positive, down is negative.
3. Gradient $= \dfrac{\text{rise}}{\text{run}}$.

:::worked-solution[Example 1: a line on a grid through $(0, 1)$ and $(2, 7)$]
1. Moving from $(0, 1)$ to $(2, 7)$, the run is $2$ units to the right.
2. The rise is $7 - 1 = 6$ units up, so it is positive.
3. Gradient $= \frac{6}{2} = 3$. For every 1 unit across, the line goes up 3 units.
:::

### Watch the scales

If the two axes have different scales, count **units** (read from the axes), not squares. Suppose a line passes through $(0, 20)$ and $(8, 60)$ on a graph where each centimetre is 2 units across but 10 units up. Both distances are 4 cm on the paper, but the gradient is $\frac{60 - 20}{8 - 0} = \frac{40}{8} = 5$, not $1$.

## Finding the gradient from two points

When you know the coordinates of two points you do not need a diagram: use the formula. Keep the **same order** in the top and the bottom.

:::worked-solution[Example 2: the line through $(-2, 5)$ and $(4, -1)$]
1. Let $(x_1, y_1) = (-2, 5)$ and $(x_2, y_2) = (4, -1)$.
2. Change in $y$: $-1 - 5 = -6$.
3. Change in $x$: $4 - (-2) = 6$.
4. $m = \frac{-6}{6} = -1$. The gradient is negative, so the line falls from left to right.
:::

:::worked-solution[Example 3: a gradient that is a fraction]
Find the gradient of the line through $(-1, 3)$ and $(5, 7)$.
1. Change in $y$: $7 - 3 = 4$.
2. Change in $x$: $5 - (-1) = 6$.
3. $m = \frac{4}{6} = \frac{2}{3}$, in its lowest terms.
:::

:::example{title="Zero and undefined gradients"}
Through $(1, 3)$ and $(5, 3)$: $m = \frac{3 - 3}{5 - 1} = \frac{0}{4} = 0$. The line is horizontal ($y = 3$).

Through $(3, -2)$ and $(3, 4)$: the change in $x$ is $3 - 3 = 0$, so $\frac{6}{0}$ is undefined. The line is vertical ($x = 3$).
:::

## Using the gradient

Because the gradient of a straight line is the same everywhere along it, you can work backwards to find a missing coordinate, or test whether three points lie on one line.

:::worked-solution[Example 4: find a missing coordinate]
The line through $(2, k)$ and $(5, 11)$ has gradient $3$. Find $k$.
1. $\frac{11 - k}{5 - 2} = 3$.
2. $\frac{11 - k}{3} = 3$, so $11 - k = 9$.
3. $k = 2$. Check: from $(2, 2)$ to $(5, 11)$ is a rise of 9 over a run of 3, which is $3$.
:::

:::worked-solution[Example 5: are three points in a straight line?]
Show that $A(1, 2)$, $B(3, 6)$ and $C(4, 8)$ lie on a straight line.
1. Gradient of $AB = \frac{6 - 2}{3 - 1} = \frac{4}{2} = 2$.
2. Gradient of $BC = \frac{8 - 6}{4 - 3} = \frac{2}{1} = 2$.
3. The gradients are equal and $B$ is on both segments, so $A$, $B$ and $C$ are **collinear** (on one straight line).
:::

## Common mistakes

:::mistake{title="Putting the run on top"}
Gradient is $\frac{\text{change in } y}{\text{change in } x}$, not the other way round. Remember "rise over run", with the $y$ values on top. For the line through $(0, 1)$ and $(2, 7)$ the gradient is $\frac{6}{2} = 3$, not $\frac{2}{6} = \frac{1}{3}$.
:::

:::mistake{title="Mixing the order of subtraction"}
$\frac{-1 - 5}{-2 - 4}$ mixes the order: it gives $\frac{-6}{-6} = 1$ instead of $-1$. If you start the top with point 2, start the bottom with point 2 as well.
:::

:::mistake{title="Forgetting the minus sign"}
A line that falls from left to right must have a negative gradient. Look at your line (or sketch one) and check that the sign of your answer agrees.
:::

:::mistake{title="Confusing zero and undefined"}
A horizontal line has gradient $0$. A vertical line has no gradient (it is undefined), because you would have to divide by zero.
:::

## Exam tips

:::exam-tip
Show the fraction, such as $\frac{-6}{6}$, before you simplify. If you then make a slip, the method mark is still available.
:::

:::exam-tip
Give a gradient as an integer or a fraction in its lowest terms, such as $\frac{2}{3}$, unless the question asks for a decimal. A rounded decimal such as $0.67$ may lose the accuracy mark.
:::

:::exam-tip
On a grid, choose points far apart where the line crosses grid lines exactly. Small triangles magnify reading errors.
:::

## Summary

:::summary
- Gradient $= \dfrac{\text{change in } y}{\text{change in } x} = \dfrac{y_2 - y_1}{x_2 - x_1}$.
- Positive gradient: rising; negative: falling; zero: horizontal; undefined: vertical.
- On a grid, count units using the scales on the axes, not squares.
- Subtract in the same order on the top and the bottom.
- Equal gradients through a shared point show that points are collinear.
:::
