---
{
  "key": "energy.work-conservation-efficiency",
  "title": "Work done, conservation of energy and efficiency",
  "summary": "Calculate work done by a force, including at an angle and from a force-displacement graph, apply the principle of conservation of energy, and calculate efficiency, including problems with work done against friction.",
  "concepts": ["aphys.energy.work-conservation-efficiency"],
  "estimatedMinutes": 35,
  "level": "core"
}
---
## Introduction

When a maize mill grinds grain, a farmer pulls a loaded scotch cart, or a lift raises miners up a shaft at Hwange, energy is transferred by forces doing work. Engineers care about two questions: how much work is needed, and how much of the energy supplied ends up doing the useful job. This lesson gives precise A-Level answers to both.

You should know from O-Level that energy is measured in joules and is never created or destroyed, and how to resolve a force into components. The formulae for gravitational potential and kinetic energy are developed in the next lesson; here they are used where needed.

## Key definitions

:::definition{term="Work done"}
The product of a force and the displacement of its point of application in the direction of the force.
:::

:::definition{term="The joule"}
The work done when a force of one newton moves its point of application through one metre in the direction of the force.
:::

:::definition{term="Principle of conservation of energy"}
Energy cannot be created or destroyed; it can only be transferred from one store to another, so the total energy of a closed system remains constant.
:::

:::definition{term="Efficiency"}
The ratio of the useful energy output (or useful work done) to the total energy input.
:::

:::formula{name="Work done by a constant force"}
$$
W = Fs\cos\theta
$$

$F$ is the force in N, $s$ the displacement in m, and $\theta$ the angle between the force and the displacement. Unit: joule, $1\ \text{J} = 1\ \text{N m} = 1\ \text{kg m}^2\,\text{s}^{-2}$.
:::

:::formula{name="Efficiency"}
$$
\text{efficiency} = \frac{\text{useful energy output}}{\text{total energy input}} \times 100\%
$$

It can also be written as useful power output ÷ total power input. Efficiency has no unit and is always less than 1 (100%) for a real machine.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards require work as force × displacement in the direction of the force, conservation of energy and efficiency (Cambridge AS 5.1; ZIMSEC Form 5).
:::

## Work done by a force at an angle

Only the component of the force **along** the displacement does work. The perpendicular component does no work, because there is no displacement in its direction.

![A rope pulls a scotch cart 25 m at 35° above the horizontal with a tension of 120 N: only the horizontal component 98.3 N does work, W = 120 × 25 × cos 35° = 2457 J, and the vertical component 68.8 N does none.](media:diagrams/force-at-angle-work.png "Figure: only the component of the force along the displacement does work")

:::worked-solution[Pulling a loaded cart]
Farai pulls a scotch cart $25\ \text{m}$ along a level road with a rope at $35^\circ$ above the horizontal. The tension in the rope is $120\ \text{N}$.

1. Component of the force along the road: $F\cos\theta = 120\cos 35^\circ = 98.3\ \text{N}$.
2. Work done: $W = Fs\cos\theta = 120 \times 25 \times \cos 35^\circ = 2.46 \times 10^{3}\ \text{J}$.
3. The vertical component ($120\sin 35^\circ$) does no work: the cart does not move vertically.
:::

Three special cases follow from $\cos\theta$:

| Angle between force and displacement | Work done |
| --- | --- |
| $0^\circ$ (same direction) | $Fs$, positive: energy transferred **to** the object |
| $90^\circ$ (perpendicular) | zero: e.g. the normal reaction on a car on a level road, the tension in a string keeping a stone in a circle |
| $180^\circ$ (opposite) | $-Fs$: energy transferred **from** the object, e.g. friction and air resistance |

## Work from a force-displacement graph

When the force varies, the work done is the **area under the force-displacement graph**. For a force that rises steadily from 0 to $60\ \text{N}$ over the first $0.30\ \text{m}$ and then stays at $60\ \text{N}$ for a further $0.20\ \text{m}$, the work done is the triangle plus the rectangle: $\tfrac{1}{2} \times 60 \times 0.30 + 60 \times 0.20 = 9 + 12 = 21\ \text{J}$. The same idea gives the energy stored in a stretched spring or wire.

![Force-displacement graph: the force rises steadily from 0 to 60 N over 0.30 m then stays at 60 N for a further 0.20 m; the work done is the area under the graph, a 9.0 J triangle plus a 12 J rectangle, 21 J in total.](media:diagrams/force-displacement-area-work.png "Figure: work done is the area under a force-displacement graph")

## Conservation of energy

Energy is transferred between stores (kinetic, gravitational potential, elastic, thermal, chemical, nuclear) by forces doing work, by heating, by electrical work and by radiation. In every transfer the total is constant. In a real machine some energy is always transferred to the thermal store of the surroundings, usually by friction or electrical resistance; this energy is not destroyed, but it is spread out and no longer useful.

A Sankey-style description in words lists the input and each output: for a motor lifting a load, "electrical energy in = gain in gravitational potential energy of the load + thermal energy in the windings and bearings + sound".

:::worked-solution[Efficiency of a hoist motor]
An electric motor is supplied with $2400\ \text{J}$ of electrical energy while it lifts a $50\ \text{kg}$ bag of cement through $3.2\ \text{m}$ at constant speed.

1. Useful output = gain in gravitational potential energy $= mgh = 50 \times 9.81 \times 3.2 = 1569.6\ \text{J}$.
2. Efficiency $= \dfrac{1569.6}{2400} \times 100\% = 65.4\%$.
3. Energy wasted $= 2400 - 1569.6 = 830\ \text{J}$, transferred mainly to thermal energy in the motor and to sound.
:::

## Work done against friction

When an object is pushed up a slope, the work done by the push equals the gain in potential energy **plus** the gain in kinetic energy **plus** the work done against friction. At constant speed the kinetic energy does not change.

:::worked-solution[Pushing a crate up a ramp]
Sipho pushes a $40\ \text{kg}$ crate at constant speed up a ramp $5.0\ \text{m}$ long, rising $1.2\ \text{m}$, with a force of $180\ \text{N}$ parallel to the ramp.

1. Work done by Sipho $= Fs = 180 \times 5.0 = 900\ \text{J}$.
2. Gain in potential energy $= mgh = 40 \times 9.81 \times 1.2 = 470.9\ \text{J}$.
3. Work done against friction $= 900 - 470.9 = 429.1\ \text{J}$.
4. Friction force $= \dfrac{429.1}{5.0} = 85.8\ \text{N}$.
5. Efficiency of the ramp $= \dfrac{470.9}{900} \times 100\% = 52.3\%$.
:::

The ramp reduces the force needed (180 N rather than the crate's weight of 392 N) but increases the distance, and friction makes the total work done greater than the gain in potential energy.

## Common mistakes

:::mistake{title="Using sin instead of cos"}
$W = Fs\cos\theta$, where $\theta$ is the angle between the **force and the displacement**. If you are given the angle to the vertical, convert it first.
:::

:::mistake{title="Distance instead of displacement in the direction of the force"}
A waiter carrying a tray horizontally at constant height does no work on the tray against gravity: the force (upward) is perpendicular to the displacement.
:::

:::mistake{title="Efficiency greater than 100%"}
If your answer exceeds 100%, you have divided the wrong way round or used the wrong energies.
:::

:::mistake{title="Energy is lost"}
Say energy is *transferred to thermal energy of the surroundings* or *dissipated*, not "lost" or "used up".
:::

## Exam tips

:::exam-tip{title="Define work done"}
Include "displacement" and "in the direction of the force". "Force × distance" alone is not accepted at A-Level.
:::

:::exam-tip{title="Energy-conservation problems"}
Write an energy equation in words first, for example "work done by engine = gain in KE + gain in GPE + work done against resistive forces", then substitute. Examiners give a method mark for the equation.
:::

:::exam-tip{title="Which papers"}
These ideas appear in Cambridge Papers 1 and 2 and ZIMSEC Papers 1 and 2, often combined with kinematics or power.
:::

## Summary

:::summary
- Work done = force × displacement in the direction of the force: $W = Fs\cos\theta$, in joules.
- Perpendicular forces do no work; forces opposing motion do negative work.
- Work done by a varying force = area under the force-displacement graph.
- Energy is conserved; wasted energy is dissipated, usually as thermal energy.
- Efficiency = useful output ÷ total input (energy or power), always less than 100% for real machines.
:::
