---
{
  "key": "calculus.differentiating-powers",
  "title": "Differentiating powers of x",
  "summary": "Differentiate xⁿ for any rational n, with constant multiples, sums and differences; rewrite roots, reciprocals, products and simple quotients as powers first; evaluate gradients at points and find second derivatives.",
  "concepts": ["amath.calculus.differentiating-powers"],
  "estimatedMinutes": 40,
  "level": "core"
}
---
## Introduction

First principles show what a derivative is, but they are slow. Working through $x^2$, $x^3$ and $x^4$ from first principles gives $2x$, $3x^2$ and $4x^3$, and the pattern is clear: **bring the power down and reduce it by one**. This single rule, with two simple extensions for constants and sums, differentiates every polynomial and every expression made of powers of $x$, including roots such as $\sqrt{x}$ and reciprocals such as $\dfrac{1}{x^2}$.

It is the most used technique in the whole calculus section. Every question on tangents, stationary points, rates of change and small increments starts with differentiating powers, and integration is this rule in reverse. Both ZIMSEC and Cambridge examine it, and Cambridge Paper 1 expects you to do it, and the arithmetic with fractional and negative indices, without a calculator.

You need the laws of indices: $\sqrt{x} = x^{\frac{1}{2}}$, $\sqrt[3]{x^2} = x^{\frac{2}{3}}$, $\dfrac{1}{x^n} = x^{-n}$, $x^a \times x^b = x^{a+b}$ and $\dfrac{x^a}{x^b} = x^{a-b}$.

## Key definitions

:::formula{name="Derivative of a power (not in Cambridge's List of formulas: learn it)"}
$$
\frac{d}{dx}\left(x^n\right) = n x^{n-1} \qquad \text{for any rational } n
$$
:::

:::formula{name="Constant multiples, sums and constants"}
$$
\frac{d}{dx}\left(a x^n\right) = a n x^{n-1}, \qquad \frac{d}{dx}\big(f(x) \pm g(x)\big) = f'(x) \pm g'(x), \qquad \frac{d}{dx}(c) = 0
$$
:::

:::definition{term="Second derivative"}
The result of differentiating $\dfrac{dy}{dx}$ again, written $\dfrac{d^2y}{dx^2}$ or $f''(x)$.
:::

## The rule in action

Two special cases are worth knowing by heart. A term $ax$ is $ax^1$, so its derivative is $a \times 1 \times x^0 = a$: the line $y = ax$ has gradient $a$ everywhere. A constant $c$ is $cx^0$, so its derivative is $0$: adding a constant moves a graph up or down without changing its steepness.

:::worked-solution[Example 1: differentiate $y = 4x^5 - 3x^2 + 7x - 2$]
1. Differentiate term by term.
2. $4x^5 \to 4 \times 5x^4 = 20x^4$.
3. $-3x^2 \to -3 \times 2x = -6x$.
4. $7x \to 7$ and $-2 \to 0$.
5. $\dfrac{dy}{dx} = 20x^4 - 6x + 7$.
:::

## Roots and reciprocals: rewrite as powers first

The rule works only on terms of the form $ax^n$. Before differentiating, rewrite every root as a fractional power and every term with $x$ in the denominator as a negative power. With a negative index, "reduce the power by one" makes it **more** negative: $x^{-3}$ becomes $-3x^{-4}$, not $-3x^{-2}$.

:::worked-solution[Example 2: differentiate $y = 6\sqrt{x} + \dfrac{2}{x^3} - \dfrac{1}{4x}$]
1. Rewrite: $y = 6x^{\frac{1}{2}} + 2x^{-3} - \frac{1}{4}x^{-1}$. Note that $\frac{1}{4x} = \frac{1}{4}x^{-1}$: the 4 is not raised to the power.
2. $6x^{\frac{1}{2}} \to 6 \times \frac{1}{2}x^{-\frac{1}{2}} = 3x^{-\frac{1}{2}}$.
3. $2x^{-3} \to 2 \times (-3)x^{-4} = -6x^{-4}$.
4. $-\frac{1}{4}x^{-1} \to -\frac{1}{4} \times (-1)x^{-2} = \frac{1}{4}x^{-2}$.
5. $\dfrac{dy}{dx} = 3x^{-\frac{1}{2}} - 6x^{-4} + \frac{1}{4}x^{-2} = \dfrac{3}{\sqrt{x}} - \dfrac{6}{x^4} + \dfrac{1}{4x^2}$.
:::

## Products and quotients: expand or divide first

There is no rule that says "differentiate each factor". The derivative of $(2x - 1)(x + 3)$ is **not** $2 \times 1$. Until you meet the product and quotient rules, multiply out brackets, and split a fraction with a single-term denominator into separate powers.

:::worked-solution[Example 3: differentiate (a) $y = (2x - 1)(x + 3)$, (b) $y = \dfrac{x^2 + 3}{\sqrt{x}}$]
1. (a) Expand: $y = 2x^2 + 6x - x - 3 = 2x^2 + 5x - 3$.
2. $\dfrac{dy}{dx} = 4x + 5$.
3. (b) Divide each term by $x^{\frac{1}{2}}$: $y = \dfrac{x^2}{x^{\frac{1}{2}}} + \dfrac{3}{x^{\frac{1}{2}}} = x^{\frac{3}{2}} + 3x^{-\frac{1}{2}}$.
4. $\dfrac{dy}{dx} = \frac{3}{2}x^{\frac{1}{2}} + 3 \times \left(-\frac{1}{2}\right)x^{-\frac{3}{2}} = \frac{3}{2}x^{\frac{1}{2}} - \frac{3}{2}x^{-\frac{3}{2}}$.
:::

## Gradients at points and second derivatives

To find the gradient at a point, differentiate first and then substitute the $x$-coordinate. To find where the gradient has a given value, set the derivative equal to that value and solve.

:::worked-solution[Example 4: $f(x) = 2x^3 - 9x^2 + 12x$. Find $f'(x)$ and $f''(x)$, and the points on the curve $y = f(x)$ where the gradient is 12]
1. $f'(x) = 6x^2 - 18x + 12$.
2. $f''(x) = 12x - 18$.
3. Gradient 12: $6x^2 - 18x + 12 = 12$, so $6x^2 - 18x = 0$, that is $6x(x - 3) = 0$.
4. $x = 0$ or $x = 3$.
5. $f(0) = 0$ and $f(3) = 54 - 81 + 36 = 9$.
6. The gradient is 12 at $(0, 0)$ and at $(3, 9)$. (At $x = 3$, $f''(3) = 18$.)
:::

:::worked-solution[Example 5: find the gradient of $y = x\sqrt{x} - \dfrac{8}{\sqrt{x}}$ at the point where $x = 4$]
1. Rewrite: $x\sqrt{x} = x^1 \times x^{\frac{1}{2}} = x^{\frac{3}{2}}$ and $\dfrac{8}{\sqrt{x}} = 8x^{-\frac{1}{2}}$, so $y = x^{\frac{3}{2}} - 8x^{-\frac{1}{2}}$.
2. $\dfrac{dy}{dx} = \frac{3}{2}x^{\frac{1}{2}} + 4x^{-\frac{3}{2}}$.
3. At $x = 4$: $4^{\frac{1}{2}} = 2$ and $4^{-\frac{3}{2}} = \dfrac{1}{8}$.
4. $\dfrac{dy}{dx} = \frac{3}{2}(2) + 4 \times \frac{1}{8} = 3 + \frac{1}{2} = \frac{7}{2}$.
:::

Evaluating powers such as $4^{-\frac{3}{2}}$ by hand is a skill Cambridge Paper 1 tests often: take the root first, then the power, then the reciprocal: $4^{\frac{1}{2}} = 2$, $2^3 = 8$, so $4^{-\frac{3}{2}} = \frac{1}{8}$.

:::keyfact{title="ZIMSEC and Cambridge"}
Both syllabuses use exactly the same rule, $\dfrac{d}{dx}(ax^n) = anx^{n-1}$, for rational $n$. Cambridge gives no calculus formulas in its List of formulas, and ZIMSEC prints none either, so the rule must be memorised. Both write answers with positive indices or with negative and fractional indices: either form scores.
:::

## Common mistakes

:::mistake{title="Differentiating a root without rewriting it"}
$\sqrt{x}$ must become $x^{\frac{1}{2}}$ first. Its derivative is $\frac{1}{2}x^{-\frac{1}{2}} = \dfrac{1}{2\sqrt{x}}$, not $\frac{1}{2}\sqrt{x}$.
:::

:::mistake{title="Reducing a negative power the wrong way"}
$\dfrac{d}{dx}\left(x^{-2}\right) = -2x^{-3}$. Subtracting 1 from $-2$ gives $-3$, not $-1$.
:::

:::mistake{title="Moving a coefficient into the denominator power"}
$\dfrac{3}{x^2} = 3x^{-2}$ (derivative $-6x^{-3}$), but $\dfrac{1}{3x^2} = \frac{1}{3}x^{-2}$ (derivative $-\frac{2}{3}x^{-3}$). Only the $x$ part moves up with a negative index.
:::

:::mistake{title="Differentiating brackets factor by factor"}
The derivative of a product is not the product of the derivatives. Expand first (or use the product rule).
:::

## Exam tips

:::exam-tip
Write the rewritten form, with every term as $ax^n$, as a separate line of working. Examiners award a method mark for it, and it is where most errors are caught.
:::

:::exam-tip
"Find the gradient at $x = 4$" needs a number. Differentiate, then substitute, and give an exact value such as $\frac{7}{2}$ unless a decimal is asked for.
:::

:::exam-tip
When a question asks for $\dfrac{d^2y}{dx^2}$, differentiate your simplified $\dfrac{dy}{dx}$ again; it is often needed later to classify stationary points.
:::

## Summary

:::summary
- $\dfrac{d}{dx}(ax^n) = anx^{n-1}$ for any rational $n$; the derivative of $ax$ is $a$ and of a constant is $0$.
- Differentiate sums and differences term by term.
- Rewrite roots as fractional powers and reciprocals as negative powers before differentiating.
- Expand products and split simple quotients into powers first.
- Gradient at a point: differentiate, then substitute; second derivative: differentiate again.
:::
