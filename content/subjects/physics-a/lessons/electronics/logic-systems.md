---
{
  "key": "electronics.logic-systems",
  "title": "Designing combinational logic systems",
  "summary": "Turn a written specification for a control or alarm system into a truth table, a Boolean expression and a circuit of logic gates with sensors as inputs; describe the half adder for adding two binary digits; and describe the bistable latch as a one-bit memory using its truth table.",
  "concepts": ["aphys.electronics.logic-systems"],
  "estimatedMinutes": 45,
  "level": "core"
}
---
## Introduction

A school borehole near Gwanda should pump water only when the storage tank is low and the borehole itself is not dry, but a caretaker must be able to override it. A car should sound a warning if a door is open while the engine is running. Rules like these, stated in words, can be turned step by step into a circuit of logic gates. This is **combinational logic**: the output depends only on the present inputs. At the end of the lesson you meet two circuits that go further: the **half adder**, which does arithmetic, and the **bistable**, which remembers.

You should already know the truth tables of NOT, AND, OR, NAND, NOR and EXOR, and how sensors in potential dividers (with a comparator) give a logic 1 or 0.

## Key definitions

:::definition{term="Combinational logic circuit"}
A logic circuit whose outputs depend only on the present combination of its inputs, with no memory of earlier inputs.
:::

:::definition{term="Boolean expression"}
An algebraic statement of a logic function using the operations NOT (bar), AND (·) and OR (+), for example $Q = \overline{D} \cdot (L + M)$.
:::

:::definition{term="Half adder"}
A logic circuit that adds two single binary digits, giving a sum bit $S$ and a carry bit $C$.
:::

:::definition{term="Bistable (latch)"}
A circuit with two stable output states that stays in the state it was last set to until it is changed by an input, so that it stores one bit of information.
:::

:::formula{name="Half adder"}
$$
S = A \oplus B \qquad C = A \cdot B
$$

$A$, $B$ = the two bits being added; $S$ = sum bit; $C$ = carry bit (worth 2 in the next column).
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Logic systems are ZIMSEC Form 6 only and not in Cambridge 9702 for 2025-2027. The half adder and the bistable are treated here as extensions; scope to be confirmed against the ZIMSEC syllabus.
:::

## Designing from a specification

**Step 1: define the inputs and the output.** Give each a letter and say what logic 1 means. For a sensor this needs care: a light sensor might give 1 in daylight, so "dark" is $\overline{B}$.

**Step 2: write the truth table.** List all $2^{n}$ combinations and decide the output for each from the specification.

**Step 3: write a Boolean expression.** Either read the rule straight from the words ("A and not B" → $A \cdot \overline{B}$), or pick out every row with output 1, write each as an AND of the inputs (inverting those that are 0), and OR these terms together. Simplify where you can.

**Step 4: build the circuit.** Each NOT, AND and OR in the expression becomes a gate. Check the circuit by working out its truth table and comparing it with step 2.

:::worked-solution[A borehole pump controller]
The pump $P$ must run when the tank is low ($L = 1$) or the manual override is pressed ($M = 1$), but never when the borehole sensor shows it is dry ($D = 1$). Design the logic.

1. Inputs L, M, D (each 1 when true); output P = 1 when the pump runs. Three inputs: 8 rows.
2. From the words: P = 1 when (L **or** M) **and not** D.
3. Boolean expression: $P = (L + M) \cdot \overline{D}$.
4. Circuit: L and M go to an OR gate; D goes to a NOT gate; the two outputs go to an AND gate whose output drives the pump through a relay.
5. Check against the table: P = 1 only in the rows 010, 100 and 110.
:::

| L | M | D | P |
|---|---|---|---|
| 0 | 0 | 0 | 0 |
| 0 | 0 | 1 | 0 |
| 0 | 1 | 0 | 1 |
| 0 | 1 | 1 | 0 |
| 1 | 0 | 0 | 1 |
| 1 | 0 | 1 | 0 |
| 1 | 1 | 0 | 1 |
| 1 | 1 | 1 | 0 |

Reading the rows instead gives $P = \overline{L} \cdot M \cdot \overline{D} + L \cdot \overline{M} \cdot \overline{D} + L \cdot M \cdot \overline{D}$, which needs many more gates. Both are correct, but the simplified form is cheaper; a quick check with one or two rows confirms they agree.

**Sensors as inputs.** In a real system each input comes from a sensor stage: an LDR divider with a comparator gives 1 in the dark; a thermistor divider with a comparator gives 1 when hot; a float switch gives 1 when the tank is low. The comparator output must first be brought to the logic levels (0 V and +5 V), for example with a diode and resistor, before it drives a gate.

## The half adder

In binary, $0 + 0 = 0$, $0 + 1 = 1$, $1 + 0 = 1$ and $1 + 1 = 10$ (two): the last case gives sum 0 and **carry 1**. So the sum bit is 1 when exactly one input is 1 (EXOR), and the carry is 1 only when both are (AND).

:::worked-solution[Checking the half adder]
Show that an EXOR gate and an AND gate, both fed with A and B, add two bits.

1. A = 1, B = 1: $S = 1 \oplus 1 = 0$, $C = 1 \cdot 1 = 1$, giving the binary number CS = 10 = two. Correct.
2. A = 1, B = 0: $S = 1$, $C = 0$, giving 01 = one. Correct.
3. The other rows follow the table below; every row gives $2C + S = A + B$.
:::

| A | B | S | C |
|---|---|---|---|
| 0 | 0 | 0 | 0 |
| 0 | 1 | 1 | 0 |
| 1 | 0 | 1 | 0 |
| 1 | 1 | 0 | 1 |

A half adder cannot accept a carry from a previous column; adding numbers of several bits needs **full adders**, each built from two half adders and an OR gate (beyond this lesson).

## The bistable as a one-bit memory

All the circuits so far forget: change the inputs and the output changes. A **bistable** feeds each gate's output back into the other gate. With two NOR gates: the reset input R and the output $\overline{Q}$ go into gate 1, whose output is Q; the set input S and the output Q go into gate 2, whose output is $\overline{Q}$.

| S | R | Q afterwards | Meaning |
|---|---|---|---|
| 1 | 0 | 1 | set |
| 0 | 0 | unchanged | hold (memory) |
| 0 | 1 | 0 | reset |
| 1 | 1 | not used | both outputs forced to 0; avoided |

The important row is S = R = 0: the output stays at whatever it was last set to. A burglar alarm uses this: a door sensor briefly gives S = 1, the latch sets and the siren keeps sounding after the door is closed again, until a key switch gives R = 1. Computer memory stores bits in a similar way.

## Common mistakes

:::mistake{title="Not defining what 1 means"}
"The light sensor input" is ambiguous. State "B = 1 in daylight", and then use $\overline{B}$ for dark.
:::

:::mistake{title="Dropping a NOT from the specification"}
"Unless", "not" and "never when" all need an inverted input. Check the rows where that input is 1.
:::

:::mistake{title="Using OR for the half-adder sum"}
OR gives 1 for $1 + 1$; the sum bit must be 0 there, so it needs EXOR.
:::

:::mistake{title="Calling a bistable combinational"}
A bistable's output depends on its earlier inputs as well as the present ones; it is a memory, not a combinational circuit.
:::

## Exam tips

:::exam-tip{title="Which papers and how"}
ZIMSEC Paper 1 tests reading a specification and the half-adder table; Papers 2 and 3 ask you to *design* a system (inputs defined, truth table, Boolean expression, gates described in words), *explain* how sensors provide the inputs, and *complete* the truth table of a latch or adder. Always finish a design by checking two or three rows of your circuit against the specification.
:::

## Summary

:::summary
- Design: define inputs and output (what 1 means) → truth table → Boolean expression → gates → check.
- Words map to gates: "and" → AND, "or" → OR, "not / unless / never when" → NOT.
- Sensor stages (divider + comparator) provide the logic inputs; a relay lets the output drive a load.
- Half adder: $S = A \oplus B$, $C = A \cdot B$.
- A bistable latch (two cross-coupled NOR gates) sets, resets and holds its output: a one-bit memory.
:::
