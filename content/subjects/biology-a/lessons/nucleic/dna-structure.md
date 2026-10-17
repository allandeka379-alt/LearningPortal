---
{
  "key": "nucleic.dna-structure",
  "title": "Nucleotides and the structure of DNA and RNA",
  "summary": "The structure of a nucleotide, purines and pyrimidines, ATP as a phosphorylated nucleotide, how phosphodiester bonds build polynucleotides, the antiparallel double helix with complementary base pairing and hydrogen bonds, Chargaff's rule calculations, and how RNA (mRNA and tRNA) differs from DNA.",
  "concepts": ["abio.nucleic.dna-structure"],
  "estimatedMinutes": 35,
  "freePreview": true,
  "level": "core"
}
---
## Introduction

In 1953 Watson and Crick, using X-ray diffraction images made by Rosalind Franklin and Maurice Wilkins, proposed that DNA is a double helix. That one structure explains how genetic information is stored, how it is copied exactly before every cell division, and how it is read to make proteins. The same chemistry lies behind DNA tests used today to identify people and to diagnose diseases, and behind the research on drought-tolerant maize varieties grown in Zimbabwe.

This lesson builds DNA and RNA from their units. You should already know that macromolecules are built from monomers by condensation reactions, and the basic idea of a hydrogen bond.

## Key definitions

:::definition{term="Nucleotide"}
The monomer of nucleic acids, made of a pentose sugar, a phosphate group and a nitrogen-containing (nitrogenous) base, joined by condensation reactions.
:::

:::definition{term="Nucleoside"}
A pentose sugar joined to a nitrogenous base, without a phosphate group (for example adenosine).
:::

:::definition{term="Phosphodiester bond"}
The covalent bond linking the phosphate group of one nucleotide to the sugar of the next in a polynucleotide; it involves two ester linkages through one phosphate, between carbon 3 of one sugar and carbon 5 of the next.
:::

:::definition{term="Complementary base pairing"}
The specific pairing of bases by hydrogen bonds: adenine with thymine (or uracil in RNA) and guanine with cytosine.
:::

:::definition{term="Antiparallel"}
Describes the two strands of a DNA double helix, which run in opposite directions: one 5' to 3', the other 3' to 5'.
:::

:::keyfact{title="Base pairs and hydrogen bonds"}
A pairs with T by **two** hydrogen bonds; C pairs with G by **three**. A purine always pairs with a pyrimidine, so the helix has a constant width of about 2 nm.
:::

## Nucleotides

Each nucleotide has three parts:

1. A **pentose sugar**: **deoxyribose** in DNA, **ribose** in RNA (ribose has an –OH on carbon 2; deoxyribose has only –H there).
2. A **phosphate group**, attached to carbon 5 of the sugar.
3. A **nitrogenous base**, attached to carbon 1 of the sugar.

The bases fall into two groups:

| Group | Structure | Bases | Found in |
|---|---|---|---|
| Purines | Double ring (larger) | Adenine (A), guanine (G) | DNA and RNA |
| Pyrimidines | Single ring (smaller) | Cytosine (C), thymine (T), uracil (U) | C in both; T in DNA; U in RNA |

### ATP is a nucleotide

**ATP (adenosine triphosphate)** is a phosphorylated nucleotide: adenine + ribose (together, the nucleoside adenosine) + **three** phosphate groups. Hydrolysis of the last phosphate releases energy for cell processes. ADP has two phosphates; AMP, a nucleotide found in RNA, has one.

## Building a polynucleotide

1. Two nucleotides join by a **condensation reaction** between the phosphate of one and the –OH on carbon 3 of the sugar of the other, releasing water and forming a **dinucleotide** linked by a phosphodiester bond.
2. Repeating this gives a **polynucleotide**: a **sugar-phosphate backbone** with the bases sticking out to one side.
3. One end has a free phosphate on carbon 5 (the **5' end**); the other has a free –OH on carbon 3 (the **3' end**). A strand therefore has a direction.
4. Phosphodiester bonds are strong covalent bonds, so the sequence of bases is stable. They are broken by hydrolysis.

## The DNA double helix

1. DNA consists of **two polynucleotide strands**.
2. The strands are **antiparallel**: one runs 5' → 3', the other 3' → 5'.
3. Bases on opposite strands pair by **hydrogen bonds**: A with T (two bonds), C with G (three bonds). This is **complementary base pairing**.
4. The sugar-phosphate backbones are on the outside; the paired bases are stacked in the middle, like the rungs of a ladder.
5. The ladder is twisted into a **double helix**, with about 10 base pairs per complete turn.

![DNA fragment drawn as a ladder: the top strand 5' ATGCCGTA 3' pairs with the antiparallel bottom strand 3' TACGGCAT 5' by hydrogen bonds, two for each A-T pair and three for each C-G pair, so the four A-T and four C-G pairs give 8 + 12 = 20 hydrogen bonds; sugar-phosphate backbones run along the outside.](media:diagrams/dna-ladder-base-pairing.png "Figure: complementary base pairing in an eight-base-pair fragment (the worked example), with hydrogen bonds counted")

How the structure suits the function:

- The base sequence carries the **genetic code**; any sequence is possible, so the information content is enormous.
- Complementary pairing means each strand can act as a **template** for a new strand, allowing accurate replication.
- Hydrogen bonds are individually weak, so the strands can be **separated** for replication and transcription; there are so many that the molecule is stable overall.
- The bases are **protected** inside the helix, and the covalent backbone makes the molecule chemically stable.
- The molecule is very long, so it stores a great deal of information compactly.

## Chargaff's rule

Because every A pairs with a T and every C with a G, in double-stranded DNA:

$$
\%A = \%T \qquad \%C = \%G \qquad \%A + \%T + \%C + \%G = 100
$$

:::worked-solution[Base composition from one value]
A sample of double-stranded DNA contains 21% adenine. Find the percentages of the other bases.
1. A pairs with T, so T = 21%.
2. A + T = 42%, so C + G = 100 − 42 = 58%.
3. C pairs with G, so C = G = 58 ÷ 2 = 29%.
4. Answer: A 21%, T 21%, C 29%, G 29%.
:::

:::worked-solution[Counting hydrogen bonds]
A short double-stranded DNA fragment has the sequence 5' ATGCCGTA 3' on one strand. How many hydrogen bonds hold the two strands together?
1. Count the base pairs: A or T pairs: A, T, T, A = 4; C or G pairs: G, C, C, G = 4.
2. Each A-T pair has 2 hydrogen bonds: $4 \times 2 = 8$.
3. Each C-G pair has 3 hydrogen bonds: $4 \times 3 = 12$.
4. Total $= 8 + 12 = 20$ hydrogen bonds. The complementary strand is 3' TACGGCAT 5'.
:::

DNA with a higher proportion of C-G pairs needs more energy to separate its strands, because of the extra hydrogen bond in each pair.

## RNA

| Feature | DNA | RNA |
|---|---|---|
| Sugar | Deoxyribose | Ribose |
| Bases | A, T, C, G | A, U, C, G |
| Strands | Two (double helix) | One |
| Length | Very long | Shorter |
| Where (eukaryotes) | Mainly nucleus (also mitochondria and chloroplasts) | Made in nucleus; works mainly in cytoplasm |
| Stability | Very stable | Broken down relatively quickly |

**Messenger RNA (mRNA)** is a single strand, a copy of the base sequence of one gene, carried from the nucleus to the ribosomes. **Transfer RNA (tRNA)** is a single strand folded into a clover-leaf shape held by base pairing within the molecule. It has an **anticodon** of three bases at one end and an **amino acid attachment site** at the 3' end. Ribosomal RNA (rRNA) forms part of ribosomes.

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards: nucleotide structure, purines and pyrimidines, phosphodiester bonds, the antiparallel double helix, hydrogen bonding, DNA versus RNA and ATP as a nucleotide. Chargaff calculations and the 5'/3' labels are expected by both.
:::

## Common mistakes

:::mistake{title="Saying bases are joined by phosphodiester bonds"}
Phosphodiester bonds join **sugar to phosphate** along a strand. Bases on opposite strands are joined by **hydrogen bonds**.
:::

:::mistake{title="Applying Chargaff's rule to RNA or to one strand"}
%A = %T only in **double-stranded** DNA. In a single strand, A and T can be present in any proportions.
:::

:::mistake{title="Mixing up purines and pyrimidines"}
Purines (A, G) are the **larger**, double-ring bases. A memory aid: "pure As Gold".
:::

## Exam tips

:::exam-tip
DNA structure is tested in ZIMSEC Papers 1-3 and Cambridge Papers 1 and 2. *Describe the structure of DNA* needs: nucleotides (deoxyribose, phosphate, base), phosphodiester bonds, two antiparallel strands, complementary pairing with numbers of hydrogen bonds, double helix.
:::

:::exam-tip
In Chargaff questions show each step: the paired base first, then subtract from 100, then halve.
:::

## Summary

:::summary
- A nucleotide is pentose sugar + phosphate + base; ATP is a nucleotide with three phosphates.
- Purines (A, G) are double-ringed; pyrimidines (C, T, U) are single-ringed.
- Phosphodiester bonds form the sugar-phosphate backbone, with 5' and 3' ends.
- DNA is two antiparallel strands in a double helix, paired A-T (two hydrogen bonds) and C-G (three).
- In double-stranded DNA %A = %T and %C = %G; RNA is single-stranded, with ribose and uracil.
:::
