---
{
  "key": "geometry.chords-and-tangents",
  "title": "Symmetry properties of chords and tangents",
  "summary": "Use the symmetry of a circle: the perpendicular from the centre bisects a chord, the perpendicular bisector of a chord passes through the centre, equal chords are equidistant from the centre, and tangents from an external point are equal, combined with Pythagoras' theorem.",
  "concepts": ["math.geometry.circle-theorems.chords-and-tangents"],
  "objectives": ["zimsec/o-level/mathematics:8.7.1", "cambridge/igcse/mathematics:4.8.1"],
  "estimatedMinutes": 20,
  "level": "extended"
}
---
## Introduction

A potter in Chitungwiza finds half of a broken round plate and wants to make a new one of the same size. How can she find the centre and the radius from a piece of the rim? The answer comes from the **symmetry** of the circle: every diameter is a line of symmetry, and chords and tangents behave in predictable ways around it.

In this lesson you will learn four symmetry properties and use them with Pythagoras' theorem to find lengths in circles. These properties are Extended content for Cambridge (Circle theorems II) and part of the ZIMSEC circle properties.

## Key definitions

:::definition{term="Distance from the centre to a chord"}
The length of the **perpendicular** from the centre to the chord. It is the shortest distance from the centre to the chord.
:::

:::definition{term="Tangent from an external point"}
From a point $P$ outside a circle, exactly two tangents can be drawn. The tangent length is the distance from $P$ to the point of contact.
:::

## The symmetry properties

:::keyfact{title="Chords"}
1. The perpendicular from the centre to a chord **bisects** the chord. (Equally, the line from the centre to the midpoint of a chord is perpendicular to it.)
2. The perpendicular bisector of any chord **passes through the centre**.
3. **Equal chords are equidistant from the centre**, and chords that are the same distance from the centre are equal.
:::

:::keyfact{title="Tangents"}
4. The two tangents from an external point are **equal in length**.
5. The line joining the external point to the centre bisects the angle between the two tangents, and the angle between the two radii to the points of contact.
:::

Each property comes from congruent triangles. For tangents $PA$ and $PB$ from $P$ to a circle with centre $O$: triangles $OAP$ and $OBP$ both have a right angle (tangent perpendicular to radius), equal radii $OA = OB$ and the common hypotenuse $OP$. So they are congruent (RHS), and $PA = PB$. The shape $OAPB$ is a kite.

## Worked examples

The key picture for chords is a **right-angled triangle** made of the radius (hypotenuse), half of the chord, and the distance from the centre.

:::worked-solution[Example 1: the distance from the centre to a chord]
A chord $AB$ of length 16 cm is drawn in a circle with centre $O$ and radius 10 cm. Find the distance from $O$ to $AB$.
1. Draw the perpendicular $OM$ from $O$ to $AB$. It bisects $AB$, so $AM = 8$ cm.
2. Triangle $OMA$ has a right angle at $M$ and hypotenuse $OA = 10$ cm.
3. $OM = \sqrt{10^2 - 8^2} = \sqrt{36} = 6$ cm.
:::

:::worked-solution[Example 2: the length of a chord]
A chord is 9 cm from the centre of a circle of radius 15 cm. Find the length of the chord.
1. Half the chord, the 9 cm perpendicular and the 15 cm radius form a right-angled triangle.
2. Half the chord $= \sqrt{15^2 - 9^2} = \sqrt{144} = 12$ cm.
3. The chord is $2 \times 12 = 24$ cm long.
:::

:::worked-solution[Example 3: tangents from an external point]
$P$ is 17 cm from the centre $O$ of a circle of radius 8 cm. The tangents from $P$ touch the circle at $A$ and $B$. Find the length $PA$ and the angle $APB$.
1. Angle $OAP = 90^\circ$ (tangent perpendicular to radius).
2. $PA = \sqrt{17^2 - 8^2} = \sqrt{225} = 15$ cm, and $PB = 15$ cm too (tangents from a point are equal).
3. $\sin(\text{angle } OPA) = \frac{8}{17}$, so angle $OPA = 28.07^\circ$.
4. $OP$ bisects angle $APB$, so angle $APB = 2 \times 28.07^\circ = 56.1^\circ$ (1 d.p.).
:::

:::worked-solution[Example 4: two parallel chords]
In a circle of radius 13 cm, two parallel chords have lengths 24 cm and 10 cm. Find the distance between them.
1. The 24 cm chord: distance from the centre $= \sqrt{13^2 - 12^2} = 5$ cm.
2. The 10 cm chord: distance from the centre $= \sqrt{13^2 - 5^2} = 12$ cm.
3. If the chords are on the **same side** of the centre, they are $12 - 5 = 7$ cm apart.
4. If they are on **opposite sides**, they are $12 + 5 = 17$ cm apart. Read the question to decide which.
:::

:::example{title="Finding the centre of a broken plate"}
Draw any two chords on the curved edge of the plate fragment, and construct the perpendicular bisector of each. Both bisectors pass through the centre (property 2), so the centre is where they cross. The radius is the distance from there to the edge.
:::

## Common mistakes

:::mistake{title="Using the whole chord in Pythagoras"}
The right-angled triangle uses **half** the chord. For a 16 cm chord in a 10 cm circle, $\sqrt{10^2 - 16^2}$ is impossible; the correct calculation is $\sqrt{10^2 - 8^2}$.
:::

:::mistake{title="Thinking any line from the centre bisects a chord"}
Only the **perpendicular** from the centre (or the line to the chord's midpoint) bisects it. A slanting line from the centre cuts the chord into unequal parts.
:::

:::mistake{title="Mixing the tangent and the radius"}
In triangle $OAP$ the hypotenuse is $OP$, the line to the external point. The radius $OA$ and the tangent $PA$ are the two shorter sides.
:::

## Exam tips

:::exam-tip
Draw the perpendicular from the centre and mark the right angle and the two equal halves. Write the reason: "the perpendicular from the centre bisects the chord".
:::

:::exam-tip
In tangent questions, mark both right angles at the points of contact straight away, and the equal tangent lengths. The kite $OAPB$ usually unlocks the problem.
:::

:::exam-tip
When the radius is the unknown, call it $r$ and write the distance from the centre in terms of $r$ (for example $r - 2$). Pythagoras then gives an equation in which the $r^2$ terms cancel, leaving a simple linear equation.
:::

:::exam-tip
Questions with two chords often have two possible answers (same side or opposite sides of the centre). If the question does not say, sketch both.
:::

## Summary

:::summary
- The perpendicular from the centre bisects a chord; the perpendicular bisector of a chord passes through the centre.
- Radius, half-chord and distance from the centre form a right-angled triangle: $r^2 = d^2 + \left(\frac{c}{2}\right)^2$.
- Equal chords are equidistant from the centre.
- Tangents from an external point are equal, and the line to the centre bisects the angle between them.
- Most problems end with Pythagoras' theorem or right-angled trigonometry.
:::
