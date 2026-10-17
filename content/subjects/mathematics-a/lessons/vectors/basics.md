---
{
  "key": "vectors.basics",
  "title": "Vectors in two and three dimensions",
  "summary": "Use vector notation in two and three dimensions; find position and displacement vectors, magnitudes and unit vectors; add, subtract and scale vectors with their geometric meaning; recognise parallel vectors; and resolve vectors and find resultants.",
  "concepts": ["amaths.vectors.basics"],
  "estimatedMinutes": 50,
  "level": "core"
}
---
## Introduction

A pilot flying from Harare to Victoria Falls needs to know not only how far to fly but in which direction; a surveyor on a mine at Zvishavane fixes the position of a shaft by three coordinates, east, north and depth. Quantities with both size and direction are **vectors**, and A Level uses them in pure mathematics (lines, planes and angles in three dimensions) and in mechanics (forces, velocities, positions of moving particles).

This lesson sets up the language. ZIMSEC examines it in Pure Mathematics (Form 5, topic 6.2.2) and in Mechanics (Form 5, topic 6.1, including the triangle law and resolving); Cambridge in Paper 3 (A Level only, topic 3.7). The scalar product and the equations of lines follow in the next two lessons.

## Key definitions

:::definition{term="Vector and scalar"}
A **vector** has magnitude and direction (displacement, velocity, force); a **scalar** has magnitude only (distance, speed, mass).
:::

:::definition{term="Notation"}
A vector can be written in bold, $\mathbf{a}$ (underlined, $\underline{a}$, in handwriting), as $\overrightarrow{AB}$ for the displacement from $A$ to $B$, as a column vector $\begin{pmatrix} x \\ y \\ z \end{pmatrix}$, or in terms of the unit vectors $\mathbf{i}$, $\mathbf{j}$, $\mathbf{k}$ along the axes: $x\mathbf{i} + y\mathbf{j} + z\mathbf{k}$.
:::

:::definition{term="Position, displacement and free vectors"}
The **position vector** of a point $A$ is $\overrightarrow{OA}$, its displacement from the origin. A **displacement vector** $\overrightarrow{AB}$ joins two points. A **free vector** has a size and direction but no fixed position.
:::

:::definition{term="Unit vector"}
A vector of magnitude 1. The unit vector in the direction of $\mathbf{a}$ is $\hat{\mathbf{a}} = \dfrac{\mathbf{a}}{|\mathbf{a}|}$.
:::

:::formula{name="Magnitude and displacement"}
$$
\left|x\mathbf{i} + y\mathbf{j} + z\mathbf{k}\right| = \sqrt{x^2 + y^2 + z^2}, \qquad \overrightarrow{AB} = \mathbf{b} - \mathbf{a}
$$
:::

Neither is on MF19: learn them.

## Operations and their geometry

- **Addition** follows the triangle law: $\overrightarrow{AB} + \overrightarrow{BC} = \overrightarrow{AC}$. In components, add the corresponding entries.
- **Subtraction**: $\mathbf{a} - \mathbf{b} = \mathbf{a} + (-\mathbf{b})$, where $-\mathbf{b}$ has the same size as $\mathbf{b}$ and the opposite direction.
- **Scalar multiplication**: $k\mathbf{a}$ is parallel to $\mathbf{a}$, $|k|$ times as long, reversed if $k < 0$.
- **Parallel vectors**: $\mathbf{a}$ and $\mathbf{b}$ are parallel if $\mathbf{b} = k\mathbf{a}$ for some scalar $k$. If also they share a point, the points are **collinear**.

:::worked-solution[Example 1: the points $A$ and $B$ have position vectors $2\mathbf{i} - \mathbf{j} + 3\mathbf{k}$ and $5\mathbf{i} + 3\mathbf{j} - 9\mathbf{k}$. Find $\overrightarrow{AB}$, its magnitude and the unit vector in its direction.]
1. $\overrightarrow{AB} = \mathbf{b} - \mathbf{a} = (5 - 2)\mathbf{i} + (3 + 1)\mathbf{j} + (-9 - 3)\mathbf{k} = 3\mathbf{i} + 4\mathbf{j} - 12\mathbf{k}$.
2. $|\overrightarrow{AB}| = \sqrt{9 + 16 + 144} = \sqrt{169} = 13$.
3. Unit vector: $\dfrac{1}{13}(3\mathbf{i} + 4\mathbf{j} - 12\mathbf{k})$.
:::

### Equal vectors and distances

Two vectors are **equal** when they have the same magnitude and the same direction, wherever they are drawn; in components, all their entries agree. This is why a free vector can be moved around a diagram: in a parallelogram $OABC$ the sides $\overrightarrow{OA}$ and $\overrightarrow{CB}$ are the same vector even though they start at different points.

The **distance** between two points is the magnitude of the displacement vector joining them. For points $P(x_1, y_1, z_1)$ and $Q(x_2, y_2, z_2)$,

$$
PQ = \sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2 + (z_2 - z_1)^2},
$$

the three-dimensional form of Pythagoras' theorem. Comparing distances is a quick way to classify a triangle (isosceles, right-angled) without measuring any angles; the scalar product in the next lesson gives the angles themselves.

## Vector geometry

Many questions describe a shape and ask for vectors along its sides and diagonals. Two facts do most of the work:

- $OABC$ is a parallelogram (in that order) exactly when $\overrightarrow{OB} = \overrightarrow{OA} + \overrightarrow{OC}$, equivalently $\overrightarrow{AB} = \overrightarrow{OC}$.
- The midpoint $M$ of $AB$ has position vector $\tfrac{1}{2}(\mathbf{a} + \mathbf{b})$.

:::worked-solution[Example 2 (exam style): relative to the origin $O$, the points $A$ and $B$ have position vectors $\mathbf{i} + 2\mathbf{j} + 4\mathbf{k}$ and $4\mathbf{i} + 6\mathbf{j} + 5\mathbf{k}$. (a) Find the position vector of the point $C$ such that $OABC$ is a parallelogram. (b) Show that the diagonals $OB$ and $AC$ bisect each other.]
1. (a) $\overrightarrow{OC} = \overrightarrow{AB} = \mathbf{b} - \mathbf{a} = 3\mathbf{i} + 4\mathbf{j} + \mathbf{k}$.
2. (b) Midpoint of $OB$: $\tfrac{1}{2}(4\mathbf{i} + 6\mathbf{j} + 5\mathbf{k}) = 2\mathbf{i} + 3\mathbf{j} + 2.5\mathbf{k}$.
3. Midpoint of $AC$: $\tfrac{1}{2}\left[(\mathbf{i} + 2\mathbf{j} + 4\mathbf{k}) + (3\mathbf{i} + 4\mathbf{j} + \mathbf{k})\right] = 2\mathbf{i} + 3\mathbf{j} + 2.5\mathbf{k}$.
4. The midpoints coincide, so the diagonals bisect each other.
:::

![Parallelogram OABC with O the origin, A (1, 2, 4), B (4, 6, 5) and C (3, 4, 1) where OC = AB = b − a: the diagonals OB and AC both have midpoint (2, 3, 2.5), so they bisect each other.](media:diagrams/vector-parallelogram-diagonals.png "Figure: in parallelogram OABC the diagonals OB and AC meet at their common midpoint M (2, 3, 2.5)")

:::worked-solution[Example 3: find the value of $\lambda$ for which $2\mathbf{i} + \lambda\mathbf{j} + 6\mathbf{k}$ is parallel to $3\mathbf{i} - 6\mathbf{j} + 9\mathbf{k}$.]
1. Parallel means each component is the same multiple: $\dfrac{2}{3} = \dfrac{\lambda}{-6} = \dfrac{6}{9}$.
2. The first and last ratios agree ($\tfrac{2}{3}$), so the multiple is $\tfrac{2}{3}$.
3. $\lambda = -6 \times \dfrac{2}{3} = -4$.
:::

## Resolving and resultants (ZIMSEC Mechanics)

In mechanics, a vector in two dimensions is often given by its magnitude and direction. A vector of magnitude $r$ at angle $\theta$ to $\mathbf{i}$ is $r\cos\theta\,\mathbf{i} + r\sin\theta\,\mathbf{j}$: resolving. To find a resultant, add the $\mathbf{i}$ and $\mathbf{j}$ parts, then find its magnitude and the angle it makes with $\mathbf{i}$, using a sketch to choose the quadrant.

For example, with $\mathbf{p} = 3\mathbf{i} + 4\mathbf{j}$ and $\mathbf{q} = 5\mathbf{i} - 12\mathbf{j}$, the vector $2\mathbf{p} - \mathbf{q} = \mathbf{i} + 20\mathbf{j}$ has magnitude $\sqrt{401} = 20.0$; a vector of magnitude $26$ in the direction of $\mathbf{q}$ is $2\mathbf{q} = 10\mathbf{i} - 24\mathbf{j}$, since $|\mathbf{q}| = 13$; and $\mathbf{q}$ makes an angle of $\tan^{-1}\frac{12}{5} = 67.4°$ below the direction of $\mathbf{i}$.

:::keyfact{title="ZIMSEC and Cambridge"}
Cambridge: A Level only (Paper 3, topic 3.7), in two and three dimensions. ZIMSEC: in Pure Mathematics (Form 5) and again in Mechanics (Form 5), where vectors describe forces and velocities and you are expected to resolve them and find resultants. Cambridge Paper 4 does not use vector notation.
:::

## Common mistakes

:::mistake{title="Subtracting the wrong way"}
$\overrightarrow{AB} = \mathbf{b} - \mathbf{a}$ ("end minus start"), not $\mathbf{a} - \mathbf{b}$.
:::

:::mistake{title="Adding magnitudes"}
$|\mathbf{a} + \mathbf{b}|$ is not $|\mathbf{a}| + |\mathbf{b}|$ unless the vectors point the same way. Add the components first.
:::

:::mistake{title="Order of the vertices"}
$OABC$ is a parallelogram means $O \to A \to B \to C$ round the shape; $\overrightarrow{OA} = \overrightarrow{CB}$, not $\overrightarrow{BC}$.
:::

:::mistake{title="Unit vector not divided"}
A unit vector must be divided by the magnitude. Check: its magnitude must be exactly 1.
:::

## Exam tips

:::exam-tip
Draw a quick sketch of the shape with arrows, even in three dimensions. It shows which vectors to add.
:::

:::exam-tip
To show that three points are collinear, show that $\overrightarrow{AB} = k\overrightarrow{AC}$ **and** state that the vectors share the point $A$.
:::

:::exam-tip
Leave magnitudes exact (surds) unless a decimal is asked for; give angles to 1 decimal place.
:::

## Summary

:::summary
- Vectors can be written as $\mathbf{a}$, $\overrightarrow{AB}$, column vectors or $x\mathbf{i} + y\mathbf{j} + z\mathbf{k}$.
- $\overrightarrow{AB} = \mathbf{b} - \mathbf{a}$; $|x\mathbf{i} + y\mathbf{j} + z\mathbf{k}| = \sqrt{x^2 + y^2 + z^2}$; unit vector $\frac{\mathbf{a}}{|\mathbf{a}|}$.
- Add by the triangle law (componentwise); $k\mathbf{a}$ is parallel to $\mathbf{a}$.
- Parallelogram $OABC$: $\overrightarrow{OB} = \overrightarrow{OA} + \overrightarrow{OC}$; midpoint of $AB$: $\frac{1}{2}(\mathbf{a} + \mathbf{b})$.
- Mechanics (ZIMSEC): resolve as $r\cos\theta\,\mathbf{i} + r\sin\theta\,\mathbf{j}$ and add components for resultants.
:::
