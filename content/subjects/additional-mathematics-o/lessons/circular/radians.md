---
{
  "key": "circular.radians",
  "title": "Radian measure, arc length and sector area",
  "summary": "Understand the radian, convert between degrees and radians, learn the exact radian values of common angles, and use s = rθ and A = ½r²θ (θ in radians) to find arc lengths, sector areas and perimeters, or to find a radius or angle from given information.",
  "concepts": ["amath.circular.radians"],
  "estimatedMinutes": 35,
  "level": "core"
}
---
## Introduction

Degrees are a human choice: 360 of them in a full turn, probably because of ancient calendars. Mathematics has a more natural unit, the **radian**, which links an angle directly to lengths on a circle. With radians, the length of an arc and the area of a sector have very simple formulas, and later in the course the derivatives of $\sin x$ and $\cos x$ only work neatly in radians.

Circular measure is Cambridge 0606 topic 9 (it is not in the ZIMSEC syllabus). The formulas $s = r\theta$ and $A = \frac{1}{2}r^2\theta$ are **not** in the List of formulas, so learn them. Cambridge Paper 1 has no calculator, so you also need exact values such as $60^\circ = \frac{\pi}{3}$ and answers in terms of $\pi$.

## Key definitions

:::definition{term="Radian"}
One radian is the angle at the centre of a circle subtended by an arc whose length equals the radius. A full turn is $2\pi$ radians, so $\pi$ radians $= 180^\circ$ and $1$ radian $\approx 57.3^\circ$.
:::

:::definition{term="Arc and sector"}
An **arc** is part of the circumference. A **sector** is the region between two radii and the arc joining their ends, like a slice of pizza.
:::

:::formula{name="Converting (not in the List of formulas)"}
$$
\pi \text{ rad} = 180^\circ \qquad \text{degrees} \to \text{radians: } \times \frac{\pi}{180} \qquad \text{radians} \to \text{degrees: } \times \frac{180}{\pi}
$$
:::

:::formula{name="Arc length and sector area, θ in radians (not in the List of formulas)"}
$$
s = r\theta \qquad A = \frac{1}{2}r^2\theta \qquad \text{perimeter of a sector} = 2r + r\theta
$$
:::

## Converting between degrees and radians

Radians are usually written without a unit, or with "rad". An angle written as a multiple of $\pi$, such as $\frac{\pi}{4}$, is in radians.

| Degrees | $30^\circ$ | $45^\circ$ | $60^\circ$ | $90^\circ$ | $120^\circ$ | $135^\circ$ | $150^\circ$ | $180^\circ$ | $270^\circ$ | $360^\circ$ |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Radians | $\frac{\pi}{6}$ | $\frac{\pi}{4}$ | $\frac{\pi}{3}$ | $\frac{\pi}{2}$ | $\frac{2\pi}{3}$ | $\frac{3\pi}{4}$ | $\frac{5\pi}{6}$ | $\pi$ | $\frac{3\pi}{2}$ | $2\pi$ |

Learn the first four; the rest are multiples of them.

:::worked-solution[Example 1: convert (a) $75^\circ$ to radians, exactly and to 4 significant figures, (b) $2.4$ radians to degrees]
1. (a) $75 \times \dfrac{\pi}{180} = \dfrac{75\pi}{180} = \dfrac{5\pi}{12}$ exactly.
2. $\dfrac{5\pi}{12} = 1.309$ (4 s.f.).
3. (b) $2.4 \times \dfrac{180}{\pi} = 137.509\ldots$, so $2.4$ rad $= 137.5^\circ$ (1 d.p.).
:::

Set your calculator to the right mode. For trigonometry with radians (such as $\sin 1.2$), use **radian mode**.

## Why the formulas work

A sector with angle $\theta$ is the fraction $\dfrac{\theta}{2\pi}$ of the whole circle. So

$$
s = \frac{\theta}{2\pi} \times 2\pi r = r\theta \qquad A = \frac{\theta}{2\pi} \times \pi r^2 = \frac{1}{2}r^2\theta
$$

In degrees the same fractions give $\frac{\theta}{360} \times 2\pi r$ and $\frac{\theta}{360} \times \pi r^2$; radians remove the awkward $\frac{\pi}{180}$.

:::worked-solution[Example 2: a sector has radius 8 cm and angle 1.2 radians. Find its arc length, area and perimeter]
1. Arc length: $s = r\theta = 8 \times 1.2 = 9.6$ cm.
2. Area: $A = \frac{1}{2} \times 8^2 \times 1.2 = \frac{1}{2} \times 64 \times 1.2 = 38.4$ cm$^2$.
3. Perimeter: two radii plus the arc: $8 + 8 + 9.6 = 25.6$ cm.
:::

![Sector OAB of radius 8 cm and angle 1.2 radians: the arc length is 8 times 1.2 = 9.6 cm, the area is half of 8 squared times 1.2 = 38.4 square centimetres, and the perimeter is 8 + 8 + 9.6 = 25.6 cm.](media:diagrams/sector-radians-arc-area.png "Figure: a sector of radius 8 cm and angle 1.2 radians")

:::worked-solution[Example 3: find the exact arc length and area of a sector with radius 6 cm and angle $\frac{2\pi}{3}$]
1. $s = 6 \times \dfrac{2\pi}{3} = 4\pi$ cm.
2. $A = \frac{1}{2} \times 36 \times \dfrac{2\pi}{3} = 12\pi$ cm$^2$.
:::

## Finding the radius or the angle

Rearrange the formulas, or form equations when two facts are given.

:::worked-solution[Example 4: a sector of radius 9 cm has perimeter 30 cm. Find the angle and the area]
1. Perimeter: $2r + r\theta = 30$, so $18 + 9\theta = 30$.
2. $9\theta = 12$, so $\theta = \frac{4}{3}$ radians ($\approx 1.33$).
3. Area $= \frac{1}{2} \times 81 \times \frac{4}{3} = 54$ cm$^2$.
:::

:::worked-solution[Example 5: a sector has area 50 cm$^2$ and arc length 10 cm. Find the radius and the angle]
1. $\frac{1}{2}r^2\theta = 50$ and $r\theta = 10$.
2. Write the area as $\frac{1}{2}r(r\theta) = \frac{1}{2}r \times 10 = 5r$.
3. $5r = 50$, so $r = 10$ cm, and then $\theta = \frac{10}{10} = 1$ radian.
:::

The identity $A = \frac{1}{2}rs$ (area $= \frac{1}{2} \times$ radius $\times$ arc) used in step 2 is often the quickest way to connect area and arc length.

:::worked-solution[Example 6: a centre-pivot irrigation arm 60 m long turns through 2.5 radians. Find the area watered and the distance travelled by the end of the arm]
1. The arm sweeps a sector with $r = 60$ m, $\theta = 2.5$.
2. Area $= \frac{1}{2} \times 60^2 \times 2.5 = \frac{1}{2} \times 3600 \times 2.5 = 4500$ m$^2$.
3. The end of the arm travels along the arc: $s = 60 \times 2.5 = 150$ m.
:::

## Getting a feel for radians

It helps to picture the size of a radian. Since $1$ radian is about $57^\circ$, a right angle is a little over $1.5$ radians ($\frac{\pi}{2} \approx 1.571$), a straight line is just over 3 radians and a full turn is about $6.28$ radians. Use these benchmarks to check answers: an angle of $2.4$ radians must be obtuse, and a sector angle of $7$ radians is impossible because it is more than a full turn.

Radians also explain why the arc formula is so simple. Walking round a circle of radius $r$, every radian of turning moves you a distance $r$ along the arc. Turning through $\theta$ radians therefore moves you $r\theta$. On a circle of radius 1 (a **unit circle**), the arc length equals the angle itself, which is the idea behind the radian.

:::worked-solution[Example 7: the minute hand of a clock in a Bulawayo classroom is 15 cm long. Find, in terms of $\pi$, the distance moved by its tip and the area swept in 10 minutes]
1. In 60 minutes the hand turns $2\pi$ radians, so in 10 minutes it turns $\frac{10}{60} \times 2\pi = \frac{\pi}{3}$.
2. Distance moved by the tip: $s = 15 \times \frac{\pi}{3} = 5\pi$ cm (about $15.7$ cm).
3. Area swept: $A = \frac{1}{2} \times 15^2 \times \frac{\pi}{3} = \frac{225\pi}{6} = 37.5\pi$ cm$^2$ (about $118$ cm$^2$).
:::

Questions often hide the angle in a context like this: a fraction of a full turn, a number of revolutions, or a time. Turn the information into radians first, and only then use $s = r\theta$ and $A = \frac{1}{2}r^2\theta$.

:::keyfact{title="ZIMSEC and Cambridge"}
Radian measure, arcs and sectors are Cambridge 0606 content only (ZIMSEC's syllabus works in degrees). Cambridge does not print $s = r\theta$ or $A = \frac{1}{2}r^2\theta$, and expects exact answers in terms of $\pi$ on Paper 1.
:::

## Common mistakes

:::mistake{title="Using degrees in s = rθ or A = ½r²θ"}
These formulas need $\theta$ in **radians**. A sector of radius 8 and angle $60^\circ$ has arc $8 \times \frac{\pi}{3}$, not $8 \times 60$.
:::

:::mistake{title="Calculator in the wrong mode"}
$\sin 1.2$ in degree mode gives $0.0209$ instead of $0.932$. Check the mode before every trigonometry calculation with radians.
:::

:::mistake{title="Leaving out the radii in a perimeter"}
The perimeter of a sector is $2r + r\theta$. The arc alone is not the perimeter.
:::

:::mistake{title="Squaring the angle instead of the radius"}
$A = \frac{1}{2}r^2\theta$: only $r$ is squared.
:::

## Exam tips

:::exam-tip
"Give your answer in terms of $\pi$" means exact: $12\pi$, not $37.7$. Otherwise give 3 significant figures.
:::

:::exam-tip
When two facts about a sector are given (perimeter and area, arc and area), write both as equations before rearranging. Check whether both solutions of a resulting quadratic make sense.
:::

:::exam-tip
In a "show that" question about a sector, state the formula you use, substitute, and simplify to the given result line by line.
:::

## Summary

:::summary
- $\pi$ radians $= 180^\circ$: multiply by $\frac{\pi}{180}$ to get radians and by $\frac{180}{\pi}$ to get degrees.
- Know the exact values $\frac{\pi}{6}$, $\frac{\pi}{4}$, $\frac{\pi}{3}$, $\frac{\pi}{2}$ and their multiples.
- With $\theta$ in radians: arc $s = r\theta$, sector area $A = \frac{1}{2}r^2\theta = \frac{1}{2}rs$.
- Perimeter of a sector $= 2r + r\theta$.
- Rearrange or solve simultaneously to find $r$ or $\theta$.
:::
