---
{
  "key": "forces.moments-couples",
  "title": "Centre of gravity, moments, couples and torque",
  "summary": "Define centre of gravity, calculate the moment of a force using the perpendicular distance, and describe a couple and calculate the torque it produces.",
  "concepts": ["aphys.forces.moments-couples"],
  "estimatedMinutes": 35,
  "level": "core"
}
---
## Introduction

A mechanic in a Bulawayo garage leans on a long wheel brace to free a rusted nut on a haulage truck; a kombi driver turns the steering wheel with both hands; a gate swings on its hinges when pushed at the latch. Each is about the **turning effect** of forces. At O-Level you met moments as "force × distance". At A-Level you need precise definitions, forces at angles, the idea of a **couple**, and the **torque** it produces. Equilibrium problems (balancing beams, ladders and hinged rods) build on this in the next lesson.

You should already know that weight is a force $W = mg$ acting downwards, how to resolve a force into components, and the O-Level idea of a moment.

## Key definitions

:::definition{term="Centre of gravity"}
The single point at which the whole weight of an object may be taken to act.
:::

:::definition{term="Moment of a force"}
The product of the force and the perpendicular distance from the pivot (or point) to the line of action of the force.
:::

:::definition{term="Couple"}
A pair of forces that are equal in magnitude, opposite in direction and act along parallel but different lines of action, so that they produce rotation only.
:::

:::definition{term="Torque of a couple"}
The product of one of the forces and the perpendicular distance between the lines of action of the two forces.
:::

:::formula{name="Moment of a force"}
$$
\text{moment} = Fd_{\perp} = Fr\sin\theta
$$

$F$ is the force in N; $d_{\perp}$ the perpendicular distance from the point to the line of action in m; $r$ the distance from the point to where the force acts, and $\theta$ the angle between the force and that line. Unit: N m.
:::

:::formula{name="Torque of a couple"}
$$
\tau = Fd
$$

$F$ is the magnitude of either force in N and $d$ the perpendicular separation of the two lines of action in m. Unit: N m.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards need centre of gravity, moments, couples and torque. Cambridge examines them in Papers 1 and 2 (AS); ZIMSEC in Papers 1 and 2 at Form 5 level.
:::

## Centre of gravity

Every particle of an object has weight. The **resultant** of all these small weights acts through one point, the centre of gravity. For a uniform rod, sheet or block it is at the geometric centre. For a non-uniform object it is nearer the heavier end. For a flat irregular sheet (a lamina) you can find it by hanging the sheet freely from a pin through one hole: it comes to rest with its centre of gravity directly below the pin, so a plumb line from the pin passes through it. Repeat from a second hole; the centre of gravity is where the two lines cross.

An object is stable while the vertical line through its centre of gravity falls inside its base. A loaded truck with its load stacked high has a raised centre of gravity, so it topples at a smaller angle of tilt on a cambered road.

## The moment of a force

The turning effect depends on the force and on how far its **line of action** passes from the pivot. Only the perpendicular distance matters: a force whose line of action passes through the pivot has no moment, however large it is.

When a force acts at an angle to a lever, there are two equivalent ways to work:

- multiply the force by the perpendicular distance from the pivot to its line of action, $d_\perp = r\sin\theta$; or
- resolve the force into a component perpendicular to the lever ($F\sin\theta$, which turns it) and a component along the lever ($F\cos\theta$, which passes through the pivot and has no moment).

:::worked-solution[Moment of a force at an angle]
Rudo pulls on the end of a spanner $0.30\ \text{m}$ long with a force of $150\ \text{N}$ at $60^\circ$ to the spanner. Calculate the moment about the nut.

1. Perpendicular distance: $d_\perp = r\sin\theta = 0.30 \times \sin 60^\circ = 0.260\ \text{m}$.
2. Moment $= F d_\perp = 150 \times 0.260 = 39.0\ \text{N m}$.
3. Check by components: perpendicular component $= 150\sin 60^\circ = 129.9\ \text{N}$; moment $= 129.9 \times 0.30 = 39.0\ \text{N m}$.
4. Pulling at $90^\circ$ would give $150 \times 0.30 = 45\ \text{N m}$, the largest possible moment.
:::

The sense of rotation matters: state whether each moment is clockwise or anticlockwise about the chosen point, and add moments of the same sense.

## Couples and torque

Turning a steering wheel with both hands, twisting a tap, or turning a screwdriver applies two equal and opposite forces whose lines of action do not coincide. Because the forces are equal and opposite, their **resultant force is zero**, so the object does not accelerate along any line. But their moments add, so there is a resultant turning effect. A couple therefore produces **rotation only**.

The torque of a couple is the same about **every** point in the plane. Take forces $F$ up and $F$ down a distance $d$ apart, and a point a distance $x$ from the first line, outside the pair. The moments are $F(x + d)$ in one sense and $Fx$ in the other, leaving $Fd$. That is why we can quote "the torque of a couple" without naming a pivot.

:::worked-solution[Torque on a steering wheel]
A kombi driver pushes up on one side of the steering wheel and down on the other, each hand exerting $25\ \text{N}$ tangentially. The wheel's diameter is $0.38\ \text{m}$. Calculate the torque.

1. The two forces are equal, opposite and parallel: a couple.
2. The perpendicular separation of the lines of action is the diameter, $d = 0.38\ \text{m}$.
3. Torque $\tau = Fd = 25 \times 0.38 = 9.5\ \text{N m}$.
4. About a point $0.10\ \text{m}$ outside the rim on the line through the hands: $25 \times 0.48 - 25 \times 0.10 = 9.5\ \text{N m}$, the same, as expected.
:::

A single force applied to a wheel on a fixed axle also turns it, but then the axle must push back with an equal and opposite force, so the pair still forms a couple.

:::worked-solution[The force needed to tip a crate]
A uniform crate $1.2\ \text{m}$ tall and $0.80\ \text{m}$ wide weighs $900\ \text{N}$. A horizontal force $P$ is applied at the top edge. Find the smallest $P$ that will just start to tip the crate about its bottom far edge (assume it does not slide).

1. About the tipping edge, the weight acts at the centre, a perpendicular distance $0.40\ \text{m}$ away: moment $= 900 \times 0.40 = 360\ \text{N m}$ (resisting).
2. $P$ acts horizontally $1.2\ \text{m}$ above the edge: moment $= 1.2P$.
3. Tipping starts when $1.2P = 360$, so $P = 300\ \text{N}$.
:::

## Common mistakes

:::mistake{title="Using the distance to the point of application"}
The distance in a moment is the perpendicular distance to the **line of action**, not the length along the lever, unless the force is at right angles to the lever.
:::

:::mistake{title="Calling any two forces a couple"}
A couple needs equal, opposite forces with **different, parallel** lines of action. Two equal and opposite forces along the same line produce no turning: they are in equilibrium.
:::

:::mistake{title="Doubling the torque"}
The torque of a couple is **one** force × the separation of the lines. $2Fd$ is wrong when $d$ is the full separation; $2F \times (d/2)$ is correct only if you take moments about the midpoint.
:::

:::mistake{title="Centre of gravity always inside the object"}
For a ring or an L-shaped bracket the centre of gravity can lie in empty space.
:::

## Exam tips

:::exam-tip{title="Definitions"}
*Define the moment of a force*: name the force, the **perpendicular** distance, and the **line of action**. *Define the torque of a couple*: **one** of the forces × the **perpendicular** distance between the **lines of action**. Missing "perpendicular" loses the mark.
:::

:::exam-tip{title="Explain why a couple produces rotation only"}
Two points: the forces are equal and opposite, so the resultant force is zero (no translation); their moments are in the same sense, so the resultant torque is not zero (rotation).
:::

:::exam-tip{title="Calculations"}
State the point you take moments about, draw or describe the perpendicular distance, show $d = r\sin\theta$ when the force is at an angle, and give N m (not J, even though the units are equivalent in SI base units).
:::

## Summary

:::summary
- The centre of gravity is the point where the whole weight may be taken to act.
- Moment = force × perpendicular distance from the point to the line of action, $Fr\sin\theta$, in N m.
- A couple is two equal, opposite, parallel forces with different lines of action: zero resultant force, so rotation only.
- Torque of a couple = one force × perpendicular separation of the lines of action, the same about any point.
- Applications: spanners, steering wheels, taps; toppling occurs when the weight's line of action passes outside the base.
:::
