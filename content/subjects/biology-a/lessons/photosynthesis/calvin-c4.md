---
{
  "key": "photosynthesis.calvin-c4",
  "title": "The Calvin cycle and C4 plants",
  "summary": "How rubisco fixes carbon dioxide with RuBP, how GP is reduced to triose phosphate using ATP and reduced NADP, how RuBP is regenerated, what the intermediates are used for, how GP and RuBP levels respond to changes in light and carbon dioxide, and how C4 plants such as maize avoid photorespiration.",
  "concepts": ["abio.photosynthesis.calvin-c4"],
  "estimatedMinutes": 45,
  "level": "core"
}
---
## Introduction

Maize, sorghum and sugar cane, three of the most important crops in Zimbabwe, all grow fast in hot, bright conditions where many other plants struggle. The reason lies in how they fix carbon dioxide. All green plants use the **Calvin cycle** in the stroma to turn CO₂ into sugar; maize and its relatives add an extra step that concentrates CO₂ first.

This lesson covers the light-independent stage and the C4 adaptation. You should already know the products of the light-dependent stage (ATP and reduced NADP) and the structure of the chloroplast.

## Key definitions

:::definition{term="Carbon fixation"}
The incorporation of carbon from carbon dioxide into an organic compound; in the Calvin cycle, CO₂ combines with ribulose bisphosphate, catalysed by rubisco.
:::

:::definition{term="Rubisco"}
Ribulose bisphosphate carboxylase/oxygenase, the enzyme in the stroma that catalyses the fixation of CO₂ with RuBP; it can also combine RuBP with oxygen.
:::

:::definition{term="Photorespiration"}
The reaction of RuBP with oxygen instead of CO₂, catalysed by rubisco; it wastes RuBP, ATP and fixed carbon, and is favoured by high temperature, high oxygen and low CO₂ concentrations.
:::

:::definition{term="C4 plant"}
A plant in which CO₂ is first fixed in mesophyll cells into a 4-carbon compound by PEP carboxylase, and later released to rubisco in bundle sheath cells.
:::

## The Calvin cycle

The light-independent stage happens in the **stroma**. Light is not used directly, but the cycle stops in the dark within a minute or so because it runs out of ATP and reduced NADP.

1. **Carbon fixation.** CO₂ diffuses into the stroma and combines with **ribulose bisphosphate (RuBP, 5C)**, catalysed by **rubisco**. The unstable 6C product immediately splits into **two molecules of glycerate 3-phosphate (GP, 3C)**.
2. **Reduction.** GP is reduced to **triose phosphate (TP, 3C)** using **ATP** (energy) and **reduced NADP** (hydrogen) from the light-dependent stage. NADP and ADP return to the thylakoids.
3. **Regeneration.** Most of the TP (five out of every six molecules) is used to regenerate RuBP, using more **ATP**. This keeps the cycle going.
4. **Product.** The remaining TP (one out of every six) is used to make other organic molecules.

| Step | Substrate → product | Carbons | Needs |
|---|---|---|---|
| Fixation | RuBP + CO₂ → 2 GP | 5 + 1 → 2 × 3 | Rubisco |
| Reduction | GP → TP | 3 → 3 | ATP and reduced NADP |
| Regeneration | 5 TP → 3 RuBP | 15 → 15 | ATP |

:::worked-solution[What it costs to make one hexose]
Six turns of the cycle fix six CO₂, enough carbon for one hexose (6C).
1. Fixation: 6 RuBP + 6 CO₂ → $6 \times 2 = 12$ GP.
2. Reduction: 12 GP → 12 TP, using 12 ATP and 12 reduced NADP.
3. Regeneration: 10 TP (30 carbons) → 6 RuBP (30 carbons), using 6 ATP.
4. Left over: $12 - 10 = 2$ TP, which join to make one hexose such as glucose.
5. Totals per hexose: 18 ATP and 12 reduced NADP, which is 3 ATP and 2 reduced NADP per CO₂ fixed.
:::

## Uses of the intermediates

- **GP** is used to make some **amino acids**.
- **TP** is used to make **hexoses** (glucose and fructose), then **sucrose** (for transport), **starch** (storage) and **cellulose** (cell walls); **glycerol** and **fatty acids** for lipids; and the carbon skeletons of **amino acids** (with nitrate taken up from the soil).

## Effects of light and CO₂ on GP and RuBP

Because GP and RuBP are made and used in a cycle, their concentrations change in predictable ways when one step stops.

:::example{title="Switching off the light"}
*Chlorella* cells were kept in bright light with plenty of CO₂, and the light was switched off at 60 s.

| Time / s | 0 | 30 | 60 | 90 | 120 | 150 | 180 |
|---|---|---|---|---|---|---|---|
| GP / arbitrary units | 1.0 | 1.0 | 1.0 | 1.8 | 2.3 | 2.4 | 2.4 |
| RuBP / arbitrary units | 1.0 | 1.0 | 1.0 | 0.4 | 0.2 | 0.1 | 0.1 |

**Describe:** both are constant until 60 s; then GP rises to 2.4 units and RuBP falls to 0.1 units, levelling off by 150 s.

**Explain:** in the dark no more ATP or reduced NADP is made, so GP cannot be reduced to TP and accumulates. RuBP is still used to fix CO₂ but cannot be regenerated without TP and ATP, so it falls. The levels level off when the RuBP is used up.
:::

If instead the **CO₂ concentration is lowered** in the light, the opposite happens: less RuBP is used in fixation but it is still regenerated, so **RuBP rises**; less GP is made but it is still reduced to TP, so **GP falls**.

## C4 plants (maize, sorghum, sugar cane)

**The problem.** Rubisco can combine RuBP with oxygen as well as CO₂. At high temperatures and light intensities, when stomata partly close and oxygen from photolysis builds up inside the leaf, the ratio of O₂ to CO₂ rises and **photorespiration** increases. Photorespiration wastes RuBP, ATP and fixed carbon and releases CO₂, lowering the rate of net photosynthesis. Most plants (C3 plants, such as wheat and beans) lose much of their potential productivity this way in hot climates.

**The C4 solution: separating fixation in space.** The leaf has **Kranz anatomy**: each vascular bundle is surrounded by a ring of tightly packed **bundle sheath cells**, with **mesophyll cells** arranged around them.

1. In the **mesophyll cells**, CO₂ (as hydrogencarbonate) combines with **phosphoenolpyruvate (PEP, 3C)**, catalysed by **PEP carboxylase**, forming **oxaloacetate (4C)**. PEP carboxylase does not react with oxygen and works well at low CO₂ concentrations.
2. Oxaloacetate is reduced to **malate (4C)**, which passes through plasmodesmata into the bundle sheath cells.
3. In the **bundle sheath cells**, malate is **decarboxylated**, releasing CO₂ at a high concentration around **rubisco**. The Calvin cycle runs here.
4. The remaining 3C compound (pyruvate) returns to the mesophyll, where it is converted back to PEP using ATP.

**Why it works.** Rubisco is kept in the bundle sheath cells, away from the air spaces, and is supplied with a high concentration of CO₂, so it rarely meets oxygen. In maize, the bundle sheath chloroplasts have few grana and carry out little photolysis, so little oxygen is produced there. Photorespiration is almost eliminated, at the cost of extra ATP to regenerate PEP. C4 plants therefore grow faster than C3 plants at high temperatures and light intensities, and can fix CO₂ with stomata partly closed, saving water.

| Feature | C3 plant (e.g. wheat) | C4 plant (e.g. maize) |
|---|---|---|
| First CO₂ acceptor | RuBP (5C) | PEP (3C) |
| First stable product | GP (3C) | Oxaloacetate (4C) |
| Enzyme fixing CO₂ from the air | Rubisco | PEP carboxylase |
| Site of Calvin cycle | Mesophyll cells | Bundle sheath cells |
| Photorespiration at high temperature | High | Very low |

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards: the Calvin cycle (rubisco, RuBP, GP, TP, ATP and reduced NADP, regeneration), the uses of GP and TP, and the effects of light and CO₂ on GP and RuBP. C4 plants (PEP carboxylase, malate, Kranz anatomy, bundle sheath cells, photorespiration): **ZIMSEC detail**; Cambridge does not require it.
:::

## Common mistakes

:::mistake{title="Saying the Calvin cycle happens in the dark"}
It is light-**independent**, not dark-dependent: it runs in the light, using ATP and reduced NADP, and stops soon after the light is switched off.
:::

:::mistake{title="Saying RuBP is reduced"}
RuBP is **carboxylated** (fixed). **GP** is reduced to TP.
:::

:::mistake{title="Saying glucose is the direct product"}
The product of the cycle is **triose phosphate**; two TP are needed to make one hexose.
:::

:::mistake{title="Saying C4 plants do not have a Calvin cycle"}
C4 plants have a normal Calvin cycle in their **bundle sheath cells**; the C4 pathway only concentrates CO₂ for it.
:::

## Exam tips

:::exam-tip
Cambridge Paper 4 and ZIMSEC Paper 2 often ask you to *predict and explain* changes in GP and RuBP. Say which step stops (fixation or reduction/regeneration), which compound is still made and which is still used.
:::

:::exam-tip
ZIMSEC Paper 3 essays may ask you to *describe* the Calvin cycle and *explain* how C4 plants are adapted to hot climates. Use the terms PEP carboxylase, malate, bundle sheath, Kranz anatomy and photorespiration, and link each to the high CO₂ concentration around rubisco.
:::

## Summary

:::summary
- In the stroma, rubisco fixes CO₂ with RuBP (5C), giving two GP (3C).
- GP is reduced to TP using ATP and reduced NADP; five of every six TP regenerate RuBP using more ATP.
- TP is used for hexoses, sucrose, starch, cellulose, lipids and amino acids; GP for some amino acids.
- In the dark GP rises and RuBP falls; at low CO₂ RuBP rises and GP falls.
- C4 plants (ZIMSEC) fix CO₂ with PEP carboxylase in mesophyll cells and release it to rubisco in bundle sheath cells, avoiding photorespiration in hot, bright conditions.
:::
