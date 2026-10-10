---
{
  "key": "vectors.cross-product-planes",
  "title": "The vector product and equations of planes",
  "summary": "Calculate the vector (cross) product, use its properties to find perpendicular vectors and the areas of triangles and parallelograms, and write the vector, parametric, scalar-product and Cartesian equations of a plane from a point and a normal, three points, or a point and two directions.",
  "concepts": ["amaths.vectors.cross-product-planes"],
  "estimatedMinutes": 45,
  "level": "core"
}
---
## Introduction

In two dimensions a line has a single perpendicular direction. In three dimensions a **plane** does: the roof of a grain silo, a sloping solar panel on a Gweru clinic, or the face of a pyramid each has one normal direction. The **vector product** turns two directions lying in a plane into that normal, and the normal gives the plane's equation in one line.

ZIMSEC Pure Mathematics examines the cross product and planes in Form 6 (topic 6.2.2.3): the cross product and areas, and vector, parametric and Cartesian equations of a plane. Cambridge 9709 includes lines but not planes or the vector product, so this lesson is for ZIMSEC candidates. You need the scalar product and the vector equation of a line.

## Key definitions

:::definition{term="Vector (cross) product"}
For $\mathbf{a} = a_1\mathbf{i} + a_2\mathbf{j} + a_3\mathbf{k}$ and $\mathbf{b} = b_1\mathbf{i} + b_2\mathbf{j} + b_3\mathbf{k}$,
$$
\mathbf{a} \times \mathbf{b} = \begin{vmatrix} \mathbf{i} & \mathbf{j} & \mathbf{k} \\ a_1 & a_2 & a_3 \\ b_1 & b_2 & b_3 \end{vmatrix} = \begin{pmatrix} a_2b_3 - a_3b_2 \\ a_3b_1 - a_1b_3 \\ a_1b_2 - a_2b_1 \end{pmatrix}.
$$
:::

:::formula{name="Magnitude and direction"}
$$
|\mathbf{a} \times \mathbf{b}| = |\mathbf{a}||\mathbf{b}|\sin\theta
$$
where $\theta$ is the angle between $\mathbf{a}$ and $\mathbf{b}$. The direction of $\mathbf{a} \times \mathbf{b}$ is perpendicular to both $\mathbf{a}$ and $\mathbf{b}$, given by the right-hand rule.
:::

:::keyfact{title="Properties"}
- $\mathbf{b} \times \mathbf{a} = -(\mathbf{a} \times \mathbf{b})$ (not commutative).
- $\mathbf{a} \times \mathbf{a} = \mathbf{0}$; parallel vectors have zero cross product.
- $\mathbf{a} \times (\mathbf{b} + \mathbf{c}) = \mathbf{a} \times \mathbf{b} + \mathbf{a} \times \mathbf{c}$.
- $\mathbf{i} \times \mathbf{j} = \mathbf{k}$, $\mathbf{j} \times \mathbf{k} = \mathbf{i}$, $\mathbf{k} \times \mathbf{i} = \mathbf{j}$.
:::

## Calculating the cross product

Use the determinant, expanding along the top row; the middle term carries a minus sign. **Always check** the answer by dotting it with each original vector: both products must be zero.

:::worked-solution[Example 1: Find $\mathbf{a} \times \mathbf{b}$ for $\mathbf{a} = 2\mathbf{i} - \mathbf{j} + 3\mathbf{k}$ and $\mathbf{b} = \mathbf{i} + 4\mathbf{j} - 2\mathbf{k}$, and verify that it is perpendicular to both.]
1. $\mathbf{i}$-component: $(-1)(-2) - (3)(4) = 2 - 12 = -10$.
2. $\mathbf{j}$-component: $(3)(1) - (2)(-2) = 3 + 4 = 7$.
3. $\mathbf{k}$-component: $(2)(4) - (-1)(1) = 8 + 1 = 9$.
4. So $\mathbf{a} \times \mathbf{b} = -10\mathbf{i} + 7\mathbf{j} + 9\mathbf{k}$.
5. Check: $\mathbf{a} \cdot (\mathbf{a} \times \mathbf{b}) = -20 - 7 + 27 = 0$ and $\mathbf{b} \cdot (\mathbf{a} \times \mathbf{b}) = -10 + 28 - 18 = 0$.
:::

## Areas

The parallelogram with adjacent sides $\mathbf{a}$ and $\mathbf{b}$ has base $|\mathbf{a}|$ and height $|\mathbf{b}|\sin\theta$, so

- **area of parallelogram** $= |\mathbf{a} \times \mathbf{b}|$,
- **area of triangle** $ABC = \tfrac{1}{2}\left|\overrightarrow{AB} \times \overrightarrow{AC}\right|$.

This avoids finding the angle first.

## Equations of a plane

A plane is fixed by a point $A$ (position vector $\mathbf{a}$) and a normal vector $\mathbf{n}$. A point $R$ lies in the plane exactly when $\overrightarrow{AR}$ is perpendicular to $\mathbf{n}$:

:::formula{name="Plane through a with normal n"}
$$
(\mathbf{r} - \mathbf{a}) \cdot \mathbf{n} = 0 \quad\Longleftrightarrow\quad \mathbf{r} \cdot \mathbf{n} = \mathbf{a} \cdot \mathbf{n} = d
$$
With $\mathbf{n} = \begin{pmatrix} p \\ q \\ s \end{pmatrix}$ and $\mathbf{r} = \begin{pmatrix} x \\ y \\ z \end{pmatrix}$ this is the Cartesian form $px + qy + sz = d$.
:::

The coefficients of $x$, $y$, $z$ in a Cartesian equation are the components of a normal vector. For example, the plane through $(2, -1, 3)$ with normal $\mathbf{i} + 2\mathbf{j} - 2\mathbf{k}$ is $x + 2y - 2z = 2 - 2 - 6 = -6$.

A plane can also be written in **vector (parametric) form**, using a point and two non-parallel directions $\mathbf{b}$ and $\mathbf{c}$ in the plane:
$$
\mathbf{r} = \mathbf{a} + \lambda\mathbf{b} + \mu\mathbf{c}.
$$
Writing out the components gives three **parametric equations** for $x$, $y$ and $z$ in terms of $\lambda$ and $\mu$. To convert to Cartesian form, take $\mathbf{n} = \mathbf{b} \times \mathbf{c}$.

:::worked-solution[Example 2: The points $A(1, 0, 2)$, $B(3, 1, 1)$ and $C(0, 2, 4)$ are three corners of a triangular solar panel. Find the area of triangle $ABC$ and the Cartesian equation of the plane $ABC$.]
1. $\overrightarrow{AB} = \begin{pmatrix} 2 \\ 1 \\ -1 \end{pmatrix}$, $\overrightarrow{AC} = \begin{pmatrix} -1 \\ 2 \\ 2 \end{pmatrix}$.
2. $\overrightarrow{AB} \times \overrightarrow{AC} = \begin{pmatrix} (1)(2) - (-1)(2) \\ (-1)(-1) - (2)(2) \\ (2)(2) - (1)(-1) \end{pmatrix} = \begin{pmatrix} 4 \\ -3 \\ 5 \end{pmatrix}$.
3. Area $= \tfrac{1}{2}\sqrt{16 + 9 + 25} = \tfrac{1}{2}\sqrt{50} = \dfrac{5\sqrt{2}}{2} = 3.54$ square units.
4. Normal $\mathbf{n} = 4\mathbf{i} - 3\mathbf{j} + 5\mathbf{k}$; $d = \mathbf{n} \cdot \overrightarrow{OA} = 4 + 0 + 10 = 14$.
5. Plane: $4x - 3y + 5z = 14$.
6. Check with $B$: $12 - 3 + 5 = 14$; with $C$: $0 - 6 + 20 = 14$.
:::

:::worked-solution[Example 3: Find a Cartesian equation of the plane $\mathbf{r} = (\mathbf{i} + 2\mathbf{j}) + \lambda(\mathbf{i} + 2\mathbf{k}) + \mu(\mathbf{j} - \mathbf{k})$, and write its parametric equations.]
1. Normal: $(\mathbf{i} + 2\mathbf{k}) \times (\mathbf{j} - \mathbf{k}) = \begin{pmatrix} (0)(-1) - (2)(1) \\ (2)(0) - (1)(-1) \\ (1)(1) - (0)(0) \end{pmatrix} = \begin{pmatrix} -2 \\ 1 \\ 1 \end{pmatrix}$.
2. $d = (1, 2, 0) \cdot (-2, 1, 1) = -2 + 2 + 0 = 0$.
3. Plane: $-2x + y + z = 0$, or $2x - y - z = 0$. It passes through the origin.
4. Parametric equations: $x = 1 + \lambda$, $y = 2 + \mu$, $z = 2\lambda - \mu$.
5. Check: $-2(1 + \lambda) + (2 + \mu) + (2\lambda - \mu) = 0$ for all $\lambda$, $\mu$.
:::

To go from Cartesian to vector form, find any three non-collinear points of the plane (choose two coordinates, solve for the third) and use one point with two direction vectors between them.

## Common mistakes

:::mistake{title="Sign of the middle component"}
The $\mathbf{j}$-component is $a_3b_1 - a_1b_3$, i.e. minus $(a_1b_3 - a_3b_1)$. Checking with the scalar product catches this slip every time.
:::

:::mistake{title="Using a point instead of a direction"}
In $\mathbf{r} = \mathbf{a} + \lambda\mathbf{b} + \mu\mathbf{c}$, $\mathbf{b}$ and $\mathbf{c}$ are directions such as $\overrightarrow{AB}$, not position vectors of points.
:::

:::mistake{title="Forgetting the half for a triangle"}
$|\overrightarrow{AB} \times \overrightarrow{AC}|$ is the area of the parallelogram; the triangle is half of it.
:::

:::mistake{title="Order of the vectors"}
$\mathbf{b} \times \mathbf{a} = -\mathbf{a} \times \mathbf{b}$. For a normal or an area the sign does not matter, but for a stated product it does.
:::

## Exam tips

:::exam-tip
Show the determinant and each component; then write the check "$\mathbf{n} \cdot \overrightarrow{AB} = 0$". A wrong normal ruins every later part, so the check is worth the line it takes.
:::

:::exam-tip
Give a plane in the form the question asks for: "Cartesian" means $px + qy + sz = d$; "vector form" may mean $\mathbf{r} \cdot \mathbf{n} = d$ or $\mathbf{r} = \mathbf{a} + \lambda\mathbf{b} + \mu\mathbf{c}$. Exact surds (such as $\frac{5\sqrt{2}}{2}$) are preferred for areas unless a decimal is asked for.
:::

## Summary

:::summary
- $\mathbf{a} \times \mathbf{b}$ by the determinant; it is perpendicular to both $\mathbf{a}$ and $\mathbf{b}$, with magnitude $|\mathbf{a}||\mathbf{b}|\sin\theta$.
- Parallelogram area $|\mathbf{a} \times \mathbf{b}|$; triangle area $\frac{1}{2}|\overrightarrow{AB} \times \overrightarrow{AC}|$.
- Plane: $\mathbf{r} \cdot \mathbf{n} = \mathbf{a} \cdot \mathbf{n}$, Cartesian $px + qy + sz = d$ with normal $(p, q, s)$.
- Vector form $\mathbf{r} = \mathbf{a} + \lambda\mathbf{b} + \mu\mathbf{c}$; normal $\mathbf{b} \times \mathbf{c}$.
:::
