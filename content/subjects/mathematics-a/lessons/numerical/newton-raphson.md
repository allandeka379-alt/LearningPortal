---
{
  "key": "numerical.newton-raphson",
  "title": "The Newton–Raphson method",
  "summary": "Derive the Newton–Raphson formula from the tangent to a curve, use it to find roots of equations to a stated accuracy, and recognise when it fails or converges to an unwanted root.",
  "concepts": ["amaths.numerical.newton-raphson"],
  "estimatedMinutes": 40,
  "level": "core"
}
---
## Introduction

Fixed-point iteration needs a good rearrangement and can be slow. The Newton–Raphson method is a single, general recipe that usually converges very fast: near a root, the number of correct decimal places roughly doubles at each step. It is the method inside calculator "SOLVE" keys, spreadsheet goal-seek tools and the software that engineers use to balance ZESA's electricity network.

The idea is geometric. Near a root, a smooth curve looks almost straight, so replace the curve by its tangent, find where the tangent crosses the $x$-axis, and use that point as the next approximation.

The Newton–Raphson method is in the ZIMSEC Pure Mathematics syllabus (Form 6, topic 6.6, Numerical methods): learners derive the formula, use it to solve equations, and recognise when an iterative method may fail. It is not in Cambridge 9709.

## Key definitions

:::formula{name="Newton–Raphson formula"}
$$
x_{n+1} = x_n - \frac{f(x_n)}{f'(x_n)}
$$
:::

:::definition{term="Starting value"}
The first approximation $x_1$, usually found by a change of sign or a sketch. The method needs $f'(x_1) \ne 0$, and works best when $x_1$ is close to the root.
:::

## Deriving the formula

Let $x_n$ be an approximation to a root $\alpha$ of $f(x) = 0$. The tangent to $y = f(x)$ at the point $(x_n, f(x_n))$ has gradient $f'(x_n)$, so its equation is

$$
y - f(x_n) = f'(x_n)(x - x_n)
$$

The tangent meets the $x$-axis where $y = 0$:

$$
-f(x_n) = f'(x_n)(x - x_n) \quad\Rightarrow\quad x = x_n - \frac{f(x_n)}{f'(x_n)}
$$

This crossing point is the next approximation, $x_{n+1}$. Equivalently, the gradient of the tangent is $\dfrac{f(x_n)}{x_n - x_{n+1}}$; setting this equal to $f'(x_n)$ and rearranging gives the same formula.

## Using the method

1. Write the equation as $f(x) = 0$ and find $f'(x)$.
2. Simplify $x - \dfrac{f(x)}{f'(x)}$ into a single fraction if that makes the calculator work easier.
3. Iterate from the starting value until successive values agree to the required accuracy.
4. If asked to justify the accuracy, show a change of sign half a unit either side.

:::worked-solution[Example 1: use the Newton–Raphson method with $x_1 = 2$ to find the root of $x^3 - 2x - 5 = 0$ correct to 3 decimal places]
1. $f(x) = x^3 - 2x - 5$ and $f'(x) = 3x^2 - 2$.
2. $x_{n+1} = x_n - \dfrac{x_n^3 - 2x_n - 5}{3x_n^2 - 2}$.
3. $x_2 = 2 - \dfrac{8 - 4 - 5}{12 - 2} = 2 - \dfrac{-1}{10} = 2.1$.
4. $x_3 = 2.1 - \dfrac{9.261 - 4.2 - 5}{13.23 - 2} = 2.1 - \dfrac{0.061}{11.23} = 2.094568$.
5. $x_4 = 2.094551$, and $x_5 = 2.094551$ again.
6. To 3 decimal places the root is $2.095$. Check: $f(2.0945) = -0.00057 < 0$ and $f(2.0955) = 0.0106 > 0$.
:::

![Graph of y = x^3 - 2x - 5 near its root: the tangent at x1 = 2 (gradient 10) meets the x-axis at x2 = 2.1, and the tangent at x2 meets it at x3 = 2.0946, very close to the root 2.0946.](media:diagrams/newton-raphson-tangent-steps.png "Figure: each tangent meets the x-axis closer to the root: 2, 2.1, 2.0946")

Notice how fast the error shrinks: $x_2$ is wrong in the second decimal place, $x_3$ in the fifth, $x_4$ in the eleventh.

:::worked-solution[Example 2: use the method to find $\sqrt{10}$ correct to 5 decimal places]
1. $\sqrt{10}$ is a root of $f(x) = x^2 - 10 = 0$, with $f'(x) = 2x$.
2. $x_{n+1} = x_n - \dfrac{x_n^2 - 10}{2x_n} = \dfrac{1}{2}\left(x_n + \dfrac{10}{x_n}\right)$.
3. Start at $x_1 = 3$ (since $3^2 = 9$ is close to 10).
4. $x_2 = \frac{1}{2}\left(3 + \frac{10}{3}\right) = 3.166667$, $x_3 = 3.162281$, $x_4 = 3.162278$.
5. $\sqrt{10} = 3.16228$ to 5 decimal places.
:::

The formula in step 2, "average $x$ and $\frac{10}{x}$", is the ancient Babylonian method for square roots: Newton–Raphson explains why it works.

## When the method fails

The tangent idea breaks down in three ways.

- **A stationary point near the start.** If $f'(x_n)$ is zero or very small, the tangent is nearly horizontal and meets the axis far away (or not at all).
- **Convergence to a different root.** A starting value between two roots may send the iteration to the root you did not want.
- **Oscillation or divergence.** For some curves the iterates jump back and forth or move away; a poor starting value far from the root makes this more likely.

:::worked-solution[Example 3 (exam style): $f(x) = \mathrm{e}^x - 3x$ has roots $\alpha \approx 0.619$ and $\beta \approx 1.512$. (a) Show that $x_1 = 1$ leads to $x_2 = 0$. (b) Explain why $x_1 = 1.1$ is a poor starting value. (c) Find $\beta$ correct to 3 decimal places using $x_1 = 2$.]
1. $f'(x) = \mathrm{e}^x - 3$.
2. (a) $f(1) = \mathrm{e} - 3$ and $f'(1) = \mathrm{e} - 3$, so $x_2 = 1 - \dfrac{\mathrm{e} - 3}{\mathrm{e} - 3} = 0$. The iteration then continues $0.5, 0.61006, 0.61900, 0.61906$, converging to $\alpha$, not to the nearer root $\beta$.
3. (b) $f'(x) = 0$ at $x = \ln 3 = 1.0986$, a minimum of the curve. At $x_1 = 1.1$ the tangent is almost horizontal: $x_2 = 72.1$, far from both roots.
4. (c) From $x_1 = 2$: $x_2 = 1.68352$, $x_3 = 1.54348$, $x_4 = 1.51349$, $x_5 = 1.51214$, $x_6 = 1.51213$.
5. So $\beta = 1.512$ correct to 3 decimal places.
:::

## Newton–Raphson and fixed-point iteration

Newton–Raphson is itself a fixed-point iteration with $F(x) = x - \dfrac{f(x)}{f'(x)}$. Differentiating gives $F'(x) = \dfrac{f(x)f''(x)}{[f'(x)]^2}$, which is **zero** at a root. That is why convergence near a root is so fast (much faster than a typical rearrangement with $|F'(\alpha)| = 0.5$, say), and also why trouble comes when $f'(x)$ is small.

## Common mistakes

:::mistake{title="Adding instead of subtracting"}
The formula is $x_n - \frac{f(x_n)}{f'(x_n)}$. A plus sign moves you away from the root.
:::

:::mistake{title="Differentiating wrongly"}
Check $f'(x)$ before iterating: one slip in the derivative still produces a sequence, but it converges slowly or to nothing.
:::

:::mistake{title="Degree mode"}
For trigonometric functions use radians, because the derivative of $\sin x$ is $\cos x$ only in radians.
:::

:::mistake{title="Assuming the nearest root is found"}
The method finds a root, not necessarily the nearest one. Check which root your iterates approach.
:::

## Exam tips

:::exam-tip
When asked to "derive" the formula, draw (or describe) the tangent at $(x_n, f(x_n))$, write its equation, and set $y = 0$.
:::

:::exam-tip
Write down $f(x)$, $f'(x)$ and the iteration formula before any numbers: these lines carry method marks.
:::

:::exam-tip
Give iterates to at least one more decimal place than the final answer, and finish with a change-of-sign check if the question asks you to justify the accuracy.
:::

## Summary

:::summary
- Newton–Raphson: $x_{n+1} = x_n - \dfrac{f(x_n)}{f'(x_n)}$, from where the tangent at $x_n$ meets the $x$-axis.
- Near a root it converges very fast (correct digits roughly double each step).
- It fails or misbehaves when $f'(x_n)$ is near zero, when the start is poor, or when the iterates head to another root.
- Justify accuracy with a change of sign half a unit either side of the answer.
:::
