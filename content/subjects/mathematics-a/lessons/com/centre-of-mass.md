---
{
  "key": "com.centre-of-mass",
  "title": "Centre of mass, suspension and toppling",
  "summary": "Find the centre of mass of systems of particles, standard uniform bodies and composite laminas (including laminas with parts removed), the angle a suspended lamina makes with the vertical, and whether a body on an inclined plane slides or topples first.",
  "concepts": ["amaths.com.centre-of-mass"],
  "estimatedMinutes": 50,
  "level": "core"
}
---
## Introduction

Why does a loaded scotch cart tip over on a steep bank while an empty one does not? Why does a signboard hung from one corner settle at a particular angle? Both answers depend on the **centre of mass**: the single point at which the whole weight of a body can be taken to act.

ZIMSEC Mechanics examines centre of mass in Form 6 (topic 6.7): systems of particles, the standard uniform bodies, composite laminas, bodies suspended from a point, and sliding or toppling on an inclined plane. Cambridge 9709 Paper 4 treats bodies as particles, so this lesson is for ZIMSEC candidates. You need moments (the lesson on rigid bodies) and friction on an inclined plane.

## Key definitions

:::definition{term="Centre of gravity and centre of mass"}
The **centre of gravity** is the point through which the resultant weight of a body acts. The **centre of mass** is the point where the total mass can be considered concentrated. In a uniform gravitational field, as near the Earth's surface, the two points coincide.
:::

:::formula{name="Centre of mass of a system of particles"}
For masses $m_i$ at points $(x_i, y_i)$:
$$
\bar{x} = \frac{\sum m_i x_i}{\sum m_i}, \qquad \bar{y} = \frac{\sum m_i y_i}{\sum m_i}
$$
:::

The formula comes from moments: the moment of the total weight acting at $(\bar{x}, \bar{y})$ equals the sum of the moments of the separate weights, and $g$ cancels.

## Standard uniform bodies

By **symmetry**, the centre of mass of a uniform body lies on every line or plane of symmetry. This gives the standard positions:

| Uniform body | Position of the centre of mass |
|---|---|
| Rod | its midpoint |
| Circular hoop (ring), circular disc | the centre of the circle |
| Rectangular lamina | the intersection of the diagonals |
| Triangular lamina | two-thirds of the way along each median from the vertex; the mean of the vertices' coordinates |
| Solid or hollow cylinder | on the axis, halfway along it |
| Solid or hollow sphere | the centre of the sphere |

For a triangle with vertices $(x_1, y_1)$, $(x_2, y_2)$, $(x_3, y_3)$, the centre of mass is $\left(\frac{x_1 + x_2 + x_3}{3}, \frac{y_1 + y_2 + y_3}{3}\right)$. Other shapes, such as a semicircular lamina, have results that a question will quote when it needs them.

:::worked-solution[Example 1: Particles of mass 2 kg, 3 kg and 5 kg are placed at the points $(1, 4)$, $(3, -1)$ and $(6, 2)$. Find the coordinates of their centre of mass.]
1. Total mass: $2 + 3 + 5 = 10$ kg.
2. $\sum m x = 2(1) + 3(3) + 5(6) = 2 + 9 + 30 = 41$, so $\bar{x} = \dfrac{41}{10} = 4.1$.
3. $\sum m y = 2(4) + 3(-1) + 5(2) = 8 - 3 + 10 = 15$, so $\bar{y} = \dfrac{15}{10} = 1.5$.
4. The centre of mass is $(4.1, 1.5)$.
:::

## Composite laminas

A **lamina** is a flat body with negligible thickness. For a uniform lamina, mass is proportional to area, so areas can replace masses. Split the shape into standard pieces, find each piece's area and centre of mass, and use a table:

- **Adding a piece:** add its area and its moment.
- **Removing a piece (a hole):** treat it as a **negative** area. The original whole equals the remaining shape plus the removed piece.

:::worked-solution[Example 2: A uniform rectangular lamina $OABC$ has $OA = 12$ cm and $OC = 8$ cm. A square of side 4 cm is cut from the corner at $B$. Taking $O$ as origin with $OA$ along the $x$-axis, find the centre of mass of the remaining lamina. The lamina is then hung freely from $O$. Find the angle $OA$ makes with the vertical.]
1. Whole rectangle: area 96, centre $(6, 4)$. Square removed: area 16, centre $(10, 6)$. Remaining area: 80.
2. Moments about the $y$-axis: $80\bar{x} = 96(6) - 16(10) = 576 - 160 = 416$, so $\bar{x} = 5.2$ cm.
3. Moments about the $x$-axis: $80\bar{y} = 96(4) - 16(6) = 384 - 96 = 288$, so $\bar{y} = 3.6$ cm.
4. Hanging from $O$, the centre of mass $G$ lies vertically below $O$, so $OG$ is vertical.
5. The angle between $OA$ (the $x$-axis) and $OG$ is $\tan^{-1}\left(\dfrac{3.6}{5.2}\right) = 34.7°$.
6. So $OA$ makes $34.7°$ with the vertical.
:::

Always check the answer is sensible: removing the top-right corner moves the centre of mass down and to the left of $(6, 4)$, as found.

## Bodies suspended from a point

A body hanging freely from a point $P$ comes to rest with its centre of mass **vertically below** $P$. (Otherwise its weight would have a moment about $P$ and it would turn.) To find the angle a given edge makes with the vertical, draw the line $PG$: it is the vertical. Then use right-angled trigonometry with the coordinates of $G$ measured from $P$.

A body suspended from **two** strings or resting on supports is solved with moments, using its weight at $G$.

## Sliding or toppling on an inclined plane

A block standing on a rough plane can fail in two ways as the plane is tilted:

- **Sliding** happens when the component of the weight down the plane exceeds limiting friction: $mg\sin\theta > \mu\,mg\cos\theta$, i.e. $\tan\theta > \mu$.
- **Toppling** happens when the vertical line through $G$ passes outside the base, beyond the lower edge. For a block of base width $w$ (down the slope) and height $h$ with $G$ at the centre, this is when $\tan\theta > \dfrac{w/2}{h/2} = \dfrac{w}{h}$.

Whichever critical angle is **smaller** is reached first.

:::worked-solution[Example 3: A uniform cuboid crate, 0.4 m wide and 1.2 m tall, stands on a rough plank with its 0.4 m side down the slope. The coefficient of friction is 0.5. The plank is slowly tilted. Does the crate slide or topple first, and at what angle?]
1. Sliding: $\tan\theta = \mu = 0.5$, so $\theta = 26.6°$.
2. Toppling: $G$ is 0.6 m above the base and 0.2 m from the lower edge. It is above the lower edge when $\tan\theta = \dfrac{0.2}{0.6} = \dfrac{1}{3}$, so $\theta = 18.4°$.
3. $18.4° < 26.6°$, so the crate **topples first**, when the plank reaches $18.4°$.
:::

A tall, narrow body tends to topple; a low, wide one on a smooth surface tends to slide. Loading a cart high raises $G$ and makes toppling more likely.

## Common mistakes

:::mistake{title="Adding the area of a hole"}
A removed piece is subtracted: both its area and its moment take a minus sign.
:::

:::mistake{title="Using the wrong reference point"}
Measure every centre of mass from the same origin and axes. Coordinates of the pieces must all be measured from that origin.
:::

:::mistake{title="Measuring the suspension angle from the wrong line"}
When hanging from $P$, the vertical is $PG$. The angle asked for is between the named edge and $PG$, not the horizontal.
:::

:::mistake{title="Toppling about the wrong edge"}
On a slope a block topples about its **lower** edge; compare the horizontal position of $G$ with that edge.
:::

## Exam tips

:::exam-tip
Set out composite bodies in a table with columns for each piece: area (or mass), $x$, $y$, and the products. Examiners award marks for a correct table even when the final division slips.
:::

:::exam-tip
"Show that the centre of mass is at …" requires the full moment equation and the given value as the last line. Use the symmetry of the shape to shorten the work, and say that you are using it.
:::

:::exam-tip
Give angles to 1 decimal place and lengths to 3 significant figures; state whether a body slides or topples and justify it by comparing the two critical angles.
:::

## Summary

:::summary
- $\bar{x} = \frac{\sum m x}{\sum m}$, $\bar{y} = \frac{\sum m y}{\sum m}$; for a uniform lamina, use areas for masses.
- Symmetry fixes the centres of rods, hoops, discs, rectangles, cylinders and spheres; a triangle's is the mean of its vertices.
- Removed parts count as negative mass.
- Freely suspended from $P$: $G$ is vertically below $P$.
- On a rough slope: slides when $\tan\theta > \mu$; topples when $G$ passes beyond the lower edge; the smaller angle wins.
:::
