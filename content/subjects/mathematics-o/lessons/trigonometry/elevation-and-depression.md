---
{
  "key": "trigonometry.elevation-and-depression",
  "title": "Angles of elevation and depression",
  "summary": "Identify angles of elevation and depression, use them with right-angled trigonometry to find heights and distances (allowing for eye level), and solve problems with two observations, such as masts, cliffs, bridges and dam walls.",
  "concepts": ["math.trigonometry.elevation-and-depression"],
  "objectives": ["zimsec/o-level/mathematics:8.1.3", "cambridge/igcse/mathematics:6.2.4"],
  "estimatedMinutes": 20,
  "level": "extended"
}
---
## Introduction

How tall is the cell-phone mast outside your school? How high is the wall of the Kariba Dam? How far below the Victoria Falls Bridge is a raft on the Zambezi? Nobody climbs the mast or the dam wall with a tape measure. Instead, surveyors measure an **angle** from the ground and a distance along the ground, and trigonometry does the rest.

The angles they measure are called **angles of elevation** (looking up) and **angles of depression** (looking down). In this lesson you will learn to draw these angles correctly and to combine them with sine, cosine and tangent. This topic is Extended for Cambridge (6.2) and part of ZIMSEC topic 8.1.

You should be confident with SOH CAH TOA in right-angled triangles.

## Key definitions

:::definition{term="Angle of elevation"}
The angle measured **upwards from the horizontal** to the line of sight of an object above the observer.
:::

:::definition{term="Angle of depression"}
The angle measured **downwards from the horizontal** to the line of sight of an object below the observer.
:::

:::definition{term="Line of sight"}
The straight line from the observer's eye to the object.
:::

## The key fact

If $A$ is above $B$, the horizontal line through $A$ and the horizontal line through $B$ are parallel. The line of sight $AB$ crosses both, so:

:::keyfact{title="Elevation and depression are equal"}
The angle of depression of $B$ from $A$ equals the angle of elevation of $A$ from $B$ (alternate angles).
:::

This means you can always put the angle inside the right-angled triangle at the lower point, where it is easier to use.

![A viewing platform 110 m above a river: the angle of depression of the raft from the platform is 38°, equal to the angle of elevation of the platform from the raft (alternate angles), so the raft is 110 ÷ tan 38° = 141 m from the foot of the cliff.](media:diagrams/elevation-depression-platform-raft.png "Figure: angle of depression at the top equals angle of elevation at the bottom")

## Worked examples

:::worked-solution[Example 1: the height of a cell-phone mast]
From a point on level ground 40 m from the foot of a vertical mast, the angle of elevation of the top is $48^\circ$. Find the height of the mast.
1. Sketch: a right angle at the foot of the mast; the $48^\circ$ angle at the observer.
2. The height is opposite the angle and the 40 m is adjacent: $\tan 48^\circ = \dfrac{h}{40}$.
3. $h = 40 \tan 48^\circ = 44.42\ldots = 44.4$ m (3 s.f.).
:::

:::worked-solution[Example 2: allowing for eye level]
Chipo's eyes are 1.5 m above level ground. She stands 25 m from a tree and the angle of elevation of the top is $33^\circ$. How tall is the tree?
1. The angle is measured from her eye level, so the triangle has its base 1.5 m above the ground.
2. Height above eye level $= 25 \tan 33^\circ = 16.23\ldots$ m.
3. Tree height $= 16.235\ldots + 1.5 = 17.7$ m (3 s.f.).
:::

:::worked-solution[Example 3: an angle of depression]
A viewing platform is 110 m above a river. From the platform, the angle of depression of a raft on the water is $38^\circ$. How far is the raft from the point on the water directly below the platform?
1. The angle of elevation of the platform from the raft is also $38^\circ$ (alternate angles), so put $38^\circ$ at the raft.
2. The 110 m height is opposite; the distance $d$ is adjacent: $\tan 38^\circ = \dfrac{110}{d}$.
3. $d = \dfrac{110}{\tan 38^\circ} = 140.79\ldots = 141$ m (3 s.f.).
:::

## Two observations

Sometimes neither the height nor the distance is known, but the angle of elevation is measured from two points in a line with the object.

:::worked-solution[Example 4: a tower seen from two points]
From a point $A$ on level ground, the angle of elevation of the top $T$ of a tower is $28^\circ$. From a point $B$, 30 m closer to the tower, it is $41^\circ$. Find the height $h$ of the tower.
1. Let the distance from $B$ to the foot $F$ of the tower be $x$ m. Then $AF = x + 30$.
2. From $B$: $h = x \tan 41^\circ$. From $A$: $h = (x + 30)\tan 28^\circ$.
3. So $x \tan 41^\circ = x \tan 28^\circ + 30 \tan 28^\circ$, giving $x = \dfrac{30 \tan 28^\circ}{\tan 41^\circ - \tan 28^\circ} = 47.25\ldots$ m.
4. $h = 47.25\ldots \times \tan 41^\circ = 41.1$ m (3 s.f.).
:::

An alternative is to find $BT$ first with the sine rule in triangle $ABT$, where angle $ATB = 41^\circ - 28^\circ = 13^\circ$. Both methods give the same height.

## Common mistakes

:::mistake{title="Measuring from the vertical"}
Angles of elevation and depression are always measured from the **horizontal**, never from the vertical wall, mast or cliff.
:::

:::mistake{title="Putting the angle of depression in the wrong place"}
The angle of depression lies between the horizontal line at the top and the line of sight, **outside** the triangle formed with the cliff. Move it to the bottom of the line of sight (it becomes the angle of elevation) before using SOH CAH TOA.
:::

:::mistake{title="Forgetting eye level"}
If the observer's eye height is given, the angle is measured from eye level. Add the eye height to the calculated height at the end.
:::

:::mistake{title="Rounding the first observation"}
In two-observation problems, keep full calculator values for $x$ before finding $h$; a rounded $x$ can change the final figure.
:::

## Exam tips

:::exam-tip
Always draw a sketch with a horizontal line through the observer's eye, the right angle at the foot of the object, and the angle marked from the horizontal.
:::

:::exam-tip
Write "angle of depression = angle of elevation (alternate angles)" when you move an angle; it shows the examiner your reasoning.
:::

:::exam-tip
A quick sense check: a large angle of elevation means you are close to the object, and a small angle means you are far away. If your answer suggests the opposite, you have probably swapped the opposite and adjacent sides.
:::

:::exam-tip
Say which distance you have found ("horizontal distance from the foot of the cliff" or "length of the line of sight"); questions often ask for one but not the other.
:::

## Summary

:::summary
- Angles of elevation (up) and depression (down) are measured from the horizontal.
- The angle of depression from $A$ to $B$ equals the angle of elevation from $B$ to $A$ (alternate angles).
- Use $\tan$ with heights and horizontal distances; use $\sin$ or $\cos$ when the line of sight is involved.
- Add the observer's eye height when angles are measured from eye level.
- For two observations, form two equations for the same height and solve for the unknown distance.
:::
