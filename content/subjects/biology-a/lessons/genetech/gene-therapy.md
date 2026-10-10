---
{
  "key": "genetech.gene-therapy",
  "title": "Gene therapy: adding working alleles to cells",
  "summary": "The basis of gene therapy: using viral vectors and liposomes to add functional alleles to a patient's cells; somatic versus germ-line therapy and why germ-line therapy is not permitted in humans in most countries; SCID caused by ADA deficiency and inherited eye diseases such as Leber congenital amaurosis; the problems of short-lived effects, immune responses and insertion risks; and the social and ethical issues.",
  "concepts": ["abio.genetech.gene-therapy"],
  "estimatedMinutes": 35,
  "level": "core"
}
---
## Introduction

For a child born with severe combined immunodeficiency (SCID), an ordinary cold can be life-threatening, because the immune system barely works. Treating the symptoms is not enough: the problem is a single faulty gene in every cell. **Gene therapy** aims to treat the cause by giving the right cells a working copy of the gene.

The idea is simple; making it work safely has taken decades. This lesson explains how gene therapy is done, what has been achieved, why it is difficult, and the ethical questions it raises. You should already know how recombinant DNA is made, what a vector is, and the difference between somatic cells and gametes.

## Key definitions

:::definition{term="Gene therapy"}
The treatment of a genetic disorder by inserting a functional (normal) allele into a patient's cells, so that the correct protein is made.
:::

:::definition{term="Somatic gene therapy"}
Gene therapy in which the allele is added to body cells (not gametes), so the change affects only the patient and is not inherited by their children.
:::

:::definition{term="Germ-line gene therapy"}
Gene therapy in which the allele is added to gametes, or to cells of a very early embryo, so the change is present in every cell and can be passed on to future generations.
:::

:::definition{term="Vector"}
A carrier used to deliver DNA into a cell, such as a modified virus or a liposome.
:::

## The basis of gene therapy

Gene therapy works best for conditions caused by **recessive alleles of a single gene**, where adding one working copy restores enough of the missing protein. (It does not remove the faulty alleles.) Dominant conditions, such as Huntington's disease, are much harder, because the faulty allele's product must be silenced as well.

### Steps (outline)

1. **Obtain the normal allele**, for example as cDNA, and insert it into a vector, often with a promoter that works in the target cells.
2. **Deliver the vector to the target cells**, either:
   - *ex vivo*: cells such as bone marrow stem cells or lymphocytes are removed from the patient, treated in the laboratory, checked and returned; or
   - *in vivo*: the vector is injected directly into the tissue, such as the retina.
3. **Expression**: the cells transcribe and translate the new allele, producing the functional protein.

### Vectors

| Vector | How it works | Advantages | Disadvantages |
|---|---|---|---|
| Retroviruses (including lentiviruses) | RNA viruses whose reverse transcriptase makes DNA that is **inserted into the host chromosome** | The gene is copied each time the cell divides, so the effect can be long-lasting | Insertion is at random sites and may disrupt a gene, possibly triggering cancer |
| Adenoviruses and adeno-associated viruses (AAV) | DNA viruses that deliver the gene into the nucleus, mostly **without** inserting it into chromosomes | Lower insertion risk; can infect non-dividing cells such as retinal cells | Effect may be lost in dividing cells; adenoviruses can cause strong immune responses |
| Liposomes | Spheres of phospholipid bilayer enclosing DNA; they fuse with cell membranes | Do not provoke an immune response like viruses; no viral genes | Less efficient: fewer cells take up the DNA |

Viruses used as vectors are made **harmless**: genes that allow them to replicate and cause disease are removed.

## Examples

### SCID caused by ADA deficiency

Without **adenosine deaminase (ADA)**, toxic products build up and kill developing T and B lymphocytes. In gene therapy, the patient's bone marrow stem cells are removed, the normal *ADA* allele is inserted using a retroviral or lentiviral vector, and the cells are returned. Stem cells keep dividing, so new lymphocytes made from them carry the working allele and survive. Early trials treated mature T cells, which did not last, so treatment had to be repeated.

In trials for another form of SCID, some children developed leukaemia because the vector had inserted close to a gene that controls cell division, switching it on. This showed the risk of random insertion and led to safer vectors.

### Inherited eye diseases

In **Leber congenital amaurosis**, a recessive allele of a gene needed by the retina causes severe loss of vision from childhood. The retina is a good target: it is small, easy to reach by injection, and partly shielded from the immune system. A harmless adeno-associated virus carrying the normal allele is injected beneath the retina; the retinal cells, which do not divide, keep expressing the gene. Vision has improved in many treated patients, and a treatment has been approved for use in some countries.

:::worked-solution[Efficiency of transfer (illustrative values)]
Bone marrow cells from a patient were treated with a vector. Of $2.0 \times 10^{8}$ cells, $6.5 \times 10^{7}$ were found to express the new allele.
1. Fraction expressing $= \dfrac{6.5 \times 10^{7}}{2.0 \times 10^{8}} = 0.325$.
2. Percentage $= 0.325 \times 100 = 32.5\%$.
3. Only about a third of the cells were successfully modified, one reason why gene therapy may give partial rather than complete correction.
:::

:::example{title="Interpreting enzyme levels after treatment (illustrative data)"}
ADA activity in a patient's lymphocytes, as a percentage of the normal mean, was measured after ex vivo gene therapy of mature T cells.

| Months after treatment | 0 | 2 | 4 | 6 | 8 |
|---|---|---|---|---|---|
| ADA activity / % of normal | 1 | 24 | 21 | 12 | 5 |

**Describe and explain.** Activity rises from 1% to 24% within two months, as the modified T cells return and express *ADA*. It then falls to 5% by eight months, because mature T cells have a limited lifespan and are replaced by new cells made from unmodified stem cells. Treatment would need to be repeated, or stem cells modified instead.
:::

## Problems with gene therapy

1. **Short-lived effects**: modified cells die and are replaced; non-integrating vectors are lost as cells divide.
2. **Immune responses**: the body may attack the viral vector or the new protein, destroying treated cells and making repeat doses less effective; in rare cases the reaction can be severe.
3. **Insertion risks**: integrating vectors can insert into or next to important genes, disrupting them or activating oncogenes.
4. **Delivery**: getting enough of the vector into the right cells (for example, all affected lung cells in cystic fibrosis) is difficult.
5. **Cost**: treatments are very expensive, limiting access.

## Why germ-line therapy is not permitted

In most countries, germ-line gene therapy in humans is not allowed because:

- the effects would be passed to all future generations, who cannot consent;
- unintended changes or insertion errors would be inherited;
- the long-term consequences are unknown;
- it could open the way to non-medical enhancement ("designer babies").

Supporters argue that it could remove a serious inherited condition from a family permanently.

## Social and ethical considerations

- Gene therapy may relieve great suffering, but risks must be balanced against benefits in trials, especially for children.
- Very high costs raise questions of fair access between rich and poor patients and countries.
- Some people worry about the boundary between treating disease and enhancing normal traits.
- Some religious groups object to altering the human genome, particularly the germ line; others accept somatic therapy as a medical treatment like any other.

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards expect the basis of gene therapy. Cambridge (A Level, Paper 4) names SCID and inherited eye diseases, vectors, and social and ethical considerations; ZIMSEC asks for an outline (Form 6), with ethics in Paper 3 essays.
:::

## Common mistakes

:::mistake{title="Saying gene therapy removes the faulty allele"}
Usually a working allele is **added**; the faulty allele stays in the cell.
:::

:::mistake{title="Saying somatic gene therapy is inherited"}
Only germ-line changes are passed to offspring. A patient treated with somatic therapy can still pass the faulty allele to their children.
:::

:::mistake{title="Calling all vectors viruses"}
Liposomes are non-viral vectors.
:::

## Exam tips

:::exam-tip
To *outline* gene therapy, give: normal allele → vector → target cells (ex vivo or in vivo) → expression of functional protein. Name a vector and a condition.
:::

:::exam-tip
To *explain* why effects are short-lived, link the lifespan of the treated cells and whether the vector integrates into chromosomes.
:::

## Summary

:::summary
- Gene therapy adds a functional allele to cells using vectors: retroviruses or lentiviruses (integrate), adenoviruses or AAV (mostly do not), and liposomes.
- Somatic therapy treats the patient only; germ-line therapy would be inherited and is not permitted in humans in most countries.
- ADA-deficient SCID is treated by modifying bone marrow stem cells; Leber congenital amaurosis by injecting an AAV vector under the retina.
- Problems: short-lived effects, immune responses to vectors, insertion near oncogenes, poor delivery and high cost.
- Ethical issues include consent of future generations, enhancement, risk in trials and fair access.
:::
