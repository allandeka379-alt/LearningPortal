---
{
  "key": "nuclear.detection",
  "title": "Background radiation and detecting radiation",
  "summary": "Describe background radiation and its main sources, measure ionising radiation with a detector and counter, use count rates, and correct count rates for background radiation.",
  "concepts": ["phys.nuclear.detection"],
  "objectives": ["cambridge/igcse/physics:5.2.1.1", "cambridge/igcse/physics:5.2.1.2", "cambridge/igcse/physics:5.2.1.3", "cambridge/igcse/physics:5.2.1.4", "cambridge/igcse/physics:5.2.1.5"],
  "estimatedMinutes": 22
}
---
## Introduction

Switch on a radiation detector in a classroom, far from any radioactive source, and it still clicks every few seconds. We are all exposed to a low level of ionising radiation all the time, from the ground, the air, our food and space. This is **background radiation**, and it must be allowed for whenever we measure the radiation from a source.

## Key definitions

:::definition{term="Background radiation"}
The ionising radiation that is always present in the environment, from natural and artificial sources.
:::

:::definition{term="Count rate"}
The number of ionising events recorded by a detector per unit time, in counts per second or counts per minute.
:::

## Sources of background radiation

The main sources are:

- **radon gas**, a radioactive gas that seeps out of the ground and can collect in buildings;
- **rocks and buildings**, which contain small amounts of radioactive elements such as uranium, thorium and potassium-40 (granite, common across Zimbabwe, gives a slightly higher level than many other rocks);
- **food and drink**, which contain natural radioactive isotopes such as potassium-40 and carbon-14;
- **cosmic rays**, high-energy radiation from space, which is stronger at high altitude.

Smaller amounts come from medical uses such as X-rays and from nuclear industry and past weapons tests.

## Detecting ionising radiation

Ionising radiation is measured with a **detector connected to a counter**. A common detector is the **Geiger–Müller (GM) tube**: each time radiation ionises the gas inside it, a short pulse of current is produced, and the counter (or a ratemeter) records it as one count.

- A **counter** shows the total number of counts in a measured time.
- A **ratemeter** shows the count rate directly.

Because radioactive decay is random, count rates fluctuate, so counts are taken over a reasonably long time (or several times) and averaged.

:::worked-solution[Finding a count rate]
A detector records 1500 counts in 5 minutes.

1. Count rate $= \dfrac{1500}{5} = 300$ counts per minute.
2. In counts per second: $\dfrac{300}{60} = 5$ counts per second.
:::

## Correcting for background radiation (Cambridge Supplement)

The detector counts radiation from the source **and** from the background. To find the count rate due to the source alone, first measure the background count rate with the source removed, then subtract it.

:::formula{name="Corrected count rate"}
$$
\text{corrected count rate} = \text{measured count rate} - \text{background count rate}
$$
:::

:::worked-solution[Correcting a reading]
With no source present, a detector records 90 counts in 3 minutes. With a source in place, it records 2340 counts in 3 minutes.

1. Background count rate $= \dfrac{90}{3} = 30$ counts/min.
2. Measured count rate $= \dfrac{2340}{3} = 780$ counts/min.
3. Corrected count rate $= 780 - 30 = 750$ counts/min.
:::

## Common mistakes

:::mistake{title="Background comes only from nuclear power"}
Most background radiation is natural: radon, rocks, food and cosmic rays.
:::

:::mistake{title="Subtracting before converting"}
Make sure the measured and background values are both count **rates** in the same unit (per second or per minute) before subtracting.
:::

## Exam tips

:::exam-tip
When asked for sources of background radiation, name specific ones: radon gas, rocks and buildings, food and drink, cosmic rays.
:::

:::exam-tip
In experiments, always measure and subtract the background count rate; examiners often award a mark for this step.
:::

## Summary

:::summary
- Background radiation is always present; its main sources are radon gas, rocks and buildings, food and drink, and cosmic rays.
- Ionising radiation is measured with a detector (such as a GM tube) connected to a counter or ratemeter.
- Count rates are given in counts per second or counts per minute.
- Decay is random, so counts fluctuate and should be averaged over time.
- Corrected count rate = measured count rate − background count rate (Cambridge Supplement).
:::
