---
{
  "key": "nucleic.dna-replication",
  "title": "Semi-conservative replication of DNA",
  "summary": "How DNA is copied in the S phase: unwinding and separation of the strands, complementary pairing of free nucleotides, DNA polymerase working only in the 5' to 3' direction, leading and lagging strands with Okazaki fragments joined by DNA ligase, and how the Meselson and Stahl experiment showed that replication is semi-conservative.",
  "concepts": ["abio.nucleic.dna-replication"],
  "estimatedMinutes": 35,
  "level": "core"
}
---
## Introduction

Every time a cell in your body divides, it copies about six thousand million base pairs of DNA, and it makes very few mistakes. The structure of DNA proposed in 1953 immediately suggested how: each strand could act as a template for a new partner. But was that really how it worked? In 1958 Meselson and Stahl answered the question with an elegant experiment using heavy nitrogen. This lesson explains the mechanism of replication and the evidence for it.

You should already know the structure of DNA (antiparallel strands, complementary base pairing, 5' and 3' ends) and that replication happens in the S phase of the cell cycle.

## Key definitions

:::definition{term="Semi-conservative replication"}
DNA replication in which each new DNA molecule consists of one original (parental) strand and one newly synthesised strand.
:::

:::definition{term="DNA polymerase"}
The enzyme that catalyses the formation of phosphodiester bonds between free DNA nucleotides, adding them to the 3' end of a growing strand that is complementary to the template.
:::

:::definition{term="DNA ligase"}
The enzyme that joins the sugar-phosphate backbones of adjacent DNA fragments, such as Okazaki fragments, by forming phosphodiester bonds.
:::

:::definition{term="Okazaki fragments"}
Short sections of DNA made discontinuously on the lagging strand during replication, later joined by DNA ligase.
:::

:::keyfact{title="One direction only"}
DNA polymerase can add nucleotides only to the **3' end** of a strand, so new DNA is always made in the **5' → 3'** direction. The template is read 3' → 5'.
:::

## The steps of replication

1. **Unwinding.** The double helix unwinds and the hydrogen bonds between complementary bases are broken, separating the two strands. (The enzyme that does this, DNA helicase, need only be named.) The point where the strands separate is a **replication fork**.
2. **Free nucleotides pair.** Activated free DNA nucleotides in the nucleus pair with the exposed bases on **each** template strand by complementary base pairing: A with T and C with G, held by hydrogen bonds.
3. **DNA polymerase joins nucleotides.** DNA polymerase catalyses condensation reactions between the nucleotides, forming **phosphodiester bonds** and building a new sugar-phosphate backbone. It works only in the 5' → 3' direction.
4. **Leading strand.** On the template that runs 3' → 5' towards the fork, the new strand is made **continuously**, following the fork as it opens.
5. **Lagging strand.** On the other template, the new strand must be made in the opposite direction to fork movement. It is made **discontinuously**, as short **Okazaki fragments**, each started as more template is exposed.
6. **Ligase joins the fragments.** DNA ligase forms phosphodiester bonds between adjacent Okazaki fragments, making a continuous strand.
7. **Two molecules.** Each new DNA molecule winds into a double helix. Each contains **one old strand and one new strand**: replication is semi-conservative.

In eukaryotes replication starts at many points (origins) along each chromosome at once, so the very long molecules are copied in a few hours. The two DNA molecules become the sister chromatids of the chromosome.

![Replication fork: the parental double helix on the right is unwound by helicase; on the upper template the leading strand is built continuously towards the fork by DNA polymerase, while on the lower template the lagging strand is built away from the fork as short Okazaki fragments that ligase later joins; DNA polymerase adds nucleotides only in the 5' to 3' direction.](media:diagrams/dna-replication-fork.png "Figure: the replication fork, showing why one new strand is continuous and the other is made in fragments")

:::example{title="Why two different mechanisms on the two strands?"}
The two template strands are antiparallel. As the fork opens, one template exposes its bases in the direction that lets a new strand grow 5' → 3' towards the fork: this strand is made continuously. On the other template, growing 5' → 3' means moving **away** from the fork, so the enzyme must keep starting again nearer the fork, making short fragments.
:::

## Accuracy

Complementary base pairing makes copying accurate, and DNA polymerase also checks ("proofreads") each new base pair and removes most mismatches. Errors that remain are **mutations**, which are rare. This matters because the base sequence carries the genetic code; daughter cells must receive identical copies.

## The evidence: Meselson and Stahl

Three models were possible:

| Model | Prediction for each new molecule |
|---|---|
| Conservative | One molecule entirely old, one entirely new |
| Semi-conservative | Each molecule one old strand and one new strand |
| Dispersive | Each strand a patchwork of old and new sections |

**Method:**

1. Bacteria (*Escherichia coli*) were grown for many generations in a medium whose only nitrogen source contained the heavy isotope **¹⁵N**, so all their DNA bases contained heavy nitrogen.
2. They were transferred to a medium containing only the normal, light isotope **¹⁴N** and allowed to divide.
3. Samples were taken after one and two generations. DNA was extracted and spun at very high speed in a solution of caesium chloride, which forms a density gradient. DNA settles at the level matching its density, forming a band.

**Results and interpretation:**

| Sample | Bands observed | Explanation |
|---|---|---|
| Generation 0 (¹⁵N only) | One band, low (heavy) | Both strands ¹⁵N |
| Generation 1 | One band, intermediate (hybrid) | Each molecule ¹⁵N + ¹⁴N: rules out conservative, which predicts one heavy and one light band |
| Generation 2 | Two bands, equal amounts: intermediate and light | Half the molecules hybrid, half all-¹⁴N: rules out dispersive, which predicts a single band moving gradually towards light |

Only the semi-conservative model predicts both results.

![Meselson and Stahl result: after growth in heavy nitrogen the DNA forms one low heavy band; after one generation in light nitrogen it forms one intermediate hybrid band; after two generations there are equal hybrid and light bands; after three generations 2 of 8 molecules are hybrid and 6 of 8 are light. Only semi-conservative replication predicts all of these.](media:diagrams/meselson-stahl-bands.png "Figure: DNA bands in the Meselson-Stahl experiment (band thickness shows the proportion of molecules)")

:::worked-solution[Predicting band proportions after three generations]
1. Start with 1 molecule with two ¹⁵N strands.
2. Each generation doubles the number of molecules: after 3 generations there are $2^3 = 8$ molecules.
3. The two original ¹⁵N strands are never broken up; each ends up in a different molecule paired with a ¹⁴N strand. So 2 molecules are hybrid.
4. The other $8 - 2 = 6$ molecules are entirely ¹⁴N (light).
5. Proportions: hybrid $2/8 = 25\%$, light $6/8 = 75\%$, heavy 0%.
:::

:::worked-solution[How long does it take to copy a bacterial chromosome?]
A bacterial chromosome of about 4 600 000 base pairs is replicated from one origin by two forks moving in opposite directions. Assume each fork copies about 1000 base pairs per second.
1. Each fork copies half the chromosome: $4\,600\,000 \div 2 = 2\,300\,000$ base pairs.
2. Time $= 2\,300\,000 \div 1000 = 2300$ s.
3. In minutes: $2300 \div 60 = 38.3$ minutes, about 38 minutes.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards: the semi-conservative mechanism, DNA polymerase, ligase, leading and lagging strands. The **Meselson and Stahl experiment** is named in the ZIMSEC syllabus; Cambridge does not name it, but it is the standard evidence and helps you explain why replication is semi-conservative.
:::

## Common mistakes

:::mistake{title="Saying DNA polymerase breaks the hydrogen bonds"}
Unwinding and strand separation are done by another enzyme (helicase). DNA polymerase joins nucleotides into a new strand.
:::

:::mistake{title="Saying DNA polymerase forms hydrogen bonds"}
Hydrogen bonds between complementary bases form spontaneously. DNA polymerase catalyses **phosphodiester** bond formation.
:::

:::mistake{title="Saying one new molecule is 'old' and one is 'new'"}
That is the conservative model, which was disproved. Every new molecule has one old and one new strand.
:::

:::mistake{title="Saying the lagging strand is made 3' to 5'"}
All new DNA is made 5' to 3'. The lagging strand is made in fragments, each built 5' to 3'.
:::

## Exam tips

:::exam-tip
In ZIMSEC Papers 2 and 3 and Cambridge Papers 1 and 2, *describe semi-conservative replication* needs: strands separate (hydrogen bonds broken), each strand a template, free nucleotides pair by complementary base pairing, DNA polymerase forms phosphodiester bonds, each new molecule has one old and one new strand.
:::

:::exam-tip
For Meselson and Stahl (ZIMSEC), state what each model predicts **for each generation** and show which observation rules each model out. Draw (or describe) bands as heavy, hybrid and light.
:::

## Summary

:::summary
- Replication is semi-conservative: each new molecule has one parental and one new strand.
- Strands separate; free nucleotides pair with each template; DNA polymerase forms phosphodiester bonds, working 5' → 3' only.
- The leading strand is made continuously; the lagging strand is made as Okazaki fragments joined by DNA ligase.
- Complementary pairing and proofreading make copying very accurate.
- Meselson and Stahl's ¹⁵N/¹⁴N experiment (one hybrid band, then hybrid + light) ruled out conservative and dispersive replication.
:::
