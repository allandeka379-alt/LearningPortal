---
{
  "key": "trigonometry.sine-and-cosine-rules",
  "title": "Sine and cosine rules",
  "summary": "Use the sine rule, the cosine rule and the area formula ½ab sin C to find sides, angles and areas of any triangle, including triangles with an obtuse angle, the ambiguous case of the sine rule, and bearing problems.",
  "concepts": ["math.trigonometry.sine-and-cosine-rules"],
  "objectives": ["zimsec/o-level/mathematics:10.2.3", "zimsec/o-level/mathematics:10.2.4", "cambridge/igcse/mathematics:6.5.1", "cambridge/igcse/mathematics:6.5.2"],
  "estimatedMinutes": 30,
  "level": "extended"
}
---
## Introduction

A farmer near Karoi wants to know the area of a triangular field whose corners do not include a right angle. A boat on Lake Kariba changes course and the skipper wants the straight-line distance back to the harbour. Neither triangle is right-angled, so SOH CAH TOA cannot be used directly.

The **sine rule** and the **cosine rule** work in **any** triangle. Together with the area formula $\frac{1}{2}ab\sin C$, they let you find every side, angle and area once you know three facts about a triangle (including at least one side).

You need the sines and cosines of obtuse angles, and the bearing techniques from earlier lessons.

## Key definitions

:::definition{term="Standard labelling"}
In triangle $ABC$, the side opposite angle $A$ is called $a$, the side opposite $B$ is $b$, and the side opposite $C$ is $c$. So $a = BC$, $b = CA$ and $c = AB$.
:::

:::definition{term="Included angle"}
The angle between two given sides, for example angle $C$ between sides $a$ and $b$.
:::

## The three formulas

:::formula{name="The sine rule"}
$$
\frac{a}{\sin A} = \frac{b}{\sin B} = \frac{c}{\sin C} \qquad \text{or, for angles,} \qquad \frac{\sin A}{a} = \frac{\sin B}{b} = \frac{\sin C}{c}
$$
:::

:::formula{name="The cosine rule"}
$$
a^2 = b^2 + c^2 - 2bc\cos A \qquad \text{or, for an angle,} \qquad \cos A = \frac{b^2 + c^2 - a^2}{2bc}
$$
:::

:::formula{name="Area of a triangle"}
$$
\text{Area} = \frac{1}{2}ab\sin C
$$
:::

:::note{title="Connections"}
When $A = 90^\circ$, $\cos A = 0$ and the cosine rule becomes $a^2 = b^2 + c^2$: Pythagoras' theorem is a special case of it. When $A$ is obtuse, $\cos A$ is negative, so $a^2$ is **larger** than $b^2 + c^2$, which makes sense because the side opposite an obtuse angle is the longest side. In the area formula, $b\sin C$ is the perpendicular height of the triangle when $a$ is the base, so $\frac{1}{2}ab\sin C$ is just "half base times height".
:::

## Which rule do I use?

| You know | You want | Use |
| --- | --- | --- |
| two angles and any side | another side | sine rule |
| two sides and a non-included angle | another angle | sine rule (angle form) |
| two sides and the included angle | the third side | cosine rule |
| all three sides | an angle | cosine rule (angle form) |
| two sides and the included angle | the area | $\frac{1}{2}ab\sin C$ |

A quick test: the sine rule needs a **matching pair** (a side and the angle opposite it). If you have no such pair, use the cosine rule.

## Worked examples

:::worked-solution[Example 1: the sine rule for a side]
In triangle $ABC$, angle $A = 40^\circ$, angle $B = 65^\circ$ and $a = 8$ cm. Find $b$.
1. Matching pair: $a = 8$ with $A = 40^\circ$.
2. $\dfrac{b}{\sin 65^\circ} = \dfrac{8}{\sin 40^\circ}$.
3. $b = \dfrac{8 \sin 65^\circ}{\sin 40^\circ} = 11.27\ldots = 11.3$ cm (3 s.f.).
:::

![Triangle ABC with the standard labelling: sides b = 7 cm and c = 10 cm enclose angle A = 115°, so the cosine rule gives the opposite side a = 14.4 cm (the longest side, opposite the obtuse angle); the other angles are 26.1° and 38.9°.](media:diagrams/cosine-rule-triangle-example.png "Figure: side a lies opposite angle A; two sides and the angle between them fix the triangle")

:::worked-solution[Example 2: the cosine rule for a side]
In triangle $ABC$, $b = 7$ cm, $c = 10$ cm and the included angle $A = 115^\circ$. Find $a$.
1. $a^2 = 7^2 + 10^2 - 2 \times 7 \times 10 \times \cos 115^\circ$.
2. $\cos 115^\circ$ is negative, so subtracting it adds: $a^2 = 149 + 59.16\ldots = 208.16\ldots$
3. $a = 14.43\ldots = 14.4$ cm (3 s.f.).
:::

:::worked-solution[Example 3: the cosine rule for an angle]
A triangle has sides 5 cm, 7 cm and 9 cm. Find its largest angle.
1. The largest angle $C$ is opposite the longest side, 9 cm.
2. $\cos C = \dfrac{5^2 + 7^2 - 9^2}{2 \times 5 \times 7} = \dfrac{-7}{70} = -0.1$.
3. $C = \cos^{-1}(-0.1) = 95.7^\circ$ (1 d.p.). The negative cosine shows the angle is obtuse.
:::

:::worked-solution[Example 4: the area of a triangle]
Find the area of the triangle in Example 2.
1. Two sides and the included angle: $b = 7$, $c = 10$, $A = 115^\circ$.
2. Area $= \frac{1}{2} \times 7 \times 10 \times \sin 115^\circ = 31.7\ \text{cm}^2$ (3 s.f.).
:::

## The ambiguous case (Cambridge Extended)

When you use the sine rule to find an **angle**, remember that $\sin\theta = \sin(180^\circ - \theta)$. Sometimes both angles fit the triangle.

:::worked-solution[Example 5: two possible triangles]
In triangle $ABC$, $a = 6$ cm, $b = 8$ cm and angle $A = 35^\circ$. Find angle $B$.
1. $\sin B = \dfrac{8 \sin 35^\circ}{6} = 0.7647\ldots$
2. $B = 49.9^\circ$ or $B = 180^\circ - 49.9^\circ = 130.1^\circ$.
3. Check the obtuse value: $35^\circ + 130.1^\circ = 165.1^\circ < 180^\circ$, so it is possible too.
4. There are two triangles: $B = 49.9^\circ$ or $B = 130.1^\circ$.
:::

If the given angle is opposite the **longer** of the two given sides, the other angle must be acute, and there is only one triangle.

## Bearings

:::worked-solution[Example 6: a two-leg journey]
A boat sails 15 km from a port $P$ on a bearing of $040^\circ$ to a point $Q$, then 10 km on a bearing of $115^\circ$ to a point $R$. Find the distance $PR$.
1. At $Q$, the bearing back to $P$ is $040^\circ + 180^\circ = 220^\circ$, so angle $PQR = 220^\circ - 115^\circ = 105^\circ$.
2. Cosine rule: $PR^2 = 15^2 + 10^2 - 2 \times 15 \times 10 \times \cos 105^\circ = 325 + 77.6\ldots = 402.6\ldots$
3. $PR = 20.1$ km (3 s.f.).
:::

## Common mistakes

:::mistake{title="Mismatched pairs in the sine rule"}
Each fraction must use a side and the angle **opposite** it. $\frac{a}{\sin B}$ is meaningless.
:::

:::mistake{title="Calculator order in the cosine rule"}
$b^2 + c^2 - 2bc\cos A$ must be worked out as one expression. Typing $149 - 140$ first and then multiplying by $\cos A$ is a common error.
:::

:::mistake{title="Missing the obtuse angle"}
$\sin^{-1}$ gives only the acute angle. In the ambiguous case check $180^\circ$ minus that angle as well; with the cosine rule a negative cosine automatically gives the obtuse angle.
:::

## Exam tips

:::exam-tip
Write the rule with the numbers substituted before calculating; it earns the method mark.
:::

:::exam-tip
Keep full calculator values between parts. A side rounded to 3 s.f. and then used in the sine rule can change the next answer.
:::

:::exam-tip
If a question asks for an obtuse angle or says "angle $B$ is obtuse", choose $180^\circ - \sin^{-1}(\ldots)$.
:::

## Summary

:::summary
- Sine rule: $\frac{a}{\sin A} = \frac{b}{\sin B} = \frac{c}{\sin C}$; use it with a matching side–angle pair.
- Cosine rule: $a^2 = b^2 + c^2 - 2bc\cos A$; use it for SAS (side) and SSS (angle).
- Area $= \frac{1}{2}ab\sin C$ with two sides and the included angle.
- Ambiguous case: $\sin B = k$ may give $B$ and $180^\circ - B$; check the angle sum.
- For bearings, find the angle inside the triangle from the north lines first.
:::
