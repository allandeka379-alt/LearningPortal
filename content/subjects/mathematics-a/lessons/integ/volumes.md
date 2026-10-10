---
{
  "key": "integ.volumes",
  "title": "Volumes of revolution",
  "summary": "Find the volume of the solid formed when a region is rotated through 360° about the x-axis or the y-axis, including regions between two graphs, and give exact answers in terms of π.",
  "concepts": ["amaths.integ.volumes"],
  "estimatedMinutes": 40,
  "level": "core"
}
---
## Introduction

Spin a curve around an axis and it sweeps out a solid: a bowl, a vase, a cooling tower, a clay water pot from a Masvingo potter's wheel. Integration gives the volume of such a **solid of revolution** exactly, which is how engineers find the capacity of a tank whose profile is a curve.

The idea is to slice the solid into thin discs. Each disc is a very short cylinder, and adding up their volumes, in the limit, is an integral. ZIMSEC Pure Mathematics (Form 5) and Cambridge 9709 Paper 1 (topic 1.8) both examine rotation through $360^\circ$ about either axis. At A Level the curves can need any integration technique you know.

You need definite integrals and the ability to expand brackets such as $(9 - x^{2})^{2}$.

## Key definitions

:::definition{term="Solid of revolution"}
The solid formed when a plane region is rotated through $360^\circ$ (one complete turn) about a straight line, the **axis of rotation**.
:::

:::formula{name="Volume about the x-axis"}
The region between $y = f(x)$, the $x$-axis and $x = a$, $x = b$, rotated about the $x$-axis:

$$
V = \pi\int_{a}^{b} y^{2}\,dx.
$$
:::

:::formula{name="Volume about the y-axis"}
The region between a curve, the $y$-axis and $y = c$, $y = d$, rotated about the $y$-axis:

$$
V = \pi\int_{c}^{d} x^{2}\,dy.
$$

Neither formula is printed in MF19.
:::

## Why the formula works

Cut the solid at a point $x$ into a thin slice of thickness $\delta x$. The slice is almost a cylinder of radius $y$, so its volume is about $\pi y^{2}\,\delta x$. Adding all the slices and letting $\delta x \to 0$ gives $\pi\int y^{2}\,dx$. The radius of each disc is the **distance from the axis** to the curve, which is why rotating about the $y$-axis uses $x^{2}$ and integrates with respect to $y$.

:::worked-solution[Example 1: rotate $y = x^{2}$, $0 \leq x \leq 2$, about the $x$-axis]
1. $y^{2} = x^{4}$.
2. $V = \pi\displaystyle\int_{0}^{2} x^{4}\,dx = \pi\Big[\tfrac{x^{5}}{5}\Big]_{0}^{2}$.
3. $V = \pi \times \tfrac{32}{5} = \tfrac{32\pi}{5}$ cubic units (about 20.1).
:::

## Rotation about the y-axis

Rewrite the curve as $x$ in terms of $y$, square it, and use $y$-limits.

:::worked-solution[Example 2: rotate the region between $y = x^{2}$ ($x \geq 0$), the $y$-axis, $y = 1$ and $y = 4$, about the $y$-axis]
1. $x^{2} = y$, so the integrand is simply $y$.
2. $V = \pi\displaystyle\int_{1}^{4} y\,dy = \pi\Big[\tfrac{y^{2}}{2}\Big]_{1}^{4}$.
3. $V = \pi\left(8 - \tfrac{1}{2}\right) = \tfrac{15\pi}{2}$ cubic units.
:::

## Regions not bounded by the axis

If the region lies between two graphs, the solid has a hole in it, like a washer. Its volume is the outer solid **minus** the inner one:

$$
V = \pi\int_{a}^{b}\left(y_{\text{outer}}^{2} - y_{\text{inner}}^{2}\right)dx.
$$

Square each function **separately**; $(y_{1} - y_{2})^{2}$ is wrong.

:::worked-solution[Example 3: the region between $y = 9 - x^{2}$ and $y = 5$, rotated about the $x$-axis]
1. Intersections: $9 - x^{2} = 5$, so $x = \pm 2$. Between them the curve is above the line.
2. Outer radius $9 - x^{2}$, inner radius 5.
3. $V = \pi\displaystyle\int_{-2}^{2}\left[(9 - x^{2})^{2} - 25\right]dx = \pi\int_{-2}^{2}(56 - 18x^{2} + x^{4})\,dx$.
4. $= \pi\Big[56x - 6x^{3} + \tfrac{x^{5}}{5}\Big]_{-2}^{2} = 2\pi\left(112 - 48 + \tfrac{32}{5}\right)$.
5. $V = 2\pi \times \tfrac{352}{5} = \tfrac{704\pi}{5}$ cubic units.
:::

Because the integrand is even (it has only even powers of $x$), integrating from 0 to 2 and doubling gives the same result with less arithmetic.

## Using other integration techniques

The formula needs $\int y^{2}\,dx$, so any curve you can square and integrate will do.

:::worked-solution[Example 4: an exam-style question]
The region bounded by $y = \dfrac{1}{2x + 1}$, the axes and the line $x = 1$ is rotated through $360^\circ$ about the $x$-axis. Find the exact volume.

1. $y^{2} = (2x + 1)^{-2}$.
2. $V = \pi\displaystyle\int_{0}^{1}(2x + 1)^{-2}\,dx = \pi\Big[-\tfrac{1}{2(2x + 1)}\Big]_{0}^{1}$.
3. $= \pi\left(-\tfrac{1}{6} + \tfrac{1}{2}\right) = \pi \times \tfrac{1}{3}$.
4. $V = \dfrac{\pi}{3}$ cubic units.
:::

At A Level (ZIMSEC Form 5; Cambridge Paper 3 questions that build on Paper 1) the integrand can be exponential or trigonometric: rotating $y = \mathrm{e}^{x}$ needs $\int \mathrm{e}^{2x}\,dx$, and rotating $y = \sin x$ needs the identity $\sin^{2}x = \frac{1}{2}(1 - \cos 2x)$.

## Checking with simple solids

You can test the method on solids whose volumes you already know. Rotating the line $y = 3$ from $x = 0$ to $x = 4$ about the $x$-axis gives a cylinder of radius 3 and length 4, and indeed $\pi\int_{0}^{4} 9\,dx = 36\pi = \pi r^{2}h$. Rotating the line $y = \frac{r}{h}x$ gives a cone, and the integral gives $\frac{1}{3}\pi r^{2}h$; rotating a semicircle gives a sphere of volume $\frac{4}{3}\pi r^{3}$. These checks are also useful in an exam: if part of a solid is a cylinder or cone, you may find its volume by formula and add or subtract it from an integral, as long as you say clearly what you are doing. A rough size check helps too: the volume must be less than that of the smallest cylinder enclosing the solid.

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards: volumes of revolution about either axis through $360^\circ$, including regions between two graphs (ZIMSEC Form 5; Cambridge Paper 1, topic 1.8). Answers are usually required exactly, in terms of $\pi$.
:::

## Common mistakes

:::mistake{title="Forgetting π or forgetting to square"}
The volume is $\pi\int y^{2}\,dx$, not $\int y\,dx$ (that is an area) and not $\pi\int y\,dx$.
:::

:::mistake{title="Squaring the difference"}
For a washer, $\pi\int(y_{1}^{2} - y_{2}^{2})\,dx$, never $\pi\int(y_{1} - y_{2})^{2}\,dx$.
:::

:::mistake{title="x-limits for a y-axis rotation"}
When integrating with respect to $y$, the limits must be $y$-values.
:::

:::mistake{title="Expanding the square wrongly"}
$(9 - x^{2})^{2} = 81 - 18x^{2} + x^{4}$, not $81 - x^{4}$ or $81 + x^{4}$.
:::

## Exam tips

:::exam-tip
"Exact volume" means leave $\pi$ in the answer: $\frac{704\pi}{5}$, not 442.
:::

:::exam-tip
Write the formula with the limits first, $V = \pi\int_{-2}^{2}(\ldots)\,dx$; the method mark is often for this line.
:::

:::exam-tip
For a region between a curve and a line, check which is further from the axis of rotation; that one is the outer radius.
:::

## Summary

:::summary
- About the $x$-axis: $V = \pi\int_{a}^{b} y^{2}\,dx$.
- About the $y$-axis: $V = \pi\int_{c}^{d} x^{2}\,dy$, with $y$-limits.
- Between two graphs: $\pi\int(y_{\text{outer}}^{2} - y_{\text{inner}}^{2})\,dx$; square each separately.
- Expand carefully and give exact answers in terms of $\pi$.
- Any integration technique may be needed for $\int y^{2}$.
:::
