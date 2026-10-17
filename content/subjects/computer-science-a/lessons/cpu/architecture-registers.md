---
{
  "key": "cpu.architecture-registers",
  "title": "CPU architecture: Von Neumann, Harvard and registers",
  "summary": "The stored-program concept, the Von Neumann model and the Harvard architecture, the ALU, control unit, clock and immediate access store, and what each general-purpose and special-purpose register holds while a program runs.",
  "concepts": ["acs.cpu.architecture-registers"],
  "estimatedMinutes": 45,
  "level": "core",
  "freePreview": true
}
---
## Introduction

A Form 5 class in Gweru is asked the question, "How does a computer know what to do next?" The answer is not a person or a clever chip. It is a number. One small storage location inside the processor holds the address of the next instruction, and every time an instruction is fetched that number goes up by one. The processor follows a list of instructions that sit in memory in the same way that your data does.

This is the **stored-program concept**, and it is the basis of nearly every computer built since the 1940s. This lesson describes the **Von Neumann** model that uses it, the **Harvard** variation, the main parts of the processor, and the **registers** that hold the information needed at each step. The step-by-step cycle is in the lesson on the fetch-decode-execute cycle, and the buses that join the parts are in the lesson on buses and ports.

You should already know that a program is a list of instructions in machine code, that memory is a set of numbered locations, and that binary can represent both numbers and instructions.

## Key definitions

:::definition{term="Stored-program concept"}
The idea that program instructions are held in main memory, as binary numbers, in the same way as data, and are fetched and executed one after another by the processor.
:::

:::definition{term="Von Neumann architecture"}
A computer design in which one memory holds both instructions and data and is reached through one set of buses, with a processor containing an ALU, a control unit and registers.
:::

:::definition{term="Harvard architecture"}
A computer design with separate memories, and separate buses, for instructions and for data, so that an instruction and a data item can be accessed at the same time.
:::

:::definition{term="Register"}
A very small, very fast storage location inside the processor that holds one item of data, an address or an instruction while it is being used.
:::

## The parts of the processor

- **Arithmetic logic unit (ALU)**: carries out arithmetic (add, subtract), logic (AND, OR, NOT) and shift operations, and compares values.
- **Control unit (CU)**: fetches each instruction, decodes it, and sends control signals to the other parts so that it is carried out in the right order.
- **System clock**: sends regular electrical pulses that keep every operation in step; its speed is measured in hertz (cycles per second).
- **Immediate access store (IAS)**: the main memory (RAM) which holds the programs and data in use. The processor reaches it directly, by address.
- **Registers**: the fast storage inside the processor, described below.

## The Von Neumann model

In a Von Neumann machine there is a **single memory** for instructions and data and a **single set of buses**. A program is loaded into memory and the processor fetches instruction after instruction, normally in sequence, changing the sequence only on a jump or an interrupt.

![Von Neumann architecture: the processor (clock, ALU, control unit, registers PC, CIR, MAR, MDR and ACC) is joined to a single main memory holding both instructions and data by one address bus (one-way), one data bus and one control bus (two-way)](media:diagrams/cpu-von-neumann.png "Figure: the Von Neumann model with one memory and one set of buses")

Its advantage is simplicity and flexibility: any part of memory can hold either, so a larger program can use more of it and a loader can place a new program anywhere. Its drawback is the **Von Neumann bottleneck**: because instructions and data share the same buses, the processor cannot fetch the next instruction and read a data value at the same moment, and the processor waits for the slower memory.

## The Harvard architecture

In the Harvard architecture, instructions are stored in one memory and data in another, and each memory has its own buses. The processor can fetch the next instruction at the same time as it reads or writes a data item, which removes the bottleneck and speeds up execution. The extra memory and buses make it more complex and costly, so it is mostly found in small embedded controllers and signal processors. Many general-purpose processors use a mixture: one main memory, but separate caches for instructions and for data.

![Harvard architecture: separate instruction memory and data memory each have their own buses to the processor, so an instruction can be fetched while data is read or written](media:diagrams/cpu-harvard.png "Figure: the Harvard architecture, with separate memories and buses for instructions and data")

| Feature | Von Neumann | Harvard |
|---|---|---|
| Memory | One memory for instructions and data | Separate instruction memory and data memory |
| Buses | One set | Separate address and data buses for each memory |
| Instruction and data at the same time | No | Yes |
| Hardware | Simpler and cheaper | More complex and more expensive |
| Typical use | General-purpose computers | Small embedded controllers, signal processors |

## The registers

| Register | Holds |
|---|---|
| Program counter (PC) | The address of the **next** instruction to be fetched |
| Memory address register (MAR) | The address of the memory location being read or written |
| Memory data register (MDR) | The data or instruction that has just been read from, or is about to be written to, memory |
| Current instruction register (CIR) | The instruction being decoded and executed |
| Accumulator (ACC) | The result of ALU operations, and a value being worked on |
| Index register (IX) | A number added to an address to find a location, used for arrays |
| Status register (SR) | Flags that record the outcome of operations, such as zero, carry, overflow and negative |
| General-purpose registers | Any data the programmer or compiler chooses to keep in the processor |

The first four are used on every instruction. The ACC and the status register are used by the ALU. The program counter is increased as soon as an instruction has been fetched, which is why it always points to the **next** instruction.

## Registers during a short program

The program below adds 5 to the value stored at the address called `Value` and stores the result in `Result`. Addresses are shown in the first column.

| Address | Label | Instruction / data |
|:-:|:-:|:-:|
| 200 |  | `LDD Value` |
| 201 |  | `ADD #5` |
| 202 |  | `STO Result` |
| 203 |  | `END` |
| 204 | Value | `12` |
| 205 | Result | `0` |

:::worked-solution{title="Register contents while the program runs"}
| Stage | PC | MAR | MDR | CIR | ACC |
|:-:|:-:|:-:|:-:|:-:|:-:|
| Fetch `LDD Value` | 201 | 200 | `LDD Value` | `LDD Value` | 0 |
| Execute `LDD Value` | 201 | 204 | 12 | `LDD Value` | 12 |
| Fetch `ADD #5` | 202 | 201 | `ADD #5` | `ADD #5` | 12 |
| Execute `ADD #5` | 202 | 201 | `ADD #5` | `ADD #5` | 17 |
| Fetch `STO Result` | 203 | 202 | `STO Result` | `STO Result` | 17 |
| Execute `STO Result` | 203 | 205 | 17 | `STO Result` | 17 |

1. On each fetch the MAR takes the address in the PC, the PC then moves on by one, and the instruction is copied through the MDR into the CIR.
2. `LDD Value` reads address 204: the MAR holds 204, the MDR holds the data 12 that comes back, and the ACC takes the value 12.
3. `ADD #5` is immediate addressing: the 5 is part of the instruction in the CIR, so there is no memory access and the ACC becomes 12 + 5 = 17.
4. `STO Result` puts the ACC (17) into address 205 through the MDR. The value stored in `Result` is 17.
:::

:::example{title="Why the program counter matters"}
At a till in Mutare, the program for "add item to the bill" is at addresses 400 to 407. When the cashier scans the next item the program starts again at address 400. The only thing that changes is the number in the PC: a jump instruction writes 400 into the program counter, and the processor then fetches from there. The registers other than the PC change constantly, but the PC controls **where the program goes next**.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards examine the Von Neumann model, the stored-program concept, the ALU, the control unit, the clock and the registers. The **Harvard architecture** and its comparison with Von Neumann is ZIMSEC detail. The ZIMSEC syllabus describes registers in general terms; Cambridge names the PC, MAR, MDR, ACC, IX, CIR and status register.
:::

## Common mistakes

:::mistake{title="Saying the PC holds the current instruction"}
The PC holds the address of the next instruction. The current instruction is in the CIR.
:::

:::mistake{title="Confusing the MAR and the MDR"}
The MAR holds an address. The MDR holds the contents of the location at that address.
:::

:::mistake{title="Saying that the Von Neumann model has separate memories"}
Separate instruction and data memories describe the Harvard architecture. Von Neumann uses one memory.
:::

:::mistake{title="Describing the ALU as the part that fetches instructions"}
The control unit fetches and decodes. The ALU only performs calculations and logic.
:::

## Exam tips

:::exam-tip
"**State** the purpose of the MAR": "holds the address of the memory location that is to be read from or written to". Always say what the register holds, not just what it is used for.
:::

:::exam-tip
"**Describe** the stored-program concept" needs three points: instructions are held in memory, as binary, in the same way as data, and are fetched and executed in sequence by the processor.
:::

:::exam-tip
For register-content questions (Cambridge Paper 1, ZIMSEC Paper 2 section A), show the PC after the fetch (already increased by one) and make clear which of the MAR and the MDR holds the address and which the contents.
:::

## Summary

:::summary
- The stored-program concept: instructions and data are held in memory as binary and instructions are fetched in sequence.
- Von Neumann: one memory and one set of buses, hence the bottleneck. Harvard (ZIMSEC): separate memories and buses for instructions and data.
- The ALU does arithmetic and logic, the CU fetches, decodes and controls, the clock synchronises, the IAS is main memory.
- PC: next instruction address. MAR: address in use. MDR: data in transit. CIR: current instruction. ACC: results. IX: indexed addressing. SR: flags.
- The PC is increased as soon as an instruction has been fetched.
:::
