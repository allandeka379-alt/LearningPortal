---
{
  "key": "genetech.insulin-recombinant-proteins",
  "title": "Producing human insulin and other recombinant proteins",
  "summary": "The steps in making human insulin with genetically modified bacteria, from obtaining the gene or cDNA to culturing in fermenters and purifying the product; the advantages of recombinant human insulin over insulin from animals; and other recombinant human proteins, factor VIII for haemophilia and adenosine deaminase for ADA deficiency.",
  "concepts": ["abio.genetech.insulin-recombinant-proteins"],
  "estimatedMinutes": 35,
  "level": "core"
}
---
## Introduction

Before the 1980s, people with type 1 diabetes injected insulin extracted from the pancreases of slaughtered cattle and pigs. Supply depended on the meat industry, each batch had to be purified from animal tissue, and the insulin differed slightly from human insulin. Today, most insulin is human insulin made by genetically modified microorganisms growing in large steel fermenters.

This lesson applies the tools from *Recombinant DNA and the tools of genetic engineering* to a real production process, then looks at two other medical proteins made the same way. You should know the roles of restriction enzymes, ligase, reverse transcriptase, plasmids and marker genes, and that insulin is a small protein hormone made by the β cells of the islets of Langerhans.

## Key definitions

:::definition{term="Recombinant protein"}
A protein made by an organism from a gene transferred into it by genetic engineering, such as human insulin made by bacteria.
:::

:::definition{term="cDNA"}
Complementary DNA: DNA made from an mRNA template by reverse transcriptase, containing only the exons of the gene.
:::

:::definition{term="Fermenter"}
A large vessel in which microorganisms are grown under controlled conditions (temperature, pH, oxygen, nutrients) to make a product.
:::

:::definition{term="Downstream processing"}
The extraction and purification of a product from the culture after fermentation.
:::

## The steps in producing human insulin

Human insulin is made of two polypeptide chains, A and B, linked by disulfide bonds. It is first made in β cells as a single chain, proinsulin, which is cut by enzymes.

1. **Obtain the gene.** Extract mRNA for insulin (or proinsulin) from human pancreatic β cells, which contain many copies. Use **reverse transcriptase** to make single-stranded cDNA, then **DNA polymerase** to make it double-stranded. Alternatively, synthesise the gene chemically from the known amino acid sequence. Either way the gene has **no introns**.
2. **Add sticky ends and a promoter.** The cDNA is given ends that match the plasmid, and placed next to a bacterial promoter so that it will be transcribed.
3. **Cut the plasmid.** Open a plasmid with the **same restriction enzyme**, producing complementary sticky ends. The plasmid carries a marker gene.
4. **Join.** Mix the gene and the plasmid; sticky ends pair and **DNA ligase** seals the backbones, forming a **recombinant plasmid**.
5. **Transform.** Bacteria (*Escherichia coli*) take up the plasmids after treatment with calcium ions and heat shock.
6. **Select.** Use the marker gene (fluorescence or antibiotic resistance) to identify bacteria that contain the recombinant plasmid.
7. **Clone and culture.** Grow the selected bacteria first in small cultures and then in **industrial fermenters**, with sterile nutrient medium, controlled temperature and pH, aeration and stirring. Each bacterium divides by binary fission, copying the plasmid each time.
8. **Extract and purify.** Separate the cells, break them open if the product is inside, and purify the insulin by filtration and chromatography. In one approach the A and B chains are made in separate cultures and joined chemically; in another, proinsulin is made and cut by enzymes to give active insulin. Yeast cells are also used, and can secrete the product.

:::worked-solution[How many bacteria after six hours?]
A culture starts with 1000 transformed bacteria that divide every 20 minutes under ideal conditions. Calculate the number of bacteria after 6 hours.
1. Number of divisions $= \dfrac{6 \times 60}{20} = 18$.
2. Each division doubles the number: $N = 1000 \times 2^{18}$.
3. $N = 262\,144\,000$, about $2.6 \times 10^{8}$ bacteria.
4. In a real culture, growth slows as nutrients run out and wastes build up, which is why fermenter conditions are controlled.
:::

:::worked-solution[Yield from a fermenter (illustrative values)]
After purification, a 5000 dm³ batch yields 0.12 g of insulin per dm³ of culture. How many vials containing 35 mg each could be filled?
1. Total insulin $= 5000 \times 0.12 = 600$ g $= 600\,000$ mg.
2. Number of vials $= \dfrac{600\,000}{35} = 17\,142.9$.
3. Only whole vials can be filled: $17\,142$ vials. (Convert grams to milligrams before dividing.)
:::

## Advantages of recombinant human insulin

| Feature | Insulin from cattle or pigs | Recombinant human insulin |
|---|---|---|
| Amino acid sequence | Differs from human by one (pig) or three (cattle) amino acids | Identical to human insulin |
| Immune and allergic reactions | More likely; some patients make antibodies against it | Less likely |
| Supply | Limited by the number of animals slaughtered | Can be scaled up to meet demand |
| Purity and consistency | Risk of contamination with other animal proteins or pathogens | Very pure and consistent from batch to batch |
| Ethical and religious acceptability | Unacceptable to some vegetarians and some religious groups (for example pork products) | Avoids the use of animal tissue |

Genetic engineering also allows modified **insulin analogues**, with one or two amino acids changed, which act faster or for longer than natural insulin.

## Other recombinant human proteins

### Factor VIII for haemophilia

People with haemophilia A lack functional **factor VIII**, a blood-clotting protein. Previously it was extracted from donated human blood plasma, which carried a risk of transmitting viruses such as HIV and hepatitis. Recombinant factor VIII is made by genetically modified **mammalian cells** grown in culture; mammalian cells are used because factor VIII is a large protein that needs modifications (such as adding carbohydrate groups) that bacteria cannot carry out.

### Adenosine deaminase for ADA deficiency

Lack of the enzyme **adenosine deaminase (ADA)** causes a form of severe combined immunodeficiency (SCID): toxic products build up and kill developing lymphocytes, so children suffer repeated serious infections. Recombinant ADA can be given by injection as enzyme replacement therapy while a patient waits for a bone marrow transplant or gene therapy.

:::example{title="Explaining the choice of host cell"}
A company wants to make a human glycoprotein hormone, which has carbohydrate chains attached in the Golgi body.

**Suggest and explain** a suitable host. Bacteria have no Golgi body or endoplasmic reticulum, so they cannot add the carbohydrate chains, and the protein might fold wrongly or be inactive. A eukaryotic host, such as yeast or cultured mammalian cells, can modify the protein after translation, so it is more likely to be active and identical to the human hormone.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards expect the steps in producing human insulin and its advantages for treating diabetes. Factor VIII and adenosine deaminase are Cambridge detail (A Level, Paper 4).
:::

## Common mistakes

:::mistake{title="Using the human insulin gene from chromosomes"}
Genomic DNA contains introns, which bacteria cannot remove. Use cDNA made from mRNA, or a synthetic gene.
:::

:::mistake{title="Saying recombinant insulin \"cures\" diabetes"}
It treats diabetes by replacing the hormone; injections must continue.
:::

:::mistake{title="Forgetting downstream processing"}
The bacteria do not deliver insulin ready to inject. It must be extracted, purified and, depending on the method, joined or cut to form active insulin.
:::

## Exam tips

:::exam-tip
ZIMSEC Paper 2 and Paper 3 (*outline* the steps; *explain* the advantages) and Cambridge Paper 4 test this concept. Number the steps and name the enzyme used in each.
:::

:::exam-tip
For *explain* the advantages, pair each feature with its consequence: identical sequence → fewer immune reactions; fermenters → unlimited supply.
:::

## Summary

:::summary
- The insulin gene is obtained as cDNA (from mRNA with reverse transcriptase) or synthesised, so it lacks introns.
- It is joined into a plasmid with a promoter using the same restriction enzyme and DNA ligase, then transferred to *E. coli*.
- Transformed bacteria are selected with marker genes, cultured in fermenters, and insulin is extracted and purified.
- Recombinant human insulin is identical to human insulin, causes fewer immune reactions, and is pure, plentiful and ethically more acceptable.
- Recombinant factor VIII (haemophilia) and adenosine deaminase (ADA deficiency) are made in the same way.
:::
