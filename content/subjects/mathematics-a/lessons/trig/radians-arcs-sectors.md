---
{
  "key": "trig.radians-arcs-sectors",
  "title": "Radians, arcs, sectors and segments",
  "summary": "Use radian measure, convert between degrees and radians, find arc lengths, sector and segment areas and perimeters of compound shapes, and (ZIMSEC) use the small-angle approximations for sin x, tan x and cos x.",
  "concepts": ["amaths.trig.radians-arcs-sectors"],
  "estimatedMinutes": 45,
  "level": "core",
  "freePreview": true
}
---
## Introduction

Engineers designing the curved spillway gates at Kariba, a farmer working out how much ground a centre-pivot irrigator waters, and a mechanic checking how far a point on a tractor wheel travels all measure angles in **radians**. The radian is the natural unit of angle in mathematics: it makes the formulas for arcs and sectors simple, and in calculus the derivative of $\sin x$ is $\cos x$ only when $x$ is in radians.

This topic is ZIMSEC Pure Mathematics (plane trigonometry, Form 5) and Cambridge 9709 Paper 1 (topic 1.4). Typical questions combine sectors with triangles: perimeters and areas of segments, regions bounded by tangents and arcs, and "show that" results. ZIMSEC also examines the small-angle approximations.

## Key definitions

:::definition{term="Radian"}
One radian is the angle subtended at the centre of a circle by an arc equal in length to the radius. A full turn is $2\pi$ radians, so $\pi \text{ rad} = 180^\circ$ and $1 \text{ rad} \approx 57.3^\circ$.
:::

:::definition{term="Sector and segment"}
A **sector** is the region bounded by two radii and an arc. A **segment** is the region bounded by a chord and the arc it cuts off.
:::

:::formula{name="Arc, sector, segment (θ in radians; arc and sector are in MF19)"}
$$
s = r\theta \qquad A_{\text{sector}} = \frac{1}{2}r^2\theta \qquad A_{\text{segment}} = \frac{1}{2}r^2(\theta - \sin\theta)
$$
:::

:::formula{name="Small-angle approximations (ZIMSEC; x in radians)"}
$$
\sin x \approx x \qquad \tan x \approx x \qquad \cos x \approx 1 - \frac{x^2}{2}
$$
:::

Cambridge's MF19 prints the arc length and sector area formulas, but not the segment formula or the small-angle approximations; ZIMSEC supplies no list, so learn them all.

## Converting between degrees and radians

Multiply by $\dfrac{\pi}{180}$ to go from degrees to radians and by $\dfrac{180}{\pi}$ to go back. Angles written as multiples of $\pi$ are in radians; an angle given without the degree sign in an A-Level question is in radians.

| Degrees | $30^\circ$ | $45^\circ$ | $60^\circ$ | $90^\circ$ | $120^\circ$ | $135^\circ$ | $150^\circ$ | $180^\circ$ | $270^\circ$ |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Radians | $\frac{\pi}{6}$ | $\frac{\pi}{4}$ | $\frac{\pi}{3}$ | $\frac{\pi}{2}$ | $\frac{2\pi}{3}$ | $\frac{3\pi}{4}$ | $\frac{5\pi}{6}$ | $\pi$ | $\frac{3\pi}{2}$ |

:::worked-solution[Example 1: convert $135^\circ$ to radians exactly, and $2.5$ radians to degrees]
1. $135 \times \dfrac{\pi}{180} = \dfrac{135\pi}{180} = \dfrac{3\pi}{4}$.
2. $2.5 \times \dfrac{180}{\pi} = 143.239\ldots$, so $2.5 \text{ rad} = 143.2^\circ$ to 1 decimal place.
:::

Before any calculation with radians, set your calculator to **radian mode**. In degree mode $\sin 1.3$ gives $0.0227$ instead of $0.964$, and every later answer is wrong.

## Arc length and sector area

A sector with angle $\theta$ is the fraction $\dfrac{\theta}{2\pi}$ of the whole circle. Its arc is that fraction of the circumference $2\pi r$, and its area is that fraction of $\pi r^2$:

$$
s = \frac{\theta}{2\pi} \times 2\pi r = r\theta \qquad A = \frac{\theta}{2\pi} \times \pi r^2 = \frac{1}{2}r^2\theta
$$

The perimeter of a sector is $2r + r\theta$: two radii plus the arc.

:::worked-solution[Example 2: a sector has radius 12 cm and angle 0.9 radians. Find its arc length, area and perimeter]
1. Arc: $s = 12 \times 0.9 = 10.8$ cm.
2. Area: $A = \frac{1}{2} \times 12^2 \times 0.9 = \frac{1}{2} \times 144 \times 0.9 = 64.8$ cm$^2$.
3. Perimeter: $12 + 12 + 10.8 = 34.8$ cm.
:::

## Segments and compound shapes

The area of a segment is the sector minus the triangle formed by the two radii and the chord. The triangle has two sides $r$ with included angle $\theta$, so its area is $\frac{1}{2}r^2\sin\theta$. The chord itself has length $2r\sin\frac{\theta}{2}$ (split the isosceles triangle into two right-angled triangles), or use the cosine rule.

:::worked-solution[Example 3: find the area of the segment cut off by a chord of a circle of radius 8 cm that subtends 1.3 radians at the centre]
1. Sector: $\frac{1}{2} \times 64 \times 1.3 = 41.6$ cm$^2$.
2. Triangle: $\frac{1}{2} \times 64 \times \sin 1.3 = 32 \times 0.9636 = 30.83$ cm$^2$ (radian mode).
3. Segment: $41.6 - 30.83 = 10.8$ cm$^2$ to 3 significant figures.
:::

When a question says "exact", keep $\pi$ and surds. The exact values $\sin\frac{\pi}{3} = \frac{\sqrt{3}}{2}$ and $\sin\frac{2\pi}{3} = \frac{\sqrt{3}}{2}$ appear often.

:::worked-solution[Example 4: a chord $AB$ of a circle with centre $O$ and radius 6 cm subtends angle $\frac{2\pi}{3}$ at $O$. Find, exactly, the perimeter and the area of the minor segment]
1. Arc $AB = 6 \times \dfrac{2\pi}{3} = 4\pi$.
2. Chord $AB = 2 \times 6 \sin\dfrac{\pi}{3} = 12 \times \dfrac{\sqrt{3}}{2} = 6\sqrt{3}$.
3. Perimeter of the segment $= 4\pi + 6\sqrt{3}$ cm (about $22.96$ cm).
4. Sector area $= \frac{1}{2} \times 36 \times \dfrac{2\pi}{3} = 12\pi$; triangle area $= \frac{1}{2} \times 36 \times \sin\dfrac{2\pi}{3} = 18 \times \dfrac{\sqrt{3}}{2} = 9\sqrt{3}$.
5. Segment area $= 12\pi - 9\sqrt{3}$ cm$^2$ (about $22.11$ cm$^2$).
:::

![Sector OAB of a circle of radius 6 cm with angle 2π/3 at O: the arc AB is 4π cm (12.57), the chord AB is 6√3 cm (10.39), and the minor segment between chord and arc has area 12π − 9√3 cm², the sector minus triangle OAB.](media:diagrams/radians-minor-segment-sector.png "Figure: the minor segment is the sector OAB minus triangle OAB; arc 4π cm, chord 6√3 cm")

## Finding the radius or the angle

Two facts about a sector give two equations. Use $A = \frac{1}{2}r(r\theta) = \frac{1}{2}rs$ to link area and arc length, or substitute $r\theta$ from the perimeter. Always check that an angle found is less than $2\pi$.

:::worked-solution[Example 5: a sector has perimeter 20 cm and area 16 cm$^2$. Find the radius and the angle]
1. Perimeter: $2r + r\theta = 20$, so $r\theta = 20 - 2r$.
2. Area: $\frac{1}{2}r(r\theta) = 16$, so $\frac{1}{2}r(20 - 2r) = 16$.
3. $10r - r^2 = 16$, so $r^2 - 10r + 16 = 0$ and $(r - 2)(r - 8) = 0$.
4. $r = 2$ gives $\theta = \dfrac{20 - 4}{2} = 8$, which is more than $2\pi \approx 6.28$: impossible for a sector, so reject it.
5. $r = 8$ gives $\theta = \dfrac{20 - 16}{8} = 0.5$ radians.
:::

## Small-angle approximations (ZIMSEC)

For an angle $x$ in radians close to zero, the graph of $y = \sin x$ is very close to the line $y = x$, and similarly for $\tan x$. For cosine, the best simple approximation is the parabola $1 - \frac{x^2}{2}$. These are used to simplify expressions when $x$ is small, typically to find an approximate value or a limit.

![Graphs of y = sin x, y = x and y = tan x for x from 0 to 1.2 radians: near zero all three coincide, at x = 0.5 sin x = 0.479, x = 0.5 and tan x = 0.546, and they separate as x grows, so sin x ≈ x and tan x ≈ x only for small x.](media:diagrams/small-angle-sin-tan-line.png "Figure: sin x and tan x hug the line y = x near 0 and separate as x grows")

:::worked-solution[Example 6: show that, for small $x$, $\dfrac{\sin 3x \tan 2x}{1 - \cos 4x} \approx \dfrac{3}{4}$]
1. $\sin 3x \approx 3x$ and $\tan 2x \approx 2x$, so the numerator $\approx 6x^2$.
2. $\cos 4x \approx 1 - \dfrac{(4x)^2}{2} = 1 - 8x^2$, so the denominator $\approx 8x^2$.
3. The expression $\approx \dfrac{6x^2}{8x^2} = \dfrac{3}{4}$.
4. Check with $x = 0.01$: the calculator gives $0.75009$.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards examine radians, arcs, sectors and segments in the same way (Cambridge Paper 1, often with exact answers). The small-angle approximations are ZIMSEC only; Cambridge 9709 does not include them.
:::

## Common mistakes

:::mistake{title="Using degrees in a radian formula"}
$s = r\theta$ and $A = \frac{1}{2}r^2\theta$ need $\theta$ in radians. Convert $60^\circ$ to $\frac{\pi}{3}$ first.
:::

:::mistake{title="Calculator in degree mode"}
$\sin\theta$ in the segment formula must be evaluated in radian mode when $\theta$ is in radians.
:::

:::mistake{title="Perimeter without the straight edges"}
The perimeter of a sector includes both radii; the perimeter of a segment is arc plus chord.
:::

:::mistake{title="Applying small-angle results to large angles"}
$\sin x \approx x$ only works when $x$ is small and in radians: $\sin 30^\circ$ is not $30$.
:::

## Exam tips

:::exam-tip
In compound-shape questions, draw the diagram, mark every length and angle you know, and write the shaded region as a sum or difference of sectors, triangles and rectangles before calculating.
:::

:::exam-tip
"Show that" results must be reached exactly: keep $\pi$ and surds until the last line.
:::

:::exam-tip
Give non-exact answers to 3 significant figures and angles in radians to 3 significant figures unless told otherwise.
:::

## Summary

:::summary
- $\pi$ rad $= 180^\circ$; multiply by $\frac{\pi}{180}$ to convert degrees to radians.
- Arc $s = r\theta$, sector $A = \frac{1}{2}r^2\theta$, sector perimeter $2r + r\theta$ (θ in radians).
- Segment area $= \frac{1}{2}r^2(\theta - \sin\theta)$; chord $= 2r\sin\frac{\theta}{2}$.
- Two facts about a sector give two equations; reject any angle above $2\pi$.
- ZIMSEC: for small $x$ in radians, $\sin x \approx x$, $\tan x \approx x$, $\cos x \approx 1 - \frac{x^2}{2}$.
:::
