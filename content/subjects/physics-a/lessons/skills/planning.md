---
{
  "key": "skills.planning",
  "title": "Planning a physics investigation",
  "summary": "Plan an investigation from a suggested relationship: variables, a workable method and arrangement, measurements and instruments, control variables, analysis by a straight-line graph, safety and additional detail.",
  "concepts": ["aphys.skills.planning"],
  "estimatedMinutes": 35,
  "level": "core"
}
---
## Introduction

A planning question gives you a situation you have probably never met, such as how the flow of water from a borehole tank depends on the height of the tank, or how the sag of a shelf depends on its thickness, and a suggested relationship between two quantities. You are asked to design an experiment to test it. Nobody expects you to have done the experiment; the examiner wants to see that you can turn physics into a sound, safe and measurable procedure.

You should already know how to identify variables, choose instruments and their precision, and linearise a relationship (see the data-analysis lesson). This lesson shows how to organise all of that into a plan that earns the marks.

## Key definitions

:::definition{term="Independent variable"}
The quantity that the experimenter deliberately changes, in regular steps, to see its effect.
:::

:::definition{term="Dependent variable"}
The quantity that is measured for each value of the independent variable.
:::

:::definition{term="Control variable"}
A quantity that could affect the dependent variable and is therefore kept constant, with a stated way of keeping it constant.
:::

:::definition{term="Preliminary experiment"}
A quick trial run used to choose a suitable range and interval for the independent variable and to check that the dependent variable changes by a measurable amount.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Cambridge sets a planning question as Paper 5 question 1 (about 15 marks). ZIMSEC A-Level practical assessment includes planning skills; check the current ZIMSEC paper format with your teacher.
:::

## The six parts of a good plan

Examiners usually award marks in these groups. Use them as headings in your answer.

| Part | What to write |
| --- | --- |
| Defining the problem | Independent variable, dependent variable, and the key control variables (at least two). |
| Method | A numbered, workable procedure; the arrangement described clearly in words (what is clamped to what, where each meter is connected). |
| Measurements | Every quantity, the instrument for each and why it is precise enough; how readings are repeated. |
| Control | How each control variable is kept constant, and how it is checked. |
| Analysis | What to plot, the expected shape, how the constant is found from gradient or intercept. |
| Safety | A specific hazard with a specific precaution, linked to this experiment. |

Additional detail earns extra marks: a preliminary experiment, at least six values of the independent variable, an appropriate range, calibration of a sensor, using a fiducial marker, repeating and averaging, avoiding parallax.

## Choosing instruments

| Quantity | Typical instrument | Resolution |
| --- | --- | --- |
| Length up to 1 m | metre rule | 1 mm |
| Diameter of a wire | micrometer screw gauge | 0.01 mm |
| Internal diameter of a tube | vernier calipers | 0.1 mm (often 0.02 mm) |
| Short time intervals | light gates and timer or data logger | 0.001 s |
| Oscillation period | stop-watch, timing 20 oscillations | 0.01 s on the display |
| Rapidly changing voltage | oscilloscope (time base and Y-gain) or data logger | about one tenth of a division |
| Mass | top-pan balance | 0.1 g or 0.01 g |
| Temperature | thermometer or thermistor/thermocouple with data logger | 1 °C, 0.1 °C |

Say *why* you chose the instrument: "a micrometer, because the diameter is less than 1 mm and a ruler could not measure it to better than 100%". For a period, timing many oscillations reduces the percentage uncertainty from the reaction time.

## Turning the relationship into a graph

The analysis marks are lost most often. Always state the axes, the shape that would confirm the relationship, and the algebra linking the gradient (or intercept) to the constant.

:::worked-solution[Analysis for a power law]
A plan tests whether the terminal velocity $v$ of a steel ball falling in oil depends on its radius $r$ as $v = kr^{\,n}$.

1. Take logarithms: $\lg v = n\lg r + \lg k$.
2. Plot $\lg(v/\text{m s}^{-1})$ on the $y$-axis against $\lg(r/\text{m})$ on the $x$-axis.
3. The relationship is valid if the graph is a straight line.
4. $n$ = gradient; $k = 10^{\,y\text{-intercept}}$.
5. Expected result: for slow falls in a viscous liquid $n \approx 2$, so a gradient close to 2 supports Stokes' law.
:::

:::worked-solution[Analysis when a constant is inside a known formula]
A plan tests whether the time $T$ for a loaded rule to oscillate depends on the mass $m$ at its end as $T^2 = \dfrac{4\pi^2}{k}(m + M)$, where $M$ is a constant.

1. Expand: $T^2 = \dfrac{4\pi^2}{k}m + \dfrac{4\pi^2 M}{k}$.
2. Plot $T^2$ against $m$; a straight line (not through the origin) confirms the relationship.
3. Gradient $= \dfrac{4\pi^2}{k}$, so $k = \dfrac{4\pi^2}{\text{gradient}}$.
4. $y$-intercept $= \dfrac{4\pi^2 M}{k}$, so $M = \dfrac{\text{intercept}}{\text{gradient}}$.
:::

## A model plan in outline

:::example{title="Light-dependent resistor and distance from a lamp"}
Suggested relationship: $R = kd^{\,n}$, where $R$ is the resistance of a light-dependent resistor (LDR) and $d$ its distance from a small lamp.

- **Variables.** Independent: distance $d$ from the filament to the face of the LDR. Dependent: resistance $R$. Controls: the lamp's power (constant p.d. across it, checked with a voltmeter), the room lighting (darkened room), the angle of the LDR (facing the lamp, on the same axis).
- **Arrangement.** The lamp and the LDR stand on a bench with a metre rule clamped along the line between them. The LDR is connected directly to an ohmmeter (or in series with a battery and milliammeter with a voltmeter across it, so $R = V/I$).
- **Method.** Set $d$, read $R$, repeat for at least six distances from about 0.10 m to 0.60 m; repeat each set and average.
- **Measurements.** $d$ with the metre rule (1 mm), using a set square to align the filament and the LDR face; $R$ with the ohmmeter.
- **Analysis.** Plot $\lg(R/\Omega)$ against $\lg(d/\text{m})$: straight line if valid; $n$ = gradient, $k = 10^{\text{intercept}}$.
- **Safety.** The lamp gets hot: allow it to cool before moving it, and do not touch the bulb.
- **Additional detail.** Wait for $R$ to settle after each move; take a background reading with the lamp off; a preliminary experiment to find the range of $d$ over which $R$ changes measurably.
:::

## Sensors, data loggers and oscilloscopes

Electronic sensors are useful when the dependent variable changes too fast to read by eye. A light gate measures the time a card of known width blocks the beam, giving a speed. A data logger records readings from a sensor many times a second. An oscilloscope shows a p.d. against time: the period is the number of horizontal divisions for one cycle multiplied by the time-base setting, and the peak voltage is the number of vertical divisions multiplied by the Y-gain. Mention the setting you would use and how you would read it.

## Common mistakes

:::mistake{title="A list of apparatus instead of a method"}
"Use a ruler, a stop-watch and a mass" earns nothing. Say what is measured, with what, between which two points, and how many times.
:::

:::mistake{title="Vague control variables"}
"Keep everything the same" earns nothing. Name the variable and the method: "keep the temperature of the oil constant by leaving it to reach room temperature and checking with a thermometer".
:::

:::mistake{title="Generic safety"}
"Wear a lab coat" is not linked to the experiment. Link the precaution to a real hazard: "wear safety goggles in case the loaded wire snaps; put a sand tray under the masses".
:::

:::mistake{title="Analysis with no algebra"}
Saying "plot a graph of $v$ against $r$" for a power law is wrong; the graph must be linear in the constants, and you must say how the constant follows.
:::

## Exam tips

:::exam-tip{title="Describe the arrangement in words"}
The question may ask for a labelled diagram. On this platform, and as a check on your own diagram in the exam, describe it: what is clamped where, where each instrument is connected, and which distance is measured between which two points.
:::

:::exam-tip{title="Answer the actual relationship"}
Quote the given equation, linearise it and say what the gradient and intercept equal *in terms of the symbols given*. Then say how you would decide whether the relationship is valid (a straight line, through the origin if expected).
:::

:::exam-tip{title="Detail earns marks"}
Each specific detail (a range of values, a precision, a way of reducing an uncertainty, a check) is often a separate mark. Six independent values, repeated, over a stated range is a standard detail mark.
:::

## Summary

:::summary
- Name the independent, dependent and key control variables, and say how each control is kept constant.
- Give a numbered, workable method with the arrangement described in words and every instrument justified.
- Linearise the relationship: state the axes, the expected shape and how the constant follows from the gradient or intercept.
- Give a specific safety precaution linked to a real hazard in this experiment.
- Add detail: preliminary trial, at least six values, repeats, sensible range, techniques that reduce uncertainty.
:::
