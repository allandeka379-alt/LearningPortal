---
{
  "key": "solids.elastic-plastic-energy",
  "title": "Elastic and plastic deformation and strain energy",
  "summary": "Distinguish elastic from plastic deformation, interpret loading and unloading curves, find work done from the area under a force-extension graph, and calculate elastic potential energy, including energy per unit volume and hysteresis in rubber.",
  "concepts": ["aphys.solids.elastic-plastic-energy"],
  "estimatedMinutes": 35,
  "level": "core"
}
---
## Introduction

A catapult stores energy in its rubber and releases it to the stone. A bow, a trampoline and the suspension of a haulage truck do the same with springs and flexible materials. But bend a paper clip too far and it stays bent: the energy you put in has gone into permanently rearranging the metal. This lesson explains the difference between elastic and plastic behaviour and how to calculate the energy stored when a material is stretched.

You need Hooke's law, stress and strain, and the idea that work done equals the area under a force-displacement graph.

## Key definitions

:::definition{term="Elastic deformation"}
A change of shape that is reversed when the load is removed: the object returns to its original length.
:::

:::definition{term="Plastic deformation"}
A change of shape that remains when the load is removed: the object is permanently extended.
:::

:::definition{term="Elastic limit"}
The maximum load (or stress) a material can take and still return to its original length when the load is removed.
:::

:::definition{term="Elastic potential energy (strain energy)"}
The energy stored in a deformed object because of its change of shape, equal to the work done in deforming it elastically.
:::

:::formula{name="Elastic potential energy"}
$$
E_P = \tfrac{1}{2}Fx = \tfrac{1}{2}kx^2
$$

$F$ is the final load in N, $x$ the extension in m, $k$ the spring constant in $\text{N m}^{-1}$. Valid only up to the limit of proportionality (a straight-line graph).
:::

:::formula{name="Energy stored per unit volume (ZIMSEC detail)"}
$$
\frac{E_P}{V} = \tfrac{1}{2}\sigma\varepsilon
$$

$\sigma$ is the stress in Pa and $\varepsilon$ the strain; the result is in $\text{J m}^{-3}$. It follows from $\tfrac{1}{2}Fx$ divided by the volume $AL$.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards require elastic and plastic deformation, the area under a force-extension graph and $E_P = \tfrac{1}{2}Fx = \tfrac{1}{2}kx^2$ (Cambridge AS 6.2). Energy per unit volume is given for ZIMSEC (to be confirmed with the current syllabus); Cambridge does not require it.
:::

## Elastic and plastic behaviour

In a metal, atoms sit in a regular lattice held by bonds that act like stiff springs. A small load stretches the bonds slightly; remove it and the atoms return to their places: **elastic** deformation. Beyond the elastic limit, layers of atoms slide over one another (dislocations move), so the atoms take up new positions. When the load is removed the bonds relax, but the slipped layers stay where they are: **plastic** deformation.

The elastic limit is usually just beyond the limit of proportionality, so for metals the two are often treated as close together. They are, however, different ideas: one is about the graph being straight, the other about the material recovering.

## Loading and unloading curves

For a metal wire loaded **within** its elastic limit, the unloading line retraces the loading line back to the origin: all the stored energy is recovered.

For a wire loaded **beyond** its elastic limit, the unloading line is a straight line **parallel to the original straight region** (the bonds relax with the same stiffness), but it meets the extension axis at a positive value: the permanent extension. The area between the loading curve and the unloading line is energy that has been dissipated (as thermal energy) in rearranging the atoms.

## Work done and the area under the graph

The work done in stretching an object is the area under its force-extension graph, whatever its shape. For a straight line through the origin that area is a triangle:

$$
W = \tfrac{1}{2}Fx, \qquad \text{and with } F = kx,\qquad W = \tfrac{1}{2}kx^2
$$

For a curved graph, count squares (or split the area into strips) and multiply by the energy that one square represents.

:::worked-solution[Energy stored in a catapult spring]
A spring with $k = 250\ \text{N m}^{-1}$ is stretched by $8.0\ \text{cm}$ (within its limit of proportionality). It is then released to launch a $20\ \text{g}$ ball.

1. $E_P = \tfrac{1}{2}kx^2 = \tfrac{1}{2} \times 250 \times 0.080^2 = 0.80\ \text{J}$.
2. If all of this becomes kinetic energy of the ball: $\tfrac{1}{2}mv^2 = 0.80$.
3. $v = \sqrt{\dfrac{2 \times 0.80}{0.020}} = 8.94\ \text{m s}^{-1}$.
4. In practice the speed is lower: the spring's own mass gains kinetic energy and some energy is dissipated.
:::

:::worked-solution[Energy per unit volume in a steel wire]
The steel wire of the previous lesson ($L = 2.50\ \text{m}$, $A = 1.963 \times 10^{-7}\ \text{m}^2$) carries $80\ \text{N}$ with an extension of $5.1\ \text{mm}$, so $\sigma = 4.07 \times 10^{8}\ \text{Pa}$ and $\varepsilon = 2.04 \times 10^{-3}$.

1. Energy per unit volume $= \tfrac{1}{2}\sigma\varepsilon = \tfrac{1}{2} \times 4.074 \times 10^{8} \times 2.04 \times 10^{-3} = 4.16 \times 10^{5}\ \text{J m}^{-3}$.
2. Volume $= AL = 1.963 \times 10^{-7} \times 2.50 = 4.91 \times 10^{-7}\ \text{m}^3$.
3. Energy stored $= 4.16 \times 10^{5} \times 4.91 \times 10^{-7} = 0.204\ \text{J}$.
4. Check: $\tfrac{1}{2}Fx = \tfrac{1}{2} \times 80 \times 5.1 \times 10^{-3} = 0.204\ \text{J}$. The two methods agree.
:::

## Rubber and hysteresis

When a rubber band is stretched and then released, the unloading curve lies **below** the loading curve: for the same extension, the tension is smaller while it contracts. The band still returns to (almost) its original length, so the deformation is elastic, but less energy is given back than was put in. The area of the loop between the curves is the energy dissipated as thermal energy in each cycle: the band warms up if stretched repeatedly. This effect is called **hysteresis**. It makes rubber useful for absorbing vibrations (engine mounts, shoe soles) but is undesirable in tyres, where it wastes fuel and heats the tyre.

## Common mistakes

:::mistake{title="Using Fx instead of ½Fx"}
The force rises from zero to $F$ while the object stretches, so the average force is $F/2$. $Fx$ would double the energy.
:::

:::mistake{title="Using ½kx² beyond the limit of proportionality"}
Beyond the straight region the energy is still the area under the graph, but not $\tfrac{1}{2}kx^2$; count squares instead.
:::

:::mistake{title="Calling rubber plastic because of hysteresis"}
Rubber returns to its original length, so it is elastic; hysteresis means energy is dissipated, not that it is permanently deformed.
:::

:::mistake{title="Extension in cm in ½kx²"}
Convert to metres: $8.0\ \text{cm} = 0.080\ \text{m}$, so $x^2 = 0.0064\ \text{m}^2$.
:::

## Exam tips

:::exam-tip{title="Distinguish clearly"}
*Explain the difference between elastic and plastic deformation*: elastic — returns to original length when the load is removed; plastic — permanent extension remains. Mention the elastic limit.
:::

:::exam-tip{title="Show that E = ½Fx"}
State that work done = area under the force-extension graph, that the graph is a straight line through the origin, and that the area of the triangle is $\tfrac{1}{2} \times F \times x$; then substitute $F = kx$ for $\tfrac{1}{2}kx^2$.
:::

:::exam-tip{title="Describe a loading and unloading graph"}
Name the axes, the straight loading region, the curve beyond the limit, the parallel unloading line and the permanent extension where it meets the axis.
:::

## Summary

:::summary
- Elastic deformation is reversed when the load is removed; plastic deformation is permanent. The elastic limit separates them.
- Work done in deforming = area under the force-extension graph.
- Within the limit of proportionality, $E_P = \tfrac{1}{2}Fx = \tfrac{1}{2}kx^2$; energy per unit volume $= \tfrac{1}{2}\sigma\varepsilon$.
- Beyond the elastic limit a metal unloads along a line parallel to the loading line, leaving a permanent extension.
- Rubber shows hysteresis: the loop area is energy dissipated as thermal energy each cycle.
:::
