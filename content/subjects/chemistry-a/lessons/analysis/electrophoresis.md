---
{
  "key": "analysis.electrophoresis",
  "title": "Electrophoresis and genetic fingerprinting",
  "summary": "How electrophoresis separates charged species in a buffered gel or paper by charge and size; the effect of pH on the charge of amino acids and proteins; hydrolysing proteins and separating and detecting the amino acids; an outline of DNA analysis and genetic fingerprinting, with its forensic and paternity uses.",
  "concepts": ["achem.analysis.electrophoresis"],
  "estimatedMinutes": 40,
  "level": "core"
}
---
## Introduction

When a court needs to know whether a blood stain came from a suspect, or a family needs to settle a question of parentage, scientists compare patterns of DNA fragments separated in a gel by an electric field. The same technique, **electrophoresis**, separates the amino acids from a hydrolysed protein, and is used in hospitals to detect abnormal proteins in blood.

This lesson explains how electrophoresis works, how pH controls the charge (and so the movement) of amino acids, how proteins are analysed, and the main steps of genetic fingerprinting. You should know the structure of amino acids (amine and carboxylic acid groups), zwitterions, peptide links and hydrolysis, and that DNA is a polymer carrying negatively charged phosphate groups.

## Key definitions

:::definition{term="Electrophoresis"}
The separation of charged particles by their different rates of movement in an electric field, through a gel or paper soaked in a buffer solution.
:::

:::definition{term="Zwitterion"}
An ion carrying both a positive and a negative charge, so that its overall charge is zero, such as $\ce{^+H3NCH2COO^-}$ for glycine.
:::

:::definition{term="Isoelectric point"}
The pH at which an amino acid (or protein) exists mainly as the zwitterion, has no overall charge, and so does not move in electrophoresis.
:::

:::definition{term="Restriction enzyme"}
An enzyme that cuts DNA at a particular short sequence of bases, producing fragments of different lengths.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
ZIMSEC only (Form 6, 6.4.2.4): electrophoresis, the effect of pH, analysis of hydrolysed proteins and genetic fingerprinting. Cambridge examines electrophoresis of amino acids only, in the amino acids lesson.
:::

## How electrophoresis works

1. A slab of **gel** (such as agarose or polyacrylamide), or a strip of paper, is soaked in a **buffer** that fixes the pH and conducts electricity.
2. The sample is placed in a well or on a line in the gel.
3. A direct-current voltage is applied across the gel.
4. **Positive ions move towards the cathode (negative electrode)**; **negative ions move towards the anode (positive electrode)**; neutral species do not move.
5. After a set time the current is switched off and the positions of the components are revealed with a stain or locating agent.

The **rate** of movement depends on:

| Factor | Effect |
|---|---|
| size of charge | a larger charge gives a larger force, so faster movement |
| size (mass) of the particle | larger particles move more slowly; the gel acts like a sieve |
| shape | compact particles move through the gel more easily |
| voltage | a larger voltage moves all particles faster |
| pH of the buffer | changes the charge on amino acids and proteins |

## The effect of pH on amino acids

An amino acid, $\ce{H2NCH(R)COOH}$, has a basic amine group and an acidic carboxylic acid group. Its charge depends on the pH of the buffer:

| Conditions | Main form of glycine | Overall charge | Movement |
|---|---|---|---|
| low pH (excess $\ce{H+}$) | $\ce{^+H3NCH2COOH}$ | +1 | towards the cathode |
| at its isoelectric point | $\ce{^+H3NCH2COO^-}$ (zwitterion) | 0 | does not move |
| high pH (excess $\ce{OH-}$) | $\ce{H2NCH2COO^-}$ | −1 | towards the anode |

Amino acids with an extra acidic group in R (such as aspartic acid, R = CH₂COOH) or an extra basic group (such as lysine, R = (CH₂)₄NH₂) can carry charges of −2 or +2 at suitable pH values. At a chosen pH, different amino acids therefore carry different charges, move in different directions or at different speeds, and separate.

:::example{title="Example 1: predicting movement at pH 6"}
A mixture of glycine, lysine and aspartic acid is placed in the centre of a gel buffered at pH 6. Data: isoelectric points, glycine about 6.0, lysine about 9.7, aspartic acid about 2.8.

1. Glycine is at its isoelectric point: overall charge 0, so it stays near the start.
2. Lysine: pH 6 is below its isoelectric point, so it carries an overall positive charge (its extra –NH₂ is protonated). It moves towards the cathode.
3. Aspartic acid: pH 6 is above its isoelectric point, so it carries an overall negative charge (its extra –COOH has lost H⁺). It moves towards the anode.
4. The three amino acids separate in three directions.
:::

## Analysing a protein

1. **Hydrolysis.** The protein is heated under reflux with concentrated hydrochloric acid (about 6 mol dm⁻³) for many hours. Every peptide link, –CO–NH–, is hydrolysed, releasing the individual amino acids.
2. **Separation.** The mixture is spotted on a buffered gel or paper and electrophoresis is carried out (often with a second run at a different pH, or chromatography, to separate amino acids that move together).
3. **Detection.** Amino acids are colourless, so the gel or paper is sprayed with **ninhydrin** and warmed: purple spots appear.
4. **Identification.** Distances moved are compared with those of known amino acids run at the same time under the same conditions.

Whole proteins can also be separated by electrophoresis without hydrolysis, for example to detect abnormal haemoglobin in blood samples.

## Genetic fingerprinting (DNA profiling)

Most DNA is the same in all humans, but some regions contain short sequences repeated a different number of times in different people. Fragments containing these regions therefore have lengths that differ between individuals. In outline:

1. **Extraction.** DNA is extracted from cells in a sample (blood, saliva, hair roots, skin). Very small samples can be copied many times by the polymerase chain reaction (PCR).
2. **Cutting.** **Restriction enzymes** cut the DNA at specific base sequences, giving fragments of many different lengths.
3. **Separation.** The fragments are separated by gel electrophoresis. DNA carries a negative charge on every phosphate group, so all fragments move towards the **anode**; **shorter fragments move further** through the gel.
4. **Transfer and probing.** The fragments are transferred to a membrane and treated with **probes**: short, single-stranded pieces of DNA, labelled radioactively or with a fluorescent dye, that bind to complementary sequences in the repeated regions.
5. **Visualising.** The labelled fragments show up as a pattern of **bands** (on X-ray film or under UV light), the DNA fingerprint.
6. **Comparison.** Band patterns from different samples are compared.

:::example{title="Example 2: interpreting a paternity test"}
A child's DNA profile has six bands. In a genetic fingerprint every band in a child must come from either the mother or the biological father.

1. Three of the child's bands match bands in the mother's profile.
2. The other three must have come from the father.
3. Man A's profile contains all three of these bands; man B's contains only one of them.
4. Man B cannot be the father. Man A could be; with enough bands examined, a complete match makes it very likely.
:::

**Uses.** Forensic science (matching samples from a crime scene with a suspect, or showing that a suspect could not have left them); paternity and other family-relationship tests; identifying victims of disasters; animal and plant breeding. A match is reported as a probability, and the results must be interpreted carefully. Because DNA profiles are personal information, their collection and storage raise ethical and legal questions about consent and privacy.

## Common mistakes

:::mistake{title="Wrong electrode"}
Positive ions move to the **cathode** (negative); negative ions, including all DNA fragments, move to the **anode** (positive).
:::

:::mistake{title="Saying larger fragments move further"}
In a gel, smaller fragments move faster and further; large ones are held back.
:::

:::mistake{title="Ignoring the buffer pH"}
The same amino acid can move in opposite directions at different pH values; always state the form it takes at that pH.
:::

:::mistake{title="Forgetting the locating agent"}
Amino acids are colourless; ninhydrin is needed to see them.
:::

## Exam tips

:::exam-tip{title="Which papers"}
ZIMSEC Paper 3 Section D (applied chemistry) and Paper 1 multiple-choice and multiple-completion items.
:::

:::exam-tip{title="Command words"}
*Describe* electrophoresis: gel or paper, buffer, voltage, movement to electrodes by charge, detection. *Explain* the effect of pH: give the structure and charge of the amino acid at that pH and the electrode it moves to. *Outline* genetic fingerprinting: extract, cut with restriction enzymes, electrophoresis, probes, visualise, compare. *Discuss* its uses: give a use and a limitation or ethical point.
:::

## Summary

:::summary
- Electrophoresis separates charged species in a buffered gel by charge and size: cations to the cathode, anions to the anode.
- Low pH gives amino acid cations; high pH gives anions; at the isoelectric point the zwitterion does not move.
- Proteins are hydrolysed by heating with concentrated HCl; the amino acids are separated and detected with ninhydrin.
- Genetic fingerprinting: extract DNA, cut with restriction enzymes, separate fragments (shorter moves further, all to the anode), probe and compare band patterns.
- Uses include forensic and paternity testing; results are probabilities and raise privacy questions.
:::
