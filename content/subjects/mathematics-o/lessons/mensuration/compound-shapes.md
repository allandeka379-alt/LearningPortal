---
{
  "key": "mensuration.compound-shapes",
  "title": "Compound shapes and solids",
  "summary": "Find perimeters, areas, surface areas and volumes of compound shapes and solids, and of parts of shapes, by splitting into simple pieces or subtracting, including frustums (Cambridge Extended).",
  "concepts": ["math.mensuration.compound-shapes"],
  "objectives": ["zimsec/o-level/mathematics:4.2.1", "zimsec/o-level/mathematics:4.2.3", "cambridge/igcse/mathematics:5.5.1", "cambridge/igcse/mathematics:5.5.2"],
  "estimatedMinutes": 40,
  "level": "extended"
}
---
## Introduction

Real objects are rarely a single simple shape. An athletics track is a rectangle with a semicircle at each end. A grain silo on a farm near Banket is a cylinder with a cone on top. A bucket is a cone with its tip cut off. An L-shaped classroom is two rectangles joined together. These are **compound** shapes and solids.

There is no new formula to learn in this lesson. The skill is to **break the problem into pieces** you already know (rectangles, triangles, circles, prisms, cylinders, cones, spheres), then add or subtract. You should be confident with all the earlier mensuration lessons before you start.

## Key definitions

:::definition{term="Compound shape"}
A shape made by joining or removing simpler shapes, for example a rectangle with a semicircle on one end.
:::

:::definition{term="Compound solid"}
A solid made from simpler solids, for example a cylinder topped by a cone or a hemisphere.
:::

:::definition{term="Frustum"}
The part of a cone (or pyramid) left when the top is cut off by a cut parallel to the base. Its volume is the large cone minus the small cone that was removed.
:::

:::keyfact{title="Two strategies"}
**Add**: split the shape into pieces and add their areas or volumes. **Subtract**: start with a bigger simple shape and take away the missing part. Choose whichever needs fewer, easier calculations.
:::

## Compound areas and perimeters

:::worked-solution[Example 1: an L-shaped room]
A room is a 10 m by 8 m rectangle with a 4 m by 3 m rectangle missing from one corner.

1. Area by subtraction: $10 \times 8 - 4 \times 3 = 80 - 12 = 68\ \text{m}^2$.
2. Perimeter: the two edges of the notch (4 m and 3 m) replace the parts of the rectangle's edges that were removed, so the perimeter is still $2(10 + 8) = 36$ m.
:::

:::worked-solution[Example 2: an athletics track]
The inside edge of a track is a rectangle 100 m long and 64 m wide, with a semicircle on each 64 m end.

1. The two semicircles make one full circle of diameter 64 m (radius 32 m).
2. Perimeter $= 100 + 100 + \pi \times 64 = 200 + 64\pi = 401.06\ldots \approx 401$ m. The 64 m ends are **inside** the shape, so they are not part of the perimeter.
3. Area $= 100 \times 64 + \pi \times 32^2 = 6400 + 3216.99\ldots = 9616.99\ldots \approx 9620\ \text{m}^2$.
:::

:::example{title="A shaded region"}
A circle of diameter 10 cm is cut from a square of side 10 cm. The area left is $10^2 - \pi \times 5^2 = 100 - 25\pi = 21.5\ \text{cm}^2$ (3 s.f.).
:::

## Compound solids

:::worked-solution[Example 3: a grain silo]
A silo is a cylinder of radius 3 m and height 8 m with a cone of the same radius and height 2 m on top.

1. Cylinder: $\pi \times 3^2 \times 8 = 72\pi$.
2. Cone: $\frac{1}{3}\pi \times 3^2 \times 2 = 6\pi$.
3. Total volume $= 78\pi = 245.04\ldots \approx 245\ \text{m}^3$.
:::

For the **surface area** of a compound solid, include only the surfaces on the outside. Where the cone sits on the cylinder, the circle between them is hidden, so it is not counted.

:::worked-solution[Example 4: an ice-cream cone]
A cone of radius 3 cm and height 10 cm has a hemisphere of radius 3 cm on top.

1. Cone: $\frac{1}{3}\pi \times 9 \times 10 = 30\pi$.
2. Hemisphere: $\frac{2}{3}\pi \times 27 = 18\pi$.
3. Total volume $= 48\pi \approx 151\ \text{cm}^3$.
:::

## Frustums (Extended)

:::worked-solution[Example 5: a bucket]
A bucket is a frustum. It was made from a cone of radius 15 cm and height 30 cm by cutting off a small cone of radius 5 cm and height 10 cm from the top.

1. Large cone: $\frac{1}{3}\pi \times 15^2 \times 30 = 2250\pi$.
2. Small cone: $\frac{1}{3}\pi \times 5^2 \times 10 = \frac{250}{3}\pi$.
3. Frustum $= 2250\pi - \frac{250}{3}\pi = \frac{6500}{3}\pi = 6806.8\ldots\ \text{cm}^3$.
4. Capacity $\approx 6.81$ litres.
:::

## Common mistakes

:::mistake{title="Counting internal edges in a perimeter"}
In the track, the two 64 m lines where the semicircles join the rectangle are inside the shape. The perimeter includes only the outside edges.
:::

:::mistake{title="Counting hidden faces in a surface area"}
When a cone sits on a cylinder, the circle where they meet is not on the outside. Do not add it to the surface area.
:::

:::mistake{title="Averaging the radii of a frustum"}
A frustum's volume is **not** a cylinder with the average radius. Always find large cone minus small cone.
:::

:::mistake{title="Rounding parts too early"}
If you round each piece before adding or subtracting, the final answer can be wrong in the third significant figure. Keep full values, or work in terms of $\pi$, until the end.
:::

## Exam tips

:::exam-tip
Draw the separate pieces and label their dimensions before calculating. Many marks are for a correct method on each piece.
:::

:::exam-tip
Look for missing lengths: the length of a notch, a radius that equals half a width, or a slant height from Pythagoras' theorem.
:::

:::exam-tip
Working in terms of $\pi$ (for example $72\pi + 6\pi = 78\pi$) keeps the arithmetic simple and exact. Convert to a decimal only at the last step.
:::

## Summary

:::summary
- Split compound shapes into simple pieces and add, or start with a bigger shape and subtract.
- A perimeter includes only the outside edges; a surface area includes only the outside faces.
- Compound solids: add the volumes of the parts (cylinder plus cone, cone plus hemisphere, and so on).
- Frustum volume $=$ large cone $-$ small cone (Cambridge Extended).
- Keep full accuracy (or work in terms of $\pi$) until the final answer.
:::
