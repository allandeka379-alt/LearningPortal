---
{
  "key": "quadratics.inequalities",
  "title": "Quadratic inequalities",
  "summary": "Solve quadratic inequalities by finding the critical values and using a sketch of the parabola or a sign table, write the solution set in the correct form, and solve the inequalities in k that come from discriminant conditions.",
  "concepts": ["amath.quadratics.inequalities"],
  "estimatedMinutes": 30,
  "level": "core"
}
---
## Introduction

An engineer planning a footbridge over a river near Mutare does not need one exact width: she needs every width for which the load stays below a safe limit. Questions of the form "for which values of $x$ is this quantity bigger than that one?" lead to **inequalities**, and when the quantity is quadratic the answer is usually an interval such as $-3 < x < 4$, or two separate pieces such as $x < 1$ or $x > 6$.

Quadratic inequalities are also the last step of many discriminant questions ("find the set of values of $k$ for which the line meets the curve at two points"), so they appear on both ZIMSEC and Cambridge papers every year. You need to be able to factorise and solve quadratic equations and to sketch a parabola.

## Key definitions

:::definition{term="Quadratic inequality"}
An inequality that can be written as $ax^2 + bx + c > 0$ (or $<$, $\geq$, $\leq$), where $a \neq 0$.
:::

:::definition{term="Critical values"}
The roots of the equation $ax^2 + bx + c = 0$. They are the boundaries of the solution set, where the expression changes sign.
:::

:::keyfact{title="The key fact"}
For $a > 0$ the parabola $y = ax^2 + bx + c$ is U-shaped. With two roots $\alpha < \beta$, it is **negative between the roots** and **positive outside them**:

$$
(x - \alpha)(x - \beta) < 0 \iff \alpha < x < \beta
$$

$$
(x - \alpha)(x - \beta) > 0 \iff x < \alpha \text{ or } x > \beta
$$
:::

## The method

1. Rearrange so that one side is zero, preferably with a **positive** $x^2$ term.
2. Find the critical values by solving the equation.
3. Sketch the parabola through the critical values (or make a sign table).
4. Read off where the curve is above the axis ($> 0$) or below it ($< 0$).
5. Write the solution set: "between" gives one combined inequality; "outside" gives two separate pieces joined by "or".

For $\leq$ and $\geq$ the critical values are **included**; for $<$ and $>$ they are not.

:::worked-solution[Example 1: solve $x^2 - x - 12 < 0$]
1. Critical values: $x^2 - x - 12 = (x - 4)(x + 3) = 0$, so $x = -3$ or $x = 4$.
2. The graph of $y = x^2 - x - 12$ is U-shaped, crossing the $x$-axis at $-3$ and $4$.
3. We want $y < 0$: the part of the curve below the axis, which lies between the roots.
4. Solution: $-3 < x < 4$.
:::

A sign table gives the same result. Choose a test value in each region:

| Region | $x < -3$ | $-3 < x < 4$ | $x > 4$ |
| --- | --- | --- | --- |
| Test value | $x = -4$ | $x = 0$ | $x = 5$ |
| $x^2 - x - 12$ | $8$ (positive) | $-12$ (negative) | $8$ (positive) |

:::worked-solution[Example 2: solve $2x^2 + 5x - 3 \geq 0$]
1. Critical values: $(2x - 1)(x + 3) = 0$, so $x = -3$ or $x = \frac{1}{2}$.
2. U-shaped curve; we want $y \geq 0$, which is outside the roots, including the roots themselves.
3. Solution: $x \leq -3$ or $x \geq \frac{1}{2}$.
:::

## Rearranging first

Never try to "solve" an inequality such as $x(x + 2) > 15$ by setting each factor greater than 15. Expand and bring everything to one side.

:::worked-solution[Example 3: solve $x(x + 2) > 15$]
1. Expand and rearrange: $x^2 + 2x - 15 > 0$.
2. Critical values: $(x + 5)(x - 3) = 0$, so $x = -5$ or $x = 3$.
3. We want the positive part of the U-shaped curve: outside the roots.
4. Solution: $x < -5$ or $x > 3$.
:::

When the $x^2$ coefficient is negative, multiply the whole inequality by $-1$, which **reverses the inequality sign**, so you always work with a U-shaped curve.

:::worked-solution[Example 4: solve $6 + x - x^2 \geq 0$]
1. Multiply by $-1$ and reverse the sign: $x^2 - x - 6 \leq 0$.
2. Critical values: $(x - 3)(x + 2) = 0$, so $x = -2$ or $x = 3$.
3. We want the U-shaped curve on or below the axis: between the roots, inclusive.
4. Solution: $-2 \leq x \leq 3$.
:::

## When the quadratic does not factorise

Find the critical values with the formula or by completing the square, and give them exactly unless a decimal answer is asked for.

:::worked-solution[Example 5: solve $x^2 - 4x + 1 < 0$, giving exact boundaries]
1. Critical values: $x^2 - 4x + 1 = (x - 2)^2 - 3 = 0$, so $x = 2 \pm \sqrt{3}$.
2. U-shaped curve; we want the part below the axis, between the roots.
3. Solution: $2 - \sqrt{3} < x < 2 + \sqrt{3}$ (about $0.268 < x < 3.73$).
:::

If the discriminant is negative, the parabola never meets the axis: then $ax^2 + bx + c > 0$ for **every** $x$ (when $a > 0$), and $ax^2 + bx + c < 0$ has **no** solution. For example, $x^2 + 2x + 7 = (x + 1)^2 + 6$ is always positive.

## Inequalities from the discriminant

Discriminant conditions turn into quadratic inequalities in the constant $k$. Solve them exactly as above, with $k$ in place of $x$.

:::worked-solution[Example 6: find the set of values of $k$ for which $x^2 + kx + 2k - 3 = 0$ has no real roots]
1. No real roots: $b^2 - 4ac < 0$, so $k^2 - 4(1)(2k - 3) < 0$.
2. Simplify: $k^2 - 8k + 12 < 0$.
3. Critical values: $(k - 2)(k - 6) = 0$, so $k = 2$ or $k = 6$.
4. U-shaped in $k$, negative between the roots: $2 < k < 6$.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards expect the same answer forms. Write "$x < 1$ or $x > 6$" with the word "or" (never "$6 < x < 1$", which is impossible), and a single double inequality such as "$-2 \leq x \leq 3$" for an interval. Set notation such as $\{x : x < 1\} \cup \{x : x > 6\}$ is also accepted.
:::

## Common mistakes

:::mistake{title="Taking square roots of an inequality"}
$x^2 > 9$ does **not** mean $x > 3$ only. The solution is $x < -3$ or $x > 3$. Treat it as $(x - 3)(x + 3) > 0$.
:::

:::mistake{title="Forgetting to reverse the sign"}
Multiplying or dividing an inequality by a negative number reverses it: $-x^2 + x + 6 \geq 0$ becomes $x^2 - x - 6 \leq 0$.
:::

:::mistake{title="Writing an impossible combined inequality"}
For "outside the roots", "$3 < x < -5$" is meaningless. Write two pieces: $x < -5$ or $x > 3$.
:::

:::mistake{title="Mixing up the regions"}
Sketch the curve every time. A quick sketch takes ten seconds and prevents choosing "between" when you need "outside".
:::

## Exam tips

:::exam-tip
Show the critical values and a sketch (or sign table) in your working. Examiners give a method mark for the critical values and an accuracy mark for the correct region.
:::

:::exam-tip
Check the strictness: $<$ and $>$ exclude the critical values; $\leq$ and $\geq$ include them. In a $k$ question, ask whether "real roots" ($\geq$) or "distinct real roots" ($>$) is meant.
:::

:::exam-tip
Test one value from your answer in the original inequality. For $-3 < x < 4$, $x = 0$ gives $-12 < 0$, which is true.
:::

## Summary

:::summary
- Rearrange to $ax^2 + bx + c > 0$ (or $<$, $\geq$, $\leq$) with $a > 0$, reversing the sign if you multiply by a negative.
- Find the critical values and sketch the U-shaped parabola.
- $< 0$: between the roots, one interval; $> 0$: outside the roots, two pieces joined by "or".
- Include the critical values only for $\leq$ and $\geq$.
- Discriminant conditions give inequalities in $k$ solved the same way.
:::
