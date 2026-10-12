---
{
  "key": "vectors.notation-magnitude",
  "title": "Vectors: notation, magnitude and unit vectors",
  "summary": "Write vectors as column vectors, in i, j form and with arrow or bold notation; use position vectors and AB = b − a; find magnitudes and unit vectors; add, subtract and scale vectors; recognise parallel vectors and find unknowns by equating components.",
  "concepts": ["amath.vectors.notation-magnitude"],
  "estimatedMinutes": 40,
  "freePreview": true,
  "level": "core"
}
---
## Introduction

Some quantities need only a size: the mass of a bag of maize, the temperature in Hwange. Others need a size **and** a direction: a boat on Lake Kariba moving at 12 km/h towards the north-east, or a force pulling a plough. These are **vectors**. Working with them as pairs of numbers lets you add movements, find distances and directions, and later solve geometry and navigation problems with simple algebra.

Vectors in two dimensions form topic 13 of Cambridge 0606 and usually appear on both papers. (ZIMSEC Additional Mathematics meets vectors through forces and velocities in Mechanics rather than as a pure topic.) This lesson sets up the notation and the basic operations used in vector geometry and velocity problems.

You should know Pythagoras' theorem and how to solve a pair of simultaneous linear equations.

## Key definitions

:::definition{term="Vector and scalar"}
A vector has magnitude (size) and direction; a scalar has magnitude only. Displacement, velocity and force are vectors; distance, speed and mass are scalars.
:::

:::definition{term="Notation"}
The vector from $A$ to $B$ is written $\overrightarrow{AB}$. A single letter in bold, $\mathbf{a}$, also names a vector (handwritten as $\underline{a}$). In components it is written as a column vector $\begin{pmatrix} 3 \\ -4 \end{pmatrix}$ or as $3\mathbf{i} - 4\mathbf{j}$, where $\mathbf{i}$ and $\mathbf{j}$ are unit vectors in the positive $x$- and $y$-directions.
:::

:::definition{term="Position vector"}
The position vector of a point $A$ is $\overrightarrow{OA} = \mathbf{a}$, the vector from the origin $O$ to $A$. If $A$ is $(2, -1)$, then $\mathbf{a} = 2\mathbf{i} - \mathbf{j}$.
:::

:::definition{term="Magnitude and unit vector"}
The magnitude of $\mathbf{a} = x\mathbf{i} + y\mathbf{j}$ is its length, $|\mathbf{a}| = \sqrt{x^2 + y^2}$. A unit vector has magnitude 1; the unit vector in the direction of $\mathbf{a}$ is $\hat{\mathbf{a}} = \dfrac{\mathbf{a}}{|\mathbf{a}|}$.
:::

:::formula{name="Key results (not in Cambridge's List of formulas)"}
$$
\overrightarrow{AB} = \mathbf{b} - \mathbf{a}, \qquad |x\mathbf{i} + y\mathbf{j}| = \sqrt{x^2 + y^2}, \qquad \hat{\mathbf{a}} = \frac{\mathbf{a}}{|\mathbf{a}|}
$$
:::

## Operations on vectors

Work component by component:

- **Add:** $(3\mathbf{i} + 2\mathbf{j}) + (\mathbf{i} - 5\mathbf{j}) = 4\mathbf{i} - 3\mathbf{j}$. Geometrically, follow one vector and then the other ("nose to tail").
- **Subtract:** $(3\mathbf{i} + 2\mathbf{j}) - (\mathbf{i} - 5\mathbf{j}) = 2\mathbf{i} + 7\mathbf{j}$.
- **Multiply by a scalar:** $3(2\mathbf{i} - \mathbf{j}) = 6\mathbf{i} - 3\mathbf{j}$, three times as long in the same direction. A negative scalar reverses the direction.

The vector $-\mathbf{a}$ has the same magnitude as $\mathbf{a}$ and the opposite direction, so $\overrightarrow{BA} = -\overrightarrow{AB}$.

### Position vectors and the vector between two points

To get from $A$ to $B$, go from $A$ back to $O$ and then out to $B$: $\overrightarrow{AB} = \overrightarrow{AO} + \overrightarrow{OB} = -\mathbf{a} + \mathbf{b}$. So **$\overrightarrow{AB} = \mathbf{b} - \mathbf{a}$**: "end minus start".

## Magnitude and unit vectors

:::worked-solution[Example 1: find the magnitude of $\mathbf{a} = 3\mathbf{i} - 4\mathbf{j}$ and the unit vector in its direction]
1. $|\mathbf{a}| = \sqrt{3^2 + (-4)^2} = \sqrt{9 + 16} = \sqrt{25} = 5$.
2. Unit vector: $\hat{\mathbf{a}} = \dfrac{1}{5}(3\mathbf{i} - 4\mathbf{j}) = \dfrac{3}{5}\mathbf{i} - \dfrac{4}{5}\mathbf{j}$.
3. Check: $\left(\frac{3}{5}\right)^2 + \left(\frac{4}{5}\right)^2 = \frac{9 + 16}{25} = 1$. ✓
:::

:::worked-solution[Example 2: $A$ is $(2, -1)$ and $B$ is $(8, 7)$. Find $\overrightarrow{AB}$, the distance $AB$ and the unit vector in the direction of $\overrightarrow{AB}$]
1. $\overrightarrow{AB} = \mathbf{b} - \mathbf{a} = (8\mathbf{i} + 7\mathbf{j}) - (2\mathbf{i} - \mathbf{j}) = 6\mathbf{i} + 8\mathbf{j}$.
2. $|\overrightarrow{AB}| = \sqrt{36 + 64} = 10$, so $AB = 10$ units.
3. Unit vector: $\dfrac{1}{10}(6\mathbf{i} + 8\mathbf{j}) = 0.6\mathbf{i} + 0.8\mathbf{j}$.
:::

![Vector AB from A(2, -1) to B(8, 7): 6 units across and 8 units up, so AB = 6i + 8j, and its length is the square root of 36 + 64, which is 10.](media:diagrams/vector-ab-components.png "Figure: the vector AB drawn with its components 6i and 8j")

A vector of a given magnitude in a given direction is that magnitude times the unit vector.

:::worked-solution[Example 3: find the vector of magnitude 26 in the direction of $5\mathbf{i} - 12\mathbf{j}$]
1. $|5\mathbf{i} - 12\mathbf{j}| = \sqrt{25 + 144} = 13$.
2. Unit vector: $\dfrac{1}{13}(5\mathbf{i} - 12\mathbf{j})$.
3. Required vector: $26 \times \dfrac{1}{13}(5\mathbf{i} - 12\mathbf{j}) = 2(5\mathbf{i} - 12\mathbf{j}) = 10\mathbf{i} - 24\mathbf{j}$.
:::

## Parallel vectors and equating components

Two vectors are **parallel** when one is a scalar multiple of the other: $\mathbf{u} = k\mathbf{v}$. In components, their $\mathbf{i}$ and $\mathbf{j}$ parts are in the same ratio. For example $4\mathbf{i} + k\mathbf{j}$ is parallel to $6\mathbf{i} - 9\mathbf{j}$ when $\frac{k}{4} = \frac{-9}{6}$, so $k = -6$.

Two vectors are **equal** only when their $\mathbf{i}$ components are equal **and** their $\mathbf{j}$ components are equal. One vector equation therefore gives two ordinary equations.

:::worked-solution[Example 4: find the constants $p$ and $q$ such that $p(2\mathbf{i} + 3\mathbf{j}) + q(\mathbf{i} - \mathbf{j}) = 7\mathbf{i} + 8\mathbf{j}$]
1. $\mathbf{i}$: $2p + q = 7$.
2. $\mathbf{j}$: $3p - q = 8$.
3. Add: $5p = 15$, so $p = 3$, and then $q = 7 - 6 = 1$.
4. Check: $3(2\mathbf{i} + 3\mathbf{j}) + (\mathbf{i} - \mathbf{j}) = 7\mathbf{i} + 8\mathbf{j}$. ✓
:::

:::worked-solution[Example 5: $\mathbf{a} = 2\mathbf{i} + 3\mathbf{j}$ and $\mathbf{b} = \mathbf{i} - \mathbf{j}$. Find the values of $\lambda$ for which $|\mathbf{a} + \lambda\mathbf{b}| = 5$]
1. $\mathbf{a} + \lambda\mathbf{b} = (2 + \lambda)\mathbf{i} + (3 - \lambda)\mathbf{j}$.
2. $|\mathbf{a} + \lambda\mathbf{b}|^2 = (2 + \lambda)^2 + (3 - \lambda)^2 = 25$.
3. Expand: $4 + 4\lambda + \lambda^2 + 9 - 6\lambda + \lambda^2 = 25$, so $2\lambda^2 - 2\lambda - 12 = 0$.
4. $\lambda^2 - \lambda - 6 = (\lambda - 3)(\lambda + 2) = 0$, giving $\lambda = 3$ or $\lambda = -2$.
5. Check: $\lambda = 3$ gives $5\mathbf{i}$, and $\lambda = -2$ gives $5\mathbf{j}$; both have magnitude 5. ✓
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Vectors as a pure topic (notation, position vectors, magnitude, unit vectors and vector geometry) are in Cambridge 0606 only. ZIMSEC candidates meet the same ideas when resolving forces and velocities in Paper 2 Mechanics.
:::

## Common mistakes

:::mistake{title="Start minus end"}
$\overrightarrow{AB} = \mathbf{b} - \mathbf{a}$, not $\mathbf{a} - \mathbf{b}$. The second gives $\overrightarrow{BA}$, pointing the wrong way.
:::

:::mistake{title="Adding components to find the magnitude"}
$|6\mathbf{i} + 8\mathbf{j}| = \sqrt{36 + 64} = 10$, not $6 + 8 = 14$. Square, add, then square root.
:::

:::mistake{title="Losing the sign when squaring"}
$|3\mathbf{i} - 4\mathbf{j}|$ uses $(-4)^2 = +16$. A magnitude is never negative.
:::

:::mistake{title="Forgetting to divide by the magnitude"}
The unit vector in the direction of $6\mathbf{i} + 8\mathbf{j}$ is $0.6\mathbf{i} + 0.8\mathbf{j}$; the vector $6\mathbf{i} + 8\mathbf{j}$ itself has length 10.
:::

## Exam tips

:::exam-tip
On Paper 1 leave magnitudes as exact surds, for example $\sqrt{41}$, and unit vectors as fractions, for example $\frac{1}{\sqrt{41}}(5\mathbf{i} + 4\mathbf{j})$.
:::

:::exam-tip
Use the notation of the question: if it uses column vectors, answer in column vectors; if it uses $\mathbf{i}$ and $\mathbf{j}$, answer in $\mathbf{i}$ and $\mathbf{j}$.
:::

:::exam-tip
"Find the unknowns" in a vector equation means equating $\mathbf{i}$ and $\mathbf{j}$ components separately: write both equations down.
:::

## Summary

:::summary
- Vectors have magnitude and direction: $\overrightarrow{AB}$, $\mathbf{a}$, $\begin{pmatrix} x \\ y \end{pmatrix}$ or $x\mathbf{i} + y\mathbf{j}$.
- Position vectors start at $O$; $\overrightarrow{AB} = \mathbf{b} - \mathbf{a}$ (end minus start).
- $|x\mathbf{i} + y\mathbf{j}| = \sqrt{x^2 + y^2}$; the unit vector in the direction of $\mathbf{a}$ is $\dfrac{\mathbf{a}}{|\mathbf{a}|}$.
- Add, subtract and scale component by component; $\mathbf{u}$ and $\mathbf{v}$ are parallel when $\mathbf{u} = k\mathbf{v}$.
- Equal vectors have equal $\mathbf{i}$ and equal $\mathbf{j}$ components, giving two equations.
:::
