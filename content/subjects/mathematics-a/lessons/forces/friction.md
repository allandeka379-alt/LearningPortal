---
{
  "key": "forces.friction",
  "title": "Friction and limiting equilibrium",
  "summary": "Model a contact force as a normal reaction and a frictional force, use F ≤ μR and F = μR in limiting equilibrium, and solve problems on rough horizontal and inclined planes.",
  "concepts": ["amaths.forces.friction"],
  "estimatedMinutes": 55,
  "level": "core"
}
---
## Introduction

A loaded scotch cart stands on a sloping farm track near Gweru without rolling away; a bag of cement sits on a builder's ramp until someone nudges it. Friction is what makes this possible. It is also what you work against when you push a heavy crate across a warehouse floor in Msasa.

In the previous lesson every surface was smooth. Real surfaces are rough, and the contact force has two parts: the normal reaction, perpendicular to the surface, and friction, along it. The key fact of this lesson is that friction is **not** fixed: it takes whatever value is needed to prevent motion, up to a maximum. Both boards examine this: ZIMSEC Mechanics Form 5 (topic 6.2.3) and Cambridge Paper 4 (topic 4.1), and friction then appears again in Newton's laws, connected particles and work–energy questions.

## Key definitions

:::definition{term="Rough and smooth contact"}
A contact is **smooth** if the only contact force is the normal reaction $R$. It is **rough** if there can also be a frictional force $F$ along the surface.
:::

:::definition{term="Friction"}
The component of the contact force along the surface. It opposes motion, or the **tendency** to move, of one surface relative to the other.
:::

:::definition{term="Limiting equilibrium"}
A body is in limiting equilibrium when it is at rest but on the point of moving ("about to slip", "about to slide"). Friction then has its maximum value.
:::

:::definition{term="Coefficient of friction"}
The number $\mu \ge 0$ that relates the maximum friction to the normal reaction for a given pair of surfaces.
:::

:::formula{name="The friction law"}
$$
F \le \mu R, \qquad F = \mu R \text{ when the body is in limiting equilibrium or sliding}
$$
:::

This is not printed on MF19; learn it. When a body slides, friction stays at $\mu R$ and acts against the direction of motion.

## How friction behaves

Push a crate gently: it does not move, so friction exactly balances your push. Push harder: friction grows to match. Only when the push needed exceeds $\mu R$ does the crate start to slide. So:

- if the force needed for equilibrium is **less than** $\mu R$, the body stays at rest and $F$ equals that needed force;
- if it **equals** $\mu R$, the body is in limiting equilibrium;
- if it would be **more than** $\mu R$, equilibrium is impossible and the body moves.

Newton's third law applies to contact forces: the floor pushes up on the crate with $R$ and the crate pushes down on the floor with $R$; friction on the crate and friction on the floor are equal and opposite.

:::worked-solution[Example 1: a crate of mass $12$ kg rests on rough horizontal ground, coefficient of friction $0.35$. Take $g = 10$ m s$^{-2}$. (a) A horizontal force of $30$ N is applied. Does the crate move? (b) Instead, a rope pulls at $25°$ above the horizontal. Find the tension that puts the crate in limiting equilibrium.]
1. (a) Vertically $R = 120$ N, so the maximum friction is $\mu R = 0.35 \times 120 = 42$ N.
2. The force to be balanced is $30$ N $< 42$ N, so the crate stays at rest and friction is $30$ N (not $42$ N).
3. (b) Vertically: $R + T\sin 25° = 120$, so $R = 120 - T\sin 25°$. The rope reduces $R$.
4. Horizontally, limiting: $T\cos 25° = \mu R = 0.35(120 - T\sin 25°)$.
5. So $T(\cos 25° + 0.35\sin 25°) = 42$, giving $T = \dfrac{42}{1.054} = 39.8$ N.
6. Note that this is less than $42$ N: pulling upwards at an angle is more efficient than pulling horizontally.
:::

## Rough inclined planes

On a slope of angle $\alpha$, the weight has components $mg\sin\alpha$ down the slope and $mg\cos\alpha$ into the plane. Decide which way the body **tends** to move; friction acts the other way.

A body resting on a rough plane with no other forces has $F = mg\sin\alpha$ and $R = mg\cos\alpha$. It does not slip as long as $mg\sin\alpha \le \mu\,mg\cos\alpha$, that is, as long as $\tan\alpha \le \mu$. If it is on the point of slipping, $\mu = \tan\alpha$: a quick way to measure $\mu$ is to tilt a plank until a block just starts to slide.

:::worked-solution[Example 2: a block of mass $3$ kg is placed on a rough plane inclined at $20°$ to the horizontal; $\mu = 0.45$ and $g = 10$ m s$^{-2}$. (a) Show that the block stays at rest. (b) Find the least force parallel to the plane that will make it start to move up the plane.]
1. (a) The block tends to slide down, so friction acts up the plane. Needed: $F = 30\sin 20° = 10.26$ N.
2. $R = 30\cos 20° = 28.19$ N, so $\mu R = 0.45 \times 28.19 = 12.69$ N.
3. Since $10.26 < 12.69$, friction can hold the block: it stays at rest (equivalently, $\tan 20° = 0.364 < 0.45$).
4. (b) Now the block is about to move **up**, so friction acts **down** the plane and is limiting: $F = 12.69$ N.
5. Along the plane: $P = 30\sin 20° + 12.69 = 10.26 + 12.69 = 22.9$ N.
:::

![Forces on a 3 kg block at rest on a rough plane inclined at 20 degrees: weight 30 N vertically down, normal reaction R = 28.19 N perpendicular to the plane and friction F = 10.26 N up the plane, which is less than the greatest friction available, 12.69 N.](media:diagrams/forces-on-block-rough-incline.png "Figure: friction (10.26 N) acts up the plane and balances the component of weight down the plane")

The direction of friction changed between the two parts. That is the single most important idea in limiting-equilibrium problems.

:::worked-solution[Example 3 (exam style): a particle of mass $5$ kg is held at rest on a rough plane inclined at $40°$ by a horizontal force of magnitude $P$ N. The coefficient of friction is $0.3$ and $g = 10$ m s$^{-2}$. Find the range of values of $P$.]
1. Without $P$ the particle would slip, since $\tan 40° = 0.839 > 0.3$. So there is a least $P$ (about to slip down) and a greatest $P$ (about to slide up).
2. Perpendicular to the plane, in both cases: $R = 50\cos 40° + P\sin 40°$.
3. Least $P$: friction acts **up** the plane. Along the plane: $P\cos 40° + 0.3R = 50\sin 40°$.
4. Substituting: $P(\cos 40° + 0.3\sin 40°) = 50(\sin 40° - 0.3\cos 40°)$, so $P = \dfrac{20.65}{0.9589} = 21.5$.
5. Greatest $P$: friction acts **down** the plane: $P\cos 40° = 0.3R + 50\sin 40°$.
6. So $P(\cos 40° - 0.3\sin 40°) = 50(\sin 40° + 0.3\cos 40°)$, giving $P = \dfrac{43.63}{0.5732} = 76.1$.
7. The particle stays at rest for $21.5 \le P \le 76.1$.
:::

## The smooth-contact model and its limits

Treating a surface as smooth is a modelling assumption. It is reasonable for ice, an oiled track or a polished surface, but it predicts that the smallest force will move a body on a horizontal surface, which is rarely true. The value of $\mu$ is itself a model: it depends on both surfaces, and in reality friction while sliding is often slightly less than the maximum static friction. A Level questions use one value of $\mu$ for both.

:::keyfact{title="ZIMSEC and Cambridge"}
The content is the same for both boards. Cambridge Paper 4 always takes $g = 10$ m s$^{-2}$; ZIMSEC questions state the value of $g$ (often $9.8$ m s$^{-2}$). ZIMSEC later extends friction to rigid bodies, such as a ladder resting against a wall, in its moments topic.
:::

## Common mistakes

:::mistake{title="Writing F = μR when the body is not limiting"}
$F = \mu R$ only when the body is about to move or is sliding. Otherwise $F$ is whatever value equilibrium needs, which may be smaller.
:::

:::mistake{title="Friction in the wrong direction"}
Friction opposes the **tendency** to move. If a force is about to push a block **up** a slope, friction acts **down** the slope.
:::

:::mistake{title="Taking R = mg"}
On a slope, or with a force at an angle, $R \ne mg$. Always resolve perpendicular to the surface first.
:::

:::mistake{title="Forgetting that R changes with the applied force"}
A rope pulling upwards reduces $R$, and so reduces the maximum friction; a horizontal push on a slope can increase $R$.
:::

## Exam tips

:::exam-tip
Resolve perpendicular to the surface first to find $R$, then along the surface using $F = \mu R$. This order gives the cleanest working.
:::

:::exam-tip
In "find the range of values" questions, do the two limiting cases separately, with friction reversed, and state the final inequality.
:::

:::exam-tip
"Show that the particle remains at rest" needs a comparison: the friction required versus $\mu R$, with both numbers written down.
:::

## Summary

:::summary
- A rough contact force has a normal component $R$ and a frictional component $F$ along the surface.
- $F \le \mu R$ always; $F = \mu R$ in limiting equilibrium and when sliding.
- Friction opposes motion or the tendency to move: its direction can change with the applied force.
- On a rough slope with no other forces, a body stays at rest when $\tan\alpha \le \mu$.
- For a range of forces, solve the two limiting cases (about to slip down, about to slide up).
:::
