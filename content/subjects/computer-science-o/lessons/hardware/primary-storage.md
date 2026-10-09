---
{
  "key": "hardware.primary-storage",
  "title": "Primary storage: RAM, ROM and virtual memory",
  "summary": "Primary storage as memory the CPU accesses directly; the roles of RAM (volatile, read-write) and ROM (non-volatile, read-only, holding the bootstrap) and why a computer needs both; and virtual memory, where pages are moved between RAM and secondary storage when RAM is full.",
  "concepts": ["comp.hardware.primary-storage"],
  "estimatedMinutes": 30,
  "level": "core"
}
---
## Introduction

Farai switches on the laptop in his school's computer room in Gweru. Before anything appears on screen, the computer must find and start the operating system. Then he opens a browser, a word processor and a spreadsheet at the same time. Where are these programs kept while he works, and what happens when he opens so many that the memory is full?

The answers involve **primary storage**: RAM and ROM. Both boards ask you to explain the roles of RAM and ROM and why a computer needs both. Cambridge also asks how **virtual memory** is created and used. You should already know that the CPU fetches instructions from main memory.

## Key definitions

:::definition{term="Primary storage"}
Memory that is directly accessed by the CPU. It consists of RAM and ROM.
:::

:::definition{term="Random access memory (RAM)"}
Volatile, read-write primary storage that holds the operating system, programs and data currently in use.
:::

:::definition{term="Read only memory (ROM)"}
Non-volatile primary storage whose contents can be read but not changed in normal use; it holds the start-up instructions (the bootstrap).
:::

:::definition{term="Volatile"}
Describes memory that loses its contents when the power is switched off.
:::

:::definition{term="Bootstrap"}
The start-up program, stored in ROM, that runs when the computer is switched on: it checks the hardware and loads the operating system from secondary storage into RAM.
:::

:::definition{term="Virtual memory"}
An area of secondary storage used as if it were extra RAM when RAM is full; pages of data are moved between RAM and virtual memory as they are needed.
:::

## RAM: the working memory

RAM holds **whatever is being used right now**: the parts of the operating system that are running, the programs that are open and the data they are working on (the document being typed, the web page being viewed).

- It is **read-write**: the CPU can read from it and write new data to it.
- It is **volatile**: everything in it is lost when the power goes off. This is why unsaved work disappears in a power cut.
- It is **fast** compared with secondary storage, so the CPU can fetch instructions quickly.
- Its contents change constantly as programs are opened and closed.

More RAM means more programs and data can be held at once, so the computer needs to use slow virtual memory less often.

## ROM: the permanent start-up instructions

ROM holds instructions that must **never be lost**, especially the **bootstrap** program (part of the firmware sometimes called the BIOS).

- It is **read-only** in normal use, so the start-up instructions cannot be changed or deleted by accident or by malware.
- It is **non-volatile**: its contents stay when the power is off, so they are there every time the computer starts.
- It is small compared with RAM.

When the computer is switched on, RAM is empty. The CPU runs the bootstrap from ROM, which checks the hardware and then **loads the operating system from secondary storage into RAM**.

## Why a computer needs both

| RAM | ROM |
|:--|:--|
| Volatile: contents lost when power is off | Non-volatile: contents kept when power is off |
| Read and write | Read only (in normal use) |
| Holds the OS, programs and data in use | Holds the bootstrap / start-up instructions |
| Contents change all the time | Contents are fixed |
| Larger (several gigabytes) | Small |

ROM is needed because RAM is empty at start-up; something permanent must tell the computer how to start. RAM is needed because programs and data must be changed as the user works, which ROM does not allow.

:::example
**Switching on a computer.** When Farai presses the power button:

1. RAM is empty because it is volatile.
2. The CPU runs the bootstrap stored in **ROM**, which checks the keyboard, memory and drives.
3. The bootstrap loads the operating system from the SSD into **RAM**.
4. When he opens the browser, it is copied from the SSD into RAM, and the web pages he views are held in RAM.
5. If the power fails, everything in RAM is lost, but the bootstrap in ROM is still there next time.
:::

## Virtual memory (Cambridge)

Sometimes the programs and data in use need **more space than the RAM has**. Rather than refuse to open another program, the operating system uses **virtual memory**:

1. The operating system sets aside an area of **secondary storage** (hard disk or SSD) to act as virtual memory.
2. Programs and data are divided into fixed-size blocks called **pages**.
3. When RAM is full, pages that are **not currently needed** are moved from RAM to virtual memory, freeing space in RAM.
4. When the CPU needs a page that is in virtual memory, that page is **moved back into RAM** (and another page may be moved out to make room).

The CPU never processes data directly from virtual memory: pages must be moved back into RAM first.

**Why it is necessary:** it lets the computer run more programs, or larger programs, than would fit in RAM alone, instead of crashing or refusing to open them.

**Drawback:** secondary storage is much slower than RAM. If pages are swapped in and out constantly, the computer becomes very slow; this is called **disk thrashing**. Adding more RAM reduces the need for virtual memory.

:::worked-solution[How much virtual memory is used?]
A laptop has 8 GiB of RAM. Tatenda has the operating system (3 GiB), a browser (2.5 GiB) and a video editor (4 GiB) open at the same time.

1. Total memory needed: 3 + 2.5 + 4 = 9.5 GiB.
2. RAM available: 8 GiB, which is less than 9.5 GiB.
3. Pages of at least 9.5 − 8 = 1.5 GiB that are not currently being used must be held in virtual memory on the SSD.
4. When Tatenda switches back to the browser, its pages may have to be moved back into RAM, which is why there is a short delay.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards examine RAM and ROM and why a computer needs both. Virtual memory is in the Cambridge 0478 syllabus only.
:::

## Common mistakes

:::mistake{title="Saying ROM stores the operating system"}
On a PC, ROM holds the **bootstrap**, which **loads** the operating system from secondary storage into RAM.
:::

:::mistake{title="Calling secondary storage 'memory'"}
A hard disk or SSD is secondary **storage**. Primary storage (memory) is RAM and ROM, directly accessed by the CPU.
:::

:::mistake{title="Saying virtual memory is extra RAM chips"}
Virtual memory is an area of **secondary storage** used as if it were RAM. It is much slower than real RAM.
:::

:::mistake{title="Saying the CPU processes pages in virtual memory"}
Pages must be moved back into RAM before the CPU can use them.
:::

## Exam tips

:::exam-tip
"**Explain** why a computer needs both RAM and ROM" needs both halves: ROM because it is non-volatile and holds the start-up instructions that must not be lost; RAM because it is read-write and holds the programs and data currently in use.
:::

:::exam-tip
For "**describe** how virtual memory is used", mention: area of secondary storage; RAM full; pages not in use moved out; pages moved back to RAM when needed.
:::

## Summary

:::summary
- Primary storage (RAM and ROM) is directly accessed by the CPU.
- RAM is volatile and read-write; it holds the OS, programs and data currently in use.
- ROM is non-volatile and read-only; it holds the bootstrap, which loads the OS into RAM.
- A computer needs ROM to start and RAM to work on changing programs and data.
- Virtual memory (Cambridge) uses secondary storage when RAM is full; pages are moved between RAM and virtual memory.
- Heavy use of virtual memory slows the computer (disk thrashing); more RAM reduces it.
:::
