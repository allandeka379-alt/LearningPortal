---
{
  "key": "coordinate.equation-of-a-line",
  "title": "The equation of a straight line",
  "summary": "Interpret y = mx + c as gradient and y-intercept, read m and c from equations such as ax + by = c, and find the equation of a line from its graph, from a point and the gradient, or from two points.",
  "concepts": ["math.coordinate.equation-of-a-line"],
  "objectives": ["zimsec/o-level/mathematics:5.1.2", "cambridge/igcse/mathematics:3.5.1", "cambridge/igcse/mathematics:3.5.2"],
  "estimatedMinutes": 30,
  "level": "core"
}
---
## Introduction

A solar-powered borehole pump on a farm near Masvingo fills a storage tank. When Nyasha starts timing, the tank already holds 200 litres, and it gains 40 litres every minute. After $t$ minutes the volume is $V = 40t + 200$ litres. The number 40 is how steep the graph is, and 200 is where it starts on the vertical axis.

Every straight line can be written in a similar way, as $y = mx + c$. Once you can read $m$ and $c$ from an equation, and work out the equation from a graph or from points, you can describe any straight line exactly. It is a core skill for both ZIMSEC and Cambridge papers.

You should already know how to find the gradient of a line from a grid or from two points.

## Key definitions

:::definition{term="Gradient-intercept form"}
The equation $y = mx + c$, where $m$ is the **gradient** of the line and $c$ is the **$y$-intercept**: the line crosses the $y$-axis at $(0, c)$.
:::

:::definition{term="General form"}
An equation such as $2x + 3y = 12$ or $2x + 3y - 12 = 0$, with the $x$ and $y$ terms together. To read the gradient, rearrange it to make $y$ the subject.
:::

:::keyfact{title="Reading m and c"}
$m$ is the number multiplying $x$, and $c$ is the constant term, **but only when the equation is written as $y = \ldots$** with $y$ on its own.
:::

## Reading the gradient and intercept

| Equation | Rearranged as $y = mx + c$ | Gradient $m$ | $y$-intercept $c$ |
| :---: | :---: | :---: | :---: |
| $y = 3x - 5$ | already in form | $3$ | $-5$ |
| $y = 7 - 2x$ | $y = -2x + 7$ | $-2$ | $7$ |
| $y = \frac{x}{2}$ | $y = \frac{1}{2}x + 0$ | $\frac{1}{2}$ | $0$ |
| $2y = 6x + 8$ | $y = 3x + 4$ | $3$ | $4$ |
| $2x + 3y = 12$ | $y = -\frac{2}{3}x + 4$ | $-\frac{2}{3}$ | $4$ |

:::worked-solution[Example 1: gradient and intercept of $2x + 3y = 12$]
1. Subtract $2x$ from both sides: $3y = -2x + 12$.
2. Divide every term by $3$: $y = -\frac{2}{3}x + 4$.
3. The gradient is $-\frac{2}{3}$ and the line crosses the $y$-axis at $(0, 4)$.
:::

## Finding the equation of a line

There are three common situations. In each one, the aim is to find $m$ and then $c$.

### From a graph

Read $c$ where the line crosses the $y$-axis, and find $m$ from two points on the line.

![A line crossing the y-axis at (0, −2) and passing through (4, 6): c is −2, the run is 4 and the rise is 8, so the gradient m is 2 and the equation is y = 2x − 2.](media:diagrams/equation-from-graph-y-2x-minus-2.png "Figure: read c at the y-axis, then find m from rise over run")

:::worked-solution[Example 2: from a graph]
A straight line crosses the $y$-axis at $(0, -2)$ and passes through the grid point $(4, 6)$. Find its equation.
1. $c = -2$ (the $y$-intercept).
2. $m = \frac{6 - (-2)}{4 - 0} = \frac{8}{4} = 2$.
3. The equation is $y = 2x - 2$.
:::

### From the gradient and one point

Substitute the gradient and the coordinates of the point into $y = mx + c$, then solve for $c$.

:::worked-solution[Example 3: gradient 3 through $(2, 1)$]
1. $y = 3x + c$.
2. The point $(2, 1)$ is on the line, so $1 = 3(2) + c$.
3. $1 = 6 + c$, so $c = -5$.
4. The equation is $y = 3x - 5$.
:::

### From two points

Find the gradient first, then use either point to find $c$. Use the other point to check.

:::worked-solution[Example 4: through $(-1, 7)$ and $(3, -1)$]
1. $m = \frac{-1 - 7}{3 - (-1)} = \frac{-8}{4} = -2$.
2. $y = -2x + c$. Substitute $(-1, 7)$: $7 = -2(-1) + c = 2 + c$, so $c = 5$.
3. The equation is $y = -2x + 5$.
4. Check with $(3, -1)$: $-2(3) + 5 = -1$. Correct.
:::

:::worked-solution[Example 5: a fractional gradient]
Find the equation of the line through $(2, 3)$ and $(6, 5)$. Give it in the form $y = mx + c$ and in the form $ax + by = c$ with integer coefficients.
1. $m = \frac{5 - 3}{6 - 2} = \frac{2}{4} = \frac{1}{2}$.
2. $3 = \frac{1}{2}(2) + c = 1 + c$, so $c = 2$.
3. $y = \frac{1}{2}x + 2$.
4. Multiply by 2: $2y = x + 4$, so $x - 2y = -4$.
:::

## Using the equation

Once you know the equation, you can answer many questions by substitution: whether a point lies on the line, where it crosses the $x$-axis (put $y = 0$), or what $y$ is for a given $x$. In the tank example, the tank holds 1000 litres when $40t + 200 = 1000$, that is after $t = 20$ minutes.

## Common mistakes

:::mistake{title="Reading m before making y the subject"}
In $2y = 6x + 8$ the gradient is not $6$. Divide every term by $2$ first: $y = 3x + 4$, so $m = 3$.
:::

:::mistake{title="Losing the sign of c"}
In $y = 3x - 5$, $c = -5$, so the line crosses the $y$-axis at $(0, -5)$, below the origin. In $y = 7 - 2x$, $c = +7$ and $m = -2$.
:::

:::mistake{title="Confusing the two intercepts"}
$c$ is where the line meets the **$y$-axis**. Where it meets the $x$-axis is found by putting $y = 0$: for $y = -2x + 5$ this is $x = 2.5$.
:::

:::mistake{title="Stopping at m and c"}
"Find the equation" needs a full equation, such as $y = -2x + 5$. Writing only "$m = -2$, $c = 5$" may lose the final mark.
:::

## Exam tips

:::exam-tip
When you find an equation from two points, substitute the **second** point to check. It takes ten seconds and catches most sign errors.
:::

:::exam-tip
Answers must be **fully simplified**: write $y = \frac{1}{2}x + 2$ or $x - 2y = -4$, not $y = \frac{2}{4}x + \frac{4}{2}$. If a form is asked for, such as $ax + by = c$ with integers, give exactly that form.
:::

:::exam-tip
In context questions the variables change: $V = 40t + 200$ is still "$y = mx + c$", with gradient 40 litres per minute and intercept 200 litres. Interpret both numbers in words when asked.
:::

## Summary

:::summary
- In $y = mx + c$, $m$ is the gradient and $(0, c)$ is the $y$-intercept.
- Make $y$ the subject before reading $m$ and $c$ from equations such as $2x + 3y = 12$.
- From a point and a gradient: substitute into $y = mx + c$ and solve for $c$.
- From two points: find $m$ first, then $c$, then check with the other point.
- Give the full, simplified equation in the form asked for.
:::
