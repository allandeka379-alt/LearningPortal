---
{
  "key": "amines.preparation-basicity",
  "title": "Amines: preparation and basicity",
  "summary": "Primary, secondary and tertiary amines; making amines from halogenoalkanes with ammonia or amines, and by reducing nitriles and amides; amines as bases; why ethylamine is a stronger base than ammonia and phenylamine a weaker one; salts with acids; condensation with acyl chlorides.",
  "concepts": ["achem.amines.preparation-basicity"],
  "estimatedMinutes": 50,
  "level": "core"
}
---
## Introduction

The fishy smell of fish that is no longer fresh comes from small amines such as trimethylamine. Squeezing lemon juice over fish reduces the smell: the citric acid converts the volatile amine into a non-volatile salt. This simple kitchen chemistry shows the key property of amines: like ammonia, they are bases. Amines are also building blocks for dyes, medicines (many drugs are sold as their hydrochloride salts because the salts dissolve in water) and nylon.

This lesson covers how amines are classified and made, and why their basic strength varies. You should know the reactions of halogenoalkanes, nitriles and acyl chlorides, the Brønsted-Lowry theory of acids and bases, and the inductive effect.

## Key definitions

:::definition{term="Amine"}
A compound derived from ammonia by replacing one or more hydrogen atoms with alkyl or aryl groups.
:::

:::definition{term="Primary, secondary and tertiary amine"}
An amine in which the nitrogen atom is bonded to one, two or three carbon groups respectively: $\ce{RNH2}$, $\ce{R2NH}$, $\ce{R3N}$.
:::

:::definition{term="Brønsted-Lowry base"}
A proton (H⁺) acceptor; amines accept a proton using the lone pair on nitrogen.
:::

:::keyfact{title="Order of base strength"}
phenylamine < ammonia < ethylamine. pKb values (data): phenylamine 9.38, ammonia 4.75, ethylamine 3.27 (smaller pKb = stronger base).
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards: preparation and the explanation of relative basicity. Cambridge: A Level (AS examines only amine formation from halogenoalkanes); naming secondary and tertiary amines is not required. ZIMSEC: Form 6; Kb, pKb and pOH calculations for amine solutions are ZIMSEC only.
:::

## Naming and classifying

Primary amines are named with the suffix **-amine** on the alkyl group (ethylamine, $\ce{CH3CH2NH2}$) or as amino-alkanes when the position matters (2-aminopropane or propan-2-amine, $\ce{CH3CH(NH2)CH3}$). The aromatic amine $\ce{C6H5NH2}$ is phenylamine (aniline). $\ce{(CH3)2NH}$ (dimethylamine) is a secondary amine and $\ce{(CH3)3N}$ (trimethylamine) a tertiary amine. Note that propan-2-amine is a **primary** amine: the class depends on the number of carbon groups on nitrogen, not on the carbon atom carrying it.

## Making amines

| Method | Reagent and conditions | Example |
|---|---|---|
| halogenoalkane + ammonia | excess $\ce{NH3}$ in ethanol, heat in a sealed tube (under pressure) | $\ce{CH3CH2Br + 2NH3 -> CH3CH2NH2 + NH4Br}$ |
| halogenoalkane + primary amine | primary amine in ethanol, heat in a sealed tube | $\ce{CH3CH2Br + 2CH3CH2NH2 -> (CH3CH2)2NH + CH3CH2NH3+Br-}$ |
| reduction of a nitrile | $\ce{LiAlH4}$ in dry ether, or $\ce{H2}$ with a Ni catalyst | $\ce{CH3CN + 4[H] -> CH3CH2NH2}$ |
| reduction of an amide | $\ce{LiAlH4}$ in dry ether | $\ce{CH3CONH2 + 4[H] -> CH3CH2NH2 + H2O}$ |

The halogenoalkane route gives a **mixture**: the amine product still has a lone pair, so it is itself a nucleophile and attacks more halogenoalkane, giving secondary and tertiary amines and finally a quaternary ammonium salt. A large excess of ammonia makes it more likely that the halogenoalkane meets an ammonia molecule, so the primary amine is the main product. The sealed tube keeps volatile ammonia in the mixture at the reaction temperature.

The nitrile route gives a pure primary amine and adds a carbon if the nitrile was made from a halogenoalkane with KCN: bromoethane → propanenitrile → propylamine.

:::worked-solution[Example 1: ethylamine from ethanenitrile]
4.10 g of ethanenitrile, $\ce{CH3CN}$, is reduced completely with $\ce{LiAlH4}$. Calculate the maximum mass of ethylamine formed. $M_\text{r}$: ethanenitrile 41, ethylamine 45.

1. n($\ce{CH3CN}$) = 4.10 ÷ 41 = 0.100 mol.
2. $\ce{CH3CN + 4[H] -> CH3CH2NH2}$ is 1 : 1, so n(ethylamine) = 0.100 mol.
3. Mass = 0.100 × 45 = 4.50 g.
:::

## Amines as bases

The lone pair on nitrogen accepts a proton from water or from an acid:

$\ce{CH3CH2NH2 + H2O <=> CH3CH2NH3+ + OH-}$ (aqueous ethylamine is alkaline)

$\ce{CH3CH2NH2 + HCl -> CH3CH2NH3+Cl-}$ (ethylammonium chloride, a white ionic salt)

Salts are soluble, non-volatile and odourless. Adding a strong base such as NaOH(aq) releases the free amine again: $\ce{CH3CH2NH3+ + OH- -> CH3CH2NH2 + H2O}$.

## Explaining relative basicity

The more available the lone pair on nitrogen, the more readily it accepts a proton, and the stronger the base.

| Base | Structure feature | Effect on N lone pair | Base strength |
|---|---|---|---|
| ethylamine, $\ce{CH3CH2NH2}$ | ethyl group donates electron density to N (positive inductive effect) | more available; the cation $\ce{CH3CH2NH3+}$ is also stabilised | strongest |
| ammonia, $\ce{NH3}$ | only H atoms on N | reference | intermediate |
| phenylamine, $\ce{C6H5NH2}$ | lone pair overlaps with the ring's delocalised π system | less available (partly delocalised into the ring) | weakest |

:::example{title="Example 2: ranking bases"}
Arrange ammonia, methylamine and phenylamine in order of increasing base strength, and explain.

1. Phenylamine is the weakest: the nitrogen lone pair is partly delocalised into the benzene ring, so it is less available to accept a proton.
2. Ammonia is next: nothing increases or decreases the availability of its lone pair.
3. Methylamine is the strongest: the methyl group donates electron density towards nitrogen, increasing the electron density of the lone pair and stabilising the methylammonium ion.
4. Order: phenylamine < ammonia < methylamine.
:::

:::worked-solution[Example 3: pH of an ethylamine solution (ZIMSEC)]
Calculate the pH of 0.150 mol dm⁻³ ethylamine. Data: pKb = 3.27; pKw = 14.00.

1. Kb = 10⁻³·²⁷ = 5.37 × 10⁻⁴ mol dm⁻³.
2. Assume $[\ce{OH-}] = [\ce{CH3CH2NH3+}]$ and that the amine concentration stays 0.150 mol dm⁻³: $[\ce{OH-}] = \sqrt{K_\text{b} c} = \sqrt{5.37 \times 10^{-4} \times 0.150} = 8.98 \times 10^{-3}$ mol dm⁻³.
3. pOH = −log(8.98 × 10⁻³) = 2.05.
4. pH = 14.00 − 2.05 = 11.95.
:::

## Condensation with acyl chlorides

Primary and secondary amines react rapidly with acyl chlorides at room temperature to give N-substituted amides, with loss of HCl (removed by a second amine molecule):

$\ce{CH3COCl + 2CH3CH2NH2 -> CH3CONHCH2CH3 + CH3CH2NH3+Cl-}$

This is how the amide (peptide-type) link is made in the laboratory; see the amides lesson.

## Common mistakes

:::mistake{title="Classifying amines"}
Count the carbon groups on **nitrogen**. Propan-2-amine, $\ce{CH3CH(NH2)CH3}$, is primary.
:::

:::mistake{title="Delocalisation in phenylamine"}
The lone pair is delocalised **into the ring**; the ring does not "withdraw electrons by induction" as the main reason.
:::

:::mistake{title="Using too little ammonia"}
Without excess ammonia the halogenoalkane route gives a mixture of primary, secondary and tertiary amines and quaternary salts.
:::

:::mistake{title="NaBH₄ cannot reduce nitriles"}
Use LiAlH₄ (dry ether) or H₂/Ni to reduce nitriles and amides.
:::

## Exam tips

:::exam-tip{title="Where it is tested"}
Cambridge Paper 4 (amine formation from halogenoalkanes also Papers 1 and 2) and ZIMSEC Papers 1-3. *Explain* basicity in terms of lone-pair availability, naming the inductive effect or delocalisation; *state* reagents and conditions (excess ethanolic ammonia, heat, sealed tube); *explain* why a mixture forms.
:::

:::exam-tip{title="ZIMSEC calculations"}
For Kb questions use [OH⁻] = √(Kb c), then pOH and pH = 14 − pOH. Keep extra figures until the end.
:::

## Summary

:::summary
- Amines are primary, secondary or tertiary according to the number of carbon groups on N.
- Halogenoalkane + excess ethanolic NH₃ (heat, sealed tube) gives primary amines; with a primary amine it gives secondary amines; further substitution gives a mixture.
- Nitriles (LiAlH₄ or H₂/Ni) and amides (LiAlH₄) are reduced to amines.
- Amines are bases: the N lone pair accepts H⁺, forming salts with acids.
- Base strength: phenylamine (lone pair delocalised) < ammonia < ethylamine (electron-donating alkyl group).
:::
