---
{
  "key": "inheritance.monohybrid",
  "title": "Monohybrid inheritance and genetic diagrams",
  "summary": "The vocabulary of genetics and how to set out genetic diagrams and Punnett squares for monohybrid crosses with complete dominance, codominance (roan cattle) and multiple alleles (ABO blood groups); test crosses; ratios as probabilities; and interpreting pedigree charts.",
  "concepts": ["abio.inheritance.monohybrid"],
  "estimatedMinutes": 40,
  "level": "core",
  "freePreview": true
}
---
## Introduction

A cattle farmer near Masvingo crosses a red bull with white cows and every calf is roan, a mixture of red and white hairs. A couple who both have blood group A have a child with blood group O. A tall pea plant, crossed with a dwarf one, gives only tall offspring, but their offspring include dwarfs again. Each of these puzzles is solved by following **one gene** with its alleles from parents to offspring: **monohybrid inheritance**.

The skill examiners test most is setting out a clear **genetic diagram**. This lesson teaches the vocabulary, the layout and how to turn ratios into probabilities. You should already know what genes and alleles are and that gametes are haploid, formed by meiosis.

## Key definitions

:::definition{term="Dominant allele"}
An allele that is expressed in the phenotype whenever it is present, in the homozygous or heterozygous state.
:::

:::definition{term="Recessive allele"}
An allele that is expressed in the phenotype only when no dominant allele is present, that is, in the homozygous state.
:::

:::definition{term="Codominance"}
A relationship between two alleles in which both are expressed in the phenotype of a heterozygote.
:::

:::definition{term="Multiple alleles"}
Three or more alleles of one gene in a population, although any one diploid individual carries only two of them.
:::

:::definition{term="Homozygous and heterozygous"}
Homozygous: having two identical alleles of a gene. Heterozygous: having two different alleles of a gene.
:::

:::definition{term="F1 and F2 generations"}
F1: the offspring of a cross between two (usually homozygous) parents. F2: the offspring produced by crossing F1 individuals with each other.
:::

:::definition{term="Test cross"}
A cross between an organism showing the dominant phenotype, whose genotype is unknown, and an organism homozygous recessive for the gene, to find the unknown genotype from the offspring.
:::

## Setting out a genetic diagram

Always define your symbols first, then follow this order:

1. Parent phenotypes
2. Parent genotypes
3. Gametes (one allele of each gene per gamete, circled or listed once each)
4. A Punnett square (gametes of one parent along the top, the other down the side)
5. Offspring genotypes and phenotypes
6. Ratio of phenotypes

For complete dominance use a capital letter for the dominant allele and the same letter in lower case for the recessive: in peas, **T** = tall, **t** = dwarf.

### Complete dominance: tall and dwarf peas

Parent phenotypes: tall × dwarf (both pure-breeding)

Parent genotypes: TT × tt

Gametes: T and t

F1: all Tt, all tall.

Crossing two F1 plants (Tt × Tt), gametes T, t from each parent:

| | **T** | **t** |
|---|---|---|
| **T** | TT (tall) | Tt (tall) |
| **t** | Tt (tall) | tt (dwarf) |

Offspring genotypes: 1 TT : 2 Tt : 1 tt. Phenotypes: 3 tall : 1 dwarf.

The 3 : 1 ratio is a **probability**: each F2 plant has a $\frac{3}{4}$ chance of being tall and $\frac{1}{4}$ of being dwarf. Real numbers only approximate it, because fertilisation is random.

### Codominance: roan cattle

In some breeds of cattle, coat colour is controlled by two codominant alleles. Use a capital letter for the gene and superscripts for the alleles: $C^R$ = red, $C^W$ = white. Neither is written in lower case, because neither is recessive.

Parent phenotypes: red × white

Parent genotypes: $C^R C^R$ × $C^W C^W$

Gametes: $C^R$ and $C^W$

F1: all $C^R C^W$, roan (red and white hairs mixed).

Crossing two roan cattle:

| | $C^R$ | $C^W$ |
|---|---|---|
| $C^R$ | $C^R C^R$ red | $C^R C^W$ roan |
| $C^W$ | $C^R C^W$ roan | $C^W C^W$ white |

Ratio: 1 red : 2 roan : 1 white. With codominance the genotype ratio and phenotype ratio are the same, because every genotype has its own phenotype.

### Multiple alleles: the ABO blood groups

The ABO blood group gene has three alleles: $I^A$ and $I^B$ are **codominant** with each other, and both are **dominant** to $I^O$.

| Genotype | Blood group (phenotype) |
|---|---|
| $I^A I^A$ or $I^A I^O$ | A |
| $I^B I^B$ or $I^B I^O$ | B |
| $I^A I^B$ | AB |
| $I^O I^O$ | O |

$I^A$ and $I^B$ code for slightly different enzymes that add different sugars to a glycoprotein on red blood cells; $I^O$ codes for a non-functional enzyme.

:::worked-solution[Can two group A parents have a group O child?]
Parent phenotypes: group A × group A

1. A group O child must be $I^O I^O$, so must receive $I^O$ from each parent.
2. So both parents must be heterozygous: $I^A I^O$ × $I^A I^O$.
3. Gametes: $I^A$, $I^O$ from each parent.

| | $I^A$ | $I^O$ |
|---|---|---|
| $I^A$ | $I^A I^A$ A | $I^A I^O$ A |
| $I^O$ | $I^A I^O$ A | $I^O I^O$ O |

4. Ratio 3 group A : 1 group O. The probability that a child of this couple is group O is $\frac{1}{4}$ (0.25 or 25%).
:::

## The test cross

A plant with the dominant phenotype could be TT or Tt. Cross it with a homozygous recessive (tt), which can only give t gametes, so each offspring's phenotype shows which allele came from the unknown parent.

| Unknown parent | Gametes | Offspring with tt parent | Conclusion |
|---|---|---|---|
| TT | all T | all Tt: all tall | Unknown was homozygous |
| Tt | T and t | 1 Tt : 1 tt: 1 tall : 1 dwarf | Unknown was heterozygous |

If even one dwarf offspring appears, the unknown parent must be heterozygous. If all are tall, it is very probably TT, and the larger the number of offspring the more confident you can be.

## Ratios as probabilities

- The probability of an event is the expected fraction of outcomes, from 0 to 1.
- For **independent** events, multiply probabilities: the chance that two children of $I^A I^O$ × $I^A I^O$ parents are both group O is $\frac{1}{4} \times \frac{1}{4} = \frac{1}{16}$.
- Each child is an independent event: having one affected child does not change the chance for the next.
- If you already know an individual has the dominant phenotype, the chance it is heterozygous (from Tt × Tt) is $\frac{2}{3}$, not $\frac{1}{2}$, because the tt outcome is excluded.

:::worked-solution[Expected numbers from a ratio]
Two heterozygous tall pea plants produce 236 seeds that grow into plants.
1. Expected ratio 3 tall : 1 dwarf, total of 4 parts.
2. Expected tall $= \frac{3}{4} \times 236 = 177$; expected dwarf $= \frac{1}{4} \times 236 = 59$.
3. Suppose 171 tall and 65 dwarf were observed. These are close to the expected numbers; the chi-squared test (a later lesson) decides whether the difference is due to chance.
:::

## Pedigree charts

A pedigree shows a family's history of a characteristic. Squares are males, circles females; shaded symbols are affected; a horizontal line joins parents; offspring hang below. Generations are numbered I, II, III and individuals 1, 2, 3 from left to right.

- **Recessive condition:** two unaffected parents can have an affected child, so both parents must be heterozygous carriers.
- **Dominant condition:** every affected person has at least one affected parent; two affected parents can have an unaffected child (both are heterozygous).

:::example{title="Reading a pedigree"}
In a family, parents II-3 and II-4 are both unaffected, but their daughter III-2 has albinism. **Deduce:** the allele must be recessive (it appeared in a child of two unaffected parents), so II-3 and II-4 are both heterozygous (Aa). Their next child has a probability of $\frac{1}{4}$ of having albinism, and an unaffected child of theirs has a $\frac{2}{3}$ chance of being a carrier.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards expect genetic diagrams for complete dominance, codominance and multiple alleles, test crosses and the vocabulary in this lesson. Cambridge (A Level, Paper 4) names roan coat colour and the ABO groups; ZIMSEC teaches monohybrid inheritance in Form 5.
:::

## Common mistakes

:::mistake{title="Using lower case for a codominant allele"}
$C^R$ and $C^W$ are both expressed; writing R and r suggests one is recessive. Use a gene letter with superscripts.
:::

:::mistake{title="Writing gametes as pairs"}
Gametes are haploid: each carries one allele of each gene. Write T and t, not Tt.
:::

:::mistake{title="Treating a ratio as an exact prediction"}
A 3 : 1 ratio gives the probability for each offspring. In a family of four children, all four could be affected.
:::

:::mistake{title="Forgetting to define symbols"}
Every genetic diagram must start with a key such as "T = tall, t = dwarf". Without it, marks are lost.
:::

## Exam tips

:::exam-tip
In *show* or *use a genetic diagram* questions (ZIMSEC Paper 2 and Paper 3, Cambridge Paper 4), marks go for each line: symbols defined, parental genotypes, gametes, offspring genotypes, offspring phenotypes linked to genotypes, and the ratio.
:::

:::exam-tip
*Explain* the outcome of a test cross by naming the gametes the homozygous recessive parent makes and what each offspring phenotype reveals.
:::

:::exam-tip
In pedigree questions, quote individuals by their generation and number (II-3) when you *deduce* whether an allele is dominant or recessive.
:::

## Summary

:::summary
- Monohybrid crosses follow one gene; genetic diagrams go parents → genotypes → gametes → Punnett square → offspring → ratio.
- Complete dominance gives 3 : 1 in the F2; codominance (roan cattle) gives 1 : 2 : 1, with both alleles expressed in heterozygotes.
- The ABO gene has three alleles: $I^A$ and $I^B$ codominant, both dominant to $I^O$.
- A test cross with a homozygous recessive reveals an unknown genotype: all dominant (homozygous) or 1 : 1 (heterozygous).
- Ratios are probabilities; multiply them for independent events; pedigrees reveal whether an allele is dominant or recessive.
:::
