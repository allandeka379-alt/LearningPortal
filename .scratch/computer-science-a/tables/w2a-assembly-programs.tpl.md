---
{
  "key": "asm.assembly-programs",
  "title": "Writing and tracing assembly language programs",
  "summary": "How to read, trace and write programs in the Cambridge 9618 instruction set: counter-controlled loops, array processing with the index register, comparing and branching, character input and output, and trace tables of ACC, IX and memory.",
  "concepts": ["acs.asm.assembly-programs"],
  "estimatedMinutes": 55,
  "level": "core"
}
---
## Introduction

A pump controller in a borehole station has a few hundred bytes of memory. Its program adds up readings, compares them with a limit and sends a character to a display, and it does all of this with an accumulator and an index register. Being able to **trace** such a program by hand, and to **write** a short one, is a skill that Paper 2 of Cambridge 9618 tests directly.

This lesson shows the small set of patterns from which assembly programs are built: a loop controlled by a counter, a table read with the index register, a comparison followed by a jump, and character input and output. Every program here was run and every trace comes from the run.

You should already know the instruction groups and the symbol table (see the lesson on assembly language and the assembler) and the idea of addressing modes.

## Key definitions

:::definition{term="Trace table (assembly)"}
A table that records, after each instruction is executed, the contents of the registers (ACC and IX) and of the memory locations that change.
:::

:::definition{term="Index register (IX)"}
A register whose contents are added to the address in an indexed instruction such as `LDX`, so that the same instruction can reach each element of a table in turn.
:::

:::definition{term="Loop counter"}
A memory location that holds the number of repeats still to be done; the program decreases it each time round and stops when it reaches zero.
:::

:::keyfact{title="What the instructions do"}
`LDM #n` loads the number n. `LDD addr` loads the contents of addr. `LDX addr` loads the contents of addr + IX. `LDR #n` loads IX with n. `STO addr` stores ACC. `ADD` and `SUB` take a number (`#n`) or an address. `INC` and `DEC` change ACC or IX by 1. `CMP` compares ACC with a number or the contents of an address and sets the flag; `JPE` jumps if the flag says equal, `JPN` if not equal. `IN` puts a typed character's code in ACC and `OUT` shows the character whose code is in ACC.
:::

## The four building blocks

**1. A counter-controlled loop.** Load a count into memory, do the work, decrease the count, compare it with 0 and jump back with `JPN` while it is not zero. The comparison must be made with the value you just stored: after `DEC ACC` and `STO Left`, ACC still holds the new count, so `CMP #0` tests it.

**2. A table and the index register.** Data lines that follow each other in memory form a table. Set IX to 0 with `LDR #0`, use `LDX Table` to read the element at `Table + IX`, and add 1 to IX with `INC IX` to move to the next element.

**3. Comparing and branching.** Only equality is tested: `CMP` sets a flag, `JPE` jumps if the values were equal and `JPN` jumps if they were not. There is no "greater than" jump, so tests for larger or smaller are built from subtraction and equality, or avoided.

**4. Characters.** A character is its code. `IN` stores the code of the typed key in ACC; adding 1 to the code gives the next character in the code table; `OUT` displays the character for the code in ACC.

## Worked example 1: a loop and a table

The program adds four marks held in a table. It starts at address 300.

{{sumListing}}

:::worked-solution{title="Tracing the table-sum program"}
The first pass through the loop, instruction by instruction:

{{sumTrace}}

The state at the end of each pass (at `JPN Next`) is then:

{{passes}}

1. `LDR #0` sets IX to 0, and `Total` is cleared.
2. In each pass `LDX Marks` reads the element at `Marks + IX`: 12, then 7, 20 and 5.
3. `ADD Total` and `STO Total` keep the running total; `INC IX` moves on to the next element.
4. `Left` goes from 4 to 0. When ACC is 0 the comparison is equal, `JPN Next` does not jump, and `END` is reached.
5. The final value of `Total` is 44, and the program runs {{sumSteps}} instructions altogether.
:::

## Worked example 2: characters

This program (from address 400) displays a run of letters.

{{abcListing}}

:::worked-solution{title="Tracing the letter program"}
{{abcTrace}}

1. ACC starts at 65, the code for A. `OUT` shows the letter for the code in ACC.
2. `INC ACC` makes it 66, and `CMP #70` compares with the code for F.
3. While the flag is FALSE, `JPN Again` goes back to `OUT`.
4. When ACC reaches 70 the flag is TRUE, the program does not jump back, and F is never displayed.
5. The output is **ABCDE**.
:::

## Searching a table

A search follows the same pattern, with `CMP Target` comparing ACC with the contents of an address. It stops as soon as the item is found by jumping out of the loop.

{{findListing}}

:::example{title="Finding a value"}
The table `List` holds 31, 18, 44 and 27, and `Target` holds 44. The comparison of each element with the target gives:

{{findPasses}}

On pass 3 the flag is TRUE, so `JPE Found` jumps to `Found`. `Result` is set to 1 and the program ends after {{findSteps}} instructions. If the target were not in the table, the counter would reach 0, `JMP Done` would skip the `Found` lines and `Result` would stay at 0.
:::

## Writing a program: a method

1. **State the task in pseudocode first.** For example: `Total ← 0`, then add each element to `Total` in a loop.
2. **Decide the data.** Give every variable, constant and table a labelled location after `END`, with its starting value.
3. **Build the loop.** Put a label on the first instruction of the loop, update the counter, compare, jump.
4. **Check the exit.** Make sure the loop ends: the counter must reach the value that `CMP` tests.
5. **Trace it** with a small set of data, including the case where the loop runs once.

:::keyfact{title="ZIMSEC and Cambridge"}
Writing and tracing programs in the 9618 instruction set is Cambridge AS content (topic 4.2). ZIMSEC examines addressing modes (see that lesson) and the fetch-decode-execute cycle but does not set programs in this exact instruction set.
:::

## Common mistakes

:::mistake{title="Forgetting that CMP uses ACC"}
`CMP #0` compares the value in ACC at that moment. If another instruction has changed ACC since the count was stored, the test is on the wrong value.
:::

:::mistake{title="Not resetting the index register"}
`LDX Marks` loads the element at `Marks + IX`. If IX is not set with `LDR #0` before the loop, the search or sum starts part-way along the table.
:::

:::mistake{title="Counting the loop one time too few or too many"}
Trace the last pass carefully: the comparison is made after the count has been decreased, so a counter that starts at 4 gives four passes.
:::

:::mistake{title="Putting data before END"}
Data lines placed among the instructions would be executed as instructions. Put variables and tables after `END`.
:::

## Exam tips

:::exam-tip
Cambridge **Paper 1** (short programs) and **Paper 2** ask you to **trace** a program: draw the table with a column for each register and each memory location named in the question, and write a new row every time a value changes. Show every pass of a loop.
:::

:::exam-tip
"**Write** a program" questions give a task and the instruction set. Marks are for initialising IX and totals, a correct loop with a counter, the right use of `LDX` or `CMP`, the correct jump, storing the result and ending with `END`. Add a comment if it makes your intention clear.
:::

:::exam-tip
"**State** the purpose of the program" questions are answered from the trace: say what the final memory contents or output represent, for example "it adds the four marks and stores the total".
:::

## Summary

:::summary
- Assembly programs are built from loops with a counter, tables read with the index register, comparisons with jumps, and character input and output.
- `LDX addr` reads the element at `addr + IX`; `INC IX` moves to the next element; `LDR #0` restarts at the first.
- `CMP` sets a flag and `JPE`/`JPN` jump on equal or not equal; ACC must hold the value being tested.
- A trace table records ACC, IX and every changed memory location after each instruction, one row per instruction.
- Place data and tables after `END` and plan the program in pseudocode before writing it.
:::
