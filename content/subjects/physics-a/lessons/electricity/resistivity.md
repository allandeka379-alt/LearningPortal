---
{
  "key": "electricity.resistivity",
  "title": "Resistivity of materials",
  "summary": "Use R = ρL/A, treat resistivity as a property of the material, measure the resistivity of a metal wire from a graph of R against L with a micrometer-measured diameter, and compare orders of magnitude for metals, semiconductors and insulators.",
  "concepts": ["aphys.electricity.resistivity"],
  "estimatedMinutes": 40,
  "level": "core"
}
---
## Introduction

The heating element of an electric stove, the copper conductors of a house's wiring and the aluminium lines that carry power from Kariba all have to be designed with the right resistance. A cable must have a small resistance so it wastes little energy; a heating element must have a large one in a small space. Engineers achieve this by choosing the material, the length and the thickness, and the quantity that captures the material's contribution is its **resistivity**.

You should know that $R = V/I$, how to use a micrometer screw gauge, and how to find the gradient of a straight-line graph.

## Key definitions

:::definition{term="Resistivity"}
The resistivity $\rho$ of a material is defined by $\rho = \dfrac{RA}{L}$, where $R$ is the resistance of a sample of the material of length $L$ and uniform cross-sectional area $A$. It is numerically equal to the resistance between opposite faces of a one-metre cube of the material.
:::

:::formula{name="Resistance of a uniform conductor"}
$$
R = \frac{\rho L}{A}
$$

$R$ in Ω, $\rho$ in Ω m, $L$ in m, $A$ in $\text{m}^2$. For a wire of diameter $d$, $A = \dfrac{\pi d^2}{4}$.
:::

:::keyfact{title="Resistivity is a property of the material"}
Resistance depends on the size and shape of a sample; resistivity does not. It depends only on the material and its temperature (and, for semiconductors, its purity). The unit is the ohm metre, Ω m, not Ω per metre.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards require $R = \rho L/A$ and its use (Cambridge AS 9.3; ZIMSEC Form 5). The experiment to measure resistivity is a standard practical for Cambridge Paper 3 and ZIMSEC Paper 4.
:::

## How length and area affect resistance

- **Length:** a wire twice as long is like two equal resistors in series, so $R \propto L$. The charge carriers must travel past twice as many lattice ions.
- **Area:** a wire with twice the cross-sectional area is like two equal resistors in parallel, so $R \propto 1/A$. There are twice as many carriers available in each slice of the wire.
- **Diameter:** since $A \propto d^2$, halving the diameter makes the resistance **four** times larger.

:::worked-solution[A nichrome heating element]
A nichrome wire has diameter $0.32\ \text{mm}$ and length $1.50\ \text{m}$. The resistivity of nichrome is $1.10 \times 10^{-6}\ \Omega\ \text{m}$. Find its resistance.

1. $A = \dfrac{\pi d^2}{4} = \dfrac{\pi (0.32 \times 10^{-3})^2}{4} = 8.04 \times 10^{-8}\ \text{m}^2$.
2. $R = \dfrac{\rho L}{A} = \dfrac{1.10 \times 10^{-6} \times 1.50}{8.04 \times 10^{-8}}$.
3. $R = 20.5\ \Omega$.
:::

:::worked-solution[Stretching a wire]
A wire is drawn out uniformly so that its length doubles. Its volume does not change. Find the factor by which its resistance changes.

1. Volume $= AL$ is constant, so doubling $L$ halves $A$.
2. $R = \dfrac{\rho L}{A}$: the numerator doubles and the denominator halves.
3. The resistance becomes $2 \times 2 = 4$ times larger.
:::

## Orders of magnitude

| Material | Type | Resistivity at room temperature / Ω m (order of magnitude) |
|---|---|---|
| Copper | metal | $10^{-8}$ (about $1.7 \times 10^{-8}$) |
| Aluminium | metal | $10^{-8}$ (about $2.8 \times 10^{-8}$) |
| Constantan, nichrome | alloys | $10^{-7}$ to $10^{-6}$ |
| Germanium (pure) | semiconductor | about $0.5$ |
| Silicon (pure) | semiconductor | about $10^{3}$ |
| Glass, PVC | insulators | $10^{10}$ to $10^{14}$ or more |

Copper is used for wiring because of its very low resistivity; aluminium, with a slightly higher resistivity but much lower density, is preferred for overhead transmission lines. Alloys such as nichrome are used for heating elements because their high resistivity gives a useful resistance in a short, robust wire. The enormous spread of values, more than twenty orders of magnitude, reflects the huge differences in the number density of free charge carriers.

## The effect of temperature

For a **metal**, resistivity increases as temperature rises: the lattice ions vibrate more and the free electrons collide with them more often, while the number of free electrons hardly changes. Over moderate ranges the increase is roughly linear. Constantan is an alloy chosen because its resistivity changes very little with temperature, which makes it ideal for standard resistors and potentiometer wires. For a **semiconductor**, resistivity falls sharply as temperature rises because many more charge carriers are released; this is the principle of the NTC thermistor.

## Measuring the resistivity of a metal wire

1. Measure the diameter of the wire with a micrometer screw gauge at several points along it and in two perpendicular directions; check for zero error and take the mean.
2. Tape the wire to a metre rule. Connect one end with a crocodile clip, and use a second crocodile clip (a flying lead) to select a length $L$.
3. Measure the resistance for each length, either with an ohmmeter or from $R = V/I$ with an ammeter in series and a voltmeter across the length of wire. Use a small current and switch off between readings so the wire does not heat up.
4. Record $R$ for at least six lengths between about $0.20\ \text{m}$ and $0.80\ \text{m}$, and plot $R$ against $L$.

These results were taken for a constantan wire of mean diameter $0.28\ \text{mm}$:

| $L\,/\,\text{m}$ | $R\,/\,\Omega$ |
|---|---|
| 0.20 | 1.78 |
| 0.30 | 2.48 |
| 0.40 | 3.38 |
| 0.50 | 4.10 |
| 0.60 | 4.98 |
| 0.70 | 5.67 |
| 0.80 | 6.54 |

The points lie close to a straight line with gradient $\dfrac{\rho}{A}$. The line does not pass exactly through the origin: a small positive intercept (here about $0.16\ \Omega$) comes from the resistance of the clips and contacts, which is the same for every length. Using the gradient rather than a single reading removes this systematic error.

:::worked-solution[Resistivity from the gradient]
The best-fit line through the data has gradient $7.95\ \Omega\ \text{m}^{-1}$. The diameter is $0.28\ \text{mm}$.

1. $A = \dfrac{\pi (0.28 \times 10^{-3})^2}{4} = 6.16 \times 10^{-8}\ \text{m}^2$.
2. Gradient $= \dfrac{\rho}{A}$, so $\rho = \text{gradient} \times A = 7.95 \times 6.16 \times 10^{-8}$.
3. $\rho = 4.90 \times 10^{-7}\ \Omega\ \text{m}$, consistent with constantan.
:::

The percentage uncertainty in the diameter is doubled in $A$ (because $A \propto d^2$), so the diameter is usually the dominant source of uncertainty: measure it with the most precise instrument available, at many points.

## Common mistakes

:::mistake{title="Using the diameter as the radius"}
$A = \pi r^2 = \pi d^2/4$. Substituting the diameter for $r$ makes $A$ four times too large and $\rho$ four times too large.
:::

:::mistake{title="Forgetting to convert mm to m before squaring"}
$0.28\ \text{mm} = 0.28 \times 10^{-3}\ \text{m}$; $1\ \text{mm}^2 = 10^{-6}\ \text{m}^2$.
:::

:::mistake{title="Writing the unit as Ω per metre"}
Resistivity is in Ω m. The gradient of $R$ against $L$ is in Ω m⁻¹; it becomes Ω m only after multiplying by the area.
:::

:::mistake{title="Saying resistivity depends on length"}
A longer wire has more resistance, not more resistivity.
:::

## Exam tips

:::exam-tip{title="Define, then use"}
*Define resistivity* with the symbols named: $\rho = RA/L$, where $R$ is the resistance of a uniform sample of length $L$ and cross-sectional area $A$. In ratio questions (same material, different wire), write $R \propto L/d^2$ and compare.
:::

:::exam-tip{title="Practical questions"}
Expect to state what to plot ($R$ against $L$), what the gradient represents ($\rho/A$), why the intercept is not zero (contact resistance), and how to reduce uncertainty in $d$. Cambridge Paper 3 and ZIMSEC Paper 4 often set this experiment; Paper 1 multiple-choice items test the $L/d^2$ ratio.
:::

## Summary

:::summary
- $R = \rho L/A$; resistivity $\rho$ (Ω m) depends on the material and temperature, not on the shape of the sample.
- $R \propto L$ and $R \propto 1/A \propto 1/d^2$; stretching a wire to twice its length quadruples its resistance.
- Metals about $10^{-8}\ \Omega\ \text{m}$; semiconductors about $10^{-1}$ to $10^{3}\ \Omega\ \text{m}$; insulators $10^{10}\ \Omega\ \text{m}$ and above.
- Metal resistivity rises with temperature; semiconductor resistivity falls.
- Experiment: plot $R$ against $L$; gradient $= \rho/A$; the intercept is contact resistance.
:::
