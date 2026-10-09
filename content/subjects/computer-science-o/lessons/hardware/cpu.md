---
{
  "key": "hardware.cpu",
  "title": "The central processing unit (CPU)",
  "summary": "What the CPU does with the instructions and data that enter a computer, what a microprocessor is, and how the arithmetic logic unit, the control unit and main memory work together to process data.",
  "concepts": ["comp.hardware.cpu"],
  "estimatedMinutes": 25,
  "level": "core"
}
---
## Introduction

At a supermarket till in Bulawayo, the cashier scans a loaf of bread, a packet of sugar and a bottle of cooking oil. In less than a second the screen shows each price, the running total and the change due. Somewhere inside the till a small chip has read the barcode numbers, looked up the prices, added them, compared the amount tendered with the total and sent the results to the screen and the receipt printer.

That chip is the **central processing unit (CPU)**. Every computer system, from a laptop to a smartphone or a till, has one. Both ZIMSEC and Cambridge expect you to explain the role of the CPU, say what a microprocessor is and name the parts that do the processing. This lesson gives you those basics; the detailed registers and the fetch-decode-execute cycle come in the next lesson (Cambridge).

You should already know that a computer system takes **input**, **processes** it, **stores** it and produces **output**.

## Key definitions

:::definition{term="Central processing unit (CPU)"}
The part of a computer that processes the instructions and data that are input into the computer, so that the results can be output or stored.
:::

:::definition{term="Microprocessor"}
A CPU built as an integrated circuit on a single chip of silicon.
:::

:::definition{term="Integrated circuit"}
A complete electronic circuit, made of millions or billions of tiny transistors, manufactured on one small piece of silicon.
:::

:::definition{term="Arithmetic logic unit (ALU)"}
The part of the CPU that carries out calculations (such as addition and subtraction) and logical operations (such as comparisons and AND, OR, NOT decisions).
:::

:::definition{term="Control unit (CU)"}
The part of the CPU that manages the flow of instructions and data, decodes each instruction and sends control signals to the other parts of the computer so that the instruction is carried out.
:::

:::definition{term="Main memory"}
Memory that holds the programs and data currently in use so that the CPU can access them directly (mainly RAM).
:::

## The role of the CPU

The CPU is often called the "brain" of the computer, but a better description is that it is the part that **follows instructions**. A program is a long list of simple instructions such as "load this number", "add these two numbers", "compare this value with zero" and "jump to another instruction". The CPU:

1. **Fetches** the next instruction (and any data it needs) from main memory.
2. **Decodes** it, working out what has to be done.
3. **Executes** it, for example by doing a calculation or moving data.

It repeats this cycle billions of times a second. Without the CPU, the input from the keyboard or scanner would never be turned into useful output.

The CPU does **not** store your files permanently, and it is **not** the whole box (the system unit or tower) of a desktop computer. People sometimes call the whole case "the CPU", but in computer science the CPU is the processing chip inside.

## What is a microprocessor?

Early computers used rooms full of separate components to build a processor. Today the entire CPU is made as one **integrated circuit** on a single chip: a **microprocessor**. A modern microprocessor contains billions of transistors on a piece of silicon smaller than a fingernail.

Because the processor fits on one chip, it is cheap enough and small enough to be built into phones, washing machines, cars and fuel pumps, as well as computers. A microprocessor in a desktop is fitted into a socket on the **motherboard** and is usually covered by a heat sink and a fan, because it gets hot while it works.

## The parts that do the processing

### The arithmetic logic unit (ALU)

The ALU does the actual "working out":

- **Arithmetic**: adding, subtracting, multiplying and dividing (and shifting bits).
- **Logic**: comparing values (is the total greater than the amount paid?), and applying AND, OR and NOT.

Every decision a program makes, such as `IF Mark >= 50`, depends on a comparison done in the ALU.

### The control unit (CU)

The CU is the manager. It does not calculate; it **directs**. It:

- takes each instruction in turn and **decodes** it;
- sends **control signals** to the ALU, the memory and the input and output devices to tell them what to do and when;
- uses the **clock** to keep every operation in step.

### Main memory

The CPU can only work on instructions and data that are in **main memory** (RAM). When you open a program, it is copied from the hard disk or SSD into RAM so that the CPU can reach it quickly. Results are written back to RAM, and from there they can be output or saved to secondary storage.

:::keyfact{title="ZIMSEC and Cambridge"}
ZIMSEC groups the ALU, the control unit and main memory together as the **processing devices** of a computer. Cambridge 0478 treats main memory under data storage and goes further inside the CPU, with the registers, buses and the fetch-decode-execute cycle of the Von Neumann architecture.
:::

:::example
**Adding up a bill at the till.** The cashier scans three items priced 120, 250 and 80 cents.

- The barcode numbers arrive from the scanner (input) and are stored in main memory.
- The **control unit** fetches the program instruction "add the price to the total" and decodes it.
- The **ALU** adds each price to the running total: 120, then 370, then 450.
- The customer pays 500 cents. The CU directs the ALU to **compare** 500 with 450 (is the payment enough?) and then to subtract: change of 50 cents.
- The CU sends signals so that the total and change are output to the screen and printer.

The ALU did the adding, comparing and subtracting; the CU decided what happened next and when; main memory held the program and the values.
:::

:::example
**Which part is responsible?** Rudo's spreadsheet sorts 500 marks into order. Sorting needs many comparisons ("is this mark bigger than that one?"), which the **ALU** performs. The **control unit** fetches and decodes each instruction of the sorting program, and makes the CPU jump back to repeat the loop. The 500 marks and the program are held in **main memory** while the sort runs; the finished list is then saved back to the SSD.
:::

## Why the CPU matters for the user

A faster CPU completes more instructions each second, so programs open and respond more quickly. Cambridge expects you to explain how the clock speed, number of cores and cache affect performance; that is covered with the Von Neumann CPU. At this stage, remember that the CPU, main memory and the speed at which they exchange data together decide how quickly a computer can work.

## Common mistakes

:::mistake{title="Calling the system unit the CPU"}
The case that holds the motherboard, power supply and drives is the system unit. The CPU is the processor chip on the motherboard.
:::

:::mistake{title="Saying the control unit does calculations"}
Calculations and comparisons are done by the ALU. The control unit decodes instructions and sends control signals.
:::

:::mistake{title="Saying the CPU stores files"}
The CPU only holds the small amount of data it is working on at that moment. Programs and data in use are in main memory; files are kept on secondary storage.
:::

:::mistake{title="Describing a microprocessor as 'a small computer'"}
A microprocessor is a CPU on a single integrated circuit (chip). A whole computer also needs memory, storage and input and output devices.
:::

## Exam tips

:::exam-tip
For "**state** the role of the CPU", write that it **processes instructions and data** so that the result can be output. Mention fetching, decoding and executing instructions for a fuller answer.
:::

:::exam-tip
For "**describe** the function of the ALU", give both halves: arithmetic calculations **and** logical operations or comparisons. For the CU, use the words *decodes instructions* and *sends control signals*.
:::

:::exam-tip
When a question gives a scenario, link each part to what it does there: "the ALU compares the temperature reading with the set value".
:::

## Summary

:::summary
- The CPU processes the instructions and data input into a computer so that results can be output or stored.
- It repeatedly fetches, decodes and executes instructions held in main memory.
- A microprocessor is a CPU made as an integrated circuit on a single chip.
- The ALU performs arithmetic and logical operations (calculations and comparisons).
- The control unit decodes instructions and sends control signals to co-ordinate the computer.
- Main memory (RAM) holds the programs and data the CPU is currently using.
:::
