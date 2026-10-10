---
{
  "key": "genetech.microarrays-bioinformatics",
  "title": "DNA microarrays and bioinformatics databases",
  "summary": "How DNA microarrays use thousands of fixed probes, fluorescent labelling and hybridisation to compare genomes and to measure which genes are being expressed (by detecting mRNA as labelled cDNA); how spot colours and intensities are read; and the benefits of databases of nucleotide sequences, genomes, amino acid sequences and protein structures.",
  "concepts": ["abio.genetech.microarrays-bioinformatics"],
  "estimatedMinutes": 30,
  "level": "core"
}
---
## Introduction

A cancer cell and a healthy cell from the same tissue contain the same genes, yet they behave very differently because they **express** different genes. Measuring the activity of one gene at a time would take years. A **DNA microarray** measures thousands of genes at once on a glass slide smaller than a postage stamp.

The flood of data from microarrays and genome sequencing would be useless without ways to store, search and compare it. **Bioinformatics** combines biology, computing and statistics to do this, using shared databases that any scientist can use.

You should already know complementary base pairing, transcription (DNA → mRNA), and how reverse transcriptase makes cDNA from mRNA.

## Key definitions

:::definition{term="DNA microarray"}
A small solid surface, such as a glass slide, to which thousands of different single-stranded DNA probes are attached in a grid of tiny spots, each spot carrying many copies of one probe sequence.
:::

:::definition{term="Probe"}
A short, single-stranded length of DNA with a known base sequence, complementary to a target sequence.
:::

:::definition{term="Hybridisation"}
The base pairing of a single-stranded nucleic acid with a complementary single strand, forming a double-stranded molecule.
:::

:::definition{term="Bioinformatics"}
The collection, storage and analysis of biological information, such as nucleotide and amino acid sequences and protein structures, using computer software and databases.
:::

## How a microarray works

Each spot on the array carries many copies of one probe, matching part of one gene. Its position on the grid tells the scientist which gene it represents.

1. **Prepare the sample.** Extract the nucleic acid to be tested and make it single-stranded.
2. **Label it** with a fluorescent dye, so it can be detected.
3. **Hybridise.** Wash the labelled sample over the array. Fragments that are complementary to a probe pair with it and stay attached.
4. **Wash** away unbound fragments.
5. **Scan** the array with a laser. A spot that fluoresces has bound labelled DNA: the target sequence was present. The **brightness** shows how much was present.

### Use 1: analysing genomes

Genomic DNA from an individual is cut into fragments, labelled and applied to an array carrying probes for known sequences, such as alleles linked to disease. This shows which alleles are present. To **compare two genomes** (for example of two strains of a pathogen, or two closely related species), the DNA of each is labelled with a different colour and the two are hybridised to the same array: spots showing only one colour reveal sequences present in only one genome.

### Use 2: detecting mRNA to study gene expression

Genes being transcribed produce mRNA, so the mRNA in a cell shows which genes are **switched on**.

1. Extract mRNA from two cell samples, for example tumour cells and normal cells.
2. Use **reverse transcriptase** to make cDNA from each, labelling one sample's cDNA with a red dye and the other's with green. (cDNA is more stable than mRNA.)
3. Mix and hybridise to the same array; the two samples **compete** for the probes.
4. Read the colour of each spot:

| Spot colour | Meaning |
|---|---|
| Red | Gene expressed mainly in the red-labelled sample |
| Green | Gene expressed mainly in the green-labelled sample |
| Yellow | Gene expressed about equally in both |
| Dark (no fluorescence) | Gene expressed in neither sample |

The ratio of red to green intensity measures the relative level of expression.

:::example{title="Reading microarray intensities"}
Tumour cDNA was labelled red and normal cDNA green.

| Spot | Red (tumour) intensity | Green (normal) intensity | Ratio red : green |
|---|---|---|---|
| Gene 1 | 4800 | 1200 | 4.00 |
| Gene 2 | 600 | 2400 | 0.25 |
| Gene 3 | 2100 | 2000 | 1.05 |
| Gene 4 | 150 | 160 | 0.94 |

**Interpret.** Gene 1 is expressed four times more in tumour cells (a red spot): it may promote cell division, like an oncogene. Gene 2 is expressed at a quarter of the normal level (green): it could be a tumour suppressor gene switched off in the tumour. Gene 3 is expressed about equally (yellow). Gene 4 has a ratio near 1 but very low intensities, so it is hardly expressed in either; its ratio is unreliable because background noise is large compared with the signal.
:::

## Bioinformatics databases

Scientists around the world deposit their results in large public databases that are freely searchable:

| Database content | Examples of use |
|---|---|
| Nucleotide sequences and whole genomes | Find a gene's sequence; design PCR primers and probes; identify an unknown organism or pathogen strain from a sequence |
| Amino acid sequences of proteins | Predict the function of a newly found protein by comparing it with known proteins |
| Three-dimensional protein structures | See the shape of an active site or binding site; design drugs that fit it |

### Benefits

1. **Comparing sequences** between species to work out evolutionary relationships: more similar sequences suggest a more recent common ancestor.
2. **Identifying genes** in a newly sequenced genome by recognising sequences like known genes (start and stop codons, promoters).
3. **Linking genes to disease**: finding alleles associated with conditions, and tracking mutations in pathogens, such as new variants of a virus.
4. **Designing drugs and vaccines** using protein structures, so that molecules complementary to a target can be modelled on a computer before being made.
5. **Avoiding repetition**: results are shared, so research is faster and cheaper.

:::worked-solution[Percentage identity of two sequences]
Two 18-base sequences from related species are aligned:

5'-ATGGCTTACGATCCAGTA-3'

5'-ATGGCATACGATCGAGTA-3'

1. Compare base by base: they differ at position 6 (T and A) and position 14 (C and G).
2. Identical positions $= 18 - 2 = 16$.
3. Percentage identity $= \dfrac{16}{18} \times 100 = 88.9\%$.
4. The higher the identity across many genes, the more closely related the species are likely to be.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
This concept is Cambridge only (A Level, Paper 4), where microarrays are tested in outline and databases through their benefits. ZIMSEC does not examine it.
:::

## Common mistakes

:::mistake{title="Saying microarrays detect proteins"}
DNA microarrays detect nucleic acids. For gene expression they detect mRNA, after it is copied into labelled cDNA.
:::

:::mistake{title="Reading colour without intensity"}
A yellow spot can mean equal high expression or equal low expression; check the intensities.
:::

:::mistake{title="Saying the probe is labelled"}
In these methods the **sample** is labelled; the probes are fixed and unlabelled, and their position identifies the gene.
:::

## Exam tips

:::exam-tip
Cambridge Paper 4 asks you to *outline* how microarrays are used: give the sequence probe → labelled sample → hybridisation → wash → scan, and say what fluorescence at a spot means.
:::

:::exam-tip
When asked for benefits of databases, name the type of data and a specific use: "comparing amino acid sequences to predict the function of a new protein".
:::

## Summary

:::summary
- A microarray carries thousands of single-stranded DNA probes in known positions.
- Labelled sample DNA or cDNA hybridises with complementary probes; fluorescence shows presence, intensity shows amount.
- For gene expression, mRNA is reverse-transcribed into cDNA labelled with different colours; red, green and yellow spots show relative expression.
- Databases store nucleotide sequences, genomes, amino acid sequences and protein structures.
- Benefits: comparing sequences, identifying genes, studying evolution, tracking pathogens and designing drugs.
:::
