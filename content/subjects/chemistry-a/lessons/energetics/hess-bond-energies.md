---
{
  "key": "energetics.hess-bond-energies",
  "title": "Hess's law and bond energy calculations",
  "summary": "Use Hess's law and energy cycles to find enthalpy changes that cannot be measured directly, from enthalpies of formation, enthalpies of combustion or two measured reactions, and estimate enthalpy changes from bond energies.",
  "concepts": ["achem.energetics.hess-bond-energies"],
  "estimatedMinutes": 45,
  "level": "core"
}
---
## Introduction

Some enthalpy changes cannot be measured in a calorimeter. Limestone from quarries near Bulawayo and Gweru is heated in kilns to make quicklime for cement, agriculture and water treatment, but you cannot simply heat calcium carbonate in a cup and read a thermometer: the reaction needs about 900 °C and never stops cleanly. Formation of propane from carbon and hydrogen does not happen at all as written. **Hess's law** gets round this: if you can find any other route between the same start and finish, the enthalpy change is the same.

You should be able to define the standard enthalpy changes of formation and combustion and calculate ΔH from calorimetry results before starting this lesson.

## Key definitions

:::definition{term="Hess's law"}
The total enthalpy change for a reaction is independent of the route taken, provided the initial and final conditions are the same.
:::

:::definition{term="Bond energy (bond enthalpy)"}
The energy needed to break one mole of a particular covalent bond in gaseous molecules, forming gaseous atoms or fragments. Bond breaking is endothermic; bond making releases the same energy.
:::

:::definition{term="Exact and average bond energies"}
An exact bond energy refers to one bond in one molecule (for example H–H in $\ce{H2}$). An average bond energy is the mean value for that bond over a range of compounds (for example C–H), so it only approximates the value in any particular molecule.
:::

:::formula{name="The three Hess routes"}
$$
\Delta H_\mathrm{r} = \sum \Delta H_\mathrm{f}(\text{products}) - \sum \Delta H_\mathrm{f}(\text{reactants})
$$

$$
\Delta H_\mathrm{r} = \sum \Delta H_\mathrm{c}(\text{reactants}) - \sum \Delta H_\mathrm{c}(\text{products})
$$

$$
\Delta H_\mathrm{r} \approx \sum E(\text{bonds broken}) - \sum E(\text{bonds made})
$$
:::

## Building an energy cycle

An energy cycle has three corners: the reactants, the products, and a third set of substances that both can be linked to.

- **Formation data:** the third corner is the **elements**. Arrows go from the elements up (or down) to both reactants and products. Going reactants → elements reverses their formation, so their ΔHf values change sign.
- **Combustion data:** the third corner is the **combustion products** (carbon dioxide and water). Arrows go from both reactants and products down to them. Going combustion products → products reverses the products' combustion.

In both cases multiply each value by the number of moles in the equation, and remember that ΔHf of an element in its standard state is zero.

![Hess cycle for the formation of propane from combustion data: carbon and hydrogen burn directly to 3CO2 and 4H2O with a total of −2326 kJ (3 × −394 plus 4 × −286), while propane burns to the same products with −2219 kJ, so the enthalpy of formation of propane is −2326 − (−2219) = −107 kJ per mole.](media:diagrams/hess-cycle-propane-combustion.png "Figure: energy cycle using combustion data; the enthalpy of formation is the difference between the two routes")

:::worked-solution[Example 1: from enthalpies of formation]
Find ΔH for $\ce{2NaHCO3(s) -> Na2CO3(s) + CO2(g) + H2O(l)}$.
Data: ΔH⦵f / kJ mol⁻¹: $\ce{NaHCO3(s)}$ −951; $\ce{Na2CO3(s)}$ −1131; $\ce{CO2(g)}$ −394; $\ce{H2O(l)}$ −286.

1. Sum for products: $(-1131) + (-394) + (-286) = -1811$ kJ.
2. Sum for reactants: $2 \times (-951) = -1902$ kJ.
3. $\Delta H = -1811 - (-1902) = +91\ \text{kJ mol}^{-1}$: the decomposition is endothermic, which is why baking soda only gives off carbon dioxide when heated.
:::

:::worked-solution[Example 2: from enthalpies of combustion]
Find ΔH⦵f of propane: $\ce{3C(s) + 4H2(g) -> C3H8(g)}$.
Data: ΔH⦵c / kJ mol⁻¹: C(s) −394; $\ce{H2(g)}$ −286; $\ce{C3H8(g)}$ −2219.

1. Both sides can burn to $\ce{3CO2 + 4H2O}$.
2. Reactants route: $3 \times (-394) + 4 \times (-286) = -2326$ kJ.
3. Products route: $-2219$ kJ, so going from the combustion products back to propane is $+2219$ kJ.
4. $\Delta H^\ominus_\mathrm{f} = -2326 + 2219 = -107\ \text{kJ mol}^{-1}$.
:::

### Two measured reactions

Calcium carbonate's decomposition, $\ce{CaCO3(s) -> CaO(s) + CO2(g)}$, can be found from two reactions you can do in a polystyrene cup, both with excess hydrochloric acid:

| Reaction | ΔH measured / kJ mol⁻¹ |
|---|---|
| $\ce{CaCO3(s) + 2HCl(aq) -> CaCl2(aq) + CO2(g) + H2O(l)}$ | −16 |
| $\ce{CaO(s) + 2HCl(aq) -> CaCl2(aq) + H2O(l)}$ | −194 |

:::worked-solution[Example 3: combining two measured reactions]
1. Route: $\ce{CaCO3}$ → (with acid) $\ce{CaCl2(aq) + CO2 + H2O}$, then the reverse of the calcium oxide reaction gives $\ce{CaO + 2HCl}$ (with the $\ce{CO2}$ still there).
2. $\Delta H = \Delta H_1 - \Delta H_2 = -16 - (-194) = +178\ \text{kJ mol}^{-1}$.
3. The acid and the water cancel because they appear on both routes.
:::

## Bond energies

Every reaction can be imagined as breaking all the bonds in the reactants (endothermic) and then forming all the bonds in the products (exothermic). Count only bonds that actually change if you like: bonds that are the same on both sides cancel.

:::worked-solution[Example 4: hydrogenation of ethene with average bond energies]
$\ce{CH2=CH2(g) + H2(g) -> CH3CH3(g)}$. Bond energies / kJ mol⁻¹: C=C 610, H–H 436, C–C 350, C–H 410.

1. Bonds broken: one C=C and one H–H: $610 + 436 = 1046$ kJ (the four C–H bonds of ethene are unchanged).
2. Bonds made: one C–C and two new C–H: $350 + 2 \times 410 = 1170$ kJ.
3. $\Delta H = 1046 - 1170 = -124\ \text{kJ mol}^{-1}$.
4. From formation data (ethene +52.2, ethane −84.0 kJ mol⁻¹) the value is $-84.0 - 52.2 = -136.2$ kJ mol⁻¹. The bond-energy estimate differs because C–H, C–C and C=C are average values, not the exact values in these two molecules.
:::

:::worked-solution[Example 5: hydrogen chloride with exact bond energies]
$\ce{H2(g) + Cl2(g) -> 2HCl(g)}$. Exact bond energies / kJ mol⁻¹: H–H 436, Cl–Cl 242, H–Cl 431.

1. Broken: $436 + 242 = 678$ kJ. Made: $2 \times 431 = 862$ kJ.
2. $\Delta H = 678 - 862 = -184\ \text{kJ mol}^{-1}$, so ΔHf(HCl) $= -92$ kJ mol⁻¹.
3. This matches the formation value (−92.3 kJ mol⁻¹) closely: all species are gases and the values are exact for these diatomic molecules.
:::

### Why bond-energy answers differ from cycle answers

1. **Average values.** Most bond energies are averaged over many compounds.
2. **States.** Bond energies apply to gases. If a reactant or product is a liquid or solid (for example water formed as $\ce{H2O(l)}$ in a combustion), the energy of the intermolecular forces is not included, so the estimate is usually less exothermic than the measured value.

## Common mistakes

:::mistake{title="Forgetting to multiply by the coefficients"}
Every ΔHf, ΔHc or bond energy is multiplied by the number of moles (or bonds) in the balanced equation.
:::

:::mistake{title="Products minus reactants for combustion data"}
With combustion data it is reactants minus products, because the arrows in the cycle point down to the combustion products from both sides.
:::

:::mistake{title="Made minus broken"}
ΔH from bond energies is broken minus made. Reversing it gives the right size with the wrong sign.
:::

:::mistake{title="Giving an element a value"}
ΔHf of $\ce{O2(g)}$, $\ce{H2(g)}$ or C(graphite) is zero; leave them out of formation sums.
:::

## Exam tips

:::exam-tip{title="Which papers"}
ZIMSEC Papers 1-3 and Cambridge Papers 1 and 2: construct a cycle, calculate, and explain differences between bond-energy and cycle values. ZIMSEC Paper 4 and Cambridge Paper 3 may give two thermometric experiments to combine with Hess's law.
:::

:::exam-tip{title="Command words"}
*State* Hess's law: route independence, same initial and final conditions. *Construct* a cycle: label every arrow with its ΔH and moles. *Calculate*: write the sum with signs before evaluating it. *Explain* a discrepancy: average bond energies, and substances not gaseous in standard states.
:::

## Summary

:::summary
- Hess's law: ΔH is independent of route between the same start and finish.
- From formation: products minus reactants; from combustion: reactants minus products.
- Two measured reactions sharing a common product can be subtracted to give a third.
- Bond energies: ΔH ≈ bonds broken − bonds made, for gases.
- Bond-energy values are approximate: average values, and liquids or solids not allowed for.
:::
