---
{
  "key": "transformations.enlargement",
  "title": "Enlargement",
  "summary": "Enlarge shapes from a centre by positive, fractional and negative scale factors (negative: Cambridge Extended and ZIMSEC), find the centre and scale factor of an enlargement, and use the area factor k².",
  "concepts": ["math.transformations.enlargement"],
  "objectives": ["zimsec/o-level/mathematics:13.0.1", "cambridge/igcse/mathematics:7.1.3"],
  "estimatedMinutes": 16,
  "level": "core"
}
---
## Introduction

A sign-writer in Mutare is asked to copy a small logo onto the wall of a shop, three times as wide and three times as tall. Every length must grow by the same factor, or the logo will look stretched. This is an **enlargement**.

Unlike translations, reflections and rotations, an enlargement changes the size of a shape. It keeps the shape itself: the angles stay the same and the image is **similar** to the object. In this lesson you will draw enlargements from a centre, find the centre and scale factor of a given enlargement, and see what happens to areas.

You should be able to plot coordinates and work with fractions and negative numbers.

## Key definitions

:::definition{term="Enlargement"}
A transformation in which the distance of every image point from a fixed point, the **centre of enlargement**, is the same multiple of the distance of its object point from the centre, measured along the same straight line.
:::

:::definition{term="Scale factor"}
The number $k$ by which every length is multiplied. If $k > 1$ the image is larger; if $0 < k < 1$ the image is smaller (it is still called an enlargement); if $k$ is negative the image is on the **opposite** side of the centre and upside down.
:::

:::formula{name="Image of a point"}
For centre $(a, b)$ and scale factor $k$, the point $(x, y)$ maps to

$$
\big(a + k(x - a),\ b + k(y - b)\big)
$$

With the origin as centre this is simply $(kx, ky)$.
:::

:::keyfact{title="Lengths, angles and areas"}
Lengths are multiplied by $|k|$, angles do not change, and areas are multiplied by $k^2$.
:::

## Drawing an enlargement

1. Mark the centre of enlargement.
2. For each vertex, count the horizontal and vertical steps **from the centre** to the vertex.
3. Multiply both steps by the scale factor and count them from the centre again.
4. Join the new vertices in the same order.

You can check a drawing with **rays**: the line from the centre through each vertex must pass through the matching image vertex.

## Worked examples

:::worked-solution[Example 1: centre $(1, 2)$, scale factor $3$]
Find the image of $P(3, 3)$.

1. From the centre $(1, 2)$ to $P$: $3 - 1 = 2$ across and $3 - 2 = 1$ up.
2. Multiply by 3: $6$ across and $3$ up.
3. Count from the centre: $P' = (1 + 6, 2 + 3) = (7, 5)$.
:::

:::worked-solution[Example 2: a fractional scale factor]
Enlarge $Q(2, 4)$ with centre $(6, 0)$ and scale factor $\frac{1}{2}$.

1. From the centre to $Q$: $2 - 6 = -4$ across and $4 - 0 = 4$ up.
2. Multiply by $\frac{1}{2}$: $-2$ across and $2$ up.
3. $Q' = (6 - 2, 0 + 2) = (4, 2)$, halfway between the centre and $Q$.
:::

:::worked-solution[Example 3: find the centre and the scale factor]
Triangle $ABC$ with $A(0, 1)$, $B(1, 1)$, $C(0, 2)$ is mapped onto $A'(2, 3)$, $B'(5, 3)$, $C'(2, 6)$.

1. Scale factor: $A'B' = 5 - 2 = 3$ and $AB = 1 - 0 = 1$, so $k = \dfrac{3}{1} = 3$.
2. The image is the same way up, so $k$ is positive.
3. The line through $A$ and $A'$ is $y = x + 1$; the line through $B$ and $B'$ is $y = \frac{1}{2}x + \frac{1}{2}$.
4. They meet where $x + 1 = \frac{1}{2}x + \frac{1}{2}$, so $x = -1$ and $y = 0$.
5. The transformation is an **enlargement, scale factor 3, centre $(-1, 0)$**. Check: $(-1 + 3(0 + 1), 0 + 3(1 - 0)) = (2, 3) = A'$.
:::

## Negative scale factors (Cambridge Extended and ZIMSEC)

With a negative scale factor, go from the centre to the vertex, then go $|k|$ times as far in the **opposite** direction. The image is on the other side of the centre and is turned upside down.

:::worked-solution[Example 4: scale factor $-2$ with centre the origin]
Find the image of $T(3, 1)$.

1. Centre $O$: the image is $(kx, ky) = (-2 \times 3, -2 \times 1)$.
2. $T' = (-6, -2)$: twice as far from $O$ as $T$, on the opposite side.
:::

An enlargement with scale factor $-1$ is the same as a rotation of $180^\circ$ about the centre.

## Area

If the scale factor is $k$, every length is multiplied by $|k|$, so every area is multiplied by $k^2$.

:::worked-solution[Example 5: area of an image]
A triangle of area $6\ \text{cm}^2$ is enlarged with scale factor $3$.

1. Area factor $= 3^2 = 9$.
2. Image area $= 6 \times 9 = 54\ \text{cm}^2$.
3. With scale factor $-3$ the area factor is $(-3)^2 = 9$ as well.
:::

## Common mistakes

:::mistake{title="Measuring from the origin instead of the centre"}
When the centre is not the origin, the distances must be counted from the centre. Multiplying the coordinates by $k$ only works when the centre is $(0, 0)$.
:::

:::mistake{title="Adding the scale factor"}
Scale factor 3 means three times as far from the centre, not three squares further away.
:::

:::mistake{title="Using k instead of k² for area"}
Doubling every length makes the area four times as big, not twice as big. Use $k^2$.
:::

:::mistake{title="Leaving out the centre"}
"Enlargement, scale factor 2" is not a full description: different centres give images in different places.
:::

## Exam tips

:::exam-tip
"**Describe fully** the single transformation" for an enlargement needs three things: the word **enlargement**, the **scale factor** and the **centre**. Each usually earns a mark.
:::

:::exam-tip
To find the centre, draw straight lines through at least two pairs of corresponding vertices and extend them until they meet. Use a sharp pencil and a ruler.
:::

:::exam-tip
Check that your scale factor makes sense: a fraction between 0 and 1 must give a smaller image that is closer to the centre, and a negative factor must put the image on the other side of the centre.
:::

## Summary

:::summary
- An enlargement is described by its centre and its scale factor $k$.
- Image of $(x, y)$ with centre $(a, b)$: $\big(a + k(x - a),\ b + k(y - b)\big)$; with centre $O$: $(kx, ky)$.
- $k > 1$ larger; $0 < k < 1$ smaller; $k < 0$ opposite side of the centre and upside down (Cambridge Extended and ZIMSEC).
- Find the centre where lines through corresponding vertices meet; scale factor = image length ÷ object length.
- Angles are unchanged, lengths are multiplied by $|k|$ and areas by $k^2$.
:::
