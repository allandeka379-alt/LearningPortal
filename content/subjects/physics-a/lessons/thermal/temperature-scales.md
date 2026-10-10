---
{
  "key": "thermal.temperature-scales",
  "title": "Thermal equilibrium and temperature scales",
  "summary": "Explain thermal equilibrium and the direction of thermal energy flow, describe thermometric properties and how a scale is built from fixed points, use the thermodynamic (kelvin) scale and absolute zero with T/K = θ/°C + 273.15, and compare liquid-in-glass, resistance and thermocouple thermometers.",
  "concepts": ["aphys.thermal.temperature-scales"],
  "estimatedMinutes": 40,
  "level": "core"
}
---
## Introduction

A nurse at Parirenyatwa Hospital reads a patient's temperature with a digital probe; an engineer at a Hwange power station watches thermocouple readings from a boiler at several hundred degrees; a farmer checks a liquid-in-glass thermometer in a tobacco barn. All three trust that "temperature" means the same thing on each instrument. This lesson explains what temperature actually is, why different thermometers can disagree, and why physicists define one scale, the **thermodynamic scale**, that does not depend on any particular substance.

You should already know the Celsius scale, that thermal energy flows from hot to cold, and the idea of a physical property that changes with temperature (expansion, resistance).

## Key definitions

:::definition{term="Temperature"}
A measure of how hot a body is: it determines the direction of net flow of thermal energy between two bodies in thermal contact, which is always from the body at the higher temperature to the body at the lower temperature.
:::

:::definition{term="Thermal equilibrium"}
The state of two or more bodies in thermal contact when there is no net flow of thermal energy between them; bodies in thermal equilibrium are at the same temperature.
:::

:::definition{term="Thermometric property"}
A physical property that changes continuously and reproducibly with temperature, such as the length of a liquid column, the volume of a gas at constant pressure, the resistance of a metal or the e.m.f. of a thermocouple.
:::

:::definition{term="Absolute zero"}
The lowest possible temperature, $0\ \text{K}$ ($-273.15\ ^\circ\text{C}$), at which a system has its minimum internal energy; on the kinetic model the random motion of molecules is a minimum.
:::

:::formula{name="Kelvin and Celsius"}
$$
T/\text{K} = \theta/^\circ\text{C} + 273.15
$$

A temperature **difference** has the same size in kelvin and in degrees Celsius: a rise of $1\ \text{K}$ equals a rise of $1\ ^\circ\text{C}$.
:::

:::formula{name="Scale from two fixed points"}
$$
\theta = \frac{X_\theta - X_0}{X_{100} - X_0} \times 100\ ^\circ\text{C}
$$

$X$ = value of the thermometric property: $X_0$ at the ice point, $X_{100}$ at the steam point, $X_\theta$ at the unknown temperature.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards: ZIMSEC Form 6 and Cambridge A Level only (14.1, Paper 4). Use 273.15 for conversions; many questions accept 273.
:::

## Thermal equilibrium and the zeroth law

When a hot cup of tea stands on a table, energy flows from the tea to the cooler room until both are at the same temperature. Then no net energy flows: they are in thermal equilibrium. Energy still passes both ways at the molecular level, but the two flows are equal.

If body A is in thermal equilibrium with a thermometer, and body B is also in equilibrium with the same thermometer, then A and B are in thermal equilibrium with each other. This principle (sometimes called the zeroth law of thermodynamics) is what makes thermometers useful: a thermometer reads its own temperature, which equals the temperature of whatever it is in equilibrium with.

## Building an empirical scale

To make a scale from a thermometric property $X$:

1. Choose two **fixed points**, easily reproduced temperatures: the ice point (pure ice melting at standard pressure, $0\ ^\circ\text{C}$) and the steam point (pure water boiling at standard pressure, $100\ ^\circ\text{C}$).
2. Measure $X_0$ and $X_{100}$ there.
3. **Assume** $X$ varies linearly with temperature between them, and divide the interval into 100 equal degrees.

:::worked-solution[Calibrating a liquid-in-glass thermometer]
An unmarked thermometer has a liquid thread $25.0\ \text{mm}$ long in melting ice and $185.0\ \text{mm}$ long in steam at standard pressure. In warm water the thread is $97.8\ \text{mm}$ long. Find the temperature on this thermometer's scale.

1. $\theta = \dfrac{X_\theta - X_0}{X_{100} - X_0} \times 100 = \dfrac{97.8 - 25.0}{185.0 - 25.0} \times 100$.
2. $\theta = \dfrac{72.8}{160.0} \times 100 = 45.5\ ^\circ\text{C}$.
:::

## Why different thermometers disagree

Every thermometer agrees at the fixed points, because that is how it was calibrated. Between them, each assumes its own property is linear in temperature, but different properties vary in slightly different, non-linear ways. So a resistance thermometer and a liquid-in-glass thermometer, both calibrated at 0 °C and 100 °C, can give different readings for the same water at 50 °C.

:::worked-solution[A platinum resistance thermometer between the fixed points]
A platinum resistor has $R = R_0(1 + A\theta + B\theta^2)$ with $R_0 = 100.00\ \Omega$, $A = 3.9083 \times 10^{-3}\ ^\circ\text{C}^{-1}$ and $B = -5.775 \times 10^{-7}\ ^\circ\text{C}^{-2}$, where $\theta$ is the true temperature. It is used as a linear thermometer calibrated at $0$ and $100\ ^\circ\text{C}$. What does it read at a true $50\ ^\circ\text{C}$?

1. At the fixed points: $R_0 = 100.00\ \Omega$; $R_{100} = 100(1 + 0.39083 - 0.005775) = 138.51\ \Omega$.
2. At $50\ ^\circ\text{C}$: $R = 100(1 + 0.195415 - 0.001444) = 119.40\ \Omega$.
3. Linear scale: $\theta_R = \dfrac{119.40 - 100.00}{138.51 - 100.00} \times 100 = 50.37\ ^\circ\text{C}$.
4. The thermometer reads about $0.4\ ^\circ\text{C}$ high at mid-range, even though it is exact at both fixed points.
:::

## The thermodynamic (kelvin) scale

To avoid this dependence on a substance, the SI uses the **thermodynamic scale**. It is defined theoretically, not by the behaviour of any particular material, and it has:

- an **absolute zero**, $0\ \text{K}$, the temperature at which a system has minimum internal energy;
- one fixed point, the **triple point of water** (where ice, liquid water and water vapour coexist in equilibrium), at exactly $273.16\ \text{K}$ ($0.01\ ^\circ\text{C}$).

The size of the kelvin was chosen so that one kelvin equals one Celsius degree. An ideal-gas thermometer (constant-volume or constant-pressure) agrees with the thermodynamic scale, which is why gas thermometers are used to calibrate others.

| Temperature | $\theta\,/\,^\circ\text{C}$ | $T\,/\,\text{K}$ |
|---|---|---|
| Absolute zero | −273.15 | 0 |
| Ice point | 0 | 273.15 |
| Triple point of water | 0.01 | 273.16 |
| Human body (typical) | 37 | 310 |
| Steam point | 100 | 373.15 |

## Comparing practical thermometers

| Feature | Liquid-in-glass | Resistance (platinum, or thermistor) | Thermocouple |
|---|---|---|---|
| Thermometric property | length of a liquid thread | electrical resistance | e.m.f. between two junctions of different metals |
| Range | limited (e.g. −39 to 350 °C for mercury, lower for alcohol) | wide for platinum (about −200 to 800 °C); narrow for a thermistor | very wide (to over 1500 °C for some pairs) |
| Sensitivity | moderate | high (thermistors very high over a narrow range) | low e.m.f. (microvolts per kelvin) but easily amplified |
| Response time | slow (large heat capacity) | moderate (thermistors can be small and fast) | very fast (tiny junction, small heat capacity) |
| Remote or automatic reading | no | yes | yes |
| Linearity | close to linear | nearly linear (platinum); very non-linear (thermistor) | non-linear; needs calibration |

A **thermocouple** consists of two wires of different metals joined at two junctions; when the junctions are at different temperatures an e.m.f. is produced. Its small junction makes it ideal for measuring a rapidly changing temperature or the temperature at a point, such as a furnace or an engine exhaust.

## Common mistakes

:::mistake{title="Adding 273 to a temperature difference"}
A change of $25\ ^\circ\text{C}$ is a change of $25\ \text{K}$, not $298\ \text{K}$.
:::

:::mistake{title="Saying thermal equilibrium means no energy transfer at all"}
Energy is still exchanged; the **net** flow is zero because the flows in each direction are equal.
:::

:::mistake{title="Assuming all thermometers agree everywhere"}
Empirical scales agree only at their fixed points; between them the readings depend on how linear the property is.
:::

:::mistake{title="Writing degrees kelvin"}
The unit is the kelvin, symbol K, with no degree sign.
:::

## Exam tips

:::exam-tip{title="State and explain"}
For *state what is meant by thermal equilibrium*, say "no net transfer of thermal energy" and "same temperature". For *explain why two thermometers disagree*, say that each property varies non-linearly in its own way, so the scales coincide only at the fixed points.
:::

:::exam-tip{title="Choosing a thermometer"}
When asked to *suggest* a thermometer, match the feature to the need: fast response or a small object → thermocouple; very high temperature → thermocouple; high precision over a moderate range → platinum resistance; remote reading → electrical type.
:::

:::exam-tip{title="Which papers"}
Cambridge Paper 4 and ZIMSEC Papers 1-2 test definitions and conversions; the calibration calculation appears as a short structured part.
:::

## Summary

:::summary
- Thermal energy flows from higher to lower temperature; in thermal equilibrium there is no net flow and temperatures are equal.
- An empirical scale uses a thermometric property and two fixed points, assuming linearity between them.
- Different thermometers agree only at the fixed points.
- The thermodynamic scale does not depend on any substance; $0\ \text{K}$ is absolute zero; $T/\text{K} = \theta/^\circ\text{C} + 273.15$.
- Thermocouples: wide range, fast response, remote reading; platinum resistance: precise; liquid-in-glass: simple, slow, direct reading.
:::
