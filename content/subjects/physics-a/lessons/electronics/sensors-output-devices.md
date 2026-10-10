---
{
  "key": "electronics.sensors-output-devices",
  "title": "Sensors, signal processing and output devices",
  "summary": "Describe how LDRs, thermistors, strain gauges, piezoelectric transducers and microphones respond to physical changes, use them in potential dividers and with op-amps to give a voltage output, calibrate a sensor, choose and protect output devices (relays, LEDs with series resistors, calibrated meters) and describe an electronic monitoring or control system block by block.",
  "concepts": ["aphys.electronics.sensors-output-devices"],
  "estimatedMinutes": 50,
  "level": "core"
}
---
## Introduction

Every electronic measuring or control system, from a borehole level alarm at a Matabeleland school to a weighbridge for haulage trucks outside Beitbridge, has the same three parts. A **sensor** responds to a physical quantity (light, temperature, force, sound). A **processing** stage, usually a potential divider and an op-amp, turns that response into a useful voltage. An **output device** (a relay, an LED, a meter) acts on or displays the result. This lesson looks at each block.

You should already know potential dividers, resistivity ($R = \rho L/A$), the op-amp comparator and the inverting and non-inverting amplifiers.

## Key definitions

:::definition{term="Sensor"}
A device in which a property, such as resistance or p.d., changes in response to a change in a physical quantity, so that the quantity can be measured or detected electrically.
:::

:::definition{term="Light-dependent resistor (LDR)"}
A semiconductor resistor whose resistance decreases as the intensity of the light falling on it increases.
:::

:::definition{term="NTC thermistor"}
A semiconductor resistor whose resistance decreases (non-linearly) as its temperature increases.
:::

:::definition{term="Strain gauge"}
A thin metal foil or wire track on a flexible backing, fixed to a surface, whose resistance increases when it is stretched and decreases when it is compressed.
:::

:::definition{term="Piezoelectric transducer"}
A crystal, such as quartz, that develops a p.d. across opposite faces when it is compressed or stretched (and changes shape when a p.d. is applied).
:::

:::definition{term="Calibration"}
Recording the output of a sensor system against known values of the measured quantity, so that output readings can be converted into values of that quantity.
:::

:::formula{name="Potential divider output"}
$$
V_{\text{out}} = V_{\text{in}}\,\frac{R_2}{R_1 + R_2}
$$

$V_{\text{out}}$ = p.d. across $R_2$ (V), $V_{\text{in}}$ = supply p.d. (V), $R_1$ and $R_2$ = the two resistances (Ω). Valid when the output draws negligible current, for example into an op-amp.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
This topic is ZIMSEC Form 6 only (scope to be confirmed against the ZIMSEC syllabus). LDRs, thermistors and potential dividers also appear in Cambridge 9702 topic 10, but strain gauges, piezoelectric transducers, relays and calibrated meters as a system do not.
:::

## Sensing devices

| Sensor | Quantity | What changes | Typical use |
|---|---|---|---|
| LDR | light intensity | resistance falls in brighter light (perhaps 1 MΩ in the dark to 100 Ω in sunlight) | dusk switches, light meters |
| NTC thermistor | temperature | resistance falls, non-linearly, as temperature rises | thermometers, overheat alarms |
| Strain gauge | strain (force) | resistance rises with tensile strain | weighing scales, bridge monitoring |
| Piezoelectric crystal | pressure / force | p.d. generated across the crystal | microphones, ultrasound probes, gas lighters |
| Microphone | sound (pressure variations) | small alternating p.d. | sound recording, public address |

**The LDR and the thermistor** are semiconductors: more light, or a higher temperature, frees more charge carriers, so the resistance falls.

**The strain gauge.** The metal track is stretched with the surface it is glued to. It becomes longer and thinner, so by $R = \rho L/A$ its resistance rises. If its volume stays constant, $A = V/L$ and $R = \rho L^2/V$, so for a small strain $\varepsilon = \Delta L/L$, $\Delta R/R \approx 2\varepsilon$. The changes are tiny (a fraction of an ohm), so the gauge is used in a potential divider or bridge whose output is amplified.

**Piezoelectric transducers and microphones.** Squeezing a piezoelectric crystal displaces its positive and negative ions slightly, giving a p.d. of a few millivolts to volts; the same crystal vibrates when an alternating p.d. is applied. A piezoelectric microphone uses this directly. A moving-coil microphone uses induction instead: sound moves a diaphragm and a coil in a magnetic field, inducing an alternating e.m.f. Either way, the output is small and must be amplified.

## From sensor to voltage

A resistive sensor is placed in a **potential divider** with a fixed resistor. Which resistor the output is taken across decides whether $V_{\text{out}}$ rises or falls with the quantity.

:::worked-solution[An LDR divider]
An LDR is connected in series with a $12\ \text{k}\Omega$ resistor across a $6.0\ \text{V}$ supply, with the output taken across the fixed resistor. The LDR's resistance is $1.5\ \text{k}\Omega$ in daylight and $80\ \text{k}\Omega$ in darkness. Find the output in each case.

1. Daylight: $V_{\text{out}} = 6.0 \times \dfrac{12}{12 + 1.5} = 5.33\ \text{V}$.
2. Darkness: $V_{\text{out}} = 6.0 \times \dfrac{12}{12 + 80} = 0.78\ \text{V}$.
3. The output is high in light and low in darkness; swapping the two components reverses this.
:::

The divider output then goes to an op-amp:

- to a **comparator**, which switches at a set level (an alarm or a switch);
- to a **non-inverting amplifier**, whose very high input resistance does not load the divider, to give a larger voltage proportional to the change (a measuring instrument);
- through a **voltage follower** (buffer) to drive a meter without pulling the divider voltage down.

## Calibration

A thermistor thermometer is calibrated by placing the thermistor with an accurate thermometer in a water bath, recording the output voltage at several temperatures, and plotting a **calibration curve** of output voltage against temperature. For a thermistor of resistance $2.2\ \text{k}\Omega$ at $25\ ^\circ\text{C}$, placed at the top of a $5.0\ \text{V}$ divider with a fixed $2.2\ \text{k}\Omega$ resistor at the bottom, the output across the fixed resistor is:

| $\theta\,/\,^\circ\text{C}$ | 0 | 20 | 40 | 60 | 80 | 100 |
|---|---|---|---|---|---|---|
| $R_{\text{th}}\,/\,\text{k}\Omega$ | 6.44 | 2.69 | 1.25 | 0.641 | 0.354 | 0.208 |
| $V_{\text{out}}\,/\,\text{V}$ | 1.27 | 2.25 | 3.18 | 3.87 | 4.31 | 4.57 |

The curve rises steeply at first and flattens at high temperatures, so the thermometer is **most sensitive** (largest change in $V$ per kelvin) at low temperatures. An unknown temperature is read from the curve. Good practice: stir the bath, wait for the readings to settle, take readings while heating and cooling, and include the fixed points (melting ice, boiling water) to check the ends of the range.

## Output devices

**LED with series resistor.** An LED has a nearly fixed p.d. (about 2 V) when lit and is destroyed by too much current, so a resistor limits the current: $R = \dfrac{V_{\text{supply}} - V_{\text{LED}}}{I}$.

:::worked-solution[Choosing an LED resistor]
An op-amp output at $+13\ \text{V}$ must light an LED that takes $20\ \text{mA}$ with $2.1\ \text{V}$ across it. Find the series resistance.

1. p.d. across the resistor: $13 - 2.1 = 10.9\ \text{V}$.
2. $R = \dfrac{10.9}{0.020} = 545\ \Omega$; choose the next standard value up, $560\ \Omega$, which keeps the current just below 20 mA.
:::

**Relay.** An op-amp can supply only about 10-25 mA, too little for a pump motor or a mains lamp. A **relay** uses that small current in a coil to magnetise an iron core, which pulls a switch closed in a separate circuit; this also isolates the electronics from mains voltages. A **diode connected in reverse across the coil** protects the op-amp: when the coil current is switched off, the collapsing flux induces a large e.m.f., and the diode gives the resulting current a safe path. A second diode in series with the coil stops the relay operating when the op-amp output is negative.

**Calibrated analogue meter.** A moving-coil voltmeter connected to the processing stage can have its scale re-marked in the measured quantity (°C, lux, kg) using the calibration curve. Because the response is usually non-linear, the new scale divisions are unevenly spaced.

## A system described block by block

A **water-tank level alarm** for a school borehole: sensor (two probes in the tank, or an LDR and a float that blocks a light beam) → potential divider giving a voltage that changes when the water reaches the probes → comparator with an adjustable reference → relay with a protective diode → pump motor switched off and an LED lit. Describing each block's input, output and job is what examiners reward.

## Common mistakes

:::mistake{title="Saying an LDR's resistance rises with light"}
More light frees more charge carriers, so an LDR's resistance **falls**.
:::

:::mistake{title="Forgetting the LED resistor"}
An LED connected straight across 13 V would draw an enormous current and fail. Always include a series resistor and calculate it.
:::

:::mistake{title="Putting the relay diode the wrong way round"}
The protection diode is reverse-biased in normal use. If it were forward-biased it would short-circuit the coil.
:::

:::mistake{title="Assuming a linear calibration"}
Thermistors and LDRs respond non-linearly; read values from the calibration curve, not by simple proportion.
:::

## Exam tips

:::exam-tip{title="Which papers and how"}
ZIMSEC Paper 1 tests how each sensor responds; Papers 2 and 3 ask you to *describe* a system in blocks, *explain* how a circuit switches (use a chain of cause and effect), *calculate* divider outputs and LED resistors, and *suggest* how to calibrate. For practical planning, name the instrument and its precision (thermometer to 0.5 °C, digital voltmeter to 0.01 V).
:::

## Summary

:::summary
- Sensors: LDR (resistance falls with light), NTC thermistor (falls with temperature), strain gauge (rises with stretching, $\Delta R/R \approx 2\varepsilon$), piezoelectric crystal and microphone (generate a p.d.).
- A potential divider turns a resistance change into a voltage; an op-amp compares it (switch) or amplifies it (measurement).
- Calibration: record the output against known values and read unknowns from the curve.
- LEDs need a series resistor $R = (V_s - V_{\text{LED}})/I$; relays switch large currents and need a reverse diode across the coil.
- Describe a system as sensor → processing → output, saying what each block does.
:::
