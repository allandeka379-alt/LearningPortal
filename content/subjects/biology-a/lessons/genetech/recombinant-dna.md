---
{
  "key": "genetech.recombinant-dna",
  "title": "Recombinant DNA and the tools of genetic engineering",
  "summary": "What recombinant DNA and genetic engineering are; three ways of obtaining a gene (from donor DNA, from mRNA with reverse transcriptase, by chemical synthesis); restriction endonucleases and sticky ends, DNA ligase, plasmid vectors and DNA polymerase; why a promoter is transferred with the gene; identifying transformed cells with fluorescent (GFP) and antibiotic-resistance markers; and gene editing with CRISPR-Cas9 in outline.",
  "concepts": ["abio.genetech.recombinant-dna"],
  "estimatedMinutes": 45,
  "freePreview": true,
  "level": "core"
}
---
## Introduction

Every person with diabetes in Zimbabwe who injects insulin today is almost certainly using human insulin made by microorganisms. The human insulin gene was cut out, joined into the DNA of a microorganism, and the microorganism followed its instructions. This is possible because the genetic code is universal: a bacterium reads a human gene in the same way a human cell does.

This lesson explains the molecular "toolkit" that makes such transfers possible: enzymes that cut and join DNA, vectors that carry it into cells, and markers that show which cells took it up. It is the foundation for every later genetic technology topic: insulin production, PCR, gene therapy and GM crops.

You should already know the structure of DNA (antiparallel strands, complementary base pairing), transcription and translation, and that eukaryotic genes contain introns.

## Key definitions

:::definition{term="Recombinant DNA"}
DNA made by joining together DNA from two or more different sources, often from different species.
:::

:::definition{term="Genetic engineering"}
The deliberate manipulation of an organism's genetic material, for example by transferring a gene from one organism to another so that it is expressed and the recipient makes a new product.
:::

:::definition{term="Restriction endonuclease"}
An enzyme, originally from bacteria, that cuts both strands of DNA at a specific base sequence called a restriction site, usually four to eight base pairs long and palindromic.
:::

:::definition{term="Sticky ends"}
Short single-stranded overhangs of unpaired bases left when a restriction enzyme makes a staggered cut; they can pair with complementary sticky ends made by the same enzyme.
:::

:::definition{term="Vector"}
Something that carries a gene into a host cell, for example a plasmid, a virus or a liposome.
:::

:::definition{term="Plasmid"}
A small, circular, double-stranded DNA molecule found in bacteria, separate from the main chromosome and able to replicate independently.
:::

## Step 1: obtaining the gene

There are three ways to obtain the DNA for a gene.

1. **Cutting it from donor DNA** with restriction enzymes. This is hard for eukaryotic genes: the gene must be found among billions of base pairs, and it contains **introns**, which bacteria cannot remove because they do not splice RNA.
2. **Making it from mRNA.** Cells that make the protein in large amounts (for example β cells of the pancreas for insulin) contain many copies of its mRNA. The mRNA is extracted and **reverse transcriptase** (from retroviruses) makes a single-stranded complementary DNA (**cDNA**) copy. **DNA polymerase** then makes the second strand. The cDNA has **no introns**, because the mRNA was already spliced.
3. **Synthesising it chemically**, nucleotide by nucleotide, from a known base sequence, worked out from the protein's amino acid sequence or from a database. This allows changes to be built in, such as codons preferred by the host.

## Step 2: cutting with restriction enzymes

Each restriction enzyme recognises one sequence. Many sites are **palindromic**: the sequence reads the same 5'→3' on both strands. For example, EcoRI recognises:

| Strand | Sequence |
|---|---|
| Top | 5'-G AATTC-3' |
| Bottom | 3'-CTTAA G-5' |

EcoRI cuts between G and A on each strand. The cuts are **staggered**, so each end carries a single-stranded overhang, 5'-AATT, a **sticky end**. Some enzymes cut straight across, leaving **blunt ends**, which join less efficiently.

The key idea: if the gene and the plasmid are cut with the **same** restriction enzyme, they have **complementary** sticky ends that can base-pair.

:::worked-solution[Fragment lengths after cutting a linear DNA molecule]
A linear DNA molecule is 3000 base pairs (bp) long. EcoRI cuts it after base pairs 650 and 1820.
1. Two cuts in a linear molecule give $2 + 1 = 3$ fragments.
2. First fragment: $650$ bp.
3. Second fragment: $1820 - 650 = 1170$ bp.
4. Third fragment: $3000 - 1820 = 1180$ bp.
5. Check: $650 + 1170 + 1180 = 3000$ bp. (A **circular** plasmid cut twice gives only **two** fragments.)
:::

:::worked-solution[Finding restriction sites in a sequence]
Find the BamHI (GGATCC) and EcoRI (GAATTC) sites in the 30-base strand 5'-ATGGATCCTAGAATTCGGCTAGGATCCAAT-3'.
1. Read along the sequence for GGATCC: it starts at base 3 and again at base 22.
2. Read for GAATTC: it starts at base 11.
3. So BamHI cuts this strand at two places and EcoRI at one. Cutting with BamHI alone would release the middle section containing the EcoRI site.
:::

## Step 3: joining with DNA ligase

The gene and the opened plasmid are mixed. Complementary sticky ends pair by hydrogen bonds. **DNA ligase** then forms **phosphodiester bonds** between the sugar-phosphate backbones, sealing the gene into the plasmid to make a **recombinant plasmid**.

Not every plasmid takes up the gene: some simply re-close on themselves. This is one reason markers are needed.

## Step 4: why a promoter is transferred with the gene

A **promoter** is a DNA sequence upstream of a gene where RNA polymerase (with transcription factors) binds to start transcription. A gene without a suitable promoter will not be transcribed in its new host. Eukaryotic promoters are not recognised by bacterial RNA polymerase, so the gene is placed next to a **promoter that works in the host**. A promoter can also control **where** or **when** the gene is expressed, such as only in the seeds of a crop or only in the liver of a fish.

## Step 5: getting the plasmid into host cells

**Transformation** is the uptake of DNA by a cell. Bacteria are treated with calcium ions and a brief heat shock, or with an electric pulse (electroporation), so that their membranes become more permeable. Only a small fraction of cells take up a plasmid.

## Step 6: identifying transformed cells with marker genes

The plasmid carries a **marker gene** alongside the gene of interest.

- **Fluorescent markers.** The gene for **green fluorescent protein (GFP)**, from a jellyfish, makes cells glow green under blue or ultraviolet light. If GFP is linked to the gene of interest, glowing cells have taken up the plasmid and are expressing it. This avoids using antibiotic resistance genes.
- **Antibiotic-resistance markers** (outline). Bacteria are grown on agar containing the antibiotic; only cells with the plasmid survive. If the gene of interest is inserted into a second resistance gene, that gene is disrupted, so cells with the recombinant plasmid are resistant to one antibiotic but sensitive to the other (shown by replica plating).

:::example{title="Interpreting a marker experiment"}
Bacteria were mixed with plasmids carrying an ampicillin-resistance gene and a GFP gene, into which the human gene had been inserted. They were spread on agar containing ampicillin and viewed under blue light.

**Observations:** 40 colonies grew; 30 glowed green and 10 did not.

**Interpret.** All 40 colonies took up a plasmid, because only plasmid-containing cells survive ampicillin. The 30 glowing colonies have plasmids in which GFP works, so these plasmids re-closed **without** the human gene. The 10 non-glowing colonies have the human gene inserted into, and disrupting, the GFP gene: these are the recombinant colonies to culture.
:::

## Gene editing (outline)

Gene editing changes DNA at a **specific site** in an organism's own genome: inserting, deleting or replacing bases. In **CRISPR-Cas9**:

1. A **guide RNA** is designed with a sequence complementary to the target DNA.
2. The guide RNA leads the **Cas9** nuclease to that site, where it cuts both strands.
3. The cell repairs the break. Repair often adds or deletes a few bases, knocking out the gene; if a DNA template is supplied, it can be used to insert or replace a sequence.

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards expect the enzymes, vectors and steps of gene transfer. Cambridge (A Level, Paper 4) names fluorescent markers, promoters and gene editing explicitly; ZIMSEC teaches this through insulin production (Form 6). Antibiotic-resistance markers are useful background for both.
:::

## Common mistakes

:::mistake{title="Saying restriction enzymes \"cut genes out\" anywhere"}
They cut only at their specific recognition sequence, which may lie inside or outside a gene.
:::

:::mistake{title="Saying ligase forms hydrogen bonds"}
Sticky ends pair by hydrogen bonds on their own; ligase forms **phosphodiester** bonds in the backbone.
:::

:::mistake{title="Forgetting introns"}
A bacterium cannot splice out introns, so genomic eukaryotic DNA would give the wrong protein. Use cDNA made from mRNA.
:::

## Exam tips

:::exam-tip
Cambridge Paper 4 and ZIMSEC Papers 2 and 3 ask you to *explain the role* of each enzyme: name the enzyme, the substrate and the bond made or broken.
:::

:::exam-tip
Base-sequence questions: look for the palindrome on both strands, mark the cut position on each strand, and write sticky ends 5'→3'. Count fragments carefully: linear molecule $n$ cuts → $n + 1$ fragments; circular → $n$.
:::

## Summary

:::summary
- Recombinant DNA joins DNA from different sources; genetic engineering transfers genes so that they are expressed.
- Genes are cut from donor DNA, made as cDNA from mRNA with reverse transcriptase, or synthesised chemically.
- Restriction enzymes cut at specific palindromic sites, leaving sticky ends; DNA ligase seals phosphodiester bonds.
- A suitable promoter is added so the host's RNA polymerase transcribes the gene.
- Plasmids carry the gene into cells; GFP or antibiotic-resistance markers identify transformed cells; CRISPR-Cas9 edits DNA at chosen sites.
:::
