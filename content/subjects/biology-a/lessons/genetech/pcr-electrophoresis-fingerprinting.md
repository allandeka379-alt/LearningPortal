---
{
  "key": "genetech.pcr-electrophoresis-fingerprinting",
  "title": "PCR, gel electrophoresis and genetic fingerprinting",
  "summary": "How the polymerase chain reaction copies DNA (denaturation, primer annealing and extension, Taq polymerase, doubling per cycle); how gel electrophoresis separates DNA fragments by length and how fragment sizes are estimated from a marker ladder; and the basis and process of genetic fingerprinting using variable tandem repeats, with forensic and paternity uses.",
  "concepts": ["abio.genetech.pcr-electrophoresis-fingerprinting"],
  "estimatedMinutes": 45,
  "level": "core"
}
---
## Introduction

A single hair root or a tiny spot of dried blood contains only a few nanograms of DNA, far too little to analyse. Yet forensic scientists can identify a person from it, and a clinic in Harare can confirm a diagnosis from a small blood sample. Two techniques make this possible: the **polymerase chain reaction (PCR)**, which copies a chosen piece of DNA millions of times, and **gel electrophoresis**, which sorts DNA fragments by length so they can be compared.

You should already know DNA structure, semi-conservative replication, complementary base pairing and the roles of DNA polymerase and restriction enzymes.

## Key definitions

:::definition{term="Polymerase chain reaction (PCR)"}
A technique that makes many copies of a specific DNA sequence in a test tube by repeated cycles of heating and cooling, using primers, free nucleotides and a heat-stable DNA polymerase.
:::

:::definition{term="Primer"}
A short, single-stranded DNA sequence, complementary to one end of the target sequence, that binds to the template and provides a starting point for DNA polymerase.
:::

:::definition{term="Gel electrophoresis"}
A technique that separates charged molecules, such as DNA fragments, according to their size by making them move through a gel in an electric field.
:::

:::definition{term="Variable number tandem repeats (VNTRs)"}
Short base sequences, in non-coding DNA, repeated one after another; the number of repeats at each locus varies between individuals, so the lengths of these regions differ.
:::

:::definition{term="Genetic fingerprinting"}
Producing a pattern of DNA bands from an individual's variable tandem repeat regions, which is very likely to be unique to that individual (except identical twins), for identification or establishing relationships.
:::

## The polymerase chain reaction

A PCR tube contains the **template DNA**, two different **primers** (one for each end of the target, one on each strand), the four **DNA nucleotides** (dATP, dTTP, dCTP, dGTP), **Taq polymerase** and a buffer with magnesium ions. A thermal cycler repeats three steps:

| Step | Temperature (about) | What happens |
|---|---|---|
| 1. Denaturation | 95 °C | Hydrogen bonds between bases break, separating the DNA into single strands |
| 2. Annealing | 55-65 °C | Primers bind by complementary base pairing to the 3' ends of the target on each single strand |
| 3. Extension | 72 °C | Taq polymerase adds nucleotides to the 3' end of each primer, building a complementary strand |

One cycle takes a few minutes, and 25-35 cycles are usual.

### Why Taq polymerase?

Taq polymerase comes from *Thermus aquaticus*, a bacterium that lives in hot springs. Its optimum is about 72-80 °C and it is **not denatured** at 95 °C. Ordinary DNA polymerases would be denatured in the first heating step, so fresh enzyme would have to be added every cycle. With Taq, the tube is set up once and cycled automatically.

### Doubling every cycle

Each cycle doubles the number of copies of the target sequence (in ideal conditions). Starting from $N_0$ molecules, after $n$ cycles:

$$N = N_0 \times 2^n$$

:::worked-solution[Copies after 30 cycles of PCR]
A single DNA molecule is amplified through 30 cycles.
1. $N = 1 \times 2^{30}$.
2. $N = 1\,073\,741\,824$, about $1.07 \times 10^{9}$ copies.
3. In practice the yield is lower, because primers and nucleotides are used up and the enzyme slowly loses activity, so amplification eventually levels off.
:::

## Gel electrophoresis

1. DNA samples (cut by restriction enzymes or amplified by PCR) are mixed with a loading dye and placed in **wells** at one end of an **agarose gel** in a buffer solution.
2. A potential difference is applied. DNA is **negatively charged** because of its phosphate groups, so all fragments move towards the **anode** (positive electrode).
3. The gel is a mesh of fibres. **Shorter fragments move faster and further**; longer fragments are held back more.
4. A **marker** (DNA ladder) of fragments of known lengths is run in one lane.
5. The DNA is made visible, for example with a stain that fluoresces under ultraviolet light, or by using radioactive or fluorescent labelled probes that bind to specific sequences.

Because DNA has about the same charge per unit length whatever its size, separation depends on **length**, not charge.

:::worked-solution[Estimating a fragment length from a ladder]
Ladder bands: 1000 bp at 20 mm, 500 bp at 32 mm and 250 bp at 44 mm from the well. An unknown band is at 38 mm.
1. Distance falls on a straight line when plotted against the **logarithm** of length: here each halving of length adds 12 mm.
2. 38 mm is halfway between 32 mm (500 bp) and 44 mm (250 bp), so the length is halfway between them on a log scale.
3. Length $= 500 \div \sqrt{2} = 354$ bp (to 3 significant figures). A simple linear average (375 bp) overestimates it.
:::

## Genetic fingerprinting

### The theoretical basis

Most human DNA is the same in everyone, but some non-coding regions contain **variable number tandem repeats** (VNTRs), and shorter **short tandem repeats** (STRs). At each locus a person has two alleles, one from each parent, which may differ in the number of repeats, and therefore in length. Many such loci are analysed, so the overall pattern is almost certainly unique to one person (except identical twins), and half of each person's bands come from each parent.

### The process

1. **Extract DNA** from cells (blood, saliva, hair roots, semen).
2. **Amplify** the repeat regions by PCR with primers that flank them (or, in the older method, cut the DNA with restriction enzymes that cut outside the repeats).
3. **Separate** the fragments by gel electrophoresis.
4. **Visualise** the bands with fluorescent labels or probes.
5. **Compare** the band patterns of different samples.

### Uses

- **Forensics**: comparing DNA from a crime scene with suspects; a match places a person at the scene (it does not by itself prove guilt), and a mismatch excludes them.
- **Paternity and family relationships**: every band in a child must come from the mother or the biological father.
- Identifying human remains, and checking the pedigrees of animals in breeding programmes.

:::example{title="A paternity case"}
Band lengths (bp) at three loci for a mother, a child and two possible fathers:

| Person | Locus 1 | Locus 2 | Locus 3 |
|---|---|---|---|
| Mother | 180, 210 | 300, 330 | 140, 140 |
| Child | 180, 240 | 270, 330 | 140, 160 |
| Man P | 225, 255 | 270, 285 | 150, 165 |
| Man Q | 195, 240 | 270, 315 | 160, 175 |

**Interpret.** At each locus, identify the child's band from the mother (180, 330, 140); the other band must come from the father (240, 270, 160). Man Q has all three (240, 270, 160); Man P lacks 240 and 160. Man P is excluded; Man Q could be the father. In practice, many more loci would be tested before reaching a conclusion.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards expect PCR with Taq polymerase and gel electrophoresis. The term genetic fingerprinting, its theoretical basis and its forensic and paternity uses are ZIMSEC detail; Cambridge (A Level, Paper 4) asks how electrophoresis distinguishes alleles and analyses DNA.
:::

## Common mistakes

:::mistake{title="Saying DNA moves towards the cathode"}
DNA is negative, so it moves towards the positive **anode**.
:::

:::mistake{title="Saying Taq polymerase is not affected by temperature"}
It is **thermostable**: not denatured at 95 °C, with a high optimum. It still has an optimum temperature.
:::

:::mistake{title="Calling VNTRs genes"}
VNTRs are in non-coding regions; they are useful precisely because their length varies without affecting the phenotype.
:::

## Exam tips

:::exam-tip
*Describe* PCR with each step's temperature and what happens to the DNA; *explain* why Taq polymerase is used. *Calculate* copies with $N_0 \times 2^n$ and give large answers in standard form if asked.
:::

:::exam-tip
In band-pattern questions, sort the child's bands into maternal and paternal before comparing men; state that a missing paternal band **excludes** a man.
:::

## Summary

:::summary
- PCR copies a target sequence: denaturation about 95 °C, annealing of primers about 55-65 °C, extension by Taq polymerase about 72 °C.
- Taq polymerase is thermostable, so it survives each 95 °C step; copies double each cycle: $N = N_0 \times 2^n$.
- In gel electrophoresis, negatively charged DNA moves towards the anode; shorter fragments travel further; a ladder gives sizes.
- Genetic fingerprinting compares the lengths of variable tandem repeats amplified by PCR and separated by electrophoresis.
- Uses: forensics, paternity and identification; every band in a child comes from one of its parents.
:::
