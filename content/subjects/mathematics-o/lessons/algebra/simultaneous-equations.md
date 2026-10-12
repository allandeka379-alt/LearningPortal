---
{
  "key": "algebra.simultaneous-equations",
  "title": "Simultaneous linear equations",
  "summary": "Solve a pair of linear equations in two unknowns by elimination and by substitution, form them from practical problems, and interpret the solution as the point where two straight lines meet.",
  "concepts": ["math.algebra.simultaneous-equations"],
  "objectives": ["zimsec/o-level/mathematics:7.2.2", "zimsec/o-level/mathematics:7.2.5", "cambridge/igcse/mathematics:2.5.1", "cambridge/igcse/mathematics:2.5.3"],
  "estimatedMinutes": 35,
  "level": "core"
}
---
## Introduction

At a school tuck shop, 3 buns and 2 drinks cost US\$2.90, while 2 buns and 3 drinks cost US\$3.10. Neither fact on its own tells you the price of a bun. Together they do. Writing $b$ for the price of a bun and $d$ for a drink gives two equations that must both be true at the same time:

$$
3b + 2d = 2.90 \qquad 2b + 3d = 3.10
$$

These are **simultaneous equations**. In this lesson you will solve them by **elimination** and by **substitution**, form them from word problems and see what the solution means on a graph. (ZIMSEC candidates also learn a matrix method, in the lesson on the inverse of a 2 × 2 matrix.)

You should be able to solve linear equations in one unknown.

## Key definitions

:::definition{term="Simultaneous equations"}
Two equations in the same two unknowns that are both true at the same time. Their **solution** is the pair of values, such as $x = 3$, $y = 2$, that satisfies both.
:::

:::keyfact{title="Same signs subtract, different signs add"}
When the coefficients of one unknown are equal in size, **subtract** the equations if the signs are the same and **add** them if the signs are different. That unknown disappears.
:::

## Method 1: elimination

:::worked-solution[Example 1: solve $4x + 3y = 18$ and $2x - 3y = 0$]
1. The $y$ terms are $+3y$ and $-3y$: different signs, so add.
2. $6x = 18$, so $x = 3$.
3. Substitute into the first equation: $12 + 3y = 18$, so $3y = 6$ and $y = 2$.
4. Check in the second equation: $6 - 6 = 0$. ✓
:::

Often you must multiply one or both equations first so that the coefficients match.

:::worked-solution[Example 2: solve $3x + 4y = 10$ and $2x - 5y = -1$]
1. Make the $y$ coefficients 20: multiply the first by 5 and the second by 4.
2. $15x + 20y = 50$ and $8x - 20y = -4$.
3. Different signs, so add: $23x = 46$, giving $x = 2$.
4. Substitute: $6 + 4y = 10$, so $y = 1$.
5. Check: $2(2) - 5(1) = -1$. ✓
:::

## Method 2: substitution

Substitution is quickest when one equation already gives one unknown in terms of the other.

:::worked-solution[Example 3: solve $y = 3x - 2$ and $2x + y = 13$]
1. Replace $y$ in the second equation: $2x + (3x - 2) = 13$.
2. Simplify: $5x - 2 = 13$, so $5x = 15$ and $x = 3$.
3. Then $y = 3(3) - 2 = 7$.
:::

## Forming simultaneous equations

Use one letter for each unknown and write one equation for each separate piece of information.

:::worked-solution[Example 4: the tuck shop]
1. Let a bun cost $b$ dollars and a drink $d$ dollars: $3b + 2d = 2.90$ and $2b + 3d = 3.10$.
2. Make the $b$ coefficients 6: multiply the first by 2 and the second by 3: $6b + 4d = 5.80$ and $6b + 9d = 9.30$.
3. Same signs, so subtract: $5d = 3.50$, giving $d = 0.70$.
4. Substitute: $3b + 1.40 = 2.90$, so $b = 0.50$.
5. A bun costs US\$0.50 and a drink US\$0.70. Check: $2(0.50) + 3(0.70) = 3.10$. ✓
:::

The same method finds a straight line through two points. If $y = mx + c$ passes through $(1, 5)$ and $(4, 11)$, then $m + c = 5$ and $4m + c = 11$. Subtracting gives $3m = 6$, so $m = 2$ and $c = 3$: the line is $y = 2x + 3$.

## What the solution means on a graph

Each linear equation is a straight line. The solution is the point that lies on **both** lines: their point of intersection. For example $y = 2x - 3$ and $y = -x + 9$ meet where $2x - 3 = -x + 9$, at $(4, 5)$.

![Graphs of y = 2x − 3 and y = −x + 9: the two straight lines cross at (4, 5), so x = 4 and y = 5 is the solution of the simultaneous equations.](media:diagrams/simultaneous-lines-intersect.png "Figure: the solution is where the two lines meet")

If two lines are parallel, such as $y = 2x + 1$ and $y = 2x - 4$, they never meet and the equations have **no solution**. Trying to solve them leads to a false statement like $1 = -4$.

## Common mistakes

:::mistake{title="Adding when you should subtract"}
With $+6b$ in both equations, adding gives $12b$ and nothing is eliminated. Check the signs: same signs subtract, different signs add.
:::

:::mistake{title="Subtracting negative terms"}
Subtracting $2x - 3y = 11$ from $2x + 7y = 1$ gives $10y = -10$, because $7y - (-3y) = 10y$. Write the subtraction out in full.
:::

:::mistake{title="Multiplying only one side"}
When you multiply an equation by 5, multiply **every** term on both sides: $3x + 4y = 10$ becomes $15x + 20y = 50$, not $15x + 20y = 10$.
:::

:::mistake{title="Stopping after one unknown"}
The answer to simultaneous equations is a **pair** of values. Always find the second unknown and check both in the other equation.
:::

## Exam tips

:::exam-tip
Label your equations (1) and (2) and say what you do: “(1) × 2 − (2) × 3”. Clear working earns method marks even if you make an arithmetic slip.
:::

:::exam-tip
Check your pair of values in the equation you did **not** use to find the second unknown. If it fails, look for a sign error in the elimination step.
:::

:::exam-tip
In word problems, state what each letter represents, including units, and finish with a sentence that answers the question asked.
:::

## Summary

:::summary
- Simultaneous equations are satisfied by the same pair of values.
- Elimination: match the coefficients of one unknown, then add (different signs) or subtract (same signs).
- Substitution: replace one unknown using the other equation.
- Find both unknowns and check them in the other equation.
- The solution is the intersection of two straight lines; parallel lines give no solution.
:::
