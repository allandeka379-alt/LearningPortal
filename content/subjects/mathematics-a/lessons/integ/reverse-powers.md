---
{
  "key": "integ.reverse-powers",
  "title": "Integration as the reverse of differentiation",
  "summary": "Integrate xⁿ and (ax + b)ⁿ for rational n ≠ −1 with constant multiples, sums and differences, include the constant of integration, and find the equation of a curve from its gradient function and a point.",
  "concepts": ["amaths.integ.reverse-powers"],
  "estimatedMinutes": 40,
  "level": "core"
}
---
## Introduction

Differentiation takes a function and gives its gradient. **Integration** runs the process backwards: given the gradient function, it recovers the original function. If an engineer at Kariba knows how fast the water level is changing at every moment, integration tells her the level itself; if a Harare kombi's speed is known throughout a trip, integration gives the distance travelled.

This lesson covers the first and most-used integrals: powers of $x$ and powers of a linear bracket $(ax + b)$. ZIMSEC Pure Mathematics (Form 5) and Cambridge 9709 Paper 1 (topic 1.8) both examine it, and every later integration technique ends with these rules.

You need to be fluent with indices and with differentiating powers and brackets.

## Key definitions

:::definition{term="Indefinite integral"}
$\int f(x)\,dx$ means the general function whose derivative is $f(x)$. It is called the **integral of $f$ with respect to $x$**. The $dx$ shows the variable.
:::

:::formula{name="Integrating powers"}
$$
\int x^{n}\,dx = \frac{x^{n + 1}}{n + 1} + c, \qquad n \neq -1
$$

$$
\int (ax + b)^{n}\,dx = \frac{(ax + b)^{n + 1}}{a(n + 1)} + c, \qquad n \neq -1, \ a \neq 0
$$

Neither is printed in MF19. The case $n = -1$ gives a logarithm (a later lesson).
:::

:::definition{term="Constant of integration"}
Because the derivative of any constant is 0, the functions $x^{2}$, $x^{2} + 5$ and $x^{2} - 3$ all have derivative $2x$. So $\int 2x\,dx = x^{2} + c$, where $c$ is an arbitrary constant. Every indefinite integral needs its $+ c$.
:::

## Integrating powers of x

The rule in words: **add one to the power, then divide by the new power.** Check by differentiating your answer: you should get back to the integrand. As with differentiation, rewrite roots and fractions as powers first, and integrate term by term.

:::worked-solution[Example 1: find $\displaystyle\int\left(6x^{2} - \frac{4}{x^{3}} + 3\sqrt{x}\right)dx$]
1. Rewrite: $6x^{2} - 4x^{-3} + 3x^{\frac{1}{2}}$.
2. $\int 6x^{2}\,dx = \dfrac{6x^{3}}{3} = 2x^{3}$.
3. $\int -4x^{-3}\,dx = \dfrac{-4x^{-2}}{-2} = 2x^{-2}$.
4. $\int 3x^{\frac{1}{2}}\,dx = \dfrac{3x^{\frac{3}{2}}}{\frac{3}{2}} = 2x^{\frac{3}{2}}$.
5. Answer: $2x^{3} + \dfrac{2}{x^{2}} + 2x^{\frac{3}{2}} + c$.
:::

Dividing by a fraction is multiplying by its reciprocal: dividing by $\frac{3}{2}$ is multiplying by $\frac{2}{3}$.

A product or quotient must be expanded or divided out first, because there is no simple "product rule" for integration. For example,

$$
\int \frac{x^{2} - 3}{x^{2}}\,dx = \int \left(1 - 3x^{-2}\right)dx = x + 3x^{-1} + c = x + \frac{3}{x} + c.
$$

## Integrating powers of a linear bracket

Differentiating $(ax + b)^{n + 1}$ gives $a(n + 1)(ax + b)^{n}$, with an extra factor $a$ from the chain rule. Integrating must therefore **divide** by $a$ as well as by the new power.

:::worked-solution[Example 2: find $\displaystyle\int (2x + 1)^{4}\,dx$ and $\displaystyle\int \frac{6}{(3x - 1)^{3}}\,dx$]
1. $\int (2x + 1)^{4}\,dx = \dfrac{(2x + 1)^{5}}{2 \times 5} + c = \dfrac{(2x + 1)^{5}}{10} + c$.
2. Rewrite the second: $6(3x - 1)^{-3}$.
3. $\int 6(3x - 1)^{-3}\,dx = \dfrac{6(3x - 1)^{-2}}{3 \times (-2)} + c = -(3x - 1)^{-2} + c$.
4. So the answer is $-\dfrac{1}{(3x - 1)^{2}} + c$.
5. Check: $\dfrac{d}{dx}\left[-(3x - 1)^{-2}\right] = 2(3x - 1)^{-3} \times 3 = 6(3x - 1)^{-3}$.
:::

This rule works only when the inside of the bracket is **linear**. For $(x^{2} + 1)^{3}$ you must expand, or use recognition (a later lesson).

## Finding the equation of a curve

If you know $\frac{dy}{dx}$ and one point on the curve, you can find the curve. Integrate to get $y$ with the unknown constant $c$, then substitute the point to find $c$.

:::worked-solution[Example 3: a curve through $(2, 5)$]
The gradient of a curve is $\dfrac{dy}{dx} = 3x^{2} - 2x$, and the curve passes through $(2, 5)$. Find its equation.

1. Integrate: $y = x^{3} - x^{2} + c$.
2. Substitute $(2, 5)$: $5 = 8 - 4 + c$, so $c = 1$.
3. The curve is $y = x^{3} - x^{2} + 1$.
:::

:::worked-solution[Example 4: an exam-style question with a bracket]
A curve has $\dfrac{dy}{dx} = \dfrac{2}{\sqrt{4x + 1}}$ and passes through $(2, 4)$. Show that its equation is $y = \sqrt{4x + 1} + 1$.

1. Rewrite: $\dfrac{dy}{dx} = 2(4x + 1)^{-\frac{1}{2}}$.
2. Integrate: $y = \dfrac{2(4x + 1)^{\frac{1}{2}}}{4 \times \frac{1}{2}} + c = (4x + 1)^{\frac{1}{2}} + c$.
3. At $(2, 4)$: $4 = \sqrt{9} + c = 3 + c$, so $c = 1$.
4. Hence $y = \sqrt{4x + 1} + 1$, as required.
:::

Sometimes the second derivative is given. Integrate twice; you need **two** pieces of information (such as a point and a gradient) to find the two constants.

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards examine integration of $x^{n}$ and $(ax + b)^{n}$ for rational $n \neq -1$, the constant of integration, and curves from gradients and a point (ZIMSEC Form 5; Cambridge Paper 1, topic 1.8).
:::

## Common mistakes

:::mistake{title="Forgetting + c"}
An indefinite integral without $+ c$ loses a mark, and in "find the curve" questions it makes the point impossible to fit.
:::

:::mistake{title="Not dividing by a"}
$\int (2x + 1)^{4}\,dx$ is $\frac{(2x + 1)^{5}}{10}$, not $\frac{(2x + 1)^{5}}{5}$. Differentiate your answer to check the factor.
:::

:::mistake{title="Integrating a product term by term"}
$\int x(x + 2)\,dx$ is not $\frac{x^{2}}{2} \times \frac{(x + 2)^{2}}{2}$. Expand first: $\int (x^{2} + 2x)\,dx = \frac{x^{3}}{3} + x^{2} + c$.
:::

:::mistake{title="Using the power rule for 1/x"}
$\int x^{-1}\,dx$ would need division by $0$. It equals $\ln|x| + c$, a different rule.
:::

## Exam tips

:::exam-tip
Write each term in index form on its own line before integrating; a wrong index is the commonest source of error.
:::

:::exam-tip
Check any integral by differentiating it. This takes seconds and catches nearly every slip in the factor $\frac{1}{a(n + 1)}$.
:::

:::exam-tip
In "show that" questions, show the value of $c$ being found; the final equation is given, so the marks are for the working.
:::

## Summary

:::summary
- $\int x^{n}\,dx = \frac{x^{n + 1}}{n + 1} + c$ for $n \neq -1$: add one to the power, divide by the new power.
- $\int (ax + b)^{n}\,dx = \frac{(ax + b)^{n + 1}}{a(n + 1)} + c$: also divide by $a$.
- Rewrite roots and fractions as powers; expand products and divide out single-term denominators.
- Always include $+ c$; use a given point to find it.
- Check by differentiating.
:::
