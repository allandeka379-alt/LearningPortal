---
{
  "key": "nucleic.translation",
  "title": "Translation: from mRNA to polypeptide",
  "summary": "How the mRNA sequence is translated into a polypeptide on ribosomes: the structure of ribosomes and tRNA, amino acid activation using ATP, initiation at the start codon, codon-anticodon pairing, peptide bond formation, ribosome movement, termination at a stop codon, polysomes, and working out amino acid sequences from base sequences with a codon table.",
  "concepts": ["abio.nucleic.translation"],
  "estimatedMinutes": 35,
  "level": "core"
}
---
## Introduction

A cell in the pancreas of a person who has just eaten can make thousands of insulin molecules a minute; a developing seed of a groundnut packs its cells with storage proteins. In every case, the instructions come from mRNA and the work is done by ribosomes. **Translation** is the process that turns the language of bases (codons) into the language of amino acids (a polypeptide). It completes the flow of information:

$$
\text{DNA} \xrightarrow{\text{transcription}} \text{mRNA} \xrightarrow{\text{translation}} \text{polypeptide}
$$

You should already know the genetic code, transcription and splicing, the structure of tRNA in outline, and how amino acids join by peptide bonds.

## Key definitions

:::definition{term="Translation"}
The synthesis of a polypeptide on a ribosome, in which the sequence of codons in mRNA determines the sequence of amino acids, brought by tRNA molecules with complementary anticodons.
:::

:::definition{term="Anticodon"}
A sequence of three unpaired bases on a tRNA molecule that is complementary to a codon on mRNA.
:::

:::definition{term="Amino acid activation"}
The attachment of a specific amino acid to its tRNA molecule, catalysed by a specific enzyme and using energy from ATP.
:::

:::definition{term="Polysome (polyribosome)"}
A group of ribosomes translating the same mRNA molecule at the same time.
:::

## The machinery

**Ribosomes** are made of rRNA and protein, in two subunits: a small subunit that binds mRNA and a large subunit that catalyses peptide bond formation. Cytoplasmic ribosomes of eukaryotes are 80S; those of prokaryotes (and of mitochondria and chloroplasts) are 70S. A ribosome has room for **two tRNA molecules** at a time, each pairing with one codon. Ribosomes are free in the cytoplasm or attached to the rough endoplasmic reticulum, which makes proteins for secretion or for membranes.

**tRNA** is a single strand folded into a clover-leaf shape by base pairing within the molecule. It has:

- an **anticodon** loop with three bases complementary to an mRNA codon;
- an **amino acid attachment site** at the 3' end (always ending CCA), where one specific amino acid binds.

## Amino acid activation

In the cytoplasm, each amino acid is attached to its own tRNA by a specific enzyme. **ATP** is hydrolysed to provide the energy. Because each enzyme recognises one amino acid and the matching tRNAs, the right amino acid is carried by the tRNA with the right anticodon. This is where the code is actually "read".

## The stages of translation

1. **Initiation.** The mature mRNA binds to the small subunit of a ribosome. The ribosome finds the **start codon, AUG**. A tRNA with the anticodon **UAC**, carrying methionine, pairs with it. The large subunit joins.
2. **Elongation: codon-anticodon pairing.** A second tRNA, with an anticodon complementary to the next codon, enters the ribosome and pairs with that codon by **complementary base pairing** (hydrogen bonds).
3. **Peptide bond formation.** The two amino acids are held side by side. A **peptide bond** forms between them by a condensation reaction, catalysed by the ribosome (rRNA of the large subunit). The first amino acid is now attached to the second.
4. **Ribosome movement.** The ribosome moves along the mRNA by **one codon** (three bases). The first tRNA, now without its amino acid, leaves to be reused. A new tRNA pairs with the next codon.
5. **Repeating.** Steps 2-4 repeat, adding one amino acid at a time; the polypeptide grows. This needs energy, supplied by GTP and ATP.
6. **Termination.** When the ribosome reaches a **stop codon** (UAA, UAG or UGA), no tRNA pairs with it. The polypeptide is released, and the ribosome subunits separate.

After release the polypeptide folds into its secondary and tertiary structure; in the RER and Golgi body it may be modified, for example by adding carbohydrate.

### Polysomes

Several ribosomes can move along one mRNA, one behind the other, each making its own copy of the polypeptide. This **polysome** allows many identical polypeptides to be made quickly from one mRNA.

:::worked-solution[From mRNA to amino acids]
An mRNA reads 5' AUG AAA GCU UGG CAU UAG 3'. Use the codon table: AUG Met, AAA Lys, GCU Ala, UGG Trp, CAU His, UAG stop.
1. Read from the 5' end in codons of three, starting at AUG.
2. AUG → Met; AAA → Lys; GCU → Ala; UGG → Trp; CAU → His; UAG → stop.
3. Polypeptide: Met-Lys-Ala-Trp-His (five amino acids).
4. The tRNA anticodons are the complements: UAC, UUU, CGA, ACC and GUA. No tRNA pairs with the stop codon.
:::

:::worked-solution[Working back from a polypeptide]
A polypeptide has 146 amino acids. What is the minimum length of the mature mRNA coding region, and of the DNA coding sequence, including the stop codon?
1. Codons for amino acids: $146 \times 3 = 438$ bases.
2. Add the stop codon: $438 + 3 = 441$ bases of mRNA.
3. The DNA has 441 base pairs in this coding region (more in the gene, because of introns and regulatory sequences).
:::

:::example{title="Comparing codon, anticodon and DNA triplet"}
For the amino acid tryptophan: the DNA template triplet is ACC (written 3' to 5'), the mRNA codon is UGG (5' to 3'), and the tRNA anticodon is ACC (3' to 5'). The anticodon has the same bases as the DNA template triplet, but with U wherever the template has T (here there is none).
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards: ribosomes, tRNA structure, amino acid activation with ATP, initiation, elongation with codon-anticodon pairing and peptide bonds, termination, polysomes, and decoding with a given codon table. Names of the A, P and E sites on the ribosome are not required.
:::

## Common mistakes

:::mistake{title="Confusing codon and anticodon"}
The **codon** is on mRNA; the **anticodon** is on tRNA. They are complementary.
:::

:::mistake{title="Saying tRNA forms the peptide bond"}
The peptide bond is formed by the ribosome (rRNA in the large subunit). tRNA only carries the amino acid and pairs with the codon.
:::

:::mistake{title="Saying the stop codon codes for a 'stop amino acid'"}
A stop codon has no tRNA and no amino acid; it ends translation.
:::

:::mistake{title="Using the wrong strand in decoding"}
A codon table uses **mRNA** codons. If you are given a DNA template strand, transcribe it first.
:::

## Exam tips

:::exam-tip
Translation is tested in ZIMSEC Papers 1-3 and Cambridge Papers 1 and 2. *Describe translation* answers need: mRNA on ribosome, start codon, tRNA with anticodon carrying a specific amino acid, complementary pairing, two tRNAs at a time, peptide bond, ribosome moves one codon, stop codon releases the polypeptide.
:::

:::exam-tip
In decoding questions write the mRNA in triplets first, then decode; check whether you are given DNA, mRNA or tRNA bases.
:::

## Summary

:::summary
- Translation turns the mRNA codon sequence into an amino acid sequence on ribosomes.
- tRNA has an anticodon and carries one specific amino acid, attached using ATP (activation).
- Initiation at AUG; elongation by codon-anticodon pairing, peptide bond formation and moving one codon; termination at a stop codon.
- Polysomes allow many copies of a polypeptide to be made from one mRNA at once.
- Overall flow: DNA → mRNA → polypeptide, decoded three bases at a time with a codon table.
:::
