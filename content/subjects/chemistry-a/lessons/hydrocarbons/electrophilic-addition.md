---
{
  "key": "hydrocarbons.electrophilic-addition",
  "title": "The electrophilic addition mechanism",
  "summary": "Step-by-step electrophilic addition of bromine to ethene and of hydrogen bromide to propene, described with curly arrows in words; the carbocation intermediate and evidence for it; inductive effects and carbocation stability; Markovnikov addition and predicting major and minor products.",
  "concepts": ["achem.hydrocarbons.electrophilic-addition"],
  "estimatedMinutes": 45,
  "level": "core"
}
---
## Introduction

When bromine water is shaken with an alkene, the orange colour disappears in seconds. That speed is a clue: the alkene's double bond is a region of concentrated negative charge that actively attracts electron-seeking species. Understanding exactly how the attack happens, and which intermediate forms, lets you predict the major product when an unsymmetrical alkene such as propene reacts. That prediction matters in industry, for example in deciding which alcohol is made when propene is hydrated.

You should already know the reagents for alkene additions, the σ and π bonds in C=C, what an electrophile is, the curly-arrow conventions and why tertiary carbocations are more stable than primary ones.

## Key definitions

:::definition{term="Electrophilic addition"}
An addition reaction in which the first step is attack by an electrophile on the electron-rich C=C bond, forming a carbocation intermediate that then combines with a negative ion.
:::

:::definition{term="Carbocation"}
An ion with a positively charged carbon atom that has only three bonds (six outer electrons).
:::

:::definition{term="Markovnikov's rule"}
When HX adds to an unsymmetrical alkene, the hydrogen atom attaches mainly to the carbon of the double bond that already carries more hydrogen atoms; this is because the more stable carbocation forms.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards: the mechanisms of Br₂ with ethene and HBr with propene, carbocation stability and major and minor products. "Describe" here means each arrow, each partial charge and the intermediate in words.
:::

## Why the C=C attracts electrophiles

The π bond lies above and below the plane of the molecule, away from the nuclei, so its electrons are exposed and form a region of high electron density. Electrophiles (electron-pair acceptors) such as $\ce{H^{\delta+}}$ in HBr or a polarised bromine molecule are attracted to it. Alkanes have no π bond, which is why they do not react this way.

## Bromine and ethene

A bromine molecule is non-polar, but as it approaches the π bond the high electron density repels the Br–Br bonding pair, **inducing a dipole**: the nearer bromine becomes $\delta+$ and the further one $\delta-$.

:::example{title="Example 1: the mechanism for ethene + bromine"}
| Step | Curly arrows (in words) | Result |
|---|---|---|
| 1 | An arrow from the C=C π bond to the δ+ bromine atom; an arrow from the Br–Br bond to the δ− bromine atom | The π electrons form a new C–Br bond; the Br–Br bond breaks heterolytically. A carbocation $\ce{CH2Br-CH2+}$ and a bromide ion $\ce{Br-}$ form |
| 2 | An arrow from a lone pair on $\ce{Br-}$ to the positive carbon | A second C–Br bond forms: 1,2-dibromoethane, $\ce{CH2BrCH2Br}$ |

Step 1 is slower: it disrupts the π bond and forms an unstable carbocation. Step 2 is a fast combination of oppositely charged ions.
:::

**Evidence for a two-step mechanism.** If ethene is bubbled into bromine water containing dissolved sodium chloride, the products include 1-bromo-2-chloroethane ($\ce{CH2BrCH2Cl}$) and 2-bromoethanol ($\ce{CH2BrCH2OH}$) as well as 1,2-dibromoethane. Chloride ions cannot start the reaction (they are not electrophiles), so they must be attacking an intermediate formed after the first bromine atom has added: the carbocation. Every product contains at least one bromine atom.

## Hydrogen bromide and propene

HBr is permanently polar, $\ce{H^{\delta+}-Br^{\delta-}}$. With an unsymmetrical alkene the H can add to either carbon of the double bond, giving two different carbocations.

:::example{title="Example 2: predicting the major product"}
Propene: $\ce{CH3-CH=CH2}$.

1. Arrow from the π bond to the δ+ hydrogen of HBr; arrow from the H–Br bond to the bromine atom, which leaves as $\ce{Br-}$.
2. **Route A**: H adds to the end carbon (CH₂). The positive charge is on the middle carbon: a **secondary** carbocation, $\ce{CH3-CH+-CH3}$, with two electron-donating methyl groups.
3. **Route B**: H adds to the middle carbon. The positive charge is on the end carbon: a **primary** carbocation, $\ce{CH3-CH2-CH2+}$, with only one alkyl group.
4. The secondary carbocation is more stable (charge better dispersed by the positive inductive effect of two alkyl groups), so it forms faster and route A dominates.
5. Arrow from a lone pair on $\ce{Br-}$ to the positive carbon. Major product: **2-bromopropane**, $\ce{CH3CHBrCH3}$. Minor product: 1-bromopropane, $\ce{CH3CH2CH2Br}$.
:::

The same reasoning applies to the hydration of propene (steam, $\ce{H3PO4}$ catalyst), where $\ce{H+}$ is the electrophile and water attacks the carbocation: the major product is propan-2-ol, the minor product propan-1-ol.

## Carbocation stability

| Carbocation type | Alkyl groups on C⁺ | Example | Stability |
|---|---|---|---|
| tertiary | 3 | $\ce{(CH3)3C+}$ | highest |
| secondary | 2 | $\ce{(CH3)2CH+}$ | intermediate |
| primary | 1 | $\ce{CH3CH2+}$ | lowest |

Alkyl groups release electron density through σ bonds towards the positive carbon (positive inductive effect). More alkyl groups spread the positive charge more, lowering the energy of the ion. A more stable carbocation forms through a lower-energy transition state, so its route is faster and gives the major product.

Applying this to 2-methylpropene, $\ce{(CH3)2C=CH2}$, with HBr: H adds to the CH₂ carbon to give the tertiary cation $\ce{(CH3)3C+}$, so the major product is 2-bromo-2-methylpropane.

## Comparing with other mechanisms

Electrophilic addition differs from free-radical substitution (radicals, ultraviolet light, alkanes) and from nucleophilic substitution (nucleophiles attacking δ+ carbon in halogenoalkanes). In arenes, the delocalised ring also attracts electrophiles, but substitution happens instead of addition, so that the stable ring is kept; that is covered at A Level.

## Common mistakes

:::mistake{title="Arrow starting from the wrong place"}
The first arrow starts at the C=C (the π bond) and ends at the δ+ atom of the electrophile, not the other way round.
:::

:::mistake{title="Forgetting the induced dipole"}
For Br₂, show or describe the δ+ and δ− induced by the π electrons; a bromine molecule has no permanent dipole.
:::

:::mistake{title="Positive charge on the wrong carbon"}
In the carbocation, the positive charge is on the carbon that did not receive the electrophile.
:::

:::mistake{title="Explaining Markovnikov with 'hydrogen goes where hydrogens are'"}
That is the rule, not the reason. The explanation is the greater stability of the secondary (or tertiary) carbocation due to electron-donating alkyl groups.
:::

## Exam tips

:::exam-tip{title="Where it is tested"}
ZIMSEC Papers 2 and 3 and Cambridge Papers 2 (and 1) ask you to *describe the mechanism*, *explain* the major product, and *suggest* products of an unfamiliar alkene. A typical four-mark description: dipole, first arrows, carbocation with its charge, final arrow from the lone pair.
:::

:::exam-tip{title="Suggest the products"}
For an unfamiliar alkene, draw both possible carbocations in words, decide which is more substituted, and state the major and minor products with names.
:::

:::exam-tip{title="Evidence questions"}
If extra nucleophiles such as Cl⁻ or water are present, every product still contains the first electrophile's atom; the second group can come from any nucleophile present.
:::

## Summary

:::summary
- The π electrons of C=C attract electrophiles: Br₂ (induced dipole) or HBr (permanent dipole).
- Step 1: arrow from π bond to δ+ atom, arrow from the X–Y bond to δ− atom; a carbocation and an anion form.
- Step 2: the anion's lone pair attacks the positive carbon.
- Mixed products with Cl⁻ or water present are evidence for a carbocation intermediate.
- More alkyl groups stabilise carbocations (tertiary > secondary > primary), so HX adds to give mainly the Markovnikov product.
:::
