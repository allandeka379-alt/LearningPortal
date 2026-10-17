---
{
  "key": "hydrocarbons.electrophilic-substitution",
  "title": "Electrophilic substitution in arenes",
  "summary": "How the electrophiles NO₂⁺, Br⁺ (or a polarised Br–Br–AlBr₃ complex), carbocations and acylium ions are generated; the step-by-step mechanism of nitration and bromination of benzene; regeneration of the catalyst; why benzene undergoes substitution rather than addition; comparison with electrophilic addition to alkenes.",
  "concepts": ["achem.hydrocarbons.electrophilic-substitution"],
  "estimatedMinutes": 45,
  "level": "core"
}
---
## Introduction

Benzene's delocalised ring is electron-rich, so like an alkene it attracts electrophiles. But where an alkene adds the electrophile and a nucleophile across the double bond, benzene ends up swapping a hydrogen atom for the electrophile and keeps its ring intact. The reason lies in the extra stability of the delocalised system, and the evidence is in the mechanism. Industrial nitration of benzene, the first step towards dyes, some medicines and polyurethane foams, depends on exactly this chemistry.

You should already know the delocalised structure of benzene and its stabilisation energy, the reagents and conditions for arene reactions, curly-arrow conventions, and the electrophilic addition mechanism for alkenes.

## Key definitions

:::definition{term="Electrophilic substitution"}
A reaction in which an electrophile replaces an atom (usually hydrogen) on an aromatic ring; the ring's delocalised π system is temporarily disrupted and then restored.
:::

:::definition{term="Nitronium ion"}
The electrophile $\ce{NO2+}$ in nitration, formed when concentrated sulfuric acid protonates nitric acid.
:::

:::definition{term="Acylium ion"}
A cation $\ce{RCO+}$ (for example $\ce{CH3CO+}$) formed from an acyl chloride and aluminium chloride; the electrophile in Friedel-Crafts acylation.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards: generating the electrophile and the mechanism for nitration and bromination of benzene, and why benzene undergoes substitution. Cambridge (A Level) also names the electrophiles for Friedel-Crafts alkylation and acylation.
:::

## Step 1: making a strong electrophile

The delocalised π electrons of benzene are spread over six carbons and are less available than the localised π pair of an alkene, so benzene needs a **stronger** electrophile. Each reaction has a step that generates one.

| Reaction | Generation of the electrophile | Electrophile |
|---|---|---|
| nitration | $\ce{HNO3 + 2H2SO4 -> NO2+ + H3O+ + 2HSO4-}$ (often simplified to $\ce{HNO3 + H2SO4 -> NO2+ + HSO4- + H2O}$) | $\ce{NO2+}$ |
| bromination | $\ce{Br2 + FeBr3 -> Br+ + FeBr4-}$ (in reality a polarised $\ce{Br^{\delta+}-Br-FeBr3^{\delta-}}$ complex) | $\ce{Br+}$ |
| chlorination | $\ce{Cl2 + AlCl3 -> Cl+ + AlCl4-}$ | $\ce{Cl+}$ |
| alkylation | $\ce{CH3Cl + AlCl3 -> CH3+ + AlCl4-}$ | $\ce{CH3+}$ (carbocation) |
| acylation | $\ce{CH3COCl + AlCl3 -> CH3CO+ + AlCl4-}$ | $\ce{CH3CO+}$ (acylium ion) |

In nitration, sulfuric acid is the stronger acid and acts as a proton donor; nitric acid acts as a base, accepting a proton and then losing water to give $\ce{NO2+}$. The halogen carriers are **Lewis acids**: the aluminium or iron atom accepts a lone pair from a halogen atom.

## Step 2 and 3: the mechanism

![Nitration of benzene in two steps: a curly arrow from the delocalised ring to the N of NO2 plus gives an intermediate with H and NO2 on one carbon and the positive charge delocalised over the other five; a curly arrow from the C-H bond restores the ring, releasing H plus (which regenerates H2SO4) and giving nitrobenzene.](media:diagrams/nitration-benzene-mechanism.png "Figure: electrophilic substitution of benzene by NO₂⁺, showing the intermediate and the restored ring")

:::example{title="Example 1: nitration of benzene"}
1. **Attack.** A curly arrow from the delocalised π system (the ring) to the nitrogen atom of $\ce{NO2+}$. A new C–N bond forms.
2. **Intermediate.** The carbon that is attacked becomes sp³, carrying both H and $\ce{NO2}$. The remaining four π electrons are delocalised over the other **five** carbons, which share a positive charge (described as a partial ring, or "horseshoe", with + inside). The full delocalisation, and its stability, has been lost for now.
3. **Loss of H⁺.** A curly arrow from the C–H bond of the sp³ carbon back into the ring. The two electrons restore the six-electron delocalised system and $\ce{H+}$ is released.
4. **Product.** Nitrobenzene, $\ce{C6H5NO2}$. The $\ce{H+}$ combines with $\ce{HSO4-}$: $\ce{H+ + HSO4- -> H2SO4}$, so sulfuric acid is regenerated and acts as a catalyst.
:::

:::example{title="Example 2: bromination of benzene"}
1. $\ce{Br2 + FeBr3 -> Br+ + FeBr4-}$ (electrophile formed).
2. Curly arrow from the delocalised ring to $\ce{Br+}$; the intermediate cation has H and Br on one sp³ carbon and the positive charge delocalised over the other five carbons.
3. Curly arrow from the C–H bond into the ring; the ring's delocalisation is restored.
4. $\ce{H+ + FeBr4- -> FeBr3 + HBr}$: the catalyst is regenerated and HBr is the by-product. Overall: $\ce{C6H6 + Br2 -> C6H5Br + HBr}$.
:::

## Why substitution and not addition?

After step 2 the intermediate could, in principle, gain a nucleophile (as in alkene addition). That would give a product with no delocalised ring, losing the delocalisation energy (about 150 kJ mol⁻¹). Losing $\ce{H+}$ instead restores the stable aromatic system. The substitution product is therefore much lower in energy, and that is the route taken.

## Comparing with alkenes

| | Alkene (e.g. ethene + $\ce{Br2}$) | Benzene (+ $\ce{Br2}$) |
|---|---|---|
| electron density attacked | localised π bond, high density | delocalised π ring, lower density |
| electrophile needed | $\ce{Br2}$ polarised by the π bond | $\ce{Br+}$ from $\ce{Br2}$ + halogen carrier |
| conditions | room temperature, no catalyst | room temperature, $\ce{FeBr3}$/$\ce{AlBr3}$, dry |
| intermediate | carbocation; π bond used | cation with charge over five carbons; ring disrupted |
| second step | nucleophile ($\ce{Br-}$) adds | $\ce{H+}$ lost, ring restored |
| overall | addition | substitution |

## Common mistakes

:::mistake{title="Arrow from a single double bond"}
In the delocalised model the first arrow starts from the ring (the delocalised π system), not from one localised C=C bond.
:::

:::mistake{title="Wrong intermediate"}
The intermediate has the positive charge spread over five carbons, with the sixth carbon (sp³) carrying both H and the new group. Do not draw the full circle in the intermediate.
:::

:::mistake{title="Forgetting to regenerate the catalyst"}
Show $\ce{H+ + FeBr4- -> FeBr3 + HBr}$ or $\ce{H+ + HSO4- -> H2SO4}$: catalysts are not used up.
:::

:::mistake{title="Using Br₂ itself as the electrophile for benzene"}
Without a halogen carrier, bromine is not electrophilic enough to react with benzene at room temperature.
:::

## Exam tips

:::exam-tip{title="Where it is tested"}
Cambridge Paper 4 and ZIMSEC Papers 2 and 3: *write an equation for the formation of the electrophile*, *describe the mechanism*, *explain why benzene undergoes substitution*. A four or five mark mechanism usually needs: electrophile equation, first arrow, correct intermediate, second arrow, regenerated catalyst or product.
:::

:::exam-tip{title="Explain questions"}
For "explain why benzene needs a catalyst but ethene does not", compare the electron density (delocalised versus localised) and the stability lost on reaction.
:::

:::exam-tip{title="Unfamiliar electrophiles"}
For an unfamiliar Friedel-Crafts reaction, identify the cation formed with $\ce{AlCl4-}$, then follow the same three steps.
:::

## Summary

:::summary
- Benzene's delocalised π electrons are less available than an alkene's, so a strong electrophile is generated first: NO₂⁺, Br⁺, Cl⁺, R⁺ or RCO⁺.
- Arrow from the ring to the electrophile gives a cation with the charge delocalised over five carbons.
- Arrow from the C–H bond into the ring restores delocalisation; H⁺ is lost.
- The catalyst is regenerated: H⁺ + FeBr₄⁻ → FeBr₃ + HBr; H⁺ + HSO₄⁻ → H₂SO₄.
- Substitution keeps the stable aromatic ring; addition would lose about 150 kJ mol⁻¹ of delocalisation energy.
:::
