---
{
  "key": "hardware.secondary-storage",
  "title": "Secondary storage: magnetic, optical and solid-state",
  "summary": "Why secondary storage is needed; how magnetic hard disks (platters, tracks, sectors, electromagnets), optical discs (CD, DVD, Blu-ray: lasers, pits and lands) and solid-state flash memory (SSD, SD card, USB drive: NAND or NOR, control and floating gates) work; and how to compare them for capacity, speed, cost, durability and portability.",
  "concepts": ["comp.hardware.secondary-storage"],
  "estimatedMinutes": 35,
  "level": "core"
}
---
## Introduction

A photographer in Victoria Falls takes hundreds of pictures a day on an SD card, copies them to a laptop's solid-state drive, keeps a backup on a large external hard disk and delivers a wedding album to a client on a USB flash drive. Each of these is **secondary storage**, and each is chosen for a reason.

Both boards ask you to explain why secondary storage is needed, describe how magnetic, optical and solid-state storage work, and choose a suitable medium for a scenario. You should already know that RAM is volatile.

## Key definitions

:::definition{term="Secondary storage"}
Non-volatile storage that is not directly accessed by the CPU, used to keep programs and data permanently, for example a hard disk drive, an SSD or an optical disc.
:::

:::definition{term="Storage device"}
The hardware that reads and writes data, such as a hard disk drive or a DVD drive.
:::

:::definition{term="Storage medium"}
The material on which the data is held, such as a magnetic platter or an optical disc.
:::

:::definition{term="Flash memory"}
Non-volatile solid-state memory with no moving parts that stores data by trapping electrical charge in transistors.
:::

## Why secondary storage is needed

RAM is volatile, so anything in it is lost when the power goes off, and it is too small and too expensive to hold every file. Secondary storage is needed to:

- store the operating system, programs and files **permanently** (it is non-volatile);
- hold **far more data** than RAM, at a lower cost per gigabyte;
- let data be **moved** between computers (portable media) and **backed up**.

The CPU cannot access secondary storage directly: programs and data are first loaded into RAM.

## Magnetic storage: the hard disk drive (HDD)

1. Data is stored on circular **platters** coated with a magnetic material. A drive may have several platters on one spindle, which spins them at high speed.
2. Each surface is divided into concentric **tracks**, and each track into **sectors**, which hold blocks of data.
3. A **read/write head** on a moving arm is positioned over the correct track. To write, the head acts as an **electromagnet** and magnetises tiny areas of the surface in one of two directions, representing 1 and 0.
4. To read, the head detects the direction of magnetisation of each area as it passes underneath.

HDDs offer very large capacities at a low cost per gigabyte, but the moving parts make them slower to access data than an SSD, noisier, more power-hungry and easily damaged if dropped while running. Data can also be damaged by strong magnetic fields.

## Optical storage: CD, DVD and Blu-ray

1. Data is stored in a single **spiral track** running from the centre of the disc outwards.
2. When writing, a **laser** burns or forms tiny **pits** in the surface; the flat areas between them are **lands**.
3. When reading, a lower-power laser shines on the spinning disc. Lands reflect the light back to a sensor, but pits scatter it, so the amount of reflected light changes. These changes are converted into binary 1s and 0s.

| Disc | Laser | Typical capacity (single layer) |
|:--|:--|:--|
| CD | Infra-red | About 700 MB |
| DVD | Red | About 4.7 GB |
| Blu-ray | Blue-violet (shorter wavelength) | About 25 GB |

A shorter wavelength laser can focus on smaller pits, packed more closely, which is why Blu-ray holds the most. Some discs have two layers, doubling the capacity. Optical discs are cheap and light, but slow, easily scratched, and of small capacity compared with hard disks and SSDs.

## Solid-state storage: SSD, SD card and USB flash drive

Solid-state storage uses **flash memory**, made of millions of transistors arranged as cells using **NAND** or **NOR** technology (NAND is used in SSDs, memory cards and flash drives because it packs more data into the same space).

1. Each cell has a **control gate** and a **floating gate**, separated by a very thin insulating layer.
2. To store data, a voltage on the control gate pushes **electrons** through the insulator onto the floating gate, where they are **trapped**.
3. Whether a floating gate holds trapped charge or not represents a 0 or a 1.
4. Because the insulator keeps the electrons trapped without power, the memory is **non-volatile**.

There are **no moving parts**, so solid-state storage is fast to access, silent, light, uses little power and survives being dropped. It costs more per gigabyte than an HDD, and each cell can only be rewritten a limited (though very large) number of times.

## Comparing the three types

| | Magnetic (HDD) | Optical | Solid-state |
|:--|:--|:--|:--|
| Capacity | Very large | Small | Large |
| Access speed | Medium | Slow | Fast |
| Cost per GB | Low | Very low | Higher |
| Durability | Moving parts; damaged by drops and magnets | Scratches easily | No moving parts; very durable |
| Portability | Heavy external drives | Light discs | Very portable (cards, flash drives) |

:::example
**Choosing storage for a photographer.** Thandeka's camera needs storage that is tiny, light and robust: an **SD card** (solid-state). Her laptop needs fast start-up and fast opening of large photos: an **SSD**. She needs to back up several terabytes cheaply each month: an external **hard disk drive**, because its cost per gigabyte is low and speed is less important for backups. A client in Harare who wants a printed album and a copy to play on a television could be given a **USB flash drive**, which is more reliable than a disc that can be scratched.
:::

:::worked-solution[How many photos fit on a card?]
An SD card holds 32 GiB. Each photo is 4 MiB. How many photos fit?

1. Convert the card size to MiB: 32 × 1024 = 32 768 MiB.
2. Divide by the size of one photo: 32 768 ÷ 4 = 8 192 photos.
3. In practice slightly fewer fit, because some space is used by the file system.
:::

:::worked-solution[How many films fit on a DVD? (ZIMSEC units, 1 GB = 1024 MB)]
A DVD holds 4.7 GB. Each film file is 700 MB.

1. 4.7 × 1024 = 4 812.8 MB.
2. 4 812.8 ÷ 700 = 6.87…, so only **6** whole films fit.
3. Always round **down** when counting whole files that must fit.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards examine magnetic, optical and solid-state storage. Cambridge 0478 names the details used here (platters, tracks, sectors, electromagnets; pits and lands; NAND or NOR, control and floating gates) and uses KiB, MiB and GiB; ZIMSEC uses KB, MB and GB with 1024 as the factor.
:::

## Common mistakes

:::mistake{title="Saying a laser burns holes right through a disc"}
The laser forms tiny **pits** in a reflective layer; pits and lands reflect light differently.
:::

:::mistake{title="Saying SSDs store data magnetically"}
SSDs trap **electrons** on floating gates in flash memory. Only HDDs use magnetism.
:::

:::mistake{title="Saying 'SSDs are better' without a reason"}
Comparisons must name the property: "an SSD has faster access because it has no moving parts".
:::

## Exam tips

:::exam-tip
For "**describe** how an HDD works", use the words platter, track, sector, read/write head and electromagnet. For optical, use laser, spiral track, pits, lands and reflection. For solid-state, use transistors, control gate, floating gate and trapped electrons.
:::

:::exam-tip
In scenario questions, choose the medium and justify it with the property that matters in that scenario: portability for a camera, low cost per GB for backups, speed for an operating system.
:::

## Summary

:::summary
- Secondary storage is non-volatile and holds programs and data permanently; the CPU does not access it directly.
- HDD: spinning platters, tracks and sectors, read/write heads using electromagnets; large and cheap but has moving parts.
- Optical: a laser forms and reads pits and lands on a spiral track; CD < DVD < Blu-ray in capacity.
- Solid-state: NAND or NOR flash; electrons trapped on floating gates; fast, durable, no moving parts, higher cost per GB.
- Choose storage by capacity, speed, cost, durability and portability, linked to the scenario.
:::
