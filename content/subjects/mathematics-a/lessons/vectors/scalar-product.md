---
{
  "key": "vectors.scalar-product",
  "title": "The scalar product and angles between vectors",
  "summary": "Calculate the scalar (dot) product from components and from magnitudes and the angle, and use it to find angles between vectors, to test for perpendicularity, and to solve problems on triangles, cuboids and pyramids in three dimensions.",
  "concepts": ["amaths.vectors.scalar-product"],
  "estimatedMinutes": 50,
  "level": "core"
}
---
## Introduction

How steep is the sloping edge of a roof truss? At what angle do two struts of a steel pylon meet on the Kariba power line? What is the angle between the diagonals of a crate? In three dimensions, drawing and measuring is hopeless; the **scalar product** turns these questions into a few lines of arithmetic.

The scalar product multiplies two vectors to give a number. It is the main tool for angles in A Level vector geometry and is used again with lines and planes. ZIMSEC examines it in Pure Mathematics Form 5 (topic 6.2.2); Cambridge in Paper 3 (A Level only, topic 3.7). The **vector** (cross) product is a separate, ZIMSEC-only topic.

## Key definitions

:::definition{term="Scalar product"}
For vectors $\mathbf{a}$ and $\mathbf{b}$ with angle $\theta$ between them ($0 \le \theta \le 180°$), the scalar product is $\mathbf{a} \cdot \mathbf{b} = |\mathbf{a}||\mathbf{b}|\cos\theta$. It is a scalar, not a vector.
:::

:::formula{name="Scalar product in components"}
$$
\begin{pmatrix} a_1 \\ a_2 \\ a_3 \end{pmatrix} \cdot \begin{pmatrix} b_1 \\ b_2 \\ b_3 \end{pmatrix} = a_1b_1 + a_2b_2 + a_3b_3
$$
:::

:::formula{name="Angle between two vectors"}
$$
\cos\theta = \frac{\mathbf{a} \cdot \mathbf{b}}{|\mathbf{a}||\mathbf{b}|}
$$
:::

MF19 does not list these for Paper 3; learn them. The component formula works because $\mathbf{i} \cdot \mathbf{i} = \mathbf{j} \cdot \mathbf{j} = \mathbf{k} \cdot \mathbf{k} = 1$ (each makes $0°$ with itself) and $\mathbf{i} \cdot \mathbf{j} = \mathbf{j} \cdot \mathbf{k} = \mathbf{k} \cdot \mathbf{i} = 0$ (perpendicular).

## Properties

- $\mathbf{a} \cdot \mathbf{b} = \mathbf{b} \cdot \mathbf{a}$, and $\mathbf{a} \cdot (\mathbf{b} + \mathbf{c}) = \mathbf{a} \cdot \mathbf{b} + \mathbf{a} \cdot \mathbf{c}$.
- $\mathbf{a} \cdot \mathbf{a} = |\mathbf{a}|^2$.
- **Perpendicular**: for non-zero vectors, $\mathbf{a} \cdot \mathbf{b} = 0 \iff$ the vectors are perpendicular.
- The **sign** tells you the type of angle: positive for acute, negative for obtuse.

## Finding angles

:::worked-solution[Example 1: find the angle between $\mathbf{a} = 2\mathbf{i} - \mathbf{j} + 2\mathbf{k}$ and $\mathbf{b} = \mathbf{i} + 3\mathbf{j} - \mathbf{k}$.]
1. $\mathbf{a} \cdot \mathbf{b} = 2(1) + (-1)(3) + 2(-1) = 2 - 3 - 2 = -3$.
2. $|\mathbf{a}| = \sqrt{4 + 1 + 4} = 3$ and $|\mathbf{b}| = \sqrt{1 + 9 + 1} = \sqrt{11}$.
3. $\cos\theta = \dfrac{-3}{3\sqrt{11}} = -\dfrac{1}{\sqrt{11}}$.
4. $\theta = 107.5°$ (1 d.p.). The negative scalar product gives an obtuse angle.
:::

:::worked-solution[Example 2: find the value of $p$ for which $p\mathbf{i} + 2\mathbf{j} - \mathbf{k}$ is perpendicular to $3\mathbf{i} + p\mathbf{j} + 4\mathbf{k}$.]
1. Perpendicular: the scalar product is zero.
2. $3p + 2p - 4 = 0$, so $5p = 4$ and $p = 0.8$.
3. Check: $(0.8)(3) + (2)(0.8) + (-1)(4) = 2.4 + 1.6 - 4 = 0$.
:::

## Angles in triangles and solids

For an angle at a vertex, use the two vectors pointing **away** from that vertex. For the angle $BAC$, use $\overrightarrow{AB}$ and $\overrightarrow{AC}$, not $\overrightarrow{BA}$ and $\overrightarrow{AC}$: reversing one vector gives $180° - \theta$.

:::worked-solution[Example 3 (exam style): the points $A(2, 0, 1)$, $B(5, 4, 1)$ and $C(3, 1, 6)$ are given. (a) Find angle $BAC$. (b) Hence find the area of triangle $ABC$.]
1. (a) $\overrightarrow{AB} = 3\mathbf{i} + 4\mathbf{j}$ and $\overrightarrow{AC} = \mathbf{i} + \mathbf{j} + 5\mathbf{k}$.
2. $\overrightarrow{AB} \cdot \overrightarrow{AC} = 3 + 4 + 0 = 7$; $|\overrightarrow{AB}| = 5$, $|\overrightarrow{AC}| = \sqrt{27}$.
3. $\cos BAC = \dfrac{7}{5\sqrt{27}} = 0.2694$, so angle $BAC = 74.4°$.
4. (b) Area $= \tfrac{1}{2}|\overrightarrow{AB}||\overrightarrow{AC}|\sin BAC = \tfrac{1}{2}(5)(\sqrt{27})\sin 74.4° = 12.5$ square units.
:::

![Triangle ABC with A (2, 0, 1), B (5, 4, 1), C (3, 1, 6): the vectors AB = 3i + 4j and AC = i + j + 5k both start at A, AB·AC = 7, |AB| = 5 and |AC| = √27, so angle BAC = 74.4 degrees.](media:diagrams/vector-angle-triangle-bac.png "Figure: angle BAC is found from the two vectors that start at A: cos BAC = 7 ÷ (5√27)")

:::worked-solution[Example 4: a cuboid has vertices $O(0, 0, 0)$, $A(4, 0, 0)$, $B(4, 3, 0)$, $C(0, 3, 0)$ and, directly above them, $D(0, 0, 2)$, $E(4, 0, 2)$, $F(4, 3, 2)$, $G(0, 3, 2)$. Find the acute angle between the diagonals $OF$ and $AG$.]
1. $\overrightarrow{OF} = 4\mathbf{i} + 3\mathbf{j} + 2\mathbf{k}$ and $\overrightarrow{AG} = -4\mathbf{i} + 3\mathbf{j} + 2\mathbf{k}$.
2. Scalar product: $-16 + 9 + 4 = -3$; both have magnitude $\sqrt{29}$.
3. $\cos\theta = -\dfrac{3}{29}$, so $\theta = 95.9°$ between the vectors.
4. The acute angle between the **lines** is $180° - 95.9° = 84.1°$.
:::

The last step matters: two lines make two angles adding to $180°$, and a question about the angle between lines usually wants the acute one.

## Proving results with the scalar product

Because the scalar product obeys the ordinary rules of expanding brackets, it can prove geometric facts without coordinates. Take a rhombus $OABC$ with $\overrightarrow{OA} = \mathbf{a}$ and $\overrightarrow{OC} = \mathbf{c}$, where $|\mathbf{a}| = |\mathbf{c}|$ because all the sides of a rhombus are equal. Its diagonals are $\overrightarrow{OB} = \mathbf{a} + \mathbf{c}$ and $\overrightarrow{CA} = \mathbf{a} - \mathbf{c}$. Then

$$
(\mathbf{a} + \mathbf{c}) \cdot (\mathbf{a} - \mathbf{c}) = \mathbf{a} \cdot \mathbf{a} - \mathbf{c} \cdot \mathbf{c} = |\mathbf{a}|^2 - |\mathbf{c}|^2 = 0,
$$

so the diagonals of every rhombus are perpendicular. The cross terms $-\mathbf{a} \cdot \mathbf{c}$ and $+\mathbf{c} \cdot \mathbf{a}$ cancel because the scalar product is commutative.

The same idea gives the cosine rule. In a triangle with sides $\mathbf{a}$ and $\mathbf{b}$ from one vertex, the third side is $\mathbf{a} - \mathbf{b}$, and $|\mathbf{a} - \mathbf{b}|^2 = |\mathbf{a}|^2 + |\mathbf{b}|^2 - 2\mathbf{a} \cdot \mathbf{b}$, which is $a^2 + b^2 - 2ab\cos C$. Questions of this kind are rare in examinations, but they show why the scalar product is defined as it is.

## Projections

The scalar product also gives the length of the projection of one vector onto another: the component of $\mathbf{a}$ in the direction of $\mathbf{b}$ is $\mathbf{a} \cdot \hat{\mathbf{b}} = \dfrac{\mathbf{a} \cdot \mathbf{b}}{|\mathbf{b}|}$. This is the vector form of "resolving", and it is the key step in finding the foot of a perpendicular from a point to a line in the next lesson.

:::keyfact{title="ZIMSEC and Cambridge"}
Cambridge: A Level only (Paper 3, topic 3.7); the scalar product is the only product of vectors used. ZIMSEC (Pure Mathematics, Form 5) uses the scalar product in the same ways and, in Form 6, also the vector (cross) product, which gives areas and normals to planes.
:::

## Common mistakes

:::mistake{title="Vectors pointing the wrong way"}
For angle $ABC$ use $\overrightarrow{BA}$ and $\overrightarrow{BC}$, both starting at $B$. One reversed vector gives the supplement of the angle.
:::

:::mistake{title="Multiplying the magnitudes"}
$\mathbf{a} \cdot \mathbf{b}$ is not $|\mathbf{a}||\mathbf{b}|$ unless the vectors are parallel and in the same direction.
:::

:::mistake{title="Writing the answer as a vector"}
The scalar product is a number. "$\mathbf{a} \cdot \mathbf{b} = 2\mathbf{i} - 3\mathbf{j} - 2\mathbf{k}$" is meaningless: add the products.
:::

:::mistake{title="Obtuse angle between lines"}
When the question asks for the angle between two lines, give the acute angle.
:::

## Exam tips

:::exam-tip
Show the scalar product calculation and both magnitudes explicitly; "$\cos\theta = \dfrac{7}{5\sqrt{27}}$" earns the method mark even if the final angle is mistyped.
:::

:::exam-tip
"Show that the vectors are perpendicular" needs the scalar product worked out to $0$, and a statement.
:::

:::exam-tip
Give angles in degrees to 1 decimal place unless told otherwise, and use exact surds for magnitudes in intermediate steps.
:::

:::exam-tip
When a question asks for the angle between two lines, find the angle between their direction vectors and, if it is obtuse, subtract it from $180°$: examiners expect the acute angle. When it asks for an angle such as $ABC$ inside a triangle or solid, keep the angle the scalar product gives, even if it is obtuse, because the vectors start at the vertex.
:::

## Summary

:::summary
- $\mathbf{a} \cdot \mathbf{b} = |\mathbf{a}||\mathbf{b}|\cos\theta = a_1b_1 + a_2b_2 + a_3b_3$, a scalar.
- Angle: $\cos\theta = \dfrac{\mathbf{a} \cdot \mathbf{b}}{|\mathbf{a}||\mathbf{b}|}$; negative means obtuse.
- Non-zero vectors are perpendicular exactly when $\mathbf{a} \cdot \mathbf{b} = 0$.
- For an angle at a vertex, use two vectors starting at that vertex.
- The angle between two lines is the acute one; area of a triangle $= \frac{1}{2}ab\sin C$.
:::
