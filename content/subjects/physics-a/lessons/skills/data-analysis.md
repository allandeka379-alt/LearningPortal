---
{
  "key": "skills.data-analysis",
  "title": "Data analysis: logarithms, error bars and worst lines",
  "summary": "Rearrange a relationship into a straight-line form, plot logarithms where needed, draw error bars and best and worst lines, and quote a constant with its uncertainty and unit.",
  "concepts": ["aphys.skills.data-analysis"],
  "estimatedMinutes": 40,
  "level": "core"
}
---
## Introduction

A physicist rarely trusts a single reading. The usual way to test a relationship, and to find the constants in it, is to collect a set of readings, turn the relationship into a straight line and read the constants from the gradient and the intercept. The same skill turns up everywhere: an engineer at a borehole in Masvingo fitting pump data, a technician calibrating a sensor, a student finding the Young modulus of a wire.

This lesson is the reference for every data-analysis question in A-Level Physics. You should already be able to plot a graph, draw a best-fit line and calculate a gradient (see the lesson on tables and graphs), and to find absolute and percentage uncertainties.

## Key definitions

:::definition{term="Linearising"}
Rearranging a relationship so that two quantities that can be calculated from the readings are related by $y = mx + c$, so that a graph of one against the other is a straight line whose gradient and intercept give the unknown constants.
:::

:::definition{term="Error bar"}
A line drawn through a plotted point, extending one absolute uncertainty above and below it (or to either side), showing the range within which the true value is expected to lie.
:::

:::definition{term="Worst acceptable line"}
The steepest or the shallowest straight line that still passes through all the error bars. The difference between its gradient and that of the best-fit line is the absolute uncertainty in the gradient.
:::

:::formula{name="Logarithmic forms"}
$$
y = ax^{n} \;\Rightarrow\; \lg y = n \lg x + \lg a
$$

$$
y = a\,e^{kx} \;\Rightarrow\; \ln y = kx + \ln a
$$

Plot $\lg y$ against $\lg x$ (gradient $n$, intercept $\lg a$) for a power law, and $\ln y$ against $x$ (gradient $k$, intercept $\ln a$) for an exponential. Logarithms have no unit.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Cambridge tests this in Paper 5 question 2 (and in Paper 3). ZIMSEC A-Level practical work uses the same graphical methods; the exact ZIMSEC Paper 4 format should be checked against recent papers.
:::

## Choosing what to plot

Compare the relationship you are given with $y = mx + c$. Whatever multiplies the variable you change becomes the gradient; whatever stands alone becomes the intercept.

| Relationship | Plot $y$ | Plot $x$ | Gradient | $y$-intercept |
| --- | --- | --- | --- | --- |
| $T = 2\pi\sqrt{\dfrac{L}{g}}$ | $T^2$ | $L$ | $\dfrac{4\pi^2}{g}$ | 0 |
| $V = E - Ir$ | $V$ | $I$ | $-r$ | $E$ |
| $\dfrac{1}{v} + \dfrac{1}{u} = \dfrac{1}{f}$ | $\dfrac{1}{v}$ | $\dfrac{1}{u}$ | $-1$ | $\dfrac{1}{f}$ |
| $t = k d^{\,n}$ | $\lg t$ | $\lg d$ | $n$ | $\lg k$ |
| $h = h_0 e^{-kt}$ | $\ln h$ | $t$ | $-k$ | $\ln h_0$ |

When both the power and the constant are unknown, logarithms are the only way to get a straight line. When the power is known (as in $T^2$ against $L$), plotting the power directly is simpler and more precise.

## Tables with logarithms

Write each column heading as a quantity divided by its unit, and put the unit inside the logarithm: $\lg(d/\text{mm})$, $\ln(h/\text{cm})$. Give a logarithm to the same number of **decimal places** as the significant figures of the raw reading (or one more). A time of $46.3\ \text{s}$ (3 s.f.) gives $\lg(46.3) = 1.666$ to 3 d.p.

:::worked-solution[A power law from a lg–lg graph]
Water drains from a can through a hole of diameter $d$ in its base. The time $t$ to empty is thought to obey $t = k d^{\,n}$.

| $d\,/\,\text{mm}$ | $t\,/\,\text{s}$ | $\lg(d/\text{mm})$ | $\lg(t/\text{s})$ |
| --- | --- | --- | --- |
| 2.0 | 181 | 0.301 | 2.258 |
| 3.0 | 79.6 | 0.477 | 1.901 |
| 4.0 | 46.3 | 0.602 | 1.666 |
| 5.0 | 28.6 | 0.699 | 1.456 |
| 6.0 | 20.4 | 0.778 | 1.310 |
| 8.0 | 11.3 | 0.903 | 1.053 |

1. Take logarithms: $\lg t = n \lg d + \lg k$, so plot $\lg(t/\text{s})$ on the $y$-axis against $\lg(d/\text{mm})$ on the $x$-axis.
2. The points lie close to a straight line with a negative gradient. Two points read from the best-fit line, far apart: $(0.320,\ 2.220)$ and $(0.880,\ 1.102)$.
3. Gradient $n = \dfrac{1.102 - 2.220}{0.880 - 0.320} = \dfrac{-1.118}{0.560} = -2.00$.
4. Intercept: $\lg k = 2.220 - (-2.00)(0.320) = 2.86$, so $k = 10^{2.86} = 7.2 \times 10^{2}$.
5. Unit of $k$: $t = k d^{-2}$, so $k$ has the unit of $t \times d^{2}$, here $\text{s mm}^2$. Result: $t = 7.2 \times 10^{2}\ d^{-2}$ with $t$ in s and $d$ in mm, so the drain time is inversely proportional to the area of the hole.
:::

The $y$-axis of a lg–lg graph usually does not start at zero, so the $y$-intercept is rarely on the paper. Never read it from a false origin: calculate it from $c = y - mx$ using a point on the line.

## Exponentials and the ln graph

:::worked-solution[An exponential from a ln graph]
Water flows out of a burette through a narrow tube. The height $h$ of water above the outlet is thought to fall as $h = h_0 e^{-kt}$.

| $t\,/\,\text{s}$ | $h\,/\,\text{cm}$ | $\ln(h/\text{cm})$ |
| --- | --- | --- |
| 0 | 40.0 | 3.689 |
| 20 | 32.6 | 3.484 |
| 40 | 26.9 | 3.292 |
| 60 | 21.8 | 3.082 |
| 80 | 18.0 | 2.890 |
| 100 | 14.6 | 2.681 |

1. $\ln h = -kt + \ln h_0$: plot $\ln(h/\text{cm})$ against $t$; a straight line with negative gradient confirms the relationship.
2. Best-fit gradient, from the points $(10,\ 3.588)$ and $(90,\ 2.785)$ read off the line: $\dfrac{2.785 - 3.588}{90 - 10} = -0.0100\ \text{s}^{-1}$.
3. So $k = 1.00 \times 10^{-2}\ \text{s}^{-1}$. The unit of $k$ is $\text{s}^{-1}$ because $kt$ must have no unit.
4. Intercept $\ln h_0 = 3.689$, so $h_0 = e^{3.689} = 40.0\ \text{cm}$.
:::

## Error bars and worst lines

If each height was read to $\pm 0.5\ \text{cm}$, each value of $\ln h$ also has an uncertainty. Find it by working out $\ln(h + \Delta h)$ and $\ln(h - \Delta h)$ and taking half the difference; equivalently $\Delta(\ln h) \approx \Delta h / h$. For a lg value, $\Delta(\lg y) \approx 0.434\,\Delta y / y$.

| $t\,/\,\text{s}$ | $\ln(h/\text{cm})$ | uncertainty in $\ln h$ |
| --- | --- | --- |
| 0 | 3.689 | 0.013 |
| 20 | 3.484 | 0.015 |
| 40 | 3.292 | 0.019 |
| 60 | 3.082 | 0.023 |
| 80 | 2.890 | 0.028 |
| 100 | 2.681 | 0.034 |

The error bars grow as $h$ falls, because the same $\pm 0.5\ \text{cm}$ is a larger fraction of a smaller height.

:::worked-solution[Uncertainty in $k$ from the worst line]
1. Draw the steepest and the shallowest lines that pass through **every** error bar. Here they are fixed mainly by the error bars of the first and last points, which pull the line steeper or shallower.
2. Worst gradients: about $-0.01048\ \text{s}^{-1}$ and $-0.00961\ \text{s}^{-1}$.
3. Uncertainty in gradient $= |{-0.0100} - (-0.01048)| \approx 0.0004\ \text{s}^{-1}$ (both worst lines give about the same).
4. Result: $k = (1.00 \pm 0.04) \times 10^{-2}\ \text{s}^{-1}$, a percentage uncertainty of about 4%.
:::

The uncertainty in an intercept is found the same way: calculate the intercept of the worst line and subtract the best-fit intercept. If a constant comes from the intercept through a logarithm (as $k = 10^{c}$), work out $10^{c}$ for both lines and subtract; do not apply the uncertainty in $c$ directly to $k$.

## Combining uncertainties in the final constant

If the constant is the gradient multiplied by measured quantities, add the percentage uncertainties: for $E = \dfrac{\text{gradient} \times L}{A}$ the percentage uncertainty in $E$ is that of the gradient plus that of $L$ plus twice that of the diameter. Quote the final answer as value ± absolute uncertainty with a unit, the uncertainty to one or two significant figures and the value to the same decimal place.

## Common mistakes

:::mistake{title="Reading the intercept from a false origin"}
If the $x$-axis starts at 0.30, the line crossing the left-hand edge is not the $y$-intercept. Use $c = y - mx$.
:::

:::mistake{title="Units inside and outside logarithms"}
$\lg t$ has no unit, so the gradient of a lg–lg graph has no unit. The unit belongs inside the bracket of the heading, $\lg(t/\text{s})$, and in the constant found from the intercept.
:::

:::mistake{title="Using data points for the gradient"}
Read the two points off your drawn line, and choose them more than half the line apart; examiners check the triangle size.
:::

:::mistake{title="Mixing ln and lg"}
An exponential needs natural logarithms for the gradient to equal $k$. With lg you get $0.434k$.
:::

## Exam tips

:::exam-tip{title="What each command word wants"}
*Explain how a graph can be used* means: what to plot on each axis, the expected shape, and how the constant is found from gradient or intercept. *Determine the gradient* means show the triangle's coordinates. *Determine the constant with its uncertainty* means: value, unit, and the worst-line working.
:::

:::exam-tip{title="Significant figures"}
Give the gradient to the precision of the data (usually 3 s.f.) and the uncertainty to 1 or 2 s.f. A final statement such as $k = (1.00 \pm 0.04) \times 10^{-2}\ \text{s}^{-1}$ earns the mark; a bare number does not.
:::

:::exam-tip{title="Evaluate the relationship"}
To test a power law, compare the gradient (with its uncertainty) with the predicted value: if $-2$ lies within $n \pm \Delta n$ the data support $t \propto d^{-2}$.
:::

## Summary

:::summary
- Rearrange into $y = mx + c$: $\lg y$ against $\lg x$ for $y = ax^n$; $\ln y$ against $x$ for $y = ae^{kx}$.
- Logarithms have no unit; headings read $\lg(d/\text{mm})$; give logs to as many decimal places as the data has significant figures.
- Error bars show the absolute uncertainty of each plotted value; for logs use $\Delta(\ln y) \approx \Delta y / y$.
- Uncertainty in gradient = |best gradient − worst gradient|; worst lines pass through every error bar.
- Quote the constant as value ± uncertainty with a unit, and calculate intercepts from $c = y - mx$.
:::
