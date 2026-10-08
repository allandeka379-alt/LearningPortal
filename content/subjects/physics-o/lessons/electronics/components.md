---
{
  "key": "electronics.components",
  "title": "Electronic components: resistors, capacitors and reed switches",
  "summary": "Read resistor colour codes and tolerances, choose components with suitable power ratings, and describe the action of capacitors, reed switches and transducers.",
  "concepts": ["phys.electronics.components"],
  "objectives": ["zimsec/o-level/physics:14.4.1", "zimsec/o-level/physics:14.4.2", "zimsec/o-level/physics:14.4.5", "zimsec/o-level/physics:14.4.6"],
  "estimatedMinutes": 32,
  "applies": ["zimsec"]
}
---
## Introduction

Open up a radio or a phone charger and you find a circuit board crowded with tiny components: striped resistors, cylindrical capacitors, diodes and switches. To build or repair such circuits, you need to read the value of each component and choose parts that can handle the current and power safely.

## Key definitions

:::definition{term="Tolerance"}
The largest percentage by which a resistor's actual resistance may differ from the value marked on it.
:::

:::definition{term="Power rating"}
The greatest power a component can safely transfer (usually as heat) without being damaged.
:::

:::definition{term="Capacitor"}
A component that stores charge (and energy) on two conducting plates separated by an insulator.
:::

:::definition{term="Transducer"}
A device that converts energy from one form to another, such as a non-electrical signal into an electrical one, or the reverse.
:::

## The resistor colour code

Small carbon resistors are marked with coloured bands. Each colour stands for a digit:

| Colour | black | brown | red | orange | yellow | green | blue | violet | grey | white |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Digit | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |

- **First band**: first digit. **Second band**: second digit.
- **Third band**: the **multiplier**, the number of zeros to add.
- **Fourth band**: the **tolerance**: **gold** $\pm 5\%$, **silver** $\pm 10\%$ (brown $\pm 1\%$, red $\pm 2\%$).

:::worked-solution[Reading a resistor]
A resistor has bands yellow, violet, red, gold.

1. Yellow = 4, violet = 7: the digits are 47.
2. Red = 2: add two zeros, giving $4700\ \Omega = 4.7\ \text{k}\Omega$.
3. Gold: tolerance $\pm 5\%$. $5\%$ of $4700$ is $235$, so the true value lies between $4465\ \Omega$ and $4935\ \Omega$.
:::

:::worked-solution[Finding the colour bands]
Which bands mark a $10\ \text{k}\Omega$, $\pm 10\%$ resistor?

1. $10\ \text{k}\Omega = 10\,000\ \Omega$: the digits are 1 and 0, followed by three zeros.
2. Brown (1), black (0), orange (3 zeros), silver ($\pm 10\%$).
:::

## Choosing a suitable power rating

Resistors come with power ratings such as $0.25\ \text{W}$, $0.5\ \text{W}$, $1\ \text{W}$ and $2\ \text{W}$. A resistor that transfers more power than its rating overheats and can burn out. Find the power using $V = IR$ and $P = IV$, then choose a rating **above** it.

:::worked-solution[Will the resistor overheat?]
A current of $0.10\ \text{A}$ flows through a $100\ \Omega$ resistor.

1. $V = IR = 0.10 \times 100 = 10\ \text{V}$.
2. $P = IV = 0.10 \times 10 = 1.0\ \text{W}$.
3. A $0.25\ \text{W}$ or $0.5\ \text{W}$ resistor would overheat; choose one rated above $1.0\ \text{W}$, such as $2\ \text{W}$.
:::

The same idea applies to other components: lamps, LEDs, diodes and transistors all have maximum current, voltage or power ratings that must not be exceeded.

## Capacitors

A capacitor is two metal plates separated by a thin insulating layer. When it is connected to a battery, charge flows onto the plates until the p.d. across the capacitor equals the battery's p.d.; then the current stops. The capacitor **stores** this charge and energy, and can later release it.

- Charging through a resistor takes **time**: the p.d. across the capacitor rises quickly at first and then more and more slowly. A **larger resistance** or a **larger capacitance** makes charging (and discharging) slower.
- **Uses**: **time-delay** circuits (a car's interior light that stays on for a while after the door shuts), **smoothing** rectified d.c., and storing energy for a camera flash.
- Capacitance is measured in farads (F); everyday capacitors are measured in microfarads (μF). **Electrolytic** capacitors must be connected the right way round.

## Reed switches

A **reed switch** is two thin, springy strips (reeds) of a magnetic metal sealed inside a small glass tube, with their ends almost touching. When a **magnet** is brought near, or a current flows in a coil wound round the tube, the reeds are magnetised, **attract each other and touch**, closing the circuit. When the magnet is removed, they spring apart.

Uses include **burglar alarms** (a magnet on a door holds a reed switch on the frame closed; opening the door opens the switch and triggers the alarm), counting the turns of a bicycle wheel, and **reed relays**, where a small coil current operates the switch.

## Transducers

- **Input transducers** change a physical quantity into an electrical signal: microphones (sound), LDRs (light), thermistors (temperature), reed switches (a magnet's presence).
- **Output transducers** change an electrical signal into another form: loudspeakers and buzzers (sound), lamps and LEDs (light), motors (movement), relays (switching).

## Common mistakes

:::mistake{title="The third band is a digit"}
On a four-band resistor the third band is the **multiplier** (the number of zeros), not a third digit.
:::

:::mistake{title="A capacitor lets d.c. flow through"}
Once a capacitor has charged, no steady direct current flows through it: the plates are separated by an insulator.
:::

## Exam tips

:::exam-tip
In colour-code questions, write out the digits and multiplier before calculating, and give the answer with units (Ω, kΩ).
:::

:::exam-tip
To choose a power rating, calculate the actual power first and then pick the next rating **above** it.
:::

## Summary

:::summary
- Resistor colour code: two digit bands, a multiplier band and a tolerance band (gold ±5%, silver ±10%).
- Tolerance gives the range within which the true resistance lies.
- Choose components whose power rating is above the power they will transfer ($P = IV$).
- Capacitors store charge and energy; charging through a resistor takes time, used for time delays and smoothing.
- Reed switches close when magnetised; transducers convert between electrical signals and other forms of energy.
:::
