---
{
  "key": "algebra.linear-inequalities",
  "title": "Linear inequalities",
  "summary": "Solve linear inequalities in one variable, including double inequalities and those that need the sign reversed, and show the solution set on a number line, in set notation and as a list of integers.",
  "concepts": ["amath.algebra.linear-inequalities"],
  "estimatedMinutes": 30,
  "level": "core"
}
---
## Introduction

Many real decisions are about limits rather than exact values. A kombi owner on the Harare–Mutare road can carry **at most** 15 passengers; a farmer near Chinhoyi needs **at least** 40 bags of fertiliser; a phone bundle must cost **less than** a weekly budget. These are inequalities, and solving them gives a whole **set** of acceptable values instead of a single answer.

Linear inequalities are a ZIMSEC Additional Mathematics topic in their own right, and they are the foundation for quadratic inequalities, modulus inequalities and the ranges of functions later in the course.

You should already be able to solve linear equations, including those with brackets and fractions.

## Key definitions

:::definition{term="Inequality symbols"}
$x > a$: $x$ is greater than $a$. $x \geq a$: greater than or equal to $a$. $x < a$: less than $a$. $x \leq a$: less than or equal to $a$.
:::

:::definition{term="Solution set"}
The set of all values that make an inequality true. In set notation, $\{x : x > 4\}$ means "the set of all $x$ such that $x$ is greater than 4".
:::

:::definition{term="Double inequality"}
Two inequalities written together, such as $-2 < x \leq 3$, meaning $x > -2$ **and** $x \leq 3$.
:::

:::keyfact{title="The one rule that differs from equations"}
You may add or subtract the same number on both sides, and multiply or divide both sides by a **positive** number, without changing the inequality. When you multiply or divide both sides by a **negative** number, you must **reverse the inequality sign**: $-2x < 6$ gives $x > -3$.
:::

## Why the sign reverses

Start from a true statement, $2 < 5$. Multiply both sides by $-1$: $-2$ and $-5$. On a number line $-2$ is to the **right** of $-5$, so $-2 > -5$. Multiplying by a negative number flips the order, so the sign must flip too.

You can often avoid dividing by a negative by collecting the $x$ terms on the side where the coefficient stays positive.

## Solving linear inequalities

Use the same steps as for an equation: expand brackets, clear fractions by multiplying by a positive common denominator, collect $x$ terms on one side and numbers on the other, then divide.

:::worked-solution[Example 1: solve $5x - 3 > 2x + 9$]
1. Subtract $2x$ from both sides: $3x - 3 > 9$.
2. Add 3: $3x > 12$.
3. Divide by 3 (positive, so no change): $x > 4$.
4. Set notation: $\{x : x > 4\}$.
:::

:::worked-solution[Example 2: solve $7 - 2x \leq 13$]
1. Subtract 7: $-2x \leq 6$.
2. Divide by $-2$ and **reverse** the sign: $x \geq -3$.
3. Check with $x = 0$ (which should satisfy it): $7 \leq 13$ ✓. Check with $x = -4$ (which should not): $15 \leq 13$ ✗ ✓.
:::

## Inequalities with fractions

Multiply every term by the lowest common denominator. It is positive, so the sign does not change.

:::worked-solution[Example 3: solve $\dfrac{x + 2}{3} - \dfrac{x - 1}{4} \geq 1$]
1. Multiply every term by 12: $4(x + 2) - 3(x - 1) \geq 12$.
2. Expand: $4x + 8 - 3x + 3 \geq 12$.
3. Simplify: $x + 11 \geq 12$, so $x \geq 1$.
:::

## Double inequalities and integer solutions

Treat all three parts at once: whatever you do to the middle, do to both ends.

:::worked-solution[Example 4: solve $-5 < 3x + 1 \leq 10$ and list the integer solutions]
1. Subtract 1 from all three parts: $-6 < 3x \leq 9$.
2. Divide all three parts by 3: $-2 < x \leq 3$.
3. The integers are $-1, 0, 1, 2, 3$ ($-2$ is not included because the sign is strict).
:::

If you divide a double inequality by a negative number, reverse **both** signs and then rewrite it with the smaller number on the left. For example, $-4 < -2x \leq 6$ becomes $2 > x \geq -3$, which is written $-3 \leq x < 2$.

## Showing solutions on a number line

Draw a line with an **open circle** at an endpoint that is **not** included ($<$ or $>$) and a **filled circle** at an endpoint that **is** included ($\leq$ or $\geq$). Shade or draw the line over the values in the set, with an arrow if it continues for ever.

| Inequality | Endpoint | Line |
| --- | --- | --- |
| $x > 4$ | open circle at 4 | arrow to the right |
| $x \geq -3$ | filled circle at $-3$ | arrow to the right |
| $-2 < x \leq 3$ | open at $-2$, filled at 3 | segment between them |

## Two conditions together

:::worked-solution[Example 5: find the values of $x$ that satisfy both $2x - 1 > 5$ and $3x + 4 \leq 25$]
1. First inequality: $2x > 6$, so $x > 3$.
2. Second inequality: $3x \leq 21$, so $x \leq 7$.
3. Both must hold, so the solution is the overlap: $3 < x \leq 7$.
4. In set notation: $\{x : 3 < x \leq 7\}$. The integers in the set are $4, 5, 6, 7$.
:::

![Number lines for 2x - 1 > 5 (x > 3, open circle) and 3x + 4 <= 25 (x <= 7, filled circle): the overlap is 3 < x <= 7, which contains the integers 4, 5, 6 and 7.](media:diagrams/linear-ineq-overlap-number-line.png "Figure: two conditions on number lines; the solution is where they overlap, 3 < x ≤ 7")

On a number line, draw both solution sets and read off where they overlap. If they do not overlap (for example $x > 5$ and $x < 2$), there is no solution.

## Common mistakes

:::mistake{title="Not reversing the sign"}
From $-3x > 12$, the answer is $x < -4$, not $x > -4$. Reverse every time you multiply or divide by a negative.
:::

:::mistake{title="Reversing when there is no need"}
In $3x > -12$, you divide by **positive** 3: $x > -4$. A negative number on the right does not reverse the sign.
:::

:::mistake{title="Including excluded endpoints"}
"Integers satisfying $-2 < x \leq 3$" does not include $-2$. Check each endpoint against the sign.
:::

:::mistake{title="Dividing only the middle of a double inequality"}
Every operation applies to all three parts.
:::

## Exam tips

:::exam-tip
Give the answer in the form the question asks for: an inequality, set notation, a list of integers or a number line. "Show on a number line" needs open and filled circles drawn correctly.
:::

:::exam-tip
Check by substituting one value inside your set and one outside. If both behave as expected, your sign is almost certainly right.
:::

:::exam-tip
In word problems, decide whether the boundary is included ("at most" means $\leq$, "more than" means $>$) and whether only whole numbers make sense.
:::

## Summary

:::summary
- Solve like an equation, but reverse the sign when multiplying or dividing by a negative number.
- Clear fractions by multiplying by a positive common denominator.
- In a double inequality, apply each step to all three parts.
- Open circle for $<$ or $>$; filled circle for $\leq$ or $\geq$.
- Two conditions together: take the overlap of the two solution sets.
:::
