---
{
  "key": "inheritance.linkage-epistasis",
  "title": "Autosomal linkage and epistasis",
  "summary": "Why genes on the same chromosome do not assort independently, how crossing over produces recombinant offspring and how linkage changes dihybrid ratios; how one gene can affect the expression of another (epistasis), worked out from genetic diagrams; and how to recognise linkage or epistasis from unexpected ratios.",
  "concepts": ["abio.inheritance.linkage-epistasis"],
  "estimatedMinutes": 40,
  "level": "core"
}
---
## Introduction

Mendel's peas gave beautifully predictable ratios because the genes he studied behaved as if they were on different chromosomes. Real crosses often give ratios that are clearly not 9 : 3 : 3 : 1 or 1 : 1 : 1 : 1. Two common reasons are **autosomal linkage**, where the genes are on the same chromosome, and **epistasis**, where one gene affects whether another gene's alleles are expressed at all. Recognising which is happening, from the numbers, is a favourite A Level skill.

You should already be able to set out dihybrid crosses, and know how crossing over between non-sister chromatids happens in prophase I of meiosis.

## Key definitions

:::definition{term="Autosomal linkage"}
The inheritance together of genes that are on the same autosome (not a sex chromosome), so that they do not assort independently.
:::

:::definition{term="Linkage group"}
All the genes on one chromosome, which tend to be inherited together.
:::

:::definition{term="Recombinant"}
An offspring (or gamete) with a combination of alleles different from those of either parent's chromosomes, produced in linked genes by crossing over.
:::

:::definition{term="Epistasis"}
An interaction between two genes in which the alleles of one gene affect, or mask, the expression of the alleles of another gene.
:::

## Autosomal linkage

If genes A and B are on the same chromosome, a double heterozygote that received AB on one chromosome and ab on its homologue carries the alleles in two fixed combinations. In the genetic diagram, write the alleles on the same chromosome together, for example $\dfrac{AB}{ab}$ or (AB)(ab).

1. Without crossing over, this individual makes only **two** kinds of gamete, AB and ab, the **parental** combinations.
2. If a chiasma forms **between** the two loci in prophase I, non-sister chromatids exchange segments, producing chromatids with the **recombinant** combinations Ab and aB.
3. Crossing over between two particular loci happens in only some cells, so recombinant gametes are **fewer** than parental gametes.
4. The closer two genes are on the chromosome, the less often a crossover falls between them, and the fewer recombinants appear.

### The effect on a test cross

For unlinked genes, a test cross $AaBb \times aabb$ gives 1 : 1 : 1 : 1. For linked genes, the result is two large classes (parental) and two small classes (recombinant).

:::worked-solution[Recognising linkage in a test cross]
In *Drosophila*, grey body (G) is dominant to black body (g) and long wings (L) are dominant to vestigial wings (l). Flies from a cross of pure-breeding grey long × black vestigial (so the F1 has GL on one chromosome and gl on the other) were test-crossed with black vestigial (gl/gl) flies.

| Offspring | Number |
|---|---|
| Grey, long | 412 |
| Black, vestigial | 398 |
| Grey, vestigial | 87 |
| Black, long | 103 |

1. Unlinked genes would give about 250 in each class (1 : 1 : 1 : 1). These numbers are far from that.
2. The two largest classes, grey long and black vestigial, have the parental combinations (GL and gl).
3. The two small classes, grey vestigial and black long, are recombinants (Gl and gL), produced by crossing over.
4. Percentage of recombinants $= \dfrac{87 + 103}{1000} \times 100 = 19\%$.
5. Conclusion: the genes are linked, on the same chromosome, and crossing over between them happened in some cells during meiosis.
:::

### Linkage in a cross between two double heterozygotes

If two flies with GL/gl are crossed with each other and there were no crossing over, they could make only GL and gl gametes, giving 3 grey long : 1 black vestigial, instead of 9 : 3 : 3 : 1. Crossing over adds a few offspring in the other two classes. So **a ratio near 3 : 1 from a dihybrid cross**, or two classes much bigger than expected, suggests linkage.

## Epistasis

In epistasis, two genes affect the same characteristic, often because their products act in the same biochemical pathway. One gene can hide (mask) the effect of the other. You do not need to learn the different types or their ratios; you need to work them out from a genetic diagram and explain them.

:::example{title="Coat colour in Labrador retrievers"}
Two genes control coat colour:

- Gene B controls the pigment made: **B** (black pigment) is dominant to **b** (brown pigment).
- Gene E controls whether pigment is deposited in the hairs: **E** allows deposition and is dominant to **e**; dogs with **ee** cannot deposit pigment in their hairs and are yellow, **whatever their B alleles**.

Gene E is epistatic to gene B. Cross two dogs $BbEe \times BbEe$; each makes gametes BE, Be, bE, be. Grouping the 16 squares:

| Genotypes | Phenotype | Squares |
|---|---|---|
| B_E_ | Black | 9 |
| bbE_ | Brown (chocolate) | 3 |
| B_ee and bbee | Yellow | 3 + 1 = 4 |

The ratio is **9 black : 3 brown : 4 yellow**. Two of the classes from 9 : 3 : 3 : 1 have merged because ee masks the B gene.
:::

### How epistasis can arise

1. **One enzyme supplies the substrate for another.** In a pathway colourless precursor → (enzyme 1) → intermediate → (enzyme 2) → pigment, a homozygous recessive for the gene coding enzyme 1 makes no intermediate, so the alleles of the gene for enzyme 2 have no effect. Here the first gene is epistatic to the second.
2. **One gene controls whether a product is deposited or used**, as in the Labrador example.
3. **A recessive** epistatic gene acts only when homozygous (ee); a **dominant** epistatic allele masks the other gene whenever one copy is present. Each gives its own modified ratio, which you can work out from a Punnett square.

:::worked-solution[Working out a ratio from a pathway]
In a flower, a white precursor is converted into a purple pigment in two steps. Enzyme 1 (coded by dominant allele C) makes a colourless intermediate; enzyme 2 (coded by dominant allele P) turns it into purple pigment. Recessive alleles c and p code for non-functional enzymes. Find the ratio from $CcPp \times CcPp$.
1. Purple needs both enzymes: genotype C_P_, 9 of the 16 squares.
2. All other genotypes (C_pp 3, ccP_ 3, ccpp 1) lack one enzyme and are white: $3 + 3 + 1 = 7$.
3. Ratio 9 purple : 7 white.
4. Out of 160 offspring, expect $160 \times \frac{9}{16} = 90$ purple and $160 \times \frac{7}{16} = 70$ white.
:::

## Recognising linkage or epistasis from data

| Observation | Likely explanation |
|---|---|
| Test cross gives 1 : 1 : 1 : 1 | Unlinked genes, no epistasis |
| Test cross gives two large and two small classes | Linkage; small classes are recombinants |
| Dihybrid F2 close to 3 : 1 with only two common phenotypes | Strong linkage |
| F2 has fewer than four phenotype classes, in sixteenths such as 9 : 3 : 4 or 9 : 7 | Epistasis |

The chi-squared test is used to decide whether a difference from an expected ratio is significant.

:::keyfact{title="ZIMSEC and Cambridge"}
Cambridge only: autosomal linkage and epistasis are Cambridge 9700 A Level topics (Paper 4). Knowledge of the ratios of particular types of epistasis is not expected, but you must work out the ratio from a genetic diagram. ZIMSEC does not set this concept.
:::

## Common mistakes

:::mistake{title="Confusing linkage with sex linkage"}
Autosomal linkage means two genes on the same autosome. Sex linkage means a gene on the X chromosome.
:::

:::mistake{title="Calling all four classes recombinants"}
Recombinants are only the classes with new combinations. The largest classes in a linked test cross are the parental types.
:::

:::mistake{title="Saying epistasis is the same as dominance"}
Dominance is between alleles of one gene. Epistasis is between two different genes.
:::

## Exam tips

:::exam-tip
In Paper 4 *explain* questions on linkage, use: same chromosome, inherited together, parental combinations most common, crossing over at a chiasma in prophase I produces recombinants, recombinants fewer.
:::

:::exam-tip
For epistasis, write out the full 4 × 4 Punnett square, then group the genotypes by phenotype using the rule given in the question. Explain the merged classes by naming the gene that masks the other.
:::

## Summary

:::summary
- Linked genes are on the same chromosome and tend to be inherited together, so they do not assort independently.
- Crossing over between linked loci produces recombinant gametes, which are fewer than parental gametes.
- A linked test cross gives two large parental classes and two small recombinant classes instead of 1 : 1 : 1 : 1.
- Epistasis: one gene masks or modifies the expression of another, merging classes (e.g. 9 : 3 : 4 in Labradors, 9 : 7 in a two-step pathway).
- Unexpected ratios point to linkage or epistasis; chi-squared tests whether a difference is significant.
:::
