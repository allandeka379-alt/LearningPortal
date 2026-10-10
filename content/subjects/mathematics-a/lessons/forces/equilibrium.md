---
{
  "key": "forces.equilibrium",
  "title": "Forces, resultants and equilibrium of a particle",
  "summary": "Identify the forces acting on a particle, draw a clear force diagram, find components and resultants by calculation, and solve equilibrium problems by resolving in two perpendicular directions.",
  "concepts": ["amaths.forces.equilibrium"],
  "estimatedMinutes": 50,
  "freePreview": true,
  "level": "core"
}
---
## Introduction

A bucket hanging from two ropes over a borehole in Masvingo, a sign held up by cables outside a shop in Bulawayo, a crate resting on a ramp at a Hwange coal depot: in each case several forces act on one object and the object does not move. Statics is the study of such situations, and it starts with one idea. If a particle is in equilibrium, the forces on it add up to the zero vector.

This lesson is the foundation of all the mechanics that follows. Newton's laws, friction, connected particles and energy all begin with the same skill: draw a force diagram and resolve. ZIMSEC examines it in Mechanics Form 5 (topic 6.2); Cambridge examines it in Paper 4 (topic 4.1), where it appears in almost every paper, often as the first question.

You should already be confident with right-angled trigonometry and with adding vectors in components.

## Key definitions

:::definition{term="Force"}
A push or pull that can change the motion of a body. Force is a **vector**: it has a magnitude, measured in newtons (N), and a direction.
:::

:::definition{term="Particle"}
A body whose size can be ignored, so that all the forces act at one point. A particle can move but cannot rotate.
:::

:::definition{term="Resultant"}
The single force that has the same effect as all the forces acting together: their vector sum.
:::

:::definition{term="Equilibrium"}
A particle is in equilibrium when the resultant force on it is zero. It is then at rest or moving with constant velocity.
:::

:::formula{name="Components of a force"}
A force of magnitude $F$ acting at angle $\theta$ to a direction has component $F\cos\theta$ along that direction and $F\sin\theta$ perpendicular to it.
:::

Neither MF19 nor the ZIMSEC syllabus prints this: learn it, and always check which angle you have.

## The forces you will meet

- **Weight** $W = mg$, acting vertically downwards. Cambridge uses $g = 10$ m s$^{-2}$; ZIMSEC questions state the value, usually $9.8$ or $10$.
- **Normal reaction** $R$ (or $N$), perpendicular to a surface, pushing away from it.
- **Tension** $T$ in a string, pulling away from the particle along the string. A light string has the same tension throughout.
- **Thrust** (compression) in a rod, pushing towards the particle.
- **Friction**, along a surface, opposing motion or the tendency to move (next lesson).
- **Applied forces**, such as a pull $P$ at a stated angle.

Draw every force as an arrow starting at the particle, label it, and mark every angle. Most lost marks in mechanics come from a missing or misdirected force.

## Finding a resultant

Choose two perpendicular directions (usually horizontal and vertical, or along and perpendicular to a slope). Add the components in each direction, then combine them:

$$
R = \sqrt{X^2 + Y^2}, \qquad \tan\theta = \frac{Y}{X}
$$

Use a sketch of $X$ and $Y$ to find the correct quadrant for the direction. Scale drawing is never accepted: everything is by calculation.

:::worked-solution[Example 1: forces of $8$ N, $6$ N and $5$ N act on a particle. The $8$ N force acts due east, the $6$ N force due north and the $5$ N force on a bearing of $240°$. Find the magnitude and direction of the resultant.]
1. Take east as the $x$-direction and north as the $y$-direction. A bearing of $240°$ is $210°$ measured anticlockwise from east.
2. $x$-components: $8 + 0 + 5\cos 210° = 8 - 4.330 = 3.670$ N.
3. $y$-components: $0 + 6 + 5\sin 210° = 6 - 2.5 = 3.5$ N.
4. Magnitude: $R = \sqrt{3.670^2 + 3.5^2} = 5.07$ N.
5. Direction: $\tan\theta = \dfrac{3.5}{3.670}$, so $\theta = 43.6°$ north of east (both components are positive, so the resultant is in the first quadrant).
:::

## Equilibrium: resolving

If a particle is in equilibrium, the resultant is zero, so the components in **any** direction sum to zero. In practice:

1. Draw the force diagram.
2. Resolve in two perpendicular directions and set each sum to zero.
3. Solve the two simultaneous equations.

Choose the directions to make the algebra easy: resolving perpendicular to an unknown force removes it from that equation.

:::worked-solution[Example 2 (exam style): a particle of weight $20$ N hangs in equilibrium from two light strings. One string makes $30°$ with the horizontal and the other makes $50°$ with the horizontal, on opposite sides. Find the tensions.]
1. Let the tensions be $T_1$ (at $30°$) and $T_2$ (at $50°$).
2. Resolve horizontally: $T_1\cos 30° = T_2\cos 50°$.
3. Resolve vertically: $T_1\sin 30° + T_2\sin 50° = 20$.
4. From step 2, $T_2 = \dfrac{T_1\cos 30°}{\cos 50°}$. Substitute: $T_1\left(\sin 30° + \dfrac{\cos 30°\sin 50°}{\cos 50°}\right) = 20$.
5. Multiplying through by $\cos 50°$ and using $\sin 30°\cos 50° + \cos 30°\sin 50° = \sin 80°$ gives $T_1 = \dfrac{20\cos 50°}{\sin 80°} = 13.1$ N.
6. Then $T_2 = \dfrac{20\cos 30°}{\sin 80°} = 17.6$ N.
7. Sense check: the steeper string carries more of the weight, so $T_2 > T_1$.
:::

:::worked-solution[Example 3: a small crate of mass $4$ kg rests on a smooth plane inclined at $25°$ to the horizontal. It is held in equilibrium by a horizontal force $P$ N. Taking $g = 10$ m s$^{-2}$, find $P$ and the normal reaction $R$.]
1. Forces: weight $40$ N vertically down, $R$ perpendicular to the plane, $P$ horizontal (towards the plane).
2. Resolve **along** the plane, so that $R$ does not appear: $P\cos 25° = 40\sin 25°$.
3. So $P = 40\tan 25° = 18.7$ N.
4. Resolve **perpendicular** to the plane: $R = 40\cos 25° + P\sin 25° = 36.25 + 7.88 = 44.1$ N.
5. Notice that $R$ is larger than the weight here, because $P$ also pushes the crate into the plane.
:::

## Triangle of forces and Lami's theorem

When exactly three forces keep a particle in equilibrium, their arrows drawn nose to tail form a closed triangle. Lami's theorem follows from the sine rule: if the angles **between** the forces are $\alpha$, $\beta$ and $\gamma$, then

$$
\frac{P}{\sin\alpha} = \frac{Q}{\sin\beta} = \frac{R}{\sin\gamma},
$$

where each angle is the one opposite the force named. In Example 2 the angle between the two strings is $100°$, the angle between $T_1$ and the weight is $120°$, and between $T_2$ and the weight $140°$. The angle opposite $T_1$ is the one between the other two forces, $140°$, giving $T_1 = \dfrac{20\sin 140°}{\sin 100°} = 13.1$ N again. Both boards accept this method, but resolving always works and is what examiners expect.

:::keyfact{title="ZIMSEC and Cambridge"}
Cambridge Paper 4 deals only with particles, uses $g = 10$ m s$^{-2}$ and does not use vector notation. ZIMSEC Mechanics also writes forces as vectors such as $(3\mathbf{i} - 4\mathbf{j})$ N and states $g$ in each question; the method (resolve and set the sums to zero) is the same.
:::

## Common mistakes

:::mistake{title="Mixing up sine and cosine"}
The component **next to** the angle uses cosine. If the angle is measured from the vertical, the vertical component is $F\cos\theta$, not $F\sin\theta$.
:::

:::mistake{title="Assuming the normal reaction equals the weight"}
$R = mg$ only on a horizontal surface with no other vertical forces. On a slope, or with an angled pull, resolve to find $R$.
:::

:::mistake{title="Forgetting a force"}
Weight and normal reaction are easy to leave out. List the forces before writing any equation.
:::

:::mistake{title="Using a scale drawing"}
Resultants must be calculated. A drawing can guide you, but it earns no marks.
:::

## Exam tips

:::exam-tip
Draw a large, labelled force diagram first, even when the question does not ask for one. Examiners award method marks for correct resolving, and the diagram is where you check it.
:::

:::exam-tip
Write each resolution with its direction: "Resolving parallel to the plane: …". Every term must be a force component, not a mixture of forces and accelerations.
:::

:::exam-tip
Give answers to 3 significant figures (angles to 1 decimal place), and keep more figures in your working. "Show that" answers must be reached exactly, with every step written.
:::

## Summary

:::summary
- Force is a vector; weight $W = mg$ acts vertically down, normal reactions act perpendicular to surfaces, tensions pull along strings.
- Resolve forces into components $F\cos\theta$ and $F\sin\theta$; the resultant has magnitude $\sqrt{X^2 + Y^2}$ and direction $\tan^{-1}(Y/X)$.
- In equilibrium the components in any direction sum to zero: resolve in two perpendicular directions.
- Resolve perpendicular to an unknown force to remove it from an equation.
- Lami's theorem is an alternative for exactly three forces; scale drawing is never accepted.
:::
