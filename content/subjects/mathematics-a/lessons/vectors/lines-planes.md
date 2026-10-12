---
{
  "key": "vectors.lines-planes",
  "title": "Lines and planes: angles, intersections and distances",
  "summary": "Find the angle between a line and a plane and between two planes, decide whether a line lies in, is parallel to or meets a plane and find the point of intersection, find the line of intersection of two planes, and the perpendicular distance from a point to a plane.",
  "concepts": ["amaths.vectors.lines-planes"],
  "estimatedMinutes": 50,
  "level": "core"
}
---
## Introduction

Surveyors setting out a roof truss, engineers checking that a conveyor belt meets the floor of a Hwange coal shed at the right angle, and architects designing the sloping faces of a building all combine lines and planes. Once you can write the equation of a plane, a small set of methods answers almost every question about how lines and planes meet.

ZIMSEC Pure Mathematics examines these in Form 6 (topic 6.2.2.3): angles between lines and planes and between planes, intersections, the line of intersection of two planes, and the perpendicular distance from a point to a plane. Cambridge 9709 does not include planes, so this lesson is for ZIMSEC candidates. You need the vector equation of a line, the scalar and vector products, and the equations of a plane.

## Key definitions

:::definition{term="Angle between a line and a plane"}
The angle $\phi$ between a line and its projection (shadow) on the plane. If the line has direction $\mathbf{b}$ and the plane has normal $\mathbf{n}$, the angle between $\mathbf{b}$ and $\mathbf{n}$ is $90° - \phi$.
:::

:::definition{term="Angle between two planes"}
The acute angle between their normals (equivalently, between the planes themselves).
:::

:::formula{name="Angles"}
$$
\sin\phi = \frac{|\mathbf{b} \cdot \mathbf{n}|}{|\mathbf{b}||\mathbf{n}|} \;\text{(line and plane)}, \qquad \cos\theta = \frac{|\mathbf{n}_1 \cdot \mathbf{n}_2|}{|\mathbf{n}_1||\mathbf{n}_2|} \;\text{(two planes)}
$$
:::

:::formula{name="Perpendicular distance from a point to a plane"}
From the point $(x_1, y_1, z_1)$ to the plane $px + qy + sz = d$:
$$
\text{distance} = \frac{|px_1 + qy_1 + sz_1 - d|}{\sqrt{p^2 + q^2 + s^2}}
$$
:::

## A line and a plane

Write the line as $\mathbf{r} = \mathbf{a} + t\mathbf{b}$ and substitute its general point into the plane's Cartesian equation. You get a linear equation in $t$, and there are three cases:

| Outcome of the substitution | Meaning |
|---|---|
| one value of $t$ | the line meets the plane at one point |
| no solution (an equation such as $0 = 5$) | the line is parallel to the plane and does not meet it |
| true for every $t$ ($0 = 0$) | the line lies in the plane |

A quicker test for the last two: $\mathbf{b} \cdot \mathbf{n} = 0$ means the line is parallel to the plane; then check whether the point $\mathbf{a}$ satisfies the plane equation.

:::worked-solution[Example 1: Find the point where the line $\mathbf{r} = (\mathbf{i} + 2\mathbf{j} - \mathbf{k}) + t(2\mathbf{i} - \mathbf{j} + 3\mathbf{k})$ meets the plane $x + y + 2z = 15$, and the angle between the line and the plane.]
1. General point: $(1 + 2t,\; 2 - t,\; -1 + 3t)$.
2. Substitute: $(1 + 2t) + (2 - t) + 2(-1 + 3t) = 15$, so $1 + 7t = 15$ and $t = 2$.
3. Point of intersection: $(5, 0, 5)$. Check: $5 + 0 + 10 = 15$.
4. $\mathbf{b} \cdot \mathbf{n} = 2 - 1 + 6 = 7$, $|\mathbf{b}| = \sqrt{14}$, $|\mathbf{n}| = \sqrt{6}$.
5. $\sin\phi = \dfrac{7}{\sqrt{14}\sqrt{6}} = \dfrac{7}{\sqrt{84}} = 0.7638$, so $\phi = 49.8°$.
:::

![Side view of the plane x + y + 2z = 15 seen edge-on and the line with direction (2, -1, 3) meeting it at (5, 0, 5): the angle phi between the line and the plane is 49.8 degrees, while the angle between the line and the normal n = (1, 1, 2) is 40.2 degrees, so sin phi, not cos, comes from the dot product.](media:diagrams/vector-line-meets-plane-angle.png "Figure: the angle with the plane (49.8°) and the angle with the normal (40.2°) add to 90°")

The most common slip is to use $\cos$ here: $\cos^{-1}(0.7638) = 40.2°$ is the angle between the line and the **normal**, not the plane.

## Two planes

Two planes that are not parallel meet in a **line**. Its direction is perpendicular to both normals, so it is $\mathbf{n}_1 \times \mathbf{n}_2$. To find a point on it, set one coordinate (often $z = 0$) and solve the two plane equations simultaneously for the other two.

:::worked-solution[Example 2: The planes $\Pi_1: 2x - y + 2z = 3$ and $\Pi_2: x + 2y - 2z = 4$ meet in a line $L$. Find the acute angle between the planes and a vector equation of $L$.]
1. Normals: $\mathbf{n}_1 = (2, -1, 2)$, $\mathbf{n}_2 = (1, 2, -2)$; $|\mathbf{n}_1| = |\mathbf{n}_2| = 3$.
2. $\mathbf{n}_1 \cdot \mathbf{n}_2 = 2 - 2 - 4 = -4$, so $\cos\theta = \dfrac{4}{9}$ and $\theta = 63.6°$.
3. Direction of $L$: $\mathbf{n}_1 \times \mathbf{n}_2 = \big((-1)(-2) - (2)(2),\; (2)(1) - (2)(-2),\; (2)(2) - (-1)(1)\big) = (-2, 6, 5)$.
4. A point: put $z = 0$: $2x - y = 3$ and $x + 2y = 4$ give $x = 2$, $y = 1$.
5. Check $(2, 1, 0)$: $4 - 1 + 0 = 3$ and $2 + 2 - 0 = 4$.
6. $L$: $\mathbf{r} = (2\mathbf{i} + \mathbf{j}) + s(-2\mathbf{i} + 6\mathbf{j} + 5\mathbf{k})$.
:::

Planes with parallel normals are parallel (or the same plane, if the equations are multiples of each other).

## Perpendicular distance from a point to a plane

The shortest distance from a point $P$ to a plane is along the normal. Either use the formula, or find the **foot of the perpendicular** $F$: the line through $P$ with direction $\mathbf{n}$ meets the plane at $F$, and the distance is $|PF|$.

:::worked-solution[Example 3: Find the perpendicular distance from $P(4, -1, 3)$ to the plane $2x - y + 2z = 3$, and the foot of the perpendicular.]
1. Formula: $\dfrac{|2(4) - (-1) + 2(3) - 3|}{\sqrt{4 + 1 + 4}} = \dfrac{|8 + 1 + 6 - 3|}{3} = \dfrac{12}{3} = 4$.
2. Foot: the line $\mathbf{r} = (4, -1, 3) + t(2, -1, 2)$ meets the plane when $2(4 + 2t) - (-1 - t) + 2(3 + 2t) = 3$.
3. $15 + 9t = 3$, so $t = -\dfrac{4}{3}$.
4. $F = \left(4 - \dfrac{8}{3},\; -1 + \dfrac{4}{3},\; 3 - \dfrac{8}{3}\right) = \left(\dfrac{4}{3}, \dfrac{1}{3}, \dfrac{1}{3}\right)$.
5. Check: $|PF| = \dfrac{4}{3} \times |\mathbf{n}| = \dfrac{4}{3} \times 3 = 4$.
:::

![Sketch of the plane 2x - y + 2z = 3 and the point P(4, -1, 3) above it: the shortest distance is along the normal n = (2, -1, 2) to the foot F(4/3, 1/3, 1/3), and the distance PF is 4, the same as the formula gives.](media:diagrams/vector-point-to-plane-distance.png "Figure: the shortest distance from P to the plane is along the normal, meeting the plane at F")

The same idea finds the **reflection** of $P$ in the plane: go twice as far along the normal, $P' = P + 2(F - P)$. The distance between two **parallel** planes $\mathbf{r} \cdot \mathbf{n} = d_1$ and $\mathbf{r} \cdot \mathbf{n} = d_2$ is $\dfrac{|d_1 - d_2|}{|\mathbf{n}|}$.

## Common mistakes

:::mistake{title="Cos instead of sin for a line and a plane"}
The normal makes $90° - \phi$ with the line, so the angle with the plane uses $\sin\phi = \frac{|\mathbf{b} \cdot \mathbf{n}|}{|\mathbf{b}||\mathbf{n}|}$.
:::

:::mistake{title="Using a point as the direction of the line of intersection"}
The direction is $\mathbf{n}_1 \times \mathbf{n}_2$; a point on the line must satisfy **both** plane equations.
:::

:::mistake{title="Forgetting the modulus in the distance formula"}
A negative value of $px_1 + qy_1 + sz_1 - d$ only says which side of the plane the point is on; a distance is positive.
:::

:::mistake{title="Not normalising"}
The distance formula divides by $|\mathbf{n}| = \sqrt{p^2 + q^2 + s^2}$. Without it the answer is scaled by the length of the normal.
:::

## Exam tips

:::exam-tip
In a "show that the line lies in the plane" question, show both facts: $\mathbf{b} \cdot \mathbf{n} = 0$ AND the point $\mathbf{a}$ satisfies the plane. One alone only shows the line is parallel.
:::

:::exam-tip
Check every answer: an intersection point must satisfy both the line and the plane; a point on a line of intersection must satisfy both planes. Give angles to 1 decimal place and distances exactly where possible.
:::

## Summary

:::summary
- Line–plane angle: $\sin\phi = \frac{|\mathbf{b} \cdot \mathbf{n}|}{|\mathbf{b}||\mathbf{n}|}$; plane–plane angle: $\cos\theta = \frac{|\mathbf{n}_1 \cdot \mathbf{n}_2|}{|\mathbf{n}_1||\mathbf{n}_2|}$.
- Line and plane: substitute the general point; one solution (meets), none (parallel), all $t$ (lies in it).
- Line of intersection of two planes: direction $\mathbf{n}_1 \times \mathbf{n}_2$, point from setting one coordinate to zero.
- Distance from a point to $px + qy + sz = d$: $\frac{|px_1 + qy_1 + sz_1 - d|}{\sqrt{p^2 + q^2 + s^2}}$; foot of perpendicular along the normal.
:::
