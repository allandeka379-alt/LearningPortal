---
{
  "key": "hardware.primary-memory",
  "title": "Primary memory: RAM, ROM, buffers and cache",
  "summary": "Why a computer needs primary memory, how RAM and ROM differ, SRAM against DRAM, PROM, EPROM, EEPROM and flash, and how buffers match the speeds of devices.",
  "concepts": ["acs.hardware.primary-memory"],
  "estimatedMinutes": 40,
  "level": "core"
}
---
## Introduction

When a pupil in Gweru switches on a laptop, nothing on the hard disk can run yet. A small program stored permanently on a chip on the motherboard starts first and loads the operating system into fast working memory. Every program that runs afterwards lives in that working memory too, because the processor can only fetch instructions from places it can reach directly and quickly.

That is the job of **primary memory**: the memory the processor accesses directly. This lesson explains why it is needed, the differences between RAM and ROM, between SRAM and DRAM, the family of programmable ROMs, and how **buffers** smooth over the difference in speed between a fast processor and slow devices. Cache, as a factor in performance, is in the lesson on processor performance.

You should already know that memory is made of locations with addresses, that a bit is 0 or 1, and the difference between volatile and non-volatile storage.

## Key definitions

:::definition{term="Primary memory"}
Memory that the processor can access directly, using addresses on the address bus. It holds the programs and data currently in use (RAM) and the start-up program (ROM).
:::

:::definition{term="Random access memory (RAM)"}
Volatile memory that can be read and written, and in which any location can be reached in the same time. It holds the programs and data in use.
:::

:::definition{term="Read-only memory (ROM)"}
Non-volatile memory whose contents are fixed by the manufacturer or can only be changed with special methods. It holds the start-up program (bootstrap) and firmware.
:::

:::definition{term="Buffer"}
A temporary store in memory that holds data while it moves between two parts of a system that work at different speeds.
:::

## Why primary memory is needed

The processor runs billions of instructions every second. Secondary storage is far too slow, and it is not wired to the processor's address bus. So a program is first **copied into RAM**, and the processor fetches each instruction from there. The processor also needs somewhere to keep the data it is working on and the results it produces.

## RAM and ROM

| Feature | RAM | ROM |
|---|---|---|
| Volatile? | Yes: contents are lost when power is off | No: contents are kept |
| Read and write? | Both | Read only in normal use |
| Typical contents | Running programs, open files, the operating system in use | Bootstrap program, firmware of devices |
| Capacity in a computer | Large (gigabytes) | Small |

The **bootstrap** is the first program the processor runs. It sits in ROM because it must be there as soon as the power comes on. It tests the hardware and loads the operating system from secondary storage into RAM.

## SRAM and DRAM

RAM comes in two technologies.

**Dynamic RAM (DRAM)** stores each bit as charge in a tiny **capacitor** controlled by one transistor. Charge leaks away, so every cell must be **refreshed** (read and rewritten) many times a second. DRAM is cheap, takes little space per bit and is used for **main memory**.

**Static RAM (SRAM)** stores each bit in a circuit of several transistors called a flip-flop, which holds its state as long as power is applied and needs **no refresh**. SRAM is faster, uses more space per bit and costs more, so it is used where speed matters most: **cache memory** inside or next to the processor.

| Feature | SRAM | DRAM |
|---|---|---|
| Refresh needed | No | Yes |
| Speed | Faster | Slower |
| Cost per bit | Higher | Lower |
| Space per bit | More | Less |
| Typical use | Cache | Main memory |

## The programmable ROMs

| Type | Volatile? | Can it be changed? | How it is erased | Typical use |
|:-:|:-:|:-:|:-:|:-:|
| SRAM | Yes | Read and write | Overwritten | Cache |
| DRAM | Yes | Read and write | Overwritten (refreshed constantly) | Main memory |
| ROM (mask) | No | Read only | Cannot be erased | Fixed start-up code in a device |
| PROM | No | Programmed once | Cannot be erased | Small production runs of firmware |
| EPROM | No | Reprogrammable | Ultraviolet light through a window | Development of firmware |
| EEPROM | No | Reprogrammable | Electrically, byte by byte, in the circuit | Settings stored in a device |
| Flash | No | Reprogrammable | Electrically, in blocks | USB drives, SSDs, memory cards |

A **PROM** is blank when bought and is programmed once by a special device. An **EPROM** has a quartz window: shining ultraviolet light through it erases the whole chip so that it can be reprogrammed. An **EEPROM** is erased electrically, so it can be changed without removing it from the circuit, which suits settings that change occasionally. **Flash** memory is a form of EEPROM that is erased in large blocks, which makes it fast and dense enough for USB drives, memory cards and solid-state drives.

## Buffers

Devices run at very different speeds. A keyboard sends a few characters per second, a printer takes seconds to produce a page, and a processor can handle millions of items in a second. A buffer sits between them so that the faster part does not have to wait.

- **Keyboard buffer**: key presses are stored until the program is ready to read them, so that fast typing is not lost.
- **Printer buffer**: the document is copied to the buffer quickly and the processor is freed to do other work while the printer takes the data at its own speed.
- **Streaming buffer**: a video player downloads ahead of the part being watched. If the network slows briefly, the player uses the stored data and playback does not stutter.

:::worked-solution{title="Sizing a streaming buffer"}
A video stream is played at 6 Mbit/s. The player keeps 10 seconds of video in its buffer.

1. Bits in the buffer = 6 000 000 × 10 = 60000000 bits.
2. Bytes = 60000000 ÷ 8 = 7500000 bytes.
3. If the network stops for 4 seconds, the buffer still holds enough data to play on without a pause.
:::

:::worked-solution{title="How a printer buffer frees the processor"}
A 3 MiB document is sent to a printer buffer at 60 MiB per second. The printer itself accepts 0.5 MiB per second.

1. Time to fill the buffer = 3 ÷ 60 = 0.05 seconds.
2. Time for the printer to print from the buffer = 3 ÷ 0.5 = 6 seconds.
3. Without a buffer the processor would wait about 6 seconds; with one it is free after 0.05 seconds.
:::

## How much memory can a chip hold?

The number of locations is 2 raised to the number of address lines, and the total size is the number of locations times the width of each location.

:::worked-solution{title="Size of a ROM chip"}
A ROM chip has 12 address lines and each location holds 8 bits.

1. Locations = 2^12 = 4096.
2. Bits = 4096 × 8 = 32768.
3. Bytes = 4096, which is 4 KiB.
:::

:::example{title="Choosing memory for a device"}
A smart electricity meter in Harare stores its program permanently, a tariff table that the supplier updates now and then, and a running total of units used. The **program** goes in ROM (it never changes), the **tariff table** in EEPROM or flash (it must be kept without power but be rewritable), and the **running total** in RAM while the meter is working, with a copy saved to the rewritable non-volatile memory. Each choice follows from how often the data changes and whether it must survive power loss.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
This is Cambridge AS content (topic 3). ZIMSEC candidates need RAM, ROM and cache in outline; the SRAM and DRAM technologies, the PROM family and buffers are Cambridge detail.
:::

## Common mistakes

:::mistake{title="Calling ROM 'permanent storage for files'"}
ROM is small and holds fixed start-up code and firmware. User files are kept on secondary storage.
:::

:::mistake{title="Mixing up SRAM and DRAM"}
DRAM needs refreshing and is used for main memory. SRAM does not need refreshing, is faster and dearer, and is used for cache.
:::

:::mistake{title="Saying RAM is slow because it is 'random'"}
Random access means any location is reached in the same time. RAM is much faster than secondary storage.
:::

:::mistake{title="Saying a buffer stores data permanently"}
A buffer is a temporary holding area. Its contents are passed on and replaced.
:::

## Exam tips

:::exam-tip
"**Compare** RAM and ROM" needs matching points: volatile against non-volatile, read and write against read only, programs in use against bootstrap. Write both sides of each comparison.
:::

:::exam-tip
"**Explain** the use of a buffer" should name the two speeds ("the keyboard is slower than the processor") and say what the buffer does about it. Give the example the question asks for.
:::

:::exam-tip
Capacity calculations: locations = 2^(address lines); bits = locations × word width; divide by 8 for bytes. Paper 1 is done without a calculator, so the powers of two are small.
:::

## Summary

:::summary
- Primary memory is directly accessed by the processor; programs must be in RAM to run.
- RAM is volatile and read-write; ROM is non-volatile and holds the bootstrap and firmware.
- DRAM (capacitors, refreshed, cheaper) is used for main memory; SRAM (flip-flops, no refresh, faster, dearer) for cache.
- PROM is programmed once, EPROM is erased by ultraviolet light, EEPROM electrically, and flash in blocks.
- A buffer matches the speeds of two parts of a system, as in keyboards, printers and streaming.
- Capacity = 2^(address lines) × word width.
:::
