---
{
  "key": "mechanics.equilibrium",
  "title": "Equilibrium of a particle",
  "summary": "Use the condition that the forces on a particle in equilibrium add to zero: resolve in two perpendicular directions, use the triangle of forces, and find unknown tensions, reactions and angles for particles on strings and smooth inclined planes.",
  "concepts": ["amath.mechanics.equilibrium"],
  "estimatedMinutes": 45,
  "level": "core"
}
---
## Introduction

A bucket hanging still from two ropes over a well, a traffic light suspended above a Harare street and a sack held at rest on a smooth ramp are all in equilibrium: the forces on them balance exactly. Engineers use this idea to choose rope and cable strengths, and in ZIMSEC Paper 2 it is one of the commonest Mechanics questions.

The method is always the same: draw every force, resolve in two perpendicular directions and set each total to zero. You need the resolving skills from "Forces as vectors: resultants and components".

## Key definitions

:::definition{term="Equilibrium"}
A particle is in equilibrium when the resultant force on it is zero. It is then at rest or moving with constant velocity.
:::

:::definition{term="Smooth surface"}
A surface with no friction: the only contact force is the normal reaction, perpendicular to the surface.
:::

:::definition{term="Light inextensible string"}
A string of negligible mass that does not stretch. The tension is the same all along it.
:::

:::formula{name="Condition for equilibrium"}
$$
\sum F_x = 0 \quad\text{and}\quad \sum F_y = 0
$$

for any two perpendicular directions $x$ and $y$.
:::

## Choosing directions

You may resolve in **any** two perpendicular directions. Choose them to make the algebra easy:

- For hanging particles, use horizontal and vertical.
- For a particle on an inclined plane, use **along** the plane and **perpendicular** to it. The weight $mg$ then has components $mg\sin\alpha$ down the slope and $mg\cos\alpha$ into the slope, where $\alpha$ is the angle of the plane.

## Particles hanging on strings

:::worked-solution[Example 1: a 5 kg bucket hangs at rest from two light strings that make angles of $30^\circ$ and $60^\circ$ with the horizontal. Take $g = 9.8$ m s$^{-2}$. Find the tensions.]
1. Weight $= 5 \times 9.8 = 49$ N. Let $T_1$ be the tension in the string at $30^\circ$ and $T_2$ in the string at $60^\circ$.
2. Horizontally: $T_1\cos 30^\circ = T_2\cos 60^\circ$, so $T_2 = \sqrt{3}\,T_1$.
3. Vertically: $T_1\sin 30^\circ + T_2\sin 60^\circ = 49$.
4. Substitute: $\frac{1}{2}T_1 + \sqrt{3}\,T_1 \times \frac{\sqrt{3}}{2} = 2T_1 = 49$.
5. $T_1 = 24.5$ N and $T_2 = 24.5\sqrt{3} \approx 42.4$ N.
:::

The steeper string carries more of the weight, which is why it has the larger tension.

## Particles on smooth inclined planes

:::worked-solution[Example 2: a 3 kg particle rests on a smooth plane inclined at $25^\circ$ to the horizontal, held by a horizontal force $P$. Take $g = 9.8$ m s$^{-2}$. Find $P$ and the normal reaction $R$.]
1. Forces: weight $29.4$ N down, $R$ perpendicular to the plane, $P$ horizontal towards the plane.
2. Along the plane (up positive): $P\cos 25^\circ - 29.4\sin 25^\circ = 0$, so $P = 29.4\tan 25^\circ \approx 13.7$ N.
3. Perpendicular to the plane: $R - 29.4\cos 25^\circ - P\sin 25^\circ = 0$.
4. $R = 26.65 + 5.79 \approx 32.4$ N (exactly $\frac{29.4}{\cos 25^\circ}$).
:::

Notice that the horizontal force pushes the particle **into** the plane as well as up it, so $R$ is larger than $mg\cos\alpha$.

:::worked-solution[Example 3: a 2 kg particle is held at rest on a smooth plane by a string parallel to the plane with tension 9.8 N. Take $g = 9.8$ m s$^{-2}$. Show that the plane is inclined at $30^\circ$ and find the normal reaction.]
1. Along the plane: $9.8 - 2(9.8)\sin\alpha = 0$.
2. So $\sin\alpha = \dfrac{9.8}{19.6} = \dfrac{1}{2}$ and $\alpha = 30^\circ$, as required.
3. Perpendicular: $R = 19.6\cos 30^\circ \approx 17.0$ N.
:::

## Three forces: the triangle of forces

If three forces keep a particle in equilibrium, drawing them nose to tail gives a **closed triangle**. Each force is equal and opposite to the resultant of the other two. With a right angle, Pythagoras and trigonometry give the answer at once.

:::worked-solution[Example 4: forces of 7 N and 24 N at right angles act on a particle, together with a third force $F$ that keeps it in equilibrium. Find $F$ and its direction.]
1. The resultant of the first two is $\sqrt{7^2 + 24^2} = 25$ N, at $\tan^{-1}\frac{24}{7} \approx 73.7^\circ$ to the 7 N force.
2. $F$ must cancel it: $F = 25$ N, acting in exactly the opposite direction to that resultant.
:::

## Forces in vector form

When the forces are given as vectors, equilibrium means they add to the zero vector.

:::worked-solution[Example 5: forces $(2\mathbf{i} + 5\mathbf{j})$ N, $(-6\mathbf{i} + \mathbf{j})$ N and $(p\mathbf{i} + q\mathbf{j})$ N are in equilibrium. Find $p$ and $q$.]
1. $\mathbf{i}$: $2 - 6 + p = 0$, so $p = 4$.
2. $\mathbf{j}$: $5 + 1 + q = 0$, so $q = -6$.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Equilibrium of a particle is in ZIMSEC Paper 2 Mechanics only; it is not in Cambridge 0606.
:::

## Common mistakes

:::mistake{title="Taking R = mg on every surface"}
$R = mg$ only for a horizontal surface with no other vertical forces. On a slope $R$ involves $\cos\alpha$, and an applied force at an angle changes it again.
:::

:::mistake{title="Mixing sine and cosine for the weight on a slope"}
The component of the weight **down** the plane is $mg\sin\alpha$; **into** the plane it is $mg\cos\alpha$. Check with $\alpha = 0$: on a flat surface nothing pulls the particle along.
:::

:::mistake{title="Different tensions in one string"}
A light string over a smooth peg or through a smooth ring has the same tension on both sides.
:::

:::mistake{title="Forgetting the weight"}
List the weight first on every diagram; it is the force most often left out.
:::

## Exam tips

:::exam-tip
Write each resolving equation with a direction label, for example "Resolving vertically ($\uparrow$):". It makes your method clear and earns M marks even after an arithmetic slip.
:::

:::exam-tip
When a question says "show that $\alpha = 30^\circ$", end with the exact working that gives $\sin\alpha = \frac{1}{2}$; do not just substitute $30^\circ$ and check.
:::

:::exam-tip
Use the $g$ given in the question and give forces to 3 significant figures.
:::

## Summary

:::summary
- In equilibrium the resultant force is zero: resolve in two perpendicular directions and set each sum to zero.
- On a slope of angle $\alpha$, the weight has components $mg\sin\alpha$ down the plane and $mg\cos\alpha$ into it.
- A smooth surface gives only a normal reaction; a light string has one tension throughout.
- Three forces in equilibrium form a closed triangle of forces.
- With forces in $\mathbf{i}$, $\mathbf{j}$ form, the $\mathbf{i}$ and $\mathbf{j}$ components each add to zero.
:::
