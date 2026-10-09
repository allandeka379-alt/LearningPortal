---
{
  "key": "hardware.fetch-execute",
  "title": "Von Neumann architecture and the fetch-decode-execute cycle",
  "summary": "The units, registers and buses of a Von Neumann CPU, the part each plays in the fetch-decode-execute cycle, how cores, cache and clock speed affect performance, and what an instruction set is.",
  "concepts": ["comp.hardware.fetch-execute"],
  "estimatedMinutes": 40,
  "level": "core"
}
---
## Introduction

When Chipo taps an app on her phone, the processor starts running millions of machine code instructions. Each one is brought from memory into the CPU, worked out and carried out in a few billionths of a second. The way this happens was described in the 1940s by the mathematician John von Neumann, and almost every computer still follows his design: the **Von Neumann architecture**.

Cambridge 0478 Paper 1 regularly asks you to name the registers and buses, describe the **fetch-decode-execute (FDE) cycle** step by step, and explain why one CPU performs better than another. You should already know the role of the CPU, the ALU and the control unit, and what RAM is.

## Key definitions

:::definition{term="Von Neumann architecture"}
A computer design in which a single memory holds both the program instructions and the data, and the CPU fetches them one at a time over shared buses.
:::

:::definition{term="Register"}
A very small, very fast storage location inside the CPU that holds one item, such as an address, an instruction or a value being worked on.
:::

:::definition{term="Bus"}
A set of parallel wires that carries signals between components of the computer.
:::

:::definition{term="Fetch-decode-execute cycle"}
The repeated process in which the CPU fetches the next instruction from memory, decodes it to find out what it means and then executes it.
:::

:::definition{term="Instruction set"}
The list of all the commands, in machine code, that a particular CPU can process.
:::

## The components of a Von Neumann CPU

### Units

- **Arithmetic logic unit (ALU)**: carries out calculations and logical operations. Its results are held in the accumulator.
- **Control unit (CU)**: decodes instructions and sends **control signals** along the control bus to manage every step.

### Registers

| Register | Full name | What it holds |
|:--|:--|:--|
| PC | Program counter | The **address** of the next instruction to be fetched |
| MAR | Memory address register | The **address** of the memory location about to be read from or written to |
| MDR | Memory data register | The **data or instruction** that has just been read from memory, or is about to be written to it |
| CIR | Current instruction register | The **instruction** that is currently being decoded and executed |
| ACC | Accumulator | The **result** of calculations done by the ALU |

A useful memory hook: the PC and MAR hold **addresses**; the MDR, CIR and ACC hold **data or instructions**.

### Buses

| Bus | What it carries | Direction |
|:--|:--|:--|
| Address bus | Addresses, from the MAR to memory | One way (CPU to memory) |
| Data bus | Data and instructions between the CPU and memory | Both ways |
| Control bus | Control signals from the CU, such as "read" or "write", and timing signals | Both ways |

## The fetch-decode-execute cycle

**Fetch**

1. The address held in the **PC** is copied into the **MAR**.
2. The address is sent along the **address bus** to RAM, and the CU sends a **read** signal along the **control bus**.
3. The instruction stored at that address is sent along the **data bus** and copied into the **MDR**.
4. The **PC is incremented** by 1, so that it holds the address of the next instruction.
5. The instruction in the MDR is copied into the **CIR**.

**Decode**

6. The **control unit** decodes the instruction in the CIR to work out what must be done (for example, "add the value at address 31 to the accumulator").

**Execute**

7. The instruction is carried out. If it needs data from memory, the data's address goes into the MAR and the data comes back into the MDR. Calculations are done by the **ALU** and the result is stored in the **ACC**. Then the cycle starts again.

:::worked-solution[Register contents for two instructions]
Memory holds the instruction `LDA 30` (load the value at address 30 into the accumulator) at address 20 and `ADD 31` (add the value at address 31 to the accumulator) at address 21. Address 30 holds 15 and address 31 holds 27. The PC starts at 20.

1. Fetch the first instruction: MAR ← PC, then the instruction comes back into the MDR and the PC is incremented, then it is copied into the CIR.
2. Decode `LDA 30`; execute it by putting 30 in the MAR and reading 15 into the MDR, then into the ACC.
3. Repeat for `ADD 31`: the ALU adds 27 to 15.

| Step | PC | MAR | MDR | CIR | ACC |
|:-:|:-:|:-:|:-:|:-:|:-:|
| Start | 20 |  |  |  | 0 |
| MAR ← PC | 20 | 20 |  |  | 0 |
| MDR ← [MAR]; PC ← PC + 1 | 21 | 20 | LDA 30 |  | 0 |
| CIR ← MDR | 21 | 20 | LDA 30 | LDA 30 | 0 |
| Decode; MAR ← address | 21 | 30 | LDA 30 | LDA 30 | 0 |
| MDR ← [MAR] | 21 | 30 | 15 | LDA 30 | 0 |
| ACC ← MDR | 21 | 30 | 15 | LDA 30 | 15 |
| MAR ← PC | 21 | 21 | 15 | LDA 30 | 15 |
| MDR ← [MAR]; PC ← PC + 1 | 22 | 21 | ADD 31 | LDA 30 | 15 |
| CIR ← MDR | 22 | 21 | ADD 31 | ADD 31 | 15 |
| Decode; MAR ← address | 22 | 31 | ADD 31 | ADD 31 | 15 |
| MDR ← [MAR] | 22 | 31 | 27 | ADD 31 | 15 |
| ACC ← ACC + MDR (ALU) | 22 | 31 | 27 | ADD 31 | 42 |

Notice that the PC already holds 22 while `ADD 31` is executing: it always points at the **next** instruction.
:::

## CPU performance: clock, cores and cache

**Clock.** The clock sends out regular pulses; each pulse lets the CPU carry out a step of the cycle. Clock speed is measured in hertz (cycles per second); 3.5 GHz means 3 500 000 000 cycles each second. A faster clock means more instructions can be processed each second. However, a very fast clock makes the CPU hotter, and the CPU may have to wait for slower memory.

**Cores.** A core is a complete processing unit (its own ALU, CU and registers) inside the CPU. A quad-core CPU can work on four instructions at the same time. More cores improve performance **when the software can split the work** into parts that run at the same time; doubling the cores does not always double the speed, because the cores must share the work and sometimes wait for one another.

**Cache.** Cache is a small amount of very fast memory inside or very close to the CPU that stores frequently used instructions and data. Fetching from cache is much quicker than fetching from RAM, so a larger cache means the CPU waits less. Cache is expensive, so it is small compared with RAM.

:::worked-solution[Comparing clock speeds]
A laptop CPU runs at 2 GHz and a desktop CPU at 3 GHz. How many more clock cycles does the desktop CPU have each second?

1. 2 GHz = 2 000 000 000 cycles per second.
2. 3 GHz = 3 000 000 000 cycles per second.
3. Difference: 1 000 000 000 more cycles per second, so (if everything else were equal) the desktop CPU could carry out more steps of the FDE cycle each second.
:::

:::example
**Choosing a computer for video editing.** Farai's studio in Mutare edits long videos. One computer has a 4-core CPU with a large cache; another has a 2-core CPU at a slightly higher clock speed and a small cache. Video-editing software splits the work between cores, so four cores can process different parts of the video at the same time. The larger cache also keeps more of the frequently used data near the CPU, so it waits less for RAM. The 4-core computer is the better choice, even though its clock is a little slower.
:::

## The instruction set

Each CPU can only carry out the commands in its own **instruction set**: a list of machine code operations such as load, store, add, compare and jump. A program written in a high-level language must be translated into machine code from this instruction set before the CPU can run it. This is why a program compiled for one type of processor may not run on a different type.

## Common mistakes

:::mistake{title="Mixing up the MAR and the MDR"}
The MAR holds an **address**; the MDR holds the **data or instruction** found at (or going to) that address.
:::

:::mistake{title="Saying the PC counts the programs"}
The program counter holds the address of the **next instruction**. It is incremented during the fetch stage.
:::

:::mistake{title="Saying the data bus is one-way"}
The address bus is one-way (CPU to memory). The data bus and the control bus carry signals in both directions.
:::

:::mistake{title="Doubling the cores always doubles the speed"}
Extra cores only help if the work can be split into parts that run at the same time.
:::

## Exam tips

:::exam-tip
To **describe** the fetch stage, name the register and the bus at each step: "the address in the PC is copied to the MAR; it is sent along the address bus; the instruction is returned along the data bus to the MDR; the PC is incremented; the instruction is copied to the CIR".
:::

:::exam-tip
For **explain** questions on performance, give the cause and the effect: "more cache stores more frequently used instructions, so the CPU fetches from RAM less often and processes instructions faster".
:::

## Summary

:::summary
- A Von Neumann CPU stores instructions and data in the same memory and has an ALU, a CU, registers and buses.
- PC and MAR hold addresses; MDR holds data or instructions from memory; CIR holds the current instruction; ACC holds ALU results.
- The address bus is one-way; the data and control buses are two-way.
- Fetch: PC → MAR → address bus → data bus → MDR → CIR, and the PC is incremented; the CU decodes; the instruction is executed.
- Faster clocks, more cores (for work that can be split) and larger caches improve performance.
- An instruction set is the list of machine code commands a CPU can process.
:::
