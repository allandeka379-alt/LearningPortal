---
{
  "key": "logic.gates-truth-tables",
  "title": "Logic gates and truth tables",
  "summary": "Describe the NOT, AND, OR, NAND, NOR, XOR (and XNOR) gates, complete their truth tables, identify a gate from its table, and build gates from NAND or NOR.",
  "concepts": [
    "acs.logic.gates-truth-tables"
  ],
  "estimatedMinutes": 40,
  "level": "core"
}
---
## Introduction

A security light on a gate in Gweru switches on only when it is dark and a sensor detects movement. The decision is made by a **logic gate**, a tiny electronic circuit with one or two inputs and one output. Each input and output is either 1 (high, on) or 0 (low, off). Every computer is built from millions of gates. This lesson covers the six main gates, how to describe each with a truth table, how NAND and NOR can build all the others, and how to find the output of a small circuit.

You should know that 1 and 0 stand for the two states of a bit and understand binary counting, because truth tables list inputs in binary order.

## Key definitions

:::definition{term="Logic gate"}
An electronic component that takes one or more binary inputs and gives one binary output according to a fixed logical rule.
:::

:::definition{term="Truth table"}
A table that lists every combination of the inputs of a gate or circuit with the output for each. With n inputs there are 2^n rows.
:::

:::definition{term="Universal gate"}
A gate from which every other gate can be built. NAND and NOR are universal gates.
:::

## The gates and their truth tables

Inputs are called A and B and the output is X. List the rows in binary order: 00, 01, 10, 11.

- **NOT** (inverter) has one input. The output is the opposite of the input. Its symbol is a triangle with a small circle (a "bubble") at the output.
- **AND** gives 1 only if A and B are both 1. Its symbol has a flat back and a rounded front.
- **OR** gives 1 if A or B (or both) is 1. Its symbol has a curved back and a pointed front.
- **NAND** is AND followed by NOT: the AND symbol with a bubble at the output. It gives 0 only when both inputs are 1.
- **NOR** is OR followed by NOT: the OR symbol with a bubble. It gives 1 only when both inputs are 0.
- **XOR** (exclusive OR) gives 1 when the inputs are **different**. Its symbol is the OR symbol with an extra curved line at the back.
- **XNOR** (ZIMSEC detail) is XOR followed by NOT: it gives 1 when the inputs are the **same**.

| A | X = NOT A |
|:-:|:-:|
| 0 | 1 |
| 1 | 0 |

| A | B | AND | OR | NAND | NOR | XOR | XNOR |
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| 0 | 0 | 0 | 0 | 1 | 1 | 0 | 1 |
| 0 | 1 | 0 | 1 | 1 | 0 | 1 | 0 |
| 1 | 0 | 0 | 1 | 1 | 0 | 1 | 0 |
| 1 | 1 | 1 | 1 | 0 | 0 | 0 | 1 |

![The seven logic gate symbols with their truth tables: NOT inverts; AND is 1 only for 11; OR is 0 only for 00; NAND is 0 only for 11; NOR is 1 only for 00; XOR is 1 when A and B differ; XNOR is 1 when they are the same](media:diagrams/logic-gate-symbols.png "Figure: the NOT, AND, OR, NAND, NOR, XOR and XNOR symbols, each with its truth table")

:::keyfact{title="Memorise these outputs"}
AND: 1 only for 11. OR: 0 only for 00. NAND: 0 only for 11. NOR: 1 only for 00. XOR: 1 when the inputs differ (01 and 10). XNOR: 1 when they are the same (00 and 11).
:::

In expressions, write the gate names in capitals: `X = A AND B`, `X = NOT A`, `X = A XOR B`.

## Reading a gate from its truth table

Look at the output column and match its pattern. Count the 1s: one 1 in the last row means AND, one 1 in the first row means NOR, three 1s with a 0 in the last row means NAND, three 1s with a 0 in the first row means OR, and 1s in the middle rows only means XOR.

:::worked-solution{title="Which gate has this truth table?"}
| A | B | X |
|:-:|:-:|:-:|
| 0 | 0 | 1 |
| 0 | 1 | 0 |
| 1 | 0 | 0 |
| 1 | 1 | 0 |

1. The output is 1 in only one row, the first row where A = 0 and B = 0.
2. The gates with a single 1 are AND (row 11) and NOR (row 00).
3. The single 1 is in row 00, so the gate is **NOR**.
:::

## NAND and NOR as universal gates

NAND and NOR can each replace every other gate.

![NAND gates can build every other gate: NOT is a NAND with joined inputs, AND is a NAND followed by a NAND used as NOT, and OR is two NAND-as-NOT gates feeding a third NAND](media:diagrams/logic-nand-universal.png "Figure: NOT, AND and OR built from NAND gates only")

:::worked-solution{title="Build NOT, AND and OR from NAND gates only"}
1. **NOT**: join both inputs of a NAND gate together. X = A NAND A, which is 1 when A = 0 and 0 when A = 1, so it is NOT A.
2. **AND**: put a NAND gate after the first NAND gate, with its inputs joined: X = (A NAND B) NAND (A NAND B). The second gate is a NOT, so the output is NOT (NOT (A AND B)) = A AND B.
3. **OR**: invert each input with a NAND (joined inputs), then NAND the results: X = (A NAND A) NAND (B NAND B).
4. A truth-table check of all three constructions (computed) agrees with the AND and OR tables above.
:::

A NOR gate with its inputs joined is also a NOT gate. This is why chips can be manufactured from only one kind of gate.

## Truth table of a small circuit

To find the truth table of a circuit, add a column for the output of each gate in turn, working from the inputs to the output.

:::worked-solution{title="Complete the truth table for P = A NAND B, Q = A OR B, X = P AND Q"}
1. Two inputs give 2^2 = 4 rows.
2. Work out P (A NAND B) and Q (A OR B) for each row, then X = P AND Q:

| A | B | P = A NAND B | Q = A OR B | X = P AND Q |
|:-:|:-:|:-:|:-:|:-:|
| 0 | 0 | 1 | 0 | 0 |
| 0 | 1 | 1 | 1 | 1 |
| 1 | 0 | 1 | 1 | 1 |
| 1 | 1 | 0 | 1 | 0 |

3. The output X is 1 when the inputs are different, so this circuit behaves as an **XOR** gate.
:::

:::example{title="Applying a gate to a real decision"}
An alarm at a school in Mutare sounds when a door is open (A = 1) **and** the system is armed (B = 1). That is an AND gate. A second alarm should sound when either of two window sensors detects a break: an OR gate. A technician can check the design by writing the truth table and comparing it with what the alarm is meant to do.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards: NOT, AND, OR, NAND, NOR and XOR with two inputs (one for NOT), truth tables for gates and small circuits, and the use of NAND and NOR as universal gates. XNOR is ZIMSEC detail. Building bigger circuits from statements is in the next lesson.
:::

## Common mistakes

:::mistake{title="Confusing OR with XOR"}
OR gives 1 when both inputs are 1; XOR gives 0 for 11. XOR means "one or the other but not both".
:::

:::mistake{title="Listing the rows in the wrong order"}
Use binary order (00, 01, 10, 11). A different order makes it hard to check the table and to compare it with the mark scheme.
:::

:::mistake{title="Forgetting the bubble"}
NAND and NOR are the opposites of AND and OR. If you work out AND and forget to invert the result, every output is wrong.
:::

:::mistake{title="Giving a NOT gate two inputs"}
A NOT gate has exactly one input and its truth table has two rows. The other gates in this lesson have two inputs and four rows.
:::

## Exam tips

:::exam-tip{title="Which papers test this"}
ZIMSEC Paper 1 and Cambridge Paper 1 ask you to complete truth tables, to name a gate from a truth table or description, and to state the output of a gate for given inputs. For **complete**, fill every row. For **identify**, name the gate and give the reason (the pattern of 1s). Write intermediate columns for any circuit with more than one gate.
:::

:::exam-tip{title="Work in columns"}
For a circuit with several gates, add one column for each gate's output and fill the table column by column rather than row by row.
:::

:::exam-tip{title="Use the exact gate names"}
Write NAND, NOR and XOR, not "NOT AND". Use capitals in expressions.
:::

## Summary

:::summary
- A gate has binary inputs and one binary output; a truth table lists all 2^n input combinations.
- AND is 1 only for 11; OR is 0 only for 00; NAND and NOR are their opposites; XOR is 1 when inputs differ; XNOR (ZIMSEC) when they are the same.
- NOT has one input and inverts it.
- NAND and NOR are universal: every other gate can be built from either.
- For a circuit, work out an extra column for each gate from the inputs to the output.
:::
