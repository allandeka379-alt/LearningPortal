---
{
  "key": "forces.equilibrium",
  "title": "Equilibrium of forces and the principle of moments",
  "summary": "Apply the two conditions for equilibrium, the principle of moments and closed vector triangles to beams, hinged rods, ladders and objects held by strings.",
  "concepts": ["aphys.forces.equilibrium"],
  "estimatedMinutes": 40,
  "level": "core"
}
---
## Introduction

A footbridge over a stream near Chimanimani, a shop sign hanging from a bracket in Mutare, a ladder leaning against a house while someone paints the gutters: all of these must stay still. Engineers design them so that the forces on every part balance and the turning effects balance. This lesson turns that idea into a method you can apply to any rigid object at rest.

You need the previous lesson (moments, couples and centre of gravity), resolving forces into perpendicular components, and the idea that forces are vectors.

## Key definitions

:::definition{term="Equilibrium"}
A body is in equilibrium when there is no resultant force and no resultant torque (moment) acting on it, so it has no linear or angular acceleration.
:::

:::definition{term="Principle of moments"}
For a body in equilibrium, the sum of the clockwise moments about any point equals the sum of the anticlockwise moments about the same point.
:::

:::keyfact{title="The two conditions for equilibrium"}
1. The resultant force in **every** direction is zero (forces up = forces down; forces left = forces right).
2. The resultant moment about **any** point is zero (the principle of moments).
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards require the conditions for equilibrium, the principle of moments and the vector triangle for three coplanar forces (Cambridge AS; ZIMSEC Form 5).
:::

## A method that always works

1. Identify every force on the object: weights at centres of gravity, normal reactions, tensions, friction, and hinge forces.
2. Choose a point to take moments about. Choosing a point through which an **unknown** force acts removes that force from the moment equation.
3. Write the principle of moments, using perpendicular distances.
4. Resolve forces vertically and horizontally to find the remaining unknowns.

:::worked-solution[A plank bridge with a person on it]
A uniform plank $4.0\ \text{m}$ long and of weight $300\ \text{N}$ rests on supports at its ends A and B. Tatenda, of weight $700\ \text{N}$, stands $1.0\ \text{m}$ from A. Find the support forces.

1. Take moments about A (removes $R_A$). Clockwise: $300 \times 2.0 + 700 \times 1.0 = 1300\ \text{N m}$. Anticlockwise: $R_B \times 4.0$.
2. $4.0R_B = 1300$, so $R_B = 325\ \text{N}$.
3. Resolve vertically: $R_A + R_B = 300 + 700$, so $R_A = 675\ \text{N}$.
4. Check with moments about B: $675 \times 4.0 = 2700$ and $300 \times 2.0 + 700 \times 3.0 = 2700\ \text{N m}$. Correct.
:::

The support nearer the load carries more of it, which is why a truck crossing a bridge loads the nearer pier more.

## Hinged rods and the hinge force

A rod hinged to a wall can be pushed or pulled by the hinge in **any** direction. Treat the hinge force as two unknown components, horizontal $H$ and vertical $V$. Taking moments about the hinge removes both.

:::worked-solution[A shop sign on a hinged rod]
A uniform rod $1.2\ \text{m}$ long and of weight $40\ \text{N}$ is hinged to a wall and held horizontal by a cable from its far end to the wall, at $30^\circ$ to the rod. A sign of weight $60\ \text{N}$ hangs from the far end. Find the tension and the hinge force.

1. Moments about the hinge: the tension's perpendicular distance from the hinge is $1.2\sin 30^\circ = 0.60\ \text{m}$.
2. $T \times 0.60 = 40 \times 0.60 + 60 \times 1.2 = 96\ \text{N m}$, so $T = 160\ \text{N}$.
3. Horizontally: $H = T\cos 30^\circ = 139\ \text{N}$ (the wall pushes the rod outwards).
4. Vertically: $V + T\sin 30^\circ = 40 + 60$, so $V = 100 - 80 = 20\ \text{N}$ upwards.
5. Hinge force $= \sqrt{139^2 + 20^2} = 140\ \text{N}$ at $\tan^{-1}(20/139) = 8.2^\circ$ above the horizontal.
:::

## Three forces: the closed vector triangle

When only **three** non-parallel forces act on a body in equilibrium:

- their lines of action pass through a single point (otherwise one force would have a moment about the intersection of the other two); and
- drawn tip to tail, in order, the three force vectors form a **closed triangle**, because their resultant is zero.

You can solve the triangle by scale drawing, by resolving, or with trigonometry (the sine rule, or right-angle trigonometry if two forces are perpendicular).

:::worked-solution[A lamp hanging from two cables]
A lamp of weight $50\ \text{N}$ hangs from two cables at $30^\circ$ and $60^\circ$ to the horizontal. Find the tensions.

1. The cables are at $90^\circ$ to each other, so the vector triangle is right-angled with the weight as its hypotenuse.
2. The tension in the cable at $30^\circ$: $T_1 = 50\sin 30^\circ = 25\ \text{N}$.
3. The tension in the cable at $60^\circ$: $T_2 = 50\cos 30^\circ = 43.3\ \text{N}$.
4. Check by resolving vertically: $25\sin 30^\circ + 43.3\sin 60^\circ = 12.5 + 37.5 = 50\ \text{N}$. Horizontally: $25\cos 30^\circ = 43.3\cos 60^\circ = 21.7\ \text{N}$. Both balance.
:::

The steeper cable carries more of the weight. Cables that are nearly horizontal need very large tensions, which is why power lines between pylons are never pulled perfectly straight.

## Ladders

A ladder leaning on a wall has four forces: its weight at the centre, the normal reaction of the wall (horizontal, if the wall is smooth), and at the ground a normal reaction and friction.

:::worked-solution[A ladder against a smooth wall]
A uniform ladder $5.0\ \text{m}$ long, weight $200\ \text{N}$, rests at $60^\circ$ to rough horizontal ground against a smooth vertical wall. Find the force of the wall and the friction at the ground.

1. Moments about the foot (removes both ground forces). The weight's perpendicular distance is $2.5\cos 60^\circ = 1.25\ \text{m}$; the wall force's is $5.0\sin 60^\circ = 4.33\ \text{m}$.
2. $N_w \times 4.33 = 200 \times 1.25$, so $N_w = 57.7\ \text{N}$.
3. Horizontally: friction $F = N_w = 57.7\ \text{N}$, towards the wall.
4. Vertically: ground reaction $= 200\ \text{N}$.
:::

A painter climbing the ladder moves weight further from the foot, increasing the friction needed: ladders slip when someone is near the top.

## Common mistakes

:::mistake{title="Forgetting the object's own weight"}
A beam or rod has weight acting at its centre of gravity; include it unless the question says it is light.
:::

:::mistake{title="One condition only"}
Balanced forces alone are not equilibrium: a couple has zero resultant force but still turns the object. Both conditions are needed.
:::

:::mistake{title="Assuming the hinge force is along the rod"}
The hinge force is along the rod only for a light rod with forces at its ends. In general, find both components.
:::

:::mistake{title="Wrong distance for an angled force"}
Use the perpendicular distance from the point to the line of action, as in $1.2\sin 30^\circ$ above, not the length of the rod.
:::

## Exam tips

:::exam-tip{title="State the principle when you use it"}
In a *calculate* question, write "taking moments about A:" and then the equation. Marks are given for a correct moment equation even if the arithmetic fails.
:::

:::exam-tip{title="Explain and state"}
*State the conditions for equilibrium*: resultant force zero **and** resultant torque zero. *Explain why the forces form a closed triangle*: the resultant force is zero, so the vectors added tip to tail return to the start.
:::

:::exam-tip{title="Which paper?"}
These problems appear in Cambridge Papers 1 and 2 and in ZIMSEC Papers 1 and 2; balancing-rule experiments appear in practical papers, where you may be asked to find an unknown mass and its uncertainty.
:::

## Summary

:::summary
- Equilibrium needs zero resultant force and zero resultant torque.
- Principle of moments: total clockwise moment = total anticlockwise moment about any point.
- Take moments about the point where an unknown force acts to eliminate it.
- Three coplanar forces in equilibrium meet at a point and form a closed vector triangle.
- Hinge forces have two components; ladders need wall reaction, ground reaction and friction.
:::
