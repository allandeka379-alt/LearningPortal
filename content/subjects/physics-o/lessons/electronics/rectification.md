---
{
  "key": "electronics.rectification",
  "title": "Rectification",
  "summary": "Define rectification and explain half-wave and full-wave (bridge) rectification and smoothing with a capacitor, using voltage–time graphs.",
  "concepts": ["phys.electronics.rectification"],
  "objectives": ["zimsec/o-level/physics:14.3.1", "zimsec/o-level/physics:14.3.2"],
  "estimatedMinutes": 25,
  "applies": ["zimsec"]
}
---
## Introduction

The mains supply is alternating current, but a phone battery, a laptop and a radio all need direct current. A phone charger therefore does two jobs: a transformer (or electronic circuit) reduces the voltage, and diodes **rectify** the a.c., making it flow in one direction only.

## Key definitions

:::definition{term="Rectification"}
The conversion of alternating current (a.c.) into direct current (d.c.).
:::

:::definition{term="Rectifier"}
A circuit, made of one or more diodes, that carries out rectification.
:::

:::definition{term="Smoothing"}
Reducing the rise and fall of a rectified voltage, usually with a capacitor, so that it is closer to a steady d.c.
:::

## The a.c. input

On a voltage–time graph, an a.c. supply is a smooth wave: the voltage rises to a positive peak, falls through zero to a negative peak, and returns to zero, $50$ times every second for the mains.

## Half-wave rectification

A single diode is connected in series with the load (for example a resistor).

- During each **positive** half-cycle, the diode is forward biased and current flows through the load.
- During each **negative** half-cycle, the diode is reverse biased and **no** current flows.

**Output graph**: a row of positive humps with **gaps** (flat lines along the zero axis) between them, one hump per cycle. Half of the input wave is wasted, and the output is very uneven.

## Full-wave (bridge) rectification

Four diodes are arranged in a **bridge** (a diamond shape). The a.c. supply is connected across two opposite corners and the load across the other two.

- During one half-cycle, two of the diodes conduct, and current flows through the load in one direction.
- During the next half-cycle, the **other two** diodes conduct, and current flows through the load in the **same** direction again.

**Output graph**: a continuous row of positive humps with **no gaps**, two humps per cycle of the input. For the $50\ \text{Hz}$ mains, the output has $100$ humps each second.

:::example{title="Tracing the current in a bridge"}
Label the diodes A, B, C and D around the bridge. When the top supply terminal is positive, current flows through diode A, down through the load from X to Y, and back through diode C to the bottom terminal. When the bottom terminal is positive, current flows through diode B, again from X to Y through the load, and back through diode D. In both half-cycles the current in the load flows from X to Y: the output is d.c.
:::

## Smoothing with a capacitor

A large **capacitor** connected in parallel with the load stores charge. It charges up as the rectified voltage rises to each peak, then, as the voltage falls, it discharges slowly through the load, keeping the voltage up until the next hump arrives. The output becomes a nearly steady d.c. with only a small **ripple**. A larger capacitor gives smoother d.c.

| Output | Shape of the voltage–time graph |
| --- | --- |
| half-wave | separate humps with gaps between them |
| full-wave | continuous humps, twice as many |
| full-wave smoothed | almost flat line with a small ripple |

## Common mistakes

:::mistake{title="One diode gives full-wave output"}
A single diode gives **half-wave** rectification. Full-wave rectification needs a bridge of four diodes (or a special transformer with two diodes).
:::

:::mistake{title="Rectified means steady"}
Rectified d.c. flows one way but still rises and falls. It needs smoothing to become nearly steady.
:::

## Exam tips

:::exam-tip
Sketch the input wave and the output underneath it on the same time scale, so the examiner can see which half-cycles are used.
:::

:::exam-tip
For full-wave rectification, say which pair of diodes conducts in each half-cycle and that the current through the load is in the same direction both times.
:::

## Summary

:::summary
- Rectification converts a.c. into d.c. using diodes.
- Half-wave: one diode; only the positive half-cycles pass; humps with gaps.
- Full-wave: a bridge of four diodes; both half-cycles pass in the same direction; continuous humps.
- A capacitor in parallel with the load smooths the output to a nearly steady d.c.
- Chargers and power supplies use rectifiers to run d.c. devices from the a.c. mains.
:::
