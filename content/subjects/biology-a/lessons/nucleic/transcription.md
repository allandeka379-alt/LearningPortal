---
{
  "key": "nucleic.transcription",
  "title": "The genetic code and transcription",
  "summary": "What a gene is, the features of the genetic code (triplet, universal, non-overlapping, degenerate, with start and stop codons), how RNA polymerase transcribes the template strand of a gene into a primary transcript, and how introns are removed and exons joined to form mature mRNA in eukaryotes.",
  "concepts": ["abio.nucleic.transcription"],
  "estimatedMinutes": 30,
  "level": "core"
}
---
## Introduction

The DNA in the nucleus of a maize leaf cell holds the instructions for every protein the plant makes: the enzymes of photosynthesis, the proteins of its cell membranes, the stored zein protein in its seeds. But DNA never leaves the nucleus, while proteins are made on ribosomes in the cytoplasm. The cell solves this by copying the instructions of one gene at a time into a mobile molecule, messenger RNA. This copying is **transcription**, the first step of protein synthesis.

You should already know the structure of DNA and RNA, complementary base pairing, and the meaning of 5' and 3' ends. Translation, the second step, is the next lesson.

## Key definitions

:::definition{term="Gene"}
A sequence of nucleotides in DNA that codes for a polypeptide (or for a functional RNA molecule).
:::

:::definition{term="Codon"}
A sequence of three bases in mRNA (corresponding to a triplet in DNA) that codes for one amino acid or acts as a start or stop signal.
:::

:::definition{term="Transcription"}
The synthesis of an RNA molecule complementary to the template strand of a gene, catalysed by RNA polymerase.
:::

:::definition{term="Template strand"}
The strand of DNA in a gene that is read by RNA polymerase and to which RNA nucleotides pair; it is also called the transcribed or antisense strand. The other strand is the non-transcribed (coding or sense) strand.
:::

:::definition{term="Introns and exons"}
Introns are non-coding sequences within a eukaryotic gene that are removed from the primary transcript; exons are the sequences that remain and are joined together to form mature mRNA.
:::

## The genetic code

The sequence of bases in a gene determines the sequence of amino acids in a polypeptide. The code has these features:

| Feature | Meaning |
|---|---|
| Triplet | Three bases (a codon) code for one amino acid. Four bases taken three at a time give $4^3 = 64$ codons, enough for 20 amino acids. |
| Degenerate | Most amino acids are coded for by more than one codon (for example, glycine by GGU, GGC, GGA and GGG). |
| Non-overlapping | Each base is part of only one codon; the code is read in consecutive groups of three. |
| Universal | The same codons code for the same amino acids in almost all organisms, which is why a human gene can be expressed in bacteria. |
| Start and stop signals | AUG is the usual start codon (and codes for methionine); UAA, UAG and UGA are stop codons that code for no amino acid. |

A doublet code ($4^2 = 16$) would be too few for 20 amino acids, which is one argument for a triplet code. In exams you are given a codon table: you do not need to learn it, apart from AUG and the three stop codons.

## Transcription step by step

1. **Unwinding.** RNA polymerase binds to the DNA at the start of the gene (at a region called the promoter). The DNA double helix unwinds and the hydrogen bonds between bases break over a short section, exposing the bases.
2. **Template strand read.** Only **one** strand, the template strand, is used. The enzyme reads it in the 3' → 5' direction.
3. **Complementary pairing.** Free **RNA nucleotides** (activated, carrying extra phosphates) pair with the exposed DNA bases: A in DNA pairs with **U** in RNA, T with A, C with G, G with C.
4. **Joining.** RNA polymerase joins the RNA nucleotides by **phosphodiester bonds**, building the RNA 5' → 3'.
5. **Moving on.** The enzyme moves along the gene. Behind it, the RNA separates from the DNA, and the DNA rewinds into a double helix.
6. **Ending.** At the end of the gene (a terminator sequence) the enzyme and the completed RNA are released.

The RNA has the same base sequence as the non-transcribed (coding) strand of DNA, except that it has U where the DNA has T.

:::worked-solution[Writing the mRNA from a template strand]
The template strand of part of a gene reads 3' TACCGGAAGCTTATT 5'.
1. Pair each base with its RNA partner: T → A, A → U, C → G, G → C.
2. mRNA: 5' AUG GCC UUC GAA UAA 3'.
3. Using the codon table: AUG = Met (start), GCC = Ala, UUC = Phe, GAA = Glu, UAA = stop.
4. This short section codes for the peptide Met-Ala-Phe-Glu. The coding strand would read 5' ATGGCCTTCGAATAA 3', the same as the mRNA with T for U.
:::

## Post-transcriptional modification in eukaryotes

In eukaryotes, transcription produces a **primary transcript** (pre-mRNA) that contains both introns and exons.

1. Introns are cut out of the primary transcript.
2. The exons are joined together (**splicing**), forming **mature mRNA**.
3. The mature mRNA leaves the nucleus through a nuclear pore to the ribosomes.

Prokaryotic genes generally have no introns, so their mRNA can be translated at once (often while it is still being made). The exons of one gene can sometimes be joined in different combinations, so one gene can code for more than one polypeptide.

:::worked-solution[How long is the mature mRNA?]
A primary transcript is 3600 nucleotides long. It contains three introns of 450, 720 and 330 nucleotides. Assume all of the mature mRNA codes for amino acids, ending with a stop codon.
1. Total intron length $= 450 + 720 + 330 = 1500$ nucleotides.
2. Mature mRNA $= 3600 - 1500 = 2100$ nucleotides.
3. Number of codons $= 2100 \div 3 = 700$.
4. One is a stop codon, so the polypeptide has $700 - 1 = 699$ amino acids.
:::

:::example{title="Why only one strand?"}
If both strands were transcribed, they would produce two complementary RNAs, which would code for different (and usually meaningless) amino acid sequences, and which could pair with each other. Using one template strand gives one defined product. Different genes on the same DNA molecule may use different strands as their template.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards: the features of the code, transcription by RNA polymerase, template and non-transcribed strands, and splicing of introns in eukaryotes. Promoter and terminator need only be named.
:::

## Common mistakes

:::mistake{title="Writing T in mRNA"}
RNA contains **uracil**, not thymine. A in the DNA template pairs with U in RNA.
:::

:::mistake{title="Saying DNA polymerase makes mRNA"}
Transcription uses **RNA polymerase**. DNA polymerase is for replication.
:::

:::mistake{title="Saying both strands are transcribed"}
Only the template strand of a gene is read.
:::

:::mistake{title="Counting the stop codon as an amino acid"}
Stop codons code for no amino acid. Subtract one when working out polypeptide length from the number of codons.
:::

## Exam tips

:::exam-tip
This topic is tested in ZIMSEC Papers 1-3 and Cambridge Papers 1 and 2. In base-sequence questions, write sequences in groups of three, keep 5' and 3' labels, and use the table given.
:::

:::exam-tip
*Describe transcription* answers need: RNA polymerase, unwinding, hydrogen bonds broken, one template strand, free RNA nucleotides pair by complementary base pairing (with U for A), phosphodiester bonds, pre-mRNA, and splicing in eukaryotes.
:::

## Summary

:::summary
- A gene is a sequence of nucleotides coding for a polypeptide; three bases (a codon) code for one amino acid.
- The code is triplet, degenerate, non-overlapping and universal, with a start codon (AUG) and three stop codons.
- RNA polymerase unwinds DNA and builds RNA complementary to the template strand, with U pairing with A.
- The primary transcript of a eukaryotic gene contains introns, which are removed; exons are spliced to form mature mRNA.
- Mature mRNA leaves the nucleus through nuclear pores for translation.
:::
