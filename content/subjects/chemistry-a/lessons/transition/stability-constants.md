---
{
  "key": "transition.stability-constants",
  "title": "Stability constants of complex ions",
  "summary": "Kstab as the equilibrium constant for forming a complex from the aqua ion, writing Kstab expressions and units without water, stepwise and overall constants, calculations with Kstab, ligand exchange as competing equilibria, and why EDTA forms such stable complexes (the chelate effect).",
  "concepts": ["achem.transition.stability-constants"],
  "estimatedMinutes": 40,
  "level": "core"
}
---
## Introduction

A child with lead poisoning can be treated with an injection of a salt of EDTA. The EDTA⁴⁻ ion grabs the lead ions so tightly that the complex passes out of the body in the urine. The same ligand is used in some household cleaners to soften hard water by locking up calcium and magnesium ions.

Why does EDTA win against water, which surrounds every metal ion in the body in vast excess? The answer lies in the **stability constant**, the equilibrium constant for forming a complex. This lesson shows how to write Kstab, how to calculate with it and how to use it to predict ligand exchange. You should know how to write Kc expressions and units, and how ligand exchange works in copper(II) and cobalt(II) complexes.

## Key definitions

:::definition{term="Stability constant, Kstab"}
The equilibrium constant for the formation of a complex ion in a solvent from its constituent (aqua) metal ion and ligands.
:::

:::definition{term="Stepwise stability constant"}
The equilibrium constant for replacing one more ligand in a complex (K₁ for the first ligand, K₂ for the second, and so on).
:::

:::definition{term="Chelate effect"}
The extra stability of complexes formed by bidentate or polydentate (chelating) ligands compared with similar complexes of monodentate ligands, caused mainly by an increase in entropy.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards: defining Kstab, writing expressions (water left out) and units, calculations, and using Kstab values to explain ligand exchange (Cambridge A Level, Paper 4; ZIMSEC Form 6). The chelate effect of EDTA is needed in outline only.
:::

## Writing Kstab

For the formation of the deep blue copper ammine complex:

$$
\ce{[Cu(H2O)6]^2+(aq) + 4NH3(aq) <=> [Cu(NH3)4(H2O)2]^2+(aq) + 4H2O(l)}
$$

$$
K_\mathrm{stab} = \frac{[\ce{[Cu(NH3)4(H2O)2]^2+}]}{[\ce{[Cu(H2O)6]^2+}]\,[\ce{NH3}]^4}
$$

Water is **not** included. It is the solvent, present in huge excess, so its concentration is effectively constant and is absorbed into the value of Kstab. Units follow as for Kc:

$$
\frac{\text{mol dm}^{-3}}{(\text{mol dm}^{-3})(\text{mol dm}^{-3})^4} = \text{dm}^{12}\ \text{mol}^{-4}
$$

A complex formed with *n* ligands has units of dm³ⁿ mol⁻ⁿ.

## Stepwise and overall constants

Ligands are replaced one at a time, and each step has its own constant K₁, K₂, K₃, K₄. The **overall** stability constant is the product of the stepwise constants:

$$
K_\mathrm{stab} = K_1 \times K_2 \times K_3 \times K_4
$$

Because the values are so large, they are often given as $\lg K_\mathrm{stab}$, and the overall $\lg K_\mathrm{stab}$ is the sum of the stepwise $\lg K$ values.

## What the values mean

| Complex (formed from the aqua ion) | lg Kstab (data) | Kstab |
|---|---|---|
| $\ce{[CuCl4]^2-}$ | 5.6 | 4.0 × 10⁵ dm¹² mol⁻⁴ |
| $\ce{[Cu(NH3)4(H2O)2]^2+}$ | 13.1 | 1.3 × 10¹³ dm¹² mol⁻⁴ |
| $\ce{[Cu(EDTA)]^2-}$ | 18.8 | 6.3 × 10¹⁸ dm³ mol⁻¹ |

The larger Kstab, the further the formation equilibrium lies to the right and the more **stable** the complex. All three are more stable than the aqua ion; the EDTA complex is the most stable.

:::worked-solution[Example 1: how much copper is complexed?]
A solution contains copper(II) ions and ammonia; at equilibrium $[\ce{NH3}] = 0.10\ \text{mol dm}^{-3}$. Using $K_\mathrm{stab} = 1.3 \times 10^{13}\ \text{dm}^{12}\ \text{mol}^{-4}$, find the ratio of the ammine complex to the aqua ion.

1. Rearrange the expression: $\dfrac{[\ce{[Cu(NH3)4(H2O)2]^2+}]}{[\ce{[Cu(H2O)6]^2+}]} = K_\mathrm{stab} \times [\ce{NH3}]^4$.
2. Substitute: $1.3 \times 10^{13} \times (0.10)^4 = 1.3 \times 10^{13} \times 1.0 \times 10^{-4}$.
3. Ratio $= 1.3 \times 10^{9}$.
4. Practically all the copper is present as the deep blue complex, even though the ammonia concentration is quite low.
:::

## Ligand exchange as competing equilibria

When two ligands compete for the same metal ion, the complex with the larger Kstab forms preferentially (if the ligand concentrations are similar). This explains the order of the copper(II) reactions:

1. Pale blue $\ce{[Cu(H2O)6]^2+}$ + concentrated HCl gives yellow $\ce{[CuCl4]^2-}$, but only with a large excess of chloride, because Kstab is modest (4.0 × 10⁵). Adding water reverses it easily.
2. Ammonia replaces water readily and the deep blue complex is not reversed by dilution, because Kstab is much larger (1.3 × 10¹³).
3. EDTA⁴⁻ replaces ammonia: adding it to the deep blue solution turns it a paler blue as $\ce{[Cu(EDTA)]^2-}$ forms, because its Kstab is larger still.

:::example{title="Example 2: predicting an exchange"}
lg Kstab of $\ce{[Cu(EDTA)]^2-}$ (18.8) is much larger than that of $\ce{[Cu(NH3)4(H2O)2]^2+}$ (13.1). Predict what happens when Na₄EDTA solution is added to the deep blue copper ammine solution, and write an equation.

1. Both ligands compete for Cu²⁺; the complex with the larger Kstab is favoured.
2. EDTA⁴⁻ displaces the ammonia and water ligands:

$$
\ce{[Cu(NH3)4(H2O)2]^2+ + EDTA^4- -> [Cu(EDTA)]^2- + 4NH3 + 2H2O}
$$

3. The deep blue colour fades to the paler blue of the EDTA complex.
4. Note that a large Kstab says where the equilibrium lies, not how fast it is reached; in practice this exchange is fast.
:::

## The chelate effect (outline)

Compare the overall changes when ligands replace six water molecules:

| Reaction | Particles on the left | Particles on the right |
|---|---|---|
| $\ce{[Cu(H2O)6]^2+ + 4NH3 -> [Cu(NH3)4(H2O)2]^2+ + 4H2O}$ | 5 | 5 |
| $\ce{[Cu(H2O)6]^2+ + EDTA^4- -> [Cu(EDTA)]^2- + 6H2O}$ | 2 | 7 |

With EDTA the number of free particles increases, so the entropy of the system increases (ΔS positive). The bonds made and broken are similar (Cu-N and Cu-O replace Cu-O), so ΔH is small. With ΔS large and positive, ΔG = ΔH − TΔS is very negative and Kstab is very large. Polydentate ligands therefore form the most stable complexes. EDTA is used to treat heavy-metal poisoning, to soften water and to stop traces of metal ions spoiling foods and cosmetics.

## Common mistakes

:::mistake{title="Putting water in the Kstab expression"}
Water is the solvent; its concentration is constant and is left out. Only the complex, the aqua ion and the incoming ligand appear.
:::

:::mistake{title="Adding stepwise constants instead of multiplying"}
Overall Kstab = K₁ × K₂ × …. Only lg values are added.
:::

:::mistake{title="Using one unit for every Kstab"}
The units depend on the number of ligands: one EDTA gives dm³ mol⁻¹; four ammonia molecules give dm¹² mol⁻⁴.
:::

## Exam tips

:::exam-tip{title="Which papers"}
Cambridge Paper 4; ZIMSEC Papers 2 and 3 Section D, and Paper 1 items on reading Kstab values.
:::

:::exam-tip{title="Command words"}
*Define* Kstab using "equilibrium constant for the formation of a complex ion in a solvent from its constituent ions or molecules". *Write* the expression with square brackets for concentrations and no water, and give units. *Calculate* by rearranging the expression. *Explain* an exchange by comparing Kstab values: "the complex with the larger Kstab is more stable, so the ligand forming it displaces the other". *Explain* the stability of EDTA complexes with the increase in the number of particles (entropy).
:::

## Summary

:::summary
- Kstab is the equilibrium constant for forming a complex from the aqua ion and ligands; water is left out of the expression.
- Units are dm³ⁿ mol⁻ⁿ for n ligands; overall Kstab = product of the stepwise constants (lg values add).
- A larger Kstab means a more stable complex; Kstab × [L]ⁿ gives the ratio of complex to aqua ion.
- Ligand exchange is a competition: the ligand giving the larger Kstab wins (Cl⁻ < NH₃ < EDTA⁴⁻ for copper(II)).
- EDTA⁴⁻ (hexadentate) forms very stable complexes because releasing six water molecules increases the number of particles and the entropy (chelate effect).
:::
