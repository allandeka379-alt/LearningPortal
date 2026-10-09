---
{
  "key": "quadratics.completing-square",
  "title": "Completing the square, maximum and minimum values",
  "summary": "Write ax² + bx + c in the form a(x + p)² + q, read off the vertex, the line of symmetry and the maximum or minimum value, sketch the graph with its intercepts, and find the range of a quadratic function over a given domain.",
  "concepts": ["amath.quadratics.completing-square"],
  "estimatedMinutes": 35,
  "level": "core"
}
---
## Introduction

A borehole pump in Masvingo costs less to run per litre at some speeds than at others; a farmer near Chinhoyi wants the fence layout that encloses the largest area; a stone thrown over Lake Kariba rises to a greatest height and falls. Each of these is a quadratic with a **largest or smallest value**, and completing the square finds it without calculus.

Completing the square is one of the most useful techniques in this course. It gives you, from a single line of algebra:

- the **vertex** (turning point) of the parabola $y = ax^2 + bx + c$;
- its **line of symmetry**;
- its **maximum or minimum value**, and so the **range** of a quadratic function;
- a quick way to solve the equation $ax^2 + bx + c = 0$ exactly.

You should already be able to expand brackets such as $(x - 3)^2$ and solve quadratic equations.

## Key definitions

:::definition{term="Completed-square form"}
The form $a(x + p)^2 + q$ of a quadratic expression $ax^2 + bx + c$, where $a$, $p$ and $q$ are constants.
:::

:::definition{term="Vertex (turning point)"}
The lowest point of a U-shaped parabola ($a > 0$) or the highest point of an upside-down one ($a < 0$). For $y = a(x + p)^2 + q$ the vertex is $(-p,\ q)$.
:::

:::definition{term="Line of symmetry"}
The vertical line through the vertex, $x = -p$. The parabola is a mirror image on either side of it.
:::

:::formula{name="Completing the square (not in the List of formulas)"}
$$
x^2 + bx = \left(x + \frac{b}{2}\right)^2 - \left(\frac{b}{2}\right)^2
$$
:::

## Completing the square when $a = 1$

Halve the coefficient of $x$ to get the number in the bracket, then subtract its square to cancel the extra constant.

:::worked-solution[Example 1: write $x^2 - 10x + 7$ in the form $(x + p)^2 + q$ and state the minimum point of $y = x^2 - 10x + 7$]
1. Half of $-10$ is $-5$, and $(x - 5)^2 = x^2 - 10x + 25$.
2. So $x^2 - 10x = (x - 5)^2 - 25$.
3. $x^2 - 10x + 7 = (x - 5)^2 - 25 + 7 = (x - 5)^2 - 18$, so $p = -5$ and $q = -18$.
4. $(x - 5)^2 \geq 0$, with equality when $x = 5$, so the least value of $y$ is $-18$.
5. Minimum point $(5, -18)$; line of symmetry $x = 5$.
:::

## Completing the square when $a \neq 1$

Take $a$ out as a factor of the $x^2$ and $x$ terms only, complete the square inside the bracket, then multiply back.

:::worked-solution[Example 2: express $3x^2 + 12x - 5$ in the form $a(x + p)^2 + q$]
1. $3x^2 + 12x - 5 = 3(x^2 + 4x) - 5$.
2. Inside the bracket: $x^2 + 4x = (x + 2)^2 - 4$.
3. $3\left[(x + 2)^2 - 4\right] - 5 = 3(x + 2)^2 - 12 - 5$.
4. Answer: $3(x + 2)^2 - 17$. So $a = 3$, $p = 2$, $q = -17$, and the minimum value of $3x^2 + 12x - 5$ is $-17$, when $x = -2$.
:::

When $a$ is negative the parabola is upside down and the vertex is a **maximum**. Questions often ask for the form $q - a(x + p)^2$, which makes the maximum obvious.

:::worked-solution[Example 3: write $7 + 8x - 2x^2$ in the form $q - a(x + p)^2$ and find its maximum value]
1. Take out $-2$ from the $x$ terms: $-2x^2 + 8x = -2(x^2 - 4x)$.
2. $x^2 - 4x = (x - 2)^2 - 4$, so $-2(x^2 - 4x) = -2(x - 2)^2 + 8$.
3. $7 + 8x - 2x^2 = 7 + 8 - 2(x - 2)^2 = 15 - 2(x - 2)^2$.
4. $2(x - 2)^2 \geq 0$, so the expression is at most $15$, reached when $x = 2$.
5. Maximum value $15$; maximum point $(2, 15)$.
:::

:::keyfact{title="Reading the completed square"}
For $y = a(x + p)^2 + q$: vertex $(-p,\ q)$; line of symmetry $x = -p$; if $a > 0$ the minimum value is $q$; if $a < 0$ the maximum value is $q$. Watch the sign: $(x - 5)^2$ means $p = -5$, so the vertex has $x = 5$.
:::

## Sketching a quadratic graph

A sketch is a clear diagram, not an accurate plot, but it must show the key features with their coordinates. In this course the graphs are described in words and tables; in the exam you draw them. For $y = ax^2 + bx + c$ find:

1. the shape: U-shaped if $a > 0$, upside-down if $a < 0$;
2. the $y$-intercept $(0, c)$;
3. the $x$-intercepts, by solving $ax^2 + bx + c = 0$ (if there are any);
4. the vertex, from the completed square.

:::worked-solution[Example 4: describe the sketch of $y = 2x^2 - 4x - 6$]
1. $a = 2 > 0$, so the graph is U-shaped.
2. $y$-intercept: $(0, -6)$.
3. $x$-intercepts: $2x^2 - 4x - 6 = 2(x^2 - 2x - 3) = 2(x + 1)(x - 3) = 0$, so $(-1, 0)$ and $(3, 0)$.
4. Completed square: $2(x^2 - 2x) - 6 = 2(x - 1)^2 - 2 - 6 = 2(x - 1)^2 - 8$, so the vertex is the minimum point $(1, -8)$.
5. The sketch is a U-shaped curve crossing the $x$-axis at $-1$ and $3$, crossing the $y$-axis at $-6$, lowest at $(1, -8)$, symmetrical about $x = 1$.
:::

A table of values confirms the symmetry about $x = 1$:

| $x$ | -2 | -1 | 0 | 1 | 2 | 3 | 4 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| $y$ | 10 | 0 | -6 | -8 | -6 | 0 | 10 |

## Range of a quadratic function

The **range** is the set of output values. For $f(x) = a(x + p)^2 + q$ defined for all real $x$:

- if $a > 0$, the range is $f(x) \geq q$;
- if $a < 0$, the range is $f(x) \leq q$.

When the domain is restricted to an interval, check whether the vertex lies inside it, then compare the values at the ends of the interval.

:::worked-solution[Example 5: find the range of $f(x) = x^2 - 4x + 1$ for $0 \leq x \leq 5$]
1. Complete the square: $f(x) = (x - 2)^2 - 3$, so the minimum point is $(2, -3)$.
2. $x = 2$ lies in the domain $0 \leq x \leq 5$, so the least value of $f$ is $-3$.
3. Ends of the domain: $f(0) = 1$ and $f(5) = 25 - 20 + 1 = 6$. The greatest value is the larger, $6$.
4. Range: $-3 \leq f(x) \leq 6$.
:::

Notice that the range is **not** simply $f(0) \leq f(x) \leq f(5)$: the vertex gives a lower value than either end.

## A quadratic is a two-to-one mapping

Because the parabola is symmetrical, two different inputs give the same output: for $f(x) = (x - 2)^2 - 3$, $f(0) = f(4) = 1$. ZIMSEC calls this a **two-to-one mapping**; Cambridge calls it a **many-one function**. This is why a quadratic over all real numbers has no inverse unless its domain is restricted to one side of the vertex, an idea used in the lesson on inverse functions.

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards ask for the completed-square form and the maximum or minimum. You may also find a turning point by differentiation (set $\frac{dy}{dx} = 0$, see the lesson on stationary points), but when a question says "by completing the square" or "hence", use the completed square.
:::

## Common mistakes

:::mistake{title="Wrong sign for the vertex"}
$y = (x + 3)^2 - 4$ has its vertex at $(-3, -4)$, not $(3, -4)$. The $x$-coordinate makes the bracket zero.
:::

:::mistake{title="Forgetting to multiply back by a"}
$2(x^2 - 6x) + 1 = 2\left[(x - 3)^2 - 9\right] + 1 = 2(x - 3)^2 - 17$. Writing $2(x - 3)^2 - 9 + 1$ forgets that the $-9$ is also multiplied by 2.
:::

:::mistake{title="Using only the end points for the range"}
The vertex may give the maximum or minimum. Always check whether the vertex is inside the domain.
:::

:::mistake{title="Confusing the minimum value with where it occurs"}
For $(x - 5)^2 - 18$ the minimum **value** is $-18$; it occurs **at** $x = 5$. Read the question carefully.
:::

## Exam tips

:::exam-tip
"Express in the form $a(x + p)^2 + q$" usually earns one mark for each constant, so state $a$, $p$ and $q$ clearly at the end. Check by expanding your answer.
:::

:::exam-tip
"Hence state the minimum value" means read it from your completed square. Give both coordinates when asked for a point.
:::

:::exam-tip
When sketching, label every intercept and the vertex with coordinates, and draw the curve symmetrical. Write ranges with the correct inequality signs and use $f(x)$ (or $y$), not $x$.
:::

## Summary

:::summary
- $x^2 + bx = \left(x + \frac{b}{2}\right)^2 - \left(\frac{b}{2}\right)^2$; for $a \neq 1$ factor out $a$ from the $x^2$ and $x$ terms first.
- $y = a(x + p)^2 + q$ has vertex $(-p, q)$ and line of symmetry $x = -p$.
- $a > 0$: minimum value $q$; $a < 0$: maximum value $q$.
- Sketches show the shape, both intercepts and the vertex with coordinates.
- For a restricted domain, the range uses the vertex (if inside) and the end values.
- A quadratic is a two-to-one (many-one) mapping.
:::
