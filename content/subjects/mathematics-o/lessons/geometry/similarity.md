---
{
  "key": "geometry.similarity",
  "title": "Similarity",
  "summary": "Recognise similar shapes, find the scale factor and missing lengths, show that two triangles are similar, and use the area factor k² and the volume factor k³ for similar shapes and solids, including capacities and masses.",
  "concepts": ["math.geometry.similarity"],
  "objectives": ["zimsec/o-level/mathematics:8.4.1", "zimsec/o-level/mathematics:8.4.2", "cambridge/igcse/mathematics:4.4.1", "cambridge/igcse/mathematics:4.4.2", "cambridge/igcse/mathematics:4.4.3"],
  "estimatedMinutes": 20,
  "level": "extended"
}
---
## Introduction

A photograph printed at two sizes, a scale model of a new school block, a small and a large tin of cooking oil made to the same design: each pair has the same shape but a different size. Shapes like these are **similar**, and one number, the **scale factor**, connects every pair of matching lengths.

In this lesson you will find missing lengths in similar shapes, decide whether two triangles are similar, and see how areas and volumes change when lengths are scaled. The area and volume work (and showing that triangles are similar) is Extended material for Cambridge and part of the ZIMSEC syllabus, which also asks about the masses of similar solids.

## Key definitions

:::definition{term="Similar shapes"}
Shapes with the same angles, in which every length of one is the matching (corresponding) length of the other multiplied by the same number.
:::

:::definition{term="Scale factor (length factor) k"}
The number every length is multiplied by: $k = \dfrac{\text{length on the new shape}}{\text{corresponding length on the original}}$. If $k > 1$ the shape is enlarged; if $0 < k < 1$ it is reduced.
:::

:::definition{term="Corresponding sides"}
Sides in matching positions: in similar triangles they are opposite equal angles.
:::

## Finding missing lengths

1. Identify a pair of corresponding sides whose lengths are both known.
2. Work out $k$ by dividing.
3. Multiply (to go to the larger shape) or divide (to go to the smaller) to find other lengths.

:::worked-solution[Example 1: two similar triangles]
Triangle $ABC$ has $AB = 6$ cm, $BC = 8$ cm and $AC = 9$ cm. Triangle $PQR$ is similar to it, with $PQ = 9$ cm corresponding to $AB$. Find $QR$ and $PR$.
1. $k = \dfrac{PQ}{AB} = \dfrac{9}{6} = 1.5$.
2. $QR = 1.5 \times 8 = 12$ cm.
3. $PR = 1.5 \times 9 = 13.5$ cm.
:::

## Similar triangles

Two triangles are similar if **any one** of these is true:

- two angles of one are equal to two angles of the other (then the third angles are equal too);
- all three pairs of corresponding sides are in the same ratio;
- two pairs of sides are in the same ratio and the angles between them are equal.

A common case is a triangle with a line drawn **parallel** to one side. If $DE \parallel BC$ in triangle $ABC$ (with $D$ on $AB$ and $E$ on $AC$), triangles $ADE$ and $ABC$ are similar: angle $A$ is shared, and angle $ADE$ = angle $ABC$ (corresponding angles).

:::worked-solution[Example 2: a line parallel to one side]
In triangle $ABC$, $D$ is on $AB$ and $E$ is on $AC$ with $DE \parallel BC$. $AD = 4$ cm, $DB = 6$ cm, $DE = 5$ cm and $AE = 3$ cm. Find $BC$ and $EC$.
1. Compare the **whole** side $AB$ with $AD$: $AB = 4 + 6 = 10$ cm.
2. $k = \dfrac{AB}{AD} = \dfrac{10}{4} = 2.5$.
3. $BC = 2.5 \times 5 = 12.5$ cm.
4. $AC = 2.5 \times 3 = 7.5$ cm, so $EC = 7.5 - 3 = 4.5$ cm.
:::

:::example{title="Showing that two triangles are similar"}
The lines $AE$ and $BD$ cross at $C$, and $AB \parallel DE$. In triangles $ABC$ and $EDC$: angle $ACB$ = angle $ECD$ (vertically opposite angles are equal), and angle $BAC$ = angle $DEC$ (alternate angles are equal). Two pairs of angles are equal, so the triangles are similar, with $A \leftrightarrow E$, $B \leftrightarrow D$ and $C \leftrightarrow C$. Write the reasons: they carry the marks.
:::

## Areas and volumes of similar shapes

If every length is multiplied by $k$, an area (length $\times$ length) is multiplied by $k^2$ and a volume (length $\times$ length $\times$ length) is multiplied by $k^3$.

:::formula{name="Length, area and volume factors"}
$$
\text{length factor} = k \qquad \text{area factor} = k^2 \qquad \text{volume factor} = k^3
$$
:::

Surface areas of similar solids use $k^2$. Capacities use $k^3$, and so do **masses** of similar solids made of the same material, because mass is proportional to volume.

:::worked-solution[Example 3: similar photo frames]
Two photo frames are similar. Their widths are 20 cm and 30 cm. The smaller frame has an area of $48\ \text{cm}^2$. Find the area of the larger.
1. $k = \dfrac{30}{20} = 1.5$.
2. Area factor $= k^2 = 2.25$.
3. Area $= 48 \times 2.25 = 108\ \text{cm}^2$.
:::

:::worked-solution[Example 4: similar tins of cooking oil]
Two tins are similar. Their heights are 12 cm and 18 cm, and the smaller holds 0.8 litres. How much does the larger hold?
1. $k = \dfrac{18}{12} = 1.5$.
2. Volume factor $= k^3 = 1.5^3 = 3.375$.
3. Capacity $= 0.8 \times 3.375 = 2.7$ litres.
:::

:::worked-solution[Example 5: working back from areas]
Two similar statues are made of the same stone. Their surface areas are $500\ \text{cm}^2$ and $2000\ \text{cm}^2$, and the smaller has a mass of 300 g. Find the mass of the larger.
1. Area factor $= \dfrac{2000}{500} = 4 = k^2$, so $k = \sqrt{4} = 2$.
2. Volume (and mass) factor $= k^3 = 8$.
3. Mass $= 300 \times 8 = 2400$ g $= 2.4$ kg.
:::

## Common mistakes

:::mistake{title="Using part of a side"}
In Example 2, the ratio is $\frac{AB}{AD} = \frac{10}{4}$, not $\frac{DB}{AD} = \frac{6}{4}$. Always compare a whole side of the large triangle with the matching side of the small one.
:::

:::mistake{title="Scaling areas and volumes by k"}
Doubling the lengths multiplies the area by $4$ and the volume by $8$, not by $2$.
:::

:::mistake{title="Adding instead of multiplying"}
If one side grows from 6 cm to 9 cm, the others are multiplied by $1.5$; they do **not** all grow by 3 cm.
:::

:::mistake{title="Matching the wrong sides"}
Corresponding sides are opposite equal angles. Redraw the triangles the same way round before comparing sides.
:::

## Exam tips

:::exam-tip
When asked to **show** that triangles are similar, name the two pairs of equal angles **with a reason for each** (common angle, vertically opposite, alternate, corresponding).
:::

:::exam-tip
Given areas or volumes, go back to the length factor first: $k = \sqrt{\text{area factor}}$ or $k = \sqrt[3]{\text{volume factor}}$.
:::

:::exam-tip
Keep the factor as an exact fraction such as $\frac{5}{3}$ where possible; a rounded factor cubed can change the final answer.
:::

## Summary

:::summary
- Similar shapes have equal angles and corresponding lengths in the same ratio $k$.
- Triangles are similar if two pairs of angles are equal (or all sides, or two sides and the included angle, are in proportion).
- A line parallel to one side of a triangle cuts off a similar triangle; use whole sides for the ratio.
- Areas scale by $k^2$; volumes, capacities and masses (same material) scale by $k^3$.
- From areas or volumes, find $k$ first with a square root or a cube root.
:::
