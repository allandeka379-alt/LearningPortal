---
{
  "key": "matter.phases-kinetic-model",
  "title": "Phases of matter and the kinetic molecular model",
  "summary": "Describe solids, liquids and gases by the spacing, ordering and motion of their molecules, explain intermolecular force and potential energy against separation, account for density differences, melting, boiling and cooling by evaporation, and use Brownian motion as evidence for molecular motion.",
  "concepts": ["aphys.matter.phases-kinetic-model"],
  "estimatedMinutes": 40,
  "level": "core"
}
---
## Introduction

A clay water pot (*chirongo*) left in the shade keeps drinking water noticeably cooler than the air on a hot Masvingo afternoon. Water seeps through the clay and evaporates from the outer surface, and evaporation cools. Explaining why needs a picture of matter as huge numbers of molecules that attract one another and move about at random: the **kinetic molecular model**.

This lesson builds that model at A-Level depth. You should already know the particle diagrams of solids, liquids and gases from O-Level, the idea of density $\rho = m/V$, and that the amount of substance is measured in moles.

## Key definitions

:::definition{term="Kinetic molecular model"}
The model in which all matter is made of molecules (or atoms or ions) in continuous random motion, with forces acting between them that depend on their separation.
:::

:::definition{term="Intermolecular potential energy"}
The energy a pair of molecules has because of the forces between them. It is taken as zero when the molecules are infinitely far apart, so it is negative when they are bound together.
:::

:::definition{term="Evaporation"}
The escape of the most energetic molecules from the surface of a liquid, at any temperature below the boiling point.
:::

:::definition{term="Boiling"}
The change from liquid to gas throughout the body of the liquid, at a fixed temperature (the boiling point) for a given external pressure, when bubbles of vapour can form inside the liquid.
:::

:::formula{name="Volume and spacing per molecule"}
$$
V_{\text{molecule}} = \frac{M}{\rho N_A}, \qquad d \approx \sqrt[3]{V_{\text{molecule}}}
$$

$M$ = molar mass (kg mol⁻¹), $\rho$ = density (kg m⁻³), $N_A = 6.02 \times 10^{23}\ \text{mol}^{-1}$, $d$ = typical spacing between molecule centres (m).
:::

:::keyfact{title="ZIMSEC and Cambridge"}
This concept is ZIMSEC Form 6 (Matter). Cambridge 9702 does not list phases of matter as a separate topic, although its kinetic theory and internal energy topics use the same ideas. The classification of crystalline, amorphous and polymeric solids is ZIMSEC detail still to be confirmed against the syllabus.
:::

## The three phases compared

| Property | Solid | Liquid | Gas |
|---|---|---|---|
| Spacing | about one molecular diameter | about one molecular diameter | about ten diameters at room conditions |
| Arrangement | regular (crystalline) or random (amorphous), fixed positions | random, short-range order only | random, no order |
| Motion | vibration about fixed positions | vibration plus movement past neighbours | rapid random translation, collisions |
| Forces | strong; hold shape | strong enough to keep volume, not shape | negligible except during collisions |

Because liquid and solid molecules are packed about equally closely, their densities are similar (ice is even slightly less dense than water). A gas at atmospheric pressure is roughly a thousand times less dense, so its molecules are about $\sqrt[3]{1000} = 10$ times further apart.

:::worked-solution[Spacing of molecules in water and in steam]
Water has density $1000\ \text{kg m}^{-3}$ and molar mass $0.018\ \text{kg mol}^{-1}$. Steam at $100\ ^\circ\text{C}$ and atmospheric pressure has density $0.588\ \text{kg m}^{-3}$.

1. Volume per molecule in water: $V = \dfrac{M}{\rho N_A} = \dfrac{0.018}{1000 \times 6.02 \times 10^{23}} = 2.99 \times 10^{-29}\ \text{m}^3$.
2. Spacing: $d \approx \sqrt[3]{2.99 \times 10^{-29}} = 3.1 \times 10^{-10}\ \text{m}$, about the size of a water molecule.
3. In steam, $V = \dfrac{0.018}{0.588 \times 6.02 \times 10^{23}} = 5.08 \times 10^{-26}\ \text{m}^3$, so $d \approx 3.7 \times 10^{-9}\ \text{m}$.
4. Ratio of spacings $= \sqrt[3]{1000/0.588} = \sqrt[3]{1700} \approx 12$: steam molecules are about twelve times further apart.
:::

## Force and potential energy against separation

Two molecules attract each other at moderate separations and repel strongly when their electron clouds begin to overlap. Described in words:

- **Force against separation $r$**: at small $r$ the force is large and repulsive; it falls steeply to zero at the **equilibrium separation** $r_0$; beyond $r_0$ it is attractive, rising to a maximum attraction and then fading towards zero at large $r$.
- **Potential energy against separation**: large and positive at very small $r$, falling to a **minimum** (most negative value, depth $\varepsilon$) at $r_0$, then rising towards zero at large separation.

The force is minus the gradient of the potential-energy curve, $F = -\dfrac{\mathrm{d}E_p}{\mathrm{d}r}$, which is why the force is zero exactly where the potential energy is a minimum. In a solid, molecules vibrate about $r_0$ near the bottom of this "well". Melting gives them enough energy to break out of fixed positions; boiling gives each molecule roughly the whole depth of the well so it can separate completely.

## Changes of phase in molecular terms

**Melting.** The energy supplied (latent heat of fusion) increases the molecules' potential energy by breaking the fixed lattice; the temperature, which measures mean kinetic energy, stays constant.

**Boiling.** Energy separates molecules completely and does work pushing back the atmosphere. The latent heat of vaporisation is much larger than that of fusion because nearly all the bonds to neighbours must be broken, not just some, and the volume increases enormously.

**Evaporation cools.** Molecules in a liquid have a spread of speeds. Only those near the surface with enough kinetic energy to overcome the attraction of their neighbours escape. The molecules left behind have a lower mean kinetic energy, so the temperature of the liquid falls. Evaporation is faster with a higher temperature, a larger surface area, a draught that removes vapour, and lower humidity.

:::worked-solution[Energy needed to free one water molecule]
The specific latent heat of vaporisation of water is $2.26 \times 10^{6}\ \text{J kg}^{-1}$. Compare the energy per molecule with the mean kinetic energy $\tfrac{3}{2}kT$ at $373\ \text{K}$.

1. Mass of one molecule: $m = \dfrac{M}{N_A} = \dfrac{0.018}{6.02 \times 10^{23}} = 2.99 \times 10^{-26}\ \text{kg}$.
2. Energy per molecule: $mL = 2.99 \times 10^{-26} \times 2.26 \times 10^{6} = 6.76 \times 10^{-20}\ \text{J}$ (about $0.42\ \text{eV}$).
3. Mean kinetic energy: $\tfrac{3}{2}kT = 1.5 \times 1.38 \times 10^{-23} \times 373 = 7.72 \times 10^{-21}\ \text{J}$.
4. The ratio is about 9: only the fastest molecules in the tail of the speed distribution can escape, which is why evaporation removes energy from the liquid.
:::

## Brownian motion: evidence for moving molecules

Smoke particles in a small glass cell, lit from the side and viewed through a microscope, are seen as bright specks moving in a jerky, random, zig-zag way. The air molecules themselves are far too small to see. Each smoke particle is struck unevenly by many fast-moving air molecules, so the resultant force on it changes size and direction at random. This shows that air molecules are moving randomly and rapidly. With smaller particles or a higher temperature the motion is more vigorous. Pollen grains in water show the same effect in a liquid.

## Types of solid

- **Crystalline** solids (metals, salt, quartz) have a regular, repeating three-dimensional arrangement of particles: long-range order, a sharp melting point.
- **Amorphous** solids (glass, many plastics) have particles in fixed but disordered positions, like a frozen liquid; they soften over a range of temperature.
- **Polymeric** solids (rubber, polythene) are made of very long chain molecules; tangled chains that can straighten under load explain rubber's large elastic extension.

## Common mistakes

:::mistake{title="Saying molecules in a solid do not move"}
They vibrate about fixed positions; the amplitude of vibration grows with temperature.
:::

:::mistake{title="Confusing evaporation and boiling"}
Evaporation happens only at the surface and at any temperature; boiling happens throughout the liquid at a fixed temperature for a given pressure.
:::

:::mistake{title="Thinking temperature rises during melting"}
At the melting point the energy supplied increases potential energy, not kinetic energy, so the temperature stays constant until all the solid has melted.
:::

:::mistake{title="Saying you can see molecules in Brownian motion"}
You see the smoke particles; the molecules are inferred from the particles' random motion.
:::

## Exam tips

:::exam-tip{title="Describe and explain"}
*Describe* the phases with three headings: spacing, arrangement, motion. *Explain* evaporative cooling in three steps: the most energetic molecules escape, the mean kinetic energy of those left falls, so the temperature falls.
:::

:::exam-tip{title="Graphs described in words"}
For the potential-energy curve, say where it is zero (infinite separation), where the minimum is ($r_0$, where the force is zero) and the steep rise at small separation. Link force to the gradient.
:::

:::exam-tip{title="Which papers"}
Expect this concept in ZIMSEC Paper 1 multiple choice and short structured parts of Papers 2 and 3, often as the "explain" part of a latent-heat calculation.
:::

## Summary

:::summary
- Solids and liquids have molecules about one diameter apart; gases about ten diameters apart at room conditions, so gas densities are roughly a thousand times lower.
- Intermolecular force is repulsive at short range, zero at $r_0$ and attractive beyond; potential energy is a minimum at $r_0$ and $F = -\mathrm{d}E_p/\mathrm{d}r$.
- Melting and boiling increase potential energy at constant temperature; boiling needs far more energy per kilogram.
- Evaporation removes the fastest surface molecules, lowering the mean kinetic energy and so the temperature.
- Brownian motion of visible particles is evidence of the random motion of invisible molecules.
:::
