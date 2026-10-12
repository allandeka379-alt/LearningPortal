---
{
  "key": "forces.moments-rigid-body",
  "title": "Moments and rigid bodies in equilibrium",
  "summary": "Find the moment of a force about a point, add moments, and solve equilibrium problems for rigid bodies: beams on supports, hinged rods held by strings, ladders against walls and bodies on the point of tilting.",
  "concepts": ["amaths.forces.moments-rigid-body"],
  "estimatedMinutes": 50,
  "level": "core"
}
---
## Introduction

A particle can only slide; a real object can also **turn**. A plank across a stream in the Eastern Highlands, a boom on a Beitbridge border barrier, a ladder leaning against a tobacco barn: each stays still only if the forces on it cancel **and** their turning effects cancel. The turning effect of a force is its **moment**.

ZIMSEC Mechanics examines moments in Form 5 (topic 6.1.3, the moment of a force) and uses them for the equilibrium of rigid bodies under coplanar forces. Cambridge 9709 treats every body as a particle, so this lesson is for ZIMSEC candidates only. You need to resolve forces and use friction ($F \le \mu R$) confidently.

## Key definitions

:::definition{term="Moment of a force"}
The moment of a force $F$ about a point $O$ is $F \times d$, where $d$ is the **perpendicular** distance from $O$ to the line of action of the force. It is measured in newton metres (N m) and has a sense: clockwise or anticlockwise.
:::

:::definition{term="Rigid body"}
A body whose size matters but whose shape does not change under the forces acting on it. The weight of a **uniform** rod, beam or ladder acts at its midpoint.
:::

:::formula{name="Moment from components"}
If a force $\mathbf{F} = X\mathbf{i} + Y\mathbf{j}$ acts at the point $(x, y)$, its anticlockwise moment about the origin is
$$
M = xY - yX.
$$
:::

:::keyfact{title="Conditions for equilibrium of a rigid body"}
Under coplanar forces a rigid body is in equilibrium when **(1)** the resultant force is zero (components balance in two perpendicular directions) and **(2)** the sum of the moments about **any one point** is zero.
:::

There is no formula list in the ZIMSEC syllabus, so learn these conditions by heart.

## Finding moments

Three ways give the same answer:

1. **Perpendicular distance.** Drop a perpendicular from the point to the line of action. A force of 40 N whose line of action passes 0.3 m from $O$ has moment $40 \times 0.3 = 12$ N m.
2. **Resolve the force.** Split the force into a component along the line from $O$ (moment zero, because it passes through $O$) and a component perpendicular to it. A 40 N force at the end of a 2 m spanner, at $30°$ to the spanner, has moment $40 \sin 30° \times 2 = 40$ N m.
3. **Components and coordinates.** Use $M = xY - yX$. A force $3\mathbf{i} + 4\mathbf{j}$ N at $(2, 1)$ m has moment $2(4) - 1(3) = 5$ N m anticlockwise about the origin.

A force whose line of action passes through the point has **no** moment about it. This is why we choose the point cleverly: take moments about the point where an unknown force acts, and that unknown disappears from the equation.

## Beams on supports

A beam resting on supports receives an upward **reaction** from each support. When a beam is on the point of turning about one support, the reaction at the other support becomes **zero**.

:::worked-solution[Example 1: A uniform beam $AB$ of length 6 m and mass 40 kg rests horizontally on supports at $C$ and $D$, where $AC = 1$ m and $AD = 4.5$ m. A load of mass 25 kg hangs from $B$. Take $g = 9.8$ m s$^{-2}$. Find the reactions at $C$ and $D$, and the largest load at $B$ for which the beam does not tilt.]
1. Weights: beam $40 \times 9.8 = 392$ N at the midpoint (3 m from $A$); load $25 \times 9.8 = 245$ N at $B$ (6 m from $A$).
2. Moments about $C$ (removes $R_C$): $R_D \times 3.5 = 392 \times 2 + 245 \times 5 = 784 + 1225 = 2009$.
3. So $R_D = 574$ N.
4. Resolve vertically: $R_C + R_D = 392 + 245$, so $R_C = 637 - 574 = 63$ N.
5. On the point of tilting about $D$, $R_C = 0$. Moments about $D$: $392 \times 1.5 = Mg \times 1.5$, so $M = 40$ kg.
6. The beam stays horizontal for a load of at most 40 kg at $B$.
:::

![Uniform beam AB of length 6 m resting on supports at C (1 m from A) and D (4.5 m from A) with its weight 392 N at the midpoint and a 245 N load at B: taking moments about C gives the reaction at D as 574 N, and resolving vertically gives the reaction at C as 63 N.](media:diagrams/beam-two-supports-and-load.png "Figure: forces on the beam: R_C = 63 N, R_D = 574 N, weight 392 N and load 245 N")

Check every answer by taking moments about a second point: about $A$, $R_C(1) + R_D(4.5) = 63 + 2583 = 2646$ and $392(3) + 245(6) = 1176 + 1470 = 2646$. The checks agree.

## Hinged rods and the hinge reaction

A rod hinged to a wall can turn freely about the hinge. The hinge exerts a force of unknown magnitude and direction, so give it two components, $X$ (horizontal) and $Y$ (vertical). Taking moments about the hinge removes both.

:::worked-solution[Example 2: A uniform rod $AB$, of length 2 m and weight 50 N, is freely hinged at $A$ to a vertical wall. It is held horizontal by a light string attached at $B$ and to a point of the wall above $A$; the string makes $30°$ with the rod. Show that the tension is 50 N, and find the magnitude and direction of the force at the hinge.]
1. Moments about $A$: the tension's perpendicular component at $B$ is $T \sin 30°$, at distance 2 m; the weight acts 1 m from $A$.
2. $T \sin 30° \times 2 = 50 \times 1$, so $T = \dfrac{50}{2 \times 0.5} = 50$ N, as required.
3. Horizontal: $X = T \cos 30° = 50 \times 0.8660 = 43.3$ N (away from the wall).
4. Vertical: $Y + T \sin 30° = 50$, so $Y = 50 - 25 = 25$ N (upwards).
5. Magnitude: $\sqrt{43.30^2 + 25^2} = 50.0$ N.
6. Direction: $\tan^{-1}\left(\dfrac{25}{43.30}\right) = 30.0°$ above the horizontal.
:::

## Ladders

A ladder problem has four forces: the weight, the normal reaction and friction at the ground, and the reaction at the wall (perpendicular to a **smooth** wall). Limiting equilibrium means friction has its largest value, $F = \mu R$.

:::worked-solution[Example 3: A uniform ladder of length 5 m and weight 200 N rests with its foot on rough horizontal ground and its top against a smooth vertical wall, at $60°$ to the ground. A painter of weight 700 N stands 4 m up the ladder. Find the least coefficient of friction for which the ladder does not slip.]
1. Let $R$ be the normal reaction and $F$ the friction at the foot, and $S$ the reaction of the wall.
2. Vertically: $R = 200 + 700 = 900$ N. Horizontally: $F = S$.
3. Moments about the foot (removes $R$ and $F$): $S \times 5\sin 60° = 200 \times 2.5\cos 60° + 700 \times 4\cos 60°$.
4. $4.3301\,S = 250 + 1400 = 1650$, so $S = 381.05$ N and $F = 381.05$ N.
5. No slipping needs $F \le \mu R$: $\mu \ge \dfrac{381.05}{900} = 0.423$.
6. The least coefficient of friction is 0.423 (3 s.f.).
:::

![Forces on a 5 m ladder of weight 200 N at 60 degrees against a smooth wall with a 700 N painter 4 m up it: at the foot the normal reaction R = 900 N upwards and friction F = 381 N towards the wall, and at the top the wall reaction S = 381 N horizontally away from the wall.](media:diagrams/ladder-smooth-wall-rough-ground.png "Figure: R = 900 N and F = S = 381 N; moments about the foot give S")

As the painter climbs, the moment of his weight about the foot grows, so the friction needed grows too: ladders usually slip when the person is near the top.

## Bodies about to tilt

A body standing on a surface is on the point of tilting about an edge when the reaction is concentrated at that edge. The condition is the moment equation about that edge. For a block pushed sideways, compare the push needed to tilt with the push needed to slide: whichever is smaller happens first. The topic of centre of mass develops this for inclined planes.

## Common mistakes

:::mistake{title="Using the distance along the rod instead of the perpendicular distance"}
For a force at an angle, multiply by the perpendicular distance, or use the perpendicular component of the force. $40 \times 2$ for a force at $30°$ to a 2 m spanner is wrong; it should be $40 \sin 30° \times 2$.
:::

:::mistake{title="Forgetting the hinge reaction has two components"}
The force at a hinge is not along the rod in general. Give it components $X$ and $Y$, or take moments about the hinge first.
:::

:::mistake{title="Assuming friction is at its limit"}
$F = \mu R$ only in limiting equilibrium. Otherwise use $F \le \mu R$, and find $F$ from the other equations.
:::

:::mistake{title="Mixing senses"}
Choose one sense (say anticlockwise) as positive and keep it throughout; a clockwise moment then counts as negative.
:::

## Exam tips

:::exam-tip
Draw a large diagram with every force, including weights at midpoints and both components of a hinge reaction. Then **take moments about the point where most unknowns act**.
:::

:::exam-tip
"Show that $T = 50$ N" means every step must be visible and the final line must state the given value. "Find the magnitude and direction" needs both, with the angle described ("above the horizontal").
:::

:::exam-tip
State $g$ as the question gives it (9.8 or 10) and give non-exact answers to 3 significant figures, angles to 1 decimal place.
:::

## Summary

:::summary
- Moment = force × perpendicular distance (N m), with a sense; from components, $M = xY - yX$.
- A rigid body is in equilibrium when the resultant force is zero and the total moment about any point is zero.
- Take moments about the point where unknown forces act, then resolve in two directions.
- On the point of turning about a support, the reaction at the other support is zero.
- Ladders: smooth wall gives a horizontal reaction; limiting friction $F = \mu R$ at the ground.
:::
