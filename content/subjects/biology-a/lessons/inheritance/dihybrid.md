---
{
  "key": "inheritance.dihybrid",
  "title": "Dihybrid inheritance",
  "summary": "How two unlinked genes are inherited together: working out gametes by independent assortment, setting out a 4 × 4 Punnett square, the 9 : 3 : 3 : 1 ratio from two double heterozygotes and the 1 : 1 : 1 : 1 ratio from a dihybrid test cross, crosses involving codominance or multiple alleles, and using the product rule for probabilities.",
  "concepts": ["abio.inheritance.dihybrid"],
  "estimatedMinutes": 40,
  "level": "core"
}
---
## Introduction

Pick up a cob from certain maize crosses used in genetics teaching and you will see grains of four kinds: purple and smooth, purple and wrinkled, yellow and smooth, yellow and wrinkled, in roughly the proportions 9 : 3 : 3 : 1. Two genes are at work, one for grain colour and one for grain texture, and because they are on different chromosomes they are inherited independently of each other. Following two genes at once is **dihybrid inheritance**.

You should already be confident with monohybrid genetic diagrams, and know how independent assortment of homologous chromosomes in meiosis I produces genetically different gametes.

## Key definitions

:::definition{term="Dihybrid cross"}
A cross in which the inheritance of two different genes, each with its own alleles, is followed at the same time.
:::

:::definition{term="Independent assortment"}
The random orientation of each pair of homologous chromosomes at metaphase I of meiosis, independent of other pairs, so that alleles of genes on different chromosomes are distributed into gametes in all possible combinations with equal probability.
:::

:::definition{term="Unlinked genes"}
Genes on different (non-homologous) chromosomes, which therefore assort independently.
:::

:::definition{term="Dihybrid test cross"}
A cross between an individual showing both dominant phenotypes and an individual homozygous recessive for both genes, used to find the unknown genotype.
:::

:::keyfact{title="Ratios to recognise"}
- $AaBb \times AaBb$ → 9 : 3 : 3 : 1
- $AaBb \times aabb$ (test cross) → 1 : 1 : 1 : 1
- $AaBb \times Aabb$ → 3 : 3 : 1 : 1
:::

## Working out the gametes

Each gamete carries **one allele of each gene**. For a double heterozygote, $AaBb$:

1. Gene A gives A or a; gene B gives B or b.
2. Because the genes are on different chromosomes, each allele of gene A can go into a gamete with either allele of gene B.
3. Four types of gamete in equal numbers: **AB, Ab, aB, ab**.

A shortcut is the "FOIL" pattern (first, outer, inner, last) for $Aa\,Bb$: AB, Ab, aB, ab. A homozygote such as $AAbb$ gives only one type of gamete, Ab.

## The 9 : 3 : 3 : 1 ratio

In maize, let **P** = purple grain, **p** = yellow grain, **S** = smooth (starchy) grain and **s** = wrinkled (sweet) grain. P is dominant to p and S is dominant to s.

Parent phenotypes: purple smooth × yellow wrinkled (both pure-breeding)

Parent genotypes: $PPSS$ × $ppss$

Gametes: PS and ps

F1: all $PpSs$, purple smooth.

F1 × F1: $PpSs$ × $PpSs$. Gametes from each: PS, Ps, pS, ps.

| | **PS** | **Ps** | **pS** | **ps** |
|---|---|---|---|---|
| **PS** | PPSS | PPSs | PpSS | PpSs |
| **Ps** | PPSs | PPss | PpSs | Ppss |
| **pS** | PpSS | PpSs | ppSS | ppSs |
| **ps** | PpSs | Ppss | ppSs | ppss |

Counting phenotypes:

| Phenotype | Genotypes | Number of squares |
|---|---|---|
| Purple smooth | P_S_ | 9 |
| Purple wrinkled | P_ss | 3 |
| Yellow smooth | ppS_ | 3 |
| Yellow wrinkled | ppss | 1 |

So the F2 ratio is **9 : 3 : 3 : 1**. Notice that each gene on its own still gives 3 : 1 (12 purple : 4 yellow; 12 smooth : 4 wrinkled): the 9 : 3 : 3 : 1 ratio is simply $(3 : 1) \times (3 : 1)$.

## The dihybrid test cross

To find whether a purple smooth plant is $PPSS$, $PPSs$, $PpSS$ or $PpSs$, cross it with a yellow wrinkled ($ppss$) plant, which only makes ps gametes.

| Unknown genotype | Its gametes | Offspring phenotypes |
|---|---|---|
| $PPSS$ | PS | All purple smooth |
| $PpSs$ | PS, Ps, pS, ps | 1 purple smooth : 1 purple wrinkled : 1 yellow smooth : 1 yellow wrinkled |
| $PpSS$ | PS, pS | 1 purple smooth : 1 yellow smooth |
| $PPSs$ | PS, Ps | 1 purple smooth : 1 purple wrinkled |

The 1 : 1 : 1 : 1 ratio shows a double heterozygote whose two genes are assorting independently.

## Probability and the product rule

For unlinked genes, the probability of a combination of phenotypes equals the **product** of the separate probabilities. This avoids drawing a 16-square grid.

:::worked-solution[Using the product rule]
Find the probability that an offspring of $PpSs \times Ppss$ is yellow and smooth.
1. Colour: $Pp \times Pp$ → $P(\text{yellow}) = \dfrac{1}{4}$.
2. Texture: $Ss \times ss$ → $P(\text{smooth}) = \dfrac{1}{2}$.
3. Independent genes, so multiply: $\dfrac{1}{4} \times \dfrac{1}{2} = \dfrac{1}{8}$.
4. Out of 400 grains, the expected number of yellow smooth grains is $400 \times \dfrac{1}{8} = 50$.
:::

:::worked-solution[Expected numbers from a 9 : 3 : 3 : 1 ratio]
A cob from an F1 × F1 cross has 528 grains.
1. Total parts $= 9 + 3 + 3 + 1 = 16$.
2. One part $= 528 \div 16 = 33$.
3. Expected: purple smooth $9 \times 33 = 297$; purple wrinkled $3 \times 33 = 99$; yellow smooth $99$; yellow wrinkled $33$.
4. Check: $297 + 99 + 99 + 33 = 528$.
:::

## Dihybrid crosses with codominance or multiple alleles

The method is the same: work out gametes, fill the grid and count phenotypes, but more phenotype classes appear because heterozygotes have their own phenotype.

:::example{title="Roan coat and horns in cattle"}
In cattle, coat colour has codominant alleles $C^R$ (red) and $C^W$ (white); roan is $C^R C^W$. A separate gene controls horns: **H** (hornless, polled) is dominant to **h** (horned). Two roan, heterozygous hornless animals are crossed: $C^R C^W Hh \times C^R C^W Hh$.

Each makes four gametes: $C^R H$, $C^R h$, $C^W H$, $C^W h$. Using the product rule:

- Colour: 1 red : 2 roan : 1 white.
- Horns: 3 hornless : 1 horned.
- Combined: red hornless 3, red horned 1, roan hornless 6, roan horned 2, white hornless 3, white horned 1.

The ratio is **3 : 1 : 6 : 2 : 3 : 1** (out of 16), six phenotype classes instead of four.
:::

:::example{title="Blood group and an autosomal recessive condition"}
A father is $I^A I^O\,Tt$ and a mother $I^B I^O\,Tt$, where t is a recessive allele. The probability that a child is blood group O and homozygous tt is $\dfrac{1}{4} \times \dfrac{1}{4} = \dfrac{1}{16}$, because $I^A I^O \times I^B I^O$ gives each of A, B, AB and O with probability $\frac{1}{4}$.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards expect dihybrid genetic diagrams with unlinked genes, the 9 : 3 : 3 : 1 and 1 : 1 : 1 : 1 ratios, and crosses with codominance or multiple alleles. Cambridge (A Level, Paper 4) tests this with linkage and the chi-squared test; ZIMSEC teaches it in Form 5.
:::

## Common mistakes

:::mistake{title="Putting two alleles of the same gene in a gamete"}
A gamete from $PpSs$ is PS, never Pp or Ss. Each gamete has one allele of each gene.
:::

:::mistake{title="Expecting 9 : 3 : 3 : 1 from every dihybrid cross"}
It only comes from two double heterozygotes with complete dominance and unlinked genes. Other parental genotypes, codominance, linkage and epistasis all give other ratios.
:::

:::mistake{title="Adding instead of multiplying probabilities"}
For "yellow AND smooth", multiply the separate probabilities. Add only for "either one outcome OR another".
:::

## Exam tips

:::exam-tip
In *genetic diagram* questions (ZIMSEC Paper 2 and Paper 3, Cambridge Paper 4) list all four gamete types, draw the full 4 × 4 grid if asked, and group offspring by phenotype before giving the ratio.
:::

:::exam-tip
When a question gives numbers of offspring, *calculate* the expected numbers from the ratio first: they are needed for a chi-squared test in the next part.
:::

## Summary

:::summary
- A dihybrid cross follows two genes; unlinked genes assort independently in meiosis.
- A double heterozygote $AaBb$ makes four gamete types in equal numbers: AB, Ab, aB, ab.
- $AaBb \times AaBb$ gives 9 : 3 : 3 : 1; the dihybrid test cross $AaBb \times aabb$ gives 1 : 1 : 1 : 1.
- For unlinked genes, multiply the separate probabilities (product rule).
- Codominance or multiple alleles give more phenotype classes, such as 3 : 1 : 6 : 2 : 3 : 1.
:::
