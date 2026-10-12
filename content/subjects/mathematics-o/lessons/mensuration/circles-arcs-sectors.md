---
{
  "key": "mensuration.circles-arcs-sectors",
  "title": "Circles, arcs and sectors",
  "summary": "Calculate the circumference and area of a circle, arc lengths and sector areas as fractions of the circle (minor and major), answers in terms of π, and the area of a segment.",
  "concepts": ["math.mensuration.circles-arcs-sectors"],
  "objectives": ["zimsec/o-level/mathematics:4.2.1", "zimsec/o-level/mathematics:4.2.2", "cambridge/igcse/mathematics:5.3.1", "cambridge/igcse/mathematics:5.3.2"],
  "estimatedMinutes": 35,
  "level": "extended"
}
---
## Introduction

Circles are everywhere: the floor of a round hut, a grain bin, a bicycle wheel, and the huge green circles made by centre-pivot irrigation on commercial farms, where a long sprinkler arm turns slowly about a fixed point. A slice of a circle, like a piece cut from a round cake, is a **sector**.

In this lesson you will calculate lengths and areas of circles and of their parts. Questions often ask for answers "in terms of $\pi$" (exact) or "correct to 3 significant figures" (using the $\pi$ key on your calculator).

## Key definitions

:::definition{term="Radius and diameter"}
The radius $r$ is the distance from the centre to the circle. The diameter $d$ is a chord through the centre: $d = 2r$.
:::

:::definition{term="Circumference"}
The perimeter of a circle.
:::

:::definition{term="Arc and sector"}
An arc is part of the circumference. A sector is the region between two radii and an arc. The smaller one is the **minor** arc or sector and the larger one is the **major** arc or sector.
:::

:::definition{term="Chord and segment"}
A chord is a straight line joining two points on a circle. A segment is the region between a chord and an arc.
:::

:::formula{name="Circle formulas"}
$$
C = 2\pi r = \pi d \qquad A = \pi r^2
$$

For a sector with angle $\theta$ at the centre:

$$
\text{arc length} = \frac{\theta}{360} \times 2\pi r \qquad \text{sector area} = \frac{\theta}{360} \times \pi r^2
$$
:::

The fraction $\frac{\theta}{360}$ says what part of the whole circle the sector is. A $90^\circ$ sector is a quarter of the circle; a $72^\circ$ sector is $\frac{72}{360} = \frac{1}{5}$.

## Whole circles

:::worked-solution[Example 1: radius 7 cm]
1. Circumference: $C = 2\pi \times 7 = 14\pi = 43.98\ldots \approx 44.0$ cm.
2. Area: $A = \pi \times 7^2 = 49\pi = 153.93\ldots \approx 154\ \text{cm}^2$.
3. In terms of $\pi$, the answers are $14\pi$ cm and $49\pi\ \text{cm}^2$.
:::

:::worked-solution[Example 2: finding the radius from the circumference]
A circle has a circumference of 50 cm. Find its radius.

1. $2\pi r = 50$.
2. $r = \dfrac{50}{2\pi} = 7.957\ldots \approx 7.96$ cm.
:::

## Arcs and sectors

:::worked-solution[Example 3: a sector of radius 9 cm and angle $40^\circ$]
1. Fraction of the circle: $\frac{40}{360} = \frac{1}{9}$.
2. Arc length $= \frac{1}{9} \times 2\pi \times 9 = 2\pi \approx 6.28$ cm.
3. Sector area $= \frac{1}{9} \times \pi \times 81 = 9\pi \approx 28.3\ \text{cm}^2$.
4. Perimeter of the sector $=$ arc $+$ two radii $= 2\pi + 18 \approx 24.3$ cm.
:::

To find the angle of a sector, rearrange: if the arc is $5\pi$ cm and the radius is 10 cm, then $\frac{\theta}{360} \times 20\pi = 5\pi$, so $\theta = 90^\circ$.

For a **major** sector, use $360^\circ$ minus the minor angle. A circle of radius 5 cm with a minor sector of $72^\circ$ has a major sector of $288^\circ$, whose arc is $\frac{288}{360} \times 10\pi = 8\pi$ cm.

## Segments (ZIMSEC and Cambridge Extended)

A segment is a sector with the triangle removed. Use the area of a triangle $\frac{1}{2}ab\sin C$, with $a = b = r$.

![Left: a sector of radius 9 cm and angle 40° (one ninth of the circle) with arc length 2π ≈ 6.28 cm and area 9π ≈ 28.3 cm². Right: a segment of a circle of radius 8 cm cut off by a chord at 60°, whose area is the sector 33.51 cm² minus the triangle 27.71 cm², about 5.80 cm².](media:diagrams/circle-sector-and-segment.png "Figure: a sector is a fraction θ/360 of the circle; a segment is a sector minus a triangle")

:::worked-solution[Example 4: the area of a segment]
A chord cuts off a segment of a circle of radius 8 cm. The chord subtends an angle of $60^\circ$ at the centre.

1. Sector area $= \frac{60}{360} \times \pi \times 8^2 = \frac{64\pi}{6} = 33.51\ldots\ \text{cm}^2$.
2. Triangle area $= \frac{1}{2} \times 8 \times 8 \times \sin 60^\circ = 27.71\ldots\ \text{cm}^2$.
3. Segment area $= 33.51\ldots - 27.71\ldots = 5.80\ \text{cm}^2$ (3 s.f.).
:::

:::example{title="A centre-pivot field"}
A sprinkler arm 400 m long waters a circular field. Its area is $\pi \times 400^2 = 502\,655\ \text{m}^2$, which is about 50.3 hectares.
:::

## Common mistakes

:::mistake{title="Using the diameter in place of the radius"}
For a circle of diameter 10 cm, the area is $\pi \times 5^2 = 25\pi$, not $\pi \times 10^2 = 100\pi$.
:::

:::mistake{title="Mixing up circumference and area"}
$2\pi r$ is a length (cm); $\pi r^2$ is an area ($\text{cm}^2$). Check the units you are asked for.
:::

:::mistake{title="Forgetting the radii in a sector perimeter"}
The perimeter of a sector is the arc **plus** two radii. The arc alone is not the perimeter.
:::

:::mistake{title="Doubling the radius does not double the area"}
If the radius doubles, the area is multiplied by $2^2 = 4$, because $\pi(2r)^2 = 4\pi r^2$.
:::

## Exam tips

:::exam-tip
"Give your answer in terms of $\pi$" means leave $\pi$ as a symbol, for example $9\pi\ \text{cm}^2$. Do not use 3.142 at all in those questions.
:::

:::exam-tip
Use the $\pi$ key on your calculator (not 3.14) unless told otherwise, and give answers to 3 significant figures. Keep full accuracy until the final step, especially in segment questions where you subtract two close values.
:::

:::exam-tip
On Cambridge Core papers, sector angles are factors of 360, such as $40^\circ$, $72^\circ$ or $120^\circ$, so the fraction simplifies nicely. Extended papers can use any angle.
:::

## Summary

:::summary
- $C = 2\pi r = \pi d$ and $A = \pi r^2$; check whether you have the radius or the diameter.
- Arc length $= \frac{\theta}{360} \times 2\pi r$ and sector area $= \frac{\theta}{360} \times \pi r^2$.
- Sector perimeter $=$ arc length $+ 2r$; a major sector has angle $360^\circ - \theta$.
- Segment area $=$ sector area $- \frac{1}{2}r^2 \sin\theta$.
- "In terms of $\pi$" means leave $\pi$ in the answer; otherwise use the $\pi$ key and 3 significant figures.
:::
