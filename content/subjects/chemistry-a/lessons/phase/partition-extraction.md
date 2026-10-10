---
{
  "key": "phase.partition-extraction",
  "title": "Partition coefficients and solvent extraction",
  "summary": "The partition coefficient Kpc for a solute shared between two immiscible solvents, calculating and using Kpc, why several small extractions remove more solute than one large one, how polarity affects Kpc, and partition as the basis of chromatography.",
  "concepts": ["achem.phase.partition-extraction"],
  "estimatedMinutes": 40,
  "level": "core"
}
---
## Introduction

When a cook in Gweru drops a few chilli flakes into hot oil, the hot taste ends up in the oil rather than in the water of the stew. Chemists use the same idea on purpose. To pull caffeine out of tea, a fragrance out of crushed leaves, or a drug out of a reaction mixture, they shake the aqueous mixture with an organic solvent that does not mix with water. The solute shares itself between the two layers in a fixed ratio: the **partition coefficient**.

This lesson defines that ratio, shows how to calculate it and use it, and explains why chemists extract several times with small portions of solvent rather than once with a large portion. It ends with how partition underlies paper and gas-liquid chromatography. You should be familiar with concentration in mol dm⁻³ and g dm⁻³, equilibrium constants, and intermolecular forces (polar and non-polar molecules).

## Key definitions

:::definition{term="Immiscible liquids"}
Liquids that do not mix but form two separate layers, such as water and hexane.
:::

:::definition{term="Partition coefficient, Kpc"}
The ratio of the concentrations of a solute in two immiscible solvents when the system is at equilibrium at a given temperature: $K_\text{pc} = \dfrac{[\text{X}]_\text{solvent A}}{[\text{X}]_\text{solvent B}}$. The solute must be in the same molecular state in both solvents.
:::

:::definition{term="Solvent extraction"}
Separating a solute from a solution by shaking it with a second solvent, immiscible with the first, in which the solute is more soluble, then separating the layers.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards: defining Kpc, calculating and using it, and how solute and solvent polarity affect it (ZIMSEC Form 6, "distribution between phases"; Cambridge A Level, Paper 4). ZIMSEC also asks you to explain solvent extraction, including the advantage of repeated extractions.
:::

## The partition equilibrium

Shake iodine with water and hexane in a separating funnel. Iodine molecules move across the boundary in both directions until the rates are equal: a dynamic equilibrium

$$
\ce{I2(aq) <=> I2(hexane)}
$$

Like any equilibrium constant, Kpc is fixed at a given temperature and does not depend on the amounts used. **Always say which solvent is on top of the ratio.** Kpc(hexane/water) is large for iodine; Kpc(water/hexane) for the same system is its reciprocal.

Kpc has no units if both concentrations are in the same units. Because the ratio of concentrations is what matters, g dm⁻³ may be used instead of mol dm⁻³.

The condition "same molecular state" matters. Ethanoic acid forms hydrogen-bonded dimers in non-polar solvents, so the simple ratio of total concentrations is not constant for it; such systems are not used in calculations at this level.

:::worked-solution[Example 1: finding Kpc]
In an experiment, 0.200 g of iodine was shaken with 50.0 cm³ of hexane and 100 cm³ of water until equilibrium was reached. The aqueous layer was found to contain 0.0050 g of iodine. Calculate Kpc (hexane/water).

1. Iodine in hexane = 0.200 − 0.0050 = 0.195 g.
2. Concentrations: hexane $= \dfrac{0.195}{0.0500} = 3.90$ g dm⁻³; water $= \dfrac{0.0050}{0.100} = 0.050$ g dm⁻³.
3. $K_\text{pc} = \dfrac{3.90}{0.050} = 78$ (no units).
:::

## Several small extractions beat one large one

Suppose a solute X is in water and Kpc(ether/water) = $K$. If $m_0$ g of X is in $V_\text{aq}$ cm³ of water and you shake it with $V_\text{org}$ cm³ of ether, the mass left in the water, $m_1$, comes from

$$
K = \frac{(m_0 - m_1)/V_\text{org}}{m_1/V_\text{aq}} \qquad \Rightarrow \qquad m_1 = m_0 \times \frac{V_\text{aq}}{V_\text{aq} + K V_\text{org}}
$$

Each further extraction with fresh solvent multiplies the mass remaining by the same fraction again.

:::worked-solution[Example 2: one 60 cm³ extraction or two 30 cm³ extractions?]
2.00 g of X is dissolved in 100 cm³ of water. Kpc(ether/water) = 4.00. Compare extracting with one 60 cm³ portion of ether with extracting with two 30 cm³ portions.

1. One 60 cm³ portion: $m_1 = 2.00 \times \dfrac{100}{100 + 4.00 \times 60} = 0.588$ g left in the water, so 1.41 g extracted.
2. Two 30 cm³ portions: after each, the fraction left is $\dfrac{100}{100 + 4.00 \times 30} = 0.455$. After two: $2.00 \times 0.455^2 = 0.413$ g left, so 1.59 g extracted.
3. The same total volume of ether removes more solute when it is split into two portions. (Three 20 cm³ portions would extract 1.66 g.)
:::

The reason: in each extraction the equilibrium leaves a fixed fraction behind. Using fresh solvent each time re-establishes the partition with a new, solute-free layer, so the remaining solute is shared out again.

## Practical solvent extraction

1. Put the aqueous solution and the organic solvent in a **separating funnel**, stopper it and shake, releasing the pressure through the tap now and then (volatile solvents build up vapour).
2. Allow the layers to separate. The denser liquid is at the bottom: hexane and ethoxyethane (ether) float on water; dichloromethane sinks.
3. Run off the lower layer through the tap; repeat the extraction with fresh solvent.
4. Combine the organic extracts, dry them (for example with anhydrous magnesium sulfate) and distil off the solvent.

Safety: organic solvents are flammable (no naked flames) and some are harmful; use a fume cupboard and wear eye protection.

## What decides the value of Kpc?

"Like dissolves like": a solute is more soluble in the solvent whose intermolecular forces resemble its own.

| Solute | Main intermolecular forces | Favoured solvent | Kpc(hexane/water) |
|---|---|---|---|
| iodine, $\ce{I2}$ | instantaneous dipole–induced dipole (non-polar) | hexane | large (much greater than 1) |
| a long-chain alkane | instantaneous dipole–induced dipole | hexane | very large |
| ethanol | hydrogen bonding | water | small (less than 1) |
| sodium chloride | ionic (ion–dipole with water) | water | effectively zero |

A polar solute that hydrogen bonds with water has a small Kpc(organic/water); a non-polar solute has a large one. Changing the organic solvent to a more polar one (such as an alcohol) changes Kpc as well.

## Partition and chromatography

Chromatography is partition repeated many times. In **paper chromatography**, the stationary phase is water held in the cellulose fibres and the mobile phase is the solvent moving up the paper; each solute is continually shared between them, and a solute with a larger Kpc(mobile/stationary) travels further (higher Rf). In **gas-liquid chromatography**, solutes partition between a gas (the mobile phase) and a liquid coated on a solid support; the more soluble a solute is in the liquid, the longer its retention time. Chromatography itself is covered in the analytical chemistry lessons.

## Common mistakes

:::mistake{title="Using masses instead of concentrations"}
Kpc is a ratio of **concentrations**. Divide each mass or amount by its own solvent volume before taking the ratio.
:::

:::mistake{title="Inverting the ratio"}
State which solvent is on top. Kpc(ether/water) = 4.00 means the concentration in ether is four times that in water.
:::

:::mistake{title="Adding volumes of solvent"}
For repeated extractions, apply the fraction remaining once per extraction, using the volume of **one** portion.
:::

:::mistake{title="Forgetting the same-state condition"}
Kpc applies only when the solute has the same molecular form in both solvents (no dissociation or dimerisation).
:::

## Exam tips

:::exam-tip{title="Which papers"}
ZIMSEC Paper 3 (Section A or D) and Paper 4 planning; Cambridge Paper 4 and Paper 5 (planning an extraction). Calculations usually give masses and volumes, so convert to concentrations first.
:::

:::exam-tip{title="Command words"}
*Define* Kpc: ratio of equilibrium concentrations in two immiscible solvents, same molecular state, given temperature. *Calculate*: show concentrations in each layer. *Explain* why two extractions are better: show both calculations and compare the mass extracted. *Suggest* how Kpc changes with a different solute: compare its intermolecular forces with those of the solvents.
:::

## Summary

:::summary
- Kpc = [X] in solvent A ÷ [X] in solvent B at equilibrium, at a given temperature, same molecular state.
- Use concentrations (mass or amount ÷ volume), and say which solvent is on top.
- Mass left after one extraction: m₀ × V_aq/(V_aq + Kpc × V_org); repeat the factor for each fresh portion.
- Several small extractions remove more than one large one with the same total volume.
- Non-polar solutes favour non-polar solvents (large Kpc organic/water); partition underlies chromatography.
:::
