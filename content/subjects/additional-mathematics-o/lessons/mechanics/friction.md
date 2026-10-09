---
{
  "key": "mechanics.friction",
  "title": "Friction and the coefficient of friction",
  "summary": "Model the contact force between rough surfaces as a normal reaction and a frictional force with F ≤ μR, and solve problems on particles in equilibrium, including limiting equilibrium, on rough horizontal and inclined planes.",
  "concepts": ["amath.mechanics.friction"],
  "estimatedMinutes": 45,
  "level": "core"
}
---
## Introduction

Friction is why a loaded scotch cart does not slide down a gentle slope, why tyres grip the tarred road and why it takes a hard push to start moving a heavy crate of tomatoes across a market floor. It is a force that adjusts itself: it is only as big as it needs to be, up to a limit.

ZIMSEC Paper 2 asks you to decide whether a particle stays at rest on a rough surface, to find the force needed to make it move, and to find the coefficient of friction from limiting equilibrium. You need resolving on inclined planes from "Equilibrium of a particle".

## Key definitions

:::definition{term="Rough surface"}
A surface that can exert a frictional force along it, in addition to the normal reaction perpendicular to it.
:::

:::definition{term="Friction"}
The component of the contact force along the surface. It acts in the direction that opposes motion, or opposes the motion that would happen without it.
:::

:::definition{term="Coefficient of friction, μ"}
A number that depends on the two surfaces in contact (for example rubber on tar, or wood on concrete). It has no units, and $\mu \geq 0$; $\mu = 0$ means smooth.
:::

:::definition{term="Limiting equilibrium"}
The particle is at rest but on the point of moving: friction has reached its greatest possible value, $F = \mu R$.
:::

:::formula{name="Friction law"}
$$
F \leq \mu R
$$

with $F = \mu R$ in limiting equilibrium and while the particle is sliding.
:::

## How friction behaves

Friction is not always $\mu R$. Think of pushing a crate with a slowly increasing force:

1. With a small push, friction exactly balances it and the crate stays still.
2. As the push grows, friction grows with it.
3. Friction reaches its limit $\mu R$; the crate is in limiting equilibrium.
4. Any bigger push and the crate moves; friction stays at $\mu R$.

So for a particle at rest: find the friction **needed** for equilibrium, compare it with the **maximum** $\mu R$, and decide.

:::worked-solution[Example 1: a 20 kg crate rests on a rough horizontal floor with $\mu = 0.4$. Rudo pushes it horizontally with a force of 50 N. Take $g = 9.8$ m s$^{-2}$. Does it move?]
1. Vertically: $R = 20 \times 9.8 = 196$ N.
2. Maximum friction $= \mu R = 0.4 \times 196 = 78.4$ N.
3. Friction needed to keep it still $= 50$ N, which is less than 78.4 N.
4. The crate stays at rest, and the friction is 50 N (not 78.4 N).
5. A horizontal push of more than 78.4 N would move it.
:::

## Forces at an angle change the reaction

If a pull acts at an angle above the horizontal, its vertical component lifts the particle slightly, so $R$ is **less** than $mg$ and the maximum friction falls. A push angled downwards does the opposite.

:::worked-solution[Example 2: the same crate is pulled by a rope at $30^\circ$ above the horizontal. Find the tension $P$ that puts it in limiting equilibrium.]
1. Vertically: $R + P\sin 30^\circ = 196$, so $R = 196 - 0.5P$.
2. Horizontally (limiting): $P\cos 30^\circ = \mu R = 0.4(196 - 0.5P)$.
3. $P(\cos 30^\circ + 0.2) = 78.4$, so $P = \dfrac{78.4}{1.0660} \approx 73.5$ N.
4. This is less than the 78.4 N needed for a horizontal push, because pulling upwards reduces $R$.
:::

## Rough inclined planes

On a slope of angle $\alpha$, with no other forces, the particle tends to slide **down**, so friction acts **up** the slope. Resolving gives $R = mg\cos\alpha$ and friction needed $F = mg\sin\alpha$.

The particle stays at rest when $mg\sin\alpha \leq \mu mg\cos\alpha$, that is when

$$
\tan\alpha \leq \mu
$$

In limiting equilibrium on a slope with no other forces, $\mu = \tan\alpha$: the mass does not matter.

:::worked-solution[Example 3: a 4 kg block rests on a rough plane inclined at $25^\circ$, with $\mu = 0.6$. Take $g = 9.8$ m s$^{-2}$. Show that it stays at rest and find the friction.]
1. Perpendicular: $R = 39.2\cos 25^\circ \approx 35.5$ N.
2. Friction needed: $F = 39.2\sin 25^\circ \approx 16.6$ N, up the plane.
3. Maximum: $\mu R = 0.6 \times 35.53 \approx 21.3$ N.
4. $16.6 < 21.3$, so the block stays at rest with friction 16.6 N. (Equivalently, $\tan 25^\circ = 0.466 < 0.6$.)
:::

### Holding a particle on a slope with a force

When a force $P$ acts up the plane, the direction of friction depends on which way the particle is about to move:

- **least** $P$ to stop it sliding down: friction acts **up** the plane, $P + \mu R = mg\sin\alpha$;
- $P$ to make it **just move up**: friction acts **down** the plane, $P = mg\sin\alpha + \mu R$.

:::worked-solution[Example 4: a 5 kg particle is on a rough plane inclined at $35^\circ$, $\mu = 0.25$. A force $P$ acts up the line of greatest slope. Take $g = 9.8$ m s$^{-2}$. Find the least $P$ that prevents slipping and the $P$ that makes it about to move up.]
1. $mg\sin 35^\circ = 49\sin 35^\circ \approx 28.11$ N; $R = 49\cos 35^\circ \approx 40.14$ N; $\mu R \approx 10.03$ N.
2. About to slide down (friction up): $P = 28.11 - 10.03 \approx 18.1$ N.
3. About to move up (friction down): $P = 28.11 + 10.03 \approx 38.1$ N.
4. For any $P$ between 18.1 N and 38.1 N the particle stays at rest.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Friction is in ZIMSEC Paper 2 Mechanics only. Friction while a particle accelerates is in "Newton's second law with resolved forces and friction".
:::

## Common mistakes

:::mistake{title="Always writing F = μR"}
$F = \mu R$ only in limiting equilibrium or when sliding. A particle comfortably at rest has $F < \mu R$; find $F$ by resolving.
:::

:::mistake{title="Using R = mg when a force acts at an angle"}
Resolve perpendicular to the surface every time. Any applied force with a component perpendicular to the surface changes $R$.
:::

:::mistake{title="Friction in the wrong direction"}
Friction opposes the motion that would happen. Ask "which way would it move without friction?" before drawing the arrow.
:::

:::mistake{title="Giving μ units"}
$\mu$ is a ratio of two forces, so it has no units.
:::

## Exam tips

:::exam-tip
"About to slip", "on the point of moving" and "limiting equilibrium" all mean $F = \mu R$. Write that statement in your answer.
:::

:::exam-tip
For "show that the particle remains at rest", compare the friction needed with $\mu R$ and conclude in words.
:::

:::exam-tip
Find $R$ first: almost every friction question needs it, and it carries a method mark on its own.
:::

## Summary

:::summary
- Contact force = normal reaction $R$ (perpendicular) + friction $F$ (along the surface).
- $F \leq \mu R$; equality in limiting equilibrium and when sliding.
- Find the friction needed by resolving, then compare it with $\mu R$.
- On a slope with no other forces a particle stays at rest when $\tan\alpha \leq \mu$.
- Friction opposes the motion that would otherwise take place, so its direction depends on the situation.
:::
