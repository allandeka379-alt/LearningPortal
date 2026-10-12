---
{
  "key": "circular.compound-shapes",
  "title": "Arcs, sectors and segments in compound shapes",
  "summary": "Find chord lengths and segment areas with radian measure, and solve perimeter and area problems for compound shapes made of sectors, segments, triangles and rectangles, using right-angled trigonometry and the sine and cosine rules, with exact answers in terms of π and surds where asked.",
  "concepts": ["amath.circular.compound-shapes"],
  "estimatedMinutes": 45,
  "level": "core"
}
---
## Introduction

Real shapes are rarely a single sector. The window over a church door in Mutare is a rectangle topped by a segment; a school badge may be the overlap of two circles; a belt passing round two pulleys is made of straight pieces and arcs. To find the perimeter or area of such a shape, break it into pieces you can handle: sectors, segments, triangles and rectangles.

This lesson builds on radian measure, arc length and sector area. It is Cambridge 0606 topic 9 (not in the ZIMSEC syllabus). Questions of this kind appear on almost every Cambridge paper, often with a "show that" about an angle followed by perimeter and area parts. You need right-angled trigonometry and the sine and cosine rules, which **are** in the List of formulas.

## Key definitions

:::definition{term="Chord"}
The straight line joining the ends of an arc. For a sector of radius $r$ and angle $\theta$, the chord has length $2r\sin\frac{\theta}{2}$.
:::

:::definition{term="Segment"}
The region between a chord and its arc. The **minor** segment is the smaller one; the major segment is the rest of the circle.
:::

:::formula{name="Segment and chord, θ in radians (not in the List of formulas)"}
$$
\text{area of segment} = \frac{1}{2}r^2\theta - \frac{1}{2}r^2\sin\theta = \frac{1}{2}r^2(\theta - \sin\theta)
$$

$$
\text{chord} = 2r\sin\frac{\theta}{2}
$$
:::

:::formula{name="Triangle results (in the List of formulas)"}
$$
\text{Area} = \frac{1}{2}ab\sin C \qquad a^2 = b^2 + c^2 - 2bc\cos A \qquad \frac{a}{\sin A} = \frac{b}{\sin B} = \frac{c}{\sin C}
$$
:::

## Segments

A segment is a sector with the isosceles triangle $OAB$ removed. The triangle has two sides equal to $r$ with the angle $\theta$ between them, so its area is $\frac{1}{2}r^2\sin\theta$. The chord comes from splitting the isosceles triangle into two right-angled triangles, each with hypotenuse $r$ and angle $\frac{\theta}{2}$ at $O$.

:::worked-solution[Example 1: a sector $OAB$ has radius 10 cm and angle 1.4 radians. Find the length of the chord $AB$, the area of the minor segment and the perimeter of the segment]
1. Chord: $AB = 2 \times 10 \times \sin 0.7 = 12.88\ldots$, so $AB = 12.9$ cm (3 s.f.). Use radian mode.
2. Segment area: $\frac{1}{2}(10^2)(1.4 - \sin 1.4) = 50(1.4 - 0.98545\ldots) = 20.72\ldots$, so $20.7$ cm$^2$ (3 s.f.).
3. Arc: $10 \times 1.4 = 14$ cm.
4. Perimeter of the segment $=$ arc $+$ chord $= 14 + 12.88\ldots = 26.9$ cm (3 s.f.).
:::

![Sector OAB with radius 10 cm and angle 1.4 radians: the chord AB is 12.9 cm, the arc is 14 cm, and the shaded minor segment between the chord and the arc has area 20.7 square centimetres (sector area minus triangle area).](media:diagrams/sector-segment-chord.png "Figure: the minor segment lies between the chord AB and the arc AB")

:::worked-solution[Example 2: find the exact area of the minor segment cut off by a chord that subtends $\frac{\pi}{3}$ at the centre of a circle of radius 6 cm]
1. Sector area: $\frac{1}{2}(36)\left(\frac{\pi}{3}\right) = 6\pi$.
2. Triangle area: $\frac{1}{2}(36)\sin\frac{\pi}{3} = 18 \times \frac{\sqrt{3}}{2} = 9\sqrt{3}$.
3. Segment area $= 6\pi - 9\sqrt{3}$ cm$^2$ (about $3.26$ cm$^2$).
4. The triangle is equilateral (two sides of 6 with a $60^\circ$ angle between them), so the chord is 6 cm.
:::

## Finding the angle first

Many questions give lengths, not the angle. Find the angle at the centre with right-angled trigonometry or the cosine rule, **in radians**.

:::worked-solution[Example 3: a badge is the shape common to two circles, each of radius 5 cm, whose centres $A$ and $B$ are 8 cm apart. Find the area of the badge]
1. The circles meet at $P$ and $Q$. Triangle $APB$ has $AP = 5$ and the midpoint $M$ of $AB$ gives $AM = 4$, with a right angle at $M$.
2. $\cos(\angle PAM) = \frac{4}{5}$, so $\angle PAM = 0.6435\ldots$ and $\angle PAQ = 2 \times 0.6435\ldots = 1.2870\ldots$ radians.
3. One segment (cut off by $PQ$ from the circle with centre $A$): $\frac{1}{2}(25)(1.2870\ldots - \sin 1.2870\ldots) = 12.5(1.2870 - 0.96) = 4.0875\ldots$
4. By symmetry the badge is two equal segments: area $= 2 \times 4.0875\ldots = 8.18$ cm$^2$ (3 s.f.).
:::

:::worked-solution[Example 4: tangents from $P$ touch a circle with centre $O$ and radius 3 cm at $A$ and $B$, and $OP = 6$ cm. Find the exact area and perimeter of the region bounded by $PA$, $PB$ and the minor arc $AB$]
1. $\angle OAP = \frac{\pi}{2}$ (tangent perpendicular to radius). $\cos(\angle AOP) = \frac{3}{6} = \frac{1}{2}$, so $\angle AOP = \frac{\pi}{3}$ and $\angle AOB = \frac{2\pi}{3}$.
2. $PA = \sqrt{6^2 - 3^2} = \sqrt{27} = 3\sqrt{3}$, and $PB = PA$.
3. Kite $OAPB$: two right-angled triangles, area $2 \times \frac{1}{2} \times 3 \times 3\sqrt{3} = 9\sqrt{3}$.
4. Sector $OAB$: $\frac{1}{2}(9)\left(\frac{2\pi}{3}\right) = 3\pi$. Region area $= 9\sqrt{3} - 3\pi$ cm$^2$.
5. Arc $AB = 3 \times \frac{2\pi}{3} = 2\pi$. Perimeter $= 3\sqrt{3} + 3\sqrt{3} + 2\pi = 6\sqrt{3} + 2\pi$ cm.
:::

:::worked-solution[Example 5: in a sector $OAB$, $OA = OB = 7$ cm and the chord $AB$ is 10 cm. Find angle $AOB$ in radians and the area of the minor segment]
1. Cosine rule: $\cos(\angle AOB) = \dfrac{7^2 + 7^2 - 10^2}{2 \times 7 \times 7} = \dfrac{-2}{98}$.
2. $\angle AOB = 1.591$ radians (4 s.f.), slightly more than a right angle, as expected since the cosine is negative.
3. Sector: $\frac{1}{2}(49)(1.5912\ldots) = 38.98\ldots$; triangle: $\frac{1}{2}(49)\sin 1.5912\ldots = 24.49\ldots$
4. Segment area $= 38.98\ldots - 24.49\ldots = 14.5$ cm$^2$ (3 s.f.).
:::

## Planning a compound shape

1. Sketch and label the shape; mark every radius, right angle and equal length.
2. Split the **area** into sectors, segments, triangles and rectangles; add or subtract.
3. For the **perimeter**, follow the boundary round and list each piece: arcs ($r\theta$) and straight edges. Do not include internal lines.
4. Keep full calculator values until the end, or keep exact forms such as $\pi$ and $\sqrt{3}$.

The same shape can often be split in more than one way. In Example 4 the region could also be found as two equal halves, each a right-angled triangle minus a sector of angle $\frac{\pi}{3}$. Choose the split that uses the fewest unknown lengths, and check that the pieces neither overlap nor leave gaps. A quick sanity check is also worth making: a segment must be smaller than its sector, and a region inside a square must be smaller than the square.

:::keyfact{title="ZIMSEC and Cambridge"}
This is Cambridge 0606 content only. The sine and cosine rules and $\frac{1}{2}ab\sin C$ are in the List of formulas; the segment and chord results are not, so derive them as "sector minus triangle" and "two right-angled triangles" if you forget them.
:::

## Common mistakes

:::mistake{title="Calculator in degree mode"}
$\sin 1.4$ must be found in radian mode ($0.985$). In degree mode you get $0.0244$ and a segment area that is far too large.
:::

:::mistake{title="Adding internal lines to a perimeter"}
The perimeter of a segment is the arc plus the chord, not the arc plus two radii.
:::

:::mistake{title="Using θ instead of θ/2 for the chord"}
The chord is $2r\sin\frac{\theta}{2}$, from the half-triangle. $2r\sin\theta$ is wrong.
:::

:::mistake{title="Rounding the angle too early"}
Using $\theta = 1.29$ instead of $1.2870\ldots$ in Example 3 changes the answer in the third significant figure. Store the angle in your calculator.
:::

## Exam tips

:::exam-tip
"Show that angle $AOB = 1.287$ radians, correct to 4 significant figures" needs a calculation that gives more figures than stated, such as $2\cos^{-1}(0.8) = 1.28700\ldots$
:::

:::exam-tip
When the question says "exact", combine terms like $9\sqrt{3} - 3\pi$; do not convert to decimals.
:::

:::exam-tip
Write a word equation first, for example "shaded area $=$ kite $-$ sector". It earns method marks and keeps you organised.
:::

## Summary

:::summary
- Segment area $= \frac{1}{2}r^2(\theta - \sin\theta)$: sector minus triangle, with $\theta$ in radians.
- Chord $= 2r\sin\frac{\theta}{2}$; perimeter of a segment $=$ arc $+$ chord.
- Find unknown angles with right-angled trigonometry or the cosine rule, in radians.
- A tangent is perpendicular to the radius, which often creates right-angled triangles.
- Split compound shapes into sectors, segments, triangles and rectangles; follow only the outer boundary for a perimeter.
:::
