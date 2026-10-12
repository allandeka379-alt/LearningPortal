---
{
  "key": "cpu.parallel-processing",
  "title": "Parallel processing and computer architectures",
  "summary": "The four basic architectures SISD, SIMD, MISD and MIMD, the features of massively parallel computers, speed-up and Amdahl's idea computed from a fraction, and when a problem suits parallel processing.",
  "concepts": ["acs.cpu.parallel-processing"],
  "estimatedMinutes": 40,
  "level": "core"
}
---
## Introduction

The Zimbabwe Meteorological Services must turn millions of readings of temperature, pressure and humidity into a forecast before the weather it describes arrives. One processor working through the calculations in order would finish too late. Instead, the area is cut into a grid and thousands of processors each work on their own squares at the same time, passing results to their neighbours.

This is **parallel processing**: using several processors, or many parts of one processor, to work on a problem at once. This lesson describes the four basic architectures, the features of massively parallel computers, and how to calculate and understand **speed-up**, including the limit set by the part of a task that cannot be shared. It is A Level content.

You should already know the fetch-execute cycle, what a core is, and that more cores help only if the work can be split (processor performance).

## Key definitions

:::definition{term="Parallel processing"}
Carrying out several operations at the same time, using more than one processor (or processing unit), to complete a task in less time.
:::

:::definition{term="Massively parallel computer"}
A computer made of a very large number of processors (often thousands) that work together on one problem, each with its own memory or sharing a common memory.
:::

:::definition{term="Speed-up"}
The time taken by one processor divided by the time taken by several processors for the same task.
:::

## The four basic architectures

A classification of computers by the number of **instruction streams** and **data streams** they handle at once is known as Flynn's classification.

{{cmp}}

- **SISD (single instruction, single data)**: one processing unit follows one instruction at a time on one item of data. It is the traditional single-core computer.
- **SIMD (single instruction, multiple data)**: the same instruction is applied to many data items at once. Graphics processors and vector processors do this, for example when brightening every pixel of an image.
- **MISD (multiple instruction, single data)**: several units perform different operations on the same data stream. It is rare, and is used where results from independent units are compared to detect faults.
- **MIMD (multiple instruction, multiple data)**: several processors run different instructions on different data at the same time. A multi-core PC, a server and a cluster of computers are MIMD.

:::worked-solution{title="SIMD against SISD for an image"}
An image has {{pixels}} pixels. A SISD processor changes one pixel per instruction. A SIMD processor changes 8 pixels per instruction.

1. SISD: 1 000 000 instructions.
2. SIMD: 1 000 000 ÷ 8 = {{simdCycles}} instructions.
3. The SIMD processor needs one eighth of the instructions because one instruction operates on eight data items.
:::

## Massively parallel computers

A massively parallel computer connects hundreds or thousands of processors by a fast **interconnection network**.

- With **shared memory**, all the processors can reach one common memory. Programs are easy to write, but access to the memory becomes a bottleneck as processors are added.
- With **distributed memory**, each processor has its own memory and processors exchange data by sending messages. This scales to very many processors, but the programmer must manage the communication.

The cost is **communication overhead**: time spent sending data between processors and making them wait for each other, so adding processors gives smaller gains. Uses include weather forecasting, climate and physics simulation, modelling of molecules, searching very large data sets and training large machine-learning models.

## Speed-up and its limits

Let *p* be the fraction of the work that can be done in parallel; the remaining fraction (1 − *p*) must be done in sequence. With *n* processors the time falls from *T* to *T* × ((1 − *p*) + *p* ÷ *n*). This is **Amdahl's idea**: the sequential part limits the gain, however many processors are used.

:::formula{name="Speed-up (Amdahl)"}
Speed-up = 1 ÷ ((1 − p) + p ÷ n)
:::

:::worked-solution{title="Speed-up with p = 0.8"}
80% of a task can be done in parallel.

{{table}}

1. With 4 processors the speed-up is 1 ÷ (0.2 + 0.8 ÷ 4) = 1 ÷ 0.4 = {{s4}}.
2. With an unlimited number of processors the parallel part takes no time, so the best speed-up is 1 ÷ 0.2 = {{max}}.
3. Doubling from 8 to 16 processors only raises the speed-up from 3.33 to 4: diminishing returns.
:::

:::worked-solution{title="Time on several processors"}
A job takes 60 minutes on one processor. 75% of it can be shared equally between processors. How long does it take on 5 processors?

1. Sequential part: 0.25 × 60 = 15 minutes.
2. Parallel part: 0.75 × 60 ÷ 5 = 9 minutes.
3. Total = 15 + 9 = {{tN}} minutes, a speed-up of 60 ÷ {{tN}} = {{spN}}.
:::

## When does a problem suit parallel processing?

A problem suits parallel processing when it:

- is large enough to be worth splitting;
- can be divided into parts that are **independent** (each can be done without waiting for the others);
- applies the **same operation to many items** (SIMD), or has many separate tasks (MIMD);
- needs little communication between the parts compared with the calculation done in each part.

It does not suit tasks that are a single chain of dependent steps (each step needs the previous result), tasks that are small, or those where the parts spend most of their time exchanging data.

:::example{title="Marking a national examination"}
Sorting a very large pile of scripts into examination centres can be done by many clerks at once, since each script's centre code is independent of the others: this suits parallel processing. Adding the final grade boundaries is different: the boundary depends on the results of every script, so that step must wait for all the others, a sequential part. Even if the first part is made ten times faster, the whole task cannot be faster than the sequential step allows.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
This topic is Cambridge A Level only (topic 15). ZIMSEC mentions multi-core processing in performance but does not examine the four architectures or the speed-up formula.
:::

## Common mistakes

:::mistake{title="Saying MIMD means one instruction on many data"}
That is SIMD. In MIMD each processor can run its own instructions on its own data.
:::

:::mistake{title="Expecting n processors to give n times the speed"}
Only the parallel fraction speeds up. The sequential part and communication overhead limit the gain.
:::

:::mistake{title="Describing every multi-core PC as SIMD"}
A multi-core PC running different programs is MIMD. SIMD applies one instruction to many data items.
:::

:::mistake{title="Using the formula with p as a percentage"}
In the formula, *p* is a fraction between 0 and 1 (0.8, not 80).
:::

## Exam tips

:::exam-tip
Give an example with each architecture: SISD (single-core PC), SIMD (graphics processor), MISD (fault-tolerant control), MIMD (multi-core or cluster). An example alone earns the mark only if it matches the definition.
:::

:::exam-tip
"**Explain** why adding processors gives diminishing returns": part of the task must be done in sequence, and the processors spend time communicating or waiting.
:::

:::exam-tip
For an Amdahl calculation write the formula, substitute, and give the answer to 2 decimal places. Check that the answer is less than 1 ÷ (1 − *p*).
:::

## Summary

:::summary
- SISD: one instruction, one data item. SIMD: one instruction, many data items. MISD: many instructions, one data stream. MIMD: many instructions, many data streams.
- Massively parallel computers have many processors with shared or distributed memory; communication overhead limits the gain.
- Speed-up = 1 ÷ ((1 − p) + p ÷ n), where p is the parallel fraction; the maximum is 1 ÷ (1 − p).
- Problems suit parallel processing when they are large, can be split into independent parts and need little communication.
- Examples: weather forecasting, simulation, image processing.
:::
