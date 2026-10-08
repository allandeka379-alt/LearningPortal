---
{
  "key": "vectors.vectors-in-two-dimensions",
  "title": "Vectors in two dimensions",
  "summary": "Describe movements with column vectors, directed line segments and bold letters, recognise equal, negative and parallel vectors, and add, subtract and multiply vectors by a scalar.",
  "concepts": ["math.vectors.vectors-in-2d"],
  "objectives": ["zimsec/o-level/mathematics:11.0.1", "zimsec/o-level/mathematics:11.0.2", "cambridge/igcse/mathematics:7.2.1", "cambridge/igcse/mathematics:7.2.2"],
  "estimatedMinutes": 30,
  "freePreview": true,
  "level": "extended"
}
---
## Introduction

A game ranger in Gonarezhou leaves camp and walks 3 km east and then 4 km north. Saying "she walked 7 km" tells you how far she went, but not where she ended up. To describe a movement fully you need both a **size** and a **direction**. Quantities like this are called **vectors**.

Vectors are used for movements, forces and velocities, and in geometry they give neat proofs that lines are parallel. This lesson introduces the notation and the basic arithmetic of vectors; the next lessons cover their magnitude and their use in geometry.

You should already be comfortable with coordinates and negative numbers, and you may have met translations.

## Key definitions

:::definition{term="Vector"}
A quantity with both magnitude (size) and direction, such as a displacement or a velocity.
:::

:::definition{term="Scalar"}
A quantity with size only, such as distance, mass, time or temperature.
:::

:::definition{term="Column vector"}
A vector written as $\begin{pmatrix} x \\ y \end{pmatrix}$: $x$ units across (positive to the right) and $y$ units up (positive upwards).
:::

:::keyfact{title="Ways of naming a vector"}
- A directed line segment: $\overrightarrow{AB}$ means the vector from $A$ to $B$.
- A bold lower-case letter in print, $\mathbf{a}$; in handwriting, underline it: $\underline{a}$.
- $\overrightarrow{BA} = -\overrightarrow{AB}$: the same size, the opposite direction.
:::

:::definition{term="Equal and parallel vectors"}
Two vectors are **equal** if they have the same magnitude and direction (the same column vector), wherever they are drawn. Two vectors are **parallel** if one is a scalar multiple of the other.
:::

## Reading and writing column vectors

The ranger's walk, 3 east and 4 north, is $\begin{pmatrix} 3 \\ 4 \end{pmatrix}$. A movement of 4 units left and 3 units up is $\begin{pmatrix} -4 \\ 3 \end{pmatrix}$.

To find the vector between two points, subtract the coordinates of the start from those of the end.

:::worked-solution[Example 1: the vector from $A(1, 2)$ to $B(4, -3)$]
1. Across: $4 - 1 = 3$.
2. Up: $-3 - 2 = -5$.
3. $\overrightarrow{AB} = \begin{pmatrix} 3 \\ -5 \end{pmatrix}$, and so $\overrightarrow{BA} = \begin{pmatrix} -3 \\ 5 \end{pmatrix}$.
:::

## Adding, subtracting and multiplying by a scalar

Work on the top numbers and the bottom numbers separately.

:::formula{name="Vector arithmetic"}
$$
\begin{pmatrix} a \\ b \end{pmatrix} + \begin{pmatrix} c \\ d \end{pmatrix} = \begin{pmatrix} a + c \\ b + d \end{pmatrix}, \qquad k\begin{pmatrix} a \\ b \end{pmatrix} = \begin{pmatrix} ka \\ kb \end{pmatrix}
$$
:::

Adding vectors means doing one movement after another. Going from $A$ to $B$ and then from $B$ to $C$ has the same result as going straight from $A$ to $C$:

$$
\overrightarrow{AB} + \overrightarrow{BC} = \overrightarrow{AC}
$$

Subtracting a vector means adding its negative: $\mathbf{a} - \mathbf{b} = \mathbf{a} + (-\mathbf{b})$.

:::worked-solution[Example 2: arithmetic with $\mathbf{a} = \begin{pmatrix} 3 \\ -2 \end{pmatrix}$ and $\mathbf{b} = \begin{pmatrix} -1 \\ 4 \end{pmatrix}$]
1. $\mathbf{a} + \mathbf{b} = \begin{pmatrix} 3 + (-1) \\ -2 + 4 \end{pmatrix} = \begin{pmatrix} 2 \\ 2 \end{pmatrix}$.
2. $\mathbf{a} - \mathbf{b} = \begin{pmatrix} 3 - (-1) \\ -2 - 4 \end{pmatrix} = \begin{pmatrix} 4 \\ -6 \end{pmatrix}$.
3. $3\mathbf{a} = \begin{pmatrix} 9 \\ -6 \end{pmatrix}$.
4. $2\mathbf{a} - 3\mathbf{b} = \begin{pmatrix} 6 \\ -4 \end{pmatrix} - \begin{pmatrix} -3 \\ 12 \end{pmatrix} = \begin{pmatrix} 9 \\ -16 \end{pmatrix}$.
:::

:::worked-solution[Example 3: find the unknowns]
Find $x$ and $y$ if $\begin{pmatrix} x \\ 3 \end{pmatrix} + 2\begin{pmatrix} 1 \\ y \end{pmatrix} = \begin{pmatrix} 7 \\ -1 \end{pmatrix}$.
1. Top row: $x + 2 = 7$, so $x = 5$.
2. Bottom row: $3 + 2y = -1$, so $2y = -4$ and $y = -2$.
:::

## Parallel vectors

Multiplying by a positive scalar $k$ keeps the direction and multiplies the length by $k$. Multiplying by a negative scalar reverses the direction. So **parallel vectors are scalar multiples of each other**.

:::worked-solution[Example 4: testing and using parallel vectors]
1. Is $\begin{pmatrix} 6 \\ -9 \end{pmatrix}$ parallel to $\begin{pmatrix} 2 \\ -3 \end{pmatrix}$? Yes: $\begin{pmatrix} 6 \\ -9 \end{pmatrix} = 3\begin{pmatrix} 2 \\ -3 \end{pmatrix}$.
2. Find $k$ so that $\begin{pmatrix} k \\ 6 \end{pmatrix}$ is parallel to $\begin{pmatrix} 2 \\ 3 \end{pmatrix}$. The bottom numbers show the multiplier is $6 \div 3 = 2$, so $k = 2 \times 2 = 4$.
:::

### Equal vectors in shapes

Equal vectors need not start at the same place. In a parallelogram $PQRS$, the opposite sides are equal vectors: $\overrightarrow{PQ} = \overrightarrow{SR}$ and $\overrightarrow{PS} = \overrightarrow{QR}$.

:::worked-solution[Example 5: the fourth vertex of a parallelogram]
$P(1, 1)$, $Q(5, 2)$ and $R(6, 5)$ are three vertices of parallelogram $PQRS$. Find $S$.
1. $\overrightarrow{PQ} = \begin{pmatrix} 5 - 1 \\ 2 - 1 \end{pmatrix} = \begin{pmatrix} 4 \\ 1 \end{pmatrix}$.
2. $\overrightarrow{SR} = \overrightarrow{PQ}$, so $S$ is $\begin{pmatrix} 4 \\ 1 \end{pmatrix}$ "behind" $R$: $S = (6 - 4, 5 - 1) = (2, 4)$.
3. Check: $\overrightarrow{PS} = \begin{pmatrix} 1 \\ 3 \end{pmatrix}$ and $\overrightarrow{QR} = \begin{pmatrix} 1 \\ 3 \end{pmatrix}$, which are equal, as they should be.
:::

A journey that ends where it started has total displacement $\begin{pmatrix} 0 \\ 0 \end{pmatrix}$, the **zero vector** $\mathbf{0}$. For example, $\overrightarrow{AB} + \overrightarrow{BC} + \overrightarrow{CA} = \mathbf{0}$ for any triangle $ABC$.

### Vectors and translations

A column vector also describes a translation. Translating $P(2, 5)$ by $\begin{pmatrix} -3 \\ 1 \end{pmatrix}$ moves it 3 left and 1 up, to $(-1, 6)$.

## Common mistakes

:::mistake{title="Subtracting the wrong way round"}
$\overrightarrow{AB}$ is "end minus start": $B - A$. Using $A - B$ gives $\overrightarrow{BA}$, which points the opposite way.
:::

:::mistake{title="Multiplying only one component"}
$3\begin{pmatrix} 2 \\ -5 \end{pmatrix} = \begin{pmatrix} 6 \\ -15 \end{pmatrix}$. Both numbers must be multiplied.
:::

:::mistake{title="Sign slips when subtracting"}
$\begin{pmatrix} 3 \\ -2 \end{pmatrix} - \begin{pmatrix} -1 \\ 4 \end{pmatrix}$: the top is $3 - (-1) = 4$, not $2$. Put brackets round negative numbers.
:::

:::mistake{title="Writing a vector as a coordinate"}
A vector is written as a column, $\begin{pmatrix} 3 \\ -5 \end{pmatrix}$, not as a point $(3, -5)$. A vector is a movement; a coordinate is a position.
:::

## Exam tips

:::exam-tip
In handwritten answers, underline vector letters ($\underline{a}$) and put an arrow over directed segments ($\overrightarrow{AB}$). Examiners expect correct notation.
:::

:::exam-tip
To show that two vectors are parallel, write one as a number times the other, for example $\begin{pmatrix} 6 \\ -9 \end{pmatrix} = 3\begin{pmatrix} 2 \\ -3 \end{pmatrix}$.
:::

:::exam-tip
Check an answer such as $\overrightarrow{AC}$ two ways: from the coordinates ($C - A$) and as $\overrightarrow{AB} + \overrightarrow{BC}$.
:::

## Summary

:::summary
- A vector has size and direction; a column vector gives the movement across and up.
- $\overrightarrow{AB}$ = coordinates of $B$ minus coordinates of $A$; $\overrightarrow{BA} = -\overrightarrow{AB}$.
- Add, subtract and multiply by scalars one component at a time.
- $\overrightarrow{AB} + \overrightarrow{BC} = \overrightarrow{AC}$.
- Parallel vectors are scalar multiples of each other.
:::
