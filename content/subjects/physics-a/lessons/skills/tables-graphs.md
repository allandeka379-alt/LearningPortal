---
{
  "key": "skills.tables-graphs",
  "title": "Recording results, tables and graphs in practical physics",
  "summary": "Collect a sensible range of repeated readings, record them in a quantity/unit table with consistent precision, plot a graph, draw the best-fit line and use its gradient and intercept to find a physical constant.",
  "concepts": ["aphys.skills.tables-graphs"],
  "estimatedMinutes": 40,
  "freePreview": true,
  "level": "core"
}
---
## Introduction

A physics practical examination is not marked on whether your apparatus behaves perfectly. It is marked on how you **collect, record and process** readings: the range you choose, the way you lay out a table, the precision you write numbers to, the graph you plot and what you extract from it. These marks are among the most reliable on the paper, because the rules are the same every year.

This lesson covers those rules for both boards: the experiment-and-graph question of Cambridge Paper 3 and the practical work assessed by ZIMSEC (Paper 4 style). A student in a Gweru school timing a pendulum with a stop-watch and a student in Harare using a data logger follow exactly the same conventions.

You should already know how to rearrange equations and the meaning of gradient and intercept for $y = mx + c$. The companion lesson on uncertainties, limitations and improvements covers the second practical question.

## Key definitions

:::definition{term="Raw data"}
Readings taken directly from an instrument (a length from a rule, a time from a stop-watch), recorded to the resolution of that instrument.
:::

:::definition{term="Calculated (derived) quantity"}
A value worked out from raw data, such as a mean, a period from the time for 20 oscillations, or $T^2$. It is recorded to the same number of significant figures as the least precise raw data used, or one more.
:::

:::definition{term="Best-fit line"}
A single straight line (or smooth curve) drawn so that the plotted points are balanced on either side of it along its whole length. It need not pass through any particular point, including the origin.
:::

:::formula{name="Straight-line graph"}
$$
y = mx + c
$$

$y$ is the quantity on the vertical axis, $x$ the quantity on the horizontal axis, $m$ the gradient (unit: unit of $y$ divided by unit of $x$) and $c$ the $y$-intercept, the value of $y$ where $x = 0$ (unit: unit of $y$).
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards expect the same table, graph and gradient skills. Cambridge tests them in Paper 3 (question 1) and assumes them in Paper 5; for ZIMSEC they appear in the practical paper and in continuous assessment.
:::

## Collecting readings

- **Range**: use as much of the possible range as the apparatus allows. Masses from $0.100\ \text{kg}$ to $0.600\ \text{kg}$ are far better than $0.200\ \text{kg}$ to $0.300\ \text{kg}$.
- **Number**: at least six sets of readings for a straight-line graph, roughly evenly spread.
- **Repeats**: repeat each reading (at least twice) and record **every** value as well as the mean. If two repeats disagree widely, take a third.
- **Small quantities**: time many oscillations (10 or 20) rather than one, and measure across several fringes or turns rather than one. The uncertainty of a stop-watch reading (reaction time, about $0.2\ \text{s}$ to $0.3\ \text{s}$) is then shared out over many cycles.

## Results tables

Every column heading has a **quantity, a solidus and a unit**: $l\,/\,\text{m}$, $I\,/\,\text{mA}$, $T^2\,/\,\text{s}^2$, $\lg(R\,/\,\Omega)$. The unit goes only in the heading, never after each number in the column.

Raw data in one column are all recorded to the **same number of decimal places**, matching the instrument: a metre rule gives $0.452\ \text{m}$ (to the millimetre), never $0.45\ \text{m}$ in one row and $0.4520\ \text{m}$ in the next. Calculated values follow the significant-figure rule above.

:::worked-solution[Recording a mass-spring experiment]
Chipo hangs masses $m$ on a spring and times 20 oscillations twice for each mass. She expects $T = 2\pi\sqrt{m/k}$.

1. Raw times are read from a stop-watch and recorded to $0.1\ \text{s}$ (the reaction time makes more digits meaningless).
2. The mean of $8.0\ \text{s}$ and $7.8\ \text{s}$ is $7.9\ \text{s}$; the period is $T = 7.9 / 20 = 0.395\ \text{s}$.
3. $T$ has three significant figures, like the raw times, so $T^2 = 0.156\ \text{s}^2$ to three significant figures.
4. Her completed table:

| $m\,/\,\text{kg}$ | $20T_1\,/\,\text{s}$ | $20T_2\,/\,\text{s}$ | mean $20T\,/\,\text{s}$ | $T\,/\,\text{s}$ | $T^2\,/\,\text{s}^2$ |
| --- | --- | --- | --- | --- | --- |
| 0.100 | 8.0 | 7.8 | 7.9 | 0.395 | 0.156 |
| 0.200 | 11.2 | 11.4 | 11.3 | 0.565 | 0.319 |
| 0.300 | 13.8 | 13.6 | 13.7 | 0.685 | 0.469 |
| 0.400 | 15.8 | 16.0 | 15.9 | 0.795 | 0.632 |
| 0.500 | 17.9 | 17.7 | 17.8 | 0.890 | 0.792 |
| 0.600 | 19.4 | 19.6 | 19.5 | 0.975 | 0.951 |
:::

## Choosing what to plot

Rearrange the physical equation into the form $y = mx + c$ with the **measured or derived** quantities as $y$ and $x$ and the constants inside $m$ or $c$.

For the spring, squaring $T = 2\pi\sqrt{m/k}$ gives

$$
T^2 = \frac{4\pi^2}{k}\, m
$$

so a graph of $T^2$ (vertical) against $m$ (horizontal) should be a straight line through the origin with gradient $4\pi^2/k$.

## Plotting the graph

- Label both axes with quantity and unit, exactly like the table headings.
- Choose scales so the points occupy **at least half the grid** in each direction. Use simple scales (1, 2 or 5 units per large square); never 3 or 7, which make plotting and reading slow and error-prone.
- You do not have to start an axis at zero. A **false origin** spreads the points out; you must then calculate the intercept rather than read it.
- Plot points as small crosses or dots in circles, accurate to half a small square.
- Draw one thin, ruled best-fit line with points balanced above and below. Do not join the dots. An anomalous point is circled, labelled and ignored when drawing the line (then, ideally, checked by repeating the reading).

## Gradient and intercept

The gradient comes from a **large triangle**: choose two points **on the line** (not data points, unless they lie exactly on it) at least half the length of the line apart, and write their coordinates down.

$$
\text{gradient} = \frac{\Delta y}{\Delta x} = \frac{y_2 - y_1}{x_2 - x_1}
$$

:::worked-solution[Finding $k$ from the gradient]
Chipo's best-fit line passes through $(0.150\ \text{kg},\ 0.236\ \text{s}^2)$ and $(0.550\ \text{kg},\ 0.871\ \text{s}^2)$.

1. Gradient $= \dfrac{0.871 - 0.236}{0.550 - 0.150} = \dfrac{0.635}{0.400} = 1.59\ \text{s}^2\ \text{kg}^{-1}$.
2. The gradient equals $4\pi^2/k$, so $k = \dfrac{4\pi^2}{\text{gradient}} = \dfrac{39.48}{1.5875}$.
3. $k = 24.9\ \text{N m}^{-1}$ (three significant figures, like the data). Note the unit: $\text{kg s}^{-2} = \text{N m}^{-1}$.
:::

When the $x$-axis starts at a value other than zero, the intercept cannot be read from the graph. Substitute the gradient and one point on the line into $y = mx + c$.

:::worked-solution[Intercept with a false origin]
Nyasha measures the resistance $R$ of a coil of copper wire at temperatures $\theta$ from $20\ ^\circ\text{C}$ to $80\ ^\circ\text{C}$. Theory: $R = R_0 + R_0\alpha\theta$. Her line passes through $(25.0\ ^\circ\text{C},\ 13.20\ \Omega)$ and $(75.0\ ^\circ\text{C},\ 15.61\ \Omega)$, and the $\theta$-axis starts at $20\ ^\circ\text{C}$.

| $\theta\,/\,^\circ\text{C}$ | 20 | 30 | 40 | 50 | 60 | 70 | 80 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| $R\,/\,\Omega$ | 12.95 | 13.47 | 13.90 | 14.42 | 14.86 | 15.41 | 15.83 |

1. Gradient $= \dfrac{15.61 - 13.20}{75.0 - 25.0} = \dfrac{2.41}{50.0} = 0.0482\ \Omega\ ^\circ\text{C}^{-1}$.
2. Intercept: $c = y - mx = 13.20 - 0.0482 \times 25.0 = 12.0\ \Omega$. This is $R_0$, the resistance at $0\ ^\circ\text{C}$.
3. The gradient is $R_0\alpha$, so $\alpha = \dfrac{0.0482}{12.0} = 4.02 \times 10^{-3}\ ^\circ\text{C}^{-1}$.
:::

## Curves and tangents

When the graph is a curve, the rate of change at a point is the gradient of the **tangent** there. Draw the tangent with a ruler so that it touches the curve at that point only, make it long, and take a large triangle from it. A mirror placed across the curve (the normal method) helps to judge the angle.

## Common mistakes

:::mistake{title="Units after every number"}
Writing "0.395 s" in every row instead of putting $T\,/\,\text{s}$ in the heading. Units belong in the heading only, after a solidus, $T\,/\,\text{s}$ (Cambridge also accepts the unit in brackets, $T\ (\text{s})$). A heading with no unit at all loses the mark.
:::

:::mistake{title="Inconsistent decimal places"}
Recording $0.45$, $0.452$ and $0.4500\ \text{m}$ in one column. All raw readings from one instrument have the same number of decimal places.
:::

:::mistake{title="Small triangles and data points"}
Calculating the gradient from two adjacent table values. Use two points read from the line, far apart, and show the coordinates.
:::

:::mistake{title="Reading the intercept from a false origin"}
If the axis starts at $20\ ^\circ\text{C}$, the line meets the edge of the grid at $\theta = 20$, not at $\theta = 0$. Calculate $c$ from $y = mx + c$.
:::

## Exam tips

:::exam-tip{title="Where these marks are"}
Cambridge Paper 3 question 1 gives marks for the table layout, the range and number of readings, the graph (axes, scales, plotting, line), the gradient and intercept, and the final constant with a unit. ZIMSEC practical work rewards the same steps.
:::

:::exam-tip{title="Command words"}
"Plot a graph of $y$ against $x$" means $y$ on the vertical axis. "Determine the gradient" expects the triangle coordinates shown. "Use your answers to determine $k$" means equate the gradient (or intercept) to its algebraic form, rearrange, and give $k$ with a unit and a sensible number of significant figures.
:::

:::exam-tip{title="Significant figures"}
Give calculated values to the same number of significant figures as the least precise data, or one more. Writing $24.86829\ \text{N m}^{-1}$ loses the mark; so does $25$ when the data had three significant figures.
:::

## Summary

:::summary
- Take at least six readings over the widest possible range, with repeats, and time many cycles for short periods.
- Headings are quantity / unit; raw data share one precision; calculated values have the same s.f. as the data, or one more.
- Rearrange the equation to $y = mx + c$ to decide what to plot; constants sit in the gradient or the intercept.
- Scales fill at least half the grid; draw one best-fit line; gradients come from a large triangle on the line.
- With a false origin, calculate the intercept from $c = y - mx$.
:::
