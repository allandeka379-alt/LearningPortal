---
{
  "key": "matter.convection-radiation",
  "title": "Convection and thermal radiation",
  "summary": "Explain natural and forced convection by density changes, describe thermal radiation as electromagnetic (mainly infrared) radiation, compare emission and absorption by surfaces and the ideal black body, use the Stefan-Boltzmann law P = σAT⁴ and the net rate σA(T⁴ − T₀⁴), apply Wien's law qualitatively, and explain solar water heaters, vacuum flasks, greenhouses and heat sinks.",
  "concepts": ["aphys.matter.convection-radiation"],
  "estimatedMinutes": 45,
  "level": "core"
}
---
## Introduction

A solar geyser on a Harare roof heats water with no pump and no electricity: sunlight is absorbed by a black panel, warm water rises into the tank above it, and cooler water sinks to take its place. The same afternoon a sheet of corrugated iron in the sun becomes too hot to touch, and a vacuum flask keeps tea hot for hours. These are examples of the two transfers that complement conduction: **convection**, which needs a fluid that can move, and **thermal radiation**, which needs nothing at all.

You should already know the O-Level description of convection and radiation, density $\rho = m/V$, the electromagnetic spectrum, and how to convert temperatures to kelvin.

## Key definitions

:::definition{term="Convection"}
The transfer of thermal energy through a fluid by the bulk movement of the fluid itself, carrying energy from warmer to cooler regions.
:::

:::definition{term="Natural (free) convection"}
Convection in which the fluid moves because of density differences caused by temperature differences: warmer, less dense fluid rises and cooler, denser fluid sinks.
:::

:::definition{term="Forced convection"}
Convection in which a pump or fan drives the fluid past the hot or cold surface.
:::

:::definition{term="Thermal radiation"}
Electromagnetic radiation emitted by every body because of its temperature, mainly in the infrared at everyday temperatures. It needs no medium and travels at the speed of light.
:::

:::definition{term="Black body"}
An idealised body that absorbs all the electromagnetic radiation that falls on it, at every wavelength. At a given temperature it is also the best possible emitter.
:::

:::formula{name="Stefan-Boltzmann law"}
$$
P = \sigma A T^4
$$

$P$ = total power radiated by a black body (W), $A$ = surface area (m²), $T$ = thermodynamic temperature (K), $\sigma = 5.67 \times 10^{-8}\ \text{W m}^{-2}\ \text{K}^{-4}$ (the Stefan-Boltzmann constant).
:::

:::formula{name="Net radiation to surroundings"}
$$
P_{\text{net}} = \sigma A\left(T^4 - T_0^4\right)
$$

A black body at $T$ in surroundings at $T_0$ emits $\sigma AT^4$ and absorbs $\sigma AT_0^4$.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Convection and thermal radiation are ZIMSEC Form 6 (scope to be confirmed against the syllabus). Cambridge 9702 uses the Stefan-Boltzmann law and Wien's law only for stars, in the astronomy topic.
:::

## Convection

When part of a fluid is heated, it expands, so its density falls. Denser surrounding fluid sinks under gravity and pushes the warmer fluid upwards (an upthrust larger than its weight). A circulating **convection current** forms, carrying energy around the fluid. Convection cannot happen in a solid, whose particles cannot flow, and natural convection needs gravity.

- In a **solar water heater (thermosiphon)**, water warmed in the collector panel rises up to a storage tank placed above the panel, while cold water from the bottom of the tank sinks back to the panel. The tank must be higher than the collector.
- **Sea and land breezes**: by day the land warms faster than the sea, air above it rises, and cooler air flows in from the sea.
- A **car radiator** with its fan and water pump, and the **fan on a computer heat sink**, use forced convection: moving the fluid quickly past the hot surface keeps a large temperature difference and greatly increases the rate of transfer.
- Trapping air in small pockets (wool, polystyrene, ceiling insulation) stops convection, leaving only the poor conduction of air.

## Thermal radiation

All bodies above absolute zero emit electromagnetic radiation. The rate of emission and its spectrum depend on the temperature and on the surface.

**Surfaces.** Dull black surfaces are good absorbers and good emitters; shiny, light-coloured surfaces are poor absorbers (good reflectors) and poor emitters. A good absorber at a given wavelength is always a good emitter at that wavelength. A black body is the ideal case of both.

**Wien's displacement law (qualitative).** A black body emits a continuous spectrum with a peak. The hotter the body, the shorter the wavelength at the peak: a stove plate at a few hundred °C emits only infrared; at about 800 °C it glows dull red; a lamp filament at about 2800 K glows white-yellow but still emits most of its power as infrared. The peak wavelength is inversely proportional to the thermodynamic temperature.

**Stefan-Boltzmann law.** The total power from a black body is proportional to its surface area and to the fourth power of its kelvin temperature. Doubling $T$ multiplies the power by $2^4 = 16$. A real surface radiates less than a black body at the same temperature.

:::worked-solution[Net radiation from a solar collector plate]
A black collector plate of area $1.5\ \text{m}^2$ (one side) is at $340\ \text{K}$; its surroundings are at $300\ \text{K}$. Treat it as a black body radiating from one side. Find the power emitted, the power absorbed from the surroundings and the net loss.

1. Emitted: $P = \sigma AT^4 = 5.67 \times 10^{-8} \times 1.5 \times 340^4 = 1.14 \times 10^{3}\ \text{W}$.
2. Absorbed from the surroundings: $\sigma AT_0^4 = 5.67 \times 10^{-8} \times 1.5 \times 300^4 = 689\ \text{W}$.
3. Net loss: $1137 - 689 = 448\ \text{W}$. Glass cover sheets in a real panel reduce this loss.
:::

:::worked-solution[Radiating area of a lamp filament]
A filament lamp radiates $60\ \text{W}$ at a filament temperature of $2800\ \text{K}$. Treating the filament as a black body and ignoring absorption from the room, estimate its surface area.

1. $A = \dfrac{P}{\sigma T^4} = \dfrac{60}{5.67 \times 10^{-8} \times 2800^4}$.
2. $2800^4 = 6.15 \times 10^{13}\ \text{K}^4$, so $A = \dfrac{60}{3.49 \times 10^{6}} = 1.7 \times 10^{-5}\ \text{m}^2$ (about $17\ \text{mm}^2$).
3. The room-temperature term $\sigma AT_0^4$ is negligible here because $300^4$ is about 7600 times smaller than $2800^4$.
:::

## Applications

- **Solar water heater.** Matt black collector (good absorber); glass cover that lets short-wavelength sunlight in but blocks much of the long-wavelength infrared emitted by the warm plate, and also stops convection losses; insulated back and tank; convection carries hot water to the tank.
- **Vacuum flask.** The vacuum between double walls stops conduction and convection; silvered walls reflect infrared back and are poor emitters; a stopper of poor conductor reduces losses from the top. Only slow radiation and conduction through the neck and stopper remain.
- **Greenhouse.** Glass transmits visible and near-infrared sunlight; the soil and plants absorb it and re-emit long-wavelength infrared, much of which the glass absorbs. The closed glasshouse also stops warm air leaving by convection.
- **Cooling of electronic components.** Heat sinks are made of good conductors (aluminium), with many thin fins for a large surface area, are often painted matt black, and are mounted with fins vertical so air can rise freely between them; a fan adds forced convection.

## Common mistakes

:::mistake{title="Saying heat rises"}
Warm fluid rises because it is less dense than the fluid around it; energy itself does not "rise".
:::

:::mistake{title="Using degrees Celsius in σAT⁴"}
The law needs the thermodynamic temperature in kelvin. $(27\ ^\circ\text{C})^4$ is meaningless.
:::

:::mistake{title="Forgetting absorption from the surroundings"}
A body at $T$ in surroundings at $T_0$ loses energy at the net rate $\sigma A(T^4 - T_0^4)$, not $\sigma AT^4$.
:::

:::mistake{title="Thinking radiation needs a medium"}
Radiation crosses a vacuum; that is how energy reaches us from the Sun and why a vacuum flask still loses a little energy.
:::

## Exam tips

:::exam-tip{title="Explain a device"}
Name each transfer the design reduces (or uses) and say which feature does it: "vacuum: no conduction or convection; silvering: reflects infrared."
:::

:::exam-tip{title="Fourth-power ratios"}
For *calculate the ratio of powers*, write $\dfrac{P_2}{P_1} = \dfrac{A_2}{A_1}\left(\dfrac{T_2}{T_1}\right)^4$ in kelvin before substituting.
:::

:::exam-tip{title="Which papers"}
Expect applications in ZIMSEC Paper 1, Stefan-Boltzmann calculations in Papers 2 and 3. (Cambridge candidates meet $L = 4\pi r^2\sigma T^4$ for stars in Paper 4.)
:::

## Summary

:::summary
- Convection: bulk movement of a fluid caused by density differences (natural) or by a pump or fan (forced).
- Thermal radiation is electromagnetic, mainly infrared, emitted by all bodies; it needs no medium.
- Matt black surfaces absorb and emit well; shiny surfaces reflect well and emit poorly; a black body is the ideal absorber and emitter.
- Stefan-Boltzmann: $P = \sigma AT^4$, net $\sigma A(T^4 - T_0^4)$, with $T$ in kelvin.
- Wien: hotter bodies have their peak emission at shorter wavelengths.
:::
