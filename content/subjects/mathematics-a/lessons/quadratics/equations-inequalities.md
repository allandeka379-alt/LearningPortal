---
{
  "key": "quadratics.equations-inequalities",
  "title": "Quadratic equations, inequalities and simultaneous equations",
  "summary": "Solve quadratic equations and inequalities, solve a linear and a quadratic equation simultaneously, recognise equations that are quadratic in a function of x, and (ZIMSEC) solve cubic and rational inequalities with sign tables.",
  "concepts": ["amaths.quadratics.equations-inequalities"],
  "estimatedMinutes": 45,
  "level": "core"
}
---
## Introduction

Almost every A-Level question ends with an equation to solve, and very often that equation is a quadratic in disguise. Finding where a line meets a curve, finding when a projectile reaches a certain height, or finding the price at which a Mbare market trader's profit exceeds a target all come down to the techniques here.

ZIMSEC Pure Mathematics (Form 5) examines simultaneous equations (one linear, one quadratic), polynomial equations and inequalities **including cubic and rational inequalities**, and modelling with equations and inequalities. Cambridge 9709 examines quadratic equations and inequalities, linear–quadratic simultaneous equations and equations quadratic in a function of $x$ in Paper 1, topic 1.1. You should be able to factorise, complete the square and use the quadratic formula.

## Key definitions

:::definition{term="Critical values"}
The values of $x$ where an expression equals zero (or is undefined). An inequality can only change from true to false at a critical value, so they split the number line into intervals to test.
:::

:::formula{name="Quadratic inequalities (for a > 0 and roots α < β)"}
$$
a(x - \alpha)(x - \beta) < 0 \iff \alpha < x < \beta
$$

$$
a(x - \alpha)(x - \beta) > 0 \iff x < \alpha \ \text{ or } \ x > \beta
$$

Not in Cambridge's MF19 list; it follows from the shape of the graph.
:::

:::definition{term="Equation quadratic in a function of x"}
An equation of the form $a\left[f(x)\right]^{2} + b\,f(x) + c = 0$, for example $x^{4} - 10x^{2} + 9 = 0$ (in $x^{2}$) or $2x - 7\sqrt{x} + 3 = 0$ (in $\sqrt{x}$).
:::

## Quadratic inequalities

Solve the equation to find the critical values, then use a sketch of the parabola. For $a > 0$ the graph is $\cup$-shaped: it is **below** the $x$-axis between the roots and **above** it outside them.

:::worked-solution[Example 1: solve $3x^{2} - 5x - 2 \leq 0$]
1. Critical values: $3x^{2} - 5x - 2 = (3x + 1)(x - 2) = 0$, so $x = -\frac{1}{3}$ or $x = 2$.
2. The parabola $y = 3x^{2} - 5x - 2$ opens upwards and is on or below the axis between its roots.
3. Answer: $-\dfrac{1}{3} \leq x \leq 2$.
:::

![Graph of y = 3x^2 - 5x - 2, a U-shaped parabola crossing the x-axis at x = -1/3 and x = 2: the curve is on or below the axis between these roots, so 3x^2 - 5x - 2 <= 0 gives -1/3 <= x <= 2.](media:diagrams/quadratic-inequality-parabola.png "Figure: the parabola is on or below the x-axis between its roots, so −1/3 ≤ x ≤ 2")

If the coefficient of $x^{2}$ is negative, multiply through by $-1$ and **reverse the inequality sign** before using the rule.

## Simultaneous equations: one linear, one quadratic

Make $x$ or $y$ the subject of the linear equation, substitute into the quadratic, and solve. Then find the other coordinate **from the linear equation**, keeping the solutions in pairs.

:::worked-solution[Example 2: solve $y = 2x - 1$ and $x^{2} + xy = 14$]
1. Substitute: $x^{2} + x(2x - 1) = 14$, so $3x^{2} - x - 14 = 0$.
2. Factorise: $(3x - 7)(x + 2) = 0$, giving $x = \frac{7}{3}$ or $x = -2$.
3. $x = \frac{7}{3}$: $y = \frac{14}{3} - 1 = \frac{11}{3}$. $x = -2$: $y = -5$.
4. Solutions: $\left(\frac{7}{3}, \frac{11}{3}\right)$ and $(-2, -5)$.
5. Check $(-2, -5)$: $4 + 10 = 14$.
:::

Geometrically, these are the points where the line meets the curve. If the substituted quadratic had a negative discriminant, the line would miss the curve; with a zero discriminant it would be a tangent.

## Equations that are quadratic in a function of x

Spot the hidden quadratic, substitute $u$ for the repeated function, solve for $u$, then go back to $x$ and reject impossible values.

:::worked-solution[Example 3: solve (a) $x^{4} - 10x^{2} + 9 = 0$ and (b) $2x - 7\sqrt{x} + 3 = 0$]
1. (a) Let $u = x^{2}$: $u^{2} - 10u + 9 = 0$, so $(u - 1)(u - 9) = 0$ and $u = 1$ or $u = 9$.
2. $x^{2} = 1$ gives $x = \pm 1$; $x^{2} = 9$ gives $x = \pm 3$. Four solutions: $-3, -1, 1, 3$.
3. (b) Let $u = \sqrt{x}$, so $x = u^{2}$: $2u^{2} - 7u + 3 = 0$, so $(2u - 1)(u - 3) = 0$.
4. $u = \frac{1}{2}$ or $u = 3$. Both are non-negative, so both are valid: $x = \frac{1}{4}$ or $x = 9$.
5. Check $x = \frac{1}{4}$: $\frac{1}{2} - \frac{7}{2} + 3 = 0$.
:::

If a value of $u = \sqrt{x}$ came out negative, it would be rejected, because $\sqrt{x}$ means the non-negative root. The same idea appears with trigonometry ($\tan^{2}x$ and $\tan x$) and exponentials ($2^{2x}$ and $2^{x}$).

## Cubic and rational inequalities (ZIMSEC)

For a product of factors, a **sign table** is the clearest method: list the critical values, then record the sign of each factor in each interval.

:::worked-solution[Example 4: solve $(x + 1)(x - 2)(x - 4) \geq 0$]
1. Critical values: $-1$, $2$, $4$.
2. For $x < -1$ all three factors are negative: product negative.
3. For $-1 < x < 2$: one positive factor, two negative: product positive.
4. For $2 < x < 4$: two positive, one negative: negative. For $x > 4$: all positive.
5. Including the critical values (since $\geq$): $-1 \leq x \leq 2$ or $x \geq 4$.
:::

With a rational inequality, **never multiply by a denominator whose sign you do not know**. Multiply by its square (always positive) instead, or bring everything to one side as a single fraction.

:::worked-solution[Example 5: solve $\dfrac{x + 4}{x - 2} > 3$]
1. $x \neq 2$. Multiply both sides by $(x - 2)^{2} > 0$: $(x + 4)(x - 2) > 3(x - 2)^{2}$.
2. Bring to one side: $(x - 2)\left[(x + 4) - 3(x - 2)\right] > 0$, so $(x - 2)(10 - 2x) > 0$.
3. Divide by $-2$ and reverse: $(x - 2)(x - 5) < 0$.
4. Answer: $2 < x < 5$. Check $x = 3$: $\frac{7}{1} = 7 > 3$, true; $x = 6$: $\frac{10}{4} = 2.5 > 3$, false.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Quadratic equations and inequalities, linear–quadratic simultaneous equations and hidden quadratics are on both syllabuses (Cambridge Paper 1). Cubic and rational inequalities and modelling with inequalities are ZIMSEC only.
:::

## Common mistakes

:::mistake{title="Dividing by x"}
From $x^{2} = 5x$, dividing by $x$ loses the root $x = 0$. Factorise instead: $x(x - 5) = 0$.
:::

:::mistake{title="Solutions not kept in pairs"}
In simultaneous equations each $x$ has its own $y$. Write the answers as coordinate pairs.
:::

:::mistake{title="Multiplying by a denominator that might be negative"}
$\frac{x + 4}{x - 2} > 3$ is not the same as $x + 4 > 3(x - 2)$: that step is only valid when $x > 2$. Multiply by $(x - 2)^{2}$.
:::

:::mistake{title="Forgetting the negative square root"}
$x^{2} = 9$ gives $x = 3$ **and** $x = -3$. But $\sqrt{x} = 3$ gives only $x = 9$.
:::

## Exam tips

:::exam-tip
Show the critical values and a sketch or sign table. Many mark schemes award a mark for the critical values even if the final inequality is wrong.
:::

:::exam-tip
Use "and" for one interval ($-\frac{1}{3} \leq x \leq 2$) and "or" for two separate intervals ($x < \alpha$ or $x > \beta$). Do not join two separate intervals into one double inequality.
:::

:::exam-tip
In hidden-quadratic questions, state the substitution and say explicitly which values are rejected and why.
:::

## Summary

:::summary
- Find critical values, then use the graph: a $\cup$-shaped quadratic is negative between its roots.
- For linear–quadratic simultaneous equations, substitute the linear one and pair the answers.
- Spot equations quadratic in $x^{2}$, $\sqrt{x}$, $a^{x}$ or $\tan x$; substitute $u$ and reject impossible values.
- ZIMSEC: cubic inequalities by sign tables; rational inequalities by multiplying by the square of the denominator.
- Check answers with a test value in each interval.
:::
