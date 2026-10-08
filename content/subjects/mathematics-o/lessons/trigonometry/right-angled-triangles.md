---
{
  "key": "trigonometry.right-angled-triangles",
  "title": "Trigonometry in right-angled triangles",
  "summary": "Label the opposite, adjacent and hypotenuse, use sine, cosine and tangent (SOH CAH TOA) to find sides and angles of right-angled triangles, and solve two-dimensional problems, including ramps, isosceles triangles and bearings.",
  "concepts": ["math.trigonometry.right-angled-triangles"],
  "objectives": ["zimsec/o-level/mathematics:10.2.1", "cambridge/igcse/mathematics:6.2.1", "cambridge/igcse/mathematics:6.2.2", "cambridge/igcse/mathematics:6.2.3"],
  "estimatedMinutes": 25,
  "level": "core"
}
---
## Introduction

Pythagoras' theorem connects the three **sides** of a right-angled triangle, but it says nothing about the **angles**. Trigonometry fills that gap. With one side and one acute angle, or with two sides, you can find everything else about a right-angled triangle.

Builders use it to set the pitch of a roof, engineers to design a wheelchair ramp at a clinic, and surveyors to find distances across a river they cannot cross. In this lesson you will learn the three trigonometric ratios, how to use them on a calculator, and how to set out your working.

Before you start, set your calculator to **degree** mode (a small D or DEG on the screen).

## Key definitions

In a right-angled triangle, name the sides **relative to the angle** $\theta$ you are using:

:::definition{term="Hypotenuse (H)"}
The longest side, opposite the right angle. It never changes.
:::

:::definition{term="Opposite (O)"}
The side opposite the angle $\theta$: it does not touch $\theta$.
:::

:::definition{term="Adjacent (A)"}
The side next to the angle $\theta$ that is **not** the hypotenuse.
:::

:::formula{name="The trigonometric ratios (SOH CAH TOA)"}
$$
\sin\theta = \frac{\text{O}}{\text{H}} \qquad \cos\theta = \frac{\text{A}}{\text{H}} \qquad \tan\theta = \frac{\text{O}}{\text{A}}
$$
:::

## Choosing the ratio

1. Mark the angle you know (or want).
2. Label the sides O, A and H relative to that angle.
3. Pick the ratio that uses the side you know and the side you want: if O and H, use sin; if A and H, use cos; if O and A, use tan.

## Finding a side

If the unknown side is on the **top** of the fraction, multiply; if it is on the **bottom**, divide.

:::worked-solution[Example 1: finding the opposite side]
A right-angled triangle has hypotenuse 12 cm and an angle of $35^\circ$. Find the side opposite the $35^\circ$ angle.
1. Known: H $= 12$. Wanted: O. Use $\sin$.
2. $\sin 35^\circ = \dfrac{x}{12}$.
3. $x = 12 \sin 35^\circ = 6.882\ldots = 6.88$ cm (3 s.f.).
:::

:::worked-solution[Example 2: finding the hypotenuse]
The side adjacent to an angle of $50^\circ$ is 8 cm. Find the hypotenuse.
1. Known: A $= 8$. Wanted: H. Use $\cos$.
2. $\cos 50^\circ = \dfrac{8}{h}$, so $h = \dfrac{8}{\cos 50^\circ}$.
3. $h = 12.445\ldots = 12.4$ cm (3 s.f.). Check: the hypotenuse is longer than 8 cm.
:::

## Finding an angle

Use the **inverse** function: $\sin^{-1}$, $\cos^{-1}$ or $\tan^{-1}$ (often SHIFT then sin, cos or tan on the calculator).

:::worked-solution[Example 3: finding an angle from two sides]
In a right-angled triangle, the side opposite $\theta$ is 5 cm and the side adjacent to $\theta$ is 7 cm. Find $\theta$.
1. O and A are known, so use $\tan$: $\tan\theta = \dfrac{5}{7}$.
2. $\theta = \tan^{-1}\left(\dfrac{5}{7}\right) = 35.537\ldots^\circ$.
3. $\theta = 35.5^\circ$ (1 d.p.).
:::

:::worked-solution[Example 4: a ramp at a clinic]
A wheelchair ramp rises 0.8 m over a horizontal distance of 9.6 m. Find the angle between the ramp and the ground.
1. Rise (O) and horizontal distance (A) are known: $\tan\theta = \dfrac{0.8}{9.6}$.
2. $\theta = \tan^{-1}(0.0833\ldots) = 4.76\ldots^\circ \approx 4.8^\circ$.
:::

## Two-dimensional problems

Many shapes contain right-angled triangles. An isosceles triangle splits into two right-angled triangles when you draw its height; a rectangle splits along a diagonal.

:::worked-solution[Example 5: the base angle of an isosceles triangle]
An isosceles triangle has two sides of 10 cm and a base of 12 cm. Find the base angles.
1. The height from the apex meets the base at its midpoint, so each half has hypotenuse 10 cm and adjacent side 6 cm.
2. $\cos\theta = \dfrac{6}{10}$, so $\theta = \cos^{-1}(0.6) = 53.1^\circ$ (1 d.p.).
:::

:::example{title="The shortest distance to a line (Cambridge Extended)"}
The shortest distance from a point to a straight line is along the **perpendicular**. A borehole $B$ is 50 m from a road junction $J$, along a path that makes $32^\circ$ with the road. The shortest distance from $B$ to the road is $50 \sin 32^\circ = 26.5$ m (3 s.f.), not 50 m.
:::

:::worked-solution[Example 6: the pitch of a roof]
A roof rises to a ridge 3.2 m above the tops of the walls. Each side of the roof makes an angle of $28^\circ$ with the horizontal. Find the horizontal distance from the edge of the roof to the point below the ridge, and the length of the sloping side.
1. Draw the right-angled triangle: the 3.2 m height is opposite the $28^\circ$ angle; the horizontal distance $x$ is adjacent.
2. $\tan 28^\circ = \dfrac{3.2}{x}$, so $x = \dfrac{3.2}{\tan 28^\circ} = 6.018\ldots = 6.02$ m (3 s.f.).
3. The sloping side is the hypotenuse: $\sin 28^\circ = \dfrac{3.2}{s}$, so $s = \dfrac{3.2}{\sin 28^\circ} = 6.82$ m (3 s.f.).
4. Check with Pythagoras: $\sqrt{6.018^2 + 3.2^2} = 6.82$ m.
:::

Bearing problems work the same way once you have drawn north lines and found a right angle (see the lesson on bearings).

## Checking your answers

- The hypotenuse must be the longest side; if your "hypotenuse" is shorter than another side, you multiplied instead of dividing.
- The larger angle is opposite the longer side.
- The two acute angles of a right-angled triangle add up to $90^\circ$; finding the second angle this way is a quick check.
- When you know two sides, Pythagoras' theorem can check a third side found with trigonometry.

## Common mistakes

:::mistake{title="Calculator in the wrong mode"}
In radian mode, $\sin 30$ gives $-0.988$ instead of $0.5$. Check for D or DEG on the display before every calculation session.
:::

:::mistake{title="Labelling sides from the wrong angle"}
Opposite and adjacent depend on the angle you are using. The side opposite one acute angle is adjacent to the other.
:::

:::mistake{title="Multiplying when you should divide"}
In $\cos 50^\circ = \frac{8}{h}$, the unknown is on the bottom, so $h = \frac{8}{\cos 50^\circ}$, not $8 \cos 50^\circ$. A hypotenuse shorter than another side is a sure sign of this error.
:::

:::mistake{title="Rounding too early"}
Keep the full calculator value until the final answer. Rounding $\tan^{-1}$ or $\sin$ values in the middle can change the last figure.
:::

## Exam tips

:::exam-tip
Write the ratio equation first, for example $\tan\theta = \frac{5}{7}$. It usually earns a method mark on its own.
:::

:::exam-tip
Give lengths to 3 significant figures and angles to 1 decimal place unless the question says otherwise.
:::

:::exam-tip
Sketch and label the triangle, even if a diagram is given. Marking O, A and H makes the choice of ratio automatic.
:::

## Summary

:::summary
- Label sides relative to the angle: opposite, adjacent and hypotenuse.
- $\sin\theta = \frac{O}{H}$, $\cos\theta = \frac{A}{H}$, $\tan\theta = \frac{O}{A}$ (SOH CAH TOA).
- Unknown side on top: multiply. Unknown side on the bottom: divide.
- Use $\sin^{-1}$, $\cos^{-1}$ or $\tan^{-1}$ to find an angle; give angles to 1 d.p.
- Split isosceles triangles and rectangles into right-angled triangles; the perpendicular is the shortest distance to a line.
:::
