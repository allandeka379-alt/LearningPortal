---
{
  "key": "measurement.errors-uncertainties",
  "title": "Errors, precision, accuracy and combining uncertainties",
  "summary": "Distinguish systematic from random errors and precision from accuracy, express uncertainties in absolute, fractional and percentage form, and combine them for sums, differences, products, quotients and powers.",
  "concepts": ["aphys.measurement.errors-uncertainties"],
  "estimatedMinutes": 40,
  "level": "core"
}
---
## Introduction

No measurement is exact. A borehole engineer in Masvingo who measures a water level as $32.4\ \text{m}$ needs to know whether that means "between $32.3$ and $32.5$" or "somewhere between $30$ and $35$" before deciding where to set the pump. A result without an uncertainty cannot be compared with anything, so it is not really a result at all.

This lesson explains the two kinds of error, the difference between precise and accurate, and the arithmetic of uncertainties: how the uncertainty in a calculated quantity follows from the uncertainties in the readings. You need it in every practical question and in many theory questions. You should already know how to calculate a mean and a percentage.

## Key definitions

:::definition{term="Systematic error"}
An error that shifts every reading in the same direction by the same amount (or the same fraction), such as a zero error on an instrument or a meter that is wrongly calibrated. It cannot be reduced by repeating readings and averaging.
:::

:::definition{term="Random error"}
An error that scatters readings unpredictably above and below the true value, for example from reaction time or from judging a reading between scale marks. Its effect is reduced by repeating readings and averaging, or by plotting a graph.
:::

:::definition{term="Zero error"}
A non-zero reading given by an instrument when the true value is zero, such as a micrometer that reads $0.02\ \text{mm}$ with its jaws closed. It is a systematic error, corrected by subtracting it from every reading.
:::

:::definition{term="Precision"}
How close repeated measurements are to each other (a small spread); also the smallest change an instrument can show.
:::

:::definition{term="Accuracy"}
How close a measurement (or the mean of measurements) is to the true value.
:::

:::formula{name="Ways of stating an uncertainty"}
$$
x \pm \Delta x \qquad \text{fractional uncertainty} = \frac{\Delta x}{x} \qquad \text{percentage uncertainty} = \frac{\Delta x}{x} \times 100\,\%
$$

$x$ is the measured value and $\Delta x$ its absolute uncertainty, in the same unit as $x$.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards require systematic and random errors, precision and accuracy, and the combination rules below. Cambridge uses simple addition of uncertainties (not the root-sum-of-squares method used at university).
:::

## Precision and accuracy are different

Picture four sets of readings of the acceleration of free fall, whose true value is $9.81\ \text{m s}^{-2}$:

| Readings / $\text{m s}^{-2}$ | Precise? | Accurate? | Why |
| --- | --- | --- | --- |
| 9.79, 9.82, 9.80, 9.83 | yes | yes | small spread, centred on 9.81 |
| 10.21, 10.23, 10.22, 10.20 | yes | no | small spread, but a systematic error shifts them all up |
| 9.2, 10.4, 9.6, 10.1 | no | yes (mean 9.8) | large random scatter, but no systematic shift |
| 8.6, 10.9, 9.0, 11.8 | no | no | large scatter and a mean of 10.1 |

Repeating readings improves precision of the mean; it does nothing for a systematic error. To find a systematic error, check the zero of the instrument, calibrate it against a known standard, or look for a non-zero intercept on a graph that theory says should pass through the origin.

## Combining uncertainties

Three rules cover every case at this level.

:::formula{name="Sums and differences: add the absolute uncertainties"}
$$
y = a \pm b \quad \Rightarrow \quad \Delta y = \Delta a + \Delta b
$$
:::

:::formula{name="Products and quotients: add the fractional (or percentage) uncertainties"}
$$
y = \frac{ab}{c} \quad \Rightarrow \quad \frac{\Delta y}{y} = \frac{\Delta a}{a} + \frac{\Delta b}{b} + \frac{\Delta c}{c}
$$
:::

:::formula{name="Powers: multiply the fractional uncertainty by the power"}
$$
y = a^n \quad \Rightarrow \quad \frac{\Delta y}{y} = |n|\,\frac{\Delta a}{a}
$$

A square root is the power $\tfrac{1}{2}$, so it halves the fractional uncertainty. A pure number such as $\pi$ or $\tfrac{1}{2}$ has no uncertainty.
:::

Uncertainties always **add**, even when the quantities are subtracted or divided: the worst case is when both errors push the answer the same way.

:::worked-solution[A temperature rise]
Water in a solar geyser test is heated from $21.5 \pm 0.5\ ^\circ\text{C}$ to $64.0 \pm 0.5\ ^\circ\text{C}$.

1. Temperature rise: $\Delta\theta = 64.0 - 21.5 = 42.5\ ^\circ\text{C}$.
2. Difference, so add absolute uncertainties: $0.5 + 0.5 = 1.0\ ^\circ\text{C}$.
3. Result: $42.5 \pm 1.0\ ^\circ\text{C}$, a percentage uncertainty of $\dfrac{1.0}{42.5} \times 100 = 2.4\,\%$.
:::

A small difference between two large readings can have a large percentage uncertainty: that is why heating experiments use a large temperature rise.

:::worked-solution[The density of a steel ball bearing]
A ball has mass $m = 8.4 \pm 0.1\ \text{g}$ and diameter $d = 12.70 \pm 0.01\ \text{mm}$. Its volume is $V = \tfrac{1}{6}\pi d^3$.

1. $V = \tfrac{1}{6}\pi (1.270\ \text{cm})^3 = 1.0725\ \text{cm}^3$, so $\rho = \dfrac{8.4}{1.0725} = 7.83\ \text{g cm}^{-3} = 7830\ \text{kg m}^{-3}$.
2. Percentage uncertainty in $m$: $\dfrac{0.1}{8.4} \times 100 = 1.19\,\%$.
3. Percentage uncertainty in $d$: $\dfrac{0.01}{12.70} \times 100 = 0.079\,\%$; in $d^3$: $3 \times 0.079 = 0.24\,\%$.
4. Total: $1.19 + 0.24 = 1.43\,\%$, so $\Delta\rho = 0.0143 \times 7830 \approx 110\ \text{kg m}^{-3}$.
5. Result: $\rho = (7.8 \pm 0.1) \times 10^{3}\ \text{kg m}^{-3}$.
:::

Notice that the mass, measured to only two significant figures, dominates. Improving the micrometer would make almost no difference; a balance reading to $0.01\ \text{g}$ would.

## Quoting the final result

- Give the absolute uncertainty to **one significant figure** (two significant figures are also acceptable when the first digit is 1).
- Round the value to the **same decimal place** as the uncertainty: $1.62 \pm 0.10\ \text{J}$ becomes $1.6 \pm 0.1\ \text{J}$, not $1.62 \pm 0.1\ \text{J}$.

:::worked-solution[Kinetic energy with its uncertainty]
A trolley of mass $0.250 \pm 0.002\ \text{kg}$ moves at $3.6 \pm 0.1\ \text{m s}^{-1}$.

1. $E_k = \tfrac{1}{2}mv^2 = \tfrac{1}{2} \times 0.250 \times 3.6^2 = 1.62\ \text{J}$.
2. $\%\,\Delta m = 0.8\,\%$; $\%\,\Delta v = 2.8\,\%$, doubled for $v^2$: $5.6\,\%$.
3. Total $\approx 6.4\,\%$, so $\Delta E_k = 0.064 \times 1.62 = 0.10\ \text{J}$.
4. $E_k = 1.6 \pm 0.1\ \text{J}$.
:::

## Common mistakes

:::mistake{title="Subtracting uncertainties"}
For $y = a - b$, the uncertainty is $\Delta a + \Delta b$, never $\Delta a - \Delta b$. The same applies to quotients: percentage uncertainties add.
:::

:::mistake{title="Adding absolute uncertainties for a product"}
For a product or quotient, convert to percentage (or fractional) uncertainties before adding; the quantities have different units, so their absolute uncertainties cannot be added.
:::

:::mistake{title="Forgetting the power"}
In $V = \tfrac{1}{6}\pi d^3$ the percentage uncertainty in $d$ is multiplied by 3. The $\tfrac{1}{6}$ and the $\pi$ add nothing.
:::

:::mistake{title="Saying repeats remove a zero error"}
Averaging reduces random error only. A zero error must be found and subtracted.
:::

## Exam tips

:::exam-tip{title="Command words"}
"Distinguish between precision and accuracy" needs both definitions in one or two sentences each. "Determine the uncertainty in $y$" expects the percentage uncertainties of each quantity shown, the combination, and a final absolute uncertainty with the value rounded to match.
:::

:::exam-tip{title="Where it is tested"}
Cambridge Paper 1 asks for combined uncertainties and the precise-versus-accurate distinction; Paper 2, Paper 3 and Paper 5 ask you to calculate and quote them. ZIMSEC Papers 1, 2 and the practical paper test the same rules.
:::

:::exam-tip{title="Which measurement matters most?"}
When asked to suggest which reading to improve, compare the percentage contributions (remembering the powers). The largest one is the answer.
:::

## Summary

:::summary
- Systematic errors shift every reading the same way (zero errors, calibration); random errors scatter readings and are reduced by averaging.
- Precision is about spread; accuracy is about closeness to the true value.
- Sums and differences: add absolute uncertainties. Products and quotients: add percentage uncertainties.
- Powers multiply the percentage uncertainty by the power; constants such as $\pi$ add nothing.
- Quote the uncertainty to one significant figure and round the value to the same decimal place.
:::
