---
{
  "key": "diff.implicit-parametric",
  "title": "Implicit and parametric differentiation",
  "summary": "Find dy/dx for curves defined implicitly, such as x² + y² = xy + 7, or parametrically, such as x = t − e^(2t), y = t + e^(2t), use it for tangents and normals, and (ZIMSEC) convert parametric equations to a Cartesian equation.",
  "concepts": ["amaths.diff.implicit-parametric"],
  "estimatedMinutes": 45,
  "level": "core"
}
---
## Introduction

So far every curve has been given as $y = f(x)$. Many important curves are not. A circle $x^{2} + y^{2} = 25$ mixes $x$ and $y$ together; the path of a point on a turning wheel, or a kombi's position on a map as the minutes pass, is most naturally described by giving **both** $x$ and $y$ in terms of a third variable, time $t$.

This lesson shows how to find gradients of such curves without first rearranging them into $y = f(x)$, which is often impossible. Curves of the first kind are defined **implicitly**; curves of the second kind are defined **parametrically**.

ZIMSEC Pure Mathematics (Form 5) examines both, and also asks you to convert a pair of parametric equations into a single **Cartesian** equation. Cambridge 9709 examines implicit and parametric differentiation in Papers 2 and 3 (topics 2.4 and 3.4).

You need the chain rule and the product rule.

## Key definitions

:::definition{term="Implicit equation"}
An equation linking $x$ and $y$ that is not solved for $y$, such as $x^{2} + y^{2} = xy + 7$. The curve is the set of points $(x, y)$ satisfying it.
:::

:::formula{name="Differentiating terms in y"}
Treat $y$ as a function of $x$ and use the chain rule:

$$
\frac{d}{dx}\left(y^{n}\right) = ny^{n - 1}\frac{dy}{dx}, \qquad \frac{d}{dx}(xy) = x\frac{dy}{dx} + y.
$$
:::

:::definition{term="Parametric equations"}
A pair of equations $x = f(t)$, $y = g(t)$ that give the coordinates of each point in terms of a **parameter** $t$.
:::

:::formula{name="Parametric gradient"}
$$
\frac{dy}{dx} = \frac{dy/dt}{dx/dt}, \qquad \frac{dx}{dt} \neq 0.
$$

This result is printed in Cambridge's formula list MF19.
:::

## Implicit differentiation

Differentiate **every term** of the equation with respect to $x$. Terms in $x$ alone differentiate as usual; each term containing $y$ picks up a factor $\frac{dy}{dx}$ from the chain rule; products such as $xy$ need the product rule. Then collect the $\frac{dy}{dx}$ terms on one side and factorise.

:::worked-solution[Example 1: the gradient of $x^{2} + y^{2} = xy + 7$ at $(3, 2)$]
1. Check the point: $9 + 4 = 13$ and $6 + 7 = 13$.
2. Differentiate: $2x + 2y\dfrac{dy}{dx} = x\dfrac{dy}{dx} + y$.
3. Collect: $(2y - x)\dfrac{dy}{dx} = y - 2x$, so $\dfrac{dy}{dx} = \dfrac{y - 2x}{2y - x}$.
4. At $(3, 2)$: $\dfrac{dy}{dx} = \dfrac{2 - 6}{4 - 3} = -4$.
:::

The derivative of an implicit curve usually involves **both** $x$ and $y$, so you need both coordinates of the point. Sometimes a given $x$-value corresponds to several points: at $x = 3$ this curve also passes through $(3, 1)$, where the gradient is different.

:::worked-solution[Example 2: tangent to $x^{2} + 3xy + y^{2} = 11$ at $(1, 2)$]
1. Differentiate, using the product rule on $3xy$: $2x + 3x\dfrac{dy}{dx} + 3y + 2y\dfrac{dy}{dx} = 0$.
2. Collect: $(3x + 2y)\dfrac{dy}{dx} = -(2x + 3y)$.
3. At $(1, 2)$: $7\dfrac{dy}{dx} = -8$, so $\dfrac{dy}{dx} = -\dfrac{8}{7}$.
4. Tangent: $y - 2 = -\frac{8}{7}(x - 1)$, so $7y - 14 = -8x + 8$, i.e. $8x + 7y = 22$.
:::

To find where an implicit curve has a **horizontal** tangent, set the numerator of $\frac{dy}{dx}$ to zero and solve it together with the curve's equation. A **vertical** tangent is where the denominator is zero.

## Parametric differentiation

When $x$ and $y$ both depend on $t$, the chain rule gives $\frac{dy}{dt} = \frac{dy}{dx} \times \frac{dx}{dt}$, which rearranges to the formula above. The answer is in terms of $t$, so the point on the curve is identified by its value of $t$.

:::worked-solution[Example 3: tangent to $x = t - \mathrm{e}^{2t}$, $y = t + \mathrm{e}^{2t}$ at $t = 0$]
1. $\dfrac{dx}{dt} = 1 - 2\mathrm{e}^{2t}$ and $\dfrac{dy}{dt} = 1 + 2\mathrm{e}^{2t}$.
2. $\dfrac{dy}{dx} = \dfrac{1 + 2\mathrm{e}^{2t}}{1 - 2\mathrm{e}^{2t}}$.
3. At $t = 0$: the point is $(0 - 1, 0 + 1) = (-1, 1)$ and $\dfrac{dy}{dx} = \dfrac{3}{-1} = -3$.
4. Tangent: $y - 1 = -3(x + 1)$, i.e. $y = -3x - 2$.
:::

## Parametric to Cartesian (ZIMSEC)

To get a Cartesian equation, **eliminate the parameter**. Either make $t$ the subject of one equation and substitute, or use an identity such as $\cos^{2}\theta + \sin^{2}\theta = 1$ for trigonometric parameters.

:::worked-solution[Example 4: an ellipse given parametrically]
The curve $C$ has parametric equations $x = 3\cos\theta$, $y = 2\sin\theta$. Find a Cartesian equation of $C$ and the gradient at $\theta = \frac{\pi}{4}$.

1. $\cos\theta = \dfrac{x}{3}$ and $\sin\theta = \dfrac{y}{2}$.
2. Use $\cos^{2}\theta + \sin^{2}\theta = 1$: $\dfrac{x^{2}}{9} + \dfrac{y^{2}}{4} = 1$, an ellipse.
3. $\dfrac{dx}{d\theta} = -3\sin\theta$, $\dfrac{dy}{d\theta} = 2\cos\theta$, so $\dfrac{dy}{dx} = -\dfrac{2\cos\theta}{3\sin\theta} = -\dfrac{2}{3}\cot\theta$.
4. At $\theta = \frac{\pi}{4}$: $\cot\frac{\pi}{4} = 1$, so the gradient is $-\dfrac{2}{3}$.
:::

A simpler algebraic example: $x = 2t$, $y = t^{2} - 1$ gives $t = \frac{x}{2}$, so $y = \frac{x^{2}}{4} - 1$, a parabola. Always state any restriction on $x$ that the parameter imposes, for example $x \geq 0$ if $x = t^{2}$.

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards: the first derivative of curves defined implicitly or parametrically, with tangents and normals (ZIMSEC Form 5; Cambridge Papers 2 and 3). ZIMSEC also asks you to define a curve parametrically and convert it to a Cartesian equation. Cambridge MF19 prints the parametric gradient formula.
:::

## Common mistakes

:::mistake{title="Forgetting dy/dx on y terms"}
$\frac{d}{dx}(y^{2}) = 2y\frac{dy}{dx}$, not $2y$. Every term containing $y$ gets the factor $\frac{dy}{dx}$.
:::

:::mistake{title="Treating xy as a single variable"}
$\frac{d}{dx}(xy) = x\frac{dy}{dx} + y$ by the product rule, not $\frac{dy}{dx}$ or $1$.
:::

:::mistake{title="Forgetting the constant"}
The derivative of the constant 7 is 0. Do not carry the 7 into the differentiated equation.
:::

:::mistake{title="Upside-down parametric gradient"}
$\frac{dy}{dx} = \frac{dy/dt}{dx/dt}$, with the $y$-derivative on **top**.
:::

## Exam tips

:::exam-tip
Show the differentiated equation line before rearranging; it carries the method marks. A common mark scheme gives B1 for $\frac{d}{dx}(xy)$ correct and B1 for $\frac{d}{dx}(y^{2})$ correct.
:::

:::exam-tip
For a parametric tangent, find the point by substituting $t$ into **both** $x$ and $y$, then use the gradient at that $t$.
:::

:::exam-tip
"Hence" questions asking for points where the tangent is parallel to an axis want you to set the numerator (or denominator) of $\frac{dy}{dx}$ to zero.
:::

## Summary

:::summary
- Implicit: differentiate every term with respect to $x$; $y^{n} \to ny^{n - 1}\frac{dy}{dx}$; $xy \to x\frac{dy}{dx} + y$.
- Collect the $\frac{dy}{dx}$ terms, factorise, and substitute both coordinates of the point.
- Parametric: $\frac{dy}{dx} = \frac{dy/dt}{dx/dt}$, in terms of the parameter.
- Horizontal tangents: numerator of $\frac{dy}{dx}$ zero; vertical tangents: denominator zero.
- ZIMSEC: eliminate the parameter to obtain a Cartesian equation.
:::
