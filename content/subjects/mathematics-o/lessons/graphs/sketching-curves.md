---
{
  "key": "graphs.sketching-curves",
  "title": "Sketching curves",
  "summary": "Recognise and sketch linear, quadratic, cubic, reciprocal and exponential graphs, showing their intercepts, roots, symmetry, turning points and asymptotes, and find the turning point of a quadratic by completing the square.",
  "concepts": ["math.graphs.sketching-curves"],
  "objectives": ["cambridge/igcse/mathematics:2.11.1", "cambridge/igcse/mathematics:2.11.2"],
  "estimatedMinutes": 35,
  "level": "extended"
}
---
## Introduction

An engineer planning a footbridge over the Mukuvisi River does not need every point of the arch drawn to the millimetre at first. She needs its **shape**, where it meets the ground and how high it rises. A sketch gives exactly that.

A **sketch** of a graph is not plotted from a table. It shows the correct general shape and labels the important features: where the curve crosses the axes, its turning points, its line of symmetry and any asymptotes. Sketching is quicker than plotting and tests whether you really understand how an equation controls its graph.

Cambridge Core students need linear and quadratic sketches; Extended students also need cubic, reciprocal and exponential graphs. You should be able to factorise quadratics and complete the square.

## Key definitions

:::definition{term="Sketch"}
A neat drawing showing the shape of a graph and its key features, labelled with coordinates. It does not need to be to scale, and no table of values is needed.
:::

:::definition{term="Root (zero)"}
An $x$-value where the graph crosses or touches the $x$-axis, so $y = 0$.
:::

:::definition{term="Asymptote"}
A line that a curve gets closer and closer to without ever reaching it, such as the $x$-axis for $y = 2^x$.
:::

## Linear and quadratic graphs (Core and Extended)

A straight line is fixed by its two intercepts. For $x - 2y = 4$: putting $x = 0$ gives $y = -2$, and putting $y = 0$ gives $x = 4$; label $(0, -2)$ and $(4, 0)$.

For a quadratic $y = ax^2 + bx + c$:

- $a > 0$: $\cup$-shaped with a minimum. $a < 0$: $\cap$-shaped with a maximum.
- The **$y$-intercept** is $(0, c)$.
- The **roots** come from solving $ax^2 + bx + c = 0$, usually by factorising.
- The **line of symmetry** is halfway between the roots, and the turning point lies on it.

![Sketch of y = x² − 6x + 8: a U-shaped curve through (0, 8), crossing the x-axis at (2, 0) and (4, 0), with its minimum at (3, −1) on the dashed line of symmetry x = 3.](media:diagrams/sketch-quadratic-x2-6x-8.png "Figure: sketch with the intercepts, line of symmetry and turning point labelled")

:::worked-solution[Example 1: sketch $y = x^2 - 6x + 8$]
1. $a = 1 > 0$, so the curve is $\cup$-shaped.
2. $y$-intercept: $(0, 8)$.
3. Roots: $x^2 - 6x + 8 = (x - 2)(x - 4) = 0$, so $x = 2$ and $x = 4$.
4. Line of symmetry: halfway between 2 and 4, so $x = 3$.
5. Turning point: $y = 9 - 18 + 8 = -1$ at $x = 3$, so the minimum is $(3, -1)$.
6. Sketch a $\cup$ through $(0, 8)$, $(2, 0)$, $(4, 0)$ with its lowest point at $(3, -1)$, and label all four points.
:::

:::worked-solution[Example 2: sketch $y = -x^2 + 2x + 3$]
1. $a = -1 < 0$, so the curve is $\cap$-shaped.
2. $y$-intercept: $(0, 3)$.
3. Roots: $-x^2 + 2x + 3 = -(x^2 - 2x - 3) = -(x - 3)(x + 1)$, so $x = -1$ and $x = 3$.
4. Line of symmetry $x = 1$; maximum $y = -1 + 2 + 3 = 4$, so the turning point is $(1, 4)$.
:::

### Turning points by completing the square (Extended)

Writing $y = (x - p)^2 + q$ shows the turning point $(p, q)$ immediately, because $(x - p)^2 \geq 0$ and equals $0$ only when $x = p$.

:::worked-solution[Example 3: sketch $y = x^2 + 4x + 7$]
1. Complete the square: $x^2 + 4x = (x + 2)^2 - 4$, so $y = (x + 2)^2 + 3$.
2. Minimum point: $(-2, 3)$.
3. The minimum is above the $x$-axis, so the curve has **no roots**.
4. $y$-intercept: $(0, 7)$. Sketch a $\cup$ with lowest point $(-2, 3)$ passing through $(0, 7)$.
:::

## Cubic graphs (Extended)

For $y = ax^3 + \ldots$ with $a > 0$, the curve starts at the **bottom left** and ends at the **top right**; with $a < 0$ it starts top left and ends bottom right. In factorised form you can read the roots straight away.

:::worked-solution[Example 4: sketch $y = (x + 2)(x - 1)(x - 3)$]
1. Expanding would start with $x^3$, so $a = 1 > 0$: bottom left to top right.
2. Roots: $x = -2$, $x = 1$ and $x = 3$.
3. $y$-intercept: $(0 + 2)(0 - 1)(0 - 3) = 6$, so $(0, 6)$.
4. The curve rises through $(-2, 0)$ to a maximum, falls through $(0, 6)$ and $(1, 0)$ to a minimum, then rises through $(3, 0)$.
:::

A **repeated** factor means the curve **touches** the $x$-axis there instead of crossing it. For $y = x^2(x - 3)$ the curve touches the axis at the origin (a maximum point) and crosses it at $x = 3$.

![Sketch of y = (x + 2)(x − 1)(x − 3): a cubic that starts at the bottom left, crosses the x-axis at x = −2, rises to a maximum, passes through (0, 6), crosses at x = 1, dips to a minimum, then crosses at x = 3 and rises.](media:diagrams/sketch-cubic-three-roots.png "Figure: a cubic with three roots, crossing the axis at each")

## Reciprocal and exponential graphs (Extended)

:::keyfact{title="Reciprocal graphs y = a/x"}
Two branches, with asymptotes $x = 0$ (the $y$-axis) and $y = 0$ (the $x$-axis). If $a > 0$ the branches are in the first and third quadrants; if $a < 0$ they are in the second and fourth. The graph is symmetric about the lines $y = x$ and $y = -x$.
:::

:::keyfact{title="Exponential graphs y = b^x (b > 1)"}
Passes through $(0, 1)$, increases ever more steeply to the right, and approaches the asymptote $y = 0$ to the left; it is always above the $x$-axis. Adding a constant moves it up: $y = 2^x + 3$ has asymptote $y = 3$ and $y$-intercept $(0, 4)$. The graph of $y = 2^{-x}$ is the reflection of $y = 2^x$ in the $y$-axis (exponential decay).
:::

## Common mistakes

:::mistake{title="Wrong way up"}
$y = -x^2 + 2x + 3$ is $\cap$-shaped because the $x^2$ coefficient is negative. Check the sign of the leading term first.
:::

:::mistake{title="Sign errors in the roots"}
$(x - 2)(x - 4) = 0$ gives $x = +2$ and $x = +4$. The roots have the **opposite** sign to the numbers in the brackets.
:::

:::mistake{title="Turning point from completed square"}
$y = (x + 2)^2 + 3$ has its turning point at $(-2, 3)$, not $(2, 3)$.
:::

:::mistake{title="Crossing an asymptote"}
$y = \frac{4}{x}$ never touches either axis, and $y = 2^x$ never reaches the $x$-axis. Draw the curve getting close to the asymptote without meeting it.
:::

## Exam tips

:::exam-tip
A sketch earns marks for the **correct shape** and for each **labelled feature**: intercepts, roots, turning points and asymptotes. Write coordinates next to the points on your sketch.
:::

:::exam-tip
In multiple-choice "which graph" questions, test the easiest features first: the sign of the leading term (shape), then the $y$-intercept (put $x = 0$), then the roots.
:::

:::exam-tip
Use symmetry: once you know the roots of a quadratic, the turning point is on the vertical line halfway between them.
:::

## Summary

:::summary
- Quadratic: shape from the sign of $a$; $y$-intercept $(0, c)$; roots by factorising; symmetry halfway between the roots.
- $y = (x - p)^2 + q$ has turning point $(p, q)$.
- Cubic with positive $x^3$ term: bottom left to top right; a repeated root touches the axis.
- $y = \frac{a}{x}$: asymptotes $x = 0$ and $y = 0$; quadrants depend on the sign of $a$.
- $y = b^x$: through $(0, 1)$, asymptote $y = 0$; adding $k$ moves the asymptote to $y = k$.
:::
