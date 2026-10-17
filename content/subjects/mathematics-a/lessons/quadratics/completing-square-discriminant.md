---
{
  "key": "quadratics.completing-square-discriminant",
  "title": "Completing the square and the discriminant",
  "summary": "Write a quadratic in completed-square form to find its vertex, line of symmetry, greatest or least value and range, and use the discriminant to decide how many real roots an equation has and whether a line meets a curve.",
  "concepts": ["amaths.quadratics.completing-square-discriminant"],
  "estimatedMinutes": 40,
  "freePreview": true,
  "level": "core"
}
---
## Introduction

Quadratics are the first topic of both A-Level courses, and they never go away. Completing the square tells you the **turning point** of a parabola without any calculus, which is how you find the greatest height of a ball, the least cost of a production run, or the range of a function. The **discriminant** tells you, before solving anything, whether an equation has two, one or no real roots, and whether a straight line cuts, touches or misses a curve.

ZIMSEC Pure Mathematics examines these ideas in Form 5 (polynomials, and identities, equations and inequalities). Cambridge 9709 examines them in Paper 1, topic 1.1. You should already be able to factorise quadratics and use the quadratic formula.

## Key definitions

:::definition{term="Completed-square form"}
$ax^{2} + bx + c$ written as $a(x + p)^{2} + q$, where
$$
p = \frac{b}{2a}, \qquad q = c - \frac{b^{2}}{4a}
$$
:::

:::definition{term="Vertex (turning point)"}
The point $(-p, q)$ of the graph $y = a(x + p)^{2} + q$. It is a **minimum** if $a > 0$ and a **maximum** if $a < 0$. The **line of symmetry** is $x = -p$.
:::

:::formula{name="The discriminant"}
For $ax^{2} + bx + c = 0$, the discriminant is $b^{2} - 4ac$:

- $b^{2} - 4ac > 0$: two distinct real roots;
- $b^{2} - 4ac = 0$: one repeated real root (equal roots);
- $b^{2} - 4ac < 0$: no real roots.

Cambridge's MF19 gives the quadratic formula but not these conditions.
:::

## Completing the square

For $a = 1$: halve the coefficient of $x$, square the bracket, and subtract what you added. $x^{2} + 6x + 1 = (x + 3)^{2} - 9 + 1 = (x + 3)^{2} - 8$.

For $a \neq 1$: take $a$ out of the $x^{2}$ and $x$ terms first.

:::worked-solution[Example 1: express $2x^{2} - 12x + 7$ in the form $a(x + p)^{2} + q$ and state the vertex]
1. Factor 2 from the first two terms: $2(x^{2} - 6x) + 7$.
2. Complete the square inside: $x^{2} - 6x = (x - 3)^{2} - 9$.
3. So $2\left[(x - 3)^{2} - 9\right] + 7 = 2(x - 3)^{2} - 18 + 7 = 2(x - 3)^{2} - 11$.
4. The vertex is $(3, -11)$, a minimum since $a = 2 > 0$; the line of symmetry is $x = 3$.
5. The least value of $2x^{2} - 12x + 7$ is $-11$, so for all real $x$ the range is $f(x) \geq -11$.
:::

![Graph of y = 2x² - 12x + 7 = 2(x - 3)² - 11: a U-shaped parabola with minimum (vertex) at (3, -11), line of symmetry x = 3, y-intercept 7 and x-intercepts 0.65 and 5.35.](media:diagrams/completed-square-vertex-parabola.png "Figure: completing the square gives the vertex (3, −11) and the line of symmetry x = 3")

When $a$ is negative, take out $-1$ (or $-a$) carefully. Many students prefer to write the answer as $q - (x - h)^{2}$.

:::worked-solution[Example 2: find the greatest value of $5 + 4x - x^{2}$]
1. Write $-x^{2} + 4x + 5 = -(x^{2} - 4x) + 5$.
2. $x^{2} - 4x = (x - 2)^{2} - 4$, so the expression is $-(x - 2)^{2} + 4 + 5 = 9 - (x - 2)^{2}$.
3. $(x - 2)^{2} \geq 0$, so the expression is at most $9$, reached when $x = 2$.
4. Greatest value $9$, at the maximum point $(2, 9)$.
:::

### Sketching a quadratic

A good sketch shows the shape ($\cup$ for $a > 0$, $\cap$ for $a < 0$), the vertex from the completed square, the $y$-intercept $(0, c)$, and the $x$-intercepts if there are any. For $y = 9 - (x - 2)^{2}$ the roots come from $(x - 2)^{2} = 9$, so $x = -1$ and $x = 5$; the $y$-intercept is $(0, 5)$.

## The discriminant

The quadratic formula $x = \dfrac{-b \pm \sqrt{b^{2} - 4ac}}{2a}$ shows why the discriminant matters: you can only take the square root of a non-negative number. Geometrically, the discriminant tells you how many times the graph $y = ax^{2} + bx + c$ meets the $x$-axis.

A typical question gives an equation containing a constant $k$ and asks for the values of $k$ that give a certain number of roots. Set up the condition on $b^{2} - 4ac$ and solve it for $k$.

:::worked-solution[Example 3: find the values of $k$ for which $kx^{2} + 4x + (k - 3) = 0$ has equal roots]
1. Here $a = k$, $b = 4$, $c = k - 3$.
2. Equal roots: $b^{2} - 4ac = 0$, so $16 - 4k(k - 3) = 0$.
3. Divide by $-4$: $k^{2} - 3k - 4 = 0$, so $(k - 4)(k + 1) = 0$.
4. $k = 4$ or $k = -1$.
5. Check $k = 4$: $4x^{2} + 4x + 1 = (2x + 1)^{2}$, a repeated root $x = -\frac{1}{2}$.
:::

### A line and a curve

To find where the line $y = mx + k$ meets a curve $y = f(x)$, substitute to get a quadratic equation in $x$. Then

- two distinct roots: the line **cuts** the curve at two points;
- equal roots: the line is a **tangent** (it touches the curve);
- no real roots: the line **misses** the curve.

:::worked-solution[Example 4: the line $y = x + k$ and the curve $y = x^{2} - 3x + 6$]
1. At intersections: $x^{2} - 3x + 6 = x + k$, so $x^{2} - 4x + (6 - k) = 0$.
2. Discriminant: $16 - 4(6 - k) = 4k - 8$.
3. Tangent when $4k - 8 = 0$: $k = 2$. Then $x^{2} - 4x + 4 = 0$ gives $x = 2$, so the point of contact is $(2, 4)$.
4. Two points when $4k - 8 > 0$: $k > 2$. No intersection when $k < 2$.
:::

![The curve y = x² - 3x + 6 with three lines y = x + k: k = 4 cuts it at two points (discriminant 8 > 0), k = 2 touches it at (2, 4) (discriminant 0, tangent), and k = 0 misses it (discriminant -8 < 0).](media:diagrams/line-and-parabola-discriminant.png "Figure: the sign of the discriminant 4k − 8 decides whether the line cuts, touches or misses the curve")

:::worked-solution[Example 5: show that $x^{2} + kx + (k - 1) = 0$ has real roots for all values of $k$]
1. $b^{2} - 4ac = k^{2} - 4(k - 1) = k^{2} - 4k + 4$.
2. Complete the square: $k^{2} - 4k + 4 = (k - 2)^{2}$.
3. A square is never negative, so $b^{2} - 4ac \geq 0$ for all $k$.
4. Hence the roots are real for every $k$ (and equal only when $k = 2$).
:::

Example 5 shows the two ideas working together: to prove a discriminant is never negative, complete the square on it.

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards examine completing the square and the discriminant, including the line-and-curve problems. Cambridge Paper 1 often combines them with functions (range of a function, existence of an inverse), which you meet in the functions lessons.
:::

## Common mistakes

:::mistake{title="Forgetting to multiply back by a"}
$2(x^{2} - 6x) + 7 = 2\left[(x - 3)^{2} - 9\right] + 7$. The $-9$ is inside the bracket, so it becomes $-18$, not $-9$.
:::

:::mistake{title="Sign of the vertex"}
$y = 2(x - 3)^{2} - 11$ has its vertex at $x = +3$, not $-3$.
:::

:::mistake{title="Using 'real roots' as 'two distinct roots'"}
"Real roots" includes equal roots, so the condition is $b^{2} - 4ac \geq 0$. "Two distinct real roots" needs $b^{2} - 4ac > 0$.
:::

:::mistake{title="Wrong set of values from a quadratic inequality in k"}
$k^{2} - 3k - 4 > 0$ holds **outside** the roots: $k < -1$ or $k > 4$. Sketch the parabola in $k$ before writing the answer.
:::

## Exam tips

:::exam-tip
When the question says "express in the form $a(x + p)^{2} + q$", give the values of $a$, $p$ and $q$ clearly. Later parts usually say "hence", expecting the vertex or range from this form.
:::

:::exam-tip
"Find the set of values of $k$" needs an inequality answer such as $k < -1$ or $k > 4$; a single value loses marks.
:::

:::exam-tip
For a tangent, also find the point of contact if asked: solve the equation with the repeated root.
:::

## Summary

:::summary
- $ax^{2} + bx + c = a(x + p)^{2} + q$ with $p = \frac{b}{2a}$, $q = c - \frac{b^{2}}{4a}$.
- The vertex is $(-p, q)$: minimum if $a > 0$, maximum if $a < 0$; the range follows from $q$.
- $b^{2} - 4ac > 0$, $= 0$, $< 0$: two, one repeated, no real roots.
- A line meets a curve where a quadratic holds; its discriminant decides cut, touch or miss.
- To show a discriminant is never negative, complete the square on it.
:::
