---
{
  "key": "hardware.electronic-components",
  "title": "Passive and active electronic components",
  "summary": "How resistors, capacitors, inductors, diodes, LEDs, transistors and integrated circuits work, their units and symbols, Ohm's law in series and parallel circuits, and how to test and replace components on a circuit board.",
  "concepts": ["acs.hardware.electronic-components"],
  "estimatedMinutes": 40,
  "level": "core"
}
---
## Introduction

The phone charger in a Harare kiosk stops working. A technician opens it, checks a few parts with a meter, finds one that has failed and replaces it in minutes. That repair is possible because every circuit board is built from a small family of **components**, each with a known job.

This lesson covers the ZIMSEC Form 5 content on electronic components: the **passive** components (resistor, capacitor, inductor), the **active** components (diode, LED, transistor, integrated circuit), their units and circuit symbols, **Ohm's law** for simple series and parallel circuits, and how to **test and replace** components safely. Logic gates, which are built from transistors, are in the lesson on gates and truth tables.

You should know that current is the flow of charge (measured in amperes), voltage is the push that drives it (volts), and that a circuit needs a complete path.

## Key definitions

:::definition{term="Passive component"}
A component that does not need a power supply to work and cannot amplify or switch a signal: it only stores, resists or releases energy. Resistors, capacitors and inductors are passive.
:::

:::definition{term="Active component"}
A component that controls the flow of current in the circuit, so that it can switch or amplify. Diodes, transistors and integrated circuits are active.
:::

:::definition{term="Ohm's law"}
For a resistor at constant temperature, the voltage across it equals the current through it multiplied by its resistance: V = I × R.
:::

:::definition{term="Integrated circuit (IC)"}
A circuit containing many transistors and other components made on one small piece of silicon and packaged as a single part.
:::

## Passive components

| Component | Unit | What it does | Symbol (in words) |
|---|---|---|---|
| Resistor | ohm (Ω) | Limits the current; shares out voltage | A rectangle (or zigzag line) |
| Capacitor | farad (F) | Stores electric charge and releases it; smooths and blocks steady current | Two short parallel lines with a gap |
| Inductor | henry (H) | A coil that stores energy in a magnetic field and opposes sudden changes of current | A series of loops |

A **resistor** is the basic way to control current. A **variable resistor** (such as a volume control) changes its resistance. A **capacitor** charges when the voltage across it rises and discharges when it falls: it is used to smooth the output of a power supply and in timing circuits. Some capacitors (electrolytic) have a positive and a negative lead and must be fitted the correct way round. An **inductor** resists changes in current, so it is used in filters, in power supplies and in transformers.

## Active components

| Component | What it does | Symbol (in words) |
|---|---|---|
| Diode | Lets current flow in one direction only (forward), blocks it in the other | A triangle pointing at a bar |
| Light-emitting diode (LED) | A diode that gives out light when current flows forward | A diode symbol with two arrows pointing away |
| Transistor | A switch or amplifier: a small current at one lead controls a larger current between the other two | A circle containing a line (base) and two leads (collector and emitter) |
| Integrated circuit | Many transistors on one chip: processors, memory, timers | A rectangle with numbered pins |

A **diode** has an anode (positive) and a cathode (negative, marked by a stripe). It protects circuits from reversed polarity and changes alternating current to direct current. An **LED** is a diode, so it must be connected the right way round, and it needs a series resistor because it cannot limit its own current.

A **transistor** has three leads: base, collector and emitter. As a **switch**, a small current into the base turns the larger collector current fully on; with no base current it is off. A transistor can drive a relay, buzzer or motor from a weak signal, and the logic gates inside a processor are made from transistors. As an **amplifier**, the small base current produces a larger collector current in proportion.

## Ohm's law and simple circuits

:::formula{name="Ohm's law"}
V = I × R, so I = V ÷ R and R = V ÷ I
:::

**Series**: components are in one path. The current is the same everywhere, the voltages add up to the supply, and the resistances add: R = R1 + R2 + R3.

**Parallel**: components are on separate branches. The voltage across each branch is the supply voltage, the currents add up, and 1 ÷ R = 1 ÷ R1 + 1 ÷ R2 + …

:::worked-solution{title="A series circuit"}
Three resistors of 100 Ω, 200 Ω and 300 Ω are in series with a 12 V supply.

1. Total resistance = 100 + 200 + 300 = {{s}} Ω.
2. Current = V ÷ R = 12 ÷ {{s}} = {{iS}} A = {{iSmA}} mA.
3. Voltage across each = current × resistance: {{v1}} V, {{v2}} V and {{v3}} V.
4. Check: {{v1}} + {{v2}} + {{v3}} = 12 V, the supply voltage.
:::

:::worked-solution{title="A parallel circuit"}
A 60 Ω resistor and a 30 Ω resistor are in parallel across a 12 V supply.

1. 1 ÷ R = 1 ÷ 60 + 1 ÷ 30 = 1 ÷ 60 + 2 ÷ 60 = 3 ÷ 60 = 1 ÷ 20, so R = {{p}} Ω.
2. Total current = 12 ÷ {{p}} = {{iP}} A.
3. Branch currents: 12 ÷ 60 = {{i1}} A and 12 ÷ 30 = {{i2}} A, which add to {{iP}} A.
4. The combined resistance (20 Ω) is smaller than the smallest branch (30 Ω), as it must be.
:::

:::worked-solution{title="A series resistor for an LED"}
An LED needs 2 V across it and a current of 20 mA (0.02 A). It is run from a 9 V battery.

1. The resistor must take the rest of the voltage: 9 − 2 = 7 V.
2. R = V ÷ I = 7 ÷ 0.02 = {{led}} Ω.
3. In practice the nearest standard value above this is used so that the current is slightly lower than the limit.
:::

## Testing and replacing components

A **multimeter** is the basic test instrument. Set the dial to the correct function and range, and always check the leads before measuring.

| Test | Method | Result |
|---|---|---|
| Voltage | Probes **across** the component, circuit powered | Reads the potential difference |
| Current | Meter placed **in series** (the circuit is broken to insert it) | Reads the current |
| Resistance | Power **off**; component out of the circuit or one lead lifted | Compare with the value marked or the colour code |
| Continuity | Power off; probes on the two ends of a wire, track or fuse | A buzzer or near-zero reading means the path is complete |
| Diode test | Probes on the diode, then reversed | A small reading one way and no reading the other |

To **replace** a faulty part: switch off and unplug; note the **orientation** (diode stripe, LED flat edge or short lead, electrolytic capacitor stripe, the notch on an IC); remove the old solder with a pump or braid; fit the new part the same way round; solder, trim the lead and test.

**Soldering safety**: use a stand for the hot iron; work in a ventilated place so that the fumes are not breathed in; wear eye protection against splashes; never touch the tip; unplug the iron when finished; wash hands after handling solder.

:::example{title="Finding the fault in a charger"}
A phone charger has no output. The technician unplugs it and tests the fuse for **continuity**: no beep, so the fuse has blown. Before fitting a new fuse of the same rating, the technician checks the nearby diode with the diode test and finds it conducts both ways, so it has failed short. Both parts are replaced, with the diode stripe facing the same way as the old one, and the charger is tested with the meter set to volts.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
This is ZIMSEC Form 5 content (topic 3). Cambridge 9618 does not examine passive and active components, so it is not in the Cambridge papers.
:::

## Common mistakes

:::mistake{title="Measuring resistance in a live circuit"}
Measure resistance with the power off and the component isolated. Parallel parts and the supply will give a false reading.
:::

:::mistake{title="Putting the ammeter across the component"}
A current meter goes in series. Connecting it across a supply is a short circuit.
:::

:::mistake{title="Adding resistances in parallel"}
Only series resistances add. In parallel use the reciprocal formula; the answer is smaller than the smallest branch.
:::

:::mistake{title="Fitting polarised parts the wrong way round"}
Diodes, LEDs, electrolytic capacitors and ICs have a correct orientation. Fitting them the wrong way can destroy them or the circuit.
:::

## Exam tips

:::exam-tip
Paper 2 section A gives a circuit described in words and asks for a calculation. Write the formula, substitute with units and state the answer with its unit. Check parallel answers against the smallest branch.
:::

:::exam-tip
"**Distinguish** a passive from an active component": passive parts only resist, store or release energy and cannot switch or amplify; active parts control current and can switch or amplify.
:::

:::exam-tip
For testing questions, state the function and the connection: "continuity, power off, probes across the two ends of the wire; a buzzer shows a complete path."
:::

## Summary

:::summary
- Passive components (resistor, capacitor, inductor) resist, store or release energy; units ohm, farad, henry.
- Active components (diode, LED, transistor, IC) control current; a transistor is a switch or an amplifier.
- Ohm's law: V = I × R. Series: resistances add and current is shared. Parallel: 1 ÷ R is the sum of 1 ÷ R for each branch and voltage is shared.
- An LED needs a series resistor: R = (supply voltage − LED voltage) ÷ current.
- A multimeter tests voltage, current (in series), resistance and continuity; resistance is measured with power off.
- Replace parts with the same orientation and follow soldering safety rules.
:::
