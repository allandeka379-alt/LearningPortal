---
{
  "key": "kinetics.collisions-boltzmann",
  "title": "Reaction rates, collision theory and the Boltzmann distribution",
  "summary": "Measuring and calculating rates of reaction, the experimental methods used to follow a reaction, collision theory and activation energy, and how the Boltzmann distribution explains the effects of temperature and catalysts on rate.",
  "concepts": ["achem.kinetics.collisions-boltzmann"],
  "estimatedMinutes": 50,
  "freePreview": true,
  "level": "core"
}
---
## Introduction

Milk left out on a hot day in Masvingo goes sour within hours; in a fridge it lasts for days. Maize meal stored in a dusty, poorly ventilated mill can even explode, while a sack of the same meal burns only slowly. Chemistry is not only about *whether* a reaction happens but about **how fast** it happens, and why temperature, concentration, surface area and catalysts make such a difference.

This lesson shows how rates are measured and calculated from experimental data, then explains the results using **collision theory** and the **Boltzmann distribution** of molecular energies. You should already know that particles in gases and liquids are in constant random motion, how to read gradients from graphs, and how to calculate amounts of gas. Rate equations and orders of reaction follow in the next lessons.

## Key definitions

:::definition{term="Rate of reaction"}
The change in the amount or concentration of a reactant or product per unit time, for example in mol dm⁻³ s⁻¹ or cm³ s⁻¹.
:::

:::definition{term="Activation energy, Ea"}
The minimum energy that colliding particles must have for the collision to lead to a reaction (an effective collision).
:::

:::definition{term="Effective collision"}
A collision between reacting particles that have at least the activation energy and the correct orientation, so that bonds break and the reaction occurs.
:::

:::definition{term="Catalyst"}
A substance that increases the rate of a reaction by providing an alternative reaction pathway with a lower activation energy, and is chemically unchanged at the end of the reaction.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards need all of this lesson (ZIMSEC Form 5; Cambridge AS Level, Papers 1, 2 and 3). ZIMSEC also asks you to devise experimental techniques for following a reaction from given information, so learn which method suits which reaction.
:::

## Measuring rates

The rate at any moment is the **gradient of a concentration–time (or volume–time) graph** at that moment. At the start the gradient is steepest (initial rate); it falls as reactants are used up.

![Volume of carbon dioxide against time for 0.300 g of calcium carbonate with excess acid: the curve rises steeply then levels at 72 cm³, and a dashed tangent at t = 0 through (30 s, 54 cm³) has gradient 1.8 cm³ per second, the initial rate.](media:diagrams/rate-gas-volume-time-graph.png "Figure: gas volume against time; the tangent at t = 0 gives the initial rate (1.8 cm³ s⁻¹)")

:::worked-solution[Example 1: rates from gas-volume data]
Rudo added 0.300 g of powdered calcium carbonate to excess dilute hydrochloric acid and collected the carbon dioxide in a gas syringe.

| Time / s | 0 | 20 | 40 | 60 | 80 | 100 | 120 | 160 | 200 |
|---|---|---|---|---|---|---|---|---|---|
| Volume of CO₂ / cm³ | 0 | 28 | 46 | 56 | 62 | 66 | 68 | 71 | 72 |

1. Average rate over the first 20 s = $\dfrac{28 - 0}{20 - 0} = 1.4$ cm³ s⁻¹.
2. Average rate from 20 s to 40 s = $\dfrac{46 - 28}{20} = 0.9$ cm³ s⁻¹: slower, because the acid and solid are being used up.
3. Initial rate: a tangent drawn to the curve at t = 0 passes through (0 s, 0 cm³) and (30 s, 54 cm³), so its gradient = $\dfrac{54}{30} = 1.8$ cm³ s⁻¹.
4. Final volume check: 0.300 g of $\ce{CaCO3}$ ($M_\text{r}$ 100.1) is 0.00300 mol, giving 0.00300 mol of $\ce{CO2}$, or 0.00300 × 24.0 = 0.0720 dm³ = 72 cm³ at room conditions, which matches the final reading.
:::

For a **clock reaction**, such as sodium thiosulfate with acid (the time for a cross under the flask to disappear), the same fixed amount of product forms each time, so the rate is proportional to **1/time**. A run that takes 25 s instead of 40 s is 40/25 = 1.6 times faster.

### Choosing a method

| Method | Suitable when | Example |
|---|---|---|
| gas volume (gas syringe or inverted burette) | a gas is produced | $\ce{CaCO3 + 2HCl -> CaCl2 + H2O + CO2}$ |
| mass loss on a balance | a dense gas escapes | $\ce{CO2}$ from marble chips |
| colorimetry | a coloured reactant or product | iodine in the iodination of propanone |
| titration of quenched samples | an acid, alkali, iodine or other titratable species changes | hydrolysis of an ester |
| conductivity | the number or type of ions changes | hydrolysis of a halogenoalkane in water |
| clock reaction | a sudden visible change at a fixed extent of reaction | thiosulfate and acid (sulfur precipitate) |

Quenching means stopping the reaction in a sample, for example by rapid cooling, by dilution with ice-cold water, or by neutralising the catalyst, so that its composition can be measured at a known time.

## Collision theory

For particles to react they must **collide**, with the **correct orientation**, and with energy **at least equal to the activation energy**. Only a small fraction of collisions are effective. Any factor that increases the number of **effective collisions per second** increases the rate.

| Factor | Effect on rate | Explanation |
|---|---|---|
| Concentration (solutions) | increases | more particles per unit volume, so more frequent collisions |
| Pressure (gases) | increases | same as concentration: particles closer together |
| Surface area of a solid | increases | more particles exposed, so more frequent collisions at the surface |
| Temperature | increases greatly | more frequent collisions, and a much larger fraction of collisions with energy ≥ Ea |
| Catalyst | increases | alternative pathway with lower Ea, so a larger fraction of particles have enough energy |

## The Boltzmann distribution

In a gas the molecules have a **range** of energies because they constantly exchange energy in collisions. The **Boltzmann distribution** is a graph of the number of molecules with a given energy (y-axis) against energy (x-axis). In words:

- it starts at the **origin** (no molecules have zero energy);
- it rises to a **peak** at the most probable energy, then falls;
- it has a long tail at high energy that **approaches the x-axis but never touches it** (there is no maximum energy);
- the **area under the curve** equals the total number of molecules;
- the activation energy is marked as a vertical line well out in the tail; the area to the right of Ea is the number of molecules able to react.

### Effect of temperature

At a higher temperature the curve is **flatter and broader**, and its peak moves **to the right** (higher most probable energy) and **lower**. The area under the curve is unchanged because the number of molecules is the same. Crucially, the area beyond Ea becomes much larger. A rise of 10 °C near room temperature roughly doubles the rate of many reactions, far more than the small increase in collision frequency could explain; the main reason is the larger proportion of molecules with energy ≥ Ea.

![Maxwell-Boltzmann distribution at two temperatures: both curves start at the origin and have the same area; the higher-temperature curve is lower and broader with its peak to the right, so the area beyond the activation energy Ea (the molecules able to react) is much larger.](media:diagrams/boltzmann-temperature.png "Figure: Boltzmann distributions at T₁ and a higher T₂; the area beyond Ea grows with temperature")

### Effect of a catalyst

A catalyst does **not** change the Boltzmann distribution at a given temperature. It provides a different route with a **lower activation energy**, so the Ea line moves to the left and a larger area of the curve lies beyond it.

![Boltzmann distribution at one temperature with two activation energies: the catalysed Ea line lies to the left of the uncatalysed Ea line, so the area of the curve beyond it, the molecules with enough energy to react, is larger, while the curve itself is unchanged.](media:diagrams/boltzmann-catalyst.png "Figure: a catalyst lowers Ea, so more molecules have enough energy; the distribution itself is unchanged")

:::example{title="Example 2: explaining a temperature change with the Boltzmann distribution"}
Question: explain why the reaction between magnesium and hydrochloric acid is faster at 40 °C than at 20 °C.

1. At 40 °C the particles have more kinetic energy on average, so they collide more frequently.
2. The Boltzmann distribution at 40 °C is shifted to higher energies and flattened, so a greater proportion of particles has energy equal to or greater than Ea.
3. Therefore the frequency of effective (successful) collisions increases, and the rate increases. The second effect is far larger than the first.
:::

## Reaction pathway diagrams

A reaction pathway (energy profile) diagram plots energy against the progress of the reaction. Reactants and products are shown as levels; the curve rises to a peak (the transition state) between them. The activation energy is the height from the reactants to the peak. For an exothermic reaction the products lie below the reactants; ΔH is the difference. With a catalyst the peak is **lower** (often with an intermediate dip between two smaller peaks), but the reactant and product levels, and ΔH, are **unchanged**.

![Energy profile of an exothermic reaction: reactants at a higher energy than products; the catalysed path has a lower peak, so a smaller activation energy, but starts and ends at the same energy levels, so the enthalpy change is unchanged.](media:diagrams/energy-profile-catalyst.png "Figure: a catalyst lowers the activation energy; reactant and product levels, and ΔH, are the same")

## Common mistakes

:::mistake{title="Saying particles collide 'more' or 'harder'"}
Say "more frequent collisions" or "more collisions per second", and "a greater proportion of particles with energy ≥ Ea".
:::

:::mistake{title="Boltzmann curve touching the axis"}
At high energy the curve approaches the axis but never meets it. At higher temperature the peak is lower and further right, and the area is the same.
:::

:::mistake{title="Catalysts and energy distribution"}
A catalyst lowers Ea; it does not give the particles more energy or change the shape of the distribution.
:::

:::mistake{title="Temperature only increases collision frequency"}
The decisive effect of temperature is the larger fraction of molecules with energy above Ea.
:::

## Exam tips

:::exam-tip{title="Which papers"}
ZIMSEC Papers 1-4 (Paper 4: devising a method and processing rate data); Cambridge Papers 1, 2 and 3. Expect a Boltzmann sketch described or labelled, a rate calculation from a graph or table, and explanations using collision theory.
:::

:::exam-tip{title="Command words"}
*Define* activation energy: the minimum energy for an effective collision. *Explain* the effect of temperature: refer to the Boltzmann distribution, the proportion with E ≥ Ea, and the frequency of effective collisions. *Sketch* (here, describe) the distribution: start at the origin, peak, long tail not touching the axis, labelled axes, Ea marked. *Calculate* a rate: give the unit, and say whether it is average or instantaneous. *Suggest* a method: name the measurable property that changes.
:::

## Summary

:::summary
- Rate = change in amount or concentration per unit time; the gradient of a concentration–time graph; 1/time for a clock reaction.
- Collisions must have energy ≥ Ea and the correct orientation to be effective.
- Concentration, pressure and surface area raise collision frequency; temperature mainly raises the proportion of molecules with energy ≥ Ea.
- The Boltzmann distribution starts at the origin, never meets the energy axis, and flattens and shifts right at higher temperature with the same area.
- A catalyst gives an alternative pathway with lower Ea; ΔH and the energy distribution are unchanged.
:::
