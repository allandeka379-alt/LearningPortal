---
{
  "key": "graphs.cubic",
  "title": "Cubic graphs and cubic inequalities",
  "summary": "Sketch a cubic given as a product of three linear factors, with its intercepts, its shape for a positive or negative leading coefficient and a repeated factor touching the axis; sketch the modulus of such a cubic; and solve cubic inequalities graphically.",
  "concepts": ["amath.graphs.cubic"],
  "estimatedMinutes": 30,
  "level": "core"
}
---
## Introduction

Cubic functions model volumes (a box folded from a sheet of metal at a workshop in Bulawayo), costs that first fall and then rise, and many curves in calculus. In Cambridge 0606 you are asked to **sketch** cubics given in factorised form, such as $y = (x + 2)(x - 1)(x - 3)$, to sketch their **modulus**, and to solve **cubic inequalities** from the sketch.

A sketch here is fast because the factors give the $x$-intercepts immediately. You need to be able to expand brackets, solve linear and quadratic equations, and you should know the lesson on graphs of $y = |f(x)|$.

## Key definitions

:::definition{term="Cubic function"}
A function $f(x) = ax^3 + bx^2 + cx + d$ with $a \neq 0$. When it is written as $a(x - p)(x - q)(x - r)$, its roots are $p$, $q$ and $r$.
:::

:::definition{term="Leading coefficient"}
The coefficient $a$ of $x^3$. Its sign decides the shape: for $a > 0$ the graph rises from bottom left to top right; for $a < 0$ it falls from top left to bottom right.
:::

:::definition{term="Repeated root"}
A root from a squared factor, such as $x = 2$ in $(x - 2)^2(x + 1)$. At a repeated root the graph **touches** the $x$-axis (it is a turning point there) instead of crossing it.
:::

## Sketching from the factors

1. **Roots:** set each factor to zero. Each gives an $x$-intercept.
2. **$y$-intercept:** put $x = 0$ and multiply the constants.
3. **Shape:** find the sign of the $x^3$ coefficient by multiplying the $x$ terms of the factors.
4. **Behaviour:** for $a > 0$, $y \to -\infty$ as $x \to -\infty$ and $y \to +\infty$ as $x \to +\infty$; the opposite for $a < 0$.
5. Join the intercepts smoothly with two turning points (or one touching point for a repeated root).

:::worked-solution[Example 1: sketch $y = (x + 2)(x - 1)(x - 3)$]
1. Roots: $x = -2$, $x = 1$, $x = 3$.
2. $y$-intercept: $(2)(-1)(-3) = 6$, so $(0, 6)$.
3. The $x^3$ coefficient is $1 \times 1 \times 1 = 1 > 0$: the curve starts at the bottom left and ends at the top right.
4. So the curve rises through $(-2, 0)$, passes through $(0, 6)$, turns and falls through $(1, 0)$, turns again below the axis and rises through $(3, 0)$.
5. Signs: $y < 0$ for $x < -2$, $y > 0$ for $-2 < x < 1$, $y < 0$ for $1 < x < 3$, $y > 0$ for $x > 3$.
:::

![Graph of y = (x + 2)(x - 1)(x - 3): the cubic rises from the bottom left, crosses the x-axis at -2, 1 and 3 and the y-axis at (0, 6), and ends at the top right; it is positive between -2 and 1 and beyond 3.](media:diagrams/cubic-three-roots.png "Figure: y = (x + 2)(x − 1)(x − 3) crosses the x-axis at −2, 1 and 3")

The sign pattern alternates at each single root. A test value confirms it: at $x = 2$, $y = (4)(1)(-1) = -4 < 0$.

:::worked-solution[Example 2: sketch $y = x(3 - x)(x + 2)$]
1. Roots: $x = 0$, $x = 3$, $x = -2$.
2. $y$-intercept: $0$, so the curve passes through the origin.
3. The $x^3$ coefficient is $1 \times (-1) \times 1 = -1 < 0$: the curve starts at the top left and ends at the bottom right.
4. From the top left it falls through $(-2, 0)$, turns below the axis (for example $y = -4$ at $x = -1$), rises through $(0, 0)$, turns above the axis ($y = 6$ at $x = 1$) and falls through $(3, 0)$ towards $-\infty$.
:::

Notice the factor $(3 - x)$: it contains $-x$, which is what makes the leading coefficient negative. Students often miss this.

## Repeated factors

:::worked-solution[Example 3: sketch $y = (x - 2)^2(x + 1)$]
1. Roots: $x = 2$ (repeated) and $x = -1$.
2. $y$-intercept: $(-2)^2(1) = 4$, so $(0, 4)$.
3. Leading coefficient $1 > 0$: bottom left to top right.
4. The curve crosses the axis at $(-1, 0)$, rises through $(0, 4)$ to a maximum, comes down and **touches** the axis at $(2, 0)$, which is a minimum point, then rises.
5. Since $(x - 2)^2 \geq 0$, the sign of $y$ is the sign of $x + 1$: negative for $x < -1$, positive for $x > -1$ except $y = 0$ at $x = 2$.
:::

## The modulus of a cubic

To sketch $y = |f(x)|$, sketch $y = f(x)$ and reflect every part below the $x$-axis. For the cubic of Example 1, the parts for $x < -2$ and for $1 < x < 3$ are reflected, so the graph has cusps at $(-2, 0)$, $(1, 0)$ and $(3, 0)$, and $y \to +\infty$ at both ends. A repeated root touching the axis from above does not create a cusp.

## Cubic inequalities

A cubic inequality $f(x) > 0$ (or $<$, $\geq$, $\leq$) is solved from the sketch: find where the curve is above or below the $x$-axis.

From Example 1:

- $(x + 2)(x - 1)(x - 3) \geq 0 \iff -2 \leq x \leq 1$ or $x \geq 3$;
- $(x + 2)(x - 1)(x - 3) < 0 \iff x < -2$ or $1 < x < 3$.

For $f(x) > d$ with $d \neq 0$, draw the horizontal line $y = d$ and find where the curve is above it. The critical values are the solutions of $f(x) = d$; often one of them is easy to spot (look for a value where the line passes through a known point).

:::worked-solution[Example 4: given $f(x) = (x + 1)(x - 1)(x - 4)$, solve $f(x) \leq 4$]
1. $f(0) = (1)(-1)(-4) = 4$, so the line $y = 4$ meets the curve at $x = 0$.
2. Expand: $f(x) = (x^2 - 1)(x - 4) = x^3 - 4x^2 - x + 4$.
3. $f(x) = 4$ gives $x^3 - 4x^2 - x = 0$, so $x(x^2 - 4x - 1) = 0$.
4. $x = 0$ or $x = \dfrac{4 \pm \sqrt{20}}{2} = 2 \pm \sqrt{5}$, about $-0.236$ and $4.24$.
5. The curve (leading coefficient positive) is below $y = 4$ to the left of $2 - \sqrt{5}$, above it between $2 - \sqrt{5}$ and $0$, below it between $0$ and $2 + \sqrt{5}$, and above it after that.
6. Solution: $x \leq 2 - \sqrt{5}$ or $0 \leq x \leq 2 + \sqrt{5}$.
:::

Check with test values: $f(-1) = 0 \leq 4$ (true) and $f(1) = 0 \leq 4$ (true), while $f(-0.1) \approx 4.06$ is greater than 4.

## Common mistakes

:::mistake{title="Wrong end behaviour"}
In $y = (2 - x)(x + 1)(x - 4)$ the leading coefficient is negative because of the $-x$ in $(2 - x)$. Multiply the $x$ terms of all three factors before deciding the shape.
:::

:::mistake{title="Crossing at a repeated root"}
At $x = 2$ in $(x - 2)^2(x + 1)$ the curve touches the axis and turns back; it does not cross.
:::

:::mistake{title="Missing a region"}
A cubic inequality usually has two pieces in its answer, for example $-2 \leq x \leq 1$ or $x \geq 3$. Read the whole sketch from left to right.
:::

:::mistake{title="Sign of the y-intercept"}
Multiply all the constants, including signs: for $(x + 2)(x - 1)(x - 3)$, $2 \times (-1) \times (-3) = +6$.
:::

## Exam tips

:::exam-tip
"Sketch" means label every intercept with its coordinates and show the correct shape at both ends. You do not need the exact turning points unless asked.
:::

:::exam-tip
For an inequality, write the critical values, refer to your sketch, and give the answer as clear intervals with the correct strict or non-strict signs.
:::

:::exam-tip
Questions often ask for the modulus graph next: reflect only the parts below the axis and mark each cusp.
:::

## Summary

:::summary
- Roots come from the factors; the $y$-intercept is the product of the constants.
- Positive leading coefficient: bottom left to top right; negative: top left to bottom right.
- A squared factor gives a repeated root where the curve touches the axis.
- $y = |f(x)|$: reflect the negative parts, giving cusps at the single roots.
- Solve cubic inequalities by reading the sketch; for $f(x) > d$ use the line $y = d$.
:::
