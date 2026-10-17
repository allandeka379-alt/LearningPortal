---
{
  "key": "calculus.volumes-of-revolution",
  "title": "Volumes of revolution about the x-axis",
  "summary": "Find the volume of the solid formed when the region under y = f(x) between x = a and x = b is rotated through 360° about the x-axis, using V = π∫y² dx, with exact answers in terms of π.",
  "concepts": ["amath.calculus.volumes-of-revolution"],
  "estimatedMinutes": 40,
  "level": "core"
}
---
## Introduction

Spin a flat shape about a line and it sweeps out a solid. A potter in Bulawayo shapes a clay pot on a wheel; a carpenter turns a wooden table leg on a lathe; a water engineer designs a tank with curved sides. Each of these solids has circular cross-sections, and its volume can be found exactly by integration.

In ZIMSEC Additional Mathematics, integration is used for areas **and** for volumes: the region under a curve is rotated through $360°$ (one full turn) about the $x$-axis. Cambridge 0606 does not include volumes of revolution, so this lesson is for ZIMSEC candidates.

You need to be confident with definite integrals, with expanding brackets such as $(x^2 + 1)^2$, and with the integrals of powers of $x$ and of $e^{ax}$.

## Key definitions

:::definition{term="Solid of revolution"}
The solid formed when a plane region is rotated through $360°$ about a straight line, here the $x$-axis. Every cross-section at right angles to the axis is a circle.
:::

:::definition{term="Volume of revolution"}
The volume of a solid of revolution. When the region between $y = f(x)$, the $x$-axis and the lines $x = a$ and $x = b$ is rotated about the $x$-axis, the volume is given by the formula below.
:::

:::formula{name="Volume of revolution about the x-axis"}
$$
V = \pi\int_a^b y^2\,dx
$$
:::

## Where the formula comes from

Cut the solid into thin slices at right angles to the $x$-axis. A slice at position $x$ is very nearly a disc (a short cylinder) with radius $y$ and thickness $\delta x$, so its volume is about $\pi y^2\,\delta x$. Adding all the slices from $x = a$ to $x = b$ and letting $\delta x \to 0$ turns the sum into an integral:

$$
V = \lim_{\delta x \to 0} \sum \pi y^2\,\delta x = \pi\int_a^b y^2\,dx
$$

The radius of each disc is the **height of the curve**, so it is $y$ that is squared, not $x$. Because $y^2 \geq 0$, the integral is never negative: a region below the $x$-axis produces exactly the same solid as its reflection above the axis.

## Using the formula

The method is always the same:

1. Write $y^2$ in terms of $x$ and **expand** it into separate powers (or exponentials).
2. Integrate, keeping $\pi$ outside as a factor.
3. Substitute the limits and give the answer as a multiple of $\pi$ unless a decimal is asked for.

:::worked-solution[Example 1: the region under $y = 2x$ from $x = 0$ to $x = 3$ is rotated through $360°$ about the $x$-axis. Find the volume.]
1. $y^2 = (2x)^2 = 4x^2$.
2. $V = \pi\displaystyle\int_0^3 4x^2\,dx = \pi\Big[\tfrac{4x^3}{3}\Big]_0^3$.
3. $= \pi\left(\tfrac{4 \times 27}{3} - 0\right) = 36\pi$ cubic units.
4. Check: the solid is a cone with radius $y = 6$ and height 3, and $\tfrac{1}{3}\pi r^2 h = \tfrac{1}{3}\pi(36)(3) = 36\pi$. ✓
:::

:::worked-solution[Example 2: the region bounded by $y = x^2 + 1$, the axes and the line $x = 2$ is rotated through $360°$ about the $x$-axis. Find the exact volume.]
1. $y^2 = (x^2 + 1)^2 = x^4 + 2x^2 + 1$. Do not write $x^4 + 1$: the middle term matters.
2. $V = \pi\displaystyle\int_0^2 (x^4 + 2x^2 + 1)\,dx = \pi\Big[\tfrac{x^5}{5} + \tfrac{2x^3}{3} + x\Big]_0^2$.
3. $= \pi\left(\tfrac{32}{5} + \tfrac{16}{3} + 2\right) = \pi\left(\tfrac{96 + 80 + 30}{15}\right)$.
4. $V = \tfrac{206\pi}{15}$ cubic units ($\approx 43.1$).
:::

![Region under y = x^2 + 1 from x = 0 to x = 2 with its reflection below the x-axis: rotating about the x-axis gives a solid whose cross-section at each x is a circle of radius y = x^2 + 1, so V = pi times the integral of y squared.](media:diagrams/revolution-quadratic-slice.png "Figure: each slice is a disc of radius y, so V = π∫ y² dx between x = 0 and x = 2")

### Roots and exponentials

Square roots disappear when squared, which makes curves such as $y = \sqrt{x}$ pleasant to rotate. For $y = \sqrt{x}$ from $x = 1$ to $x = 4$: $V = \pi\displaystyle\int_1^4 x\,dx = \pi\Big[\tfrac{x^2}{2}\Big]_1^4 = \pi\left(8 - \tfrac{1}{2}\right) = \tfrac{15\pi}{2}$.

Exponentials double their index: $(e^{x})^2 = e^{2x}$, not $e^{x^2}$.

:::worked-solution[Example 3: the region under $y = e^{x}$ from $x = 0$ to $x = 1$ is rotated about the $x$-axis. Find the volume, exactly and to 3 significant figures.]
1. $y^2 = e^{2x}$.
2. $V = \pi\displaystyle\int_0^1 e^{2x}\,dx = \pi\Big[\tfrac{1}{2}e^{2x}\Big]_0^1$.
3. $= \pi\left(\tfrac{1}{2}e^{2} - \tfrac{1}{2}\right) = \tfrac{\pi}{2}\left(e^2 - 1\right)$.
4. $\approx 10.0$ cubic units.
:::

## A region between a curve and the axis

When a curve cuts the $x$-axis at two points, the region between them, rotated, gives a closed solid like a rugby ball. Find the limits by solving $y = 0$ first.

:::worked-solution[Example 4: the region enclosed by $y = 4 - x^2$ and the $x$-axis is rotated through $360°$ about the $x$-axis. Find the exact volume.]
1. Limits: $4 - x^2 = 0$ gives $x = -2$ and $x = 2$.
2. $y^2 = (4 - x^2)^2 = 16 - 8x^2 + x^4$.
3. $V = \pi\displaystyle\int_{-2}^{2} (16 - 8x^2 + x^4)\,dx = \pi\Big[16x - \tfrac{8x^3}{3} + \tfrac{x^5}{5}\Big]_{-2}^{2}$.
4. At $x = 2$: $32 - \tfrac{64}{3} + \tfrac{32}{5} = \tfrac{256}{15}$. At $x = -2$ the value is $-\tfrac{256}{15}$ (every term is odd).
5. $V = \pi\left(\tfrac{256}{15} + \tfrac{256}{15}\right) = \tfrac{512\pi}{15}$ cubic units.
:::

![Region between y = 4 - x^2 and the x-axis from x = -2 to x = 2, with its reflection below: rotated about the x-axis it forms a closed rugby-ball shape of volume 512 pi over 15 cubic units.](media:diagrams/revolution-rugby-ball.png "Figure: the limits x = −2 and x = 2 come from solving y = 0; rotating the arch about the x-axis gives a rugby-ball solid")

### A "show that": the volume of a sphere

Rotating the semicircle $y = \sqrt{r^2 - x^2}$, $-r \leq x \leq r$, gives a sphere of radius $r$:

$$
V = \pi\int_{-r}^{r} (r^2 - x^2)\,dx = \pi\Big[r^2x - \tfrac{x^3}{3}\Big]_{-r}^{r} = \pi\left(\tfrac{2r^3}{3} + \tfrac{2r^3}{3}\right) = \tfrac{4}{3}\pi r^3
$$

which is the familiar formula. Questions that ask you to "show" a volume formula expect exactly these steps: square $y$, integrate, substitute, simplify.

:::keyfact{title="ZIMSEC and Cambridge"}
Volumes of revolution are in the ZIMSEC syllabus only (rotation about the $x$-axis). Cambridge 0606 uses integration for plane areas and kinematics, not volumes.
:::

## Common mistakes

:::mistake{title="Squaring term by term"}
$(x^2 + 1)^2 = x^4 + 2x^2 + 1$, not $x^4 + 1$. Expand every bracket fully before integrating.
:::

:::mistake{title="Forgetting π or squaring y"}
$\int_a^b y\,dx$ is an area. The volume is $\pi\int_a^b y^2\,dx$: both the $\pi$ and the square are needed.
:::

:::mistake{title="Squaring the exponential wrongly"}
$(e^{3x})^2 = e^{6x}$. Writing $e^{9x^2}$ or $e^{3x^2}$ confuses squaring a power with squaring an index.
:::

:::mistake{title="Giving a decimal when an exact answer is asked"}
"Exact" or "in terms of $\pi$" means $\frac{206\pi}{15}$, not $43.1$.
:::

## Exam tips

:::exam-tip
Write the formula $V = \pi\int_a^b y^2\,dx$ first, then $y^2$ expanded. These lines earn method marks even if the arithmetic slips.
:::

:::exam-tip
Leave $\pi$ outside the integral and multiply at the end: the arithmetic stays simple and the answer comes out "in terms of $\pi$".
:::

:::exam-tip
When the region is described in words, identify the curve, the axis and the limits (solve $y = 0$ if needed) before you integrate.
:::

## Summary

:::summary
- Rotating the region under $y = f(x)$ from $x = a$ to $x = b$ through $360°$ about the $x$-axis gives $V = \pi\int_a^b y^2\,dx$.
- Each slice is a disc of radius $y$, which is why $y$ is squared.
- Expand $y^2$ fully, integrate, substitute the limits, and keep $\pi$ as a factor.
- Regions below the axis give positive volumes because $y^2 \geq 0$.
- A cone, a cylinder and a sphere can all be checked against their known formulas.
:::
