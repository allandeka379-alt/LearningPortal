---
{
  "key": "quadratics.discriminant",
  "title": "The discriminant and the nature of roots",
  "summary": "Use the discriminant b² − 4ac to decide whether a quadratic equation has two distinct, two equal or no real roots, find the values or range of an unknown constant from a condition on the roots, and decide whether a line cuts, touches or misses a curve.",
  "concepts": ["amath.quadratics.discriminant"],
  "estimatedMinutes": 35,
  "freePreview": true,
  "level": "core"
}
---
## Introduction

Sometimes you do not need the roots of a quadratic equation, only **how many** there are. Will a straight water pipe laid across a curved irrigation channel near Chiredzi cross it twice, touch it once or miss it? Does the equation $x^2 + kx + 9 = 0$ have a repeated root for some value of $k$? One expression answers both questions without solving anything: the **discriminant**.

The discriminant appears in almost every Additional Mathematics paper, usually in a question with an unknown constant $k$. It also links algebra to graphs: the number of roots of $ax^2 + bx + c = 0$ is the number of times the curve $y = ax^2 + bx + c$ meets the $x$-axis. You need to be confident with solving quadratic equations and with the quadratic formula.

## Key definitions

:::definition{term="Discriminant"}
For the quadratic equation $ax^2 + bx + c = 0$ ($a \neq 0$), the discriminant is $b^2 - 4ac$, the expression under the square root in the quadratic formula. It is sometimes written $\Delta$ or $D$.
:::

:::definition{term="Nature of the roots"}
Whether the roots are real and different, real and equal (one repeated root), or not real.
:::

:::formula{name="Conditions on the discriminant (not in the List of formulas)"}
$$
b^2 - 4ac > 0 \Rightarrow \text{two distinct real roots}
$$

$$
b^2 - 4ac = 0 \Rightarrow \text{two equal real roots (one repeated root)}
$$

$$
b^2 - 4ac < 0 \Rightarrow \text{no real roots}
$$
:::

"Real roots" (with no other word) means $b^2 - 4ac \geq 0$: the roots may be equal or distinct.

## Why the discriminant works

In the formula $x = \dfrac{-b \pm \sqrt{b^2 - 4ac}}{2a}$:

- if $b^2 - 4ac > 0$, the square root is a positive real number, and $+$ and $-$ give two different roots;
- if $b^2 - 4ac = 0$, both signs give $x = -\dfrac{b}{2a}$, so the two roots are equal;
- if $b^2 - 4ac < 0$, there is no real square root, so there are no real roots.

On a graph, $y = ax^2 + bx + c$ crosses the $x$-axis twice, touches it at its vertex, or does not meet it at all.

:::worked-solution[Example 1: state the nature of the roots of (a) $3x^2 - 5x + 4 = 0$, (b) $4x^2 + 20x + 25 = 0$, (c) $x^2 + 7x - 2 = 0$]
1. (a) $b^2 - 4ac = (-5)^2 - 4(3)(4) = 25 - 48 = -23 < 0$: no real roots.
2. (b) $b^2 - 4ac = 400 - 4(4)(25) = 400 - 400 = 0$: two equal real roots. (Indeed $4x^2 + 20x + 25 = (2x + 5)^2$.)
3. (c) $b^2 - 4ac = 49 - 4(1)(-2) = 49 + 8 = 57 > 0$: two distinct real roots.
:::

## Finding an unknown constant

When an equation contains a constant $k$, the condition on the roots gives an equation or an inequality in $k$.

- Equal roots: solve $b^2 - 4ac = 0$.
- Real roots: solve $b^2 - 4ac \geq 0$.
- Distinct real roots: solve $b^2 - 4ac > 0$.
- No real roots: solve $b^2 - 4ac < 0$.

:::worked-solution[Example 2: find the values of $k$ for which $2x^2 + kx + 8 = 0$ has equal roots]
1. $a = 2$, $b = k$, $c = 8$.
2. Equal roots: $b^2 - 4ac = 0$, so $k^2 - 4(2)(8) = 0$.
3. $k^2 = 64$, so $k = 8$ or $k = -8$.
4. Check with $k = 8$: $2x^2 + 8x + 8 = 2(x + 2)^2$, which has the repeated root $x = -2$.
:::

:::worked-solution[Example 3: find the range of values of $k$ for which $x^2 - 4x + k - 1 = 0$ has real roots]
1. $a = 1$, $b = -4$, $c = k - 1$. Note that $c$ is the whole expression $k - 1$.
2. Real roots: $b^2 - 4ac \geq 0$, so $16 - 4(k - 1) \geq 0$.
3. $16 - 4k + 4 \geq 0$, so $20 \geq 4k$.
4. $k \leq 5$.
:::

When the inequality in $k$ is quadratic, solve it with a sketch, as in the lesson on quadratic inequalities.

## Where does a line meet a curve?

To find where the line $y = mx + c$ meets the curve $y = ax^2 + bx + d$, set the two expressions for $y$ equal. This gives a quadratic equation in $x$; each real root is the $x$-coordinate of a point of intersection.

| Discriminant of the combined equation | The line … |
| --- | --- |
| $> 0$ | cuts the curve at two distinct points |
| $= 0$ | is a tangent: it touches the curve at one point |
| $< 0$ | does not meet the curve |

:::worked-solution[Example 4: find $c$ so that $y = 2x + c$ is a tangent to $y = x^2 - 4x + 7$, and find the point of contact]
1. Equate: $x^2 - 4x + 7 = 2x + c$, so $x^2 - 6x + (7 - c) = 0$.
2. Tangent means equal roots: $(-6)^2 - 4(1)(7 - c) = 0$.
3. $36 - 28 + 4c = 0$, so $4c = -8$ and $c = -2$.
4. The equation is now $x^2 - 6x + 9 = 0$, that is $(x - 3)^2 = 0$, so $x = 3$.
5. $y = 2(3) - 2 = 4$. The point of contact is $(3, 4)$. (Check on the curve: $9 - 12 + 7 = 4$.)
:::

![The line y = 2x - 2 touches the curve y = x^2 - 4x + 7 at exactly one point, (3, 4): equal roots (discriminant 0) means the line is a tangent.](media:diagrams/discriminant-tangent-line.png "Figure: with c = −2 the line y = 2x + c just touches the curve at (3, 4)")

:::worked-solution[Example 5: find the set of values of $k$ for which $y = kx + 1$ meets $y = x^2 + 2x + 5$ at two distinct points]
1. Equate: $x^2 + 2x + 5 = kx + 1$, so $x^2 + (2 - k)x + 4 = 0$.
2. Two distinct points: $(2 - k)^2 - 4(1)(4) > 0$, so $(2 - k)^2 > 16$.
3. Expand: $k^2 - 4k + 4 - 16 > 0$, so $k^2 - 4k - 12 > 0$, that is $(k - 6)(k + 2) > 0$.
4. Critical values $k = -2$ and $k = 6$. The parabola $y = (k - 6)(k + 2)$ is U-shaped, so it is positive outside the roots.
5. $k < -2$ or $k > 6$.
:::

## "Show that" questions: roots for every value of $k$

To prove that an equation has real roots for **all** values of $k$, show that the discriminant can never be negative, usually by completing the square.

:::worked-solution[Example 6: show that $x^2 + kx + k - 2 = 0$ has two distinct real roots for all real values of $k$]
1. $b^2 - 4ac = k^2 - 4(1)(k - 2) = k^2 - 4k + 8$.
2. Complete the square: $k^2 - 4k + 8 = (k - 2)^2 + 4$.
3. $(k - 2)^2 \geq 0$ for every real $k$, so $(k - 2)^2 + 4 \geq 4 > 0$.
4. The discriminant is always positive, so the equation has two distinct real roots for all real $k$.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards test the nature of roots and unknown constants. Line-and-curve conditions (cut, touch, miss) are stated explicitly in the Cambridge syllabus and appear in ZIMSEC questions on simultaneous equations too. Neither board prints the discriminant conditions in a formula list, so learn them.
:::

## Common mistakes

:::mistake{title="Taking c as only the number"}
In $x^2 - 4x + k - 1 = 0$ the constant term is $c = k - 1$, not $-1$ or $k$. Write $a$, $b$ and $c$ out in full before substituting.
:::

:::mistake{title="Forgetting the negative square root"}
$k^2 = 64$ gives $k = 8$ **or** $k = -8$. Questions on equal roots often have two answers.
:::

:::mistake{title="Using > when the question says real roots"}
"Real roots" allows equal roots, so use $\geq 0$. Only "two distinct real roots" needs $> 0$.
:::

:::mistake{title="Solving a quadratic inequality in k wrongly"}
$(k - 6)(k + 2) > 0$ is not "$k > 6$ and $k > -2$". Sketch the parabola: it is positive outside the roots, so $k < -2$ or $k > 6$.
:::

## Exam tips

:::exam-tip
Always write the condition before substituting, for example "for equal roots, $b^2 - 4ac = 0$". It earns a method mark even if the algebra slips.
:::

:::exam-tip
In line-and-curve questions, rearrange the combined equation to the form $Ax^2 + Bx + C = 0$ and state $A$, $B$ and $C$ clearly: $B$ and $C$ often contain $k$.
:::

:::exam-tip
"Show that the roots are real for all values of $k$" needs a complete argument: discriminant, completed square, and a final sentence explaining why it is never negative.
:::

## Summary

:::summary
- The discriminant of $ax^2 + bx + c = 0$ is $b^2 - 4ac$.
- $> 0$: two distinct real roots; $= 0$: equal roots; $< 0$: no real roots; "real roots" means $\geq 0$.
- With an unknown $k$, form an equation or inequality in $k$ from the condition.
- For a line and a curve, equate them, form one quadratic, then use its discriminant: two points, tangent or no intersection.
- To show roots are real for all $k$, complete the square on the discriminant.
:::
