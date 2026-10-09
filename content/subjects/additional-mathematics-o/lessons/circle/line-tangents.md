---
{
  "key": "circle.line-tangents",
  "title": "Circles, lines and tangents",
  "summary": "Find where a straight line meets a circle, decide whether a line is a chord, a tangent or misses the circle using the discriminant or the distance from the centre, find the equation of the tangent at a point using the perpendicular radius, and solve tangent problems such as the length of a tangent from an external point.",
  "concepts": ["amath.circle.line-tangents"],
  "estimatedMinutes": 40,
  "level": "core"
}
---
## Introduction

A straight irrigation pipe crossing a circular field near Chiredzi cuts it at two points; a straight farm road might just touch the edge of a circular dam at Lake Mutirikwi, or miss it altogether. Deciding which, and finding the exact points, combines two topics you already know: the equation of a circle and solving simultaneous equations, one of them a quadratic.

This lesson covers Cambridge 0606 items 8.2 and 8.3 (intersections and tangents); the topic is not in the ZIMSEC syllabus. No calculus is used: tangents to circles come from the geometry fact that **a tangent is perpendicular to the radius at the point of contact**. You need the discriminant, completing the square and perpendicular gradients.

## Key definitions

:::definition{term="Chord"}
A straight line segment joining two points of a circle. A line that cuts a circle at two points contains a chord.
:::

:::definition{term="Tangent"}
A straight line that touches a circle at exactly one point, the **point of contact**.
:::

:::keyfact{title="Tangent and radius"}
The tangent at a point $P$ of a circle with centre $C$ is perpendicular to the radius $CP$. So if $CP$ has gradient $m$, the tangent at $P$ has gradient $-\frac{1}{m}$.
:::

:::formula{name="Line and circle: three cases (not in the List of formulas)"}
$$
b^2 - 4ac > 0: \text{ two points} \qquad b^2 - 4ac = 0: \text{ tangent} \qquad b^2 - 4ac < 0: \text{ no intersection}
$$
:::

## Where a line meets a circle

Make $y$ (or $x$) the subject of the line, substitute into the circle, and solve the resulting quadratic. Each root gives a point; find the other coordinate from the **line**, which is quicker and avoids false $\pm$ answers.

:::worked-solution[Example 1: find where the line $y = x + 1$ meets the circle $(x - 2)^2 + (y - 1)^2 = 10$, and the length of the chord]
1. Substitute $y = x + 1$: $(x - 2)^2 + (x + 1 - 1)^2 = 10$, so $(x - 2)^2 + x^2 = 10$.
2. Expand: $x^2 - 4x + 4 + x^2 = 10$, so $2x^2 - 4x - 6 = 0$, that is $x^2 - 2x - 3 = 0$.
3. $(x - 3)(x + 1) = 0$, so $x = 3$ or $x = -1$.
4. From the line: $x = 3$ gives $y = 4$; $x = -1$ gives $y = 0$. The points are $(3, 4)$ and $(-1, 0)$.
5. Chord length: $\sqrt{(3 - (-1))^2 + (4 - 0)^2} = \sqrt{16 + 16} = \sqrt{32} = 4\sqrt{2}$.
:::

## Chord, tangent or miss?

The discriminant of the quadratic tells you how many points the line and circle share. A second method uses the **distance $d$ from the centre to the line**: $d < r$ gives a chord, $d = r$ a tangent, $d > r$ no intersection. The discriminant method is usually quicker when the line contains an unknown constant.

:::worked-solution[Example 2: find the values of $k$ for which the line $y = 2x + k$ is a tangent to the circle $x^2 + y^2 = 20$]
1. Substitute: $x^2 + (2x + k)^2 = 20$, so $5x^2 + 4kx + k^2 - 20 = 0$.
2. Tangent: discriminant $= 0$. $(4k)^2 - 4(5)(k^2 - 20) = 16k^2 - 20k^2 + 400 = 400 - 4k^2$.
3. $400 - 4k^2 = 0$ gives $k^2 = 100$, so $k = 10$ or $k = -10$.
4. For $k = 10$: $5x^2 + 40x + 80 = 0$, that is $5(x + 4)^2 = 0$, so the point of contact is $(-4, 2)$.
5. For $-10 < k < 10$ the line cuts the circle twice; for $|k| > 10$ it misses.
:::

## The tangent at a point

:::worked-solution[Example 3: find the equation of the tangent to the circle $(x - 2)^2 + (y + 3)^2 = 25$ at the point $P(5, 1)$]
1. Check $P$ is on the circle: $3^2 + 4^2 = 25$. Yes.
2. Centre $C(2, -3)$. Gradient of $CP = \dfrac{1 - (-3)}{5 - 2} = \dfrac{4}{3}$.
3. Tangent gradient $= -\dfrac{3}{4}$ (perpendicular to the radius).
4. $y - 1 = -\frac{3}{4}(x - 5)$; multiply by 4: $4y - 4 = -3x + 15$.
5. The tangent is $3x + 4y - 19 = 0$.
:::

## Tangents from an external point

From a point $P$ outside a circle, two tangents can be drawn, and they have equal length. If $T$ is a point of contact, triangle $CTP$ has a right angle at $T$, so by Pythagoras

$$
PT^2 = CP^2 - r^2
$$

:::worked-solution[Example 4: find the length of a tangent from $P(7, 6)$ to the circle $(x - 1)^2 + (y - 2)^2 = 16$]
1. Centre $C(1, 2)$, $r^2 = 16$.
2. $CP^2 = (7 - 1)^2 + (6 - 2)^2 = 36 + 16 = 52$.
3. $PT^2 = 52 - 16 = 36$, so the tangent length is $PT = 6$.
:::

To find the tangents themselves from an external point, write a general line through the point and use the discriminant.

:::worked-solution[Example 5: the line $y = mx$ passes through the origin. Find the values of $m$ for which it is a tangent to the circle $(x - 4)^2 + y^2 = 8$, and the points of contact]
1. Substitute: $(x - 4)^2 + m^2x^2 = 8$, so $(1 + m^2)x^2 - 8x + 8 = 0$.
2. Tangent: $64 - 4(1 + m^2)(8) = 0$, so $64 - 32 - 32m^2 = 0$ and $m^2 = 1$.
3. $m = 1$ or $m = -1$.
4. For $m = 1$: $2x^2 - 8x + 8 = 0$, so $(x - 2)^2 = 0$, $x = 2$, and the point is $(2, 2)$. By symmetry, $m = -1$ touches at $(2, -2)$.
5. Check: $(2 - 4)^2 + 2^2 = 8$.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
This is Cambridge 0606 content only. Questions are set without calculus, often on the non-calculator Paper 1, so expect exact answers such as $4\sqrt{2}$ and points with integer or surd coordinates.
:::

## Common mistakes

:::mistake{title="Using the radius gradient as the tangent gradient"}
The tangent is **perpendicular** to the radius. With radius gradient $\frac{4}{3}$, the tangent gradient is $-\frac{3}{4}$.
:::

:::mistake{title="Expanding (2x + k)² wrongly"}
$(2x + k)^2 = 4x^2 + 4kx + k^2$, not $4x^2 + k^2$ or $2x^2 + k^2$. Write the brackets out in full.
:::

:::mistake{title="Finding y from the circle"}
Substituting $x$ back into the circle gives two $y$ values for each $x$, one of them false. Always use the equation of the line.
:::

:::mistake{title="Forgetting to subtract r² for a tangent length"}
The tangent length is $\sqrt{CP^2 - r^2}$, not $CP$ and not $CP - r$.
:::

## Exam tips

:::exam-tip
"Show that the line is a tangent" needs the quadratic, its discriminant shown to be zero (or a perfect square), and a sentence: "equal roots, so the line touches the circle".
:::

:::exam-tip
Draw a quick sketch with the centre, the radius to the point of contact and the tangent. The right angle at the point of contact is the key to most tangent questions.
:::

:::exam-tip
After finding points of intersection, check one of them in the circle's equation. It catches sign slips at once.
:::

## Summary

:::summary
- Substitute the line into the circle to get a quadratic; its roots give the points of intersection (find the other coordinate from the line).
- Discriminant $> 0$: two points; $= 0$: tangent; $< 0$: no intersection. Equivalently compare the distance from the centre with $r$.
- The tangent at $P$ is perpendicular to the radius $CP$: gradient $-\frac{1}{m_{CP}}$.
- Tangent length from an external point $P$: $\sqrt{CP^2 - r^2}$.
- For tangents with an unknown, set the discriminant to zero.
:::
