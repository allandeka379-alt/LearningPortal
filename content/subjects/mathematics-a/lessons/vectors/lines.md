---
{
  "key": "vectors.lines",
  "title": "Vector equations of lines in three dimensions",
  "summary": "Write the vector equation r = a + tb of a line from a point and a direction or from two points, decide whether two lines are parallel, intersect or are skew, find the point of intersection and the angle between lines, and find the foot of the perpendicular from a point to a line.",
  "concepts": ["amaths.vectors.lines"],
  "estimatedMinutes": 55,
  "level": "core"
}
---
## Introduction

Two aircraft leave Robert Gabriel Mugabe International Airport on straight flight paths at different heights. Will their paths cross? How close does each come to a radio mast? In three dimensions two straight lines usually do **not** meet, even when they are not parallel, which makes such questions more interesting than in the plane.

This lesson describes a straight line with a vector equation and uses it to answer exactly those questions. Cambridge examines it in Paper 3 (A Level only, topic 3.7), usually as a long final question; ZIMSEC in Pure Mathematics Form 6 (topic 6.2.2), where the Cartesian form of the line is also required. You need position vectors and the scalar product from the previous two lessons.

## Key definitions

:::definition{term="Vector equation of a line"}
The line through the point with position vector $\mathbf{a}$, parallel to the vector $\mathbf{b}$, has equation $\mathbf{r} = \mathbf{a} + t\mathbf{b}$. Here $\mathbf{r}$ is the position vector of a general point on the line, $\mathbf{b}$ is a **direction vector**, and the parameter $t$ takes every real value, one value for each point.
:::

:::definition{term="Parallel, intersecting and skew lines"}
Two lines are **parallel** if their direction vectors are multiples of each other. Lines that are not parallel either **intersect** (meet at one point) or are **skew** (do not meet). Skew lines exist only in three dimensions.
:::

:::formula{name="Line through two points"}
$$
\mathbf{r} = \mathbf{a} + t(\mathbf{b} - \mathbf{a})
$$
:::

None of these is on MF19; learn them. A line has many correct equations: any point on it can be used for $\mathbf{a}$ and any non-zero multiple of the direction for $\mathbf{b}$.

## Writing the equation

:::worked-solution[Example 1: find a vector equation of the line through $A(1, -2, 3)$ and $B(4, 0, 2)$, and show that $C(7, 2, 1)$ lies on it.]
1. Direction: $\overrightarrow{AB} = 3\mathbf{i} + 2\mathbf{j} - \mathbf{k}$.
2. Equation: $\mathbf{r} = \mathbf{i} - 2\mathbf{j} + 3\mathbf{k} + t(3\mathbf{i} + 2\mathbf{j} - \mathbf{k})$.
3. For $C$: the $x$-coordinate gives $1 + 3t = 7$, so $t = 2$.
4. Check the others with $t = 2$: $y = -2 + 4 = 2$ and $z = 3 - 2 = 1$. All three agree, so $C$ is on the line.
:::

A point lies on a line only if **one** value of $t$ fits all three components.

## Two lines: parallel, intersecting or skew

1. If the direction vectors are multiples of each other, the lines are parallel (or the same line).
2. Otherwise, set the general points equal: three equations in the two parameters $s$ and $t$.
3. Solve two of the equations. Substitute into the third.
4. If the third equation is satisfied, the lines intersect: substitute back to find the point. If not, they are skew.

:::worked-solution[Example 2 (exam style): the lines $l_1$ and $l_2$ have equations $\mathbf{r} = \mathbf{i} + 2\mathbf{j} + s(2\mathbf{i} - \mathbf{j} + \mathbf{k})$ and $\mathbf{r} = 4\mathbf{i} - \mathbf{j} + t(\mathbf{i} + \mathbf{j} + 2\mathbf{k})$. (a) Show that the lines intersect and find the point of intersection. (b) Find the acute angle between the lines.]
1. (a) The directions are not multiples, so the lines are not parallel.
2. Equate components: $1 + 2s = 4 + t$, $2 - s = -1 + t$, $s = 2t$.
3. Substitute $s = 2t$ into the second: $2 - 2t = -1 + t$, so $t = 1$ and $s = 2$.
4. Check the first: $1 + 4 = 5$ and $4 + 1 = 5$. Consistent, so the lines intersect.
5. Point: $s = 2$ in $l_1$ gives $(5, 0, 2)$.
6. (b) $(2\mathbf{i} - \mathbf{j} + \mathbf{k}) \cdot (\mathbf{i} + \mathbf{j} + 2\mathbf{k}) = 2 - 1 + 2 = 3$; both magnitudes are $\sqrt{6}$.
7. $\cos\theta = \dfrac{3}{6} = \dfrac{1}{2}$, so the angle is $60°$.
:::

The angle between two lines is always the angle between their **direction vectors**; if it comes out obtuse, subtract it from $180°$.

:::worked-solution[Example 3: show that $l_1$ above and the line $l_3$: $\mathbf{r} = \mathbf{j} + 4\mathbf{k} + u(\mathbf{i} + 2\mathbf{j} - \mathbf{k})$ are skew.]
1. Directions $2\mathbf{i} - \mathbf{j} + \mathbf{k}$ and $\mathbf{i} + 2\mathbf{j} - \mathbf{k}$ are not multiples: not parallel.
2. Equate: $1 + 2s = u$, $2 - s = 1 + 2u$, $s = 4 - u$.
3. From the first and third: $s = 4 - (1 + 2s)$, so $3s = 3$, $s = 1$ and $u = 3$.
4. Second equation: left side $2 - 1 = 1$, right side $1 + 6 = 7$. Not equal.
5. The lines do not meet and are not parallel, so they are skew.
:::

## The foot of a perpendicular

The point $F$ on a line closest to a point $P$ is the **foot of the perpendicular** from $P$. Write $F$ in terms of the parameter, then use $\overrightarrow{PF} \cdot \mathbf{b} = 0$.

:::worked-solution[Example 4: find the foot of the perpendicular from $P(5, 3, -1)$ to $l_1$, and the perpendicular distance from $P$ to $l_1$.]
1. General point of $l_1$: $F = (1 + 2s, 2 - s, s)$.
2. $\overrightarrow{PF} = (2s - 4)\mathbf{i} + (-1 - s)\mathbf{j} + (s + 1)\mathbf{k}$.
3. Perpendicular to the direction: $2(2s - 4) - (-1 - s) + (s + 1) = 0$, so $6s - 6 = 0$ and $s = 1$.
4. Foot: $F(3, 1, 1)$.
5. $\overrightarrow{PF} = -2\mathbf{i} - 2\mathbf{j} + 2\mathbf{k}$, so the distance is $\sqrt{12} = 2\sqrt{3} = 3.46$.
:::

## Cartesian equations (ZIMSEC)

Writing $\mathbf{r} = x\mathbf{i} + y\mathbf{j} + z\mathbf{k}$ and eliminating $t$ from $\mathbf{r} = \mathbf{a} + t\mathbf{b}$ gives the Cartesian form

$$
\frac{x - a_1}{b_1} = \frac{y - a_2}{b_2} = \frac{z - a_3}{b_3} \; (= t).
$$

The line in Example 1 is $\dfrac{x - 1}{3} = \dfrac{y + 2}{2} = \dfrac{z - 3}{-1}$. Read the point from the numerators (with signs reversed) and the direction from the denominators.

:::keyfact{title="ZIMSEC and Cambridge"}
Cambridge: A Level only (Paper 3, topic 3.7), vector form only; the shortest distance between skew lines is not required. ZIMSEC (Pure Mathematics, Form 6) also uses Cartesian equations of lines, and continues to planes in a separate topic.
:::

## Common mistakes

:::mistake{title="Using the same parameter for both lines"}
Give the two lines different parameters ($s$ and $t$); the point of intersection usually has different parameter values on each line.
:::

:::mistake{title="Not checking the third equation"}
Two equations in $s$ and $t$ always have a solution; only the third shows whether the lines really meet.
:::

:::mistake{title="Using position vectors for the angle"}
The angle between lines uses the direction vectors, not the points $\mathbf{a}$.
:::

:::mistake{title="Skew or parallel?"}
Non-intersecting lines are skew only if they are not parallel. Check the directions first.
:::

## Exam tips

:::exam-tip
Write "$\mathbf{r} = \ldots$" in full; an equation without "$\mathbf{r} =$" often loses the final mark.
:::

:::exam-tip
"Show that the lines intersect" needs all three components checked and the point stated.
:::

:::exam-tip
For a foot of a perpendicular, always form $\overrightarrow{PF}$ in terms of the parameter before taking the scalar product.
:::

## Summary

:::summary
- Line through $\mathbf{a}$ with direction $\mathbf{b}$: $\mathbf{r} = \mathbf{a} + t\mathbf{b}$; through $A$ and $B$: $\mathbf{r} = \mathbf{a} + t(\mathbf{b} - \mathbf{a})$.
- Parallel: directions are multiples. Otherwise solve two component equations and test the third: consistent means intersecting, inconsistent means skew.
- The angle between lines comes from the scalar product of the direction vectors (give the acute angle).
- Foot of the perpendicular from $P$: solve $\overrightarrow{PF} \cdot \mathbf{b} = 0$; the distance is $|\overrightarrow{PF}|$.
- ZIMSEC: Cartesian form $\frac{x - a_1}{b_1} = \frac{y - a_2}{b_2} = \frac{z - a_3}{b_3}$.
:::
