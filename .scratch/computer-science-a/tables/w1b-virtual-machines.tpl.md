---
{
  "key": "cpu.virtual-machines",
  "title": "Virtual machines",
  "summary": "What a virtual machine is, how a hypervisor emulates a whole computer or the Java virtual machine runs bytecode, with examples, and the benefits and limitations of virtualisation.",
  "concepts": ["acs.cpu.virtual-machines"],
  "estimatedMinutes": 35,
  "level": "core",
  "freePreview": true
}
---
## Introduction

A systems student in Bulawayo is learning to use a different operating system. Instead of repartitioning the laptop's disk, she opens a program that runs a complete second computer in a window on her desktop. It has its own screen, its own disk and its own operating system. If she breaks it, she deletes it and starts again, and her real files are untouched.

That second computer is a **virtual machine (VM)**: software that behaves like a computer. This lesson explains how a VM works, shows two common kinds (a hypervisor running whole operating systems, and the Java virtual machine running programs), and compares the benefits and limitations. It is A Level content.

You should already know the parts of a computer and what an operating system does, and the idea of translating high-level code to machine code.

## Key definitions

:::definition{term="Virtual machine"}
A program that imitates a computer system, so that software can run on it as if it were running on separate physical hardware.
:::

:::definition{term="Host and guest"}
The host is the real computer and operating system that runs the virtualisation software. A guest is a virtual machine, with its own operating system and programs, that runs on the host.
:::

:::definition{term="Hypervisor"}
Software (sometimes with hardware support) that creates virtual machines, shares the host's processor, memory and storage between them and keeps them separate from each other.
:::

:::definition{term="Emulation"}
Using software to make one system behave like another, so that programs written for the second system can run on the first.
:::

## How a virtual machine works

A hypervisor presents each guest with **virtual hardware**: a virtual processor, a block of the host's memory, a virtual disk (often one large file on the host's real disk) and virtual network and display adapters. The guest operating system is installed on this virtual hardware and does not know it is not running on a real computer. When the guest asks for a hardware operation, the hypervisor carries it out on the real hardware.

There are two common arrangements:

- A **hosted** hypervisor runs as a program on an ordinary operating system, such as a student's laptop. It is easy to install and is used for learning and testing.
- A **bare-metal** hypervisor runs directly on the hardware of a server, with no ordinary host operating system underneath. It has less overhead and is used in data centres.

## The Java virtual machine

A different kind of VM runs one program rather than a whole computer. A Java program is translated by a compiler not to the machine code of a particular processor, but to **bytecode**, instructions for an imaginary computer. A **Java virtual machine (JVM)** on each device interprets (or compiles as the program runs) the bytecode for the real processor.

The same compiled bytecode therefore runs on any device that has a JVM, whether the device is a Windows PC, a Linux server or an Android phone, with no recompiling. This is **portability**. The cost is that translation happens while the program runs, so it can be slower than a program compiled straight to the machine code of the device.

## Why use a virtual machine?

| Benefit | Explanation |
|---|---|
| Isolation | A fault or malware in one guest does not affect the host or other guests |
| Testing | Software or an update can be tried safely, and a snapshot restores the previous state |
| Running different systems | A different operating system, or an old program that needs one, can run on one computer |
| Server consolidation | Several lightly used servers can share one physical machine |
| Portability | A VM image can be copied to another host; Java bytecode runs wherever there is a JVM |

| Limitation | Explanation |
|---|---|
| Slower than native | The hypervisor adds a layer, so the guest runs more slowly than on the bare hardware |
| Uses host resources | Each VM takes memory, disk space and processor time, so the number of VMs is limited |
| Hardware access | Specialised devices may not be available to a guest, or only with extra set-up |
| Licensing | Each guest operating system and program may need its own licence |
| A single point of failure | If the physical host fails, every VM on it stops |

:::worked-solution{title="How many servers are needed?"}
A school district runs {{servers}} separate servers. Each uses only 8% of its machine's capacity. The district wants to consolidate them as VMs on hosts, each host to run at no more than 50% load.

1. Total load = {{servers}} × 0.08 = {{load}} of one machine.
2. Each host may take 0.5 of a machine, so hosts needed = {{load}} ÷ 0.5 = 1.92, which rounds **up** to {{hosts}}.
3. Twelve physical servers can be replaced by {{hosts}} hosts, saving purchase cost, space and electricity. The two hosts also give some protection: if one fails, the other can restart its VMs.
:::

:::worked-solution{title="How many VMs fit on a host?"}
A host has 64 GiB of memory, of which 8 GiB are reserved for the host's own operating system and hypervisor. Each VM is given 6 GiB.

1. Memory available to guests = 64 − 8 = {{avail}} GiB.
2. Number of VMs = {{avail}} ÷ 6 = 9.33, so at most {{vms}} VMs.
3. Memory used = {{vms}} × 6 = {{used}} GiB, leaving {{spare}} GiB spare.
4. If each VM needs a 40 GiB virtual disk, the disk space needed is {{vms}} × 40 = {{disk}} GiB.
:::

:::example{title="Testing a school program safely"}
A teacher in Mutare wants to try an unknown program that may contain malware. She installs it on a VM and disconnects the VM's virtual network. When the program damages the guest's files, she restores a **snapshot** taken before it was installed. The real computer, with the exam records, was never at risk because the VM is isolated from the host.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
This topic is Cambridge A Level only (topic 15). The ZIMSEC A-Level syllabus does not list virtual machines.
:::

## Common mistakes

:::mistake{title="Saying a virtual machine is physical hardware"}
A VM is software that imitates hardware. It runs on a real host and uses the host's processor, memory and storage.
:::

:::mistake{title="Saying the guest runs faster than the host"}
A guest is usually a little slower than the same system on real hardware because of the hypervisor layer.
:::

:::mistake{title="Confusing bytecode with machine code"}
Bytecode is for the Java virtual machine, not for the processor. The JVM turns it into machine code for the real processor.
:::

:::mistake{title="Forgetting the host's resources"}
Every VM uses part of the host's memory, disk and processor time. They cannot all have all of it.
:::

## Exam tips

:::exam-tip
"**Describe** what is meant by a virtual machine": software that behaves as a computer, with virtual hardware, running its own operating system on a host. Say "emulates" and "host".
:::

:::exam-tip
For "benefits and limitations", give two of each and state the reason: isolation (a fault does not spread), portability, testing; slower than native, uses the host's resources, licensing.
:::

:::exam-tip
Capacity questions: subtract what the host keeps, divide by what each VM needs, and round **down** for the number of VMs but **up** for the number of hosts.
:::

## Summary

:::summary
- A virtual machine is software that imitates a computer; a hypervisor creates and manages guests on a host.
- The Java virtual machine runs bytecode, so the same program runs on any device with a JVM.
- Benefits: isolation, safe testing, different systems on one machine, server consolidation, portability.
- Limitations: slower than native, uses host resources, hardware access, licensing, single point of failure.
- Round down for the number of VMs that fit, up for the number of hosts needed.
:::
