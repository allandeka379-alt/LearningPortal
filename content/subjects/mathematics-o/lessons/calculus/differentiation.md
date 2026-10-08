---
{
  "key": "calculus.differentiation",
  "title": "Differentiation and stationary points",
  "summary": "Differentiate sums of terms axⁿ, use dy/dx to find the exact gradient of a curve at a point, find stationary points and decide whether each is a maximum or a minimum, and solve simple optimisation problems.",
  "concepts": ["math.calculus.differentiation"],
  "objectives": ["cambridge/igcse/mathematics:2.12.2", "cambridge/igcse/mathematics:2.12.3", "cambridge/igcse/mathematics:2.12.4"],
  "estimatedMinutes": 40,
  "level": "extended"
}
---
## Introduction

Chipo has 40 metres of fencing to make a rectangular goat pen against the long wall of her family's storeroom in Murehwa, so she only needs to fence three sides. Which width gives the goats the largest possible area? Trying different widths would get close, but **differentiation** gives the exact answer in a few lines.

In the lesson on the gradient of a curve, you estimated gradients by drawing tangents. Differentiation finds the gradient **exactly**, from the equation of the curve. It is part of the Cambridge Extended syllabus, and it is the start of calculus, which you will meet again at A Level.

You should already be able to expand brackets, solve quadratic equations and find the gradient of a straight line.

## Key definitions

:::definition{term="Derivative (gradient function)"}
For a curve $y = f(x)$, the derivative $\dfrac{dy}{dx}$ is a formula that gives the gradient of the curve at any value of $x$. Finding it is called **differentiating**.
:::

:::definition{term="Stationary point (turning point)"}
A point where the gradient is zero, $\dfrac{dy}{dx} = 0$. It may be a **maximum** or a **minimum**.
:::

:::formula{name="The rule for differentiating"}
$$
y = ax^n \quad \Rightarrow \quad \frac{dy}{dx} = nax^{n - 1}
$$

Multiply by the power, then reduce the power by one. A constant term differentiates to $0$, and a sum is differentiated term by term.
:::

## Differentiating

| $y$ | $\dfrac{dy}{dx}$ | Reason |
| :---: | :---: | :---: |
| $x^5$ | $5x^4$ | power 5 comes down, power drops to 4 |
| $3x^4$ | $12x^3$ | $4 \times 3 = 12$ |
| $5x$ | $5$ | $x = x^1$, so $1 \times 5x^0 = 5$ |
| $7$ | $0$ | a constant does not change, so its gradient is 0 |

:::worked-solution[Example 1: differentiate $y = 2x^3 - 5x^2 + 4x - 1$]
1. $2x^3 \to 3 \times 2x^2 = 6x^2$.
2. $-5x^2 \to 2 \times (-5)x = -10x$.
3. $4x \to 4$, and $-1 \to 0$.
4. $\frac{dy}{dx} = 6x^2 - 10x + 4$.
:::

If the function has brackets, **expand first**: $y = (2x - 1)^2 = 4x^2 - 4x + 1$, so $\frac{dy}{dx} = 8x - 4$.

## The gradient at a point

Substitute the $x$-coordinate into $\frac{dy}{dx}$, not into $y$.

:::worked-solution[Example 2: gradient of $y = x^2 - 4x + 1$ at $x = 3$]
1. $\frac{dy}{dx} = 2x - 4$.
2. At $x = 3$: $\frac{dy}{dx} = 6 - 4 = 2$.
3. The curve is rising with gradient $2$ at the point $(3, -2)$.
:::

You can also work backwards: the gradient of $y = x^2 - 6x + 2$ is $4$ when $2x - 6 = 4$, that is at $x = 5$.

## Stationary points

At a maximum or minimum the tangent is horizontal, so $\frac{dy}{dx} = 0$.

:::worked-solution[Example 3: stationary points of $y = x^3 - 3x^2 - 9x + 5$]
1. $\frac{dy}{dx} = 3x^2 - 6x - 9$.
2. Set it to zero: $3x^2 - 6x - 9 = 0$, so $x^2 - 2x - 3 = 0$ and $(x - 3)(x + 1) = 0$.
3. $x = 3$ or $x = -1$.
4. $x = 3$: $y = 27 - 27 - 27 + 5 = -22$. $x = -1$: $y = -1 - 3 + 9 + 5 = 10$.
5. The stationary points are $(-1, 10)$ and $(3, -22)$.
:::

### Maximum or minimum?

**Method 1: the gradient either side.** Work out $\frac{dy}{dx}$ just before and just after the point.

- Positive, then zero, then negative: the curve goes up then down, so it is a **maximum**.
- Negative, then zero, then positive: a **minimum**.

For Example 3, at $x = -2$, $\frac{dy}{dx} = 12 + 12 - 9 = 15 > 0$; at $x = 0$, $\frac{dy}{dx} = -9 < 0$. So $(-1, 10)$ is a maximum. At $x = 4$, $\frac{dy}{dx} = 48 - 24 - 9 = 15 > 0$, so $(3, -22)$ is a minimum.

**Method 2: the second derivative.** Differentiate again to get $\frac{d^2y}{dx^2}$. If it is negative at the point, the point is a maximum; if positive, a minimum. Here $\frac{d^2y}{dx^2} = 6x - 6$, which is $-12$ at $x = -1$ (maximum) and $12$ at $x = 3$ (minimum).

## Optimisation: the goat pen

:::worked-solution[Example 4: the largest pen]
Chipo's pen has two sides of width $x$ m and one side of length $40 - 2x$ m (the wall is the fourth side).
1. Area $A = x(40 - 2x) = 40x - 2x^2$.
2. $\frac{dA}{dx} = 40 - 4x$.
3. $40 - 4x = 0$ gives $x = 10$.
4. $\frac{d^2A}{dx^2} = -4 < 0$, so this is a maximum.
5. The pen should be $10$ m wide and $40 - 20 = 20$ m long, giving the largest area, $200\ \text{m}^2$.
:::

## Common mistakes

:::mistake{title="Forgetting to reduce the power"}
$3x^4$ differentiates to $12x^3$, not $12x^4$. Bring the power down **and** subtract one from it.
:::

:::mistake{title="Keeping the constant"}
The constant term disappears: $y = x^2 + 7$ has $\frac{dy}{dx} = 2x$, not $2x + 7$.
:::

:::mistake{title="Substituting into the wrong formula"}
The gradient at $x = 3$ comes from $\frac{dy}{dx}$. Substituting into $y$ gives the height of the curve, not its gradient. But for the **coordinates** of a stationary point you do need $y$.
:::

:::mistake{title="Differentiating brackets directly"}
$(x + 3)(x - 2)$ does not differentiate to $1 \times 1 = 1$. Expand to $x^2 + x - 6$ first, giving $2x + 1$.
:::

## Exam tips

:::exam-tip
"Find the coordinates of the stationary points" needs both $x$ and $y$ for every point. Write them as coordinates at the end.
:::

:::exam-tip
To decide the nature of a point, any valid method is accepted, but you must show it: write the values of $\frac{dy}{dx}$ either side, or the value of $\frac{d^2y}{dx^2}$, and then state "maximum" or "minimum".
:::

:::exam-tip
In optimisation questions, finish with a sentence that answers the question in context, with units, such as "The largest area is $200\ \text{m}^2$, when the width is $10$ m."
:::

## Summary

:::summary
- $y = ax^n \Rightarrow \frac{dy}{dx} = nax^{n - 1}$; constants differentiate to $0$; differentiate term by term.
- Expand brackets before differentiating.
- Gradient at a point: substitute $x$ into $\frac{dy}{dx}$.
- Stationary points: solve $\frac{dy}{dx} = 0$, then find $y$.
- Maximum: gradient changes from $+$ to $-$ (or $\frac{d^2y}{dx^2} < 0$); minimum: from $-$ to $+$ (or $\frac{d^2y}{dx^2} > 0$).
:::
