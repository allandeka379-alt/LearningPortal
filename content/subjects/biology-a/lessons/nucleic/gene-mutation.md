---
{
  "key": "nucleic.gene-mutation",
  "title": "Gene mutations: types, effects and sickle cell anaemia",
  "summary": "What a gene mutation is, how substitutions, deletions and insertions change the base sequence, why some have no effect while others give missense, nonsense or frameshift changes, sickle cell anaemia as a substitution in the β-globin gene, mutagens, and how mutation and environment together shape the phenotype.",
  "concepts": ["abio.nucleic.gene-mutation"],
  "estimatedMinutes": 35,
  "level": "core"
}
---
## Introduction

Sickle cell anaemia is one of the best-known inherited disorders in sub-Saharan Africa, including parts of Zimbabwe. It is caused by a change in a single base pair in one gene, yet it changes the shape of red blood cells, blocks small blood vessels and causes painful crises. Most changes in DNA are far less dramatic, and many have no effect at all. Understanding why is the key to this topic.

A gene is a sequence of nucleotides in DNA that codes for a polypeptide. The sequence is read as triplets of bases, each coding for one amino acid. You should already know the structure of DNA, transcription and translation, and that the genetic code is a non-overlapping, degenerate triplet code with start and stop codons.

## Key definitions

:::definition{term="Gene mutation"}
A change in the sequence of base pairs in a DNA molecule that may result in an altered polypeptide.
:::

:::definition{term="Substitution"}
A mutation in which one base pair is replaced by a different base pair.
:::

:::definition{term="Deletion"}
A mutation in which one or more base pairs are lost from the DNA sequence.
:::

:::definition{term="Insertion"}
A mutation in which one or more extra base pairs are added to the DNA sequence.
:::

:::definition{term="Frameshift"}
A change in the reading frame caused by the insertion or deletion of a number of bases that is not a multiple of three, so every codon after the mutation is altered.
:::

:::definition{term="Mutagen"}
An agent that increases the rate of mutation, such as ionising radiation, ultraviolet light or certain chemicals.
:::

## How mutations arise

Mutations happen **spontaneously**, mostly as rare errors when DNA is copied during replication; DNA polymerase proofreads, but a few mistakes remain. The rate increases with exposure to **mutagens**:

- **Ionising radiation** (X-rays, gamma rays) can break DNA strands.
- **Ultraviolet light** can cause adjacent thymine bases to bond to each other.
- **Chemicals**, for example some compounds in tobacco smoke and aflatoxins produced by moulds growing on poorly stored groundnuts and maize, can alter bases or bind to DNA.

A mutation in a body cell affects only that cell and its descendants (it may contribute to cancer). A mutation in a cell that forms gametes can be passed to offspring.

## Types of gene mutation and their effects

The table shows a short original mRNA and the effect of each kind of mutation in the DNA, shown as the change in the mRNA transcribed from it. Codons used: AUG Met (start); UUC Phe; GGA and GGC Gly; CAG Gln; CCG Pro; UGG Trp; AAA Lys; UAA and UAG stop; UCG Ser; GAC Asp; AGU Ser; AAU Asn; GAG Glu; ACA Thr; GUG Val; GAA Glu; AUA Ile.

| Version | mRNA (5' to 3') | Amino acid sequence |
|---|---|---|
| Original | AUG UUC GGA CAG UGG AAA UAA | Met-Phe-Gly-Gln-Trp-Lys |
| Substitution (silent) | AUG UUC GGC CAG UGG AAA UAA | Met-Phe-Gly-Gln-Trp-Lys |
| Substitution (missense) | AUG UUC GGA CCG UGG AAA UAA | Met-Phe-Gly-Pro-Trp-Lys |
| Substitution (nonsense) | AUG UUC GGA UAG UGG AAA UAA | Met-Phe-Gly |
| Deletion of base 5 | AUG UCG GAC AGU GGA AAU AA | Met-Ser-Asp-Ser-Gly-Asn… |
| Insertion after base 7 | AUG UUC GAG ACA GUG GAA AUA A | Met-Phe-Glu-Thr-Val-Glu-Ile… |

### Substitutions

A substitution changes **one codon** only. Its effect depends on the new codon:

1. **Silent (same-sense):** the new codon codes for the **same amino acid**, because the code is **degenerate** (most amino acids have more than one codon, usually differing in the third base). The polypeptide is unchanged.
2. **Missense:** the new codon codes for a **different amino acid**. The effect depends on where it is and how similar the new amino acid is: a change in the active site of an enzyme, or from a hydrophilic to a hydrophobic R group, can change the tertiary structure and function; a change elsewhere may have little effect.
3. **Nonsense:** the new codon is a **stop codon**, so translation ends early and a **shortened** polypeptide is produced, which is usually non-functional.

### Deletions and insertions

Removing or adding a single base shifts the **reading frame**: every codon after the mutation is read differently, so **every amino acid after it may change**, and a stop codon may appear early or be lost. These **frameshift** mutations usually produce a non-functional protein, especially when they occur near the start of the gene. Inserting or deleting **three** bases adds or removes one amino acid without a frameshift, which may have a smaller effect.

## Why some mutations have no effect

- The code is **degenerate**, so many substitutions in the third base of a codon are silent.
- The mutation may be in a **non-coding** region of DNA, such as an intron (which is removed from pre-mRNA before translation) or DNA between genes.
- A missense change may replace an amino acid with a **similar** one, or occur in a part of the protein that does not affect its shape or function.
- In a diploid organism, a recessive mutant allele has no effect on the phenotype when a normal dominant allele is also present.

:::worked-solution[Classifying a mutation from a sequence]
Part of the coding (sense) strand of a gene is 5' ATG TTC GGA CAG TGG 3'. In a mutant, the fourth triplet is TAG.
1. The mRNA has the same sequence as the coding strand, with U for T: the original codon CAG becomes UAG.
2. CAG codes for glutamine; UAG is a **stop codon**.
3. This is a **substitution** (C replaced by T in the DNA) causing a **nonsense** mutation.
4. Translation stops after Met-Phe-Gly: the polypeptide is shortened and is almost certainly non-functional.
:::

## Sickle cell anaemia

The gene for the β-globin chain of haemoglobin has a normal allele, $Hb^A$, and a sickle cell allele, $Hb^S$.

1. In $Hb^S$ a single base is substituted in the triplet coding for the sixth amino acid: on the coding strand **GAG** becomes **GTG** (the template strand CTC becomes CAC).
2. The mRNA codon changes from **GAG** to **GUG**, so **glutamic acid** (polar, charged R group) is replaced by **valine** (non-polar, hydrophobic R group).
3. The altered β chains create a hydrophobic patch on the surface of haemoglobin S. At **low oxygen concentration**, deoxygenated haemoglobin S molecules stick together, forming long **fibres** inside the red blood cell.
4. The red blood cells become **sickle-shaped** and rigid. They block capillaries (causing pain and organ damage) and are destroyed faster than normal cells (causing **anaemia**).
5. People who are homozygous $Hb^S Hb^S$ have sickle cell anaemia. Heterozygous carriers $Hb^A Hb^S$ have sickle cell trait: they are usually healthy and are less likely to suffer severe malaria, which is why the allele remains common where malaria is or was common.

:::worked-solution[Sickle cell codon]
The β-globin template strand for amino acid 6 reads 3' CTC 5' in the normal allele and 3' CAC 5' in the sickle cell allele.
1. mRNA is complementary to the template: CTC → GAG; CAC → GUG.
2. GAG codes for glutamic acid (Glu); GUG codes for valine (Val).
3. One base pair is substituted (T–A replaced by A–T), so one amino acid in the β chain is changed: a **missense substitution**.
:::

## Mutation, environment and phenotype

The phenotype of an organism results from its **genotype** interacting with its **environment**. A mutation changes the genotype; the environment can affect how strongly the change shows. For example, a person with sickle cell anaemia is more likely to have a crisis when oxygen levels in the blood fall, as at high altitude, during dehydration or during very strenuous exercise. Environmental mutagens can also cause new mutations. A plant that carries alleles for tall growth will still be short if grown in nutrient-poor soil.

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards: gene mutation as a change in base sequence, substitution, deletion and insertion, frameshift, and sickle cell anaemia (GAG to GTG, glutamic acid to valine). Mutagens and how mutation and environment together affect phenotype are named by ZIMSEC; they are useful background for Cambridge.
:::

## Common mistakes

:::mistake{title="Saying every mutation is harmful"}
Many are **silent** or neutral; a few are beneficial. Effects depend on the new codon, its position and the environment.
:::

:::mistake{title="Saying a substitution causes a frameshift"}
A substitution changes **one codon**. Frameshifts come from insertions or deletions that are not multiples of three.
:::

:::mistake{title="Writing the sickle cell change as glutamine to valine"}
It is **glutamic acid** (glutamate, Glu) to valine. Glutamine (Gln) is a different amino acid.
:::

:::mistake{title="Confusing DNA and mRNA codons"}
On DNA the change is GAG → GTG (coding strand); in mRNA it is GAG → GUG. State which strand you are using.
:::

## Exam tips

:::exam-tip
In ZIMSEC Papers 1 and 2 and Cambridge Papers 1 and 2 you are given a base sequence and a codon table. Convert carefully (template to mRNA by complementary pairing; coding strand to mRNA by T → U), split into triplets from the start, and write the amino acids in order. Show the frame you used.
:::

:::exam-tip
*Explain* how a mutation affects a protein in steps: base change → codon change → amino acid change (or stop/frameshift) → primary structure → different folding (tertiary structure) → altered function. For sickle cell, link valine's hydrophobic R group to haemoglobin S molecules sticking together at low oxygen.
:::

## Summary

:::summary
- A gene mutation is a change in the base sequence of DNA: substitution, deletion or insertion.
- Substitutions are silent (degenerate code), missense (new amino acid) or nonsense (stop codon).
- Insertions or deletions of one or two bases cause frameshifts, changing all later codons.
- Sickle cell anaemia: GAG → GTG (mRNA GAG → GUG), glutamic acid → valine in β-globin; HbS fibres form at low oxygen, cells sickle.
- Mutagens raise the mutation rate; the phenotype depends on genotype and environment together.
:::
