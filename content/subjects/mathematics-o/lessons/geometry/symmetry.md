---
{
  "key": "geometry.symmetry",
  "title": "Symmetry",
  "summary": "Find lines of symmetry and the order of rotational symmetry of plane shapes, use symmetry to work out properties of triangles, quadrilaterals and regular polygons, and (Extended) count planes and axes of symmetry of solids.",
  "concepts": ["math.geometry.symmetry"],
  "objectives": ["zimsec/o-level/mathematics:8.6.1", "zimsec/o-level/mathematics:8.6.2", "cambridge/igcse/mathematics:4.5.1", "cambridge/igcse/mathematics:4.5.2"],
  "estimatedMinutes": 25,
  "level": "core"
}
---
## Introduction

Look at the painted walls of a traditional Ndebele homestead, the pattern woven into a round Binga basket or the hub of a car wheel. Each design repeats itself in a regular way: one half mirrors the other, or the pattern looks the same after a part turn. Mathematicians call this **symmetry**.

Symmetry is more than decoration. If you know that a shape is symmetrical, you know that certain lengths are equal and certain angles are equal, without measuring anything. That makes symmetry a quick tool for solving geometry problems, and it links directly to the transformations you will meet next: a line of symmetry is a mirror line, and rotational symmetry is about rotations.

You should already know the names of the common triangles and quadrilaterals, and what a regular polygon is.

## Key definitions

:::definition{term="Line of symmetry"}
A line that divides a shape into two halves that are mirror images of each other. If the shape is folded along the line, the two halves fit exactly on top of each other. It is also called a **mirror line** or an **axis of symmetry** of the plane shape.
:::

:::definition{term="Rotational symmetry"}
A shape has rotational symmetry if it fits onto itself exactly when it is turned about a fixed point (the **centre of rotation**) through less than a full turn.
:::

:::definition{term="Order of rotational symmetry"}
The number of different positions in which a shape looks exactly the same during one complete turn of $360^\circ$. A shape that only fits onto itself after a full turn has order 1 (we say it has no rotational symmetry).
:::

:::keyfact{title="Smallest angle of rotation"}
If a shape has rotational symmetry of order $n$, the smallest turn that maps it onto itself is

$$
\frac{360^\circ}{n}
$$
:::

## Line symmetry

To test for a line of symmetry, imagine folding the shape along the line, or place a mirror on it. Every point on one side must have a partner on the other side, the **same perpendicular distance** from the line. That is why a line of symmetry is the perpendicular bisector of the segment joining any point to its mirror image.

A rectangle has **two** lines of symmetry: the lines through the midpoints of opposite sides. Its diagonals are **not** lines of symmetry. Fold a sheet of A4 paper along a diagonal and the corners do not meet.

## Rotational symmetry

To find the order of rotational symmetry, imagine tracing the shape, then turning the tracing about the centre. Count how many times the tracing fits exactly before it returns to the start. Count the starting position once only.

A square fits onto itself after turns of $90^\circ$, $180^\circ$, $270^\circ$ and $360^\circ$, so its order is $4$ and its smallest angle of rotation is $360^\circ \div 4 = 90^\circ$.

## Symmetry of common plane shapes

| Shape | Lines of symmetry | Order of rotational symmetry |
| --- | :---: | :---: |
| Equilateral triangle | 3 | 3 |
| Isosceles triangle | 1 | 1 |
| Scalene triangle | 0 | 1 |
| Square | 4 | 4 |
| Rectangle | 2 | 2 |
| Rhombus | 2 (the diagonals) | 2 |
| Parallelogram | 0 | 2 |
| Kite | 1 (one diagonal) | 1 |
| Isosceles trapezium | 1 | 1 |
| Regular polygon with $n$ sides | $n$ | $n$ |
| Circle | infinitely many | infinite |

### Using symmetry to find properties

Each line of symmetry tells you about equal sides and angles:

- **Isosceles triangle:** the line of symmetry bisects the angle between the equal sides and meets the base at right angles at its midpoint. So the base angles are equal.
- **Kite:** the line of symmetry is one diagonal. It bisects the other diagonal at right angles, and the pair of angles it does not pass through are equal.
- **Rhombus:** both diagonals are lines of symmetry, so the diagonals bisect each other at right angles and bisect the angles of the rhombus.
- **Regular polygon:** the lines of symmetry all pass through the centre, and the angle of rotation $\frac{360^\circ}{n}$ is the same size as each exterior angle.

## Worked examples

:::worked-solution[Example 1: complete a shape with a given line of symmetry]
Three vertices of a quadrilateral are $A(1, 2)$, $B(2, 5)$ and $C(4, 5)$. The line $x = 3$ is a line of symmetry. Find the fourth vertex $D$ and name the shape.

1. The mirror image of each vertex is the same horizontal distance on the other side of $x = 3$.
2. $B(2, 5)$ is 1 unit left of the line; $C(4, 5)$ is 1 unit right of it. So $B$ and $C$ are images of each other.
3. $A(1, 2)$ is 2 units left of the line, so its image is 2 units right: $D(5, 2)$.
4. $BC$ (length 2) is parallel to $AD$ (length 4) and $AB = CD$, so $ABCD$ is an **isosceles trapezium**.
:::

:::worked-solution[Example 2: a regular polygon from its symmetry]
A regular polygon fits onto itself after a turn of $40^\circ$, and $40^\circ$ is the smallest such turn. Find its number of sides, its number of lines of symmetry and the size of each interior angle.

1. Order of rotational symmetry $= \dfrac{360^\circ}{40^\circ} = 9$.
2. A regular polygon with order 9 has 9 sides and 9 lines of symmetry.
3. Each exterior angle equals the angle of rotation, $40^\circ$.
4. Interior angle $= 180^\circ - 40^\circ = 140^\circ$.
:::

:::worked-solution[Example 3: angles in a kite]
$PQRS$ is a kite in which the diagonal $PR$ is the line of symmetry. Angle $SPQ = 64^\circ$ and angle $PQR = 118^\circ$. Find angle $QRS$.

1. The line of symmetry $PR$ maps $Q$ onto $S$, so angle $PSR$ = angle $PQR$ = $118^\circ$.
2. Angles in a quadrilateral add up to $360^\circ$.
3. Angle $QRS = 360^\circ - 64^\circ - 118^\circ - 118^\circ = 60^\circ$.
:::

## Symmetry of solids (Extended)

Cambridge Extended candidates also study solids. The ideas are the same, one dimension up.

:::definition{term="Plane of symmetry"}
A flat plane that cuts a solid into two halves that are mirror images of each other.
:::

:::definition{term="Axis of rotational symmetry"}
A line through a solid about which the solid can be turned through less than a full turn and look exactly the same. The order is counted as for plane shapes.
:::

| Solid | Planes of symmetry | Rotational symmetry |
| --- | :---: | --- |
| Cuboid with three different edge lengths | 3 | three axes, each of order 2 |
| Cube | 9 | 3 axes of order 4 through the centres of opposite faces (and others) |
| Right prism with a regular $n$-sided cross-section (not a cube) | $n + 1$ | order $n$ about the axis along its length |
| Right pyramid on a square base | 4 | order 4 about the vertical axis |
| Cylinder or cone | infinitely many | infinite order about the central axis |

For a right prism, the extra plane is the one halfway along its length, parallel to the end faces.

:::example{title="Counting the planes of a cube"}
A cube has 3 planes parallel to its faces (each cuts through the middle of four edges). It also has 6 planes that pass through a pair of opposite edges, cutting two faces along their diagonals. That makes $3 + 6 = 9$ planes of symmetry.
:::

## Common mistakes

:::mistake{title="Taking the diagonals of a rectangle as lines of symmetry"}
A rectangle that is not a square has exactly 2 lines of symmetry, through the midpoints of opposite sides. Its diagonals divide it into two congruent triangles, but the triangles are not mirror images across the diagonal.
:::

:::mistake{title="Saying the order is 0"}
Every shape fits onto itself after a full turn, so the smallest possible order of rotational symmetry is 1, not 0.
:::

:::mistake{title="Counting the starting position twice"}
For a square, the positions after $90^\circ$, $180^\circ$, $270^\circ$ and $360^\circ$ give order 4. The $360^\circ$ position is the starting position, so do not add one more.
:::

:::mistake{title="Thinking a parallelogram has line symmetry"}
A parallelogram (that is not a rectangle or a rhombus) has no lines of symmetry, but it does have rotational symmetry of order 2 about the point where its diagonals cross.
:::

## Exam tips

:::exam-tip
"**State** the order of rotational symmetry" needs only a number. "**Draw** the lines of symmetry" needs every line, drawn with a ruler and long enough to cross the whole shape.
:::

:::exam-tip
When asked to shade squares so that a pattern has a given symmetry, check **both** conditions at the end, for example "exactly one line of symmetry **and** rotational symmetry of order 1".
:::

:::exam-tip
For coordinate questions, use the line of symmetry as a mirror: the image of a point is the same perpendicular distance on the other side. Write the coordinates of each new vertex clearly.
:::

## Summary

:::summary
- A line of symmetry splits a shape into two mirror-image halves; it is the perpendicular bisector of the segment joining a point to its image.
- The order of rotational symmetry is the number of positions in one full turn in which the shape looks the same; the smallest order is 1.
- A regular $n$-sided polygon has $n$ lines of symmetry and order $n$; its angle of rotation $\frac{360^\circ}{n}$ equals its exterior angle.
- Symmetry gives equal sides and angles: base angles of an isosceles triangle, the diagonals of a rhombus and kite, the angles of a kite.
- Extended: a cuboid has 3 planes of symmetry, a cube 9, a square-based right pyramid 4, a right prism on a regular $n$-gon $n + 1$.
:::
