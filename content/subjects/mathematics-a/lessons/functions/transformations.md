---
{
  "key": "functions.transformations",
  "title": "Transformations of graphs",
  "summary": "Describe and apply translations, reflections and stretches to graphs: y = f(x) + a, y = f(x + a), y = af(x), y = f(ax) and simple combinations, and (ZIMSEC) relate y = f(x) to y = |f(x)|.",
  "concepts": ["amaths.functions.transformations"],
  "estimatedMinutes": 40,
  "level": "core"
}
---
## Introduction

Once you know the shape of a few basic graphs, transformations let you sketch hundreds more. The graph of $y = 3\sin 2x + 1$ is just the sine curve squashed, stretched and lifted; the graph of $y = (x - 3)^{2} + 2$ is the parabola $y = x^{2}$ moved. Engineers use exactly this idea when they shift and scale a standard wave to model the daily rise and fall of water at a Kariba gauge or the voltage of the ZESA supply.

ZIMSEC Pure Mathematics (Form 5, *Relations*) asks you to illustrate the relationship between $y = f(x)$ and the graphs of $y = |f(x)|$, $y = af(x)$, $y = f(x) + a$, $y = f(x + a)$ and $y = f(ax)$. Cambridge 9709 (Paper 1, topic 1.2) examines the same transformations and simple combinations of two of them, with the precise words **translation**, **reflection** and **stretch**.

## Key definitions

:::definition{term="Translation"}
A slide without turning or resizing, described by a vector $\begin{pmatrix} p \\ q \end{pmatrix}$: $p$ units in the $x$-direction and $q$ units in the $y$-direction.
:::

:::definition{term="Reflection"}
A mirror image in a stated line, here the $x$-axis or the $y$-axis.
:::

:::definition{term="Stretch"}
An enlargement in **one** direction only, described by a scale factor and a direction ("stretch, scale factor 3, parallel to the $y$-axis"). A scale factor less than 1 squashes the graph.
:::

:::formula{name="The basic transformations of y = f(x)"}
| New graph | Transformation | Point $(x, y)$ moves to |
| :--- | :--- | :--- |
| $y = f(x) + a$ | translation $\begin{pmatrix} 0 \\ a \end{pmatrix}$ | $(x, y + a)$ |
| $y = f(x + a)$ | translation $\begin{pmatrix} -a \\ 0 \end{pmatrix}$ | $(x - a, y)$ |
| $y = af(x)$ | stretch, factor $a$, parallel to the $y$-axis | $(x, ay)$ |
| $y = f(ax)$ | stretch, factor $\frac{1}{a}$, parallel to the $x$-axis | $\left(\frac{x}{a}, y\right)$ |
| $y = -f(x)$ | reflection in the $x$-axis | $(x, -y)$ |
| $y = f(-x)$ | reflection in the $y$-axis | $(-x, y)$ |

These are not on Cambridge's MF19 list.
:::

## Outside or inside the bracket

The key idea: changes **outside** the function act on $y$ and do what they look like. Changes **inside** the bracket act on $x$ and do the **opposite** of what they look like.

- $f(x) + 3$ moves the graph **up** 3.
- $f(x + 3)$ moves the graph **left** 3, because the new graph reaches each height 3 units earlier.
- $2f(x)$ doubles every height.
- $f(2x)$ **halves** every horizontal distance from the $y$-axis.

:::worked-solution[Example 1: describe how $y = (x - 3)^{2} + 2$ is obtained from $y = x^{2}$]
1. Write $f(x) = x^{2}$. Then $(x - 3)^{2} + 2 = f(x - 3) + 2$.
2. $f(x - 3)$ is a translation of 3 units in the positive $x$-direction.
3. Adding 2 is a translation of 2 units in the positive $y$-direction.
4. Combined: a translation by the vector $\begin{pmatrix} 3 \\ 2 \end{pmatrix}$. The vertex moves from $(0, 0)$ to $(3, 2)$.
:::

Every completed-square form $a(x + p)^{2} + q$ is, in this language, a stretch of $y = x^{2}$ followed by a translation.

:::worked-solution[Example 2: the point $(4, 6)$ lies on $y = f(x)$. Find its image on (a) $y = 3f(x)$, (b) $y = f(2x)$, (c) $y = f(-x)$]
1. (a) A stretch parallel to the $y$-axis, factor 3, keeps $x$ and multiplies $y$: $(4, 18)$.
2. (b) A stretch parallel to the $x$-axis, factor $\frac{1}{2}$, halves $x$: $(2, 6)$. Check: at $x = 2$, $f(2x) = f(4) = 6$.
3. (c) A reflection in the $y$-axis changes the sign of $x$: $(-4, 6)$.
:::

## Combinations

When two transformations are combined, think about where a typical point goes, step by step.

:::worked-solution[Example 3: the point $(2, 5)$ is on $y = f(x)$. Find its image on $y = 2f(x + 1) - 3$]
1. Inside the bracket: $f(x + 1)$ moves points 1 unit left: $(1, 5)$.
2. Outside: multiplying by 2 doubles $y$: $(1, 10)$.
3. Subtracting 3 moves down 3: $(1, 7)$.
4. Check: at $x = 1$, $2f(1 + 1) - 3 = 2(5) - 3 = 7$.
:::

For the $y$-direction, the order matters: $2f(x) - 3$ (stretch then translate) is different from $2\big(f(x) - 3\big) = 2f(x) - 6$. Follow the order of operations applied to $f(x)$. For the $x$-direction, write the inside in factorised form: $f(2x - 4) = f\big(2(x - 2)\big)$ is a stretch with factor $\frac{1}{2}$ parallel to the $x$-axis followed by a translation of 2 units to the right.

:::worked-solution[Example 4: describe the transformations that map $y = \sin x$ onto $y = 3\sin 2x + 1$, and give the greatest and least values]
1. $\sin 2x$: stretch parallel to the $x$-axis, scale factor $\frac{1}{2}$. The period becomes $180^{\circ}$.
2. $3\sin 2x$: stretch parallel to the $y$-axis, scale factor 3. The values now range from $-3$ to $3$.
3. $3\sin 2x + 1$: translation $\begin{pmatrix} 0 \\ 1 \end{pmatrix}$.
4. Greatest value $3 + 1 = 4$; least value $-3 + 1 = -2$.
:::

## The graph of y = |f(x)| (ZIMSEC)

$|f(x)|$ leaves non-negative values alone and changes the sign of negative ones. So to sketch $y = |f(x)|$: draw $y = f(x)$, then **reflect every part below the $x$-axis in the $x$-axis**. Points on the axis stay where they are, and the graph never goes below the $x$-axis.

:::worked-solution[Example 5: sketch $y = |x^{2} - 4x|$]
1. First $y = x^{2} - 4x = x(x - 4)$: a $\cup$-shaped parabola through $(0, 0)$ and $(4, 0)$, vertex $(2, -4)$.
2. Between $x = 0$ and $x = 4$ the curve is below the axis; reflect that part in the $x$-axis.
3. The vertex $(2, -4)$ becomes a local **maximum** at $(2, 4)$.
4. The graph is W-shaped: it touches the $x$-axis at $(0, 0)$ and $(4, 0)$, where it has sharp corners, and rises steeply for $x < 0$ and $x > 4$.
5. Consequence: $|x^{2} - 4x| = 3$ has four solutions, because the line $y = 3$ lies between $0$ and $4$.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards examine the four basic transformations and reflections, including combinations, for algebraic and trigonometric graphs. Cambridge expects two transformations at a time and the exact words translation, reflection and stretch. The graph of $y = |f(x)|$ for non-linear $f$ is ZIMSEC only.
:::

## Common mistakes

:::mistake{title="Inside the bracket, wrong direction"}
$f(x - 3)$ moves the graph 3 units to the **right**, not left; $f(x + 3)$ moves it left.
:::

:::mistake{title="Stretch factor for f(ax)"}
$y = f(2x)$ is a stretch with scale factor $\frac{1}{2}$ parallel to the $x$-axis, not factor 2.
:::

:::mistake{title="Vague descriptions"}
"Moves up" or "gets bigger" earns no marks. Say "translation by the vector $\begin{pmatrix} 0 \\ 2 \end{pmatrix}$" or "stretch, scale factor 3, parallel to the $y$-axis".
:::

:::mistake{title="Confusing |f(x)| with f(|x|)"}
$|f(x)|$ reflects the negative $y$-values upwards. $f(|x|)$ copies the right half of the graph into the left half. They are different graphs.
:::

## Exam tips

:::exam-tip
Name every transformation fully: the type, then the vector, the mirror line, or the scale factor **and** direction. Each part usually carries a mark.
:::

:::exam-tip
To check a description, track one clear point (a vertex, an intercept or a maximum) through each step and confirm it satisfies the new equation.
:::

:::exam-tip
When a question gives a graph only by its features (for example "a minimum at $(3, -2)$"), answer by moving those features: the transformations act on coordinates.
:::

## Summary

:::summary
- Outside changes act on $y$ as they look: $f(x) + a$ up $a$; $af(x)$ stretch factor $a$ parallel to the $y$-axis.
- Inside changes act on $x$ in reverse: $f(x + a)$ left $a$; $f(ax)$ stretch factor $\frac{1}{a}$ parallel to the $x$-axis.
- $-f(x)$ reflects in the $x$-axis; $f(-x)$ reflects in the $y$-axis.
- For combinations, follow a point step by step and check it in the new equation.
- ZIMSEC: $y = |f(x)|$ reflects the parts of $y = f(x)$ below the $x$-axis upwards.
:::
