---
{
  "key": "respiration.glycolysis-krebs",
  "title": "Glycolysis, the link reaction and the Krebs cycle",
  "summary": "The four stages of aerobic respiration and where they happen, then glycolysis, the link reaction and the Krebs cycle step by step: phosphorylation, splitting, oxidation, decarboxylation and dehydrogenation, with the carbons and products counted per glucose.",
  "concepts": ["abio.respiration.glycolysis-krebs"],
  "estimatedMinutes": 45,
  "level": "core"
}
---
## Introduction

When a runner sets off on the Victoria Falls marathon, her leg muscles start pulling glucose out of the blood and out of their own glycogen stores. Each glucose molecule is taken apart in a strict order of enzyme-controlled steps, with hydrogen atoms stripped off and carbon dioxide released, so that energy is released in small parcels rather than as one burst of heat.

This lesson follows one glucose molecule through the first three stages of aerobic respiration. You should already know the structure of ATP, the structure of the mitochondrion in outline, and that enzymes catalyse specific reactions.

## Key definitions

:::definition{term="Phosphorylation"}
The addition of a phosphate group to a molecule, which usually makes it more reactive.
:::

:::definition{term="Decarboxylation"}
The removal of carbon dioxide from a molecule, catalysed by a decarboxylase enzyme.
:::

:::definition{term="Dehydrogenation"}
The removal of hydrogen atoms from a molecule (an oxidation), catalysed by a dehydrogenase enzyme; the hydrogen is accepted by a coenzyme such as NAD or FAD.
:::

:::definition{term="Coenzyme"}
A non-protein organic molecule needed for an enzyme to work, often carrying atoms or groups between reactions; NAD, FAD and coenzyme A are examples.
:::

## The four stages and their sites

| Stage | Site | Needs oxygen? |
|---|---|---|
| Glycolysis | Cytoplasm | No |
| Link reaction | Mitochondrial matrix | Only runs when oxygen is available |
| Krebs cycle | Mitochondrial matrix | Only runs when oxygen is available |
| Oxidative phosphorylation | Inner mitochondrial membrane (cristae) | Yes: oxygen is the final electron acceptor |

The link reaction and Krebs cycle do not use oxygen directly, but they stop without it because the coenzymes they reduce can only be re-oxidised by the electron transport chain.

## Glycolysis

Glycolysis ("sugar splitting") breaks one glucose (6C) into two pyruvate (3C) in the cytoplasm.

1. **Phosphorylation.** Glucose is phosphorylated using ATP, and after rearrangement a second ATP adds another phosphate, giving **fructose 1,6-bisphosphate** (6C). Two ATP are used. This makes the sugar more reactive and stops it leaving the cell.
2. **Splitting (lysis).** Fructose 1,6-bisphosphate splits into **two triose phosphate** molecules (3C each).
3. **Oxidation.** Each triose phosphate is **dehydrogenated**: hydrogen is removed and accepted by **NAD**, forming **reduced NAD**. Two reduced NAD are formed per glucose.
4. **ATP formation.** Each triose phosphate is converted to **pyruvate** (3C), transferring phosphate groups to ADP: two ATP per triose phosphate, so **four ATP** per glucose by **substrate-linked phosphorylation**.

Net yield per glucose: **2 ATP** (4 made − 2 used), **2 reduced NAD**, **2 pyruvate**.

## Into the mitochondrion: the link reaction

If oxygen is available, pyruvate is moved into the mitochondrial matrix by **active transport**. There, each pyruvate is:

1. **Decarboxylated**: one carbon is removed as CO₂.
2. **Dehydrogenated**: hydrogen is removed and NAD is reduced.
3. Combined with **coenzyme A** (CoA): the remaining 2C **acetyl group** is attached to CoA, forming **acetyl coenzyme A**.

$$
\text{pyruvate (3C)} + \text{CoA} + \text{NAD} \rightarrow \text{acetyl CoA (2C)} + \text{CO}_2 + \text{reduced NAD}
$$

Per glucose the link reaction runs twice: 2 CO₂ and 2 reduced NAD. No ATP is made.

## The Krebs cycle

In the matrix, CoA delivers the acetyl group to the cycle and is released to be reused.

1. **Acetyl (2C) combines with oxaloacetate (4C)** to form **citrate (6C)**.
2. Citrate is **decarboxylated** and **dehydrogenated** to give a 5C compound: one CO₂ and one reduced NAD.
3. The 5C compound is **decarboxylated** and **dehydrogenated** to give a 4C compound: one CO₂ and one reduced NAD.
4. The 4C compound is converted back to oxaloacetate in several small steps: one **ATP** by substrate-linked phosphorylation, one **reduced FAD** and one more **reduced NAD**.
5. **Oxaloacetate is regenerated**, ready to accept another acetyl group: this is why it is a cycle.

Per turn: 2 CO₂, 3 reduced NAD, 1 reduced FAD, 1 ATP. Per glucose the cycle turns **twice**.

:::worked-solution[Counting the products per glucose]
Multiply each stage by the number of times it runs per glucose (glycolysis once; the link reaction and Krebs cycle twice).

| Stage | CO₂ | Reduced NAD | Reduced FAD | ATP (substrate-linked) |
|---|---|---|---|---|
| Glycolysis | 0 | 2 | 0 | 2 |
| Link reaction (×2) | 2 | 2 | 0 | 0 |
| Krebs cycle (×2) | 4 | 6 | 2 | 2 |
| Total per glucose | 6 | 10 | 2 | 4 |

![Aerobic respiration in four stages with counts per glucose: glycolysis in the cytoplasm gives 2 pyruvate, 2 net ATP and 2 reduced NAD; the link reaction and Krebs cycle (each twice) in the matrix give 6 CO2, 8 more reduced NAD, 2 reduced FAD and 2 ATP; oxidative phosphorylation on the inner membrane makes 25 + 3 = 28 ATP, so the total is 4 + 28 = 32 ATP.](media:diagrams/aerobic-respiration-overview.png "Figure: the four stages of aerobic respiration and the yield per glucose (values from the worked solutions)")

1. All six carbon atoms of glucose leave as **6 CO₂**: 2 in the link reaction and 4 in the Krebs cycle.
2. **10 reduced NAD and 2 reduced FAD** carry hydrogen to oxidative phosphorylation, where most ATP is made.
3. Only **4 ATP** are made directly (2 net from glycolysis, 2 from the Krebs cycle).
:::

:::worked-solution[Following the carbons]
Glucose labelled with radioactive carbon is fed to yeast cells respiring aerobically. Trace one acetyl group through one turn of the cycle.
1. Acetyl (2C) + oxaloacetate (4C) → citrate: $2 + 4 = 6$ carbons.
2. Two decarboxylations remove 2 carbons: $6 - 2 = 4$ carbons, the 4C compound that becomes oxaloacetate.
3. So the number of carbons leaving as CO₂ per turn (2) equals the number entering as acetyl (2): the cycle is balanced.
4. Labelled carbon therefore appears in CO₂ released by the yeast, and in cycle intermediates such as citrate.
:::

## Roles of the coenzymes

- **NAD** and **FAD** are hydrogen carriers. Dehydrogenases remove hydrogen from substrates; the coenzymes become reduced and carry the hydrogen (as protons and electrons) to the electron transport chain on the inner membrane.
- **Coenzyme A** carries the acetyl group from the link reaction into the Krebs cycle.
- If NAD is not re-oxidised, dehydrogenation stops. This is why anaerobic pathways must regenerate NAD (see the anaerobic respiration lesson).

:::example{title="Predicting the effect of a missing coenzyme"}
Rudo reads that a vitamin B deficiency reduces the amount of NAD in cells. **Predict and explain** the effect: dehydrogenation in glycolysis, the link reaction and the Krebs cycle all need NAD as a hydrogen acceptor, so these stages slow; less reduced NAD reaches the electron transport chain, so less ATP is made and the person tires easily.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards need the sites of the stages, the main steps of glycolysis, the link reaction and the Krebs cycle (oxaloacetate, citrate, decarboxylation, dehydrogenation, NAD, FAD, coenzyme A) and the products per glucose. Names of intermediates other than those given here are not required. Cambridge examines this on Paper 4; ZIMSEC in Form 5 Energetics.
:::

## Common mistakes

:::mistake{title="Saying glycolysis makes 4 ATP"}
Glycolysis makes 4 ATP but uses 2, so the **net** yield is 2 ATP per glucose.
:::

:::mistake{title="Forgetting that the Krebs cycle turns twice per glucose"}
One glucose gives two pyruvate, so the link reaction and the Krebs cycle each run **twice**. Double the per-turn figures.
:::

:::mistake{title="Saying the Krebs cycle uses oxygen"}
No step of the Krebs cycle uses oxygen. It stops without oxygen because NAD and FAD are not re-oxidised.
:::

:::mistake{title="Putting glycolysis in the mitochondrion"}
Glycolysis happens in the **cytoplasm**; only pyruvate enters the mitochondrion.
:::

## Exam tips

:::exam-tip
Cambridge Paper 4 and ZIMSEC Paper 2 often give an outline of the pathway as a list of compounds with numbers of carbons and ask you to *name* the compounds, *state* where a step happens or *identify* a decarboxylation. Check the number of carbons: a decarboxylation always removes one.
:::

:::exam-tip
In *describe* questions use the precise verbs: phosphorylated, split, dehydrogenated, decarboxylated, regenerated. In *explain* questions about yields, say "per glucose" and remember the factor of two. ZIMSEC Paper 3 essays often ask for glycolysis and the Krebs cycle in one part.
:::

## Summary

:::summary
- Glycolysis (cytoplasm): glucose → fructose 1,6-bisphosphate (2 ATP used) → 2 triose phosphate → 2 pyruvate, with net 2 ATP and 2 reduced NAD.
- With oxygen, pyruvate enters the matrix; the link reaction decarboxylates and dehydrogenates it to acetyl CoA.
- Krebs cycle: acetyl (2C) + oxaloacetate (4C) → citrate (6C), then two decarboxylations and four dehydrogenations regenerate oxaloacetate.
- Per glucose: 6 CO₂, 10 reduced NAD, 2 reduced FAD and 4 ATP by substrate-linked phosphorylation.
- NAD and FAD carry hydrogen to the electron transport chain; coenzyme A carries acetyl groups.
:::
