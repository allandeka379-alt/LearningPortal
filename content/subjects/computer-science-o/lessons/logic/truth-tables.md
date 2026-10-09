---
{
  "key": "logic.truth-tables",
  "title": "Truth tables for logic circuits and expressions",
  "summary": "How to complete a truth table with up to three inputs for a logic expression or a circuit described in words, using intermediate columns, and how to check a circuit's output for one set of inputs.",
  "concepts": ["comp.logic.truth-tables"],
  "estimatedMinutes": 35,
  "level": "core"
}
---
## Introduction

A borehole pump at a farm near Chinhoyi is controlled by three sensors: is the tank full, is there water in the borehole, and is it night (when electricity is cheaper)? Before the controller is built, the engineer must be certain what the pump will do in **every** situation. With three sensors there are eight situations, and the tool that lists all eight is the **truth table**.

Completing a truth table is one of the most reliable sources of marks in both the ZIMSEC and Cambridge papers. You are given a logic expression or a description of a circuit and must fill in the output for each row. The method is mechanical, so with careful working you can score full marks every time.

You should already know the six gates (NOT, AND, OR, NAND, NOR, XOR) and their two-input truth tables.

## Key definitions

:::definition{term="Truth table"}
A table showing the output of a logic circuit or expression for every possible combination of its inputs.
:::

:::definition{term="Intermediate (working) column"}
A column for the output of one gate inside a larger circuit. It is not the final answer, but it lets you work one gate at a time.
:::

:::definition{term="Binary order"}
Listing the input rows as binary numbers counting up from all 0s to all 1s: 000, 001, 010, 011, 100, 101, 110, 111 for three inputs.
:::

## Setting up the table

With three inputs A, B and C there are $2^3 = 8$ rows. A quick way to write them without missing any:

- column C alternates every row: 0, 1, 0, 1, 0, 1, 0, 1;
- column B alternates every two rows: 0, 0, 1, 1, 0, 0, 1, 1;
- column A alternates every four rows: 0, 0, 0, 0, 1, 1, 1, 1.

Each row is then the binary number 0 to 7. Examination truth tables always print the inputs in this order, so keep to it.

## The method

1. **Break the expression or circuit into gates.** Each gate whose output feeds another gate gets an intermediate column. Label them P, Q, and so on, or write the part of the expression as the heading.
2. **Work from the inputs towards the output.** Fill each intermediate column from top to bottom using only that gate's rule.
3. **Combine** the intermediate columns with the last gate to get X.
4. **Check** two or three rows directly from the original expression.

Brackets show the order: in `X = (A OR B) AND NOT C`, the bracket and the NOT are worked out before the final AND. In 0478 papers brackets are always printed when the order matters, so you never need to guess precedence.

## Worked examples

:::worked-solution[Completing the table for X = (A OR B) AND NOT C]
1. The expression has three gates: an OR gate (call its output P = `A OR B`), a NOT gate (Q = `NOT C`) and a final AND gate (X = `P AND Q`).
2. P is 1 whenever A or B is 1: only the rows starting 00 give P = 0.
3. Q is the opposite of C: 1, 0, 1, 0, 1, 0, 1, 0.
4. X is 1 only where both P and Q are 1:

| A | B | C | P = A OR B | Q = NOT C | X |
|:-:|:-:|:-:|:-:|:-:|:-:|
| 0 | 0 | 0 | 0 | 1 | 0 |
| 0 | 0 | 1 | 0 | 0 | 0 |
| 0 | 1 | 0 | 1 | 1 | 1 |
| 0 | 1 | 1 | 1 | 0 | 0 |
| 1 | 0 | 0 | 1 | 1 | 1 |
| 1 | 0 | 1 | 1 | 0 | 0 |
| 1 | 1 | 0 | 1 | 1 | 1 |
| 1 | 1 | 1 | 1 | 0 | 0 |

5. Check row 110: A OR B = 1, NOT C = 1, 1 AND 1 = 1. The table agrees.
:::

:::worked-solution[Completing the table for a circuit described in words]
The circuit: inputs A and B go into a NAND gate (output P). Inputs B and C go into an XOR gate (output Q). P and Q go into an AND gate, whose output is X. As an expression, `X = (A NAND B) AND (B XOR C)`.

1. P (NAND) is 0 only when A = 1 and B = 1, which happens in rows 110 and 111.
2. Q (XOR) is 1 when B and C are different: rows 001, 010, 101 and 110.
3. X = P AND Q is 1 only where P = 1 and Q = 1:

| A | B | C | P = A NAND B | Q = B XOR C | X |
|:-:|:-:|:-:|:-:|:-:|:-:|
| 0 | 0 | 0 | 1 | 0 | 0 |
| 0 | 0 | 1 | 1 | 1 | 1 |
| 0 | 1 | 0 | 1 | 1 | 1 |
| 0 | 1 | 1 | 1 | 0 | 0 |
| 1 | 0 | 0 | 1 | 0 | 0 |
| 1 | 0 | 1 | 1 | 1 | 1 |
| 1 | 1 | 0 | 0 | 1 | 0 |
| 1 | 1 | 1 | 0 | 0 | 0 |

4. Notice row 110: Q is 1, but P is 0, so X is 0. Keeping separate P and Q columns is what makes a row like this easy to get right.
:::

:::example
**Checking one row only.** A question may ask: "State the output X of the circuit above when A = 1, B = 0 and C = 1." You do not need the whole table. Trace the signals through each gate: P = 1 NAND 0 = 1; Q = 0 XOR 1 = 1; X = 1 AND 1 = 1. The output is 1, which matches row 101 of the table.

Tracing one row like this is also the fastest way to check a table you have completed.
:::

## Reading a circuit description

Because no diagrams are printed in this course, circuits are described gate by gate. Read each sentence and note three things: which gate, which inputs go in, and where its output goes. Then write the expression from the output backwards. For example, "A goes into a NOT gate; its output and B go into an OR gate whose output is X" becomes `X = (NOT A) OR B`. Once you have the expression, the truth-table method is the same.

:::keyfact{title="ZIMSEC and Cambridge"}
Both syllabuses ask for truth tables with up to three inputs. Cambridge tables are printed with the inputs already filled in and a column for X; working columns are allowed and often earn the marks when the final column has a slip. An eight-row table is often worth fewer marks than it has rows (for example 4 marks), so a single wrong row can cost a whole mark.
:::

## Common mistakes

:::mistake{title="Doing the whole expression in your head"}
Working three gates at once causes careless errors. Write an intermediate column for each gate, then combine.
:::

:::mistake{title="Applying NOT to the wrong part"}
`NOT (A AND B)` inverts the result of the AND (it is NAND). `(NOT A) AND B` inverts only A before the AND. These give different tables, so look closely at the brackets.
:::

:::mistake{title="Treating OR as XOR in a row with both inputs 1"}
For 1 OR 1 the answer is 1. Many students write 0 because they think of "one or the other". Only XOR gives 0 there.
:::

:::mistake{title="Rows out of order"}
If your rows are not in binary order, your column will not match the printed table even if each row is correct.
:::

## Exam tips

:::exam-tip
Use the space beside a printed truth table for working columns. If the question gives you a table with only A, B, C and X, still write P and Q next to it.
:::

:::exam-tip
After completing a table, count the 1s in X and check one row with a 1 and one row with a 0 by tracing through the circuit.
:::

:::exam-tip
"**Complete** the truth table" needs only the output column. "**State** the output when A = 1, B = 1, C = 0" needs one value: do not copy out the whole table.
:::

## Summary

:::summary
- A truth table lists every input combination: $2^n$ rows for *n* inputs, in binary order.
- Break an expression or circuit into gates and give each inner gate its own working column.
- Work from the inputs towards the output, one gate and one column at a time.
- Brackets decide the order; `NOT (A AND B)` is not the same as `(NOT A) AND B`.
- Check rows by tracing the signals through the gates for that combination of inputs.
:::
