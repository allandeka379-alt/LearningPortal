---
{
  "key": "cpu.buses-ports",
  "title": "Buses and ports",
  "summary": "The address, data and control buses, how a read and a write travel over them, how bus width limits addressable memory and the data moved at once, and how USB, HDMI and VGA ports connect peripherals.",
  "concepts": ["acs.cpu.buses-ports"],
  "estimatedMinutes": 40,
  "level": "core"
}
---
## Introduction

A school in Hwange buys a second-hand computer that says it can use "up to 4 GiB of memory". Why that number, and not 8 or 6? The answer is not in the memory chips. It is in the **width of the address bus**: the number of wires that carry an address from the processor to memory. Thirty-two wires can make 2^32 different addresses, no more.

A **bus** is a set of parallel wires that carry signals between the processor, memory and input and output. This lesson describes the three buses, shows how a memory read and write use them, calculates how bus width limits memory and speed, and then covers **ports**: the sockets at the edge of the computer, such as USB, HDMI and VGA, where peripherals connect.

You should already know the parts of the processor and the registers (the MAR and MDR in particular), and powers of two.

## Key definitions

:::definition{term="Bus"}
A set of parallel wires, each carrying one bit at a time, that connects components of a computer and carries addresses, data or control signals between them.
:::

:::definition{term="Bus width"}
The number of wires (bits) in a bus. It decides how many bits travel at once on a data bus, and how many different addresses can be made on an address bus.
:::

:::definition{term="Port"}
A socket on the computer, with its own electrical and signalling standard, to which a peripheral device is connected by a cable.
:::

## The three buses

- **Address bus**: carries the address of the location to be read from or written to. It is **one-way**, from the processor (the MAR) to memory or an input/output device.
- **Data bus**: carries the data or instruction being transferred. It is **two-way**: from memory to the processor on a read, and from the processor to memory on a write.
- **Control bus**: carries control signals. Some lines go out of the processor (memory read, memory write, clock) and others come in (interrupt request, reset). It is two-way overall because different lines carry signals in different directions.

| Bus | Direction | Carries | Width decides |
|---|---|---|---|
| Address | One-way, processor to memory | The address | Number of locations that can be addressed |
| Data | Two-way | Data and instructions | Bits moved in one transfer (word size) |
| Control | Two-way (separate lines) | Read, write, clock, interrupt, reset signals | Number of different signals |

**A memory read**: the address is copied from the MAR onto the address bus; the control unit puts a signal on the *read* line of the control bus; the memory puts the contents of that location on the data bus; the data arrives in the MDR. **A memory write** is the opposite: the address goes on the address bus, the data from the MDR goes on the data bus, and the *write* line is activated.

## How bus width limits memory

An address bus of *n* wires can make 2^n different addresses, so it can address at most 2^n locations. If each location holds one byte, that is 2^n bytes.

| Address lines | Locations | Number of locations | Memory (1 byte per location) |
|:-:|:-:|:-:|:-:|
| 8 | 2^8 | 256 | 256 bytes |
| 10 | 2^10 | 1 024 | 1 KiB |
| 16 | 2^16 | 65 536 | 64 KiB |
| 20 | 2^20 | 1 048 576 | 1 MiB |
| 24 | 2^24 | 16 777 216 | 16 MiB |
| 32 | 2^32 | 4 294 967 296 | 4 GiB |

:::worked-solution{title="How many address lines are needed?"}
A system must address 12 KiB of memory, one byte per location.

1. 12 KiB = 12 × 1024 = 12288 locations.
2. 2^13 = 8192 is too small; 2^14 = 16 384 is enough.
3. The address bus needs 14 lines.
4. Address 1000 sent on a 16-line bus is 0000001111101000 in binary, one bit on each wire.
:::

Adding a wire to the address bus doubles the number of locations. The **data bus** width is related to the word size: a 32-bit data bus moves 32 bits in each transfer, so a wider bus moves the same data in fewer transfers.

:::worked-solution{title="Transfers and data rate"}
A processor has a 32-bit data bus and the bus makes 100 million transfers per second (100 MHz).

1. Bits per second = 32 × 100 000 000 = 3200 Mbit/s.
2. In bytes per second this is 3200 ÷ 8 = 400 million bytes per second.
3. To move a 64-byte block (64 × 8 = 512 bits) the bus needs 512 ÷ 32 = 16 transfers.
:::

:::example{title="Upgrading the address bus"}
An old school computer has a 20-line address bus and 1 MiB of memory is the most it can ever use, however many chips are fitted. A newer machine with 32 lines can address 4 GiB. The memory chips are not the limit: the number of wires on the address bus is.
:::

## Ports

| Port | Carries | Key facts |
|---|---|---|
| USB | Digital data in both directions, and a small amount of power | Serial connection, one standard for keyboards, mice, printers, storage and chargers; devices can be connected and disconnected while the computer is on (hot-plugging); a hub connects many devices |
| HDMI | Digital video and digital audio in one cable | Carries high-definition pictures and sound to a screen or projector; digital end to end, so the picture is not degraded |
| VGA | Analogue video only | Older 15-pin connector; no sound; the digital image is converted to an analogue signal, which can lose sharpness over long cables |

A **digital** signal is a stream of 0s and 1s, so interference is easily ignored. An **analogue** signal varies continuously and picks up noise. That is why a VGA picture can look softer than an HDMI one, and why VGA needs a separate audio cable.

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards examine the three buses, the effect of bus width and the ports USB, HDMI and VGA. Cambridge uses KiB, MiB and GiB (1024-based); ZIMSEC uses KB, MB and GB and states that 1 KB = 1024 bytes.
:::

## Common mistakes

:::mistake{title="Saying the address bus is two-way"}
Addresses only travel from the processor to memory. The data bus is the two-way bus.
:::

:::mistake{title="Saying that the data bus width decides the memory size"}
The address bus width decides how many locations can be addressed. The data bus width decides how many bits move at once.
:::

:::mistake{title="Forgetting that 2^n is the number of locations, not bytes, of memory"}
The number of locations is 2^n. It equals the number of bytes only when each location holds one byte.
:::

:::mistake{title="Calling VGA digital"}
VGA carries an analogue video signal. HDMI is the digital port that also carries sound.
:::

## Exam tips

:::exam-tip
"**State** the direction of the address bus": one-way, from the processor to memory. For the data bus say two-way, and for the control bus give two examples of signals (read, write, clock, interrupt, reset).
:::

:::exam-tip
In a capacity question write "2^n locations", work out the value with a power of two you know, and convert to KiB, MiB or GiB. Paper 1 is without a calculator, so numbers such as 2^16 or 2^20 are expected.
:::

:::exam-tip
"**Compare** HDMI and VGA": digital against analogue, sound and vision against vision only, picture quality. Use matching points.
:::

## Summary

:::summary
- The address bus is one-way and carries addresses, the data bus is two-way and carries data and instructions, and the control bus carries signals such as read, write, clock, interrupt and reset.
- Locations that can be addressed = 2^(address lines); a wider data bus moves more bits per transfer.
- A read: address on the address bus, read signal, data returns on the data bus into the MDR. A write uses the write signal.
- Data rate = bus width × number of transfers per second.
- USB is serial, hot-pluggable and carries power; HDMI carries digital video and audio; VGA carries analogue video only.
:::
