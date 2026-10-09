---
{
  "key": "calculus.integration-basics",
  "title": "Integration as the reverse of differentiation",
  "summary": "Undo differentiation: integrate sums of powers of x (including roots and reciprocals), include the arbitrary constant, find the equation of a curve from its gradient function and a point, and use a derivative found earlier to integrate.",
  "concepts": ["amath.calculus.integration-basics"],
  "estimatedMinutes": 40,
  "level": "core"
}
---
## Introduction

Differentiation takes a function and gives its gradient function. Very often we know the gradient and want the function itself. An engineer at a Masvingo water project may know how fast the level in a tank is rising at each moment and need the level itself; a surveyor may know the slope of a road at every point and need its height. Going backwards from a derivative to the function it came from is called **integration**.

Integration is the second half of the calculus section for both ZIMSEC and Cambridge. It leads on to areas under curves, to volumes of revolution (ZIMSEC) and to kinematics (Cambridge). Almost every integration question starts with the skills in this lesson: rewriting terms as powers of $x$, applying one rule, and remembering the constant.

You should be able to differentiate $ax^n$ and to use the laws of indices, for example $\sqrt{x} = x^{\frac{1}{2}}$ and $\dfrac{1}{x^3} = x^{-3}$.

## Key definitions

:::definition{term="Integration"}
The reverse process of differentiation. If $\dfrac{d}{dx}F(x) = f(x)$, then $F(x)$ is an **integral** (an antiderivative) of $f(x)$.
:::

:::definition{term="Indefinite integral"}
$\displaystyle\int f(x)\,dx$, read "the integral of $f(x)$ with respect to $x$", is the family of all functions whose derivative is $f(x)$. The $dx$ shows that $x$ is the variable.
:::

:::definition{term="Arbitrary constant"}
The constant $c$ added to every indefinite integral. Because the derivative of any constant is zero, $x^2$, $x^2 + 7$ and $x^2 - 3$ all have derivative $2x$, so $\displaystyle\int 2x\,dx = x^2 + c$.
:::

:::formula{name="Integral of a power of x (not in Cambridge's List of formulas)"}
$$
\int ax^n\,dx = \frac{a\,x^{n+1}}{n+1} + c, \qquad n \neq -1
$$
:::

In words: **add one to the power, then divide by the new power.** Check by differentiating: $\dfrac{d}{dx}\left(\dfrac{a x^{n+1}}{n+1}\right) = a x^n$. The rule fails for $n = -1$, because it would divide by zero; $\displaystyle\int \frac{1}{x}\,dx$ is dealt with in the next lesson.

## Integrating sums of powers

Integrate a sum term by term, and add **one** constant at the end. Constants multiply through: $\displaystyle\int 5x^2\,dx = 5 \times \frac{x^3}{3} + c$. A number on its own integrates to that number times $x$: $\displaystyle\int 7\,dx = 7x + c$.

:::worked-solution[Example 1: find $\displaystyle\int (6x^2 - 4x + 5)\,dx$]
1. $6x^2$: add one to the power to get $x^3$, divide by 3: $\dfrac{6x^3}{3} = 2x^3$.
2. $-4x = -4x^1$: becomes $\dfrac{-4x^2}{2} = -2x^2$.
3. $5 = 5x^0$: becomes $\dfrac{5x^1}{1} = 5x$.
4. $\displaystyle\int (6x^2 - 4x + 5)\,dx = 2x^3 - 2x^2 + 5x + c$.
5. Check: $\dfrac{d}{dx}(2x^3 - 2x^2 + 5x + c) = 6x^2 - 4x + 5$. ✓
:::

### Roots, reciprocals, brackets and fractions

The power rule only works on terms of the form $ax^n$. Before integrating, **rewrite every term as a power of $x$**:

| Written as | Rewrite as |
| --- | --- |
| $\sqrt{x}$ | $x^{\frac{1}{2}}$ |
| $\dfrac{1}{\sqrt{x}}$ | $x^{-\frac{1}{2}}$ |
| $\dfrac{2}{x^3}$ | $2x^{-3}$ |
| $(2x - 1)^2$ | $4x^2 - 4x + 1$ (expand first) |
| $\dfrac{x^3 - 4}{x^2}$ | $x - 4x^{-2}$ (divide each term) |

There is **no product rule or quotient rule for integration** at this level. Expand brackets and split fractions over a single-term denominator first.

:::worked-solution[Example 2: find $\displaystyle\int \left(3\sqrt{x} + \frac{2}{x^3}\right)dx$]
1. Rewrite: $3x^{\frac{1}{2}} + 2x^{-3}$.
2. $3x^{\frac{1}{2}}$: new power $\frac{3}{2}$, so $3 \times \dfrac{x^{\frac{3}{2}}}{\frac{3}{2}} = 3 \times \dfrac{2}{3}x^{\frac{3}{2}} = 2x^{\frac{3}{2}}$.
3. $2x^{-3}$: new power $-2$, so $\dfrac{2x^{-2}}{-2} = -x^{-2}$.
4. $\displaystyle\int \left(3\sqrt{x} + \frac{2}{x^3}\right)dx = 2x^{\frac{3}{2}} - \frac{1}{x^2} + c$.
:::

:::worked-solution[Example 3: find $\displaystyle\int (2x - 1)^2\,dx$]
1. Expand: $(2x - 1)^2 = 4x^2 - 4x + 1$.
2. Integrate term by term: $\dfrac{4x^3}{3} - 2x^2 + x + c$.
3. Integrating each bracket separately and multiplying, or writing $\dfrac{(2x-1)^3}{3}$, would both be wrong: differentiate them and you do not get back $(2x - 1)^2$.
:::

## Finding the equation of a curve

A gradient function such as $\dfrac{dy}{dx} = 2x$ describes a whole family of curves $y = x^2 + c$, one above another, all with the same shape. Knowing **one point** on the curve picks out the member of the family: substitute the point to find $c$.

:::worked-solution[Example 4: a curve has gradient function $\dfrac{dy}{dx} = 3x^2 - \dfrac{4}{x^2}$ and passes through $(2, 9)$. Find its equation.]
1. Rewrite: $\dfrac{dy}{dx} = 3x^2 - 4x^{-2}$.
2. Integrate: $y = x^3 - \dfrac{4x^{-1}}{-1} + c = x^3 + \dfrac{4}{x} + c$.
3. Substitute $x = 2$, $y = 9$: $9 = 8 + 2 + c$, so $c = -1$.
4. The equation is $y = x^3 + \dfrac{4}{x} - 1$.
5. Check another point: at $x = 1$, $y = 1 + 4 - 1 = 4$, and the gradient there is $3 - 4 = -1$.
:::

Questions often combine this with earlier differentiation work: a gradient function containing an unknown $k$ and a stationary point (where $\frac{dy}{dx} = 0$) give an equation for $k$ first; then the point gives $c$.

## Using a derivative found earlier ("hence")

Every differentiation result can be read backwards. If $\dfrac{d}{dx}F(x) = f(x)$, then $\displaystyle\int f(x)\,dx = F(x) + c$, and also $\displaystyle\int k f(x)\,dx = kF(x) + c$. Examiners use this with the command word **hence**: part (a) asks for a derivative, part (b) for an integral you could not easily do directly.

:::worked-solution[Example 5: (a) show that $\dfrac{d}{dx}\left[(x^2 + 5)^{\frac{3}{2}}\right] = 3x\sqrt{x^2 + 5}$; (b) hence find $\displaystyle\int x\sqrt{x^2 + 5}\,dx$]
1. (a) By the chain rule: $\dfrac{3}{2}(x^2 + 5)^{\frac{1}{2}} \times 2x = 3x(x^2 + 5)^{\frac{1}{2}} = 3x\sqrt{x^2 + 5}$, as required.
2. (b) Part (a) says $\displaystyle\int 3x\sqrt{x^2 + 5}\,dx = (x^2 + 5)^{\frac{3}{2}} + c$.
3. The integrand we want is one third of this, so $\displaystyle\int x\sqrt{x^2 + 5}\,dx = \frac{1}{3}(x^2 + 5)^{\frac{3}{2}} + c$.
4. Check: differentiating $\frac{1}{3}(x^2 + 5)^{\frac{3}{2}}$ gives $\frac{1}{3} \times 3x\sqrt{x^2 + 5} = x\sqrt{x^2 + 5}$. ✓
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both syllabuses treat integration as the reverse of differentiation and expect the constant $c$ in every indefinite integral. Neither prints any calculus formulas, so the power rule must be learnt. Cambridge Paper 1 has no calculator, so fractional powers must be handled exactly.
:::

## Common mistakes

:::mistake{title="Leaving out the constant"}
$\displaystyle\int 6x\,dx = 3x^2 + c$, not $3x^2$. In a "find the equation of the curve" question, a missing $c$ means the point can never be used and most of the marks are lost.
:::

:::mistake{title="Dividing by the old power"}
$\displaystyle\int x^4\,dx = \frac{x^5}{5} + c$. Dividing by 4 instead of 5 is a common slip; differentiate your answer to check.
:::

:::mistake{title="Integrating a product or quotient piece by piece"}
$\displaystyle\int x(x + 3)\,dx$ is **not** $\frac{x^2}{2} \times \left(\frac{x^2}{2} + 3x\right)$. Expand to $x^2 + 3x$ first.
:::

:::mistake{title="Mishandling negative and fractional powers"}
For $x^{-3}$ the new power is $-2$, not $-4$. For $x^{\frac{1}{2}}$, dividing by $\frac{3}{2}$ means multiplying by $\frac{2}{3}$.
:::

## Exam tips

:::exam-tip
Check every integral by differentiating it in your head. It takes seconds and catches nearly every power slip.
:::

:::exam-tip
"Find the equation of the curve" needs the final answer as $y = \ldots$ with the value of $c$ substituted, not just "$c = -1$".
:::

:::exam-tip
After "hence", the integral almost always uses the derivative you have just found. Look for the multiple of it hidden in the integrand.
:::

## Summary

:::summary
- Integration reverses differentiation: if $F'(x) = f(x)$ then $\int f(x)\,dx = F(x) + c$.
- $\int ax^n\,dx = \dfrac{a x^{n+1}}{n+1} + c$ for $n \neq -1$: add one to the power, divide by the new power.
- Rewrite roots and reciprocals as powers; expand brackets and split fractions before integrating.
- Every indefinite integral needs the arbitrary constant $c$; a point on the curve fixes its value.
- A derivative found earlier can be read backwards to find an integral ("hence").
:::
