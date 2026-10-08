---
{
  "key": "electronics.diodes",
  "title": "Diodes and light-emitting diodes",
  "summary": "Describe how a diode lets current flow in one direction only, recognise forward and reverse bias, interpret its current–voltage graph, and use LEDs safely as indicators.",
  "concepts": ["phys.electronics.diodes"],
  "objectives": ["cambridge/igcse/physics:4.3.1.2", "zimsec/o-level/physics:14.2.1"],
  "estimatedMinutes": 25
}
---
## Introduction

The small red light that shows a charger is switched on, the numbers on a microwave clock and the bright white lights of a modern torch are all **light-emitting diodes**. Ordinary diodes, which give no light, are hidden inside chargers and radios, where they make sure current flows only one way.

## Key definitions

:::definition{term="Diode"}
A semiconductor component that allows current to flow through it in one direction only.
:::

:::definition{term="Forward bias"}
A diode connected so that it conducts: its anode (the triangle side of the symbol) towards the positive terminal.
:::

:::definition{term="Reverse bias"}
A diode connected the other way round, so that it has a very high resistance and almost no current flows.
:::

:::definition{term="Light-emitting diode (LED)"}
A diode that gives out light when a current flows through it in the forward direction.
:::

## The diode symbol and its direction

The circuit symbol is a **triangle pointing at a short bar** across the wire. The triangle points in the direction in which **conventional current** can flow. An LED has the same symbol with two small arrows pointing away from it, showing the light given out.

## How a diode behaves

- **Forward bias**: once the p.d. across a silicon diode is more than about $0.6$–$0.7\ \text{V}$, its resistance becomes very low and the current rises steeply as the p.d. increases.
- **Reverse bias**: the resistance is very high and almost no current flows.

The current–voltage graph is therefore almost flat along the axis for negative p.d.s and small positive p.d.s, then rises steeply. A diode does not obey Ohm's law.

:::example{title="Testing a diode"}
A diode and a lamp are connected in series with a battery. The lamp lights. When the diode is turned round, the lamp goes out: the diode is now reverse biased and blocks the current. This is a quick way to find which end of an unmarked diode is which.
:::

## Uses of diodes

- **Rectification**: changing a.c. into d.c. in chargers and power supplies (see the next lesson).
- **Protection**: a diode in series with a radio's battery connection stops current flowing if the batteries are put in the wrong way round, protecting the circuit.
- **LEDs as indicators and lighting**: power-on lights, displays, traffic lights and torches. LEDs use little power, last a very long time and switch on instantly.

## Using an LED safely

An LED needs only about $2\ \text{V}$ across it and is damaged by a large current, so it is always connected with a **resistor in series** to limit the current.

:::worked-solution[Choosing a series resistor]
An LED needs $2.0\ \text{V}$ across it and a current of $20\ \text{mA}$. It is to be run from a $9.0\ \text{V}$ battery.

1. The resistor must take the rest of the p.d.: $9.0 - 2.0 = 7.0\ \text{V}$.
2. The current through the resistor is the same as through the LED: $0.020\ \text{A}$.
3. $R = \dfrac{V}{I} = \dfrac{7.0}{0.020} = 350\ \Omega$. The nearest standard value above this, such as $390\ \Omega$, would be chosen.
:::

## Common mistakes

:::mistake{title="A reversed diode just conducts less"}
A reverse-biased diode does not just conduct less: it blocks almost all current.
:::

:::mistake{title="LEDs without resistors"}
Connecting an LED straight across a battery usually destroys it. Always include a series resistor.
:::

## Exam tips

:::exam-tip
When asked how a diode is connected, say whether it is forward or reverse biased and what that means for the current.
:::

:::exam-tip
Draw the diode symbol with the triangle pointing in the direction of conventional current for forward bias.
:::

## Summary

:::summary
- A diode lets current flow in one direction only; the triangle in its symbol points the way current can flow.
- Forward bias: conducts once the p.d. exceeds about 0.6–0.7 V. Reverse bias: almost no current.
- A diode's I–V graph shows it is non-ohmic.
- Diodes are used for rectification and to protect circuits; LEDs are efficient indicators and lights.
- An LED needs a series resistor to limit its current.
:::
