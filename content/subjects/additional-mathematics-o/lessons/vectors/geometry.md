---
{
  "key": "vectors.geometry",
  "title": "Vector geometry: ratios, collinearity and intersecting lines",
  "summary": "Express vectors in a figure in terms of given vectors, find the position vector of a point dividing a line in a ratio, prove that points are collinear or lines parallel, and find where two lines meet by equating coefficients of non-parallel vectors.",
  "concepts": ["amath.vectors.geometry"],
  "estimatedMinutes": 45,
  "level": "core"
}
---
## Introduction

Vectors turn geometry into algebra. Instead of measuring angles and lengths on a diagram, you describe every line in a figure with two basic vectors, say $\mathbf{a}$ and $\mathbf{b}$, and then let the algebra prove facts: that three points lie on one line, that two lines are parallel, or exactly where two lines cross. A surveyor laying out plots in a new suburb of Gweru uses the same ideas when checking that boundary pegs are in line.

Cambridge 0606 examines vector geometry in structured questions that often run "(a) express ... in terms of $\mathbf{a}$ and $\mathbf{b}$; (b) given that ... find $\lambda$ and $\mu$". The skills are routine once you follow a fixed routine: route-finding, then equating coefficients.

You should be confident with vector notation, $\overrightarrow{AB} = \mathbf{b} - \mathbf{a}$, and parallel vectors.

## Key definitions

:::definition{term="Route-finding"}
Any vector in a figure can be written as a sum of known vectors along a path: $\overrightarrow{AC} = \overrightarrow{AB} + \overrightarrow{BC}$. Going against the direction of a known vector changes its sign.
:::

:::definition{term="Collinear points"}
Points that lie on one straight line. $A$, $B$ and $C$ are collinear when $\overrightarrow{AB} = k\overrightarrow{BC}$ (or $k\overrightarrow{AC}$) for some scalar $k$: the vectors are parallel **and** share the point $B$ (or $A$).
:::

:::definition{term="Dividing a line in a ratio"}
$P$ divides $AB$ in the ratio $m : n$ when $AP : PB = m : n$. Then $\overrightarrow{AP} = \dfrac{m}{m + n}\overrightarrow{AB}$.
:::

:::formula{name="Ratio formula (not in Cambridge's List of formulas)"}
$$
\overrightarrow{OP} = \mathbf{a} + \frac{m}{m + n}(\mathbf{b} - \mathbf{a}) = \frac{n\mathbf{a} + m\mathbf{b}}{m + n}
$$
In particular the midpoint of $AB$ has position vector $\frac{1}{2}(\mathbf{a} + \mathbf{b})$.
:::

:::keyfact{title="Equating coefficients"}
If $\mathbf{a}$ and $\mathbf{b}$ are non-zero and **not parallel**, and $p\mathbf{a} + q\mathbf{b} = r\mathbf{a} + s\mathbf{b}$, then $p = r$ and $q = s$.
:::

## Writing vectors in terms of a and b

In triangle $OAB$ let $\overrightarrow{OA} = \mathbf{a}$ and $\overrightarrow{OB} = \mathbf{b}$. Then:

- $\overrightarrow{AB} = -\mathbf{a} + \mathbf{b} = \mathbf{b} - \mathbf{a}$;
- if $M$ is the midpoint of $AB$, $\overrightarrow{OM} = \mathbf{a} + \frac{1}{2}(\mathbf{b} - \mathbf{a}) = \frac{1}{2}(\mathbf{a} + \mathbf{b})$;
- if $N$ is the midpoint of $OA$, $\overrightarrow{NM} = \overrightarrow{NA} + \overrightarrow{AM} = \frac{1}{2}\mathbf{a} + \frac{1}{2}(\mathbf{b} - \mathbf{a}) = \frac{1}{2}\mathbf{b}$.

The last line proves the midpoint theorem: $NM$ is parallel to $OB$ and half its length, because $\overrightarrow{NM} = \frac{1}{2}\overrightarrow{OB}$.

In a parallelogram $OABC$ with $\overrightarrow{OA} = \mathbf{a}$ and $\overrightarrow{OC} = \mathbf{c}$, opposite sides are equal vectors: $\overrightarrow{CB} = \mathbf{a}$ and $\overrightarrow{AB} = \mathbf{c}$, so $\overrightarrow{OB} = \mathbf{a} + \mathbf{c}$ and $\overrightarrow{AC} = \mathbf{c} - \mathbf{a}$.

## Dividing a line in a ratio

:::worked-solution[Example 1: $A$ is $(-2, 4)$ and $B$ is $(8, -1)$. Find the coordinates of $P$ on $AB$ such that $AP : PB = 2 : 3$.]
1. $\overrightarrow{AB} = (8 - (-2))\mathbf{i} + (-1 - 4)\mathbf{j} = 10\mathbf{i} - 5\mathbf{j}$.
2. $P$ is $\frac{2}{5}$ of the way from $A$ to $B$: $\overrightarrow{AP} = \frac{2}{5}(10\mathbf{i} - 5\mathbf{j}) = 4\mathbf{i} - 2\mathbf{j}$.
3. $\overrightarrow{OP} = \overrightarrow{OA} + \overrightarrow{AP} = (-2 + 4)\mathbf{i} + (4 - 2)\mathbf{j} = 2\mathbf{i} + 2\mathbf{j}$.
4. $P$ is $(2, 2)$. Check with the formula: $\frac{3(-2, 4) + 2(8, -1)}{5} = \frac{(10, 10)}{5} = (2, 2)$. ✓
:::

Note the fraction is $\frac{m}{m + n}$, **not** $\frac{m}{n}$: a ratio $2 : 3$ splits the line into 5 equal parts.

## Collinearity and parallel lines

To show three points are collinear, find two vectors between them that share a point and show one is a multiple of the other.

:::worked-solution[Example 2: $\overrightarrow{OP} = 2\mathbf{a} + \mathbf{b}$, $\overrightarrow{OQ} = 3\mathbf{a} + 3\mathbf{b}$ and $\overrightarrow{OR} = 5\mathbf{a} + 7\mathbf{b}$. Show that $P$, $Q$ and $R$ are collinear and find $PQ : QR$.]
1. $\overrightarrow{PQ} = (3\mathbf{a} + 3\mathbf{b}) - (2\mathbf{a} + \mathbf{b}) = \mathbf{a} + 2\mathbf{b}$.
2. $\overrightarrow{QR} = (5\mathbf{a} + 7\mathbf{b}) - (3\mathbf{a} + 3\mathbf{b}) = 2\mathbf{a} + 4\mathbf{b} = 2(\mathbf{a} + 2\mathbf{b})$.
3. So $\overrightarrow{QR} = 2\overrightarrow{PQ}$: the lines $PQ$ and $QR$ are parallel.
4. They share the point $Q$, so $P$, $Q$ and $R$ lie on one straight line.
5. $PQ : QR = 1 : 2$.
:::

Both facts are needed in step 3 and step 4: parallel vectors alone could lie on two separate parallel lines.

## Where two lines meet: equating coefficients

When two lines cross at an unknown point $X$, write $\overrightarrow{OX}$ in two ways, once along each line, using a different unknown scalar for each. Then equate the coefficients of $\mathbf{a}$ and of $\mathbf{b}$.

:::worked-solution[Example 3: in triangle $OAB$, $\overrightarrow{OA} = \mathbf{a}$ and $\overrightarrow{OB} = \mathbf{b}$. $P$ is the midpoint of $OA$, and $Q$ lies on $AB$ with $AQ : QB = 1 : 2$. The lines $OQ$ and $BP$ meet at $R$. Find $\overrightarrow{OR}$ in terms of $\mathbf{a}$ and $\mathbf{b}$.]
1. $\overrightarrow{OQ} = \mathbf{a} + \frac{1}{3}(\mathbf{b} - \mathbf{a}) = \frac{2}{3}\mathbf{a} + \frac{1}{3}\mathbf{b}$, and $\overrightarrow{BP} = \frac{1}{2}\mathbf{a} - \mathbf{b}$.
2. Along $OQ$: $\overrightarrow{OR} = \lambda\overrightarrow{OQ} = \frac{2\lambda}{3}\mathbf{a} + \frac{\lambda}{3}\mathbf{b}$.
3. Along $BP$: $\overrightarrow{OR} = \overrightarrow{OB} + \mu\overrightarrow{BP} = \frac{\mu}{2}\mathbf{a} + (1 - \mu)\mathbf{b}$.
4. $\mathbf{a}$: $\frac{2\lambda}{3} = \frac{\mu}{2}$, so $\mu = \frac{4\lambda}{3}$. $\mathbf{b}$: $\frac{\lambda}{3} = 1 - \mu$.
5. Substitute: $\frac{\lambda}{3} = 1 - \frac{4\lambda}{3}$, so $\frac{5\lambda}{3} = 1$, $\lambda = \frac{3}{5}$ and $\mu = \frac{4}{5}$.
6. $\overrightarrow{OR} = \frac{3}{5}\left(\frac{2}{3}\mathbf{a} + \frac{1}{3}\mathbf{b}\right) = \frac{2}{5}\mathbf{a} + \frac{1}{5}\mathbf{b}$. So $R$ is $\frac{3}{5}$ of the way along $OQ$ and $\frac{4}{5}$ of the way from $B$ to $P$.
:::

Equating coefficients is valid only because $\mathbf{a}$ and $\mathbf{b}$ are not parallel: no multiple of $\mathbf{a}$ can ever equal a multiple of $\mathbf{b}$ unless both are zero.

:::keyfact{title="ZIMSEC and Cambridge"}
Vector geometry is in Cambridge 0606 only. The ideas of route-finding and splitting a vector into two directions reappear for ZIMSEC candidates when forces are resolved in Mechanics.
:::

## Common mistakes

:::mistake{title="Using m/n instead of m/(m + n)"}
For $AP : PB = 1 : 3$, $\overrightarrow{AP} = \frac{1}{4}\overrightarrow{AB}$, not $\frac{1}{3}\overrightarrow{AB}$.
:::

:::mistake{title="Sign errors on a route"}
Travelling from $A$ to $O$ is $-\mathbf{a}$. Write the route first ($\overrightarrow{AB} = \overrightarrow{AO} + \overrightarrow{OB}$) and then substitute.
:::

:::mistake{title="Same letter for both scalars"}
When writing $\overrightarrow{OR}$ along two different lines, use two different unknowns ($\lambda$ and $\mu$). Using $\lambda$ twice forces a wrong answer.
:::

:::mistake{title="Collinear means more than parallel"}
$\overrightarrow{AB} = k\overrightarrow{CD}$ shows $AB$ and $CD$ are parallel, not that $A$, $B$, $C$, $D$ are collinear. A shared point is needed.
:::

## Exam tips

:::exam-tip
When asked to "show" collinearity, end with a sentence: "$\overrightarrow{QR} = 2\overrightarrow{PQ}$, so $PQ$ is parallel to $QR$, and $Q$ is a common point, so $P$, $Q$, $R$ are collinear."
:::

:::exam-tip
Simplify every vector to the form $p\mathbf{a} + q\mathbf{b}$ before equating coefficients, and say "since $\mathbf{a}$ and $\mathbf{b}$ are not parallel".
:::

:::exam-tip
Check your final $\lambda$ and $\mu$ make sense: a point between two ends of a segment has a scalar between 0 and 1.
:::

## Summary

:::summary
- Find vectors in a figure by routes: $\overrightarrow{AC} = \overrightarrow{AB} + \overrightarrow{BC}$, with a sign change against a known direction.
- $P$ dividing $AB$ in the ratio $m : n$: $\overrightarrow{OP} = \mathbf{a} + \frac{m}{m + n}(\mathbf{b} - \mathbf{a})$; the midpoint is $\frac{1}{2}(\mathbf{a} + \mathbf{b})$.
- Collinear: one vector is a multiple of another **and** they share a point.
- At an intersection, write the position vector along each line with different scalars and equate coefficients of the non-parallel vectors $\mathbf{a}$ and $\mathbf{b}$.
:::
