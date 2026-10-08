---
{
  "key": "practical.experimental-skills",
  "title": "Experimental skills and investigations",
  "summary": "Plan fair investigations with independent, dependent and control variables; choose apparatus and take precise readings; record results in tables; plot graphs and find gradients; and evaluate methods, errors and precautions.",
  "concepts": ["phys.practical.experimental-skills"],
  "objectives": ["cambridge/igcse/physics:practical.1", "cambridge/igcse/physics:practical.2", "cambridge/igcse/physics:practical.3", "cambridge/igcse/physics:practical.4", "cambridge/igcse/physics:practical.5", "cambridge/igcse/physics:practical.6", "zimsec/o-level/physics:practical.1", "zimsec/o-level/physics:practical.2", "zimsec/o-level/physics:practical.3"],
  "estimatedMinutes": 40,
  "freePreview": true
}
---
## Introduction

Physics is an experimental science: every law in this course was first found by careful measurement. Both ZIMSEC and Cambridge assess practical skills, in practical examinations and in written questions about experiments. The same habits earn the marks every time: a fair plan, careful readings, clear tables, accurate graphs and an honest evaluation.

## Key definitions

:::definition{term="Independent variable"}
The quantity you deliberately change in an experiment.
:::

:::definition{term="Dependent variable"}
The quantity you measure, which changes as a result.
:::

:::definition{term="Control variables"}
The quantities you keep the same, so that only the independent variable affects the results (a fair test).
:::

:::definition{term="Anomalous result"}
A reading that does not fit the pattern of the others, usually because of a mistake; it should be checked and repeated, or left out of averages.
:::

## Planning an investigation

1. State the **question** or **hypothesis**, for example: "The period of a pendulum increases as its length increases."
2. Identify the **variables**: independent (length), dependent (period), control (mass of the bob, size of the swing, same pendulum).
3. Choose the **range** and **number** of values: at least five or six different values spread over a sensible range.
4. Choose **apparatus** and describe **how** to measure each quantity.
5. Plan **repeats** and state **safety precautions**.

## Choosing apparatus and taking readings

| Instrument | Typical smallest division (precision) | Good practice |
| --- | --- | --- |
| metre rule | 1 mm | read at eye level to avoid parallax; measure from the zero mark, not the worn end |
| vernier calipers | 0.1 mm | check the zero reading first |
| micrometer screw gauge | 0.01 mm | use the ratchet; check for zero error |
| stopwatch | 0.01 s | human reaction time (about 0.2 s) is far larger, so time many oscillations |
| thermometer | 1 °C (or 0.5 °C) | stir the liquid; wait for a steady reading; read at eye level |
| measuring cylinder | 1 cm³ | read the bottom of the meniscus at eye level |
| ammeter, voltmeter | depends on range | check the zero; use a range that gives a large reading |

Record readings to the precision of the instrument: a length measured with a metre rule is written as $0.452\ \text{m}$ or $45.2\ \text{cm}$, not $45\ \text{cm}$.

:::worked-solution[Timing many oscillations]
A learner times 20 complete oscillations of a pendulum as 28.4 s.

1. Period $T = \dfrac{28.4}{20} = 1.42\ \text{s}$.
2. Timing 20 swings spreads the reaction-time error (about 0.2 s) over the whole time, so the error in $T$ is only about $\dfrac{0.2}{20} = 0.01\ \text{s}$.
:::

## Recording results

- Draw a **table** with the independent variable in the first column and the dependent variable (and repeats and means) in the next.
- Give every column a **heading with its unit**, written as quantity / unit, for example **length / m** or **time / s**. The unit goes in the heading, not after every number.
- Record every value to the **same number of decimal places**, matching the precision of the instrument.
- Calculate **means** of repeated readings, leaving out any anomalous values.

## Plotting graphs

- Plot the **independent** variable on the $x$-axis and the **dependent** variable on the $y$-axis.
- Label each axis with the quantity and unit.
- Choose a **sensible scale** (multiples of 1, 2 or 5 per square) so that the points fill at least half the grid in each direction.
- Plot points accurately as small crosses.
- Draw a single, smooth **line of best fit** (straight or curved) with roughly equal numbers of points either side; do not join the dots.

### Gradients and intercepts

For a straight line, find the gradient using a **large triangle** (at least half the length of the line):

$$
\text{gradient} = \frac{\Delta y}{\Delta x}
$$

:::worked-solution[Finding a spring constant from a graph]
A graph of load (y-axis, in N) against extension (x-axis, in m) is a straight line through the origin. A large triangle on the line goes from $(0, 0)$ to $(0.080\ \text{m}, 6.0\ \text{N})$.

1. Gradient $= \dfrac{6.0 - 0}{0.080 - 0} = 75\ \text{N/m}$.
2. For this graph, the gradient is the spring constant: $k = 75\ \text{N/m}$.
3. The line passes through the origin, so load is **directly proportional** to extension.
:::

The **intercept** is where the line crosses an axis. A straight line through the origin shows that $y$ is **directly proportional** to $x$; a straight line that does not pass through the origin shows a linear relationship but not proportionality.

## Interpreting and evaluating

- **Conclusion**: describe the pattern ("as the length increases, the period increases") and, if the graph is a straight line through the origin, say that one quantity is proportional to the other.
- **Anomalous results**: identify points far from the best-fit line; suggest a cause and repeat them.
- **Errors**:
  - **random errors** (such as reaction time or reading a scale) make readings scatter; they are reduced by repeating and averaging and by measuring larger quantities;
  - **systematic errors** (such as a zero error or always reading at an angle) shift every reading the same way; repeating does not remove them, but correcting the instrument or the method does.
- **Improvements**: suggest specific changes, such as "use a light gate and data logger instead of a stopwatch", "use a fiducial marker at the centre of the swing", "use a wider range of lengths".

## Safety

Every practical needs suitable precautions: protect eyes when springs or wires are stretched, place a tray under hanging loads, keep water away from mains equipment, switch off circuits between readings so that wires do not overheat, and handle hot apparatus with tongs or heat-proof gloves.

## Common mistakes

:::mistake{title="Units after every number"}
Units belong in the column heading (length / cm), not after each value in the table.
:::

:::mistake{title="Small triangles for gradients"}
Using a small triangle, or two data points instead of the best-fit line, makes the gradient less accurate. Use a large triangle on the line.
:::

## Exam tips

:::exam-tip
"Suggest one way to make the experiment more accurate" needs a specific change and its reason, such as "time 20 oscillations instead of one, to reduce the effect of reaction time".
:::

:::exam-tip
When asked for control variables, name quantities that could actually change in that experiment, not general things like "the same apparatus".
:::

## Summary

:::summary
- Change one independent variable, measure the dependent variable and keep control variables constant.
- Choose instruments with suitable precision, avoid parallax and zero errors, and repeat readings.
- Record results in tables with headings in the form quantity / unit, at consistent precision.
- Plot the independent variable on the x-axis, draw a best-fit line and find gradients with a large triangle.
- Evaluate by identifying anomalies and errors (random and systematic) and suggesting specific improvements and safety precautions.
:::
