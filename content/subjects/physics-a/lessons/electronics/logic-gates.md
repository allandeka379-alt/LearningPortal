---
{
  "key": "electronics.logic-gates",
  "title": "Logic gates and truth tables",
  "summary": "Distinguish digital from analogue signals, state the function and truth table of the NOT, AND, OR, NAND, NOR and EXOR gates, work out the truth table of a combination of gates step by step, and show how NAND or NOR gates alone can be used to build NOT, AND and OR.",
  "concepts": ["aphys.electronics.logic-gates"],
  "estimatedMinutes": 40,
  "level": "core",
  "freePreview": true
}
---
## Introduction

A cell phone, the controller of a traffic light at a Harare intersection, and the timer in a modern maize mill all process information as **digital** signals: voltages that are either high or low, nothing in between. The simplest building blocks of digital electronics are **logic gates**, circuits whose output is high or low depending only on the present combination of their inputs. Millions of them, joined together, make a microprocessor. At A-Level you need to know the six basic gates, write their truth tables, analyse circuits made from several gates, and show why NAND and NOR gates are called universal.

You should already know the idea of a two-state (on/off) signal from O-level, and how a potential divider with a sensor gives a voltage that can be used as an input.

## Key definitions

:::definition{term="Digital signal"}
A signal that can take only a limited number of distinct values; in logic circuits, two states: high (logic 1) and low (logic 0).
:::

:::definition{term="Analogue signal"}
A signal that can vary continuously and take any value within a range.
:::

:::definition{term="Logic gate"}
An electronic circuit with one or more digital inputs and one digital output, whose output state depends only on the present states of its inputs according to a fixed rule.
:::

:::definition{term="Truth table"}
A table listing every possible combination of input states of a logic circuit together with the output state for each combination.
:::

:::definition{term="Universal gate"}
A gate type from which any other logic function can be built using gates of that type only; NAND and NOR are universal.
:::

:::keyfact{title="Logic levels"}
In a 5 V logic family, logic 1 is a voltage near +5 V and logic 0 a voltage near 0 V. A circuit with $n$ inputs has $2^{n}$ input combinations, so its truth table has $2^{n}$ rows.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Logic gates are ZIMSEC Form 6 only (O-level logic gates are assumed known); they are not in Cambridge 9702 for 2025-2027. Scope to be confirmed against the ZIMSEC syllabus.
:::

## The six gates

Circuit symbols cannot be drawn here, so learn them from your textbook in the British/American "distinctive shape" form: AND is a D shape (flat back, round front); OR is a curved shield with a pointed front; NOT is a triangle with a small circle (the "bubble") at its output. A bubble on the output of AND or OR makes NAND or NOR, and an extra curved line at the back of OR makes EXOR.

| Gate | Output is 1 when … | Boolean expression |
|---|---|---|
| NOT (inverter) | the input is 0 | $Q = \overline{A}$ |
| AND | all inputs are 1 | $Q = A \cdot B$ |
| OR | at least one input is 1 | $Q = A + B$ |
| NAND | not all inputs are 1 | $Q = \overline{A \cdot B}$ |
| NOR | no input is 1 | $Q = \overline{A + B}$ |
| EXOR (exclusive OR) | the inputs are different | $Q = A \oplus B$ |

The truth tables for the two-input gates (NOT simply inverts: 0 → 1, 1 → 0):

| A | B | AND | OR | NAND | NOR | EXOR |
|---|---|---|---|---|---|---|
| 0 | 0 | 0 | 0 | 1 | 1 | 0 |
| 0 | 1 | 0 | 1 | 1 | 0 | 1 |
| 1 | 0 | 0 | 1 | 1 | 0 | 1 |
| 1 | 1 | 1 | 1 | 0 | 0 | 0 |

Notice the patterns. NAND is AND inverted, so its column is the AND column with every bit flipped; NOR is OR inverted. EXOR is like OR except when both inputs are 1. List input combinations in binary counting order (00, 01, 10, 11), so that no row is missed.

## Analysing a combination of gates

To find the truth table of a circuit made of several gates:

1. Label the output of every gate with a letter (P, Q, …).
2. Write a column for each input, listing all $2^{n}$ combinations in counting order.
3. Add a column for each intermediate output, working from the inputs towards the final output.
4. The last column is the truth table of the whole circuit.

:::worked-solution[A NAND gate followed by an AND gate]
Inputs A and B go to a NAND gate with output P. P and a third input C go to an AND gate with output Q. Find the truth table and describe when Q = 1.

1. Three inputs give $2^{3} = 8$ rows.
2. P = NAND(A, B): P is 0 only when A = B = 1.
3. Q = AND(P, C): Q is 1 only when P = 1 and C = 1.
4. So Q = 1 when C = 1 **and** A and B are not both 1; in Boolean form $Q = \overline{A \cdot B} \cdot C$.
:::

| A | B | C | P | Q |
|---|---|---|---|---|
| 0 | 0 | 0 | 1 | 0 |
| 0 | 0 | 1 | 1 | 1 |
| 0 | 1 | 0 | 1 | 0 |
| 0 | 1 | 1 | 1 | 1 |
| 1 | 0 | 0 | 1 | 0 |
| 1 | 0 | 1 | 1 | 1 |
| 1 | 1 | 0 | 0 | 0 |
| 1 | 1 | 1 | 0 | 0 |

Use exactly this method in an exam: an intermediate column for every gate earns method marks even if the final column has a slip.

## Equivalent circuits

Two circuits are **equivalent** if their truth tables are identical for every input combination. For example, a NOT gate followed by a NOT gate is equivalent to a plain wire, and an AND gate followed by a NOT gate is equivalent to a NAND gate. To show that two circuits are equivalent, write both truth tables side by side and compare the output columns row by row.

## NAND and NOR as universal gates

Manufacturers often build whole circuits from one type of gate, because a single chip type is cheap and simplifies production. NAND (or NOR) alone can make every other gate.

**NOT from NAND.** Join both inputs together. Then the inputs are always equal: 0, 0 gives 1, and 1, 1 gives 0. The gate inverts.

**AND from NAND.** A NAND gate followed by a NAND gate wired as NOT: inverting NAND gives AND (two gates).

**OR from NAND.** Invert each input with a NAND-as-NOT, then feed both into a third NAND gate.

:::worked-solution[Proving that three NAND gates make OR]
Inputs A and B each go to a NAND gate with its two inputs joined, giving $\overline{A}$ and $\overline{B}$. These go into a third NAND gate with output Q. Show that Q = A OR B.

1. The first two gates act as NOT gates: columns $\overline{A}$ and $\overline{B}$.
2. Q = NAND($\overline{A}$, $\overline{B}$) is 0 only when both $\overline{A}$ and $\overline{B}$ are 1, that is when A = B = 0.
3. So Q = 0 for 00 and Q = 1 otherwise, which is the OR truth table.
:::

| A | B | $\overline{A}$ | $\overline{B}$ | Q |
|---|---|---|---|---|
| 0 | 0 | 1 | 1 | 0 |
| 0 | 1 | 1 | 0 | 1 |
| 1 | 0 | 0 | 1 | 1 |
| 1 | 1 | 0 | 0 | 1 |

The same ideas work with NOR gates: a NOR with joined inputs is a NOT gate; NOR followed by NOT gives OR; and inverting both inputs and feeding them to a NOR gives AND. These results are special cases of **De Morgan's theorem**: $\overline{A \cdot B} = \overline{A} + \overline{B}$ and $\overline{A + B} = \overline{A} \cdot \overline{B}$.

## Common mistakes

:::mistake{title="Confusing OR with EXOR"}
OR gives 1 when **at least one** input is 1, including when both are; EXOR gives 0 when both are 1.
:::

:::mistake{title="Missing rows"}
Three inputs need 8 rows, four inputs 16. Count in binary to be sure every combination appears exactly once.
:::

:::mistake{title="Writing NAND as NOT A AND NOT B"}
$\overline{A \cdot B}$ (NOT of the AND) is not the same as $\overline{A} \cdot \overline{B}$ (which is NOR). Check with the 01 row: NAND gives 1, $\overline{A} \cdot \overline{B}$ gives 0.
:::

:::mistake{title="Treating a gate output as analogue"}
A gate's output is either high or low; it never gives "half" an output when one input is high.
:::

## Exam tips

:::exam-tip{title="Which papers and how"}
ZIMSEC Paper 1 tests single-gate truth tables and identifying a gate from its table. Papers 2 and 3 ask you to *complete* the truth table of a combination (show an intermediate column for each gate), *state* which single gate a combination is equivalent to, and *show* how NAND or NOR gates make NOT, AND or OR (describe the connections in words and support them with a truth table).
:::

## Summary

:::summary
- Digital signals have two states, logic 1 (high) and logic 0 (low); analogue signals vary continuously.
- NOT inverts; AND needs all inputs 1; OR needs at least one; NAND and NOR are AND and OR inverted; EXOR needs the inputs to differ.
- A truth table lists all $2^{n}$ input combinations; analyse combinations gate by gate with an intermediate column for each.
- Circuits are equivalent when their truth tables are identical.
- NAND and NOR are universal: with joined inputs they act as NOT, and combinations of them make AND and OR.
:::
