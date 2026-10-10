---
{
  "key": "respiration.substrates-rq",
  "title": "Respiratory substrates, RQ and respirometers",
  "summary": "Why lipids release more energy per gram than carbohydrates and proteins, how to calculate the respiratory quotient from equations and from respirometer readings, how a simple respirometer with soda lime or potassium hydroxide works, and how temperature affects respiration rate measured with respirometers or redox indicators.",
  "concepts": ["abio.respiration.substrates-rq"],
  "estimatedMinutes": 45,
  "level": "core"
}
---
## Introduction

Groundnuts and sunflower seeds are oily; maize grains are starchy; soya beans are rich in protein as well as oil. When these seeds germinate, each respires the food it has stored. By measuring how much oxygen a seed takes in and how much carbon dioxide it gives out, you can tell which kind of substrate it is using. The ratio is called the **respiratory quotient (RQ)**.

This lesson covers the energy values of different substrates, how to calculate RQ, and how respirometers are used to measure oxygen uptake and RQ. You should already know the stages of aerobic respiration and that a lipid is made of glycerol and fatty acids.

## Key definitions

:::definition{term="Respiratory substrate"}
An organic molecule that is broken down in respiration to release energy for ATP synthesis, such as glucose, other carbohydrates, fatty acids and amino acids.
:::

:::definition{term="Respiratory quotient (RQ)"}
The ratio of the volume (or number of moles) of carbon dioxide produced to the volume (or number of moles) of oxygen taken in, in the same time:
$$\text{RQ} = \frac{\text{CO}_2 \text{ produced}}{\text{O}_2 \text{ taken in}}$$
:::

:::definition{term="Respirometer"}
Apparatus that measures the rate of oxygen uptake (and, with a second reading, carbon dioxide release) by small organisms or tissues, from the movement of a liquid in a capillary tube.
:::

:::keyfact{title="Values to learn"}
Energy released: carbohydrate about 16 kJ/g, protein about 17 kJ/g, lipid about 37-39 kJ/g. RQ: carbohydrate 1.0, protein about 0.9, lipid about 0.7. An RQ above 1.0 means some anaerobic respiration (extra CO₂ without oxygen uptake).
:::

## Energy values of substrates

Most of the energy released in aerobic respiration comes from oxidising **hydrogen** atoms: they provide the protons and electrons for the electron transport chain, and their combination with oxygen forms water. The more hydrogen atoms per gram of substrate, the more reduced NAD and FAD, the more ATP and the more energy.

- **Lipids** (fatty acid chains) have many C–H bonds and very few oxygen atoms, so they have the most hydrogen per gram: about 37-39 kJ/g.
- **Carbohydrates** contain proportionally more oxygen (C₆H₁₂O₆), so less hydrogen per gram is available: about 16 kJ/g.
- **Proteins** give about 17 kJ/g when respired; some of their hydrogen is lost in urea after deamination, and amino acids are respired only when carbohydrate and fat are short.

Cells usually respire carbohydrates first. In long fasting or starvation, fat reserves and then muscle protein are used.

## Calculating RQ from an equation

For complete aerobic respiration of a substrate C$_x$H$_y$O$_z$, the oxygen needed is $x + \frac{y}{4} - \frac{z}{2}$ molecules and the CO₂ produced is $x$ molecules. Equal numbers of moles of gas occupy equal volumes, so mole ratios give RQ.

For glucose: C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O, so RQ $= 6 \div 6 = 1.0$.

:::worked-solution[RQ of a triglyceride]
Tripalmitin, a fat, has the formula C₅₁H₉₈O₆. Calculate its RQ.
1. Oxygen needed $= 51 + \dfrac{98}{4} - \dfrac{6}{2} = 51 + 24.5 - 3 = 72.5$ molecules.
2. Equation: 2C₅₁H₉₈O₆ + 145O₂ → 102CO₂ + 98H₂O (doubled to avoid a half).
3. RQ $= \dfrac{102}{145} = 0.70$ (to two significant figures).
4. The RQ is lower than for glucose because lipids contain little oxygen, so much more oxygen is needed per carbon dioxide released.
:::

RQ values tell you about substrate use: about 0.7 shows mainly lipid (as in germinating oily seeds or a hibernating animal), about 0.9 protein, 1.0 carbohydrate; values between suggest a mixture. Above 1.0 shows some anaerobic respiration (for example yeast in a closed flask), or conversion of carbohydrate to fat, which releases CO₂.

## The simple respirometer

A typical respirometer has two tubes connected to a U-shaped capillary manometer containing coloured liquid:

1. **Experimental tube**: the organisms (germinating seeds, or small invertebrates such as blowfly larvae or locally collected beetles or caterpillars) on a gauze platform above a layer of **soda lime or potassium hydroxide (KOH) solution**, which **absorbs carbon dioxide**.
2. **Control tube**: the same volume of glass beads (or boiled, dead seeds) in place of the organisms, with the same absorbent. It compensates for changes in temperature and pressure that would move the liquid.
3. Both tubes are kept in a **water bath** at constant temperature, and left for some minutes to equilibrate with the taps open. Then the taps are closed and timing starts.

As the organisms take in oxygen, the CO₂ they release is absorbed, so the gas volume in the experimental tube falls and the liquid moves towards the organisms. The distance moved in a given time measures **oxygen uptake**. A syringe can return the liquid to its start so readings can be repeated.

**Volume of gas** = volume of a cylinder of liquid in the capillary: $V = \pi r^2 l$, where $r$ is the internal radius of the capillary and $l$ the distance moved.

**Measuring RQ.** Repeat with **water in place of the KOH**. Now the movement shows oxygen taken in minus carbon dioxide given out. So:

- CO₂ given out = (movement with KOH) − (movement with water).
- RQ = CO₂ given out ÷ O₂ taken in.

:::worked-solution[RQ of germinating groundnut seeds]
A respirometer with a capillary of internal radius 0.5 mm was used with germinating groundnut seeds at 25 °C. In 10 minutes the liquid moved 30 mm towards the seeds with KOH, and 9 mm towards the seeds with water instead of KOH.
1. O₂ taken in $= \pi \times 0.5^2 \times 30 = 23.56\ \text{mm}^3$.
2. O₂ taken in − CO₂ given out $= \pi \times 0.5^2 \times 9 = 7.069\ \text{mm}^3$.
3. CO₂ given out $= 23.56 - 7.069 = 16.49\ \text{mm}^3$.
4. RQ $= \dfrac{16.49}{23.56} = 0.70$. (The distances can be used directly: $\frac{30 - 9}{30} = 0.70$, because $\pi r^2$ cancels.)
5. Rate of oxygen uptake $= 23.56 \div 10 = 2.36\ \text{mm}^3\ \text{min}^{-1}$.
6. An RQ of 0.70 shows the seeds are respiring mainly lipid: groundnuts store oil.
:::

**Humane handling.** Invertebrates must not touch the KOH or soda lime (they are corrosive), so a gauze platform separates them; experiments are kept short, and animals are returned unharmed to where they were collected. Wear eye protection when handling KOH; the risk is medium if KOH is used.

## Effect of temperature on respiration rate

**With respirometers.** Set up identical respirometers in water baths at, for example, 15, 20, 25, 30 and 35 °C, equilibrate for 10 minutes at each, and measure the distance moved in a fixed time, with three repeats. Rate rises with temperature up to an optimum, as enzyme molecules have more kinetic energy, then falls as enzymes denature.

**With redox indicators.** DCPIP (blue → colourless) and methylene blue (blue → colourless) accept hydrogen from dehydrogenases, as NAD does. In a yeast suspension in glucose, the indicator is decolourised faster when respiration is faster. Record the time for the blue colour to disappear at each temperature (comparing with a colour standard), and calculate rate as 1/time. Keep the tubes undisturbed, because shaking lets oxygen re-oxidise the indicator, turning it blue again.

:::example{title="Predicting a respirometer result"}
Thandeka puts maggots in a respirometer with water, not KOH, and the liquid hardly moves. **Explain**: with no CO₂ absorbent, the volume of CO₂ given out almost equals the volume of oxygen taken in, so the gas volume hardly changes. This suggests an RQ close to 1.0, so the maggots are respiring mainly carbohydrate.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards: relative energy values, RQ from equations and respirometer readings, respirometers and the effect of temperature using respirometers or redox indicators with yeast. Cambridge examines this on Papers 4 and 5; ZIMSEC on Papers 2 and 4, and ZIMSEC Paper 4 often uses a respirometer investigation.
:::

## Common mistakes

:::mistake{title="Inverting RQ"}
RQ = CO₂ **produced** ÷ O₂ **taken in**. Writing O₂ ÷ CO₂ gives about 1.4 for a lipid, which is impossible for aerobic respiration of fat.
:::

:::mistake{title="Saying KOH absorbs oxygen"}
KOH and soda lime absorb **carbon dioxide**. The movement then shows oxygen uptake alone.
:::

:::mistake{title="Using the diameter as the radius"}
In $\pi r^2 l$, $r$ is the **radius**; halve a given diameter. Keep units consistent (mm with mm gives mm³).
:::

## Exam tips

:::exam-tip
In *calculate* questions, show $\pi r^2 l$ with numbers, give units (mm³) and round as instructed. In RQ questions say what the value shows ("about 0.7, so mainly lipid").
:::

:::exam-tip
ZIMSEC Paper 4 and Cambridge Paper 5 ask you to *explain* the control tube, the water bath and equilibration, and to *suggest* sources of error: temperature changes, leaks, the time for liquid to stabilise, and difficulty reading the meniscus.
:::

## Summary

:::summary
- Lipids release about 37-39 kJ/g, carbohydrates about 16 and proteins about 17, because lipids have the most hydrogen per gram.
- RQ = CO₂ produced ÷ O₂ taken in: carbohydrate 1.0, protein about 0.9, lipid about 0.7; above 1.0 indicates some anaerobic respiration.
- In a respirometer, KOH or soda lime absorbs CO₂, so movement measures oxygen uptake; volume = πr²l.
- With water instead of KOH, the difference between readings gives CO₂ release and hence RQ; a control tube corrects for temperature and pressure changes.
- Temperature effects can be measured with respirometers or with DCPIP or methylene blue and yeast.
:::
