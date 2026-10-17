---
{
  "key": "mechanics.newtons-laws-planes",
  "title": "Newton's second law with resolved forces and friction",
  "summary": "Apply F = ma when forces act at an angle or on inclined planes, on smooth and rough surfaces with F = μR while sliding, to find accelerations, forces and coefficients of friction, and combine the results with the equations of motion.",
  "concepts": ["amath.mechanics.newtons-laws-planes"],
  "estimatedMinutes": 50,
  "level": "core"
}
---
## Introduction

A scotch cart rolling down a rough farm track near Masvingo, a crate dragged by a rope angled upwards, or a stone sliding down a sloping rock at Matobo: in each case the forces are not all along the line of motion, and friction acts while the body slides. This lesson joins three earlier ideas: resolving forces, friction ($F = \mu R$) and Newton's second law.

These are the standard ZIMSEC Paper 2 Section B questions: a particle on an inclined plane, find the acceleration, then use the equations of motion for a speed or distance, or work backwards from the motion to the coefficient of friction.

## Key definitions

:::definition{term="Line of greatest slope"}
The direction straight up or down an inclined plane. A particle released on a smooth plane moves along it.
:::

:::definition{term="Friction while sliding"}
When a particle slides over a rough surface, friction has its limiting value $F = \mu R$ and acts opposite to the direction of motion.
:::

:::formula{name="The method in two equations"}
Perpendicular to the motion (no acceleration):

$$
\sum F_{\perp} = 0
$$

Along the motion (acceleration $a$):

$$
\sum F_{\parallel} = ma
$$
:::

## The method

1. Draw the forces: weight, normal reaction, friction (opposite to the motion), and any applied force.
2. Resolve **perpendicular** to the motion. There is no acceleration in that direction, so the forces balance; this gives $R$.
3. Use $F = \mu R$ if the particle is sliding on a rough surface.
4. Resolve **along** the motion and write resultant $= ma$.
5. Use the equations of motion if speeds, distances or times are needed.

## Forces at an angle on a horizontal surface

:::worked-solution[Example 1: an 8 kg box on a smooth horizontal floor is pulled by a rope with tension 40 N at $25^\circ$ above the horizontal. Find its acceleration.]
1. Only the horizontal component accelerates the box: $40\cos 25^\circ = 36.25$ N.
2. N2L: $36.25 = 8a$, so $a \approx 4.53$ m s$^{-2}$.
:::

:::worked-solution[Example 2: the same box is now on a rough floor with $\mu = 0.3$. Take $g = 9.8$ m s$^{-2}$. Find the acceleration.]
1. Vertically: $R + 40\sin 25^\circ = 78.4$, so $R = 78.4 - 16.90 = 61.50$ N.
2. Friction while sliding: $F = 0.3 \times 61.50 = 18.45$ N.
3. N2L horizontally: $40\cos 25^\circ - 18.45 = 8a$.
4. $36.25 - 18.45 = 17.80 = 8a$, so $a \approx 2.23$ m s$^{-2}$.
:::

## Sliding down a rough plane

For a particle sliding down a plane of angle $\alpha$ with no applied force:

$$
R = mg\cos\alpha, \qquad ma = mg\sin\alpha - \mu mg\cos\alpha
$$

so $a = g(\sin\alpha - \mu\cos\alpha)$, independent of the mass. On a smooth plane, $a = g\sin\alpha$.

:::worked-solution[Example 3: a 5 kg parcel is released from rest on a rough plane inclined at $30^\circ$, with $\mu = 0.2$. Take $g = 9.8$ m s$^{-2}$. Find its acceleration, and its speed and distance travelled after 4 s.]
1. $R = 49\cos 30^\circ = 42.44$ N, so $F = 0.2 \times 42.44 = 8.49$ N up the plane.
2. Down the plane: $49\sin 30^\circ - 8.49 = 5a$, so $24.5 - 8.49 = 5a$ and $a \approx 3.20$ m s$^{-2}$.
3. $v = 0 + 3.203 \times 4 \approx 12.8$ m s$^{-1}$.
4. $s = \frac{1}{2}(3.203)(4^2) \approx 25.6$ m.
:::

![Forces on a 5 kg parcel sliding down a rough plane inclined at 30 degrees with friction coefficient 0.2: weight 49 N, normal reaction about 42.4 N, friction about 8.49 N up the plane, and the weight component 24.5 N down the plane, giving a net 16.0 N and acceleration about 3.20 m/s squared.](media:diagrams/plane-rough-sliding-forces.png "Figure: down the plane 24.5 − 8.49 ≈ 16.0 N is the resultant, so a ≈ 3.20 m s⁻²")

## Moving up a rough plane

A particle projected **up** a plane slows down because both the weight component and friction act **down** the plane:

$$
\text{deceleration} = g(\sin\alpha + \mu\cos\alpha)
$$

When it stops, it slides back only if $\tan\alpha > \mu$; on the way down friction reverses and the acceleration is $g(\sin\alpha - \mu\cos\alpha)$.

:::worked-solution[Example 4: a particle is projected at 8 m s$^{-1}$ up a line of greatest slope of a rough plane inclined at $20^\circ$, with $\mu = 0.3$. Take $g = 9.8$ m s$^{-2}$. How far up does it travel, and does it then slide back?]
1. Up the plane, both forces oppose the motion: deceleration $= 9.8(\sin 20^\circ + 0.3\cos 20^\circ) = 9.8(0.3420 + 0.2819) \approx 6.114$ m s$^{-2}$.
2. $0 = 8^2 - 2(6.114)s$, so $s = \dfrac{64}{12.23} \approx 5.23$ m.
3. At rest: the weight component down the plane is $g\sin 20^\circ \approx 3.35$ per kg; the greatest friction is $0.3g\cos 20^\circ \approx 2.76$ per kg.
4. Since $3.35 > 2.76$ (equivalently $\tan 20^\circ = 0.364 > 0.3$), it slides back down with acceleration $9.8(0.3420 - 0.2819) \approx 0.589$ m s$^{-2}$.
:::

## Finding the coefficient of friction from the motion

:::worked-solution[Example 5: a 2 kg block slides from rest down a rough plane inclined at $25^\circ$ and covers 3 m in 1.5 s. Take $g = 9.8$ m s$^{-2}$. Find $\mu$.]
1. $s = \frac{1}{2}at^2$: $3 = \frac{1}{2}a(2.25)$, so $a = \frac{8}{3} \approx 2.667$ m s$^{-2}$.
2. $R = 19.6\cos 25^\circ = 17.76$ N.
3. N2L down the plane: $19.6\sin 25^\circ - \mu(17.76) = 2 \times 2.667$.
4. $8.283 - 17.76\mu = 5.333$, so $\mu = \dfrac{2.950}{17.76} \approx 0.166$.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
This is ZIMSEC Paper 2 Mechanics only. Particles connected by strings over pulleys are not named in the ZIMSEC syllabus, so questions here involve a single particle.
:::

## Common mistakes

:::mistake{title="R = mg on a slope or with an angled force"}
Always resolve perpendicular to the motion. With an angled pull, $R = mg - P\sin\theta$; on a slope, $R = mg\cos\alpha$ (plus or minus any applied force component).
:::

:::mistake{title="Friction in the same direction on the way up and down"}
Friction opposes the actual motion: down the plane while the particle moves up, up the plane while it slides down.
:::

:::mistake{title="Forgetting the weight component"}
On an inclined plane, $mg\sin\alpha$ appears in the equation along the plane even when no one is pushing.
:::

:::mistake{title="Assuming the particle slides back"}
A particle that stops on a rough slope stays there if $\tan\alpha \leq \mu$. Check before using a downward acceleration.
:::

## Exam tips

:::exam-tip
Write the two resolving equations on separate lines, each labelled ("Perpendicular to plane:", "N2L down the plane:"). Each is usually worth a method mark.
:::

:::exam-tip
Keep at least 4 significant figures for $R$, $F$ and $a$ in the middle of a question, and round only the final answers.
:::

:::exam-tip
"Hence find the coefficient of friction" after a kinematics part means: find $a$ from the motion first, then use N2L.
:::

## Summary

:::summary
- Resolve perpendicular to the motion to find $R$, then use $F = \mu R$ while sliding.
- Resolve along the motion and use resultant $= ma$.
- Sliding down a rough slope: $a = g(\sin\alpha - \mu\cos\alpha)$; moving up: deceleration $g(\sin\alpha + \mu\cos\alpha)$.
- An angled pull changes $R$ and so changes the friction.
- Combine with the equations of motion; work backwards from the motion to find $\mu$ or an unknown force.
:::
