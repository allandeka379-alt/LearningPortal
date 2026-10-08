---
{
  "key": "electricity.resistance",
  "title": "Resistance and Ohm's law",
  "summary": "Use R = V/I and Ohm's law, measure resistance with an ammeter and a voltmeter, interpret current–voltage graphs, and relate a wire's resistance to its length and cross-sectional area.",
  "concepts": ["phys.electricity.resistance"],
  "objectives": ["cambridge/igcse/physics:4.2.4.1", "cambridge/igcse/physics:4.2.4.2", "cambridge/igcse/physics:4.2.4.3", "cambridge/igcse/physics:4.2.4.4", "cambridge/igcse/physics:4.2.4.5", "zimsec/o-level/physics:11.3.4", "zimsec/o-level/physics:11.3.5", "zimsec/o-level/physics:11.3.6", "zimsec/o-level/physics:11.3.7"],
  "estimatedMinutes": 32
}
---
## Introduction

The thin coiled wire in a kettle element gets hot; the thick copper cable that feeds the kettle stays cool. A long extension lead makes a heater slightly less powerful. These differences come down to **resistance**: how much a component opposes the flow of current.

## Key definitions

:::definition{term="Resistance, R"}
The ratio of the potential difference across a component to the current through it. Unit: ohm (Ω).
:::

:::formula{name="Resistance"}
$$
R = \frac{V}{I}
$$
where $V$ is the p.d. (V) and $I$ the current (A). One ohm is one volt per ampere.
:::

:::definition{term="Ohm's law"}
The current through a metallic conductor is directly proportional to the potential difference across it, provided the temperature (and other physical conditions) stay constant.
:::

## Using R = V/I

:::worked-solution[Resistance of a heating element]
A heater element carries a current of $0.40\ \text{A}$ when the p.d. across it is $12\ \text{V}$.

1. $R = \dfrac{V}{I} = \dfrac{12}{0.40} = 30\ \Omega$.
:::

:::worked-solution[Finding the current]
A $220\ \Omega$ resistor is connected to a $5.5\ \text{V}$ supply.

1. $I = \dfrac{V}{R} = \dfrac{5.5}{220} = 0.025\ \text{A} = 25\ \text{mA}$.
:::

## Measuring resistance

1. Connect the component in series with a cell (or low-voltage supply), a switch, an **ammeter** and a **variable resistor**.
2. Connect a **voltmeter** in parallel across the component.
3. Read the current and the p.d.; then use the variable resistor to change the current and take several more pairs of readings.
4. Calculate $R = V/I$ for each pair, or plot a graph of $V$ against $I$: for an ohmic conductor the points lie on a straight line through the origin and the **gradient** is the resistance.
5. Switch off between readings so the component does not heat up and change its resistance.

## Current–voltage graphs (Cambridge Supplement; ZIMSEC)

Plotting current $I$ (vertical axis) against p.d. $V$ (horizontal axis):

- **Fixed resistor (metal wire at constant temperature)**: a straight line through the origin. $I$ is proportional to $V$, so the resistance is constant: it obeys Ohm's law (an **ohmic** conductor).
- **Filament lamp**: a curve that gets less steep as $V$ increases. As the current rises, the filament gets hotter and its resistance **increases**, so it does not obey Ohm's law (non-ohmic). The graph has the same shape for negative values of $V$.
- **Diode**: almost no current flows in the reverse direction. In the forward direction, current flows once the p.d. passes a small value (about $0.6\ \text{V}$ for a silicon diode) and then rises steeply. A diode lets current flow in one direction only.

Ohm's law therefore has limits: it applies to metallic conductors kept at constant temperature, not to filament lamps, diodes or thermistors.

## Resistance of a wire

The resistance of a metal wire depends on its **length**, its **cross-sectional area** and the **material**:

- a **longer** wire has **more** resistance;
- a **thicker** wire (larger cross-sectional area) has **less** resistance.

Cambridge Supplement: resistance is **directly proportional** to length and **inversely proportional** to cross-sectional area. Doubling the length doubles the resistance; doubling the area halves it.

:::formula{name="Resistance and resistivity (ZIMSEC)"}
$$
R = \frac{\rho L}{A}
$$
where $\rho$ (rho) is the **resistivity** of the material (Ω m), $L$ the length (m) and $A$ the cross-sectional area (m²).
:::

:::worked-solution[A nichrome heating wire]
Nichrome has a resistivity of $1.1 \times 10^{-6}\ \Omega\,\text{m}$. A heating wire is $2.0\ \text{m}$ long with a cross-sectional area of $0.50\ \text{mm}^2 = 5.0 \times 10^{-7}\ \text{m}^2$.

1. $R = \dfrac{\rho L}{A} = \dfrac{1.1 \times 10^{-6} \times 2.0}{5.0 \times 10^{-7}}$.
2. $R = 4.4\ \Omega$.
:::

:::worked-solution[Changing the wire (proportionality)]
A wire has a resistance of $6.0\ \Omega$. A wire of the same metal is twice as long and has three times the cross-sectional area.

1. Doubling the length doubles $R$: $12\ \Omega$.
2. Three times the area divides $R$ by 3: $\dfrac{12}{3} = 4.0\ \Omega$.
:::

## Common mistakes

:::mistake{title="Area and diameter"}
Cross-sectional area depends on the diameter squared. A wire with twice the **diameter** has four times the area, so a quarter of the resistance.
:::

:::mistake{title="Every component obeys Ohm's law"}
Only conductors at constant temperature do. A filament lamp's resistance rises as it heats up.
:::

## Exam tips

:::exam-tip
Convert mA to A and mm² to m² before substituting. $1\ \text{mm}^2 = 1 \times 10^{-6}\ \text{m}^2$.
:::

:::exam-tip
When sketching I–V graphs, label the axes and show the key feature: straight line through the origin, curve flattening, or almost zero current until the diode's switch-on p.d.
:::

## Summary

:::summary
- $R = \dfrac{V}{I}$; resistance is measured in ohms.
- Ohm's law: current is proportional to p.d. for a metallic conductor at constant temperature.
- Measure resistance with an ammeter in series and a voltmeter in parallel, taking several readings.
- I–V graphs: straight line (resistor), flattening curve (filament lamp), one-way conduction (diode).
- Resistance increases with length and decreases with cross-sectional area; $R = \dfrac{\rho L}{A}$ (ZIMSEC).
:::
