---
{
  "key": "hardware.secondary-storage",
  "title": "Secondary storage: hard disks, solid-state drives and optical discs",
  "summary": "How a magnetic hard disk, a solid-state (flash) drive and an optical disc store data, how to compare capacity, speed, durability, cost and portability, and how to choose storage and plan a backup.",
  "concepts": ["acs.hardware.secondary-storage"],
  "estimatedMinutes": 40,
  "level": "core"
}
---
## Introduction

When the power goes off during load-shedding in Masvingo, a school's computers lose everything held in RAM. The pupils' marks, the timetable and the programs themselves are still there when the power returns because they were stored on **secondary storage**: a device that keeps data without power and holds far more than main memory.

Cambridge expects you to explain how three technologies store data (magnetic, solid-state and optical), to compare them, and to pick the right one for a described job, including **backup**. You should already know that primary memory (RAM and ROM) is directly accessed by the processor, that secondary storage is not, and that file sizes are measured in bytes, KiB, MiB and GiB.

## Key definitions

:::definition{term="Secondary storage"}
Non-volatile storage that holds programs and data for the long term and is not directly accessed by the processor; data must be copied into main memory to be used.
:::

:::definition{term="Magnetic hard disk drive (HDD)"}
Storage in which data is recorded as magnetised areas on the surfaces of spinning platters, read and written by moving read-write heads.
:::

:::definition{term="Solid-state drive (SSD)"}
Storage with no moving parts that holds data as electrical charge trapped in flash memory cells.
:::

:::definition{term="Optical disc"}
A disc on which data is stored as a spiral track of pits and lands, read (and in some types written) by a laser.
:::

:::definition{term="Backup"}
A copy of data kept on a different device or in a different place so that the data can be restored if the original is lost, damaged or deleted.
:::

## The magnetic hard disk

A hard disk contains one or more **platters** coated with magnetic material, mounted on a **spindle** that turns at a fixed speed such as 5400 or 7200 revolutions per minute (rpm). Each surface is divided into circular **tracks**, and each track into **sectors**. A **read-write head** on an arm floats just above each surface and does two things: it **writes** by magnetising tiny areas in one of two directions (representing 0 and 1), and it **reads** by sensing the direction of the magnetism as the surface passes beneath it.

To reach data the arm must first **seek** to the right track, then wait for the right sector to rotate under the head: the **rotational latency**. On average the sector is half a turn away.

:::worked-solution{title="Average access time of a hard disk"}
A disk spins at 7200 rpm and its average seek time is 9 ms.

1. One revolution takes 60 s ÷ 7200 = {{revMs}} ms.
2. The average rotational latency is half a revolution: {{latency}} ms.
3. Average access time = seek time + latency = 9 + {{latency}} = {{access}} ms (before the transfer itself).
:::

{{speeds}}

A faster spindle cuts the latency but adds heat, noise and power use. Moving parts are also the weakness of a hard disk: a knock while it is spinning can make the head touch the platter and damage it.

## The solid-state drive

An SSD stores data in **flash memory** made of **floating-gate transistors**. Each cell has a tiny insulated conductor, the floating gate. Applying a voltage forces electrons through the insulator onto the gate, where they stay trapped even when the power is off. The trapped charge changes the voltage at which the transistor switches on, and a controller reads that behaviour as a 0 or a 1. Some cells hold more than one bit by using several charge levels.

Flash is organised in **pages** and **blocks**. Data is read and written in pages, but a block must be erased before it can be rewritten, and each cell survives only a limited number of erase cycles. The controller therefore spreads writes over all the cells (**wear levelling**). There are no moving parts, so an SSD is silent, uses little power, withstands knocks and has almost no delay before data is found.

:::worked-solution{title="Cells in a flash drive"}
How many cells does an 8 GiB flash drive need if each cell holds one bit?

1. 8 GiB = 8 × 2^30 bytes.
2. Bits = 8 × 2^30 × 8 = {{cells1}}, so there are {{cells1}} cells.
3. If each cell holds two bits, half as many cells are needed: {{cells2}}.
:::

## The optical disc

An optical disc has a single spiral **track** of tiny **pits** (dents) and flat areas called **lands**. A drive shines a **laser** onto the track and a sensor detects the reflected light. A land reflects the light back strongly; a pit scatters it, and the change between the two is read as data. A recordable disc has a dye layer that the drive's laser burns, and a rewritable disc uses a material that can be switched between two states by heating. CDs use an infrared laser, DVDs a red laser and Blu-ray discs a blue-violet laser. A shorter wavelength makes a smaller spot, so the pits can be smaller, the track tighter and the disc holds more.

## Removable storage and backup

**Removable storage** is any device that can be disconnected and carried: a USB flash drive, an external hard disk or a memory card. It is convenient for transferring files and for keeping a backup away from the computer, but small devices are easily lost.

A sound backup plan keeps a copy on a **different device**, ideally in a **different place**, so that theft, fire or a power surge that destroys the computer does not also destroy the copy. The time to back up depends on the size of the data and the speed of the link.

:::worked-solution{title="How long does a backup take?"}
A clinic's records total 90 GiB and are copied over a link with an effective rate of 400 Mbit/s (400 000 000 bits per second).

1. Size in bits = 90 × 2^30 × 8 = {{gibBits}} bits.
2. Time = bits ÷ rate = {{gibBits}} ÷ 400 000 000 = about {{secs}} seconds.
3. {{secs}} ÷ 60 = about {{mins}} minutes.
:::

## Comparing and choosing

| Feature | Hard disk | Solid-state drive | Optical disc |
|---|---|---|---|
| Technology | Magnetic platters and heads | Flash memory cells | Pits, lands and a laser |
| Capacity | Very large | Large | Small |
| Speed of access | Slower (seek and latency) | Fast | Slowest |
| Durability | Moving parts can be damaged by knocks | No moving parts | Surface scratches |
| Cost per GiB | Low | Higher | Very low per disc |
| Portability | External drives are heavier | Small and light | Light, but needs a drive |

:::example{title="Choosing storage for a mobile clinic"}
A nurse travels by road to rural clinics with a laptop. The laptop's internal storage should be an **SSD** because it survives bumps, boots quickly and uses less battery. The records are backed up each evening to an **external hard disk** kept at the district office, because it holds a lot cheaply and sits in a different place from the laptop. The justification names the feature (durability, capacity, location) for each choice.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Secondary storage is Cambridge AS content (topic 3). ZIMSEC candidates meet storage devices at O Level; at A Level they appear in scenario questions about systems, with the same comparisons of capacity, speed, durability, cost and portability.
:::

## Common mistakes

:::mistake{title="Confusing secondary storage with RAM"}
RAM is volatile primary memory that the processor accesses directly. Secondary storage keeps data when the power is off and is not accessed directly.
:::

:::mistake{title="Saying an SSD has a read-write head"}
Heads belong to hard disks. An SSD reads and writes through electronic circuits on its flash chips.
:::

:::mistake{title="Describing pits and lands as magnetised"}
Optical discs store data as physical pits and lands that reflect light differently. Magnetism is the hard disk method.
:::

:::mistake{title="Keeping the backup on the same computer"}
A copy on the same drive or in the same room is lost with the original. Say a different device and, preferably, a different place.
:::

## Exam tips

:::exam-tip
"**Describe** how a hard disk stores data": magnetic areas on platters, magnetised by a head, read by sensing the magnetism, with the platters spinning. "**Describe** an SSD": flash cells with floating gates that trap charge, no moving parts.
:::

:::exam-tip
In a "**choose** a storage device" question, give the device and two reasons tied to the scenario (portable, large capacity, fast, durable, low cost). Cambridge Paper 1 does not accept "better" or "faster" alone.
:::

:::exam-tip
For calculations (access time, backup time, number of cells) show every step: conversion to bits or bytes, the formula, the division. No calculator is allowed, so the numbers are chosen to divide neatly.
:::

## Summary

:::summary
- Secondary storage is non-volatile and is not directly accessed by the processor.
- A hard disk uses magnetised areas on spinning platters read and written by heads; its access time is seek time plus rotational latency.
- An SSD uses floating-gate flash cells and has no moving parts: it is fast, silent, durable and uses less power.
- An optical disc stores pits and lands on a spiral track read by a laser; shorter wavelengths allow more capacity.
- Removable storage is portable; a backup must be on a different device, ideally in a different place.
- Compare devices by capacity, speed, durability, cost and portability, and tie the choice to the scenario.
:::
