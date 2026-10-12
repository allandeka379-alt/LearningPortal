---
{
  "key": "transformations.reflection-rotation-translation",
  "title": "Reflection, rotation and translation",
  "summary": "Draw and describe fully reflections in a line, rotations about a centre and translations by a column vector, find coordinates of images, and (Extended) combine transformations.",
  "concepts": ["math.transformations.reflection-rotation-translation"],
  "objectives": ["zimsec/o-level/mathematics:13.0.1", "cambridge/igcse/mathematics:7.1.1", "cambridge/igcse/mathematics:7.1.2", "cambridge/igcse/mathematics:7.1.4", "cambridge/igcse/mathematics:7.1.5"],
  "estimatedMinutes": 20,
  "freePreview": true,
  "level": "core"
}
---
## Introduction

A floor tiler in Gweru lays one tile, then slides an identical tile along to the next space, flips another over, and turns a third through a quarter turn to make a pattern. Each move is a **transformation**: a rule that moves every point of a shape to a new position.

In this lesson you will work with three transformations that keep a shape exactly the same size and shape: **translation** (a slide), **reflection** (a flip) and **rotation** (a turn). Examiners ask you to draw them on a grid, to give coordinates of images, and to **describe them fully**, which means giving every detail needed to repeat the move.

You should be able to plot coordinates, recognise lines such as $x = 2$, $y = -1$ and $y = x$, and write a column vector.

## Key definitions

:::definition{term="Object and image"}
The original shape is the **object**. The shape after the transformation is the **image**. A point $A$ maps to its image $A'$ (read "$A$ dash").
:::

:::definition{term="Translation"}
A slide in which every point moves the same distance in the same direction, given by a column vector $\begin{pmatrix} x \\ y \end{pmatrix}$: $x$ units to the right (left if negative) and $y$ units up (down if negative).
:::

:::definition{term="Reflection"}
A flip in a mirror line. Each image point is the same perpendicular distance from the mirror line as its object point, on the opposite side.
:::

:::definition{term="Rotation"}
A turn about a fixed point, the **centre of rotation**, through a given angle in a given direction (clockwise or anticlockwise).
:::

:::definition{term="Invariant point"}
A point that is mapped onto itself. Points on a mirror line, and the centre of a rotation, are invariant.
:::

:::keyfact{title="Describing fully"}
- Translation: the word **translation** and the **column vector**.
- Reflection: the word **reflection** and the **equation of the mirror line**.
- Rotation: the word **rotation**, the **centre**, the **angle** and the **direction** (no direction is needed for $180^\circ$).
:::

All three transformations give an image that is **congruent** to the object. A translation and a rotation keep the orientation; a reflection reverses it, like writing seen in a mirror.

:::note{title="What each syllabus examines"}
Cambridge Core questions use vertical or horizontal mirror lines only, and rotations through multiples of $90^\circ$ about the origin, a vertex or the midpoint of an edge of the shape. Mirror lines such as $y = x$ and $y = -x$, rotations about any other centre, and combined transformations are Cambridge Extended. ZIMSEC candidates need all of them.
:::

## Translation

Add the vector to the coordinates. Under the translation $\begin{pmatrix} 3 \\ -5 \end{pmatrix}$ the point $(1, 2)$ maps to $(1 + 3, 2 - 5) = (4, -3)$.

To find the vector of a translation, subtract: from $A(2, 6)$ to $A'(-1, 4)$ the vector is $\begin{pmatrix} -1 - 2 \\ 4 - 6 \end{pmatrix} = \begin{pmatrix} -3 \\ -2 \end{pmatrix}$.

## Reflection

| Mirror line | $(x, y)$ maps to |
| --- | --- |
| $x$-axis ($y = 0$) | $(x, -y)$ |
| $y$-axis ($x = 0$) | $(-x, y)$ |
| $y = x$ | $(y, x)$ |
| $y = -x$ | $(-y, -x)$ |

For a line such as $x = 3$ or $y = -1$, count the perpendicular distance to the line and go the same distance beyond it. To **find** a mirror line, join a point to its image: the mirror line is the perpendicular bisector of that segment, so it passes through the midpoint.

## Rotation

About the origin $O$:

| Rotation about $O$ | $(x, y)$ maps to |
| --- | --- |
| $90^\circ$ anticlockwise | $(-y, x)$ |
| $90^\circ$ clockwise | $(y, -x)$ |
| $180^\circ$ | $(-x, -y)$ |

For any other centre, work with the position of the point **relative to the centre**, rotate that, then add the centre back. Where tracing paper is allowed in the examination (Cambridge papers allow it), it is the quickest check.

To **find** the centre of a rotation, join two points to their images. The perpendicular bisectors of these segments meet at the centre.

## Worked examples

:::worked-solution[Example 1: reflect in $y = x$ and in $x = -1$]
Triangle $ABC$ has vertices $A(2, 1)$, $B(5, 1)$ and $C(5, 3)$.

1. Reflection in $y = x$ swaps the coordinates: $A'(1, 2)$, $B'(1, 5)$, $C'(3, 5)$.
2. For $x = -1$: $A(2, 1)$ is 3 units right of the line, so its image is 3 units left of it: $(-4, 1)$.
3. In the same way $B(5, 1) \to (-7, 1)$ and $C(5, 3) \to (-7, 3)$. The $y$-coordinates do not change for a vertical mirror line.
:::

![Triangle ABC with vertices (2, 1), (5, 1) and (5, 3) reflected in the line y = x to give (1, 2), (1, 5) and (3, 5), and in the line x = −1 to give (−4, 1), (−7, 1) and (−7, 3); each image is the same distance behind the mirror line as the object is in front.](media:diagrams/reflection-y-x-and-x-minus-1.png "Figure: reflecting a triangle in y = x and in x = −1")

:::worked-solution[Example 2: rotate about a centre that is not the origin]
Rotate $P(5, 1)$ through $90^\circ$ anticlockwise about $(2, 1)$.

1. Position of $P$ relative to the centre: $(5 - 2, 1 - 1) = (3, 0)$.
2. Rotate $90^\circ$ anticlockwise: $(x, y) \to (-y, x)$ gives $(0, 3)$.
3. Add the centre back: $P' = (2 + 0, 1 + 3) = (2, 4)$.
4. Check: $P$ was 3 units to the right of the centre and $P'$ is 3 units above it, a quarter turn anticlockwise.
:::

:::worked-solution[Example 3: describe a transformation fully]
Triangle $S$ has vertices $(1, 2)$, $(3, 2)$, $(3, 3)$ and triangle $T$ has vertices $(-2, 1)$, $(-2, 3)$, $(-3, 3)$. Describe fully the single transformation that maps $S$ onto $T$.

1. The triangles are congruent with the same orientation, and the sides have changed direction, so it is a rotation.
2. Test $(x, y) \to (-y, x)$: $(1, 2) \to (-2, 1)$, $(3, 2) \to (-2, 3)$, $(3, 3) \to (-3, 3)$. All three match.
3. Answer: **rotation, $90^\circ$ anticlockwise, about the origin $(0, 0)$**.
:::

![Triangle S with vertices (1, 2), (3, 2) and (3, 3) is mapped onto triangle T with vertices (−2, 1), (−2, 3) and (−3, 3) by a rotation of 90° anticlockwise about the origin; the dashed lines from the origin to (1, 2) and (−2, 1) meet at 90°.](media:diagrams/rotation-90-anticlockwise-origin.png "Figure: S maps onto T by a quarter turn anticlockwise about the origin")

## Combined transformations (Extended)

"$M$ followed by $N$" means do $M$ first, then apply $N$ to the image. The order usually matters.

:::worked-solution[Example 4: two reflections in parallel lines]
Reflect the point $(x, y)$ in $x = 1$ and then reflect the image in $x = 4$.

1. In $x = 1$: $(x, y) \to (2 - x, y)$.
2. In $x = 4$: $(2 - x, y) \to (8 - (2 - x), y) = (x + 6, y)$.
3. The single transformation is a **translation** by $\begin{pmatrix} 6 \\ 0 \end{pmatrix}$, twice the distance between the mirror lines.
:::

Reflections in two **perpendicular** lines combine to a rotation of $180^\circ$ about the point where the lines cross.

## Common mistakes

:::mistake{title="Mixing up x = a and y = a"}
The line $x = 3$ is **vertical** (every point on it has $x$-coordinate 3), and $y = 3$ is horizontal. Sketch the mirror line before reflecting.
:::

:::mistake{title="Incomplete descriptions"}
"Rotation of $90^\circ$" scores little: give the centre and the direction too. "Translation 3 right, 2 down" should be written as the vector $\begin{pmatrix} 3 \\ -2 \end{pmatrix}$.
:::

:::mistake{title="Giving two transformations"}
If the question asks for a **single** transformation, an answer such as "reflection then translation" earns no marks, even if it works.
:::

:::mistake{title="Rotating about the wrong point"}
The rules $(x, y) \to (-y, x)$ and so on only work for rotations about the origin. For another centre, work relative to the centre first.
:::

## Exam tips

:::exam-tip
"**Describe fully**" is worth 2 or 3 marks: typically one mark for the name of the transformation and one for each detail. Always write the name.
:::

:::exam-tip
If you have tracing paper, use it for rotations: trace the shape and the centre, hold the centre with your pencil point and turn the paper. Check one vertex with coordinates as well.
:::

:::exam-tip
After drawing an image, check that it is congruent to the object and that one vertex is exactly where your rule says it should be.
:::

## Summary

:::summary
- Translation: add the column vector; describe it with the vector.
- Reflection: same perpendicular distance on the other side of the mirror line; describe it with the equation of the line.
- Rotation: centre, angle and direction; about $O$, $90^\circ$ anticlockwise sends $(x, y)$ to $(-y, x)$ and $180^\circ$ sends it to $(-x, -y)$.
- All three give congruent images; only reflection reverses orientation.
- Extended: in a combination, do the first transformation first; reflections in parallel lines give a translation.
:::
