---
{
  "key": "modulus.inequalities",
  "title": "Modulus inequalities",
  "summary": "Solve inequalities such as |ax + b| < c, k|ax + b| > c, |ax + b| ≤ |cx + d|, |ax + b| ≤ cx + d and |ax² + bx + c| < d by using critical values, squaring when both sides are non-negative, and graphs, and write the solution set correctly.",
  "concepts": ["amath.modulus.inequalities"],
  "estimatedMinutes": 30,
  "level": "core"
}
---
## Introduction

A water tank in Masvingo is meant to hold 2000 litres, and the inspector accepts it if the true capacity is within 50 litres of that. If $V$ is the capacity, the condition is $|V - 2000| \leq 50$, which means $1950 \leq V \leq 2050$. Tolerances, errors and distances from a target are all naturally written as **modulus inequalities**.

This Cambridge 0606 topic builds on modulus equations and quadratic inequalities. The plan is always the same: find the **critical values** (where the two sides are equal), then decide which regions satisfy the inequality, using a sketch or a test value.

## Key definitions

:::definition{term="Distance meaning of the modulus"}
$|x - a|$ is the distance between $x$ and $a$ on the number line. So $|x - a| < c$ means "$x$ is less than $c$ away from $a$".
:::

:::keyfact{title="The two basic results (for c > 0)"}
$$
|X| < c \iff -c < X < c
$$

$$
|X| > c \iff X < -c \text{ or } X > c
$$

The same holds with $\leq$ and $\geq$. If $c \leq 0$, then $|X| < c$ has no solution and $|X| > c$ holds for every $X$ except, when $c = 0$, $X = 0$.
:::

## Type 1: $|ax + b| < c$ and $|ax + b| > c$

"Less than" gives one interval; "greater than" gives two separate pieces.

:::worked-solution[Example 1: solve (a) $|x - 3| < 5$ and (b) $|2x + 1| \geq 7$]
1. (a) $-5 < x - 3 < 5$. Add 3 throughout: $-2 < x < 8$.
2. (b) $2x + 1 \leq -7$ or $2x + 1 \geq 7$.
3. $2x \leq -8$ or $2x \geq 6$, so $x \leq -4$ or $x \geq 3$.
:::

When there is a number in front of the modulus, $k|ax + b|$, divide by $k$ first (if $k > 0$ the inequality sign stays the same).

:::worked-solution[Example 2: solve $3|2x - 1| > 15$]
1. Divide by 3: $|2x - 1| > 5$.
2. $2x - 1 < -5$ or $2x - 1 > 5$.
3. $x < -2$ or $x > 3$.
:::

## Type 2: $|ax + b| < |cx + d|$, squaring

Both sides are non-negative, so squaring keeps the inequality the right way round: $|P| < |Q| \iff P^2 < Q^2$. This turns the problem into a quadratic inequality.

:::worked-solution[Example 3: solve $|x + 1| \leq |2x - 4|$]
1. Square both sides: $(x + 1)^2 \leq (2x - 4)^2$.
2. Expand: $x^2 + 2x + 1 \leq 4x^2 - 16x + 16$.
3. Rearrange: $0 \leq 3x^2 - 18x + 15$, that is $x^2 - 6x + 5 \geq 0$.
4. Critical values: $(x - 1)(x - 5) = 0$, so $x = 1$ or $x = 5$.
5. U-shaped, $\geq 0$ outside the roots: $x \leq 1$ or $x \geq 5$.
6. Test $x = 0$: $|1| \leq |-4|$, true. Test $x = 3$: $|4| \leq |2|$, false. This confirms the regions.
:::

## Type 3: $|ax + b| < cx + d$, critical values and a check

You may **not** simply square here, because $cx + d$ can be negative. Instead:

1. Solve the equation $|ax + b| = cx + d$ (both cases, rejecting false roots) to get the critical values.
2. Test a value in each region, or use a sketch of the V and the line.

:::worked-solution[Example 4: solve $|2x - 3| < x + 1$]
1. Case 1: $2x - 3 = x + 1$ gives $x = 4$; then $x + 1 = 5 > 0$, valid.
2. Case 2: $-(2x - 3) = x + 1$ gives $3 - 2x = x + 1$, so $x = \frac{2}{3}$; then $x + 1 = \frac{5}{3} > 0$, valid.
3. Sketch: the V-shaped graph $y = |2x - 3|$ has its vertex at $\left(\frac{3}{2}, 0\right)$; the line $y = x + 1$ crosses it at $x = \frac{2}{3}$ and $x = 4$ and lies above the V between them.
4. Test $x = 1$: $|-1| = 1 < 2$, true. Test $x = 0$: $3 < 1$, false. Test $x = 5$: $7 < 6$, false.
5. Solution: $\frac{2}{3} < x < 4$.
:::

![Graphs of y = |2x - 3| and y = x + 1: the line crosses the V at x = 2/3 and x = 4 and lies above it between them, so |2x - 3| < x + 1 holds for 2/3 < x < 4.](media:diagrams/modulus-ineq-v-and-line.png "Figure: the line is above the V-shaped graph only between the crossing points x = 2/3 and x = 4")

## Type 4: the modulus of a quadratic

Use the basic results with $X = ax^2 + bx + c$. This gives two quadratic inequalities, and the solution is where both (for $<$) or either (for $>$) hold.

:::worked-solution[Example 5: solve $|x^2 - 5| < 4$]
1. $-4 < x^2 - 5 < 4$, so $1 < x^2 < 9$.
2. $x^2 > 1$ means $x < -1$ or $x > 1$.
3. $x^2 < 9$ means $-3 < x < 3$.
4. Both together: $-3 < x < -1$ or $1 < x < 3$.
:::

Graphically, $y = |x^2 - 5|$ is the parabola with the part between $x = -\sqrt{5}$ and $x = \sqrt{5}$ reflected upwards. The line $y = 4$ lies above the graph on two separate intervals, which is why the answer has two pieces.

For $|ax^2 + bx + c| > d$, solve $ax^2 + bx + c > d$ **or** $ax^2 + bx + c < -d$ and combine the pieces; one of them may have no solution, or, as in the next example, both may contribute.

:::worked-solution[Example 6: solve $|x^2 - 6x + 5| > 3$, giving exact boundaries]
1. Either $x^2 - 6x + 5 > 3$ or $x^2 - 6x + 5 < -3$.
2. First piece: $x^2 - 6x + 2 > 0$. The critical values are $x = 3 \pm \sqrt{7}$ (complete the square: $(x - 3)^2 > 7$), and the U-shaped curve is positive outside them: $x < 3 - \sqrt{7}$ or $x > 3 + \sqrt{7}$.
3. Second piece: $x^2 - 6x + 8 < 0$, that is $(x - 2)(x - 4) < 0$, so $2 < x < 4$.
4. Combine: $x < 3 - \sqrt{7}$ or $2 < x < 4$ or $x > 3 + \sqrt{7}$ (about $x < 0.354$, $2 < x < 4$, $x > 5.65$).
5. Picture: the reflected arch of $y = |x^2 - 6x + 5|$ between $x = 1$ and $x = 5$ has height 4, so the line $y = 3$ cuts it, and the arch pokes above the line between $x = 2$ and $x = 4$. The outer branches are above the line beyond $3 \pm \sqrt{7}$.
:::

![Graph of y = |x^2 - 6x + 5| with the line y = 3: the curve is above the line for x < 3 - sqrt 7 (about 0.35), for 2 < x < 4 where the reflected arch pokes above, and for x > 3 + sqrt 7 (about 5.65), giving three pieces.](media:diagrams/modulus-ineq-quadratic-three-pieces.png "Figure: |x² − 6x + 5| > 3 has three pieces, marked in red on the x-axis")

A three-piece answer like this is unusual but correct. Always draw the graph and the horizontal line: the picture tells you how many pieces to expect before you do any algebra, and it catches a missing piece at once.

## Checking an answer quickly

After any modulus inequality, pick one number inside each region of your answer and one number outside it, and substitute into the **original** inequality. For Example 6, $x = 3$ gives $|9 - 18 + 5| = 4 > 3$ (true, and 3 is inside $2 < x < 4$), while $x = 1.5$ gives $|2.25 - 9 + 5| = 1.75$, which is not greater than 3 (and 1.5 is outside every piece). Two substitutions take less than a minute and protect several marks.

## Summary of methods

| Inequality | Method |
| --- | --- |
| $\lvert ax + b \rvert < c$ | $-c < ax + b < c$ |
| $\lvert ax + b \rvert > c$ | $ax + b < -c$ or $ax + b > c$ |
| $k\lvert ax + b \rvert > c$ | divide by $k$ first |
| $\lvert ax + b \rvert < \lvert cx + d \rvert$ | square both sides, solve the quadratic inequality |
| $\lvert ax + b \rvert < cx + d$ | critical values from the equation, then test regions |
| $\lvert ax^2 + bx + c \rvert < d$ | $-d < ax^2 + bx + c < d$: two quadratic inequalities |

## Common mistakes

:::mistake{title="Writing |x| > 3 as −3 > x > 3"}
That is impossible. "Greater than" gives two pieces: $x < -3$ or $x > 3$.
:::

:::mistake{title="Squaring when one side might be negative"}
$|x - 1| < x - 5$ cannot be squared directly: for $x < 5$ the right-hand side is negative and the inequality has no solution there. Use critical values and test regions.
:::

:::mistake{title="Not checking the regions"}
After finding critical values, always test a number in each region. Algebra alone does not tell you whether the answer is "between" or "outside".
:::

:::mistake{title="Dividing by a negative k without reversing"}
$-2|x - 1| > -8$ becomes $|x - 1| < 4$ when you divide by $-2$.
:::

## Exam tips

:::exam-tip
Show the critical values clearly; they often earn a mark each. Then give the final answer in a clear form, such as "$\frac{2}{3} < x < 4$" or "$x \leq 1$ or $x \geq 5$".
:::

:::exam-tip
Questions often say "sketch the graph of $y = |2x - 3|$ and hence solve …". Use the sketch: the solution is where one graph lies above or below the other.
:::

:::exam-tip
On Paper 1, critical values are usually integers or simple fractions; leave fractions such as $\frac{2}{3}$ exact.
:::

## Summary

:::summary
- $|X| < c$ means $-c < X < c$; $|X| > c$ means $X < -c$ or $X > c$.
- Divide by a positive constant in front of the modulus first.
- Both sides moduli: square and solve the quadratic inequality.
- One side not a modulus: find critical values from the equation, then test each region.
- The modulus of a quadratic gives two quadratic inequalities; combine them carefully.
:::
