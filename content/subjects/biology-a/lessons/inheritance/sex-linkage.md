---
{
  "key": "inheritance.sex-linkage",
  "title": "Sex determination and sex linkage",
  "summary": "How the X and Y chromosomes determine sex in humans; why genes on the X chromosome are inherited differently in males and females; genetic diagrams for haemophilia and red-green colour blindness with carrier females; pedigree analysis; and sex linkage combined with an autosomal gene in outline.",
  "concepts": ["abio.inheritance.sex-linkage"],
  "estimatedMinutes": 35,
  "level": "core"
}
---
## Introduction

Red-green colour blindness is far more common in men than in women, and haemophilia affects almost only males, yet both conditions are passed down through mothers who are themselves unaffected. The explanation lies in the **sex chromosomes**. A gene carried on the X chromosome is present twice in a woman but only once in a man, so the rules of inheritance change.

You should already be confident with monohybrid genetic diagrams and know what the F8 gene codes for.

## Key definitions

:::definition{term="Sex chromosomes"}
The pair of chromosomes that determine the sex of an individual; in humans XX in females and XY in males. All other chromosomes are autosomes.
:::

:::definition{term="Sex linkage"}
The inheritance of a characteristic controlled by a gene on a sex chromosome (usually the X chromosome), so that the pattern of inheritance differs between males and females.
:::

:::definition{term="Carrier"}
An individual that has one copy of a recessive allele and does not show the characteristic, but can pass the allele to offspring; for X-linked conditions, a heterozygous female ($X^H X^h$).
:::

:::definition{term="Hemizygous"}
Having only one copy of a gene, as a male has for genes on the X chromosome that have no matching locus on the Y.
:::

## Sex determination in humans

Humans have 23 pairs of chromosomes: 22 pairs of autosomes and one pair of sex chromosomes.

- Females are **XX**: every egg carries an X chromosome.
- Males are **XY**: half the sperm carry an X and half carry a Y.
- The sex of a child is therefore decided by the sperm: X sperm gives a girl, Y sperm a boy, each with a probability of $\frac{1}{2}$.

| | **X** (sperm) | **Y** (sperm) |
|---|---|---|
| **X** (egg) | XX female | XY male |
| **X** (egg) | XX female | XY male |

The Y chromosome carries a gene (SRY) that switches on male development. The X chromosome is much larger and carries many genes with nothing to do with sex, such as F8 (clotting factor VIII) and genes for colour-sensitive pigments in cone cells. These genes have **no matching loci on the Y**, so a male has only one allele of each.

## Writing sex-linked genotypes

Show the allele as a superscript on the X: $X^H$ (normal clotting) and $X^h$ (haemophilia). The Y has no allele and is written as Y alone.

| Genotype | Phenotype |
|---|---|
| $X^H X^H$ | Female, normal |
| $X^H X^h$ | Female, normal, carrier |
| $X^h X^h$ | Female, haemophilia |
| $X^H Y$ | Male, normal |
| $X^h Y$ | Male, haemophilia |

A male cannot be a carrier: with one X, whatever allele he has is expressed.

## Haemophilia: a carrier mother and an unaffected father

Parent phenotypes: carrier female × unaffected male

Parent genotypes: $X^H X^h$ × $X^H Y$

Gametes: $X^H$, $X^h$ (egg) and $X^H$, Y (sperm)

| | $X^H$ | Y |
|---|---|---|
| $X^H$ | $X^H X^H$ normal female | $X^H Y$ normal male |
| $X^h$ | $X^H X^h$ carrier female | $X^h Y$ male with haemophilia |

Offspring: 1 normal female : 1 carrier female : 1 normal male : 1 male with haemophilia.

- Probability that a **child** has haemophilia: $\frac{1}{4}$.
- Probability that a **son** has haemophilia: $\frac{1}{2}$ (of the two male outcomes, one is affected).
- Probability that a **daughter** is a carrier: $\frac{1}{2}$.

Notice how the question words matter: "a child" and "a son" give different answers.

## Red-green colour blindness

Use $X^B$ for normal colour vision and $X^b$ for red-green colour blindness (recessive).

:::worked-solution[A colour-blind father and a homozygous normal mother]
Parent phenotypes: colour-blind male × normal female

Parent genotypes: $X^b Y$ × $X^B X^B$

Gametes: $X^b$, Y (sperm); $X^B$ (eggs)

| | $X^b$ | Y |
|---|---|---|
| $X^B$ | $X^B X^b$ carrier female | $X^B Y$ normal male |

1. All daughters are carriers ($X^B X^b$): they receive their father's only X.
2. All sons are normal ($X^B Y$): they receive their father's Y, not his X.
3. A father **never** passes an X-linked allele to his sons.
:::

:::worked-solution[Can a woman be colour-blind?]
A carrier woman ($X^B X^b$) has children with a colour-blind man ($X^b Y$).
1. Gametes: $X^B$, $X^b$ (eggs); $X^b$, Y (sperm).
2. Offspring: $X^B X^b$ (carrier female), $X^b X^b$ (colour-blind female), $X^B Y$ (normal male), $X^b Y$ (colour-blind male).
3. Ratio 1 : 1 : 1 : 1. The probability that a daughter is colour-blind is $\frac{1}{2}$.
4. A female is affected only if she inherits the allele from **both** parents, which is why affected females are rare.
:::

## Why males are affected more often

A male needs only **one** recessive allele (from his mother) to be affected, because his Y chromosome has no allele to mask it. A female needs **two**, one from each parent. If a recessive X-linked allele is present in a fraction $q$ of X chromosomes in a population, about $q$ of males are affected but only about $q^2$ of females, which is much smaller.

## Pedigrees for X-linked recessive conditions

Look for these features:

1. Many more affected males than females.
2. Affected males usually have unaffected parents; the allele came from a **carrier mother**.
3. **No male-to-male transmission**: an affected father never passes the condition to his sons.
4. All daughters of an affected father are at least carriers.
5. The condition may skip a generation, passing through carrier females.

:::example{title="Interpreting a family history"}
In a family, an unaffected couple have two sons, one with haemophilia; the mother's brother also has haemophilia. **Deduce:** the affected son received $X^h$ from his mother (his father gave him a Y). The mother is unaffected, so she is $X^H X^h$, a carrier, and probably inherited $X^h$ from her own carrier mother, who also passed it to her brother. Each of the couple's future sons has a $\frac{1}{2}$ chance of haemophilia.
:::

## Sex linkage with an autosomal gene (outline)

When one gene is X-linked and another is on an autosome, treat them together as in a dihybrid cross. For example, a woman who is a carrier of colour blindness and heterozygous for albinism ($X^B X^b\,Aa$) makes four types of egg: $X^B A$, $X^B a$, $X^b A$, $X^b a$. Combine these with the father's gametes in a Punnett square, and state sex as well as each phenotype for every offspring.

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards expect XX/XY sex determination, X-linked genetic diagrams for haemophilia and colour blindness with carriers, and pedigree analysis. Cambridge (A Level, Paper 4) also expects sex linkage combined with an autosomal gene; ZIMSEC teaches this concept in Form 5.
:::

## Common mistakes

:::mistake{title="Writing alleles on the Y"}
For X-linked genes write $X^h Y$, never $X^h Y^h$: the Y carries no allele of the gene.
:::

:::mistake{title="Giving a son's probability when the question asks for a child"}
"Probability a child has haemophilia" uses all four outcomes ($\frac{1}{4}$); "probability a son has it" uses only the male outcomes ($\frac{1}{2}$).
:::

:::mistake{title="Saying a father passes haemophilia to his son"}
Sons get their X from their mother. An affected father passes his $X^h$ to all of his daughters.
:::

:::mistake{title="Calling a male a carrier"}
Males have one X: they either have the condition or they do not.
:::

## Exam tips

:::exam-tip
Genetic diagram questions (ZIMSEC Paper 2 and Paper 3, Cambridge Paper 4) expect sex chromosomes shown with superscript alleles, gametes listed separately, and each offspring given both its sex and its phenotype.
:::

:::exam-tip
To *explain* why males are more often affected, give both halves: one X in males, so one recessive allele is expressed; females need two recessive alleles, one from each parent.
:::

:::exam-tip
In pedigree questions, use the absence of father-to-son transmission and the presence of carrier mothers to *deduce* X-linked recessive inheritance.
:::

## Summary

:::summary
- Human females are XX and males XY; the sperm decides the sex of a child.
- X-linked genes have no matching loci on the Y, so males have one allele and express it whatever it is.
- Haemophilia ($X^h$) and red-green colour blindness ($X^b$) are X-linked recessive; heterozygous females are carriers.
- Males are affected more often; affected fathers pass the allele to all daughters and never to sons.
- Distinguish "probability a child is affected" from "probability a son is affected".
:::
