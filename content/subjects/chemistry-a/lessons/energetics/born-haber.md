---
{
  "key": "energetics.born-haber",
  "title": "Lattice energy and Born-Haber cycles",
  "summary": "Define enthalpy change of atomisation, electron affinity and lattice energy, build Born-Haber cycles for ionic solids and calculate any missing term, and explain how ionic charge and radius affect lattice energy.",
  "concepts": ["achem.energetics.born-haber"],
  "estimatedMinutes": 45,
  "level": "core"
}
---
## Introduction

Why is magnesium oxide, used to line furnaces and kilns, solid up to about 2800 °C, while sodium chloride melts at about 800 °C? Both are ionic, but the forces holding their lattices together are very different in size. The quantity that measures this is the **lattice energy**. It cannot be measured directly, because you cannot collect a mole of separate gaseous ions and let them crash together, so it is found with a Hess cycle built specially for ionic solids: the **Born-Haber cycle**.

You need Hess's law, enthalpy change of formation, ionisation energies and the structure of ionic lattices before starting.

## Key definitions

:::definition{term="Standard enthalpy change of atomisation, ΔH⦵at"}
The enthalpy change when one mole of gaseous atoms is formed from the element in its standard state under standard conditions. Always endothermic. For chlorine: $\ce{1/2Cl2(g) -> Cl(g)}$, which is half the Cl–Cl bond energy.
:::

:::definition{term="First electron affinity, EA₁"}
The enthalpy change when each atom in one mole of gaseous atoms gains one electron to form one mole of gaseous 1− ions: $\ce{Cl(g) + e- -> Cl-(g)}$.
:::

:::definition{term="Second electron affinity, EA₂"}
The enthalpy change when each ion in one mole of gaseous 1− ions gains one electron to form one mole of gaseous 2− ions: $\ce{O-(g) + e- -> O^2-(g)}$.
:::

:::definition{term="Lattice energy, ΔH⦵latt"}
The enthalpy change when one mole of an ionic compound is formed from its gaseous ions under standard conditions: $\ce{Na+(g) + Cl-(g) -> NaCl(s)}$. Lattice energy is always exothermic (negative).
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards define lattice energy as formation of the solid from gaseous ions (negative values). For Cambridge this lesson is A Level only (Paper 4); ZIMSEC teaches it in Form 5 and uses the term *charge density* for the combined effect of charge and size.
:::

## Electron affinities

First electron affinities of most non-metals are **exothermic**: the incoming electron is attracted by the nucleus. The values become less exothermic down Group 17 from chlorine to iodine (and down Group 16 from sulfur), because the electron is added to a shell further from the nucleus with more shielding. Fluorine is an exception: its EA₁ is less exothermic than chlorine's, because the small 2p sub-shell is crowded and repulsion between electrons is large.

The **second** electron affinity is always **endothermic**: an electron is being added to a negative ion, which repels it, so energy must be supplied. For oxygen EA₁ is about −141 and EA₂ about +798 kJ mol⁻¹, so forming $\ce{O^2-(g)}$ from $\ce{O(g)}$ needs about +657 kJ mol⁻¹ overall. Oxides still form because the very large lattice energy of a lattice containing 2− ions more than pays for this.

## Building a Born-Haber cycle

The cycle links two routes from the elements to the solid:

- the **direct route**: ΔH⦵f of the compound;
- the **indirect route**: atomise each element, ionise the metal atoms, add electrons to the non-metal atoms, then let the gaseous ions form the lattice.

| Step | Process for NaCl | Sign |
|---|---|---|
| 1 | atomisation of sodium: $\ce{Na(s) -> Na(g)}$ | + |
| 2 | first ionisation energy of sodium: $\ce{Na(g) -> Na+(g) + e-}$ | + |
| 3 | atomisation of chlorine: $\ce{1/2Cl2(g) -> Cl(g)}$ | + |
| 4 | first electron affinity of chlorine: $\ce{Cl(g) + e- -> Cl-(g)}$ | − |
| 5 | lattice energy: $\ce{Na+(g) + Cl-(g) -> NaCl(s)}$ | − |

By Hess's law, ΔH⦵f = sum of steps 1 to 5, so

$$
\Delta H^\ominus_\mathrm{latt} = \Delta H^\ominus_\mathrm{f} - (\text{sum of the other terms})
$$

On paper the cycle is drawn as an energy level diagram: endothermic steps go up, exothermic steps go down, and the elements sit on the zero line.

![Born-Haber cycle for sodium chloride as an energy level diagram: from the elements at 0 the steps go up by +107 (atomisation of sodium), +494 (first ionisation energy of sodium) and +121 (atomisation of chlorine) to +722 kJ per mole, then down by 349 (electron affinity of chlorine) to the gaseous ions at +373, and finally down by 784 (lattice energy) to NaCl at −411, the same as the enthalpy of formation.](media:diagrams/born-haber-nacl.png "Figure: Born-Haber cycle for NaCl (kJ per mole); the lattice energy is the step that completes the loop to ΔHf")

:::worked-solution[Example 1: lattice energy of sodium chloride]
Data / kJ mol⁻¹: ΔH⦵f(NaCl) −411; ΔH⦵at(Na) +107; IE₁(Na) +494; ΔH⦵at(Cl) +121; EA₁(Cl) −349.

1. Sum of the steps from the elements to the gaseous ions: $107 + 494 + 121 + (-349) = +373$ kJ.
2. $\Delta H^\ominus_\mathrm{latt} = -411 - (+373) = -784\ \text{kJ mol}^{-1}$.
:::

:::worked-solution[Example 2: lattice energy of magnesium oxide]
Data / kJ mol⁻¹: ΔH⦵f(MgO) −602; ΔH⦵at(Mg) +148; IE₁(Mg) +736; IE₂(Mg) +1450; ΔH⦵at(O) +249; EA₁(O) −141; EA₂(O) +798.

1. Both ionisation energies are needed to make $\ce{Mg^2+}$, and both electron affinities to make $\ce{O^2-}$.
2. Sum: $148 + 736 + 1450 + 249 - 141 + 798 = +3240$ kJ.
3. $\Delta H^\ominus_\mathrm{latt} = -602 - 3240 = -3842\ \text{kJ mol}^{-1}$, about five times that of NaCl.
:::

:::example{title="Example 3: a compound such as CaCl₂"}
For a formula with two anions, every chlorine term doubles: atomisation of chlorine is $2 \times \Delta H^\ominus_\mathrm{at}(\ce{Cl})$ (one mole of $\ce{Cl2}$ gives two moles of atoms) and the electron affinity term is $2 \times EA_1(\ce{Cl})$. The calcium terms are ΔH⦵at(Ca), IE₁ and IE₂. Forgetting to double the anion terms is the most common error in these cycles.
:::

## What decides the size of the lattice energy

Lattice energy measures the electrostatic attraction between oppositely charged ions in the lattice. The attraction is larger when:

1. **The ionic charges are larger.** The force depends on the product of the charges, so $\ce{Mg^2+}$ with $\ce{O^2-}$ (2 × 2) gives a far more exothermic lattice energy than $\ce{Na+}$ with $\ce{Cl-}$ (1 × 1).
2. **The ions are smaller.** Smaller ions pack with their centres closer together, so the attraction is stronger. Lattice energies become less exothermic down a group: LiF > NaF > KF, and NaF > NaCl > NaBr > NaI.

Together these are summarised as **charge density** (charge divided by size): ions with a high charge density give large lattice energies.

| Pair compared | More exothermic lattice energy | Reason |
|---|---|---|
| NaCl, MgO | MgO | both ions doubly charged and smaller |
| NaF, NaI | NaF | F⁻ is much smaller than I⁻ |
| KCl, CaCl₂ (per formula) | CaCl₂ | Ca²⁺ has twice the charge and is smaller than K⁺ |

Large lattice energies explain high melting points (MgO, Al₂O₃) and help explain solubility trends (the next lesson) and the thermal stability of Group 2 carbonates.

## Common mistakes

:::mistake{title="Calling the atomisation of chlorine the bond energy"}
ΔH⦵at(Cl) forms one mole of Cl atoms, so it is half the Cl–Cl bond energy.
:::

:::mistake{title="Using one electron affinity for the oxide ion"}
$\ce{O^2-}$ needs EA₁ (exothermic) and EA₂ (endothermic). Leaving out EA₂ gives a lattice energy that is far too small in magnitude.
:::

:::mistake{title="Sign of lattice energy"}
With the formation definition, lattice energy is negative. A positive value means you have described lattice dissociation.
:::

:::mistake{title="Saying larger ions attract more"}
Larger ions have their charges further apart, so the attraction is weaker and the lattice energy less exothermic.
:::

## Exam tips

:::exam-tip{title="Which papers"}
ZIMSEC Papers 1-3 (definitions, cycle calculations, trends). Cambridge Paper 4 (A Level): construct a cycle, calculate a missing term, explain trends using charge and radius. Paper 1 can ask which equation represents a defined term.
:::

:::exam-tip{title="Command words"}
*Define*: one mole, gaseous ions or atoms, standard conditions. *Construct* a cycle: show every species with state symbols and electrons. *Calculate*: list each term with its sign and multiplier before adding. *Explain* a difference in lattice energy: name both factors (charge and ionic radius) and link them to the strength of attraction between ions.
:::

## Summary

:::summary
- Atomisation: one mole of gaseous atoms from the element; always endothermic.
- EA₁ usually exothermic; EA₂ always endothermic because of repulsion by the negative ion.
- Lattice energy: one mole of solid formed from gaseous ions; always exothermic.
- ΔH⦵latt = ΔH⦵f − (atomisations + ionisation energies + electron affinities), with every term multiplied up for the formula.
- Higher charge and smaller ions (higher charge density) give more exothermic lattice energies.
:::
