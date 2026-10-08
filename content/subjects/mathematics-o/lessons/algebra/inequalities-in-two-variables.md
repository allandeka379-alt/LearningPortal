---
{
  "key": "algebra.inequalities-in-two-variables",
  "title": "Inequalities in two variables: regions on a graph",
  "summary": "Represent linear inequalities in two variables as regions on a graph, using broken lines for strict inequalities and solid lines for inclusive ones, shade unwanted regions, and write down the inequalities that define a given region.",
  "concepts": ["math.algebra.inequalities-graphical"],
  "objectives": ["zimsec/o-level/mathematics:7.3.2", "cambridge/igcse/mathematics:2.6.3", "cambridge/igcse/mathematics:2.6.4"],
  "estimatedMinutes": 35,
  "level": "extended"
}
---
## Introduction

A school tuck shop in Kadoma sells buns and drinks. The owner can carry at most 60 items to school, must take at least 10 drinks, and wants more buns than drinks. Each condition is an **inequality** in two variables, and on a graph each one cuts the plane into two parts: the points that obey it and the points that do not. Together, the conditions mark out a **region** of possible choices.

On a number line, an inequality such as $x \geq 2$ is a ray. On a coordinate grid, an inequality in $x$ and $y$ is a whole region. This lesson shows how to draw such regions and how to read the inequalities back from a diagram. It leads directly to linear programming.

You should already be able to draw straight lines such as $x + 2y = 6$ and solve simple inequalities.

## Key definitions

:::definition{term="Boundary line"}
The straight line obtained by replacing the inequality sign with $=$. For $x + 2y < 6$ it is the line $x + 2y = 6$.
:::

:::definition{term="Strict and inclusive inequalities"}
A **strict** inequality ($<$ or $>$) does not include the boundary, so the line is drawn **broken** (dashed). An **inclusive** inequality ($\leq$ or $\geq$) includes the boundary, so the line is drawn **solid**.
:::

:::definition{term="Required region"}
The set of all points whose coordinates satisfy every inequality given.
:::

:::keyfact{title="Shading convention"}
Cambridge expects you to **shade the unwanted region**, so the required region is left **unshaded** and is easy to see. Many other questions, including ZIMSEC ones, use the same convention, but always read the instruction in the question and follow it.
:::

## Drawing the region for one inequality

1. Draw the boundary line: solid for $\leq$ or $\geq$, broken for $<$ or $>$.
2. Choose a **test point** that is not on the line; the origin $(0, 0)$ is easiest when the line does not pass through it.
3. Substitute it into the inequality. If the statement is true, the test point is on the wanted side; if false, the wanted side is the other side.
4. Shade the unwanted side.

:::worked-solution[Example 1: show $y \geq 2x - 1$]
1. Boundary $y = 2x - 1$, through $(0, -1)$ and $(2, 3)$. The sign is $\geq$, so draw a **solid** line.
2. Test $(0, 0)$: $0 \geq 2(0) - 1$, that is $0 \geq -1$. True.
3. The origin side (above the line) is wanted. Shade the region **below** the line.
:::

:::worked-solution[Example 2: show $x + 2y < 6$]
1. Boundary $x + 2y = 6$, through $(6, 0)$ and $(0, 3)$. The sign is $<$, so draw a **broken** line.
2. Test $(0, 0)$: $0 < 6$. True.
3. The wanted region is the side containing the origin (below the line). Shade the side above it.
:::

Lines parallel to the axes are the easiest of all. $x \geq 2$ is the region on or to the **right** of the vertical line $x = 2$; $y < 3$ is the region **below** the broken horizontal line $y = 3$.

## Several inequalities together

:::worked-solution[Example 3: the region $x \geq 0$, $y \geq 1$, $x + y \leq 5$]
1. Draw $x = 0$ (the $y$-axis), $y = 1$ and $x + y = 5$, all solid.
2. Shade to the left of the $y$-axis, below $y = 1$, and above $x + y = 5$ (the origin satisfies $x + y \leq 5$).
3. The unshaded region is a triangle. Its vertices are where the boundaries meet: $(0, 1)$, $(0, 5)$, and $(4, 1)$ (from $y = 1$ and $x + y = 5$).
4. Points with integer coordinates in the region (boundaries included): for $y = 1$, $x = 0$ to $4$ (5 points); $y = 2$: 4 points; $y = 3$: 3; $y = 4$: 2; $y = 5$: 1. That is 15 points.
:::

## Finding the inequalities for a given region (Cambridge Extended)

Work one boundary at a time:

1. Find the equation of the boundary line (from its intercepts or from two points on it).
2. Decide the sign: take a point **inside** the region and see whether it makes the left side bigger or smaller.
3. Use $\leq$ / $\geq$ for a solid line and $<$ / $>$ for a broken line.

:::worked-solution[Example 4: describe the triangle with vertices $(0, 0)$, $(6, 0)$ and $(0, 3)$]
All three sides are solid.
1. The side along the $x$-axis: $y = 0$. Inside points are above it, so $y \geq 0$.
2. The side along the $y$-axis: $x = 0$. Inside points are to the right, so $x \geq 0$.
3. The third side passes through $(6, 0)$ and $(0, 3)$: its gradient is $-\frac{1}{2}$, so $y = -\frac{1}{2}x + 3$, or $x + 2y = 6$.
4. Test the inside point $(1, 1)$: $1 + 2 = 3$, which is less than $6$. So $x + 2y \leq 6$.
5. The region is $x \geq 0$, $y \geq 0$, $x + 2y \leq 6$.
:::

## Common mistakes

:::mistake{title="Using the wrong type of line"}
$y < 2x + 1$ needs a broken line, because points on the line give $y = 2x + 1$, which does not satisfy "$<$".
:::

:::mistake{title="Shading the wrong side"}
Do not guess "less than means below". For $-x + y \leq 2$ or $3x - 2y > 6$ the direction is not obvious. Always use a test point.
:::

:::mistake{title="Testing a point on the line"}
If the boundary passes through the origin, as $y = 2x$ does, the origin cannot be the test point. Use a point such as $(1, 0)$ instead.
:::

:::mistake{title="Confusing vertical and horizontal boundaries"}
$x \geq 2$ is bounded by the **vertical** line $x = 2$; $y \geq 2$ is bounded by the **horizontal** line $y = 2$.
:::

## Exam tips

:::exam-tip
Label each boundary line with its equation, and label the required region (often $R$) clearly. If you change your mind about shading, rub it out completely.
:::

:::exam-tip
When you are asked for the inequalities of a region, write one inequality for each boundary line, and check each one with the same point inside the region.
:::

:::exam-tip
When counting integer points, check whether each boundary is included: points on a broken line do not count.
:::

## Summary

:::summary
- Draw the boundary line: solid for $\leq$, $\geq$; broken for $<$, $>$.
- Use a test point not on the line to decide which side is wanted.
- Follow the question's shading instruction; usually shade the unwanted region and leave $R$ unshaded.
- Vertical boundaries come from $x$-inequalities, horizontal ones from $y$-inequalities.
- To describe a region, find each boundary's equation, then choose the sign using a point inside.
:::
