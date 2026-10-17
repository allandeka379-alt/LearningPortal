---
{
  "key": "electronics.logic-gates",
  "title": "Logic gates",
  "summary": "Describe the NOT, AND, OR, NAND and NOR gates, their symbols and truth tables, and work out the output of simple combinations of gates used in control circuits.",
  "concepts": ["phys.electronics.logic-gates"],
  "objectives": ["zimsec/o-level/physics:logic-gates.1"],
  "estimatedMinutes": 30,
  "applies": ["zimsec"]
}
---
## Introduction

An automatic irrigation system should switch the pump on only when the soil is dry **and** it is night. A car's warning buzzer should sound if the driver's door is open **or** a seat belt is unfastened. Decisions like these are made electronically by **logic gates**, the building blocks of every calculator, phone and computer.

## Key definitions

:::definition{term="Digital signal"}
A signal that has only two levels: **high** (logic **1**, for example about $5\ \text{V}$) and **low** (logic **0**, about $0\ \text{V}$).
:::

:::definition{term="Logic gate"}
An electronic switching circuit with one or more inputs and one output, where the output (1 or 0) depends on the inputs according to a fixed rule.
:::

:::definition{term="Truth table"}
A table listing every possible combination of inputs to a gate (or circuit) and the output for each.
:::

## The five gates

The symbols below are the shapes used in most textbooks and exam papers.

![Symbols of the five logic gates: NOT is a triangle with a small circle; AND is a D shape; OR is a curved shield shape; NAND is an AND symbol with a small circle on its output; NOR is an OR symbol with a small circle on its output.](media:diagrams/logic-gate-symbols.png "Figure: the five logic gate symbols")

### NOT gate (inverter)

- **Symbol**: a triangle pointing in the direction of the signal, with a small circle at its tip.
- **Rule**: the output is the **opposite** of the input.

| A | Output |
| --- | --- |
| 0 | 1 |
| 1 | 0 |

### AND gate

- **Symbol**: a D shape: a flat back where the two inputs enter and a rounded front with the output.
- **Rule**: the output is 1 only if input A **and** input B are both 1.

| A | B | Output |
| --- | --- | --- |
| 0 | 0 | 0 |
| 0 | 1 | 0 |
| 1 | 0 | 0 |
| 1 | 1 | 1 |

### OR gate

- **Symbol**: a curved, shield-like shape with a concave back where the inputs enter, coming to a point at the output.
- **Rule**: the output is 1 if input A **or** input B (or both) is 1.

| A | B | Output |
| --- | --- | --- |
| 0 | 0 | 0 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 1 |

### NAND gate (NOT AND)

- **Symbol**: the AND symbol with a small circle at the output.
- **Rule**: the opposite of AND: the output is 0 only if both inputs are 1.

| A | B | Output |
| --- | --- | --- |
| 0 | 0 | 1 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 0 |

### NOR gate (NOT OR)

- **Symbol**: the OR symbol with a small circle at the output.
- **Rule**: the opposite of OR: the output is 1 only if both inputs are 0.

| A | B | Output |
| --- | --- | --- |
| 0 | 0 | 1 |
| 0 | 1 | 0 |
| 1 | 0 | 0 |
| 1 | 1 | 0 |

## Combining gates

The output of one gate can feed the input of another. Work through a combination **one gate at a time**, adding a column to the truth table for each intermediate signal.

:::worked-solution[A NOT gate feeding an AND gate]
Input A passes through a NOT gate to give C. C and a second input B go into an AND gate, giving the output Q.

| A | B | C = NOT A | Q = C AND B |
| --- | --- | --- | --- |
| 0 | 0 | 1 | 0 |
| 0 | 1 | 1 | 1 |
| 1 | 0 | 0 | 0 |
| 1 | 1 | 0 | 0 |

1. Find C for each row by inverting A.
2. Q is 1 only where both C and B are 1: only when A = 0 and B = 1.
:::

## Logic in control circuits

Sensors provide the inputs and an output device (through a relay if it needs a large current) is switched by the output.

:::example{title="An automatic irrigation pump"}
A moisture sensor gives logic 1 when the soil is **dry**. A light sensor (an LDR in a potential divider) gives logic 1 when it is **dark**. Feeding both into an **AND** gate gives an output of 1, switching the pump on through a relay, only when the soil is dry **and** it is night, so less water is lost by evaporation.
:::

:::example{title="A door-open warning"}
Two door switches each give logic 1 when their door is open. An **OR** gate sounds a buzzer if either door, or both, is open.
:::

## Common mistakes

:::mistake{title="OR means only one"}
An OR gate's output is 1 when **either or both** inputs are 1. Only the exclusive-OR gate (not in this course) gives 0 for two 1s.
:::

:::mistake{title="Forgetting the NOT in NAND and NOR"}
NAND and NOR outputs are the exact opposites of AND and OR. Work out AND or OR first, then invert.
:::

## Exam tips

:::exam-tip
A gate with two inputs has four rows in its truth table; with three inputs, eight rows. List the inputs in binary order: 00, 01, 10, 11.
:::

:::exam-tip
For combinations, add a labelled column for each intermediate point before finding the final output.
:::

## Summary

:::summary
- Digital signals have two levels: 1 (high) and 0 (low).
- NOT inverts; AND gives 1 only if all inputs are 1; OR gives 1 if any input is 1.
- NAND and NOR are the inverses of AND and OR.
- Truth tables list every input combination and its output.
- Gates can be combined, with sensors as inputs, to make control and alarm circuits.
:::
