---
{
  "key": "os.process-scheduling",
  "title": "Process management and scheduling",
  "summary": "Multi-tasking and processes, the states running, ready and blocked and the transitions between them, why scheduling is needed, and first come first served, shortest job first, shortest remaining time and round robin scheduling with waiting and turnaround times computed.",
  "concepts": ["acs.os.process-scheduling"],
  "estimatedMinutes": 60,
  "level": "core",
  "freePreview": true
}
---
## Introduction

A clinic in Bulawayo has one computer with one processor. At the same moment it is printing patients' cards, saving a record and playing a waiting-room video. The processor can only do one thing at a time, yet all three seem to progress together. The operating system achieves this by giving each program the processor for a short time, then moving on to the next. Deciding **who runs next, and for how long**, is **scheduling**.

This lesson explains **multi-tasking** and **processes**, the three **process states**, and four scheduling routines: first come first served, shortest job first, shortest remaining time and round robin. For a table of processes you will work out the order of execution, the waiting time and the turnaround time. Every table here was produced by code.

You should already know that the processor executes instructions, that the OS manages the processor, and what an interrupt is.

## Key definitions

:::definition{term="Process"}
A program that is being executed, together with the resources it is using (its memory, registers and open files).
:::

:::definition{term="Multi-tasking"}
The running of several processes at the same time by sharing the processor between them so that each makes progress.
:::

:::definition{term="Scheduler"}
The part of the operating system that decides which process uses the processor next and for how long.
:::

:::definition{term="Waiting time and turnaround time"}
Turnaround time is the time from a process arriving to its completion. Waiting time is the part of the turnaround time that the process spends not running: turnaround time minus burst time.
:::

## Process states

A process is always in one of three states: **running** (using the processor), **ready** (able to run and waiting for the processor) or **blocked** (waiting for an event such as the completion of an input or output operation, so it could not use the processor even if it were offered).

{{states}}

A process can never go directly from blocked to running, because it must first wait in the ready queue.

## Why scheduling is needed

The processor is much faster than the input and output devices, so a process that is waiting for the disk or keyboard leaves the processor idle. By switching to another ready process the OS keeps the processor and other resources busy, which increases **throughput**, and ensures that every process gets a fair share and that the response to the user stays quick. A scheduling routine is judged by the mean waiting time, mean turnaround time and fairness.

**Pre-emptive** scheduling allows the OS to take the processor away from a running process (the end of a time slice, or the arrival of a process with a shorter remaining time). **Non-pre-emptive** scheduling lets a process run until it finishes or blocks.

## The four scheduling routines

- **First come first served (FCFS):** processes run in order of arrival. Non-pre-emptive. Simple, but a long process at the front makes the others wait.
- **Shortest job first (SJF):** when the processor is free, the ready process with the shortest burst time runs next. Non-pre-emptive. Gives a low mean waiting time, but long jobs may wait a long time.
- **Shortest remaining time (SRT):** the pre-emptive form of SJF: when a process arrives, if its burst is shorter than the remaining time of the running process, the new process takes over.
- **Round robin (RR):** each process in turn runs for a fixed **time slice** (quantum). If it has not finished it goes to the back of the ready queue. Pre-emptive and fair, good for interactive systems. In this lesson, processes that arrive during a slice join the queue **before** the process whose slice has just ended.

### Worked example: four processes

Four processes arrive at the times shown. The burst time is the processor time each needs.

{{procTable}}

:::worked-solution{title="First come first served"}
{{fcfsG}}

{{fcfsT}}

1. A runs 0 to 6, then B, C and D in the order they arrived.
2. Turnaround time = completion - arrival; waiting time = turnaround - burst. For D: 15 - 5 = 10, and 10 - 2 = 8.
3. The mean waiting time is 5 and the mean turnaround time is 8.75.
:::

:::worked-solution{title="Shortest job first"}
{{sjfG}}

{{sjfT}}

1. At time 6 B, C and D are ready. D has the shortest burst (2), so it runs next, then B (3), then C (4).
2. The mean waiting time falls to 4.25.
:::

:::worked-solution{title="Shortest remaining time"}
{{srtG}}

{{srtT}}

1. A starts at 0. At time 1, B arrives with a burst of 3, less than A's remaining 5, so B pre-empts A.
2. At time 4, C (4) has less remaining time than A (5), and at time 5, D (2) pre-empts C (which has 3 left).
3. A, which is the longest, finishes last, at 15. The mean waiting time is 3.25.
:::

:::worked-solution{title="Round robin with a time slice of 2"}
{{rrG}}

{{rrT}}

1. A runs 0 to 2, then B and C (which have both arrived) before A runs again.
2. D arrives at 5 and joins the queue before C is put back at the end.
3. Each process is served in turn, so no process waits long for its first turn, but the mean waiting time is the highest.
:::

{{compare}}

The comparison shows that no routine is best in every way: SRT has the lowest mean waiting time here, but it needs the burst times to be known (or estimated) and can leave a long process waiting; RR is fair and responsive, at the cost of more switching and a higher mean waiting time.

## The kernel and interrupts

The **kernel** is the central part of the OS. For low-level scheduling it acts as an **interrupt handler**: when a time slice ends (a timer interrupt) or an input or output operation completes, an interrupt is sent. The kernel saves the registers of the running process in its **process control block**, runs the scheduler, and loads the registers of the process chosen next. This is a **context switch**. It takes time, so very short time slices waste processing time.

:::keyfact{title="ZIMSEC and Cambridge"}
Process states, scheduling routines and the kernel as interrupt handler are Cambridge A Level content (topic 16). ZIMSEC does not examine them in this form.
:::

## Common mistakes

:::mistake{title="Using burst time instead of the turnaround time"}
Turnaround time is completion time minus **arrival** time. Waiting time is turnaround time minus **burst** time. A process that arrives at 5 and finishes at 15 has a turnaround of 10, not 15.
:::

:::mistake{title="Letting a blocked process go straight to running"}
When the event happens the process moves to ready and waits for the scheduler.
:::

:::mistake{title="Forgetting to re-check at each arrival in SRT"}
With a pre-emptive routine compare the new process's burst with the remaining time of the running process at every arrival.
:::

:::mistake{title="Splitting the Gantt chart wrongly in round robin"}
A process that needs less than the time slice finishes early; the next process starts at once.
:::

## Exam tips

:::exam-tip
Cambridge **Paper 3** gives a table of arrival and burst times and asks for a Gantt chart (a table of start and end times), then waiting and turnaround times. Draw the time line first and re-check ties and arrivals at every decision point.
:::

:::exam-tip
"**Explain** why scheduling is needed": to make the best use of the processor while processes wait for input or output, to share it fairly and to keep response times acceptable. "**Describe** the states": running, ready, blocked, with the cause of each transition.
:::

## Summary

:::summary
- A process is a program being executed; multi-tasking shares the processor between processes.
- A process is running, ready or blocked; a blocked process becomes ready, never running directly.
- FCFS runs in order of arrival; SJF picks the shortest burst; SRT pre-empts when a shorter job arrives; RR gives each process a fixed time slice in turn.
- Turnaround time = completion - arrival; waiting time = turnaround - burst.
- The kernel handles the interrupts that trigger a context switch: it saves one process's registers and loads another's.
:::
