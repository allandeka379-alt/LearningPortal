---
{
  "key": "energetics.solution-hydration",
  "title": "Enthalpies of solution and hydration",
  "summary": "Define the enthalpy changes of hydration and solution, use the energy cycle that links them to lattice energy, and explain how ionic charge and radius affect hydration enthalpy and whether a salt dissolves exothermically or endothermically.",
  "concepts": ["achem.energetics.solution-hydration"],
  "estimatedMinutes": 35,
  "level": "core"
}
---
## Introduction

Dissolve anhydrous magnesium chloride in water and the beaker warms; dissolve ammonium nitrate, a common fertiliser in Zimbabwe, and it turns cold enough to be used in instant cold packs. In both cases an ionic lattice is pulled apart and the ions are surrounded by water molecules. Whether the beaker warms or cools depends on the balance between two large energy terms: the **lattice energy** that has to be overcome and the **hydration enthalpies** released as water molecules cluster around the ions.

You should know how to build a Born-Haber cycle, what lattice energy means, and that water molecules are polar (δ− on oxygen, δ+ on hydrogen).

## Key definitions

:::definition{term="Standard enthalpy change of hydration, ΔH⦵hyd"}
The enthalpy change when one mole of a specified gaseous ion dissolves in enough water to form an infinitely dilute solution under standard conditions, for example $\ce{Na+(g) + aq -> Na+(aq)}$. Always exothermic.
:::

:::definition{term="Standard enthalpy change of solution, ΔH⦵sol"}
The enthalpy change when one mole of an ionic solid dissolves in enough water to form an infinitely dilute solution under standard conditions, for example $\ce{NaCl(s) + aq -> Na+(aq) + Cl-(aq)}$. It can be exothermic or endothermic.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards need these definitions and the cycle. For Cambridge this is A Level only (Paper 4); ZIMSEC teaches it in Form 5. Using the cycle to explain the solubility of Group 2 hydroxides and sulfates is covered in the Group 2 lesson.
:::

## Why hydration is exothermic

When a gaseous ion enters water, polar water molecules arrange themselves around it:

- around a **cation**, the δ− oxygen atoms point towards the ion;
- around an **anion**, the δ+ hydrogen atoms point towards the ion.

These **ion-dipole attractions** release energy, so every hydration enthalpy is negative. Some cations, such as $\ce{Mg^2+}$, also form dative bonds with water, giving the complex ion $\ce{[Mg(H2O)6]^2+}$.

### Charge and radius

Hydration enthalpy becomes **more exothermic** when the ion has a **larger charge** or a **smaller radius** (a higher charge density), because water molecules are attracted more strongly and get closer to the ion.

| Ion | Charge | Relative size | ΔH⦵hyd / kJ mol⁻¹ (data) |
|---|---|---|---|
| $\ce{Li+}$ | 1+ | smallest Group 1 ion here | −519 |
| $\ce{Na+}$ | 1+ | larger | −406 |
| $\ce{K+}$ | 1+ | larger still | −322 |
| $\ce{Mg^2+}$ | 2+ | similar in size to $\ce{Li+}$ | −1921 |
| $\ce{Ca^2+}$ | 2+ | larger than $\ce{Mg^2+}$ | −1577 |
| $\ce{F-}$ | 1− | smallest halide ion | −506 |
| $\ce{Cl-}$ | 1− | larger | −364 |
| $\ce{I-}$ | 1− | largest | −293 |

The doubly charged ions have hydration enthalpies about four times those of singly charged ions of similar size.

## The energy cycle

Imagine dissolving in two steps: first break the lattice into gaseous ions (the reverse of lattice energy, so $-\Delta H_\mathrm{latt}$, endothermic), then hydrate each gaseous ion (exothermic). By Hess's law:

![Enthalpy cycles for dissolving: for NaCl the lattice must be broken (+787 kJ per mol) and the ions hydrated (-406 + -364 = -770), so the enthalpy of solution is +17, slightly endothermic; for MgCl2 breaking the lattice costs +2526 and hydration gives -1921 + 2(-364) = -2649, so the enthalpy of solution is -123, exothermic.](media:diagrams/solution-enthalpy-cycles.png "Figure: enthalpy of solution as lattice breaking plus hydration, for NaCl (+17) and MgCl₂ (−123 kJ mol⁻¹)")

$$
\Delta H_\mathrm{sol} = -\Delta H_\mathrm{latt} + \sum \Delta H_\mathrm{hyd}(\text{ions})
$$

Multiply each hydration enthalpy by the number of those ions in the formula. Because both terms are large and of opposite sign, $\Delta H_\mathrm{sol}$ is usually a small difference, positive or negative.

:::worked-solution[Example 1: sodium chloride]
Data / kJ mol⁻¹: ΔH⦵latt(NaCl) −787; ΔH⦵hyd(Na⁺) −406; ΔH⦵hyd(Cl⁻) −364.

1. Breaking the lattice: $+787$ kJ.
2. Hydrating the ions: $-406 + (-364) = -770$ kJ.
3. $\Delta H_\mathrm{sol} = 787 - 770 = +17\ \text{kJ mol}^{-1}$: slightly endothermic. Salt still dissolves readily because dissolving increases disorder (entropy), which Cambridge students meet in the Gibbs energy lesson.
:::

:::worked-solution[Example 2: magnesium chloride]
Data / kJ mol⁻¹: ΔH⦵latt(MgCl₂) −2526; ΔH⦵hyd(Mg²⁺) −1921; ΔH⦵hyd(Cl⁻) −364.

1. Breaking the lattice: $+2526$ kJ.
2. Hydrating the ions: $-1921 + 2 \times (-364) = -2649$ kJ (two chloride ions).
3. $\Delta H_\mathrm{sol} = 2526 - 2649 = -123\ \text{kJ mol}^{-1}$: exothermic, so the solution warms.
:::

:::example{title="Example 3: reading the cycle the other way"}
If ΔH⦵sol and the lattice energy are measured or known, the same cycle gives a missing hydration enthalpy: $\Delta H_\mathrm{hyd}(\text{anion}) = \Delta H_\mathrm{sol} + \Delta H_\mathrm{latt} - \Delta H_\mathrm{hyd}(\text{cation})$. This is how single-ion values are built up from one reference ion.
:::

## Exothermic or endothermic dissolving

| If… | then ΔH⦵sol is… | what you observe |
|---|---|---|
| total hydration enthalpy is larger in magnitude than the lattice energy | negative | solution warms |
| lattice energy is larger in magnitude than the total hydration enthalpy | positive | solution cools |

Changing the ions affects **both** terms. A smaller cation increases the magnitude of the lattice energy and of its own hydration enthalpy, so predicting the sign needs numbers, not just trends. In the Group 2 lesson you will see that for sulfates the lattice energy changes little down the group (the large sulfate ion dominates the spacing) while hydration enthalpy falls, so solubility decreases.

## Common mistakes

:::mistake{title="Adding the lattice energy with its own sign"}
Dissolving breaks the lattice, so the lattice term enters as $-\Delta H_\mathrm{latt}$ (positive). Adding −787 instead of +787 gives a hugely negative and wrong answer.
:::

:::mistake{title="Forgetting the formula"}
In $\ce{MgCl2}$ there are two chloride ions, so the chloride hydration enthalpy is doubled.
:::

:::mistake{title="Saying hydrogen atoms surround cations"}
Cations attract the δ− oxygen end of water; anions attract the δ+ hydrogen end.
:::

:::mistake{title="Confusing solution and hydration"}
Hydration starts from gaseous ions; solution starts from the solid lattice.
:::

## Exam tips

:::exam-tip{title="Which papers"}
ZIMSEC Papers 1-3 and Cambridge Paper 4 (A Level): definitions, the cycle drawn or described, a missing term calculated, and explanations of trends in hydration enthalpy.
:::

:::exam-tip{title="Command words"}
*Define*: one mole, gaseous ion (hydration) or solid (solution), infinitely dilute solution, standard conditions. *Calculate*: write $\Delta H_\mathrm{sol} = -\Delta H_\mathrm{latt} + \sum\Delta H_\mathrm{hyd}$ first. *Explain* a trend: charge and radius, so the attraction between the ion and the water dipoles.
:::

## Summary

:::summary
- ΔH⦵hyd: one mole of gaseous ions into water; always exothermic (ion-dipole attraction).
- ΔH⦵sol: one mole of solid into water; can be either sign.
- ΔH⦵sol = −ΔH⦵latt + ΣΔH⦵hyd, multiplying for the number of each ion.
- Higher charge and smaller radius give more exothermic hydration.
- The sign of ΔH⦵sol depends on the balance between two large terms.
:::
