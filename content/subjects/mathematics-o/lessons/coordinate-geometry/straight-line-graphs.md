---
{
  "key": "coordinate.linear-graphs",
  "title": "Drawing straight-line graphs",
  "summary": "Draw the graph of a linear equation from a table of values or from its intercepts, recognise the horizontal lines y = b and vertical lines x = a, and check whether a point lies on a line.",
  "concepts": ["math.coordinate.linear-graphs"],
  "objectives": ["zimsec/o-level/mathematics:5.1.2", "cambridge/igcse/mathematics:3.2.1"],
  "estimatedMinutes": 25,
  "freePreview": true,
  "level": "core"
}
---
## Introduction

A plumber in Gweru charges a call-out fee of US\$10 plus US\$15 for every hour of work. If a job takes $h$ hours, the bill is $C = 15h + 10$ dollars. Plot the bill for 1, 2, 3 and 4 hours and the points lie in a perfectly straight line. Equations like this, in which neither variable is squared or multiplied by the other, are called **linear** because their graphs are straight lines.

Straight-line graphs appear throughout O-Level and IGCSE Mathematics: in conversion graphs, travel graphs, simultaneous equations, inequalities and linear programming. In this lesson you will learn two reliable ways of drawing them.

You should already be able to plot coordinates in all four quadrants and substitute positive and negative numbers into a formula.

## Key definitions

:::definition{term="Linear equation"}
An equation in two variables whose graph is a straight line, such as $y = 2x - 3$ or $2x + 3y = 12$. The variables appear only to the power 1, and are not multiplied together.
:::

:::definition{term="Table of values"}
A table of chosen $x$-values and the matching $y$-values worked out from the equation. Each column gives one point to plot.
:::

:::definition{term="Intercepts"}
The **$y$-intercept** is where a line crosses the $y$-axis (where $x = 0$). The **$x$-intercept** is where it crosses the $x$-axis (where $y = 0$).
:::

## Method 1: a table of values

For an equation such as $y = mx + c$:

1. Choose at least three $x$-values across the required range. Two points fix a line; the third is a check.
2. Substitute each $x$-value to find $y$. Use brackets for negative numbers.
3. Plot the points and join them with a ruler, drawing the line across the **whole** range asked for.

:::worked-solution[Example 1: draw $y = 2x - 3$ for $-2 \leq x \leq 3$]
1. Work out $y$ for each $x$-value. For $x = -2$: $y = 2(-2) - 3 = -4 - 3 = -7$.
2. Complete the table in the same way:

   | $x$ | $-2$ | $-1$ | $0$ | $1$ | $2$ | $3$ |
   | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
   | $y$ | $-7$ | $-5$ | $-3$ | $-1$ | $1$ | $3$ |

3. Choose a scale: $y$ runs from $-7$ to $3$, so the $y$-axis must cover at least that range.
4. Plot the six points. They lie in a straight line; if one does not, recheck its calculation.
5. Join them with a single ruled line from $x = -2$ to $x = 3$.
:::

Notice the pattern in the table: each time $x$ increases by 1, $y$ increases by 2. Equal steps in $x$ always give equal steps in $y$ for a straight line, which is a quick way to spot an arithmetic slip.

![Graph of y = 2x − 3 for x from −2 to 3: the six table points (−2, −7), (−1, −5), (0, −3), (1, −1), (2, 1) and (3, 3) lie on one straight line that rises 2 units for every 1 unit across.](media:diagrams/linear-y-2x-minus-3.png "Figure: the six points of the table lie on one ruled line")

## Horizontal and vertical lines

Some lines have only one variable in their equation.

:::keyfact{title="Lines parallel to the axes"}
$y = b$ is a **horizontal** line through $(0, b)$: every point on it has $y$-coordinate $b$.

$x = a$ is a **vertical** line through $(a, 0)$: every point on it has $x$-coordinate $a$.

The $x$-axis is the line $y = 0$ and the $y$-axis is the line $x = 0$.
:::

:::example{title="Where two such lines meet"}
The lines $x = 2$ and $y = -5$ cross at the point that has $x = 2$ **and** $y = -5$, which is $(2, -5)$.
:::

## Method 2: the intercepts of $ax + by = c$

When the equation has the form $ax + by = c$, the quickest points to find are where the line meets the axes.

:::worked-solution[Example 2: draw $2x + 3y = 12$]
1. Put $x = 0$: $3y = 12$, so $y = 4$. The line passes through $(0, 4)$.
2. Put $y = 0$: $2x = 12$, so $x = 6$. The line passes through $(6, 0)$.
3. Check with a third point. Put $x = 3$: $6 + 3y = 12$, so $3y = 6$ and $y = 2$. The point $(3, 2)$ should lie on your line.
4. Plot $(0, 4)$, $(6, 0)$ and $(3, 2)$ and rule the line through them.
:::

This is sometimes called the **cover-up method**: cover the $x$ term to find the $y$-intercept, and cover the $y$ term to find the $x$-intercept.

![Graph of 2x + 3y = 12: the line crosses the y-axis at (0, 4) and the x-axis at (6, 0), and the check point (3, 2) also lies on it.](media:diagrams/linear-2x-3y-12-intercepts.png "Figure: the intercepts and a check point fix the line 2x + 3y = 12")

:::worked-solution[Example 3: draw $x - 2y = 4$ for $-2 \leq x \leq 6$]
1. Rearrange to make $y$ the subject: $2y = x - 4$, so $y = \frac{x - 4}{2}$.
2. Choose even $x$-values to avoid fractions:

   | $x$ | $-2$ | $0$ | $2$ | $4$ | $6$ |
   | :---: | :---: | :---: | :---: | :---: | :---: |
   | $y$ | $-3$ | $-2$ | $-1$ | $0$ | $1$ |

3. Plot the points and rule the line from $x = -2$ to $x = 6$. It crosses the $y$-axis at $(0, -2)$ and the $x$-axis at $(4, 0)$.
:::

## Does a point lie on a line?

A point lies on a line exactly when its coordinates **satisfy** the equation.

:::worked-solution[Example 4: check points against $y = 2x - 1$]
1. Test $(3, 5)$: $2(3) - 1 = 5$. This equals the $y$-coordinate, so $(3, 5)$ is on the line.
2. Test $(-2, -4)$: $2(-2) - 1 = -5$, not $-4$, so $(-2, -4)$ is not on the line.
3. If $(k, 9)$ is on the line, then $2k - 1 = 9$, so $2k = 10$ and $k = 5$.
:::

## Common mistakes

:::mistake{title="Arithmetic with negative numbers"}
For $y = 5 - 2x$ at $x = -3$, the answer is $5 - 2(-3) = 5 + 6 = 11$, not $-1$. Always put negative values in brackets.
:::

:::mistake{title="Mixing up horizontal and vertical lines"}
$y = 3$ is horizontal, not vertical. Think "every point has $y = 3$", and plot a few such points, such as $(0, 3)$ and $(4, 3)$, to see the shape.
:::

:::mistake{title="Drawing only between the plotted points"}
If the question says $-2 \leq x \leq 3$, the line must run from $x = -2$ to $x = 3$, not just between the points you happen to have plotted.
:::

:::mistake{title="Joining points by hand"}
Straight-line graphs must be ruled. A freehand line loses accuracy marks and makes later readings unreliable.
:::

## Exam tips

:::exam-tip
"**Complete the table**" usually earns one mark for every one or two correct values, so check each value by looking for the equal-step pattern before you plot.
:::

:::exam-tip
In Cambridge Core papers, equations are given as $y = mx + c$ unless a table of values is provided. In Extended and ZIMSEC papers you may have to draw $ax + by = c$ yourself: use the intercepts and a third checking point.
:::

:::exam-tip
When a later part asks you to **use your graph**, draw clear construction lines on the graph to show where you read the value. The examiner gives credit for readings consistent with your line.
:::

## Summary

:::summary
- A linear equation has a straight-line graph; plot at least three points and join them with a ruler.
- Use a table of values for $y = mx + c$; use the intercepts (put $x = 0$, then $y = 0$) for $ax + by = c$.
- $y = b$ is horizontal, $x = a$ is vertical; the axes are $y = 0$ and $x = 0$.
- A point lies on a line when its coordinates satisfy the equation.
- Draw the line across the full range of $x$-values asked for.
:::
