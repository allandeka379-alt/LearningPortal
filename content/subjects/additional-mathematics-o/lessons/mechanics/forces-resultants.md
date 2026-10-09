---
{
  "key": "mechanics.forces-resultants",
  "title": "Forces as vectors: resultants and components",
  "summary": "Identify the forces acting on a body, represent each force as a vector, resolve forces into perpendicular components and combine several forces into a single resultant by components or by the cosine rule.",
  "concepts": ["amath.mechanics.forces-resultants"],
  "estimatedMinutes": 45,
  "level": "core"
}
---
## Introduction

A force is a push or a pull. An ox pulling a plough near Chinhoyi, the tension in a rope lifting a bucket from a well and the weight of a sack of maize are all forces. Because a force has a size and a direction, it is a vector, and the rules for adding vectors decide what several forces do together.

Every later Mechanics topic in ZIMSEC Paper 2 (equilibrium, friction, Newton's laws, work and power) begins with the same two skills from this lesson: drawing all the forces on a body and resolving them into components. You should know sine, cosine and Pythagoras in right-angled triangles, and the sine and cosine rules.

## Key definitions

:::definition{term="Force"}
An action that changes, or tends to change, the motion of a body. It is a vector, measured in newtons (N). One newton gives a mass of 1 kg an acceleration of 1 m s$^{-2}$.
:::

:::definition{term="Weight"}
The force of gravity on a body, $W = mg$, acting vertically downwards. A 4 kg sack has weight $4 \times 9.8 = 39.2$ N when $g = 9.8$ m s$^{-2}$.
:::

:::definition{term="Normal reaction"}
The force a surface exerts on a body in contact with it, perpendicular to the surface.
:::

:::definition{term="Tension and thrust"}
The pull in a string or rope (tension) or the push in a rod (thrust), acting along it.
:::

:::definition{term="Friction"}
The force along a rough surface that opposes motion, or the tendency to move.
:::

:::definition{term="Resultant"}
The single force that has the same effect as all the forces acting together: their vector sum.
:::

:::formula{name="Components of a force"}
A force $F$ at angle $\theta$ to the $x$-direction has components

$$
F_x = F\cos\theta, \qquad F_y = F\sin\theta
$$
:::

:::formula{name="Magnitude and direction from components"}
$$
R = \sqrt{X^2 + Y^2}, \qquad \tan\alpha = \frac{Y}{X}
$$
:::

## Drawing the forces

Before any calculation, draw a clear force diagram: the body as a dot (a particle) and an arrow for every force, labelled with its size or a letter. Check the list: weight (always), a normal reaction for each surface touched, friction if the surface is rough, a tension for each string, and any applied push or pull. Do not include forces the body exerts on other things.

## Resolving a force

To resolve a force means to replace it by two perpendicular forces with the same effect. The component **along** a direction uses cosine of the angle **with** that direction; the component perpendicular to it uses sine.

:::worked-solution[Example 1: Sipho pulls a cart with a rope at $30^\circ$ above the horizontal with a force of 20 N. Find the horizontal and vertical components of the pull.]
1. Horizontal component $= 20\cos 30^\circ = 10\sqrt{3} \approx 17.3$ N.
2. Vertical component $= 20\sin 30^\circ = 10$ N, upwards.
3. Check: $\sqrt{17.32^2 + 10^2} = 20$ N.
:::

Only the horizontal component moves the cart forward; the vertical component lifts it slightly, reducing the force with which it presses on the ground.

## Resultant of perpendicular forces

:::worked-solution[Example 2: forces of 8 N due east and 6 N due north act on a particle. Find the size and direction of the resultant.]
1. $R = \sqrt{8^2 + 6^2} = \sqrt{100} = 10$ N.
2. $\tan\alpha = \dfrac{6}{8}$, so $\alpha \approx 36.9^\circ$.
3. The resultant is 10 N at $36.9^\circ$ north of east (a bearing of about $053^\circ$).
:::

## Resultant of several forces by components

For three or more forces, choose $x$- and $y$-directions, resolve every force, add the components, then recombine. Measure each angle from the positive $x$-direction, and the signs of cosine and sine take care of directions.

:::worked-solution[Example 3: forces of 10 N, 12 N and 7 N act at a point in directions $0^\circ$, $60^\circ$ and $150^\circ$ measured anticlockwise from the positive $x$-axis. Find the resultant.]
1. $x$-components: $10 + 12\cos 60^\circ + 7\cos 150^\circ = 10 + 6 - 6.062 = 9.938$ N.
2. $y$-components: $0 + 12\sin 60^\circ + 7\sin 150^\circ = 10.392 + 3.5 = 13.892$ N.
3. $R = \sqrt{9.938^2 + 13.892^2} \approx 17.1$ N.
4. $\tan\alpha = \dfrac{13.892}{9.938}$, so $\alpha \approx 54.4^\circ$ above the positive $x$-axis.
:::

| Force | Angle | $x$-component | $y$-component |
| --- | --- | --- | --- |
| 10 N | $0^\circ$ | 10 | 0 |
| 12 N | $60^\circ$ | 6 | 10.392 |
| 7 N | $150^\circ$ | $-6.062$ | 3.5 |
| Sum | | 9.938 | 13.892 |

A table like this keeps the working tidy and makes sign errors easy to spot.

## Two forces and the cosine rule

Two forces $P$ and $Q$ with an angle $\theta$ between them form, when drawn nose to tail, a triangle whose angle opposite the resultant is $180^\circ - \theta$. The cosine rule then gives

$$
R^2 = P^2 + Q^2 + 2PQ\cos\theta
$$

The plus sign appears because $\cos(180^\circ - \theta) = -\cos\theta$.

:::worked-solution[Example 4: two forces of 5 N and 8 N act at a point with an angle of $60^\circ$ between them. Find the resultant and the angle it makes with the 5 N force.]
1. $R^2 = 25 + 64 + 2(5)(8)\cos 60^\circ = 89 + 40 = 129$, so $R \approx 11.4$ N.
2. In the triangle of forces the angle opposite $R$ is $120^\circ$. Sine rule: $\dfrac{\sin\beta}{8} = \dfrac{\sin 120^\circ}{11.36}$.
3. $\sin\beta \approx 0.610$, so $\beta \approx 37.6^\circ$ from the 5 N force.
4. Check by components: $x = 5 + 4 = 9$, $y = 8\sin 60^\circ = 6.93$, $\tan^{-1}\frac{6.93}{9} \approx 37.6^\circ$.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Forces are in the ZIMSEC Paper 2 Mechanics section only. Cambridge 0606 uses vectors for displacement and velocity but has no forces.
:::

## Common mistakes

:::mistake{title="Cosine and sine the wrong way round"}
The component along a direction is $F\cos\theta$ only when $\theta$ is the angle between the force and **that** direction. If the angle is given with the vertical, the horizontal component is $F\sin\theta$.
:::

:::mistake{title="Adding magnitudes"}
Forces of 5 N and 8 N do not give 13 N unless they act in the same direction. Add components, not sizes.
:::

:::mistake{title="Weight in kilograms"}
Mass is in kilograms; weight is a force in newtons, $W = mg$.
:::

:::mistake{title="Wrong quadrant for the direction"}
$\tan^{-1}\frac{Y}{X}$ gives an acute angle. Use the signs of $X$ and $Y$ to place the resultant in the correct quadrant.
:::

## Exam tips

:::exam-tip
Draw a large diagram with every force and angle marked; examiners award marks for a correct diagram in longer questions.
:::

:::exam-tip
Give a direction precisely: "$54.4^\circ$ above the positive $x$-axis" or "a bearing of $053^\circ$", never just "$54.4^\circ$".
:::

:::exam-tip
Keep 4 or more significant figures in components and round only the final answer to 3 significant figures (angles to 1 decimal place).
:::

## Summary

:::summary
- Force is a vector measured in newtons; weight is $mg$ acting downwards.
- A force $F$ at $\theta$ to a direction has components $F\cos\theta$ along it and $F\sin\theta$ perpendicular to it.
- The resultant is the vector sum: add the components, then $R = \sqrt{X^2 + Y^2}$ and $\tan\alpha = \frac{Y}{X}$.
- For two forces at angle $\theta$, $R^2 = P^2 + Q^2 + 2PQ\cos\theta$.
- Always check the quadrant of the resultant from the signs of its components.
:::
