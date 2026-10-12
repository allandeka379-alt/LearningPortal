---
{
  "key": "asm.assembly-language",
  "title": "Assembly language, machine code and the assembler",
  "summary": "The relationship between assembly language and machine code, the groups of instructions in the 9618 instruction set, how a two-pass assembler builds a symbol table and generates code, and the advantages and uses of low-level languages.",
  "concepts": ["acs.asm.assembly-language"],
  "estimatedMinutes": 50,
  "level": "core"
}
---
## Introduction

Inside the controller of a prepaid electricity meter, a processor with only a few kilobytes of memory must read the meter, add up units and switch the supply, all on a few watts. The engineers who wrote that program may have written it in **assembly language**: instructions such as `LDD`, `ADD` and `STO` that correspond almost one for one to what the processor actually does.

This lesson explains how assembly language relates to **machine code**, which kinds of instruction exist, how an **assembler** turns the text into binary in two passes, and where low-level languages are still used. Writing and tracing whole assembly programs is in the lesson that follows; here you meet the language, the groups of instructions and the translation.

You should already know the fetch-decode-execute cycle and the registers (PC, ACC, IX, MAR, MDR), and how to read binary and hexadecimal.

## Key definitions

:::definition{term="Machine code"}
The binary instructions that a processor can execute directly; each consists of an opcode and, usually, an operand.
:::

:::definition{term="Assembly language"}
A low-level language in which each instruction is written as a short word, a mnemonic, with labels and symbolic addresses, and which has one instruction for each machine-code instruction.
:::

:::definition{term="Assembler"}
A program that translates assembly language into machine code.
:::

:::definition{term="Opcode and operand"}
The opcode says what operation to carry out; the operand gives the data or the address that the operation works on.
:::

## From machine code to assembly language

A machine-code instruction is a pattern of bits, for example `00000010 01110001`. Nobody wants to write programs this way. In assembly language the same instruction is written `LDD Count`, which is easier to read and remember. The two are related **one to one**: each assembly instruction becomes exactly one machine-code instruction. Assembly language also uses:

- **mnemonics** such as `LDD` (load direct) and `ADD` for the opcodes;
- **labels**, names for the addresses of instructions or data, such as `Loop` or `Total`;
- **symbolic addresses**: the programmer writes `Total`, and the assembler works out the real address;
- **data definitions**, such as `Count: 4`, which reserve a location holding the value 4.

Different processors have different instruction sets, so assembly language is specific to a processor family. This course uses the Cambridge 9618 instruction set, which has an accumulator (`ACC`) and an index register (`IX`).

## Groups of instructions

| Group | Instructions | What they do |
|---|---|---|
| Data movement | `LDM #n`, `LDD addr`, `LDI addr`, `LDX addr`, `LDR #n`, `MOV IX`, `STO addr` | Load a number or the contents of an address into the ACC (directly, indirectly or indexed); load the IX; copy the ACC to the IX; store the ACC at an address |
| Input and output | `IN`, `OUT` | Take a character into the ACC from the keyboard; send the character in the ACC to the screen |
| Arithmetic | `ADD`, `SUB`, `INC`, `DEC` | Add or subtract a number or the contents of an address; add or subtract 1 from a register |
| Unconditional jump | `JMP addr` | Load the PC with the address so that the next instruction comes from there |
| Compare and conditional jump | `CMP`, `CMI`, `JPE addr`, `JPN addr` | Compare the ACC with a value and set a flag; jump if the comparison was equal, or if it was not equal |
| End | `END` | Stop the program |

Bitwise instructions (`AND`, `OR`, `XOR`, `LSL`, `LSR`) have their own lesson. Instructions are grouped like this because the processor's circuits for each group are similar, and a program is built from these few groups: move data, calculate, test and jump.

## The two-pass assembler

An assembler reads the program twice because a jump may refer to a label that appears later in the program (a **forward reference**), and its address is not yet known when the jump is first read.

**Pass 1** reads each line and gives it an address, starting at the first. When it finds a label it enters the label and its address in the **symbol table**. It does not yet need the address of a label used before its definition.

**Pass 2** goes through the program again. It replaces each mnemonic with its opcode and each label or symbolic address with the address from the symbol table, and writes out the machine code.

The program below adds the numbers from `Count` down to 1 into `Total`. It begins at address 100.

| Address | Label | Instruction or data |
|:-:|:-:|:-:|
| 100 |  | `LDD Count` |
| 101 |  | `CMP #0` |
| 102 |  | `JPE Done` |
| 103 | Loop | `LDD Total` |
| 104 |  | `ADD Count` |
| 105 |  | `STO Total` |
| 106 |  | `LDD Count` |
| 107 |  | `DEC ACC` |
| 108 |  | `STO Count` |
| 109 |  | `CMP #0` |
| 110 |  | `JPN Loop` |
| 111 | Done | `LDD Total` |
| 112 |  | `END` |
| 113 | Count | `4` |
| 114 | Total | `0` |

**Pass 1** gives the symbol table:

| Label | Address (denary) | Address (hex) |
|:-:|:-:|:-:|
| Loop | 103 | 67 |
| Done | 111 | 6F |
| Count | 113 | 71 |
| Total | 114 | 72 |

The jump `JPE Done` on line 102 refers to `Done` before it is defined: the assembler cannot fill in the operand until the whole program has been read. In **pass 2**, with the table complete, the code is generated. The opcodes below are invented for this lesson (a real processor has its own).

:::worked-solution{title="Pass 2: generating machine code"}
| Address | Instruction | Opcode (hex) | Operand (hex) | Operand meaning |
|:-:|:-:|:-:|:-:|:-:|
| 100 | `LDD Count` | 02 | 71 | address of Count |
| 101 | `CMP #0` | 06 | 00 | the number itself |
| 102 | `JPE Done` | 07 | 6F | address of Done |
| 103 | `LDD Total` | 02 | 72 | address of Total |
| 104 | `ADD Count` | 04 | 71 | address of Count |
| 105 | `STO Total` | 03 | 72 | address of Total |
| 106 | `LDD Count` | 02 | 71 | address of Count |
| 107 | `DEC ACC` | 0A | 00 | not used |
| 108 | `STO Count` | 03 | 71 | address of Count |
| 109 | `CMP #0` | 06 | 00 | the number itself |
| 110 | `JPN Loop` | 08 | 67 | address of Loop |
| 111 | `LDD Total` | 02 | 72 | address of Total |
| 112 | `END` | 0C | 00 | not used |
| 113 | `4` |  | 04 | the stored value |
| 114 | `0` |  | 00 | the stored value |

1. `JPE Done` has opcode 07. The symbol table gives `Done` the address 111, which is 6F in hexadecimal, so the instruction is 07 6F.
2. `CMP #0` has an immediate operand, so the number 0 itself is placed in the operand.
3. `DEC ACC` and `END` need no operand, so the operand byte is 00.
4. The data lines are not instructions: addresses 113 and 114 simply hold the values 4 and 0.
5. When run, the program stores 10 (4 + 3 + 2 + 1) in `Total`.
:::

## Advantages and uses of low-level languages

**Advantages**: the programmer controls exactly what the processor does, so programs can be small and very fast; direct access to registers, memory addresses and hardware; use of special processor features.

**Disadvantages**: programs are long and hard to read, write, debug and maintain; they work only on one type of processor, so they are not portable; the programmer must manage every detail.

**Uses**: device drivers, the start-up code of an operating system, programs for small embedded controllers with little memory, and parts of games or other software where speed is critical. Most software is written in a high-level language and translated by a compiler or interpreter.

:::example{title="Why a meter might use assembly language"}
A prepaid meter in a township in Mutare has a small processor with very little memory, powered from the mains but required to run for years without attention. Writing the main loop in assembly language keeps the program tiny, makes the timing exact and allows the programmer to switch off unused parts of the chip. A high-level language could do the job, but the compiled program might be larger and slower. The trade-off is that the engineers must rewrite the program if the manufacturer changes to a different processor.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Assembly language and the two-pass assembler are Cambridge AS content (topic 4.2). The ZIMSEC syllabus covers addressing modes (Form 5) but not the assembler or the 9618 instruction groups as a separate topic.
:::

## Common mistakes

:::mistake{title="Saying assembly language is machine code"}
Machine code is binary. Assembly language is text with mnemonics and labels, and it must be translated by an assembler.
:::

:::mistake{title="Saying one assembly instruction becomes several machine instructions"}
Each assembly instruction becomes exactly one machine-code instruction. It is a statement in a high-level language that usually becomes several.
:::

:::mistake{title="Describing pass 1 as generating the code"}
Pass 1 builds the symbol table and assigns addresses. Pass 2 generates the machine code using the table.
:::

:::mistake{title="Believing assembly code runs on any computer"}
It is specific to one processor family and is not portable.
:::

## Exam tips

:::exam-tip
"**Describe** the two passes of an assembler": Pass 1 – read each line, assign addresses, record labels and their addresses in the symbol table. Pass 2 – replace mnemonics by opcodes and labels by addresses, producing machine code.
:::

:::exam-tip
"**Explain** why a two-pass assembler is used": a label may be used before it is defined (a forward reference), so the whole program must be read to find every address first.
:::

:::exam-tip
Paper 1 may give a short program and ask for the symbol table: number the lines from the starting address, then list each label with the address of its line, including data labels.
:::

## Summary

:::summary
- Machine code is binary (opcode and operand); assembly language uses mnemonics, labels and symbolic addresses, one for each machine instruction.
- The 9618 instructions fall into data movement, input and output, arithmetic, jumps, compare and conditional jumps, and bit manipulation.
- An assembler translates assembly language to machine code in two passes.
- Pass 1 assigns addresses and builds the symbol table; pass 2 replaces mnemonics and labels using the table.
- Low-level languages give control, speed and small programs, but are hard to write and are specific to a processor.
:::
