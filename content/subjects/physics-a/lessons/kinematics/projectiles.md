---
{
  "key": "kinematics.projectiles",
  "title": "Projectile motion",
  "summary": "Treat horizontal and vertical motion independently: constant horizontal velocity and uniform vertical acceleration g. Find time of flight, range, maximum height and the velocity at any instant, and describe how air resistance changes the path.",
  "concepts": ["aphys.kinematics.projectiles"],
  "estimatedMinutes": 45,
  "level": "core"
}
---
## Introduction

A goalkeeper at the National Sports Stadium kicks the ball high and long; a farmer at a borehole lets water spurt from a horizontal pipe; a cricket ball is struck towards the boundary. Each object follows a smooth curve, rising and falling while it moves forwards. Physics reduces all these curves to one simple idea: the sideways motion and the up-and-down motion happen **independently**, each following its own rule.

This lesson applies the equations of uniformly accelerated motion to two-dimensional motion. You need the suvat equations, resolving a vector into components, and Pythagoras' theorem.

## Key definitions

:::definition{term="Projectile"}
An object that, once launched, moves under the influence of gravity alone (air resistance neglected), so that its acceleration is $g$ vertically downwards.
:::

:::definition{term="Range"}
The horizontal distance travelled by a projectile from its launch point to where it lands.
:::

:::definition{term="Time of flight"}
The time between launch and landing.
:::

:::formula{name="Components of the launch velocity"}
$$
u_x = u\cos\theta \qquad u_y = u\sin\theta
$$

$u$ = launch speed ($\text{m s}^{-1}$), $\theta$ = launch angle above the horizontal. Horizontally $a_x = 0$, so $x = u_x t$; vertically $a_y = -g$ (upwards positive), so $y = u_y t - \tfrac{1}{2}gt^2$ and $v_y = u_y - gt$.
:::

:::keyfact{title="Independence of the two motions"}
With no air resistance, the horizontal velocity is constant and the vertical motion is free fall. The only link between them is the **time**, which is the same for both.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards require projectile motion with uniform velocity in one direction and uniform acceleration perpendicular to it, including launches at an angle, and a qualitative account of air resistance.
:::

## Why the motions are independent

Gravity acts vertically, so it has no component horizontally and cannot change the horizontal velocity. A ball dropped from rest and a ball fired horizontally from the same height at the same moment hit level ground **together**: both start with zero vertical velocity and both accelerate downwards at $g$. A strobe photograph shows the fired ball moving equal horizontal distances in equal times while its vertical position matches the dropped ball exactly.

## Horizontal launch

The vertical motion starts from rest, so the fall time depends only on the height: $h = \tfrac{1}{2}gt^2$.

:::worked-solution[A ball rolling off a table]
A ball rolls off a horizontal table top $1.25\ \text{m}$ high at $3.0\ \text{m s}^{-1}$.

1. Vertical, from rest: $1.25 = \tfrac{1}{2}(9.81)t^2$, so $t = \sqrt{\dfrac{2 \times 1.25}{9.81}} = 0.505\ \text{s}$.
2. Horizontal, constant velocity: range $= 3.0 \times 0.505 = 1.51\ \text{m}$.
3. Vertical velocity on landing: $v_y = gt = 9.81 \times 0.505 = 4.95\ \text{m s}^{-1}$ downwards.
4. Landing velocity: $\sqrt{3.0^2 + 4.95^2} = 5.79\ \text{m s}^{-1}$, at $\tan^{-1}(4.95/3.0) = 58.8^\circ$ below the horizontal.
:::

## Launch at an angle

Resolve the launch velocity first, then treat each direction separately.

- **Time to the top:** $v_y = 0$, so $t_{\text{top}} = \dfrac{u\sin\theta}{g}$.
- **Maximum height:** $0 = (u\sin\theta)^2 - 2gH$, so $H = \dfrac{(u\sin\theta)^2}{2g}$.
- **Time of flight to the same level:** $T = 2t_{\text{top}} = \dfrac{2u\sin\theta}{g}$.
- **Range on level ground:** $R = u\cos\theta \times T$.

:::worked-solution[A long kick]
A goalkeeper kicks a ball from the ground at $18\ \text{m s}^{-1}$ at $35^\circ$ above the horizontal. Ignore air resistance.

1. Components: $u_x = 18\cos 35^\circ = 14.7\ \text{m s}^{-1}$; $u_y = 18\sin 35^\circ = 10.3\ \text{m s}^{-1}$.
2. Time of flight: $T = \dfrac{2 \times 10.32}{9.81} = 2.10\ \text{s}$.
3. Range: $R = 14.74 \times 2.105 = 31.0\ \text{m}$.
4. Maximum height: $H = \dfrac{10.32^2}{2 \times 9.81} = 5.43\ \text{m}$.

![Path of the goalkeeper's kick (18 m/s at 35° above the horizontal): a parabola of range 31.0 m and maximum height 5.43 m, with a constant horizontal velocity component 14.7 m/s and a vertical component that is zero at the top and negative on the way down.](media:diagrams/kick-projectile-path.png "Figure: a parabolic path; horizontal velocity stays constant while vertical velocity changes")

:::

Carry unrounded values through the calculation (store them in the calculator) and round only the final answers.

## Velocity at any instant

The velocity is the vector sum of the constant horizontal component and the changing vertical component.

:::example{title="The kicked ball after 1.5 s"}
At $t = 1.5\ \text{s}$: $v_x = 14.7\ \text{m s}^{-1}$ (unchanged) and $v_y = 10.32 - 9.81 \times 1.5 = -4.39\ \text{m s}^{-1}$ (already falling). The speed is $\sqrt{14.74^2 + 4.39^2} = 15.4\ \text{m s}^{-1}$, directed $16.6^\circ$ below the horizontal. At the top of the path the velocity is horizontal ($14.7\ \text{m s}^{-1}$) and the speed is at its minimum, but it is not zero.
:::

For the same launch speed on level ground, the range is greatest at $45^\circ$, and angles that add to $90^\circ$ (such as $30^\circ$ and $60^\circ$) give equal ranges. The path is a parabola.

## The effect of air resistance

Air resistance acts opposite to the velocity, so it has a backward horizontal component and a vertical component that opposes the vertical motion. Compared with the ideal parabola:

- the horizontal velocity decreases throughout, so the range is shorter;
- the maximum height is lower and is reached sooner;
- the path is no longer symmetrical: the descent is steeper than the ascent;
- for a long fall the vertical velocity tends towards a terminal value.

## Common mistakes

:::mistake{title="Using the launch speed in the vertical equations"}
Vertical equations use $u\sin\theta$, horizontal ones $u\cos\theta$. The full speed $u$ appears in neither.
:::

:::mistake{title="Thinking the velocity is zero at the top"}
Only the vertical component is zero at the highest point; the horizontal component is unchanged.
:::

:::mistake{title="Giving a horizontal acceleration"}
Without air resistance the horizontal acceleration is zero. "The ball slows down horizontally" is true only with air resistance.
:::

:::mistake{title="Rounding the components early"}
Rounding $u_y$ to $10\ \text{m s}^{-1}$ gives a range about 3 % short. Keep extra figures until the end.
:::

## Exam tips

:::exam-tip{title="Command words"}
"Explain why the horizontal component of velocity is constant" needs: no horizontal force (gravity is vertical, air resistance negligible), so no horizontal acceleration. "Calculate the velocity" needs both magnitude and direction.
:::

:::exam-tip{title="Where it is tested"}
Cambridge Paper 1 and Paper 2 test horizontal and angled launches, often with a sketch of the path or of velocity components; Paper 3 may use a ball-off-a-bench experiment. ZIMSEC Papers 1 and 2 test the same ideas.
:::

## Summary

:::summary
- Horizontal and vertical motions are independent and share the same time.
- Horizontally: constant velocity $u\cos\theta$. Vertically: acceleration $g$ downwards, initial velocity $u\sin\theta$.
- Time of flight to the same level $= 2u\sin\theta/g$; maximum height $= (u\sin\theta)^2/2g$; range $= u\cos\theta \times$ time of flight.
- At the top the velocity is horizontal, not zero; the speed at any instant comes from Pythagoras.
- Air resistance shortens the range, lowers the peak and makes the descent steeper.
:::
