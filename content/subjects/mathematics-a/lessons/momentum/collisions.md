---
{
  "key": "momentum.collisions",
  "title": "Momentum, impulse and collisions",
  "summary": "Use linear momentum as a vector in one dimension, apply conservation of momentum to direct collisions (including bodies that coalesce), and, for ZIMSEC, use impulse as force × time and as change in momentum.",
  "concepts": ["amaths.momentum.collisions"],
  "estimatedMinutes": 45,
  "level": "core"
}
---
## Introduction

Shunting wagons at the Bulawayo marshalling yard bump into each other and couple together; a cricket ball is struck by a bat at Harare Sports Club; two kombis collide head-on. Collisions happen too quickly for us to measure the forces involved, but one quantity is always conserved: the total momentum. That single principle lets us predict velocities after an impact without knowing anything about the forces during it.

Cambridge examines momentum in Paper 4 (topic 4.3): conservation of momentum in direct collisions, including bodies that join together. ZIMSEC examines it in Mechanics Form 5 (topic 6.6), and also **impulse**, the link between a force acting for a time and the change in momentum it produces. The coefficient of restitution is not in either syllabus.

## Key definitions

:::definition{term="Linear momentum"}
The momentum of a body of mass $m$ moving with velocity $v$ is $mv$. Its unit is N s (equivalently kg m s$^{-1}$). Momentum is a vector: in one dimension its sign gives the direction.
:::

:::definition{term="Direct collision"}
A collision in which both bodies move along the same straight line before and after the impact.
:::

:::definition{term="Coalesce"}
Two bodies coalesce when they stick together on impact and then move as one body with a common velocity.
:::

:::formula{name="Conservation of linear momentum"}
$$
m_1u_1 + m_2u_2 = m_1v_1 + m_2v_2
$$
:::

Not printed on MF19: learn it. The principle holds whenever no external force acts along the line of motion during the collision (for example on a smooth surface, or because the impact is so short that friction has no time to act).

## Using conservation of momentum

1. Draw a "before" and an "after" diagram with the masses and velocities, and choose a positive direction.
2. Give every velocity a sign: a body moving the other way has a **negative** velocity.
3. Write total momentum before $=$ total momentum after.
4. Solve, and interpret the sign of your answer: a negative velocity means the body moves in the negative direction.

:::worked-solution[Example 1: a ball $A$ of mass $0.4$ kg moving at $5$ m s$^{-1}$ hits a ball $B$ of mass $0.6$ kg at rest. After the collision $A$ moves on in the same direction at $1$ m s$^{-1}$. Find the velocity of $B$.]
1. Positive direction: the original direction of $A$.
2. Before: $0.4 \times 5 + 0.6 \times 0 = 2$ N s.
3. After: $0.4 \times 1 + 0.6v = 0.4 + 0.6v$.
4. So $0.6v = 1.6$ and $v = \dfrac{8}{3} = 2.67$ m s$^{-1}$, in the original direction of $A$.
:::

:::worked-solution[Example 2: a wagon of mass $8000$ kg moving at $3$ m s$^{-1}$ collides with a wagon of mass $4000$ kg moving towards it at $1.5$ m s$^{-1}$. They couple together. Find their common velocity.]
1. Positive direction: the direction of the heavier wagon. The lighter wagon has velocity $-1.5$ m s$^{-1}$.
2. Before: $8000 \times 3 + 4000 \times (-1.5) = 24000 - 6000 = 18000$ N s.
3. After: $12000v$.
4. So $v = 1.5$ m s$^{-1}$, in the original direction of the heavier wagon.
5. Kinetic energy is not conserved: it falls from $40\,500$ J to $13\,500$ J. The rest becomes sound, heat and the work of deforming the couplings.
:::

Momentum is conserved in every collision; kinetic energy is not, and you must never assume it is.

## Collisions in sequence

:::worked-solution[Example 3 (exam style): particles $P$ (mass $2$ kg) and $Q$ (mass $3$ kg) move towards each other on a smooth horizontal line with speeds $4$ m s$^{-1}$ and $2$ m s$^{-1}$. After they collide, $P$ moves back with speed $1$ m s$^{-1}$. (a) Find the velocity of $Q$. (b) $Q$ then hits particle $R$, of mass $1$ kg and at rest, and they coalesce. Find their common speed and show that there are no further collisions.]
1. (a) Positive direction: $P$'s original direction. Before: $2(4) + 3(-2) = 2$ N s.
2. After: $2(-1) + 3v_Q$. So $3v_Q = 4$ and $v_Q = \dfrac{4}{3}$ m s$^{-1}$, in $P$'s original direction.
3. (b) $3 \times \dfrac{4}{3} + 1 \times 0 = 4w$, so $w = 1$ m s$^{-1}$.
4. Now $P$ moves at $-1$ m s$^{-1}$ and the combined particle at $+1$ m s$^{-1}$: they move apart, so there are no further collisions.
:::

## Impulse (ZIMSEC)

When a force $F$ acts for a time $t$, it produces a change in momentum. The **impulse** of the force is

$$
I = Ft = mv - mu,
$$

measured in N s. For a large force acting for a short time (a bat hitting a ball, a jerk in a string), we usually know the change in momentum and deduce the average force. In a collision, the impulse on one body is equal and opposite to the impulse on the other (Newton's third law), which is exactly why total momentum is conserved.

:::worked-solution[Example 4: a ball of mass $0.15$ kg hits a wall at $12$ m s$^{-1}$ and rebounds along the same line at $8$ m s$^{-1}$. The contact lasts $0.05$ s. Find the impulse on the ball and the average force from the wall.]
1. Positive direction: away from the wall. Then $u = -12$ and $v = 8$.
2. Impulse $= m(v - u) = 0.15(8 - (-12)) = 0.15 \times 20 = 3$ N s, away from the wall.
3. Average force $= \dfrac{3}{0.05} = 60$ N.
:::

Leaving out the minus sign in step 1 gives $0.15 \times (8 - 12) = -0.6$ N s, a common and costly mistake.

:::keyfact{title="ZIMSEC and Cambridge"}
Cambridge Paper 4: momentum and its conservation in one dimension, including coalescence; impulse is not used. ZIMSEC also examines impulse ($I = Ft$ and $I = mv - mu$), impulsive tensions when a string suddenly becomes taut, and may set momentum in vector form, such as $m\mathbf{v}$ with $\mathbf{v} = (3\mathbf{i} + 4\mathbf{j})$ m s$^{-1}$.
:::

## Common mistakes

:::mistake{title="Ignoring direction"}
A body moving the opposite way has a negative velocity, and so negative momentum. Write the sign into every term.
:::

:::mistake{title="Assuming kinetic energy is conserved"}
Only momentum is conserved in a collision. Kinetic energy is usually lost.
:::

:::mistake{title="Rebounds and impulse"}
For a rebound, the change in velocity is the sum of the two speeds, not their difference.
:::

:::mistake{title="Misreading a negative answer"}
A negative velocity after a collision is not an error: it tells you the body moves in the negative direction. Say so in words.
:::

## Exam tips

:::exam-tip
Draw before-and-after diagrams with arrows and a stated positive direction; examiners award the method mark for a correct momentum equation with consistent signs.
:::

:::exam-tip
When asked for a "speed", give a positive number; when asked for a "velocity", give the sign or state the direction.
:::

:::exam-tip
"Show that there are no further collisions" needs a comparison of the final velocities: the body behind must not be moving faster in the same direction than the one in front.
:::

## Summary

:::summary
- Momentum $= mv$ (N s), a vector: in one dimension its sign gives the direction.
- In a collision with no external impulse: total momentum before $=$ total momentum after.
- Bodies that coalesce move off with a common velocity $\frac{m_1u_1 + m_2u_2}{m_1 + m_2}$.
- Kinetic energy is generally not conserved in a collision.
- ZIMSEC: impulse $I = Ft = mv - mu$; equal and opposite impulses explain conservation of momentum.
:::
