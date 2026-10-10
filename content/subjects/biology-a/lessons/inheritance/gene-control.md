---
{
  "key": "inheritance.gene-control",
  "title": "Control of gene expression",
  "summary": "How cells switch genes on and off: structural and regulatory genes, inducible and repressible enzymes, the lac operon in E. coli with its promoter, operator, structural genes and repressor, transcription factors in eukaryotes, and how gibberellin removes DELLA proteins so that genes for growth and amylase are expressed.",
  "concepts": ["abio.inheritance.gene-control"],
  "estimatedMinutes": 35,
  "level": "core"
}
---
## Introduction

Every cell in your body (apart from red blood cells and gametes) carries the same genes, yet a liver cell makes albumin and a pancreatic beta cell makes insulin. A bacterium in the gut makes enzymes to digest lactose only when lactose is present. A barley grain makes amylase only after it has taken up water and the embryo has released gibberellin. In each case the cell controls **gene expression**: which genes are transcribed, and when. Making proteins costs energy and raw materials, so switching genes on only when they are needed saves both.

You should already understand transcription (RNA polymerase binding to a promoter and making mRNA) and translation, and know how gibberellin acts in barley seeds.

## Key definitions

:::definition{term="Structural gene"}
A gene that codes for a protein with a function in the cell other than controlling the expression of other genes, such as an enzyme, a transport protein or a structural protein.
:::

:::definition{term="Regulatory gene"}
A gene that codes for a protein (such as a repressor or a transcription factor) that controls the expression of other genes.
:::

:::definition{term="Inducible enzyme"}
An enzyme that is synthesised only when its substrate (or a related inducer molecule) is present; the substrate switches on transcription of the gene.
:::

:::definition{term="Repressible enzyme"}
An enzyme whose synthesis is normally switched on but can be switched off, usually when the end product of the pathway it catalyses accumulates.
:::

:::definition{term="Operon"}
A group of structural genes in a prokaryote that are transcribed together as one mRNA, controlled by one promoter and one operator.
:::

:::definition{term="Transcription factor"}
A protein that binds to DNA in the region of a gene's promoter (or to RNA polymerase) and increases or decreases the rate of transcription of that gene.
:::

## Inducible and repressible enzymes

| | Inducible enzyme | Repressible enzyme |
|---|---|---|
| Normal state of the gene | Off | On |
| Switched by | Presence of the substrate (inducer) | Accumulation of the end product |
| Usual role | Breaking down a nutrient that is only sometimes available | Making a product the cell needs, such as an amino acid |
| Bacterial example | β-galactosidase (lac operon) | Enzymes of tryptophan synthesis |

## The lac operon in *Escherichia coli*

*E. coli* normally respires glucose. If glucose is absent and lactose is present, it switches on genes for using lactose. The DNA involved is arranged in this order:

1. **Regulatory gene (lacI)**, with its own promoter. It is always transcribed and codes for the **repressor protein**. It lies outside the operon.
2. **Promoter**: the DNA sequence where RNA polymerase binds to start transcription of the structural genes.
3. **Operator**: a sequence next to (overlapping) the promoter, where the repressor protein can bind.
4. **Structural genes**, transcribed together as one mRNA:
   - **lacZ** codes for **β-galactosidase**, which hydrolyses lactose into glucose and galactose;
   - **lacY** codes for **lactose permease**, a membrane protein that takes lactose into the cell;
   - **lacA** codes for **transacetylase** (its role is not needed).

| Region | What it is | Role |
|---|---|---|
| lacI | Regulatory gene | Codes for the repressor protein |
| Promoter | DNA sequence | Binding site for RNA polymerase |
| Operator | DNA sequence | Binding site for the repressor |
| lacZ, lacY, lacA | Structural genes | Code for β-galactosidase, permease, transacetylase |

### When lactose is absent

1. The repressor protein is made continuously.
2. It binds to the **operator**.
3. Bound repressor prevents RNA polymerase from binding to the promoter (or from moving along the DNA).
4. The structural genes are **not transcribed**; no enzymes are made, saving ATP and amino acids.

### When lactose is present

1. Lactose enters the cell (a few permease molecules are always present).
2. Lactose (strictly, a molecule made from it) binds to a second site on the **repressor**, changing the repressor's shape.
3. The altered repressor can no longer bind to the operator and is released from it.
4. RNA polymerase binds to the promoter and **transcribes** lacZ, lacY and lacA into one mRNA.
5. β-galactosidase and permease are made; lactose is taken up and hydrolysed.
6. When the lactose has been used up, the repressor returns to its original shape, binds to the operator again and transcription stops.

Lactose is therefore the **inducer**, and β-galactosidase is an **inducible enzyme**. (The extra role of cyclic AMP when glucose is absent is not required.)

:::worked-solution[Interpreting enzyme activity data]
*E. coli* was grown without lactose, then lactose was added at 20 minutes. β-galactosidase activity was measured.

| Time / min | 0 | 10 | 20 | 30 | 40 | 50 |
|---|---|---|---|---|---|---|
| Activity / arbitrary units | 2 | 2 | 2 | 15 | 48 | 80 |

1. Before 20 minutes the activity stays at a low background value of 2 units: the repressor is bound to the operator.
2. After lactose is added, activity rises, slowly at first and then steeply, to 80 units at 50 minutes.
3. Increase from 20 to 50 minutes $= 80 - 2 = 78$ units; mean rate of increase $= 78 \div 30 = 2.6$ units per minute.
4. The delay after 20 minutes is the time needed for lactose to inactivate the repressor and for transcription and translation of the new enzyme.
:::

:::example{title="Predicting the effect of mutations"}
**Mutation in lacI so that the repressor cannot bind to the operator:** the structural genes are transcribed all the time, with or without lactose. **Mutation in lacI so that the repressor cannot bind lactose:** the repressor stays on the operator even when lactose is present, so the enzymes are never made. **Mutation in the operator so that the repressor cannot bind:** the genes are always on.
:::

## Transcription factors in eukaryotes

Eukaryotic genes are not organised in operons. Instead, the transcription of each gene is controlled by **transcription factors**: proteins that move into the nucleus and bind to specific DNA sequences in or near the promoter.

1. Some transcription factors help RNA polymerase bind to the promoter, so they **increase** transcription.
2. Others block the binding of RNA polymerase, so they **decrease** transcription.
3. Transcription factors may themselves be switched on or off by signals such as hormones, allowing cells to respond to their environment. For example, a steroid hormone can bind to a receptor in the cytoplasm, and the hormone-receptor complex then acts as a transcription factor.
4. Different combinations of transcription factors in different cells explain why cells with the same genes express different proteins.

## Gibberellin and DELLA proteins

Gibberellin switches on genes for growth in stems and, in germinating barley grains, the gene for amylase in the aleurone layer. It works by removing an inhibitor.

1. **DELLA proteins** normally bind to a transcription factor (for example, one called PIF) and stop it from activating transcription. Growth genes, or the amylase gene, are therefore switched off.
2. **Gibberellin** binds to a gibberellin **receptor** protein in the cell.
3. The gibberellin-receptor complex binds to the DELLA protein, which is then tagged and **broken down** (by a protein complex called a proteasome).
4. The **transcription factor is released** and can bind to the promoter of its target genes.
5. RNA polymerase transcribes the genes: in stems, genes for cell elongation; in the aleurone layer, the gene for **amylase**.

This links to the Le gene in peas: le le plants make little active gibberellin, so DELLA proteins are not removed and stem growth genes stay largely switched off, giving dwarf plants.

:::keyfact{title="ZIMSEC and Cambridge"}
Cambridge only: the lac operon, transcription factors and the gibberellin-DELLA mechanism are Cambridge 9700 A Level topics (Paper 4). The role of cyclic AMP in the lac operon is not expected. ZIMSEC does not set this concept.
:::

## Common mistakes

:::mistake{title="Saying lactose binds to the operator"}
Lactose binds to the **repressor protein**, changing its shape so that it leaves the operator.
:::

:::mistake{title="Saying the regulatory gene is part of the operon"}
lacI has its own promoter and lies outside the operon; the operon is promoter, operator and the structural genes.
:::

:::mistake{title="Saying gibberellin binds to DNA"}
Gibberellin causes the breakdown of DELLA proteins. The released transcription factor is what binds to DNA.
:::

:::mistake{title="Mixing up the promoter and the operator"}
RNA polymerase binds to the promoter; the repressor binds to the operator.
:::

## Exam tips

:::exam-tip
In *explain* questions on the lac operon (Cambridge Paper 4), give both states in order and name every molecule and site: repressor, operator, RNA polymerase, promoter, lactose binding to the repressor, shape change, transcription of lacZ, lacY, lacA.
:::

:::exam-tip
For gibberellin and DELLA, the key chain is: gibberellin binds receptor → DELLA broken down → transcription factor freed → transcription of the target gene (amylase in barley).
:::

## Summary

:::summary
- Structural genes code for proteins such as enzymes; regulatory genes code for proteins that control other genes.
- Inducible enzymes are made when their substrate is present; repressible enzymes are switched off when their product accumulates.
- In the lac operon, the repressor binds the operator and blocks transcription; lactose binds the repressor, which leaves the operator so that lacZ, lacY and lacA are transcribed.
- Eukaryotic transcription factors bind near promoters to increase or decrease transcription.
- Gibberellin causes the breakdown of DELLA proteins, releasing transcription factors so that growth genes and the amylase gene are expressed.
:::
