---
{
  "key": "complex.loci",
  "title": "Loci in the Argand diagram",
  "summary": "Interpret |z − a| as a distance and arg(z − a) as a direction to recognise circles, discs, perpendicular bisectors and half-lines, shade regions defined by several conditions, and find the greatest and least values of |z| and arg z in a region.",
  "concepts": ["amaths.complex.loci"],
  "estimatedMinutes": 50,
  "level": "core"
}
---
## Introduction

A locus is the set of all points that satisfy a condition. In the Argand diagram, conditions on complex numbers become geometry: "$z$ is 3 units from $2 + \mathrm{i}$" is a circle, "$z$ is equally far from $1$ and $\mathrm{i}$" is a straight line. Once you can read the condition as a distance or a direction, the sketch follows, and many "find the greatest value" questions become simple geometry with right-angled triangles.

Cambridge examines loci in Paper 3 (A Level only, topic 3.9): typically a sketch of a region defined by two or three inequalities followed by a greatest or least value. ZIMSEC asks learners to "illustrate equations and inequalities involving complex numbers by loci" in Form 6 (topic 6.7).

## Key definitions

:::definition{term="Distance between two points"}
$|z - a|$ is the distance between the point $z$ and the fixed point $a$. Note the minus sign: $|z + 2 - \mathrm{i}| = |z - (-2 + \mathrm{i})|$ is the distance from $-2 + \mathrm{i}$.
:::

:::definition{term="Direction from a point"}
$\arg(z - a)$ is the angle that the line from $a$ to $z$ makes with the positive real direction.
:::

The four standard loci (with $a$, $b$ fixed complex numbers, $k > 0$ real):

| Condition | Locus |
| --- | --- |
| $\lvert z - a\rvert = k$ | circle, centre $a$, radius $k$ |
| $\lvert z - a\rvert \le k$ | disc: the circle and its inside |
| $\lvert z - a\rvert = \lvert z - b\rvert$ | perpendicular bisector of the segment from $a$ to $b$ |
| $\arg(z - a) = \alpha$ | half-line from $a$ (not including $a$) at angle $\alpha$ |

Strict inequalities ($<$, $>$) exclude the boundary, which is drawn dashed; $\le$ and $\ge$ include it (solid line). Neither MF19 nor the ZIMSEC syllabus prints these results.

## Circles and discs

Rewrite the condition in the form $|z - a| = k$ to read off the centre and radius. If $z$ has a coefficient, divide it out first: $|2z - 6| = 8$ means $2|z - 3| = 8$, so $|z - 3| = 4$.

:::worked-solution[Example 1: describe the locus $|z - 3 + 2\mathrm{i}| = 4$ and find its Cartesian equation]
1. Write it as $|z - (3 - 2\mathrm{i})| = 4$: the distance from $3 - 2\mathrm{i}$ is always 4.
2. So the locus is the circle with centre $(3, -2)$ and radius 4.
3. With $z = x + \mathrm{i}y$: $|(x - 3) + \mathrm{i}(y + 2)| = 4$.
4. Square: $(x - 3)^2 + (y + 2)^2 = 16$.
:::

## Perpendicular bisectors

$|z - a| = |z - b|$ says $z$ is equally far from $a$ and $b$, so $z$ lies on the perpendicular bisector of the line segment joining them. The inequality $|z - a| < |z - b|$ is the half-plane on $a$'s side of that line (points nearer to $a$).

:::worked-solution[Example 2: find the Cartesian equation of the locus $|z - 2\mathrm{i}| = |z + 4|$]
1. The locus is the perpendicular bisector of the segment from $(0, 2)$ to $(-4, 0)$.
2. With $z = x + \mathrm{i}y$: $x^2 + (y - 2)^2 = (x + 4)^2 + y^2$.
3. Expand: $x^2 + y^2 - 4y + 4 = x^2 + 8x + 16 + y^2$.
4. Simplify: $-4y = 8x + 12$, so $y = -2x - 3$.
5. Check: the midpoint $(-2, 1)$ lies on it ($-2(-2) - 3 = 1$), and the gradient $-2$ is perpendicular to the gradient $\frac{1}{2}$ of the segment.
:::

![Argand diagram with the points 2i and -4 joined by a dashed segment and the locus |z - 2i| = |z + 4|, the perpendicular bisector y = -2x - 3, passing through the midpoint (-2, 1): every point on this line is equally far from 2i and from -4.](media:diagrams/locus-perpendicular-bisector.png "Figure: points equidistant from 2i and −4 lie on the perpendicular bisector y = −2x − 3")

## Half-lines

$\arg(z - a) = \alpha$ is a ray starting at $a$ and going off at angle $\alpha$. The point $a$ itself is excluded, because $\arg 0$ is undefined. For example $\arg(z - 1 - \mathrm{i}) = \frac{\pi}{4}$ starts at $(1, 1)$ and goes up and to the right at $45^\circ$; $\arg(z + 2) = -\frac{\pi}{2}$ starts at $(-2, 0)$ and goes straight down. A region such as $0 \le \arg(z - a) \le \frac{\pi}{3}$ is the sector between two half-lines from $a$.

## Regions defined by several conditions

Draw each boundary, decide which side each inequality keeps, and shade the overlap. For instance, $|z| \le 3$ together with $\mathrm{Re}\, z \ge 1$ is the part of the disc of radius 3 about the origin that lies on or to the right of the line $x = 1$. Label the key points and say which boundaries are included.

## Greatest and least values

Two facts do most of the work:

- For points on or inside the circle $|z - c| = r$ (with the origin outside), the distance from the origin ranges from $|c| - r$ to $|c| + r$. The extreme points lie on the line through $O$ and the centre.
- The greatest and least arguments occur where a half-line from $O$ just touches the circle (a tangent), so the radius meets that half-line at a right angle. The angle between $Oc$ and the tangent is $\sin^{-1}\frac{r}{|c|}$.

:::worked-solution[Example 3 (exam style): the complex number $z$ satisfies $|z + 3 - 4\mathrm{i}| \le 1$. (a) Describe the region. (b) Find the greatest and least values of $|z|$. (c) Find the greatest value of $\arg z$.]
1. (a) $|z - (-3 + 4\mathrm{i})| \le 1$: the disc with centre $c = -3 + 4\mathrm{i}$ and radius 1, including the circle.
2. (b) $|c| = \sqrt{9 + 16} = 5$. Greatest $|z| = 5 + 1 = 6$; least $|z| = 5 - 1 = 4$.
3. (c) $\arg c = \pi - \tan^{-1}\frac{4}{3} = 2.2143$ (second quadrant).
4. The tangent from $O$ makes an angle $\sin^{-1}\frac{1}{5} = 0.2014$ with $Oc$, because the radius to the point of contact is perpendicular to the tangent.
5. Greatest $\arg z = 2.2143 + 0.2014 = 2.42$ radians (3 s.f.).
6. Similarly the least argument is $2.2143 - 0.2014 = 2.01$ radians.
:::

![Argand diagram of the disc |z + 3 - 4i| <= 1, centre -3 + 4i radius 1, with the line from the origin through the centre of length 5: the point of the disc nearest the origin has |z| = 4 and the farthest has |z| = 6, and the two tangents from the origin touch the circle where arg z is greatest (2.42 radians) and least (2.01 radians).](media:diagrams/locus-disc-extreme-modulus-argument.png "Figure: the disc, the nearest and farthest points from O, and the two tangents from O")

The point of the region nearest the origin lies on the line $Oc$ at distance 4, that is $\frac{4}{5}(-3 + 4\mathrm{i}) = -2.4 + 3.2\mathrm{i}$.

:::keyfact{title="ZIMSEC and Cambridge"}
Cambridge Paper 3 expects neat sketches with correct centres, radii, bisectors and half-lines, then a greatest or least value from the geometry. ZIMSEC (Form 6) uses the same loci; it may also ask for Cartesian equations of the loci, which you get by writing $z = x + \mathrm{i}y$ and squaring moduli.
:::

## Common mistakes

:::mistake{title="Wrong sign for the centre"}
$|z + 3 - 4\mathrm{i}| = 1$ has centre $-3 + 4\mathrm{i}$, not $3 - 4\mathrm{i}$. Rewrite as $|z - a|$ first.
:::

:::mistake{title="Drawing a full line for arg"}
$\arg(z - a) = \alpha$ is only a half-line starting at $a$; draw an open circle at $a$.
:::

:::mistake{title="Forgetting to divide out a coefficient"}
$|3z - 6\mathrm{i}| = 9$ is the circle $|z - 2\mathrm{i}| = 3$, radius 3, not 9.
:::

:::mistake{title="Using tan instead of sin for the tangent angle"}
In the right-angled triangle formed by $O$, the centre and the point of contact, the hypotenuse is $|c|$ and the opposite side is $r$: the angle is $\sin^{-1}\frac{r}{|c|}$.
:::

## Exam tips

:::exam-tip
Mark centres and the ends of half-lines with their coordinates on your sketch, and use solid or dashed lines to show which boundaries are included.
:::

:::exam-tip
For "greatest $|z|$" and "greatest $\arg z$" questions, draw the right-angled triangle you are using; it carries the method marks.
:::

:::exam-tip
Give exact values where they exist ($\frac{\pi}{2} + \sin^{-1}\frac{3}{5}$) or 3 significant figures in radians.
:::

## Summary

:::summary
- $|z - a|$ is the distance from $a$; $\arg(z - a)$ is the direction from $a$.
- $|z - a| = k$: circle. $|z - a| \le k$: disc. $|z - a| = |z - b|$: perpendicular bisector. $\arg(z - a) = \alpha$: half-line from $a$.
- Shade overlaps for several conditions; dashed boundaries for strict inequalities.
- For a disc centre $c$, radius $r$: $|z|$ runs from $|c| - r$ to $|c| + r$; extreme arguments are $\arg c \pm \sin^{-1}\frac{r}{|c|}$.
:::
