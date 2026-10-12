---
{
  "key": "nuclear.half-life",
  "title": "Half-life",
  "summary": "Define half-life, use it in calculations with numbers of nuclei and count rates, and find half-lives from tables and decay curves, including data that include background radiation.",
  "concepts": ["phys.nuclear.half-life"],
  "objectives": ["cambridge/igcse/physics:5.2.4.1", "cambridge/igcse/physics:5.2.4.2"],
  "estimatedMinutes": 30
}
---
## Introduction

Iodine-131, used in hospitals to treat thyroid disease, loses half its activity in about 8 days. Carbon-14 takes about 5700 years to do the same, which is why it is used to date charcoal and wood from ancient sites such as Great Zimbabwe. Although we cannot predict when any single nucleus will decay, a large number of them decays in a perfectly predictable way, described by the **half-life**.

## Key definitions

:::definition{term="Half-life"}
The time taken for half the nuclei of a particular isotope in a sample to decay. Equivalently, the time for the count rate (activity) from the sample to fall to half its starting value.
:::

## Halving again and again

Each half-life, the number of undecayed nuclei, and so the count rate, halves:

| Time | 0 | 1 half-life | 2 half-lives | 3 half-lives | 4 half-lives |
| --- | --- | --- | --- | --- | --- |
| fraction remaining | 1 | $\dfrac{1}{2}$ | $\dfrac{1}{4}$ | $\dfrac{1}{8}$ | $\dfrac{1}{16}$ |

The amount never quite reaches zero; it just keeps halving. A graph of count rate against time is a smooth **decay curve** that falls steeply at first and then more and more slowly.

![Decay curve for a source with a half-life of 6.0 hours and an initial count rate of 1200 counts per minute: the count rate falls to 600 after 6 hours, 300 after 12, 150 after 18 and 75 after 24 hours, halving in every equal 6-hour step, falling steeply at first and then more slowly.](media:diagrams/half-life-decay-curve.png "Figure: the count rate halves every half-life")

:::worked-solution[Count rate after several half-lives]
A source has a half-life of 6.0 hours and an initial count rate of 1200 counts/min (background is negligible).

1. 24 hours is $\dfrac{24}{6.0} = 4$ half-lives.
2. $1200 \rightarrow 600 \rightarrow 300 \rightarrow 150 \rightarrow 75$ counts/min.
3. After 24 hours the count rate is 75 counts/min.
:::

:::worked-solution[Finding a half-life from a table]
A sample contains $8.0 \times 10^{6}$ undecayed nuclei. After 36 days, $1.0 \times 10^{6}$ remain.

1. $8.0 \times 10^{6} \rightarrow 4.0 \times 10^{6} \rightarrow 2.0 \times 10^{6} \rightarrow 1.0 \times 10^{6}$: three halvings.
2. Three half-lives take 36 days, so the half-life is $\dfrac{36}{3} = 12$ days.
:::

## Reading half-life from a decay curve

Choose a count rate on the curve, read off the time, then find the time at which the count rate has halved. The difference is the half-life. Repeat from another starting point and average: the half-life is the same wherever you start.

## Data that include background radiation (Cambridge Supplement)

A detector records background radiation as well as the source. The background does **not** halve, so it must be **subtracted** from every reading before the half-life is found.

:::worked-solution[Correcting for background]
The background count rate is 20 counts/min. A source gives measured count rates of 420 counts/min at the start and 120 counts/min after 4.0 hours.

1. Corrected count rates: $420 - 20 = 400$ and $120 - 20 = 100$ counts/min.
2. $400 \rightarrow 200 \rightarrow 100$ is two halvings in 4.0 hours.
3. The half-life is $\dfrac{4.0}{2} = 2.0$ hours. (Using the uncorrected values, $420 \rightarrow 120$, would give a wrong answer.)
:::

## Half-lives vary enormously

| Isotope | Half-life |
| --- | --- |
| technetium-99m | about 6 hours |
| iodine-131 | about 8 days |
| cobalt-60 | about 5.3 years |
| carbon-14 | about 5700 years |
| uranium-238 | about 4.5 billion years |

## Common mistakes

:::mistake{title="Everything has gone after two half-lives"}
After one half-life half remains; after two, a **quarter** remains, not zero.
:::

:::mistake{title="Forgetting the background"}
If the background count rate is given, subtract it from every reading before halving.
:::

## Exam tips

:::exam-tip
Count the halvings in a chain (1200 → 600 → 300 …) and write each step down; it avoids errors and earns method marks.
:::

:::exam-tip
On a decay curve, read the half-life at least twice from different starting values and show the construction lines.
:::

## Summary

:::summary
- Half-life is the time for half the nuclei of an isotope to decay, or for the count rate to halve.
- After $n$ half-lives, the fraction remaining is $\left(\dfrac{1}{2}\right)^{n}$.
- Half-life is found from tables (count the halvings) or decay curves (read the halving time).
- Subtract the background count rate from every reading before finding a half-life (Cambridge Supplement).
- Half-lives range from fractions of a second to billions of years.
:::
