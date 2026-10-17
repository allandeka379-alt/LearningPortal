---
{
  "key": "mensuration.pyramids-cones-spheres",
  "title": "Surface area and volume of pyramids, cones and spheres",
  "summary": "Use formulas to calculate the volume and surface area of pyramids, cones, spheres and hemispheres, including finding the slant height of a cone with Pythagoras' theorem and giving answers in terms of π.",
  "concepts": ["math.mensuration.pyramids-cones-spheres"],
  "objectives": ["zimsec/o-level/mathematics:4.2.3", "cambridge/igcse/mathematics:5.4.2"],
  "estimatedMinutes": 35,
  "level": "core"
}
---
## Introduction

The thatched roof of a round hut is close to a **cone**. A football and a marble are **spheres**, and a mixing bowl is roughly a **hemisphere** (half a sphere). A paperweight shaped like the pyramids of Egypt is a square-based **pyramid**. Unlike prisms, these solids get narrower (or curve) as you move along them, so their formulas are different.

Cambridge papers print these formulas in a formula list; learn them as well, so that you recognise them and use them quickly. Your job is to choose the right formula, find any missing length (often the slant height of a cone, using Pythagoras' theorem) and substitute carefully.

## Key definitions

:::definition{term="Pyramid"}
A solid with a polygon base and triangular faces that meet at a point called the apex.
:::

:::definition{term="Cone"}
A solid with a circular base and a curved surface that narrows to an apex. Its **vertical height** $h$ is measured from the centre of the base straight up to the apex; its **slant height** $l$ is measured along the sloping surface.
:::

:::definition{term="Sphere and hemisphere"}
A sphere is a perfectly round solid in which every point on the surface is the same distance $r$ from the centre. A hemisphere is half a sphere.
:::

:::formula{name="Formulas for pyramids, cones and spheres"}
| Solid | Volume | Surface area |
| --- | --- | --- |
| Pyramid (base area $A$) | $\frac{1}{3}Ah$ | add the areas of the faces |
| Cone | $\frac{1}{3}\pi r^2 h$ | curved surface $\pi rl$ |
| Sphere | $\frac{4}{3}\pi r^3$ | $4\pi r^2$ |
:::

For a hemisphere, halve the sphere: volume $\frac{2}{3}\pi r^3$ and curved surface $2\pi r^2$. A **solid** hemisphere also has a flat circular face, so its total surface area is $2\pi r^2 + \pi r^2 = 3\pi r^2$.

:::keyfact{title="Slant height of a cone"}
The radius, the vertical height and the slant height form a right-angled triangle, so $l^2 = r^2 + h^2$.
:::

## Pyramids and cones

:::worked-solution[Example 1: a square-based pyramid]
A pyramid has a square base of side 6 cm and a vertical height of 10 cm.

1. Base area $= 6 \times 6 = 36\ \text{cm}^2$.
2. Volume $= \frac{1}{3} \times 36 \times 10 = 120\ \text{cm}^3$.
:::

A pyramid (or cone) has exactly one third of the volume of the prism (or cylinder) with the same base and height.

![A cone with radius 6 cm and vertical height 8 cm: the radius, height and slant height form a right-angled triangle, so the slant height is l = √(6² + 8²) = 10 cm.](media:diagrams/cone-slant-height-triangle.png "Figure: the slant height of a cone comes from a right-angled triangle")

:::worked-solution[Example 2: a cone with radius 6 cm and height 8 cm]
1. Slant height: $l = \sqrt{6^2 + 8^2} = \sqrt{100} = 10$ cm.
2. Volume $= \frac{1}{3}\pi \times 6^2 \times 8 = 96\pi \approx 302\ \text{cm}^3$.
3. Curved surface area $= \pi \times 6 \times 10 = 60\pi \approx 188\ \text{cm}^2$.
4. Total surface area (with the circular base) $= 60\pi + 36\pi = 96\pi \approx 302\ \text{cm}^2$.
:::

## Spheres and hemispheres

:::worked-solution[Example 3: a ball of radius 4.5 cm]
1. Volume $= \frac{4}{3}\pi \times 4.5^3 = 121.5\pi = 381.7\ldots \approx 382\ \text{cm}^3$.
2. Surface area $= 4\pi \times 4.5^2 = 81\pi = 254.4\ldots \approx 254\ \text{cm}^2$.
:::

:::worked-solution[Example 4: finding the radius of a sphere]
A sphere has a volume of $1000\ \text{cm}^3$. Find its radius.

1. $\frac{4}{3}\pi r^3 = 1000$.
2. $r^3 = \dfrac{3 \times 1000}{4\pi} = 238.7\ldots$
3. $r = \sqrt[3]{238.7\ldots} = 6.20$ cm (3 s.f.).
:::

:::worked-solution[Example 5: a hemispherical bowl of radius 9 cm]
1. Volume $= \frac{2}{3}\pi \times 9^3 = \frac{2}{3}\pi \times 729 = 486\pi \approx 1527\ \text{cm}^3$, so the bowl holds about 1.53 litres.
2. Inside surface (curved only, because a bowl has no flat top) $= 2\pi \times 9^2 = 162\pi \approx 509\ \text{cm}^2$.
:::

:::example{title="A thatched roof"}
A hut roof is a cone with radius 3.5 m and vertical height 2.4 m. Its slant height is $\sqrt{3.5^2 + 2.4^2} = 4.243\ldots$ m, so the area of thatch needed is $\pi \times 3.5 \times 4.243\ldots \approx 46.7\ \text{m}^2$. The roof has no base, so only the curved surface counts.
:::

## Common mistakes

:::mistake{title="Using the slant height for the volume"}
The volume of a cone uses the **vertical** height: $\frac{1}{3}\pi r^2 h$. The curved surface area uses the **slant** height: $\pi rl$.
:::

:::mistake{title="Forgetting the one third"}
A cone with $r = 6$ and $h = 8$ has volume $96\pi$, not $288\pi$ (that is the cylinder).
:::

:::mistake{title="Missing the flat face of a solid hemisphere"}
A solid hemisphere has a curved surface $2\pi r^2$ **and** a flat circle $\pi r^2$: total $3\pi r^2$. A hollow bowl has only the curved part.
:::

:::mistake{title="Cubing and squaring"}
Sphere volume uses $r^3$; sphere surface area uses $r^2$. Doubling the radius multiplies the volume by 8 and the surface area by 4.
:::

## Exam tips

:::exam-tip
Write the formula you are using (on Cambridge papers it is in the formula list) and then substitute. Write the slant height calculation as a separate line.
:::

:::exam-tip
If the answer is to be "in terms of $\pi$", simplify the number in front: $\frac{1}{3} \times 36 \times 8 = 96$, so $96\pi$.
:::

:::exam-tip
To find a radius from a volume, rearrange step by step, then take the cube root (for a sphere) or square root (for a cone) at the end.
:::

## Summary

:::summary
- Pyramid $V = \frac{1}{3} \times$ base area $\times$ height; cone $V = \frac{1}{3}\pi r^2 h$, curved surface $\pi rl$.
- Slant height of a cone: $l = \sqrt{r^2 + h^2}$.
- Sphere $V = \frac{4}{3}\pi r^3$ and $A = 4\pi r^2$; hemisphere $V = \frac{2}{3}\pi r^3$, curved surface $2\pi r^2$, solid total $3\pi r^2$.
- Use vertical height for volume and slant height for the curved surface.
- Choose the right formula, write it down, then substitute carefully.
:::
