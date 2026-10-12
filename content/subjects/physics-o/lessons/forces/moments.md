---
{
  "key": "forces.moments",
  "title": "Moments and the principle of moments",
  "summary": "Calculate the moment of a force, apply the principle of moments to balanced beams and levers, and describe the experiment that verifies it.",
  "concepts": ["phys.forces.moments"],
  "objectives": ["cambridge/igcse/physics:1.5.2.1", "cambridge/igcse/physics:1.5.2.2", "cambridge/igcse/physics:1.5.2.3", "cambridge/igcse/physics:1.5.2.4", "cambridge/igcse/physics:1.5.2.5", "zimsec/o-level/physics:3.4.2", "zimsec/o-level/physics:3.4.4"],
  "estimatedMinutes": 30
}
---
## Introduction

Why is a door handle fixed far from the hinges? Why does a long spanner loosen a stubborn wheel nut on a truck more easily than a short one? Why can a small child balance a heavier adult on a see-saw? All of these depend on the **turning effect** of a force, called its **moment**.

## Key definitions

:::definition{term="Moment of a force"}
The turning effect of a force about a pivot: moment = force × perpendicular distance from the pivot to the line of the force.
:::

:::formula{name="Moment"}
$$
\text{moment} = F \times d
$$

Unit: newton metre (N m). $d$ is the **perpendicular** distance from the pivot to the line of action of the force.
:::

:::definition{term="Principle of moments"}
For an object in equilibrium, the sum of the clockwise moments about any point equals the sum of the anticlockwise moments about that point.
:::

:::definition{term="Equilibrium"}
An object is in equilibrium when there is no resultant force and no resultant moment on it.
:::

## Bigger turning effects

The moment increases if the force increases **or** if it acts further from the pivot. A long spanner, a door handle far from the hinges and a long crowbar all use a large distance to get a large moment from a small force.

:::worked-solution[Loosening a wheel nut]
1. A mechanic pushes at right angles on a spanner with a force of $120\ \text{N}$, $0.35\ \text{m}$ from the nut.
2. Moment $= 120 \times 0.35 = 42\ \text{N m}$.
3. With a spanner twice as long, the same force gives twice the moment, $84\ \text{N m}$.
:::

## Balancing: the principle of moments

When a beam balances, the turning effects cancel: total clockwise moment = total anticlockwise moment.

:::worked-solution[A see-saw]
A child of weight $300\ \text{N}$ sits $2.0\ \text{m}$ from the pivot of a see-saw. Where must her father, of weight $750\ \text{N}$, sit to balance her?

1. Anticlockwise moment (child) $= 300 \times 2.0 = 600\ \text{N m}$.
2. Clockwise moment (father) $= 750 \times d$.
3. Balanced: $750d = 600$, so $d = 0.80\ \text{m}$ from the pivot on the other side.
:::

![See-saw balanced about a pivot: the child's 300 N weight acts 2.0 m to the left and her father's 750 N weight acts 0.80 m to the right. The anticlockwise moment, 300 times 2.0, is 600 N m and equals the clockwise moment, 750 times 0.80, also 600 N m.](media:diagrams/moments-seesaw-balance.png "Figure: a see-saw balances when clockwise and anticlockwise moments are equal")

:::worked-solution[More than one force on a side]
A uniform beam is pivoted at its centre. On the left, $4.0\ \text{N}$ hangs $30\ \text{cm}$ from the pivot. On the right, $2.0\ \text{N}$ hangs $20\ \text{cm}$ from the pivot and a third weight $W$ hangs $40\ \text{cm}$ from the pivot.

1. Anticlockwise moment $= 4.0 \times 30 = 120\ \text{N cm}$.
2. Clockwise moments $= 2.0 \times 20 + W \times 40 = 40 + 40W$.
3. Balanced: $40 + 40W = 120$, so $W = 2.0\ \text{N}$.
:::

Because the beam is uniform and pivoted at its centre, its own weight acts at the pivot and has no moment. If the pivot is not at the centre, the beam's weight acting at its centre of gravity must be included as one of the moments.

![Uniform beam pivoted at its centre: 4.0 N hangs 30 cm to the left; 2.0 N hangs 20 cm and an unknown weight W hangs 40 cm to the right. Anticlockwise moment is 120 N cm, so 40 plus 40W equals 120 and W is 2.0 N.](media:diagrams/moments-beam-three-weights.png "Figure: balancing a beam with more than one weight on a side")

## Verifying the principle of moments

1. Balance a metre rule on a pivot (knife edge) at its centre.
2. Hang different known weights at different distances on both sides until the rule balances again.
3. Record each force and its distance from the pivot.
4. Calculate the total clockwise and total anticlockwise moments; they should be equal for every balanced arrangement. Repeat with several arrangements.

When the rule balances there is no resultant moment, and the pivot pushes up with a force equal to the total downward weight, so there is no resultant force: the rule is in equilibrium.

## Common mistakes

:::mistake{title="Using the wrong distance"}
The distance must be measured from the **pivot** to the line of the force, at right angles to it, not from the end of the beam.
:::

:::mistake{title="Mixing units"}
If distances are in cm, moments are in N cm. Keep units consistent on both sides of the equation.
:::

:::mistake{title="Forgetting the beam's own weight"}
For a beam pivoted away from its centre, its weight (acting at its centre) produces a moment too.
:::

## Exam tips

:::exam-tip
Write "sum of clockwise moments = sum of anticlockwise moments", then substitute each force × distance. The statement of the principle often earns its own mark.
:::

:::exam-tip
"State the conditions for equilibrium": no resultant force **and** no resultant moment. Both are needed for the mark.
:::

## Summary

:::summary
- Moment = force × perpendicular distance from the pivot (N m).
- A larger force or a larger distance gives a larger turning effect.
- Principle of moments: in equilibrium, total clockwise moments = total anticlockwise moments.
- Equilibrium means no resultant force and no resultant moment.
- The principle is verified by balancing a metre rule with known weights.
:::
