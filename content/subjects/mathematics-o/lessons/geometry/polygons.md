---
{
  "key": "geometry.polygons-and-angles",
  "title": "Polygons",
  "summary": "Use the properties of triangles and special quadrilaterals, name polygons, calculate interior and exterior angle sums, and find the angles and the number of sides of regular (and irregular) polygons.",
  "concepts": ["math.geometry.polygons"],
  "objectives": ["zimsec/o-level/mathematics:8.3.1", "zimsec/o-level/mathematics:8.3.2", "zimsec/o-level/mathematics:8.3.3", "cambridge/igcse/mathematics:4.6.3"],
  "estimatedMinutes": 20,
  "level": "core"
}
---
## Introduction

Polygons are everywhere in Zimbabwe: the hexagonal paving bricks in a Harare car park, the octagonal STOP sign at a junction, the square and triangular patterns woven into a reed mat. Engineers and designers need to know the angles of these shapes so that pieces fit together without gaps.

In this lesson you will use the properties of the special quadrilaterals and learn two powerful rules: one for the sum of the **interior** angles of a polygon and one for the sum of its **exterior** angles. With them you can find any angle of a regular polygon, or work out how many sides it has from a single angle.

You should already know that the angles in a triangle add up to $180^\circ$ and the names of polygons up to ten sides (pentagon, hexagon, heptagon, octagon, nonagon, decagon).

## Key definitions

:::definition{term="Polygon"}
A closed flat shape made of straight sides. A polygon with $n$ sides also has $n$ vertices and $n$ interior angles.
:::

:::definition{term="Regular polygon"}
A polygon with all its sides equal **and** all its interior angles equal, such as an equilateral triangle or a square.
:::

:::definition{term="Interior and exterior angles"}
An **interior angle** is the angle inside the polygon at a vertex. An **exterior angle** is the angle between one side and the next side extended. At every vertex, interior angle $+$ exterior angle $= 180^\circ$.
:::

## Special quadrilaterals

| Shape | Sides | Angles | Diagonals |
| --- | --- | --- | --- |
| Square | 4 equal; opposite sides parallel | all $90^\circ$ | equal; bisect each other at $90^\circ$ |
| Rectangle | opposite sides equal and parallel | all $90^\circ$ | equal; bisect each other |
| Rhombus | 4 equal; opposite sides parallel | opposite angles equal | bisect each other at $90^\circ$ |
| Parallelogram | opposite sides equal and parallel | opposite angles equal | bisect each other |
| Trapezium | exactly one pair of parallel sides | co-interior pairs add up to $180^\circ$ | no special property |
| Kite | two pairs of equal adjacent sides | one pair of opposite angles equal | one diagonal is the perpendicular bisector of the other |

A useful fact for parallelograms: the angles next to each other along a side are co-interior, so they add up to $180^\circ$. If one angle of a parallelogram is $74^\circ$, the angles are $74^\circ$, $106^\circ$, $74^\circ$ and $106^\circ$.

## The sum of the interior angles

Choose one vertex of a polygon with $n$ sides and draw every diagonal from it. The polygon is split into $n - 2$ triangles, and the angles of those triangles make up exactly the interior angles of the polygon.

:::formula{name="Sum of the interior angles of a polygon with n sides"}
$$
S = (n - 2) \times 180^\circ
$$
:::

| Polygon | $n$ | Triangles | Interior angle sum |
| --- | --- | --- | --- |
| Quadrilateral | 4 | 2 | $360^\circ$ |
| Pentagon | 5 | 3 | $540^\circ$ |
| Hexagon | 6 | 4 | $720^\circ$ |
| Octagon | 8 | 6 | $1080^\circ$ |

## The sum of the exterior angles

Imagine walking all the way round a polygon. At each vertex you turn through the exterior angle, and when you are back at the start facing the same way you have made one complete turn.

![Left: a hexagon split from one vertex into 4 triangles, so its interior angles add up to 4 × 180° = 720°, and each angle of a regular hexagon is 120°. Right: a regular hexagon with each side extended, giving six exterior angles of 60° that add up to 360°.](media:diagrams/polygon-hexagon-angle-sums.png "Figure: interior angle sum from triangles, and exterior angles that total 360°")

:::keyfact{title="Exterior angles"}
The exterior angles of any convex polygon add up to $360^\circ$, whatever the number of sides.
:::

For a **regular** polygon with $n$ sides, all the exterior angles are equal, so:

:::formula{name="Angles of a regular polygon"}
$$
\text{exterior angle} = \frac{360^\circ}{n} \qquad \text{interior angle} = 180^\circ - \frac{360^\circ}{n} \qquad n = \frac{360^\circ}{\text{exterior angle}}
$$
:::

## Worked examples

:::worked-solution[Example 1: the angle sum of a hexagon]
1. A hexagon has $n = 6$ sides.
2. $S = (6 - 2) \times 180^\circ = 4 \times 180^\circ = 720^\circ$.
3. If the hexagon is regular, each interior angle is $720^\circ \div 6 = 120^\circ$.
:::

:::worked-solution[Example 2: a regular polygon with exterior angle $24^\circ$]
Each exterior angle of a regular polygon is $24^\circ$. Find the number of sides and the size of each interior angle.
1. The exterior angles add up to $360^\circ$, so $n = 360 \div 24 = 15$ sides.
2. Each interior angle is $180^\circ - 24^\circ = 156^\circ$.
3. Check: $(15 - 2) \times 180^\circ = 2340^\circ$, and $2340 \div 15 = 156$.
:::

:::worked-solution[Example 3: from the interior angle to the number of sides]
Each interior angle of a regular polygon is $150^\circ$. How many sides does it have?
1. Each exterior angle is $180^\circ - 150^\circ = 30^\circ$.
2. $n = 360 \div 30 = 12$, so the polygon has 12 sides (a dodecagon).
:::

The same method shows which angles are impossible. Could a regular polygon have interior angles of $130^\circ$? The exterior angle would be $50^\circ$, and $360 \div 50 = 7.2$ is not a whole number, so **no** regular polygon has interior angles of $130^\circ$.

:::worked-solution[Example 4: an irregular pentagon]
The interior angles of a pentagon are $x$, $x + 20^\circ$, $2x - 10^\circ$, $110^\circ$ and $120^\circ$. Find $x$ and the largest angle.
1. The interior angles of a pentagon add up to $(5 - 2) \times 180^\circ = 540^\circ$.
2. $x + (x + 20) + (2x - 10) + 110 + 120 = 540$.
3. $4x + 240 = 540$, so $4x = 300$ and $x = 75$.
4. The angles are $75^\circ$, $95^\circ$, $140^\circ$, $110^\circ$ and $120^\circ$; the largest is $140^\circ$.
:::

## Common mistakes

:::mistake{title="Using n × 180°"}
The interior angle sum is $(n - 2) \times 180^\circ$, not $n \times 180^\circ$. A quick check: a triangle ($n = 3$) must give $180^\circ$.
:::

:::mistake{title="Dividing the interior sum by n for an irregular polygon"}
Each interior angle equals $\dfrac{(n - 2) \times 180^\circ}{n}$ **only** for a regular polygon. In an irregular polygon the angles are different; use the total and subtract the angles you know.
:::

:::mistake{title="Dividing 360° by the interior angle"}
$n = 360^\circ \div$ **exterior** angle. Dividing by the interior angle gives nonsense (for example $360 \div 150 = 2.4$). Find the exterior angle first.
:::

:::mistake{title="Muddling the quadrilaterals"}
The diagonals of a rectangle are equal but not perpendicular (unless it is a square). The diagonals of a rhombus are perpendicular but not equal (unless it is a square).
:::

## Exam tips

:::exam-tip
For any question on regular polygons, go through the exterior angle: it connects $n$ and the interior angle in one step ($360 \div n$ or $360 \div$ exterior angle).
:::

:::exam-tip
"Show that" questions on polygons need a full chain: state the angle sum with $(n - 2) \times 180^\circ$, form the equation, and solve it. Write every line.
:::

:::exam-tip
When the answer is a number of sides, it must be a whole number. If you get a decimal, recheck whether you used the interior or the exterior angle.
:::

## Summary

:::summary
- Interior angle sum of an $n$-sided polygon: $(n - 2) \times 180^\circ$.
- Exterior angles of a convex polygon add up to $360^\circ$; interior $+$ exterior $= 180^\circ$ at each vertex.
- Regular polygon: exterior angle $= 360^\circ \div n$, and $n = 360^\circ \div$ exterior angle.
- Learn the side, angle and diagonal properties of the square, rectangle, rhombus, parallelogram, trapezium and kite.
- For irregular polygons, form an equation using the angle sum.
:::
