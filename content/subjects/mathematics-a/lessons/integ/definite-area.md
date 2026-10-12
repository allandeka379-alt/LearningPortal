---
{
  "key": "integ.definite-area",
  "title": "Definite integrals and areas",
  "summary": "Evaluate definite integrals, including simple improper integrals, and find areas bounded by a curve and the axes or lines, between a curve and a line, and between two curves, handling regions below the x-axis correctly.",
  "concepts": ["amaths.integ.definite-area"],
  "estimatedMinutes": 45,
  "level": "core"
}
---
## Introduction

An indefinite integral is a family of functions. A **definite integral** is a single number: the integral evaluated between two limits. Its most important meaning is an **area**. If a graph shows the rate at which water flows into Lake Kariba over a month, the area under it is the total volume that flowed in; the area under a speed–time graph is a distance.

This lesson shows how to evaluate definite integrals, how to use them for areas (under a curve, between a curve and a line, between two curves, and against the $y$-axis), and how to handle the two traps: regions **below** the $x$-axis, and **improper** integrals with an infinite limit or an integrand that is unbounded.

ZIMSEC Pure Mathematics (Form 5) and Cambridge 9709 Paper 1 (topic 1.8) both examine this. You need to integrate powers of $x$ and of $(ax + b)$.

## Key definitions

:::formula{name="Definite integral"}
If $F'(x) = f(x)$, then

$$
\int_{a}^{b} f(x)\,dx = \Big[F(x)\Big]_{a}^{b} = F(b) - F(a).
$$

The constant of integration cancels, so it is left out. Not printed in MF19.
:::

:::definition{term="Area under a curve"}
If $f(x) \geq 0$ for $a \leq x \leq b$, the area between $y = f(x)$, the $x$-axis and the lines $x = a$, $x = b$ is $\int_{a}^{b} f(x)\,dx$. If $f(x) \leq 0$ there, the integral is **negative** and the area is its absolute value.
:::

:::formula{name="Area between two curves"}
If $y_{1} \geq y_{2}$ for $a \leq x \leq b$, the area between them is

$$
\int_{a}^{b} (y_{1} - y_{2})\,dx \quad (\text{upper minus lower}).
$$
:::

:::definition{term="Improper integral"}
An integral with an infinite limit, such as $\int_{1}^{\infty} x^{-2}\,dx$, or whose integrand is unbounded at a limit, such as $\int_{0}^{1} x^{-\frac{1}{2}}\,dx$. It is evaluated as a limit and may or may not have a finite value.
:::

## Evaluating definite integrals

Integrate, write the result in square brackets with the limits, substitute the upper limit, then subtract the value at the lower limit.

:::worked-solution[Example 1: evaluate $\displaystyle\int_{1}^{3}(3x^{2} - 2x)\,dx$]
1. Integrate: $\Big[x^{3} - x^{2}\Big]_{1}^{3}$.
2. Upper limit: $27 - 9 = 18$.
3. Lower limit: $1 - 1 = 0$.
4. Answer: $18 - 0 = 18$.
:::

## Areas and the x-axis

When the curve is below the $x$-axis, $y$ is negative, so the integral is negative. If a region lies partly above and partly below, the two parts **cancel** in a single integral. Always sketch the curve and find where it crosses the axis; then integrate each part separately and add the absolute values.

:::worked-solution[Example 2: the area between $y = x^{2} - 4x$ and the $x$-axis]
1. The curve crosses the $x$-axis where $x(x - 4) = 0$, at $x = 0$ and $x = 4$; between them it is below the axis.
2. $\displaystyle\int_{0}^{4}(x^{2} - 4x)\,dx = \Big[\tfrac{x^{3}}{3} - 2x^{2}\Big]_{0}^{4} = \tfrac{64}{3} - 32 = -\tfrac{32}{3}$.
3. The negative sign confirms the region is below the axis.
4. Area $= \dfrac{32}{3}$ square units.
:::

## Area between a curve and a line, or two curves

Find the $x$-coordinates of the points of intersection: they are the limits. Then integrate "upper minus lower". This works even if part of the region is below the $x$-axis, because the difference of the heights is what matters.

:::worked-solution[Example 3: the region between $y = 8 - x^{2}$ and $y = 2x$]
1. Intersections: $8 - x^{2} = 2x$, so $x^{2} + 2x - 8 = 0$, $(x + 4)(x - 2) = 0$, giving $x = -4$ and $x = 2$.
2. Between them the parabola is above the line (try $x = 0$: $8 > 0$).
3. Area $= \displaystyle\int_{-4}^{2}(8 - x^{2} - 2x)\,dx = \Big[8x - \tfrac{x^{3}}{3} - x^{2}\Big]_{-4}^{2}$.
4. At $x = 2$: $16 - \tfrac{8}{3} - 4 = \tfrac{28}{3}$. At $x = -4$: $-32 + \tfrac{64}{3} - 16 = -\tfrac{80}{3}$.
5. Area $= \tfrac{28}{3} + \tfrac{80}{3} = 36$ square units.
:::

![Graphs of y = 8 - x^2 and the line y = 2x meeting at (-4, -8) and (2, 4): the parabola is above the line between them, and the shaded region has area 36 square units, found by integrating upper minus lower.](media:diagrams/area-between-parabola-and-line.png "Figure: the area between the curves from x = −4 to x = 2 is 36 square units")

### Areas against the y-axis

For a region between a curve, the $y$-axis and two horizontal lines, integrate with respect to $y$: area $= \int_{c}^{d} x\,dy$, with $x$ written in terms of $y$. For example, the region between $y = x^{2}$ ($x \geq 0$), the $y$-axis and the lines $y = 1$ and $y = 4$ has area $\int_{1}^{4}\sqrt{y}\,dy = \Big[\tfrac{2}{3}y^{\frac{3}{2}}\Big]_{1}^{4} = \tfrac{2}{3}(8 - 1) = \tfrac{14}{3}$.

## Improper integrals

Replace the troublesome limit by a letter, integrate, and see what happens as the letter tends to its limit.

:::worked-solution[Example 4: two improper integrals]
1. $\displaystyle\int_{1}^{\infty}\frac{4}{x^{3}}\,dx$: integrate to $\Big[-\tfrac{2}{x^{2}}\Big]_{1}^{N} = 2 - \tfrac{2}{N^{2}}$.
2. As $N \to \infty$, $\tfrac{2}{N^{2}} \to 0$, so the integral equals 2.
3. $\displaystyle\int_{0}^{4}\frac{1}{\sqrt{x}}\,dx$: the integrand is unbounded at 0. Integrate to $\Big[2\sqrt{x}\Big]_{\varepsilon}^{4} = 4 - 2\sqrt{\varepsilon}$.
4. As $\varepsilon \to 0$ this tends to 4, so the integral equals 4.
:::

Not every improper integral has a value: $\int_{1}^{N}\frac{1}{x}\,dx = \ln N$, which grows without limit, so $\int_{1}^{\infty}\frac{1}{x}\,dx$ does not exist.

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards: definite integrals, simple improper integrals, and areas bounded by curves and lines, including the $y$-axis (ZIMSEC Form 5; Cambridge Paper 1). Cambridge says "simple cases" of improper integrals, such as $\int_{0}^{1} x^{-\frac{1}{2}}\,dx$ and $\int_{1}^{\infty} x^{-2}\,dx$.
:::

## Common mistakes

:::mistake{title="Integrating straight across the axis"}
For a region partly above and partly below the $x$-axis, one integral gives the **difference** of the areas, not the total. Split at the root.
:::

:::mistake{title="Lower minus upper"}
Between two curves integrate (upper) − (lower). If you get a negative area, you have them the wrong way round.
:::

:::mistake{title="Sign slips with negative limits"}
Substitute negative limits in brackets: at $x = -4$, $-\frac{x^{3}}{3} = -\frac{(-4)^{3}}{3} = +\frac{64}{3}$.
:::

:::mistake{title="Leaving the area negative"}
An area is positive. If the integral is $-\frac{32}{3}$, the area is $\frac{32}{3}$.
:::

## Exam tips

:::exam-tip
Show the bracket with limits and the two substituted values. "Exact" answers should be fractions, not decimals.
:::

:::exam-tip
Questions often say "the shaded region" from a diagram: read carefully which boundaries it has, and whether a triangle or rectangle should be added or subtracted.
:::

:::exam-tip
For improper integrals, show the limit step ("as $N \to \infty$, $\frac{2}{N^{2}} \to 0$") rather than substituting $\infty$ directly.
:::

## Summary

:::summary
- $\int_{a}^{b} f(x)\,dx = F(b) - F(a)$; no $+ c$ is needed.
- Regions below the $x$-axis give negative integrals: split at the roots and add absolute values.
- Between two graphs: limits at the intersections, integrate upper minus lower.
- Against the $y$-axis: $\int x\,dy$ with $x$ in terms of $y$.
- Improper integrals: replace the bad limit by a letter and take the limit.
:::
