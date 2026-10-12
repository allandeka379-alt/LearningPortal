---
{
  "key": "calculus.definite-integrals-area",
  "title": "Definite integrals and plane areas",
  "summary": "Evaluate definite integrals and use them to find the area between a curve and the x-axis (including regions below the axis and areas in two parts), between a line and a curve, and between two curves.",
  "concepts": ["amath.calculus.definite-integrals-area"],
  "estimatedMinutes": 50,
  "level": "core"
}
---
## Introduction

How much land lies between a winding river and a straight fence? How far does a kombi travel when its speed changes all the time? Both questions ask for the area of a region with a curved edge, and integration answers them exactly. A farmer near Chinhoyi who knows the equation of the boundary of a maize field can find its area without counting squares on a map.

Area questions appear on almost every ZIMSEC Paper 1 and Cambridge 0606 paper. They combine skills you already have: solving equations to find where graphs meet, integrating, and substituting limits accurately. The new ideas are the **definite integral**, which produces a number instead of a function, and the care needed when part of a region lies **below** the $x$-axis.

## Key definitions

:::definition{term="Definite integral"}
For a function $f$ with integral $F$, the definite integral from $a$ to $b$ is
$\displaystyle\int_a^b f(x)\,dx = \Big[F(x)\Big]_a^b = F(b) - F(a)$. The numbers $a$ and $b$ are the **lower** and **upper limits**. The constant $c$ cancels, so it is left out.
:::

:::formula{name="Area between a curve and the x-axis (not in Cambridge's List of formulas)"}
$$
\text{Area} = \int_a^b y\,dx \quad \text{when } y \geq 0 \text{ for } a \leq x \leq b
$$
:::

:::formula{name="Area between two graphs"}
$$
\text{Area} = \int_a^b (y_{\text{upper}} - y_{\text{lower}})\,dx
$$
where $a$ and $b$ are the $x$-coordinates of the points where the graphs meet.
:::

:::keyfact{title="Properties of definite integrals"}
$\displaystyle\int_b^a f(x)\,dx = -\int_a^b f(x)\,dx$ and $\displaystyle\int_a^b f(x)\,dx + \int_b^c f(x)\,dx = \int_a^c f(x)\,dx$.
:::

## Evaluating definite integrals

Integrate, write the result in square brackets with the limits, substitute the upper limit, substitute the lower limit, subtract. Use brackets for each substitution: most errors are sign errors with negative limits.

:::worked-solution[Example 1: evaluate $\displaystyle\int_1^3 (3x^2 - 2x)\,dx$]
1. Integrate: $\Big[x^3 - x^2\Big]_1^3$.
2. Upper limit: $(27 - 9) = 18$.
3. Lower limit: $(1 - 1) = 0$.
4. Subtract: $18 - 0 = 18$.
:::

The same method works for every function from the previous lessons. On a non-calculator paper, leave answers exact. For example,

$$
\int_0^{\frac{\pi}{6}} (\cos 3x + 2)\,dx = \Big[\tfrac{1}{3}\sin 3x + 2x\Big]_0^{\frac{\pi}{6}} = \left(\tfrac{1}{3}\sin\tfrac{\pi}{2} + \tfrac{\pi}{3}\right) - 0 = \frac{1 + \pi}{3},
$$

and $\displaystyle\int_0^{\ln 2} e^{2x}\,dx = \Big[\tfrac{1}{2}e^{2x}\Big]_0^{\ln 2} = \tfrac{1}{2}(4) - \tfrac{1}{2}(1) = \tfrac{3}{2}$, using $e^{2\ln 2} = e^{\ln 4} = 4$.

## Area under a curve

When the curve is **above** the $x$-axis between $x = a$ and $x = b$, the definite integral equals the area between the curve, the axis and the lines $x = a$ and $x = b$.

When the curve is **below** the axis, $y$ is negative, so the integral comes out **negative**. The area is its size (modulus).

:::worked-solution[Example 2: find the area enclosed by $y = x^2 - 4x$ and the $x$-axis]
1. Find where the curve meets the axis: $x^2 - 4x = x(x - 4) = 0$, so $x = 0$ and $x = 4$.
2. The curve is a U-shaped parabola, so between its roots it lies below the axis (check: at $x = 2$, $y = -4$).
3. $\displaystyle\int_0^4 (x^2 - 4x)\,dx = \Big[\tfrac{x^3}{3} - 2x^2\Big]_0^4 = \left(\tfrac{64}{3} - 32\right) - 0 = -\tfrac{32}{3}$.
4. The integral is negative because the region is below the axis. Area $= \tfrac{32}{3}$ square units.
:::

![Graph of y = x^2 - 4x from x = 0 to x = 4: the shaded region lies below the x-axis, so the integral is negative (-32/3) but the area enclosed is 32/3 square units.](media:diagrams/area-below-axis.png "Figure: the region below the axis gives a negative integral; its area is 32/3")

### Regions on both sides of the axis

If the curve crosses the axis between the limits, positive and negative parts cancel in a single integral. **Split the integral at every root** inside the interval and add the sizes of the parts.

:::worked-solution[Example 3: the curve $y = x^3 - x^2 - 2x$ meets the $x$-axis at $x = -1$, $0$ and $2$. Find the total area enclosed by the curve and the axis.]
1. Factorise to check the roots: $x(x^2 - x - 2) = x(x - 2)(x + 1)$.
2. Let $F(x) = \tfrac{x^4}{4} - \tfrac{x^3}{3} - x^2$.
3. From $-1$ to $0$: $F(0) - F(-1) = 0 - \left(\tfrac{1}{4} + \tfrac{1}{3} - 1\right) = \tfrac{5}{12}$ (above the axis).
4. From $0$ to $2$: $F(2) - F(0) = 4 - \tfrac{8}{3} - 4 = -\tfrac{8}{3}$ (below the axis).
5. Total area $= \tfrac{5}{12} + \tfrac{8}{3} = \tfrac{5}{12} + \tfrac{32}{12} = \tfrac{37}{12}$ square units.
6. A single integral from $-1$ to $2$ would give $\tfrac{5}{12} - \tfrac{8}{3} = -\tfrac{9}{4}$, which is not an area.
:::

## Area between a line and a curve, or two curves

Between two graphs, the height of a thin vertical strip is (upper $y$) $-$ (lower $y$). This difference is positive wherever the upper graph is above the lower one, even if both are below the $x$-axis, so no splitting is needed as long as the graphs do not cross in between.

:::worked-solution[Example 4: find the area of the region enclosed by the line $y = 2x + 3$ and the curve $y = x^2$]
1. Where they meet: $x^2 = 2x + 3$, so $x^2 - 2x - 3 = (x - 3)(x + 1) = 0$, giving $x = -1$ and $x = 3$.
2. Which is on top? At $x = 0$ the line gives 3 and the curve 0, so the line is above.
3. Area $= \displaystyle\int_{-1}^{3} \left(2x + 3 - x^2\right)dx = \Big[x^2 + 3x - \tfrac{x^3}{3}\Big]_{-1}^{3}$.
4. Upper: $9 + 9 - 9 = 9$. Lower: $1 - 3 + \tfrac{1}{3} = -\tfrac{5}{3}$.
5. Area $= 9 - \left(-\tfrac{5}{3}\right) = \tfrac{32}{3}$ square units.
:::

![The line y = 2x + 3 lies above the curve y = x^2 between their intersection points (-1, 1) and (3, 9); the shaded region between them has area 32/3 square units, found by integrating (2x + 3 - x^2) from -1 to 3.](media:diagrams/area-between-line-curve.png "Figure: the area between a line and a curve is the integral of top minus bottom")

Some regions are bounded by a curve, a line **and** the axis. Sketch them (in your head or on paper), find every point where two boundaries meet, and split the region into parts, each with one upper and one lower boundary. A triangle or trapezium under a straight line can be found with the usual area formulas instead of integration.

:::keyfact{title="ZIMSEC and Cambridge"}
ZIMSEC asks for the area under a curve and also uses definite integrals for volumes of revolution. Cambridge asks for areas between a line and a curve and between two curves, with exact answers on Paper 1.
:::

## Common mistakes

:::mistake{title="Subtracting in the wrong order"}
$\Big[F(x)\Big]_a^b = F(b) - F(a)$: upper limit first. Swapping them changes the sign.
:::

:::mistake{title="Reporting a negative area"}
An area is never negative. A negative integral means the region is below the axis; give its size and say so.
:::

:::mistake{title="Not splitting at a root"}
Integrating straight across a root lets the parts above and below the axis cancel. Find the roots first.
:::

:::mistake{title="Lost brackets with negative limits"}
Substituting $x = -1$ into $x^2 + 3x - \frac{x^3}{3}$ gives $1 - 3 + \frac{1}{3}$; without brackets the last term often gets the wrong sign.
:::

## Exam tips

:::exam-tip
Always find the limits first by solving an equation, and state which graph is on top. Both earn method marks.
:::

:::exam-tip
"Find the exact area" means fractions, surds, $\pi$, $e$ or $\ln$, not a rounded decimal.
:::

:::exam-tip
Show the substituted values, for example $(9) - \left(-\frac{5}{3}\right)$. A wrong final answer can still earn the method marks.
:::

## Summary

:::summary
- $\int_a^b f(x)\,dx = F(b) - F(a)$; the constant of integration cancels.
- Above the $x$-axis the definite integral is the area; below it, the integral is negative and the area is its size.
- Split at every root inside the interval and add the sizes of the parts.
- Area between two graphs $= \int_a^b (\text{upper} - \text{lower})\,dx$, with $a$ and $b$ where they meet.
- Leave answers exact when asked, and find the limits by solving equations.
:::
