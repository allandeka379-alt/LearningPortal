---
{
  "key": "respiration.oxidative-phosphorylation",
  "title": "Oxidative phosphorylation and the mitochondrion",
  "summary": "How reduced NAD and FAD deliver hydrogen to the inner mitochondrial membrane, how the electron transport chain pumps protons, how chemiosmosis through ATP synthase makes most of the cell's ATP, why oxygen is the final electron acceptor, how the structure of the mitochondrion suits its function, and how inhibitors such as cyanide stop respiration.",
  "concepts": ["abio.respiration.oxidative-phosphorylation"],
  "estimatedMinutes": 40,
  "level": "core"
}
---
## Introduction

Gold processing plants, including some small-scale operations in Zimbabwe's mining districts, use cyanide solutions to dissolve gold from crushed ore. Cyanide is so dangerous because of where it acts: it blocks the last step of aerobic respiration on the inner membrane of every mitochondrion. Within minutes, cells that depend on aerobic respiration, especially nerve and heart muscle cells, cannot make enough ATP.

This lesson explains that last stage, **oxidative phosphorylation**, which makes most of the ATP in an aerobic cell. You should already know the products of glycolysis, the link reaction and the Krebs cycle (10 reduced NAD and 2 reduced FAD per glucose) and the principle of chemiosmosis from the lesson on ATP.

## Key definitions

:::definition{term="Oxidative phosphorylation"}
The synthesis of ATP from ADP and inorganic phosphate using energy released as electrons from reduced NAD and reduced FAD pass along the electron transport chain to oxygen, coupled through chemiosmosis.
:::

:::definition{term="Electron transport chain"}
A series of electron carrier molecules, many of them proteins, in the inner mitochondrial membrane; electrons pass from one carrier to the next at successively lower energy levels, and the energy released is used to pump protons.
:::

:::definition{term="Final electron acceptor"}
The molecule that accepts electrons at the end of the electron transport chain; in aerobic respiration this is oxygen, which combines with electrons and protons to form water.
:::

:::keyfact{title="Values to know"}
Textbooks commonly use about 2.5 ATP per reduced NAD and about 1.5 ATP per reduced FAD (older books use 3 and 2). Examiners give the values they want you to use.
:::

## The structure of the mitochondrion

An electron micrograph of a mitochondrion shows an oval or sausage-shaped organelle, usually about 1 µm wide. From the outside in:

| Structure | Description | Function |
|---|---|---|
| Outer membrane | Smooth phospholipid bilayer | Separates the organelle from the cytoplasm; contains channel proteins that let pyruvate and small molecules through |
| Intermembrane space | Narrow gap between the membranes | Protons are pumped into it, building up a high concentration |
| Inner membrane | Folded into **cristae**; impermeable to protons except through ATP synthase | Holds the electron carriers and ATP synthase; the folds give a large surface area for many of them |
| Matrix | Gel-like interior | Contains enzymes of the link reaction and Krebs cycle, circular DNA and 70S ribosomes |

ATP synthase molecules can be seen in high-resolution micrographs as small stalked particles on the matrix side of the cristae. Cells with a high ATP demand, such as muscle, sperm midpieces and the proximal convoluted tubule of the kidney, have many mitochondria with densely packed cristae.

## How oxidative phosphorylation works

1. **Delivery of hydrogen.** Reduced NAD and reduced FAD, made in glycolysis, the link reaction and the Krebs cycle, deliver hydrogen atoms to carriers in the inner membrane. NAD and FAD are oxidised and return to the earlier stages.
2. **Splitting of hydrogen.** Each hydrogen atom separates into a **proton** (H⁺) and an **electron** (e⁻).
3. **Electron transport.** The electrons pass along the chain of carriers. Each carrier is reduced when it accepts an electron and oxidised when it passes it on. The electrons move to lower energy levels, so energy is released in small steps.
4. **Proton pumping.** The released energy is used by some carriers to pump protons from the matrix into the **intermembrane space**.
5. **Proton gradient.** Protons accumulate in the intermembrane space. Because the inner membrane is impermeable to them, a steep **electrochemical gradient** forms (a concentration gradient and a difference in charge).
6. **Chemiosmosis.** Protons diffuse back into the matrix through channels in **ATP synthase**. The flow drives the phosphorylation of ADP to ATP.
7. **Oxygen as final acceptor.** At the end of the chain, electrons, protons and oxygen combine to form **water**:

$$
4\text{H}^+ + 4e^- + \text{O}_2 \rightarrow 2\text{H}_2\text{O}
$$

Without oxygen to accept electrons, the carriers stay reduced, electron flow stops, proton pumping stops and no more ATP is made this way. Reduced NAD and FAD are then not re-oxidised, so the Krebs cycle and link reaction also stop.

Reduced FAD gives its hydrogen to the chain at a later point than reduced NAD, so its electrons pump fewer protons and it yields less ATP.

:::worked-solution[Estimating the ATP yield per glucose]
Use the values 2.5 ATP per reduced NAD and 1.5 ATP per reduced FAD. Per glucose the earlier stages give 10 reduced NAD, 2 reduced FAD and 4 ATP by substrate-linked phosphorylation.
1. ATP from reduced NAD $= 10 \times 2.5 = 25$.
2. ATP from reduced FAD $= 2 \times 1.5 = 3$.
3. ATP from oxidative phosphorylation $= 25 + 3 = 28$.
4. Total per glucose $= 28 + 4 = 32$ ATP.
5. Oxidative phosphorylation therefore makes most of the ATP. In real cells the yield is often lower, because some protons leak back across the membrane and energy is used to transport pyruvate, ADP and phosphate into the mitochondrion.
:::

## Respiratory inhibitors

Some poisons act on the electron transport chain or ATP synthase. In outline:

- **Cyanide** binds to the last carrier in the chain (the enzyme cytochrome oxidase), so electrons cannot be passed to oxygen. The whole chain stays reduced, oxygen uptake stops almost completely and ATP synthesis by oxidative phosphorylation stops. Cells must rely on anaerobic respiration, which cannot supply enough ATP for the brain and heart.
- Some substances make the inner membrane leaky to protons (**uncouplers**). Electrons still flow and oxygen is still used, but the proton gradient collapses, so little ATP is made and the energy is released as heat.

:::example{title="Interpreting an oxygen electrode trace"}
A suspension of mitochondria with pyruvate was placed in an oxygen electrode. A respiratory inhibitor was added at 4 minutes.

| Time / min | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 |
|---|---|---|---|---|---|---|---|---|---|
| Oxygen concentration / µmol dm⁻³ | 250 | 220 | 190 | 160 | 130 | 128 | 127 | 127 | 127 |

**Describe:** from 0 to 4 minutes the oxygen concentration falls steadily, by 30 µmol dm⁻³ per minute. After the inhibitor is added it falls by only 2 µmol dm⁻³ in the next minute and then stays constant at 127 µmol dm⁻³.

**Explain:** before 4 minutes, electrons from reduced NAD pass along the chain to oxygen, which is reduced to water. The inhibitor stops electron flow (as cyanide does), so oxygen is no longer used as the final acceptor and its concentration stops falling. ATP synthesis by oxidative phosphorylation would also stop.
:::

## Comparing chemiosmosis in mitochondria and chloroplasts

Both organelles make ATP by the same principle: electron transport releases energy, protons are pumped across a membrane, and protons diffuse back through ATP synthase. In mitochondria the electrons come from reduced NAD and FAD and end on oxygen; protons are pumped into the intermembrane space. In chloroplasts the electrons are excited by light and end on NADP; protons are pumped into the thylakoid space. The photosynthesis lessons give the detail.

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards need the roles of NAD and FAD, electron transport (the carriers need not be named), proton pumping, chemiosmosis, oxygen as final acceptor and the structure of the mitochondrion related to function. ZIMSEC's syllabus calls this stage the "electron transport chain" and "oxidative phosphorylation"; Cambridge uses the same terms and examines it on Paper 4. Detailed structure of ATP synthase is not required by either board.
:::

## Common mistakes

:::mistake{title="Saying protons are pumped into the matrix"}
Protons are pumped **out of** the matrix into the **intermembrane space**, and flow back into the matrix through ATP synthase.
:::

:::mistake{title="Saying oxygen is the final hydrogen acceptor only"}
Oxygen accepts **electrons**; it also combines with protons, forming water. "Final electron acceptor" is the precise term.
:::

:::mistake{title="Saying ATP synthase pumps protons"}
Protons move through ATP synthase **passively**, down their gradient. The carriers of the chain pump them.
:::

:::mistake{title="Saying energy is made"}
Electrons **release** energy as they pass along the chain; energy is not made.
:::

## Exam tips

:::exam-tip
Cambridge Paper 4 and ZIMSEC Paper 2 often give an electron micrograph described in words and ask you to *identify* the cristae, matrix or intermembrane space, then *explain* how the structure helps. Link each feature to a function: "cristae give a large surface area for more electron carriers and ATP synthase".
:::

:::exam-tip
*Explain* questions on inhibitors want the chain of consequences: carrier blocked → electrons cannot reach oxygen → no proton pumping → no gradient → no ATP from ATP synthase → NAD not regenerated → Krebs cycle stops. ZIMSEC Paper 3 essays often ask for "the role of oxygen in respiration".
:::

## Summary

:::summary
- Reduced NAD and FAD deliver hydrogen to the inner mitochondrial membrane; hydrogen splits into protons and electrons.
- Electrons pass along the electron transport chain, releasing energy used to pump protons into the intermembrane space.
- Protons diffuse back through ATP synthase, driving ATP synthesis (chemiosmosis); this makes most of the ATP per glucose.
- Oxygen is the final electron acceptor, forming water; without it the chain, the Krebs cycle and the link reaction stop.
- Cristae, an impermeable inner membrane, a narrow intermembrane space and an enzyme-rich matrix suit the mitochondrion to its role; cyanide blocks the last carrier.
:::
