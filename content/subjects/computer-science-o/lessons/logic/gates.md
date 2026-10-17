---
{
  "key": "logic.gates",
  "title": "Logic gates: NOT, AND, OR, NAND, NOR and XOR",
  "summary": "The six logic gates examined at O-Level: how each symbol looks (described in words), what each gate does, its truth table, and how to recognise a gate from its output pattern.",
  "concepts": ["comp.logic.gates"],
  "estimatedMinutes": 30,
  "level": "core"
}
---
## Introduction

Every time a phone screen lights up, a school bell rings at 07:30 or a borehole pump in Masvingo switches itself off when the tank is full, millions of tiny electronic switches are making decisions. These switches are built into **logic gates**. A logic gate takes one or two binary inputs (each 0 or 1) and produces a single binary output according to a fixed rule.

Logic gates are the building blocks of the processor and of memory. In the examination you must recognise the six standard gates, state the rule each one follows and write out its truth table from memory. Later lessons use these gates to build circuits, complete larger truth tables and write logic expressions, so learn this lesson thoroughly first.

Before you start you should know that a computer represents data in **binary**: 1 usually means "on", "true" or "high voltage", and 0 means "off", "false" or "low voltage".

## Key definitions

:::definition{term="Logic gate"}
An electronic component that applies one logical operation to one or two binary inputs and produces a single binary output.
:::

:::definition{term="Truth table"}
A table that lists every possible combination of input values for a gate or circuit, with the output produced by each combination.
:::

:::definition{term="Logic expression"}
A written statement of what a gate or circuit does, using the operators AND, OR, NOT, NAND, NOR and XOR, for example `X = A AND B`.
:::

:::definition{term="Input combinations"}
With *n* inputs there are $2^n$ different combinations: 2 for one input, 4 for two inputs and 8 for three inputs.
:::

## The six gates

NOT has **one** input. AND, OR, NAND, NOR and XOR each have **two** inputs in the examination. The output is always called X in this course; inputs are A, B and C. In every truth table the inputs are listed in **binary counting order** (00, 01, 10, 11), so that no combination is missed.

![The six logic gate symbols with the output pattern each gives for inputs 00, 01, 10, 11: NOT 10, AND 0001, OR 0111, NAND 1110, NOR 1000, XOR 0110; a bubble at the output means invert](media:diagrams/logic-gate-symbols.png "Figure: the six gate symbols and the output pattern each gives (a bubble means invert)")

### NOT gate (inverter)

**Symbol:** a triangle pointing in the direction of the signal, with a small circle (a "bubble") at its tip. The bubble always means "invert".

**Rule:** the output is the opposite of the input. `X = NOT A`.

| A | X |
|:-:|:-:|
| 0 | 1 |
| 1 | 0 |

### AND gate

**Symbol:** a "D" shape: a straight vertical back where the two inputs enter and a semicircular front leading to the output.

**Rule:** the output is 1 only when input A **and** input B are both 1. `X = A AND B`.

| A | B | X |
|:-:|:-:|:-:|
| 0 | 0 | 0 |
| 0 | 1 | 0 |
| 1 | 0 | 0 |
| 1 | 1 | 1 |

### OR gate

**Symbol:** a curved shield or arrowhead shape: a concave (inward-curved) back where the inputs enter, and two curved sides that meet in a point at the output.

**Rule:** the output is 1 when input A **or** input B (or both) is 1. `X = A OR B`.

| A | B | X |
|:-:|:-:|:-:|
| 0 | 0 | 0 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 1 |

### NAND gate (NOT AND)

**Symbol:** the AND "D" shape with a bubble at the output.

**Rule:** the opposite of AND. The output is 0 only when both inputs are 1. `X = A NAND B`, which means the same as `X = NOT (A AND B)`.

| A | B | X |
|:-:|:-:|:-:|
| 0 | 0 | 1 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 0 |

### NOR gate (NOT OR)

**Symbol:** the OR shape with a bubble at the output.

**Rule:** the opposite of OR. The output is 1 only when both inputs are 0. `X = A NOR B`, the same as `X = NOT (A OR B)`.

| A | B | X |
|:-:|:-:|:-:|
| 0 | 0 | 1 |
| 0 | 1 | 0 |
| 1 | 0 | 0 |
| 1 | 1 | 0 |

### XOR gate (exclusive OR, also written EOR)

**Symbol:** the OR shape with an extra curved line drawn just behind its back, separate from the body, crossing the input wires.

**Rule:** the output is 1 when the inputs are **different**, and 0 when they are the same. `X = A XOR B`.

| A | B | X |
|:-:|:-:|:-:|
| 0 | 0 | 0 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 0 |

:::keyfact{title="Output patterns to memorise (rows 00, 01, 10, 11)"}
- AND: 0001
- OR: 0111
- NAND: 1110
- NOR: 1000
- XOR: 0110
- NOT (rows 0, 1): 10

NAND and NOR are the exact opposites of AND and OR, row by row.
:::

## Worked examples

:::worked-solution[Building the NAND truth table from AND and NOT]
1. A NAND gate behaves like an AND gate followed by a NOT gate, so first work out `A AND B` for each row: 0, 0, 0, 1.
2. Then invert each value with NOT: 1, 1, 1, 0.
3. Write both columns in the table, with the intermediate column first:

| A | B | A AND B | X = NOT (A AND B) |
|:-:|:-:|:-:|:-:|
| 0 | 0 | 0 | 1 |
| 0 | 1 | 0 | 1 |
| 1 | 0 | 0 | 1 |
| 1 | 1 | 1 | 0 |

4. The final column, 1110, matches the NAND pattern, so a NAND gate can always be replaced by an AND gate feeding a NOT gate.
:::

:::worked-solution[Identifying an unknown gate from its outputs]
1. A technician at a workshop in Gweru tests an unlabelled two-input gate. With inputs 00, 01, 10 and 11 in that order, the outputs are 0, 1, 1, 0.
2. The output is 1 in two rows, so the gate is not AND (one row) and not NAND or NOR.
3. It is not OR, because OR gives 1 when both inputs are 1, but this gate gives 0 there.
4. The output is 1 exactly when the inputs differ, so the gate is **XOR**.
:::

:::example
**Choosing a gate for a simple control problem.** In a minibus, a warning buzzer must sound when the engine is running (A = 1) **and** a door is open (B = 1). Only one situation should sound the buzzer, the row where both inputs are 1, so an **AND** gate is needed: `X = A AND B`.

If instead the buzzer should sound when the engine is running **or** a door is open, the OR gate is correct. Reading the problem for the words "and", "or", "not" and "but not both" is the first step in every logic question.
:::

## Where gates are used

Gates are combined in their millions inside a processor to add binary numbers, compare values and decide which instruction to carry out next. Simple control systems use only a few gates: a pump that runs only when the tank is not full (NOT), a machine that starts only when two safety buttons are pressed together (AND), or a stair light that can be switched from either end (XOR). NAND and NOR gates are especially important in industry, because any other gate can be built from NAND gates alone, or from NOR gates alone; flash memory chips are built from NAND or NOR circuits.

:::keyfact{title="ZIMSEC and Cambridge"}
Both syllabuses examine the same six gates and truth tables with up to three inputs. Cambridge 0478 limits every gate except NOT to two inputs and expects expressions written with the words AND, OR, NOT, NAND, NOR and XOR. Some textbooks also write `A.B` for AND, `A + B` for OR and a bar over a letter for NOT; in this course always use the words, which cannot be misread.
:::

## Common mistakes

:::mistake{title="Treating OR as \"one or the other but not both\""}
OR gives 1 when **both** inputs are 1. The gate for "one or the other but not both" is XOR.
:::

:::mistake{title="Forgetting what the bubble does"}
A small circle at a gate's output inverts the result. AND with a bubble is NAND; OR with a bubble is NOR. Do not describe a NAND symbol simply as "an AND gate".
:::

:::mistake{title="Mixing up the XOR and OR symbols"}
The XOR symbol has an extra curved line behind the back of the OR shape. Without that line it is a plain OR gate.
:::

:::mistake{title="Listing inputs in a random order"}
Always count in binary (00, 01, 10, 11). A random order makes it easy to miss or repeat a row, and the examiner's answer key follows binary order.
:::

## Exam tips

:::exam-tip
"**State** the output of a NOR gate when A = 0 and B = 0" needs only the value (1). "**Describe** the function of a NOR gate" needs the rule in words: the output is 1 only when both inputs are 0.
:::

:::exam-tip
When asked to **identify** a gate from a truth table, compare the output column with the patterns AND 0001, OR 0111, NAND 1110, NOR 1000, XOR 0110.
:::

:::exam-tip
Name every gate in capitals exactly as the syllabus does (NAND, not "NOT-AND gate"), and remember that XOR may be printed as EOR.
:::

## Summary

:::summary
- A logic gate applies one logical rule to binary inputs and gives one binary output.
- NOT has one input and inverts it; AND, OR, NAND, NOR and XOR have two inputs.
- AND gives 1 only when both inputs are 1; OR gives 1 when at least one is 1; XOR gives 1 when the inputs differ.
- NAND and NOR are AND and OR followed by NOT: a bubble on the symbol means "invert".
- Truth tables list inputs in binary order; output patterns AND 0001, OR 0111, NAND 1110, NOR 1000, XOR 0110.
:::
