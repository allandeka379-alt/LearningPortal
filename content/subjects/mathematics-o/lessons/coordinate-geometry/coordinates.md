---
{
  "key": "coordinate.coordinates",
  "title": "Coordinates in four quadrants",
  "summary": "Use the x- and y-axes to describe the position of any point with an ordered pair, plot and read points in all four quadrants, and use coordinates to find missing corners and distances on a grid.",
  "concepts": ["math.coordinate.coordinates"],
  "objectives": ["cambridge/igcse/mathematics:3.1.1"],
  "estimatedMinutes": 20,
  "level": "core"
}
---
## Introduction

When Farai describes where his desk is in a classroom, he might say "third row, fifth seat". Two numbers, given in an agreed order, are enough to pin down one position exactly. Maps of Harare, seat plans in a stadium and the grid on a chess board all work this way.

In mathematics we use a grid called the **Cartesian plane**. Every point on it is described by two numbers called its **coordinates**. Coordinates are the starting point for everything in this part of the course: straight-line graphs, gradients, curves, inequalities and vectors all use them.

You should already be comfortable with negative numbers on a number line, because the grid extends to the left of and below zero.

## Key definitions

:::definition{term="Axes"}
Two number lines that cross at right angles. The horizontal line is the **$x$-axis** and the vertical line is the **$y$-axis**.
:::

:::definition{term="Origin"}
The point where the axes cross. Its coordinates are $(0, 0)$, and it is often labelled $O$.
:::

:::definition{term="Coordinates"}
An ordered pair $(x, y)$ that gives the position of a point. The **$x$-coordinate** (horizontal position) always comes first and the **$y$-coordinate** (vertical position) second.
:::

:::definition{term="Quadrants"}
The four regions into which the axes divide the plane. They are numbered first to fourth **anticlockwise**, starting from the top right.
:::

## Reading and plotting points

To plot the point $(x, y)$, start at the origin, move $x$ units **across** (right if $x$ is positive, left if it is negative), then $y$ units **up or down** (up if $y$ is positive, down if it is negative). Mark the point with a small, neat cross.

A useful memory aid: "along the corridor, then up (or down) the stairs". You must walk along the corridor before you can use the stairs, so $x$ comes before $y$.

To read the coordinates of a point, reverse the process: drop a vertical line to the $x$-axis to read $x$, then a horizontal line to the $y$-axis to read $y$.

### The four quadrants

The signs of the coordinates tell you which quadrant a point is in.

| Quadrant | Position | Sign of $x$ | Sign of $y$ | Example |
| :---: | :---: | :---: | :---: | :---: |
| First | top right | $+$ | $+$ | $(3, 2)$ |
| Second | top left | $-$ | $+$ | $(-3, 2)$ |
| Third | bottom left | $-$ | $-$ | $(-3, -2)$ |
| Fourth | bottom right | $+$ | $-$ | $(3, -2)$ |

### Points on the axes

A point on an axis is not in any quadrant.

:::keyfact{title="Points on the axes"}
Every point on the $x$-axis has $y$-coordinate $0$, for example $(5, 0)$.

Every point on the $y$-axis has $x$-coordinate $0$, for example $(0, -4)$.
:::

### Scales

In an examination the axes are not always marked one unit per square. Before you plot or read anything, check the scale: if the labels go $0, 2, 4, 6$, then each small square is worth $2$ units and the point $(3, 5)$ lies halfway between grid lines.

## Worked examples

:::worked-solution[Example 1: describe the position of a point]
Point $P$ is 4 units to the left of the $y$-axis and 3 units below the $x$-axis. Write down its coordinates and its quadrant.
1. Left of the $y$-axis means the $x$-coordinate is negative: $x = -4$.
2. Below the $x$-axis means the $y$-coordinate is negative: $y = -3$.
3. Write $x$ first: $P$ is $(-4, -3)$.
4. Both coordinates are negative, so $P$ is in the **third** quadrant.
:::

:::worked-solution[Example 2: the fourth corner of a rectangle]
$A(-2, 1)$, $B(4, 1)$ and $C(4, -3)$ are three corners of a rectangle $ABCD$. Find $D$ and the area of the rectangle.
1. $A$ and $B$ have the same $y$-coordinate, so $AB$ is horizontal. $B$ and $C$ have the same $x$-coordinate, so $BC$ is vertical.
2. $D$ must be directly below $A$ (same $x$ as $A$) and level with $C$ (same $y$ as $C$): $D$ is $(-2, -3)$.
3. Length $AB = 4 - (-2) = 6$ units.
4. Length $BC = 1 - (-3) = 4$ units.
5. Area $= 6 \times 4 = 24$ square units.
:::

The length of a horizontal line is the **difference of the $x$-coordinates**, and the length of a vertical line is the **difference of the $y$-coordinates**. When one coordinate is negative, subtracting a negative number adds: $4 - (-2) = 6$.

:::worked-solution[Example 3: the fourth corner of a parallelogram]
$P(1, 2)$, $Q(5, 2)$ and $R(6, 5)$ are three vertices of a parallelogram $PQRS$. Find $S$.
1. In a parallelogram $PQRS$, side $SR$ is parallel and equal to side $PQ$, and side $PS$ is parallel and equal to side $QR$.
2. To get from $Q$ to $R$ you move $1$ unit right and $3$ units up.
3. Make the same move from $P$: $S$ is $(1 + 1, 2 + 3) = (2, 5)$.
4. Check: from $S(2, 5)$ to $R(6, 5)$ is 4 units right, the same as from $P$ to $Q$.
:::

:::worked-solution[Example 4: a point on an axis]
The point $(2a - 6, 4)$ lies on the $y$-axis. Find $a$.
1. A point on the $y$-axis has $x$-coordinate $0$.
2. So $2a - 6 = 0$.
3. $2a = 6$, so $a = 3$, and the point is $(0, 4)$.
:::

## Common mistakes

:::mistake{title="Writing the coordinates the wrong way round"}
The point 2 across and 5 up is $(2, 5)$, not $(5, 2)$. These are different points. Always write the horizontal ($x$) value first.
:::

:::mistake{title="Ignoring the scale"}
If each small square represents 2 units, a point 3 squares to the right has $x = 6$, not $x = 3$. Read the numbers on the axes, not the number of squares.
:::

:::mistake{title="Mixing up the axes"}
The point $(0, 3)$ is on the **$y$-axis**, not the $x$-axis: it is 0 across and 3 up. Points on the $x$-axis look like $(3, 0)$.
:::

:::mistake{title="Sign errors when finding lengths"}
The distance from $x = -2$ to $x = 4$ is $4 - (-2) = 6$, not $4 - 2 = 2$. Count the squares to check.
:::

## Exam tips

:::exam-tip
When asked to **plot** points, use a sharp pencil, mark each point with a small cross and label it with its letter. Points must usually be within half a small square to earn the mark.
:::

:::exam-tip
When asked to **write down** coordinates, give them in brackets with a comma, such as $(-3, 4)$. No working is expected, so check each sign carefully.
:::

:::exam-tip
In "find the fourth vertex" questions, sketch the shape roughly on rough paper first. A quick sketch shows which corner is missing and catches sign errors.
:::

## Summary

:::summary
- A point is written $(x, y)$: across first, then up or down.
- The axes divide the plane into four quadrants, numbered anticlockwise from the top right.
- Points on the $x$-axis have $y = 0$; points on the $y$-axis have $x = 0$.
- Horizontal lengths are differences of $x$-coordinates; vertical lengths are differences of $y$-coordinates.
- Always check the scale on each axis before plotting or reading.
:::
