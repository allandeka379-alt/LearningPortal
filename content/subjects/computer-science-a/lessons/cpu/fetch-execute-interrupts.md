---
{
  "key": "cpu.fetch-execute-interrupts",
  "title": "The fetch-execute cycle and interrupts",
  "summary": "The stages of the fetch-decode-execute cycle in words and in register transfer notation, the register contents for an example program, and how interrupts are detected, prioritised and handled by an interrupt service routine.",
  "concepts": ["acs.cpu.fetch-execute-interrupts"],
  "estimatedMinutes": 50,
  "level": "core"
}
---
## Introduction

When a Form 6 pupil in Masvingo clicks the mouse, a program that is busy adding up marks does not need to stop and look for the click all the time. Instead the mouse sends a signal that says "attend to me", the processor finishes the instruction it is on, puts the sum aside, deals with the click and then carries on exactly where it left off.

Behind both the sum and the click is one repeated routine, the **fetch-decode-execute cycle** (the fetch-execute cycle in Cambridge language), and one mechanism for urgent signals, the **interrupt**. This lesson describes each stage in words and in **register transfer notation**, follows the registers for a real program, and explains how interrupts are detected and handled.

You should already know the registers (PC, MAR, MDR, CIR, ACC), the address, data and control buses, and that instructions and data are held in memory as binary.

## Key definitions

:::definition{term="Fetch-decode-execute cycle"}
The repeated sequence in which the processor fetches an instruction from memory, decodes it to find out what it requires, and executes it.
:::

:::definition{term="Register transfer notation (RTN)"}
A short way to describe what happens in a processor: an arrow shows a value being copied into a register, and square brackets show the contents of a register or location.
:::

:::definition{term="Interrupt"}
A signal to the processor from hardware or software that asks for attention, so that the current program is paused and a routine that deals with the cause is run.
:::

:::definition{term="Interrupt service routine (ISR)"}
The program, also called an interrupt handler, that is run to deal with a particular interrupt.
:::

## The fetch-decode-execute cycle

**Fetch**
1. The address in the program counter is copied to the MAR.
2. The PC is increased by one so that it points to the next instruction.
3. The instruction at that address is read into the MDR (the address goes on the address bus, a read signal on the control bus and the instruction returns on the data bus).
4. The instruction is copied from the MDR to the CIR.

![Fetch stage for the instruction LDM #20 stored at address 100: 1 the address in the PC (100) is copied to the MAR, 2 the PC increases to 101, 3 the instruction at that address travels on the data bus into the MDR, 4 it is copied to the CIR](media:diagrams/cpu-fetch-stage.png "Figure: the four fetch steps, with the register contents for the program stored from address 100")

**Decode**: the control unit examines the opcode in the CIR to find out which instruction it is, and the operand to find out what it works on.

**Execute**: the instruction is carried out, by the ALU for arithmetic and logic, or by the control unit for data movement and jumps. A jump instruction replaces the contents of the PC.

In register transfer notation the fetch is:

```
MAR ← [PC]
PC ← [PC] + 1
MDR ← [[MAR]]
CIR ← [MDR]
```

Square brackets mean "the contents of". `[PC]` is the value held in the PC; `[[MAR]]` is the contents of the memory location whose address is in the MAR. Some books write the third step as `MDR ← [MAR]`, which means the same thing.

## Register contents for a program

The program below is stored from address 100. `LDM #20` loads the number 20 into the accumulator, `ADD Fee` adds the value stored at the address called `Fee` (104), and `STO Total` stores the accumulator at `Total` (105). The value of `Fee` is 15.

:::worked-solution{title="Registers during three instructions"}
| Step (register transfer) | PC | MAR | MDR | CIR | ACC |
|:-:|:-:|:-:|:-:|:-:|:-:|
| MAR ← [PC] | 100 | 100 |  |  | 0 |
| PC ← [PC] + 1 | 101 | 100 |  |  | 0 |
| MDR ← [[MAR]] | 101 | 100 | `LDM #20` |  | 0 |
| CIR ← [MDR] | 101 | 100 | `LDM #20` | `LDM #20` | 0 |
| ACC ← operand in CIR | 101 | 100 | `LDM #20` | `LDM #20` | 20 |
| MAR ← [PC] | 101 | 101 | `LDM #20` | `LDM #20` | 20 |
| PC ← [PC] + 1 | 102 | 101 | `LDM #20` | `LDM #20` | 20 |
| MDR ← [[MAR]] | 102 | 101 | `ADD Fee` | `LDM #20` | 20 |
| CIR ← [MDR] | 102 | 101 | `ADD Fee` | `ADD Fee` | 20 |
| MAR ← address in CIR | 102 | 104 | `ADD Fee` | `ADD Fee` | 20 |
| MDR ← [[MAR]] | 102 | 104 | 15 | `ADD Fee` | 20 |
| ACC ← [ACC] + [MDR] | 102 | 104 | 15 | `ADD Fee` | 35 |
| MAR ← [PC] | 102 | 102 | 15 | `ADD Fee` | 35 |
| PC ← [PC] + 1 | 103 | 102 | 15 | `ADD Fee` | 35 |
| MDR ← [[MAR]] | 103 | 102 | `STO Total` | `ADD Fee` | 35 |
| CIR ← [MDR] | 103 | 102 | `STO Total` | `STO Total` | 35 |
| MAR ← address in CIR | 103 | 105 | `STO Total` | `STO Total` | 35 |
| MDR ← [ACC] | 103 | 105 | 35 | `STO Total` | 35 |
| [[MAR]] ← [MDR] | 103 | 105 | 35 | `STO Total` | 35 |

1. In every fetch the MAR takes the PC, then the PC moves on, then the instruction reaches the MDR and CIR.
2. `LDM #20` is **immediate**: the operand 20 is part of the instruction, so there is no memory access during execute.
3. `ADD Fee` uses **direct** addressing: the address 104 from the instruction goes to the MAR, the value 15 comes back through the MDR, and the ALU adds it to the accumulator: 20 + 15 = 35.
4. `STO Total` writes in the other direction: MAR holds 105, the MDR takes the accumulator value, and then the memory location is overwritten. 35 is now stored in `Total`.
:::

## Interrupts

An **interrupt** is raised when something needs attention at once. Causes include:

- **hardware faults**, such as a power failure or a memory error;
- **input and output events**: a key pressed, a printer ready for more data, a disk transfer finished;
- **software errors** and traps: a division by zero, a number too large for a register (overflow), an attempt to access a protected memory area, a request from a program for an operating system service;
- **a timer**: the operating system's clock tells the processor that a program's time slice is over;
- **user action**, such as pressing a break key.

ZIMSEC groups them as **internal** (caused by the running program, such as overflow or division by zero), **external** (caused by hardware outside the processor, such as I/O, a key press or a timer) and **software** (requested by a program on purpose, for example a system call).

### When interrupts are detected

The processor does **not** stop in the middle of an instruction. At the **end of each fetch-execute cycle**, the control unit checks whether an interrupt has been signalled. If none is pending, the next instruction is fetched. If there is one, and its priority is higher than that of the program running, the processor handles it.

### Handling an interrupt

1. The current instruction is completed.
2. The contents of the PC and of the registers in use (such as the ACC, IX and status register) are **saved**, usually on a stack.
3. The PC is loaded with the address of the **interrupt service routine** for that kind of interrupt.
4. The ISR runs.
5. The saved register values are **restored**, including the PC, and the interrupted program continues from where it stopped.

If a second interrupt arrives while the ISR is running, its **priority** is compared. A higher-priority interrupt (for example a power failure) is handled at once, and the first ISR is suspended and its state saved. A lower-priority interrupt waits until the ISR is complete. Some interrupts can be **disabled** (masked) for a short time when a routine must not be interrupted.

:::worked-solution{title="Following an interrupt"}
A program is stored at addresses 300 to 305. A keyboard interrupt arrives while the instruction at address 302 is executing. The ISR is at 900 to 902.

| Step | Instruction address executed | PC after fetch | Interrupt pending? | What happens | Stack (saved PC) |
|:-:|:-:|:-:|:-:|:-:|:-:|
| 1 | 300 | 301 | no | none | empty |
| 2 | 301 | 302 | no | none | empty |
| 3 | 302 | 303 | YES | interrupt detected at the end of the cycle: PC (303) and the other registers are saved on the stack | 303 |
| 4 | 900 | 901 | no | PC loaded with 900, the start of the interrupt service routine | 303 |
| 5 | 901 | 902 | no | ISR runs | 303 |
| 6 | 902 | 903 | no | last instruction of the ISR, registers restored | 303 |
|  |  | 303 | no | PC restored from the stack: 303 | empty |
| 7 | 303 | 304 | no | none | empty |
| 8 | 304 | 305 | no | none | empty |
| 9 | 305 | 306 | no | none | empty |

1. The instruction at 302 is finished and the PC holds 303.
2. At the end of the cycle the interrupt is detected, so 303 (and the other registers) are saved.
3. The PC is loaded with 900 and the ISR runs.
4. At the end of the ISR the saved values are restored and the PC returns to 303, so the main program continues with the instruction at 303.
5. The main program never "knows" that it was interrupted, because its registers were restored.
:::

:::example{title="Why a printer uses interrupts"}
A teacher in Mutare prints a long report while continuing to type. After the printer has taken a block of data it sends an interrupt saying it is ready for more. The processor pauses the word processor for a moment, runs the printer's ISR to send the next block, then resumes the typing. Without interrupts the processor would have to keep asking ("polling") whether the printer was ready, wasting time.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards examine the cycle, register contents and the handling of interrupts. Cambridge expects register transfer notation and the ISR; ZIMSEC uses the terms **internal, external and software** interrupts and describes the cycle in words. The classification of a timer interrupt differs between textbooks, so explain the cause when you name the type.
:::

## Common mistakes

:::mistake{title="Increasing the PC at the end of the cycle"}
The PC is increased during the fetch, before the instruction is decoded. After a fetch it always points to the next instruction.
:::

:::mistake{title="Saying the processor stops immediately when an interrupt occurs"}
The current instruction is completed first. The interrupt is checked at the end of the cycle.
:::

:::mistake{title="Forgetting to save and restore the registers"}
Without saving the PC and the registers, the interrupted program could not carry on correctly.
:::

:::mistake{title="Mixing up the MAR and the MDR in RTN"}
`MAR ← [PC]` copies an address. `MDR ← [[MAR]]` copies the contents of the addressed location.
:::

## Exam tips

:::exam-tip
Cambridge Paper 1 often asks for the fetch stage in RTN: write all four lines in order, with the PC increment as the second line.
:::

:::exam-tip
"**Describe** how an interrupt is handled": complete the instruction, check at the end of the cycle, save the registers, load the PC with the ISR address, run the ISR, restore the registers and continue.
:::

:::exam-tip
"**Give** two causes of interrupts" needs two different, specific causes (key pressed, printer ready, division by zero, power failure, timer), not "an error" twice.
:::

## Summary

:::summary
- Fetch: MAR ← [PC]; PC ← [PC] + 1; MDR ← [[MAR]]; CIR ← [MDR]. Then decode and execute.
- Immediate, direct and other addressing modes decide whether the execute stage accesses memory.
- An interrupt asks for attention; causes include faults, I/O, software errors, timers and user action.
- Interrupts are checked at the end of each cycle; registers are saved, the PC is loaded with the ISR address, and everything is restored afterwards.
- Priorities decide whether an interrupt is handled at once or has to wait.
:::
