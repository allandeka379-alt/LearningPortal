---
{
  "key": "matrices.transformations",
  "title": "Matrices and transformations of the plane",
  "summary": "Represent enlargements, rotations, reflections, stretches and shears by 2 × 2 matrices, find a matrix from the images of the unit vectors, find images of points, lines and shapes, combine transformations, use inverse transformations and relate area scale factor to the determinant.",
  "concepts": ["amaths.matrices.transformations"],
  "estimatedMinutes": 50,
  "level": "core"
}
---
## Introduction

Every time a phone rotates a photo, or a design program stretches a logo for a Harare billboard, a $2 \times 2$ matrix is at work. A **linear transformation** of the plane moves each point $(x, y)$ to a new point $(x', y')$ by a rule of the form $x' = ax + by$, $y' = cx + dy$, which is exactly multiplication by the matrix $\begin{pmatrix} a & b \\ c & d \end{pmatrix}$. Combining transformations becomes multiplying matrices, and undoing them becomes finding inverses.

Transformations by matrices are in the ZIMSEC Pure Mathematics syllabus (Form 6, topic 6.1.6), which also asks you to derive the link between area and the determinant. They are not in Cambridge 9709.

## Key definitions

:::definition{term="Image under a matrix"}
The image of the point $(x, y)$ under $\mathbf{M} = \begin{pmatrix} a & b \\ c & d \end{pmatrix}$ is $\mathbf{M}\begin{pmatrix} x \\ y \end{pmatrix} = \begin{pmatrix} ax + by \\ cx + dy \end{pmatrix}$. The origin is always mapped to itself.
:::

:::definition{term="The columns are the images of the unit vectors"}
$\mathbf{M}\begin{pmatrix} 1 \\ 0 \end{pmatrix} = \begin{pmatrix} a \\ c \end{pmatrix}$ and $\mathbf{M}\begin{pmatrix} 0 \\ 1 \end{pmatrix} = \begin{pmatrix} b \\ d \end{pmatrix}$. To find a matrix, find where $\mathbf{i}$ and $\mathbf{j}$ go and write them as the columns.
:::

:::formula{name="Standard matrices"}
$$
\text{Rotation } \theta \text{ about } O: \begin{pmatrix} \cos\theta & -\sin\theta \\ \sin\theta & \cos\theta \end{pmatrix} \qquad \text{Reflection in } y = x\tan\alpha: \begin{pmatrix} \cos 2\alpha & \sin 2\alpha \\ \sin 2\alpha & -\cos 2\alpha \end{pmatrix}
$$
$$
\text{Enlargement, factor } k: \begin{pmatrix} k & 0 \\ 0 & k \end{pmatrix} \quad \text{Stretch } \parallel x\text{-axis, factor } k: \begin{pmatrix} k & 0 \\ 0 & 1 \end{pmatrix} \quad \text{Shear, } x\text{-axis fixed}: \begin{pmatrix} 1 & k \\ 0 & 1 \end{pmatrix}
$$
:::

Rotations are anticlockwise for positive $\theta$. A stretch parallel to the $y$-axis is $\begin{pmatrix} 1 & 0 \\ 0 & k \end{pmatrix}$, and a shear with the $y$-axis fixed is $\begin{pmatrix} 1 & 0 \\ k & 1 \end{pmatrix}$. ZIMSEC does not print a formula list, so derive these from the unit vectors rather than memorising them blindly.

## Finding a matrix from the unit vectors

:::worked-solution[Example 1: find the matrices for (a) a rotation of 90° anticlockwise about $O$, (b) a reflection in the line $y = x$, (c) a reflection in the line $y = \frac{1}{\sqrt{3}}x$]
1. (a) $\mathbf{i} = (1, 0)$ rotates to $(0, 1)$ and $\mathbf{j} = (0, 1)$ rotates to $(-1, 0)$. So $\mathbf{R} = \begin{pmatrix} 0 & -1 \\ 1 & 0 \end{pmatrix}$.
2. (b) Reflecting in $y = x$ swaps coordinates: $\mathbf{i} \to (0, 1)$, $\mathbf{j} \to (1, 0)$. So $\begin{pmatrix} 0 & 1 \\ 1 & 0 \end{pmatrix}$.
3. (c) The line makes $\alpha = 30^\circ$ with the $x$-axis, so $2\alpha = 60^\circ$: the matrix is $\begin{pmatrix} \cos 60^\circ & \sin 60^\circ \\ \sin 60^\circ & -\cos 60^\circ \end{pmatrix} = \begin{pmatrix} \frac{1}{2} & \frac{\sqrt{3}}{2} \\ \frac{\sqrt{3}}{2} & -\frac{1}{2} \end{pmatrix}$.
:::

## Images of points, lines and shapes

To transform a shape, put the coordinates of its vertices as the columns of one matrix and multiply once.

:::worked-solution[Example 2: the triangle with vertices $(1, 0)$, $(3, 0)$, $(1, 2)$ is transformed by the shear $\mathbf{S} = \begin{pmatrix} 1 & 2 \\ 0 & 1 \end{pmatrix}$. Find the image and compare the areas]
1. $\mathbf{S}\begin{pmatrix} 1 & 3 & 1 \\ 0 & 0 & 2 \end{pmatrix} = \begin{pmatrix} 1 & 3 & 5 \\ 0 & 0 & 2 \end{pmatrix}$.
2. The image has vertices $(1, 0)$, $(3, 0)$, $(5, 2)$: points on the $x$-axis do not move, and the top vertex slides 4 units parallel to the axis.
3. Both triangles have base 2 and height 2, so both have area 2: a shear preserves area ($\det\mathbf{S} = 1$).
:::

![A shear with matrix (1 2; 0 1) maps the triangle (1, 0), (3, 0), (1, 2) to (1, 0), (3, 0), (5, 2): points on the x-axis stay fixed, the top vertex slides 4 units parallel to the axis, and both triangles have base 2 and height 2, so the area (2) is unchanged because the determinant is 1.](media:diagrams/shear-triangle-before-after.png "Figure: a shear keeps the base fixed and slides the top vertex, so the area does not change")

For the image of a line, write a general point of the line in terms of one parameter (or of $x$), transform it, and eliminate. For example, under $\begin{pmatrix} 2 & 0 \\ 0 & 3 \end{pmatrix}$ the point $(x, x + 1)$ of the line $y = x + 1$ goes to $(X, Y) = (2x, 3x + 3)$; with $x = \frac{X}{2}$ this gives $Y = \frac{3}{2}X + 3$.

## Combining transformations

The matrix $\mathbf{AB}$ represents "**first** $\mathbf{B}$, **then** $\mathbf{A}$", because $\mathbf{AB}\mathbf{v} = \mathbf{A}(\mathbf{B}\mathbf{v})$: the matrix nearest the vector acts first. Similarly $\mathbf{A}^n$ means applying $\mathbf{A}$ $n$ times.

:::worked-solution[Example 3: find the single transformation equivalent to a reflection in the $x$-axis followed by a rotation of 90° anticlockwise about $O$]
1. Reflection in the $x$-axis: $\mathbf{M} = \begin{pmatrix} 1 & 0 \\ 0 & -1 \end{pmatrix}$. Rotation: $\mathbf{R} = \begin{pmatrix} 0 & -1 \\ 1 & 0 \end{pmatrix}$.
2. Reflection first, so the combined matrix is $\mathbf{RM} = \begin{pmatrix} 0 & -1 \\ 1 & 0 \end{pmatrix}\begin{pmatrix} 1 & 0 \\ 0 & -1 \end{pmatrix} = \begin{pmatrix} 0 & 1 \\ 1 & 0 \end{pmatrix}$.
3. This is a reflection in the line $y = x$.
4. In the other order, $\mathbf{MR} = \begin{pmatrix} 0 & -1 \\ -1 & 0 \end{pmatrix}$, a reflection in $y = -x$: order matters.
:::

Powers have neat geometric meanings: if $\mathbf{R}$ is a rotation of $60^\circ$, then $\mathbf{R}^6$ is a rotation of $360^\circ$, so $\mathbf{R}^6 = \mathbf{I}$. A reflection $\mathbf{M}$ satisfies $\mathbf{M}^2 = \mathbf{I}$.

## Inverse transformations

The inverse matrix $\mathbf{A}^{-1}$ represents the transformation that undoes $\mathbf{A}$. Use it to find the **object** when the **image** is known: if $\mathbf{A}\mathbf{v} = \mathbf{w}$ then $\mathbf{v} = \mathbf{A}^{-1}\mathbf{w}$. Geometrically, the inverse of a rotation through $\theta$ is a rotation through $-\theta$, and a reflection is its own inverse. A singular matrix ($\det = 0$) squashes the plane onto a line and cannot be undone.

## Area scale factor

Under $\mathbf{A} = \begin{pmatrix} a & b \\ c & d \end{pmatrix}$, the unit square (area 1) with sides $\mathbf{i}$ and $\mathbf{j}$ maps to the parallelogram with sides $\begin{pmatrix} a \\ c \end{pmatrix}$ and $\begin{pmatrix} b \\ d \end{pmatrix}$. Enclose it in the rectangle of width $a + b$ and height $c + d$ (for positive entries) and subtract the corner triangles and rectangles: the area is $(a + b)(c + d) - ac - bd - 2bc = ad - bc$. Every shape can be filled with tiny squares, so **every** area is multiplied by the same factor:

$$
\text{area of image} = |\det\mathbf{A}| \times \text{area of object}
$$

A negative determinant means the orientation is reversed (as in a reflection).

:::worked-solution[Example 4: a field plan of area 6 cm² is transformed by $\mathbf{A} = \begin{pmatrix} 3 & 1 \\ 2 & 4 \end{pmatrix}$. Find the area of the image]
1. $\det\mathbf{A} = 3 \times 4 - 1 \times 2 = 10$.
2. Area of image $= 10 \times 6 = 60$ cm².
:::

## Common mistakes

:::mistake{title="Multiplying in the wrong order"}
"$\mathbf{P}$ followed by $\mathbf{Q}$" is $\mathbf{QP}$, not $\mathbf{PQ}$.
:::

:::mistake{title="Writing images as rows"}
The images of $\mathbf{i}$ and $\mathbf{j}$ are the **columns** of the matrix.
:::

:::mistake{title="Using θ instead of 2α for a reflection"}
For a reflection in $y = x\tan\alpha$ the entries use $2\alpha$.
:::

:::mistake{title="Forgetting the modulus"}
Area scale factor is $|\det\mathbf{A}|$; areas are never negative.
:::

## Exam tips

:::exam-tip
When asked to "describe fully" a transformation, give every detail: rotation (centre, angle, direction), reflection (mirror line), enlargement (centre, factor), stretch (direction or invariant line, factor), shear (invariant line, and the image of one point).
:::

:::exam-tip
To check a matrix, apply it to a point whose image you can see on a sketch.
:::

:::exam-tip
For "find the object", use the inverse matrix and check by transforming your answer.
:::

## Summary

:::summary
- The columns of a transformation matrix are the images of $\mathbf{i}$ and $\mathbf{j}$.
- Learn (or derive) rotation, reflection, enlargement, stretch and shear matrices.
- $\mathbf{AB}$ means $\mathbf{B}$ first, then $\mathbf{A}$; $\mathbf{A}^n$ means $\mathbf{A}$ applied $n$ times.
- $\mathbf{A}^{-1}$ undoes $\mathbf{A}$; singular matrices cannot be undone.
- Area of image $= |\det\mathbf{A}| \times$ area of object.
:::
