---
{
  "key": "graphs.functions",
  "title": "Graphs of functions and solving equations graphically",
  "summary": "Complete tables of values and draw graphs of quadratic, cubic, reciprocal and exponential functions, read off values and turning points, and solve equations from the intersections of graphs, including choosing a suitable straight line.",
  "concepts": ["math.graphs.functions"],
  "objectives": ["zimsec/o-level/mathematics:5.1.3", "zimsec/o-level/mathematics:5.1.4", "cambridge/igcse/mathematics:2.10.1", "cambridge/igcse/mathematics:2.10.2", "cambridge/igcse/mathematics:2.10.3"],
  "estimatedMinutes": 40,
  "level": "extended"
}
---
## Introduction

When a farmer near Gweru throws a stone across a field, it rises and falls along a curve. The profit a small business makes as it changes its price often rises to a peak and then falls. Relationships like these are not straight lines, and their graphs are **curves**.

Long examination questions often ask you to complete a table of values, plot a curve, and then use it to solve equations. Such a question is worth many marks, and most of them are for careful, accurate work rather than clever ideas.

You should already be able to substitute negative numbers into expressions and draw straight-line graphs.

## Key definitions

:::definition{term="Quadratic graph (parabola)"}
The graph of $y = ax^2 + bx + c$. It is $\cup$-shaped when $a > 0$ and $\cap$-shaped when $a < 0$, with one **turning point** and a vertical line of symmetry.
:::

:::definition{term="Cubic graph"}
The graph of $y = ax^3 + bx^2 + cx + d$. It often has an S-shape with two turning points.
:::

:::definition{term="Reciprocal graph"}
The graph of $y = \frac{a}{x}$. It has two separate branches and never meets either axis, because $x = 0$ is not allowed and $y$ can never be $0$.
:::

:::definition{term="Exponential graph"}
The graph of $y = a^x$ (with $a > 0$, $a \neq 1$), such as $y = 2^x$. It passes through $(0, 1)$. When $a > 1$ it grows ever more steeply as $x$ increases and gets closer and closer to the $x$-axis as $x$ decreases; when $0 < a < 1$ the graph is the mirror image (exponential decay).
:::

:::definition{term="Turning point"}
A point where the graph changes from going down to going up (a **minimum**) or from going up to going down (a **maximum**).
:::

## Tables of values

Work out each value carefully, one term at a time. Negative numbers cause most errors, so use brackets.

:::worked-solution[Example 1: $y = x^2 - 2x - 3$ for $-2 \leq x \leq 4$]
1. For $x = -2$: $(-2)^2 - 2(-2) - 3 = 4 + 4 - 3 = 5$.
2. Complete the table in the same way:

   | $x$ | $-2$ | $-1$ | $0$ | $1$ | $2$ | $3$ | $4$ |
   | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
   | $y$ | $5$ | $0$ | $-3$ | $-4$ | $-3$ | $0$ | $5$ |

3. Check the symmetry: the values repeat either side of $x = 1$, so the line of symmetry is $x = 1$.
4. Plot the points and join them with a smooth $\cup$-shaped curve. The minimum point is $(1, -4)$.
:::

:::example{title="Careful with a negative squared term"}
For $y = -x^2 + 4$ at $x = -3$: $-(-3)^2 + 4 = -9 + 4 = -5$. Square first, then apply the minus sign.
:::

## Drawing the curve

- Plot every point accurately with a small cross.
- Join the points with **one smooth curve**, drawn freehand. Do not join them with straight-line segments.
- Near a turning point the curve is rounded. If the two lowest table values are equal, the curve dips **below** them between them: $y = x^2 - x - 2$ is $-2$ at both $x = 0$ and $x = 1$, but its minimum is $-2.25$ at $x = 0.5$.
- For a reciprocal graph, draw two separate branches and never cross $x = 0$.

## Other curves you must know

:::worked-solution[Example 2: a reciprocal graph $y = \frac{6}{x}$]
1. For positive $x$: $x = 1, 2, 3, 4, 5, 6$ gives $y = 6, 3, 2, 1.5, 1.2, 1$.
2. For negative $x$ the values are negative: $x = -2$ gives $y = -3$, and so on.
3. Draw two smooth branches, one in the first quadrant and one in the third. Neither branch touches an axis.
:::

:::worked-solution[Example 3: a cubic $y = x^3 - 3x + 1$ for $-2 \leq x \leq 2$]
1. $x = -2$: $-8 + 6 + 1 = -1$. $x = -1$: $-1 + 3 + 1 = 3$. $x = 0$: $1$. $x = 1$: $1 - 3 + 1 = -1$. $x = 2$: $8 - 6 + 1 = 3$.
2. Half-values help near the turning points: $x = 1.5$ gives $3.375 - 4.5 + 1 = -0.125$.
3. The curve rises to a maximum near $(-1, 3)$, falls to a minimum near $(1, -1)$, then rises again.
:::

For an exponential such as $y = 2^x$: $x = -2, -1, 0, 1, 2, 3$ gives $y = 0.25, 0.5, 1, 2, 4, 8$. The curve passes through $(0, 1)$ and is always above the $x$-axis (Cambridge Extended).

## Solving equations graphically

The solutions of an equation are the $x$-coordinates where two graphs meet.

- Solutions of $f(x) = 0$: where the curve $y = f(x)$ crosses the $x$-axis.
- Solutions of $f(x) = k$: where the curve meets the horizontal line $y = k$.
- Solutions of $f(x) = g(x)$: where the curve meets the graph of $y = g(x)$.

:::worked-solution[Example 4: reading solutions from $y = x^2 - 2x - 3$]
1. $x^2 - 2x - 3 = 0$: the curve crosses the $x$-axis at $x = -1$ and $x = 3$.
2. $x^2 - 2x - 3 = 2$: draw the line $y = 2$. It meets the curve at about $x = -1.4$ and $x = 3.4$.
3. (Check: $x^2 - 2x - 5 = 0$ gives $x = 1 \pm \sqrt{6}$, that is $-1.45$ and $3.45$; graph readings are accepted within a small tolerance.)
:::

### Choosing a suitable straight line

If you have the graph of $y = x^2 - 2x - 3$ and must solve a **different** equation, such as $x^2 - 3x - 1 = 0$, rearrange the new equation so that the curve's expression is on one side.

:::worked-solution[Example 5: which line should you draw?]
1. Start with $x^2 - 3x - 1 = 0$.
2. You want $x^2 - 2x - 3$ on the left. Add $x$ to both sides and subtract $2$: $x^2 - 2x - 3 = x - 2$.
3. So draw the line $y = x - 2$ on the same grid.
4. Its intersections with the curve give $x \approx -0.3$ and $x \approx 3.3$.
:::

## Common mistakes

:::mistake{title="Squaring negative numbers wrongly"}
$(-2)^2 = 4$, but $-x^2$ at $x = -2$ is $-4$. Write the bracket every time.
:::

:::mistake{title="Joining points with a ruler"}
Curves must be smooth. Straight segments between points, or a flat bottom between two equal values, lose the curve mark.
:::

:::mistake{title="Joining the branches of a reciprocal graph"}
$y = \frac{6}{x}$ is not defined at $x = 0$. Never draw across the $y$-axis between the branches.
:::

:::mistake{title="Errors in the rearrangement"}
When choosing a line, whatever you do to one side you must do to the other. Check by subtracting: $(x^2 - 2x - 3) - (x - 2) = x^2 - 3x - 1$.
:::

## Exam tips

:::exam-tip
Before plotting, check your table for symmetry (quadratics) or a smooth pattern. One odd value usually means an arithmetic slip, and a wrong point costs both a table mark and a plotting mark.
:::

:::exam-tip
Answers read from a graph are marked with a tolerance, usually about half a small square. Give them to the accuracy of the grid, often 1 decimal place, and draw the line you used.
:::

:::exam-tip
"**By drawing a suitable straight line**" means: rearrange, write down the line's equation, draw it accurately, then read the $x$-coordinates of the intersections.
:::

## Summary

:::summary
- Complete tables of values carefully, with brackets round negative numbers.
- Join plotted points with a smooth curve; reciprocal graphs have two separate branches.
- Quadratics are symmetric about a vertical line through the turning point.
- Solutions of $f(x) = g(x)$ are the $x$-coordinates of the intersections of $y = f(x)$ and $y = g(x)$.
- To solve a new equation, rearrange it to "curve $=$ line" and draw that line.
:::
