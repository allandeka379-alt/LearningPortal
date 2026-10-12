---
{
  "key": "energy.kinetic-potential",
  "title": "Kinetic and gravitational potential energy",
  "summary": "Calculate kinetic energy with Ek = ½mv² and changes in gravitational potential energy with ΔEp = mgΔh, and use energy conservation for falling and swinging objects.",
  "concepts": ["phys.energy.ke-gpe"],
  "objectives": ["cambridge/igcse/physics:1.7.1.4", "cambridge/igcse/physics:1.7.1.5", "zimsec/o-level/physics:6.2.4"],
  "estimatedMinutes": 20,
  "level": "extended"
}
---
## Introduction

Water falling through the turbines at Kariba, a child sliding down a playground slide, a mango dropping from a branch: each converts **gravitational potential energy** into **kinetic energy**. With two equations you can calculate both stores and predict speeds and heights.

For Cambridge these equations are Supplement content; ZIMSEC learners use them in topic 6.2.

## Key definitions

:::definition{term="Kinetic energy"}
The energy an object has because it is moving.
:::

:::definition{term="Gravitational potential energy"}
The energy an object has because of its position in a gravitational field (its height).
:::

:::formula{name="Kinetic energy"}
$$
E_k = \tfrac{1}{2}mv^2
$$

with $m$ in kg and $v$ in m/s, giving $E_k$ in joules.
:::

:::formula{name="Change in gravitational potential energy"}
$$
\Delta E_p = mg\Delta h
$$

with $g \approx 9.8\ \text{N/kg}$ and $\Delta h$ the change in height in metres.
:::

## Kinetic energy

Kinetic energy depends on the **square** of the speed: doubling the speed makes the kinetic energy four times bigger. This is why a car crash at $120\ \text{km/h}$ is far more destructive than one at $60\ \text{km/h}$.

:::worked-solution[The kinetic energy of a ball]
1. A $0.50\ \text{kg}$ ball moves at $12\ \text{m/s}$.
2. $E_k = \tfrac{1}{2} \times 0.50 \times 12^2 = 0.25 \times 144 = 36\ \text{J}$.
:::

## Gravitational potential energy

Lifting an object increases its gravitational potential energy by $mg\Delta h$; this equals the work done against its weight.

:::worked-solution[Lifting a bag onto a shelf]
1. A $25\ \text{kg}$ bag of fertiliser is lifted $1.6\ \text{m}$ onto a shelf; take $g = 9.8\ \text{N/kg}$.
2. $\Delta E_p = mg\Delta h = 25 \times 9.8 \times 1.6 = 392\ \text{J}$.
:::

## Energy conservation: falling objects

When an object falls freely, the gravitational potential energy it loses becomes kinetic energy (ignoring air resistance):

![Energy of a 1.0 kg stone falling 5.0 m, ignoring air resistance: at the top it has 49.0 J of potential energy and no kinetic energy; halfway down each is 24.5 J; at the bottom all 49.0 J is kinetic, a speed of 9.9 m/s. The total stays 49.0 J.](media:diagrams/energy-falling-stone.png "Figure: potential energy changes into kinetic energy as a stone falls")

$$
mg\Delta h = \tfrac{1}{2}mv^2 \quad \Rightarrow \quad v = \sqrt{2g\Delta h}
$$

The mass cancels, so the speed does not depend on the mass.

:::worked-solution[Speed after a fall]
A stone falls $5.0\ \text{m}$ from rest. Ignoring air resistance, with $g = 9.8\ \text{N/kg}$:

1. Loss of $E_p$ = gain of $E_k$: $g\Delta h = \tfrac{1}{2}v^2$.
2. $v = \sqrt{2 \times 9.8 \times 5.0} = \sqrt{98} = 9.9\ \text{m/s}$.
:::

The same idea works for a swinging pendulum: at the top of each swing the bob has its greatest gravitational potential energy and is momentarily at rest; at the bottom it has its greatest kinetic energy. In reality air resistance and friction at the pivot transfer some energy to the internal store of the surroundings, so the swings slowly die away.

## Common mistakes

:::mistake{title="Forgetting to square the speed"}
$E_k = \tfrac{1}{2}mv^2$: square $v$ first, then multiply. $\tfrac{1}{2} \times 0.50 \times 12$ is not the kinetic energy.
:::

:::mistake{title="Using mass instead of weight"}
$\Delta E_p = mg\Delta h$ needs both $m$ and $g$; $m \times \Delta h$ alone is not an energy.
:::

## Exam tips

:::exam-tip
For "show that the speed is about …" questions, write the energy equation in words first ("loss of gravitational potential energy = gain of kinetic energy"), then substitute.
:::

:::exam-tip
State the assumption: "ignoring air resistance (and friction)". Real speeds are lower than the calculated ones.
:::

## Summary

:::summary
- Kinetic energy $E_k = \tfrac{1}{2}mv^2$; doubling speed quadruples $E_k$.
- Gravitational potential energy change $\Delta E_p = mg\Delta h$.
- In free fall, loss of $E_p$ = gain of $E_k$, so $v = \sqrt{2g\Delta h}$, independent of mass.
- A pendulum swaps $E_p$ and $E_k$ each swing, losing a little to heating each time.
- Real systems lose energy to air resistance and friction.
:::
