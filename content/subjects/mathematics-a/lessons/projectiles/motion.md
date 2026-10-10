---
{
  "key": "projectiles.motion",
  "title": "Projectiles",
  "summary": "Model a projectile as a particle with constant acceleration g, use separate horizontal and vertical equations of motion, find velocity at any time, time of flight, greatest height and range, derive the general formulae and use the Cartesian equation of the trajectory.",
  "concepts": ["amaths.projectiles.motion"],
  "estimatedMinutes": 55,
  "level": "core",
  "freePreview": true
}
---
## Introduction

A soccer ball kicked at Barbourfields, water from a hosepipe in a Bulawayo garden, a stone tossed from the Victoria Falls Bridge: once released, each moves under gravity alone and follows a curved path. Mechanics calls such a body a **projectile**. The key idea is simple and powerful: the horizontal and vertical motions are **independent**. Horizontally nothing changes the velocity; vertically the body accelerates downwards at $g$.

ZIMSEC Mechanics examines projectiles in Form 5 (topic 6.5), including the derivation of the general formulae and the Cartesian equation of the path. Cambridge 9709 Paper 4 does not include projectiles, so this lesson is for ZIMSEC candidates. You need the constant-acceleration (suvat) equations and the resolution of a velocity into components.

## Key definitions

:::definition{term="Projectile"}
A particle moving freely under gravity alone, with air resistance ignored. Its acceleration is $g$ vertically downwards throughout the flight.
:::

:::definition{term="Angle of projection"}
The angle $\alpha$ between the initial velocity and the horizontal. A projection speed $u$ at angle $\alpha$ has components $u\cos\alpha$ horizontally and $u\sin\alpha$ vertically.
:::

:::formula{name="Equations of motion (origin at the point of projection, upwards positive)"}
$$
x = (u\cos\alpha)\,t, \qquad y = (u\sin\alpha)\,t - \tfrac{1}{2}gt^2
$$
$$
\dot{x} = u\cos\alpha, \qquad \dot{y} = u\sin\alpha - gt
$$
:::

ZIMSEC prints no formula list, and the syllabus asks you to **derive** the standard results, so learn to obtain them from these four equations rather than quoting them.

## Working in two directions

Treat every projectile question as two linked one-dimensional problems:

- **Horizontal:** constant velocity, so distance $=$ speed $\times$ time.
- **Vertical:** constant acceleration $g$ downwards, so use suvat with $a = -g$ (taking up as positive).
- **Time** is the link: it is the same in both directions.

At any time the velocity has components $(\dot{x}, \dot{y})$. Its **speed** is $\sqrt{\dot{x}^2 + \dot{y}^2}$ and its **direction** makes an angle $\tan^{-1}\left|\frac{\dot{y}}{\dot{x}}\right|$ with the horizontal, above it while rising and below it while falling.

:::worked-solution[Example 1: A ball is kicked from level ground with speed 25 m s$^{-1}$ at $40°$ above the horizontal. Take $g = 9.8$ m s$^{-2}$. Find the greatest height, the time of flight and the range.]
1. Components: $u_x = 25\cos 40° = 19.151$ m s$^{-1}$, $u_y = 25\sin 40° = 16.070$ m s$^{-1}$.
2. Greatest height: vertical velocity is zero, so $0 = 16.070^2 - 2(9.8)H$, giving $H = \dfrac{258.24}{19.6} = 13.2$ m.
3. Time of flight: back to $y = 0$, so $16.070t - 4.9t^2 = 0$, giving $t = \dfrac{16.070}{4.9} = 3.28$ s.
4. Range: $x = 19.151 \times 3.2795 = 62.8$ m.
:::

## Projection from a height

When a body is projected from above the ground, the time of flight comes from the vertical equation with $y$ equal to minus the height. A body projected **horizontally** has $u\sin\alpha = 0$, so it starts with no vertical velocity.

:::worked-solution[Example 2: Nyasha throws a stone horizontally at 14 m s$^{-1}$ from a bridge 60 m above a river. Take $g = 9.8$ m s$^{-2}$. Find how long the stone takes to reach the water, how far it travels horizontally, and its speed and direction as it hits the water.]
1. Vertically (down positive): $60 = \tfrac{1}{2}(9.8)t^2$, so $t^2 = 12.245$ and $t = 3.50$ s (3.4993 s).
2. Horizontally: $x = 14 \times 3.4993 = 49.0$ m.
3. Vertical velocity at the water: $v_y = 9.8 \times 3.4993 = 34.293$ m s$^{-1}$ downwards; horizontal velocity stays 14 m s$^{-1}$.
4. Speed: $\sqrt{14^2 + 34.293^2} = 37.0$ m s$^{-1}$.
5. Direction: $\tan^{-1}\left(\dfrac{34.293}{14}\right) = 67.8°$ below the horizontal.
:::

## The general formulae

For projection from level ground with speed $u$ at angle $\alpha$:

- **Time to the top:** $\dot{y} = 0 \Rightarrow t = \dfrac{u\sin\alpha}{g}$.
- **Greatest height:** $0 = u^2\sin^2\alpha - 2gH \Rightarrow H = \dfrac{u^2\sin^2\alpha}{2g}$.
- **Time of flight:** $y = 0 \Rightarrow t\left(u\sin\alpha - \tfrac{1}{2}gt\right) = 0 \Rightarrow T = \dfrac{2u\sin\alpha}{g}$.
- **Range:** $R = u\cos\alpha \times \dfrac{2u\sin\alpha}{g} = \dfrac{u^2\sin 2\alpha}{g}$, using $2\sin\alpha\cos\alpha = \sin 2\alpha$.

Since $\sin 2\alpha \le 1$, the **maximum range** is $\dfrac{u^2}{g}$, reached when $2\alpha = 90°$, i.e. $\alpha = 45°$. In Example 1 the maximum possible range at 25 m s$^{-1}$ is $\frac{625}{9.8} = 63.8$ m, only a little more than the 62.8 m achieved at $40°$. Angles $\alpha$ and $90° - \alpha$ give the **same** range, because $\sin 2\alpha = \sin(180° - 2\alpha)$.

These formulae hold only for landing at the **same level** as the launch point. For a cliff or a raised target, go back to the equations of motion.

## The equation of the trajectory

Eliminate $t$: from $x = (u\cos\alpha)t$, $t = \dfrac{x}{u\cos\alpha}$. Substituting into the vertical equation,
$$
y = x\tan\alpha - \frac{gx^2}{2u^2\cos^2\alpha} = x\tan\alpha - \frac{gx^2}{2u^2}\left(1 + \tan^2\alpha\right),
$$
using $\sec^2\alpha = 1 + \tan^2\alpha$. The path is a **parabola**. The second form is a quadratic in $\tan\alpha$, which is how we find the angles that hit a given point.

:::worked-solution[Example 3: A hosepipe nozzle at ground level sends water at 30 m s$^{-1}$. The water must hit a window 60 m away horizontally and 10 m above the nozzle. Take $g = 9.8$ m s$^{-2}$. Show that $\tan\alpha$ satisfies $19.6\tan^2\alpha - 60\tan\alpha + 29.6 = 0$ and find the two possible angles of projection.]
1. Substitute $x = 60$, $y = 10$, $u = 30$: $10 = 60\tan\alpha - \dfrac{9.8 \times 3600}{2 \times 900}\left(1 + \tan^2\alpha\right)$.
2. $\dfrac{9.8 \times 3600}{1800} = 19.6$, so $10 = 60\tan\alpha - 19.6 - 19.6\tan^2\alpha$.
3. Rearranging: $19.6\tan^2\alpha - 60\tan\alpha + 29.6 = 0$, as required.
4. Quadratic formula: $\tan\alpha = \dfrac{60 \pm \sqrt{3600 - 4(19.6)(29.6)}}{39.2} = 0.6182$ or $2.4431$.
5. So $\alpha = 31.7°$ (a flatter path) or $\alpha = 67.7°$ (a higher, lob path).
:::

If the discriminant of the quadratic is negative, the point is out of reach at that speed; if it is zero, exactly one angle just reaches it.

## Common mistakes

:::mistake{title="Using g in the horizontal direction"}
Gravity acts vertically only. The horizontal velocity $u\cos\alpha$ never changes.
:::

:::mistake{title="Using the range formula from a height"}
$R = \frac{u^2\sin 2\alpha}{g}$ assumes landing at the launch height. From a cliff, solve $y = -h$ for $t$ first.
:::

:::mistake{title="Giving speed without direction (or the wrong angle)"}
"Velocity" needs both. Give the angle with the horizontal and say whether it is above or below.
:::

:::mistake{title="Sign errors with the vertical displacement"}
Choose a positive direction and stick to it: with up positive, a point 60 m below the start has $y = -60$.
:::

## Exam tips

:::exam-tip
Start every solution with the components $u\cos\alpha$ and $u\sin\alpha$, then write the horizontal and vertical equations side by side. Examiners give method marks for these even if later arithmetic slips.
:::

:::exam-tip
"Derive" or "show that" a formula means start from $x = (u\cos\alpha)t$ and $y = (u\sin\alpha)t - \tfrac{1}{2}gt^2$ and show every line, including the use of $\sin 2\alpha$ or $\sec^2\alpha = 1 + \tan^2\alpha$.
:::

:::exam-tip
Use the value of $g$ the question gives (9.8 or 10 m s$^{-2}$), carry 4 or more figures in working and give answers to 3 significant figures, angles to 1 decimal place.
:::

## Summary

:::summary
- Horizontal: constant velocity $u\cos\alpha$. Vertical: constant acceleration $g$ downwards. Time links them.
- Velocity at time $t$: components $(u\cos\alpha,\; u\sin\alpha - gt)$; speed by Pythagoras, direction by $\tan^{-1}$.
- Level ground: $T = \frac{2u\sin\alpha}{g}$, $H = \frac{u^2\sin^2\alpha}{2g}$, $R = \frac{u^2\sin 2\alpha}{g}$; maximum range $\frac{u^2}{g}$ at $45°$.
- Trajectory: $y = x\tan\alpha - \frac{gx^2}{2u^2}(1 + \tan^2\alpha)$, a parabola; solve it as a quadratic in $\tan\alpha$ to aim at a point.
:::
