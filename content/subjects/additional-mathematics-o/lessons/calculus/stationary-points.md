---
{
  "key": "calculus.stationary-points",
  "title": "Stationary points: maxima and minima",
  "summary": "Find stationary points by solving dy/dx = 0, and decide whether each is a maximum or a minimum with the first-derivative (change of sign) test or the second-derivative test, giving full justification.",
  "concepts": ["amath.calculus.stationary-points"],
  "estimatedMinutes": 45,
  "level": "core"
}
---
## Introduction

The highest point of a parabolic arch, the lowest point of a cable slung between two poles, the moment a ball thrown upwards at Victoria Falls stops rising: at each of these the curve is momentarily flat. The tangent is horizontal and the gradient is zero. Such points are called **stationary points**, and finding them is the main reason for learning to differentiate.

Stationary points let you sketch curves accurately, find the greatest and least values of a function, and solve practical optimisation problems. Both ZIMSEC (Form 3: "find stationary points and determine their nature by the change of sign or the second derivative") and Cambridge 0606 (topics 14.6 and 14.9, "with full justification") examine them. Points of inflexion are **excluded** from both syllabuses at this level, so every stationary point you meet will be a maximum or a minimum, but you must still *prove* which one it is.

## Key definitions

:::definition{term="Stationary point"}
A point on a curve where $\dfrac{dy}{dx} = 0$, so the tangent is horizontal.
:::

:::definition{term="Maximum point (local maximum)"}
A stationary point where the curve changes from increasing to decreasing: the gradient goes from positive, through zero, to negative. Nearby points on both sides are lower.
:::

:::definition{term="Minimum point (local minimum)"}
A stationary point where the curve changes from decreasing to increasing: the gradient goes from negative, through zero, to positive. Nearby points on both sides are higher.
:::

:::formula{name="Second-derivative test (not in the List of formulas)"}
At a stationary point $x = a$:

- if $\dfrac{d^2y}{dx^2} < 0$, the point is a **maximum**;
- if $\dfrac{d^2y}{dx^2} > 0$, the point is a **minimum**;
- if $\dfrac{d^2y}{dx^2} = 0$, the test fails: use the first-derivative test instead.
:::

A local maximum is not necessarily the highest point of the whole curve; it is only higher than its neighbours. The word "turning point" is also used for a maximum or a minimum.

## Finding stationary points

1. Differentiate to find $\dfrac{dy}{dx}$.
2. Solve $\dfrac{dy}{dx} = 0$ for $x$.
3. Substitute each $x$ into the **equation of the curve** to find $y$.
4. Determine the nature of each point.

:::worked-solution[Example 1: find the stationary points of $y = x^3 - 6x^2 + 9x + 1$ and determine their nature]
1. $\dfrac{dy}{dx} = 3x^2 - 12x + 9 = 3(x^2 - 4x + 3) = 3(x - 1)(x - 3)$.
2. $\dfrac{dy}{dx} = 0$ when $x = 1$ or $x = 3$.
3. $x = 1$: $y = 1 - 6 + 9 + 1 = 5$. $x = 3$: $y = 27 - 54 + 27 + 1 = 1$.
4. $\dfrac{d^2y}{dx^2} = 6x - 12$.
5. At $x = 1$: $\dfrac{d^2y}{dx^2} = -6 < 0$, so $(1, 5)$ is a maximum.
6. At $x = 3$: $\dfrac{d^2y}{dx^2} = 6 > 0$, so $(3, 1)$ is a minimum.
:::

![Graph of y = x^3 - 6x^2 + 9x + 1: the curve rises to a maximum at (1, 5), falls to a minimum at (3, 1) and then rises again; it crosses the y-axis at (0, 1).](media:diagrams/stationary-points-cubic.png "Figure: y = x³ − 6x² + 9x + 1 has a maximum at (1, 5) and a minimum at (3, 1)")

So the curve rises to a maximum at $(1, 5)$, falls to a minimum at $(3, 1)$ and then rises for ever. It crosses the $y$-axis at $(0, 1)$. That is enough to sketch it.

## Why the second-derivative test works

$\dfrac{d^2y}{dx^2}$ is the rate of change of the gradient. If it is negative at a stationary point, the gradient is **decreasing** as $x$ increases through that point: it goes from positive to zero to negative, which is the pattern of a maximum. If $\dfrac{d^2y}{dx^2}$ is positive, the gradient increases from negative to zero to positive: a minimum.

## The first-derivative (change of sign) test

Find the sign of $\dfrac{dy}{dx}$ a little to the left and a little to the right of the stationary point. Choose values close enough that no other stationary point lies between them.

| Gradient to the left | at the point | to the right | Nature |
| --- | --- | --- | --- |
| $+$ | $0$ | $-$ | maximum |
| $-$ | $0$ | $+$ | minimum |

:::worked-solution[Example 2: find the stationary point of $y = x + \dfrac{9}{x}$ for $x > 0$, and use the first-derivative test to determine its nature]
1. $y = x + 9x^{-1}$, so $\dfrac{dy}{dx} = 1 - 9x^{-2} = 1 - \dfrac{9}{x^2}$.
2. $1 - \dfrac{9}{x^2} = 0$ gives $x^2 = 9$; with $x > 0$, $x = 3$. Then $y = 3 + 3 = 6$.
3. At $x = 2.9$: $\dfrac{dy}{dx} = 1 - \dfrac{9}{8.41} \approx -0.070 < 0$.
4. At $x = 3.1$: $\dfrac{dy}{dx} = 1 - \dfrac{9}{9.61} \approx 0.063 > 0$.
5. The gradient changes from negative to positive, so $(3, 6)$ is a minimum.
6. Check with the second derivative: $\dfrac{d^2y}{dx^2} = \dfrac{18}{x^3} = \dfrac{18}{27} > 0$, a minimum.
:::

When the second-derivative test fails, the first-derivative test still works.

:::worked-solution[Example 3: determine the nature of the stationary point of $y = x^4$]
1. $\dfrac{dy}{dx} = 4x^3 = 0$ gives $x = 0$, so the stationary point is $(0, 0)$.
2. $\dfrac{d^2y}{dx^2} = 12x^2 = 0$ at $x = 0$: the second-derivative test gives no conclusion.
3. At $x = -0.1$: $\dfrac{dy}{dx} = -0.004 < 0$. At $x = 0.1$: $\dfrac{dy}{dx} = 0.004 > 0$.
4. Negative to positive, so $(0, 0)$ is a minimum.
:::

## Curves with exponentials and other functions

The method is the same for any differentiable function. Factorise the derivative where possible, remembering that $\mathrm{e}^{kx}$ is never zero.

:::worked-solution[Example 4: find the stationary point of $y = x\mathrm{e}^{-x}$ and show that it is a maximum]
1. Product rule: $\dfrac{dy}{dx} = \mathrm{e}^{-x} - x\mathrm{e}^{-x} = \mathrm{e}^{-x}(1 - x)$.
2. $\mathrm{e}^{-x} > 0$ for all $x$, so $\dfrac{dy}{dx} = 0$ only when $x = 1$; then $y = \mathrm{e}^{-1} = \dfrac{1}{\mathrm{e}}$.
3. $\dfrac{d^2y}{dx^2} = -\mathrm{e}^{-x}(1 - x) + \mathrm{e}^{-x}(-1) = \mathrm{e}^{-x}(x - 2)$.
4. At $x = 1$: $\dfrac{d^2y}{dx^2} = \mathrm{e}^{-1}(-1) = -\dfrac{1}{\mathrm{e}} < 0$.
5. So $\left(1, \dfrac{1}{\mathrm{e}}\right)$ is a maximum.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
ZIMSEC accepts either test ("by the change of sign or the second derivative"). Cambridge requires "full justification": state the value or the sign of the second derivative (or the signs of the gradient on each side) **and** the conclusion. Neither board examines points of inflexion in this syllabus, but you should know that $\frac{d^2y}{dx^2} = 0$ does not by itself tell you the nature of a point.
:::

## Common mistakes

:::mistake{title="Substituting into the derivative for y"}
The $y$-coordinate of a stationary point comes from the equation of the curve. Substituting into $\frac{dy}{dx}$ always gives 0.
:::

:::mistake{title="Reversing the second-derivative test"}
Negative second derivative means **maximum** (the curve is "frowning"); positive means **minimum**.
:::

:::mistake{title="Concluding from d²y/dx² = 0"}
A zero second derivative does not mean "no maximum or minimum". $y = x^4$ has a minimum where $\frac{d^2y}{dx^2} = 0$. Use the change of sign instead.
:::

:::mistake{title="Dividing by x and losing a solution"}
When solving $\frac{dy}{dx} = 0$, factorise rather than divide: dividing $3x^2 - 6x = 0$ by $x$ loses $x = 0$.
:::

## Exam tips

:::exam-tip
"Determine the nature" earns its mark only with a reason. Write, for example, "$\frac{d^2y}{dx^2} = -6 < 0$, so maximum". A bare "maximum" scores nothing.
:::

:::exam-tip
In a first-derivative test, show the actual $x$-values you used and the sign (or value) of the gradient at each.
:::

:::exam-tip
Give coordinates exactly, such as $\left(1, \frac{1}{\mathrm{e}}\right)$ or $\left(\frac{\pi}{3}, \sqrt{3}\right)$, unless the question asks for decimals.
:::

## Summary

:::summary
- Stationary points: solve $\dfrac{dy}{dx} = 0$, then find $y$ from the curve.
- Second-derivative test: $\dfrac{d^2y}{dx^2} < 0$ maximum, $> 0$ minimum, $= 0$ inconclusive.
- First-derivative test: $+ \to 0 \to -$ maximum; $- \to 0 \to +$ minimum.
- Always give the reason with the conclusion.
- Points of inflexion are not examined in this syllabus.
:::
