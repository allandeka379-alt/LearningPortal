---
{
  "key": "matrices.transformations",
  "title": "Matrices and transformations",
  "summary": "Use 2 × 2 matrices to carry out reflections, rotations, enlargements, stretches and shears, find the matrix of a transformation from the images of the unit square, combine transformations, find inverse transformations and use the determinant as the area scale factor.",
  "concepts": ["math.matrices.transformations"],
  "objectives": ["zimsec/o-level/mathematics:13.0.3"],
  "estimatedMinutes": 21,
  "level": "core"
}
---
## Introduction

Computer games, mapping software and the animation in an advert on ZBC all move shapes about the screen. Behind the scenes, every reflection, rotation, enlargement, stretch and shear that keeps the origin fixed is done by **multiplying by a $2 \times 2$ matrix**. One small table of four numbers describes the whole transformation.

In this ZIMSEC topic you will use matrices to find images, identify a transformation from its matrix, build the matrix of a transformation, combine transformations and undo them. You should be able to multiply $2 \times 2$ matrices, find a determinant and an inverse, and describe transformations fully.

## Key definitions

:::definition{term="Position vector"}
The point $(x, y)$ is written as the column $\begin{pmatrix} x \\ y \end{pmatrix}$ so that it can be multiplied by a matrix.
:::

:::definition{term="Transformation matrix"}
A $2 \times 2$ matrix $M$ that maps every point $\begin{pmatrix} x \\ y \end{pmatrix}$ to its image $M\begin{pmatrix} x \\ y \end{pmatrix}$. The origin never moves under a matrix transformation.
:::

:::definition{term="Unit square"}
The square $OIKJ$ with $O(0, 0)$, $I(1, 0)$, $K(1, 1)$ and $J(0, 1)$.
:::

:::keyfact{title="The columns of the matrix"}
The **first column** of $M$ is the image of $I(1, 0)$ and the **second column** is the image of $J(0, 1)$.
:::

:::keyfact{title="Determinant and area"}
Area of image $= |\det M| \times$ area of object. A negative determinant means the orientation is reversed, as in a reflection.
:::

## Finding images

Multiply the matrix by the position vector. Several points can be done at once by writing their position vectors side by side.

:::worked-solution[Example 1: the image of a triangle under $\begin{pmatrix} 0 & 1 \\ 1 & 0 \end{pmatrix}$]
Triangle $ABC$ has $A(1, 1)$, $B(3, 1)$ and $C(1, 2)$.

1. $\begin{pmatrix} 0 & 1 \\ 1 & 0 \end{pmatrix}\begin{pmatrix} 1 & 3 & 1 \\ 1 & 1 & 2 \end{pmatrix} = \begin{pmatrix} 1 & 1 & 2 \\ 1 & 3 & 1 \end{pmatrix}$.
2. The images are $A'(1, 1)$, $B'(1, 3)$ and $C'(2, 1)$.
3. Each point has its coordinates swapped: this matrix is the reflection in the line $y = x$. $A$ lies on the mirror line, so it does not move.
:::

## The standard matrices

| Transformation | Matrix |
| --- | --- |
| Reflection in the $x$-axis | $\begin{pmatrix} 1 & 0 \\ 0 & -1 \end{pmatrix}$ |
| Reflection in the $y$-axis | $\begin{pmatrix} -1 & 0 \\ 0 & 1 \end{pmatrix}$ |
| Reflection in $y = x$ | $\begin{pmatrix} 0 & 1 \\ 1 & 0 \end{pmatrix}$ |
| Reflection in $y = -x$ | $\begin{pmatrix} 0 & -1 \\ -1 & 0 \end{pmatrix}$ |
| Rotation $90^\circ$ anticlockwise about $O$ | $\begin{pmatrix} 0 & -1 \\ 1 & 0 \end{pmatrix}$ |
| Rotation $90^\circ$ clockwise about $O$ | $\begin{pmatrix} 0 & 1 \\ -1 & 0 \end{pmatrix}$ |
| Rotation $180^\circ$ about $O$ | $\begin{pmatrix} -1 & 0 \\ 0 & -1 \end{pmatrix}$ |
| Enlargement, centre $O$, scale factor $k$ | $\begin{pmatrix} k & 0 \\ 0 & k \end{pmatrix}$ |
| Stretch, $y$-axis invariant, factor $k$ | $\begin{pmatrix} k & 0 \\ 0 & 1 \end{pmatrix}$ |
| Stretch, $x$-axis invariant, factor $k$ | $\begin{pmatrix} 1 & 0 \\ 0 & k \end{pmatrix}$ |
| Shear, $x$-axis invariant, factor $k$ | $\begin{pmatrix} 1 & k \\ 0 & 1 \end{pmatrix}$ |
| Shear, $y$-axis invariant, factor $k$ | $\begin{pmatrix} 1 & 0 \\ k & 1 \end{pmatrix}$ |

You do not need to memorise the table blindly: each matrix can be rebuilt from the images of $I(1, 0)$ and $J(0, 1)$. For example, a quarter turn anticlockwise sends $I$ to $(0, 1)$ and $J$ to $(-1, 0)$, so the columns are $\begin{pmatrix} 0 \\ 1 \end{pmatrix}$ and $\begin{pmatrix} -1 \\ 0 \end{pmatrix}$.

## Finding the matrix of a transformation

:::worked-solution[Example 2: from the images of the unit vectors]
A transformation maps $I(1, 0)$ onto itself and $J(0, 1)$ onto $(3, 1)$. Find its matrix and describe it.

1. First column: image of $I$ is $\begin{pmatrix} 1 \\ 0 \end{pmatrix}$. Second column: image of $J$ is $\begin{pmatrix} 3 \\ 1 \end{pmatrix}$.
2. $M = \begin{pmatrix} 1 & 3 \\ 0 & 1 \end{pmatrix}$.
3. Points on the $x$-axis do not move and $J$, 1 unit above the axis, moves 3 units sideways: a **shear with the $x$-axis invariant and shear factor 3**.
:::

:::worked-solution[Example 3: from the images of two other points]
$M = \begin{pmatrix} a & b \\ c & d \end{pmatrix}$ maps $(1, 2)$ to $(5, 4)$ and $(3, 1)$ to $(5, 7)$. Find $a$, $b$, $c$ and $d$.

1. Top rows: $a + 2b = 5$ and $3a + b = 5$.
2. Multiply the second by 2 and subtract the first: $5a = 5$, so $a = 1$ and $b = 2$.
3. Bottom rows: $c + 2d = 4$ and $3c + d = 7$, giving $c = 2$ and $d = 1$.
4. $M = \begin{pmatrix} 1 & 2 \\ 2 & 1 \end{pmatrix}$. Check: $\begin{pmatrix} 1 & 2 \\ 2 & 1 \end{pmatrix}\begin{pmatrix} 3 \\ 1 \end{pmatrix} = \begin{pmatrix} 5 \\ 7 \end{pmatrix}$.
:::

## Combined transformations

If $P$ is carried out first and then $Q$, the point $X$ becomes $Q(PX) = (QP)X$. So:

:::keyfact{title="Order of a combination"}
"$P$ followed by $Q$" has matrix $QP$: the transformation done **first** is written on the **right**.
:::

:::worked-solution[Example 4: reflection in the $y$-axis followed by a quarter turn anticlockwise]
1. $P = \begin{pmatrix} -1 & 0 \\ 0 & 1 \end{pmatrix}$ (first) and $Q = \begin{pmatrix} 0 & -1 \\ 1 & 0 \end{pmatrix}$ (second).
2. $QP = \begin{pmatrix} 0 \times (-1) + (-1) \times 0 & 0 \times 0 + (-1) \times 1 \\ 1 \times (-1) + 0 \times 0 & 1 \times 0 + 0 \times 1 \end{pmatrix} = \begin{pmatrix} 0 & -1 \\ -1 & 0 \end{pmatrix}$.
3. This is the matrix of the reflection in the line $y = -x$.
:::

## Inverse transformations and area

The **inverse** transformation maps every image back onto its object. Its matrix is $M^{-1}$. For example, the inverse of the quarter turn anticlockwise $\begin{pmatrix} 0 & -1 \\ 1 & 0 \end{pmatrix}$ is $\begin{pmatrix} 0 & 1 \\ -1 & 0 \end{pmatrix}$, the quarter turn clockwise. A singular matrix (determinant 0) squashes shapes onto a line and has no inverse.

:::worked-solution[Example 5: the area of an image]
A shape of area $4\ \text{cm}^2$ is transformed by $M = \begin{pmatrix} 3 & 1 \\ 1 & 2 \end{pmatrix}$.

1. $\det M = 3 \times 2 - 1 \times 1 = 5$.
2. Area of image $= 5 \times 4 = 20\ \text{cm}^2$.
:::

For the standard matrices: a shear has determinant 1 (area unchanged), a one-way stretch has determinant $k$, an enlargement $k^2$, and every reflection $-1$.

## Common mistakes

:::mistake{title="Multiplying in the wrong order"}
For "$P$ followed by $Q$", work out $QP$, not $PQ$. Matrix multiplication is not commutative, so the two products usually describe different transformations.
:::

:::mistake{title="Putting the images in rows"}
The images of $(1, 0)$ and $(0, 1)$ go into the **columns** of the matrix, not the rows.
:::

:::mistake{title="Using a negative determinant as an area factor"}
The area factor is the **absolute value** of the determinant. A determinant of $-3$ still multiplies areas by 3; the minus sign tells you the shape has been flipped over.
:::

:::mistake{title="Expecting a matrix for every transformation"}
A $2 \times 2$ matrix always keeps the origin fixed. A translation, or a rotation about a point other than $O$, cannot be written as a $2 \times 2$ matrix.
:::

## Exam tips

:::exam-tip
To identify a transformation from its matrix, find the images of $I(1, 0)$, $J(0, 1)$ and $K(1, 1)$ and sketch the unit square and its image. Then describe the transformation fully.
:::

:::exam-tip
In "find $a$, $b$, $c$ and $d$" questions, write out the two pairs of simultaneous equations clearly; each correct pair usually earns a mark.
:::

:::exam-tip
Show the matrix multiplication for a combined transformation, then check it on one point by applying the two transformations one at a time.
:::

## Summary

:::summary
- The image of $\begin{pmatrix} x \\ y \end{pmatrix}$ is $M\begin{pmatrix} x \\ y \end{pmatrix}$; the origin is always invariant.
- The columns of $M$ are the images of $(1, 0)$ and $(0, 1)$, so any matrix can be built from the unit square.
- "$P$ followed by $Q$" is $QP$; the inverse transformation has matrix $M^{-1}$.
- Area of image $= |\det M| \times$ area of object; a negative determinant reverses orientation.
- Translations and rotations about points other than the origin have no $2 \times 2$ matrix.
:::
