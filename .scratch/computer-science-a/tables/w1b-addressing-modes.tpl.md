---
{
  "key": "asm.addressing-modes",
  "title": "Addressing modes",
  "summary": "Immediate, direct, indirect, indexed and relative addressing: how the operand is interpreted, how the effective address is found from register and memory contents, which 9618 instructions use each mode, and when each mode is useful.",
  "concepts": ["acs.asm.addressing-modes"],
  "estimatedMinutes": 45,
  "level": "core"
}
---
## Introduction

A teacher in Gweru keeps pupils' marks in a table in memory and wants a program to add up the marks. If the program had to name each mark by its address, it would need one instruction per pupil. With the right **addressing mode**, one short loop can step through the whole table.

The operand of an instruction can mean several things: a number to use, the address of a number, the address of an address, or an address calculated from a register. The way the operand is interpreted is the **addressing mode**. This lesson covers the five modes: **immediate, direct, indirect, indexed and relative**, shows how the effective address is formed, names the instructions that use each mode and explains when to choose each.

You should already know the accumulator and the index register (IX), and the structure of an assembly instruction (opcode and operand).

## Key definitions

:::definition{term="Addressing mode"}
The way in which the operand of an instruction is used to find the data that the instruction works on.
:::

:::definition{term="Effective address"}
The address of the memory location that is actually used by an instruction, after the addressing mode has been applied.
:::

:::definition{term="Index register (IX)"}
A register whose contents are added to the address in an instruction to give the effective address.
:::

## The five modes

| Mode | The operand is... | Effective address | Example (9618) |
|---|---|---|---|
| Immediate | the value itself | none: no memory access | `LDM #7`, `ADD #5`, `CMP #0` |
| Direct | the address of the value | the operand | `LDD Val`, `STO Total`, `ADD Price` |
| Indirect | the address of a location that holds the address of the value | the contents of the operand location | `LDI Ptr`, `CMI Ptr` |
| Indexed | a base address, to which IX is added | operand + contents of IX | `LDX Table` |
| Relative | an offset from the current address | address of the instruction + offset | `JMP +5`, `JMP -3` (notation used in this lesson) |

## Immediate, direct and indirect

**Immediate**: `LDM #7` puts the number 7 in the accumulator. The 7 is part of the instruction, so it takes no memory access and is used for constants.

**Direct**: `LDD Val` reads the contents of the location called `Val`. The operand is an address. It is used for variables.

**Indirect**: `LDI Ptr` treats the contents of `Ptr` as an address. First `Ptr` is read, which gives an address; then that address is read to get the data. A location that holds an address is called a **pointer**. Changing the pointer changes which data the same instruction reaches.

## Indexed addressing

`LDX Table` adds the contents of the **index register** to the address `Table` to give the effective address. If IX holds 0 the first item is read, if IX holds 1 the next, and so on. Setting IX with `LDR #2` or `MOV IX` (copying the accumulator into IX) and adding 1 with `INC IX` lets a short loop work through an array.

## A program using four modes

The program below has data after the instructions. `Ptr` contains 208, the address of `Item`.

{{listing}}

:::worked-solution{title="Accumulator and index register as the program runs"}
{{trace}}

{{modes}}

1. `LDM #7`: immediate. The accumulator becomes 7 without any memory read.
2. `LDD Val`: direct. The operand is the address {{valAddr}} and the contents are 12.
3. `LDI Ptr`: indirect. The contents of address 207 are {{eaInd}}, so the effective address is {{eaInd}} and the value there is {{valInd}}.
4. `LDR #2` sets IX = 2. `LDX Table`: the effective address is 209 + 2 = {{eaIdx}} and the value there is {{valIdx}}, the third item of the table.
:::

## Relative addressing

In **relative** addressing the operand is an **offset** added to the address of the current instruction to find the address of the next one. A positive offset jumps forward and a negative offset jumps back. (The 9618 instruction set jumps to absolute addresses; this lesson writes `JMP +5` as a notation to show the idea, with the offset counted from the address of the jump instruction itself.)

{{relTable}}

The great advantage is that a program that uses relative jumps works wherever it is loaded in memory. A loop that jumps back two places does so from any starting address, while an absolute jump to address 640 would go to the wrong place if the program were loaded at 900. This is called **position-independent code**.

{{posTable}}

## Choosing a mode

| Need | Best mode | Reason |
|---|---|---|
| A constant such as 0 or 100 | Immediate | No memory access, value is in the instruction |
| A single variable such as a total | Direct | Simple and fast; the address is fixed |
| A value reached through a pointer | Indirect | The pointer can be changed to reach different data |
| Each item of an array or table in turn | Indexed | Change IX instead of rewriting the instruction |
| A branch that must work wherever the program is loaded | Relative | The offset does not depend on the address |

:::example{title="Adding up marks in a table"}
The marks of ten pupils are in ten consecutive locations starting at `Marks`. The program sets IX to 0, adds the item at `Marks + IX` to the total using `LDX Marks`, increases IX with `INC IX`, compares IX with 10 and loops until all ten are added. With direct addressing the programmer would need ten separate `LDD` instructions, one for each address. Indexed addressing makes the same four instructions work for ten pupils or for a thousand.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards expect immediate, direct, indirect, indexed and relative addressing, and the calculation of the effective address from the contents of registers and memory. Cambridge uses the 9618 instruction names (`LDM`, `LDD`, `LDI`, `LDX`, `CMI`); ZIMSEC describes the modes in general terms.
:::

## Common mistakes

:::mistake{title="Confusing immediate and direct"}
`LDM #7` loads the number 7. `LDD 7` loads the contents of the location with address 7.
:::

:::mistake{title="Stopping after the first read in indirect addressing"}
Indirect addressing needs two reads: the pointer first, then the location the pointer gives. The first value is an address, not the data.
:::

:::mistake{title="Forgetting to add IX in indexed addressing"}
The effective address is the operand **plus** the contents of IX. If IX holds 2, `LDX 209` reads address 211.
:::

:::mistake{title="Counting a relative offset from the wrong place"}
Check which convention the question states. In this course's questions the offset is counted from the address of the jump instruction itself.
:::

## Exam tips

:::exam-tip
For an effective-address question, write the steps: "IX = 2, operand 209, so the effective address is 209 + 2 = 211; the contents of 211 are 37."
:::

:::exam-tip
Use the right mnemonic for the mode: `LDM` for immediate, `LDD` for direct, `LDI` for indirect, `LDX` for indexed. A question that asks for the mode of a given instruction is answered from the mnemonic and the `#` sign.
:::

:::exam-tip
"**Explain** why indexed addressing is useful": the same instruction reaches successive array elements as IX changes, so a loop can process the array. Mention arrays or tables.
:::

## Summary

:::summary
- Immediate: the operand is the value. Direct: the operand is the address of the value.
- Indirect: the operand is the address of a pointer that holds the address of the value.
- Indexed: effective address = operand + IX; used for arrays and tables.
- Relative: address of the next instruction = current address + offset; allows position-independent code.
- Choose the mode that fits the need: constants, variables, pointers, arrays, loops that must work anywhere in memory.
:::
