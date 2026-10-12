---
{
  "key": "graphs.curve-sketching",
  "title": "Curve sketching and graphical solution of equations",
  "summary": "Sketch graphs of y = kx^n, quadratics, cubics and simple rational functions showing intercepts, turning points and asymptotes, and use sketches to count and locate the solutions of equations and inequalities.",
  "concepts": ["amaths.graphs.curve-sketching"],
  "estimatedMinutes": 40,
  "level": "core"
}
---
## Introduction

A sketch is not an accurate plot. It is a quick, labelled picture that shows the **shape** of a graph and its **key features**: where it crosses the axes, where it turns, and what happens far away or near a forbidden value. A good sketch lets you see at a glance how many solutions an equation has, or for which values of $x$ an expression is positive, before you do any algebra.

This topic is in the ZIMSEC Pure Mathematics syllabus (Form 5, *Graphs and coordinate geometry*): sketch $y = kx^{n}$ for integer $n$ and $n = \frac{1}{2}$, quadratic and cubic polynomials, and locate solutions of equations and inequalities using sketches. Cambridge 9709 treats this as assumed knowledge. You need factorising, completing the square and the factor theorem.

## Key definitions

:::definition{term="Intercepts"}
The points where a graph meets the axes: the $y$-intercept is at $x = 0$; the $x$-intercepts (roots) are where $y = 0$.
:::

:::definition{term="Asymptote"}
A line that a graph approaches more and more closely without reaching it, for example $x = 0$ and $y = 0$ for $y = \frac{1}{x}$.
:::

:::definition{term="Turning point"}
A point where the graph changes from increasing to decreasing (a maximum) or from decreasing to increasing (a minimum).
:::

:::keyfact{title="What every sketch should show"}
The correct general shape; all intercepts with their coordinates; turning points where they can be found (by completing the square for a quadratic, by differentiation for a cubic); asymptotes as dashed lines with their equations; the behaviour as $x \to \pm\infty$.
:::

## Graphs of y = kx^n

| $n$ | Shape for $k > 0$ | Example |
| :--- | :--- | :--- |
| positive even (2, 4) | $\cup$-shape through the origin, symmetrical about the $y$-axis | $y = 2x^{2}$ |
| positive odd (1, 3) | rises from bottom-left to top-right through the origin | $y = 2x^{3}$ |
| $-1$ | two branches in the 1st and 3rd quadrants, asymptotes $x = 0$, $y = 0$ | $y = \frac{3}{x}$ |
| $-2$ | two branches both above the $x$-axis, symmetrical about the $y$-axis | $y = \frac{3}{x^{2}}$ |
| $\frac{1}{2}$ | starts at the origin, rises ever more slowly; only $x \geq 0$ | $y = \sqrt{x}$ |

For $k < 0$, reflect the graph in the $x$-axis. A larger $|k|$ stretches the graph away from the $x$-axis.

## Cubic graphs

For a cubic $y = ax^{3} + \ldots$ with $a > 0$, the graph comes up from the bottom left and goes off to the top right; with $a < 0$ it is the other way round. Factorising gives the roots:

- a single factor $(x - p)$: the graph **crosses** the axis at $x = p$;
- a repeated factor $(x - p)^{2}$: the graph **touches** the axis at $x = p$ (a turning point on the axis).

:::worked-solution[Example 1: sketch $y = (x + 2)(x - 1)(x - 3)$]
1. Roots: $x = -2$, $x = 1$, $x = 3$, each crossed.
2. $y$-intercept: $(2)(-1)(-3) = 6$, so $(0, 6)$.
3. Expanding, the $x^{3}$ coefficient is $+1$: the curve rises from bottom-left to top-right.
4. So the curve crosses at $-2$, rises to a maximum between $-2$ and $1$ (passing through $(0, 6)$), falls to cross at $1$, reaches a minimum between $1$ and $3$, and rises through $3$.
5. Expanded form for reference: $y = x^{3} - 2x^{2} - 5x + 6$.
:::

![Graph of y = (x + 2)(x - 1)(x - 3), a cubic with a positive x^3 coefficient: it crosses the x-axis at -2, 1 and 3 and the y-axis at (0, 6), rising from bottom left to a maximum, falling to a minimum between 1 and 3 and rising again; it is above the axis for -2 < x < 1 and for x > 3.](media:diagrams/cubic-three-roots-sketch.png "Figure: the cubic crosses the x-axis at −2, 1 and 3 and the y-axis at (0, 6)")

:::worked-solution[Example 2: sketch $y = x^{2}(3 - x)$]
1. Roots: $x = 0$ (repeated, so the curve touches the axis) and $x = 3$ (crossed).
2. The $x^{3}$ coefficient is $-1$: the curve comes down from the top left and goes to the bottom right.
3. So it comes down to touch the axis at the origin (a minimum there), rises to a maximum between $0$ and $3$, then falls through $(3, 0)$.
4. Check a value: at $x = 2$, $y = 4(1) = 4 > 0$, consistent with the curve being above the axis between 0 and 3.
:::

## Simple rational functions

For $y = \dfrac{ax + b}{cx + d}$, divide to write it as a constant plus a fraction. The vertical asymptote is where the denominator is zero; the horizontal asymptote is the constant.

:::worked-solution[Example 3: sketch $y = \dfrac{2x + 1}{x - 1}$]
1. Rewrite: $\dfrac{2x + 1}{x - 1} = \dfrac{2(x - 1) + 3}{x - 1} = 2 + \dfrac{3}{x - 1}$.
2. Asymptotes: $x = 1$ (denominator zero) and $y = 2$ (as $x \to \pm\infty$, $\frac{3}{x - 1} \to 0$).
3. Intercepts: $x = 0$ gives $y = -1$; $y = 0$ gives $2x + 1 = 0$, $x = -\frac{1}{2}$.
4. Shape: the graph of $y = \frac{3}{x}$ translated by $\begin{pmatrix} 1 \\ 2 \end{pmatrix}$, with branches to the top right and bottom left of the point $(1, 2)$. The left branch passes through $\left(-\frac{1}{2}, 0\right)$ and $(0, -1)$.
:::

![Graph of y = (2x + 1)/(x - 1): a hyperbola with vertical asymptote x = 1 and horizontal asymptote y = 2; the left branch passes through (-1/2, 0) and (0, -1), and the right branch lies above y = 2.](media:diagrams/rational-two-x-plus-one-over-x-minus-one.png "Figure: y = 2 + 3/(x − 1) has asymptotes x = 1 and y = 2")

## Using sketches to solve equations and inequalities

The solutions of $f(x) = g(x)$ are the $x$-coordinates of the intersections of $y = f(x)$ and $y = g(x)$. A sketch shows **how many** solutions there are and roughly **where**.

:::worked-solution[Example 4: show that $x^{3} - 3x + 1 = 0$ has three real roots]
1. Rearrange: $x^{3} = 3x - 1$. Sketch $y = x^{3}$ and the line $y = 3x - 1$.
2. The line has gradient 3 and $y$-intercept $-1$; it crosses the cubic three times: once for $x < -1$, once between $0$ and $1$, and once between $1$ and $2$.
3. Check with values of $f(x) = x^{3} - 3x + 1$: $f(-2) = -1$, $f(-1) = 3$, $f(0) = 1$, $f(1) = -1$, $f(2) = 3$.
4. The sign changes between $-2$ and $-1$, between $0$ and $1$, and between $1$ and $2$ confirm three real roots.
:::

The roots are about $-1.88$, $0.347$ and $1.53$; numerical methods for finding them accurately come later in the course.

:::worked-solution[Example 5: solve $(x + 2)(x - 1)(x - 3) > 0$ using the sketch from Example 1]
1. The curve is above the $x$-axis between $-2$ and $1$ and to the right of $3$.
2. So $-2 < x < 1$ or $x > 3$.
:::

## Common mistakes

:::mistake{title="Crossing at a repeated root"}
At a repeated root such as $x^{2}(3 - x)$ at $x = 0$, the graph **touches** the axis and turns back; it does not cross.
:::

:::mistake{title="Wrong end behaviour"}
Check the sign of the $x^{3}$ coefficient after expanding. $y = x^{2}(3 - x)$ has leading term $-x^{3}$, so it ends at the bottom right.
:::

:::mistake{title="Letting a graph touch its asymptote"}
$y = 2 + \frac{3}{x - 1}$ never equals 2 and is never defined at $x = 1$. Draw the branches approaching the dashed lines without meeting them.
:::

:::mistake{title="Unlabelled sketches"}
A shape with no coordinates scores little. Label every intercept and asymptote with its value or equation.
:::

## Exam tips

:::exam-tip
"Sketch" means a neat freehand drawing showing the key features; "plot" or "draw" means accurate points on graph paper. Do not waste time plotting when asked to sketch.
:::

:::exam-tip
When asked how many roots an equation has, sketch the two sides as two graphs and count intersections; support the count with sign changes.
:::

:::exam-tip
For inequalities, mark on the sketch where one graph is above the other, and read off the $x$-intervals from the intersection points.
:::

## Summary

:::summary
- $y = kx^{n}$: even powers give $\cup$-shapes, odd powers rise through the origin, negative powers have asymptotes on the axes, $\sqrt{x}$ exists for $x \geq 0$.
- Cubics: factorise for roots; single roots cross, repeated roots touch; the sign of the $x^{3}$ term fixes the ends.
- $\frac{ax + b}{cx + d}$: write as a constant plus a fraction to find both asymptotes.
- Solutions of $f(x) = g(x)$ are the intersections of the two graphs; sign changes confirm them.
- Read inequalities from where a graph is above or below the axis or another graph.
:::
