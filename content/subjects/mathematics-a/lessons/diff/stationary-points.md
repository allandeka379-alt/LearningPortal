---
{
  "key": "diff.stationary-points",
  "title": "Stationary points, optimisation and curve sketching",
  "summary": "Locate stationary points, decide whether each is a maximum or minimum by the second derivative or by the sign of dy/dx, use them to sketch curves and solve practical optimisation problems, and (ZIMSEC) find points of inflexion.",
  "concepts": ["amaths.diff.stationary-points"],
  "estimatedMinutes": 50,
  "level": "core"
}
---
## Introduction

Where is a curve highest or lowest? A tinsmith in Bulawayo wants to make a can that holds a fixed volume with the least metal; a farmer wants to fence the largest possible paddock with the wire she has. Both questions ask where some quantity is **greatest or least**, and calculus answers them: at such a point the gradient is zero.

This lesson shows how to find **stationary points**, how to decide their **nature**, how to use them to **sketch** a curve, and how to set up and solve **optimisation** problems. ZIMSEC Pure Mathematics (Form 5) and Cambridge 9709 Paper 1 (topic 1.7) both examine it; ZIMSEC also asks for **points of inflexion**, which Cambridge excludes.

You need to differentiate polynomials and simple powers, and to factorise and solve quadratic equations.

## Key definitions

:::definition{term="Stationary point"}
A point on the curve $y = f(x)$ where $\frac{dy}{dx} = 0$: the tangent there is horizontal. A stationary point is a **local maximum**, a **local minimum** or (ZIMSEC) a **stationary point of inflexion**.
:::

:::formula{name="The second-derivative test"}
At a stationary point $x = a$:

$$
f''(a) < 0 \Rightarrow \text{maximum}, \qquad f''(a) > 0 \Rightarrow \text{minimum}.
$$

If $f''(a) = 0$ the test fails: use the sign of $\frac{dy}{dx}$ on each side instead. Not printed in MF19.
:::

:::definition{term="First-derivative (sign) test"}
Look at the sign of $\frac{dy}{dx}$ just to the left and just to the right of the stationary point. $+$ then $-$: maximum. $-$ then $+$: minimum. The same sign on both sides: stationary point of inflexion.
:::

:::definition{term="Point of inflexion (ZIMSEC)"}
A point where the curve changes from bending one way (concave) to bending the other way (convex): $\frac{d^{2}y}{dx^{2}}$ **changes sign**. If $\frac{dy}{dx} = 0$ there too, it is a stationary point of inflexion.
:::

## Finding and classifying stationary points

1. Differentiate and solve $\frac{dy}{dx} = 0$.
2. Find the $y$-coordinate of each point from the **original** equation.
3. Classify each point with $\frac{d^{2}y}{dx^{2}}$, or with the sign test if the second derivative is 0.

:::worked-solution[Example 1: find and classify the stationary points of $y = x^{3} - 6x^{2} + 9x + 1$]
1. $\dfrac{dy}{dx} = 3x^{2} - 12x + 9 = 3(x - 1)(x - 3)$, so $x = 1$ or $x = 3$.
2. $x = 1$: $y = 1 - 6 + 9 + 1 = 5$. $x = 3$: $y = 27 - 54 + 27 + 1 = 1$.
3. $\dfrac{d^{2}y}{dx^{2}} = 6x - 12$.
4. At $x = 1$: $6 - 12 = -6 < 0$, so $(1, 5)$ is a maximum.
5. At $x = 3$: $18 - 12 = 6 > 0$, so $(3, 1)$ is a minimum.
:::

### When the second derivative is zero

:::worked-solution[Example 2: the stationary points of $y = x^{4} - 4x^{3}$]
1. $\dfrac{dy}{dx} = 4x^{3} - 12x^{2} = 4x^{2}(x - 3)$, so $x = 0$ or $x = 3$.
2. Points: $(0, 0)$ and $(3, 81 - 108) = (3, -27)$.
3. $\dfrac{d^{2}y}{dx^{2}} = 12x^{2} - 24x$. At $x = 3$: $108 - 72 = 36 > 0$, a minimum.
4. At $x = 0$ the second derivative is 0, so test signs. At $x = -0.1$: $\frac{dy}{dx} = 4(0.01)(-3.1) < 0$. At $x = 0.1$: $4(0.01)(-2.9) < 0$.
5. Negative on both sides: $(0, 0)$ is a stationary point of inflexion.
:::

![Graph of y = x^4 - 4x^3: the curve falls through the origin with a horizontal tangent but no turning point there, a stationary point of inflexion at (0, 0), then reaches a minimum at (3, -27) and rises.](media:diagrams/quartic-inflexion-and-minimum.png "Figure: y = x⁴ − 4x³ flattens at (0, 0) without turning, then has a minimum at (3, −27)")

## Curve sketching

Stationary points, intercepts and the behaviour for large $|x|$ give a reliable sketch. For Example 1: the curve crosses the $y$-axis at $(0, 1)$; it rises to the maximum $(1, 5)$, falls to the minimum $(3, 1)$, then rises again. Because the $x^{3}$ term dominates, $y \to -\infty$ as $x \to -\infty$ and $y \to +\infty$ as $x \to +\infty$. The minimum value 1 is above the $x$-axis, so the curve crosses the $x$-axis only once, to the left of the origin.

![Graph of y = x^3 - 6x^2 + 9x + 1 with its maximum (1, 5) and minimum (3, 1): a horizontal line y = k cuts the curve three times when k lies between 1 and 5, shown here for k = 3 at x = 0.27, 2 and 3.73.](media:diagrams/cubic-turning-points-three-roots.png "Figure: y = k meets the cubic three times when 1 < k < 5 (shown for k = 3)")

Stationary points also tell you how many roots an equation has. The equation $x^{3} - 6x^{2} + 9x + 1 = k$ has three real roots exactly when the horizontal line $y = k$ cuts the curve three times, that is when $1 < k < 5$.

## Optimisation

To find the greatest or least value of a quantity in a practical problem:

1. Choose a variable and write the quantity to be optimised **in terms of that one variable** (use the given constraint to eliminate the others).
2. Differentiate and set the derivative to zero.
3. Show that the value gives a maximum or minimum, as required.
4. Answer the question asked, with units.

:::worked-solution[Example 3: the tin with the least metal (a "show that" question)]
A closed cylindrical tin has radius $r$ cm and volume $128\pi\ \text{cm}^3$. Show that its total surface area is $A = 2\pi r^{2} + \dfrac{256\pi}{r}$, and find the least possible area.

1. Volume: $\pi r^{2}h = 128\pi$, so $h = \dfrac{128}{r^{2}}$.
2. Area: $A = 2\pi r^{2} + 2\pi rh = 2\pi r^{2} + 2\pi r \cdot \dfrac{128}{r^{2}} = 2\pi r^{2} + \dfrac{256\pi}{r}$, as required.
3. $\dfrac{dA}{dr} = 4\pi r - \dfrac{256\pi}{r^{2}} = 0$ gives $r^{3} = 64$, so $r = 4$.
4. $\dfrac{d^{2}A}{dr^{2}} = 4\pi + \dfrac{512\pi}{r^{3}} > 0$, so this is a minimum.
5. Least area: $A = 2\pi(4)^{2} + \dfrac{256\pi}{4} = 96\pi \approx 302\ \text{cm}^2$ (with height $8$ cm).
:::

![Graph of the surface area A = 2 pi r^2 + 256 pi / r of a closed tin of volume 128 pi cm^3 against the radius r: A falls to a minimum of 96 pi, about 302 cm^2, at r = 4 cm and rises again for larger r.](media:diagrams/tin-surface-area-minimum.png "Figure: the surface area of the tin is least, 96π ≈ 302 cm², when r = 4 cm")

## Points of inflexion (ZIMSEC)

A point of inflexion need not be stationary. Find where $\frac{d^{2}y}{dx^{2}} = 0$ and check that it **changes sign** there.

:::worked-solution[Example 4: the point of inflexion of $y = x^{3} - 3x^{2} + 4$]
1. $\dfrac{dy}{dx} = 3x^{2} - 6x$ and $\dfrac{d^{2}y}{dx^{2}} = 6x - 6$.
2. $\dfrac{d^{2}y}{dx^{2}} = 0$ at $x = 1$; it is negative for $x < 1$ and positive for $x > 1$, so it changes sign.
3. At $x = 1$: $y = 1 - 3 + 4 = 2$, so $(1, 2)$ is a point of inflexion.
4. There $\frac{dy}{dx} = 3 - 6 = -3 \neq 0$, so it is a **non-stationary** point of inflexion.
5. For the sketch: the curve has a maximum at $(0, 4)$ and a minimum at $(2, 0)$; since $x^{3} - 3x^{2} + 4 = (x + 1)(x - 2)^{2}$ it crosses the $x$-axis at $x = -1$ and touches it at $x = 2$.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards: stationary points, maxima and minima, sketching and optimisation. ZIMSEC also asks you to distinguish **points of inflexion** (Form 5). Cambridge 9709 excludes points of inflexion, so a Cambridge question classifies a stationary point only as a maximum or a minimum.
:::

## Common mistakes

:::mistake{title="Taking f''(a) = 0 to mean inflexion"}
$y = x^{4}$ has $f''(0) = 0$ but a **minimum** at the origin. When the second derivative is zero, use the sign test.
:::

:::mistake{title="y-coordinate from the derivative"}
Substitute the $x$-values into the **original** equation for $y$, not into $\frac{dy}{dx}$ (which is 0 there).
:::

:::mistake{title="Two variables left in an optimisation"}
You cannot differentiate $A = 2\pi r^{2} + 2\pi rh$ with respect to $r$ while $h$ is unknown. Use the constraint to write $h$ in terms of $r$ first.
:::

:::mistake{title="Not answering the question"}
After finding $r = 4$, the question may want the least **area**. Read the last line again.
:::

## Exam tips

:::exam-tip
"Determine the nature" earns a mark only with a reason: state the sign of $\frac{d^{2}y}{dx^{2}}$ (its value is best) and the conclusion.
:::

:::exam-tip
In optimisation "show that" parts, write the constraint and the substitution clearly; the given formula then lets you continue even if you could not derive it.
:::

:::exam-tip
In a sketch, label the coordinates of stationary points and intercepts, and make the curve's ends go the right way.
:::

## Summary

:::summary
- Stationary points satisfy $\frac{dy}{dx} = 0$; find $y$ from the original equation.
- $\frac{d^{2}y}{dx^{2}} < 0$: maximum; $> 0$: minimum; $= 0$: use the sign of $\frac{dy}{dx}$ on each side.
- Sketch from intercepts, stationary points and end behaviour; the curve's turning values decide how many roots $f(x) = k$ has.
- Optimisation: one variable, differentiate, set to zero, justify, answer with units.
- ZIMSEC only: a point of inflexion is where $\frac{d^{2}y}{dx^{2}}$ changes sign.
:::
