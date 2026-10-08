---
{
  "key": "geometry.angle-properties",
  "title": "Angle properties",
  "summary": "Calculate unknown angles using angles on a straight line, at a point and vertically opposite, angles formed with parallel lines, and the angle sums of triangles and quadrilaterals, giving a correctly worded geometric reason for every step.",
  "concepts": ["math.geometry.angles"],
  "objectives": ["zimsec/o-level/mathematics:8.1.2", "cambridge/igcse/mathematics:4.6.1", "cambridge/igcse/mathematics:4.6.2"],
  "estimatedMinutes": 25,
  "freePreview": true,
  "level": "core"
}
---
## Introduction

Look at a road junction in Harare, the steel frame of a roof truss, or the lines painted on a netball court and you will see straight lines crossing and running parallel. Wherever lines meet, the angles they make are linked by a small set of facts. Knowing these facts lets you work out angles you cannot measure, and it is the first step towards proving results in geometry.

In examinations, a correct number is only half of the answer. Most angle questions say "**give a reason for each answer**", and the marks for reasons are only given for the accepted wording. This lesson teaches both the facts and the words.

You should already know the types of angle (acute, obtuse, reflex) and how to name an angle with three letters: angle $ABC$ is the angle at $B$.

## Key definitions

:::definition{term="Transversal"}
A line that crosses two or more other lines. When it crosses two parallel lines it makes eight angles that are linked to each other.
:::

:::definition{term="Vertically opposite angles"}
The pair of angles opposite each other where two straight lines cross. They are always equal.
:::

:::definition{term="Corresponding, alternate and co-interior angles"}
Angles formed when a transversal crosses two parallel lines. **Corresponding** angles are in matching positions at the two crossings. **Alternate** angles lie between the parallel lines, one at each crossing, on opposite sides of the transversal. **Co-interior** angles (also called allied or interior angles) lie between the parallel lines, one at each crossing, on the same side of the transversal.
:::

:::definition{term="Exterior angle of a triangle"}
The angle between one side of a triangle and the next side extended beyond the vertex.
:::

## Facts about angles and lines

| Fact | The reason to write |
| --- | --- |
| $a + b = 180^\circ$ for angles side by side on a straight line | Angles on a straight line add up to $180^\circ$ |
| Angles all the way round a point total $360^\circ$ | Angles at a point add up to $360^\circ$ |
| Opposite angles where two lines cross are equal | Vertically opposite angles are equal |

:::worked-solution[Example 1: two straight lines crossing]
The straight lines $AB$ and $CD$ cross at $O$. Angle $AOC = (3x + 10)^\circ$ and angle $BOD = (5x - 30)^\circ$. Find $x$ and angle $AOD$.
1. Angles $AOC$ and $BOD$ are opposite each other at $O$, so $3x + 10 = 5x - 30$ (vertically opposite angles are equal).
2. Rearranging: $40 = 2x$, so $x = 20$.
3. Angle $AOC = 3(20) + 10 = 70^\circ$.
4. Angles $AOC$ and $AOD$ lie side by side on the straight line $CD$, so angle $AOD = 180^\circ - 70^\circ = 110^\circ$ (angles on a straight line add up to $180^\circ$).
:::

:::worked-solution[Example 2: angles at a point]
Three angles meet at a point. They are $140^\circ$, $3k$ and $5k - 20^\circ$. Find $k$.
1. Angles at a point add up to $360^\circ$: $140 + 3k + 5k - 20 = 360$.
2. Simplify: $8k + 120 = 360$, so $8k = 240$.
3. $k = 30$. The angles are $140^\circ$, $90^\circ$ and $130^\circ$, which do add up to $360^\circ$.
:::

## Parallel lines

When a transversal crosses two parallel lines:

:::keyfact{title="Parallel line facts"}
- **Corresponding angles are equal.**
- **Alternate angles are equal.**
- **Co-interior angles add up to $180^\circ$.**
:::

Some people remember these by the shapes F (corresponding), Z (alternate) and C (co-interior). The shapes can help you **spot** the angles, but "Z angles" is not an accepted reason in an examination: always write the proper name.

:::worked-solution[Example 3: a transversal across parallel lines]
$PQ$ and $RS$ are parallel horizontal lines, with $PQ$ above $RS$, and $P$ and $R$ on the left. A transversal crosses $PQ$ at $X$ and $RS$ at $Y$. Angle $PXY = 64^\circ$. Find angle $XYS$ and angle $XYR$.
1. Angle $PXY$ (to the left of the transversal at $X$) and angle $XYS$ (to the right of it at $Y$) lie between the parallel lines on opposite sides of the transversal.
2. So angle $XYS = 64^\circ$ (alternate angles are equal).
3. Angles $PXY$ and $XYR$ are both between the parallel lines on the left of the transversal.
4. So angle $XYR = 180^\circ - 64^\circ = 116^\circ$ (co-interior angles add up to $180^\circ$).
:::

The facts also work backwards: if a pair of alternate angles (or corresponding angles) are equal, or a pair of co-interior angles add up to $180^\circ$, then the two lines **are** parallel.

## Triangles and quadrilaterals

:::keyfact{title="Angle sums"}
- Angles in a triangle add up to $180^\circ$.
- Angles in a quadrilateral add up to $360^\circ$ (a diagonal splits it into two triangles).
- The exterior angle of a triangle is equal to the sum of the two interior opposite angles.
- The base angles of an isosceles triangle are equal; each angle of an equilateral triangle is $60^\circ$.
:::

:::worked-solution[Example 4: an exterior angle]
In triangle $ABC$ the side $BC$ is extended beyond $C$ to a point $D$. Angle $ACD = 125^\circ$ and angle $ABC = 48^\circ$. Find angle $BAC$ and angle $ACB$.
1. Angle $ACD$ is an exterior angle of the triangle, so angle $ACD$ = angle $ABC$ + angle $BAC$ (exterior angle of a triangle equals the sum of the interior opposite angles).
2. Angle $BAC = 125^\circ - 48^\circ = 77^\circ$.
3. Angle $ACB = 180^\circ - 125^\circ = 55^\circ$ (angles on a straight line add up to $180^\circ$).
4. Check: $48^\circ + 77^\circ + 55^\circ = 180^\circ$.
:::

:::worked-solution[Example 5: an isosceles triangle and a parallel line]
Triangle $PQR$ has $PQ = PR$ and angle $QPR = 40^\circ$. The straight line $ST$ passes through $P$ and is parallel to $QR$, with $S$ on the same side as $Q$. Find angle $SPQ$.
1. The triangle is isosceles, so angle $PQR$ = angle $PRQ$ (base angles of an isosceles triangle are equal).
2. Angle $PQR = \frac{180^\circ - 40^\circ}{2} = 70^\circ$ (angles in a triangle add up to $180^\circ$).
3. Angle $SPQ$ = angle $PQR = 70^\circ$ (alternate angles are equal, since $ST \parallel QR$).
:::

:::worked-solution[Example 6: angles in a quadrilateral]
The angles of a quadrilateral are $105^\circ$, $75^\circ$, $2x$ and $3x$. Find the two unknown angles.
1. Angles in a quadrilateral add up to $360^\circ$: $105 + 75 + 2x + 3x = 360$.
2. $5x = 180$, so $x = 36$.
3. The angles are $2x = 72^\circ$ and $3x = 108^\circ$.
:::

## Common mistakes

:::mistake{title="Informal names as reasons"}
"Z angles", "F angles" and "C angles" do not earn reason marks. Write "alternate angles are equal", "corresponding angles are equal" or "co-interior angles add up to $180^\circ$".
:::

:::mistake{title="Making co-interior angles equal"}
Co-interior angles **add up to** $180^\circ$; they are only equal when both are $90^\circ$. If one is $64^\circ$, the other is $116^\circ$.
:::

:::mistake{title="Assuming lines are parallel"}
The parallel line facts only apply when you are told (or have proved) that the lines are parallel, for example by arrows on the diagram or the words "$AB$ is parallel to $CD$". Lines that look parallel may not be.
:::

:::mistake{title="Measuring the diagram"}
Diagrams in examinations are usually "not drawn to scale". An answer found with a protractor earns no marks; calculate it from the facts.
:::

## Exam tips

:::exam-tip
Write each step as "angle $= \ldots$ (reason)". When a question says "give a reason", the reason is worth its own mark, so a correct angle with no reason loses marks.
:::

:::exam-tip
Name angles with three letters, such as angle $XYS$, so the examiner knows exactly which angle you mean. A single letter at a vertex where several angles meet is ambiguous.
:::

:::exam-tip
Mark each angle you find on the diagram as you go. Many answers need a chain of two or three facts, and a found angle often unlocks the next step.
:::

## Summary

:::summary
- Angles on a straight line add up to $180^\circ$; angles at a point add up to $360^\circ$; vertically opposite angles are equal.
- With parallel lines: corresponding angles are equal, alternate angles are equal, co-interior angles add up to $180^\circ$.
- Angles in a triangle add up to $180^\circ$, and in a quadrilateral to $360^\circ$.
- An exterior angle of a triangle equals the sum of the two interior opposite angles.
- Give a correctly worded reason for every angle you find.
:::
