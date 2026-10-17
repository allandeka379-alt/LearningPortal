---
{
  "key": "quadratics.completing-square-and-formula",
  "title": "Completing the square and the quadratic formula",
  "summary": "Solve any quadratic equation by completing the square or with the quadratic formula, give answers to a required accuracy, and use the discriminant to decide how many real roots there are.",
  "concepts": ["math.algebra.quadratic-equations.completing-the-square", "math.algebra.quadratic-equations.formula"],
  "objectives": ["zimsec/o-level/mathematics:7.2.4", "cambridge/igcse/mathematics:2.5.6"],
  "estimatedMinutes": 35,
  "level": "extended"
}
---
## Introduction

Factorising is quick, but it only works when the roots are "nice" numbers. Try to factorise $x^2 + 4x - 1$: no two whole numbers multiply to $-1$ and add to $4$. The equation $x^2 + 4x - 1 = 0$ still has two solutions, $x = -2 + \sqrt{5}$ and $x = -2 - \sqrt{5}$, but we need a different method to find them.

This lesson gives you two methods that work for **every** quadratic equation:

- **completing the square**, which also tells you the minimum or maximum point of a quadratic graph;
- **the quadratic formula**, which is the fastest way to get decimal answers.

You will also learn to use the **discriminant** to tell, before solving, how many real roots an equation has.

## Key definitions

:::definition{term="Completed-square form"}
A quadratic expression written as $(x + p)^2 + q$, or $a(x + p)^2 + q$, where $p$ and $q$ are numbers.
:::

:::formula{name="The quadratic formula"}
The solutions of $ax^2 + bx + c = 0$, where $a \neq 0$, are

$$
x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}
$$
:::

:::definition{term="Discriminant"}
The expression $b^2 - 4ac$ under the square root in the quadratic formula. Its sign tells you how many real roots the equation has.
:::

## Completing the square

The idea comes from expanding a perfect square: $(x + 3)^2 = x^2 + 6x + 9$. The number inside the bracket is **half the coefficient of $x$**. So any expression starting $x^2 + 6x$ can be written using $(x + 3)^2$, as long as we take away the extra $9$:

$$
x^2 + 6x = (x + 3)^2 - 9
$$

In general, $x^2 + bx = \left(x + \frac{b}{2}\right)^2 - \left(\frac{b}{2}\right)^2$.

:::worked-solution[Example 1: write $x^2 + 6x + 2$ in the form $(x + p)^2 - q$ and solve $x^2 + 6x + 2 = 0$]
1. Half of 6 is 3, so $x^2 + 6x = (x + 3)^2 - 9$.
2. Then $x^2 + 6x + 2 = (x + 3)^2 - 9 + 2 = (x + 3)^2 - 7$. So $p = 3$ and $q = 7$.
3. To solve, set $(x + 3)^2 - 7 = 0$, so $(x + 3)^2 = 7$.
4. Square root both sides, remembering both signs: $x + 3 = \pm\sqrt{7}$.
5. $x = -3 + \sqrt{7}$ or $x = -3 - \sqrt{7}$, that is $x = -0.354$ or $x = -5.65$ (3 significant figures).
:::

When the coefficient of $x^2$ is not 1, take it out as a factor of the $x^2$ and $x$ terms first.

:::worked-solution[Example 2: write $2x^2 - 8x + 3$ in the form $a(x + p)^2 + q$]
1. Factor out 2 from the first two terms: $2(x^2 - 4x) + 3$.
2. Complete the square inside the bracket: $x^2 - 4x = (x - 2)^2 - 4$.
3. So $2x^2 - 8x + 3 = 2\left[(x - 2)^2 - 4\right] + 3 = 2(x - 2)^2 - 8 + 3$.
4. Answer: $2(x - 2)^2 - 5$.
:::

:::keyfact{title="Turning points from the completed square"}
A square is never negative, so $(x + p)^2 + q$ is smallest when $(x + p)^2 = 0$, that is when $x = -p$. The graph of $y = (x + p)^2 + q$ has its **minimum point at $(-p,\ q)$**. For Example 2, $y = 2(x - 2)^2 - 5$ has its minimum point at $(2, -5)$.

![Graph of y = 2(x − 2)² − 5: the completed-square form gives the minimum point (2, −5) on the line of symmetry x = 2, and the curve crosses the x-axis at x ≈ 0.42 and x ≈ 3.58.](media:diagrams/completing-square-vertex-graph.png "Figure: the turning point of y = 2(x − 2)² − 5 is (2, −5)")

:::

## The quadratic formula

Completing the square on $ax^2 + bx + c = 0$ in general gives the quadratic formula, so the formula is simply completing the square done once for all equations.

To use it:

1. Rearrange the equation to $ax^2 + bx + c = 0$.
2. Write down $a$, $b$ and $c$, **including their signs**.
3. Substitute into the formula, using brackets around negative numbers.
4. Work out the discriminant $b^2 - 4ac$ first, then the two solutions.
5. Round only at the end, to the accuracy the question asks for.

:::worked-solution[Example 3: solve $3x^2 - 5x - 4 = 0$, giving your answers to 2 decimal places]
1. $a = 3$, $b = -5$, $c = -4$.
2. Discriminant: $b^2 - 4ac = (-5)^2 - 4(3)(-4) = 25 + 48 = 73$.
3. $x = \dfrac{-(-5) \pm \sqrt{73}}{2 \times 3} = \dfrac{5 \pm \sqrt{73}}{6}$.
4. $\sqrt{73} = 8.5440\ldots$, so $x = \dfrac{13.5440\ldots}{6} = 2.2573\ldots$ or $x = \dfrac{-3.5440\ldots}{6} = -0.5906\ldots$
5. $x = 2.26$ or $x = -0.59$ (2 d.p.).
:::

:::worked-solution[Example 4: a stone falling into a quarry]
A stone is thrown upwards from the top of a 45 m quarry face near Mutare. Its height above the quarry floor after $t$ seconds is $h = 45 + 10t - 5t^2$ metres. Find when it lands, to the nearest tenth of a second.

1. It lands when $h = 0$: $45 + 10t - 5t^2 = 0$.
2. Multiply by $-1$ and divide by 5: $t^2 - 2t - 9 = 0$, so $a = 1$, $b = -2$, $c = -9$.
3. $t = \dfrac{2 \pm \sqrt{4 + 36}}{2} = \dfrac{2 \pm \sqrt{40}}{2} = 1 \pm \sqrt{10}$.
4. $t = 4.162\ldots$ or $t = -2.162\ldots$ Time after the throw cannot be negative, so reject the second value.
5. The stone lands after about $4.2$ seconds.
:::

## How many real roots? The discriminant

| Discriminant $b^2 - 4ac$ | Number of real roots | Graph of $y = ax^2 + bx + c$ |
| :--- | :--- | :--- |
| positive | two different roots | crosses the $x$-axis twice |
| zero | one repeated root | touches the $x$-axis once |
| negative | no real roots | does not meet the $x$-axis |

:::example{title="Using the discriminant"}
For $x^2 + 2x + 5 = 0$: $b^2 - 4ac = 4 - 20 = -16$, which is negative, so there are no real solutions. You cannot take the square root of a negative number in the real numbers.

For $4x^2 - 12x + 9 = 0$: $b^2 - 4ac = 144 - 144 = 0$, so there is one repeated root, $x = \frac{12}{8} = 1.5$. In fact $4x^2 - 12x + 9 = (2x - 3)^2$.
:::

## Choosing a method

- If the question asks for answers "to 2 decimal places" or "to 3 significant figures", the equation probably does not factorise: use the **formula**.
- If it asks you to write the expression in the form $(x + p)^2 + q$, or to find a turning point, **complete the square**.
- Otherwise, try **factorising** first: it is quickest when it works.

## Common mistakes

:::mistake{title="Losing the sign of b"}
If $b = -5$, then $-b = +5$ and $b^2 = (-5)^2 = 25$, not $-25$. Write the substitution with brackets: $(-5)^2 - 4(3)(-4)$.
:::

:::mistake{title="Dividing only part of the numerator"}
The whole of $-b \pm \sqrt{b^2 - 4ac}$ is divided by $2a$, not just the square root. Writing $-b \pm \frac{\sqrt{b^2 - 4ac}}{2a}$ gives the wrong answers.
:::

:::mistake{title="Wrong sign when completing the square"}
$x^2 + 6x = (x + 3)^2 - 9$: you **subtract** the square of half the coefficient, whatever the sign of $b$. For example, $x^2 - 10x = (x - 5)^2 - 25$.
:::

:::mistake{title="Forgetting the minus root"}
From $(x + 3)^2 = 7$ you get $x + 3 = \sqrt{7}$ **or** $x + 3 = -\sqrt{7}$. Writing only the positive root loses a solution.
:::

## Exam tips

:::exam-tip
Show the formula with your numbers substituted, for example $\dfrac{5 \pm \sqrt{73}}{6}$. This usually earns method marks even if a calculator slip follows.
:::

:::exam-tip
Keep full calculator accuracy until the final line and then round to the accuracy asked for. Rounding $\sqrt{73}$ to $8.5$ too early gives $2.25$ instead of $2.26$.
:::

:::exam-tip
"Give your answers correct to 2 decimal places" means both answers. Check them quickly: the two roots of $ax^2 + bx + c = 0$ add up to $-\frac{b}{a}$. In Example 3, $2.26 + (-0.59) = 1.67 \approx \frac{5}{3}$.
:::

## Summary

:::summary
- $x^2 + bx = \left(x + \frac{b}{2}\right)^2 - \left(\frac{b}{2}\right)^2$: halve the coefficient of $x$, square it and subtract.
- $y = (x + p)^2 + q$ has a minimum point at $(-p, q)$.
- The quadratic formula $x = \dfrac{-b \pm \sqrt{b^2 - 4ac}}{2a}$ solves every quadratic equation that has real roots.
- The discriminant $b^2 - 4ac$ is positive for two real roots, zero for one repeated root and negative for no real roots.
- Round only at the end and reject solutions that make no sense in the context.
:::
