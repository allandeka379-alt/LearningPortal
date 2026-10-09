---
{
  "key": "calculus.derivative-idea",
  "title": "Gradients of curves and the derived function",
  "summary": "See the gradient of a curve at a point as the gradient of its tangent, approach it through a sequence of chords, find simple gradient functions from first principles (ZIMSEC) and use the notations dy/dx, f′(x), d²y/dx² and f″(x).",
  "concepts": ["amath.calculus.derivative-idea"],
  "estimatedMinutes": 40,
  "freePreview": true,
  "level": "core"
}
---
## Introduction

A straight line has one gradient everywhere. A curve does not: the graph of the height of water in a Masvingo tank as it fills, or of the distance a kombi has travelled along the Harare–Mutare road, is steep in some places and nearly flat in others. Differentiation is the branch of mathematics that measures **how steep a curve is at a single point**, and so how fast one quantity changes with another at a single instant.

Everything else in the calculus section of Additional Mathematics is built on this idea: tangents and normals, stationary points, rates of change, small increments and, in reverse, integration. Both ZIMSEC and Cambridge expect you to understand what a derivative *means* and to use its notation fluently. ZIMSEC also asks you to find the gradient of a simple curve **from first principles**, that is from the gradients of chords. Cambridge needs only the informal idea and states that first principles will not be examined.

You should already be able to find the gradient of a straight line through two points, $m = \dfrac{y_2 - y_1}{x_2 - x_1}$, and to expand brackets such as $(x + h)^2$ and $(x + h)^3$.

## Key definitions

:::definition{term="Tangent"}
The tangent to a curve at a point $P$ is the straight line that touches the curve at $P$ and has the same direction as the curve there. Near $P$, the curve and its tangent are almost indistinguishable.
:::

:::definition{term="Gradient of a curve at a point"}
The gradient of a curve at a point $P$ is the gradient of the tangent to the curve at $P$.
:::

:::definition{term="Chord"}
A straight line joining two points on a curve. If $P$ is fixed and $Q$ moves along the curve towards $P$, the gradient of the chord $PQ$ gets closer and closer to the gradient of the tangent at $P$.
:::

:::definition{term="Derived function (derivative)"}
The function that gives the gradient of the curve $y = f(x)$ at every value of $x$. It is written $\dfrac{dy}{dx}$ or $f'(x)$. Finding it is called **differentiating**.
:::

:::formula{name="Gradient from first principles (not in Cambridge's List of formulas)"}
$$
f'(x) = \lim_{h \to 0} \frac{f(x + h) - f(x)}{h}
$$
:::

## From chords to the tangent

Take the curve $y = x^2$ and the point $P(3, 9)$ on it. We cannot find the gradient of the tangent at $P$ with the two-point formula, because we know only one point on the tangent. Instead we take a second point $Q$ on the **curve**, a horizontal distance $h$ from $P$, and find the gradient of the chord $PQ$. Then we let $h$ shrink.

:::worked-solution[Example 1: estimate the gradient of $y = x^2$ at $P(3, 9)$ using chords]
1. Let $Q$ be the point on the curve with $x = 3 + h$, so $Q$ is $(3 + h, (3 + h)^2)$.
2. Gradient of $PQ = \dfrac{(3 + h)^2 - 9}{(3 + h) - 3} = \dfrac{9 + 6h + h^2 - 9}{h} = \dfrac{6h + h^2}{h} = 6 + h$.
3. Calculate it for smaller and smaller $h$ (see the table below): $h = 1$ gives $7$; $h = 0.1$ gives $6.1$; $h = 0.01$ gives $6.01$; $h = 0.001$ gives $6.001$.
4. As $h$ approaches 0 the chord gradients approach 6. The gradient of the curve at $P$ is $6$.
:::

| $h$ | $x$-coordinate of $Q$ | gradient of $PQ$ |
| --- | --- | --- |
| 1 | 4 | 7 |
| 0.1 | 3.1 | 6.1 |
| 0.01 | 3.01 | 6.01 |
| 0.001 | 3.001 | 6.001 |

The same happens if $Q$ is to the left of $P$: with $h = -0.1$ the chord gradient is $5.9$, and with $h = -0.01$ it is $5.99$. Both sequences close in on 6 from opposite sides. We say the gradient of the chord **tends to** 6 as $h$ tends to 0, and write $\lim_{h \to 0} (6 + h) = 6$.

Notice the important step in line 2: we cancelled $h$ **before** letting $h$ become 0. Putting $h = 0$ straight into $\dfrac{(3 + h)^2 - 9}{h}$ would give $\dfrac{0}{0}$, which has no meaning. The chord idea works because $h$ is small but never actually zero while we simplify.

## The derived function from first principles

Repeating Example 1 at every point at once gives a formula for the gradient. Replace the number 3 by a general $x$.

:::worked-solution[Example 2: find from first principles the gradient function of $y = 2x^2 - 5x$, and the gradient at $x = 2$]
1. Let $f(x) = 2x^2 - 5x$. Then $f(x + h) = 2(x + h)^2 - 5(x + h) = 2x^2 + 4xh + 2h^2 - 5x - 5h$.
2. $f(x + h) - f(x) = 4xh + 2h^2 - 5h$.
3. Gradient of the chord: $\dfrac{f(x + h) - f(x)}{h} = \dfrac{4xh + 2h^2 - 5h}{h} = 4x + 2h - 5$.
4. As $h \to 0$, $2h \to 0$, so $\dfrac{dy}{dx} = 4x - 5$.
5. At $x = 2$: $\dfrac{dy}{dx} = 4(2) - 5 = 3$. The tangent at $(2, -2)$ has gradient 3.
:::

:::worked-solution[Example 3: show from first principles that the derivative of $f(x) = x^3 - 4x$ is $3x^2 - 4$, then find $f'(2)$, $f'(-1)$ and $f'(0)$]
1. $f(x + h) = (x + h)^3 - 4(x + h) = x^3 + 3x^2h + 3xh^2 + h^3 - 4x - 4h$.
2. $f(x + h) - f(x) = 3x^2h + 3xh^2 + h^3 - 4h$.
3. Divide by $h$: $\dfrac{f(x + h) - f(x)}{h} = 3x^2 + 3xh + h^2 - 4$.
4. Let $h \to 0$: the terms $3xh$ and $h^2$ vanish, so $f'(x) = 3x^2 - 4$, as required.
5. $f'(2) = 3(4) - 4 = 8$, $f'(-1) = 3(1) - 4 = -1$ and $f'(0) = -4$.
6. Interpretation: the curve rises steeply at $x = 2$, falls gently at $x = -1$ and falls more steeply at $x = 0$.
:::

In the next lessons you will learn rules that give these results in one line. First principles explain *why* the rules work, and ZIMSEC may ask you to show the method for simple polynomials.

## Notation

Several notations mean the same thing, and examiners use all of them.

| Notation | Read as | Meaning |
| --- | --- | --- |
| $\dfrac{dy}{dx}$ | "d y by d x" | gradient function of $y$ with respect to $x$ |
| $f'(x)$ | "f dash of x" | gradient function of $f$ |
| $f'(a)$ or $\left.\dfrac{dy}{dx}\right\vert_{x = a}$ | | gradient of the curve at $x = a$ |
| $\dfrac{d}{dx}(\ldots)$ | "d by d x of" | an instruction: differentiate what is in the brackets |
| $\dfrac{d^2y}{dx^2}$ or $f''(x)$ | "d two y by d x squared" | the second derivative: the derivative of $\dfrac{dy}{dx}$ |

$\dfrac{dy}{dx}$ is a single symbol, not a fraction $dy \div dx$, although it often behaves like one. It tells you which variable depends on which: $\dfrac{dA}{dr}$ is the rate of change of $A$ with respect to $r$, and $\dfrac{dV}{dt}$ the rate of change of $V$ with respect to time $t$.

The **second derivative** measures how fast the gradient itself is changing. For $f(x) = x^3 - 4x$ the gradient $3x^2 - 4$ changes too; differentiating it gives $f''(x) = 6x$. You will use the second derivative to classify stationary points.

## What the sign of the derivative tells you

- If $\dfrac{dy}{dx} > 0$ at a point, $y$ is **increasing** there: the curve goes up from left to right.
- If $\dfrac{dy}{dx} < 0$, $y$ is **decreasing** there.
- If $\dfrac{dy}{dx} = 0$, the tangent is horizontal: the point is a **stationary point**.

The size of the derivative tells you how steep: a gradient of 8 is steeper than a gradient of 3, and a gradient of $-5$ is steeper (downhill) than $-1$.

:::keyfact{title="ZIMSEC and Cambridge"}
ZIMSEC (Form 3) asks you to approximate the gradient of a tangent from a sequence of chords and, in simple cases, to find a gradient function from first principles. Cambridge 0606 needs only the informal idea of a derived function and the notations; first principles are excluded, so Cambridge questions go straight to the rules of differentiation.
:::

## Common mistakes

:::mistake{title="Putting h = 0 too early"}
Substituting $h = 0$ before cancelling gives $\frac{0}{0}$. Expand, simplify, divide every term by $h$, and only then let $h \to 0$.
:::

:::mistake{title="Forgetting to subtract f(x)"}
The numerator is $f(x + h) - f(x)$. Leaving out $- f(x)$ means the terms without $h$ never cancel and the method collapses.
:::

:::mistake{title="Expanding (x + h)² as x² + h²"}
$(x + h)^2 = x^2 + 2xh + h^2$ and $(x + h)^3 = x^3 + 3x^2h + 3xh^2 + h^3$. The middle terms carry the answer.
:::

:::mistake{title="Confusing f′(a) with f(a)"}
$f(a)$ is the $y$-coordinate of the point; $f'(a)$ is the gradient there. Substitute into the derivative, not into the original function, when a gradient is asked for.
:::

## Exam tips

:::exam-tip
"From first principles" means you must show $f(x + h)$, the subtraction, the division by $h$ and the limit, in that order. A correct answer obtained with the rules scores nothing for the method.
:::

:::exam-tip
When asked to *estimate* a gradient from chords, show each chord gradient and state the value the sequence approaches. Choose $Q$ close to $P$, for example $h = 0.1$, $0.01$, $0.001$.
:::

:::exam-tip
Read the notation carefully: "find $f''(x)$" asks for the second derivative, and "find $\frac{dy}{dx}$ when $x = 2$" asks for a number, not a formula.
:::

## Summary

:::summary
- The gradient of a curve at a point is the gradient of its tangent there.
- The gradients of chords $PQ$ approach the gradient of the tangent as $Q$ moves towards $P$.
- First principles (ZIMSEC): $f'(x) = \lim_{h \to 0} \dfrac{f(x + h) - f(x)}{h}$; simplify and cancel $h$ before letting $h \to 0$.
- $\dfrac{dy}{dx}$ and $f'(x)$ give the gradient function; $\dfrac{d^2y}{dx^2}$ and $f''(x)$ the second derivative.
- Positive derivative: increasing; negative: decreasing; zero: stationary point.
:::
