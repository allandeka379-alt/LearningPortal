---
{
  "key": "trig.equations",
  "title": "Solving trigonometric equations",
  "summary": "Solve sin x = k, cos x = k, tan x = k and their reciprocal forms in a given interval in degrees or radians, using the principal value, symmetry and the period; handle multiple and compound angles such as tan 2x and sin(x + π/3), equations a sin x = b cos x, and products of factors equal to zero.",
  "concepts": ["amath.trig.equations"],
  "estimatedMinutes": 45,
  "level": "core"
}
---
## Introduction

A calculator gives **one** answer to $\sin x = 0.5$, namely $30°$. But the sine curve reaches the height $0.5$ again and again, so the equation has infinitely many solutions, and an examination question always says which ones it wants: "for $0° \leq x \leq 360°$" or "for $0 < x < 2\pi$". Finding **all** the solutions in the interval, and no others, is the skill this lesson builds.

Trigonometric equations appear on every Additional Mathematics paper, often as the "hence solve" part of a longer question. Missing a solution costs an accuracy mark, and including one outside the interval also loses a mark, so a systematic method matters.

## Key definitions

:::definition{term="Principal value"}
The single angle your calculator gives for $\sin^{-1}k$, $\cos^{-1}k$ or $\tan^{-1}k$: $\sin^{-1}$ and $\tan^{-1}$ give angles from $-90°$ to $90°$, and $\cos^{-1}$ gives angles from $0°$ to $180°$.
:::

:::definition{term="Interval (domain) of the solution"}
The range of values of the variable in which solutions are wanted, such as $0° \leq x \leq 360°$. Endpoints are included when the inequality is $\leq$ and excluded when it is $<$.
:::

:::formula{name="Finding the second solution in 0° to 360° (not in the List of formulas)"}
$$
\sin x = k: \quad x = \alpha \text{ or } 180° - \alpha
$$

$$
\cos x = k: \quad x = \alpha \text{ or } 360° - \alpha
$$

$$
\tan x = k: \quad x = \alpha \text{ or } \alpha + 180°
$$

where $\alpha$ is the principal value. Then add or subtract the period ($360°$ for sin and cos, $180°$ for tan) to reach every solution in the interval. In radians replace $180°$ by $\pi$ and $360°$ by $2\pi$.
:::

## The basic method

1. Rearrange to $\sin x = k$, $\cos x = k$ or $\tan x = k$. (For $\operatorname{cosec} x = k$ use $\sin x = \frac{1}{k}$, and similarly for sec and cot.)
2. Check that a solution is possible: $-1 \leq k \leq 1$ for sine and cosine.
3. Find the principal value $\alpha$ (or the related acute angle and use CAST).
4. Use symmetry to find the second value, then add or subtract the period to list every solution in the interval.

:::worked-solution[Example 1: solve $\sin x = -0.4$ for $0° \leq x \leq 360°$, giving answers to 1 decimal place]
1. Principal value: $\sin^{-1}(-0.4) = -23.58°$, which is outside the interval.
2. Related acute angle $23.58°$; sine is negative in the third and fourth quadrants.
3. Third quadrant: $180° + 23.58° = 203.58°$. Fourth quadrant: $360° - 23.58° = 336.42°$.
4. $x = 203.6°$ or $x = 336.4°$.
:::

## Multiple angles

For an equation in $\sin 2x$, $\cos 3x$ or $\tan\frac{x}{2}$, write $u$ for the angle inside, **change the interval** to an interval for $u$, solve for $u$, then convert back.

If $0° \leq x \leq 360°$ then $0° \leq 2x \leq 720°$: twice as many solutions.

:::worked-solution[Example 2: solve $\tan 2x = \sqrt{3}$ for $0° \leq x \leq 360°$]
1. Let $u = 2x$, so $0° \leq u \leq 720°$.
2. $\tan u = \sqrt{3}$: principal value $u = 60°$. The period of tan is $180°$.
3. $u = 60°, 240°, 420°, 600°$ (the next, $780°$, is too large).
4. $x = \frac{u}{2} = 30°, 120°, 210°, 300°$.
:::

:::worked-solution[Example 3: solve $\sec 3x = 2$ for $0° \leq x \leq 180°$]
1. $\cos 3x = \frac{1}{2}$. Let $u = 3x$, with $0° \leq u \leq 540°$.
2. Principal value $60°$; second value $360° - 60° = 300°$; add $360°$: $420°$ (and $660°$ is too large).
3. $u = 60°, 300°, 420°$, so $x = 20°, 100°, 140°$.
:::

## Compound angles

For $\sin(x + \frac{\pi}{3})$ or $\cos(2x - 30°)$, apply the same idea: let $u$ be the whole bracket and transform the interval **with the same operations**.

:::worked-solution[Example 4: solve $2\sin\left(x + \dfrac{\pi}{3}\right) = 1$ for $0 \leq x \leq 2\pi$]
1. $\sin u = \frac{1}{2}$ with $u = x + \frac{\pi}{3}$, so $\frac{\pi}{3} \leq u \leq \frac{7\pi}{3}$.
2. Basic solutions: $u = \frac{\pi}{6}$ and $u = \pi - \frac{\pi}{6} = \frac{5\pi}{6}$; adding $2\pi$ gives $\frac{13\pi}{6}$ and $\frac{17\pi}{6}$.
3. In the interval for $u$: $\frac{\pi}{6}$ is too small and $\frac{17\pi}{6}$ is too large, leaving $u = \frac{5\pi}{6}$ and $u = \frac{13\pi}{6}$.
4. $x = u - \frac{\pi}{3}$: $x = \frac{\pi}{2}$ or $x = \frac{11\pi}{6}$.
:::

## Equations of the form a sin x = b cos x

Divide both sides by $\cos x$ (allowed because $\cos x = 0$ would force $\sin x = 0$ too, which is impossible): $\tan x = \frac{b}{a}$.

:::worked-solution[Example 5: solve $3\sin x = 4\cos x$ for $0° \leq x \leq 360°$]
1. Divide by $3\cos x$: $\tan x = \frac{4}{3}$.
2. Principal value $\tan^{-1}\frac{4}{3} = 53.13°$; add $180°$: $233.13°$.
3. $x = 53.1°$ or $x = 233.1°$.
:::

## Products equal to zero

If a product of factors is zero, one of the factors is zero. **Never divide** by a factor that could be zero: you would lose solutions.

:::worked-solution[Example 6: solve $2\sin x\cos x = \cos x$ for $0° \leq x \leq 360°$]
1. Bring everything to one side and factorise: $\cos x\,(2\sin x - 1) = 0$.
2. $\cos x = 0$: $x = 90°$ or $x = 270°$.
3. $2\sin x - 1 = 0$: $\sin x = \frac{1}{2}$, so $x = 30°$ or $x = 150°$.
4. $x = 30°, 90°, 150°, 270°$. (Dividing by $\cos x$ at the start would have lost $90°$ and $270°$.)
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards set equations in degrees and in radians, with multiple and compound angles. Cambridge 0606 states the six functions and gives examples such as $\cos\left(\frac{x}{2} - \frac{\pi}{3}\right)$ and $\operatorname{cosec}\left(2\theta - \frac{\pi}{2}\right)$. On Cambridge Paper 1 the values will be exact ones such as $\frac{1}{2}$ or $\sqrt{3}$; on Paper 2 give angles in degrees to 1 decimal place and radians to 3 significant figures unless told otherwise.
:::

## Common mistakes

:::mistake{title="Not changing the interval for a multiple angle"}
For $\tan 2x = \sqrt{3}$ on $0°$ to $360°$, solving $\tan u = \sqrt{3}$ only on $0°$ to $360°$ gives two of the four answers.
:::

:::mistake{title="Using 180° − α for cosine"}
The symmetric partner for cosine is $360° - \alpha$, not $180° - \alpha$. Picture the graphs or use CAST.
:::

:::mistake{title="Dividing by a trigonometric factor"}
In $2\sin x\cos x = \cos x$, dividing by $\cos x$ loses the solutions of $\cos x = 0$. Factorise instead.
:::

:::mistake{title="Mixing degrees and radians"}
If the interval is in radians, set the calculator to radians and give answers in radians.
:::

## Exam tips

:::exam-tip
Write the interval for $u$ explicitly, e.g. "$0° \leq 2x \leq 720°$". It reminds you how many solutions to expect and earns a method mark.
:::

:::exam-tip
Sketching the curve over the interval is a quick check that you have the right number of solutions.
:::

:::exam-tip
Keep the principal value to at least 2 decimal places while you add and subtract, then round each final answer.
:::

## Summary

:::summary
- Rearrange to one function equal to $k$; reciprocals become sin, cos or tan of the reciprocal value.
- Second solution: sine $180° - \alpha$, cosine $360° - \alpha$, tangent $\alpha + 180°$; then add or subtract the period.
- Multiple and compound angles: let $u$ be the angle, transform the interval, solve for $u$, convert back.
- $a\sin x = b\cos x$ becomes $\tan x = \frac{b}{a}$.
- Factorise products; never divide by a factor that could be zero.
:::
