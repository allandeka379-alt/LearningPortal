---
{
  "key": "dynamics.newtons-laws",
  "title": "Mass, weight and Newton's laws of motion",
  "summary": "Use mass as the property that resists changes in motion and weight W = mg as a gravitational force, state and apply Newton's three laws, draw free-body diagrams, identify third-law pairs and solve problems with connected bodies, lifts and smooth slopes.",
  "concepts": ["aphys.dynamics.newtons-laws"],
  "estimatedMinutes": 45,
  "level": "core"
}
---
## Introduction

A mine hoist at Hwange lowers a cage full of workers into the shaft. Why does the cable tension change when the cage starts and stops but not while it moves steadily? Why does a fully loaded haulage truck need so much longer to speed up than an empty one? Newton's three laws answer every question of this kind. They connect the forces on an object to the way its motion changes.

This lesson states the laws precisely, shows how to draw free-body diagrams and use $F = ma$ in one direction at a time, and deals with the most common traps: confusing mass and weight, and mis-identifying third-law pairs. You need vectors and resolving, and the definitions of velocity and acceleration.

## Key definitions

:::definition{term="Mass"}
The property of an object that resists a change in its motion (its inertia); a scalar measured in kilograms, the same everywhere.
:::

:::definition{term="Weight"}
The gravitational force acting on an object's mass, $W = mg$, directed towards the centre of the Earth; a vector measured in newtons. It depends on the gravitational field strength $g$.
:::

:::definition{term="Newton's first law"}
An object remains at rest, or continues to move with constant velocity, unless a resultant force acts on it.
:::

:::definition{term="Newton's second law (constant mass)"}
The resultant force on an object is equal to its mass multiplied by its acceleration, and the acceleration is in the direction of the resultant force.
:::

:::definition{term="Newton's third law"}
If body A exerts a force on body B, then body B exerts a force on body A that is equal in magnitude and opposite in direction, and of the same type.
:::

:::definition{term="The newton"}
The resultant force that gives a mass of $1\ \text{kg}$ an acceleration of $1\ \text{m s}^{-2}$.
:::

:::formula{name="Newton's second law and weight"}
$$
F = ma \qquad W = mg
$$

$F$ = resultant force (N), $m$ = mass (kg), $a$ = acceleration ($\text{m s}^{-2}$), $g$ = gravitational field strength ($9.81\ \text{N kg}^{-1}$ at the Earth's surface).
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards require the three laws, mass and weight, free-body diagrams and $F = ma$. Cambridge states the second law more generally as force $=$ rate of change of momentum (see the momentum lesson), from which $F = ma$ follows when the mass is constant.
:::

## Free-body diagrams

A free-body diagram shows **one** object and every force acting **on** it, as arrows from the object, labelled with type and size. Forces the object exerts on other things do not appear.

Common forces: weight $W$ (down), normal contact force $R$ or $N$ (perpendicular to a surface), tension $T$ (along a string, pulling), friction and drag (opposing motion), upthrust, and driving or thrust forces.

Then, for each direction:

1. choose a positive direction (usually the direction of acceleration);
2. find the resultant force (forces in the positive direction minus forces in the negative direction);
3. apply $F_{\text{resultant}} = ma$.

## Lifts

![Free-body diagram of a 70 kg person in a lift accelerating upwards at 1.5 m s⁻²: the contact force R = 792 N upwards is larger than the weight 687 N downwards, and the resultant of 105 N upwards equals ma.](media:diagrams/lift-free-body-diagram.png "Figure: free-body diagram for the lift (arrow lengths drawn to scale)")

:::worked-solution[A person in an accelerating lift]
A $70\ \text{kg}$ person stands on bathroom scales in a lift. The scales read the normal contact force $R$. Take $g = 9.81\ \text{m s}^{-2}$.

1. Forces on the person: $R$ upwards, $W = 70 \times 9.81 = 687\ \text{N}$ downwards.
2. Accelerating **upwards** at $1.5\ \text{m s}^{-2}$ (upwards positive): $R - mg = ma$, so $R = m(g + a) = 70 \times 11.31 = 792\ \text{N}$.
3. Accelerating **downwards** at $1.5\ \text{m s}^{-2}$: $mg - R = ma$, so $R = m(g - a) = 70 \times 8.31 = 582\ \text{N}$.
4. At constant velocity (either direction): $a = 0$, so $R = mg = 687\ \text{N}$.
:::

The weight never changes; only the contact force does. That is why you feel heavier as a lift starts upwards and lighter as it starts downwards. In free fall ($a = g$) the contact force is zero: "weightlessness".

## Connected bodies

When objects are joined by a taut string or tow bar they share the same acceleration. Apply $F = ma$ to the whole system to find $a$, then to one object to find the internal force.

:::worked-solution[A car towing a trailer]
A $1200\ \text{kg}$ car tows a $400\ \text{kg}$ trailer with a resultant driving force of $2800\ \text{N}$ (resistive forces are included in this figure, and the trailer's resistance is negligible).

1. Whole system: $a = \dfrac{2800}{1200 + 400} = 1.75\ \text{m s}^{-2}$.
2. Trailer alone: the only horizontal force on it is the tension $T$ in the tow bar, so $T = 400 \times 1.75 = 700\ \text{N}$.
3. Check on the car: $2800 - 700 = 2100\ \text{N} = 1200 \times 1.75$. ✓
:::

The same method solves a block on a smooth table pulled by a hanging mass over a pulley: for a $2.0\ \text{kg}$ block and a $0.50\ \text{kg}$ hanging mass, the only unbalanced external force on the system is the hanging weight, so $a = \dfrac{0.50 \times 9.81}{2.5} = 1.96\ \text{m s}^{-2}$ and the string tension is $2.0 \times 1.96 = 3.92\ \text{N}$ (less than the hanging weight, $4.91\ \text{N}$, because the hanging mass accelerates downwards).

## Smooth inclined planes

On a frictionless slope at angle $\theta$, the forces are the weight and the normal contact force. Perpendicular to the slope they balance ($R = mg\cos\theta$); along the slope the resultant is $mg\sin\theta$, so

![Free-body diagram of a trolley on a smooth 25° ramp: weight mg straight down and the normal force R = mg cos 25° perpendicular to the slope; the unbalanced component mg sin 25° along the slope gives a = g sin 25° = 4.15 m s⁻².](media:diagrams/smooth-ramp-free-body-diagram.png "Figure: forces on a trolley on a smooth 25° incline")

$$
a = g\sin\theta
$$

independent of the mass. A trolley on a smooth $25^\circ$ ramp accelerates at $9.81\sin 25^\circ = 4.15\ \text{m s}^{-2}$.

## Newton's third-law pairs

The two forces of a third-law pair always:

- act on **different** bodies;
- are of the **same type** (both gravitational, both contact, both electromagnetic);
- are equal in size and opposite in direction, at every instant.

A book resting on a table has two forces on it: its weight (Earth pulls book) and the normal contact force (table pushes book). These are equal and opposite, but they are **not** a third-law pair: they act on the same body and are of different types. The partner of the book's weight is the book pulling the Earth upwards; the partner of the table's push on the book is the book pushing down on the table.

## Common mistakes

:::mistake{title="Mass and weight confused"}
Mass is in kilograms and does not change on the Moon; weight is a force in newtons that depends on $g$. "The bag weighs 5 kg" is everyday speech, not physics.
:::

:::mistake{title="Weight and normal force called a third-law pair"}
They act on the same object and are different types of force. They are equal only when the vertical acceleration is zero.
:::

:::mistake{title="Using one force instead of the resultant"}
$F$ in $F = ma$ is the **resultant** force. For a lift accelerating upwards, $T - mg = ma$, not $T = ma$.
:::

:::mistake{title="A moving object needs a force to keep moving"}
By the first law, constant velocity needs zero resultant force. A car at steady speed has a driving force exactly balanced by resistive forces.
:::

## Exam tips

:::exam-tip{title="State the laws precisely"}
For the third law, mention different bodies, equal magnitude, opposite direction and same type. For the second law, "resultant force is proportional to the rate of change of momentum" (Cambridge) or "$F = ma$ with the acceleration in the direction of the resultant force".
:::

:::exam-tip{title="Where it is tested"}
Cambridge Paper 1 tests third-law pairs, mass and weight, and lift and connected-body calculations; Paper 2 sets longer problems with free-body diagrams described in words. ZIMSEC Papers 1 and 2 test the same.
:::

:::exam-tip{title="Describe free-body diagrams in words"}
When asked to show the forces on an object, list each force with its type, direction and the body that exerts it: "weight, $W$, vertically downwards, exerted by the Earth".
:::

## Summary

:::summary
- Mass (kg) resists changes in motion; weight $W = mg$ (N) is the gravitational force on that mass.
- First law: no resultant force means constant velocity (or rest). Second law: $F_{\text{resultant}} = ma$, in the direction of $F$.
- Third law: forces come in equal, opposite pairs of the same type acting on different bodies.
- Lifts: $R = m(g + a)$ accelerating up, $R = m(g - a)$ accelerating down.
- Connected bodies share one acceleration: use the whole system for $a$, then one body for internal forces.
:::
