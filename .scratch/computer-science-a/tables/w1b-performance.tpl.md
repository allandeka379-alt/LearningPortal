---
{
  "key": "cpu.performance",
  "title": "Processor performance",
  "summary": "How clock speed, the number of cores, bus width and cache memory affect the performance of a computer, when extra cores help, why a faster clock gives diminishing returns, and how cache hits and misses change the average memory access time.",
  "concepts": ["acs.cpu.performance"],
  "estimatedMinutes": 40,
  "level": "core"
}
---
## Introduction

Two laptops in a Bulawayo shop have processors that look similar on the price card, yet one of them opens a large spreadsheet in half the time. Buyers often compare only the clock speed, but performance depends on several factors working together. A fast processor that is always waiting for slow memory is like a fast cook with only one small tap of water.

This lesson explains the four factors named in the syllabi: **clock speed**, **number of cores**, **bus width** and **cache memory**, together with the **type of processor**. It shows when each factor helps, when it does not, and how to compute simple effects. Pipelining and instruction sets (RISC and CISC) are in the next lesson but one.

You should already know the fetch-execute cycle, the idea of a bus and its width, and the difference between SRAM and DRAM.

## Key definitions

:::definition{term="Clock speed"}
The number of clock cycles the processor completes each second, measured in hertz (Hz); one gigahertz (GHz) is a thousand million cycles per second.
:::

:::definition{term="Core"}
A complete processing unit (ALU, control unit and registers) inside a processor chip. A multi-core processor has several that can run instructions at the same time.
:::

:::definition{term="Cache memory"}
A small amount of very fast memory (SRAM) between the processor and main memory that holds copies of the instructions and data most recently or most often used.
:::

:::definition{term="Cache hit and cache miss"}
A hit occurs when the data the processor needs is already in the cache; a miss occurs when it is not and must be fetched from main memory.
:::

## Clock speed

The clock controls the rhythm of the processor. A higher clock speed means more cycles each second, so more instructions can be carried out, if each instruction needs a fixed number of cycles.

:::worked-solution{title="Instructions per second"}
A processor runs at 2.5 GHz and an average instruction needs 4 clock cycles.

1. Cycles per second = 2 500 000 000.
2. Instructions per second = 2 500 000 000 ÷ 4 = {{ips}}.
3. That is 625 million instructions each second.
:::

A faster clock does not give a proportional gain, for three reasons. It produces more **heat**, which needs a fan or a limit on speed; it uses more **power**, which shortens battery life; and the processor may spend part of its time **waiting for memory**, which does not speed up when the clock does.

:::worked-solution{title="Doubling the clock when the memory is slow"}
A program takes 10 s: 6 s of the time the processor is computing and 4 s it is waiting for main memory. The clock speed is doubled and the memory is unchanged.

1. The computing part halves: 6 ÷ 2 = 3 s.
2. The waiting part is unchanged: 4 s.
3. New time = 3 + 4 = {{newTotal}} s, a speed-up of 10 ÷ {{newTotal}} = {{speedup}}, far below 2.
:::

## Number of cores

Each core can work on a different task, or on a different part of one task. **More cores help** when there are several programs running at once (a browser, a music player and a document) or when one program has been written to split its work into parts that run together. **They do not help** when a program is one long sequence of dependent steps, because only one core can work on it, and the cores have to share memory and co-ordinate, which costs time.

:::worked-solution{title="Cores and a task with a serial part"}
A job takes 8 s on one core. A quarter of it (25%) must run one step after another; the remaining 75% can be shared equally between the cores.

1. With 4 cores: time = 8 × (0.25 + 0.75 ÷ 4) = 8 × 0.4375 = {{t4}} s.
2. The other core counts are in the table.

{{coreTable}}

3. Going from 4 cores to 8 saves less than going from 1 to 2: the serial part limits the gain.
:::

## Bus width

A wider **data bus** moves more bits at each transfer, so data reaches the processor faster. A wider **address bus** allows more memory to be installed and used. If the data bus is narrower than the processor's registers, several transfers are needed for one value and the processor waits. A fast processor with a narrow bus is held back by the bus.

## Cache memory

Main memory (DRAM) is much slower than the processor. The cache holds copies of what has been used lately, because programs often use the same instructions (in a loop) or nearby data again. When the processor needs something it checks the cache first. A **hit** is fast; a **miss** costs a trip to main memory, after which a copy is put in the cache.

Modern processors have more than one level of cache: a small, very fast **L1** closest to each core, a larger **L2**, and often a bigger **L3** shared between cores. A **larger cache** raises the hit rate, but costs more and is slower to search.

:::worked-solution{title="Average memory access time"}
A cache is read in 2 ns. Main memory takes 50 ns. Assume that a miss costs the full 50 ns. The hit rate is 90%.

1. Average time = hit rate × cache time + miss rate × memory time.
2. = 0.9 × 2 + 0.1 × 50 = 1.8 + 5 = {{amat90}} ns.
3. The table shows how a better hit rate lowers the average.

{{amatTable}}
:::

## Processor type and other ways to improve performance

The **type** of processor matters too: its word size (32-bit or 64-bit), its instruction set (RISC or CISC) and features such as pipelining all change how much work is done in each cycle. A system can also be sped up by adding **RAM** so that less data is swapped to the disk, by replacing a hard disk with an **SSD**, by a faster graphics unit for graphics tasks, and by keeping the system cool so that it does not slow down to protect itself.

:::example{title="Choosing for a school computer lab"}
A school lab in Mutare mostly runs word processors, spreadsheets and web browsers. These do not need a very high clock speed, but they benefit from **four cores** (several programs open together), enough **RAM**, and an **SSD** for fast start-up. The money saved on an extreme clock speed is better spent on memory and storage. The justification names the workload and links each part to it.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards expect an explanation of how processor type, number of cores, clock speed, bus width and cache memory contribute to performance. The averaged-access-time and core calculations above are extension work; examination questions mostly ask for reasoned explanations.
:::

## Common mistakes

:::mistake{title="Saying twice the cores means twice the speed"}
Only the parts of a task that can run in parallel gain. Programs written for a single core, and the serial parts of others, do not speed up.
:::

:::mistake{title="Equating clock speed with performance"}
Two processors of the same clock speed can differ greatly in cores, cache, instruction set and bus width.
:::

:::mistake{title="Saying that cache is bigger than main memory"}
Cache is small and very fast; main memory is larger and slower.
:::

:::mistake{title="Forgetting to compare with something"}
"Cache makes the computer faster" earns little. Say that frequently used data is held close to the processor so fewer slow accesses to RAM are needed.
:::

## Exam tips

:::exam-tip
"**Explain** how the number of cores affects performance": more cores can run more instructions at the same time, but only if the software is written so that the work can be split. Give both the benefit and the limit.
:::

:::exam-tip
"**Explain** why a faster clock may not make the computer much faster": heat, power use and waiting for memory or the bus are the standard reasons.
:::

:::exam-tip
For a cache question, name the hit and the miss, and say what happens in each. Use the words "frequently used" and "main memory".
:::

## Summary

:::summary
- A higher clock speed means more cycles per second, but heat, power and waiting for memory limit the gain.
- More cores allow instructions to run at the same time, but only when the work can be split between them.
- A wider data bus moves more bits per transfer; a wider address bus allows more memory.
- Cache holds copies of frequently used data close to the processor: a hit is fast and a miss goes to main memory.
- Average access time = hit rate × cache time + miss rate × memory time.
- Word size, instruction set, RAM, SSD and cooling also affect performance.
:::
