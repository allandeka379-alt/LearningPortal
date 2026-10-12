---
{
  "key": "os.functions-utilities",
  "title": "Operating system functions, utility software and libraries",
  "summary": "Why a computer needs an operating system, its management tasks (memory, files, security, hardware and input-output, processes), the user interface, utility software such as formatting, defragmentation and back-up, and program libraries and DLL files.",
  "concepts": ["acs.os.functions-utilities"],
  "estimatedMinutes": 50,
  "level": "core",
  "freePreview": true
}
---
## Introduction

When a student at a Harare school saves an essay, prints it and listens to music at the same time, the word processor, the printer driver and the music player all need the processor, the memory and the disk. None of them has to ask the others for permission, and none of them has to know how the disk or the printer actually works. This is the job of the **operating system (OS)**.

This lesson explains why an OS is needed, what its main management tasks are, how it provides a user interface, which **utility programs** keep the computer healthy, and why programs share **libraries** and **DLL files**.

You should already know the difference between hardware and software, and between primary memory and secondary storage.

## Key definitions

:::definition{term="Operating system"}
System software that manages the hardware and the resources of a computer and provides services to application programs and a way for the user to use the computer.
:::

:::definition{term="Utility software"}
System software that carries out a maintenance or support task for the computer, such as formatting a disk, checking for viruses or backing up files.
:::

:::definition{term="Program library"}
A collection of tested, ready-made routines (functions and procedures) that programs can call instead of writing the code again.
:::

:::definition{term="Dynamic Link Library (DLL)"}
A library file that is loaded into memory when a program needs it, rather than being copied into the program, so that several programs can share one copy.
:::

## What an operating system does

Without an OS every program would have to contain code for every device, and two programs could overwrite each other's memory. The OS hides this complexity and shares the resources fairly. Its tasks are:

| Management task | What the OS does |
|---|---|
| Process management | Decides which program uses the processor and for how long; starts and stops processes; lets several programs run at the same time (multi-tasking) |
| Memory management | Loads programs into main memory, gives each its own area, stops one program from using another's memory, and reuses memory when a program ends |
| File management | Names and organises files in folders, records where each file is on the disk, controls opening, saving, copying and deleting |
| Security management | Controls who can log in (user accounts and passwords), what each user may read, change or run (access rights), and guards against unauthorised use |
| Hardware and input-output management | Uses device drivers to communicate with printers, keyboards, disks and other devices, and manages buffers and interrupts |

:::keyfact{title="Five management tasks"}
Process, memory, file, security, and hardware (input-output) management. Learn all five names and one concrete action for each.
:::

### The user interface

The OS also provides the **user interface** between the user and the hardware. A **command line interface (CLI)** takes typed commands and is fast and precise for an expert but must be learnt. A **graphical user interface (GUI)** uses windows, icons, menus and a pointer, and is easy for beginners but needs more memory and processing power. Touch screens and voice control are other forms of interface. Without a user interface the user could not tell the computer what to do.

## Utility software

| Utility | Purpose |
|---|---|
| Disk formatter | Prepares a disk by dividing it into tracks and sectors and setting up an empty file system; formatting a used disk removes access to its data |
| Virus checker | Scans files for known malicious code and unusual behaviour, and quarantines or removes what it finds; its list of known viruses must be updated regularly |
| Defragmentation software | Rearranges the blocks of files so that each file is stored in one piece, which makes reading faster on a magnetic hard disk |
| Disk analysis and repair software | Reports how the disk is used and finds and repairs errors and bad sectors |
| File compression software | Reduces the size of files to save storage space or transmission time |
| Back-up software | Makes copies of files so that they can be restored after loss or damage; can be full, or incremental (only files changed since the last back-up) |

### Worked example 1: fragmentation

A small disk has 12 blocks. File A needs 3 blocks, B needs 2 and C needs 4, saved in that order, each in the first free blocks.

{{m1}}

B is deleted, which frees blocks 4 and 5. A new file D needs 4 blocks and is saved in the first free blocks it can find.

:::worked-solution{title="Saving D, then defragmenting"}
After deleting B:

{{m2}}

D is placed in the first four free blocks, which are 4, 5, 10 and 11:

{{m3}}

1. D is stored in **two pieces**: it is **fragmented**.
2. Reading D needs the read head to move to two separate places, which takes longer.
3. A defragmentation utility moves the blocks so that every file is in one piece:

{{m4}}

4. D is now stored in blocks 4 to 7 and the free space is in one area at the end.
:::

### Worked example 2: back-up

A school server holds 40 GiB of data. A full back-up is made on Sunday and an incremental back-up of the 2 GiB of files that changed is made on each of the next six days.

:::worked-solution{title="Back-up storage"}
{{backupTable}}

1. The back-ups hold 40 + 6 × 2 = {{incTotal}} GiB in total.
2. To restore Saturday's data, the full back-up and **all six** incrementals are needed, in order.
3. A full back-up every day would need 6 × 40 GiB more, but each restore would be simpler.
:::

## Libraries and DLL files

A program library saves a programmer from writing and testing routines such as sorting, printing or drawing again. A routine can be **linked** into the program when it is built (the program is then larger) or kept in a **DLL** that the OS loads when a program needs it.

:::example{title="Sharing a library"}
Five programs each use a 3 MiB graphics library, and each program itself is 1 MiB.

{{dllTable}}

The shared DLL saves {{saving}} MiB. If the library is corrected, only the DLL is replaced and every program benefits.
:::

**Benefits to a developer:** less code to write and test, better reliability because library code is already tested, smaller programs, and updates that reach all programs at once. **Drawback:** the program fails if the DLL is missing or is replaced by an incompatible version.

:::keyfact{title="ZIMSEC and Cambridge"}
Operating system functions, utilities and libraries are Cambridge AS content (topic 5.1). ZIMSEC treats the operating system within its architecture and security topics but does not examine utilities and DLL files in this form.
:::

## Common mistakes

:::mistake{title="Confusing the operating system with application software"}
A word processor serves the user's task. The OS manages the hardware and the resources for all programs.
:::

:::mistake{title="Saying defragmentation speeds up a flash drive in the same way"}
Defragmentation helps a magnetic disk, because it reduces head movement. A solid-state drive has no moving parts, so the benefit is small.
:::

:::mistake{title="Listing only two or three management tasks"}
Exam questions ask for the five: process, memory, file, security and hardware (input-output) management. Give an action for each.
:::

:::mistake{title="Saying a virus checker removes all viruses"}
It detects known and suspicious code, and needs updating; it cannot guarantee the removal of every new threat.
:::

## Exam tips

:::exam-tip
Cambridge **Paper 1** asks you to **state** or **describe** OS tasks and utilities, and to **explain** why an OS is needed. Give one specific action for each task, such as "stops one program writing into the memory of another".
:::

:::exam-tip
"**Explain** the benefit of using a DLL": less memory because one copy is shared, easier updates, and less code for the programmer to write. A disk-map question needs a table: draw the blocks and number them.
:::

## Summary

:::summary
- An OS manages the hardware and shares resources between programs; it also provides the user interface.
- The five management tasks are process, memory, file, security and hardware (input-output) management.
- Utilities include the disk formatter, virus checker, defragmenter, disk analysis and repair, compression and back-up software.
- Defragmentation rejoins the pieces of fragmented files; incremental back-ups copy only what has changed.
- Library routines save programming effort; a DLL is loaded when needed and shared by several programs.
:::
