---
{
  "key": "evolution.allele-frequencies",
  "title": "Allele frequencies: genetic drift, bottlenecks and the Hardy-Weinberg principle",
  "summary": "How natural selection, genetic drift, the founder effect and the bottleneck effect change allele frequencies in populations, with northern elephant seals and cheetahs as examples; and how to use the Hardy-Weinberg equations to calculate allele, genotype and carrier frequencies, with the conditions under which the principle applies.",
  "concepts": ["abio.evolution.allele-frequencies"],
  "estimatedMinutes": 40,
  "level": "core"
}
---
## Introduction

Evolution, at its simplest, is a change in the **allele frequencies** of a population over generations. Natural selection is one cause, but not the only one. In a small population, alleles can become more or less common purely by chance; a few individuals that start a new population may carry an unusual set of alleles; and a disaster that kills most of a population can leave survivors whose alleles are not typical of the original. Conservationists working with small populations, such as the black rhino herds in Zimbabwe's conservancies, worry about exactly these processes, because they can strip a population of its genetic diversity.

To tell whether allele frequencies are changing, biologists need a baseline: what would happen if nothing were changing them? The **Hardy-Weinberg principle** provides that baseline and lets you estimate allele and carrier frequencies from the numbers of individuals with each phenotype.

You should already understand alleles, dominance, genotypes and natural selection.

## Key definitions

:::definition{term="Gene pool"}
All the alleles of all the genes present in a population at a given time.
:::

:::definition{term="Allele frequency"}
The proportion of all copies of a gene in a population that are a particular allele, expressed as a decimal between 0 and 1.
:::

:::definition{term="Genetic drift"}
A random change in allele frequencies from one generation to the next, caused by chance differences in which individuals survive and reproduce; its effects are greatest in small populations.
:::

:::definition{term="Founder effect"}
The loss of genetic variation, and change in allele frequencies, when a new population is established by a small number of individuals from a larger population.
:::

:::definition{term="Bottleneck effect"}
The loss of genetic variation when a population is reduced to a very small number of individuals, for example by hunting, disease or a natural disaster, so that the survivors carry only some of the original alleles.
:::

:::keyfact{title="Hardy-Weinberg equations (provided in Cambridge papers)"}
$$p + q = 1 \qquad p^2 + 2pq + q^2 = 1$$
$p$ = frequency of the dominant allele; $q$ = frequency of the recessive allele; $p^2$ = frequency of homozygous dominant individuals; $2pq$ = frequency of heterozygotes; $q^2$ = frequency of homozygous recessive individuals.
:::

## What changes allele frequencies?

- **Natural selection**: alleles that increase survival and reproduction become more common (directional, stabilising or disruptive selection).
- **Genetic drift**: in each generation only some individuals reproduce, and which alleles get passed on is partly a matter of chance. In a large population these chance effects average out; in a small one an allele can drift to a frequency of 1 (**fixed**) or 0 (**lost**) within a few generations, regardless of whether it is advantageous.
- **Founder effect**: a few individuals colonise a new area (an island, a newly fenced reserve). Their alleles are a small, random sample of the original gene pool, so some alleles are missing and others are more common than before. Genetic drift then continues in the small new population.
- **Bottleneck effect**: a drastic fall in numbers leaves a small sample of the original alleles. Even if the population later recovers, the lost variation does not return quickly, because only mutation can restore it.
- **Mutation** and **migration** (gene flow) also add or remove alleles.

:::example{title="Two bottlenecks: northern elephant seals and cheetahs"}
**Northern elephant seals** were hunted for their oil in the nineteenth century until only a small number, perhaps a few tens, survived. Protected, the population has since recovered to well over a hundred thousand, but studies of their DNA and proteins show very little genetic variation compared with southern elephant seals, which were not reduced so drastically.

**Cheetahs** show extremely low genetic diversity, thought to result from one or more severe bottlenecks thousands of years ago. Cheetahs from different populations are so similar genetically that skin grafts between unrelated animals have been accepted. Low diversity is linked to poor sperm quality and may make the species vulnerable to new diseases, because there may be no alleles giving resistance.

In both cases the population lost alleles by chance, not because the lost alleles were disadvantageous.
:::

## The Hardy-Weinberg principle

The principle states that, in a population that meets certain **conditions**, allele and genotype frequencies stay **constant** from generation to generation. The conditions are:

1. The population is **very large** (no genetic drift).
2. Mating is **random**.
3. There is **no mutation**.
4. There is **no migration** into or out of the population.
5. There is **no selection**: all genotypes survive and reproduce equally well.

Real populations rarely meet all five, which is the point: if observed genotype frequencies differ from those predicted, one or more of the conditions must be broken, and the population may be evolving.

### Why the equations work

If $p$ and $q$ are the frequencies of the two alleles, then every allele is one or the other, so $p + q = 1$. With random mating, the chance that an offspring receives the dominant allele from both parents is $p \times p = p^2$; the recessive allele from both, $q^2$; and one of each, in either order, $2pq$. These are all the possibilities, so $p^2 + 2pq + q^2 = 1$.

### Calculating frequencies

With complete dominance you cannot tell $AA$ from $Aa$ by phenotype, so start from the **homozygous recessive** frequency, $q^2$, which you can observe.

:::worked-solution[Shell colour in a snail population]
In a population of 6400 snails, 256 have yellow shells, the recessive phenotype ($aa$). The rest are brown.
1. $q^2 = \dfrac{256}{6400} = 0.04$.
2. $q = \sqrt{0.04} = 0.2$.
3. $p = 1 - 0.2 = 0.8$.
4. Heterozygotes: $2pq = 2 \times 0.8 \times 0.2 = 0.32$, so about $0.32 \times 6400 = 2048$ snails are carriers.
5. Homozygous dominant: $p^2 = 0.64$, about 4096 snails.
6. Check: $0.64 + 0.32 + 0.04 = 1$.

![Hardy-Weinberg genotype frequencies against the frequency q of the recessive allele: p squared falls from 1 to 0, 2pq peaks at 0.5 when q is 0.5, and q squared rises from 0 to 1; at q = 0.2 (the snails) the frequencies are 0.64, 0.32 and 0.04, and at q = 0.3 (the cattle) 0.49, 0.42 and 0.09.](media:diagrams/hardy-weinberg-genotype-curves.png "Figure: Hardy-Weinberg genotype frequencies, with the snail and cattle populations marked")

:::

When the genotypes **can** be distinguished (codominance), count the alleles directly instead.

:::worked-solution[Coat colour in a herd of cattle]
A herd of 400 cattle contains 196 red ($C^R C^R$), 168 roan ($C^R C^W$) and 36 white ($C^W C^W$) animals.
1. Total alleles $= 2 \times 400 = 800$.
2. $C^W$ alleles $= (2 \times 36) + 168 = 240$, so $q = 240 \div 800 = 0.3$ and $p = 0.7$.
3. Expected numbers if the herd is in Hardy-Weinberg equilibrium: red $= 0.49 \times 400 = 196$, roan $= 0.42 \times 400 = 168$, white $= 0.09 \times 400 = 36$.
4. The observed numbers match the expected numbers exactly, so there is no evidence that the conditions are being broken for this gene. (With real data, a chi-squared test compares observed and expected numbers.)
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Genetic drift, the founder and bottleneck effects and Hardy-Weinberg calculations are Cambridge A Level content (Paper 4; equations provided). They are not in the ZIMSEC syllabus, which deals with variation and natural selection.
:::

## Common mistakes

:::mistake{title="Treating the recessive phenotype frequency as q"}
The proportion showing the recessive phenotype is $q^2$. Take the square root to find $q$.
:::

:::mistake{title="Using p² for the dominant phenotype"}
Individuals with the dominant phenotype are $p^2 + 2pq$, not $p^2$ alone.
:::

:::mistake{title="Forgetting the 2 in 2pq"}
Heterozygotes can receive the dominant allele from either parent, so their frequency is $2pq$.
:::

:::mistake{title="Saying genetic drift is selection"}
Drift is random; it can remove a beneficial allele or fix a harmful one, especially in small populations.
:::

## Exam tips

:::exam-tip
Set out Hardy-Weinberg answers in steps with the symbols: $q^2 = \ldots$, $q = \ldots$, $p = 1 - q = \ldots$, $2pq = \ldots$. Then convert to numbers of individuals or percentages as the question asks. Keep unrounded values until the end.
:::

:::exam-tip
To *explain* why a population is not in equilibrium, name a condition that is broken and link it to the data: selection against a genotype, a small population (drift), non-random mating or migration.
:::

## Summary

:::summary
- Allele frequencies change by natural selection, genetic drift, founder and bottleneck effects, mutation and migration.
- Drift is random and strongest in small populations; bottlenecks (northern elephant seals, cheetahs) and founder events reduce genetic diversity.
- $p + q = 1$ and $p^2 + 2pq + q^2 = 1$; start from $q^2$, the frequency of the recessive phenotype.
- Carrier (heterozygote) frequency is $2pq$.
- The principle assumes a large population, random mating and no mutation, migration or selection.
:::
