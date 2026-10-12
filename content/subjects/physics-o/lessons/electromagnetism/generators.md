---
{
  "key": "electromagnetism.generators",
  "title": "The a.c. generator and the d.c. generator",
  "summary": "Describe a simple a.c. generator with slip rings and brushes, interpret its e.m.f.–time graph in terms of the coil's position, and compare it with a d.c. generator that uses a commutator.",
  "concepts": ["phys.em.generators"],
  "objectives": ["cambridge/igcse/physics:4.5.2.1", "cambridge/igcse/physics:4.5.2.2", "zimsec/o-level/physics:13.3.5"],
  "estimatedMinutes": 28
}
---
## Introduction

At Kariba, water rushing through turbines spins enormous generators; at Hwange, steam from burning coal does the same job. Each generator turns kinetic energy into electrical energy by electromagnetic induction, producing the alternating current that reaches our homes at a frequency of $50\ \text{Hz}$.

## Key definitions

:::definition{term="Generator (dynamo)"}
A device that transfers kinetic energy into electrical energy by rotating a coil in a magnetic field (or a magnet inside coils).
:::

:::definition{term="Slip rings"}
Two complete metal rings fixed to the axle of a generator's coil, each connected to one end of the coil, so that brushes can collect an alternating current without the wires twisting.
:::

## The simple a.c. generator

A rectangular coil is turned between the poles of a magnet. As its sides move through the field, they cut field lines and an e.m.f. is induced.

- Each end of the coil is joined to its own **slip ring**; carbon **brushes** press on the rings and connect the coil to the external circuit.
- During one half of each turn, a given side of the coil moves **up** through the field; during the other half it moves **down**. By Fleming's right-hand rule, the induced current therefore **reverses every half turn**: the output is **alternating**.

In power stations the arrangement is usually reversed: an electromagnet spins inside fixed coils. This works in the same way and avoids passing the very large output current through sliding contacts. A bicycle dynamo also spins a magnet inside a coil.

## The e.m.f.–time graph (Cambridge Supplement)

As the coil turns steadily, the induced e.m.f. varies smoothly between a positive peak and a negative peak.

![Output of an a.c. generator against time for a coil turning 25 times a second: the e.m.f. is zero when the coil is vertical, peaks after a quarter turn (0.01 s) when the coil is horizontal, is zero again at half a turn, reaches a trough at three-quarters of a turn, and repeats every 0.04 s, a frequency of 25 Hz.](media:diagrams/generator-emf-time-graph.png "Figure: one turn of the coil gives one cycle of alternating e.m.f.")

| Coil position | Motion of the sides | Induced e.m.f. |
| --- | --- | --- |
| plane of the coil at right angles to the field (vertical) | moving along the field lines, not cutting them | **zero** |
| plane of the coil along the field (horizontal) | cutting field lines at the fastest rate | **maximum** (a peak or a trough) |

Starting from the vertical position, the e.m.f. rises from zero to a **peak** after a quarter turn, falls to **zero** after half a turn, reaches a **trough** (maximum in the opposite direction) after three-quarters of a turn, and returns to zero after one full turn. **One complete turn gives one complete cycle.**

Turning the coil **faster** makes both the **peak e.m.f.** larger and the **frequency** higher (more cycles each second). A stronger magnet or more turns makes the peaks larger without changing the frequency.

:::worked-solution[Frequency of the output]
A generator coil turns 25 times every second.

1. Each turn produces one cycle, so the frequency is $25\ \text{Hz}$.
2. The period is $T = \dfrac{1}{f} = \dfrac{1}{25} = 0.04\ \text{s}$.
3. If the coil turns twice as fast, the frequency doubles to $50\ \text{Hz}$ and the peak e.m.f. also doubles.
:::

## The d.c. generator (ZIMSEC)

Replacing the slip rings with a **split-ring commutator** (as in a d.c. motor) gives a **d.c. generator**. The commutator swaps the connections to the external circuit every half turn, at the moment the induced e.m.f. in the coil reverses. The output always flows the same way round the external circuit, but it still varies in size: its graph is a series of **humps**, all on the same side of the time axis, dropping to zero twice per turn.

| | a.c. generator | d.c. generator |
| --- | --- | --- |
| connection to the coil | two slip rings and brushes | split-ring commutator and brushes |
| output | alternating: reverses every half turn | direct: one direction, varying in size |
| e.m.f.–time graph | waves above and below the axis | humps above the axis only |

## Common mistakes

:::mistake{title="Maximum e.m.f. at the vertical position"}
When the coil is vertical, its sides move parallel to the field lines and cut none: the e.m.f. is **zero**. It is largest when the coil is horizontal.
:::

:::mistake{title="Slip rings and commutators"}
Slip rings give a.c.; a split-ring commutator gives d.c. Do not mix them up.
:::

## Exam tips

:::exam-tip
When sketching the effect of faster rotation on the graph, draw **taller** peaks **and** **more** cycles in the same time.
:::

:::exam-tip
Link each feature of the graph to the coil's position: zero e.m.f. when the coil is vertical, peaks when it is horizontal.
:::

## Summary

:::summary
- A generator induces an e.m.f. by rotating a coil in a magnetic field (or a magnet inside coils).
- Slip rings and brushes give an alternating output; one turn gives one cycle.
- The e.m.f. is zero when the coil is perpendicular to the field and maximum when parallel to it (Cambridge Supplement).
- Faster rotation gives a larger peak e.m.f. and a higher frequency.
- A d.c. generator uses a split-ring commutator, giving an output in one direction only (ZIMSEC).
:::
