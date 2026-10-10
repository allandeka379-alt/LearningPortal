---
{
  "key": "division.genetic-variation",
  "title": "How meiosis and fertilisation produce genetic variation",
  "summary": "Crossing over at chiasmata in prophase I, independent assortment of homologous pairs at metaphase I and of chromatids at metaphase II, calculating the number of chromosome combinations as 2 to the power n, random fertilisation, and why this variation matters for natural selection.",
  "concepts": ["abio.division.genetic-variation"],
  "estimatedMinutes": 30,
  "level": "core"
}
---
## Introduction

Look around a family at a gathering in Masvingo: brothers and sisters share the same two parents, yet each has a different combination of features. Unless they are identical twins, no two siblings inherit exactly the same set of alleles. The reason lies in three random events: two during meiosis and one at fertilisation. Together they generate an almost unlimited variety of genotypes, the raw material on which natural selection acts.

You should already know the stages of meiosis, what homologous chromosomes are and the difference between a gene and an allele.

## Key definitions

:::definition{term="Crossing over"}
The exchange of corresponding sections of DNA between non-sister chromatids of a pair of homologous chromosomes at chiasmata during prophase I, producing new combinations of alleles on each chromatid.
:::

:::definition{term="Chiasma (plural chiasmata)"}
A point where non-sister chromatids of a bivalent are in contact and where crossing over has taken place.
:::

:::definition{term="Independent assortment"}
The random orientation of each homologous pair on the equator at metaphase I (and of sister chromatids at metaphase II), so that the chromosomes from each parent are distributed to the gametes in random combinations.
:::

:::definition{term="Random fertilisation"}
The fusion of any one male gamete with any one female gamete, so that the combination of alleles in the zygote is a matter of chance.
:::

:::formula{name="Number of chromosome combinations in gametes (independent assortment only)"}
$$
\text{combinations} = 2^{n}
$$

where $n$ is the haploid number (the number of homologous pairs).
:::

## Source 1: crossing over in prophase I

1. Homologous chromosomes pair closely to form a bivalent.
2. A chromatid of one homologue and a chromatid of the other (non-sister chromatids) break at the same point.
3. The broken ends rejoin with the other chromatid, so equivalent sections are swapped. The point of contact is visible as a **chiasma**.
4. Each chromatid involved now carries a **new combination of alleles** (a recombinant chromatid), mixing alleles that came from the mother and the father.

Because each sister chromatid can be involved separately, after crossing over the two chromatids of one chromosome are **no longer identical**. Several chiasmata can form in each bivalent, at different places in different cells, so the number of possible recombinant chromatids is huge. Crossing over separates alleles of genes that are linked on the same chromosome; genes far apart on a chromosome are separated more often than genes close together.

## Source 2: independent assortment at metaphase I and II

At **metaphase I**, each bivalent lines up on the equator with either the maternal or the paternal chromosome facing a given pole. The orientation of one pair has no effect on the orientation of any other pair. So each gamete receives a random mixture of maternal and paternal chromosomes.

With $n$ homologous pairs there are $2^{n}$ possible combinations in the gametes, even without crossing over.

At **metaphase II**, the sister chromatids, which are no longer identical after crossing over, are also oriented at random, adding further variation.

:::worked-solution[Combinations for a cell with $2n = 6$]
1. $2n = 6$, so there are $n = 3$ homologous pairs: call them A/a, B/b and C/c (capital = maternal, small = paternal).
2. Each pair can line up two ways at metaphase I, independently of the others.
3. Number of combinations $= 2 \times 2 \times 2 = 2^{3} = 8$.
4. The eight gametes are ABC, ABc, AbC, Abc, aBC, aBc, abC and abc.
:::

:::worked-solution[Combinations in humans]
1. Humans have $2n = 46$, so $n = 23$.
2. Combinations from independent assortment $= 2^{23} = 8\,388\,608$ different gametes from one person.
3. A zygote combines one gamete from each parent, so the possible combinations of chromosomes in a zygote $= 2^{23} \times 2^{23} = 2^{46} \approx 7.04 \times 10^{13}$.
4. This ignores crossing over, which increases the number enormously.
:::

## Source 3: random fertilisation

Any male gamete may fuse with any female gamete. Since each parent can make millions of genetically different gametes, the chance that two zygotes from the same parents receive identical sets of alleles is vanishingly small. Fertilisation also brings together alleles from **two different individuals**, which is the main advantage of sexual reproduction over asexual reproduction.

## Why variation matters

Variation within a population means that individuals differ in characteristics such as resistance to disease, tolerance of drought or the ability to escape predators. When the environment changes, some individuals are better adapted: they survive, reproduce and pass on their alleles. This is **natural selection**, the subject of the evolution lessons. Without genetic variation a population could not adapt and might be wiped out by a single new disease. Crops that are clones, such as some bananas grown from suckers, show this risk: a single pathogen can affect every plant.

Note that meiosis and fertilisation **reshuffle** existing alleles. **New** alleles arise only by mutation.

:::example{title="Interpreting a crossing-over diagram described in words"}
A bivalent carries alleles **D** and **E** on the maternal chromosome and **d** and **e** on the paternal chromosome, with a chiasma between the two loci. **Predict** the four chromatids after meiosis: two parental types (DE and de, from the chromatids not involved) and two recombinants (De and dE). Without the chiasma, only DE and de would be possible.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
ZIMSEC teaches this in Form 5; for Cambridge it is **A Level only** (topic 16, Paper 4). Both boards expect crossing over, independent assortment, random fertilisation and the $2^n$ calculation.
:::

## Common mistakes

:::mistake{title="Saying crossing over happens between sister chromatids"}
Crossing over is between **non-sister** chromatids of homologous chromosomes. Exchange between identical sister chromatids would not create new combinations.
:::

:::mistake{title="Using 2n instead of n in the formula"}
The number of combinations is $2^{n}$, where $n$ is the number of **pairs**. For humans this is $2^{23}$, not $2^{46}$ (that is the figure for zygotes).
:::

:::mistake{title="Claiming meiosis creates new alleles"}
Meiosis creates new **combinations** of alleles. New alleles come from mutation.
:::

## Exam tips

:::exam-tip
In ZIMSEC Papers 2 and 3 and Cambridge Paper 4, *explain how meiosis produces variation* needs three named processes, each with its **stage**: crossing over (prophase I), independent assortment (metaphase I, and of chromatids in metaphase II), plus random fertilisation if the question includes sexual reproduction.
:::

:::exam-tip
Show working in $2^n$ calculations: state $n$, write $2^n$, then the value.
:::

## Summary

:::summary
- Crossing over between non-sister chromatids at chiasmata in prophase I produces recombinant chromatids.
- Random orientation of homologous pairs at metaphase I (and of chromatids at metaphase II) gives independent assortment.
- Independent assortment alone gives $2^{n}$ combinations; for humans $2^{23} = 8\,388\,608$.
- Random fertilisation combines gametes from two parents, multiplying the variety further.
- Variation is the raw material for natural selection; new alleles come only from mutation.
:::
