---
{
  "key": "enzymes.inhibition-kinetics",
  "title": "Enzyme inhibitors, Vmax, Km and immobilised enzymes",
  "summary": "Competitive and non-competitive reversible inhibition, irreversible inhibitors and poisons, how Vmax and the Michaelis-Menten constant Km describe an enzyme and how inhibitors change them, and the advantages of enzymes immobilised in alginate beads.",
  "concepts": ["abio.enzymes.inhibition-kinetics"],
  "estimatedMinutes": 40,
  "level": "core"
}
---
## Introduction

Many drugs, pesticides and poisons work by blocking enzymes. Some insecticides used on cotton and tobacco farms kill insects by inhibiting an enzyme in their nervous system, which is why the same chemicals are dangerous to the farm workers who spray them without protection. Antibiotics such as penicillin inhibit an enzyme bacteria need to build their walls. Cells themselves switch metabolic pathways on and off by inhibiting their own enzymes.

This lesson explains the types of inhibition, how biochemists describe enzymes with Vmax and Km, and why industry fixes enzymes in beads. You need the two previous enzyme lessons, especially the effect of substrate concentration on rate.

## Key definitions

:::definition{term="Inhibitor"}
A substance that reduces the rate of an enzyme-catalysed reaction by binding to the enzyme.
:::

:::definition{term="Competitive inhibitor"}
A molecule with a shape similar to the substrate that binds reversibly to the active site, competing with the substrate and so reducing the number of enzyme-substrate complexes formed.
:::

:::definition{term="Non-competitive inhibitor"}
A molecule that binds reversibly to the enzyme at a site other than the active site (an allosteric site), changing the shape of the enzyme so that the active site can no longer bind the substrate or catalyse the reaction effectively.
:::

:::definition{term="Vmax"}
The maximum initial rate of an enzyme-catalysed reaction, reached when all the active sites are occupied by substrate (the enzyme is saturated).
:::

:::definition{term="Michaelis-Menten constant (Km)"}
The substrate concentration at which the initial rate is half of Vmax. It is a measure of the affinity of the enzyme for its substrate: the lower the Km, the higher the affinity.
:::

## Reversible inhibition

### Competitive inhibition

1. The inhibitor is similar in shape to the substrate, so it fits the active site.
2. It binds briefly and is released again; while it is bound, the substrate cannot enter.
3. The degree of inhibition depends on the **relative** concentrations of inhibitor and substrate: the more substrate there is, the more likely each active site is to be occupied by substrate.
4. At very high substrate concentrations, substrate outcompetes inhibitor, so the same maximum rate (Vmax) can still be reached.

Example: malonate competes with succinate for the active site of succinate dehydrogenase, an enzyme of the Krebs cycle.

### Non-competitive inhibition

1. The inhibitor binds at a site away from the active site.
2. Binding changes the tertiary structure of the enzyme, so the active site changes shape.
3. Enzyme molecules with inhibitor bound cannot catalyse the reaction, whatever the substrate concentration.
4. Adding more substrate does not overcome the inhibition: Vmax is reduced, because effectively fewer enzyme molecules are working.

### End-product inhibition (extension)

In a metabolic pathway, the final product may act as a non-competitive inhibitor of an enzyme early in the pathway. When the product builds up, the pathway slows; when it is used up, inhibition falls and the pathway speeds up again. This is negative feedback that saves resources.

## Irreversible inhibition (ZIMSEC detail)

Some inhibitors bind permanently, often by covalent bonds, to the active site or elsewhere. The enzyme is inactivated for good. Examples:

- **Heavy metal ions** such as mercury, lead and silver bind to R groups, especially –SH groups of cysteine, disrupting disulfide bonds and changing the enzyme's shape.
- **Cyanide** binds to cytochrome oxidase (cytochrome c oxidase), the last enzyme of the electron transport chain, stopping aerobic respiration.
- **Organophosphate insecticides** and some nerve agents inhibit **acetylcholinesterase**, so acetylcholine is not broken down at synapses and muscles are over-stimulated. This is why protective clothing must be worn when spraying them.

## Vmax and Km (Cambridge detail)

When initial rate is plotted against substrate concentration, the curve rises steeply, then flattens towards a maximum. **Vmax** is the rate the curve approaches; **Km** is the substrate concentration at half Vmax.

![Rate against substrate concentration for an enzyme: with no inhibitor the curve levels towards a Vmax of 0.80 and reaches half Vmax (0.40) at Km 2 mmol per dm3; competitive inhibitor P reaches the same Vmax but its Km rises to about 5; non-competitive inhibitor Q levels off at only 0.40 with Km still 2.](media:diagrams/enzyme-inhibitors-vmax-km.png "Figure: Michaelis-Menten curves from the worked data; a competitive inhibitor raises Km, a non-competitive one lowers Vmax")

| Inhibitor type | Effect on Vmax | Effect on Km |
|---|---|---|
| Competitive | No change (overcome by high substrate) | Increased (more substrate needed to reach half Vmax) |
| Non-competitive | Decreased | No change |

An enzyme with a low Km reaches half its maximum rate at a low substrate concentration: it binds the substrate readily, so it has a **high affinity**.

:::worked-solution[Finding Vmax and Km from data]
1. Initial rates (µmol of product per minute) were measured for an enzyme without inhibitor and with two inhibitors, P and Q:

| Substrate / mmol dm⁻³ | No inhibitor | Inhibitor P | Inhibitor Q |
|---|---|---|---|
| 0.5 | 0.16 | 0.07 | 0.08 |
| 1 | 0.27 | 0.13 | 0.13 |
| 2 | 0.40 | 0.23 | 0.20 |
| 4 | 0.53 | 0.36 | 0.27 |
| 8 | 0.64 | 0.49 | 0.32 |
| 16 | 0.71 | 0.61 | 0.36 |
| 32 | 0.75 | 0.69 | 0.38 |

2. Without inhibitor the curve flattens towards about 0.80 µmol min⁻¹: this is Vmax (estimated by extending the curve, since even at 32 mmol dm⁻³ it is still rising slowly).
3. Half Vmax $= 0.80 \div 2 = 0.40$, reached at 2 mmol dm⁻³, so $K_m = 2\ \text{mmol dm}^{-3}$.
4. With P the rates approach the same 0.80 at high substrate concentrations, but 0.40 is reached only at about 5 mmol dm⁻³ (between 4 and 8): Km has increased, Vmax is unchanged. P is a **competitive** inhibitor.
5. With Q the curve levels off at about 0.40, so Vmax is halved; half of this (0.20) is reached at 2 mmol dm⁻³, so Km is unchanged. Q is a **non-competitive** inhibitor.
:::

## Immobilised enzymes (Cambridge detail)

Enzymes used in industry can be trapped in **alginate beads**. A solution of enzyme is mixed with sodium alginate and dripped into calcium chloride solution, where each drop sets into a jelly bead with enzyme trapped inside. The beads are packed into a column, and substrate solution is trickled through; product runs out at the bottom.

Advantages compared with free enzyme in solution:

1. The enzyme does not contaminate the product, so no separation (purification) step is needed.
2. The enzyme is reused many times, which reduces cost.
3. Immobilised enzymes are often more **stable**: the matrix protects them, so they tolerate a wider range of temperature and pH before denaturing.
4. The process can run **continuously**, and the flow rate can be adjusted to control how much product forms.

Disadvantages: the substrate must diffuse into the bead, so the rate can be lower than for free enzyme, and setting up costs more. Lactase immobilised in beads is used to make lactose-free milk.

:::example{title="Comparing free and immobilised enzymes"}
Thandeka passed milk through a column of alginate beads containing lactase and tested samples from the bottom with a glucose test strip. The milk leaving the column contained glucose, and the beads could be used again the next day. When the same mass of lactase was added free to milk, glucose appeared faster, but the lactase stayed in the milk and could not be recovered.

Interpretation: free enzyme acts faster because substrate does not need to diffuse into a bead, but immobilisation gives a product free of enzyme and an enzyme that can be reused. Running milk through the column more slowly would allow more of the lactose to be hydrolysed.
:::

## Common mistakes

:::mistake{title="Saying non-competitive inhibitors bind to the active site"}
They bind elsewhere and change the active site's shape indirectly.
:::

:::mistake{title="Saying a competitive inhibitor lowers Vmax"}
With enough substrate the inhibitor is outcompeted, so Vmax is unchanged; Km rises.
:::

:::mistake{title="Saying a high Km means high affinity"}
A high Km means more substrate is needed to reach half Vmax, so affinity is **lower**.
:::

:::mistake{title="Reading Km at the plateau"}
Km is the substrate concentration at **half** Vmax, not at Vmax.
:::

## Exam tips

:::exam-tip{title="Which papers"}
ZIMSEC Papers 1-3 and Cambridge Papers 1 and 2. Cambridge data questions ask you to estimate Vmax and Km from graphs and to identify the type of inhibitor; ZIMSEC questions may ask about poisons such as cyanide, heavy metals and organophosphates.
:::

:::exam-tip{title="Command words"}
*Explain* competitive inhibition: similar shape, binds active site, competes, effect reduced by more substrate. *Explain* non-competitive inhibition: binds elsewhere, changes active site shape, not overcome by substrate. *Estimate* Km: find Vmax, halve it, read the substrate concentration. *Suggest* advantages of immobilisation: reuse, no contamination, stability, continuous process.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards: competitive and non-competitive reversible inhibition. ZIMSEC detail: irreversible inhibitors and poisons (cyanide, heavy metals, organophosphates). Cambridge detail: Vmax, Km and immobilised enzymes in alginate.
:::

## Summary

:::summary
- Competitive inhibitors resemble the substrate and bind the active site; more substrate reduces their effect (Vmax unchanged, Km increased).
- Non-competitive inhibitors bind elsewhere and change the active site; more substrate cannot overcome them (Vmax decreased, Km unchanged).
- Irreversible inhibitors such as heavy metals, cyanide and organophosphates bind permanently.
- Vmax is the maximum rate; Km is the substrate concentration at half Vmax; low Km means high affinity.
- Immobilised enzymes in alginate beads can be reused, do not contaminate the product, are more stable and allow continuous processing.
:::
