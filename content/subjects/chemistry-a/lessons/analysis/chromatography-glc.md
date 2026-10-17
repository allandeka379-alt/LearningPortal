---
{
  "key": "analysis.chromatography-glc",
  "title": "Gas-liquid chromatography and HPLC",
  "summary": "How gas-liquid chromatography separates volatile mixtures: the stationary liquid and carrier gas, retention time and what changes it, percentage composition from relative peak areas, HPLC in outline, and GC-MS for identifying drugs and contaminants.",
  "concepts": ["achem.analysis.chromatography-glc"],
  "estimatedMinutes": 40,
  "level": "core"
}
---
## Introduction

How much ethanol is in a fuel blend? Does a sample of blood contain a banned substance? Are there traces of pesticide in exported fruit? Questions like these need a method that separates a mixture, measures how much of each component is present, and works on tiny samples. For volatile substances that method is **gas-liquid chromatography** (GLC, also called gas chromatography, GC), often linked to a mass spectrometer.

This lesson describes how GLC works, what controls the time a component takes to pass through, how to calculate percentage composition from a gas chromatogram, and the outline of HPLC and GC-MS. You should know the principles of chromatography (stationary and mobile phases, partition), intermolecular forces and boiling points.

## Key definitions

:::definition{term="Gas-liquid chromatography"}
Chromatography in which the mobile phase is an unreactive carrier gas and the stationary phase is a high-boiling liquid held on a solid support (or coating the inside of a long, narrow column) in a temperature-controlled oven.
:::

:::definition{term="Retention time"}
The time between injecting a sample and the detection of a component at the end of the column (the time to the top of its peak).
:::

:::definition{term="Carrier gas"}
The unreactive gas (for example nitrogen, helium or argon) that carries the vaporised sample through the column.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards: GLC, retention times and percentage composition from peak areas (ZIMSEC Form 6, 6.4.2.3; Cambridge A Level, 37.2). HPLC is named only by ZIMSEC; GC-MS and applications are needed in general terms by both.
:::

## How a gas-liquid chromatograph works

1. A tiny volume of liquid sample is injected into a heated port, where it vaporises.
2. The **carrier gas** (the mobile phase) sweeps the vapour into the **column**, a long coiled tube inside an oven held at a controlled temperature.
3. The column contains the **stationary phase**: a liquid with a high boiling point, often non-polar (such as a long-chain alkane or a silicone oil), coated on an inert solid support or on the inner wall of a capillary tube.
4. Each component **partitions** between the gas and the liquid. Components that are more soluble in the stationary liquid, or less volatile, spend more time dissolved in it and move more slowly.
5. A **detector** at the end produces a signal as each component leaves. The output, the **gas chromatogram**, shows a peak for each component against time.

![Layout of a gas chromatograph: carrier gas sweeps the vaporised sample from the heated injection port into a column in an oven, where components partition between the gas and a liquid stationary phase; each leaves at its own retention time and is sensed by the detector, which sends a signal to the recorder that draws the chromatogram.](media:diagrams/gas-chromatograph-layout.png "Figure: how a gas-liquid chromatograph is arranged, from injection to chromatogram")

## Retention time

A component's retention time depends on:

| Factor | Effect on retention time |
|---|---|
| boiling point (volatility) of the component | higher boiling point → longer retention time (spends more time in the liquid) |
| interaction with the stationary phase | stronger attraction (e.g. similar polarity) → longer retention time |
| column temperature | higher temperature → shorter retention times for all components |
| column length | longer column → longer retention times (and better separation) |
| carrier gas flow rate | faster flow → shorter retention times |

On a **non-polar** stationary phase, components come out roughly in order of increasing boiling point. On a **polar** stationary phase, polar components (such as alcohols) are held back more. A substance is identified by comparing its retention time with that of a known sample run **under the same conditions**.

:::example{title="Example 1: predicting the order of elution"}
A mixture of hexane (b.p. 69 °C), heptane (b.p. 98 °C) and octane (b.p. 126 °C) is injected onto a non-polar column at 80 °C.

1. All three are non-polar, so their interaction with the stationary phase depends mainly on instantaneous dipole–induced dipole forces, which increase with chain length.
2. Hexane is the most volatile and the least attracted to the stationary liquid: it leaves first.
3. Order of elution: hexane, then heptane, then octane.
4. Raising the oven temperature would shorten all three retention times but keep the same order.
:::

## Percentage composition from peak areas

The **area** under each peak is proportional to the amount of that component (assuming the detector responds equally to each). So

![Gas chromatogram of three alcohols as triangular peaks: ethanol (base 0.6 min, height 52 mm, area 15.6, 56.5 percent), propan-1-ol (0.8 min, 18 mm, 7.2, 26.1 percent) and butan-1-ol (1.0 min, 9.6 mm, 4.8, 17.4 percent); percentages come from peak areas, not heights.](media:diagrams/gc-peak-areas-alcohols.png "Figure: composition from peak areas (half base times height) for the mixture in Example 2")

$$
\text{percentage of component} = \frac{\text{area of its peak}}{\text{total area of all peaks}} \times 100
$$

Peak areas are usually measured by the instrument. For a roughly triangular peak, area ≈ ½ × base width × height.

:::worked-solution[Example 2: composition of an alcohol mixture]
A gas chromatogram of a mixture of three alcohols has triangular peaks with these dimensions:

| Component | Base width / min | Height / mm | Area = ½ × base × height |
|---|---|---|---|
| ethanol | 0.6 | 52 | 15.6 |
| propan-1-ol | 0.8 | 18 | 7.2 |
| butan-1-ol | 1.0 | 9.6 | 4.8 |

1. Total area = 15.6 + 7.2 + 4.8 = 27.6.
2. Ethanol: 15.6 ÷ 27.6 × 100 = 56.5%.
3. Propan-1-ol: 7.2 ÷ 27.6 × 100 = 26.1%.
4. Butan-1-ol: 4.8 ÷ 27.6 × 100 = 17.4%.
5. Check: 56.5 + 26.1 + 17.4 = 100.0%.
:::

Note that the heights alone would give the wrong answer, because later peaks are lower and broader.

## High-performance liquid chromatography (HPLC)

HPLC (ZIMSEC detail) uses a **liquid** mobile phase **pumped at high pressure** through a column packed with very fine particles of stationary phase. The small particles give a large surface area and good separation, and the pressure keeps the flow fast. HPLC suits substances that are **not volatile** or that **decompose on heating**, such as many drugs, sugars, amino acids and food dyes, which GLC cannot handle. Components are detected as they leave, often by ultraviolet absorption, and identified by retention time.

## GC-MS and applications

Retention time alone cannot prove the identity of an unknown, because two substances can have similar retention times. In **GC-MS**, each component leaving the GC column passes straight into a mass spectrometer. The mass spectrum (molecular ion and fragmentation pattern) is compared with a computer library of spectra, giving a much more certain identification.

Uses, in general terms:

- testing urine or blood for drugs, including in sport;
- measuring alcohol in blood or breath samples;
- detecting pesticide residues and contaminants in food and water;
- checking the composition of fuels, flavourings and perfumes;
- forensic analysis of fire debris and unknown substances.

## Common mistakes

:::mistake{title="Using peak heights"}
Percentage composition comes from peak **areas**, not heights.
:::

:::mistake{title="Stationary phase is the gas"}
The gas is the **mobile** phase. The stationary phase is the high-boiling liquid in the column.
:::

:::mistake{title="Retention time proves identity"}
Matching retention times suggests an identity; confirm it with a second column or GC-MS.
:::

:::mistake{title="Higher temperature, longer time"}
A hotter column makes components more volatile, so retention times **decrease**.
:::

## Exam tips

:::exam-tip{title="Which papers"}
ZIMSEC Paper 3 Section D and Paper 4; Cambridge Paper 4 (interpret a chromatogram, calculate composition) and Paper 5 (data analysis).
:::

:::exam-tip{title="Command words"}
*Calculate* the percentage composition: show each area, the total, and each fraction × 100. *Explain* the order of retention times: link boiling point or attraction to the stationary phase to time spent in the liquid. *Describe* the stationary and mobile phases: "high-boiling liquid on a solid support" and "unreactive carrier gas such as nitrogen". *Suggest* why GC-MS is used: retention time alone is not conclusive; the mass spectrum identifies each component.
:::

## Summary

:::summary
- GLC: mobile phase an unreactive carrier gas; stationary phase a high-boiling liquid on a support, in an oven.
- Retention time increases with boiling point and attraction to the stationary phase, and with column length; it decreases with higher temperature and faster gas flow.
- Percentage of a component = its peak area ÷ total peak area × 100.
- HPLC uses a liquid mobile phase at high pressure for non-volatile or heat-sensitive substances.
- GC-MS identifies each separated component from its mass spectrum (drug testing, contaminants).
:::
