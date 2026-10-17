---
{
  "key": "trigonometry.obtuse-angles",
  "title": "Trigonometric ratios of obtuse angles",
  "summary": "Extend sine, cosine and tangent to angles between 90° and 180° using the unit circle, use sin(180° − θ) = sin θ, cos(180° − θ) = −cos θ and tan(180° − θ) = −tan θ, and find the angles between 0° and 180° with a given sine or cosine.",
  "concepts": ["math.trigonometry.obtuse-angles"],
  "objectives": ["zimsec/o-level/mathematics:10.2.2", "cambridge/igcse/mathematics:6.4.1", "cambridge/igcse/mathematics:6.4.2"],
  "estimatedMinutes": 20,
  "level": "extended"
}
---
## Introduction

So far, sine, cosine and tangent have been defined as ratios of sides in a right-angled triangle, which only works for acute angles. But a triangle can have an **obtuse** angle, such as the angle of $130^\circ$ between two sides of a triangular plot of land. To use the sine rule, the cosine rule and the area formula on such triangles, we need $\sin 130^\circ$ and $\cos 130^\circ$.

In this lesson you will extend the ratios to angles from $0^\circ$ to $180^\circ$, learn three simple rules that connect an obtuse angle with an acute one, and see why an equation like $\sin x = 0.6$ has **two** answers between $0^\circ$ and $180^\circ$.

You should know SOH CAH TOA and be able to use the inverse functions on your calculator.

## Key definitions

:::definition{term="Unit circle"}
A circle of radius 1 with its centre at the origin $O$. A point $P$ on it, at an angle $\theta$ measured anticlockwise from the positive $x$-axis, has coordinates $(\cos\theta, \sin\theta)$.
:::

:::definition{term="Obtuse angle"}
An angle between $90^\circ$ and $180^\circ$.
:::

## The unit circle

For an acute angle, $P$ is in the first quarter: dropping a perpendicular to the $x$-axis gives a right-angled triangle with hypotenuse 1, so its $x$-coordinate is $\cos\theta$ and its $y$-coordinate is $\sin\theta$. We now use these coordinates as the **definition** for any angle, and $\tan\theta = \dfrac{\sin\theta}{\cos\theta}$.

For an obtuse angle, $P$ is in the second quarter, to the **left** of the $y$-axis but still **above** the $x$-axis:

:::keyfact{title="Signs for 90° < θ < 180°"}
- $\sin\theta$ is **positive** (the $y$-coordinate is above the axis).
- $\cos\theta$ is **negative** (the $x$-coordinate is to the left).
- $\tan\theta$ is **negative** (positive divided by negative).
:::

The points for $\theta$ and $180^\circ - \theta$ are mirror images in the $y$-axis: same height, opposite $x$-coordinates. This gives three rules.

:::formula{name="Obtuse-angle rules"}
$$
\sin(180^\circ - \theta) = \sin\theta \qquad \cos(180^\circ - \theta) = -\cos\theta \qquad \tan(180^\circ - \theta) = -\tan\theta
$$
:::

Useful values: $\sin 90^\circ = 1$, $\cos 90^\circ = 0$, $\sin 180^\circ = 0$, $\cos 180^\circ = -1$ and $\tan 180^\circ = 0$.

## Worked examples

:::worked-solution[Example 1: using the rules]
1. $\sin 150^\circ = \sin(180^\circ - 30^\circ) = \sin 30^\circ = 0.5$.
2. $\cos 120^\circ = -\cos(180^\circ - 120^\circ) = -\cos 60^\circ = -0.5$.
3. $\tan 135^\circ = -\tan 45^\circ = -1$.
4. Check each on a calculator: the signs match the rules above.
:::

:::worked-solution[Example 2: writing an obtuse ratio with an acute angle]
Express $\cos 100^\circ$ and $\sin 100^\circ$ in terms of the acute angle $80^\circ$.
1. $180^\circ - 100^\circ = 80^\circ$.
2. $\cos 100^\circ = -\cos 80^\circ$ $(= -0.174)$.
3. $\sin 100^\circ = \sin 80^\circ$ $(= 0.985)$.
:::

## Equations with two answers

Because $\sin(180^\circ - \theta) = \sin\theta$, a positive sine value belongs to **two** angles between $0^\circ$ and $180^\circ$: an acute angle and its supplement. The calculator only gives the acute one.

![Unit circle (upper half): the horizontal line at height 0.6 meets the circle at two points, at 36.9° and at 180° − 36.9° = 143.1°, so sin x = 0.6 has two solutions between 0° and 180°.](media:diagrams/obtuse-unit-circle-sin-0-6.png "Figure: a positive sine value gives an acute angle and its supplement")

:::worked-solution[Example 3: solve $\sin x = 0.6$ for $0^\circ \leq x \leq 180^\circ$]
1. Calculator: $x = \sin^{-1}(0.6) = 36.869\ldots^\circ$.
2. The second solution is $180^\circ - 36.869\ldots^\circ = 143.130\ldots^\circ$.
3. $x = 36.9^\circ$ or $x = 143.1^\circ$ (1 d.p.).
:::

Cosine is different: between $0^\circ$ and $180^\circ$ each cosine value belongs to **one** angle. A positive cosine gives an acute angle and a negative cosine gives an obtuse angle, and the calculator gives it directly.

:::worked-solution[Example 4: solve $\cos x = -0.35$ for $0^\circ \leq x \leq 180^\circ$]
1. The cosine is negative, so $x$ is obtuse.
2. $x = \cos^{-1}(-0.35) = 110.487\ldots^\circ = 110.5^\circ$ (1 d.p.). There is no other solution in this range.
:::

:::worked-solution[Example 5: comparing sine and cosine equations]
Find every angle between $0^\circ$ and $180^\circ$ for which (a) $\sin x = 0.5$ and (b) $\cos x = 0.5$.
1. (a) The calculator gives $\sin^{-1}(0.5) = 30^\circ$; the supplement gives a second solution, $180^\circ - 30^\circ = 150^\circ$. So $x = 30^\circ$ or $150^\circ$.
2. (b) The calculator gives $\cos^{-1}(0.5) = 60^\circ$. The supplement, $120^\circ$, has $\cos 120^\circ = -0.5$, so it is **not** a solution. So $x = 60^\circ$ only.
:::

## A quick sketch to check

Draw a circle with axes and mark the angle. For angles between $90^\circ$ and $180^\circ$ the point is in the top-left quarter: above the axis (sine positive) and to the left (cosine negative). The acute angle "below" it, $180^\circ - \theta$, is the angle between $OP$ and the **negative** $x$-axis, and it gives the size of the sine and the cosine; the sketch tells you the sign. Thirty seconds spent on this sketch prevents most sign errors.

:::example{title="Why this matters for triangles"}
The area of a triangle with sides $a$ and $b$ and included angle $C$ is $\frac{1}{2}ab\sin C$. With $a = 5$ cm, $b = 8$ cm and $C = 130^\circ$, the area is $\frac{1}{2} \times 5 \times 8 \times \sin 130^\circ = 20\sin 50^\circ = 15.3\ \text{cm}^2$. The sine of the obtuse angle is positive, as an area must be.
:::

## Common mistakes

:::mistake{title="Taking only the calculator answer"}
For $\sin x = 0.6$ the calculator gives $36.9^\circ$ only. In a triangle the angle might be $143.1^\circ$ instead; always consider $180^\circ$ minus the calculator answer.
:::

:::mistake{title="Making cos positive"}
$\cos 120^\circ = -0.5$, not $0.5$. The cosine of every obtuse angle is negative.
:::

:::mistake{title="Trusting the calculator for a negative tangent"}
For $\tan x = -0.8$ the calculator gives $\tan^{-1}(-0.8) = -38.7^\circ$, which is not between $0^\circ$ and $180^\circ$. The obtuse angle is $180^\circ - 38.66^\circ = 141.3^\circ$.
:::

:::mistake{title="Using 90° instead of 180°"}
The rules use $180^\circ - \theta$: $\sin 150^\circ = \sin 30^\circ$, not $\sin 60^\circ$.
:::

## Exam tips

:::exam-tip
When a question says an angle is obtuse, check the sign of each ratio you write: sine positive, cosine and tangent negative.
:::

:::exam-tip
If you are told $\cos\theta$ is negative, the angle in a triangle must be obtuse. If you are told $\sin\theta$, think about both possibilities.
:::

:::exam-tip
Keep at least 4 significant figures in intermediate values; $180^\circ - 36.9^\circ$ is fine, but use the unrounded angle in any further calculation.
:::

## Summary

:::summary
- On the unit circle, $P = (\cos\theta, \sin\theta)$ and $\tan\theta = \frac{\sin\theta}{\cos\theta}$.
- For obtuse angles, $\sin\theta > 0$, $\cos\theta < 0$ and $\tan\theta < 0$.
- $\sin(180^\circ - \theta) = \sin\theta$, $\cos(180^\circ - \theta) = -\cos\theta$, $\tan(180^\circ - \theta) = -\tan\theta$.
- $\sin x = k$ ($0 < k < 1$) has two solutions between $0^\circ$ and $180^\circ$: $x$ and $180^\circ - x$.
- $\cos x = k$ ($-1 \leq k \leq 1$) has exactly one solution between $0^\circ$ and $180^\circ$; it is obtuse when $k$ is negative.
:::
