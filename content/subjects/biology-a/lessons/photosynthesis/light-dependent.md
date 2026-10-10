---
{
  "key": "photosynthesis.light-dependent",
  "title": "The light-dependent stage of photosynthesis",
  "summary": "How light excites electrons in photosystems I and II, how non-cyclic photophosphorylation splits water and makes ATP and reduced NADP, how cyclic photophosphorylation makes ATP only, how chemiosmosis across the thylakoid membrane works, and how this compares with chemiosmosis in mitochondria.",
  "concepts": ["abio.photosynthesis.light-dependent"],
  "estimatedMinutes": 45,
  "level": "core"
}
---
## Introduction

On a clear morning over the tobacco fields near Marondera, sunlight reaching each leaf is absorbed by pigments in the thylakoid membranes. Within a fraction of a second, that energy has moved electrons out of chlorophyll, split water, released oxygen and made the two products the plant needs to fix carbon dioxide: **ATP** and **reduced NADP**.

This lesson explains how. You should already know the structure of the chloroplast, the photosynthetic pigments, and the principle of chemiosmosis from the lessons on ATP and oxidative phosphorylation.

## Key definitions

:::definition{term="Photosystem"}
A complex of pigment molecules and proteins in the thylakoid membrane, with a light-harvesting system of accessory pigments that funnels energy to a reaction centre containing chlorophyll a.
:::

:::definition{term="Photoactivation"}
The absorption of light energy by chlorophyll, which raises electrons to a higher energy level so that they leave the molecule and are accepted by an electron acceptor.
:::

:::definition{term="Photolysis"}
The splitting of water using energy derived from light, catalysed by the oxygen-evolving complex of photosystem II, giving protons, electrons and oxygen.
:::

:::definition{term="Photophosphorylation"}
The synthesis of ATP from ADP and inorganic phosphate using energy from light, by chemiosmosis across the thylakoid membrane.
:::

:::keyfact{title="Equation for photolysis"}
$$2\text{H}_2\text{O} \rightarrow 4\text{H}^+ + 4e^- + \text{O}_2$$
Photosystem II has a reaction centre that absorbs best at about 680 nm (P680) and photosystem I at about 700 nm (P700).
:::

## Photosystems and photoactivation

Each photosystem contains hundreds of pigment molecules arranged as a **light-harvesting system** (an antenna complex). When any of them absorbs a photon, the energy is passed from pigment to pigment until it reaches the **reaction centre**, a pair of chlorophyll a molecules. There, the energy **excites an electron** to a high energy level. The electron leaves the chlorophyll and is taken up by an **electron acceptor**. The chlorophyll is now oxidised and must get an electron back before it can be excited again.

## Non-cyclic photophosphorylation

This pathway involves both photosystems and produces ATP, reduced NADP and oxygen. Follow the electrons:

1. **Light excites electrons in PSII.** Light energy reaching the reaction centre of photosystem II raises two electrons to a high energy level; they pass to an electron acceptor.
2. **Photolysis replaces them.** The oxygen-evolving complex of PSII splits water: $2\text{H}_2\text{O} \rightarrow 4\text{H}^+ + 4e^- + \text{O}_2$. The electrons fill the gaps in PSII; the protons stay in the **thylakoid space**; oxygen diffuses out of the chloroplast and the leaf, or is used in respiration.
3. **Electron transport.** The excited electrons pass along an **electron transport chain** of carriers in the thylakoid membrane to PSI, losing energy. This energy is used to **pump protons** from the stroma into the thylakoid space.
4. **Light excites electrons in PSI.** Light absorbed by photosystem I raises its electrons to a high energy level again. The electrons from the chain replace them.
5. **Reduction of NADP.** The excited electrons from PSI pass, via a short carrier chain, to **NADP** in the stroma, which also takes up protons from the stroma, forming **reduced NADP** (catalysed by NADP reductase).
6. **ATP synthesis.** The protons in the thylakoid space (from photolysis and from pumping) diffuse back into the stroma through **ATP synthase**, which makes ATP: **chemiosmosis**.

The flow of electrons is one-way, from water to NADP, which is why it is called **non-cyclic**.

## Cyclic photophosphorylation

Only **photosystem I** is involved. Excited electrons from PSI pass to an acceptor, then along carriers in the membrane and **back to PSI**. As they pass along the carriers, energy is used to pump protons into the thylakoid space, and ATP is made by chemiosmosis.

- No water is split, so **no oxygen** is released.
- No NADP is reduced.
- **Only ATP** is produced.

Cyclic photophosphorylation tops up ATP: the Calvin cycle needs more ATP than reduced NADP (3 ATP for every 2 reduced NADP per CO₂ fixed).

| Feature | Non-cyclic | Cyclic |
|---|---|---|
| Photosystems | PSII and PSI | PSI only |
| Source of electrons | Water (photolysis) | PSI (electrons return to it) |
| Final electron acceptor | NADP | PSI (chlorophyll a) |
| Products | ATP, reduced NADP, O₂ | ATP only |
| Photolysis of water | Yes | No |

:::worked-solution[Counting water, electrons and oxygen]
How many molecules of water must be split, and how many molecules of oxygen are released, to reduce 6 molecules of NADP by non-cyclic photophosphorylation?
1. Each NADP is reduced by **2 electrons** (and a proton): $6 \times 2 = 12$ electrons.
2. Each water molecule gives **2 electrons** in photolysis: $12 \div 2 = 6$ water molecules.
3. Two water molecules give one O₂: $6 \div 2 = 3$ molecules of oxygen.
4. So the oxygen released in photosynthesis comes from **water**, not from carbon dioxide, as experiments with water labelled with the isotope ¹⁸O have shown.
:::

## Chemiosmosis in the chloroplast

- Protons build up in the **thylakoid space**: they are pumped in by the carriers and released there by photolysis, and they are removed from the stroma when NADP is reduced. All three steepen the gradient.
- The thylakoid membrane is impermeable to protons except through **ATP synthase**.
- Protons diffuse from the thylakoid space into the **stroma** through ATP synthase, which makes ATP on the stromal side, where the Calvin cycle uses it.

| | Chloroplast | Mitochondrion |
|---|---|---|
| Membrane | Thylakoid membrane | Inner membrane (cristae) |
| Protons pumped into | Thylakoid space | Intermembrane space |
| ATP made in | Stroma | Matrix |
| Energy source for electrons | Light | Oxidation of reduced NAD and FAD |
| Source of electrons | Water (or PSI in cyclic) | Reduced NAD and reduced FAD |
| Final electron acceptor | NADP (non-cyclic) | Oxygen |
| Name | Photophosphorylation | Oxidative phosphorylation |

:::example{title="The Hill reaction with DCPIP"}
Farai prepared a chloroplast suspension in cold buffer and set up four tubes with DCPIP, a blue dye that turns colourless when reduced.

| Tube | Contents | Conditions | Time for blue colour to disappear / min |
|---|---|---|---|
| A | Chloroplast suspension + DCPIP | Light | 6 |
| B | Chloroplast suspension + DCPIP | Dark (foil) | No change after 30 |
| C | Boiled chloroplast suspension + DCPIP | Light | No change after 30 |
| D | Buffer + DCPIP (no chloroplasts) | Light | No change after 30 |

**Explain:** in tube A, light excites electrons in the photosystems, and DCPIP accepts them in place of NADP, so it is reduced and loses its colour. Tube B shows that light is needed. Tube C shows that working (not denatured) thylakoid proteins are needed. Tube D shows that light alone does not reduce DCPIP. The experiment shows that isolated chloroplasts in light release electrons from water even without carbon dioxide.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards: photoactivation, PSI and PSII, non-cyclic and cyclic photophosphorylation, photolysis, chemiosmosis and the comparison with mitochondria. Named intermediate carriers (plastoquinone, ferredoxin and so on) are not required. Cambridge examines this on Paper 4; ZIMSEC on Papers 1-3.
:::

## Common mistakes

:::mistake{title="Saying the oxygen comes from carbon dioxide"}
All the oxygen released comes from **water**, split by photolysis.
:::

:::mistake{title="Saying cyclic photophosphorylation produces reduced NADP"}
Cyclic photophosphorylation produces **ATP only**; electrons return to PSI instead of reducing NADP.
:::

:::mistake{title="Saying light splits water directly"}
Water is split by the oxygen-evolving complex (an enzyme) of PSII, driven by the need to replace electrons lost from photoactivated chlorophyll.
:::

:::mistake{title="Putting the proton gradient the wrong way round"}
Protons accumulate **inside** the thylakoid and flow **out** to the stroma through ATP synthase.
:::

## Exam tips

:::exam-tip
Cambridge Paper 4 and ZIMSEC Paper 2 often give a flow chart described in words and ask you to *identify* PSI, PSII or photolysis. *Describe* non-cyclic photophosphorylation in order: light → PSII excited → electrons along carriers (protons pumped) → PSI excited → NADP reduced; water replaces PSII electrons.
:::

:::exam-tip
For *compare* questions use a two-column table. In ZIMSEC Paper 3, "Describe the light-dependent stage" often carries 8-12 marks: include photolysis, both photosystems, chemiosmosis and the products.
:::

## Summary

:::summary
- Light energy is funnelled to reaction centres of chlorophyll a in PSI and PSII, exciting electrons.
- Non-cyclic photophosphorylation (PSII and PSI) splits water, releases O₂, pumps protons and makes ATP and reduced NADP.
- Cyclic photophosphorylation (PSI only) makes ATP only; no water is split and no NADP is reduced.
- Protons accumulate in the thylakoid space and flow through ATP synthase into the stroma, making ATP.
- Chloroplasts and mitochondria both use chemiosmosis but differ in membranes, energy sources and final electron acceptors.
:::
