---
{
  "key": "organic.synthesis-a",
  "title": "Multi-step synthesis with A Level reactions",
  "summary": "Extending synthesis to the A Level reactions: arenes and Friedel-Crafts reactions, side-chain reactions, phenol, acyl chlorides, amides, amines from nitriles and amides, phenylamine and azo dyes, LiAlH₄ reductions and condensation polymers; planning aromatic and aliphatic routes; analysing routes for reagents, conditions, by-products and chirality; checking a step by spectroscopy in outline.",
  "concepts": ["achem.organic.synthesis-a"],
  "estimatedMinutes": 55,
  "level": "core"
}
---
## Introduction

Many of the most useful molecules contain a benzene ring: painkillers such as paracetamol, the azo dyes that colour cloth, and the monomers of Kevlar. Making them needs the A Level reactions: substitution on the ring, the Friedel-Crafts reactions that build carbon skeletons on it, and the chemistry of phenol, acyl chlorides, amides and amines.

This lesson adds those reactions to the AS reaction map and shows how to plan longer routes, especially to aromatic targets, and how to judge a route for by-products and stereochemistry. You should already know the AS synthesis method (work backwards, compare skeletons and groups) and the mechanisms of electrophilic substitution and nucleophilic addition.

## Key definitions

:::definition{term="Friedel-Crafts reaction"}
Electrophilic substitution of an arene by an alkyl group (from a halogenoalkane) or an acyl group (from an acyl chloride), catalysed by a halogen carrier such as anhydrous $\ce{AlCl3}$; it makes a new C–C bond to the ring.
:::

:::definition{term="Diazotisation"}
The reaction of phenylamine with nitrous acid (from $\ce{NaNO2}$ and dilute HCl) below 10 °C to form the benzenediazonium ion, $\ce{C6H5N2+}$.
:::

:::definition{term="Coupling reaction"}
The reaction of a diazonium ion with an activated arene such as phenol in alkaline solution, forming an azo compound containing –N=N– linking two rings.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Cambridge A Level only (36.1, Paper 4). ZIMSEC candidates study the individual reactions in the arene, phenol, carbonyl and nitrogen-compound lessons; ZIMSEC Paper 3 Section C conversions use the same method.
:::

## The A Level additions to the reaction map

| From | To | Reagent and conditions | Type of reaction |
|---|---|---|---|
| benzene | nitrobenzene | conc. $\ce{HNO3}$ + conc. $\ce{H2SO4}$, 25-60 °C | electrophilic substitution |
| benzene | chlorobenzene or bromobenzene | $\ce{Cl2}$ or $\ce{Br2}$ with $\ce{AlCl3}$, $\ce{FeCl3}$ or Fe, anhydrous | electrophilic substitution |
| benzene | alkylbenzene | RCl + anhydrous $\ce{AlCl3}$, heat | electrophilic substitution (Friedel-Crafts alkylation) |
| benzene | phenyl ketone | RCOCl + anhydrous $\ce{AlCl3}$, heat | electrophilic substitution (Friedel-Crafts acylation) |
| alkylbenzene | benzoic acid | hot alkaline $\ce{KMnO4}$, then dilute acid (or acidified $\ce{KMnO4}$, heat) | oxidation of the side chain |
| methylbenzene | (chloromethyl)benzene | $\ce{Cl2}$, UV light | free-radical substitution (side chain) |
| nitrobenzene | phenylamine | Sn + conc. HCl, heat under reflux; then NaOH(aq) | reduction |
| phenylamine | benzenediazonium ion | $\ce{NaNO2}$ + dilute HCl, below 10 °C | diazotisation |
| diazonium ion + phenol | azo dye | phenol in NaOH(aq), cold | coupling (electrophilic substitution) |
| phenol | 2,4,6-tribromophenol | $\ce{Br2(aq)}$, room temperature | electrophilic substitution |
| phenol | 2- and 4-nitrophenol | dilute $\ce{HNO3}$, room temperature | electrophilic substitution |
| carboxylic acid | acyl chloride | $\ce{SOCl2}$; or $\ce{PCl5}$; or $\ce{PCl3}$ + heat | substitution |
| acyl chloride | acid / ester / amide | water; alcohol or phenol; $\ce{NH3}$ or an amine, room temperature | addition-elimination (condensation) |
| amide | amine | $\ce{LiAlH4}$ | reduction |
| amide | carboxylic acid + amine (or salts) | dilute acid or alkali, heat | hydrolysis |
| nitrile | primary amine | $\ce{LiAlH4}$, or $\ce{H2}$ with Ni catalyst | reduction |
| halogenoalkane | secondary amine | primary amine in ethanol, heated in a sealed tube | nucleophilic substitution |

Two A Level reactions make new **C–C bonds**: Friedel-Crafts alkylation and acylation. Together with the cyanide reactions, they are your tools for building carbon skeletons.

## Planning aromatic routes

1. Decide what must be **on the ring** and what must be **in a side chain**. Ring substitution uses electrophiles; side chains are made by Friedel-Crafts and then modified with ordinary aliphatic reactions.
2. Remember that groups on a ring react differently from the same groups on a chain: phenol does not react with carboxylic acids to give esters (use an acyl chloride), and chlorobenzene does not undergo nucleophilic substitution with NaOH(aq) under normal conditions.
3. Amines on a ring come from **nitro** groups (nitrate, then reduce). Amines on a chain come from halogenoalkanes with ammonia, or from nitriles or amides by reduction.

:::example{title="Example 1: benzene to an azo dye"}
Target: 4-hydroxyazobenzene, $\ce{C6H5-N=N-C6H4OH}$ (an orange dye).

| Step | Reagent and conditions | Product | Type |
|---|---|---|---|
| 1 | conc. $\ce{HNO3}$ + conc. $\ce{H2SO4}$, 25-60 °C | nitrobenzene | electrophilic substitution |
| 2 | Sn + conc. HCl, reflux; then NaOH(aq) | phenylamine | reduction |
| 3 | $\ce{NaNO2}$ + dilute HCl, below 10 °C | benzenediazonium chloride | diazotisation |
| 4 | phenol in NaOH(aq), cold | 4-hydroxyazobenzene | coupling |

Points to note: above about 60 °C in step 1, dinitration increases; in step 3 the diazonium salt decomposes (to phenol and nitrogen) if it warms above about 10 °C, and diazonium salts are hazardous; step 2 needs NaOH to release the free amine from its salt.
:::

:::example{title="Example 2: benzene to 1-phenylethanol, and its chirality"}
Target: $\ce{C6H5CH(OH)CH3}$.

1. Step 1: ethanoyl chloride, $\ce{CH3COCl}$, with anhydrous $\ce{AlCl3}$, heat: phenylethanone, $\ce{C6H5COCH3}$ (Friedel-Crafts acylation; by-product HCl).
2. Step 2: $\ce{NaBH4}$: 1-phenylethanol (reduction).
3. The product has a chiral carbon (bonded to H, OH, CH₃ and C₆H₅). The hydride attacks the planar C=O equally from either face, so a **racemic mixture** forms. If only one enantiomer is wanted (as for many drugs), the isomers must be separated or a chiral catalyst used, which adds cost.
4. Checking step 2 by infrared: the C=O absorption near 1680-1700 cm⁻¹ disappears and a broad O–H absorption at 3200-3600 cm⁻¹ appears.
:::

## Planning aliphatic routes with A Level reactions

Nitrile reduction gives a route from a halogenoalkane to an amine with **one more carbon**:

$$
\ce{CH3CH2CH2Br ->[KCN, ethanol][reflux] CH3CH2CH2CN ->[LiAlH4] CH3CH2CH2CH2NH2}
$$

Compare: ammonia with 1-bromopropane gives propan-1-amine (no extra carbon) plus further-substituted amines as by-products.

Acyl chlorides are the A Level route to esters and amides in **one fast, irreversible step** at room temperature:

- acid → acyl chloride ($\ce{SOCl2}$) → ester (alcohol or phenol) or amide (ammonia or amine).
- By-products: $\ce{SO2}$ and HCl from $\ce{SOCl2}$; HCl from each acyl chloride step (with ammonia, ammonium chloride forms).

:::worked-solution[Example 3: yield over two steps]
15.6 g of benzene is converted to phenylamine in two steps, giving 11.2 g of phenylamine. The first step has a yield of 80.0%. (Mr: benzene 78.0, phenylamine 93.0)

1. Amount of benzene = 15.6 ÷ 78.0 = 0.200 mol, so the maximum phenylamine = 0.200 × 93.0 = 18.6 g.
2. Overall yield = 11.2 ÷ 18.6 × 100 = 60.2%.
3. Overall yield = yield(1) × yield(2), so yield(2) = 60.2 ÷ 0.800 = 75.3%.
:::

## Analysing a route

For each step, state:

- the **type of reaction** (electrophilic substitution, nucleophilic addition, addition-elimination, reduction, oxidation, hydrolysis, diazotisation, coupling);
- the **reagents and conditions**, with temperature limits (25-60 °C for nitration; below 10 °C for diazotisation) and "anhydrous" for Friedel-Crafts catalysts;
- **by-products**: inorganic (HCl, $\ce{H2O}$, $\ce{SO2}$, $\ce{NH4Cl}$), and organic (isomers at the 2- and 4-positions, multiple substitution, over-alkylation in Friedel-Crafts alkylation because the alkylbenzene is more reactive than benzene);
- **stereochemistry**: does a step create a chiral centre from a planar group? Then a racemic mixture forms unless the route is designed otherwise;
- **identification**: a key change can be confirmed by infrared (a group appears or disappears) or, in outline, by NMR.

## Common mistakes

:::mistake{title="Esterifying phenol with a carboxylic acid"}
Phenol reacts too slowly with carboxylic acids. Use an acyl chloride.
:::

:::mistake{title="Forgetting NaOH after the tin reduction"}
Sn/HCl gives the phenylammonium salt; add NaOH(aq) to release phenylamine.
:::

:::mistake{title="Warm diazotisation"}
Above 10 °C the diazonium ion decomposes, giving phenol and nitrogen. Keep it below 10 °C and use it at once.
:::

:::mistake{title="Wet Friedel-Crafts catalyst"}
$\ce{AlCl3}$ must be anhydrous; water hydrolyses it and destroys the catalyst.
:::

## Exam tips

:::exam-tip{title="Which papers"}
Cambridge Paper 4 (synthesis questions usually 4-8 marks, often linked to mechanisms or spectra). Each intermediate and each reagent-with-conditions is normally a separate mark.
:::

:::exam-tip{title="Command words"}
*Suggest a synthesis*: number the steps; give reagent and condition for each, and the intermediate's structure. *Identify* the type of reaction: one precise phrase per step. *Explain* why a product is optically inactive: a chiral centre forms from a planar group attacked equally from both sides, giving a racemic mixture. *Deduce* a structure from the route: follow the changes in carbon count and functional groups step by step.
:::

## Summary

:::summary
- A Level adds ring chemistry (nitration, halogenation, Friedel-Crafts), side-chain reactions, phenol, acyl chlorides, amides and amine-forming reductions.
- New C–C bonds: cyanide (AS) and Friedel-Crafts alkylation or acylation (A Level).
- Ring amines come from nitro groups (Sn/HCl, then NaOH); chain amines from halogenoalkanes, nitriles or amides.
- Diazotisation below 10 °C, then coupling with phenol in alkali, gives azo dyes.
- Analyse each step for reagents, conditions, by-products, chirality (racemic mixtures) and a spectroscopic check.
:::
