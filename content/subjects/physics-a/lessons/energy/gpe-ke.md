---
{
  "key": "energy.gpe-ke",
  "title": "Gravitational potential energy and kinetic energy",
  "summary": "Derive ΔEp = mgΔh and Ek = ½mv², and use them with conservation of energy for falling objects, pendulums, slopes and roller coasters, including energy dissipated by resistive forces.",
  "concepts": ["aphys.energy.gpe-ke"],
  "estimatedMinutes": 35,
  "level": "core"
}
---
## Introduction

Water held behind a dam wall stores gravitational potential energy; as it falls through the turbines of a hydro-electric station, that energy becomes kinetic energy and then electrical energy. A child on a swing, a truck freewheeling down the escarpment towards the Zambezi valley and a ball dropped from a balcony all exchange the same two forms of energy.

This lesson derives the two formulae from first principles, as the syllabus requires, and uses them with the energy-conservation ideas of the previous lesson. You need $W = Fs$, Newton's second law $F = ma$ and the equation $v^2 = u^2 + 2as$.

## Key definitions

:::definition{term="Gravitational potential energy"}
The energy stored by a mass because of its position in a gravitational field. Near the Earth's surface, a change in height $\Delta h$ changes it by $mg\Delta h$.
:::

:::definition{term="Kinetic energy"}
The energy a body has because of its motion, equal to the work done to accelerate it from rest to its speed.
:::

:::formula{name="Change in gravitational potential energy (uniform field)"}
$$
\Delta E_P = mg\Delta h
$$

$m$ in kg, $g = 9.81\ \text{m s}^{-2}$ (or N kg⁻¹), $\Delta h$ the change in height in m. Valid only where $g$ is constant, close to the surface.
:::

:::formula{name="Kinetic energy"}
$$
E_K = \tfrac{1}{2}mv^2
$$

$m$ in kg, $v$ the speed in $\text{m s}^{-1}$; $E_K$ in J.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards require the derivations (Cambridge AS 5.2). Gravitational potential energy in a radial field, $-GMm/r$, belongs to the gravitation topic.
:::

## Deriving $\Delta E_P = mg\Delta h$

1. To lift a mass $m$ at constant speed, an upward force equal to its weight, $F = mg$, is needed.
2. The force moves through a displacement $\Delta h$ in its own direction.
3. Work done $= F\Delta h = mg\Delta h$.
4. This work is stored as gravitational potential energy, so $\Delta E_P = mg\Delta h$.

The derivation assumes $g$ is constant over $\Delta h$, which is true to a very good approximation for heights much smaller than the Earth's radius. Only **changes** in potential energy matter, so you can choose any convenient level as zero.

## Deriving $E_K = \tfrac{1}{2}mv^2$

1. A constant resultant force $F$ accelerates a mass $m$ from rest through a displacement $s$.
2. Work done on the mass $W = Fs$, and from Newton's second law $F = ma$, so $W = mas$.
3. From $v^2 = u^2 + 2as$ with $u = 0$: $as = \tfrac{1}{2}v^2$.
4. So $W = m \times \tfrac{1}{2}v^2 = \tfrac{1}{2}mv^2$, which is the kinetic energy gained.

Because $E_K \propto v^2$, doubling the speed of a vehicle multiplies its kinetic energy, and so its braking distance at a given braking force, by four.

## Exchanges between the two forms

With no resistive forces, the loss of one form equals the gain of the other:

$$
mg\Delta h = \tfrac{1}{2}mv^2 - \tfrac{1}{2}mu^2
$$

The mass cancels, so all objects falling freely from the same height reach the same speed. With resistive forces, add the work done against them:

$$
\text{loss of } E_P = \text{gain in } E_K + \text{work done against resistive forces}
$$

:::worked-solution[A pendulum]
A pendulum bob is pulled aside so that it is $0.20\ \text{m}$ higher than its lowest point, then released. Ignore air resistance. Find its speed at the lowest point.

1. Loss of $E_P$ = gain of $E_K$: $mg\Delta h = \tfrac{1}{2}mv^2$.
2. $m$ cancels: $v = \sqrt{2g\Delta h} = \sqrt{2 \times 9.81 \times 0.20}$.
3. $v = 1.98\ \text{m s}^{-1}$. The string's tension does no work, because it is always perpendicular to the bob's motion.
:::

:::worked-solution[A roller-coaster car with friction]
A roller-coaster car of mass $600\ \text{kg}$ passes over a crest $25\ \text{m}$ above the lowest point at $2.0\ \text{m s}^{-1}$. It reaches the lowest point at $20\ \text{m s}^{-1}$ after travelling $80\ \text{m}$ along the track.

1. Loss of $E_P = mgh = 600 \times 9.81 \times 25 = 147\,150\ \text{J}$.
2. $E_K$ at the crest $= \tfrac{1}{2} \times 600 \times 2.0^2 = 1200\ \text{J}$; at the bottom $= \tfrac{1}{2} \times 600 \times 20^2 = 120\,000\ \text{J}$.
3. Energy dissipated $= 147\,150 + 1200 - 120\,000 = 2.84 \times 10^{4}\ \text{J}$.
4. Average resistive force $= \dfrac{28\,350}{80} = 354\ \text{N}$.
:::

:::worked-solution[A ball with air resistance]
A ball of mass $0.15\ \text{kg}$ is dropped from a balcony $20\ \text{m}$ high and reaches the ground at $17.6\ \text{m s}^{-1}$. Find the average air resistance.

1. Loss of $E_P = 0.15 \times 9.81 \times 20 = 29.43\ \text{J}$.
2. Gain of $E_K = \tfrac{1}{2} \times 0.15 \times 17.6^2 = 23.23\ \text{J}$.
3. Work done against air resistance $= 29.43 - 23.23 = 6.20\ \text{J}$.
4. Average air resistance $= \dfrac{6.20}{20} = 0.310\ \text{N}$, about a fifth of the ball's weight.
:::

## Graphs of energy against height

For a ball falling freely from height $H$, as the height $h$ above the ground decreases:

![Energy against height for a 0.15 kg ball dropped from 20 m: EP falls in a straight line from 29.4 J to zero while EK rises by the same amount in free fall (total constant); with air resistance EK reaches only 23.2 J at the ground, the other 6.2 J being work done against drag.](media:diagrams/energy-against-height-graph.png "Figure: energy against height for a falling ball, with and without air resistance")

| Height above ground | $E_P$ | $E_K$ | Total |
| --- | --- | --- | --- |
| $H$ (released) | $mgH$ | 0 | $mgH$ |
| $H/2$ | $mgH/2$ | $mgH/2$ | $mgH$ |
| 0 (just before impact) | 0 | $mgH$ | $mgH$ |

Plotted against height, $E_P$ is a straight line through the origin with gradient $mg$, and $E_K$ is a straight line of gradient $-mg$; their sum is a horizontal line. Plotted against **time**, $E_K$ grows as $t^2$ (a parabola), because $v = gt$.

## Common mistakes

:::mistake{title="Using the slope length as the height"}
$\Delta h$ is the **vertical** change in height. For a slope of length $L$ at angle $\theta$, $\Delta h = L\sin\theta$.
:::

:::mistake{title="Forgetting to square the speed"}
$\tfrac{1}{2}mv^2$, not $\tfrac{1}{2}mv$. Check: the unit must be $\text{kg m}^2\,\text{s}^{-2} = \text{J}$.
:::

:::mistake{title="Subtracting speeds instead of energies"}
The change in kinetic energy is $\tfrac{1}{2}m(v^2 - u^2)$, not $\tfrac{1}{2}m(v - u)^2$.
:::

:::mistake{title="Using mgh far from the Earth"}
For satellites and planets $g$ changes with distance; use the radial-field expression from the gravitation topic.
:::

## Exam tips

:::exam-tip{title="Derivations"}
*Derive* means start from stated principles: for $E_P$, work done = force × displacement with force = weight; for $E_K$, $W = Fs$, $F = ma$ and $v^2 = u^2 + 2as$. State the assumptions (constant $g$; starting from rest).
:::

:::exam-tip{title="Energy questions with losses"}
Write the word equation first. Then substitute. A "show that" with a given answer needs every step and the result to more significant figures than given.
:::

:::exam-tip{title="Which papers"}
Common in Cambridge Papers 1 and 2 and ZIMSEC Papers 1 and 2, often combined with projectile or momentum questions (for example, the kinetic energy lost in an inelastic collision).
:::

## Summary

:::summary
- $\Delta E_P = mg\Delta h$, derived from work done = weight × vertical displacement (uniform field only).
- $E_K = \tfrac{1}{2}mv^2$, derived from $W = Fs$, $F = ma$ and $v^2 = u^2 + 2as$.
- Without resistance, loss of $E_P$ = gain of $E_K$, and $v = \sqrt{2gh}$ for a fall from rest.
- With resistance, loss of $E_P$ = gain in $E_K$ + work done against resistive forces.
- $E_K \propto v^2$: doubling speed quadruples kinetic energy.
:::
