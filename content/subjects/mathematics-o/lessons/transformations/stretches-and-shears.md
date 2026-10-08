---
{
  "key": "transformations.stretches-and-shears",
  "title": "Stretches and shears",
  "summary": "Carry out and describe one-way and two-way stretches and shears with an axis as the invariant line, find stretch and shear factors, and work out their effect on area.",
  "concepts": ["math.transformations.stretch-and-shear"],
  "objectives": ["zimsec/o-level/mathematics:13.0.2"],
  "estimatedMinutes": 19,
  "level": "core"
}
---
## Introduction

Push the top of a neat stack of exercise books sideways. The bottom book stays where it is, each book above slides a little further than the one below it, and the stack leans over. The stack is the same height and holds the same books, but its shape has changed. This is a **shear**.

Now imagine pulling a rubber sheet away from a fixed edge so that it gets wider but not taller. That is a **stretch**.

Stretches and shears are part of the ZIMSEC O-Level transformation topic (they are not in the Cambridge IGCSE syllabus). Unlike reflections, rotations and translations, they change the shape of a figure. Each one has an **invariant line**, a line of points that do not move. At this level the invariant line is always one of the axes.

You should be able to plot coordinates and find the area of rectangles, triangles and parallelograms.

## Key definitions

:::definition{term="Invariant line"}
A line on which every point is mapped onto itself: none of its points move.
:::

:::definition{term="One-way stretch"}
Every point moves at right angles to the invariant line so that its distance from that line is multiplied by the **stretch factor** $k$. Points on the invariant line do not move.
:::

:::definition{term="Two-way stretch"}
A stretch with factor $a$ parallel to the $x$-axis combined with a stretch with factor $b$ parallel to the $y$-axis.
:::

:::definition{term="Shear"}
Every point moves **parallel** to the invariant line, through a distance proportional to its distance from that line. Points on opposite sides of the invariant line move in opposite directions.
:::

:::formula{name="Shear factor"}
$$
\text{shear factor} = \frac{\text{distance a point moves}}{\text{its distance from the invariant line}}
$$
:::

## Stretches

There are two one-way stretches with an axis invariant:

| Description | Invariant line | $(x, y)$ maps to | Area is multiplied by |
| --- | --- | --- | --- |
| Stretch parallel to the $x$-axis, factor $k$ | the $y$-axis | $(kx, y)$ | $k$ |
| Stretch parallel to the $y$-axis, factor $k$ | the $x$-axis | $(x, ky)$ | $k$ |
| Two-way stretch, factors $a$ and $b$ | (only the origin is fixed) | $(ax, by)$ | $ab$ |

Read the first row carefully: a stretch **parallel to** the $x$-axis pulls points sideways, away from the $y$-axis, so it is the $y$-axis that stays fixed.

A stretch changes area because it changes one dimension only. If a rectangle is stretched with factor 3 parallel to its width, its width trebles but its height does not, so its area trebles.

:::worked-solution[Example 1: a stretch with the $y$-axis invariant]
Square $S$ has vertices $(1, 1)$, $(2, 1)$, $(2, 2)$ and $(1, 2)$. It is stretched with factor 3, with the $y$-axis invariant.

1. Rule: $(x, y) \to (3x, y)$.
2. Images: $(3, 1)$, $(6, 1)$, $(6, 2)$, $(3, 2)$.
3. The image is a rectangle 3 units wide and 1 unit tall.
4. Area: $1 \to 3$ square units, multiplied by the stretch factor 3.
:::

:::worked-solution[Example 2: a two-way stretch]
Stretch the point $(4, -2)$ with factor 2 parallel to the $x$-axis and factor 3 parallel to the $y$-axis.

1. Rule: $(x, y) \to (2x, 3y)$.
2. Image: $(8, -6)$.
3. Every area is multiplied by $2 \times 3 = 6$.
:::

If the two factors of a two-way stretch are equal, it is simply an enlargement with centre the origin.

## Shears

| Description | $(x, y)$ maps to |
| --- | --- |
| Shear with the $x$-axis invariant, factor $k$ | $(x + ky, y)$ |
| Shear with the $y$-axis invariant, factor $k$ | $(x, y + kx)$ |

With the $x$-axis invariant, every point moves horizontally. A point 2 units above the axis moves $2k$ units; a point 2 units below it moves $2k$ units the other way.

:::worked-solution[Example 3: shearing a rectangle]
Rectangle $OABC$ has vertices $O(0, 0)$, $A(3, 0)$, $B(3, 2)$ and $C(0, 2)$. It is sheared with the $x$-axis invariant and shear factor 2.

1. Rule: $(x, y) \to (x + 2y, y)$.
2. $O$ and $A$ are on the $x$-axis, so they do not move.
3. $B(3, 2) \to (3 + 4, 2) = (7, 2)$ and $C(0, 2) \to (0 + 4, 2) = (4, 2)$.
4. The image is a parallelogram with base $OA = 3$ and height 2, so its area is $3 \times 2 = 6$: the same as the rectangle.
:::

:::keyfact{title="A shear does not change area"}
A shear keeps the base on the invariant line and keeps the height, so the area of the image always equals the area of the object.
:::

:::worked-solution[Example 4: find the shear factor]
A shear with the $x$-axis invariant maps $(1, 3)$ onto $(7, 3)$. Find the shear factor.

1. The point moved $7 - 1 = 6$ units, parallel to the $x$-axis.
2. Its distance from the invariant line is 3 units.
3. Shear factor $= \dfrac{6}{3} = 2$.
:::

In the next lesson you will see that each of these transformations has a $2 \times 2$ matrix: for example the stretch $(x, y) \to (kx, y)$ has matrix $\begin{pmatrix} k & 0 \\ 0 & 1 \end{pmatrix}$ and the shear $(x, y) \to (x + ky, y)$ has matrix $\begin{pmatrix} 1 & k \\ 0 & 1 \end{pmatrix}$.

## Common mistakes

:::mistake{title="Confusing the direction with the invariant line"}
"Stretch parallel to the $x$-axis" has the **$y$-axis** invariant. Decide which way the points move, then the invariant line is the axis at right angles to that direction.
:::

:::mistake{title="Using the distance moved as the shear factor"}
The shear factor is the distance moved **divided by** the distance from the invariant line. A point 4 units from the line that moves 8 units gives factor 2, not 8.
:::

:::mistake{title="Moving points the wrong way in a shear"}
In a shear, points move **parallel** to the invariant line, never towards or away from it. Points on opposite sides move in opposite directions.
:::

:::mistake{title="Thinking a shear changes the area"}
A shear changes the shape (a rectangle becomes a parallelogram) but never the area. A one-way stretch multiplies the area by the stretch factor.
:::

## Exam tips

:::exam-tip
To describe a stretch fully, give the word **stretch**, the **stretch factor** and the **invariant line** (or the direction). To describe a shear fully, give the word **shear**, the **shear factor** and the **invariant line**.
:::

:::exam-tip
Start with a vertex on the invariant line: it does not move, which gives you a fixed point to build the image from. Then do one vertex at a time.
:::

:::exam-tip
When asked for the area of an image, use the area rule (unchanged for a shear, $\times k$ for a stretch) and check it with a direct calculation if the shape is simple.
:::

## Summary

:::summary
- A stretch multiplies distances from the invariant line by the stretch factor $k$: $(kx, y)$ with the $y$-axis invariant, $(x, ky)$ with the $x$-axis invariant.
- A one-way stretch multiplies area by $k$; a two-way stretch $(ax, by)$ multiplies area by $ab$.
- A shear moves points parallel to the invariant line: $(x + ky, y)$ with the $x$-axis invariant, $(x, y + kx)$ with the $y$-axis invariant.
- Shear factor = distance moved ÷ distance from the invariant line; a shear keeps area unchanged.
- Points on the invariant line never move.
:::
