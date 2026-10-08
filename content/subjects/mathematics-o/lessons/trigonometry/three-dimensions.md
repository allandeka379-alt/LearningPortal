---
{
  "key": "trigonometry.three-dimensions",
  "title": "Trigonometry in three dimensions",
  "summary": "Find lengths and angles in cuboids, prisms, pyramids and cones by picking out right-angled triangles, using Pythagoras' theorem and trigonometry, including the length of a space diagonal and the angle between a line and a plane.",
  "concepts": ["math.trigonometry.three-dimensions"],
  "objectives": ["zimsec/o-level/mathematics:10.2.5", "cambridge/igcse/mathematics:6.6.1"],
  "estimatedMinutes": 30,
  "level": "extended"
}
---
## Introduction

How long is the longest straight pole that fits inside a classroom? At what angle does a guy rope meet the ground when it runs from the top of a tent pole to a peg in a corner? These are three-dimensional questions, but they are solved with the same two tools you already know: **Pythagoras' theorem** and **SOH CAH TOA**.

The skill in three dimensions is to **see** the right-angled triangle inside the solid, then draw it on its own as a flat (two-dimensional) triangle. This lesson shows you how to do that for cuboids and pyramids, and how to find the angle between a line and a plane.

## Key definitions

:::definition{term="Space diagonal"}
A line joining two opposite corners of a solid that passes through its inside, such as $AG$ in a cuboid.
:::

:::definition{term="Projection of a line on a plane"}
The "shadow" of the line on the plane: drop a perpendicular from the top end of the line to the plane; the projection runs from the point where the line meets the plane to the foot of that perpendicular.
:::

:::definition{term="Angle between a line and a plane"}
The angle between the line and its projection on the plane.
:::

## Naming a cuboid

A cuboid is usually labelled $ABCDEFGH$ with $ABCD$ as the base, in order, and $E$, $F$, $G$ and $H$ directly above $A$, $B$, $C$ and $D$. So the edges $AE$, $BF$, $CG$ and $DH$ are vertical, and $G$ is the corner diagonally opposite $A$.

:::formula{name="Diagonal of a cuboid with edges l, w and h"}
$$
d = \sqrt{l^2 + w^2 + h^2}
$$
:::

This comes from two uses of Pythagoras: first across the base, then up the height.

## Worked examples

:::worked-solution[Example 1: a space diagonal and its angle with the base]
$ABCDEFGH$ is a cuboid with $AB = 8$ cm, $BC = 6$ cm and $AE = 5$ cm. Find $AC$, $AG$ and the angle between $AG$ and the base $ABCD$.
1. Triangle $ABC$ (in the base) is right-angled at $B$: $AC = \sqrt{8^2 + 6^2} = 10$ cm.
2. $G$ is directly above $C$, so triangle $ACG$ is right-angled at $C$, with $CG = 5$ cm.
3. $AG = \sqrt{10^2 + 5^2} = \sqrt{125} = 11.2$ cm (3 s.f.). Check: $\sqrt{8^2 + 6^2 + 5^2} = \sqrt{125}$.
4. The projection of $AG$ on the base is $AC$, so the angle is angle $GAC$: $\tan(\text{angle } GAC) = \dfrac{5}{10}$, giving $26.6^\circ$ (1 d.p.).
:::

## Pyramids

In a **right pyramid**, the apex $V$ is directly above the centre $M$ of the base. For a rectangular or square base, $M$ is where the diagonals cross, so $AM$ is half a diagonal. The triangle $VMA$ has its right angle at $M$.

:::worked-solution[Example 2: a square-based pyramid]
$VABCD$ is a pyramid with a square base of side 10 cm. The apex $V$ is 12 cm vertically above the centre $M$ of the base. Find the length of the edge $VA$ and the angle between $VA$ and the base.
1. Base diagonal: $AC = \sqrt{10^2 + 10^2} = \sqrt{200} = 14.14\ldots$ cm, so $AM = 7.071\ldots$ cm.
2. Triangle $VMA$ is right-angled at $M$: $VA = \sqrt{12^2 + 7.071^2} = \sqrt{194} = 13.9$ cm (3 s.f.).
3. The projection of $VA$ on the base is $AM$, so the angle is angle $VAM$: $\tan(\text{angle } VAM) = \dfrac{12}{7.071\ldots}$, giving $59.5^\circ$ (1 d.p.).
:::

:::example{title="A step-by-step method for any 3D problem"}
1. Identify the line or angle you need.
2. Find a triangle containing it with a right angle you can justify (an edge perpendicular to a face, the height of a pyramid, a vertical pole).
3. Redraw that triangle flat, label the known lengths, and find any missing side with Pythagoras, often from a second triangle in the base.
4. Use SOH CAH TOA for the angle.
:::

## The angle between a line and a plane

To find the angle between a line $PQ$ and a plane, where $P$ is on the plane:

1. Drop a perpendicular from $Q$ to the plane, meeting it at $N$.
2. $PN$ is the projection of $PQ$, and triangle $PNQ$ has a right angle at $N$.
3. The required angle is angle $QPN$.

Of all the angles a line makes with lines in a plane, the angle with its projection is the **smallest**, which is a useful check on your answer. The angle between a line and a plane is **never** measured to an arbitrary line in the plane: angle $GAB$ in Example 1 is the angle between $AG$ and the **edge** $AB$, which is a different (and larger) angle from angle $GAC$.

## Common mistakes

:::mistake{title="Using the wrong right angle"}
In triangle $ACG$ the right angle is at $C$ (the vertical edge $CG$ meets the base), not at $A$. Mark right angles carefully before using Pythagoras.
:::

:::mistake{title="Angle with an edge instead of the plane"}
The angle between $AG$ and the base is angle $GAC$, using the projection $AC$. Using $AB$ or $AD$ instead gives the angle with an edge.
:::

:::mistake{title="Forgetting to halve the diagonal"}
For a pyramid, the apex is above the **centre** of the base, so use half the base diagonal ($AM$), not the whole diagonal $AC$.
:::

:::mistake{title="Rounding the base diagonal"}
Keep $AC = \sqrt{200}$ or its full calculator value when you use it in a second triangle; rounding it to $14$ changes later answers.
:::

## Exam tips

:::exam-tip
Always draw the flat triangle you are using next to the 3D sketch, with its vertices labelled and the right angle marked. Examiners give method marks for the correct triangle.
:::

:::exam-tip
Name the angle with three letters, for example angle $GAC$, and say which line is the projection.
:::

:::exam-tip
Give lengths to 3 significant figures and angles to 1 decimal place, but keep full accuracy in intermediate steps.
:::

## Summary

:::summary
- Solve 3D problems by finding right-angled triangles inside the solid and redrawing them in 2D.
- Diagonal of a cuboid: $\sqrt{l^2 + w^2 + h^2}$.
- In a right pyramid the apex is above the centre of the base; use half the base diagonal.
- The angle between a line and a plane is the angle between the line and its projection on the plane.
- Use Pythagoras' theorem for lengths and SOH CAH TOA for angles, keeping full accuracy until the end.
:::
