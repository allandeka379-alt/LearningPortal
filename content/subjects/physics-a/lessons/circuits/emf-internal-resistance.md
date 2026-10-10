---
{
  "key": "circuits.emf-internal-resistance",
  "title": "E.m.f., internal resistance and circuit symbols",
  "summary": "Recognise the standard circuit symbols, define e.m.f. and distinguish it from p.d. in terms of energy, use E = V + Ir and the idea of lost volts, find E and r from a graph of terminal p.d. against current, and meet maximum power transfer as an extension.",
  "concepts": ["aphys.circuits.emf-internal-resistance"],
  "estimatedMinutes": 45,
  "level": "core"
}
---
## Introduction

When a kombi driver turns the ignition key, the headlamps dim for a moment. The starter motor draws a very large current from the battery, and some of the battery's energy is lost inside the battery itself, so less is available for the lamps. Explaining this needs two ideas: the **electromotive force** of the source, and its **internal resistance**.

You should be confident with $V = W/Q$, $R = V/I$ and the rules for series circuits. This lesson also collects the circuit symbols you must recognise and use.

## Circuit symbols

Examination circuit diagrams use standard symbols. Since diagrams cannot be drawn here, this table describes each one.

| Component | Description of the symbol |
|---|---|
| Cell | A long thin line (positive terminal) beside a short thick line (negative terminal) |
| Battery of cells | Two or more cell symbols joined in series, or one cell symbol with a dashed line between |
| d.c. power supply | Two circles (terminals) marked + and −, or a cell symbol with the terminals marked |
| a.c. power supply | Two terminals with a wavy line (sine wave) between them |
| Switch | A break in the line with a short hinged line that can close the gap |
| Fixed resistor | A rectangle in the line |
| Variable resistor | A rectangle with an arrow drawn diagonally through it |
| Potentiometer | A rectangle with an arrow pointing to its side (a sliding contact) |
| Thermistor | A rectangle with a line through it that has a short flat "foot" at one end |
| Light-dependent resistor | A rectangle inside a circle (or alone) with two arrows pointing towards it |
| Heater | A rectangle divided into several sections by short parallel lines |
| Filament lamp | A circle with a cross inside it |
| Semiconductor diode | A triangle pointing at a short bar across the line (the triangle shows the direction of conventional current) |
| Light-emitting diode | The diode symbol inside a circle with two arrows pointing away from it |
| Ammeter, voltmeter, galvanometer | A circle containing A, V, or an arrow/G respectively |
| Fuse | A rectangle with the line running through its full length |
| Capacitor | Two parallel lines of equal length across the gap |
| Earth | A vertical line ending in three horizontal lines of decreasing length |
| Junction of conductors | A solid dot where wires join; crossing wires without a dot are not joined |

Other symbols on the lists include the motor and generator (a circle containing M or G), the electric bell, the microphone and the loudspeaker.

## Key definitions

:::definition{term="Electromotive force (e.m.f.)"}
The energy transferred from other forms (for example chemical) to electrical energy per unit charge, in driving charge round a complete circuit: $E = \dfrac{W}{Q}$.
:::

:::definition{term="Internal resistance"}
The resistance of the materials inside a source, which causes energy to be transferred to thermal energy within the source when it delivers a current.
:::

:::definition{term="Terminal potential difference"}
The p.d. between the terminals of a source when it supplies a current; it is less than the e.m.f. by the lost volts $Ir$.
:::

:::formula{name="E.m.f. and terminal p.d."}
$$
E = V + Ir = I(R + r)
$$

$E$ is the e.m.f. in V, $V$ the terminal p.d. in V, $I$ the current in A, $r$ the internal resistance and $R$ the external (load) resistance in Ω. The term $Ir$ is the **lost volts**.
:::

:::keyfact{title="E.m.f. and p.d. compared"}
Both are measured in volts (J C⁻¹). E.m.f. describes energy transferred **to** electrical energy (in a source); p.d. describes energy transferred **from** electrical energy to other forms (in a component).
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards require the symbols, the definition of e.m.f., internal resistance and $E = V + Ir$ (Cambridge AS 10.1; ZIMSEC Form 5). Maximum power transfer is included here as an extension for ZIMSEC (to be confirmed); it is not required by Cambridge.
:::

## Lost volts

Apply energy conservation to each coulomb going round the circuit. The source gives it energy $E$; it gives up $IR$ in the external resistor and $Ir$ inside the source. So $E = IR + Ir$. A high-resistance voltmeter connected across the terminals with no other load draws almost no current, so it reads very nearly the e.m.f.

:::worked-solution[A cell with a load]
A cell of e.m.f. $1.5\ \text{V}$ and internal resistance $0.80\ \Omega$ is connected to a $4.0\ \Omega$ resistor. Find the current, the terminal p.d. and the lost volts.

1. $I = \dfrac{E}{R + r} = \dfrac{1.5}{4.0 + 0.80} = 0.3125\ \text{A} \approx 0.313\ \text{A}$.
2. $V = IR = 0.3125 \times 4.0 = 1.25\ \text{V}$.
3. Lost volts $= Ir = 0.3125 \times 0.80 = 0.25\ \text{V}$; check: $1.25 + 0.25 = 1.5\ \text{V}$.
:::

:::worked-solution[Starting a car]
A car battery has e.m.f. $12.6\ \text{V}$ and internal resistance $0.020\ \Omega$. The starter motor draws $150\ \text{A}$.

1. Lost volts $= Ir = 150 \times 0.020 = 3.0\ \text{V}$.
2. Terminal p.d. $= 12.6 - 3.0 = 9.6\ \text{V}$.
3. The headlamps, connected across the same terminals, receive only 9.6 V while the motor turns, so they dim. A car battery must have a very small internal resistance to deliver such currents.
:::

## Finding E and r from a graph

Rearranging gives $V = E - rI$, the equation of a straight line. Vary the external resistance with a rheostat, record pairs of terminal p.d. $V$ and current $I$, and plot $V$ against $I$:

- the **intercept** on the $V$-axis is the e.m.f. $E$;
- the **gradient** is $-r$.

These readings were taken for a battery pack:

| $I\,/\,\text{A}$ | $V\,/\,\text{V}$ |
|---|---|
| 0.20 | 4.28 |
| 0.40 | 4.01 |
| 0.60 | 3.79 |
| 0.80 | 3.52 |
| 1.00 | 3.30 |
| 1.20 | 3.07 |

The points lie on a straight line sloping downwards. Its intercept is about $4.51\ \text{V}$ and its gradient about $-1.21\ \text{V A}^{-1}$, so $E \approx 4.5\ \text{V}$ and $r \approx 1.2\ \Omega$. Include a fixed protective resistor in series so the current never becomes large, and switch off between readings, because $E$ and $r$ can change as the cells warm or run down.

:::worked-solution[E and r from two readings]
With one load, a battery gives $V = 2.76\ \text{V}$ at $I = 0.30\ \text{A}$; with another, $V = 2.40\ \text{V}$ at $I = 0.75\ \text{A}$.

1. $E = 2.76 + 0.30r$ and $E = 2.40 + 0.75r$.
2. Subtract: $0.36 = 0.45r$, so $r = 0.80\ \Omega$.
3. $E = 2.76 + 0.30 \times 0.80 = 3.00\ \text{V}$.
:::

## Maximum power transfer (extension)

The power delivered to the load is $P = I^2R = \dfrac{E^2R}{(R + r)^2}$. It is greatest when the load resistance equals the internal resistance, $R = r$, and then $P_{\max} = \dfrac{E^2}{4r}$. At that point only half of the energy supplied by the source reaches the load; the other half is dissipated inside the source, so maximum power is not the same as maximum efficiency. For example, a source with $E = 6.0\ \text{V}$ and $r = 2.0\ \Omega$ delivers at most $\dfrac{6.0^2}{4 \times 2.0} = 4.5\ \text{W}$, into a $2.0\ \Omega$ load.

## Common mistakes

:::mistake{title="Defining e.m.f. as a force or as a p.d."}
E.m.f. is not a force. Define it as energy transferred to electrical energy **per unit charge** in driving charge round a complete circuit.
:::

:::mistake{title="Using the e.m.f. as the p.d. across the load"}
When a current flows, the terminal p.d. is $E - Ir$, not $E$, unless $r$ is negligible.
:::

:::mistake{title="Reading r as the gradient's magnitude with the wrong axes"}
For $V$ against $I$ the gradient is $-r$. If you plot $I$ against $V$ instead, the gradient is $-1/r$.
:::

## Exam tips

:::exam-tip{title="Distinguish e.m.f. and p.d."}
Answer in terms of energy: e.m.f. — energy converted **to** electrical per unit charge (in the source); p.d. — electrical energy converted **to other forms** per unit charge (in the component).
:::

:::exam-tip{title="Explain a fall in terminal p.d."}
A larger current means larger lost volts $Ir$, so $V = E - Ir$ falls. Name the internal resistance and the energy dissipated inside the source.
:::

:::exam-tip{title="Which papers"}
ZIMSEC Paper 1 and Cambridge Paper 1 test symbols and quick $E = V + Ir$ calculations; ZIMSEC Paper 2 and Cambridge Paper 2 test definitions and multi-step problems; the $V$-$I$ graph experiment appears in the practical papers (Cambridge Paper 3, ZIMSEC Paper 4).
:::

## Summary

:::summary
- E.m.f. is energy transferred to electrical energy per unit charge in driving charge round a complete circuit; p.d. is energy transferred from electrical energy per unit charge.
- $E = V + Ir$; the lost volts $Ir$ grow with current, so the terminal p.d. falls.
- Plot $V$ against $I$: intercept $= E$, gradient $= -r$.
- An ideal (very high resistance) voltmeter across an unloaded source reads the e.m.f.
- Extension: maximum power is delivered to a load when $R = r$, $P_{\max} = E^2/4r$, at 50% efficiency.
:::
