---
{
  "key": "diff.first-principles",
  "title": "The gradient of a curve and differentiation from first principles",
  "summary": "See the gradient of a curve at a point as the limit of the gradients of chords, use the notations dy/dx, f′(x), d²y/dx² and f″(x), and (ZIMSEC) differentiate polynomials, rational functions, sin x and cos x from first principles.",
  "concepts": ["amaths.diff.first-principles"],
  "estimatedMinutes": 40,
  "freePreview": true,
  "level": "core"
}
---
## Introduction

A straight line has one gradient everywhere. A curve does not: the road from the Zambezi Escarpment down to Kariba is gentle in some places and steep in others. Calculus begins with one question: **how steep is a curve at a single point?**

You cannot find a gradient from one point alone, because a gradient needs two points. The idea of this lesson is to take a second point very close to the first, find the gradient of the chord joining them, and see what happens as the second point slides towards the first. The value that the chord gradients approach is the **gradient of the curve**, also called the **derivative**.

Every later differentiation topic rests on this idea. ZIMSEC Pure Mathematics (Form 5) asks you to differentiate **from first principles** (polynomials, rational functions, $\sin x$ and $\cos x$). Cambridge 9709 Paper 1 (topic 1.7) needs only the informal idea of chords approaching a tangent and the notation; it does not set formal first-principles proofs.

You should already be able to expand brackets such as $(x + h)^{3}$ and find the gradient of a line through two points.

## Key definitions

:::definition{term="Gradient of a curve"}
The gradient of a curve at a point $P$ is the gradient of the **tangent** to the curve at $P$. It equals the limit of the gradients of chords $PQ$ as $Q$ approaches $P$ along the curve.
:::

:::formula{name="The derivative from first principles"}
$$
f'(x) = \lim_{h \to 0} \frac{f(x + h) - f(x)}{h}
$$

Here $h$ is the horizontal distance from $P$ to $Q$, so the fraction is the gradient of chord $PQ$. This definition is not in Cambridge's formula list MF19; ZIMSEC prints no formula list. Learn it.
:::

:::definition{term="Notation"}
If $y = f(x)$, the derivative is written $\frac{dy}{dx}$ or $f'(x)$. Differentiating again gives the **second derivative**, $\frac{d^{2}y}{dx^{2}}$ or $f''(x)$, which measures how fast the gradient itself is changing. Some books write $\delta x$ and $\delta y$ for small changes, so the chord gradient is $\frac{\delta y}{\delta x}$.
:::

## Chords approaching a tangent

Take $y = x^{3}$ and the point $P(2, 8)$. Let $Q$ be the point on the curve with $x = 2 + h$. The gradient of chord $PQ$ is

$$
\frac{(2 + h)^{3} - 8}{h}.
$$

Computing this for smaller and smaller $h$:

| $h$ | 1 | 0.1 | 0.01 | 0.001 |
| --- | --- | --- | --- | --- |
| gradient of $PQ$ | 19 | 12.61 | 12.0601 | 12.006001 |

The gradients approach 12. Taking $Q$ to the **left** of $P$ (negative $h$) gives 11.41 for $h = -0.1$ and 11.9401 for $h = -0.01$, approaching 12 from below. So the gradient of $y = x^{3}$ at $x = 2$ is 12.

Algebra shows why. Expanding, $(2 + h)^{3} = 8 + 12h + 6h^{2} + h^{3}$, so the chord gradient is exactly $12 + 6h + h^{2}$. As $h \to 0$ the terms $6h$ and $h^{2}$ vanish, leaving 12. Notice that we **simplify first** and only then let $h$ tend to zero: putting $h = 0$ in the original fraction gives the meaningless $\frac{0}{0}$.

## Differentiating from first principles

The method for any function $f$:

1. Write down $f(x + h)$ and simplify $f(x + h) - f(x)$.
2. Divide by $h$, cancelling the common factor $h$ in every term.
3. Let $h \to 0$ and state the limit.

:::worked-solution[Example 1: differentiate $f(x) = x^{2} - 3x$ from first principles]
1. $f(x + h) = (x + h)^{2} - 3(x + h) = x^{2} + 2xh + h^{2} - 3x - 3h$.
2. $f(x + h) - f(x) = 2xh + h^{2} - 3h$.
3. Divide by $h$: $\dfrac{f(x + h) - f(x)}{h} = 2x + h - 3$.
4. As $h \to 0$, this tends to $2x - 3$.
5. So $f'(x) = 2x - 3$.
:::

Rational functions need a common denominator before you divide by $h$.

:::worked-solution[Example 2: differentiate $f(x) = \dfrac{1}{x}$ from first principles]
1. $f(x + h) - f(x) = \dfrac{1}{x + h} - \dfrac{1}{x} = \dfrac{x - (x + h)}{x(x + h)} = \dfrac{-h}{x(x + h)}$.
2. Divide by $h$: $\dfrac{f(x + h) - f(x)}{h} = \dfrac{-1}{x(x + h)}$.
3. As $h \to 0$, $x(x + h) \to x^{2}$.
4. So $f'(x) = -\dfrac{1}{x^{2}}$.
:::

### Sine and cosine (ZIMSEC)

For trigonometric functions you need two limits, valid only when $h$ is measured in **radians**:

$$
\lim_{h \to 0} \frac{\sin h}{h} = 1, \qquad \lim_{h \to 0} \frac{\cos h - 1}{h} = 0.
$$

A calculator check: with $h = 0.01$ radians, $\frac{\sin h}{h} \approx 0.99998$ and $\frac{\cos h - 1}{h} \approx -0.005$. In degrees the first limit would be $\frac{\pi}{180}$, not 1, which is why calculus always uses radians.

:::worked-solution[Example 3: show from first principles that the derivative of $\sin x$ is $\cos x$]
1. Use the compound-angle formula: $\sin(x + h) = \sin x \cos h + \cos x \sin h$.
2. $\sin(x + h) - \sin x = \sin x(\cos h - 1) + \cos x \sin h$.
3. Divide by $h$: $\sin x \cdot \dfrac{\cos h - 1}{h} + \cos x \cdot \dfrac{\sin h}{h}$.
4. As $h \to 0$: $\sin x \times 0 + \cos x \times 1 = \cos x$.
5. So $\dfrac{d}{dx}(\sin x) = \cos x$ for $x$ in radians.
:::

The same steps with $\cos(x + h) = \cos x \cos h - \sin x \sin h$ give $\frac{d}{dx}(\cos x) = -\sin x$.

:::worked-solution[Example 4: an exam-style "show that" for $y = x^{3} + 2x$]
The points $P$ and $Q$ on $y = x^{3} + 2x$ have $x$-coordinates 1 and $1 + h$. Show that the gradient of $PQ$ is $5 + 3h + h^{2}$ and hence find the gradient of the curve at $P$.

1. At $P$: $y = 1 + 2 = 3$.
2. At $Q$: $y = (1 + h)^{3} + 2(1 + h) = 1 + 3h + 3h^{2} + h^{3} + 2 + 2h = 3 + 5h + 3h^{2} + h^{3}$.
3. Gradient of $PQ$: $\dfrac{5h + 3h^{2} + h^{3}}{h} = 5 + 3h + h^{2}$, as required.
4. As $h \to 0$ the gradient tends to 5, so the gradient of the curve at $P$ is 5.
:::

## The second derivative

Once you have the gradient function, you can differentiate it again. For $y = x^{4} - 6x^{2}$, the rules of the next lesson give $\frac{dy}{dx} = 4x^{3} - 12x$ and $\frac{d^{2}y}{dx^{2}} = 12x^{2} - 12$. At $x = 2$ the second derivative is 36: the gradient is increasing rapidly there. The second derivative is used to classify stationary points and, in mechanics, to find acceleration from displacement.

:::keyfact{title="ZIMSEC and Cambridge"}
ZIMSEC: differentiation from first principles is examined for polynomials, rational functions and $\sin x$, $\cos x$ (not exponential or logarithmic functions). Cambridge (Paper 1): only the informal idea of the gradient as the limit of chord gradients, with the notation; formal first-principles proofs are not required.
:::

## Common mistakes

:::mistake{title="Putting h = 0 too early"}
Substituting $h = 0$ into $\frac{f(x + h) - f(x)}{h}$ gives $\frac{0}{0}$, which has no value. Cancel the factor $h$ first; only then let $h \to 0$.
:::

:::mistake{title="Writing f(x) + h instead of f(x + h)"}
For $f(x) = x^{2} - 3x$, $f(x + h)$ is $(x + h)^{2} - 3(x + h)$, not $x^{2} - 3x + h$. Replace **every** $x$ by $x + h$.
:::

:::mistake{title="Dropping the limit notation"}
Writing "$= 2x + h - 3 = 2x - 3$" is false while $h \neq 0$. Write "as $h \to 0$" or use $\lim_{h \to 0}$ on the last line; examiners look for it.
:::

:::mistake{title="Using degrees with sine and cosine"}
The limit $\frac{\sin h}{h} \to 1$ holds only in radians, so $\frac{d}{dx}(\sin x) = \cos x$ only in radians.
:::

## Exam tips

:::exam-tip
"Differentiate from first principles" (ZIMSEC) means the limit method. A correct answer obtained by the rule $x^{n} \to nx^{n - 1}$ earns no marks for that question.
:::

:::exam-tip
In a "show that" chord question, show the expansion of $f(x + h)$ in full and divide each term by $h$; the answer is given, so the marks are for the working.
:::

:::exam-tip
Keep the brackets when you expand $(x + h)^{3}$: use the binomial coefficients 1, 3, 3, 1 and check that every term of $f(x + h) - f(x)$ contains $h$. If one does not, there is an error.
:::

## Summary

:::summary
- The gradient of a curve at a point is the gradient of the tangent there, the limit of chord gradients.
- $f'(x) = \lim_{h \to 0} \frac{f(x + h) - f(x)}{h}$: simplify, cancel $h$, then let $h \to 0$.
- Notation: $\frac{dy}{dx} = f'(x)$; the second derivative is $\frac{d^{2}y}{dx^{2}} = f''(x)$.
- For $\sin x$ and $\cos x$ use $\frac{\sin h}{h} \to 1$ and $\frac{\cos h - 1}{h} \to 0$ (radians).
- ZIMSEC examines first-principles proofs; Cambridge needs only the idea and the notation.
:::
