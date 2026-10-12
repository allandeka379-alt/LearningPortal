---
{
  "key": "geometry.constructions",
  "title": "Geometrical constructions",
  "summary": "Measure and draw lines and angles accurately, construct triangles with a ruler and compasses, draw and interpret nets of solids, and (ZIMSEC) construct perpendicular bisectors, angle bisectors, perpendiculars and angles of 60°, 30°, 90° and 45°.",
  "concepts": ["math.geometry.constructions"],
  "objectives": ["zimsec/o-level/mathematics:8.5.1", "zimsec/o-level/mathematics:8.5.2", "cambridge/igcse/mathematics:4.2.1", "cambridge/igcse/mathematics:4.2.2", "cambridge/igcse/mathematics:4.2.3"],
  "estimatedMinutes": 25,
  "level": "core"
}
---
## Introduction

Before computers, every bridge, roof truss and plot boundary in Zimbabwe started as an accurate drawing made with a ruler, a pair of compasses and a protractor. Draughtsmen and surveyors still use the same constructions, and examiners use them to test whether you can follow a precise method.

In this lesson you will measure and draw lines and angles, construct a triangle from its three sides, and draw nets of solids. The last part covers constructions that are in the **ZIMSEC** syllabus only: bisectors, perpendiculars and special angles made without a protractor.

You need a sharp pencil, a ruler marked in millimetres, a protractor and a pair of compasses that holds its radius firmly.

## Key definitions

:::definition{term="Construct"}
Draw accurately using the instruments the question allows. "Using a ruler and compasses only" means no protractor: every angle must come from arcs.
:::

:::definition{term="Construction arcs"}
The arcs drawn with the compasses while constructing. They show the examiner your method and must **not** be rubbed out.
:::

:::definition{term="Net"}
A flat shape that folds up, without overlaps or gaps, to make a solid.
:::

## Measuring and drawing lines and angles

- Measure lines to the nearest millimetre: $6.4$ cm, not "about 6 cm".
- A protractor has two scales. Put the centre point on the vertex and the zero line along one arm, then read the scale that **starts from zero on that arm**.
- Decide first whether the angle is acute or obtuse. If an acute angle reads $115^\circ$, you are on the wrong scale: the angle is $180^\circ - 115^\circ = 65^\circ$.

## Constructing a triangle from three sides

1. Draw the longest side with a ruler and label its ends.
2. Open the compasses to the length of the second side, put the point on one end, and draw an arc.
3. Open the compasses to the length of the third side, put the point on the other end, and draw an arc that crosses the first.
4. The crossing point is the third vertex. Join it to both ends.

:::worked-solution[Example 1: triangle $ABC$ with $AB = 8$ cm, $BC = 6$ cm and $AC = 7$ cm]
1. Draw $AB = 8$ cm.
2. With the compass point on $A$ and radius $7$ cm, draw an arc above $AB$ (every point on it is $7$ cm from $A$).
3. With the compass point on $B$ and radius $6$ cm, draw an arc crossing the first arc.
4. Label the crossing point $C$ and join $AC$ and $BC$. Leave both arcs showing.
5. Measuring gives angle $ABC \approx 58^\circ$, angle $BAC \approx 47^\circ$ and angle $ACB \approx 76^\circ$; they add up to about $180^\circ$, a useful check.
:::

A triangle is only possible if the two shorter sides add up to **more** than the longest side. With sides 3 cm, 4 cm and 9 cm the arcs never meet, because $3 + 4 < 9$.

![Constructing triangle ABC from three sides: draw AB = 8 cm, then an arc of radius 7 cm from A and an arc of radius 6 cm from B; where the arcs cross is vertex C, and the construction arcs are left showing.](media:diagrams/construct-triangle-three-sides.png "Figure: two arcs fix the third vertex of a triangle")

When an angle is given (for example $PQ = 7.5$ cm, $PR = 6$ cm and angle $QPR = 50^\circ$), draw $PQ$, measure $50^\circ$ at $P$ with the protractor, and mark $R$ on that arm $6$ cm from $P$. This is a drawing, not a ruler-and-compasses construction.

## Nets of solids

A cube has 11 different nets, all made of six squares. A cuboid's net has three pairs of matching rectangles. A square-based pyramid's net is a square with a triangle on each side. When folding a net in your head, check that no two faces land in the same place.

:::worked-solution[Example 2: the net of a cylinder of radius $3.5$ cm and height $10$ cm]
1. A closed cylinder unrolls into a rectangle and two circles.
2. The rectangle wraps round the circular ends, so one side is the circumference: $2\pi \times 3.5 = 21.99\ldots \approx 22.0$ cm.
3. The other side of the rectangle is the height, $10$ cm.
4. So the net is a $22.0$ cm by $10$ cm rectangle with a circle of radius $3.5$ cm on each long side.
:::

## ZIMSEC constructions with a ruler and compasses only

:::note{title="ZIMSEC only"}
The constructions in this section are in the ZIMSEC O-Level syllabus. Cambridge IGCSE (0580) no longer examines bisector constructions.
:::

:::example{title="The perpendicular bisector of a line segment AB"}
1. Open the compasses to more than half of $AB$.
2. With the point on $A$, draw arcs above and below $AB$.
3. With the **same radius** and the point on $B$, draw arcs crossing the first two.
4. Join the two crossing points. This line cuts $AB$ in half at right angles, and every point on it is the same distance from $A$ and $B$.
:::

![Constructing the perpendicular bisector of AB: arcs of the same radius, more than half of AB, are drawn from A and from B above and below the line; joining the crossing points P and Q gives a line through the midpoint M at a right angle to AB.](media:diagrams/construct-perpendicular-bisector.png "Figure: the perpendicular bisector of a line segment AB")

:::example{title="The bisector of an angle ABC"}
1. With the point on $B$, draw an arc cutting $BA$ at $P$ and $BC$ at $Q$.
2. With the point on $P$ and then on $Q$, using the same radius, draw two arcs that cross at $R$.
3. Join $BR$. It cuts angle $ABC$ into two equal angles.
:::

The perpendicular **from** a point $P$ to a line is made in the same way: an arc centred on $P$ cuts the line at two points, and the perpendicular bisector of those two points passes through $P$. The perpendicular **at** a point on a line is the bisector of the straight angle ($180^\circ$) there.

:::keyfact{title="Special angles"}
- $60^\circ$: draw an arc from the vertex cutting the arm, then an arc of the **same radius** from that point. The two equal radii and the arm make an equilateral triangle.
- $30^\circ$: bisect $60^\circ$.
- $90^\circ$: construct a perpendicular at the point.
- $45^\circ$: bisect $90^\circ$. Others follow: $120^\circ = 60^\circ + 60^\circ$, $15^\circ$ = half of $30^\circ$.
:::

:::worked-solution[Example 3: construct an angle of $45^\circ$ at $A$ on the line $AB$]
1. Extend the line beyond $A$. With centre $A$, draw arcs cutting the line on both sides of $A$.
2. From each of those points, with a larger equal radius, draw arcs that cross above $A$. Join $A$ to the crossing point: this is $90^\circ$.
3. Bisect the $90^\circ$ angle: an arc centred on $A$ cuts both arms, equal arcs from those two points cross, and the line from $A$ through the crossing makes $45^\circ$ with $AB$.
:::

## Common mistakes

:::mistake{title="Rubbing out the arcs"}
Without arcs the examiner cannot tell a construction from a guess, and the method marks are lost. Leave every arc showing.
:::

:::mistake{title="Using a protractor when it is not allowed"}
"Ruler and compasses only" means the angle must be constructed. A measured $60^\circ$ angle earns no marks there, even if it is accurate.
:::

:::mistake{title="Reading the wrong protractor scale"}
Always decide first whether the angle is acute or obtuse, then check your reading agrees.
:::

:::mistake{title="The wrong length in a cylinder net"}
The rectangle's length is the circumference $2\pi r$, not the diameter. A $7$ cm diameter needs a rectangle about $22$ cm long, not $7$ cm.
:::

## Exam tips

:::exam-tip
Accuracy matters: lines are usually accepted within $2$ mm and angles within $2^\circ$. A sharp pencil and compasses that do not slip make the difference.
:::

:::exam-tip
Read the command word: **construct** (ruler and compasses, arcs shown), **draw** (protractor allowed), **measure** (give the measurement with its unit).
:::

:::exam-tip
Label every point you construct with the letter used in the question; later parts usually ask you to measure or use them.
:::

## Summary

:::summary
- Measure lines to the nearest millimetre and angles to the nearest degree, using the correct protractor scale.
- A triangle from three sides: draw one side, then two arcs from its ends; the arcs cross at the third vertex.
- Two shorter sides must add up to more than the longest side, or no triangle exists.
- A net folds into a solid; a cylinder's net is a rectangle (length $2\pi r$) and two circles.
- ZIMSEC: perpendicular and angle bisectors, perpendiculars from and at a point, and angles of $60^\circ$, $30^\circ$, $90^\circ$ and $45^\circ$ with ruler and compasses only.
:::
