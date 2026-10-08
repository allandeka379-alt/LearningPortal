---
{
  "key": "vectors.vector-geometry",
  "title": "Vector geometry: position vectors, ratios and proofs",
  "summary": "Use position vectors, express vectors in terms of two given vectors, divide line segments in a given ratio, and prove that lines are parallel or that points are collinear.",
  "concepts": ["math.vectors.vector-geometry"],
  "objectives": ["zimsec/o-level/mathematics:11.0.1", "zimsec/o-level/mathematics:11.0.3", "cambridge/igcse/mathematics:7.4.1", "cambridge/igcse/mathematics:7.4.2", "cambridge/igcse/mathematics:7.4.3"],
  "estimatedMinutes": 40,
  "level": "extended"
}
---
## Introduction

Draw any triangle, join the midpoints of two of its sides, and the joining line is always parallel to the third side and exactly half as long. You could check this with a ruler on a hundred triangles, but vectors prove it for **every** triangle in three lines of working.

Vector geometry questions often come at the end of a longer vectors question and carry several marks. They ask you to express routes around a diagram in terms of two basic vectors, usually $\mathbf{a}$ and $\mathbf{b}$, and then to use the results to show that lines are parallel or that points lie on a straight line.

You should already be able to add, subtract and multiply vectors by scalars, and you should know that parallel vectors are scalar multiples of each other.

## Key definitions

:::definition{term="Position vector"}
The vector from the origin $O$ to a point. The position vector of $A$ is $\overrightarrow{OA}$, often written $\mathbf{a}$. For $A(4, -1)$ it is $\begin{pmatrix} 4 \\ -1 \end{pmatrix}$.
:::

:::definition{term="Collinear points"}
Points that lie on one straight line.
:::

:::keyfact{title="Results to use"}
- $\overrightarrow{AB} = \overrightarrow{OB} - \overrightarrow{OA} = \mathbf{b} - \mathbf{a}$ (go back to $O$, then out to $B$).
- The midpoint $M$ of $AB$ has $\overrightarrow{OM} = \frac{1}{2}(\mathbf{a} + \mathbf{b})$.
- Two vectors are **parallel** if one is a scalar multiple of the other.
- $A$, $B$, $C$ are **collinear** if $\overrightarrow{AB} = k\overrightarrow{BC}$ (parallel **and** sharing the point $B$).
:::

## Expressing vectors by routes

To write a vector in terms of $\mathbf{a}$ and $\mathbf{b}$, find any route along known vectors from the start to the finish. Going **against** an arrow changes its sign.

:::worked-solution[Example 1: $\overrightarrow{OA} = \mathbf{a}$, $\overrightarrow{OB} = \mathbf{b}$, and $M$ is the midpoint of $AB$]
1. $\overrightarrow{AB} = \overrightarrow{AO} + \overrightarrow{OB} = -\mathbf{a} + \mathbf{b} = \mathbf{b} - \mathbf{a}$.
2. $\overrightarrow{AM} = \frac{1}{2}\overrightarrow{AB} = \frac{1}{2}(\mathbf{b} - \mathbf{a})$.
3. $\overrightarrow{OM} = \overrightarrow{OA} + \overrightarrow{AM} = \mathbf{a} + \frac{1}{2}\mathbf{b} - \frac{1}{2}\mathbf{a} = \frac{1}{2}\mathbf{a} + \frac{1}{2}\mathbf{b}$.
:::

## Dividing a line in a ratio

If $P$ lies on $AB$ with $AP : PB = m : n$, then $P$ is $\frac{m}{m + n}$ of the way from $A$ to $B$, so $\overrightarrow{AP} = \frac{m}{m + n}\overrightarrow{AB}$.

:::worked-solution[Example 2: $AP : PB = 1 : 2$]
1. $AB$ is split into $1 + 2 = 3$ equal parts and $AP$ is one of them: $\overrightarrow{AP} = \frac{1}{3}(\mathbf{b} - \mathbf{a})$.
2. $\overrightarrow{OP} = \mathbf{a} + \frac{1}{3}(\mathbf{b} - \mathbf{a}) = \frac{2}{3}\mathbf{a} + \frac{1}{3}\mathbf{b}$.
3. Check: $P$ is nearer to $A$, and indeed $\mathbf{a}$ has the larger share.
:::

## Proving lines are parallel

:::worked-solution[Example 3: the midpoint theorem]
In triangle $OAB$, $\overrightarrow{OA} = \mathbf{a}$ and $\overrightarrow{OB} = \mathbf{b}$. $M$ is the midpoint of $OA$ and $N$ is the midpoint of $OB$. Show that $MN$ is parallel to $AB$ and half its length.
1. $\overrightarrow{MN} = \overrightarrow{MO} + \overrightarrow{ON} = -\frac{1}{2}\mathbf{a} + \frac{1}{2}\mathbf{b} = \frac{1}{2}(\mathbf{b} - \mathbf{a})$.
2. $\overrightarrow{AB} = \mathbf{b} - \mathbf{a}$.
3. So $\overrightarrow{MN} = \frac{1}{2}\overrightarrow{AB}$: $MN$ is a scalar multiple of $AB$, hence parallel to it, and half its length.
:::

## Proving points are collinear

Parallel is not enough: two parallel lines could be side by side. You also need a **common point**.

:::worked-solution[Example 4: show that $A$, $B$ and $C$ are collinear]
$\overrightarrow{OA} = \mathbf{a}$, $\overrightarrow{OB} = \mathbf{b}$ and $\overrightarrow{OC} = 3\mathbf{b} - 2\mathbf{a}$.
1. $\overrightarrow{AB} = \mathbf{b} - \mathbf{a}$.
2. $\overrightarrow{BC} = \overrightarrow{OC} - \overrightarrow{OB} = 3\mathbf{b} - 2\mathbf{a} - \mathbf{b} = 2\mathbf{b} - 2\mathbf{a} = 2(\mathbf{b} - \mathbf{a})$.
3. $\overrightarrow{BC} = 2\overrightarrow{AB}$, so $AB$ and $BC$ are parallel.
4. They share the point $B$, so $A$, $B$ and $C$ are collinear, with $AB : BC = 1 : 2$.
:::

The same idea works with column vectors. For $A(1, 2)$, $B(3, 5)$ and $C(7, 11)$: $\overrightarrow{AB} = \begin{pmatrix} 2 \\ 3 \end{pmatrix}$ and $\overrightarrow{BC} = \begin{pmatrix} 4 \\ 6 \end{pmatrix} = 2\overrightarrow{AB}$, so the points are collinear.

## A parallelogram problem

:::worked-solution[Example 5: three points in a parallelogram]
$OABC$ is a parallelogram with $\overrightarrow{OA} = \mathbf{a}$ and $\overrightarrow{OC} = \mathbf{c}$. $M$ is the midpoint of $AB$, and $N$ lies on the diagonal $OB$ with $ON : NB = 2 : 1$. Show that $C$, $N$ and $M$ are collinear.
1. $\overrightarrow{AB} = \overrightarrow{OC} = \mathbf{c}$, so $\overrightarrow{OB} = \mathbf{a} + \mathbf{c}$ and $\overrightarrow{OM} = \mathbf{a} + \frac{1}{2}\mathbf{c}$.
2. $\overrightarrow{ON} = \frac{2}{3}(\mathbf{a} + \mathbf{c})$.
3. $\overrightarrow{CN} = \overrightarrow{ON} - \overrightarrow{OC} = \frac{2}{3}\mathbf{a} - \frac{1}{3}\mathbf{c}$.
4. $\overrightarrow{CM} = \overrightarrow{OM} - \overrightarrow{OC} = \mathbf{a} - \frac{1}{2}\mathbf{c}$.
5. $\overrightarrow{CN} = \frac{2}{3}\left(\mathbf{a} - \frac{1}{2}\mathbf{c}\right) = \frac{2}{3}\overrightarrow{CM}$. They are parallel and share $C$, so $C$, $N$ and $M$ are collinear.
:::

## Common mistakes

:::mistake{title="Writing AB as a − b"}
$\overrightarrow{AB}$ is "end minus start": $\mathbf{b} - \mathbf{a}$. Check with the route $A \to O \to B$: $-\mathbf{a} + \mathbf{b}$.
:::

:::mistake{title="Using the wrong fraction for a ratio"}
$AP : PB = 1 : 2$ means $AP$ is $\frac{1}{3}$ of $AB$, not $\frac{1}{2}$. Add the parts of the ratio to find the denominator.
:::

:::mistake{title="Claiming collinearity from parallel vectors alone"}
$\overrightarrow{AB} = 2\overrightarrow{CD}$ shows only that $AB$ and $CD$ are parallel. For collinearity you need two vectors that share a point, such as $\overrightarrow{AB}$ and $\overrightarrow{BC}$.
:::

:::mistake{title="Not simplifying"}
Collect the $\mathbf{a}$ terms and the $\mathbf{b}$ terms: $\mathbf{a} + \frac{1}{3}(\mathbf{b} - \mathbf{a})$ should become $\frac{2}{3}\mathbf{a} + \frac{1}{3}\mathbf{b}$, otherwise scalar multiples are hard to spot.
:::

## Exam tips

:::exam-tip
In "**show that**" parts, write every step as a vector equation along a route, and finish with a sentence: "$\overrightarrow{BC} = 2\overrightarrow{AB}$, so $AB$ is parallel to $BC$; since $B$ is a common point, $A$, $B$ and $C$ are collinear."
:::

:::exam-tip
Later parts usually depend on earlier answers. If you are stuck on a part, use the result given in the question to continue.
:::

:::exam-tip
Take out a common factor to reveal scalar multiples: $2\mathbf{b} - 2\mathbf{a} = 2(\mathbf{b} - \mathbf{a})$.
:::

## Summary

:::summary
- Position vector of $A$: $\overrightarrow{OA} = \mathbf{a}$; then $\overrightarrow{AB} = \mathbf{b} - \mathbf{a}$.
- Midpoint of $AB$: $\frac{1}{2}(\mathbf{a} + \mathbf{b})$; for $AP : PB = m : n$, $\overrightarrow{AP} = \frac{m}{m + n}(\mathbf{b} - \mathbf{a})$.
- Parallel: one vector is a scalar multiple of the other.
- Collinear: parallel vectors with a common point, such as $\overrightarrow{AB} = k\overrightarrow{BC}$.
- Write full conclusions in "show that" questions.
:::
