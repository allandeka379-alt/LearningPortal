---
{
  "key": "trig.six-ratios",
  "title": "The six trigonometric functions of any angle",
  "summary": "Define sine, cosine, tangent and their reciprocals secant, cosecant and cotangent for angles of any size, use the four quadrants and related acute angles to find signs and values, recall the exact values for 30°, 45° and 60°, and find every ratio from one given ratio and the quadrant.",
  "concepts": ["amath.trig.six-ratios"],
  "estimatedMinutes": 40,
  "freePreview": true,
  "level": "core"
}
---
## Introduction

In O-Level Mathematics you met sine, cosine and tangent as ratios of the sides of a right-angled triangle, so the angle was always between $0°$ and $90°$. Additional Mathematics needs angles of **any** size: a waterwheel on a farm near Nyanga turns through $400°$, a sound wave repeats every fraction of a second, and the equation $\sin x = -0.5$ has solutions well beyond $90°$. This lesson extends the three ratios to every angle, introduces the three **reciprocal** functions, and sets up the exact values you will use in every later trigonometry topic: graphs, identities and equations.

Questions on this topic are usually short (find an exact value, or find $\cos\theta$ given $\tan\theta$ and the quadrant), but the skills appear inside nearly every trigonometry question on both boards. Cambridge Paper 1 has no calculator, so exact values must be automatic.

## Key definitions

:::definition{term="Angle in standard position"}
An angle $\theta$ measured from the positive $x$-axis, **anticlockwise** for a positive angle and clockwise for a negative angle. The rotating arm ends at a point $P(x, y)$ at distance $r$ from the origin, where $r = \sqrt{x^2 + y^2} > 0$.
:::

:::definition{term="Sine, cosine and tangent of any angle"}
For the point $P(x, y)$ on the arm of $\theta$:
$\sin\theta = \dfrac{y}{r}$, $\cos\theta = \dfrac{x}{r}$, $\tan\theta = \dfrac{y}{x}$ (undefined when $x = 0$).
:::

:::definition{term="Reciprocal functions"}
Secant, cosecant and cotangent are the reciprocals of cosine, sine and tangent.
:::

:::formula{name="The reciprocal functions (not in the List of formulas)"}
$$
\sec\theta = \frac{1}{\cos\theta}, \qquad \operatorname{cosec}\theta = \frac{1}{\sin\theta}, \qquad \cot\theta = \frac{1}{\tan\theta} = \frac{\cos\theta}{\sin\theta}
$$
:::

A useful memory aid: the **third letter** of each reciprocal name tells you what it is the reciprocal of: se**c** goes with **c**os, co**s**ec with **s**in, co**t** with **t**an.

## Signs in the four quadrants

Because $r$ is always positive, the sign of each function depends only on the signs of $x$ and $y$.

| Quadrant | Angles | $x$ | $y$ | Positive functions |
| --- | --- | --- | --- | --- |
| first | $0°$ to $90°$ | $+$ | $+$ | all six |
| second | $90°$ to $180°$ | $-$ | $+$ | sin and cosec |
| third | $180°$ to $270°$ | $-$ | $-$ | tan and cot |
| fourth | $270°$ to $360°$ | $+$ | $-$ | cos and sec |

Starting in the fourth quadrant and going anticlockwise, the positive function in each quadrant spells **CAST**: **C**os, **A**ll, **S**in, **T**an. Each reciprocal has the same sign as its partner.

## The related acute angle

Every angle has a **related acute angle** (also called the basic or reference angle): the acute angle between the arm and the $x$-axis. The value of any trigonometric function of $\theta$ equals the value for the related angle, with the sign from CAST.

| Quadrant of $\theta$ | Related acute angle |
| --- | --- |
| second | $180° - \theta$ |
| third | $\theta - 180°$ |
| fourth | $360° - \theta$ |

For example, $160°$ has related angle $20°$, so $\sin 160° = \sin 20°$; $250°$ has related angle $70°$, so $\cos 250° = -\cos 70°$; $325°$ has related angle $35°$, so $\tan 325° = -\tan 35°$. Angles larger than $360°$ or negative angles are first brought into $0°$ to $360°$ by adding or subtracting $360°$, because the arm ends in the same place.

Two results follow straight from the diagram: $\cos(-\theta) = \cos\theta$ and $\sin(-\theta) = -\sin\theta$.

## Exact values and radians

From an equilateral triangle of side 2 (cut in half) and a right-angled isosceles triangle with shorter sides 1, you obtain the exact values below. Learn them both in degrees and in radians, where $180° = \pi$ radians.

| $\theta$ | $30° = \dfrac{\pi}{6}$ | $45° = \dfrac{\pi}{4}$ | $60° = \dfrac{\pi}{3}$ |
| --- | --- | --- | --- |
| $\sin\theta$ | $\dfrac{1}{2}$ | $\dfrac{\sqrt{2}}{2}$ | $\dfrac{\sqrt{3}}{2}$ |
| $\cos\theta$ | $\dfrac{\sqrt{3}}{2}$ | $\dfrac{\sqrt{2}}{2}$ | $\dfrac{1}{2}$ |
| $\tan\theta$ | $\dfrac{\sqrt{3}}{3}$ | $1$ | $\sqrt{3}$ |

Note that $\dfrac{\sqrt{2}}{2} = \dfrac{1}{\sqrt{2}}$ and $\dfrac{\sqrt{3}}{3} = \dfrac{1}{\sqrt{3}}$; either form is exact. At the axes: $\sin 0° = 0$, $\cos 0° = 1$, $\sin 90° = 1$, $\cos 90° = 0$, and $\tan 90°$ is undefined.

:::worked-solution[Example 1: find the exact values of $\sin 240°$, $\cos 315°$ and $\tan 150°$]
1. $240°$ is in the third quadrant; related angle $240° - 180° = 60°$; sine is negative there. So $\sin 240° = -\sin 60° = -\dfrac{\sqrt{3}}{2}$.
2. $315°$ is in the fourth quadrant; related angle $360° - 315° = 45°$; cosine is positive there. So $\cos 315° = \cos 45° = \dfrac{\sqrt{2}}{2}$.
3. $150°$ is in the second quadrant; related angle $180° - 150° = 30°$; tangent is negative there. So $\tan 150° = -\tan 30° = -\dfrac{\sqrt{3}}{3}$.
:::

:::worked-solution[Example 2: find the exact values of $\sec 300°$, $\operatorname{cosec}\dfrac{7\pi}{6}$ and $\cot\dfrac{3\pi}{4}$]
1. $\cos 300° = +\cos 60° = \dfrac{1}{2}$ (fourth quadrant), so $\sec 300° = \dfrac{1}{1/2} = 2$.
2. $\dfrac{7\pi}{6} = 210°$, third quadrant, related angle $30°$: $\sin 210° = -\dfrac{1}{2}$, so $\operatorname{cosec}\dfrac{7\pi}{6} = -2$.
3. $\dfrac{3\pi}{4} = 135°$, second quadrant, related angle $45°$: $\tan 135° = -1$, so $\cot\dfrac{3\pi}{4} = -1$.
:::

## Finding all the ratios from one

If you know one ratio and the quadrant, draw a right-angled triangle for the **related angle** using the sizes of the sides (ignore signs), find the third side with Pythagoras, then attach the signs from CAST.

:::worked-solution[Example 3: given $\tan\theta = -\dfrac{5}{12}$ and $90° < \theta < 180°$, find the other five ratios exactly]
1. Related-angle triangle: opposite 5, adjacent 12, hypotenuse $\sqrt{5^2 + 12^2} = \sqrt{169} = 13$.
2. $\theta$ is in the second quadrant, where only sin and cosec are positive.
3. $\sin\theta = \dfrac{5}{13}$, $\cos\theta = -\dfrac{12}{13}$.
4. Reciprocals: $\operatorname{cosec}\theta = \dfrac{13}{5}$, $\sec\theta = -\dfrac{13}{12}$, $\cot\theta = -\dfrac{12}{5}$.
:::

:::worked-solution[Example 4: given $\cos x = -\dfrac{2}{3}$ and $180° < x < 270°$, show that $\tan x = \dfrac{\sqrt{5}}{2}$ and find $\operatorname{cosec} x$ exactly]
1. Related-angle triangle: adjacent 2, hypotenuse 3, opposite $\sqrt{3^2 - 2^2} = \sqrt{5}$.
2. $x$ is in the third quadrant: sine is negative and tangent is positive.
3. $\sin x = -\dfrac{\sqrt{5}}{3}$.
4. $\tan x = \dfrac{\sin x}{\cos x} = \dfrac{-\sqrt{5}/3}{-2/3} = \dfrac{\sqrt{5}}{2}$, as required.
5. $\operatorname{cosec} x = \dfrac{1}{\sin x} = -\dfrac{3}{\sqrt{5}} = -\dfrac{3\sqrt{5}}{5}$.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
ZIMSEC asks you to state the three basic ratios and deduce the other three; Cambridge 0606 asks you to know and use all six functions of angles of any size. Both use degrees and radians. Cambridge writes $\operatorname{cosec}$; some ZIMSEC texts write $\csc$, which means the same.
:::

## Common mistakes

:::mistake{title="Pairing the wrong reciprocal"}
$\sec\theta$ is $\dfrac{1}{\cos\theta}$, not $\dfrac{1}{\sin\theta}$. Use the third-letter rule: se**c** with **c**os.
:::

:::mistake{title="Measuring the related angle from the y-axis"}
The related acute angle is always measured to the **$x$-axis**. For $250°$ it is $70°$ (from $180°$), not $20°$ (from $270°$).
:::

:::mistake{title="Putting signs on the triangle sides"}
Use positive lengths in the related-angle triangle and add the sign at the end from the quadrant. Writing a side as $-12$ and then also applying CAST often gives a double sign error.
:::

:::mistake{title="Confusing sec with the inverse cosine"}
$\sec x = \dfrac{1}{\cos x}$ is a reciprocal. The inverse function $\cos^{-1}x$ gives an angle. They are different things.
:::

## Exam tips

:::exam-tip
When a question says **find the exact value**, a decimal from a calculator scores nothing. Give surds and fractions, e.g. $-\dfrac{\sqrt{3}}{2}$.
:::

:::exam-tip
In "given $\tan\theta = \dots$ and $\theta$ is obtuse" questions, write the quadrant and the signs down **before** you calculate. Examiners look for the correct sign on each answer.
:::

:::exam-tip
On Cambridge Paper 1 (no calculator) any angle that is a multiple of $30°$ or $45°$, or of $\dfrac{\pi}{6}$ or $\dfrac{\pi}{4}$, must be done from exact values and CAST.
:::

## Summary

:::summary
- For a point $(x, y)$ at distance $r$ on the arm of $\theta$: $\sin\theta = \frac{y}{r}$, $\cos\theta = \frac{x}{r}$, $\tan\theta = \frac{y}{x}$.
- $\sec\theta = \frac{1}{\cos\theta}$, $\operatorname{cosec}\theta = \frac{1}{\sin\theta}$, $\cot\theta = \frac{1}{\tan\theta}$.
- CAST gives the positive functions: fourth quadrant cos, first all, second sin, third tan.
- Value for any angle = value for the related acute angle (to the $x$-axis) with the CAST sign.
- Learn the exact values for $30°$, $45°$, $60°$ in degrees and radians.
- From one ratio and the quadrant: related-angle triangle, Pythagoras, then signs.
:::
