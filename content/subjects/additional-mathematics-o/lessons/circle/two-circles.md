---
{
  "key": "circle.two-circles",
  "title": "Intersecting circles",
  "summary": "Decide whether two circles meet at two points, touch externally or internally, or do not meet, by comparing the distance between their centres with the sum and difference of the radii, and find points of contact, points of intersection and the equation of the common chord.",
  "concepts": ["amath.circle.two-circles"],
  "estimatedMinutes": 35,
  "level": "core"
}
---
## Introduction

Two cellphone masts near Masvingo each cover a circular area. Do the areas overlap, so that a homestead between them gets a signal from both? Do they just touch, or is there a gap? Two ripples spreading on the surface of Lake Kariba cross each other at two points. Questions like these are about two circles, and the answer depends on just three numbers: the two radii and the distance between the centres.

This lesson completes the Cambridge 0606 topic on the coordinate geometry of the circle (item 8.4); it is not in the ZIMSEC syllabus. You need the equation of a circle, completing the square, the distance formula and simultaneous equations.

## Key definitions

:::definition{term="Touching externally"}
Two circles touch externally when they meet at exactly one point and each lies outside the other. The centres are then $r_1 + r_2$ apart.
:::

:::definition{term="Touching internally"}
Two circles touch internally when they meet at exactly one point and the smaller lies inside the larger. The centres are then $|r_1 - r_2|$ apart.
:::

:::definition{term="Common chord"}
The line segment joining the two points where two circles intersect. Its line is perpendicular to the line joining the centres.
:::

:::formula{name="How two circles meet (d = distance between the centres; not in the List of formulas)"}
$$
d > r_1 + r_2: \text{ separate} \qquad d = r_1 + r_2: \text{ touch externally}
$$

$$
|r_1 - r_2| < d < r_1 + r_2: \text{ two points} \qquad d = |r_1 - r_2|: \text{ touch internally} \qquad d < |r_1 - r_2|: \text{ one inside the other}
$$
:::

## Comparing the distance with the radii

Picture two circles sliding towards each other along the line of centres. When they are far apart there is a gap ($d > r_1 + r_2$). They first touch when the gap closes ($d = r_1 + r_2$), then overlap and cross at two points. As the smaller one moves inside the larger, they touch again from the inside ($d = |r_1 - r_2|$), and finally the smaller one sits completely inside without touching ($d < |r_1 - r_2|$). If $d = 0$ the circles are **concentric** (same centre).

The method is always:

1. find each centre and radius (complete the square if necessary);
2. find $d$ with the distance formula;
3. compare $d$ with $r_1 + r_2$ and $|r_1 - r_2|$.

:::worked-solution[Example 1: show that the circles $(x - 1)^2 + (y - 2)^2 = 9$ and $(x - 7)^2 + (y - 10)^2 = 49$ touch externally, and find the point of contact]
1. Centres $C_1(1, 2)$ and $C_2(7, 10)$; radii $r_1 = 3$ and $r_2 = 7$.
2. $d = \sqrt{6^2 + 8^2} = \sqrt{100} = 10$.
3. $r_1 + r_2 = 10 = d$, so the circles touch externally.
4. The point of contact $T$ lies on $C_1C_2$, a distance 3 from $C_1$: that is $\frac{3}{10}$ of the way from $C_1$ to $C_2$.
5. $T = \left(1 + \frac{3}{10}(6), 2 + \frac{3}{10}(8)\right) = (2.8, 4.4)$.
:::

![Circles with centres C1(1, 2), radius 3, and C2(7, 10), radius 7, whose centres are 10 apart, equal to 3 + 7, so they touch externally at T(2.8, 4.4) on the line joining the centres.](media:diagrams/two-circles-touch-externally.png "Figure: the centres are 10 apart, equal to the sum of the radii, so the circles touch at one point T on the line of centres")

## Points of intersection and the common chord

When the circles cross, subtract one equation from the other (both written as $x^2 + y^2 + \ldots = 0$ with coefficient 1 for $x^2$ and $y^2$). The squared terms cancel and leave a **linear** equation: the line of the common chord. Solve it with either circle to get the two points.

:::worked-solution[Example 2: find the points where the circles $x^2 + y^2 = 25$ and $(x - 6)^2 + y^2 = 13$ intersect]
1. Check they cross: $d = 6$, $r_1 = 5$, $r_2 = \sqrt{13} \approx 3.61$. Since $1.39 < 6 < 8.61$, there are two points.
2. Expand the second circle: $x^2 - 12x + 36 + y^2 = 13$, that is $x^2 + y^2 - 12x + 23 = 0$.
3. Subtract from $x^2 + y^2 - 25 = 0$: $(x^2 + y^2 - 25) - (x^2 + y^2 - 12x + 23) = 0$, so $12x - 48 = 0$.
4. The common chord is the line $x = 4$.
5. In the first circle: $16 + y^2 = 25$, so $y = \pm 3$. The points are $(4, 3)$ and $(4, -3)$.
6. Check in the second: $(4 - 6)^2 + 3^2 = 4 + 9 = 13$.
:::

![Circles x^2 + y^2 = 25 (centre origin, radius 5) and (x - 6)^2 + y^2 = 13 (centre (6, 0), radius about 3.61) cross at (4, 3) and (4, -3); the common chord is the vertical line x = 4, at right angles to the line of centres.](media:diagrams/two-circles-common-chord.png "Figure: the circles meet at (4, 3) and (4, −3); the common chord x = 4 is perpendicular to the line of centres")

Notice that the common chord $x = 4$ is vertical while the centres $(0, 0)$ and $(6, 0)$ lie on a horizontal line: the chord is perpendicular to the line of centres, as expected by symmetry.

## Touching internally

:::worked-solution[Example 3: show that the circle $(x - 1)^2 + (y - 5)^2 = 4$ touches the circle $x^2 + y^2 - 2x - 4y - 20 = 0$ internally, and find the point of contact]
1. Complete the square for the second circle: $(x - 1)^2 + (y - 2)^2 = 1 + 4 + 20 = 25$: centre $(1, 2)$, radius 5.
2. The first circle has centre $(1, 5)$ and radius 2.
3. $d = \sqrt{0^2 + 3^2} = 3$ and $|r_1 - r_2| = 5 - 2 = 3 = d$: they touch internally.
4. The contact point is on the line of centres (the vertical line $x = 1$), 5 units from $(1, 2)$ in the direction of $(1, 5)$: it is $(1, 7)$.
5. Check: $(1 - 1)^2 + (7 - 5)^2 = 4$ and $(1 - 1)^2 + (7 - 2)^2 = 25$.
:::

## Problems with an unknown radius

:::worked-solution[Example 4: the circles $x^2 + y^2 = 16$ and $(x - 9)^2 + (y - 12)^2 = k^2$, with $k > 0$, touch. Find the possible values of $k$]
1. Centres $(0, 0)$ and $(9, 12)$; $d = \sqrt{81 + 144} = 15$. Radii 4 and $k$.
2. External touching: $4 + k = 15$, so $k = 11$.
3. Internal touching: $|k - 4| = 15$, so $k = 19$ (the other solution, $k = -11$, is not allowed).
4. So $k = 11$ or $k = 19$. With $k = 19$ the first circle lies inside the second and touches it.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Intersecting circles are examined by Cambridge only. A typical question combines this lesson with the two before it: find centres and radii, decide how the circles meet, then find a point of contact or the common chord.
:::

## Common mistakes

:::mistake{title="Comparing r² values with d"}
Compare $d$ with the radii, not with $r^2$. From $(x - 7)^2 + (y - 10)^2 = 49$ the radius is 7, not 49.
:::

:::mistake{title="Forgetting the internal case"}
$d < r_1 + r_2$ does not guarantee two points of intersection: if also $d < |r_1 - r_2|$, one circle lies inside the other and they do not meet.
:::

:::mistake{title="Subtracting before the x² and y² coefficients match"}
If one equation is $2x^2 + 2y^2 + \ldots = 0$, divide it by 2 first; otherwise the squared terms do not cancel.
:::

:::mistake{title="Putting the contact point at the midpoint of the centres"}
The contact point is $r_1$ from $C_1$ along $C_1C_2$. It is the midpoint only when the radii are equal.
:::

## Exam tips

:::exam-tip
State the comparison explicitly, for example "$d = 10 = 3 + 7 = r_1 + r_2$, so the circles touch externally". The conclusion mark needs the reason.
:::

:::exam-tip
For a point of contact, use the ratio $r_1 : r_2$ along the line of centres (external) or extend $C_1C_2$ beyond the smaller centre (internal), then check the point in both equations.
:::

:::exam-tip
When asked for the common chord, give its equation as a straight line. If the points are also wanted, substitute the chord's equation into the simpler circle.
:::

## Summary

:::summary
- Find both centres and radii, then the distance $d$ between the centres.
- $d > r_1 + r_2$: separate; $d = r_1 + r_2$: touch externally; between $|r_1 - r_2|$ and $r_1 + r_2$: two points; $d = |r_1 - r_2|$: touch internally; smaller: one inside the other.
- A point of contact lies on the line of centres, at distance $r_1$ from $C_1$.
- Subtracting the equations gives the line of the common chord; solve it with one circle for the intersection points.
:::
