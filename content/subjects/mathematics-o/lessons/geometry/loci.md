---
{
  "key": "geometry.loci",
  "title": "Loci",
  "summary": "Recognise and construct the four standard loci (a fixed distance from a point or a line, equidistant from two points or from two intersecting lines), find points that satisfy two conditions, and describe and shade regions.",
  "concepts": ["math.geometry.loci"],
  "objectives": ["zimsec/o-level/mathematics:8.5.3"],
  "estimatedMinutes": 20,
  "level": "core"
}
---
## Introduction

A village near Gokwe is drilling a new borehole. The council wants it to be the same distance from two schools and no more than 2 km from the clinic. Where can it go? Questions like this are answered with **loci**: sets of points that obey a rule.

In this lesson you will meet the four standard loci, see how two loci together pin down a point or a region, and practise describing regions in words. You will need the ZIMSEC ruler-and-compasses constructions (the perpendicular bisector and the angle bisector) from the constructions lesson.

:::note{title="ZIMSEC only"}
Loci are in the ZIMSEC O-Level syllabus. They are not part of Cambridge IGCSE Mathematics (0580).
:::

## Key definitions

:::definition{term="Locus"}
The set of **all** the points that obey a given rule, or the path traced by a point that moves according to the rule. The plural is **loci**.
:::

:::definition{term="Region"}
An area containing all the points that obey a condition such as "less than 3 m from $A$". A region is usually shown by shading.
:::

:::definition{term="Equidistant"}
The same distance from two (or more) things.
:::

## The four standard loci

![The four standard loci: a circle for a fixed distance from a point; two parallel lines joined by semicircles for a fixed distance from a line segment; the perpendicular bisector for points equidistant from two points A and B; and the angle bisector for points equidistant from two lines meeting at O.](media:diagrams/loci-four-standard.png "Figure: the four standard loci")

:::keyfact{title="1. A fixed distance from a point"}
The locus of points $r$ cm from a fixed point $P$ is a **circle** with centre $P$ and radius $r$ cm. Points **less than** $r$ cm from $P$ fill the inside of the circle.
:::

:::keyfact{title="2. A fixed distance from a line"}
The locus of points $d$ cm from an (endless) straight line is **a pair of parallel lines**, one on each side, $d$ cm away. For a line **segment** $AB$, the locus is two straight lines parallel to $AB$ and the same length, joined by **semicircles** of radius $d$ centred on $A$ and $B$: a running-track shape.
:::

:::keyfact{title="3. Equidistant from two points"}
The locus of points equidistant from $A$ and $B$ is the **perpendicular bisector** of $AB$. Points nearer to $A$ than to $B$ are on $A$'s side of it.
:::

:::keyfact{title="4. Equidistant from two intersecting lines"}
The locus of points equidistant from two intersecting lines is the pair of lines that **bisect the angles** between them. Inside one angle, such as angle $XOY$, it is the bisector of that angle.
:::

## Worked examples

:::worked-solution[Example 1: a tethered goat]
A goat is tied to a peg $P$ in an open field by a rope 5 m long. Describe where it can graze and find the area.
1. The furthest the goat can reach is 5 m from $P$ in every direction, so the boundary is a circle with centre $P$ and radius 5 m.
2. It can graze anywhere **inside** this circle as well.
3. Area $= \pi \times 5^2 = 25\pi = 78.5\ \text{m}^2$ (3 s.f.).
:::

:::worked-solution[Example 2: two conditions in a garden]
A rectangular garden $ABCD$ has $AB = 8$ m and $BC = 6$ m. A tap $T$ must be equidistant from $A$ and $B$, and exactly 5 m from $A$. Where is $T$?
1. Equidistant from $A$ and $B$: $T$ lies on the perpendicular bisector of $AB$, the line parallel to $BC$ that is 4 m from $A$ and 4 m from $B$.
2. Exactly 5 m from $A$: $T$ lies on the circle centred on $A$ with radius 5 m.
3. Where they meet, $T$ is 4 m along from $AD$, and by Pythagoras its distance from $AB$ is $\sqrt{5^2 - 4^2} = 3$ m.
4. So $T$ is 4 m from $AD$ and 3 m from $AB$: the centre of the garden. (The other crossing point is outside the garden.)
:::

![Rectangular garden ABCD with AB = 8 m and BC = 6 m: the dashed perpendicular bisector of AB meets the quarter-circle of radius 5 m centred on A at the tap T, which is 4 m from AD and 3 m from AB, the centre of the garden.](media:diagrams/loci-garden-tap.png "Figure: two loci cross at the tap T")

:::worked-solution[Example 3: points 2 cm from a line segment]
$AB$ is a line segment 6 cm long. Describe the locus of points 2 cm from $AB$ and find its length.
1. Along the sides: two segments parallel to $AB$, each 6 cm long and 2 cm away from it.
2. At the ends: two semicircles of radius 2 cm, centred on $A$ and on $B$.
3. Each semicircle has length $\frac{1}{2} \times 2\pi \times 2 = 2\pi$ cm; together they make one full circle of radius 2 cm.
4. Total length $= 2 \times 6 + 2 \times 2\pi = 12 + 4\pi = 24.6$ cm (3 s.f.).
:::

## Regions and shading

- "**Less than** 4 cm from $A$": inside the circle; the boundary itself is not included (often drawn dashed).
- "**At most** 4 cm" or "not more than 4 cm": inside the circle, boundary included (solid line).
- "**Nearer to** $A$ than to $B$": the side of the perpendicular bisector of $AB$ that contains $A$.
- "**Nearer to** line $AB$ than to line $AC$": the side of the angle bisector at $A$ that contains $AB$.

When several conditions apply, the required region is where **all** the regions overlap. Read whether the question wants you to shade the region you **want** or the parts you **do not want**.

:::example{title="Describing a region in words"}
In triangle $ABC$, the shaded region contains points that are nearer to $AB$ than to $AC$ and less than 3 cm from $A$. To draw it: bisect angle $BAC$, draw an arc of radius 3 cm centred on $A$, and shade the part of the triangle that is inside the arc **and** on the $AB$ side of the bisector.
:::

## Common mistakes

:::mistake{title="Two points or two lines?"}
Equidistant from two **points** gives a perpendicular bisector. Equidistant from two **lines** gives an angle bisector. Read which one the question means.
:::

:::mistake{title="Forgetting part of a locus"}
Points 3 cm from an endless line lie on **both** sides of it. Points 3 cm from a line segment also go round the ends in semicircles.
:::

:::mistake{title="Wrong boundary"}
"Less than" excludes the boundary; "at most" includes it. Use a dashed or solid line as the question requires.
:::

:::mistake{title="Guessing instead of constructing"}
Loci must be constructed accurately with compasses and ruler. A freehand curve or a "by eye" bisector loses the marks.
:::

## Exam tips

:::exam-tip
Construct each locus in turn, label it ("locus of points 5 m from $A$"), and only then decide which region to shade.
:::

:::exam-tip
When a question asks for points that satisfy two conditions, the answer is where the two loci **cross**. There may be two such points, one, or none: say how many you found.
:::

:::exam-tip
Distances on the drawing usually come from a scale. Convert real distances to centimetres on the drawing before opening the compasses.
:::

## Summary

:::summary
- A locus is the set of all points that obey a rule.
- Fixed distance from a point: a circle. Fixed distance from a line: parallel lines (with semicircular ends for a segment).
- Equidistant from two points: the perpendicular bisector. Equidistant from two lines: the angle bisectors.
- Points obeying two rules lie where the loci meet; regions overlap.
- "Less than" excludes the boundary; "at most" includes it.
:::
