---
{
  "key": "graphs.modulus-functions",
  "title": "Graphs of y = |f(x)|",
  "summary": "Obtain the graph of y = |f(x)| from y = f(x) by reflecting the parts below the x-axis, for linear, quadratic and trigonometric functions, describe its intercepts, cusps and key points, and use it to count the solutions of equations such as |f(x)| = k.",
  "concepts": ["amath.graphs.modulus-functions"],
  "estimatedMinutes": 30,
  "level": "core"
}
---
## Introduction

Cambridge 0606 questions often say "sketch the graph of $y = |f(x)|$" and then "hence find the number of solutions of $|f(x)| = k$". The sketch is quick once you know one rule, and it turns a hard algebra question (how many roots?) into a simple picture (how many times does a horizontal line cross the graph?).

This lesson covers moduli of linear, quadratic and trigonometric functions. Moduli of cubics are covered with cubic graphs. You need to be able to sketch straight lines, parabolas and the graphs of $\sin x$, $\cos x$ and $\tan x$, and to solve modulus equations.

## Key definitions

:::definition{term="Graph of y = |f(x)|"}
The graph of $y = f(x)$ with every part that lies **below** the $x$-axis reflected in the $x$-axis. Parts on or above the axis are unchanged.
:::

:::definition{term="Cusp"}
A sharp point (a V-shaped corner) where a reflected part of the graph meets the $x$-axis. At a cusp the graph has no single gradient.
:::

:::keyfact{title="What reflection does"}
Reflecting in the $x$-axis changes each point $(x, y)$ with $y < 0$ to $(x, -y)$. So $|f(x)| \geq 0$ everywhere, the $x$-intercepts stay where they are, a negative $y$-intercept $(0, c)$ becomes $(0, -c)$, and a minimum point below the axis becomes a maximum point above it.
:::

## Linear functions: the V shape

The graph of $y = |ax + b|$ is a V with its vertex (a cusp) on the $x$-axis at $x = -\frac{b}{a}$. The two arms have gradients $a$ and $-a$.

:::worked-solution[Example 1: describe the graph of $y = |2x - 6|$]
1. The line $y = 2x - 6$ crosses the $x$-axis at $x = 3$ and the $y$-axis at $(0, -6)$.
2. For $x < 3$ the line is below the axis, so that part is reflected: the $y$-intercept becomes $(0, 6)$.
3. The graph is a V with its vertex at $(3, 0)$; the right arm has gradient 2 and the left arm gradient $-2$.
4. A table of values shows the symmetry about $x = 3$.
:::

| $x$ | 0 | 1 | 2 | 3 | 4 | 5 | 6 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| $y$ | 6 | 4 | 2 | 0 | 2 | 4 | 6 |

## Quadratic functions: the reflected arch

For a U-shaped parabola that crosses the $x$-axis twice, the part between the roots is below the axis. Reflecting it gives an **arch** whose top is the reflection of the vertex, with a cusp at each root.

:::worked-solution[Example 2: describe $y = |x^2 - 2x - 8|$ and find the number of solutions of $|x^2 - 2x - 8| = k$ for $k = 5$, $9$ and $12$]
1. $x^2 - 2x - 8 = (x + 2)(x - 4)$, so the parabola crosses the $x$-axis at $(-2, 0)$ and $(4, 0)$, and its $y$-intercept is $(0, -8)$.
2. Completing the square, $x^2 - 2x - 8 = (x - 1)^2 - 9$: the vertex is $(1, -9)$.
3. Reflect the part between $x = -2$ and $x = 4$: the graph of $y = |x^2 - 2x - 8|$ has cusps at $(-2, 0)$ and $(4, 0)$, passes through $(0, 8)$, and the arch has a maximum point at $(1, 9)$. Outside the roots the graph rises steeply as before.
4. $k = 5$: the line $y = 5$ is below the top of the arch, so it crosses the arch twice and the outer branches twice: **4** solutions.
5. $k = 9$: the line touches the top of the arch once and crosses the outer branches twice: **3** solutions.
6. $k = 12$: the line is above the arch and meets only the outer branches: **2** solutions.
:::

:::keyfact{title="Counting solutions of |f(x)| = k for a quadratic with roots"}
If the reflected arch has height $h$: $k < 0$ gives none; $k = 0$ gives 2 (the roots); $0 < k < h$ gives 4; $k = h$ gives 3; $k > h$ gives 2.
:::

If the parabola does not cross the $x$-axis (negative discriminant and $a > 0$), it is never below the axis, so $y = |f(x)|$ is the same graph as $y = f(x)$.

## Trigonometric functions

For $y = |a \sin bx + c|$, $y = |a \cos bx + c|$ and $y = |a \tan bx + c|$, sketch the ordinary graph over the given interval first, then reflect any part below the axis. The key points are the maximum and minimum values, the $x$-intercepts (where the cusps will be) and the end points of the interval.

:::worked-solution[Example 3: describe $y = |2\cos x + 1|$ for $0^\circ \leq x \leq 360^\circ$]
1. $y = 2\cos x + 1$ has maximum $3$ (at $0^\circ$ and $360^\circ$) and minimum $-1$ (at $180^\circ$).
2. It meets the $x$-axis where $\cos x = -\frac{1}{2}$: $x = 120^\circ$ and $x = 240^\circ$.
3. Between $120^\circ$ and $240^\circ$ it is below the axis, so that part is reflected: the minimum $-1$ at $180^\circ$ becomes a maximum of $1$.
4. The graph of $y = |2\cos x + 1|$ falls from $(0, 3)$ to a cusp at $(120^\circ, 0)$, rises to $(180^\circ, 1)$, falls to a cusp at $(240^\circ, 0)$ and rises to $(360^\circ, 3)$.
:::

| $x$ | $0^\circ$ | $60^\circ$ | $90^\circ$ | $120^\circ$ | $180^\circ$ | $240^\circ$ | $270^\circ$ | $300^\circ$ | $360^\circ$ |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| $y$ | 3 | 2 | 1 | 0 | 1 | 0 | 1 | 2 | 3 |

From this graph, $|2\cos x + 1| = k$ has 4 solutions for $0 < k < 1$, 3 solutions for $k = 1$ (one at $180^\circ$), and 2 solutions for $1 < k \leq 3$.

For $y = |\tan x|$ every negative branch is reflected, so each branch falls to a cusp at a zero of $\tan x$ and then rises towards the next asymptote. The asymptotes do not move.

:::worked-solution[Example 4: solve $|1 - 2\sin x| = 1$ for $0^\circ \leq x \leq 360^\circ$, and check the number of solutions with a graph]
1. Either $1 - 2\sin x = 1$, so $\sin x = 0$, giving $x = 0^\circ, 180^\circ, 360^\circ$.
2. Or $1 - 2\sin x = -1$, so $\sin x = 1$, giving $x = 90^\circ$.
3. Graph: $y = 1 - 2\sin x$ goes from $1$ down to $-1$ at $90^\circ$ and back to $1$ at $180^\circ$, then up to $3$ at $270^\circ$. Reflecting the dip gives a peak of height $1$ at $90^\circ$.
4. The line $y = 1$ meets the graph at $0^\circ$, touches the reflected peak at $90^\circ$, and meets it again at $180^\circ$ and $360^\circ$: four solutions, $x = 0^\circ, 90^\circ, 180^\circ, 360^\circ$.
:::

## Describing a sketch in words

In this course you describe sketches; in the exam you draw them. A complete description gives:

- the shape (V, arch, reflected trigonometric wave);
- every $x$-intercept (cusp) with coordinates;
- the $y$-intercept;
- maximum and minimum points, including the top of each reflected part;
- end points of a restricted domain and any asymptotes.

## Common mistakes

:::mistake{title="Reflecting in the y-axis"}
$|f(x)|$ reflects parts **below the $x$-axis** in the $x$-axis. Reflecting in the $y$-axis gives $f(-x)$, a different graph.
:::

:::mistake{title="Smooth curves at the x-axis"}
Where a reflected part meets the axis there is a sharp cusp, not a smooth turning point. Draw a clear corner.
:::

:::mistake{title="Forgetting the reflected y-intercept"}
For $y = |x^2 - 2x - 8|$ the $y$-intercept is $(0, 8)$, not $(0, -8)$.
:::

:::mistake{title="Miscounting solutions at the top of an arch"}
When $k$ equals the height of the arch, the line touches it once: one solution there, not two.
:::

## Exam tips

:::exam-tip
"Sketch" questions are marked on shape, the coordinates of intercepts and cusps, and the turning points. Label them all; the graph does not need to be to scale.
:::

:::exam-tip
For "the number of solutions of $|f(x)| = k$", find the height of every reflected part first: the answer changes exactly at those heights and at $k = 0$.
:::

:::exam-tip
For trigonometric moduli, respect the interval given (degrees or radians) and include end points when the inequality is $\leq$.
:::

## Summary

:::summary
- $y = |f(x)|$: keep the parts of $y = f(x)$ on or above the $x$-axis and reflect the parts below it.
- $x$-intercepts stay; they become cusps where a part was reflected.
- A linear modulus is a V; a quadratic with two roots gives an arch of height equal to the depth of the vertex.
- For trigonometric graphs, reflect each negative section; maxima and minima of the reflected parts change sign.
- Count solutions of $|f(x)| = k$ by drawing the horizontal line $y = k$.
:::
