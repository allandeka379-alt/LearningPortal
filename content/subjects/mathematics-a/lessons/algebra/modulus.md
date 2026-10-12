---
{
  "key": "algebra.modulus",
  "title": "The modulus function: graphs, equations and inequalities",
  "summary": "Understand |x| as distance from zero, sketch y = |ax + b|, and solve modulus equations and inequalities by squaring, by splitting into cases and with graphs.",
  "concepts": ["amaths.algebra.modulus"],
  "estimatedMinutes": 40,
  "level": "core"
}
---
## Introduction

The modulus (or absolute value) of a number ignores its sign: $|-7| = 7$ and $|7| = 7$. It measures **size** or **distance**, which is why it appears whenever direction does not matter: the error in a measurement, the gap between a borehole's planned depth and its actual depth, or the tolerance on a machined part in a Bulawayo factory ("the diameter must be within 0.2 mm of 30 mm" is $|d - 30| \leq 0.2$).

ZIMSEC Pure Mathematics (Form 5) examines the meaning of the notation and equations and inequalities involving the modulus. Cambridge 9709 examines the same work in Papers 2 and 3. You need to be able to solve linear and quadratic inequalities.

## Key definitions

:::definition{term="Modulus"}
$$
|x| = \begin{cases} x & \text{if } x \geq 0 \\ -x & \text{if } x < 0 \end{cases}
$$

So $|x|$ is never negative, and $|x - a|$ is the **distance** between $x$ and $a$ on the number line.
:::

:::formula{name="Key facts"}
$$
|a| = |b| \iff a^{2} = b^{2} \iff a = b \text{ or } a = -b
$$

$$
|x - a| < b \iff a - b < x < a + b \qquad (b > 0)
$$

$$
|x - a| > b \iff x < a - b \text{ or } x > a + b
$$

These are not in Cambridge's MF19 list.
:::

## Graphs of $y = |ax + b|$

Draw $y = ax + b$, then **reflect the part below the $x$-axis in the $x$-axis**. The result is a V shape:

- the vertex is on the $x$-axis at $x = -\dfrac{b}{a}$;
- the $y$-intercept is $|b|$;
- the two arms have gradients $a$ and $-a$.

For example, $y = |2x - 1|$ has its vertex at $\left(\frac{1}{2}, 0\right)$, meets the $y$-axis at $(0, 1)$, and its arms have gradients $2$ (for $x > \frac{1}{2}$) and $-2$ (for $x < \frac{1}{2}$).

A sketch is the best way to see how many solutions an equation has. The graph of $y = |f(x)|$ for non-linear $f$ is covered in the lesson on transformations of graphs (ZIMSEC).

## Equations

There are two reliable methods.

**Method 1: cases.** $|A| = k$ (with $k \geq 0$) means $A = k$ or $A = -k$.

**Method 2: squaring.** Because both sides of $|A| = |B|$ are non-negative, squaring gives an equivalent equation $A^{2} = B^{2}$, with no extra roots.

:::worked-solution[Example 1: solve $|2x - 5| = 7$]
1. Either $2x - 5 = 7$, giving $x = 6$,
2. or $2x - 5 = -7$, giving $x = -1$.
3. Check: $|12 - 5| = 7$ and $|-2 - 5| = 7$.
:::

:::worked-solution[Example 2: solve $|3x - 1| = |x + 5|$]
1. Square both sides: $9x^{2} - 6x + 1 = x^{2} + 10x + 25$.
2. Simplify: $8x^{2} - 16x - 24 = 0$, so $x^{2} - 2x - 3 = 0$.
3. Factorise: $(x - 3)(x + 1) = 0$, so $x = 3$ or $x = -1$.
4. Check: $x = 3$ gives $|8| = |8|$; $x = -1$ gives $|-4| = |4|$.
:::

Alternatively, $3x - 1 = x + 5$ or $3x - 1 = -(x + 5)$, which gives the same two answers. Squaring is safe **only** when both sides are moduli (or both are known to be non-negative). For $|2x - 1| = x + 4$ the right side could be negative, so use cases and check each answer.

## Inequalities

For $|x - a| < b$, think "within $b$ of $a$". For $|x - a| > b$, think "more than $b$ away from $a$": the solution is **two separate intervals**.

:::worked-solution[Example 3: solve (a) $|x - 4| < 3$ and (b) $|2x + 1| \geq 5$]
1. (a) $-3 < x - 4 < 3$, so $1 < x < 7$.
2. (b) Either $2x + 1 \geq 5$, giving $x \geq 2$, or $2x + 1 \leq -5$, giving $x \leq -3$.
3. Answer to (b): $x \leq -3$ or $x \geq 2$.
:::

With a modulus on each side, squaring turns the problem into a quadratic inequality.

:::worked-solution[Example 4: solve $|x + 2| > |2x - 3|$]
1. Both sides are non-negative, so square: $x^{2} + 4x + 4 > 4x^{2} - 12x + 9$.
2. Rearrange: $0 > 3x^{2} - 16x + 5$, that is $3x^{2} - 16x + 5 < 0$.
3. Factorise: $(3x - 1)(x - 5) < 0$. The critical values are $\frac{1}{3}$ and $5$.
4. The quadratic is negative between its roots: $\dfrac{1}{3} < x < 5$.
5. Check $x = 1$: $|3| > |-1|$, true; $x = 6$: $|8| > |9|$, false.
:::

When one side is a straight line, such as $|2x - 1| < x + 4$, sketch both graphs. The V-shape $y = |2x - 1|$ lies below the line between the two intersection points.

:::worked-solution[Example 5: solve $|2x - 1| < x + 4$]
1. The inequality means $-(x + 4) < 2x - 1 < x + 4$.
2. Right part: $2x - 1 < x + 4$ gives $x < 5$.
3. Left part: $2x - 1 > -x - 4$ gives $3x > -3$, so $x > -1$.
4. Answer: $-1 < x < 5$. The intersection points are $(-1, 3)$ and $(5, 9)$, where the line meets the two arms of the V.
:::

![Graphs of the V-shaped y = |2x - 1| with vertex (1/2, 0) and the line y = x + 4: they meet at (-1, 3) and (5, 9), and the V lies below the line between x = -1 and x = 5, so |2x - 1| < x + 4 for -1 < x < 5.](media:diagrams/modulus-v-and-line.png "Figure: the V lies below the line between the intersections, so −1 < x < 5")

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards examine $|ax + b|$, equations and inequalities. Cambridge sets these on Papers 2 and 3. ZIMSEC also asks for $y = |f(x)|$ when $f$ is not linear (see transformations of graphs).
:::

## Common mistakes

:::mistake{title="Only one case"}
$|2x - 5| = 7$ has two solutions. Writing only $2x - 5 = 7$ loses $x = -1$.
:::

:::mistake{title="Squaring when one side may be negative"}
Squaring $|2x - 1| = x - 4$ gives $3x^{2} + 4x - 15 = 0$ with roots $x = \frac{5}{3}$ and $x = -3$, yet neither satisfies the original, because $x - 4 < 0$ there. Check every answer.
:::

:::mistake{title="Writing 'more than' answers as one interval"}
$|x - 2| > 5$ is $x < -3$ **or** $x > 7$. Writing $-3 > x > 7$ is impossible: no number is both.
:::

:::mistake{title="Wrong region of a quadratic inequality"}
$(3x - 1)(x - 5) < 0$ holds **between** the roots. Use a sketch of the parabola or a sign table rather than guessing.
:::

## Exam tips

:::exam-tip
A sketch of $y = |ax + b|$ should show the V shape, the vertex on the $x$-axis and the $y$-intercept, with coordinates labelled.
:::

:::exam-tip
For "solve the inequality", state the critical values first; most mark schemes award a mark for them before the final set.
:::

:::exam-tip
Use the sketch to predict the number of solutions before you start algebra. It tells you when an answer from squaring or from a case must be rejected.
:::

## Summary

:::summary
- $|x|$ is the size of $x$; $|x - a|$ is the distance from $x$ to $a$.
- $y = |ax + b|$ is a V with vertex $\left(-\frac{b}{a}, 0\right)$ and $y$-intercept $|b|$.
- $|A| = |B| \iff A^{2} = B^{2}$; $|A| = k$ means $A = \pm k$.
- $|x - a| < b$ gives one interval; $|x - a| > b$ gives two.
- Square only when both sides are non-negative; otherwise use cases or a graph and check answers.
:::
