---
{
  "key": "logic.circuits-expressions",
  "title": "Designing logic circuits and writing logic expressions",
  "summary": "Turning a problem statement into a logic expression and a circuit, writing an expression from a circuit or a truth table, and modelling control problems such as alarms and safety interlocks with up to three inputs.",
  "concepts": ["comp.logic.circuits-expressions"],
  "estimatedMinutes": 40,
  "level": "core"
}
---
## Introduction

A grain silo in Gweru must sound an alarm when the temperature is too high and the fan has failed, or when someone presses the emergency button. An engineer cannot build that alarm from a sentence; she needs a precise **logic expression**, and from it a **logic circuit** of gates. This lesson is about moving between the four ways of describing the same logic:

- a **problem statement** in words;
- a **logic expression**, such as `X = (A AND B) OR C`;
- a **logic circuit**, the gates and the wires between them;
- a **truth table**.

Examiners can give you any one of these and ask for another. You already know the six gates and how to complete truth tables; here you put them together.

## Key definitions

:::definition{term="Logic circuit"}
A set of logic gates connected so that the outputs of some gates become inputs of others, producing one final output from the circuit's inputs.
:::

:::definition{term="Logic expression"}
A statement of a circuit's output in terms of its inputs, written with the operators AND, OR, NOT, NAND, NOR and XOR and with brackets to show the order of the gates.
:::

:::definition{term="Problem statement"}
A description in words of when an output (an alarm, a motor, a lamp) must be on, written in terms of the conditions measured by the inputs.
:::

## From a problem statement to an expression

1. **Name the inputs** and decide what 1 means for each (for example A = 1 means "temperature too high").
2. **Find the logical words** in the statement: "and", "or", "not", "either … but not both", "neither … nor".
3. **Group the conditions** with brackets exactly as the sentence groups them. Commas and the word "or" often separate the main groups.
4. **Write the expression** for X.

The circuit is then built gate by gate from the expression: each operator becomes one gate, and each bracket becomes a gate whose output feeds the next gate. Cambridge 0478 expects the circuit to follow the statement as given, **without simplification**, so do not try to remove gates.

:::worked-solution[The grain silo alarm]
Statement: the alarm X sounds when the temperature is too high and the fan has failed, or when the emergency button is pressed.

1. Inputs: A = 1 when the temperature is too high; B = 1 when the fan has failed; C = 1 when the button is pressed.
2. "too high **and** fan failed" is one group: `A AND B`.
3. "**or** button pressed" joins that group to C: `X = (A AND B) OR C`.
4. Circuit: A and B go into an AND gate; its output and C go into an OR gate, whose output is X.
5. Truth table (working column first):

| A | B | C | A AND B | X |
|:-:|:-:|:-:|:-:|:-:|
| 0 | 0 | 0 | 0 | 0 |
| 0 | 0 | 1 | 0 | 1 |
| 0 | 1 | 0 | 0 | 0 |
| 0 | 1 | 1 | 0 | 1 |
| 1 | 0 | 0 | 0 | 0 |
| 1 | 0 | 1 | 0 | 1 |
| 1 | 1 | 0 | 1 | 1 |
| 1 | 1 | 1 | 1 | 1 |

6. Sense check: the button alone (row 001) sounds the alarm; heat with a working fan (row 100) does not.
:::

### Conditions that use "not"

Many statements describe an input being **off**. "The fan is not working" with F = 1 meaning "working" becomes `NOT F`. Choose what 1 means for each input from the question's own table of inputs, and invert with NOT where the condition is the opposite.

## From a circuit to an expression

Start at the **output** and work backwards, or start at the inputs and write the output of each gate in turn, wrapping each gate's output in brackets.

:::worked-solution[Writing the expression for a described circuit]
Circuit: input A goes into a NOT gate. The output of the NOT gate and input B go into an AND gate (output P). Inputs B and C go into a NOR gate (output Q). P and Q go into an OR gate, whose output is X.

1. NOT gate: `NOT A`.
2. AND gate: P = `(NOT A) AND B`.
3. NOR gate: Q = `B NOR C`.
4. OR gate: `X = ((NOT A) AND B) OR (B NOR C)`.
5. Checking with a truth table confirms it:

| A | B | C | P = (NOT A) AND B | Q = B NOR C | X |
|:-:|:-:|:-:|:-:|:-:|:-:|
| 0 | 0 | 0 | 0 | 1 | 1 |
| 0 | 0 | 1 | 0 | 0 | 0 |
| 0 | 1 | 0 | 1 | 0 | 1 |
| 0 | 1 | 1 | 1 | 0 | 1 |
| 1 | 0 | 0 | 0 | 1 | 1 |
| 1 | 0 | 1 | 0 | 0 | 0 |
| 1 | 1 | 0 | 0 | 0 | 0 |
| 1 | 1 | 1 | 0 | 0 | 0 |
:::

## From a truth table to an expression

When you are given only a truth table, use the rows where **X = 1**:

1. For each such row, write an AND term that is true only for that row: an input that is 1 is written as it is; an input that is 0 is written with NOT.
2. Join the terms with OR.

:::worked-solution[Expression from the rows where X = 1]
A truth table has X = 1 in only two rows: A = 0, B = 1, C = 1 and A = 1, B = 1, C = 0. Every other row gives 0.

| A | B | C | X |
|:-:|:-:|:-:|:-:|
| 0 | 0 | 0 | 0 |
| 0 | 0 | 1 | 0 |
| 0 | 1 | 0 | 0 |
| 0 | 1 | 1 | 1 |
| 1 | 0 | 0 | 0 |
| 1 | 0 | 1 | 0 |
| 1 | 1 | 0 | 1 |
| 1 | 1 | 1 | 0 |

1. Row 011: A is 0, B and C are 1, giving the term `(NOT A AND B AND C)`.
2. Row 110: A and B are 1, C is 0, giving `(A AND B AND NOT C)`.
3. Join with OR: `X = (NOT A AND B AND C) OR (A AND B AND NOT C)`.
4. Each term is 1 in exactly one row, so the OR of the two terms is 1 in exactly those two rows. Checking all eight rows with the expression gives the same column, 00010010.
:::

Because 0478 gates have at most two inputs, a term such as `A AND B AND C` is built from two AND gates in a chain: `(A AND B) AND C`. It is still acceptable to write the three-input term in an expression.

## Describing a circuit without a diagram

On this platform you describe circuits in words. Name every gate, say exactly which signals enter it and where its output goes: "B goes into a NOT gate; A and the output of the NOT gate go into an AND gate; …". In a real paper you would draw the same gates using the standard symbols, with each input line labelled A, B or C and the final output labelled X.

:::keyfact{title="ZIMSEC and Cambridge"}
ZIMSEC asks you to model electronic circuits with logic gates; Cambridge asks you to create circuits, truth tables and expressions from each other. Both limit circuits to three inputs. Cambridge requires circuits drawn exactly as stated, with two-input gates (NOT has one), and does not ask you to simplify.
:::

## Common mistakes

:::mistake{title="Losing the grouping"}
"Heat and fan failure, or the button" is `(A AND B) OR C`, not `A AND (B OR C)`. Read where the commas and the word "or" split the sentence.
:::

:::mistake{title="Using a 1 for a condition described as off"}
If B = 1 means "door closed" and the alarm needs the door open, the term is `NOT B`, not `B`.
:::

:::mistake{title="Building terms from the rows where X = 0"}
The AND-then-OR method uses the rows where the output is 1. Using rows with X = 0 produces the opposite circuit.
:::

## Exam tips

:::exam-tip
Before writing any expression, write a short key: "A = 1: temperature too high", and so on. It stops you inverting the wrong input.
:::

:::exam-tip
After writing an expression, test it on two rows from the statement: one where the output must be on and one where it must be off.
:::

:::exam-tip
Use brackets around every gate's output in long expressions. Extra brackets are never wrong; missing ones can change the meaning.
:::

## Summary

:::summary
- Problem statements, expressions, circuits and truth tables describe the same logic; be able to go from any one to another.
- Name the inputs, translate "and", "or", "not" into operators and keep the sentence's grouping in brackets.
- From a circuit, write each gate's output in brackets, working towards X.
- From a truth table, AND together the inputs (NOT for 0) for each row with X = 1, then OR the terms.
- Draw or describe circuits exactly as stated, with two-input gates, without simplifying.
:::
