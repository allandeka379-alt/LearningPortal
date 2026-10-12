---
{
  "key": "measurement.instruments",
  "title": "Measuring instruments, light gates and the oscilloscope",
  "summary": "Choose an instrument with suitable range and precision, read vernier calipers and micrometers (with zero errors), use light gates for speed and acceleration, and measure p.d., time and frequency on a cathode-ray oscilloscope.",
  "concepts": ["aphys.measurement.instruments"],
  "estimatedMinutes": 40,
  "level": "core"
}
---
## Introduction

Every practical result starts with an instrument reading, and the instrument sets the limit on what the result can mean. A metre rule can tell you the length of a pendulum but not the diameter of a guitar string; a stop-watch can time a pendulum swing but not a falling ball over $20\ \text{cm}$. Choosing the right instrument, reading it correctly and knowing its precision are tested on every A-Level practical paper.

This lesson covers the instruments named by both syllabuses, the light gates and data loggers that replace hand timing, and the cathode-ray oscilloscope (CRO), which turns a changing voltage into a picture you can measure. You should know the meaning of precision and zero error from the lesson on errors.

## Key definitions

:::definition{term="Resolution (of an instrument)"}
The smallest change in a quantity that the instrument can show, such as $1\ \text{mm}$ for a metre rule or $0.01\ \text{mm}$ for a micrometer.
:::

:::definition{term="Range (of an instrument)"}
The interval between the smallest and largest values the instrument can measure.
:::

:::definition{term="Calibration curve"}
A graph of an instrument's output (or a sensor's reading) against known values of the quantity, used to convert later readings into values of that quantity.
:::

:::formula{name="Oscilloscope readings"}
$$
V = (\text{number of vertical divisions}) \times (\text{y-gain}) \qquad t = (\text{number of horizontal divisions}) \times (\text{time-base}) \qquad f = \frac{1}{T}
$$

y-gain in volts per division ($\text{V div}^{-1}$); time-base in seconds (or ms) per division; $T$ is the period, the time for one complete cycle.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards expect the use of the instruments listed below and of the CRO for p.d., time and frequency. Light gates and data loggers appear in both as alternatives to hand timing.
:::

## Choosing an instrument

| Instrument | Typical resolution | Use it for |
| --- | --- | --- |
| metre rule | 1 mm | lengths from about 10 cm to 1 m |
| vernier calipers | 0.1 mm (digital: 0.01 mm) | diameters of rods and tubes, internal diameters |
| micrometer screw gauge | 0.01 mm | wire diameters, thin sheets, small spheres |
| top-pan balance | 0.01 g or 0.1 g | masses |
| newton meter | 0.1 N or 0.05 N | forces up to 10 N or 20 N |
| stop-watch | 0.01 s displayed (reaction time about 0.2 s) | times longer than a few seconds; many oscillations |
| protractor | 1° | angles |
| thermometer | 1 °C (or 0.5 °C) | temperatures |
| digital meters | last digit | currents and p.d.s; choose the range that gives the most digits |

A good choice gives a **small percentage uncertainty**. A $0.40\ \text{mm}$ wire measured with a metre rule would have an uncertainty of $1\ \text{mm}$, more than the reading itself; with a micrometer, $0.01\ \text{mm}$ is $2.5\,\%$.

## Vernier calipers and the micrometer

**Vernier calipers.** Read the main scale at the vernier's zero mark (whole millimetres), then find the vernier line that lines up exactly with a main-scale line; its number gives the tenths of a millimetre.

**Micrometer.** Read the sleeve (whole and half millimetres visible), then add the thimble reading in hundredths of a millimetre. Turn the ratchet, not the thimble, so the jaws close with the same small force every time.

:::worked-solution[Reading a micrometer with a zero error]
With its jaws closed, Rudo's micrometer reads $-0.02\ \text{mm}$ (the thimble zero is two divisions **below** the line). With a ball bearing in the jaws, the sleeve shows $5.5\ \text{mm}$ and the thimble line is at 28.

1. Sleeve: $5.5\ \text{mm}$; thimble: $28 \times 0.01 = 0.28\ \text{mm}$.
2. Reading $= 5.5 + 0.28 = 5.78\ \text{mm}$.
3. Correct the zero error: true diameter $=$ reading $-$ zero error $= 5.78 - (-0.02) = 5.80\ \text{mm}$.
:::

## Timing: stop-watches, light gates and data loggers

Hand timing includes a reaction time at the start and at the end. Time **many** cycles (20 oscillations) or long intervals so that this uncertainty is a small percentage, and use a fiducial (reference) mark at the centre of the swing, where the bob moves fastest, to judge each pass.

A **light gate** times how long a card of known length $l$ blocks a light beam; the speed is $v = l/t$. Two gates (or one gate and a double card) give two speeds and the time between them, so the acceleration is

$$
a = \frac{v_2 - v_1}{\Delta t}
$$

A **data logger** records readings from sensors (light gates, motion sensors, temperature probes) many times a second and plots them directly. It removes reaction time and can capture events far too fast to read by eye.

## The cathode-ray oscilloscope

The CRO plots p.d. (vertical) against time (horizontal). The **y-gain** sets how many volts each vertical division represents; the **time-base** sets how much time each horizontal division represents. With the time-base switched off, an alternating p.d. appears as a vertical line whose length is the peak-to-peak voltage.

:::worked-solution[Measuring an alternating p.d. on a CRO]
A sinusoidal trace has a peak-to-peak height of $4.6$ divisions with the y-gain at $2.0\ \text{V div}^{-1}$. One complete cycle spans $3.2$ divisions with the time-base at $0.50\ \text{ms div}^{-1}$.

1. Peak-to-peak p.d. $= 4.6 \times 2.0 = 9.2\ \text{V}$, so the amplitude (peak p.d.) $= 4.6\ \text{V}$.
2. Period $T = 3.2 \times 0.50 = 1.6\ \text{ms}$.
3. Frequency $f = \dfrac{1}{T} = \dfrac{1}{1.6 \times 10^{-3}} = 625\ \text{Hz}$, about $630\ \text{Hz}$ to two significant figures.
:::

Use as many divisions as possible: measure across several cycles and divide, and adjust the y-gain so the trace fills most of the screen. A reading to the nearest $0.2$ division on a trace 3 divisions high is a $7\,\%$ uncertainty; on a trace 6 divisions high it is about $3\,\%$.

A CRO also measures a **time interval** between two pulses, for example an ultrasound pulse and its echo: count the divisions between them and multiply by the time-base setting.

## Calibration curves

Some sensors do not read the quantity directly. A thermistor's resistance, a thermocouple's voltage or a light-dependent resistor's resistance is first measured at known values (melting ice, boiling water, a standard thermometer), and a graph of sensor reading against the known quantity is drawn. Later readings are converted using the graph. A calibration curve is needed whenever the sensor's response is non-linear.

![Calibration curve for an NTC thermistor (illustrative values): resistance plotted against temperature measured with a standard thermometer falls in a curve from about 33 kΩ at 0 °C to under 1 kΩ at 100 °C; a later resistance reading is converted to a temperature by reading across to the curve and down to the axis.](media:diagrams/thermistor-calibration-curve.png "Figure: a calibration curve converts a sensor reading into a value of the quantity")

## Common mistakes

:::mistake{title="Adding a negative zero error"}
True value $=$ reading $-$ zero error. If the zero error is $-0.02\ \text{mm}$, the correction **adds** $0.02\ \text{mm}$.
:::

:::mistake{title="Peak and peak-to-peak confused"}
The full height of a sine wave on the CRO is the peak-to-peak value; the amplitude (peak value) is half of it.
:::

:::mistake{title="Timing one oscillation"}
A single swing timed by hand has an uncertainty of about $0.2\ \text{s}$ in about $1.5\ \text{s}$, over $10\,\%$. Time 20 swings.
:::

:::mistake{title="Forgetting the time-base unit"}
A time-base of $0.50\ \text{ms div}^{-1}$ gives times in milliseconds; convert to seconds before calculating a frequency.
:::

## Exam tips

:::exam-tip{title="Where it is tested"}
Cambridge Paper 1 has CRO and instrument-reading questions; Papers 3 and 5 expect you to choose and name suitable instruments and to record readings to their resolution. ZIMSEC Paper 1 and the practical paper test the same skills.
:::

:::exam-tip{title="Naming instruments in a plan"}
Say what each instrument measures and why it suits the size of the quantity: "a micrometer screw gauge to measure the diameter of the wire, because it is less than 1 mm".
:::

## Summary

:::summary
- Choose an instrument whose resolution is small compared with the quantity measured; record readings to its resolution.
- Vernier calipers read to 0.1 mm; a micrometer to 0.01 mm; correct zero errors by subtracting them (adding a negative one).
- Light gates give $v = l/t$; two speeds and the time between them give the acceleration.
- On a CRO, divisions × y-gain gives p.d.; divisions × time-base gives time; $f = 1/T$.
- Calibration curves convert a sensor's reading into the quantity it is used to measure.
:::
